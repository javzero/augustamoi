<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use App\CartDetail;

class Cart extends Model
{
    protected $table = "carts";

    protected $fillable = ['customer_id', 'status', 'shipping_id', 'shipping_price', 'payment_method_id', 
    'mp_preference_id', 'mp_collection_id', 'mp_payment_type', 'mp_merchant_order_id', 
    'payment_charge', 'payment_discount', 'coupon_discount',  
    'payment_token', 'payment_status', 'order_discount', 'anon_name', 'order_date', 'arrived_date'];

    public function items(){
    	return $this->hasMany('App\CartItem');
    }

    
    public function shipping()
    {
        return $this->belongsTo('App\Shipping');
    }
    
    public function payment()
    {
        return $this->belongsTo('App\Payment', 'payment_method_id');
    }
    
    public function customer()
    {
        return $this->belongsTo('App\Customer');
    }
    
    // Search Scopes 
    public function scopeSearchId($query, $id)
    {
        $query->where('id', '=', $id);
    }

    public function scopeSearchStatus($query, $status)
    {
        $query->where('status', '=', $status);
    }

    public function scopeSearch($query, $term)
    { 
        return $query->where('customer_id', 'LIKE', '%' . $term . '%')
        ->orWhereHas('customer', function ($query) use($term){
            $query->where('name', 'LIKE', '%' . $term . '%');
        })
        ->orWhereHas('customer', function ($query) use($term){
            $query->where('surname', 'LIKE', '%' . $term . '%');
        })
        ->orWhereHas('customer', function ($query) use($term){
            $query->where('username', 'LIKE', '%' . $term . '%');
        })
        ->orWhereHas('customer', function ($query) use($term){
            $query->where('email', 'LIKE', '%' . $term . '%');
        });
    }

}
