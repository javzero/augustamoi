<!-- Navbar-->
<!-- Remove ".navbar-sticky" class to make navigation bar scrollable with the page.-->
<header class="navbar navbar-sticky">
	<!-- Search-->
	{{-- <form class="site-search" method="get">
		<input type="text" name="site_search" placeholder="Type to search...">
		<div class="search-tools"><span class="clear-search">Clear</span><span class="close-search"><i class="icon-cross"></i></span></div>
	</form> --}}
	<div class="site-branding">
		{{-- <div class="inner"> --}}
			<!-- Site Logo-->
			<a href="{{ url('/') }}">
				<img src="{{ asset('webimages/web/app-logo.png') }}" alt="Augustamoi">
			</a>
		{{-- </div> --}}
	</div>
	<!-- Main Navigation-->
	@include('store.partials.userbar')

</header>
<div class="under-nav-container">
	@if(!Auth::guard('customer')->check())
	<div class="login-register-btn-mobile">
		<a href="{{ route('customer.login') }}"><button class="btn btn-primary btn-sm">Ingresar</button></a>
		<a href="{{ url('tienda/registro') }}"><button class="btn btn-primary btn-sm">Registrarse</button></a>
	</div>
	@endif
	{{-- <div class="text-links"> --}}
		{{-- @if(Auth::guard('customer')->check() && Auth::guard('customer')->user()->group == '3' )
		<a href="{{ url('politica-de-exclusividad') }}">Política de Exclusividad</a>
		<a href="{{ url('condiciones-de-compra') }}">Condiciones de Compra</a>
		@endif --}}
		{{-- <a href="{{ url('como-comprar') }}">Como comprar</a>  --}}
	{{-- </div> --}}
</div>
