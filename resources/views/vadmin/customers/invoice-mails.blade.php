@extends('vadmin.partials.invoice-excel')

@section('content')
<table class="table">
    <tbody>
    @foreach($items as $item)
    <tr>
        <td>{{ $item }}</td>
    </tr>
    @endforeach			
    </tbody>
</table>
@endsection