<?php

namespace App\Http\Controllers\Store;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Customer;
use App\Traits\CartTrait;
use App\Shipping;
use App\Payment;
use App\User;
use App\Cart;
use App\CartItem;
use App\CatalogArticle;
use App\CatalogBrand;
use PDF;
use Excel;
use Cookie;

class OrdersController extends Controller
{
    use CartTrait;

    /*
    |--------------------------------------------------------------------------
    | INDEX
    |--------------------------------------------------------------------------
    */

    public function index(Request $request)
    {        
        // dd($request->all());
        $pagination = $this->getSetPaginationCookie($request->get('results'));

        $status = "Process";
        if($request->status)
            $status = $request->status;

        
        if($request->id != null)
        {
            $items = Cart::searchId($request->id)->where('status', $status)->orderBy('id', 'ASC')->paginate($pagination); 
        }
        else if($request->init_date != '' && $request->expire_date != '')
        {
            $items = Cart::where('status', '=', $status)
                ->whereBetween('created_at', [$request->init_date, $request->expire_date])
                ->orderBy('created_at', 'DESC')
                ->paginate($pagination);
        }
        else if ($request->customer)
        {
            //$items = Cart::orderBy('created_at', 'DESC')->where('status', $status)->paginate($pagination);
            $items = Cart::search($request->customer)->where('status', '=', $status)->paginate($pagination);
        }
        else
        {
            $items = Cart::orderBy('created_at', 'DESC')->where('status', $status)->paginate($pagination);
        }
        
        return view('vadmin.orders.index')->with('items', $items);    

    }


    // Pagination
    public function getSetPaginationCookie($request)
    {
    
        if($request)
        {
            Cookie::queue('store-pagination', $request, 2000);
            $pagination = $request;
        }
        else
        {   
            if(Cookie::get('store-pagination'))
            {
                $pagination = Cookie::get('store-pagination');
            }
            else{
                $pagination = 24;
            }
        } 
        return $pagination;
    }

    /*
    |--------------------------------------------------------------------------
    | SHOW
    |--------------------------------------------------------------------------
    */

    public function show($id)
    {
        try
        {
            $cart = Cart::findOrFail($id);
        } 
        catch(\Exception $e)
        {
            return redirect()->back()->with('message', 'Error: '.$e->getMessage());
        }
        $customer = Customer::find($cart->customer_id);
        
        $order = $this->calcCartData($cart);
        return view('vadmin.orders.show')
            ->with('order', $order)
            ->with('customer', $customer);
    }

    /*
    |--------------------------------------------------------------------------
    | EXPORT
    |--------------------------------------------------------------------------
    */

    // DOWNLOAD INVOICE PDF
    public function downloadInvoice($id, $action)
    {
        $view = 'vadmin.orders.invoicePdf';
        // Return Options
        // return $pdf->dowload($filename.'.pdf');
        // return $pdf->stream($filename.'.pdf');
        $order = Cart::find($id);
        if($order != null){
            $cart = $this->calcCartData($order);
            $pdf = PDF::loadView($view, compact('order', 'cart'))->setPaper('a4', 'portrait');
            $filename = 'Comprobante-Pedido-N-'.$order->id;
            if($action == 'stream')
            {
                return $pdf->stream($filename.'.pdf');
            } else {
                return $pdf->download($filename.'.pdf');
            }
            die();

        } else {
            return redirect()->route('store')->with('message','Estás intentando una acción ilegal...');
        }
    }
    

    public function exportOrderXls($id)
    {   
        $order = $this->calcCartData(Cart::find($id));
        Excel::create('Augustamoi-Pedido-'.$id, function($excel) use($order){
            $excel->sheet('Listado', function($sheet) use($order) { 
                $sheet->getDefaultStyle()->getFont()->setName('Arial');
                $sheet->getDefaultStyle()->getFont()->setSize(12);
                $sheet->getColumnDimension()->setAutoSize(true);
                $sheet->loadView('vadmin.orders.invoiceXls', 
                compact('order'));
            });
        })->export('xls');         
    }

    public function exportOrderCsv($id)
    {   
        $order = $this->calcCartData(Cart::find($id));
        $filename = 'Augustamoi-Pedido-'.$id.'-Cliente-'.$order['cart']->customer->name.' '.$order['cart']->customer->surname;
        Excel::create($filename, function($excel) use($order){
            $excel->sheet('Listado', function($sheet) use($order) { 
                $sheet->getDefaultStyle()->getFont()->setName('Arial');
                $sheet->getDefaultStyle()->getFont()->setSize(12);
                $sheet->getColumnDimension()->setAutoSize(true);
                $sheet->getRowDimension(2)->setRowHeight(20);
                $sheet->loadView('vadmin.orders.invoiceXls', 
                compact('order'));
            });
        })->export('csv');         
    }

