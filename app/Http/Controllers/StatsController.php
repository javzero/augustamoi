<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\CatalogArticle;
use App\Customer;
use App\Contact;
use App\Cart;
use Carbon\Carbon;
//use Mail;
//use App\Mail\SendMail;
//use App\Settings;

//1)Ventas en $ y en unidades de todas las marcas x mes.
//2)Cantidad de pedidos cerrados mes a mes.
//3)Cantidad de clientes distintos que compran x mes. 
//4)Cantidad de registros x mes
//5) saber cuál es el día de la semana que más pedidos se hacen y el que menos se hacen.

class StatsController extends Controller
{   
    public function __construct()
    {
        // $this->middleware('auth:user');
    }

    public function index(Request $request)
    {
        // dd($request->all());

        $now = Carbon::now();
        $month = $now->month;

        // $monthSales = $this->getSellsPerMonth($month);
        $totalSales = $this->totalSales();
        dd($totalSales);
        return view('vadmin.tools.stats')
            ->with('totalSales', $totalSales);
            // ->with('monthSales', $monthSales);
    }
    
    public function totalSales()
    {
        $carts = Cart::where('status', 'Finished')->get();
        $data = [];
        $message = [];
        foreach ($carts as $cart) {
            foreach ($cart->items as $item)
            {
                $m = 'CartId: '.$cart->id.': Quantity '. $item->quantity . ' - '.
                 'Amount: ' . ($item->final_price * $item->quantity);
                
                if(!isset($message[$cart->id]))
                {
                    $message[$cart->id]['items'] = $item->quantity;
                    $message[$cart->id]['amount'] = ($item->final_price * $item->quantity);
                    $message[$cart->id]['date'] = $cart->created_at->toDateString();
                }
                else
                {
                    $message[$cart->id]['items'] += $item->quantity;
                    $message[$cart->id]['amount'] += ($item->final_price * $item->quantity);
                    $message[$cart->id]['date'] = $cart->created_at->toDateString();
                }

                $itemDate = $cart->created_at->format('m').'/'.$cart->created_at->format('y');
                
                if(!isset($data[$itemDate]))
                {
                    $data[$itemDate]['amount'] = ($item->final_price * $item->quantity);
                    $data[$itemDate]['items'] = $item->quantity;
                }
                else   
                {
                    $data[$itemDate]['amount'] += ($item->final_price * $item->quantity);
                    $data[$itemDate]['items'] += $item->quantity;
                }
                
                $newAmount = ($item->final_price * $item->quantity);
                $newItem = $item->quantity;
           
                
                // dd('F price '. $item->final_price. ' x Quant' .  $item->quantity . ' = ' . $price);
                //$totalAmount +=  ($item->final_price * $item->quantity);
                //$totalItems += $item->quantity;
           
            }
        }
        $all = [];
        $all['1'] = $message;
        $all['2'] = $data;
        dd($all);

        dd($message);
        dd($data);

        // return array(['amount' => $totalAmount, 'items' => $totalItems]);
    }

    public function getSellsPerMonth($month)
    {
        // Sales Per Month
        $carts = Cart::where('status', 'Finished')->whereRaw('MONTH(created_at) = ?',[$month])->get();
        // Total Sales

        // dd($carts);
        
        
        
        // $value = Cart::where('status', 'Finished')
        //         ->whereBetween('created_at', [$init_date, $last_date])
        //         ->get;

        // $value;

        // $oneMonthData = $collection->where('created_at', '>', Carbon::parse($now->month)->startOfMonth())->where('created_at', '<', Carbon::parse($someDateString)->endOfMonth());

        $totalbuys = 0;
        foreach ($carts as $cart) {
            foreach($cart->items as $item)
            $price = ($item->final_price * $item->quantity);
            // dd('F price '. $item->final_price. ' x Quant' .  $item->quantity . ' = ' . $price);
            
            $totalbuys += $price;
        }
        // dd($totalbuys);

    }
}