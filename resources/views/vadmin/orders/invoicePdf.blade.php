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
                    <b>Nombre y Apellido:</b> {{ $order->customer->name }} {{ $order->customer->surname }}
                    <b>Usuario:</b> {{ $order->customer->username }} <br>
                    <b>Dirección: </b> @if($order->customer->address){{ $order->customer->address }} @endif
                     | @if($order->customer->geoprov)
                        {{ $order->customer->geoprov->name }} 
                     | @endif
                    @if($order->customer->geoloc)
                        {{ $order->customer->geoloc->name }} <br>
                    @endif
                    <b>Teléfonos: </b> {{ $order->customer->phone }} @if($order->customer->phone2) | {{ $order->customer->phone2 }} @endif<br>
                    <b>E-mail: </b> {{ $order->customer->email }} <br>
                </div>
                <table class="table">
                    <thead>
                        <tr>
                            <th>Cant.</th>
                            <th>Artículo</th>
                            <th>Talle | Color | Tela</th>
                            <th>P.U</th>
                            <th>Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        @php $itemSum = 0 @endphp
                        @foreach($order->items->sortBy('article_name') as $item)
                            @if($item->article != null)
                                @php $itemSum += $item->quantity; @endphp
                                <tr class="content">
                                    {{-- <td>#{{ $item->article->code }}</td> --}}
                                    <td>x {{ $item->quantity }}</td>
                                    <td>{{ $item->article->name }} (#{{ $item->article->code }})</td>
                                    <td>
                                        {{ $item->size }} @if($item->size != '') | @endif
                                        {{ $item->color }} @if($item->color != '') | @endif
                                        {{ $item->textile }} @if($item->textile != '') @endif
                                    </td>
                                    <td>$ {{ $item->final_price }}</td>
                                    <td class="txtR">$ {{ number_format($item->final_price * $item->quantity, 2) }}</td>
                                </tr>
                            @else
                                
                            @endif
                        @endforeach
                        <tr class="bottom-data">
                            <td>x {{ $itemSum }} Artículos</td>
                            <td></td><td></td>
                            <td>Subtotal</td>
                            <td  class="txtR">$ {{ number_format($cart['subTotal'], 2)  }}</td>
                        </tr>

                    {{-- Shipping --}}
                        <tr>
                            <td></td><td></td>
                            <td>Método de envío</td>
                            <td>{{ $cart['cart']->shipping->name }}</td>
                            <td class="txtR">$ {{ $cart['shippingCost'] }}</td>
                        </tr>
                        
                    {{-- Payment Method --}}
			        @if($cart['cart']->payment) != null)
                        <tr>
                            <td></td><td></td>
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
                                        - $ {{ number_format($cart['paymentDiscountValue'], 2) }}
                                    @endif
                                </span>
                            </td>
                        </tr>
			        @endif
                    {{-- Coupon discount --}}
                    @if($cart['couponDiscount'] > 0)
                        <tr>
                            <td></td><td></td>
                            <td>
                                Cupón de Descuento
                            </td>
                            <td>
                                <span class="dont-break">
                                    % {{ $cart['couponDiscount'] }}
                                </span>
                            </td>
                            <td>- $ {{ $cart['couponDiscountValue'] }}</td>
                        </tr>
                    @else
                    sin cupon
                    @endif
                        <tr>
                            <td></td><td></td><td></td>
                            <td><b>TOTAL</b></td>
                            <td class="txtR"><b>$ {{ number_format($cart['total'],2) }}</b></td>
                        </tr>
                    </tbody>
                </table>
        </div>
    </div>
    <div class="footer">{{ APP_BUSSINESS_NAME }}</div>
@endsection
