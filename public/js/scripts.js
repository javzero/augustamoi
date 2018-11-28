/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 72);
/******/ })
/************************************************************************/
/******/ ({

/***/ 72:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(73);


/***/ }),

/***/ 73:
/***/ (function(module, exports) {

// Loaders
// -------------------------------------------
$(".loader-on-change").on('change', function () {
    $('#full-loader').removeClass('Hidden');
    return true;
});

$(".loader-on-submit").on('submit', function () {
    $('#full-loader').removeClass('Hidden');
    return true;
});

$('.dont-submit-on-enter, .dson').keypress(function (e) {
    console.log("ENTER");
    if (e.which == 13) return false;
    if (e.which == 13) e.preventDefault();
});

// Modify cart item quantity 
// -------------------------------------------
$('.InputBtnQ').on('change keyup', function () {
    //  Original Article Price
    var value = $(this).siblings('.ArticlePrice').val();
    // Quantity
    var quantity = $(this).val();
    // Ner Value
    var newValue = value * quantity;
    // New Price Target
    var newPriceTarget = $(this).parent().parent().parent().siblings('.TotalItemPrice');

    console.log(value, quantity, newValue);
    modifyCartItemQ($(this), newPriceTarget, newValue);
});

function modifyCartItemQ(e, newPriceTarget, newValue) {
    e.siblings('.InputBtnQ').removeClass('Hidden');
    newPriceTarget.html('$ ' + newValue);
}

$('#MainOverlay').click(function () {
    checkoutSidebar('hide');
});
// Checkout sidebar
// -------------------------------------------		
window.checkoutSidebar = function (state) {

    var sidebar = $('.CheckoutCart');
    // const floatingCheckout = $('.CheckoutCartFloating');
    var content = $('#MainContent');
    var overlay = $('#MainOverlay');

    var show = function show() {
        sidebar.addClass('active');
        // content.addClass('col-xs-12 col-lg-9 fix-column fix-column-small');
        overlay.fadeIn(200);
    };

    var hide = function hide() {
        // content.removeClass('col-lg-9 col-sm-8 col-md-8 fix-column fix-column-small');
        sidebar.removeClass('active');
        overlay.fadeOut(100);
    };

    if (state == undefined) {
        if (sidebar.hasClass('active')) {
            hide();
        } else {
            show();
        }
    } else if (state == 'show') {
        show();
        return false;
    } else if (state == 'hide') {
        hide();
        return false;
    }
};

window.openCheckoutDesktop = function () {
    if ($(window).width() > 768) {
        checkoutSidebar('show');
    }
    return false;
};

// $(window).scroll(function (event) {
//     var scroll = $(window).scrollTop();

//     if (scroll > 125) {
//         $('.checkout-cart').addClass('scrolled');
//     }
//     else {
//         $('.checkout-cart').removeClass('scrolled');
//     }
// });


// Sidebar checkout absolute
// window.checkoutSidebar = function (action) {
//     if (action == 'open') {
//         $('#SideContainer').toggle(100);
//         $('#MainOverlay').fadeIn(100);
//     }
//     if (action == 'close') {
//         $('#SideContainer').toggle(100);
//         $('#MainOverlay').fadeOut(100);
//     }
// }

// $('#MainOverlay').click(function () {
//     checkoutSidebar("close");
// });

window.openFilters = function () {
    var filters = $('#SearchFilters');
    if (filters.css('display') == 'none') {
        filters.css('display', 'inherit');
    } else {
        filters.css('display', 'none');
    }
};

// Hide alerts
// -------------------------------------------
// setTimeout(function(){
//     $('.alert').hide(100);
// }, 4000);


// Cart Resumen
// -------------------------------------------

// window.showCartResumeMobile = function()
// {
//     $('.cart-resume-details-mobile').toggleClass('Hidden', 100);
// }

/*
|--------------------------------------------------------------------------
| CART
|--------------------------------------------------------------------------
*/

window.sumAllItems = function () {
    sum = 0;
    $('.TotalItemPrice').each(function (index) {
        sum += parseInt($(this).html());
    });
    $('.SubTotal').html(sum);
};

// Sum divs text
window.sumDivs = function (origins, target) {
    var sum = 0;
    origins.each(function () {
        sum += parseFloat($(this).text());
    });
    target.text(sum);
};

// Check product variant stock
// -------------------------------------------
window.checkVariantStock = function () {
    var form = $('#AddToCartForm');
    var data = form.serialize();
    console.log(form.data('route'));
    var allowSubmit = false;
    $.ajax({
        url: form.data('route'),
        method: 'GET',
        dataType: 'JSON',
        async: false,
        data: data,
        success: function success(data) {
            if (data.response == true) {
                if (data.message == '0') {
                    $('.AvailableStock').html("No hay stock disponible");
                    $('#AddToCartFormBtn').prop('disabled', true);
                } else {
                    $('.AvailableStock').html("Stock disponible: " + data.message);
                    $('#AddToCartFormBtn').prop('disabled', false);
                    allowSubmit = true;
                    console.log("Entro en SUCCESS");
                }
                $('#MaxQuantity').prop("max", data.message);
            } else {
                $('#Error').html(data.responseText);
                console.log("Entro en error 1");
            }
        },
        error: function error(data) {
            $('#Error').html(data.responseText);
            // location.reload();
            allowSubmit = false;
            console.log(data);
            console.log("Entro en error 2");
        }
    });
    return allowSubmit;
};

// Set cart items JSON
// -------------------------------------------
window.setItemsData = function () {
    itemData = [];

    $('.Item-Data').each(function () {
        var id = $(this).data('id');
        var price = $(this).data('price');
        var variant_id = $(this).data('variant');
        var quantity = $(this).val();

        item = {};
        item['id'] = id;
        item['variant_id'] = variant_id;
        item['price'] = price;
        item['quantity'] = quantity;
        // Update display total item price
        total = price * quantity;
        $('.' + id + '-TotalItemPrice').html(total);

        itemData.push(item);
    });
    // Update Total
    console.info(itemData);
    sumAllItems();
    $('#Items-Data').val(itemData);
};

// Add product to cart
// -------------------------------------------
window.addToCart = function (route, data) {
    $.ajax({
        url: route,
        method: 'POST',
        dataType: 'JSON',
        data: data,
        success: function success(data) {
            // console.log(data);
            if (data.response == 'success') {
                $('.AvailableStock').html("Stock disponible: " + data.newStock);
                toast_success('Ok!', data.message, 'bottomCenter', '', 2500);
                updateTotals();
                setItemsData();
                setTimeout(function () {
                    setItemsData();
                    sumAllItems();
                    // openCheckoutDesktop();
                }, 100);
            } else if (data.response == 'warning') {
                toast_success('Ups!', data.message, 'bottomCenter');
            }
        },
        error: function error(data) {
            $('#Error').html(data.responseText);
            console.log("Error en addtoCart()");
            // location.reload();
            console.log(data);
        }
    });
};

// Remove product from cart
// -------------------------------------------
window.removeFromCart = function (route, cartItemId, variantId, quantity, div, action) {
    $.ajax({
        url: route,
        method: 'POST',
        dataType: 'JSON',
        data: { cartItemId: cartItemId, variantId: variantId, quantity: quantity, action: action, method: 'ajax' },
        success: function success(data) {
            if (data.response == 'cart-removed') {
                // console.log(data);
                updateTotals();
                window.location = window.location.href.split("?")[0];
                setItemsData();
            } else if (data.response == 'success') {
                $(div).hide(100);
                $(div).remove();
                updateTotals();
                setItemsData();
            }
        },
        error: function error(data) {
            //$('#Error').html(data.responseText);
            console.log("Error en removeFromCart()");
            console.log(data);
            // If an error pops when destroying an item, reload and prevent bad magic
            location.reload();
        }
    });
};

function updateTotals() {
    // Live Reloading stuff
    $("#SideContainerItemsFixed").load(window.location.href + " #SideContainerItemsFixed");
    $("#SideContainerItemsFloating").load(window.location.href + " #SideContainerItemsFloating");
    $(".TotalCartItems").load(window.location.href + " .TotalCartItems");
    $(".TotalCartItemsSidebar").load(window.location.href + " .TotalCartItemsSidebar");
    $(".CartSubTotal").load(window.location.href + " .CartSubTotal");
    $(".AvailableStock").load(window.location.href + " .AvailableStock");
}

// Submit Cart Form to Checkout
// -------------------------------------------
window.submitCartToCheckout = function (route, target, data, action) {
    //console.log("Ruta: " + route + " Target: " + target + " Data: " + data + "Action: "+ action);
    $.ajax({
        url: route,
        method: 'POST',
        dataType: 'JSON',
        data: { data: data, action: action },
        success: function success(data) {
            console.log(data);
            if (data.response == 'success') {
                console.log(target);
                if (target == 'reload') {
                    // Refresh page, delete parametters and open checkout sidebar
                    window.location = window.location.href.split("?")[0] + "?checkout-on";
                } else {
                    window.location.href = target;
                }
            } else {
                console.log('Error en submitForm');
                console.log(data);
                toast_error('', data.message, 'bottomCenter', '');
                $('.SideContainerError').html(data.message);
                // $('#Error').html(data.responseText);
            }
            $('#Error').html(data.responseText);
        },
        error: function error(data) {
            $('#Error').html(data.responseText);
            console.log("Error en submitForm()");
            console.log(data);
            // location.reload();
        }
    });
};

// Validate and set coupon
// -------------------------------------------
window.validateAndSetCoupon = function (route, code, cartid) {
    var couponDiv = $('#CouponDiv');
    var couponSet = $('#SettedCoupon');
    console.log(code, cartid);
    $.ajax({
        url: route,
        method: 'POST',
        dataType: 'JSON',
        data: { code: code, cartid: cartid },
        beforeSend: function beforeSend() {
            console.log("Comprobando cupón...");
            $('.CouponLoader').removeClass('Hidden');
        },
        success: function success(data) {
            if (data.response == true) {
                $('#CouponValidationMessage').html("Cupón aceptado !");
                couponDiv.hide(200, function () {
                    couponSet.removeClass('Hidden');
                });
                location.reload();
            } else if (data.response == null) {
                $('#CouponValidationMessage').html(data.message);
            }
        },
        error: function error(data) {
            $('#CouponValidationMessage').html(data.responseText);
            console.log(data);
        },
        complete: function complete() {
            $('.CouponLoader').addClass('Hidden');
        }
    });
};

// Favs
// -------------------------------------------
window.addArticleToFavs = function (route, favid, articleid, action, displayButton) {
    $.ajax({
        url: route,
        method: 'POST',
        dataType: 'JSON',
        data: { fav_id: favid, article_id: articleid },
        success: function success(data) {
            if (data.response == true && data.result == 'added') {
                switch (action) {
                    case 'reload':
                        location.reload();
                        break;
                    case 'show':
                        displayButton.removeClass('fav-icon-nofav');
                        displayButton.addClass('fav-icon-isfav');
                        toast_success('Ok!', 'Producto agregado a favoritos', 'bottomCenter', '', 1000);
                        break;
                    case 'none':
                        console.log('Actualizado - Sin Acción');
                    default:
                        console.log('No hay acción');
                        break;
                }
            } else if (data.response == true && data.result == 'removed') {
                displayButton.addClass('fav-icon-nofav');
                displayButton.removeClass('fav-icon-isfav');
                toast_success('Ok!', 'Producto eliminado de favoritos', 'bottomCenter', '', 1000);
            }
            setFavsTotalIcon(data.favsCount);
        },
        error: function error(data) {
            $('#Error').html(data.responseText);
            console.log(data);
        }
    });
};

function setFavsTotalIcon(favs) {
    if (favs > 0) {
        $('.FavMainIcon').removeClass('far');
        $('.FavMainIcon').addClass('fa');
    } else if (favs == 0) {
        $('.FavMainIcon').removeClass('fa');
        $('.FavMainIcon').addClass('far');
    } else {
        $('.FavMainIcon').removeClass('fa');
        $('.FavMainIcon').removeClass('far');
        $('.FavMainIcon').addClass('fa');
        console.log("Error en setFavsTotalIcon()");
    }
}

window.removeArticleFromFavs = function (route, favid, action) {
    var doaction = action;
    $.ajax({
        url: route,
        method: 'POST',
        dataType: 'JSON',
        data: { fav_id: favid },
        success: function success(data) {
            $('#Error').html(data.responseText);
            console.log(data);
            if (data.response == true) {
                console.log(doaction);
                switch (doaction) {
                    case 'reload':
                        var action = 'reload';
                        toast_success('Ok!', 'Producto eliminado de favoritos', 'bottomCenter', action, 1000);
                        break;
                    default:
                        console.log('No hay acción');
                        break;
                }
            } else {
                //$('#Error').html(data.message['errorInfo']);
                console.log(data);
            }
        },
        error: function error(data) {
            //$('#Error').html(data.responseText);
            console.log(data);
        }
    });
};

window.removeAllArticlesFromFavs = function (route, customerid, action) {
    $.ajax({
        url: route,
        method: 'POST',
        dataType: 'JSON',
        data: { customer_id: customerid },
        success: function success(data) {
            console.log(data);
            //$('#Error').html(data.responseText);
            if (data.response == true) {
                switch (action) {
                    case 'reload':
                        location.reload();
                        break;
                    default:
                        console.log('No hay acción');
                        break;
                }
            } else {
                $('#Error').html(data.message['errorInfo']);
                console.log(data);
            }
        },
        error: function error(data) {
            //$('#Error').html(data.responseText);
            console.log(data);
        }
    });
};

/*
|--------------------------------------------------------------------------
| LOGIN AND REGISTER
|--------------------------------------------------------------------------
*/

$('#ResellerBox').hide();

window.openResellerRegistration = function () {
    $('#IsResellerCheckbox').prop('checked', true);
    $('.IfResellerEnable').prop('disabled', false);
    $('#ResellerBox').show(100);
    $('#ResellerCTA').hide(0);
    $('.NormaClientTitle').hide(0);
    $('.ResellerTitle').show(0);
};

window.closeResellerRegistration = function () {
    $('#IsResellerCheckbox').prop('checked', false);
    $('.IfResellerEnable').prop('disabled', true);
    $('#ResellerBox').hide(0);
    $('#ResellerCTA').show(100);
    $('.NormaClientTitle').show(0);
    $('.ResellerTitle').hide(0);
};

$(document).ready(function () {
    $('.GeoProvSelect').on('change', function () {
        var prov_id = $(this).val();
        getGeoLocs(prov_id);
    });
});

/*
|--------------------------------------------------------------------------
| MIX FUNCTIONS
|--------------------------------------------------------------------------
*/

window.closeElement = function (selector) {
    $(selector).hide(100);
};

window.getParam = function (parameterName) {
    var result = null,
        tmp = [];
    location.search.substr(1).split("&").forEach(function (item) {
        tmp = item.split("=");
        if (tmp[0] === parameterName) result = decodeURIComponent(tmp[1]);
    });
    return result;
};

window.getParams = function (url) {
    var params = {};
    var parser = document.createElement('a');
    parser.href = url;
    var query = parser.search.substring(1);
    var vars = query.split('&');
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split('=');
        params[pair[0]] = decodeURIComponent(pair[1]);
    }
    return params;
};

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgZWVlZTE1ODZlNzRkMjgwNmNiNjYiLCJ3ZWJwYWNrOi8vLy4vcmVzb3VyY2VzL2Fzc2V0cy9qcy9zdG9yZS9zY3JpcHRzLmpzIl0sIm5hbWVzIjpbIiQiLCJvbiIsInJlbW92ZUNsYXNzIiwia2V5cHJlc3MiLCJlIiwiY29uc29sZSIsImxvZyIsIndoaWNoIiwicHJldmVudERlZmF1bHQiLCJ2YWx1ZSIsInNpYmxpbmdzIiwidmFsIiwicXVhbnRpdHkiLCJuZXdWYWx1ZSIsIm5ld1ByaWNlVGFyZ2V0IiwicGFyZW50IiwibW9kaWZ5Q2FydEl0ZW1RIiwiaHRtbCIsImNsaWNrIiwiY2hlY2tvdXRTaWRlYmFyIiwid2luZG93Iiwic3RhdGUiLCJzaWRlYmFyIiwiY29udGVudCIsIm92ZXJsYXkiLCJzaG93IiwiYWRkQ2xhc3MiLCJmYWRlSW4iLCJoaWRlIiwiZmFkZU91dCIsInVuZGVmaW5lZCIsImhhc0NsYXNzIiwib3BlbkNoZWNrb3V0RGVza3RvcCIsIndpZHRoIiwib3BlbkZpbHRlcnMiLCJmaWx0ZXJzIiwiY3NzIiwic3VtQWxsSXRlbXMiLCJzdW0iLCJlYWNoIiwiaW5kZXgiLCJwYXJzZUludCIsInN1bURpdnMiLCJvcmlnaW5zIiwidGFyZ2V0IiwicGFyc2VGbG9hdCIsInRleHQiLCJjaGVja1ZhcmlhbnRTdG9jayIsImZvcm0iLCJkYXRhIiwic2VyaWFsaXplIiwiYWxsb3dTdWJtaXQiLCJhamF4IiwidXJsIiwibWV0aG9kIiwiZGF0YVR5cGUiLCJhc3luYyIsInN1Y2Nlc3MiLCJyZXNwb25zZSIsIm1lc3NhZ2UiLCJwcm9wIiwicmVzcG9uc2VUZXh0IiwiZXJyb3IiLCJzZXRJdGVtc0RhdGEiLCJpdGVtRGF0YSIsImlkIiwicHJpY2UiLCJ2YXJpYW50X2lkIiwiaXRlbSIsInRvdGFsIiwicHVzaCIsImluZm8iLCJhZGRUb0NhcnQiLCJyb3V0ZSIsIm5ld1N0b2NrIiwidG9hc3Rfc3VjY2VzcyIsInVwZGF0ZVRvdGFscyIsInNldFRpbWVvdXQiLCJyZW1vdmVGcm9tQ2FydCIsImNhcnRJdGVtSWQiLCJ2YXJpYW50SWQiLCJkaXYiLCJhY3Rpb24iLCJsb2NhdGlvbiIsImhyZWYiLCJzcGxpdCIsInJlbW92ZSIsInJlbG9hZCIsImxvYWQiLCJzdWJtaXRDYXJ0VG9DaGVja291dCIsInRvYXN0X2Vycm9yIiwidmFsaWRhdGVBbmRTZXRDb3Vwb24iLCJjb2RlIiwiY2FydGlkIiwiY291cG9uRGl2IiwiY291cG9uU2V0IiwiYmVmb3JlU2VuZCIsImNvbXBsZXRlIiwiYWRkQXJ0aWNsZVRvRmF2cyIsImZhdmlkIiwiYXJ0aWNsZWlkIiwiZGlzcGxheUJ1dHRvbiIsImZhdl9pZCIsImFydGljbGVfaWQiLCJyZXN1bHQiLCJzZXRGYXZzVG90YWxJY29uIiwiZmF2c0NvdW50IiwiZmF2cyIsInJlbW92ZUFydGljbGVGcm9tRmF2cyIsImRvYWN0aW9uIiwicmVtb3ZlQWxsQXJ0aWNsZXNGcm9tRmF2cyIsImN1c3RvbWVyaWQiLCJjdXN0b21lcl9pZCIsIm9wZW5SZXNlbGxlclJlZ2lzdHJhdGlvbiIsImNsb3NlUmVzZWxsZXJSZWdpc3RyYXRpb24iLCJkb2N1bWVudCIsInJlYWR5IiwicHJvdl9pZCIsImdldEdlb0xvY3MiLCJjbG9zZUVsZW1lbnQiLCJzZWxlY3RvciIsImdldFBhcmFtIiwicGFyYW1ldGVyTmFtZSIsInRtcCIsInNlYXJjaCIsInN1YnN0ciIsImZvckVhY2giLCJkZWNvZGVVUklDb21wb25lbnQiLCJnZXRQYXJhbXMiLCJwYXJhbXMiLCJwYXJzZXIiLCJjcmVhdGVFbGVtZW50IiwicXVlcnkiLCJzdWJzdHJpbmciLCJ2YXJzIiwiaSIsImxlbmd0aCIsInBhaXIiXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FB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U0FBUyxJQUFiO0FBQUEsUUFDSW1CLE1BQU0sRUFEVjtBQUVBeEMsYUFBU3lDLE1BQVQsQ0FDS0MsTUFETCxDQUNZLENBRFosRUFFS3hDLEtBRkwsQ0FFVyxHQUZYLEVBR0t5QyxPQUhMLENBR2EsVUFBVTFELElBQVYsRUFBZ0I7QUFDekJ1RCxjQUFNdkQsS0FBS2lCLEtBQUwsQ0FBVyxHQUFYLENBQU47QUFDQSxZQUFJc0MsSUFBSSxDQUFKLE1BQVdELGFBQWYsRUFBOEJsQixTQUFTdUIsbUJBQW1CSixJQUFJLENBQUosQ0FBbkIsQ0FBVDtBQUM3QixLQU5MO0FBT0EsV0FBT25CLE1BQVA7QUFDSCxDQVhEOztBQWNBcEYsT0FBTzRHLFNBQVAsR0FBbUIsVUFBUzNFLEdBQVQsRUFBYztBQUM3QixRQUFJNEUsU0FBUyxFQUFiO0FBQ0gsUUFBSUMsU0FBU2YsU0FBU2dCLGFBQVQsQ0FBdUIsR0FBdkIsQ0FBYjtBQUNBRCxXQUFPOUMsSUFBUCxHQUFjL0IsR0FBZDtBQUNBLFFBQUkrRSxRQUFRRixPQUFPTixNQUFQLENBQWNTLFNBQWQsQ0FBd0IsQ0FBeEIsQ0FBWjtBQUNBLFFBQUlDLE9BQU9GLE1BQU0vQyxLQUFOLENBQVksR0FBWixDQUFYO0FBQ0EsU0FBSyxJQUFJa0QsSUFBSSxDQUFiLEVBQWdCQSxJQUFJRCxLQUFLRSxNQUF6QixFQUFpQ0QsR0FBakMsRUFBc0M7QUFDckMsWUFBSUUsT0FBT0gsS0FBS0MsQ0FBTCxFQUFRbEQsS0FBUixDQUFjLEdBQWQsQ0FBWDtBQUNBNEMsZUFBT1EsS0FBSyxDQUFMLENBQVAsSUFBa0JWLG1CQUFtQlUsS0FBSyxDQUFMLENBQW5CLENBQWxCO0FBQ0E7QUFDRCxXQUFPUixNQUFQO0FBQ0EsQ0FYRCxDIiwiZmlsZSI6Ii9qcy9zY3JpcHRzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7XG4gXHRcdFx0XHRjb25maWd1cmFibGU6IGZhbHNlLFxuIFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGdldDogZ2V0dGVyXG4gXHRcdFx0fSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiL1wiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDcyKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCBlZWVlMTU4NmU3NGQyODA2Y2I2NiIsIi8vIExvYWRlcnNcbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiQoXCIubG9hZGVyLW9uLWNoYW5nZVwiKS5vbignY2hhbmdlJywgZnVuY3Rpb24gKCkge1xuICAgICQoJyNmdWxsLWxvYWRlcicpLnJlbW92ZUNsYXNzKCdIaWRkZW4nKTtcbiAgICByZXR1cm4gdHJ1ZTtcbn0pO1xuXG4kKFwiLmxvYWRlci1vbi1zdWJtaXRcIikub24oJ3N1Ym1pdCcsIGZ1bmN0aW9uICgpIHtcbiAgICAkKCcjZnVsbC1sb2FkZXInKS5yZW1vdmVDbGFzcygnSGlkZGVuJyk7XG4gICAgcmV0dXJuIHRydWU7XG59KTtcblxuJCgnLmRvbnQtc3VibWl0LW9uLWVudGVyLCAuZHNvbicpLmtleXByZXNzKGZ1bmN0aW9uIChlKSB7XG4gICAgY29uc29sZS5sb2coXCJFTlRFUlwiKTtcbiAgICBpZiAoZS53aGljaCA9PSAxMykgcmV0dXJuIGZhbHNlO1xuICAgIGlmIChlLndoaWNoID09IDEzKSBlLnByZXZlbnREZWZhdWx0KCk7XG59KTtcblxuLy8gTW9kaWZ5IGNhcnQgaXRlbSBxdWFudGl0eSBcbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiQoJy5JbnB1dEJ0blEnKS5vbignY2hhbmdlIGtleXVwJywgZnVuY3Rpb24gKCkge1xuICAgIC8vICBPcmlnaW5hbCBBcnRpY2xlIFByaWNlXG4gICAgbGV0IHZhbHVlID0gJCh0aGlzKS5zaWJsaW5ncygnLkFydGljbGVQcmljZScpLnZhbCgpO1xuICAgIC8vIFF1YW50aXR5XG4gICAgbGV0IHF1YW50aXR5ID0gJCh0aGlzKS52YWwoKTtcbiAgICAvLyBOZXIgVmFsdWVcbiAgICBsZXQgbmV3VmFsdWUgPSAodmFsdWUgKiBxdWFudGl0eSk7XG4gICAgLy8gTmV3IFByaWNlIFRhcmdldFxuICAgIGxldCBuZXdQcmljZVRhcmdldCA9ICQodGhpcykucGFyZW50KCkucGFyZW50KCkucGFyZW50KCkuc2libGluZ3MoJy5Ub3RhbEl0ZW1QcmljZScpO1xuXG4gICAgY29uc29sZS5sb2codmFsdWUsIHF1YW50aXR5LCBuZXdWYWx1ZSk7XG4gICAgbW9kaWZ5Q2FydEl0ZW1RKCQodGhpcyksIG5ld1ByaWNlVGFyZ2V0LCBuZXdWYWx1ZSk7XG59KVxuXG5mdW5jdGlvbiBtb2RpZnlDYXJ0SXRlbVEoZSwgbmV3UHJpY2VUYXJnZXQsIG5ld1ZhbHVlKSB7XG4gICAgZS5zaWJsaW5ncygnLklucHV0QnRuUScpLnJlbW92ZUNsYXNzKCdIaWRkZW4nKTtcbiAgICBuZXdQcmljZVRhcmdldC5odG1sKCckICcgKyBuZXdWYWx1ZSk7XG59XG5cblxuJCgnI01haW5PdmVybGF5JykuY2xpY2soZnVuY3Rpb24oKXtcbiAgICBjaGVja291dFNpZGViYXIoJ2hpZGUnKTtcbn0pXG4vLyBDaGVja291dCBzaWRlYmFyXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHRcdFxud2luZG93LmNoZWNrb3V0U2lkZWJhciA9IGZ1bmN0aW9uIChzdGF0ZSkge1xuXG4gICAgY29uc3Qgc2lkZWJhciA9ICQoJy5DaGVja291dENhcnQnKTtcbiAgICAvLyBjb25zdCBmbG9hdGluZ0NoZWNrb3V0ID0gJCgnLkNoZWNrb3V0Q2FydEZsb2F0aW5nJyk7XG4gICAgY29uc3QgY29udGVudCA9ICQoJyNNYWluQ29udGVudCcpO1xuICAgIGNvbnN0IG92ZXJsYXkgPSAkKCcjTWFpbk92ZXJsYXknKTtcblxuICAgIGNvbnN0IHNob3cgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHNpZGViYXIuYWRkQ2xhc3MoJ2FjdGl2ZScpO1xuICAgICAgICAvLyBjb250ZW50LmFkZENsYXNzKCdjb2wteHMtMTIgY29sLWxnLTkgZml4LWNvbHVtbiBmaXgtY29sdW1uLXNtYWxsJyk7XG4gICAgICAgIG92ZXJsYXkuZmFkZUluKDIwMCk7XG4gICAgfVxuXG4gICAgY29uc3QgaGlkZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgLy8gY29udGVudC5yZW1vdmVDbGFzcygnY29sLWxnLTkgY29sLXNtLTggY29sLW1kLTggZml4LWNvbHVtbiBmaXgtY29sdW1uLXNtYWxsJyk7XG4gICAgICAgIHNpZGViYXIucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xuICAgICAgICBvdmVybGF5LmZhZGVPdXQoMTAwKTtcbiAgICB9XG5cblxuICAgIGlmIChzdGF0ZSA9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgaWYgKHNpZGViYXIuaGFzQ2xhc3MoJ2FjdGl2ZScpKSB7XG4gICAgICAgICAgICBoaWRlKCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBzaG93KCk7XG4gICAgICAgIH1cbiAgICB9IGVsc2UgaWYgKHN0YXRlID09ICdzaG93Jykge1xuICAgICAgICBzaG93KCk7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9IGVsc2UgaWYgKHN0YXRlID09ICdoaWRlJykge1xuICAgICAgICBoaWRlKCk7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG59XG5cblxuXG53aW5kb3cub3BlbkNoZWNrb3V0RGVza3RvcCA9IGZ1bmN0aW9uKClcbntcbiAgICBpZiAoJCh3aW5kb3cpLndpZHRoKCkgPiA3NjgpIHtcbiAgICAgICAgY2hlY2tvdXRTaWRlYmFyKCdzaG93Jyk7XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbn1cblxuXG4vLyAkKHdpbmRvdykuc2Nyb2xsKGZ1bmN0aW9uIChldmVudCkge1xuLy8gICAgIHZhciBzY3JvbGwgPSAkKHdpbmRvdykuc2Nyb2xsVG9wKCk7XG5cbi8vICAgICBpZiAoc2Nyb2xsID4gMTI1KSB7XG4vLyAgICAgICAgICQoJy5jaGVja291dC1jYXJ0JykuYWRkQ2xhc3MoJ3Njcm9sbGVkJyk7XG4vLyAgICAgfVxuLy8gICAgIGVsc2Uge1xuLy8gICAgICAgICAkKCcuY2hlY2tvdXQtY2FydCcpLnJlbW92ZUNsYXNzKCdzY3JvbGxlZCcpO1xuLy8gICAgIH1cbi8vIH0pO1xuXG5cbi8vIFNpZGViYXIgY2hlY2tvdXQgYWJzb2x1dGVcbi8vIHdpbmRvdy5jaGVja291dFNpZGViYXIgPSBmdW5jdGlvbiAoYWN0aW9uKSB7XG4vLyAgICAgaWYgKGFjdGlvbiA9PSAnb3BlbicpIHtcbi8vICAgICAgICAgJCgnI1NpZGVDb250YWluZXInKS50b2dnbGUoMTAwKTtcbi8vICAgICAgICAgJCgnI01haW5PdmVybGF5JykuZmFkZUluKDEwMCk7XG4vLyAgICAgfVxuLy8gICAgIGlmIChhY3Rpb24gPT0gJ2Nsb3NlJykge1xuLy8gICAgICAgICAkKCcjU2lkZUNvbnRhaW5lcicpLnRvZ2dsZSgxMDApO1xuLy8gICAgICAgICAkKCcjTWFpbk92ZXJsYXknKS5mYWRlT3V0KDEwMCk7XG4vLyAgICAgfVxuLy8gfVxuXG4vLyAkKCcjTWFpbk92ZXJsYXknKS5jbGljayhmdW5jdGlvbiAoKSB7XG4vLyAgICAgY2hlY2tvdXRTaWRlYmFyKFwiY2xvc2VcIik7XG4vLyB9KTtcblxud2luZG93Lm9wZW5GaWx0ZXJzID0gZnVuY3Rpb24gKCkge1xuICAgIGNvbnN0IGZpbHRlcnMgPSAkKCcjU2VhcmNoRmlsdGVycycpO1xuICAgIGlmIChmaWx0ZXJzLmNzcygnZGlzcGxheScpID09ICdub25lJykge1xuICAgICAgICBmaWx0ZXJzLmNzcygnZGlzcGxheScsICdpbmhlcml0Jyk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICBmaWx0ZXJzLmNzcygnZGlzcGxheScsICdub25lJyk7XG4gICAgfVxufVxuXG4vLyBIaWRlIGFsZXJ0c1xuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuLy8gc2V0VGltZW91dChmdW5jdGlvbigpe1xuLy8gICAgICQoJy5hbGVydCcpLmhpZGUoMTAwKTtcbi8vIH0sIDQwMDApO1xuXG5cbi8vIENhcnQgUmVzdW1lblxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG4vLyB3aW5kb3cuc2hvd0NhcnRSZXN1bWVNb2JpbGUgPSBmdW5jdGlvbigpXG4vLyB7XG4vLyAgICAgJCgnLmNhcnQtcmVzdW1lLWRldGFpbHMtbW9iaWxlJykudG9nZ2xlQ2xhc3MoJ0hpZGRlbicsIDEwMCk7XG4vLyB9XG5cbi8qXG58LS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbnwgQ0FSVFxufC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4qL1xuXG5cbndpbmRvdy5zdW1BbGxJdGVtcyA9IGZ1bmN0aW9uICgpIHtcbiAgICBzdW0gPSAwO1xuICAgICQoJy5Ub3RhbEl0ZW1QcmljZScpLmVhY2goZnVuY3Rpb24gKGluZGV4KSB7XG4gICAgICAgIHN1bSArPSBwYXJzZUludCgkKHRoaXMpLmh0bWwoKSk7XG4gICAgfSk7XG4gICAgJCgnLlN1YlRvdGFsJykuaHRtbChzdW0pO1xufVxuXG5cbi8vIFN1bSBkaXZzIHRleHRcbndpbmRvdy5zdW1EaXZzID0gZnVuY3Rpb24gKG9yaWdpbnMsIHRhcmdldCkge1xuICAgIGxldCBzdW0gPSAwO1xuICAgIG9yaWdpbnMuZWFjaChmdW5jdGlvbiAoKSB7XG4gICAgICAgIHN1bSArPSBwYXJzZUZsb2F0KCQodGhpcykudGV4dCgpKTtcbiAgICB9KTtcbiAgICB0YXJnZXQudGV4dChzdW0pO1xufVxuXG5cbi8vIENoZWNrIHByb2R1Y3QgdmFyaWFudCBzdG9ja1xuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxud2luZG93LmNoZWNrVmFyaWFudFN0b2NrID0gZnVuY3Rpb24oKSB7XG4gICAgbGV0IGZvcm0gPSAkKCcjQWRkVG9DYXJ0Rm9ybScpO1xuICAgIGxldCBkYXRhID0gZm9ybS5zZXJpYWxpemUoKTtcbiAgICBjb25zb2xlLmxvZyhmb3JtLmRhdGEoJ3JvdXRlJykpO1xuICAgIGxldCBhbGxvd1N1Ym1pdCA9IGZhbHNlO1xuICAgICQuYWpheCh7XG4gICAgICAgIHVybDogZm9ybS5kYXRhKCdyb3V0ZScpLFxuICAgICAgICBtZXRob2Q6ICdHRVQnLFxuICAgICAgICBkYXRhVHlwZTogJ0pTT04nLFxuICAgICAgICBhc3luYzogZmFsc2UsXG4gICAgICAgIGRhdGE6IGRhdGEsXG4gICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgICAgICAgICBpZihkYXRhLnJlc3BvbnNlID09IHRydWUpXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgaWYoZGF0YS5tZXNzYWdlID09ICcwJylcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgJCgnLkF2YWlsYWJsZVN0b2NrJykuaHRtbChcIk5vIGhheSBzdG9jayBkaXNwb25pYmxlXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgJCgnI0FkZFRvQ2FydEZvcm1CdG4nKS5wcm9wKCdkaXNhYmxlZCcsIHRydWUpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgJCgnLkF2YWlsYWJsZVN0b2NrJykuaHRtbChcIlN0b2NrIGRpc3BvbmlibGU6IFwiICsgZGF0YS5tZXNzYWdlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICQoJyNBZGRUb0NhcnRGb3JtQnRuJykucHJvcCgnZGlzYWJsZWQnLCBmYWxzZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBhbGxvd1N1Ym1pdCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIkVudHJvIGVuIFNVQ0NFU1NcIik7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAkKCcjTWF4UXVhbnRpdHknKS5wcm9wKFwibWF4XCIsIGRhdGEubWVzc2FnZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgJCgnI0Vycm9yJykuaHRtbChkYXRhLnJlc3BvbnNlVGV4dCk7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJFbnRybyBlbiBlcnJvciAxXCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBlcnJvcjogZnVuY3Rpb24gKGRhdGEpIHtcbiAgICAgICAgICAgICQoJyNFcnJvcicpLmh0bWwoZGF0YS5yZXNwb25zZVRleHQpO1xuICAgICAgICAgICAgLy8gbG9jYXRpb24ucmVsb2FkKCk7XG4gICAgICAgICAgICBhbGxvd1N1Ym1pdCA9IGZhbHNlO1xuICAgICAgICAgICAgY29uc29sZS5sb2coZGF0YSk7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIkVudHJvIGVuIGVycm9yIDJcIik7XG4gICAgICAgIH1cbiAgICB9KTtcbiAgICByZXR1cm4gYWxsb3dTdWJtaXQ7XG59XG5cbi8vIFNldCBjYXJ0IGl0ZW1zIEpTT05cbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbndpbmRvdy5zZXRJdGVtc0RhdGEgPSBmdW5jdGlvbiAoKSB7XG4gICAgaXRlbURhdGEgPSBbXTtcblxuICAgICQoJy5JdGVtLURhdGEnKS5lYWNoKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgbGV0IGlkID0gJCh0aGlzKS5kYXRhKCdpZCcpO1xuICAgICAgICBsZXQgcHJpY2UgPSAkKHRoaXMpLmRhdGEoJ3ByaWNlJyk7XG4gICAgICAgIGxldCB2YXJpYW50X2lkID0gJCh0aGlzKS5kYXRhKCd2YXJpYW50Jyk7XG4gICAgICAgIGxldCBxdWFudGl0eSA9ICQodGhpcykudmFsKCk7XG5cbiAgICAgICAgaXRlbSA9IHt9XG4gICAgICAgIGl0ZW1bJ2lkJ10gPSBpZDtcbiAgICAgICAgaXRlbVsndmFyaWFudF9pZCddID0gdmFyaWFudF9pZDtcbiAgICAgICAgaXRlbVsncHJpY2UnXSA9IHByaWNlO1xuICAgICAgICBpdGVtWydxdWFudGl0eSddID0gcXVhbnRpdHk7XG4gICAgICAgIC8vIFVwZGF0ZSBkaXNwbGF5IHRvdGFsIGl0ZW0gcHJpY2VcbiAgICAgICAgdG90YWwgPSBwcmljZSAqIHF1YW50aXR5O1xuICAgICAgICAkKCcuJyArIGlkICsgJy1Ub3RhbEl0ZW1QcmljZScpLmh0bWwodG90YWwpO1xuXG4gICAgICAgIGl0ZW1EYXRhLnB1c2goaXRlbSk7XG4gICAgfSk7XG4gICAgLy8gVXBkYXRlIFRvdGFsXG4gICAgY29uc29sZS5pbmZvKGl0ZW1EYXRhKTtcbiAgICBzdW1BbGxJdGVtcygpO1xuICAgICQoJyNJdGVtcy1EYXRhJykudmFsKGl0ZW1EYXRhKTtcbn1cblxuLy8gQWRkIHByb2R1Y3QgdG8gY2FydFxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxud2luZG93LmFkZFRvQ2FydCA9IGZ1bmN0aW9uIChyb3V0ZSwgZGF0YSkge1xuICAgICQuYWpheCh7XG4gICAgICAgIHVybDogcm91dGUsXG4gICAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgICBkYXRhVHlwZTogJ0pTT04nLFxuICAgICAgICBkYXRhOiBkYXRhLFxuICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAoZGF0YSkge1xuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coZGF0YSk7XG4gICAgICAgICAgICBpZiAoZGF0YS5yZXNwb25zZSA9PSAnc3VjY2VzcycpIHtcbiAgICAgICAgICAgICAgICAkKCcuQXZhaWxhYmxlU3RvY2snKS5odG1sKFwiU3RvY2sgZGlzcG9uaWJsZTogXCIgKyBkYXRhLm5ld1N0b2NrKTtcbiAgICAgICAgICAgICAgICB0b2FzdF9zdWNjZXNzKCdPayEnLCBkYXRhLm1lc3NhZ2UsICdib3R0b21DZW50ZXInLCAnJywgMjUwMCk7XG4gICAgICAgICAgICAgICAgdXBkYXRlVG90YWxzKCk7XG4gICAgICAgICAgICAgICAgc2V0SXRlbXNEYXRhKCk7XG4gICAgICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgIHNldEl0ZW1zRGF0YSgpO1xuICAgICAgICAgICAgICAgICAgICBzdW1BbGxJdGVtcygpO1xuICAgICAgICAgICAgICAgICAgICAvLyBvcGVuQ2hlY2tvdXREZXNrdG9wKCk7XG4gICAgICAgICAgICAgICAgfSwgMTAwKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoZGF0YS5yZXNwb25zZSA9PSAnd2FybmluZycpIHtcbiAgICAgICAgICAgICAgICB0b2FzdF9zdWNjZXNzKCdVcHMhJywgZGF0YS5tZXNzYWdlLCAnYm90dG9tQ2VudGVyJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIGVycm9yOiBmdW5jdGlvbiAoZGF0YSkge1xuICAgICAgICAgICAgJCgnI0Vycm9yJykuaHRtbChkYXRhLnJlc3BvbnNlVGV4dCk7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIkVycm9yIGVuIGFkZHRvQ2FydCgpXCIpO1xuICAgICAgICAgICAgLy8gbG9jYXRpb24ucmVsb2FkKCk7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhkYXRhKTtcbiAgICAgICAgfVxuICAgIH0pO1xufVxuXG4gXG5cbi8vIFJlbW92ZSBwcm9kdWN0IGZyb20gY2FydFxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxud2luZG93LnJlbW92ZUZyb21DYXJ0ID0gZnVuY3Rpb24gKHJvdXRlLCBjYXJ0SXRlbUlkLCB2YXJpYW50SWQsIHF1YW50aXR5LCBkaXYsIGFjdGlvbikge1xuICAgICQuYWpheCh7XG4gICAgICAgIHVybDogcm91dGUsXG4gICAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgICBkYXRhVHlwZTogJ0pTT04nLFxuICAgICAgICBkYXRhOiB7IGNhcnRJdGVtSWQ6IGNhcnRJdGVtSWQsIHZhcmlhbnRJZDogdmFyaWFudElkLCBxdWFudGl0eTogcXVhbnRpdHksIGFjdGlvbjogYWN0aW9uLCBtZXRob2Q6ICdhamF4JyB9LFxuICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAoZGF0YSkge1xuICAgICAgICAgICAgaWYgKGRhdGEucmVzcG9uc2UgPT0gJ2NhcnQtcmVtb3ZlZCcpIHtcbiAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhkYXRhKTtcbiAgICAgICAgICAgICAgICB1cGRhdGVUb3RhbHMoKTtcbiAgICAgICAgICAgICAgICB3aW5kb3cubG9jYXRpb24gPSB3aW5kb3cubG9jYXRpb24uaHJlZi5zcGxpdChcIj9cIilbMF07XG4gICAgICAgICAgICAgICAgc2V0SXRlbXNEYXRhKCk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKGRhdGEucmVzcG9uc2UgPT0gJ3N1Y2Nlc3MnKSB7XG4gICAgICAgICAgICAgICAgJChkaXYpLmhpZGUoMTAwKTtcbiAgICAgICAgICAgICAgICAkKGRpdikucmVtb3ZlKCk7XG4gICAgICAgICAgICAgICAgdXBkYXRlVG90YWxzKCk7XG4gICAgICAgICAgICAgICAgc2V0SXRlbXNEYXRhKCk7XG4gICAgICAgICAgICB9ICAgXG4gICAgICAgIH0sXG4gICAgICAgIGVycm9yOiBmdW5jdGlvbiAoZGF0YSkge1xuICAgICAgICAgICAgLy8kKCcjRXJyb3InKS5odG1sKGRhdGEucmVzcG9uc2VUZXh0KTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiRXJyb3IgZW4gcmVtb3ZlRnJvbUNhcnQoKVwiKTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGRhdGEpO1xuICAgICAgICAgICAgLy8gSWYgYW4gZXJyb3IgcG9wcyB3aGVuIGRlc3Ryb3lpbmcgYW4gaXRlbSwgcmVsb2FkIGFuZCBwcmV2ZW50IGJhZCBtYWdpY1xuICAgICAgICAgICAgbG9jYXRpb24ucmVsb2FkKCk7XG4gICAgICAgIH1cbiAgICB9KTtcbn1cblxuZnVuY3Rpb24gdXBkYXRlVG90YWxzKCkge1xuICAgIC8vIExpdmUgUmVsb2FkaW5nIHN0dWZmXG4gICAgJChcIiNTaWRlQ29udGFpbmVySXRlbXNGaXhlZFwiKS5sb2FkKHdpbmRvdy5sb2NhdGlvbi5ocmVmICsgXCIgI1NpZGVDb250YWluZXJJdGVtc0ZpeGVkXCIpO1xuICAgICQoXCIjU2lkZUNvbnRhaW5lckl0ZW1zRmxvYXRpbmdcIikubG9hZCh3aW5kb3cubG9jYXRpb24uaHJlZiArIFwiICNTaWRlQ29udGFpbmVySXRlbXNGbG9hdGluZ1wiKTtcbiAgICAkKFwiLlRvdGFsQ2FydEl0ZW1zXCIpLmxvYWQod2luZG93LmxvY2F0aW9uLmhyZWYgKyBcIiAuVG90YWxDYXJ0SXRlbXNcIik7XG4gICAgJChcIi5Ub3RhbENhcnRJdGVtc1NpZGViYXJcIikubG9hZCh3aW5kb3cubG9jYXRpb24uaHJlZiArIFwiIC5Ub3RhbENhcnRJdGVtc1NpZGViYXJcIik7XG4gICAgJChcIi5DYXJ0U3ViVG90YWxcIikubG9hZCh3aW5kb3cubG9jYXRpb24uaHJlZiArIFwiIC5DYXJ0U3ViVG90YWxcIik7XG4gICAgJChcIi5BdmFpbGFibGVTdG9ja1wiKS5sb2FkKHdpbmRvdy5sb2NhdGlvbi5ocmVmICsgXCIgLkF2YWlsYWJsZVN0b2NrXCIpO1xufVxuXG4vLyBTdWJtaXQgQ2FydCBGb3JtIHRvIENoZWNrb3V0XG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG53aW5kb3cuc3VibWl0Q2FydFRvQ2hlY2tvdXQgPSBmdW5jdGlvbiAocm91dGUsIHRhcmdldCwgZGF0YSwgYWN0aW9uKSB7XG4gICAgLy9jb25zb2xlLmxvZyhcIlJ1dGE6IFwiICsgcm91dGUgKyBcIiBUYXJnZXQ6IFwiICsgdGFyZ2V0ICsgXCIgRGF0YTogXCIgKyBkYXRhICsgXCJBY3Rpb246IFwiKyBhY3Rpb24pO1xuICAgICQuYWpheCh7XG4gICAgICAgIHVybDogcm91dGUsXG4gICAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgICBkYXRhVHlwZTogJ0pTT04nLFxuICAgICAgICBkYXRhOiB7IGRhdGEsIGFjdGlvbjogYWN0aW9uIH0sXG4gICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhkYXRhKTtcbiAgICAgICAgICAgIGlmIChkYXRhLnJlc3BvbnNlID09ICdzdWNjZXNzJykge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHRhcmdldCk7XG4gICAgICAgICAgICAgICAgaWYgKHRhcmdldCA9PSAncmVsb2FkJykge1xuICAgICAgICAgICAgICAgICAgICAvLyBSZWZyZXNoIHBhZ2UsIGRlbGV0ZSBwYXJhbWV0dGVycyBhbmQgb3BlbiBjaGVja291dCBzaWRlYmFyXG4gICAgICAgICAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbiA9IHdpbmRvdy5sb2NhdGlvbi5ocmVmLnNwbGl0KFwiP1wiKVswXSArIFwiP2NoZWNrb3V0LW9uXCI7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSB0YXJnZXQ7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnRXJyb3IgZW4gc3VibWl0Rm9ybScpO1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGRhdGEpO1xuICAgICAgICAgICAgICAgIHRvYXN0X2Vycm9yKCcnLCBkYXRhLm1lc3NhZ2UsICdib3R0b21DZW50ZXInLCAnJyk7XG4gICAgICAgICAgICAgICAgJCgnLlNpZGVDb250YWluZXJFcnJvcicpLmh0bWwoZGF0YS5tZXNzYWdlKTtcbiAgICAgICAgICAgICAgICAvLyAkKCcjRXJyb3InKS5odG1sKGRhdGEucmVzcG9uc2VUZXh0KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgICQoJyNFcnJvcicpLmh0bWwoZGF0YS5yZXNwb25zZVRleHQpO1xuICAgICAgICB9LFxuICAgICAgICBlcnJvcjogZnVuY3Rpb24gKGRhdGEpIHtcbiAgICAgICAgICAgICQoJyNFcnJvcicpLmh0bWwoZGF0YS5yZXNwb25zZVRleHQpO1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJFcnJvciBlbiBzdWJtaXRGb3JtKClcIik7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhkYXRhKTtcbiAgICAgICAgICAgIC8vIGxvY2F0aW9uLnJlbG9hZCgpO1xuICAgICAgICB9XG4gICAgfSk7XG59XG5cbi8vIFZhbGlkYXRlIGFuZCBzZXQgY291cG9uXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG53aW5kb3cudmFsaWRhdGVBbmRTZXRDb3Vwb24gPSBmdW5jdGlvbiAocm91dGUsIGNvZGUsIGNhcnRpZCkge1xuICAgIGxldCBjb3Vwb25EaXYgPSAkKCcjQ291cG9uRGl2Jyk7XG4gICAgbGV0IGNvdXBvblNldCA9ICQoJyNTZXR0ZWRDb3Vwb24nKTtcbiAgICBjb25zb2xlLmxvZyhjb2RlLCBjYXJ0aWQpO1xuICAgICQuYWpheCh7XG4gICAgICAgIHVybDogcm91dGUsXG4gICAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgICBkYXRhVHlwZTogJ0pTT04nLFxuICAgICAgICBkYXRhOiB7IGNvZGU6IGNvZGUsIGNhcnRpZDogY2FydGlkIH0sXG4gICAgICAgIGJlZm9yZVNlbmQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiQ29tcHJvYmFuZG8gY3Vww7NuLi4uXCIpO1xuICAgICAgICAgICAgJCgnLkNvdXBvbkxvYWRlcicpLnJlbW92ZUNsYXNzKCdIaWRkZW4nKTtcbiAgICAgICAgfSxcbiAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKGRhdGEpIHtcbiAgICAgICAgICAgIGlmIChkYXRhLnJlc3BvbnNlID09IHRydWUpIHtcbiAgICAgICAgICAgICAgICAkKCcjQ291cG9uVmFsaWRhdGlvbk1lc3NhZ2UnKS5odG1sKFwiQ3Vww7NuIGFjZXB0YWRvICFcIik7XG4gICAgICAgICAgICAgICAgY291cG9uRGl2LmhpZGUoMjAwLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvdXBvblNldC5yZW1vdmVDbGFzcygnSGlkZGVuJyk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgbG9jYXRpb24ucmVsb2FkKCk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKGRhdGEucmVzcG9uc2UgPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICQoJyNDb3Vwb25WYWxpZGF0aW9uTWVzc2FnZScpLmh0bWwoZGF0YS5tZXNzYWdlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgZXJyb3I6IGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgICAgICAgICAkKCcjQ291cG9uVmFsaWRhdGlvbk1lc3NhZ2UnKS5odG1sKGRhdGEucmVzcG9uc2VUZXh0KTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGRhdGEpO1xuICAgICAgICB9LFxuICAgICAgICBjb21wbGV0ZTogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgJCgnLkNvdXBvbkxvYWRlcicpLmFkZENsYXNzKCdIaWRkZW4nKTtcbiAgICAgICAgfVxuICAgIH0pO1xufVxuXG4vLyBGYXZzXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG53aW5kb3cuYWRkQXJ0aWNsZVRvRmF2cyA9IGZ1bmN0aW9uIChyb3V0ZSwgZmF2aWQsIGFydGljbGVpZCwgYWN0aW9uLCBkaXNwbGF5QnV0dG9uKSB7XG4gICAgJC5hamF4KHtcbiAgICAgICAgdXJsOiByb3V0ZSxcbiAgICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICAgIGRhdGFUeXBlOiAnSlNPTicsXG4gICAgICAgIGRhdGE6IHsgZmF2X2lkOiBmYXZpZCwgYXJ0aWNsZV9pZDogYXJ0aWNsZWlkIH0sXG4gICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgICAgICAgICBpZiAoZGF0YS5yZXNwb25zZSA9PSB0cnVlICYmIGRhdGEucmVzdWx0ID09ICdhZGRlZCcpIHtcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKGFjdGlvbikge1xuICAgICAgICAgICAgICAgICAgICBjYXNlICdyZWxvYWQnOlxuICAgICAgICAgICAgICAgICAgICAgICAgbG9jYXRpb24ucmVsb2FkKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAnc2hvdyc6XG4gICAgICAgICAgICAgICAgICAgICAgICBkaXNwbGF5QnV0dG9uLnJlbW92ZUNsYXNzKCdmYXYtaWNvbi1ub2ZhdicpO1xuICAgICAgICAgICAgICAgICAgICAgICAgZGlzcGxheUJ1dHRvbi5hZGRDbGFzcygnZmF2LWljb24taXNmYXYnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRvYXN0X3N1Y2Nlc3MoJ09rIScsICdQcm9kdWN0byBhZ3JlZ2FkbyBhIGZhdm9yaXRvcycsICdib3R0b21DZW50ZXInLCAnJywgMTAwMCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAnbm9uZSc6XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnQWN0dWFsaXphZG8gLSBTaW4gQWNjacOzbicpO1xuICAgICAgICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ05vIGhheSBhY2Npw7NuJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2UgaWYgKGRhdGEucmVzcG9uc2UgPT0gdHJ1ZSAmJiBkYXRhLnJlc3VsdCA9PSAncmVtb3ZlZCcpIHtcbiAgICAgICAgICAgICAgICBkaXNwbGF5QnV0dG9uLmFkZENsYXNzKCdmYXYtaWNvbi1ub2ZhdicpO1xuICAgICAgICAgICAgICAgIGRpc3BsYXlCdXR0b24ucmVtb3ZlQ2xhc3MoJ2Zhdi1pY29uLWlzZmF2Jyk7XG4gICAgICAgICAgICAgICAgdG9hc3Rfc3VjY2VzcygnT2shJywgJ1Byb2R1Y3RvIGVsaW1pbmFkbyBkZSBmYXZvcml0b3MnLCAnYm90dG9tQ2VudGVyJywgJycsIDEwMDApO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgc2V0RmF2c1RvdGFsSWNvbihkYXRhLmZhdnNDb3VudCk7XG4gICAgICAgIH0sXG4gICAgICAgIGVycm9yOiBmdW5jdGlvbiAoZGF0YSkge1xuICAgICAgICAgICAgJCgnI0Vycm9yJykuaHRtbChkYXRhLnJlc3BvbnNlVGV4dCk7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhkYXRhKTtcbiAgICAgICAgfVxuICAgIH0pO1xufVxuXG5mdW5jdGlvbiBzZXRGYXZzVG90YWxJY29uKGZhdnMpIHtcbiAgICBpZiAoZmF2cyA+IDApIHtcbiAgICAgICAgJCgnLkZhdk1haW5JY29uJykucmVtb3ZlQ2xhc3MoJ2ZhcicpO1xuICAgICAgICAkKCcuRmF2TWFpbkljb24nKS5hZGRDbGFzcygnZmEnKTtcbiAgICB9IGVsc2UgaWYgKGZhdnMgPT0gMCkge1xuICAgICAgICAkKCcuRmF2TWFpbkljb24nKS5yZW1vdmVDbGFzcygnZmEnKTtcbiAgICAgICAgJCgnLkZhdk1haW5JY29uJykuYWRkQ2xhc3MoJ2ZhcicpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgICQoJy5GYXZNYWluSWNvbicpLnJlbW92ZUNsYXNzKCdmYScpO1xuICAgICAgICAkKCcuRmF2TWFpbkljb24nKS5yZW1vdmVDbGFzcygnZmFyJyk7XG4gICAgICAgICQoJy5GYXZNYWluSWNvbicpLmFkZENsYXNzKCdmYScpO1xuICAgICAgICBjb25zb2xlLmxvZyhcIkVycm9yIGVuIHNldEZhdnNUb3RhbEljb24oKVwiKTtcbiAgICB9XG59XG5cbndpbmRvdy5yZW1vdmVBcnRpY2xlRnJvbUZhdnMgPSBmdW5jdGlvbiAocm91dGUsIGZhdmlkLCBhY3Rpb24pIHtcbiAgICB2YXIgZG9hY3Rpb24gPSBhY3Rpb247XG4gICAgJC5hamF4KHtcbiAgICAgICAgdXJsOiByb3V0ZSxcbiAgICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICAgIGRhdGFUeXBlOiAnSlNPTicsXG4gICAgICAgIGRhdGE6IHsgZmF2X2lkOiBmYXZpZCB9LFxuICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAoZGF0YSkge1xuICAgICAgICAgICAgJCgnI0Vycm9yJykuaHRtbChkYXRhLnJlc3BvbnNlVGV4dCk7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhkYXRhKTtcbiAgICAgICAgICAgIGlmIChkYXRhLnJlc3BvbnNlID09IHRydWUpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhkb2FjdGlvbik7XG4gICAgICAgICAgICAgICAgc3dpdGNoIChkb2FjdGlvbikge1xuICAgICAgICAgICAgICAgICAgICBjYXNlICdyZWxvYWQnOlxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGFjdGlvbiA9ICdyZWxvYWQnO1xuICAgICAgICAgICAgICAgICAgICAgICAgdG9hc3Rfc3VjY2VzcygnT2shJywgJ1Byb2R1Y3RvIGVsaW1pbmFkbyBkZSBmYXZvcml0b3MnLCAnYm90dG9tQ2VudGVyJywgYWN0aW9uLCAxMDAwKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ05vIGhheSBhY2Npw7NuJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIC8vJCgnI0Vycm9yJykuaHRtbChkYXRhLm1lc3NhZ2VbJ2Vycm9ySW5mbyddKTtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhkYXRhKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgZXJyb3I6IGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgICAgICAgICAvLyQoJyNFcnJvcicpLmh0bWwoZGF0YS5yZXNwb25zZVRleHQpO1xuICAgICAgICAgICAgY29uc29sZS5sb2coZGF0YSk7XG4gICAgICAgIH1cbiAgICB9KTtcbn1cblxuXG53aW5kb3cucmVtb3ZlQWxsQXJ0aWNsZXNGcm9tRmF2cyA9IGZ1bmN0aW9uIChyb3V0ZSwgY3VzdG9tZXJpZCwgYWN0aW9uKSB7XG4gICAgJC5hamF4KHtcbiAgICAgICAgdXJsOiByb3V0ZSxcbiAgICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICAgIGRhdGFUeXBlOiAnSlNPTicsXG4gICAgICAgIGRhdGE6IHsgY3VzdG9tZXJfaWQ6IGN1c3RvbWVyaWQgfSxcbiAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKGRhdGEpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGRhdGEpO1xuICAgICAgICAgICAgLy8kKCcjRXJyb3InKS5odG1sKGRhdGEucmVzcG9uc2VUZXh0KTtcbiAgICAgICAgICAgIGlmIChkYXRhLnJlc3BvbnNlID09IHRydWUpIHtcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKGFjdGlvbikge1xuICAgICAgICAgICAgICAgICAgICBjYXNlICdyZWxvYWQnOlxuICAgICAgICAgICAgICAgICAgICAgICAgbG9jYXRpb24ucmVsb2FkKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdObyBoYXkgYWNjacOzbicpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAkKCcjRXJyb3InKS5odG1sKGRhdGEubWVzc2FnZVsnZXJyb3JJbmZvJ10pO1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGRhdGEpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBlcnJvcjogZnVuY3Rpb24gKGRhdGEpIHtcbiAgICAgICAgICAgIC8vJCgnI0Vycm9yJykuaHRtbChkYXRhLnJlc3BvbnNlVGV4dCk7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhkYXRhKTtcbiAgICAgICAgfVxuICAgIH0pO1xufVxuXG4vKlxufC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG58IExPR0lOIEFORCBSRUdJU1RFUlxufC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4qL1xuXG4kKCcjUmVzZWxsZXJCb3gnKS5oaWRlKCk7XG5cbndpbmRvdy5vcGVuUmVzZWxsZXJSZWdpc3RyYXRpb24gPSBmdW5jdGlvbigpXG57XG4gICAgJCgnI0lzUmVzZWxsZXJDaGVja2JveCcpLnByb3AoJ2NoZWNrZWQnLCB0cnVlKTtcbiAgICAkKCcuSWZSZXNlbGxlckVuYWJsZScpLnByb3AoJ2Rpc2FibGVkJywgZmFsc2UpO1xuICAgICQoJyNSZXNlbGxlckJveCcpLnNob3coMTAwKTtcbiAgICAkKCcjUmVzZWxsZXJDVEEnKS5oaWRlKDApO1xuICAgICQoJy5Ob3JtYUNsaWVudFRpdGxlJykuaGlkZSgwKTtcbiAgICAkKCcuUmVzZWxsZXJUaXRsZScpLnNob3coMCk7XG59XG5cblxud2luZG93LmNsb3NlUmVzZWxsZXJSZWdpc3RyYXRpb24gPSBmdW5jdGlvbigpXG57XG4gICAgJCgnI0lzUmVzZWxsZXJDaGVja2JveCcpLnByb3AoJ2NoZWNrZWQnLCBmYWxzZSk7XG4gICAgJCgnLklmUmVzZWxsZXJFbmFibGUnKS5wcm9wKCdkaXNhYmxlZCcsIHRydWUpO1xuICAgICQoJyNSZXNlbGxlckJveCcpLmhpZGUoMCk7XG4gICAgJCgnI1Jlc2VsbGVyQ1RBJykuc2hvdygxMDApO1xuICAgICQoJy5Ob3JtYUNsaWVudFRpdGxlJykuc2hvdygwKTtcbiAgICAkKCcuUmVzZWxsZXJUaXRsZScpLmhpZGUoMCk7XG59XG5cbiQoZG9jdW1lbnQpLnJlYWR5KGZ1bmN0aW9uKCl7XG4gICAgJCgnLkdlb1Byb3ZTZWxlY3QnKS5vbignY2hhbmdlJywgZnVuY3Rpb24oKXtcbiAgICAgICAgbGV0IHByb3ZfaWQgPSAkKHRoaXMpLnZhbCgpO1xuICAgICAgICBnZXRHZW9Mb2NzKHByb3ZfaWQpO1xuICAgIH0pO1xufSk7XG5cblxuLypcbnwtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxufCBNSVggRlVOQ1RJT05TXG58LS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiovXG5cbndpbmRvdy5jbG9zZUVsZW1lbnQgPSBmdW5jdGlvbihzZWxlY3RvcilcbntcbiAgICAkKHNlbGVjdG9yKS5oaWRlKDEwMCk7XG59XG5cbndpbmRvdy5nZXRQYXJhbSA9IGZ1bmN0aW9uKHBhcmFtZXRlck5hbWUpIHtcbiAgICB2YXIgcmVzdWx0ID0gbnVsbCxcbiAgICAgICAgdG1wID0gW107XG4gICAgbG9jYXRpb24uc2VhcmNoXG4gICAgICAgIC5zdWJzdHIoMSlcbiAgICAgICAgLnNwbGl0KFwiJlwiKVxuICAgICAgICAuZm9yRWFjaChmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgICB0bXAgPSBpdGVtLnNwbGl0KFwiPVwiKTtcbiAgICAgICAgaWYgKHRtcFswXSA9PT0gcGFyYW1ldGVyTmFtZSkgcmVzdWx0ID0gZGVjb2RlVVJJQ29tcG9uZW50KHRtcFsxXSk7XG4gICAgICAgIH0pO1xuICAgIHJldHVybiByZXN1bHQ7XG59XG5cblxud2luZG93LmdldFBhcmFtcyA9IGZ1bmN0aW9uKHVybCkge1xuICAgIHZhciBwYXJhbXMgPSB7fTtcblx0dmFyIHBhcnNlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2EnKTtcblx0cGFyc2VyLmhyZWYgPSB1cmw7XG5cdHZhciBxdWVyeSA9IHBhcnNlci5zZWFyY2guc3Vic3RyaW5nKDEpO1xuXHR2YXIgdmFycyA9IHF1ZXJ5LnNwbGl0KCcmJyk7XG5cdGZvciAodmFyIGkgPSAwOyBpIDwgdmFycy5sZW5ndGg7IGkrKykge1xuXHRcdHZhciBwYWlyID0gdmFyc1tpXS5zcGxpdCgnPScpO1xuXHRcdHBhcmFtc1twYWlyWzBdXSA9IGRlY29kZVVSSUNvbXBvbmVudChwYWlyWzFdKTtcblx0fVxuXHRyZXR1cm4gcGFyYW1zO1xufVxuXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9yZXNvdXJjZXMvYXNzZXRzL2pzL3N0b3JlL3NjcmlwdHMuanMiXSwic291cmNlUm9vdCI6IiJ9