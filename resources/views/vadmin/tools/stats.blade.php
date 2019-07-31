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
                            <div class="row">
                                {{-- {{dd($salesByPeriod)}} --}}
                                @foreach($salesByPeriod as $key => $items)
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
        // let url = "{{ url('vadmin/getStats/3') }}";
        
        // let periods = new Array();
        // //let Labels = new Array();
        // //let Prices = new Array();
        
        // $(document).ready(function()
        // {
        //     $.get(url, function(response)
        //     { 
        //         // console.log(response);
        //         $.each(response, function(data)
        //         {
        //             // console.log(data);
        //            periods.push(data);

        //         });
        //     });
        //     console.log(periods);
        // });

        // var barChartData = {
		// 	labels: periods,
		// 	datasets: [{
		// 		label: 'Monto',
		// 		backgroundColor: [
        //             'rgba(153, 102, 255, 1)',
		// 		],
		// 		yAxisID: 'y-axis-1',
		// 		data: [
		// 			1,2
		// 		]
		// 	}, {
		// 		label: 'Items',
		// 		backgroundColor: 'rgba(54, 162, 235, 1)',
		// 		yAxisID: 'y-axis-2',
		// 		data: [
		// 			4,4
		// 		]
		// 	}]

		// };
		// window.onload = function() {
            
		// 	var ctx = document.getElementById('myChart').getContext('2d');
		// 	window.myBar = new Chart(ctx, {
		// 		type: 'bar',
		// 		data: barChartData,
		// 		options: {
		// 			responsive: true,
		// 			title: {
		// 				display: true,
		// 				text: 'Ventas por mes'
		// 			},
		// 			tooltips: {
		// 				mode: 'index',
		// 				intersect: true
		// 			},
		// 			scales: {
		// 				yAxes: [{
		// 					type: 'linear', // only linear but allow scale type registration. This allows extensions to exist solely for log scale for instance
		// 					display: true,
		// 					position: 'left',
		// 					id: 'y-axis-1',
		// 				}, {
		// 					type: 'linear', // only linear but allow scale type registration. This allows extensions to exist solely for log scale for instance
		// 					display: true,
		// 					position: 'right',
		// 					id: 'y-axis-2',
		// 					gridLines: {
		// 						drawOnChartArea: false
		// 					}
		// 				}],
		// 			}
		// 		}
		// 	});
		// };


	    // var ctx = document.getElementById('myChart').getContext('2d');
        // var myChart = new Chart(ctx, {
        //     type: 'bar',
        //     data: {
        //         labels: ['ENERO', 'FEBRERO', 'MARZO', 'ABRIL', 'MAYO', 'JUNIO', 'JULIO', 'AGOSTO', 'SEPTIEMBRE', 'OCTUBRE', 'NOVIEMBRE', 'DICIEMBRE'],
        //         datasets: [{
        //             label: '# ventas por mes',
        //             data: [12, 19, 3, 5, 2, 3, 3, 54, 6, 6, 7, 4],
        //             backgroundColor: [
        //                 'rgba(255, 99, 132, 0.2)',
        //                 'rgba(54, 162, 235, 0.2)',
        //                 'rgba(255, 206, 86, 0.2)',
        //                 'rgba(75, 192, 192, 0.2)',
        //                 'rgba(153, 102, 255, 0.2)',
        //                 'rgba(255, 159, 64, 0.2)',
        //                 'rgba(255, 100, 68, 0.2)',
        //                 'rgba(50, 50, 60, 0.2)'
        //             ],
        //             borderColor: [
        //                 'rgba(255, 99, 132, 1)',
        //                 'rgba(54, 162, 235, 1)',
        //                 'rgba(255, 206, 86, 1)',
        //                 'rgba(75, 192, 192, 1)',
        //                 'rgba(153, 102, 255, 1)',
        //                 'rgba(255, 159, 64, 1)',
        //                 'rgba(255, 100, 68, 1)',
        //                 'rgba(50, 50, 60, 1)'
        //             ],
        //             borderWidth: 1
        //         }]
        //     },
        //     options: {
        //         scales: {
        //             yAxes: [{
        //                 ticks: {
        //                     beginAtZero: true
        //                 }
        //             }]
        //         }
        //     }
        // });
	</script>

@endsection
