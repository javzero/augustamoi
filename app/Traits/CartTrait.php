<?php
 
namespace App\Traits;
use App\Cart;
use App\CatalogArticle;
use App\CatalogVariant;
use App\CatalogFav;
use App\Settings;
use Log;

trait CartTrait {
    
    protected $settings;

    public function __construct()
    {
        $this->settings = Settings::find(1);
    }

    // Calc Cart Fixed Prices
    // ----------------------------------------------------------
    public function calcCartData($cart)
    {
        $cartSubTotal = '0';
        
        if($cart == null || $cart == '')
            return false;
            // Sum Prices (Fixed)
        foreach($cart->items as $key => $item)
        {
            // if($item->article != null && $item->article->status == 1)
            $cartSubTotal += $item->final_price * $item->quantity;
            // else
            //     unset($cart->items[$key]);
        }

        $cartValues = $this->cartValues($cartSubTotal, $cart->payment_charge, $cart->payment_discount, $cart->shipping_price, $cart->coupon_discount);
        
        $cart = array
                (
                    "cart"                 => $cart, 
                    "totalItems"           => $cart->items->count(),
                    "subTotal"             => $cartValues['subTotal'], 
                    "paymentCharge"        => $cart->payment_charge,
                    "paymentChargeValue"   => $cartValues['paymentChargeValue'],
                    "paymentDiscount"      => $cart->payment_discount,
                    "paymentDiscountValue" => $cartValues['paymentDiscountValue'],
                    "couponDiscount"       => $cart->coupon_discount,
                    "couponDiscountValue"  => $cartValues['couponDiscountValue'],
                    "shippingCost"         => $cart->shipping_price,
                    "total"                => $cartValues['total']
                );
            // dd($cart)
        return $cart;

    }

    // Return ActiveCart
    // ----------------------------------------------------------
    public function activeCart()
    {
        $cartTotal = 0;
        $cartSubTotal = 0;
        $orderCharge = 0;
        $orderDiscount = 0;
        $couponDiscount = 0;
        $shipping_price = 0;
        $activeCart = null;
        $minQuantity = $this->settings->reseller_min;
        $minMoney = $this->settings->reseller_money_min;

        if(auth()->guard('customer')->check())
        {
            $cart = Cart::where('status', '=', 'Active')->where('customer_id', auth()->guard('customer')->user()->id)->first();
            if($cart != null) 
            {
                $cartSubTotal = $this->calcSubtotal($cart->items, auth()->guard('customer')->user()->group);
                
                if($cart->payment_discount != 0)
                {
                    $orderDiscount = calcPercent($cartSubTotal, $cart->payment_discount);
                } 
                elseif($cart->payment_charge != 0) 
                {
                    $orderCharge = calcPercent($cartSubTotal, $cart->payment_charge);
                }

                if($cart->coupon_discount != 0 && $cart->coupon_discount != null)
                    $couponDiscount = $cart->coupon_discount;

                $cartValues = $this->cartValues($cartSubTotal, $cart->payment_charge, $cart->payment_discount, $cart->shipping_price, $couponDiscount);

                $totalItems = '0';

                // Count items and unset if item was eliminated
                foreach($cart->items as $key => $item)
                {
                    if($item->article != null && $item->article->status == 1)
                        $totalItems += $item->quantity;
                    else
                        unset($cart->items[$key]);
                }
                
                $minQuantityNeeded = false;
                $minMoneyNeeded = false;
                // dd($this->settings->reseller_money_min);
                if($this->settings->reseller_min > 0 && $totalItems < $this->settings->reseller_min)
                    $minQuantityNeeded = true;

                if($this->settings->reseller_money_min > 0 && $cartValues['total'] < $this->settings->reseller_money_min)
                    $minMoneyNeeded = true;

                $goalQuantity = $minQuantity - $totalItems;
                
                $activeCart = array
                (
                    "cart" => $cart,
                    "shippingId" => $cart->shipping_id,
                    "shippingPrice" => $cart->shipping_price,
                    "paymentId" =>$cart->payment_method_id,
                    "paymentCharge" => $cart->payment_charge,
                    "paymentDiscount" => $cart->payment_discount,
                    "paymentDiscountValue" => $cartValues['paymentDiscountValue'],
                    "paymentChargeValue" => $cartValues['paymentChargeValue'],
                    "couponDiscount" => $cart->coupon_discount,
                    "couponDiscountValue" => $cartValues['couponDiscountValue'], 
                    "cartSubTotal" => $cartSubTotal,
                    "cartTotal" =>  $cartValues['total'],
                    'totalItems' => $totalItems,
                    'goalQuantity' => $goalQuantity,
                    'minQuantityNeeded' => $minQuantityNeeded,
                    'minMoneyNeeded' => $minMoneyNeeded
                );
            }
        } 
        return $activeCart;
    }

    public function cartValues($subTotal, $charge = 0, $discount = 0, $shippingPrice = 0, $couponDiscount = 0)
    {
        $total = 
            $subTotal
            + calcPercent($subTotal, $charge) // Order Charge
            - calcPercent($subTotal, $discount) // Order discount
            + $shippingPrice // Shipping
            - calcPercent($subTotal, $couponDiscount); // Coupon discount

            // array(number_format((float)$foo, 2, '.', '');
        $values = array(
            "subTotal"             => $subTotal,
            "paymentChargeValue"   => calcPercent($subTotal, $charge),
            "paymentDiscountValue" => calcPercent($subTotal, $discount),
            "shippingPrice"        => $shippingPrice,
            "couponDiscountValue"  => calcPercent($subTotal, $couponDiscount),
            "total"                => $total

        );
        
        return $values;

    }

