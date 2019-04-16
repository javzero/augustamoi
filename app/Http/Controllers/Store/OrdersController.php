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
        //dd($request->all());
        $status = "Process";
        if($request->status)
            $status = $request->status;

        $pagination = 20;
        
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
        Excel::create('Bruna-Pedido-'.$id, function($excel) use($order){
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
        $filename = 'Bruna-Pedido-'.$id.'-Cliente-'.$order['rawdata']->customer->name.' '.$order['rawdata']->customer->surname;
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

    public function exportOrderToProd()
    {
        // Get all orders ready to production
        $rawOrders = $this->getOrdersToProduction();
        
        
        function orderMultiDimensionalArray ($toOrderArray, $field, $inverse = false) {  
            $position = array();  
            $newRow = array();  
            foreach ($toOrderArray as $key => $row) {  
                    $position[$key]  = $row[$field];  
                    $newRow[$key] = $row;  
            }  
            if ($inverse) {  
                arsort($position);  
            }  
            else {  
                asort($position);  
            }  
            $returnArray = array();  
            foreach ($position as $key => $pos) {       
                $returnArray[] = $newRow[$key];  
            }  
            return $returnArray;  
        }  
    
        $orders = orderMultiDimensionalArray($rawOrders, 'article_code');
        // Sort orders by brand
        //$orders = sort_by_value($rawOrders, 'brand');
        //$orders = $rawOrders;
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
        })->export('xls');
    }

    public function getOrdersToProduction()
    {
        $orders = Cart::where('status', 'Process')->get();
        $collected = [];
        
        foreach($orders as $order)
        {

            foreach($order->items as $item)
            {
                $key = $item->article->code."|".$item->color."|".$item->size;
                if(array_key_exists($key, $collected))
                {
                    $collected[$key]['quantity'] = $collected[$key]['quantity'] + $item->quantity;
                }
                else
                {
                    $collected[$key] = [
                        'article_code' => $item->article->code,
                        'article_name' => $item->article_name,
                        'talle' => $item->size,
                        'color' => $item->color,
                        'tela' => $item->textile,
                        'quantity' => $item->quantity,
                        'price' => $item->final_price,
                        'brand' => $item->article->brand->name
                    ]; 
                }
            }
        }
        
        // From Helpers
        sort_array_of_array($collected, 'article_name');
        // dd($collected);
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
        $payment_methods = Payment::orderBy('name', 'ASC')->pluck('name', 'id');
        $sellers = User::pluck('name', 'id');

        return view('vadmin.orders.create')
            ->with('sellers', $sellers)
            ->with('shippings', $shippings)
            ->with('payment_methods', $payment_methods);
    }
    
    public function store(Request $request)
    {   
        // dd($request->all());
        if($request->payment_method_id == null || $request->shipping_id == null)
            return back()->with('message', 'Debe ingresar método de pago y envío');

        // Store Cart
        $cart = new Cart();
        $cart->status = 'Approved';
        
        //Set Payment Method
        $cart->payment_method_id = $request->payment_method_id;
        $payment_percent = Payment::where('id', $request->payment_method_id)->first()->percent;
        $cart->payment_percent = $payment_percent;
 
        // Set Shipping Method
        $cart->shipping_id = $request->shipping_id;
        $shipping_price = Shipping::where('id', $request->shipping_id)->first()->price;
        $cart->shipping_price = $shipping_price;

        $cart->customer_id = $request->customer_id;
        
        $cart->save();
        $cart_id = $cart->id;

        
        foreach($request->item as $item)
        {
            // $cartItem = new CartItem();
            // $cartItem->cart_id = $cart_id;
            // $cartItem->article_id = $item['id'];
            // $cartItem->quantity = $item['quantity'];
            // $cartItem->final_price = $item['final_price'];
            // $article = CatalogArticle::where('id', $item['id'])->first();
            // $cartItem->article_name = $article->name;
            // $cartItem->color = $article->color;
            
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

            // $article = CatalogArticle::where('id', $item['id'])->first();
            // $cartItem->article_name = $article->name;
            // dd($cartItem);
            $cartItem->save();   
            $this->updateVariantStock($item['variant_id'], -$item['quantity']); 
        }

        
        return redirect()->route('orders.index', ['status' => 'Approved'])->with('message','Pedido cargado exitosamente');
    }

    /*
    |--------------------------------------------------------------------------
    | UPDATE
    |--------------------------------------------------------------------------
    */

    public function edit($id)
    {
        $order = Cart::find($id);
        return view('vadmin.orders.edit')->with('order', $order);
    }

    public function update(Request $request, $id)
    {
        $category = Category::find($id);

        $this->validate($request,[
            'name' => 'required|min:4|max:250|unique:categories,name,'.$category->id,
        ],[
            'name.required' => 'Debe ingresar un nombre a la categoría',
            'name.unique'   => 'La categoría ya existe'
        ]);
        
        $category->fill($request->all());
        $category->save();

        return redirect()->route('categories.index')->with('message','Categoría editada');
    } 

}