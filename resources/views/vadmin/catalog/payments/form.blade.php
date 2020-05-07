<div class="form-group">
    {!! Form::label('name', 'Nombre') !!}
    {!! Form::text('name', null, ['class' => 'form-control', 'placeholder' => 'Nombre del método de pago', 'required' => '']) !!}
</div>  
<div class="form-group">
    {!! Form::label('description', 'Descripción') !!}
    {!! Form::textarea('description', null, ['class' => 'form-control', 'size' => '30x5', 'placeholder' => 'Describa el método de pago', 'required' => '']) !!}
</div>
<div class="row">
    
    <div class="col-md-6">   
        {!! Form::label('charge', 'Recargo') !!}
        <div class="input-group">
            <div class="input-group-prepend">
                <span class="input-group-text" id="basic-addon1">%</span>
            </div>
            {!! Form::number('charge', null, ['id' => 'PaymentChargeInput', 'onkeyup' => "setOtherToCero('#PaymentDiscountInput')", 'class' => 'form-control', 'min' => '0', 'step' => 'any', 'placeholder' => 'Ingrese el recargo', 'required' => '']) !!}
        </div>  
    </div>

    <div class="col-md-6">   
        {!! Form::label('discount', 'Descuento') !!}
        <div class="input-group">
            <div class="input-group-prepend">
                <span class="input-group-text" id="basic-addon1">%</span>
            </div>
            {!! Form::number('discount', null, ['id' => 'PaymentDiscountInput', 'onkeyup' => "setOtherToCero('#PaymentChargeInput')", 'class' => 'form-control', 'min' => '0', 'step' => 'any', 'placeholder' => 'Ingrese el descuento', 'required' => '']) !!}
        </div>  
    </div>

</div>