{{-- Categories Images --}}
<div class="container-fluid">
	<div class="row image-filters">
		<a class="col-md-4 filter-item image-filters-1" href="{{ route('store', ['filtrar' => 'descuentos']) }}">
			<img src="{{ asset('images/gral/filterimages/filter-image-1.jpg') }}" alt="">
			<button class="btn button FadeSlow">Con Descuento <span class="chevron">></span></button>
		</a>
		<a class="col-md-4 filter-item image-filters-2" href="{{ route('store', ['filtrar' => 'populares']) }}">
			<img src="{{ asset('images/gral/filterimages/filter-image-2.jpg') }}" alt="">
			<button class="btn button FadeSlow">Populares <span class="chevron">></span></button>
		</a>
		<a class="col-md-4 filter-item image-filters-3 " href="{{ route('store', ['filtrar' => 'nuevos']) }}">
			<img src="{{ asset('images/gral/filterimages/filter-image-3.jpg') }}" alt="">
			<button class="btn button FadeSlow">Nuevos Ingresos <span class="chevron">></span></button>
		</a>
	</div>
</div>