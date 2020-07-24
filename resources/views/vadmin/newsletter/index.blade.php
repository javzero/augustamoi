@extends('vadmin.partials.main')
{{-- PAGE TITLE --}}
@section('title', 'Vadmin | Newletter Emails')

{{-- CONTENT --}}
@section('header')
	@component('vadmin.components.header-list')
		@slot('breadcrums')
		    <li class="breadcrumb-item"><a href="{{ url('vadmin')}}">Inicio</a></li>
            <li class="breadcrumb-item active">Newsletter Emails</li>
		@endslot
		@slot('actions')
			{{-- Actions --}}
			<div class="list-actions">
				{{-- <a href="{{ route('customers.create') }}" class="btn btnMain"><i class="icon-plus-round"></i>  Nuev</a> --}}
				{{-- <button id="SearchFiltersBtn" class="btn btnMain"><i class="icon-ios-search-strong"></i></button> --}}
				@if(Auth::guard('user')->user()->role <= 2)
				{{-- Edit --}}
				{{-- <button class="EditBtn btn btnGreen Hidden"><i class="icon-pencil2"></i> Editar</button> --}}
				<input id="EditId" type="hidden">
				{{-- Delete --}}
				{{--  THIS VALUE MUST BE THE NAME OF THE SECTION CONTROLLER  --}}
				<input id="ModelName" type="hidden" value="newsletter">
				<button class="DeleteBtn btn btnRed Hidden"><i class="icon-bin2"></i> Eliminar</button>
				<input id="RowsToDeletion" type="hidden" name="rowstodeletion[]" value="">
				@endif
			</div>
		@endslot
		@slot('searcher')
			@include('vadmin.customers.searcher')
		@endslot
	@endcomponent
@endsection

@section('content')
	<div class="list-wrapper">
		<div class="row inline-links">

		</div>
		<div class="row">
			@component('vadmin.components.list')
				@slot('actions')
					<a href="{{ route('vadmin.exportNewsletterEmails', ['params' => 'all', 'format' => 'xls']) }}" data-toggle="tooltip" title="Exportar a XLS"  class="icon-container green">
						<i class="fas fa-file-excel"></i> Exportar
					</a>
				@endslot	
				@slot('title', 'Newsletter | Emails')
				@slot('tableTitles')
					@if(!$items->isEmpty())
						<th style="width: 30px">
							<label class="custom-control custom-checkbox list-checkbox">
								<input type="checkbox" class="Select-All-To-Delete custom-control-input row-checkbox">
								<span class="custom-control-indicator"></span>
								<span class="custom-control-description"></span>
							</label>
						</th>
						<th>Email</th>
					@else
						<th></th>
					@endif
				@endslot

				@slot('tableContent')
					@if(!$items->isEmpty())
						@foreach($items as $item)
							<tr>
								@if(Auth::guard('user')->user()->role <= 2)
								<td style="width: 30px">
									<label class="custom-control custom-checkbox list-checkbox">
										<input type="checkbox" class="List-Checkbox custom-control-input row-checkbox" data-id="{{ $item->id }}">
										<span class="custom-control-indicator"></span>
										<span class="custom-control-description"></span>
									</label>
								</td>
								@endif
								<td class="show-link">{{ $item->email }}</td>
							</tr>						
						@endforeach
					@else
						<tr>
							<td>No se han encontrado resultados</td>
						</tr>
					@endif
				@endslot
			@endcomponent
			{{--  Pagination  --}}
			{{-- <div class="inline-links">
				<b>Resultados por página:</b>
				<a href="{{ route('customers.index', ['orden' => 'ASC', 'redirect' => 'stock', 'results' => '5']) }}">5</a>
				<a href="{{ route('customers.index', ['orden' => 'ASC', 'redirect' => 'stock', 'results' => '50']) }}">50</a>
				<a href="{{ route('customers.index', ['orden' => 'ASC', 'redirect' => 'stock', 'results' => '100']) }}">100</a>
			</div> --}}
			{!! $items->appends(request()->query())->render()!!}
		</div>
		<div id="Error"></div>	
	</div>
@endsection

{{-- SCRIPT INCLUDES --}}
@section('scripts')
	@include('vadmin.components.bladejs')
@endsection

