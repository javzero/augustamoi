@extends('vadmin.partials.main')
@section('title')
    Vadmin | Pedido #{{ $order['cart']->id }}
@endsection

{{-- HEADER --}}
@section('header')

	@component('vadmin.components.header-list')
		@slot('breadcrums')
		    <li class="breadcrumb-item"><a href="{{ url('vadmin')}}">Inicio</a></li>
            <li class="breadcrumb-item"><a href="{{ route('orders.index')}}">Listado de pedidos</a></li>
            <li class="breadcrumb-item active">Pedido <b>#{{ $order['cart']->id }} </b></li>
		@endslot
		@slot('actions')
			{{-- Actions --}}
			<div class="list-actions">
                {{-- Edit --}}
				<button class="EditBtn btn btnGreen Hidden"><i class="icon-pencil2"></i> Editar</button>
				<input id="EditId" type="hidden">
				{{-- Delete --}}
				{{--  THIS VALUE MUST BE THE NAME OF THE SECTION CONTROLLER  --}}
				<input id="ModelName" type="hidden" value="cartitems">
				<button class="DeleteBtn btn btnRed Hidden"><i class="icon-bin2"></i> Eliminar</button>
				<input id="RowsToDeletion" type="hidden" name="rowstodeletion[]" value="">

			</div>
		@endslot
		@slot('searcher')
			@include('vadmin.catalog.payments.searcher')
		@endslot
	@endcomponent
@endsection

