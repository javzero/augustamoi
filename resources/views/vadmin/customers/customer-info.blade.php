@extends('vadmin.partials.main')
@section('title', 'Vadmin | Perfil de Usuario')

@section('header')
	@component('vadmin.components.header')
		@slot('breadcrums')

		@endslot
		@slot('actions')
		@endslot
	@endcomponent
@endsection

@section('content')
<h1>Listado de Clientes</h1>
    <div class="table-responsive">
        <table id="TableList" class="table table-bordered table-striped small-list">
            <thead>
                <tr>
                    <th>Cód.</th>
                    <th>Nombre y Apellido</th>
                    <th>E-Mail</th>
                    <th style="max-width: 100px">Dirección</th>
                    <th>Prov / Loc</th>
                    <th>Teléfonos</th>
                    <th>Compras</th>
                    <th>Prendas</th>
                    <th>Valor</th>
                </tr>
            </thead>
            <tbody>
                    @foreach($items as $item)
                    <tr>
                        <td class="w-50">#{{ $item->id }}</td>
                        <td class="max-text">{{ $item->name }} {{ $item->surname }}<br>({{ groupTrd($item->group) }}) <br>{{ $item->cuit }}</td>
                        <td>{{ $item->email }}</td>
                        <td style="max-width: 100px">@if($item->address != '') {{ $item->address }} <br>({{$item->cp }}) @endif</td>
                        <td>@if($item->geoprov['name'] != '') {{ $item->geoprov['name'] }} <br>({{ $item->geoloc['name'] }}) @endif</td>
                        <td>{{ $item->phone }} <br> {{ $item->phone2 }}</td>
                        <td>@if($item->staticstics('totalCarts') != 0) {{ $item->staticstics('totalCarts') }} @endif</td>
                        <td>@if($item->staticstics('totalItems') != 0) {{ $item->staticstics('totalItems') }} @endif</td>
                        <td>@if($item->staticstics('totalSpent') != 0) ${{ $item->staticstics('totalSpent') }} @endif</td>
                    </tr>
                @endforeach	
            </tbody>
        </table>
        {!! $items->appends(request()->query())->render()!!}
    </div>
@endsection
