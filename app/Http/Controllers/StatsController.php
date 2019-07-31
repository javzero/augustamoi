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

    // Esta querie sql me sirvio para checkear el total agrupado por mes de una columna
    // SELECT MONTH(created_at), SUM(final_price) FROM cart_items GROUP BY YEAR(created_at), MONTH(created_at)

    public function index(Request $request)
    {
        // Period is the amount of months to te past
        if(!$request->period)
            $period = 3;
        else 
            $period = $request->period;
        
        $salesByPeriod = $this->salesByPeriod($period);
        
        return view('vadmin.tools.stats')
            ->with('salesByPeriod', $salesByPeriod);
    }

    public function getChartData($period)
    {
        $result = $this->salesByPeriod($period);
        return response()->json($result);
    }
    
    public function salesByPeriod($period)
    {
        $carts = Cart::where('status', 'Finished')->where('created_at', '>', (new \Carbon\Carbon)->submonths($period))->orderBy('created_at', 'DESC')->get();
        $data = [];

        foreach ($carts as $cart) {
            foreach ($cart->items as $item)
            {                 
                if($item->article->brand)
                    $itemBrand = $item->article->brand->name;
                else
                    $itemBrand = 'Sin Marca';

                // $itemDate = $cart->created_at->toDateString(); Full Date string
                $itemDate = $cart->created_at->format('m/Y');

                if(!isset($data[$itemDate]))
                    $data[$itemDate] = [];

                if(!isset($data[$itemDate][$itemBrand]))
                {
                    $data[$itemDate][$itemBrand]['items'] = $item->quantity;
                    $data[$itemDate][$itemBrand]['amount'] = ($item->final_price * $item->quantity);
                }
                else
                {
                    $data[$itemDate][$itemBrand]['items'] += $item->quantity;
                    $data[$itemDate][$itemBrand]['amount'] += ($item->final_price * $item->quantity);
                }
            }
        }

        return $data;
    }

    public function statsCheck($brand, $period)
    {
        // $carts = Cart::where('created_at', '>', (new \Carbon\Carbon)->submonths($period))->where('status', 'Finished')->get();
        $carts = Cart::whereDate('created_at', '=', date('2019-07-01'))->where('status', 'Finished')->get();
        $data = [];

    
        foreach ($carts as $cart) {
            foreach ($cart->items as $item) {
                if($item->article->brand)
                    $itemBrand = $item->article->brand->name;
                else
                    $itemBrand = 'Sin Marca';

                $itemDate = $cart->created_at->format('d/m/y');

                if(!isset($data[$itemDate]))
                    $data[$itemDate] = [];
                $data[$itemDate][$itemBrand]['brand'] = $itemBrand;
                
                if(!isset($data[$itemDate][$itemBrand]['items']))
                    $data[$itemDate][$itemBrand]['items'] = $item->quantity;
                else
                    $data[$itemDate][$itemBrand]['items'] += $item->quantity;
                // $data = array_push($data, $itemBrand);

                // if(!isset($data[$itemDate][$itemBrand]))
                // {
                //     $data[$itemDate][$itemBrand]['items'] = $item->quantity;
                //     $data[$itemDate][$itemBrand]['amount'] = ($item->final_price * $item->quantity);
                // }
                // else
                // {
                //     $data[$itemDate][$itemBrand]['items'] += $item->quantity;
                //     $data[$itemDate][$itemBrand]['amount'] += ($item->final_price * $item->quantity);
                // }
            }
        }
        dd($data);
        return $data;
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