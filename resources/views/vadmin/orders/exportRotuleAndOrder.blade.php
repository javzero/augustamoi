@extends('store.partials.invoice-simple')

@section('title', 'Rótulos | Envíos')

@section('content')

    @foreach ($orders as $order)
    {{-- style="page-break-before: always" --}}
        <div class="invoice-simple" >
            <table class="table-header">
                <thead>
                    <tr>
                        <th style="border-right: 1px solid #000"> 
                            <h2>Pedido N°: {{ $order->id }} </h2>
                            <p>{{ transDateT($order->created_at) }}</p>    
                        </th>
                        <th style="border-right: 1px solid #000">
                            <h2>Total de Bultos: </h2>
                            <p>Seguro Mínimo</p>
                        </th>
                        <th style="border-left: 1px solid #000" class="brand">
                            <img src="./webimages/web/app-logo.png" alt="">
                        </th>
                    </tr>
                </thead>
            </table>
            <div class="content">

                <h1>DATOS DEL CLIENTE</h1>
                <p><b>Nombre y Apellido: </b> {{ $order->customer->name }} {{ $order->customer->surname }}</p>
                <p><b>Usuario: </b> {{ $order->customer->username }}</p>
                <p><b>Teléfonos: </b>{{ $order->customer->phone }} {{ $order->customer->phone1 }}</p>
                <p><b>EMail: </b>{{ $order->customer->email }}</p>
                <p><b>CUIT:  </b> @if($order->customer->cuit) {{ $order->customer->cuit }} @else - @endif  </p>
                <p><b>DNI:  </b> @if($order->customer->dni) {{ $order->customer->dni }} @else - @endif  </p>
                <p>
                    <b>Dirección: </b>{{ $order->customer->address }}
                     | @if($order->customer->geoprov)
                        {{ $order->customer->geoprov->name }} 
                     | @endif
                    @if($order->customer->geoloc)
                        {{ $order->customer->geoloc->name }} <br>
                    @endif
                    <b>C.P.:</b> {{ $order->customer->cp }}
                </p>
                <p><b>Método de pago: </b>{{ $order->payment->name }}</p>
                <p><b>Envío: </b>
                    @if($order->shipping)
                        {{ $order->shipping->name }}</p>
                    @else
                        Método de envío
                    @endif
                <br>
                <h1>OBSERVACIONES: </h1>
                @if($order->shipping_details == '' || $order->shipping_details == null)
                    <div style="height: 70px"></div>
                @else
                    <p style="padding-bottom: 20px"><b>{{ $order->shipping_details}}</b></p>
                @endif
            </div>
            <div class="footer">
                <h1>REMITENTE:</h1>
                <p><b>Nombre y Apellido: </b> Georgina Giorgi</p>
                <p><b>DNI: </b> 33.349.354</p>
                <p><b>Teléfonos: </b> 11-3321-2292</p>
                <p><b>Ciudad de Buenos Aires </b>
            </div>
        </div>
      

        <div class="invoice-ticket" style="page-break-before: always">
            <div class="ticket-header">
                <b>Comprobante de compra</b>  | Pedido N° <b>{{ $order->id }}</b>
                <div class="right">{{ transDateT($order->created_at) }}</div>
                <hr style="border: 0; border-top: 1px solid #ccc">
                <b>Nombre y Apellido:</b> 
                @if($order->customer->username == 'Nuevo Usuario')
                    {{ $order->anon_name }} *
                @else
                {{ $order->customer->name }} {{ $order->customer->surname }}
                <b>Usuario:</b> {{ $order->customer->username }} 
                @endif
                <br>
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
            <div class="content-ticket">
                <table class="table invoice-ticket-table">
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
                            <td  class="txtR">$ {{ number_format($order->cartData['subTotal'], 2)  }}</td>
                        </tr>
                    {{-- Shipping --}}
                        <tr>
                            <td></td><td></td>
                            <td>Método de envío</td>
                            <td>{{ $order->shipping->name }}</td>
                            
                            <td class="txtR">$ {{ $order->cartData['shippingCost'] }}</td>
                        </tr>
                        
                    {{-- Payment Method --}}

                    @if($order->cartData['cart']->payment != null)
                        <tr>
                            <td></td><td></td>
                            <td>Forma de pago</td>
                            <td>
                                <span class="dont-break" style="white-space: nowrap">
                                    {{ $order->cartData['cart']->payment->name }}
                                    @if($order->cartData['paymentCharge'] != 0 )
                                        ( % {{ $order->cartData['paymentCharge'] }} )
                                    @elseif($order->cartData['paymentDiscount'] != 0)
                                        ( - % {{ $order->cartData['paymentDiscount'] }} )
                                    @endif
                                </span>
                            </td>
                            <td class="txtR">
                                <span class="dont-break" style="white-space: nowrap">
                                    @if($order->cartData['paymentCharge'] != 0 )
                                        $ {{ number_format($order->cartData['paymentChargeValue'], 2) }} 
                                    @elseif($order->cartData['paymentDiscount'] != 0)
                                        - $ {{ number_format($order->cartData['paymentDiscountValue'], 2) }}
                                    @endif
                                </span>
                            </td>
                        </tr>
                    @endif
                    {{-- Coupon discount --}}
                    @if($order->cartData['couponDiscount'] > 0)
                        <tr>
                            <td></td><td></td>
                            <td>
                                Cupón de Descuento
                            </td>
                            <td>
                                <span class="dont-break">
                                    % {{ $order->cartData['couponDiscount'] }}
                                </span>
                            </td>
                            <td>- $ {{ $order->cartData['couponDiscountValue'] }}</td>
                        </tr>
                    @else
                    sin cupon
                    @endif
                        <tr>
                            <td></td><td></td><td></td>
                            <td><b>TOTAL</b></td>
                            <td class="txtR"><b>$ {{ number_format($order->cartData['total'],2) }}</b></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
          <div class="page-break"></div>
    @endforeach
    
@endsection
