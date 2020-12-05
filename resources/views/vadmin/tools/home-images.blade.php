@extends('vadmin.partials.main')

@section('title', 'Vadmin | Configuración')

@section('styles')
@endsection

@section('content')
	<div class="dashboard">
		<div class="content-body">
			
			<h1>Configuraciones Generales</h1>
            <hr class="softhr">
            <div class="row">
                <div class="container-fluid">
                    <div class="col-md-12">
                        <div class="card">
                            <div class="card-block">
                                {!! Form::open(['route' => 'updateHomeImages', 'method' => 'POST', 'enctype' => 'multipart/form-data']) !!}	
                                    {{ csrf_field() }}

                                    {{-- HOME BANNER  --}}
                                    <div class="title-with-detail">
                                        <span class="title">Banners de página principal <span class="detail">| Tamaño recomendado 1920 x 400</span></span>
                                    </div>
                                    <br>
                                    <input class="btnSm btnBlue" type="submit" value="Actualizar">
                                    <br>
                                    
                                    <div class="single-image-upload">
                                        <label for="">Banner primer posición</label>
                                        <div class='preview' onclick="setImage('#HomeBanner1Input')">
                                            <img id="HomeBanner1Preview" src="{{ asset('images/web/home-banner-1.jpg') }}">                                        
                                            <div class="overlay"><div class="text">Hacé click para cambiar la imágen</div></div>
                                        </div>
                                        <input name="image[home-banner-1]" id="HomeBanner1Input" onchange="setImagePreview(this, '#HomeBanner1Preview')" type="file" class="Hidden" />
                                    </div>
                                    
                                    <div class="single-image-upload">
                                        <label for="">Banner segunda posición</label>
                                        <div class='preview' onclick="setImage('#HomeBanner2Input')">
                                            <img id="HomeBanner2Preview" src="{{ asset('images/web/home-banner-2.jpg') }}">
                                            <div class="overlay"><div class="text">Hacé click para cambiar la imágen</div></div>
                                        </div>
                                        <input name="image[home-banner-2]" id="HomeBanner2Input" onchange="setImagePreview(this, '#HomeBanner2Preview')" type="file" class="Hidden" />
                                    </div>

                                    <div class="single-image-upload">
                                        <label for="">Banner tercer posición</label>
                                        <div class='preview' onclick="setImage('#HomeBanner3Input')">
                                            <img id="HomeBanner3Preview" src="{{ asset('images/web/home-banner-3.jpg') }}">   
                                            <div class="overlay"><div class="text">Hacé click para cambiar la imágen</div></div>
                                        </div>
                                        <input name="image[home-banner-3]" id="HomeBanner3Input" onchange="setImagePreview(this, '#HomeBanner3Preview')" type="file" class="Hidden" />
                                    </div>
                                      
                                    {{-- IMAGE FILTERS  --}}   
                                    <div class="title-with-detail">
                                        <span class="title">Imágenes de botones en página principal <span class="detail">| Tamaño recomendado 430 x 335</span></span>
                                    </div>
                                    
                                    
                                        <div class="row">
                                            <div class="col-md-4 single-image-upload">
                                                <label for="">Imágen primer posición</label>
                                                <div class='preview' onclick="setImage('#FilterImage1Input')">
                                                    <img id="FilterImage1Preview" src="{{ asset('images/web/filter-image-1.jpg') }}">   
                                                    <div class="overlay"><div class="text">Hacé click para cambiar la imágen</div></div>
                                                </div>
                                                <input name="image[filter-image-1]" id="FilterImage1Input" onchange="setImagePreview(this, '#FilterImage1Preview')" type="file" class="Hidden" />
                                            </div>
                                            <div class="col-md-4 single-image-upload">
                                                <label for="">Imágen segunda posición</label>
                                                <div class='preview' onclick="setImage('#FilterImage2Input')">
                                                    <img id="FilterImage2Preview" src="{{ asset('images/web/filter-image-2.jpg') }}">   
                                                    <div class="overlay"><div class="text">Hacé click para cambiar la imágen</div></div>
                                                </div>
                                                <input name="image[filter-image-2]" id="FilterImage2Input" onchange="setImagePreview(this, '#FilterImage2Preview')" type="file" class="Hidden" />
                                            </div>
                                            <div class="col-md-4 single-image-upload">
                                                <label for="">Imágen tercer posición</label>
                                                <div class='preview' onclick="setImage('#FilterImage3Input')">
                                                    <img id="FilterImage3Preview" src="{{ asset('images/web/filter-image-3.jpg') }}">   
                                                    <div class="overlay"><div class="text">Hacé click para cambiar la imágen</div></div>
                                                </div>
                                                <input name="image[filter-image-3]" id="FilterImage3Input" onchange="setImagePreview(this, '#FilterImage3Preview')" type="file" class="Hidden" />
                                            </div>
                                        </div>
                                

                                    <input class="btnSm btnBlue" type="submit" value="Actualizar">
                                {!! Form::close() !!}
                            </div>
                        </div>
                    </div>
                   
                </div>
            </div>    
        </div>
    </div>
    <div id="Error"></div>
@endsection

@section('scripts')
    <script>
        function setImage(id) {
            $(id).click();
            
        }


        function setImagePreview(input, previewDiv) {
            console.log(input);
            if (input.files && input.files[0]) {
                var reader = new FileReader();
                
                reader.onload = function (e) {
                    $(previewDiv).attr('src', e.target.result);
                }
                
                reader.readAsDataURL(input.files[0]);
            }
        }
    </script>
@endsection

