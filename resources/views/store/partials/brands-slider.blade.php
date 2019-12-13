{{-- Brands Slider --}}
<div class="brands-slider">
	<div class="BrandsSlider owl-carousel owl-theme">
		@foreach($brands as $brand)
			<div class="item"><a href="{{ route('store', 'marca=').$brand->id }}">{{ $brand->name }}</a></div>
		@endforeach
	</div>
</div>