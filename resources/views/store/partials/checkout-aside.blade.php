<aside class="checkout-sidebar">
    {{-- {{dd($activeCart)}} --}}
    <div class="hidden-lg-up"></div>
    <!-- Order Summary Widget-->
    <section class="widget-order-summary">
        <h3 class="widget-title">Resumen de Pedido</h3>
        <div class="top-info-cs"> Cantidad de items: <b>{{ $activeCart['totalItems'] }}</b></div>
        <input type="hidden" name="goalQuantity" value="{{ $activeCart['goalQuantity'] }}">
        <input type="hidden" name="cart_id" value="{{ $activeCart['cart']->id }}">
        <table class="table checkout-table">
        <tr>
            <td class="title">Subtotal:</td>
            <td class="text-medium text-right dont-break">$ {{ $activeCart['cartSubTotal'] }}</td>
        </tr>
        {{-- {{ $activeCart}} --}}
        <tr>
            <td>Costo de envío:</td>
            <td class="text-medium text-right dont-break">$ {{ $activeCart['shippingPrice'] }}</td>
        </tr>
         
        <tr>
            {{-- {{ dd($activeCart['orderDiscount'])}} --}}
            @if($activeCart['paymentCharge'] != 0)
                <td>Recargo por forma de pago: <br> (% {{ $activeCart['paymentCharge'] }}) </td>
                <td class="text-medium text-right dont-break">
                    $ {{ calcPercent($activeCart['cartSubTotal'], $activeCart['paymentCharge']) }}
                </td> 
            @elseif($activeCart['paymentDiscount'] != 0)
                <td>Descuento por forma de pago: <br> (% {{ $activeCart['paymentDiscount'] }}) </td>
                <td class="text-medium text-right dont-break">
                    - $ {{ number_format(calcPercent($activeCart['cartSubTotal'], $activeCart['paymentDiscount']), 2) }}
                </td> 
            @endif
        </tr>
        @if($activeCart['couponDiscount'] > 0)
            <tr>
                <td>Cupón de descuento (%{{$activeCart['couponDiscount']}}):</td>
                <td class="text-medium text-right dont-break">
                - $ {{  number_format(calcPercent($activeCart['cartSubTotal'], $activeCart['couponDiscount']),2) }}
                
            </tr>
        @endif
        <tr>
            <td></td>
            <td class="text-lg text-medium txtR dont-break"><span class="total">
            Total $ <b>{{ $activeCart['cartTotal'] }}</b></span></td>
        </tr>
        </table>
        <div class="text-right finish-checkout-btn">
            <button class="btn btn-main margin-right-none" type="submit"><i class="fas fa-check"></i> Finalizar Compra</button>
        </div>
        <button type="submit" class="btn btn-block btn-bottom mobile-finish-button main-btn">
            <i class="fas fa-check"></i> Finalizar Compra
        </button>
    </section>
</aside>