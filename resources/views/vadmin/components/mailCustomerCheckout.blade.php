@component('mail::layout')
    {{-- Header --}}
    @slot('header')
        @component('mail::header', ['url' => config('app.url')])
            {{ APP_BUSSINESS_NAME }} Indumentaria
        @endcomponent
    @endslot

#<center>Hemos recibido tu compra</center>

###<center> Tu pedido tiene un tiempo de elaboración de entre <b>4 y 7 días corridos</b> desde este momento. <br>
    Te contactaremos para que realices el pago y coordinar juntos detalles del despacho. <br> 
    Cualquier duda te dejamos nuestro <b> WhatsApp 1133212292</b>
</center>

###<center> Nos pondremos en contacto a la brevedad
#<center> Muchas gracias !</center>

    @slot('subcopy')
        @component('mail::subcopy')
            <!-- subcopy here -->
        @endcomponent
    @endslot

    {{-- Footer --}}
    @slot('footer')
        @component('mail::footer')
        Mensaje enviado desde <b>Vadmin</b> | Desarrollado por <a href="https:///vimanastudio.com.ar">Vimana Studio</a>
        @endcomponent
    @endslot
@endcomponent
