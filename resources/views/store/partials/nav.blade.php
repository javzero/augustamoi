{{-- DESKTOP NAVIGATION --}}
<header class="navbar navbar-sticky">
	<div class="site-branding">
		<!-- Site Logo-->
		<a href="{{ url('/') }}">
			<img src="{{ asset('webimages/web/app-logo.png') }}" alt="Augustamoi">
		</a>
	</div>
	<ul class="nav navbar-nav left-nav-items">
		@foreach($brands as $brand)
			
			{{-- {{ dd() }} --}}
			<li><a class="@if(app('request')->input('marca') == $brand->id) active @endif" href="{{ route('store', 'marca=').$brand->id }}">{{ $brand->name }}</a></li>
		@endforeach
	</ul>
	<div class="nav-actions">
		@include('store.partials.userbar')
	</div>
</header>

{{-- MOBILE NAVIGATION TRIGGER AND BRAND --}}
<div class="navbar-mobile">
	<div class="open-btn">
		<div id="navfull-top-btn" class="navfull-button navfull-top-button">
			<div class="toggle-button">
				<span class="bar top"></span>
				<span class="bar middle"></span>
				<span class="bar bottom"></span>
			</div>
		</div>
	</div>
	<div class="site-branding">
		<!-- Site Logo-->
		<a href="{{ url('/') }}">
			<img src="{{ asset('webimages/web/app-logo.png') }}" alt="Augustamoi">
		</a>
	</div>
</div>

{{-- MOBILE NAVIGATION --}}
<div class="MobileNavigation navfull">
	<div class="menu-content">
		<div class="nav-items content-effect">
			<ul>
				@if(Auth::guard('customer')->check())
					<li>
						<a onclick="checkoutSidebar();">
							CARRO DE COMPRAS
							<span class="details">
								(
								<span class="TotalCartItems count">@if($activeCart['totalItems'] == 0) 0 @else x{{ $activeCart['totalItems'] }} @endif</span>
								/ <span class="CartSubTotal subtotal">@if($activeCart['totalItems'] != 0) $ {{ $activeCart['cartSubTotal'] }} @endif</span>
								)	
							</span>
						</a>
					</li>
					<li><a href="{{ route('store.customer-account') }}">MI CUENTA</a></li>
					<li><a href="{{ route('store.customer-orders') }}">MIS PEDIDOS</a></li>
					<li><a href="{{ route('store.customer-wishlist') }}">FAVORITOS</a></li>
					<li><a href="{{ route('store.checkout') }}">CHECKOUT</a></li>
					<li><a href="{{ url('como-comprar') }}">COMO COMPRAR</button></a></li>
					<li><a href="{{ route('customer.logout') }}" onclick="event.preventDefault(); document.getElementById('logout-form').submit();">
						DESCONECTAR
						<form id="logout-form" action="{{ route('customer.logout') }}" method="POST" style="display: none;">
							{{ csrf_field() }}
						</form>
					</a></li>
				@else
					<li><a href="{{ route('customer.login') }}">INGRESAR</button></a></li>
					<li><a href="{{ url('tienda/registro') }}">REGISTRARSE</button></a></li>
					<li><a href="{{ url('como-comprar') }}">COMO COMPRAR</button></a></li>
				@endif
				
			</ul>
		</div>
		<div class="foot-info content-effect">
			<p><a><i class="fas fa-phone"></i>&nbsp; 11-3321-2292</a></p>
			<p><a href="mailto:venta@augustamoi.com"><i class="far fa-envelope"></i>&nbsp; venta@augustamoi.com</a></p>
			<div class="horizontal-list">
				<ul>
					<li>
						<a class="social-button sb-facebook shape-none sb-dark" href="https://www.facebook.com/augustamoimayorista" target="_blank">
							<i class="socicon-facebook"></i>
						</a>
					</li>
					<li>
						<a class="social-button sb-instagram shape-none sb-dark" href="https://www.instagram.com/augusta_moi/" target="_blank">
							<i class="socicon-instagram"></i>
						</a>
					</li>
				</ul>
			</div>
		</div>
	</div>
</div>
{{-- <div class="under-nav-container">
	@if(!Auth::guard('customer')->check())
		<div class="login-register-btn-mobile">
			<a href="{{ route('customer.login') }}"><button class="btn btn-primary btn-main-sm-hollow">Ingresar</button></a>
			<a href="{{ url('tienda/registro') }}"><button class="btn btn-primary btn-main-sm">Registrarse</button></a>
		</div>
	@endif
	<ul class="under-nave-items">
		<li><a href="{{ url('como-comprar') }}"><i class="far fa-question-circle"></i> Cómo comprar?</a></li>
	</ul>
	
	<div class="text-links">
		@if(Auth::guard('customer')->check() && Auth::guard('customer')->user()->group == '3' )
		<a href="{{ url('politica-de-exclusividad') }}">Política de Exclusividad</a>
		<a href="{{ url('condiciones-de-compra') }}">Condiciones de Compra</a>
		@endif
	</div>
</div> --}}

