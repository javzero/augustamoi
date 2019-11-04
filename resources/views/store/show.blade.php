@extends('store.partials.main')

@section('styles')
	<link rel="stylesheet" href="{{ asset('plugins/owl/assets/owl.carousel.min.css') }}">
	<link rel="stylesheet" href="{{ asset('plugins/owl/assets/owl.theme.default.min.css') }}">
	<style>
		.filter-sidebar
		{
			padding-top: 8px
		}

	</style>
@endsection

@section('content')
<div class="mobile-filters">
	@include('store.partials.filters-mobile')
</div>
<div class="container-fluid">
	<div class="row">
		<div class="col-sm-3 col-md-3 col-lg-2 pad0 hide-768">
			@include('store.partials.filter-sidebar')
		</div>
		<div class="col-sm-12 col-md-9 col-lg-10 product-show">
			{{-- Top Row --}}
			<div class="row">
				{{-- <a href="{{ url('tienda') }}" class="top-action">
					<button  class="btn btn-main-sm">
						<i class="icon-arrow-left"></i>&nbsp;Volver a la tienda
					</button>
				</a> --}}
				{{-- Title Mobile --}}
				<div class="product-title product-title-mobile">
					<span class="product-category sub-text"> <b>Categoría:&nbsp;</b></span>
					<a class="sub-text" href="#">{{ $article->category->name }}</a>
					{{--  Article Name  --}}
					<h2>{{ $article->name }}</h2>
					<span class="sub-text"> Código: #{{ $article->code }}</span>
				</div>
			</div>
			{{-- Content --}}
			<div class="row">
				{{-- Product Image --}}
				<div class="col-xs-12 col-sm-12 col-md-12 col-lg-8 product-image">
					<div class="owl-carousel owl-theme">
						@if(!$article->images->isEmpty())
							@foreach($article->images as $image)
								<div class="item" data-target="#ViewImageModal" data-toggle="modal"
									onclick="fillModal('{{ asset('webimages/catalogo/'. $image->name) }}')" >
									<img class="CheckCatalogImg" 
									src="{{ asset('webimages/catalogo/'. $image->name) }}" 
									
									alt="Product">
								</div>
							@endforeach
						@endif
					</div>
				</div>
				{{-- Product Description and actions --}}
				<div class="col-xs-12 col-sm-12 col-md-12 col-lg-4 products-details">
					{{-- Favs --}}
					<div class="fav-container">
						@if(Auth::guard('customer')->check())
							<a class="AddToFavs fa-icon fav-icon-nofav @if($isFav) fav-icon-isfav @endif"
							data-id="{{ $article->id }}" data-toggle="tooltip" data-placement="bottom" title="Agregar a Favoritos">
							</a>
							@else
							<a href="{{ url('tienda/login') }}" class="fa-icon fav-icon-nofav"></a>
						@endif
					</div>
					{{-- PRICE --}}
					@if($article->reseller_discount > 0)
						<div class="product-price">
							DESCUENTO % {{ $article->reseller_discount }}!! <br>
							<span class="text-muted text-small">$ {{ $article->reseller_price }}</span>
							<span class="price-text">&nbsp; ${{ calcValuePercentNeg($article->reseller_price, $article->reseller_discount) }}</span>
						</div>
					@else
						<div class="product-price">
							<span class="price-text">$ {{ $article->reseller_price }}</span>
						</div>
					@endif
					{{-- Title Desktop --}}
					<div class="product-title product-title-desktop">
						<span class="product-category sub-text"> <b>Categoría:&nbsp;</b></span>
						<a class="sub-text" href="#">{{ $article->category->name }}</a>
						{{--  Article Name  --}}
						<h2>{{ $article->name }}</h2>
						<span class="sub-text"> Código: #{{ $article->code }}</span>
					</div>
					{{-- Article Description --}}
					<p class="product-description">{{ strip_tags($article->description) }}</p>
					<div class="item"><div class="title">TELA: <b>{{ $article->textile }}</b></div></div>
					<div class="product-divider"></div>
					@if(Auth::guard('customer')->check())
					<div class="row">
						<div class="col-sm-12 descriptions">
							{!! Form::open(['id' => 'AddToCartForm', 'class' => 'form-group price', 'onchange' => 'checkVariantStock()', 
							'data-route' => (url('tienda/checkVariantStock')) ]) !!}
								<input type="hidden" name="article_id" value="{{ $article->id }}">
								<div class="row">
									{{-- SIZES --}}
									<div class="col-md-12 form-row">
										<label class="margin-left-0 pad0" for="">TALLES: </label>
										<br>
										<div class="btn-group-toggle" data-toggle="buttons">
											@foreach($articleSizes as $id => $name)
												<label class="SizesSelector btn button-radio-hidden">
													<input onclick="checkVariantStock()" name="size_id" value="{{ $id }}" type="radio" autocomplete="off"> 
													{{ $name }}
												</label>
											@endforeach
										</div>
									</div>
									{{-- COLORS --}}
									<div class="col-md-12 form-row">
										<label class="pad0 marg0" for="">COLORES:</label>
										<br>
										<div class="btn-group-toggle" data-toggle="buttons">
											@foreach($colors as $id => $name)
												<label class="ColorsSelector btn button-radio-hidden"">
													<input onclick="checkVariantStock()" name="color_id" value="{{ $id }}" 
													type="radio" autocomplete="off"> {{ $name }}
												</label>
											@endforeach
										</div>
									</div>
								</div>
								@if($article->status != 1)
								<div class="row">
									<span class="action-info-container">
										Este artículo no está disponible al momento
									</span>
								</div>
								@else
								<div class="row">
									{{-- Display Remaining Stock --}}
									<span class="AvailableStock action-info-container"></span>
								</div>
								<br>
								<div class="row">
									<div class="col-md-12">
										<div class="input-with-btn">
											<input id="MaxQuantity" class="form-control input-field short-input" name="quantity" type="number" 
											min="1" max="{{ $article->stock }}" value="1" placeholder="1" required>
											<input type="submit" id="AddToCartFormBtn" class="btn input-btn"" value="Sumar a tu pedido" disabled>
										</div>
									</div>
								</div>
								@endif
							{!! Form::close() !!}
						</div>
					</div>
					@else
						<div class="item"><div class="title">Colores: <b>@foreach($colors as $name) {{ $name }} @if(!$loop->last) | @endif @endforeach</b></div> <br></div>
						<div class="item"><div class="title">Talles: <b>@foreach($articleSizes as $name) {{ $name }} @if(!$loop->last) | @endif @endforeach</b></div> <br></div>
					@endif
				</div>
			</div>
			@include('store.show-related')
			<div style="height: 150px"></div>
			
		</div>{{-- product-show --}}
	</div>{{-- Row --}}
