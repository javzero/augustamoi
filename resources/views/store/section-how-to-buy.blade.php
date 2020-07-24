@extends('store.partials.main')


@section('header-image')
	<img src="{{ asset('images/web/home-banner-1.jpg')}}" alt="Augustamoi Banner">		
	{{-- <div class="index-header">	
	</div> --}}
@endsection

@section('content')
	<div class="container-fluid info-container2">
		<div class="row justify-content-center">
            <h3><b>Como Comprar</b></h4>
            
        </div>
        <div class="row text-center">
            <br>
            <div class="col-sm-12 col-md-3 col-lg-3 item">
                <img src="{{ asset('images/web/como-comprar/1.svg') }}" alt="Augustamoi-Icon">
                <h4><b>Ingreso / Registro</b></h4>
                <p>
                    Para ver talles y colores de cada modelo así como para comprar debes crear tu usuario e ingresar al sistema.
                </p>
            </div>
            
            <div class="col-sm-12 col-md-3 col-lg-3 item">
                <img src="{{ asset('images/web/como-comprar/2.svg') }}" alt="Augustamoi-Icon">
                <h4><b>Agregar Productos</b></h4>
                <p>
                    Elegí el producto que más te guste, selecciona la combinación de color y talles disponibles. Ahora podés agregar al carrito!
                </p>
            </div>

            <div class="col-sm-12 col-md-3 col-lg-3 item">
                <img src="{{ asset('images/web/como-comprar/3.svg') }}" alt="Augustamoi-Icon">
                <h4><b>Monto Mínimo</b></h4>
                <p>
                   Para poder finalizar la compra tenés que alcanzar el monto mínimo de compra requerido que de $7500. Luego podrás iniciar tu pedido, haz clic en "Continuar"
                </p>
            </div>

            <div class="col-sm-12 col-md-3 col-lg-3 item">
                <img src="{{ asset('images/web/como-comprar/4.svg') }}" alt="Augustamoi-Icon">
                <h4><b>Forma de pago</b></h4>
                <p>
                   Elegí la forma de pago que te sea más cómoda para continuar con tu compra del listado que te ofrecemos.
                </p>
            </div>

            <div class="col-sm-12 col-md-3 col-lg-3 item">
                <img src="{{ asset('images/web/como-comprar/5.svg') }}" alt="Augustamoi-Icon">
                <h4><b>Elegí el envío</b></h4>
                <p>
                    El envío es a cargo del comprador, consulta las empresas que más te sirvan y el aparatado de aclaraciones de envío.
                </p>
            </div>
            
            <div class="col-sm-12 col-md-3 col-lg-3 item">
                <img src="{{ asset('images/web/como-comprar/6.svg') }}" alt="Augustamoi-Icon">
                <h4><b>Datos Personales</b></h4>
                <p>
                    Los datos que usaremos para el envio son los que están en el registro. Chequeá bien la informacion porque esa es la utilizaremos al momento de armar el rotulo del envio.
                </p>
            </div>

            <div class="col-sm-12 col-md-3 col-lg-3 item">
                <img src="{{ asset('images/web/como-comprar/7.svg') }}" alt="Augustamoi-Icon">
                <h4><b>Armado de pedidos</b></h4>
                <p>
                    Posterior al pago comenzamos la preparación del pedido, tené en cuenta que ese plazo varía de 48 a 96 hs habiles depediendo factores como alta demanda en temporada o epoca de fiestas.
                </p>
            </div>

            <div class="col-sm-12 col-md-3 col-lg-3 item">
                <img src="{{ asset('images/web/como-comprar/8.svg') }}" alt="Augustamoi-Icon">
                <h4><b>Chequeo de Stock</b></h4>
                <p>
                    Te avisaremos si algun producto no está en stock posterior al pago dándote las opciones de cambio o devolución del monto de dicho artículo.
                </p>
            </div>

        </div>
	</div>
        <div class="container-fluid full-info-container grey-bg">
            <div class="row">
                <div class="col-md-8">
                    <h4 class="red-font">¡ACLARACIONES!</h4>
                    <p>
                        Ante falla de productos deberan informarse dentro de las 48 hs de recibido el pedido, luego no se aceptarán reclamos. Podrás elegir entre dejar pendiente el monto para una proxima compra, elegir otro producto en caso de hacer un nuevo pedido o solicitar la devolucion del importe por el mismo medio que realizaste el pago de la compra.
                        MÍnimo de compra mayorista $7500  - Los productos no incluyen IVA.
                    </p>
                </div>
                <div class="col-md-4">
                    <h4 class="red-font">Cambios en mi pedido</h4>
                    <p>
                        Una vez finalizada la compra no se podrá quitar, agregar prendas ni cambiar el pedido, se anula la compra y deberás efectuar una nueva orden con un nuevo numero de pedido.
                    </p>
                </div>
            </div>
        </div>
@endsection


