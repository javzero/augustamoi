<div class="container related-articles-container">
    <h3>Tambien puede interesarte</h3>
    <div class="row articles-container">
        @if(isset($relatedArticles))
            @foreach($relatedArticles as $article)
            <div class="col-xs-6 col-sm-6 col-md-4 col-lg-3 col-xl-3 article">
                    <div class="inner">
                        {{-- =========== Discount Badge =========== --}}
                        @if($article->reseller_discount > 0)
                            <div class="overlay-ribbon top-right-ribbon">
                                <div class="triangle"></div>
                                <div class="text">	%{{ $article->reseller_discount }} <br> off !!</div>
                            </div>
                        @endif
                        {{-- =============== Image ================ --}}
                        <div class="image">
                            
                            @php($difference = now()->diff($article->created_at)->days) {{-- Check if article has less than 10 days.--}}
                            @if($difference < 10)
                                <div class="overlay-ribbon bottom-right-ribbon">
                                    <div class="triangle"></div>
                                    <div class="text">NUEVO! </div>
                                </div>
                            @endif
                           
                            <img src="{{ asset($article->featuredImageName()) }}" alt="Producto del Catálogo">
                            @if(Auth::guard('customer')->check())
                            {{--  Check if product is in favs  --}}
                            <a class="AddToFavs add-to-favs fa-icon fav-icon-nofav fav-btn
                                @if(in_array($article->id, $favs['articleFavs'])) fav-icon-isfav @endif"
                                data-id="{{ $article->id }}" data-toggle="tooltip" title="Agregar a Favoritos">
                            </a>
                            @endif
                            <a href="{{ url('tienda/articulo/'.$article->id) }}">
                                <div class="overlay text-center">
                                    Ver producto
                                </div>
                            </a>
                        </div>
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
                                        <button class="btn btn-main-sm"> Sumar a tu pedido</button>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            @endforeach
        @endif
    </div>
</div>
    