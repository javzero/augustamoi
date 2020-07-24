<div class="container-fluid square-link-items">
	<div class="container">
		<div class="row">
			<ul id="SliCategories">
				{{-- {{ dd($categories)}} --}}
				@foreach($categories as $category)
					@if($category->activeArticles->count() > '0')
						<a href="{{ route('store', 'categoria='. $category->id)  }}">
							<span class="styled-item"> {{ $category->name }}</span>
						</a>
					@endif
				@endforeach
				
				{{-- <li class="styled-item"><a href="{{ route('store', 'categoria=58') }}">Para arriba</a></li>
				<li class="styled-item"><a href="{{ route('store', 'categoria=59') }}">Para abajo</a></li>
				<li class="styled-item"><a href="{{ route('store', 'categoria=32') }}">Vestidos</a></li> --}}

				<li class="stand-alone-item" onclick="OpenSearchField()">
					<i class="icon-search"></i>
				</li>
				{{-- {!! Form::open(['route' => 'store', 'method' => 'GET', 'class' => 'input-group form-group search-input']) !!}
					<span class="input-group-btn">
						<button type="submit"><i class="icon-search"></i></button>
					</span>
					<input class="form-control" name="buscar" type="search" placeholder="BUSCAR...">
				{!! Form::close() !!} --}}
			</ul>		
			<ul class="sli-search-field full-width" id="SliSearcher">
				<li class="form-inner">
					{!! Form::open(['route' => 'store', 'method' => 'GET', 'class' => 'input-group form-group search-input']) !!}
						<span class="input-group-btn">
							<button type="submit"><i class="icon-search"></i></button>
						</span>
						<input class="form-control" name="buscar" type="search" placeholder="BUSCAR...">
					{!! Form::close() !!}
				</li>
				<li class="close-search-field stand-alone-item" onclick="CloseSearchField()">x</li>
			</ul>
		</div>
	</div>
</div>