    public function showOrderToProd($ids = null)
    {
        // dd($request->ids);
        // Get all orders ready to production
        $rawOrders = $this->getOrdersToProduction($ids);
        $orders = orderMultiDimensionalArray($rawOrders, 'article_code');
        return view('vadmin.orders.showOrdersToProduction')
            ->with('orders', $orders);
    }

    public function exportOrderToProd($ids = null)
    {
        // dd($ids);
        // Get all orders ready to production
        $rawOrders = $this->getOrdersToProduction($ids);
        $orders = orderMultiDimensionalArray($rawOrders, 'article_code');
        // dd($orders);
        // $format = 'xls';
        // if($ids != null)
        //     $format = 'csv';

        // Export to csv
        $filename = 'Ordenes-Para-Produccion';
        Excel::create($filename, function($excel) use($orders){
            $excel->sheet('Listado', function($sheet) use($orders) { 
                $sheet->getDefaultStyle()->getFont()->setName('Arial');
                $sheet->getDefaultStyle()->getFont()->setSize(12);
                $sheet->getColumnDimension()->setAutoSize(true);
                $sheet->getRowDimension(2)->setRowHeight(20);
                $sheet->loadView('vadmin.orders.invoiceOrdersToProd', 
                compact('orders'));
            });
        })->download('xls');
    }


    public function getOrdersToProduction($ids = null)
    {
        // dd($ids);
        
        if($ids == null)
        {
            $orders = Cart::where('status', 'Process')->orderBy('id','ASC')->get();
        }
        else
        {
            $idsArray = array_map('intval', explode(',', $ids));
            $orders = Cart::whereIn('id', $idsArray)->get();
        }

        $collected = [];
        
        foreach($orders as $order)
        {
           // l
            foreach($order->items as $item)
            {
                $key = $item->article->code."|".$item->color."|".$item->size."|".$item->final_price;
                if(array_key_exists($key, $collected))
                {
                    // If same article different price
                    if($collected[$key]['price'] != $item->final_price)
                    {
                        $collected = $this->createNewItemToProduction($key, $item, $collected);  
                    }
                    else
                    {
                        
                        $collected[$key]['quantity'] = $collected[$key]['quantity'] + $item->quantity;
                    }
                }
                else
                {
                    $collected = $this->createNewItemToProduction($key, $item, $collected);
                }
            }
        }
        
        // From Helpers
        sort_array_of_array($collected, 'article_name');
        // dd($collected);
        return $collected;
    }

    public function createNewItemToProduction($key, $item, $collected)
    {
        if($item->article->brand)
            $brand = $item->article->brand->name;
        else
            $brand = 'Sin Marca';

        $collected[$key] = [
            'article_code' => $item->article->code,
            'article_name' => $item->article_name,
            'brand' => $brand,
            'talle' => $item->size,
            'color' => $item->color,
            'tela' => $item->textile,
            'quantity' => $item->quantity,
            'price' => $item->final_price
        ]; 

        return $collected;
    }

    /*
    |--------------------------------------------------------------------------
    | CREATE
    |--------------------------------------------------------------------------
    */

    public function create(Request $request)
    {
        $shippings = Shipping::orderBy('name', 'ASC')->pluck('name', 'id');
        $shippingData = Shipping::orderBy('name', 'ASC')->get();
        $paymentData = Payment::orderBy('name', 'ASC')->get();
        $payment_methods = Payment::orderBy('name', 'ASC')->pluck('name', 'id');
        $sellers = User::pluck('name', 'id');
        $existingOrder = [];
        return view('vadmin.orders.create')
            ->with('existingOrder', $existingOrder)
            ->with('sellers', $sellers)
            ->with('shippings', $shippings)
            ->with('shippingData', $shippingData)
            ->with('paymentData', $paymentData)
            ->with('payment_methods', $payment_methods);
    }
    
    public function store(Request $request)
    {   
        // dd($request->all());
        if($request->payment_method_id == null || $request->shipping_id == null)
            return back()->with('message', 'Debe ingresar método de pago y envío');

        // Store Cart
        $cart = new Cart();
        $cart->status = 'Process';

        if(isset($request->anon_name))
            $cart->anon_name = $request->anon_name;

        //Set Payment Method
        $cart->payment_method_id = $request->payment_method_id;
        $paymentCharge = Payment::where('id', $request->payment_method_id)->first()->charge;
        $paymentDiscount = Payment::where('id', $request->payment_method_id)->first()->discount;
        // dd($paymentCharge);
        // @if($cart)

        $cart->payment_charge = 0;
        $cart->payment_discount = 0; 
        if($paymentCharge > 0)
            $cart->payment_charge = $paymentCharge;
        elseif($paymentDiscount > 0)
            $cart->payment_discount = $paymentDiscount;
 
        // Set Shipping Method
        $cart->shipping_id = $request->shipping_id;
        $shipping_price = Shipping::where('id', $request->shipping_id)->first()->price;
        $cart->shipping_price = $shipping_price;

        $cart->customer_id = $request->customer_id;
        $cart->save();
        $cart_id = $cart->id;

        foreach($request->item as $item)
        {
            $cartItem = new CartItem();
            $cartItem->cart_id = $cart_id;
            $cartItem->article_name = $item['name'];
            $cartItem->article_id = $item['id'];
            $cartItem->variant_id = $item['variant_id'];
            $cartItem->quantity = $item['quantity'];
            $cartItem->combination = $item['combination'];
            $cartItem->color = $item['color'];
            $cartItem->size = $item['size'];
            $cartItem->textile = $item['textile'];
            $cartItem->final_price = $item['final_price'];

            $cartItem->save();   
            $this->updateVariantStock($item['variant_id'], -$item['quantity']); 
        }

        
        return redirect()->route('orders.index', ['status' => 'Process'])->with('message','Pedido cargado exitosamente');
    }

