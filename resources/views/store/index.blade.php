@extends('store.partials.main')

@section('styles')
    {{-- Slider --}}
	{{ Html::style('plugins/owlcarousel2/owl.carousel.min.css') }}
	{{ Html::style('plugins/owlcarousel2/owl.theme.default.min.css') }}
@endsection

@section('header-image')
	{{-- <img class="desktop" src="{{ asset('images/web/home-banner.jpg')}}" alt="Augustamoi Banner">
	<img class="mobile" src="{{ asset('images/web/home-banner-mobile.jpg')}}" alt="Augustamoi Banner">
	{{-- <div class="index-header">	
	</div> --}}
@endsection

@section('content')

	{{-- Main Slider --}}
	{{-- Add the "".store-slider-desktop" class on StoreMainSlider if you want use mobile-desktop banners  --}}
	<div class="StoreMainSlider store-slider  owl-carousel owl-theme">
		<div class="item"><img src="{{ asset('images/web/home-banner-1.jpg')}}" alt="AugustaMoi Banner"></div>
		<div class="item"><img src="{{ asset('images/web/home-banner-2.jpg')}}" alt="AugustaMoi Banner"></div>
		<div class="item"><img src="{{ asset('images/web/home-banner-3.jpg')}}" alt="AugustaMoi Banner"></div>
	</div>
	{{-- <div class="StoreMainSlider store-slider store-slider-mobile owl-carousel owl-theme">
		<div class="item"><img src="{{ asset('images/web/home-banner-1.jpg')}}" alt="AugustaMoi Banner"></div>
		<div class="item"><img src="{{ asset('images/web/home-banner-mobile-2.jpg')}}" alt="AugustaMoi Banner"></div>
		<div class="item"><img src="{{ asset('images/web/home-banner-mobile-3.jpg')}}" alt="AugustaMoi Banner"></div>
	</div>
	 --}}
	{{-- If there is no articles focus view on message and on top banners and stuff --}}
	@if($articles->count() == '0')
		<a id="IndexArticles" href="#"></a>
	@endif
	
	{{-- Filters --}}
	@include('store.partials.categories')
	@include('store.partials.image-filters')
	<div class="mobile-filters">
		@include('store.partials.filters-mobile')
	</div> 

	<div id="main" class="row main-container container-fluid padding-bottom-3x mb-1">
			{{-- col-xs-12 col-lg-9 col-sm-8 col-md-8 --}}
			{{-- <div class="col-sm-3 col-md-3 col-lg-2 pad0 hide-768">
				@include('store.partials.filter-sidebar')
			</div> --}}
			
		<div id="MainContent" class="main-content col-xs-12">
			<div class="search-results-message">
				@if(!isset($_GET['checkout-on']))
					@if(isset($_GET['page']) && !isset($search) && count($_GET) == 1)
					@else
						@if(isset($search) && $search == true || count($_GET) > 0 && !isset($_GET['results']))
							@if(isset($_GET['marca']))
								@foreach($brands as $brand)
									@if($brand->id == $_GET['marca'])
										<h3>Mostrando indumentaria de <span style="white-space: nowrap"><b>{{ $brand->name }}</b></spans></h3>
									@endif
								@endforeach
							@else									
								<div class="results-info">
									@if($articles->count() == '1')
										1 artículo encontrado <br>
									@elseif($articles->count() == '0')
							
									@else
										Mostrando resultados de la búsqueda.
									@endif
								</div>
							@endif
						@endif
					@endif
				@endif
			</div>

			@if($articles->count() == '0')
				<div class="no-articles">
					<h3>No se han encontrado artículos</h3>
					<a class="btn" href="{{ url('/?page=1')}}">Mostrar todos</a>
				</div>
			@else
				{{-- If there is search results focus view on article index --}}
				<a id="IndexArticles" href="#"></a>
			@endif
			<!-- Products Grid -->
			@include('store.index-articles')
		</div>
	</div>
	{{-- @include('store.partials.instagramfeed') --}}
	{{-- <div id="Error"></div> --}}
	{{-- @php($name = 'LEA') --}}
@endsection

@section('scripts')
	@include('store.components.bladejs')
	<script type="text/javascript" src="{{ asset('plugins/owlcarousel2/owl.carousel.min.js')}} "></script>
	<script>
		// Check if any search parameters and focus articles on screen
		$( document ).ready(function() {
			if(window.location.search != '')
				FocusOnList();
		});

		function FocusOnList() {
			// console.log("CLICKED");
			var elmnt = document.getElementById("IndexArticles");
			elmnt.scrollIntoView();
		}

		// Change categories filter for search field
		$('#SliSearcher').hide();

		function OpenSearchField() {
			$('#SliCategories').hide(100);
			$('#SliSearcher').show(200);
		}

		function CloseSearchField() {
			$('#SliCategories').show(200);
			$('#SliSearcher').hide(100);
		}

		// $('.BrandsSlider').owlCarousel({
		// 	loop: true,
		// 	margin: 10,
		// 	nav: false,
		// 	dots: false,
		// 	autoWidth: true,
		// 	loop: true,  
		// 	center: true,
		// 	// rtl: true,
		// 	autoplay: true,
		// 	responsive:{
		// 		0:{
		// 			items:3
		// 		},
		// 		600:{
		// 			items:3
		// 		},
		// 		1000:{
		// 			items:10
		// 		}
		// 	}
		// });

		$('.StoreMainSlider').owlCarousel({
			loop: true,
			margin: 10,
			nav: false,
			stagePadding: 0,
			autoplay: true,
			items: 1
		});
		
		$('.FadeSlow').hide();
		setTimeout(function(){ $('.FadeSlow').show(); }, 1000);
		
	

	</script>
@endsection
