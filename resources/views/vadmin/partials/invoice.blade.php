<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//ES" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <title>@yield('title')</title>
        <link rel="shortcut icon" href="{{ asset('webimages/logos/favicon.png') }}"><!-- Favicon -->
        <style>
            .invoice .title {
                font-family: Verdana, Geneva, sans-serif;
                font-size: 18px;
                margin-left: 20px
            }

            .highlight{
                border: 1px solid rgba(red,.3);
            }

            .center {
                text-align: center
            }

            table {
                width: 100%
            }

            td,th {
                padding-left: 20px;
                font-family: Verdana, Geneva, sans-serif;
                font-size: 14px
            }

            td {
                padding-top: 5px 
            }

            thead {
                border-bottom: 1px solid #383838
            }

            th {
                height: 45px;
            }

            .txtR, .text-right {
                text-align: right;
            }

            .txtL {
                text-align: left;
            }
        </style>
    </head>
    <body>
        <div class="invoice">
            <div class="table-responsive">
                <span class="title">@yield('title')</span>
                <table id="TableList" class="table table-bordered table-striped custom-list">
                    <thead>
                        <tr>
                            @yield('table-titles')
                        </tr>
                    </thead>
                    <tbody>
                        @yield('table-content')
                    </tbody>
                </table>
            </div>
        </div>
    </body>
</html>

