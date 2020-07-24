@extends('store.partials.main')

@section('header-image')
	<img src="{{ asset('images/web/home-banner-1.jpg')}}" alt="Augustamoi Banner">		
	{{-- <div class="index-header">	
	</div> --}}
@endsection

@section('content')
	<div class="container-fluid info-container2">
		<div class="row justify-content-center">
            <h3 class="red-font"><b>Formas de Envío</b></h3>
            
        </div>
        <div class="row text-center">
            <div class="col-sm-12 col-md-4 col-lg-4 item">
                <h4><b> Retiro de mercadería personalmente: </b></h4>
                <p>
                   Podrás elegir la opción retirar en local y nos indica que vas a retirar tu pedido por nuestro showroom. Te indicaremos previamente el dia para que puedas coordinar tu logistica. 
                </p>
            </div>
            
            <div class="col-sm-12 col-md-4 col-lg-4 item">
                <h4><b>Envíos por encomienda:</b></h4>
                <p>
                    Los expresos y transportes de Villa Soldati, Pompeya y Parque Patricios no tienen costo de acarreo asi como las empresas de encomiendas como por ej Via Cargo, Buspack, Crucero Express, etc. Nosotros nos ocupamos de entregarlo GRATIS, solamente elegilas para informarnos. No utilizamos correos a domicilio ni pago del transporte por adelantado. El pago es en tu destino.
En caso de no estar disponible la empresa que elegiste al momento de entregar el pedido se optará por otra empresa que llegue tambien a tu localidad en los mismos términos y condiciones.
                </p>
            </div>

            <div class="col-sm-12 col-md-4 col-lg-4 item">
                <h4><b>Moto caba/gba: </b></h4>
                <p>
                    esta opcion la elegís desde la web, tené en cuenta que te sumará al total de la compra el monto de la moto elegida. GBA: PRIMER CORDON $550. CABA: $300. Moto GBA puede tener alguna alteracion en el precio si el envio es mas lejos del estipulado en los $550, te avisaremos antes de enviarlo. Coordinaremos juntas el dia y la hora de entrega en tu domicilio.
                </p>
            </div>

            {{-- <div class="col-sm-12 col-md-3 col-lg-3 item">
                <h4><b>Mercado Pago</b></h4>
                <p>Si elegís MERCADO PAGO el sistema está integrado a la web asi que directamente lo haces en el momento.. Podes pagar con dinero disponible en Mercado Pago con un 15% de recargo</p>
            </div> --}}

        </div>
	</div>
@endsection


