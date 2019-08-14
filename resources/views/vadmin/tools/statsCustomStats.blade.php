@extends('vadmin.partials.main')

@section('title', 'Vadmin | Estadísticas')

@section('header_subtitle')

@endsection

@section('styles')
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
                                <h4>Calcular</h4>
                                <form id="CustomStatsForm" class="stats-small-form">
                                    {!! csrf_field() !!}
                                    <div class="form-group">
                                        <select name="statsQueryName" class="form-control" onchange="setStatsQueryOptions(this)" required>
                                            <option value="" disabled selected>Seleccione una opción</option>
                                            <option value="customersPerMonth">Clientes registrados por mes</option>
                                            <option value="realCustomers">Clientes reales</option>
                                        </select>
                                    </div>
                                    <div class="form-group">
                                        <label for="">Período</label>
                                        <select id="StatsQueryOptions" name="statsQuery" class="form-control" required>
                                            {{-- Dynamic options --}}
                                        </select>
                                        <br>
                                        <button type="submit" class="btn btn-default">Calcular</button>
                                    </div>
                                </form>
                                <div class="data-container">
                                    <h2 style="padding-left: 33px" id="CSTitleMessage"></h2>
                                    <table class='table table-condensed'>
                                        <thead>
                                                <tr>
                                                    <th id="CSTableTitle1"></th><th id="CSTableTitle2"></th>
                                                </tr>
                                        </thead>
                                        <tbody id="CSTableData">
                                        </tbody>
                                    </table>
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
                    $('#CSTitleMessage, #CSTableTitle1, #CSTableTitle2, #CSTableData').html('');
                    $('#CSTitleMessage').html(data.message + '<br>');

                    $('#CSTableTitle1').html(data.column_title1);
                    $('#CSTableTitle2').html(data.column_title2);
                    

                    $.each(data.data, function( index, value ) {
                        const tableRow = "<tr><td>"+ index +"</td>" + 
                                         "<td>"+ value +"</td></tr>";
                        $('#CSTableData').append(tableRow);
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

        function setStatsQueryOptions(e)
        {
            const optionsSlot = $('#StatsQueryOptions');

            let options1 =  "<option value='' disabled selected>Seleccione una opción</option>" +
                            "<option value='1'>Mes actual</option>" +
                            "<option value='3'>3 meses</option>" +
                            "<option value='6'>6 meses</option>" +
                            "<option value='12'>12 meses</option>" +
                            "<option value='0'>Todos (Esta operación puede demorar)</option>";

            let options2 =  "<option value='' disabled selected>Seleccione una opción</option>" +
                            "<option value='2'>Más de 2 compras</option>" +
                            "<option value='10'>Más de 10 compras</option>" +
                            "<option value='50'>Más de 50 compras</option>";
      

            switch (e.value) {
                case 'customersPerMonth':
                    optionsSlot.html(options1);
                    break;
                case 'realCustomers':
                    optionsSlot.html(options2);
                    break;
                default:
                    break;
            }
        }
	</script>
@endsection
