@extends('vadmin.partials.invoice-excel')

@section('content')
    <table>
        <tr>
            <th>Código</th>
            <th>Artículo</th>
            <th>Talle</th>
            <th>Color</th>
            <th>Tela</th>
            <th>Cantidad</th>
            <th>P.U.</th>
            <th>P.T.</th>
            <th>Marca</th>

        </tr>
        @foreach($orders as $order)
            <tr>
                <td>{{ $order['article_code'] }}</td>
                <td>{{ $order['article_name'] }}</td>
                <td>{{ $order['talle'] }}</td>
                <td>{{ $order['color'] }}</td>
                <td>{{ $order['tela'] }}</td>
                <td>{{ $order['quantity'] }} </td>
                <td>{{ $order['price'] }}</td> 
                <td>{{ $order['price'] * $order['quantity'] }}</td> 
                <td>{{ $order['brand'] }} </td>
            </tr>
        @endforeach
    </table>
@endsection