    // Cacl Subtotal
    // ----------------------------------------------------------
    public function calcSubtotal($items, $group)
    {
        $result = '0';
        if($group == '3')
        {
            foreach($items as $item) 
            {
                if($item->article != null)
                {
                    if($item->article->reseller_discount > '0')
                    {
                        $result += calcValuePercentNeg($item->article->reseller_price, $item->article->reseller_discount) * $item->quantity;
                    } 
                    else 
                    {
                        $result += $item->article->reseller_price * $item->quantity;
                    }
                    $result += 0;
                }
            }
        } 
        else 
        {
            foreach($items as $item) 
            {
                if($item->article != null)
                {
                    if($item->article->discount > '0')
                    {
                        $result += calcValuePercentNeg($item->article->price, $item->article->discount) * $item->quantity;
                    } 
                    else 
                    {
                        $result += $item->article->price * $item->quantity;
                    }
                    $result += 0;
                }
            }
        }
        return $result;
    }

    public function calcArticlePrice($price, $discount)
    {
        $result = $price + 0;
        
        if($discount > 0)
        {
            $percent = $price * $discount / 100;
            $result =  $price - $discount;
            $result = convertAndRoundDecimal($result, 2);
        }
        
        return $result;
    }

    // Stock Update
    // ----------------------------------------------------------
    public function updateVariantStock($variantId, $quantity)
    {
        if($variantId == null || $variantId == '')
            return;

        try
        {
            $variant = CatalogVariant::where('id', $variantId)->first();
            $newStock = intval($variant->stock) + intval($quantity);
            $variant->stock = $newStock;
            $variant->save();
        } 
        catch(\Exception $e)
        {
            Log::info($e->getMessage());
            return $e->getMessage();
        }
        return $newStock;
    }


    public function updateCartItemStock($articleId, $quantity)
    {
        try
        {
            //CatalogArticle::where('id', $articleId)->update(['stock'=>$newStock]);
            $article = CatalogArticle::where('id', $articleId)->first();
            $newStock = intval($article->stock) + intval($quantity);
            $article->stock = $newStock;
            $article->save();
        } 
        catch(\Exception $e)
        {
            return $e->getMessage();
        }
        return $newStock;
    }

    public function replaceVariantStock($variantId, $newStock)
    {
        try
        {
            //CatalogArticle::where('id', $articleId)->update(['stock'=>$newStock]);
            $variant = CatalogVariant::where('id', $variantId)->first();
            $variant->stock = $newStock;
            $variant->save();
        } 
        catch(\Exception $e)
        {
            return dd($e);
        }
        return $newStock;
    }

    public function replaceCartItemStock($articleId, $newStock)
    {
        try
        {
            //CatalogArticle::where('id', $articleId)->update(['stock'=>$newStock]);
            $article = CatalogArticle::where('id', $articleId)->first();
            $article->stock = $newStock;
            $article->save();
        } 
        catch(\Exception $e)
        {
            return dd($e);
        }
        return $newStock;
    }


    // Favs
    // ----------------------------------------------------------
    public function getCustomerFavs()
    {
        if(auth()->guard('customer')->check()){
            $favs = CatalogFav::where('customer_id', '=', auth()->guard('customer')->user()->id)->get();
            
            $articleFavs = CatalogFav::where('customer_id', '=', auth()->guard('customer')->user()->id)->pluck('article_id');
            $articleFavs = $articleFavs->toArray();
        
            // Delete fav if product was removed and fav wasn't
            foreach($favs as $item){
                if(is_null($item->article)){
                    $item->delete();
                }
            }

        } else {
            $favs = null;
            $articleFavs = null;
        }   
        return array("articleFavs" => $articleFavs, "favs" => $favs);
    }

    
    public function manageOldCarts($ids, $action)
    {
        Log::info("Cantidad: " . count($ids). " | Acción: " . $action);
        $response = ' ';
        
        try 
        {
            if($ids == [])
                $response = 'No hay carros para manejar';
                
            $count = '0';
            foreach ($ids as $id) {
                $cart = Cart::find($id);
                Log::info("Cancelando carro n°" . $cart->id);
                if($action == 'delete')
                {
                    foreach($cart->items as $item)
                    {
                        $this->updateVariantStock($item->variant->id, $item->quantity);
                    }
                    
                    $cart->delete();
                    Log::info("Carro n°".$id." eliminado");
                    $count++;
                }
                else if($action == 'cancel')
                {
                    $cart->status = "Canceled";
                    try {
                        foreach($cart->items as $item)
                        {
                            if($item->variant != null)
                                $this->updateVariantStock($item->variant->id, $item->quantity);
                        }
                    } catch (\Exception $e) {
                        Log::info("Error: " . $e->getMessage());
                    }
                    $cart->save();
                    Log::info("Carro n°".$id." cancelado");
                    Log::info("-------------------");
                    $count++;
                }
            }
            $response = $count . " carros manejados";
        }  
        catch (\Exception $e)
        {
            $response = "Error: " . $e->getMessage();
        } 
        return $response;
    }

}
