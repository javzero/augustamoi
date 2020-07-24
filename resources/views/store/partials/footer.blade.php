<footer>
    <div class="container bussiness-info">
        <div class="row">
            <div class="col-xs-12  col-md-4 col-lg-4 column bussines-data">
                <ul>
                    <li class="title brand"> <img src="{{ asset('webimages/web/app-logo.png') }}" alt="Augustamoi"> </li>
                    <li> <i class="fas fa-map-marker-alt"></i> Buenos Aires - Argentina </li>
                    <li> <i class="fas fa-phone-volume"></i> (+54) 11-3321-2292 </li>
                    <li> <i class="fas fa-paper-plane"></i> venta@augustamoi.com </li>
                </ul>
            </div>
            <div class="col-4 col-md-2 col-lg-2 column">
                <ul>
                    @if(Auth::guard('customer')->check())
                        <li class="title">MI CUENTA</li>
                        <li><a href="{{ url('tienda/cuenta') }}">Cuenta</a></li>
                        <li><a href="{{ url('tienda/pedidos') }}">Mis Pedidos</a></li>
                        <li><a href="{{ url('tienda/favoritos') }}">Favoritos</a></li>
                    @else
                        <li class="title">MI CUENTA</li>
                        <li><a href="{{ url('tienda/login') }}">Ingresar</a></li>
                        <li><a href="{{ url('tienda/registro') }}">Registrarse</a></li>
                    @endif
                </ul>
            </div>
            <div class="col-4 col-md-2 col-lg-2 column">
                <ul>
                    <li class="title">INFORMACIÓN</li>
                    <li><a href="{{ url('formas-de-pago') }}">Formas de Pago</a></li>
                    <li><a href="{{ url('formas-de-envio') }}">Formas de Envío</a></li>
                    <li><a href="{{ url('como-comprar') }}">Como Comprar</a></li>
                </ul>
            </div>
            <div class="col-4 col-md-2 col-lg-2 column">
                <ul>
                    <li class="title">CATEGORÍAS</li>
                    <li><a href="{{ url('tienda?categoria=59') }}">Para Abajo</a></li>
                    <li><a href="{{ url('tienda?categoria=58') }}">Para Arriba</a></li>
                    <li><a href="{{ url('tienda?categoria=32') }}">Vestidos</a></li>
                </ul>
                
            </div>
            <div class="col-12 col-md-2 col-lg-2 column">
                <ul>
                    <li class="title">SHOW ROOM</li>
                    <li>&bull; Venta Mayorísta</li>
                    <li>&bull; Showroom Caballito</li>
                    <li>&bull; Solo con cita previa</li>
                </ul>
            </div>
        </div>
    </div>
    <div class="container">
        <hr>
        <div class="row inner">
            <div class="col-xs-12 col-sm-6 col-md-6">
                <div class="copyright">
                    © {{ date('Y') }} - Desarrollado por <a href="https://vimanastudio.com.ar" target="_blank">&nbsp; Vimana Studio </a>
                </div>
            </div>
            <div class="col-xs-12 col-sm-6 col-md-6">
                <div class="horizontal-list">
                    <ul>
                        <li class="round-icon"><a href="https://www.facebook.com/augustamoimayorista" target="_blank"><i class="fab fa-facebook-f"></i></a></li>
                        <li class="round-icon"><a href="https://www.instagram.com/augusta_moi/" target="_blank"><i class="fab fa-instagram"></i></a></li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</footer>