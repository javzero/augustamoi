@extends('store.partials.invoice-simple')

@section('title', 'Rótulos | Envíos')


@section('content')
    @php($count = 0)
    @foreach ($orders as $order)
        <div class="invoice-simple" style="page-break-inside: avoid;">
            <table class="table-header">
                <thead>
                    <tr>
                        <th style="border-right: 1px solid #000"> 
                            <h2>Pedido N°: {{ $order->id }} </h2>
                            <p>{{ transDateT($order->created_at) }}</p>    
                        </th>
                        <th style="border-right: 1px solid #000">
                            <h2>Total de Bultos: </h2>
                            <p>Seguro Mínimo</p>
                        </th>
                        <th style="border-left: 1px solid #000" class="brand">
                            <img src="{{ asset('webimages/web/app-logo.png') }}" alt="">
                        </th>
                    </tr>
                </thead>
            </table>
            <div class="content">
                <h1>DATOS DEL CLIENTE</h1>
                <p><b>Nombre y Apellido: </b> {{ $order->customer->name }} {{ $order->customer->surname }}</p>
                <p><b>Usuario: </b> {{ $order->customer->username }}</p>
                <p><b>Teléfonos: </b>{{ $order->customer->phone }} {{ $order->customer->phone1 }}</p>
                <p><b>EMail: </b>{{ $order->customer->email }}</p>
                <p>
                    <b>Dirección: </b>{{ $order->customer->address }}
                     | @if($order->customer->geoprov)
                        {{ $order->customer->geoprov->name }} 
                     | @endif
                    @if($order->customer->geoloc)
                        {{ $order->customer->geoloc->name }} <br>
                    @endif
                </p>
                <p><b>Método de pago: </b>{{ $order->payment->name }}</p>
                <p><b>Envío: </b>{{ $order->shipping->name }}</p>
                <br>
                <h1>OBSERVACIONES: </h1>
                @if($order->shipping_details == '' || $order->shipping_details == null)
                    <div style="height: 70px"></div>
                @else
                    <p style="padding-bottom: 20px"><b>{{ $order->shipping_details}}</b></p>
                @endif
            </div>
            <div class="footer">
                <h1>REMITENTE:</h1>
                <p><b>Nombre y Apellido: </b> Georgina Giorgi</p>
                <p><b>DNI: </b> 33.349.354</p>
                <p><b>Teléfonos: </b> 11-3321-2292</p>
                <p><b>Ciudad de Buenos Aires </b>
            </div>
        </div>
        @php($count++)
        @if($count == 1)
            <div class="page-break"></div>
            @php($count = 0)
        @endif
    @endforeach
@endsection
