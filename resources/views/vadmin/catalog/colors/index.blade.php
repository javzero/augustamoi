@extends('vadmin.partials.main')
@section('title', 'Vadmin | Colores')

{{-- HEADER --}}
@section('header')
	@component('vadmin.components.header-list')
		@slot('breadcrums')
		    <li class="breadcrumb-item"><a href="{{ url('vadmin')}}">Inicio</a></li>
            <li class="breadcrumb-item active">Listado de colores</li>
		@endslot
		@slot('actions')
			{{-- Actions --}}
			<div class="list-actions">

				<input id="SelectedItems" type="hidden" name="SelectedItems[]">

				{{--  THIS VALUE MUST BE THE NAME OF THE SECTION CONTROLLER  --}}
				<input id="ModelName" type="hidden" value="cat_colors">

				<a href="{{ route('cat_colors.create') }}" class="btn btnMain"><i class="icon-plus-round"></i>  Nuevo Color</a>
				{{-- <button id="SearchFiltersBtn" class="btn btnBlue"><i class="icon-ios-search-strong"></i></button> --}}
				
				{{-- Edit --}}
				<button onclick="listAction({ action: 'edit', id: $('#EditId').val(), model: $('#ModelName').val() })"
					class="ListActionBtn EditBtn btn btnMain Hidden" data-visibleif="1"><i class="icon-pencil2"></i> Editar</button>
				<input id="EditId" type="hidden">
				
				{{-- Delete --}}
				<button class="ListActionBtn DeleteBtn btn btnRed Hidden" data-visibleif="1"><i class="icon-bin2"></i> Eliminar</button>
				{{-- If Search --}}
				{{-- @if(isset($_GET['name']))
				<a href="{{ route('cat_colors.index') }}"><button type="button" class="btn btnGrey">Mostrar Todos</button></a>
				<div class="results">{{ $items->total() }} resultados de búsqueda</div>
				@endif --}}
			</div>
		@endslot
		@slot('searcher')
			{{-- @include('vadmin.catalog.items.searcher') --}}
		@endslot
	@endcomponent
@endsection

{{-- CONTENT --}}
@section('content')
	<div class="list-wrapper">
		<div class="row">
			@component('vadmin.components.list')
				@slot('actions', '')
				@slot('title', 'Temporadas')
					@if(!$items->count() == '0')
					@slot('tableTitles')
						<th></th>
						<th>Nombre</th>
						<th>Fecha de Creación</th>
					@endslot
					@slot('tableContent')
						@foreach($items as $item)
							<tr>
								<td class="w-50">
									<label class="custom-control custom-checkbox list-checkbox">
										<input type="checkbox" class="List-Checkbox custom-control-input row-checkbox" data-id="{{ $item->id }}">
										<span class="custom-control-indicator"></span>
										<span class="custom-control-description"></span>
									</label>
								</td>
								<td>
									<input class="editable-input" onfocus="event.target.select()" type="text" value="{{ $item->name }}" min="0">
									<div class="editable-input-data" data-id="{{ $item->id }}" 
										data-route="update_cat_color_field" data-field="name" data-type="string" data-action="reload" data-value="">
									</div>
								</td>
								<td class="w-200">{{ transDateT($item->created_at) }}</td>
							</tr>						
						@endforeach
					@else 
						@slot('tableTitles')
							<th></th>
						@endslot
						@slot('tableContent')
							<tr>
								<td class="w-200">No se han encontrado items</td>
							</tr>
						@endslot
					@endif
				@endslot
			@endcomponent
			{{--  Pagination  --}}
			{!! $items->render() !!}
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