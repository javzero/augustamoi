@extends('vadmin.partials.main')

@section('title', 'Vadmin | Estadísticas')

@section('header_subtitle')

@endsection

@section('styles')
    <link rel="stylesheet" type="text/css" href="{{ asset('plugins/Chart.min.css') }}">
@endsection

@section('content')
	<div class="dashboard">
		<div class="content-body">
            <div class="card">
                <div class="card-header">
                    <h4 class="card-title">Estadísticas</h4>
                </div>
                <div class="card-body">
                    <div class="card-block">
                        <div class="row">
                            <div class="col-md-6">
                                {{-- {{  dd($salesByPeriod[0]['data'])}} --}}
                                <div class="row">
                                    <div class="container">
                                        <h4>Ventas por mes</h4>
                                        @php($periodNumber = request()->segment(count(request()->segments())) )
                                        <a href="{{ route('vadmin.stats', ['periodo' => '1']) }}" class="btn btnMain @if($periodNumber == 1) activeBtn @endif">
                                            Mes Actual
                                        </a>
                                        <a href="{{ route('vadmin.stats', ['periodo' => '3']) }}" class="btn btnMain @if($periodNumber == 3) activeBtn @endif"">
                                            Últimos 3 meses
                                        </a>
                                        <a href="{{ route('vadmin.stats', ['periodo' => '6']) }}" class="btn btnMain @if($periodNumber == 6) activeBtn @endif"">
                                            Últimos 6 meses
                                        </a>
                                    </div>
                                </div>
                                <br>
                            @foreach($salesByPeriod[0]['data'] as $key => $items)
                                <div class="container-fluid data-container">
                                    <div class="data-header">{{ $key }}</div>
                                    @php($totalItems = 0)
                                    @php($totalAmount = 0)
                                    
                                    @foreach($items as $brand => $item)
                                        <span class="data-main">{{ $brand}}</span>> 
                                        Prendas: {{ $item['items'] }} | 
                                        $ {{ $item['amount'] }}</br>

                                        {{-- Calc totals --}}
                                        @php($totalItems += $item['items'])
                                        @php($totalAmount += $item['amount'])
                                    @endforeach
                                    <hr class="softhr">
                                    <span class="data-main">Total </span> > Prendas: {{$totalItems}} | $ {{ $totalAmount }} 
                                </div>
                            @endforeach
                                <span class="small-data">Tiempo de ejecución: {{ $salesByPeriod[0]['exec_time'] }} segundos.</span>
                            </div>
                            <div class="col-md-6">
                                <h4>Calcular</h4>
                                <form id="CustomStatsForm" class="stats-small-form">
                                    {!! csrf_field() !!}
                                    <div class="form-group">
                                        <select name="statsQuery" class="form-control" class="form-control" required>
                                            <option value="" disabled selected>Seleccione una opción</option>
                                            <option value="customersPerMonth">Clientes registrados por mes</option>
                                        </select>
                                    </div>
                                    <div class="form-group">
                                        <label for="">Período</label>
                                        <select name="statsQueryPeriod" class="form-control" class="form-control" required>
                                            <option value="" disabled selected>Seleccione una opción</option>
                                            <option value="1">Último mes</option>
                                            <option value="3">3 meses</option>
                                            <option value="6">6 meses</option>
                                            <option value="12">12 meses</option>
                                            <option value="0">Todos (Esta operación puede demorar)</option>
                                        </select>
                                        <br>
                                        <button type="submit" class="btn btn-default">Calcular</button>
                                    </div>
                                </form>
                                <div id="CustomStatsDisplay" class="data-container">
                                    {{-- Ajax Data --}}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>	
    </div>
	<div id="Error"></div>
@endsection

@section('scripts')
    {{-- <script src="{{ asset('plugins/chartjs/Chart.min.js') }}" type="text/javascript"></script> --}}
@endsection

@section('custom_js')
    <script>
        $('#CustomStatsForm').on('submit', function(e)
        {
            e.preventDefault();
            let data = $(this).serialize();
            const route = "{{ route('vadmin.customStats') }}";

            $.ajax({
                url: route,
                method: 'POST',
                dataType: 'JSON',
                data: data,
                success: function success(data) {
                    $('#CustomStatsDisplay').html(data.message + '<br>');
                    $.each(data.data, function( index, value ) {
                        $('#CustomStatsDisplay').append(index + ' > ' + value + '<br>');
                    });

                    console.log(data);
                    // $('#CustomStatsDisplay').html(data.message);
                },
                error: function error(data) {
                    console.log(data);
                    $('#Error').html(data.responseText);
                }
            });
        });
	</script>
@endsection