{{-- CONTENT --}}
@section('content')
    <div class="row">
        @component('vadmin.components.list')
            @slot('title')
            Pedido #{{ $order['cart']->id }}
                <span class="small"> | <b>Cliente: <a href="" data-toggle="modal" data-target="#CustomerDataModal"></b>
                    @if($order['cart']->customer->username == 'Nuevo Usuario' && $order['cart']->anon_name != null)

                        {{ $order['cart']->anon_name }} *
                    @else
                        {{ $order['cart']->customer->name }} {{ $order['cart']->customer->surname }}</a> 
                    @endif
                <p>
                    {{ transDateT($order['cart']->created_at) }}</span>
                </p>
            @endslot
            @slot('actions')
            
            @if($order['cart']->status != 'Active')
            <a class="icon-container green" href="{{ url('vadmin/exportOrderCsv', [$order['cart']->id]) }}" data-toggle="tooltip" title="Exportar .XLS" target="_blank">
                <i class="fas fa-file-excel"></i></a>
            <a class="icon-container blue" href="{{ url('vadmin/exportOrderXls', [$order['cart']->id]) }}" data-toggle="tooltip" title="Exportar .CSV" target="_blank">
                <i class="fas fa-file-excel"></i></a>
            <a class="icon-container red" href="{{ url('vadmin/descargar-comprobante', [$order['cart']->id, 'download']) }}" data-toggle="tooltip" title="Exportar .PDF" target="_blank">
                <i class="fas fa-file-pdf"></i></a>
            <a class="icon-container black" href="{{ url('vadmin/descargar-comprobante', [$order['cart']->id, 'stream']) }}" data-toggle="tooltip" title="Ver PDF online" target="_blank">
                <i class="fas fa-eye"></i></a>
            @endif
            @endslot
            @slot('tableTitles')
                <th>Cantidad</th>
                <th>Artículo</th>
                <th>Talle/Color</th>
                <th>Tela</th>
                <th>Marca</th>
                <th>P.U.</th>
                <th>Total</th>
            @endslot
            @slot('tableContent')
                @php $itemSum = 0 @endphp
                {{-- @foreach($order->items->sortBy('name') as $item) --}}
                @foreach($order['cart']->items->sortBy('article_name') as $item)
                    @php $itemSum += $item->quantity; @endphp
                    <tr>
                        <td>x {{ $item->quantity }}</td>
                        {{-- <td class="w-50">
                            <label class="custom-control custom-checkbox list-checkbox">
                                <input type="checkbox" class="List-Checkbox custom-control-input row-checkbox" data-id="{{ $item->id }}">
                                <span class="custom-control-indicator"></span>
                                <span class="custom-control-description"></span>
                            </label>
                        </td> --}}
                        <td><a style="color: #967adc">{{ $item->article_name }}
                            @if($item->article != null) (#{{ $item->article->code }}) 
                            @else 
                            (Discontinuado)
                            @endif </a></td>
                        {{-- Size | Color | Textile --}}
                        <td>
                            @if($item->variant)
                                {{ $item->variant->combination }}   
                            @else
                                Sin Variante
                            @endif
                        </td>
                        <td>
                            {{ $item->textile }} 
                            {{-- {{ $item->color }} @if($item->color != '') | @endif 
                            {{ $item->size}} | --}}
                        </td>
                        <td>
                            @if($item->article->brand) {{ $item->article->brand->name }} @else Sin Marca @endif</td>
                        {{-- Unit Price --}}
                        @if($order['cart']->status != 'Active')
                            {{-- FIXED PRICES | ORDER READY --}}
                            <td>$ {{ $item->final_price }}</td>
                            <td>$ {{ number_format($item->quantity * $item->final_price, 2) }}</td>
                        @else
                        {{-- DYNAMIC PRICES | ACTIVE CART --}}
                        <td>
                            @if($item->article != null)
                                @if($order['cart']->customer->group == '3')
                                    {{-- Reseller Prices --}}
                                    @if($item->article->discount > 0)
                                        $ {{ $price = calcValuePercentNeg($item->article->reseller_price, $item->article->reseller_discount) + 0 }}
                                    @else
                                        $ {{ $price = $item->article->reseller_price + 0 }}
                                    @endif
                                @else
                                    {{-- Standard Prices --}}
                                    @if($item->article->discount > 0)
                                        $ {{ $price = calcValuePercentNeg($item->article->price, $item->article->discount) + 0 }}
                                    @else
                                        $ {{ $price = $item->article->price + 0 }}
                                    @endif
                                @endif
                            </td>
                            <td >$ {{ $item->quantity * $price + 0 }}</td>
                            @else
                                -</td>
                                <td>-</td>
                            @endif
                        @endif
                    </tr>
                @endforeach

                {{-- IF CUSTOMER ORDER IS CONFIRMED/CLOSED --}}
                @if($order['cart']->status != 'Active')

                    <tr style="border-top: 10px solid #f9f9f9">
                        <td><b>x {{ $itemSum }} @if($itemSum == 1) Artículo @else Artículos @endif</b></td>
                        <td></td><td></td><td></td><td></td><td></td><td></td>
                    </tr>

	                {{-- FIXED PRICES | ORDER READY --}}
                    <tr style="border-top: 10px solid #f9f9f9">
                        <td></td><td></td><td></td><td></td><td></td>
                        <td><b>SUBTOTAL</b></td>

                        <td><b>$ {{ $order['subTotal'] }}</b></td>
                    </tr>

                    <tr>
			            <td></td><td></td><td></td><td></td><td></td>
                        @if($order['cart']->shipping_id && $order['cart']->shipping)
                            <td><b>Envío:</b> {{ $order['cart']->shipping->name }}</td>
                            <td>$ {{ number_format($order['shippingCost'], 2) }}</td>
                        @else
                            <td>Envío no seleccionado</td>
                            <td>-</td>
                        @endif
                    </tr>

                    <tr>
                        <td></td><td></td><td></td><td></td><td></td>
                        
                        @if($order['cart']->payment_method_id && $order['cart']->payment)
                            <td><b>Forma de Pago:</b> {{ $order['cart']->payment->name }}
                                @if($order['paymentDiscountValue'] != 0)
                                    (%{{$order['cart']->payment_discount}})
                                    <td>- $ {{ $order['paymentDiscountValue'] }}</td>
                                
                                @elseif($order['paymentChargeValue'] != 0)
                                    (%{{$order['cart']->payment_charge}})</td>
                                    <td>$ {{ $order['paymentChargeValue'] }}</td>
                                @endif
                            </td>
                        @else
                            <td>Forma de pago no seleccionada</td>
                            <td>-</td>
                        @endif
                    </tr>
                    @if($order['couponDiscount'] != '0')
                        <tr>
                            <td></td><td></td><td></td><td></td><td></td>
                            <td><b>Cupón de Descuento: </b> <span class="dont-break">% {{ $order['couponDiscount'] }}</span></td>
                            <td>- $  {{ $order['couponDiscountValue'] }}</td>
                        </tr>
                    @endif

                    <tr>
                        <td></td><td></td><td></td><td></td><td></td>
                        <td><b>TOTAL</b></td>
                        <td><b>$ {{ $order['total'] }}</b></td>
                    </tr>
                    
                {{-- IF CUSTOMER ORDER IS NOT CONFIRMED YET --}}
                {{-- DYNAMIC PRICES | ACTIVE CART --}}
                @else
                    {{-- Subtotal --}}
                    <tr>
                        <td></td><td></td><td></td><td></td><td></td>
                        <td>SubTotal: </td>
                        <td>-</td>
                    </tr>
                    {{-- Coupón Discount --}}
                    @if($order['couponDiscount'] != '0')
                    <tr>
                        <td></td><td></td><td></td><td></td><td></td>
                        <td><b>Cupón de Descuento: </b> <span class="dont-break">% {{ $order['couponDiscount'] }}</span></td>
                        <td>$ - {{ $order['couponDiscountValue'] }}</td>
                    </tr>
                    @endif
                    {{-- Shipping Method --}}

                    <tr>
                        <td></td><td></td><td></td><td></td><td></td>
                        @if($order['cart']->shipping_id != null)    
                            <td>
                                {{ $order['cart']->shipping->name }} 
                                @if($order['cart']->shipping->price != 0)
                                    {{-- (${{ $order['cart']->shipping->price }}) --}}
                                @endif
                            </td>
                            <td>
                                @if($order['cart']->shipping->price != 0)
                                    $ {{ number_format($order['cart']->shipping->price, 2) }}
                                @else
                                    $ 0.00
                                @endif
                            </td>
                        @else
                            <td>Envío no seleccionado</td>
                            <td>-</td>
                        @endif
                    </tr>
                    {{-- Payment Method --}}
                    {{-- {{ dd($order)}} --}}
                    <tr>
                        <td></td><td></td><td></td><td></td><td></td>
                        @if($order['cart']->payment_method_id != null)    
                            <td>{{ $order['cart']->payment->name }} 
                                    (% 
                                @if( $order['cart']->payment->discount != 0 )
                                    {{ $order['cart']->payment->discount }}
                                @elseif( $order['cart']->payment->charge != 0 )
                                    {{ $order['cart']->payment->charge }}
                                @endif
                                    )
                            </td>
                            <td>
                                @if( $order['paymentDiscountValue'] != 0 )
                                    - $ {{ $order['paymentDiscountValue'] }}
                                @elseif( $order['paymentChargeValue'] != 0 )
                                    $ {{ $order['paymentChargeValue'] }}
                                @endif
                            </td>
                        @else
                            <td>Forma de pago no seleccionada</td>
                            <td>-</td>
                        @endif
                    </tr>
                    <tr>
                        <td></td><td></td><td></td><td></td><td></td>
                        <td><b>TOTAL:</b> </td>
                        <td>Esperando confirmación</td>
                    </tr>
                @endif
                
            @endslot
        @endcomponent
    </div>
    <!-- Customer data modal -->
    <div class="modal fade" id="CustomerDataModal" tabindex="-1" role="dialog" aria-labelledby="CustomerDataModal">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                    <h4 class="modal-title" id="myModalLabel">Cliente: {{ $customer->name }} {{ $customer->surname }}</h4>
                </div>
                <div class="modal-body">
                    <b>Nombre de Usuario:</b> {{ $customer->username }} <br>
                    <b>E-Mail:</b> {{ $customer->email }} <br>
                    <b>Dirección:</b> {{ $customer->address }} <br>
                    <b>Provincia:</b> @if(!is_null($customer->geoprov)) 
                                        {{ $customer->geoprov->name }}
                                        @else
                                        <span class="text-danger">* Debe completar este dato</span>
                                        @endif <br>
                    <b>Localidad:</b> @if(!is_null($customer->geoloc)) 
                                        {{ $customer->geoloc->name }}
                                        @else
                                        <span class="text-danger">* Debe completar este dato</span>	
                                        @endif <br>
                    <b>C.P:</b> {{ $customer->cp }} <br>
                    <hr class="softhr">
                    <b>Teléfono:</b> {{ $customer->phone }} <br>
                    @if($customer->phone2)
                    <b>Teléfono 2:</b> {{ $customer->phone2 }}
                    @endif
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-default" data-dismiss="modal">Cerrar</button>
                </div>
            </div>
        </div>
    </div>
@endsection
