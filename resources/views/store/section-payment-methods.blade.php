@extends('store.partials.main')

@section('header-image')
	<img src="{{ asset('images/web/home-banner-1.jpg')}}" alt="Augustamoi Banner">		
	{{-- <div class="index-header">	
	</div> --}}
@endsection

@section('content')
	<div class="container-fluid info-container2">
		<div class="row justify-content-center">
            <h3><b>Formas de pago</b></h3>
            <p class="text-center">Luego de cerrar el pedido nos contactamos con vos para que efectúes el pago según hayas elegido.</p>
        </div>
        <div class="row text-center">
            <div class="col-sm-12 col-md-3 col-lg-3 item">
                <h4><b>Efectivo</b></h4>
                <p>Podes pagar en efectivo a través de depósito o transferencia bancaria. 
                Eligiendo esta opción nos pondremos en contacto dentro de las 48 hs habiles 
                via Whatsapp posterior al cierre del pedido.</p>
            </div>
            
            <div class="col-sm-12 col-md-3 col-lg-3 item">
                <h4><b>Tarjetas</b></h4>
                <p>Podes pagar con todas las tarjetas a través de MERCADOPAGO con un 15% de recargo</p>
            </div>

            <div class="col-sm-12 col-md-3 col-lg-3 item">
                <h4><b>Acordar con el vendedor / Cheques</b></h4>
                <p>Nos pondremos en contacto dentro de las 48 hs habiles via Whatsapp posterior al cierre del pedido.</p>
            </div>

            <div class="col-sm-12 col-md-3 col-lg-3 item">
                <h4><b>Mercado Pago</b></h4>
                <p>Si elegís MERCADO PAGO el sistema está integrado a la web asi que directamente lo haces en el momento.. Podes pagar con dinero disponible en Mercado Pago con un 15% de recargo</p>
            </div>

        </div>
	</div>
@endsection


