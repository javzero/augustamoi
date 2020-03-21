<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Customer;
use App\Cart;
use Carbon\Carbon;
use PDF;

//1)Ventas en $ y en unidades de todas las marcas x mes. ✓
//2)Cantidad de pedidos cerrados mes a mes. ✓
//3)Cantidad de clientes distintos que compran x mes. 
//4)Cantidad de registros x mes ✓
//5)saber cuál es el día de la semana que más pedidos se hacen y el que menos se hacen.

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
        // if(!$request->period)
        //     $period = 3;
        // else 
        //     $period = $request->period;
        
        // $salesByPeriod = $this->salesByPeriod($period);

        // return view('vadmin.tools.stats')
        //     ->with('salesByPeriod', $salesByPeriod);
    }

    public function statsSalesByPeriod(Request $request)
    {
        // Period is the amount of months to the past
        if(!$request->period)
            $period = 1;
        else 
            $period = $request->period;
        
        $salesByPeriod = $this->salesByPeriod($period);
        
        return view('vadmin.tools.statsSalesByPeriod')
            ->with('salesByPeriod', $salesByPeriod);
    }

    public function salesByPeriod($period)
    {
        // $executionStartTime = microtime(true);
        if($period == '*')
        {
            $carts = Cart::where('status', 'Finished')->orderBy('created_at', 'DESC')->get();
        }
        else
        {
            $carts = Cart::where('status', 'Finished')->where('created_at', '>', (new \Carbon\Carbon)->submonths($period))->orderBy('created_at', 'DESC')->get();
        }

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
                    $data[$itemDate][$itemBrand]['cost'] = ($item->final_cost * $item->quantity);
                }
                else
                {
                    $data[$itemDate][$itemBrand]['items'] += $item->quantity;
                    $data[$itemDate][$itemBrand]['amount'] += ($item->final_price * $item->quantity);
                    $data[$itemDate][$itemBrand]['cost'] += ($item->final_cost * $item->quantity);
                }
            }
        }
        
        // $executionEndTime = microtime(true);
        // $seconds = $executionEndTime - $executionStartTime;
        $seconds = 0;
        return array(['data' => $data, 'exec_time' => $seconds]);    
    }

    public function exportStatsSalesByPeriod($period)
    {
        $salesByPeriod = $this->salesByPeriod($period);
        
        // dd($salesByPeriod[0]['data']);
        $data = collect($salesByPeriod[0]['data']);
        // dd($data);

        $pdf = PDF::loadView('vadmin.tools.export-stats', array('data' => $data));
        $pdf->setPaper('A4', 'portrait');
        
        if($period == '*')
            $filename = 'Ventas-de-los-últimos-' . $period . '-meses';
        else
            $filename = 'Ventas-totales';
        
        return $pdf->download($filename.'.pdf');
    }

    public function customStats()
    {   
        return view('vadmin.tools.statsCustomStats');
    }

    public function getCustomStats(Request $request)
    {
        switch ($request->statsQueryName) {
            case 'customersPerMonth':
                $data = $this->registersPerMonth($request->statsQuery);
                break;
            case 'realCustomers':
                $data = $this->realCustomers($request->statsQuery);
                break;
            default:
                $data = $this->noValidFeature();
                break;
        }

        return response()->json([
            'response' => 'success', 
            'data' => $data[0]['data'],
            'column_title1' => $data[0]['column_title1'], 
            'column_title2' => $data[0]['column_title2'],
            'message' => $data[0]['message'],
            'exec_time' => $data[0]['exec_time']
        ]);
    }

    public function realCustomers($query)
    {
        $customers = Customer::withCount([ 
            'carts as carts_count' => function ($query) {
                $query->where('status', 'Finished');
            }])->get();
        $data = [];
        
        foreach ($customers as $customer)
        {
            if($customer->carts_count >= $query)
                $data[$customer->name.' '.$customer->surname] = $customer->carts_count;
            // dd($customers[0]->name, $customers[0]->carts_count);
        }
        $execTime = 'Disabled';
        $message = '<b>Clientes con más de '. $query .' compras</b>';

        return array(['data' => $data, 'column_title1' => 'Cliente', 'column_title2' => 'Compras', 'message' => $message, 'exec_time' => $execTime]);
        
    }

    public function registersPerMonth($period)
    {
        $executionStartTime = microtime(true);

        if($period == 0)
        {
            $customers = Customer::select('id', 'created_at')
            ->orderBy('created_at', 'DESC')
            ->get()
            ->groupBy(function($date) {
                //return Carbon::parse($date->created_at)->format('Y'); // grouping by years
                return Carbon::parse($date->created_at)->format('m/Y'); // grouping by months
            });
        }
        else
        {
            $customers = Customer::select('id', 'created_at')
                ->orderBy('created_at', 'DESC')
                ->where('created_at', '>', (new \Carbon\Carbon)->submonths($period))
                ->get()
                ->groupBy(function($date) {
                    //return Carbon::parse($date->created_at)->format('Y'); // grouping by years
                    return Carbon::parse($date->created_at)->format('m/Y'); // grouping by months
                });
        }

        $data = [];

        foreach ($customers as $key => $value) {
            $data[$key] = count($value);
        }

        $executionEndTime = microtime(true);
        $execTime = $executionEndTime - $executionStartTime;
        
        if($period == 0)
            $message = '<b>Clientes registrados</b>';
        elseif($period == 1)
            $message = '<b>Clientes registrados en el mes actual</b>';
        else
            $message = '<b>Clientes registrados en los últimos '. $period .' meses</b>';

        return array(['data' => $data,  'column_title1' => 'Fecha', 'column_title2' => 'Clientes Registrados', 'message' => $message, 'exec_time' => $execTime]);
    }

        
    public function noValidFeature()
    {
        return response()->json([
            'response' => 'error', 
            'message' => 'No seleccionó una función válida',
            'data' => '',
            'exec_time' => ''
        ]);
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

}