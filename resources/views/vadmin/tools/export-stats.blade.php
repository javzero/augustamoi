<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//ES" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <title>Estadísticas</title>
        <link rel="shortcut icon" href="{{ asset('webimages/logos/favicon.png') }}"><!-- Favicon -->
        <link rel="stylesheet" type="text/css" href="{{ asset('css/invoice.css') }}">
    </head>
    <body>
        <div class="invoice">
            <div class="table-responsive">
                <table>
                    <thead style="border: 0">
                        <tr>
                            @if(request()->segment(count(request()->segments())) != '*')
                            <th>VENTAS DE LOS ÚLTIMOS  
                                {{ request()->segment(count(request()->segments())) }}
                                MESES
                            </th>
                            @else
                                <th>VENTAS TOTALES</th>
                            @endif
                        </tr>
                    </thead>
                </table>
                @foreach($data as $key => $items)
                    @php($totalItems = 0)
                    @php($totalAmount = 0)
                    @php($totalCost = 0)

                    <table id="TableList" style="width: 100%; border: 1px solid #f9f9f9; padding: 0 10px 10px; margin-bottom: 15px"
                        class="table table-bordered table-striped custom-list">
                        <thead style="border: 0;">
                            <tr>
                                <th style="font-size: 1.2rem">{{ $key }}</th>
                            </tr>
                        </thead>
                        <tbody>

                            @foreach($items as $brand => $item)
                                <tr>    
                                    <td>
                                        {{ $brand}} >
                                        Prendas: <b>{{ $item['items'] }} </b> | 
                                        Total: <b>$ {{ $item['amount'] }} </b>|
                                        Costo: <b>$ {{ $item['cost'] }} </b> |
                                        Ganancia: <b>$ {{ $item['amount'] - $item['cost'] }} </b>
                                
                                        {{-- Calc totals --}}
                                        @php($totalItems += $item['items'])
                                        @php($totalAmount += $item['amount'])
                                        @php($totalCost += $item['cost'])
                                    </td>    
                                </tr> 
                            @endforeach
                            
                            {{-- OLD --}}
                            {{-- @foreach($items as $brand => $item)
                            <tr>    
                                <td>
                                    {{ $brand }} > 
                                    Prendas: {{ $item['items'] }} | 
                                    $ {{ $item['amount'] }}

                                    @php($totalItems += $item['items'])
                                    @php($totalAmount += $item['amount'])
                                </td>    
                            </tr> 
                            @endforeach --}}
                            <tr style="background-color: #f9f9f9;">
                                <td style="white-space: nowrap;"><b>TOTAL</b> </span> > Prendas: {{$totalItems}} | <b>$ {{ $totalAmount }} </b> | Costo <b> $ {{ $totalCost }}</b> | Ganancia <b>$ {{ $totalAmount - $totalCost}} </td>
                                {{-- <td class="white-space: nowrap;"><b>TOTAL</b> </span> > Prendas: {{$totalItems}} | $ {{ $totalAmount }}</td> --}}
                            </tr> 
                        </tbody>
                    </table>
                @endforeach
            </div>
        </div>
    </body>
</html>