@extends('vadmin.partials.invoice-excel')

@section('content')
    <table>
    <tr>
        <th>Código</th>
        <th>Artículo</th>
        <th>Marca</th>
        <th>Talle - Color - Tela</th>
        <th>P.U.</th>
        <th>Cantidad</th>
        <th></th>
        <th>Total</th>
    </tr>
    @foreach($order['cart']->items as $item)
    @if($item->article != null)
        <tr>
            <td>{{ $item->article->code }}</td>
            <td><a href="">{{ $item->article->name }}</a></td>
            <td>{{ $item->article->brand->name }}</td>
            <td>{{ $item->size }} | {{ $item->color }} | {{ $item->textile }}</td>
            <td>$ {{ $item->final_price }}</td>
            <td>{{ $item->quantity }}</td>
            <td></td>
            <td >$ {{ number_format($item->quantity * $item->final_price,2) }}</td>
        </tr>
    @endif
    @endforeach
    <tr style="border-top: 10px solid #f9f9f9">
        <td></td><td></td><td></td><td></td><td></td>
        <td></td>
        <td><b>SUBTOTAL</b></td>
        <td><b>$ {{ $order['subTotal'] }}</b></td>
    </tr>
    {{-- Shipping --}}
    <tr>
        <td></td><td></td><td></td><td></td>
        @if($order['cart']->shipping_id != null)
            <td></td><td></td>
            <td><b>Método de Envío:</b> 
            @if($order['cart']->shipping)
                {{ $order['cart']->shipping->name }}
            @else
                Método de envío discontinuado.
            @endif    
            </td>
            <td>$ {{ $order['shippingCost'] }}</td>
        @else
            <td></td><td></td>
            <td>Envío no seleccionado</td>
            <td>-</td>
        @endif
    </tr>

    {{-- Payment Method --}}
    <tr>
        <td></td><td></td><td></td><td></td>
        @if($order['cart']->payment_method_id != null)
            @if($order['cart']->payment != null)
                <td></td><td></td>
                <td><b>Forma de pago:</b>
                    <span class="dont-break" style="white-space: nowrap">
                        {{ $order['cart']->payment->name }}
                        @if($order['paymentCharge'] != 0 )
                            ( % {{ $order['paymentCharge'] }} )
                        @elseif($order['paymentDiscount'] != 0)
                            ( - % {{ $order['paymentDiscount'] }} )
                        @endif 
                    </span>
                </td>
                <td class="txtR">
                    <span class="dont-break" style="white-space: nowrap">
                        @if($order['paymentCharge'] != 0 )
                            $ {{ number_format($order['paymentChargeValue'], 2) }} 
                        @elseif($order['paymentDiscount'] != 0)
                            - $ {{ number_format($order['paymentDiscountValue'], 2) }}
                        @endif
                    </span>
                </td>
            @else
                <td></td><td></td>
                <td>Método de pago discontinuado</td>
                <td>-</td>
            @endif
        @else
            <td></td><td></td>
            <td>Método de pago no seleccionado</td>
            <td>-</td>
        @endif
    </tr>
    @if($order['couponDiscount'] > 0)
        <tr>
            <td></td><td></td><td></td>
            <td>
                Cupón de Descuento
            </td>
            <td>
                <span class="dont-break">
                    % {{ $order['couponDiscount'] }}
                </span>
            </td>
            <td>- $ {{ $order['couponDiscountValue'] }}</td>
        </tr>
    @else
        sin cupon
    @endif
    <tr>
        <td></td><td></td><td></td><td></td>
        <td></td><td></td>
        <td><b>TOTAL</b></td>
        <td><b>$ {{ $order['total'] }}</b></td>
    </tr>                                
</table>
@endsection