</div>{{-- Container-Fluid --}}

{{-- Image Modal --}}
<div class="modal fade product-show-image-modal" id="ViewImageModal" tabindex="-1" role="dialog">
	<div class="modal-dialog" role="document">
		<div class="modal-content">
			<div class="modal-body">
				<a class="close-modal-x" data-dismiss="modal">X</a>
				<img id="ViewImageContainer" src="" alt="">
			</div>
		</div>
	</div>
</div>
	
	
<div id="Error"></div>
@endsection

@section('scripts')
	@include('store.components.bladejs')
	<script src="{{ asset('plugins/owl/owl.carousel.min.js') }}"></script>
	<script>

		function fillModal(src)
		{
			const image = $('#ViewImageContainer');
			image.attr('src', src);
		}

		$('.owl-carousel').owlCarousel({
			loop: true,
			margin: 10,
			nav: true,
			dots: false,
			// navText : ['<i class="fa fa-angle-left" aria-hidden="true"></i>','<i class="fa fa-angle-right" aria-hidden="true"></i>'],
			responsive:{
				0:{
					items:1
				},
				600:{
					items:2
				},
				1000:{
					items: 2
				}
			}
		})

		if($('.SizesSelector').length == 1)
			$('.SizesSelector').click();
		if($('.ColorsSelector').length == 1)
			$('.ColorsSelector').click();
	</script>
@endsection