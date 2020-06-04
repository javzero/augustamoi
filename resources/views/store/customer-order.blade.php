@extends('store.partials.main')

@section('content')
    {{-- @if(Auth::guard('customer')->check())
    <div class="CheckoutCart checkout-cart checkout-cart-floating">
        @include('store.partials.checkout-cart')
    </div>
    @endif --}}
    <div class="container padding-bottom-3x mb-2 marg-top-25">
        <div class="row">
            <div class="container white-container padding-bottom-3x mb-1">
                <h2 class="customer-account-title">Pedido N° {{ $cart['cart']->id }}</h2>
                Estado:  {{ orderStatusTrd($cart['cart']->status) }}
                <!-- Shopping Cart-->
                <div class="table-responsive shopping-cart">
                    <table class="table">
                        <thead>
                            <tr>
                                <th>Detalle</th>
                                <th class="text-center">P.U.</th>
                                <th class="text-center">Cantidad</th>
                                <th class="text-right">Subtotal</th>
                            </tr>
                        </thead>
                        <tbody>
                        
                        {{--  Calc  Order Total Value  --}}
                            @foreach($cart['cart']->items as $item)
                                <tr id="Detail{{$item->id}}">
                                    <td>
                                        <div class="product-item"><a class="product-thumb" href="{{ url('tienda/articulo/'.$item->article->id) }}">
                                            <img class="CheckCatalogImg" src="{{ asset($item->article->featuredImageName() ) }}" alt="{{ $item->name }}"></a>
                                            <div class="product-info">
                                                <h4 class="product-title"><a href="{{ url('tienda/articulo/'.$item->article->id) }}">{{ $item->article->name }}</a></h4>
                                                <span><b>Código:</b> #{{ $item->article->code }}</span>
                                                <span><b>Categoría:</b> {{ $item->article->category->name}}</span>
                                                <span><b>Tela:</b> {{ $item->article->textile }}</span>
                                                <span><b>Color:</b> {{ $item->article->color }}</span>
                                                <span><b>Talle:</b> 
                                                    @if($item->article->atribute1) 
                                                        @foreach($item->article->atribute1 as $size)
                                                            {{ $size->name }}
                                                        @endforeach
                                                    @endif
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td class="text-center">{{ $item->final_price }}</td>
                                    <td class="text-center">{{ $item->quantity }}</td>
                                    <td class="text-right">{{ number_format($item->final_price * $item->quantity, 2) }}</td>
                                </tr>
                            @endforeach
                            <tr>
                                <td></td><td></td>
                                <td><b>SubTotal: </b></td>
                                <td class="text-right">$ {{ $cart['subTotal'] }} </td>
                            </tr>   

                            <tr>
                                <td></td>
                                <td>Método de envío</td>
                                <td>{{ $cart['cart']->shipping->name }}</td>
                                <td class="text-right">$ {{ $cart['shippingCost'] }}</td>
                            </tr>

                              {{-- Payment Method --}}
                            @if($cart['cart']->payment) != null)
                                <tr>
                                    <td></td>
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
                                    <td class="text-right">
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
                                    <td></td>
                                    <td>
                                        Cupón de Descuento
                                    </td>
                                    <td>
                                        <span class="dont-break">
                                            - % {{ $cart['couponDiscount'] }}
                                        </span>
                                    </td>
                                    <td class="text-right">- $ {{ $cart['couponDiscountValue'] }}</td>
                                </tr>
                            @endif
                        
                            <tr>
                                <td></td><td></td>
                                <td><b>TOTAL:</b></td>
                                <td  class="text-right"><h3>$ {{ $cart['total'] }}</h3></td>
                            </tr> 

                        </tbody>
                    </table>
                </div>
                <div class="shopping-cart-footer">
                    <div class="column">
                        <a class="btn btn-outline-secondary" href="{{ route('store') }}"><i class="icon-arrow-left"></i>&nbsp;Volver a la tienda</a>
                    </div>
                    <div class="column">
                        <a class="btn btn-primary" href="{{ url('tienda/descargar-comprobante', [$cart['cart']->id, 'download']) }}" target="_blank"><i class="fas fa-download"></i> Descargar Comprobante</a>
                        <a class="btn btn-primary" href="{{ url('tienda/descargar-comprobante', [$cart['cart']->id, 'stream']) }}" target="_blank"><i class="fas fa-file-pdf"></i> Ver Comprobante</a>
                    </div>
                </div>
            </div>
		</div>
		<div id="Error"></div>
    </div>

@endsection

@section('scripts')
	@include('store.components.bladejs')
@endsection