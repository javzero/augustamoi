
<div class="articles-container">
    <div class="row">
        @foreach($articles as $article)
            <div class="article">
                <div class="inner">
                    {{-- =========== Discount Badge =========== --}}
                    @if($article->reseller_discount > 0)
                        <div class="overlay-ribbon top-right-ribbon">
                            <div class="triangle"></div>
                            <div class="text">	%{{ $article->reseller_discount }} <br> off !!</div>
                        </div>
                    @endif
                    {{-- =============== Image ================ --}}
                    <a href="{{ url('tienda/articulo/'.$article->id) }}">
                        <div class="image">
                                <div class="overlay text-center">
                                    Ver producto !
                                </div>
                            
                            @php($difference = now()->diff($article->created_at)->days) {{-- Check if article has less than 10 days.--}}
                            @if($difference < 10)
                                <div class="overlay-ribbon bottom-right-ribbon">
                                    <div class="triangle"></div>
                                    <div class="text">NUEVO! </div>
                                </div>
                            @endif
                            
                            {{-- PRODUCT IMAGE --}}
                            {{-- Prevent broken images - Use only on dev mode --}}
                            {{-- <img src="{{ asset($article->featuredImageName()) }}" onError="this.onerror=null;this.src='{{ asset('images/gen/catalog-gen.jpg') }}';"   alt="Producto del Catálogo"> --}}
                            <img src="{{ asset($article->featuredImageName()) }}" alt="Producto del Catálogo">

                            @if(Auth::guard('customer')->check())
                                {{--  Check if product is in favs  --}}
                                <a class="AddToFavs add-to-favs fa-icon fav-icon-nofav fav-btn
                                    @if(in_array($article->id, $favs['articleFavs'])) fav-icon-isfav @endif"
                                    data-id="{{ $article->id }}" data-toggle="tooltip" title="Agregar a Favoritos">
                                </a>
                            @endif
                            
                        </div>
                    </a>
                    {{-- ============== Content =============== --}}
                    <div class="content">
                        {{-- ============ Title-Info ============== --}}
                        <div class="title-info">
                            <a href="{{ url('tienda/articulo/'.$article->id) }}">
                                <h3 class="product-title max-text"><b>{{ $article->name }}</b></h3>
                            </a>
                        </div>
                        {{-- =============== Footer =============== --}}
                        <div class="footer">
                            <div class="col-price pad0">
                                {{-- <del>$ {{ $article->reseller_price + 0 }}</del>  --}}
                                <span class="price">
                                    $ {{ calcValuePercentNeg($article->reseller_price, $article->reseller_discount + 0) }}
                                </span>
                            </div>
                            <div class="col-add pad0">
                                <a href="{{ url('tienda/articulo/'.$article->id) }}">
                                    <button class="btn btn-main-sm"> Sumá a tu pedido</button>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        @endforeach
    </div>
</div>
@if($articles->count() != '0')
<div class="pagination-results">
    <span class="title"><b>Resultados por página:</b></span>
    <a href="{{ route('store', ['results' => '24']) }}">24</a> | 
    <a href="{{ route('store', ['results' => '96']) }}">96</a> |
    <a href="{{ route('store', ['results' => '142']) }}">142</a>
</div>
@endif
{!! $articles->appends(request()->query())->render()!!}