<script>

    /*
    |--------------------------------------------------------------------------
    | Laravel Token
    |--------------------------------------------------------------------------
    */

    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
    });

    /*
    |--------------------------------------------------------------------------
    | ALERTS - IziToast (http://izitoast.marcelodolce.com/)
    |--------------------------------------------------------------------------
    */
    // Positions:  bottomRight, bottomLeft, topRight, topLeft, topCenter, bottomCenter or center.
    
    function toast_success(title = '', text = '', position = 'bottomRight', action, time = '5000'){
        iziToast.show({
            title: title,
            message: text,
            position: position,
            messageSize: '1.5rem',
            color: '#C2185B',
            timeout: time,
            onClosing: function () {
                switch(action) {
                    case 'reload':
                        location.reload();
                        break;
                    default:
                        // console.log('No action');
                        break;
                }
            },
        });
    }

    function toast_error(title = '', text = '', position = 'bottomRight', action, time = '5000'){
        iziToast.show({
            title: title,
            message: text,
            position: position,
            color: 'rgb(252 67 67)',
            timeout: time,
            onClosing: function () {
                switch(action) {
                    case 'reload':
                        location.reload();
                        break;
                    case 'none':
                        // console.log('No action');
                        break;
                    default:
                        
                        break;
                }
            },
        });
    }

    /*
    |--------------------------------------------------------------------------
    | Customer Avatar
    |--------------------------------------------------------------------------
    */

    $(document).ready(function() {
        $('#UpdateCustomerAvatarBtn').click(function(){
            $('#CustomerAvatarInput').click();
        });       
    });
    function readURL(input) {
        if (input.files && input.files[0]) {
            var reader = new FileReader();

            reader.onload = function (e) {
                $('.Image-Container').attr('src', e.target.result);
            }
                reader.readAsDataURL(input.files[0]);
            }
        }
        $("#CustomerAvatarInput").change(function(){
        readURL(this);
        $('#ConfirmChange').removeClass('Hidden');
    });

    /*
    |--------------------------------------------------------------------------
    | Newsletter
    |--------------------------------------------------------------------------
    */

    function submitNewsletter() {
        console.log("SUBMITEANDO");

        let data = $('#NewsletterForm').serialize();
        
        $.ajax({
            url: '/vadmin/saveNewsletterEmail',
            method: 'POST',
            data: data,
            success: function success(data) {
            
                if(data.status == 'success') {
                    toast_success(data.message)
                } else if(data.status == 'validationError') {
                    
                    let message = data.message['email'];
                    message.forEach(function(item) {
                        toast_error(item);
                    });
                }
            },
            error: function error(data) {
                console.log("Error guardando email", data);
            }
        });

    }
    
</script>