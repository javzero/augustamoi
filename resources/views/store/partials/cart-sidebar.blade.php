<div class="CheckoutCart cart-sidebar">
    <div id="SideContainerItemsFixed" class="inner">
        <div class="close" onclick="checkoutSidebar('hide')">X</div>
        @if(isset($activeCart))
            <div class="top">
                <div class="title">
                    <i class="fas fa-shopping-cart"></i> Carro de Compras
                </div>
                {{-- <div class="top-actions"> --}}
                    {{-- <div class="text values"> 
                        Prendas: <b><span class="TotalCartItemsSidebar count">@if($activeCart['totalItems'] == 0) 0 @else {{ $activeCart['totalItems'] }} @endif </b>
                        <br>
                        Total: <b>$<span>{{ $activeCart['cartTotal'] }}</span></b>
                    </div> --}}
                {{-- </div> --}}
                <div class="action-button-top">
                    <a class="cart-continue" href="{{ route('store.checkout')}}">CONTINUAR</a>
                </div>
            </div>
            <div class="items">
            @foreach($activeCart['cart']->items as $item)
                
                @if($item->article != null)
                    <div id="Item{{ $item->id }}" class="item">
                        <img src="{{ asset($item->article->featuredImageName()) }}" alt="Product">
                        <div class="details-1">
                            <a href="{{ url('tienda/articulo/'.$item->article->id) }}">
                            @if(strlen($item->article->name) > 50)
                                {{ substr($item->article->name, 0, 50) }}...
                            @else
                                {{ $item->article->name }}
                            @endif
                            </a>
                        </div>
                        <div class="col-xs-12">
                            {{ $item->color }} / {{ $item->size }} 
                        </div>
                        <div class="details-2">
                            <div class="column-1 price">
                                {{-- PRICE --}}
                            @php($articlePrice = '0')
                            @if(Auth::guard('customer')->user()->group == '3')
                                @php($articlePrice = $item->article->reseller_price)
                                $ {{ showPrice($articlePrice, $item->article->reseller_discount) }}
                            @else
                                $ {{ showPrice($articlePrice, $item->article->discount) }}
                            @endif
                            </div>
                        </div>
                        <div class="input-with-btn quantity">
                           <div style="padding: 5px">x <b>{{ $item->quantity }}</b></div>

                            {{-- Disabled function --}}
                            {{-- Disabled function --}}
                            {{-- Esto va a StoreController@updateItemsQuantities  --}}
                            {{-- Y el JS pasa por resources\assets\js\store\scripts.js | submitCartToCheckout --}}
                            {{-- Send this data to JSON via js with .Item-Data class --}}
                            {{-- <input class="Item-Data small-input under-element" name="data" type="number"  
                            min="1" max="{{ $item->quantity + $item->variant->stock }}" value="{{ $item->quantity }}" required="" 
                            data-price="{{$articlePrice}}" data-id="{{ $item->id }}" data-variant="{{ $item->variant_id }}"
                             data-toggle="tooltip" data-placement="top" title="Stock máximo {{ $item->quantity + $item->variant->stock }}"> --}}
                        </div>
                        <div class="delete-item">
                            <a onclick="removeFromCart('{{ route('store.removeFromCart') }}', {{$item->id}}, {{ $item->variant_id }}, {{ $item->quantity }}, '#Item'+{{ $item->id }}, 'reload');">
                                <i class="far fa-trash-alt"></i>
                            </a>
                        </div>
                    </div>{{-- / .item --}}
                    <div class="item-divisor"></div>
                @endif
            @endforeach
        </div>
        {{-- <div class="update-btn"> --}}
            {{-- Disabled function --}}
            {{-- <button class="UpdateDataBtn block-btn-hollow"><i class="fas fa-sync"></i> Calcular nuevos totales</button> --}}
        {{-- </div> --}}
        <div class="row total-price-bottom">
            <div class="col-xs-6 col-md-6 text-left inner-text" class="">
                Prendas: <b><span class="TotalCartItemsSidebar count">@if($activeCart['totalItems'] == 0) 0 @else {{ $activeCart['totalItems'] }} @endif </b>
            </div>
            <div class="col-xs-6 col-md-6 text-rigth inner-text">
                Total: <b>$<span>{{ $activeCart['cartTotal'] }}</span></b>
            </div>
        </div>
        <div class="action-button-bottom">
            <a href="{{ route('store.checkout')}}" class="cart-continue">CONTINUAR</a>
        </div>
        <div class="cart-remaining-time">
            <div class="text-center">

               	@php($remainingTime = remainingTimeIHours(now(), sumHoursToDate($activeCart['cart']->created_at, 2), 'H:i:s'))
                @php($finalTime = explode(':', $remainingTime))
                
                Tu carro vence en <br>  
                <span id="CountDownTimer" data-remainingtime="{{ $remainingTime }}">
                    {{ $finalTime[0] * 1 }} hora  {{ $finalTime[1]  }} minutos</span>
                    
            </div>
        </div>
    @else
        <div class="empty-cart">
            El carro de compras <br> está vacío
        </div>
    @endif
    </div>
    <div class="SideContainerError side-container-error"></div> 
</div>