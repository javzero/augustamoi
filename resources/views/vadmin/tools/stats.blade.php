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
                            <canvas id="myChart" width="400" height="100vh"></canvas>
                            <div class="filter-date">
                                {!! Form::open(['method' => 'GET', 'route' => 'orders.index', 'class' => 'form-group inner']) !!} 
                                {!! Form::date('init_date', null, ['class' => 'form-control']) !!}
                                {!! Form::date('expire_date', null, ['class' => 'form-control']) !!}
                                    @if(app('request')->input('status'))
                                    <input type="hidden" name="status" value="{{ app('request')->input('status') }}">
                                    @else
                                    @endif
                                    <button type="submit" class="btn btnMain">Filtrar</button>
                                    {!! Form::close() !!}
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
    <script src="{{ asset('plugins/chartjs/Chart.min.js') }}" type="text/javascript"></script>
@endsection

@section('custom_js')
    <script>
        var barChartData = {
			labels: ['ENERO', 'FEBRERO', 'MARZO', 'ABRIL', 'MAYO', 'JUNIO', 'JULIO', 'AGOSTO', 'SEPTIEMBRE', 'OCTUBRE', 'NOVIEMBRE', 'DICIEMBRE'],
			datasets: [{
				label: 'Monto',
				backgroundColor: [
                    'rgba(153, 102, 255, 1)',
				],
				yAxisID: 'y-axis-1',
				data: [
					3,3,3,3,3,3
				]
			}, {
				label: 'Items',
				backgroundColor: 'rgba(54, 162, 235, 1)',
				yAxisID: 'y-axis-2',
				data: [
					4,4,4,4,4,80
				]
			}]

		};
		window.onload = function() {
            
			var ctx = document.getElementById('myChart').getContext('2d');
			window.myBar = new Chart(ctx, {
				type: 'bar',
				data: barChartData,
				options: {
					responsive: true,
					title: {
						display: true,
						text: 'Ventas por mes'
					},
					tooltips: {
						mode: 'index',
						intersect: true
					},
					scales: {
						yAxes: [{
							type: 'linear', // only linear but allow scale type registration. This allows extensions to exist solely for log scale for instance
							display: true,
							position: 'left',
							id: 'y-axis-1',
						}, {
							type: 'linear', // only linear but allow scale type registration. This allows extensions to exist solely for log scale for instance
							display: true,
							position: 'right',
							id: 'y-axis-2',
							gridLines: {
								drawOnChartArea: false
							}
						}],
					}
				}
			});
		};


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
