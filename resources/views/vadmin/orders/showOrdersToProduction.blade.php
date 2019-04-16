@extends('vadmin.partials.main')
@section('title', 'Vadmin | Exportar pedidos a producción')
{{-- STYLE INCLUDES --}}
@section('styles')
@endsection

{{-- HEADER --}}
@section('header')
	@component('vadmin.components.header-list')
		@slot('breadcrums')
		    <li class="breadcrumb-item"><a href="{{ url('vadmin')}}">Inicio</a></li>
            <li class="breadcrumb-item active">Listado de pedidos para producción</li>
		@endslot
		@slot('actions', '')
		@slot('searcher', '')
	@endcomponent
@endsection

{{-- CONTENT --}}
@section('content')
	<div class="list-wrapper">
		<div class="row">
			{{-- List --}}
			@component('vadmin.components.list')
                @slot('actions')
                <a href="{{ url('vadmin/exportOrderToProd') }}" data-toggle="tooltip" title="Exportar en .XLS" target="_blank">
                    <span class="icon-container green"> <i class="fas fa-file-excel"></i></span> Exportar .XLS
                </a>
                @endslot
				@slot('title', 'Pedidos para producción')
					@slot('tableTitles')
                        <th>Código</th>
                        <th>Marca</th>
                        <th>Cantidad</th>
                        <th>Artículo</th>
                        <th>Talle</th>
                        <th>Color</th>
                        <th>Tela</th>
                        <th>P.U.</th>
                        <th>P.T.</th>
					@endslot

					@slot('tableContent')
                        @foreach($orders as $order)
                            <tr>
                                <td>{{ $order['article_code'] }}</td>
                                <td>{{ $order['brand'] }} </td>
                                <td>{{ $order['quantity'] }} </td>
                                <td>{{ $order['article_name'] }}</td>
                                <td>{{ $order['talle'] }}</td>
                                <td>{{ $order['color'] }}</td>
                                <td>{{ $order['tela'] }}</td>
                                <td>{{ $order['price'] }}</td> 
                                <td>{{ $order['price'] * $order['quantity'] }}</td>
                            </tr>
                        @endforeach
				@endslot
            @endcomponent
            <div class="text-right">
                <a class="btn btnMain" href="{{ url('vadmin/exportOrderToProd') }}" data-toggle="tooltip" title="Exportar en .XLS" target="_blank">
                    <span class="icon-container green"> <i class="fas fa-file-excel"></i></span> Exportar .XLS
                </a>
            </div>
        </div>
    </div>
@endsection

{{-- SCRIPT INCLUDES --}}
@section('scripts')
	<script>
		allowEnterOnForms = true;
	</script>
@endsection


