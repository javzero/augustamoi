<?php

namespace App\Http\Controllers\Store;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Cart;
use App\Customer;
use App\Shipping;
use App\Payment;
use App\Traits\CartTrait;
use Log;
// Eliminar carbon despues de testear
use Carbon\Carbon;

class CartsController extends Controller
{
    use CartTrait;

    /*
    |--------------------------------------------------------------------------
    | CREATE
    |--------------------------------------------------------------------------
    */

    public function index(Request $request)
    {          
        if($request->show == 'Orders') 
        {
            $items = Cart::orderBy('created_at', 'DESC')->where('status', '!=','Active')->get();
        }
        else if($request->show == 'Active')
        {
            $items = Cart::orderBy('created_at', 'DESC')->where('status', '=','Active')->get();   
        } else {
            $items = Cart::orderBy('created_at', 'DESC')->where('status', '!=','Active')->get();
        }

        return view('vadmin.orders.index')->with('items', $items);    
    }

    public function show($id)
    {
        $cart = Cart::find($id);
        $customer = Customer::find($cart->customer_id);
        
        $order = $this->calcCartData($cart);
        return view('vadmin.orders.show')
            ->with('order', $order)
            ->with('customer', $customer);
    }

    public function updatePaymentAndShipping(Request $request)
    {
        // dd($request->all());
        $cart = Cart::findOrFail($request->id);
        if($request->payment_method_id != null)
        {
            $cart->payment_method_id = $request->payment_method_id;
            $payment_charge = Payment::where('id', $request->payment_method_id)->first()->charge;
            $payment_discount = Payment::where('id', $request->payment_method_id)->first()->discount;
            // dd($payment_discount);
            
            $cart->payment_charge = 0;
            $cart->payment_discount = 0;

            if($payment_discount != 0)
            {
                $cart->payment_charge = 0;
                $cart->payment_discount = $payment_discount;
            }
            
            if($payment_charge != 0) 
            {
                $cart->payment_discount = 0;
                $cart->payment_charge = $payment_charge;
            }

        }
        
        if($request->shipping_id != null)
        {
            $cart->shipping_id = $request->shipping_id;
            $shipping_price = Shipping::where('id', $request->shipping_id)->first()->price;
            $cart->shipping_price = $shipping_price;
        }
        
        try
        {
            $cart->save();
            return redirect(url()->previous().'#pago-y-envio');
        }
        catch (\Exception $e)
        {
            return back()->with('message', 'Error al actualizar: '. $e->getMessage());
        }
    }

    public function updateStatus(Request $request)
    {
        // dd($request->all());
        $cart = Cart::findOrFail($request->id);
        if($request->field == 'payment_status')
        {
            try 
            {
                $cart->payment_status = $request->status;
                $cart->save();
                return response()->json([
                    'response' => true,
                    'newstatus' => $cart->payment_status
                ]); 
            }  
            catch (\Exception $e) 
            {
                return response()->json([
                    'response'   => false,
                    'error'    => 'Error: '.$e->getMessage()
                ]);    
            }    
        }
        else
        {   
            if($request->status == "Active")
            {
                $existingActiveCart = Cart::where('customer_id', $cart->customer_id)->where('status', 'Active')->first();
                if($existingActiveCart)
                {
                    
                    return response()->json([
                        'response' => false,
                        'message' => "El cliente ya tiene un carro de compras abierto"
                        ]); 
                }
                foreach($cart->items as $item)
                {
                    $this->updateVariantStock($item->variant->id, -$item->quantity);
                    // $this->updateCartItemStock($item->article_id, -$item->quantity);
                }

            }

            try {
                if($request->status == "Canceled")
                {
                    foreach($cart->items as $item)
                    {
                        $this->updateVariantStock($item->variant->id, $item->quantity);
                        // $this->updateCartItemStock($item->article_id, $item->quantity);
                    }
                }
                         
                $cart->status = $request->status;
                $cart->save();
                return response()->json([
                    'response' => true,
                    'newstatus' => $cart->status
                ]); 
            }  catch (\Exception $e) {
                return response()->json([
                    'response'   => false,
                    'error'    => 'Error: '.$e->getMessage()
                ]);    
            } 
        }
    }



    /*
    |--------------------------------------------------------------------------
    | DESTROY
    |--------------------------------------------------------------------------
    */

    public function removeCartReturnStock(Request $request)
    {
        $cart = Cart::find($request->itemid);
        try
        {
            if($cart->status != 'Canceled')
            {
                foreach($cart->items as $item)
                {
                    $this->updateVariantStock($item->variant->id, $item->quantity);
                }
            }
            $cart->delete();
        }
        catch (\Exception $e)
        {
            dd($e->getMessage());
        }
        return back()->with('message', 'Carro de compras eliminado');
    }


    public function destroy(Request $request)
    {   
        // dd($request->all());
        $ids = json_decode('['.str_replace("'",'"',$request->id).']', true);
        try 
        {
            foreach ($ids as $id) {
                $cart = Cart::find($id);
                // If order has been canceled dont return stock (Its been returned before)
                if($cart->status != 'Canceled')
                {
                    foreach($cart->items as $item){
                        // Check if original article exists
                        if($item->article != null)
                            if($item->variant)
                                $this->updateVariantStock($item->variant->id, $item->quantity);
                    }
                }
                $cart->delete();
            }
            return response()->json([
                'success'   => true,
            ]); 
        }  
        catch (\Exception $e)
        {
            dd($e);
            return response()->json([
                'success'   => false,
                'error'    => 'Error: '.$e->getMessage()
            ]);    
        } 
    }

    public function testDelete()
    {
        $maxTime = 24;
        $time = Carbon::now()->subHour($maxTime);

        $oldCarts = Cart::where('status','ACTIVE')->where('created_at', '<=', $time)->get();
        
        $ids = [];
        foreach($oldCarts as $oldCart)
        {
            // Log::info("Carro de compras " . $oldCart->id . " (".$oldCart->created_at.") eliminado");
            array_push($ids, $oldCart->id);
        }
        
        $this->manageOldCarts($ids, 'cancel');
    }

}