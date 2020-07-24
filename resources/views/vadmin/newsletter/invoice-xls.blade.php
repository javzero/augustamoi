@extends('vadmin.partials.invoice-excel')

@section('content')
<table class="table">
    <thead>
        <tr>
            <th>NEWSLETTER - Emails</th>
        </tr>
    </thead>
    <tbody>
    @foreach($items as $item)
    <tr>
        <td>{{$item->email }}</td>
    </tr>
    @endforeach			
    </tbody>
</table>
@endsection