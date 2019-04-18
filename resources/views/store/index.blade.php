@extends('store.partials.main')

@section('header-image')
	<img src="{{ asset('images/web/home-banner.jpg')}}" alt="Augustamoi Banner">		
	{{-- <div class="index-header">	
	</div> --}}
@endsection

@section('content')
	<div class="mobile-filters">
		@include('store.partials.filters-mobile')
	</div>
	<div id="main" class="row main-container container-fluid padding-bottom-3x mb-1">
			{{-- col-xs-12 col-lg-9 col-sm-8 col-md-8 --}}
			<div class="col-sm-3 col-md-3 col-lg-2 pad0 hide-768">
				@include('store.partials.filter-sidebar')
			</div>
			<div id="MainContent" class="col-xs-12 col-sm-12 col-md-9 col-lg-10">
				<div class="search-results-message">
					@if(!isset($_GET['checkout-on']))
						@if(isset($_GET['page']) && !isset($search) && count($_GET) == 1)
						@else
							@if(isset($search) && $search == true || count($_GET) > 0 && !isset($_GET['results']))
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
				</div>
				<!-- Products Grid -->
				@include('store.index-articles')
				@if($articles->count() != '0')
				<div class="pagination-results">
					<span class="title"><b>Resultados por página:</b></span>
					<a href="{{ route('store', ['results' => '24']) }}">24</a> | 
					<a href="{{ route('store', ['results' => '96']) }}">96</a> |
					<a href="{{ route('store', ['results' => '142']) }}">142</a>
				</div>
				@endif
				{!! $articles->appends(request()->query())->render()!!}
			</div>
		</div>
	<div id="Error"></div>
@endsection

@section('scripts')
	@include('store.components.bladejs')
@endsection


