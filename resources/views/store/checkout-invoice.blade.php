@extends('store.partials.invoice')

@section('title', 'Comprobante | Pedido N°'.$order->id)


@section('content')
    <div class="invoice-ticket">
        <div class="header">
            <b>Comprobante de compra</b>  | Pedido N° <b>{{ $order->id }}</b>
            <div class="right">{{ transDateT($order->created_at) }}</div>
        </div>
        <div class="content">
            <div class="top-text">
                <b>Nombre y Apellido:</b> {{ $order->customer->name }} {{ $order->customer->surname }} | <b>Usuario:</b> {{ $order->customer->username }} <br>
                <b>Dirección: </b> {{ $order->customer->address }} | {{ $order->customer->geoprov->name }} | {{ $order->customer->geoloc->name }} <br>
                <b>Teléfonos: </b> {{ $order->customer->phone }} @if($order->customer->phone2) | {{ $order->customer->phone2 }} @endif<br>
                <b>E-mail: </b> {{ $order->customer->email }} <br>
            </div>
            <table class="table">
                <thead>
                    <tr>
                        <th>Código</th>
                        <th>Producto</th>
                        <th>Talle</th>
                        <th>Color</th>
                        <th>P.U | Cantidad</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    @foreach($order->items as $item)
                        @if($item->article != null)
                            <tr class="content">
                                <td>#{{ $item->article->code }}</td>
                                <td>{{ $item->article->name }}</td>
                                <td>{{ $item->size }}</td>
                                <td>{{ $item->color }}</td>
                                <td>$ {{ $item->final_price }} (x {{ $item->quantity }})</td>
                                <td class="txtR">$ {{ number_format($item->final_price * $item->quantity, 2) }}</td>
                            </tr>
                        @endif
                    @endforeach
                    <tr class="bottom-data">
                        <td></td><td></td><td></td><td></td>
                        <td>Subtotal</td>
                        <td class="txtR">$ {{ $cart['subTotal'] }}</td>
                    </tr>
                    
                    {{-- Shipping Method --}}
                     <tr>
                        <td></td><td></td><td></td>
                        <td>Método de envío</td>
                        <td>{{ $cart['cart']->shipping->name }}</td>
                        <td class="txtR">$ {{ $cart['shippingCost'] }}</td>
                    </tr>


                    {{-- Payment Method --}}
                    @if($cart['cart']->payment) != null)
                        <tr>
                            <td></td><td></td><td></td>
                            <td>Forma de pago</td>
                            <td>
                                <span class="dont-break" style="white-space: nowrap">
                                    {{ $cart['cart']->payment->name }}
                                    @if($cart['paymentCharge'] != 0 )
                                        ( % {{ $cart['paymentCharge'] }} )
                                    @elseif($cart['paymentDiscount'] != 0)
                                        ( - % {{ $cart['paymentDiscount'] }} )
                                    @endif
                                </span>
                            </td>
                            <td class="txtR">
                                <span class="dont-break" style="white-space: nowrap">
                                    @if($cart['paymentCharge'] != 0 )
                                        $ {{ number_format($cart['paymentChargeValue'], 2) }}
                                    @elseif($cart['paymentDiscount'] != 0)
                                        - $ {{ number_format($cart['paymentDiscountValue'], 2)}}
                                    @endif
                                </span>
                            </td>
                        </tr>
                    @endif
                        {{-- Coupon discount --}}
                    @if($cart['couponDiscount'] > 0)
                        <tr>
                            <td></td><td></td><td></td>
                            <td>
                                Cupón de Descuento
                            </td>
                            <td>
                                <span class="dont-break">
                                    - % {{ $cart['couponDiscount'] }}
                                </span>
                            </td>
                            <td class="txtR">- $ {{ $cart['couponDiscountValue'] }}</td>
                        </tr>
                    @endif
                        
                    <tr>
                        <td></td><td></td><td></td><td></td>
                        <td><b>TOTAL:</b></td>
                        <td class="txtR"><h3>$ {{ $cart['total'] }}</h3></td>
                    </tr> 
                </tbody>
            </table>
        </div>
    </div>
    <div class="footer">{{ APP_BUSSINESS_NAME }}</div>
@endsection
