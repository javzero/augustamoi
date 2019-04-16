<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use DB;
use App\CatalogArticle;
use App\Customer;

class AutocompleteController extends Controller
{

    function index()
    {
        return view('autocomplete');
    }

    public function searchCustomer(Request $request)
    {
        $customers = Customer::where('id', 'LIKE', "%{$request->term}%")
            ->orWhere('name', 'LIKE', "%{$request->term}%")
            ->orWhere('surname', 'LIKE', "%{$request->term}%")
            ->orWhere('username', 'LIKE', "%{$request->term}%")
            ->limit(15)
            ->get();
        
        if(!$customers->isEmpty())
        {
            foreach($customers as $customer)
            {   
                $new_row['id'] = $customer->id;
                $new_row['name'] = $customer->name;
                $new_row['surname'] = $customer->surname;
                $new_row['username'] = $customer->username;
                if($customer->group == '3')
                {
                    $new_row['group'] = 'Mayorísta';
                }
                else
                {
                    $new_row['group'] = 'Minorísta';
                }
                
                $row_set[] = $new_row; //build an array
            }
        }
        else
        {
            $new_row['empty'] = "Sin Resultados";
            $row_set[] = $new_row;
        }
        echo json_encode($row_set); 
    }

    public function searchCatalogArticle(Request $request)
    {   
        // dd($request->all());
        
        $customer = Customer::find($request['customer']);
        if($customer == null)
        {
            echo json_encode("Error");
            die();
        }
        $customerGroup = $customer->group;
        
        $articles = CatalogArticle::where('name', 'LIKE', "%{$request['request']['term']}%")
            ->orWhere('code', 'LIKE', "%{$request['request']['term']}%")
            ->active()
            ->limit(15)
            ->get();
        
        $items = [];

        if(!$articles->isEmpty())
        {
            foreach($articles as $article)
            {
                if($article->variants)
                {
                    foreach($article->variants as $variant)
                    {
                        if($customerGroup == '3')
                        {
                            if($article->reseller_discount > 0)
                            {
                                $price = calcValuePercentNeg($article->reseller_price, $article->reseller_discount);
                            }
                            else
                            {
                                $price = $article->reseller_price;
                            }
                        }
                        else
                        {
                            if($article->reseller_discount > 0)
                            {
                                $price = calcValuePercentNeg($article->price, $article->discount);
                            }
                            else
                            {
                                $price = $article->price;
                            }
                        }
                        // $new_row['price'] = 0;

                        $items[$variant->combination] = [
                            'id' => $article->id,
                            'name' => $article->name,
                            'code' => $article->code,
                            'variant' => $variant->combination,
                            'variant_id' => $variant->id,
                            'variant_color' => $variant->color->name,
                            'variant_size' => $variant->size->name,
                            'textile' => $article->textile,
                            'stock' => $variant->stock,
                            'price' => $price
                        ];
                    }   
                }
            }
        }
        echo json_encode($items); 

    }

}
