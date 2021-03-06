@extends('vadmin.partials.invoice')

@section('title', 'Valuación de Stock')

@section('table-titles')
    <th>Cód.</th>
    <th>Nombre</th>
    <th class="text-right">Precio U.</th>
    <th class="text-right">Stock</th>
    <th class="text-right">Valor</th>
@endsection

@section('table-content')
    
    @php 
        $totalStock = 0;
        $totalValue = 0;
    @endphp

    @foreach($items as $item)
        {{-- {{ dd($item) }} --}}
        @php
            $stock = 0;    
            $value = calcArticlePrice($item->reseller_price, $item->reseller_discount);
        @endphp 
        
        @foreach ($item->variants as $variant )
            {{-- {{ dd($variant->stock) }} --}}
            @php
                $stock += $variant->stock;
                
            @endphp
        @endforeach
        <tr>
            <td class="w-50"> {{ $item->code }} </td>
            <td class="max-text">{{ $item->name }}</td>
            <td class="text-right"> 
                @if($item->reseller_discount != 0)
                    $ {{ calcArticlePrice($item->reseller_price, $item->reseller_discount) + 0 }} ($ {{ $item->reseller_price + 0 }})
                @else
                    $ {{ $item->reseller_price + 0}} 
                @endif </td>
            <td class="text-right"> {{ $stock }} </td>	
            <td class="text-right"> $ {{ $value * $stock }} </td>
        </tr>
        @php
            $totalStock += $stock;
            $totalValue += $value * $stock;
        @endphp

    @endforeach
    <tr >
        <td class="border-top"></td>
        <td class="border-top"></td>
        <td class="border-top"></td>
        <td class="border-top text-right"><b>{{ $totalStock }}</b></td>
        <td class="border-top text-right"><b>$ {{ $totalValue }}</b></td>
    </tr>
    	
@endsection