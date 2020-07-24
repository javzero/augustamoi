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
            <div class="col-sm-12 col-md-4 col-lg-4 item">
                <h4><b>Transferencia/depósito:</b></h4>
                <p>
                    Podes pagar eligiendo esta opción nos pondremos en contacto dentro de las 48 hs hábiles vía Whatsapp posterior al cierre del pedido para indicarte datos bancarios, operamos con BANCO NACIÓN Y BBVA.
                </p>
            </div>
            
            <div class="col-sm-12 col-md-4 col-lg-4 item">
                <h4><b>Mercado Pago:</b></h4>
                <p>
                    Si elegís MERCADOPAGO el sistema está integrado a la web así que directamente te llevará a la pantalla para que tildes la opción TARJETA, TRANSFERENCIA DE MERCADO PAGO O RapiPago/PagoFácil. Dependerá de la que elijas el procedimiento que debas seguir. Las cuotas sin interés y promociones bancarias dependen exclusivamente de MERCADOPAGO y lo que ofrezca.
                </p>
            </div>

            <div class="col-sm-12 col-md-4 col-lg-4 item">
                <h4><b>Acordar con el vendedor </b></h4>
                <p>
                    Nos pondremos en contacto dentro de las 48 hs hábiles vía Whatsapp posterior al cierre del pedido para avanzar con el armado del pedido y que el pago lo realices al retirar la compra en nuestro showroom.
                </p>
            </div>

            {{-- <div class="col-sm-12 col-md-3 col-lg-3 item">
                <h4><b>Mercado Pago</b></h4>
                <p>Si elegís MERCADO PAGO el sistema está integrado a la web asi que directamente lo haces en el momento.. Podes pagar con dinero disponible en Mercado Pago con un 15% de recargo</p>
            </div> --}}

        </div>
	</div>
@endsection


