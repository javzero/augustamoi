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
                            <div class="col-md-12">
                                {{-- {{  dd($salesByPeriod[0]['data'])}} --}}
                                <div class="row">
                                    <div class="container-fluid">
                                        <h4>Ventas por mes</h4>
                                        @php($periodNumber = request()->segment(count(request()->segments())) )
                                        <a href="{{ route('vadmin.statsSalesByPeriod', ['periodo' => '1']) }}" class="btn btnMain @if($periodNumber == 1) activeBtn @endif">
                                            Mes Actual
                                        </a>
                                        
                                        <a href="{{ route('vadmin.statsSalesByPeriod', ['periodo' => '3']) }}" class="btn btnMain @if($periodNumber == 3) activeBtn @endif"">
                                            Últimos 3 meses
                                        </a>
                                        <a href="{{ route('vadmin.statsSalesByPeriod', ['periodo' => '6']) }}" class="btn btnMain @if($periodNumber == 6) activeBtn @endif"">
                                            Últimos 6 meses
                                        </a>
                                        <a href="{{ route('vadmin.statsSalesByPeriod', ['periodo' => '*']) }}" class="btn btnMain @if($periodNumber == 6) activeBtn @endif"">
                                            Total
                                        </a>
                                    </div>
                                </div>
                                <br>
                            <div style="margin-bottom: 10px">
                                <a href="{{ route('vadmin.exportStatsSalesByPeriod', ['periodo' => collect(request()->segments())->last()]) }}" style="text-decoration: underline; color: #8e8ef3">
                                    Descargar CSV
                                </a>
                            </div>
                            @foreach($salesByPeriod[0]['data'] as $key => $items)
                                <div class="container-fluid data-container">
                                    <br>
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
                                {{-- <span class="small-data">Tiempo de ejecución: {{ $salesByPeriod[0]['exec_time'] }} segundos.</span> --}}
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
        // $('#CustomStatsForm').on('submit', function(e)
        // {
        //     e.preventDefault();
        //     let data = $(this).serialize();
        //     const route = "{{ route('vadmin.customStats') }}";

        //     $.ajax({
        //         url: route,
        //         method: 'POST',
        //         dataType: 'JSON',
        //         data: data,
        //         success: function success(data) {
        //             $('#CustomStatsDisplay').html(data.message + '<br>');
        //             $.each(data.data, function( index, value ) {
        //                 $('#CustomStatsDisplay').append(index + ' > ' + value + '<br>');
        //             });

        //             console.log(data);
        //             // $('#CustomStatsDisplay').html(data.message);
        //         },
        //         error: function error(data) {
        //             console.log(data);
        //             $('#Error').html(data.responseText);
        //         }
        //     });
        // });

        // function setStatsQueryOptions(e)
        // {
        //     const optionsSlot = $('#StatsQueryOptions');

        //     let options1 =  "<option value='' disabled selected>Seleccione una opción</option>" +
        //                     "<option value='1'>Mes actual</option>" +
        //                     "<option value='3'>3 meses</option>" +
        //                     "<option value='6'>6 meses</option>" +
        //                     "<option value='12'>12 meses</option>" +
        //                     "<option value='0'>Todos (Esta operación puede demorar)</option>";

        //     let options2 =  "<option value='' disabled selected>Seleccione una opción</option>" +
        //                     "<option value='2'>Más de 2 compras</option>" +
        //                     "<option value='10'>Más de 10 compras</option>" +
        //                     "<option value='50'>Más de 50 compras</option>";
      

        //     switch (e.value) {
        //         case 'customersPerMonth':
        //             optionsSlot.html(options1);
        //             break;
        //         case 'realCustomers':
        //             optionsSlot.html(options2);
        //             break;
        //         default:
        //             break;
        //     }
        // }
	</script>
@endsection
