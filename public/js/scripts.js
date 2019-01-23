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
    var wrapper = $('.main-wrapper');

    var show = function show() {
        sidebar.addClass('active');
        wrapper.addClass('allow-sidebar');
    };

    var hide = function hide() {
        sidebar.removeClass('active');
        wrapper.removeClass('allow-sidebar');
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
    var trigger = $('#SearchFiltersTrigger');
    if (filters.hasClass('active')) {
        filters.removeClass('active');
        trigger.show();
    } else {
        filters.addClass('active');
        trigger.hide();
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
                // console.log(data);
                // $('#Error').html(data.responseText);
                $('.AvailableStock').html(data.message);
                $('#AddToCartFormBtn').prop('disabled', false);
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
            // $('#Error').html(data.responseText);
        },
        error: function error(data) {
            // $('#Error').html(data.responseText);
            console.log("Error en submitForm()");
            location.reload();
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgYjBlNGRkNTYzZTM5YjVhY2M5NzAiLCJ3ZWJwYWNrOi8vLy4vcmVzb3VyY2VzL2Fzc2V0cy9qcy9zdG9yZS9zY3JpcHRzLmpzIl0sIm5hbWVzIjpbIiQiLCJvbiIsInJlbW92ZUNsYXNzIiwia2V5cHJlc3MiLCJlIiwiY29uc29sZSIsImxvZyIsIndoaWNoIiwicHJldmVudERlZmF1bHQiLCJ2YWx1ZSIsInNpYmxpbmdzIiwidmFsIiwicXVhbnRpdHkiLCJuZXdWYWx1ZSIsIm5ld1ByaWNlVGFyZ2V0IiwicGFyZW50IiwibW9kaWZ5Q2FydEl0ZW1RIiwiaHRtbCIsImNsaWNrIiwiY2hlY2tvdXRTaWRlYmFyIiwid2luZG93Iiwic3RhdGUiLCJzaWRlYmFyIiwid3JhcHBlciIsInNob3ciLCJhZGRDbGFzcyIsImhpZGUiLCJ1bmRlZmluZWQiLCJoYXNDbGFzcyIsIm9wZW5DaGVja291dERlc2t0b3AiLCJ3aWR0aCIsIm9wZW5GaWx0ZXJzIiwiZmlsdGVycyIsInRyaWdnZXIiLCJzdW1BbGxJdGVtcyIsInN1bSIsImVhY2giLCJpbmRleCIsInBhcnNlSW50Iiwic3VtRGl2cyIsIm9yaWdpbnMiLCJ0YXJnZXQiLCJwYXJzZUZsb2F0IiwidGV4dCIsImNoZWNrVmFyaWFudFN0b2NrIiwiZm9ybSIsImRhdGEiLCJzZXJpYWxpemUiLCJhbGxvd1N1Ym1pdCIsImFqYXgiLCJ1cmwiLCJtZXRob2QiLCJkYXRhVHlwZSIsImFzeW5jIiwic3VjY2VzcyIsInJlc3BvbnNlIiwibWVzc2FnZSIsInByb3AiLCJlcnJvciIsInJlc3BvbnNlVGV4dCIsInNldEl0ZW1zRGF0YSIsIml0ZW1EYXRhIiwiaWQiLCJwcmljZSIsInZhcmlhbnRfaWQiLCJpdGVtIiwidG90YWwiLCJwdXNoIiwiaW5mbyIsImFkZFRvQ2FydCIsInJvdXRlIiwibmV3U3RvY2siLCJ0b2FzdF9zdWNjZXNzIiwidXBkYXRlVG90YWxzIiwic2V0VGltZW91dCIsInJlbW92ZUZyb21DYXJ0IiwiY2FydEl0ZW1JZCIsInZhcmlhbnRJZCIsImRpdiIsImFjdGlvbiIsImxvY2F0aW9uIiwiaHJlZiIsInNwbGl0IiwicmVtb3ZlIiwicmVsb2FkIiwibG9hZCIsInN1Ym1pdENhcnRUb0NoZWNrb3V0IiwidG9hc3RfZXJyb3IiLCJ2YWxpZGF0ZUFuZFNldENvdXBvbiIsImNvZGUiLCJjYXJ0aWQiLCJjb3Vwb25EaXYiLCJjb3Vwb25TZXQiLCJiZWZvcmVTZW5kIiwiY29tcGxldGUiLCJhZGRBcnRpY2xlVG9GYXZzIiwiZmF2aWQiLCJhcnRpY2xlaWQiLCJkaXNwbGF5QnV0dG9uIiwiZmF2X2lkIiwiYXJ0aWNsZV9pZCIsInJlc3VsdCIsInNldEZhdnNUb3RhbEljb24iLCJmYXZzQ291bnQiLCJmYXZzIiwicmVtb3ZlQXJ0aWNsZUZyb21GYXZzIiwiZG9hY3Rpb24iLCJyZW1vdmVBbGxBcnRpY2xlc0Zyb21GYXZzIiwiY3VzdG9tZXJpZCIsImN1c3RvbWVyX2lkIiwib3BlblJlc2VsbGVyUmVnaXN0cmF0aW9uIiwiY2xvc2VSZXNlbGxlclJlZ2lzdHJhdGlvbiIsImRvY3VtZW50IiwicmVhZHkiLCJwcm92X2lkIiwiZ2V0R2VvTG9jcyIsImNsb3NlRWxlbWVudCIsInNlbGVjdG9yIiwiZ2V0UGFyYW0iLCJwYXJhbWV0ZXJOYW1lIiwidG1wIiwic2VhcmNoIiwic3Vic3RyIiwiZm9yRWFjaCIsImRlY29kZVVSSUNvbXBvbmVudCIsImdldFBhcmFtcyIsInBhcmFtcyIsInBhcnNlciIsImNyZWF0ZUVsZW1lbnQiLCJxdWVyeSIsInN1YnN0cmluZyIsInZhcnMiLCJpIiwibGVuZ3RoIiwicGFpciJdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7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Q0FHYSxVQUFVMUQsSUFBVixFQUFnQjtBQUN6QnVELGNBQU12RCxLQUFLaUIsS0FBTCxDQUFXLEdBQVgsQ0FBTjtBQUNBLFlBQUlzQyxJQUFJLENBQUosTUFBV0QsYUFBZixFQUE4QmxCLFNBQVN1QixtQkFBbUJKLElBQUksQ0FBSixDQUFuQixDQUFUO0FBQzdCLEtBTkw7QUFPQSxXQUFPbkIsTUFBUDtBQUNILENBWEQ7O0FBY0FqRixPQUFPeUcsU0FBUCxHQUFtQixVQUFTM0UsR0FBVCxFQUFjO0FBQzdCLFFBQUk0RSxTQUFTLEVBQWI7QUFDSCxRQUFJQyxTQUFTZixTQUFTZ0IsYUFBVCxDQUF1QixHQUF2QixDQUFiO0FBQ0FELFdBQU85QyxJQUFQLEdBQWMvQixHQUFkO0FBQ0EsUUFBSStFLFFBQVFGLE9BQU9OLE1BQVAsQ0FBY1MsU0FBZCxDQUF3QixDQUF4QixDQUFaO0FBQ0EsUUFBSUMsT0FBT0YsTUFBTS9DLEtBQU4sQ0FBWSxHQUFaLENBQVg7QUFDQSxTQUFLLElBQUlrRCxJQUFJLENBQWIsRUFBZ0JBLElBQUlELEtBQUtFLE1BQXpCLEVBQWlDRCxHQUFqQyxFQUFzQztBQUNyQyxZQUFJRSxPQUFPSCxLQUFLQyxDQUFMLEVBQVFsRCxLQUFSLENBQWMsR0FBZCxDQUFYO0FBQ0E0QyxlQUFPUSxLQUFLLENBQUwsQ0FBUCxJQUFrQlYsbUJBQW1CVSxLQUFLLENBQUwsQ0FBbkIsQ0FBbEI7QUFDQTtBQUNELFdBQU9SLE1BQVA7QUFDQSxDQVhELEMiLCJmaWxlIjoiL2pzL3NjcmlwdHMuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHtcbiBcdFx0XHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0Z2V0OiBnZXR0ZXJcbiBcdFx0XHR9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCIvXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gNzIpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svYm9vdHN0cmFwIGIwZTRkZDU2M2UzOWI1YWNjOTcwIiwiLy8gTG9hZGVyc1xuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuJChcIi5sb2FkZXItb24tY2hhbmdlXCIpLm9uKCdjaGFuZ2UnLCBmdW5jdGlvbiAoKSB7XG4gICAgJCgnI2Z1bGwtbG9hZGVyJykucmVtb3ZlQ2xhc3MoJ0hpZGRlbicpO1xuICAgIHJldHVybiB0cnVlO1xufSk7XG5cbiQoXCIubG9hZGVyLW9uLXN1Ym1pdFwiKS5vbignc3VibWl0JywgZnVuY3Rpb24gKCkge1xuICAgICQoJyNmdWxsLWxvYWRlcicpLnJlbW92ZUNsYXNzKCdIaWRkZW4nKTtcbiAgICByZXR1cm4gdHJ1ZTtcbn0pO1xuXG4kKCcuZG9udC1zdWJtaXQtb24tZW50ZXIsIC5kc29uJykua2V5cHJlc3MoZnVuY3Rpb24gKGUpIHtcbiAgICBjb25zb2xlLmxvZyhcIkVOVEVSXCIpO1xuICAgIGlmIChlLndoaWNoID09IDEzKSByZXR1cm4gZmFsc2U7XG4gICAgaWYgKGUud2hpY2ggPT0gMTMpIGUucHJldmVudERlZmF1bHQoKTtcbn0pO1xuXG4vLyBNb2RpZnkgY2FydCBpdGVtIHF1YW50aXR5IFxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuJCgnLklucHV0QnRuUScpLm9uKCdjaGFuZ2Uga2V5dXAnLCBmdW5jdGlvbiAoKSB7XG4gICAgLy8gIE9yaWdpbmFsIEFydGljbGUgUHJpY2VcbiAgICBsZXQgdmFsdWUgPSAkKHRoaXMpLnNpYmxpbmdzKCcuQXJ0aWNsZVByaWNlJykudmFsKCk7XG4gICAgLy8gUXVhbnRpdHlcbiAgICBsZXQgcXVhbnRpdHkgPSAkKHRoaXMpLnZhbCgpO1xuICAgIC8vIE5lciBWYWx1ZVxuICAgIGxldCBuZXdWYWx1ZSA9ICh2YWx1ZSAqIHF1YW50aXR5KTtcbiAgICAvLyBOZXcgUHJpY2UgVGFyZ2V0XG4gICAgbGV0IG5ld1ByaWNlVGFyZ2V0ID0gJCh0aGlzKS5wYXJlbnQoKS5wYXJlbnQoKS5wYXJlbnQoKS5zaWJsaW5ncygnLlRvdGFsSXRlbVByaWNlJyk7XG5cbiAgICBjb25zb2xlLmxvZyh2YWx1ZSwgcXVhbnRpdHksIG5ld1ZhbHVlKTtcbiAgICBtb2RpZnlDYXJ0SXRlbVEoJCh0aGlzKSwgbmV3UHJpY2VUYXJnZXQsIG5ld1ZhbHVlKTtcbn0pXG5cbmZ1bmN0aW9uIG1vZGlmeUNhcnRJdGVtUShlLCBuZXdQcmljZVRhcmdldCwgbmV3VmFsdWUpIHtcbiAgICBlLnNpYmxpbmdzKCcuSW5wdXRCdG5RJykucmVtb3ZlQ2xhc3MoJ0hpZGRlbicpO1xuICAgIG5ld1ByaWNlVGFyZ2V0Lmh0bWwoJyQgJyArIG5ld1ZhbHVlKTtcbn1cblxuXG4kKCcjTWFpbk92ZXJsYXknKS5jbGljayhmdW5jdGlvbigpe1xuICAgIGNoZWNrb3V0U2lkZWJhcignaGlkZScpO1xufSlcbi8vIENoZWNrb3V0IHNpZGViYXJcbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cdFx0XG53aW5kb3cuY2hlY2tvdXRTaWRlYmFyID0gZnVuY3Rpb24gKHN0YXRlKSB7XG5cbiAgICBjb25zdCBzaWRlYmFyID0gJCgnLkNoZWNrb3V0Q2FydCcpO1xuICAgIGNvbnN0IHdyYXBwZXIgPSAkKCcubWFpbi13cmFwcGVyJyk7XG5cbiAgICBjb25zdCBzaG93ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBzaWRlYmFyLmFkZENsYXNzKCdhY3RpdmUnKTtcbiAgICAgICAgd3JhcHBlci5hZGRDbGFzcygnYWxsb3ctc2lkZWJhcicpO1xuICAgIH1cblxuICAgIGNvbnN0IGhpZGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHNpZGViYXIucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xuICAgICAgICB3cmFwcGVyLnJlbW92ZUNsYXNzKCdhbGxvdy1zaWRlYmFyJyk7XG4gICAgfVxuXG5cbiAgICBpZiAoc3RhdGUgPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIGlmIChzaWRlYmFyLmhhc0NsYXNzKCdhY3RpdmUnKSkge1xuICAgICAgICAgICAgaGlkZSgpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgc2hvdygpO1xuICAgICAgICB9XG4gICAgfSBlbHNlIGlmIChzdGF0ZSA9PSAnc2hvdycpIHtcbiAgICAgICAgc2hvdygpO1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfSBlbHNlIGlmIChzdGF0ZSA9PSAnaGlkZScpIHtcbiAgICAgICAgaGlkZSgpO1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxufVxuXG5cblxud2luZG93Lm9wZW5DaGVja291dERlc2t0b3AgPSBmdW5jdGlvbigpXG57XG4gICAgaWYgKCQod2luZG93KS53aWR0aCgpID4gNzY4KSB7XG4gICAgICAgIGNoZWNrb3V0U2lkZWJhcignc2hvdycpO1xuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG59XG5cblxuLy8gJCh3aW5kb3cpLnNjcm9sbChmdW5jdGlvbiAoZXZlbnQpIHtcbi8vICAgICB2YXIgc2Nyb2xsID0gJCh3aW5kb3cpLnNjcm9sbFRvcCgpO1xuXG4vLyAgICAgaWYgKHNjcm9sbCA+IDEyNSkge1xuLy8gICAgICAgICAkKCcuY2hlY2tvdXQtY2FydCcpLmFkZENsYXNzKCdzY3JvbGxlZCcpO1xuLy8gICAgIH1cbi8vICAgICBlbHNlIHtcbi8vICAgICAgICAgJCgnLmNoZWNrb3V0LWNhcnQnKS5yZW1vdmVDbGFzcygnc2Nyb2xsZWQnKTtcbi8vICAgICB9XG4vLyB9KTtcblxuXG4vLyBTaWRlYmFyIGNoZWNrb3V0IGFic29sdXRlXG4vLyB3aW5kb3cuY2hlY2tvdXRTaWRlYmFyID0gZnVuY3Rpb24gKGFjdGlvbikge1xuLy8gICAgIGlmIChhY3Rpb24gPT0gJ29wZW4nKSB7XG4vLyAgICAgICAgICQoJyNTaWRlQ29udGFpbmVyJykudG9nZ2xlKDEwMCk7XG4vLyAgICAgICAgICQoJyNNYWluT3ZlcmxheScpLmZhZGVJbigxMDApO1xuLy8gICAgIH1cbi8vICAgICBpZiAoYWN0aW9uID09ICdjbG9zZScpIHtcbi8vICAgICAgICAgJCgnI1NpZGVDb250YWluZXInKS50b2dnbGUoMTAwKTtcbi8vICAgICAgICAgJCgnI01haW5PdmVybGF5JykuZmFkZU91dCgxMDApO1xuLy8gICAgIH1cbi8vIH1cblxuLy8gJCgnI01haW5PdmVybGF5JykuY2xpY2soZnVuY3Rpb24gKCkge1xuLy8gICAgIGNoZWNrb3V0U2lkZWJhcihcImNsb3NlXCIpO1xuLy8gfSk7XG5cbndpbmRvdy5vcGVuRmlsdGVycyA9IGZ1bmN0aW9uICgpIHtcbiAgICBjb25zdCBmaWx0ZXJzID0gJCgnI1NlYXJjaEZpbHRlcnMnKTtcbiAgICBjb25zdCB0cmlnZ2VyID0gJCgnI1NlYXJjaEZpbHRlcnNUcmlnZ2VyJyk7XG4gICAgaWYoZmlsdGVycy5oYXNDbGFzcygnYWN0aXZlJykpXG4gICAge1xuICAgICAgICBmaWx0ZXJzLnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcbiAgICAgICAgdHJpZ2dlci5zaG93KCk7XG4gICAgfVxuICAgIGVsc2VcbiAgICB7XG4gICAgICAgIGZpbHRlcnMuYWRkQ2xhc3MoJ2FjdGl2ZScpO1xuICAgICAgICB0cmlnZ2VyLmhpZGUoKTtcbiAgICB9XG5cbn1cblxuLy8gSGlkZSBhbGVydHNcbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbi8vIHNldFRpbWVvdXQoZnVuY3Rpb24oKXtcbi8vICAgICAkKCcuYWxlcnQnKS5oaWRlKDEwMCk7XG4vLyB9LCA0MDAwKTtcblxuXG4vLyBDYXJ0IFJlc3VtZW5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuLy8gd2luZG93LnNob3dDYXJ0UmVzdW1lTW9iaWxlID0gZnVuY3Rpb24oKVxuLy8ge1xuLy8gICAgICQoJy5jYXJ0LXJlc3VtZS1kZXRhaWxzLW1vYmlsZScpLnRvZ2dsZUNsYXNzKCdIaWRkZW4nLCAxMDApO1xuLy8gfVxuXG4vKlxufC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG58IENBUlRcbnwtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuKi9cblxuXG53aW5kb3cuc3VtQWxsSXRlbXMgPSBmdW5jdGlvbiAoKSB7XG4gICAgc3VtID0gMDtcbiAgICAkKCcuVG90YWxJdGVtUHJpY2UnKS5lYWNoKGZ1bmN0aW9uIChpbmRleCkge1xuICAgICAgICBzdW0gKz0gcGFyc2VJbnQoJCh0aGlzKS5odG1sKCkpO1xuICAgIH0pO1xuICAgICQoJy5TdWJUb3RhbCcpLmh0bWwoc3VtKTtcbn1cblxuXG4vLyBTdW0gZGl2cyB0ZXh0XG53aW5kb3cuc3VtRGl2cyA9IGZ1bmN0aW9uIChvcmlnaW5zLCB0YXJnZXQpIHtcbiAgICBsZXQgc3VtID0gMDtcbiAgICBvcmlnaW5zLmVhY2goZnVuY3Rpb24gKCkge1xuICAgICAgICBzdW0gKz0gcGFyc2VGbG9hdCgkKHRoaXMpLnRleHQoKSk7XG4gICAgfSk7XG4gICAgdGFyZ2V0LnRleHQoc3VtKTtcbn1cblxuXG4vLyBDaGVjayBwcm9kdWN0IHZhcmlhbnQgc3RvY2tcbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbndpbmRvdy5jaGVja1ZhcmlhbnRTdG9jayA9IGZ1bmN0aW9uKCkge1xuICAgIGxldCBmb3JtID0gJCgnI0FkZFRvQ2FydEZvcm0nKTtcbiAgICBsZXQgZGF0YSA9IGZvcm0uc2VyaWFsaXplKCk7XG4gICAgbGV0IGFsbG93U3VibWl0ID0gZmFsc2U7XG5cbiAgICAkLmFqYXgoe1xuICAgICAgICB1cmw6IGZvcm0uZGF0YSgncm91dGUnKSxcbiAgICAgICAgbWV0aG9kOiAnR0VUJyxcbiAgICAgICAgZGF0YVR5cGU6ICdKU09OJyxcbiAgICAgICAgYXN5bmM6IGZhbHNlLFxuICAgICAgICBkYXRhOiBkYXRhLFxuICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAoZGF0YSkge1xuICAgICAgICAgICAgaWYoZGF0YS5yZXNwb25zZSA9PSB0cnVlKVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGlmKGRhdGEubWVzc2FnZSA9PSAnMCcpXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICQoJy5BdmFpbGFibGVTdG9jaycpLmh0bWwoXCJObyBoYXkgc3RvY2sgZGlzcG9uaWJsZVwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICQoJyNBZGRUb0NhcnRGb3JtQnRuJykucHJvcCgnZGlzYWJsZWQnLCB0cnVlKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICQoJy5BdmFpbGFibGVTdG9jaycpLmh0bWwoXCJTdG9jayBkaXNwb25pYmxlOiBcIiArIGRhdGEubWVzc2FnZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAkKCcjQWRkVG9DYXJ0Rm9ybUJ0bicpLnByb3AoJ2Rpc2FibGVkJywgZmFsc2UpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYWxsb3dTdWJtaXQgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJFbnRybyBlbiBTVUNDRVNTXCIpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgJCgnI01heFF1YW50aXR5JykucHJvcChcIm1heFwiLCBkYXRhLm1lc3NhZ2UpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKGRhdGEpO1xuICAgICAgICAgICAgICAgIC8vICQoJyNFcnJvcicpLmh0bWwoZGF0YS5yZXNwb25zZVRleHQpO1xuICAgICAgICAgICAgICAgICQoJy5BdmFpbGFibGVTdG9jaycpLmh0bWwoZGF0YS5tZXNzYWdlKTtcbiAgICAgICAgICAgICAgICAkKCcjQWRkVG9DYXJ0Rm9ybUJ0bicpLnByb3AoJ2Rpc2FibGVkJywgZmFsc2UpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBlcnJvcjogZnVuY3Rpb24gKGRhdGEpIHtcbiAgICAgICAgICAgICQoJyNFcnJvcicpLmh0bWwoZGF0YS5yZXNwb25zZVRleHQpO1xuICAgICAgICAgICAgLy8gbG9jYXRpb24ucmVsb2FkKCk7XG4gICAgICAgICAgICBhbGxvd1N1Ym1pdCA9IGZhbHNlO1xuICAgICAgICAgICAgY29uc29sZS5sb2coZGF0YSk7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIkVudHJvIGVuIGVycm9yIDJcIik7XG4gICAgICAgIH1cbiAgICB9KTtcbiAgICByZXR1cm4gYWxsb3dTdWJtaXQ7XG59XG5cbi8vIFNldCBjYXJ0IGl0ZW1zIEpTT05cbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbndpbmRvdy5zZXRJdGVtc0RhdGEgPSBmdW5jdGlvbiAoKSB7XG4gICAgaXRlbURhdGEgPSBbXTtcblxuICAgICQoJy5JdGVtLURhdGEnKS5lYWNoKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgbGV0IGlkID0gJCh0aGlzKS5kYXRhKCdpZCcpO1xuICAgICAgICBsZXQgcHJpY2UgPSAkKHRoaXMpLmRhdGEoJ3ByaWNlJyk7XG4gICAgICAgIGxldCB2YXJpYW50X2lkID0gJCh0aGlzKS5kYXRhKCd2YXJpYW50Jyk7XG4gICAgICAgIGxldCBxdWFudGl0eSA9ICQodGhpcykudmFsKCk7XG5cbiAgICAgICAgaXRlbSA9IHt9XG4gICAgICAgIGl0ZW1bJ2lkJ10gPSBpZDtcbiAgICAgICAgaXRlbVsndmFyaWFudF9pZCddID0gdmFyaWFudF9pZDtcbiAgICAgICAgaXRlbVsncHJpY2UnXSA9IHByaWNlO1xuICAgICAgICBpdGVtWydxdWFudGl0eSddID0gcXVhbnRpdHk7XG4gICAgICAgIC8vIFVwZGF0ZSBkaXNwbGF5IHRvdGFsIGl0ZW0gcHJpY2VcbiAgICAgICAgdG90YWwgPSBwcmljZSAqIHF1YW50aXR5O1xuICAgICAgICAkKCcuJyArIGlkICsgJy1Ub3RhbEl0ZW1QcmljZScpLmh0bWwodG90YWwpO1xuXG4gICAgICAgIGl0ZW1EYXRhLnB1c2goaXRlbSk7XG4gICAgfSk7XG4gICAgLy8gVXBkYXRlIFRvdGFsXG4gICAgY29uc29sZS5pbmZvKGl0ZW1EYXRhKTtcbiAgICBzdW1BbGxJdGVtcygpO1xuICAgICQoJyNJdGVtcy1EYXRhJykudmFsKGl0ZW1EYXRhKTtcbn1cblxuLy8gQWRkIHByb2R1Y3QgdG8gY2FydFxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxud2luZG93LmFkZFRvQ2FydCA9IGZ1bmN0aW9uIChyb3V0ZSwgZGF0YSkge1xuICAgICQuYWpheCh7XG4gICAgICAgIHVybDogcm91dGUsXG4gICAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgICBkYXRhVHlwZTogJ0pTT04nLFxuICAgICAgICBkYXRhOiBkYXRhLFxuICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAoZGF0YSkge1xuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coZGF0YSk7XG4gICAgICAgICAgICBpZiAoZGF0YS5yZXNwb25zZSA9PSAnc3VjY2VzcycpIHtcbiAgICAgICAgICAgICAgICAkKCcuQXZhaWxhYmxlU3RvY2snKS5odG1sKFwiU3RvY2sgZGlzcG9uaWJsZTogXCIgKyBkYXRhLm5ld1N0b2NrKTtcbiAgICAgICAgICAgICAgICB0b2FzdF9zdWNjZXNzKCdPayEnLCBkYXRhLm1lc3NhZ2UsICdib3R0b21DZW50ZXInLCAnJywgMjUwMCk7XG4gICAgICAgICAgICAgICAgdXBkYXRlVG90YWxzKCk7XG4gICAgICAgICAgICAgICAgc2V0SXRlbXNEYXRhKCk7XG4gICAgICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgIHNldEl0ZW1zRGF0YSgpO1xuICAgICAgICAgICAgICAgICAgICBzdW1BbGxJdGVtcygpO1xuICAgICAgICAgICAgICAgICAgICAvLyBvcGVuQ2hlY2tvdXREZXNrdG9wKCk7XG4gICAgICAgICAgICAgICAgfSwgMTAwKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoZGF0YS5yZXNwb25zZSA9PSAnd2FybmluZycpIHtcbiAgICAgICAgICAgICAgICB0b2FzdF9zdWNjZXNzKCdVcHMhJywgZGF0YS5tZXNzYWdlLCAnYm90dG9tQ2VudGVyJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIGVycm9yOiBmdW5jdGlvbiAoZGF0YSkge1xuICAgICAgICAgICAgJCgnI0Vycm9yJykuaHRtbChkYXRhLnJlc3BvbnNlVGV4dCk7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIkVycm9yIGVuIGFkZHRvQ2FydCgpXCIpO1xuICAgICAgICAgICAgLy8gbG9jYXRpb24ucmVsb2FkKCk7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhkYXRhKTtcbiAgICAgICAgfVxuICAgIH0pO1xufVxuXG4gXG5cbi8vIFJlbW92ZSBwcm9kdWN0IGZyb20gY2FydFxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxud2luZG93LnJlbW92ZUZyb21DYXJ0ID0gZnVuY3Rpb24gKHJvdXRlLCBjYXJ0SXRlbUlkLCB2YXJpYW50SWQsIHF1YW50aXR5LCBkaXYsIGFjdGlvbikge1xuICAgICQuYWpheCh7XG4gICAgICAgIHVybDogcm91dGUsXG4gICAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgICBkYXRhVHlwZTogJ0pTT04nLFxuICAgICAgICBkYXRhOiB7IGNhcnRJdGVtSWQ6IGNhcnRJdGVtSWQsIHZhcmlhbnRJZDogdmFyaWFudElkLCBxdWFudGl0eTogcXVhbnRpdHksIGFjdGlvbjogYWN0aW9uLCBtZXRob2Q6ICdhamF4JyB9LFxuICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAoZGF0YSkge1xuICAgICAgICAgICAgaWYgKGRhdGEucmVzcG9uc2UgPT0gJ2NhcnQtcmVtb3ZlZCcpIHtcbiAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhkYXRhKTtcbiAgICAgICAgICAgICAgICB1cGRhdGVUb3RhbHMoKTtcbiAgICAgICAgICAgICAgICB3aW5kb3cubG9jYXRpb24gPSB3aW5kb3cubG9jYXRpb24uaHJlZi5zcGxpdChcIj9cIilbMF07XG4gICAgICAgICAgICAgICAgc2V0SXRlbXNEYXRhKCk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKGRhdGEucmVzcG9uc2UgPT0gJ3N1Y2Nlc3MnKSB7XG4gICAgICAgICAgICAgICAgJChkaXYpLmhpZGUoMTAwKTtcbiAgICAgICAgICAgICAgICAkKGRpdikucmVtb3ZlKCk7XG4gICAgICAgICAgICAgICAgdXBkYXRlVG90YWxzKCk7XG4gICAgICAgICAgICAgICAgc2V0SXRlbXNEYXRhKCk7XG4gICAgICAgICAgICB9ICAgXG4gICAgICAgIH0sXG4gICAgICAgIGVycm9yOiBmdW5jdGlvbiAoZGF0YSkge1xuICAgICAgICAgICAgLy8kKCcjRXJyb3InKS5odG1sKGRhdGEucmVzcG9uc2VUZXh0KTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiRXJyb3IgZW4gcmVtb3ZlRnJvbUNhcnQoKVwiKTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGRhdGEpO1xuICAgICAgICAgICAgLy8gSWYgYW4gZXJyb3IgcG9wcyB3aGVuIGRlc3Ryb3lpbmcgYW4gaXRlbSwgcmVsb2FkIGFuZCBwcmV2ZW50IGJhZCBtYWdpY1xuICAgICAgICAgICAgbG9jYXRpb24ucmVsb2FkKCk7XG4gICAgICAgIH1cbiAgICB9KTtcbn1cblxuZnVuY3Rpb24gdXBkYXRlVG90YWxzKCkge1xuICAgIC8vIExpdmUgUmVsb2FkaW5nIHN0dWZmXG4gICAgJChcIiNTaWRlQ29udGFpbmVySXRlbXNGaXhlZFwiKS5sb2FkKHdpbmRvdy5sb2NhdGlvbi5ocmVmICsgXCIgI1NpZGVDb250YWluZXJJdGVtc0ZpeGVkXCIpO1xuICAgICQoXCIjU2lkZUNvbnRhaW5lckl0ZW1zRmxvYXRpbmdcIikubG9hZCh3aW5kb3cubG9jYXRpb24uaHJlZiArIFwiICNTaWRlQ29udGFpbmVySXRlbXNGbG9hdGluZ1wiKTtcbiAgICAkKFwiLlRvdGFsQ2FydEl0ZW1zXCIpLmxvYWQod2luZG93LmxvY2F0aW9uLmhyZWYgKyBcIiAuVG90YWxDYXJ0SXRlbXNcIik7XG4gICAgJChcIi5Ub3RhbENhcnRJdGVtc1NpZGViYXJcIikubG9hZCh3aW5kb3cubG9jYXRpb24uaHJlZiArIFwiIC5Ub3RhbENhcnRJdGVtc1NpZGViYXJcIik7XG4gICAgJChcIi5DYXJ0U3ViVG90YWxcIikubG9hZCh3aW5kb3cubG9jYXRpb24uaHJlZiArIFwiIC5DYXJ0U3ViVG90YWxcIik7XG4gICAgJChcIi5BdmFpbGFibGVTdG9ja1wiKS5sb2FkKHdpbmRvdy5sb2NhdGlvbi5ocmVmICsgXCIgLkF2YWlsYWJsZVN0b2NrXCIpO1xufVxuXG4vLyBTdWJtaXQgQ2FydCBGb3JtIHRvIENoZWNrb3V0XG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG53aW5kb3cuc3VibWl0Q2FydFRvQ2hlY2tvdXQgPSBmdW5jdGlvbiAocm91dGUsIHRhcmdldCwgZGF0YSwgYWN0aW9uKSB7XG4gICAgLy9jb25zb2xlLmxvZyhcIlJ1dGE6IFwiICsgcm91dGUgKyBcIiBUYXJnZXQ6IFwiICsgdGFyZ2V0ICsgXCIgRGF0YTogXCIgKyBkYXRhICsgXCJBY3Rpb246IFwiKyBhY3Rpb24pO1xuICAgICQuYWpheCh7XG4gICAgICAgIHVybDogcm91dGUsXG4gICAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgICBkYXRhVHlwZTogJ0pTT04nLFxuICAgICAgICBkYXRhOiB7IGRhdGEsIGFjdGlvbjogYWN0aW9uIH0sXG4gICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhkYXRhKTtcbiAgICAgICAgICAgIGlmIChkYXRhLnJlc3BvbnNlID09ICdzdWNjZXNzJykge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHRhcmdldCk7XG4gICAgICAgICAgICAgICAgaWYgKHRhcmdldCA9PSAncmVsb2FkJykge1xuICAgICAgICAgICAgICAgICAgICAvLyBSZWZyZXNoIHBhZ2UsIGRlbGV0ZSBwYXJhbWV0dGVycyBhbmQgb3BlbiBjaGVja291dCBzaWRlYmFyXG4gICAgICAgICAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbiA9IHdpbmRvdy5sb2NhdGlvbi5ocmVmLnNwbGl0KFwiP1wiKVswXSArIFwiP2NoZWNrb3V0LW9uXCI7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSB0YXJnZXQ7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnRXJyb3IgZW4gc3VibWl0Rm9ybScpO1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGRhdGEpO1xuICAgICAgICAgICAgICAgIHRvYXN0X2Vycm9yKCcnLCBkYXRhLm1lc3NhZ2UsICdib3R0b21DZW50ZXInLCAnJyk7XG4gICAgICAgICAgICAgICAgJCgnLlNpZGVDb250YWluZXJFcnJvcicpLmh0bWwoZGF0YS5tZXNzYWdlKTtcbiAgICAgICAgICAgICAgICAvLyAkKCcjRXJyb3InKS5odG1sKGRhdGEucmVzcG9uc2VUZXh0KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vICQoJyNFcnJvcicpLmh0bWwoZGF0YS5yZXNwb25zZVRleHQpO1xuICAgICAgICB9LFxuICAgICAgICBlcnJvcjogZnVuY3Rpb24gKGRhdGEpIHtcbiAgICAgICAgICAgIC8vICQoJyNFcnJvcicpLmh0bWwoZGF0YS5yZXNwb25zZVRleHQpO1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJFcnJvciBlbiBzdWJtaXRGb3JtKClcIik7XG4gICAgICAgICAgICBsb2NhdGlvbi5yZWxvYWQoKTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGRhdGEpO1xuICAgICAgICAgICAgLy8gbG9jYXRpb24ucmVsb2FkKCk7XG4gICAgICAgIH1cbiAgICB9KTtcbn1cblxuLy8gVmFsaWRhdGUgYW5kIHNldCBjb3Vwb25cbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbndpbmRvdy52YWxpZGF0ZUFuZFNldENvdXBvbiA9IGZ1bmN0aW9uIChyb3V0ZSwgY29kZSwgY2FydGlkKSB7XG4gICAgbGV0IGNvdXBvbkRpdiA9ICQoJyNDb3Vwb25EaXYnKTtcbiAgICBsZXQgY291cG9uU2V0ID0gJCgnI1NldHRlZENvdXBvbicpO1xuICAgIGNvbnNvbGUubG9nKGNvZGUsIGNhcnRpZCk7XG4gICAgJC5hamF4KHtcbiAgICAgICAgdXJsOiByb3V0ZSxcbiAgICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICAgIGRhdGFUeXBlOiAnSlNPTicsXG4gICAgICAgIGRhdGE6IHsgY29kZTogY29kZSwgY2FydGlkOiBjYXJ0aWQgfSxcbiAgICAgICAgYmVmb3JlU2VuZDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJDb21wcm9iYW5kbyBjdXDDs24uLi5cIik7XG4gICAgICAgICAgICAkKCcuQ291cG9uTG9hZGVyJykucmVtb3ZlQ2xhc3MoJ0hpZGRlbicpO1xuICAgICAgICB9LFxuICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAoZGF0YSkge1xuICAgICAgICAgICAgaWYgKGRhdGEucmVzcG9uc2UgPT0gdHJ1ZSkge1xuICAgICAgICAgICAgICAgICQoJyNDb3Vwb25WYWxpZGF0aW9uTWVzc2FnZScpLmh0bWwoXCJDdXDDs24gYWNlcHRhZG8gIVwiKTtcbiAgICAgICAgICAgICAgICBjb3Vwb25EaXYuaGlkZSgyMDAsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgY291cG9uU2V0LnJlbW92ZUNsYXNzKCdIaWRkZW4nKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBsb2NhdGlvbi5yZWxvYWQoKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoZGF0YS5yZXNwb25zZSA9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgJCgnI0NvdXBvblZhbGlkYXRpb25NZXNzYWdlJykuaHRtbChkYXRhLm1lc3NhZ2UpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBlcnJvcjogZnVuY3Rpb24gKGRhdGEpIHtcbiAgICAgICAgICAgICQoJyNDb3Vwb25WYWxpZGF0aW9uTWVzc2FnZScpLmh0bWwoZGF0YS5yZXNwb25zZVRleHQpO1xuICAgICAgICAgICAgY29uc29sZS5sb2coZGF0YSk7XG4gICAgICAgIH0sXG4gICAgICAgIGNvbXBsZXRlOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAkKCcuQ291cG9uTG9hZGVyJykuYWRkQ2xhc3MoJ0hpZGRlbicpO1xuICAgICAgICB9XG4gICAgfSk7XG59XG5cbi8vIEZhdnNcbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbndpbmRvdy5hZGRBcnRpY2xlVG9GYXZzID0gZnVuY3Rpb24gKHJvdXRlLCBmYXZpZCwgYXJ0aWNsZWlkLCBhY3Rpb24sIGRpc3BsYXlCdXR0b24pIHtcbiAgICAkLmFqYXgoe1xuICAgICAgICB1cmw6IHJvdXRlLFxuICAgICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgICAgZGF0YVR5cGU6ICdKU09OJyxcbiAgICAgICAgZGF0YTogeyBmYXZfaWQ6IGZhdmlkLCBhcnRpY2xlX2lkOiBhcnRpY2xlaWQgfSxcbiAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKGRhdGEpIHtcbiAgICAgICAgICAgIGlmIChkYXRhLnJlc3BvbnNlID09IHRydWUgJiYgZGF0YS5yZXN1bHQgPT0gJ2FkZGVkJykge1xuICAgICAgICAgICAgICAgIHN3aXRjaCAoYWN0aW9uKSB7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJ3JlbG9hZCc6XG4gICAgICAgICAgICAgICAgICAgICAgICBsb2NhdGlvbi5yZWxvYWQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBjYXNlICdzaG93JzpcbiAgICAgICAgICAgICAgICAgICAgICAgIGRpc3BsYXlCdXR0b24ucmVtb3ZlQ2xhc3MoJ2Zhdi1pY29uLW5vZmF2Jyk7XG4gICAgICAgICAgICAgICAgICAgICAgICBkaXNwbGF5QnV0dG9uLmFkZENsYXNzKCdmYXYtaWNvbi1pc2ZhdicpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdG9hc3Rfc3VjY2VzcygnT2shJywgJ1Byb2R1Y3RvIGFncmVnYWRvIGEgZmF2b3JpdG9zJywgJ2JvdHRvbUNlbnRlcicsICcnLCAxMDAwKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBjYXNlICdub25lJzpcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdBY3R1YWxpemFkbyAtIFNpbiBBY2Npw7NuJyk7XG4gICAgICAgICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnTm8gaGF5IGFjY2nDs24nKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSBpZiAoZGF0YS5yZXNwb25zZSA9PSB0cnVlICYmIGRhdGEucmVzdWx0ID09ICdyZW1vdmVkJykge1xuICAgICAgICAgICAgICAgIGRpc3BsYXlCdXR0b24uYWRkQ2xhc3MoJ2Zhdi1pY29uLW5vZmF2Jyk7XG4gICAgICAgICAgICAgICAgZGlzcGxheUJ1dHRvbi5yZW1vdmVDbGFzcygnZmF2LWljb24taXNmYXYnKTtcbiAgICAgICAgICAgICAgICB0b2FzdF9zdWNjZXNzKCdPayEnLCAnUHJvZHVjdG8gZWxpbWluYWRvIGRlIGZhdm9yaXRvcycsICdib3R0b21DZW50ZXInLCAnJywgMTAwMCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBzZXRGYXZzVG90YWxJY29uKGRhdGEuZmF2c0NvdW50KTtcbiAgICAgICAgfSxcbiAgICAgICAgZXJyb3I6IGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgICAgICAgICAkKCcjRXJyb3InKS5odG1sKGRhdGEucmVzcG9uc2VUZXh0KTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGRhdGEpO1xuICAgICAgICB9XG4gICAgfSk7XG59XG5cbmZ1bmN0aW9uIHNldEZhdnNUb3RhbEljb24oZmF2cykge1xuICAgIGlmIChmYXZzID4gMCkge1xuICAgICAgICAkKCcuRmF2TWFpbkljb24nKS5yZW1vdmVDbGFzcygnZmFyJyk7XG4gICAgICAgICQoJy5GYXZNYWluSWNvbicpLmFkZENsYXNzKCdmYScpO1xuICAgIH0gZWxzZSBpZiAoZmF2cyA9PSAwKSB7XG4gICAgICAgICQoJy5GYXZNYWluSWNvbicpLnJlbW92ZUNsYXNzKCdmYScpO1xuICAgICAgICAkKCcuRmF2TWFpbkljb24nKS5hZGRDbGFzcygnZmFyJyk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgJCgnLkZhdk1haW5JY29uJykucmVtb3ZlQ2xhc3MoJ2ZhJyk7XG4gICAgICAgICQoJy5GYXZNYWluSWNvbicpLnJlbW92ZUNsYXNzKCdmYXInKTtcbiAgICAgICAgJCgnLkZhdk1haW5JY29uJykuYWRkQ2xhc3MoJ2ZhJyk7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiRXJyb3IgZW4gc2V0RmF2c1RvdGFsSWNvbigpXCIpO1xuICAgIH1cbn1cblxud2luZG93LnJlbW92ZUFydGljbGVGcm9tRmF2cyA9IGZ1bmN0aW9uIChyb3V0ZSwgZmF2aWQsIGFjdGlvbikge1xuICAgIHZhciBkb2FjdGlvbiA9IGFjdGlvbjtcbiAgICAkLmFqYXgoe1xuICAgICAgICB1cmw6IHJvdXRlLFxuICAgICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgICAgZGF0YVR5cGU6ICdKU09OJyxcbiAgICAgICAgZGF0YTogeyBmYXZfaWQ6IGZhdmlkIH0sXG4gICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgICAgICAgICAkKCcjRXJyb3InKS5odG1sKGRhdGEucmVzcG9uc2VUZXh0KTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGRhdGEpO1xuICAgICAgICAgICAgaWYgKGRhdGEucmVzcG9uc2UgPT0gdHJ1ZSkge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGRvYWN0aW9uKTtcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKGRvYWN0aW9uKSB7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJ3JlbG9hZCc6XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgYWN0aW9uID0gJ3JlbG9hZCc7XG4gICAgICAgICAgICAgICAgICAgICAgICB0b2FzdF9zdWNjZXNzKCdPayEnLCAnUHJvZHVjdG8gZWxpbWluYWRvIGRlIGZhdm9yaXRvcycsICdib3R0b21DZW50ZXInLCBhY3Rpb24sIDEwMDApO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnTm8gaGF5IGFjY2nDs24nKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgLy8kKCcjRXJyb3InKS5odG1sKGRhdGEubWVzc2FnZVsnZXJyb3JJbmZvJ10pO1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGRhdGEpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBlcnJvcjogZnVuY3Rpb24gKGRhdGEpIHtcbiAgICAgICAgICAgIC8vJCgnI0Vycm9yJykuaHRtbChkYXRhLnJlc3BvbnNlVGV4dCk7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhkYXRhKTtcbiAgICAgICAgfVxuICAgIH0pO1xufVxuXG5cbndpbmRvdy5yZW1vdmVBbGxBcnRpY2xlc0Zyb21GYXZzID0gZnVuY3Rpb24gKHJvdXRlLCBjdXN0b21lcmlkLCBhY3Rpb24pIHtcbiAgICAkLmFqYXgoe1xuICAgICAgICB1cmw6IHJvdXRlLFxuICAgICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgICAgZGF0YVR5cGU6ICdKU09OJyxcbiAgICAgICAgZGF0YTogeyBjdXN0b21lcl9pZDogY3VzdG9tZXJpZCB9LFxuICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAoZGF0YSkge1xuICAgICAgICAgICAgY29uc29sZS5sb2coZGF0YSk7XG4gICAgICAgICAgICAvLyQoJyNFcnJvcicpLmh0bWwoZGF0YS5yZXNwb25zZVRleHQpO1xuICAgICAgICAgICAgaWYgKGRhdGEucmVzcG9uc2UgPT0gdHJ1ZSkge1xuICAgICAgICAgICAgICAgIHN3aXRjaCAoYWN0aW9uKSB7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJ3JlbG9hZCc6XG4gICAgICAgICAgICAgICAgICAgICAgICBsb2NhdGlvbi5yZWxvYWQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ05vIGhheSBhY2Npw7NuJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICQoJyNFcnJvcicpLmh0bWwoZGF0YS5tZXNzYWdlWydlcnJvckluZm8nXSk7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coZGF0YSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIGVycm9yOiBmdW5jdGlvbiAoZGF0YSkge1xuICAgICAgICAgICAgLy8kKCcjRXJyb3InKS5odG1sKGRhdGEucmVzcG9uc2VUZXh0KTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGRhdGEpO1xuICAgICAgICB9XG4gICAgfSk7XG59XG5cbi8qXG58LS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbnwgTE9HSU4gQU5EIFJFR0lTVEVSXG58LS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiovXG5cbiQoJyNSZXNlbGxlckJveCcpLmhpZGUoKTtcblxud2luZG93Lm9wZW5SZXNlbGxlclJlZ2lzdHJhdGlvbiA9IGZ1bmN0aW9uKClcbntcbiAgICAkKCcjSXNSZXNlbGxlckNoZWNrYm94JykucHJvcCgnY2hlY2tlZCcsIHRydWUpO1xuICAgICQoJy5JZlJlc2VsbGVyRW5hYmxlJykucHJvcCgnZGlzYWJsZWQnLCBmYWxzZSk7XG4gICAgJCgnI1Jlc2VsbGVyQm94Jykuc2hvdygxMDApO1xuICAgICQoJyNSZXNlbGxlckNUQScpLmhpZGUoMCk7XG4gICAgJCgnLk5vcm1hQ2xpZW50VGl0bGUnKS5oaWRlKDApO1xuICAgICQoJy5SZXNlbGxlclRpdGxlJykuc2hvdygwKTtcbn1cblxuXG53aW5kb3cuY2xvc2VSZXNlbGxlclJlZ2lzdHJhdGlvbiA9IGZ1bmN0aW9uKClcbntcbiAgICAkKCcjSXNSZXNlbGxlckNoZWNrYm94JykucHJvcCgnY2hlY2tlZCcsIGZhbHNlKTtcbiAgICAkKCcuSWZSZXNlbGxlckVuYWJsZScpLnByb3AoJ2Rpc2FibGVkJywgdHJ1ZSk7XG4gICAgJCgnI1Jlc2VsbGVyQm94JykuaGlkZSgwKTtcbiAgICAkKCcjUmVzZWxsZXJDVEEnKS5zaG93KDEwMCk7XG4gICAgJCgnLk5vcm1hQ2xpZW50VGl0bGUnKS5zaG93KDApO1xuICAgICQoJy5SZXNlbGxlclRpdGxlJykuaGlkZSgwKTtcbn1cblxuJChkb2N1bWVudCkucmVhZHkoZnVuY3Rpb24oKXtcbiAgICAkKCcuR2VvUHJvdlNlbGVjdCcpLm9uKCdjaGFuZ2UnLCBmdW5jdGlvbigpe1xuICAgICAgICBsZXQgcHJvdl9pZCA9ICQodGhpcykudmFsKCk7XG4gICAgICAgIGdldEdlb0xvY3MocHJvdl9pZCk7XG4gICAgfSk7XG59KTtcblxuXG4vKlxufC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG58IE1JWCBGVU5DVElPTlNcbnwtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuKi9cblxud2luZG93LmNsb3NlRWxlbWVudCA9IGZ1bmN0aW9uKHNlbGVjdG9yKVxue1xuICAgICQoc2VsZWN0b3IpLmhpZGUoMTAwKTtcbn1cblxud2luZG93LmdldFBhcmFtID0gZnVuY3Rpb24ocGFyYW1ldGVyTmFtZSkge1xuICAgIHZhciByZXN1bHQgPSBudWxsLFxuICAgICAgICB0bXAgPSBbXTtcbiAgICBsb2NhdGlvbi5zZWFyY2hcbiAgICAgICAgLnN1YnN0cigxKVxuICAgICAgICAuc3BsaXQoXCImXCIpXG4gICAgICAgIC5mb3JFYWNoKGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICAgIHRtcCA9IGl0ZW0uc3BsaXQoXCI9XCIpO1xuICAgICAgICBpZiAodG1wWzBdID09PSBwYXJhbWV0ZXJOYW1lKSByZXN1bHQgPSBkZWNvZGVVUklDb21wb25lbnQodG1wWzFdKTtcbiAgICAgICAgfSk7XG4gICAgcmV0dXJuIHJlc3VsdDtcbn1cblxuXG53aW5kb3cuZ2V0UGFyYW1zID0gZnVuY3Rpb24odXJsKSB7XG4gICAgdmFyIHBhcmFtcyA9IHt9O1xuXHR2YXIgcGFyc2VyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYScpO1xuXHRwYXJzZXIuaHJlZiA9IHVybDtcblx0dmFyIHF1ZXJ5ID0gcGFyc2VyLnNlYXJjaC5zdWJzdHJpbmcoMSk7XG5cdHZhciB2YXJzID0gcXVlcnkuc3BsaXQoJyYnKTtcblx0Zm9yICh2YXIgaSA9IDA7IGkgPCB2YXJzLmxlbmd0aDsgaSsrKSB7XG5cdFx0dmFyIHBhaXIgPSB2YXJzW2ldLnNwbGl0KCc9Jyk7XG5cdFx0cGFyYW1zW3BhaXJbMF1dID0gZGVjb2RlVVJJQ29tcG9uZW50KHBhaXJbMV0pO1xuXHR9XG5cdHJldHVybiBwYXJhbXM7XG59XG5cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3Jlc291cmNlcy9hc3NldHMvanMvc3RvcmUvc2NyaXB0cy5qcyJdLCJzb3VyY2VSb290IjoiIn0=