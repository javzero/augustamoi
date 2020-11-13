@extends('vadmin.partials.main')
@section('title', 'Vadmin | Listados de artículos del catálogo')

{{-- HEADER --}}
@section('header')
	@component('vadmin.components.header-list')
		@slot('breadcrums')
		    <li class="breadcrumb-item"><a href="{{ url('vadmin')}}">Inicio</a></li>
            <li class="breadcrumb-item active">Listado de artículos</li>
		@endslot
		@slot('actions')
			{{-- Actions --}}
			<div class="list-actions">

				{{-- THIS VALUE MUST BE THE NAME OF THE SECTION CONTROLLER --}}
				<input id="ModelName" type="hidden" value="catalogo">

				<button id="SearchFiltersBtn" class="btn btnMain"><i class="icon-ios-search-strong"></i></button>
				
				{{-- Edit --}}
				<button onclick="listAction({ action: 'edit', id: $('#EditId').val(), model: $('#ModelName').val() })"
					class="ListActionBtn EditBtn btn btnMain Hidden" data-visibleif="1"><i class="icon-pencil2"></i> Editar</button>
			</div>
		@endslot
		@slot('searcher')
			@include('vadmin.catalog.searcher')
		@endslot
	@endcomponent
@endsection

{{-- CONTENT --}}
@section('content')
{{-- {{dd($articles)}} --}}
	<div class="list-wrapper">
		{{-- Search --}}
		<div class="row inline-links">
			<b>Órden:</b> 
			<a href="{{ route('catalogo.index', ['orden_af' => 'ASC', http_build_query($_GET)]) }}" >A-Z</a>
			<a href="{{ route('catalogo.index', ['orden_af' => 'DESC', http_build_query($_GET)]) }}" >Z-A</a>
			<a href="{{ route('catalogo.index', ['featured' => '1', http_build_query($_GET)]) }}" >Destacados</a>
			{{-- <a href="{{ route('catalogo.index', ['orden' => 'ASC']) }}">Stock Bajo</a> 
			<a href="{{ route('catalogo.index', ['orden' => 'DESC']) }}">Stock Alto</a>
			<a href="{{ route('catalogo.index', ['orden' => 'limitados']) }}" >Stock Limitado</a> --}}
		</div>
		<div class="row">
			@component('vadmin.components.list')
				@slot('actions')

				@endslot

				@slot('title')
					Listado de artículos de la tienda
					@if(request()->status == '0' && request()->status != null)
					<p>(Pausados)</p>
					@endif
				@endslot
				@slot('tableTitles')
					@if(!$articles->count() == '0')
						<th>
	
						</th>
						<th></th>
						<th>Cód.</th>
						<th>Título</th>
						<th>Variantes (Color / Talle - Stock)</th>
						<th>Precio</th>
						{{-- <th>Costo</th> --}}
						{{-- <th>Valor de Stock</th> --}}
	
					@endslot
					@slot('tableContent')
						@foreach($articles as $item)
							<tr id="ItemId{{$item->id}}">
								<td class="mw-50">
		
								</td>
								{{-- THUMBNAIL --}}
								<td class="thumb">
									<a href="{{ url('vadmin/catalogo/'.$item->id.'/edit') }}">
										@if($item->featuredImageName())
											<img class="CheckImg" src="{{ asset($item->featuredImageName()) }}">
										@endif
									</a>
								</td>
								<td class="mw-100"><a href="{{ url('vadmin/catalogo/'.$item->id.'/edit') }}"> #{{ $item->code }} </a>
								</td>
								{{-- NAME --}}
								<td>
									{{ $item->name }}
								</td>
								<td style="white-space: normal">
									@php
										$stockAmount = 0;
									@endphp	
									@foreach($item->variants as $variant)
										<div class="small-badge-with-data">
											<div class="detail-data"><p>{{ $variant->combination }}</p></div>
											<div class="value-data">
												{{ $variant->stock }}
											</div>
										</div>
										@php($stockAmount += $variant->stock)
									@endforeach
								</td>
								<td>
									{{-- ${{ $item->price }} @if($item->discount != 0) <i>(${{calcArticlePrice($item->price, $item->discount) }}) @endif </i> /  --}}
									${{ $item->reseller_price }} @if($item->reseller_discount != 0) <i>(${{calcArticlePrice($item->reseller_price, $item->reseller_discount) }})</i> @endif
								</td>
								{{-- <td>
									<input class="editable-input" onfocus="event.target.select()" type="text" value="{{ $item->reseller_cost }}" style="max-width: 70px; border: 1px solid #ccc">
									<div class="editable-input-data" data-id="{{ $item->id }}" data-nullable="1" 
										data-route="update_catalog_field" data-field="reseller_cost" data-type="string" data-action="reload" data-value="">
									</div>
								</td>
								<td>
									$ {{ calcArticlePrice($item->reseller_price, $item->reseller_discount) * $stockAmount }}
								</td>
				 --}}
							</tr>					
						@endforeach
						@else 
							@slot('tableTitles')
								<th></th>
							@endslot
							@slot('tableContent')
								<tr>
									<td class="w-200">No se han encontrado artículos</td>
								</tr>
							@endslot
						@endif
				@endslot
			@endcomponent
			{{--  Pagination  --}}
			<div class="inline-links">
				<b>Resultados por página:</b>
				<a href="{{ route('catalogo.index', ['orden' => 'ASC', 'results' => '50', http_build_query($_GET)]) }}">50</a>
				<a href="{{ route('catalogo.index', ['orden' => 'ASC', 'results' => '100', http_build_query($_GET)]) }}">100</a>
			</div>
			{!! $articles->appends(request()->query())->render() !!}
		</div>
		<div id="Error"></div>
	</div>
@endsection

@section('scripts')
	@include('vadmin.components.bladejs')
@endsection

@section('custom_js')
	<script>
		allowEnterOnForms = true;
	</script>
@endsection