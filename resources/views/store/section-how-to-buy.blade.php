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
                <p>Para ver talles y colores de cada modelo así como para comprar debes crear tu usuario e ingresar al sistema.</p>
            </div>
            
            <div class="col-sm-12 col-md-3 col-lg-3 item">
                <img src="{{ asset('images/web/como-comprar/2.svg') }}" alt="Augustamoi-Icon">
                <h4><b>Agregar Productos</b></h4>
                <p>Elegí el producto que más te guste, selecciona la combinación de color y talles disponibles. Ahora podés agregar al carrito!</p>
            </div>

            <div class="col-sm-12 col-md-3 col-lg-3 item">
                <img src="{{ asset('images/web/como-comprar/3.svg') }}" alt="Augustamoi-Icon">
                <h4><b>Acordar con el vendedor / Cheques</b></h4>
                <p>Nos pondremos en contacto dentro de las 48 hs habiles via Whatsapp posterior al cierre del pedido.</p>
            </div>

            <div class="col-sm-12 col-md-3 col-lg-3 item">
                <img src="{{ asset('images/web/como-comprar/4.svg') }}" alt="Augustamoi-Icon">
                <h4><b>Mercado Pago</b></h4>
                <p>Si elegís MERCADO PAGO el sistema está integrado a la web asi que directamente lo haces en el momento.. Podes pagar con dinero disponible en Mercado Pago con un 15% de recargo</p>
            </div>

            <div class="col-sm-12 col-md-3 col-lg-3 item">
                <img src="{{ asset('images/web/como-comprar/5.svg') }}" alt="Augustamoi-Icon">
                <h4><b>Ingreso / Registro</b></h4>
                <p>Para ver talles y colores de cada modelo así como para comprar debes crear tu usuario e ingresar al sistema.</p>
            </div>
            
            <div class="col-sm-12 col-md-3 col-lg-3 item">
                <img src="{{ asset('images/web/como-comprar/6.svg') }}" alt="Augustamoi-Icon">
                <h4><b>Agregar Productos</b></h4>
                <p>Elegí el producto que más te guste, selecciona la combinación de color y talles disponibles. Ahora podés agregar al carrito!</p>
            </div>

            <div class="col-sm-12 col-md-3 col-lg-3 item">
                <img src="{{ asset('images/web/como-comprar/7.svg') }}" alt="Augustamoi-Icon">
                <h4><b>Acordar con el vendedor / Cheques</b></h4>
                <p>Nos pondremos en contacto dentro de las 48 hs habiles via Whatsapp posterior al cierre del pedido.</p>
            </div>

            <div class="col-sm-12 col-md-3 col-lg-3 item">
                <img src="{{ asset('images/web/como-comprar/8.svg') }}" alt="Augustamoi-Icon">
                <h4><b>Mercado Pago</b></h4>
                <p>Si elegís MERCADO PAGO el sistema está integrado a la web asi que directamente lo haces en el momento.. Podes pagar con dinero disponible en Mercado Pago con un 15% de recargo</p>
            </div>

        </div>
	</div>








        {{-- OLD --}}
		{{-- <div class="row justify-content-center main-title">
            <img src="{{ asset('images/web/como-comprar/titulo-1.png') }} " alt="Compras">
        </div>
        <div class="row text-center">
            <div class="col-sm-12 col-md-3 col-lg-3 item">
                <img src="{{ asset('images/web/como-comprar/img-1.jpg') }} " alt="Compras">
                <p>Para ver talles y colores de cada modelo así como para comprar debes crear tu usuario e ingresar al sistema.</p>
            </div>
            <div class="col-sm-12 col-md-3 col-lg-3 item">
                <img src="{{ asset('images/web/como-comprar/img-2.jpg') }} " alt="Compras">
                <p>Una vez que ingreses, elegí talle,
                        color y cantidad de cada modelo y el
                        sistema irá cargando tu carrito. Una
                        vez que hayas elegido todas las
                        prendas podrás previsualizar tu
                        pedido para corregir, cambiar, sacar
                        o agregar prendas.</p>
            </div>
            <div class="col-sm-12 col-md-3 col-lg-3 item">
                <img src="{{ asset('images/web/como-comprar/img-3.jpg') }} " alt="Compras">
                <p>Luego tendrás que elegir como
                        recibir la ropa y cómo querés pagar-
                        la. Las opciones son muchas. En este
                        paso sólo nos informas a nosotros lo
                        que preferís pero no realizas pago.</p>
            </div>
            <div class="col-sm-12 col-md-3 col-lg-3 item">
                <img src="{{ asset('images/web/como-comprar/img-4.jpg') }} " alt="Compras">
                <p>Si tenemos que entregar tu
                        encomienda en algún transporte de
                        tu localidad que se encuentra en
                        Soldati o Pompeya u otra zona de
                        expresos debes elegir la opción
                        motomensajería CABA y pagar $250
                        del cadete que usaremos
                        exclusivamente para enviar tu pedido.
                        <b>Retiro no tiene costo.</b>
                    </p>
            </div>
            <div class="col-sm-12 col-md-3 col-lg-3 item">
                <img src="{{ asset('images/web/como-comprar/img-5.jpg') }} " alt="Compras">
                <p>
                    Completá tus datos o los de quien va a recibir la encomienda en la pantalla
                     siguiente y listo! Conﬁrmas el pedido y te llega un mail para que estés tranquila de que lo recibimos.
                </p>
            </div>
            <div class="col-sm-12 col-md-3 col-lg-3 item">
                <img src="{{ asset('images/web/como-comprar/img-6.jpg') }} " alt="Compras">
                <p>
                    Una vez que hayas conﬁrmado tu pedido chequeamos stock y dentro de las 48 hs te contactamos para
                    decirte si está todo ok o si algo no está en stock para elegir juntos otra opción.
                </p>
            </div>

            <div class="col-sm-12 col-md-3 col-lg-3 item">
                <img src="{{ asset('images/web/como-comprar/img-7.jpg') }} " alt="Compras">
                <p>
                    El pago lo realizas cuando te contactamos por Whatsapp para enviarte datos de la cuenta bancaria o codígo de Rapi Pago, etc. 
                </p>
            </div>
            
            <div class="col-sm-12 col-md-3 col-lg-3 item">
                <img src="{{ asset('images/web/como-comprar/img-8.jpg') }} " alt="Compras">
                <p>
                    Luego del pago procedemos a armar tu pedido y el envío es dentro de las 48 hs siguientes.
                </p>
            </div>
        </div>
        <div class="row justify-content-center">
            <img src="{{ asset('images/web/como-comprar/titulo-2.png') }} " alt="Compras">
            <p class="text-center">
                <b>PRENDAS QUE NO TENGAMOS:</b> <br>Si el faltante se produjera luego de que hagas el pago de todos modos te informaremos para buscar <br>
                otra opción de color o modelo o para reembolsar el
                monto del producto que no tengamos. <br> <br>
                Los carros abiertos permanecen por 24 hs y luego se dan de baja. <br>
                No demores más de este tiempo para conﬁrmar tu pedido o te quedarás sin stock.
                <br><br>
                La venta es solo <b>mayorísta</b> con un mínimo por pedido de <b class="main-color">$5000.</b>
            </p>
        </div> --}}

	</div>
@endsection


