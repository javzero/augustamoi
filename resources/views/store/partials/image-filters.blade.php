{{-- Categories Images --}}
<div class="container-fluid">
	<div class="row image-filters">
		<a class="col-md-4 filter-item image-filters-1" href="{{ route('store', ['filtrar' => 'descuentos']) }}">
			<img src="{{ asset('images/web/filterimages/filter-image-1.jpg') }}" alt="">
		</a>
		<a class="col-md-4 filter-item image-filters-2" href="{{ route('store', ['filtrar' => 'populares']) }}">
			<img src="{{ asset('images/web/filterimages/filter-image-2.jpg') }}" alt="">
		</a>
		<a class="col-md-4 filter-item image-filters-3 " href="{{ route('store', ['filtrar' => 'nuevos']) }}">
			<img src="{{ asset('images/web/filterimages/filter-image-3.jpg') }}" alt="">
		</a>
	</div>
</div>