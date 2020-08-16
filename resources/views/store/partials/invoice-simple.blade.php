<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//ES" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <title>@yield('title')</title>
        <link rel="shortcut icon" href="{{ asset('webimages/logos/favicon.png') }}"><!-- Favicon -->
        <style>
            
            @font-face {
                font-family: 'Roboto', sans-serif,
                src: url({{ asset('/fonts/Roboto-Regular.ttf') }});
            }


            body { 
                font-family: Verdana, Geneva, sans-serif;
                font-size: 14px;
                padding: 0;
                margin: 0;
                
            }

            h1 {
                font-size: 15px;
                padding: 0
            }

            h2 {
                margin: 0;
                font-size: 14px
            }

            p {
                margin: 0;
                padding: 0;
                font-weight: 300
            }
            
            .softhr { border-top: 1px solid #E4E4E4 }
            
            .invoice-simple {
                width: 100%;
                padding: 10px
            }
    
            .page-break {
                page-break-after: always;
            }

            .avoid {
                page-break-inside: avoid !important;
            }

            .table-header {
                border: 1px solid #000
            }

            .table-header .brand img{
                width: 150px
            }

            .table-header th {
                width: 33.33%;
                max-width: 33.33%
            }

            .table-header th {
                padding: 10px;
                margin: 0
            }

            .content {
                word-wrap: break-word;
                border: 1px solid #000;
                border-top: 0;
                padding: 20px
            }

            .txtR { text-align: right }

            table {
                width: 100%;
                border-collapse: collapse;
            }

            .footer {
                border: 1px solid #000;
                border-top: 0;
                padding: 20px
            }
</style></head><body>@yield('content')</body></html>