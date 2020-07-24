@extends('store.partials.main')

@section('header-image')
	<img src="{{ asset('images/web/home-banner-1.jpg')}}" alt="Augustamoi Banner">		
	{{-- <div class="index-header">	
	</div> --}}
@endsection

@section('content')
	<div class="container-fluid info-container">
		<div class="row justify-content-center">
            <h3><b>Formas de Envío</b></h3>
        </div>
        <div class="row text-center">
            <p>Luego tendrás que elegir como recibir la ropa y cómo querés pagarla. 
            Las opciones son muchas. En este paso sólo nos informas a nosotros lo que preferís pero no realizas pago.</p>
        </div>
        <div class="row justify-content-center text-center">
            <h4>Envíos y expresos</h4>
            <p>Los expresos y transportes de Villa Soldati, Pompeya y Parque Patricios no tienen costo de acarreo asi como 
            las empresas de encomiendas como por ej Via Cargo. <br>Nosotros nos ocupamos de entregarlo GRATIS, solamente elegilas 
            para informarnos. <br> No utilizamos correos a domicilio ni pago del transporte por adelantado.  <br>El pago es en tu destino.
             En caso de no estar disponible la empresa que elegiste al momento de entregar el pedido se optará por otra empresa 
             que llegue tambien a tu localidad en los mismos términos.
            </p>
        </div>

	</div>
@endsection


