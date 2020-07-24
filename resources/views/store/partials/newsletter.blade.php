<section class="container-fluid newsletter">
    <div class="container">
        <div class="row">
            <div class="col-md-5">
                <div class="items-horizontal">
                    <div class="item1"><b>Newsletter</b></div>
                    <div class="item2">Suscribite a nuestro newsletter <br> para recibir las últimas noticias</div>
                </div>
            </div>
            <div class="col-md-7 flex-center">
                {{-- <input type="text" value="" placeholder="Ingresá tu email"> --}}
                <form id="NewsletterForm" class="form-inline">
                    <div class="form-group">
                        <input type="email" name="email" placeholder="Ingresá tu email">
                    </div>
                    <button onclick="submitNewsletter()" type="button" class="btn btn-white">Suscribirme</button>
                </form>
            </div>
        </div>
    </div>
</section>