    /*
    |--------------------------------------------------------------------------
    | UPDATE
    |--------------------------------------------------------------------------
    */

    public function edit($id)
    {
        $existingOrder = Cart::find($id);

        $shippings = Shipping::orderBy('name', 'ASC')->pluck('name', 'id');
        $shippingData = Shipping::orderBy('name', 'ASC')->get();
        $paymentData = Payment::orderBy('name', 'ASC')->get();
        $payment_methods = Payment::orderBy('name', 'ASC')->pluck('name', 'id');
        $sellers = User::pluck('name', 'id');

        return view('vadmin.orders.create')
            ->with('existingOrder', $existingOrder)
            ->with('sellers', $sellers)
            ->with('shippings', $shippings)
            ->with('shippingData', $shippingData)
            ->with('paymentData', $paymentData)
            ->with('payment_methods', $payment_methods);

        // return view('vadmin.orders.edit')->with('order', $order);
    }

    public function update(Request $request, $id)
    {
        if($request->payment_method_id == null || $request->shipping_id == null)
            return back()->with('message', 'Debe ingresar método de pago y envío');

        // dd($request->all());
        $order = Cart::find($id);
        $order_id = $order->id;
        
        try
        {
            $order->fill($request->all());
            $order->save();
        }
        catch (\Exception $e) 
        {
            dd("Error editando pedido." . $e->getMessage());
        }
            
        foreach($request->item as $item)
        {
            // dd($item);
            // dd("Order id: " . $order_id . ' | Item id: ' . $item['id']);
            $existingItem = CartItem::where('id', $item['id'])->first();
            if($existingItem)
            {
                $existingItem->fill($item);
                $existingItem->save();
                try
                {
                    $existingItem->save(); 
                    $this->updateVariantStock($item['variant_id'], -$item['quantity']); 
                }
                catch (\Exception $e) 
                {
                    dd("Error editando item existente: " . $e->getMessage());
                }
            }
            else
            {
                $cartItem = new CartItem();
                $cartItem->cart_id = $order_id;
                $cartItem->article_name = $item['name'];
                $cartItem->article_id = $item['id'];
                $cartItem->variant_id = $item['variant_id'];
                $cartItem->quantity = $item['quantity'];
                $cartItem->combination = $item['combination'];
                $cartItem->color = $item['color'];
                $cartItem->size = $item['size'];
                $cartItem->textile = $item['textile'];
                $cartItem->final_price = $item['final_price'];
                
                try
                {
                    $cartItem->save(); 
                    $this->updateVariantStock($item['variant_id'], -$item['quantity']); 
                }
                catch (\Exception $e) 
                {
                    dd("Error agregando item." . $e->getMessage());
                }
            }
        }
            
        return redirect()->back()->with('message','Pedido editado');
    } 


    public function destroy(Request $request)
    {
        $item = CartItem::where('id', $request->cartItemId)->first();

        try
        {
            // Return Stock
            $item->delete();
            $this->updateVariantStock($request->variantId, $request->quantity);
        } 
        catch (\Exception $e) 
        {
            if($request->action == 'noreload')
                return response()->json(['response' => 'error', 'message' => 'Error al eliminar. '. $e->getMessage()]);
            else
                return redirect()->back()->with('message', 'Error al eliminar. '. $e->getMessage());
        }

        // Delete cart if last item is deleted
        // $cart = Cart::findOrFail($item->cart->id);
        // if($cart->items->count() < 1)
        // {
        //     $cart->delete();
        // } 
        // else 
        // {
        //     return response()->json(['response' => 'success', 'message' => 'Artículo eliminado del carro de compras']); 
        // }


        if($request->action == 'noreload')
        {
            return response()->json(['response' => 'success', 'message' => 'Carro de compras eliminado']);
        }
        else
        {
            // In case of include a reload function redirect here.
            return response()->json(['response' => 'success', 'message' => 'Carro de compras eliminado']);
        }
    }

}