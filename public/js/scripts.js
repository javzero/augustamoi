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
    var body = $('body');

    var show = function show() {
        sidebar.addClass('active');
        body.addClass('allow-sidebar');
    };

    var hide = function hide() {
        sidebar.removeClass('active');
        body.removeClass('allow-sidebar');
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgMjA0NDhkODc0OTMxZjYzYjI1MTQiLCJ3ZWJwYWNrOi8vLy4vcmVzb3VyY2VzL2Fzc2V0cy9qcy9zdG9yZS9zY3JpcHRzLmpzIl0sIm5hbWVzIjpbIiQiLCJvbiIsInJlbW92ZUNsYXNzIiwia2V5cHJlc3MiLCJlIiwiY29uc29sZSIsImxvZyIsIndoaWNoIiwicHJldmVudERlZmF1bHQiLCJ2YWx1ZSIsInNpYmxpbmdzIiwidmFsIiwicXVhbnRpdHkiLCJuZXdWYWx1ZSIsIm5ld1ByaWNlVGFyZ2V0IiwicGFyZW50IiwibW9kaWZ5Q2FydEl0ZW1RIiwiaHRtbCIsImNsaWNrIiwiY2hlY2tvdXRTaWRlYmFyIiwid2luZG93Iiwic3RhdGUiLCJzaWRlYmFyIiwiYm9keSIsInNob3ciLCJhZGRDbGFzcyIsImhpZGUiLCJ1bmRlZmluZWQiLCJoYXNDbGFzcyIsIm9wZW5DaGVja291dERlc2t0b3AiLCJ3aWR0aCIsIm9wZW5GaWx0ZXJzIiwiZmlsdGVycyIsInRyaWdnZXIiLCJzdW1BbGxJdGVtcyIsInN1bSIsImVhY2giLCJpbmRleCIsInBhcnNlSW50Iiwic3VtRGl2cyIsIm9yaWdpbnMiLCJ0YXJnZXQiLCJwYXJzZUZsb2F0IiwidGV4dCIsImNoZWNrVmFyaWFudFN0b2NrIiwiZm9ybSIsImRhdGEiLCJzZXJpYWxpemUiLCJhbGxvd1N1Ym1pdCIsImFqYXgiLCJ1cmwiLCJtZXRob2QiLCJkYXRhVHlwZSIsImFzeW5jIiwic3VjY2VzcyIsInJlc3BvbnNlIiwibWVzc2FnZSIsInByb3AiLCJyZXNwb25zZVRleHQiLCJlcnJvciIsInNldEl0ZW1zRGF0YSIsIml0ZW1EYXRhIiwiaWQiLCJwcmljZSIsInZhcmlhbnRfaWQiLCJpdGVtIiwidG90YWwiLCJwdXNoIiwiaW5mbyIsImFkZFRvQ2FydCIsInJvdXRlIiwibmV3U3RvY2siLCJ0b2FzdF9zdWNjZXNzIiwidXBkYXRlVG90YWxzIiwic2V0VGltZW91dCIsInJlbW92ZUZyb21DYXJ0IiwiY2FydEl0ZW1JZCIsInZhcmlhbnRJZCIsImRpdiIsImFjdGlvbiIsImxvY2F0aW9uIiwiaHJlZiIsInNwbGl0IiwicmVtb3ZlIiwicmVsb2FkIiwibG9hZCIsInN1Ym1pdENhcnRUb0NoZWNrb3V0IiwidG9hc3RfZXJyb3IiLCJ2YWxpZGF0ZUFuZFNldENvdXBvbiIsImNvZGUiLCJjYXJ0aWQiLCJjb3Vwb25EaXYiLCJjb3Vwb25TZXQiLCJiZWZvcmVTZW5kIiwiY29tcGxldGUiLCJhZGRBcnRpY2xlVG9GYXZzIiwiZmF2aWQiLCJhcnRpY2xlaWQiLCJkaXNwbGF5QnV0dG9uIiwiZmF2X2lkIiwiYXJ0aWNsZV9pZCIsInJlc3VsdCIsInNldEZhdnNUb3RhbEljb24iLCJmYXZzQ291bnQiLCJmYXZzIiwicmVtb3ZlQXJ0aWNsZUZyb21GYXZzIiwiZG9hY3Rpb24iLCJyZW1vdmVBbGxBcnRpY2xlc0Zyb21GYXZzIiwiY3VzdG9tZXJpZCIsImN1c3RvbWVyX2lkIiwib3BlblJlc2VsbGVyUmVnaXN0cmF0aW9uIiwiY2xvc2VSZXNlbGxlclJlZ2lzdHJhdGlvbiIsImRvY3VtZW50IiwicmVhZHkiLCJwcm92X2lkIiwiZ2V0R2VvTG9jcyIsImNsb3NlRWxlbWVudCIsInNlbGVjdG9yIiwiZ2V0UGFyYW0iLCJwYXJhbWV0ZXJOYW1lIiwidG1wIiwic2VhcmNoIiwic3Vic3RyIiwiZm9yRWFjaCIsImRlY29kZVVSSUNvbXBvbmVudCIsImdldFBhcmFtcyIsInBhcmFtcyIsInBhcnNlciIsImNyZWF0ZUVsZW1lbnQiLCJxdWVyeSIsInN1YnN0cmluZyIsInZhcnMiLCJpIiwibGVuZ3RoIiwicGFpciJdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFD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QXhDLGFBQVN5QyxNQUFULENBQ0tDLE1BREwsQ0FDWSxDQURaLEVBRUt4QyxLQUZMLENBRVcsR0FGWCxFQUdLeUMsT0FITCxDQUdhLFVBQVUxRCxJQUFWLEVBQWdCO0FBQ3pCdUQsY0FBTXZELEtBQUtpQixLQUFMLENBQVcsR0FBWCxDQUFOO0FBQ0EsWUFBSXNDLElBQUksQ0FBSixNQUFXRCxhQUFmLEVBQThCbEIsU0FBU3VCLG1CQUFtQkosSUFBSSxDQUFKLENBQW5CLENBQVQ7QUFDN0IsS0FOTDtBQU9BLFdBQU9uQixNQUFQO0FBQ0gsQ0FYRDs7QUFjQWpGLE9BQU95RyxTQUFQLEdBQW1CLFVBQVMzRSxHQUFULEVBQWM7QUFDN0IsUUFBSTRFLFNBQVMsRUFBYjtBQUNILFFBQUlDLFNBQVNmLFNBQVNnQixhQUFULENBQXVCLEdBQXZCLENBQWI7QUFDQUQsV0FBTzlDLElBQVAsR0FBYy9CLEdBQWQ7QUFDQSxRQUFJK0UsUUFBUUYsT0FBT04sTUFBUCxDQUFjUyxTQUFkLENBQXdCLENBQXhCLENBQVo7QUFDQSxRQUFJQyxPQUFPRixNQUFNL0MsS0FBTixDQUFZLEdBQVosQ0FBWDtBQUNBLFNBQUssSUFBSWtELElBQUksQ0FBYixFQUFnQkEsSUFBSUQsS0FBS0UsTUFBekIsRUFBaUNELEdBQWpDLEVBQXNDO0FBQ3JDLFlBQUlFLE9BQU9ILEtBQUtDLENBQUwsRUFBUWxELEtBQVIsQ0FBYyxHQUFkLENBQVg7QUFDQTRDLGVBQU9RLEtBQUssQ0FBTCxDQUFQLElBQWtCVixtQkFBbUJVLEtBQUssQ0FBTCxDQUFuQixDQUFsQjtBQUNBO0FBQ0QsV0FBT1IsTUFBUDtBQUNBLENBWEQsQyIsImZpbGUiOiIvanMvc2NyaXB0cy5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwge1xuIFx0XHRcdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcbiBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4gXHRcdFx0XHRnZXQ6IGdldHRlclxuIFx0XHRcdH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIi9cIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSA3Mik7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgMjA0NDhkODc0OTMxZjYzYjI1MTQiLCIvLyBMb2FkZXJzXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4kKFwiLmxvYWRlci1vbi1jaGFuZ2VcIikub24oJ2NoYW5nZScsIGZ1bmN0aW9uICgpIHtcbiAgICAkKCcjZnVsbC1sb2FkZXInKS5yZW1vdmVDbGFzcygnSGlkZGVuJyk7XG4gICAgcmV0dXJuIHRydWU7XG59KTtcblxuJChcIi5sb2FkZXItb24tc3VibWl0XCIpLm9uKCdzdWJtaXQnLCBmdW5jdGlvbiAoKSB7XG4gICAgJCgnI2Z1bGwtbG9hZGVyJykucmVtb3ZlQ2xhc3MoJ0hpZGRlbicpO1xuICAgIHJldHVybiB0cnVlO1xufSk7XG5cbiQoJy5kb250LXN1Ym1pdC1vbi1lbnRlciwgLmRzb24nKS5rZXlwcmVzcyhmdW5jdGlvbiAoZSkge1xuICAgIGNvbnNvbGUubG9nKFwiRU5URVJcIik7XG4gICAgaWYgKGUud2hpY2ggPT0gMTMpIHJldHVybiBmYWxzZTtcbiAgICBpZiAoZS53aGljaCA9PSAxMykgZS5wcmV2ZW50RGVmYXVsdCgpO1xufSk7XG5cbi8vIE1vZGlmeSBjYXJ0IGl0ZW0gcXVhbnRpdHkgXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4kKCcuSW5wdXRCdG5RJykub24oJ2NoYW5nZSBrZXl1cCcsIGZ1bmN0aW9uICgpIHtcbiAgICAvLyAgT3JpZ2luYWwgQXJ0aWNsZSBQcmljZVxuICAgIGxldCB2YWx1ZSA9ICQodGhpcykuc2libGluZ3MoJy5BcnRpY2xlUHJpY2UnKS52YWwoKTtcbiAgICAvLyBRdWFudGl0eVxuICAgIGxldCBxdWFudGl0eSA9ICQodGhpcykudmFsKCk7XG4gICAgLy8gTmVyIFZhbHVlXG4gICAgbGV0IG5ld1ZhbHVlID0gKHZhbHVlICogcXVhbnRpdHkpO1xuICAgIC8vIE5ldyBQcmljZSBUYXJnZXRcbiAgICBsZXQgbmV3UHJpY2VUYXJnZXQgPSAkKHRoaXMpLnBhcmVudCgpLnBhcmVudCgpLnBhcmVudCgpLnNpYmxpbmdzKCcuVG90YWxJdGVtUHJpY2UnKTtcblxuICAgIGNvbnNvbGUubG9nKHZhbHVlLCBxdWFudGl0eSwgbmV3VmFsdWUpO1xuICAgIG1vZGlmeUNhcnRJdGVtUSgkKHRoaXMpLCBuZXdQcmljZVRhcmdldCwgbmV3VmFsdWUpO1xufSlcblxuZnVuY3Rpb24gbW9kaWZ5Q2FydEl0ZW1RKGUsIG5ld1ByaWNlVGFyZ2V0LCBuZXdWYWx1ZSkge1xuICAgIGUuc2libGluZ3MoJy5JbnB1dEJ0blEnKS5yZW1vdmVDbGFzcygnSGlkZGVuJyk7XG4gICAgbmV3UHJpY2VUYXJnZXQuaHRtbCgnJCAnICsgbmV3VmFsdWUpO1xufVxuXG5cbiQoJyNNYWluT3ZlcmxheScpLmNsaWNrKGZ1bmN0aW9uKCl7XG4gICAgY2hlY2tvdXRTaWRlYmFyKCdoaWRlJyk7XG59KVxuLy8gQ2hlY2tvdXQgc2lkZWJhclxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVx0XHRcbndpbmRvdy5jaGVja291dFNpZGViYXIgPSBmdW5jdGlvbiAoc3RhdGUpIHtcblxuICAgIGNvbnN0IHNpZGViYXIgPSAkKCcuQ2hlY2tvdXRDYXJ0Jyk7XG4gICAgY29uc3QgYm9keSA9ICQoJ2JvZHknKTtcblxuICAgIGNvbnN0IHNob3cgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHNpZGViYXIuYWRkQ2xhc3MoJ2FjdGl2ZScpO1xuICAgICAgICBib2R5LmFkZENsYXNzKCdhbGxvdy1zaWRlYmFyJyk7XG4gICAgfVxuXG4gICAgY29uc3QgaGlkZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgc2lkZWJhci5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XG4gICAgICAgIGJvZHkucmVtb3ZlQ2xhc3MoJ2FsbG93LXNpZGViYXInKTtcbiAgICB9XG5cblxuICAgIGlmIChzdGF0ZSA9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgaWYgKHNpZGViYXIuaGFzQ2xhc3MoJ2FjdGl2ZScpKSB7XG4gICAgICAgICAgICBoaWRlKCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBzaG93KCk7XG4gICAgICAgIH1cbiAgICB9IGVsc2UgaWYgKHN0YXRlID09ICdzaG93Jykge1xuICAgICAgICBzaG93KCk7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9IGVsc2UgaWYgKHN0YXRlID09ICdoaWRlJykge1xuICAgICAgICBoaWRlKCk7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG59XG5cblxuXG53aW5kb3cub3BlbkNoZWNrb3V0RGVza3RvcCA9IGZ1bmN0aW9uKClcbntcbiAgICBpZiAoJCh3aW5kb3cpLndpZHRoKCkgPiA3NjgpIHtcbiAgICAgICAgY2hlY2tvdXRTaWRlYmFyKCdzaG93Jyk7XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbn1cblxuXG4vLyAkKHdpbmRvdykuc2Nyb2xsKGZ1bmN0aW9uIChldmVudCkge1xuLy8gICAgIHZhciBzY3JvbGwgPSAkKHdpbmRvdykuc2Nyb2xsVG9wKCk7XG5cbi8vICAgICBpZiAoc2Nyb2xsID4gMTI1KSB7XG4vLyAgICAgICAgICQoJy5jaGVja291dC1jYXJ0JykuYWRkQ2xhc3MoJ3Njcm9sbGVkJyk7XG4vLyAgICAgfVxuLy8gICAgIGVsc2Uge1xuLy8gICAgICAgICAkKCcuY2hlY2tvdXQtY2FydCcpLnJlbW92ZUNsYXNzKCdzY3JvbGxlZCcpO1xuLy8gICAgIH1cbi8vIH0pO1xuXG5cbi8vIFNpZGViYXIgY2hlY2tvdXQgYWJzb2x1dGVcbi8vIHdpbmRvdy5jaGVja291dFNpZGViYXIgPSBmdW5jdGlvbiAoYWN0aW9uKSB7XG4vLyAgICAgaWYgKGFjdGlvbiA9PSAnb3BlbicpIHtcbi8vICAgICAgICAgJCgnI1NpZGVDb250YWluZXInKS50b2dnbGUoMTAwKTtcbi8vICAgICAgICAgJCgnI01haW5PdmVybGF5JykuZmFkZUluKDEwMCk7XG4vLyAgICAgfVxuLy8gICAgIGlmIChhY3Rpb24gPT0gJ2Nsb3NlJykge1xuLy8gICAgICAgICAkKCcjU2lkZUNvbnRhaW5lcicpLnRvZ2dsZSgxMDApO1xuLy8gICAgICAgICAkKCcjTWFpbk92ZXJsYXknKS5mYWRlT3V0KDEwMCk7XG4vLyAgICAgfVxuLy8gfVxuXG4vLyAkKCcjTWFpbk92ZXJsYXknKS5jbGljayhmdW5jdGlvbiAoKSB7XG4vLyAgICAgY2hlY2tvdXRTaWRlYmFyKFwiY2xvc2VcIik7XG4vLyB9KTtcblxud2luZG93Lm9wZW5GaWx0ZXJzID0gZnVuY3Rpb24gKCkge1xuICAgIGNvbnN0IGZpbHRlcnMgPSAkKCcjU2VhcmNoRmlsdGVycycpO1xuICAgIGNvbnN0IHRyaWdnZXIgPSAkKCcjU2VhcmNoRmlsdGVyc1RyaWdnZXInKTtcbiAgICBpZihmaWx0ZXJzLmhhc0NsYXNzKCdhY3RpdmUnKSlcbiAgICB7XG4gICAgICAgIGZpbHRlcnMucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xuICAgICAgICB0cmlnZ2VyLnNob3coKTtcbiAgICB9XG4gICAgZWxzZVxuICAgIHtcbiAgICAgICAgZmlsdGVycy5hZGRDbGFzcygnYWN0aXZlJyk7XG4gICAgICAgIHRyaWdnZXIuaGlkZSgpO1xuICAgIH1cblxufVxuXG4vLyBIaWRlIGFsZXJ0c1xuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuLy8gc2V0VGltZW91dChmdW5jdGlvbigpe1xuLy8gICAgICQoJy5hbGVydCcpLmhpZGUoMTAwKTtcbi8vIH0sIDQwMDApO1xuXG5cbi8vIENhcnQgUmVzdW1lblxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG4vLyB3aW5kb3cuc2hvd0NhcnRSZXN1bWVNb2JpbGUgPSBmdW5jdGlvbigpXG4vLyB7XG4vLyAgICAgJCgnLmNhcnQtcmVzdW1lLWRldGFpbHMtbW9iaWxlJykudG9nZ2xlQ2xhc3MoJ0hpZGRlbicsIDEwMCk7XG4vLyB9XG5cbi8qXG58LS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbnwgQ0FSVFxufC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4qL1xuXG5cbndpbmRvdy5zdW1BbGxJdGVtcyA9IGZ1bmN0aW9uICgpIHtcbiAgICBzdW0gPSAwO1xuICAgICQoJy5Ub3RhbEl0ZW1QcmljZScpLmVhY2goZnVuY3Rpb24gKGluZGV4KSB7XG4gICAgICAgIHN1bSArPSBwYXJzZUludCgkKHRoaXMpLmh0bWwoKSk7XG4gICAgfSk7XG4gICAgJCgnLlN1YlRvdGFsJykuaHRtbChzdW0pO1xufVxuXG5cbi8vIFN1bSBkaXZzIHRleHRcbndpbmRvdy5zdW1EaXZzID0gZnVuY3Rpb24gKG9yaWdpbnMsIHRhcmdldCkge1xuICAgIGxldCBzdW0gPSAwO1xuICAgIG9yaWdpbnMuZWFjaChmdW5jdGlvbiAoKSB7XG4gICAgICAgIHN1bSArPSBwYXJzZUZsb2F0KCQodGhpcykudGV4dCgpKTtcbiAgICB9KTtcbiAgICB0YXJnZXQudGV4dChzdW0pO1xufVxuXG5cbi8vIENoZWNrIHByb2R1Y3QgdmFyaWFudCBzdG9ja1xuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxud2luZG93LmNoZWNrVmFyaWFudFN0b2NrID0gZnVuY3Rpb24oKSB7XG4gICAgbGV0IGZvcm0gPSAkKCcjQWRkVG9DYXJ0Rm9ybScpO1xuICAgIGxldCBkYXRhID0gZm9ybS5zZXJpYWxpemUoKTtcbiAgICBjb25zb2xlLmxvZyhmb3JtLmRhdGEoJ3JvdXRlJykpO1xuICAgIGxldCBhbGxvd1N1Ym1pdCA9IGZhbHNlO1xuICAgICQuYWpheCh7XG4gICAgICAgIHVybDogZm9ybS5kYXRhKCdyb3V0ZScpLFxuICAgICAgICBtZXRob2Q6ICdHRVQnLFxuICAgICAgICBkYXRhVHlwZTogJ0pTT04nLFxuICAgICAgICBhc3luYzogZmFsc2UsXG4gICAgICAgIGRhdGE6IGRhdGEsXG4gICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgICAgICAgICBpZihkYXRhLnJlc3BvbnNlID09IHRydWUpXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgaWYoZGF0YS5tZXNzYWdlID09ICcwJylcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgJCgnLkF2YWlsYWJsZVN0b2NrJykuaHRtbChcIk5vIGhheSBzdG9jayBkaXNwb25pYmxlXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgJCgnI0FkZFRvQ2FydEZvcm1CdG4nKS5wcm9wKCdkaXNhYmxlZCcsIHRydWUpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgJCgnLkF2YWlsYWJsZVN0b2NrJykuaHRtbChcIlN0b2NrIGRpc3BvbmlibGU6IFwiICsgZGF0YS5tZXNzYWdlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICQoJyNBZGRUb0NhcnRGb3JtQnRuJykucHJvcCgnZGlzYWJsZWQnLCBmYWxzZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBhbGxvd1N1Ym1pdCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIkVudHJvIGVuIFNVQ0NFU1NcIik7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAkKCcjTWF4UXVhbnRpdHknKS5wcm9wKFwibWF4XCIsIGRhdGEubWVzc2FnZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgJCgnI0Vycm9yJykuaHRtbChkYXRhLnJlc3BvbnNlVGV4dCk7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJFbnRybyBlbiBlcnJvciAxXCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBlcnJvcjogZnVuY3Rpb24gKGRhdGEpIHtcbiAgICAgICAgICAgICQoJyNFcnJvcicpLmh0bWwoZGF0YS5yZXNwb25zZVRleHQpO1xuICAgICAgICAgICAgLy8gbG9jYXRpb24ucmVsb2FkKCk7XG4gICAgICAgICAgICBhbGxvd1N1Ym1pdCA9IGZhbHNlO1xuICAgICAgICAgICAgY29uc29sZS5sb2coZGF0YSk7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIkVudHJvIGVuIGVycm9yIDJcIik7XG4gICAgICAgIH1cbiAgICB9KTtcbiAgICByZXR1cm4gYWxsb3dTdWJtaXQ7XG59XG5cbi8vIFNldCBjYXJ0IGl0ZW1zIEpTT05cbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbndpbmRvdy5zZXRJdGVtc0RhdGEgPSBmdW5jdGlvbiAoKSB7XG4gICAgaXRlbURhdGEgPSBbXTtcblxuICAgICQoJy5JdGVtLURhdGEnKS5lYWNoKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgbGV0IGlkID0gJCh0aGlzKS5kYXRhKCdpZCcpO1xuICAgICAgICBsZXQgcHJpY2UgPSAkKHRoaXMpLmRhdGEoJ3ByaWNlJyk7XG4gICAgICAgIGxldCB2YXJpYW50X2lkID0gJCh0aGlzKS5kYXRhKCd2YXJpYW50Jyk7XG4gICAgICAgIGxldCBxdWFudGl0eSA9ICQodGhpcykudmFsKCk7XG5cbiAgICAgICAgaXRlbSA9IHt9XG4gICAgICAgIGl0ZW1bJ2lkJ10gPSBpZDtcbiAgICAgICAgaXRlbVsndmFyaWFudF9pZCddID0gdmFyaWFudF9pZDtcbiAgICAgICAgaXRlbVsncHJpY2UnXSA9IHByaWNlO1xuICAgICAgICBpdGVtWydxdWFudGl0eSddID0gcXVhbnRpdHk7XG4gICAgICAgIC8vIFVwZGF0ZSBkaXNwbGF5IHRvdGFsIGl0ZW0gcHJpY2VcbiAgICAgICAgdG90YWwgPSBwcmljZSAqIHF1YW50aXR5O1xuICAgICAgICAkKCcuJyArIGlkICsgJy1Ub3RhbEl0ZW1QcmljZScpLmh0bWwodG90YWwpO1xuXG4gICAgICAgIGl0ZW1EYXRhLnB1c2goaXRlbSk7XG4gICAgfSk7XG4gICAgLy8gVXBkYXRlIFRvdGFsXG4gICAgY29uc29sZS5pbmZvKGl0ZW1EYXRhKTtcbiAgICBzdW1BbGxJdGVtcygpO1xuICAgICQoJyNJdGVtcy1EYXRhJykudmFsKGl0ZW1EYXRhKTtcbn1cblxuLy8gQWRkIHByb2R1Y3QgdG8gY2FydFxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxud2luZG93LmFkZFRvQ2FydCA9IGZ1bmN0aW9uIChyb3V0ZSwgZGF0YSkge1xuICAgICQuYWpheCh7XG4gICAgICAgIHVybDogcm91dGUsXG4gICAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgICBkYXRhVHlwZTogJ0pTT04nLFxuICAgICAgICBkYXRhOiBkYXRhLFxuICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAoZGF0YSkge1xuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coZGF0YSk7XG4gICAgICAgICAgICBpZiAoZGF0YS5yZXNwb25zZSA9PSAnc3VjY2VzcycpIHtcbiAgICAgICAgICAgICAgICAkKCcuQXZhaWxhYmxlU3RvY2snKS5odG1sKFwiU3RvY2sgZGlzcG9uaWJsZTogXCIgKyBkYXRhLm5ld1N0b2NrKTtcbiAgICAgICAgICAgICAgICB0b2FzdF9zdWNjZXNzKCdPayEnLCBkYXRhLm1lc3NhZ2UsICdib3R0b21DZW50ZXInLCAnJywgMjUwMCk7XG4gICAgICAgICAgICAgICAgdXBkYXRlVG90YWxzKCk7XG4gICAgICAgICAgICAgICAgc2V0SXRlbXNEYXRhKCk7XG4gICAgICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgIHNldEl0ZW1zRGF0YSgpO1xuICAgICAgICAgICAgICAgICAgICBzdW1BbGxJdGVtcygpO1xuICAgICAgICAgICAgICAgICAgICAvLyBvcGVuQ2hlY2tvdXREZXNrdG9wKCk7XG4gICAgICAgICAgICAgICAgfSwgMTAwKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoZGF0YS5yZXNwb25zZSA9PSAnd2FybmluZycpIHtcbiAgICAgICAgICAgICAgICB0b2FzdF9zdWNjZXNzKCdVcHMhJywgZGF0YS5tZXNzYWdlLCAnYm90dG9tQ2VudGVyJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIGVycm9yOiBmdW5jdGlvbiAoZGF0YSkge1xuICAgICAgICAgICAgJCgnI0Vycm9yJykuaHRtbChkYXRhLnJlc3BvbnNlVGV4dCk7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIkVycm9yIGVuIGFkZHRvQ2FydCgpXCIpO1xuICAgICAgICAgICAgLy8gbG9jYXRpb24ucmVsb2FkKCk7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhkYXRhKTtcbiAgICAgICAgfVxuICAgIH0pO1xufVxuXG4gXG5cbi8vIFJlbW92ZSBwcm9kdWN0IGZyb20gY2FydFxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxud2luZG93LnJlbW92ZUZyb21DYXJ0ID0gZnVuY3Rpb24gKHJvdXRlLCBjYXJ0SXRlbUlkLCB2YXJpYW50SWQsIHF1YW50aXR5LCBkaXYsIGFjdGlvbikge1xuICAgICQuYWpheCh7XG4gICAgICAgIHVybDogcm91dGUsXG4gICAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgICBkYXRhVHlwZTogJ0pTT04nLFxuICAgICAgICBkYXRhOiB7IGNhcnRJdGVtSWQ6IGNhcnRJdGVtSWQsIHZhcmlhbnRJZDogdmFyaWFudElkLCBxdWFudGl0eTogcXVhbnRpdHksIGFjdGlvbjogYWN0aW9uLCBtZXRob2Q6ICdhamF4JyB9LFxuICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAoZGF0YSkge1xuICAgICAgICAgICAgaWYgKGRhdGEucmVzcG9uc2UgPT0gJ2NhcnQtcmVtb3ZlZCcpIHtcbiAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhkYXRhKTtcbiAgICAgICAgICAgICAgICB1cGRhdGVUb3RhbHMoKTtcbiAgICAgICAgICAgICAgICB3aW5kb3cubG9jYXRpb24gPSB3aW5kb3cubG9jYXRpb24uaHJlZi5zcGxpdChcIj9cIilbMF07XG4gICAgICAgICAgICAgICAgc2V0SXRlbXNEYXRhKCk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKGRhdGEucmVzcG9uc2UgPT0gJ3N1Y2Nlc3MnKSB7XG4gICAgICAgICAgICAgICAgJChkaXYpLmhpZGUoMTAwKTtcbiAgICAgICAgICAgICAgICAkKGRpdikucmVtb3ZlKCk7XG4gICAgICAgICAgICAgICAgdXBkYXRlVG90YWxzKCk7XG4gICAgICAgICAgICAgICAgc2V0SXRlbXNEYXRhKCk7XG4gICAgICAgICAgICB9ICAgXG4gICAgICAgIH0sXG4gICAgICAgIGVycm9yOiBmdW5jdGlvbiAoZGF0YSkge1xuICAgICAgICAgICAgLy8kKCcjRXJyb3InKS5odG1sKGRhdGEucmVzcG9uc2VUZXh0KTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiRXJyb3IgZW4gcmVtb3ZlRnJvbUNhcnQoKVwiKTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGRhdGEpO1xuICAgICAgICAgICAgLy8gSWYgYW4gZXJyb3IgcG9wcyB3aGVuIGRlc3Ryb3lpbmcgYW4gaXRlbSwgcmVsb2FkIGFuZCBwcmV2ZW50IGJhZCBtYWdpY1xuICAgICAgICAgICAgbG9jYXRpb24ucmVsb2FkKCk7XG4gICAgICAgIH1cbiAgICB9KTtcbn1cblxuZnVuY3Rpb24gdXBkYXRlVG90YWxzKCkge1xuICAgIC8vIExpdmUgUmVsb2FkaW5nIHN0dWZmXG4gICAgJChcIiNTaWRlQ29udGFpbmVySXRlbXNGaXhlZFwiKS5sb2FkKHdpbmRvdy5sb2NhdGlvbi5ocmVmICsgXCIgI1NpZGVDb250YWluZXJJdGVtc0ZpeGVkXCIpO1xuICAgICQoXCIjU2lkZUNvbnRhaW5lckl0ZW1zRmxvYXRpbmdcIikubG9hZCh3aW5kb3cubG9jYXRpb24uaHJlZiArIFwiICNTaWRlQ29udGFpbmVySXRlbXNGbG9hdGluZ1wiKTtcbiAgICAkKFwiLlRvdGFsQ2FydEl0ZW1zXCIpLmxvYWQod2luZG93LmxvY2F0aW9uLmhyZWYgKyBcIiAuVG90YWxDYXJ0SXRlbXNcIik7XG4gICAgJChcIi5Ub3RhbENhcnRJdGVtc1NpZGViYXJcIikubG9hZCh3aW5kb3cubG9jYXRpb24uaHJlZiArIFwiIC5Ub3RhbENhcnRJdGVtc1NpZGViYXJcIik7XG4gICAgJChcIi5DYXJ0U3ViVG90YWxcIikubG9hZCh3aW5kb3cubG9jYXRpb24uaHJlZiArIFwiIC5DYXJ0U3ViVG90YWxcIik7XG4gICAgJChcIi5BdmFpbGFibGVTdG9ja1wiKS5sb2FkKHdpbmRvdy5sb2NhdGlvbi5ocmVmICsgXCIgLkF2YWlsYWJsZVN0b2NrXCIpO1xufVxuXG4vLyBTdWJtaXQgQ2FydCBGb3JtIHRvIENoZWNrb3V0XG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG53aW5kb3cuc3VibWl0Q2FydFRvQ2hlY2tvdXQgPSBmdW5jdGlvbiAocm91dGUsIHRhcmdldCwgZGF0YSwgYWN0aW9uKSB7XG4gICAgLy9jb25zb2xlLmxvZyhcIlJ1dGE6IFwiICsgcm91dGUgKyBcIiBUYXJnZXQ6IFwiICsgdGFyZ2V0ICsgXCIgRGF0YTogXCIgKyBkYXRhICsgXCJBY3Rpb246IFwiKyBhY3Rpb24pO1xuICAgICQuYWpheCh7XG4gICAgICAgIHVybDogcm91dGUsXG4gICAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgICBkYXRhVHlwZTogJ0pTT04nLFxuICAgICAgICBkYXRhOiB7IGRhdGEsIGFjdGlvbjogYWN0aW9uIH0sXG4gICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhkYXRhKTtcbiAgICAgICAgICAgIGlmIChkYXRhLnJlc3BvbnNlID09ICdzdWNjZXNzJykge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHRhcmdldCk7XG4gICAgICAgICAgICAgICAgaWYgKHRhcmdldCA9PSAncmVsb2FkJykge1xuICAgICAgICAgICAgICAgICAgICAvLyBSZWZyZXNoIHBhZ2UsIGRlbGV0ZSBwYXJhbWV0dGVycyBhbmQgb3BlbiBjaGVja291dCBzaWRlYmFyXG4gICAgICAgICAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbiA9IHdpbmRvdy5sb2NhdGlvbi5ocmVmLnNwbGl0KFwiP1wiKVswXSArIFwiP2NoZWNrb3V0LW9uXCI7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSB0YXJnZXQ7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnRXJyb3IgZW4gc3VibWl0Rm9ybScpO1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGRhdGEpO1xuICAgICAgICAgICAgICAgIHRvYXN0X2Vycm9yKCcnLCBkYXRhLm1lc3NhZ2UsICdib3R0b21DZW50ZXInLCAnJyk7XG4gICAgICAgICAgICAgICAgJCgnLlNpZGVDb250YWluZXJFcnJvcicpLmh0bWwoZGF0YS5tZXNzYWdlKTtcbiAgICAgICAgICAgICAgICAvLyAkKCcjRXJyb3InKS5odG1sKGRhdGEucmVzcG9uc2VUZXh0KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgICQoJyNFcnJvcicpLmh0bWwoZGF0YS5yZXNwb25zZVRleHQpO1xuICAgICAgICB9LFxuICAgICAgICBlcnJvcjogZnVuY3Rpb24gKGRhdGEpIHtcbiAgICAgICAgICAgICQoJyNFcnJvcicpLmh0bWwoZGF0YS5yZXNwb25zZVRleHQpO1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJFcnJvciBlbiBzdWJtaXRGb3JtKClcIik7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhkYXRhKTtcbiAgICAgICAgICAgIC8vIGxvY2F0aW9uLnJlbG9hZCgpO1xuICAgICAgICB9XG4gICAgfSk7XG59XG5cbi8vIFZhbGlkYXRlIGFuZCBzZXQgY291cG9uXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG53aW5kb3cudmFsaWRhdGVBbmRTZXRDb3Vwb24gPSBmdW5jdGlvbiAocm91dGUsIGNvZGUsIGNhcnRpZCkge1xuICAgIGxldCBjb3Vwb25EaXYgPSAkKCcjQ291cG9uRGl2Jyk7XG4gICAgbGV0IGNvdXBvblNldCA9ICQoJyNTZXR0ZWRDb3Vwb24nKTtcbiAgICBjb25zb2xlLmxvZyhjb2RlLCBjYXJ0aWQpO1xuICAgICQuYWpheCh7XG4gICAgICAgIHVybDogcm91dGUsXG4gICAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgICBkYXRhVHlwZTogJ0pTT04nLFxuICAgICAgICBkYXRhOiB7IGNvZGU6IGNvZGUsIGNhcnRpZDogY2FydGlkIH0sXG4gICAgICAgIGJlZm9yZVNlbmQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiQ29tcHJvYmFuZG8gY3Vww7NuLi4uXCIpO1xuICAgICAgICAgICAgJCgnLkNvdXBvbkxvYWRlcicpLnJlbW92ZUNsYXNzKCdIaWRkZW4nKTtcbiAgICAgICAgfSxcbiAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKGRhdGEpIHtcbiAgICAgICAgICAgIGlmIChkYXRhLnJlc3BvbnNlID09IHRydWUpIHtcbiAgICAgICAgICAgICAgICAkKCcjQ291cG9uVmFsaWRhdGlvbk1lc3NhZ2UnKS5odG1sKFwiQ3Vww7NuIGFjZXB0YWRvICFcIik7XG4gICAgICAgICAgICAgICAgY291cG9uRGl2LmhpZGUoMjAwLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvdXBvblNldC5yZW1vdmVDbGFzcygnSGlkZGVuJyk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgbG9jYXRpb24ucmVsb2FkKCk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKGRhdGEucmVzcG9uc2UgPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICQoJyNDb3Vwb25WYWxpZGF0aW9uTWVzc2FnZScpLmh0bWwoZGF0YS5tZXNzYWdlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgZXJyb3I6IGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgICAgICAgICAkKCcjQ291cG9uVmFsaWRhdGlvbk1lc3NhZ2UnKS5odG1sKGRhdGEucmVzcG9uc2VUZXh0KTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGRhdGEpO1xuICAgICAgICB9LFxuICAgICAgICBjb21wbGV0ZTogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgJCgnLkNvdXBvbkxvYWRlcicpLmFkZENsYXNzKCdIaWRkZW4nKTtcbiAgICAgICAgfVxuICAgIH0pO1xufVxuXG4vLyBGYXZzXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG53aW5kb3cuYWRkQXJ0aWNsZVRvRmF2cyA9IGZ1bmN0aW9uIChyb3V0ZSwgZmF2aWQsIGFydGljbGVpZCwgYWN0aW9uLCBkaXNwbGF5QnV0dG9uKSB7XG4gICAgJC5hamF4KHtcbiAgICAgICAgdXJsOiByb3V0ZSxcbiAgICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICAgIGRhdGFUeXBlOiAnSlNPTicsXG4gICAgICAgIGRhdGE6IHsgZmF2X2lkOiBmYXZpZCwgYXJ0aWNsZV9pZDogYXJ0aWNsZWlkIH0sXG4gICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgICAgICAgICBpZiAoZGF0YS5yZXNwb25zZSA9PSB0cnVlICYmIGRhdGEucmVzdWx0ID09ICdhZGRlZCcpIHtcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKGFjdGlvbikge1xuICAgICAgICAgICAgICAgICAgICBjYXNlICdyZWxvYWQnOlxuICAgICAgICAgICAgICAgICAgICAgICAgbG9jYXRpb24ucmVsb2FkKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAnc2hvdyc6XG4gICAgICAgICAgICAgICAgICAgICAgICBkaXNwbGF5QnV0dG9uLnJlbW92ZUNsYXNzKCdmYXYtaWNvbi1ub2ZhdicpO1xuICAgICAgICAgICAgICAgICAgICAgICAgZGlzcGxheUJ1dHRvbi5hZGRDbGFzcygnZmF2LWljb24taXNmYXYnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRvYXN0X3N1Y2Nlc3MoJ09rIScsICdQcm9kdWN0byBhZ3JlZ2FkbyBhIGZhdm9yaXRvcycsICdib3R0b21DZW50ZXInLCAnJywgMTAwMCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAnbm9uZSc6XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnQWN0dWFsaXphZG8gLSBTaW4gQWNjacOzbicpO1xuICAgICAgICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ05vIGhheSBhY2Npw7NuJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2UgaWYgKGRhdGEucmVzcG9uc2UgPT0gdHJ1ZSAmJiBkYXRhLnJlc3VsdCA9PSAncmVtb3ZlZCcpIHtcbiAgICAgICAgICAgICAgICBkaXNwbGF5QnV0dG9uLmFkZENsYXNzKCdmYXYtaWNvbi1ub2ZhdicpO1xuICAgICAgICAgICAgICAgIGRpc3BsYXlCdXR0b24ucmVtb3ZlQ2xhc3MoJ2Zhdi1pY29uLWlzZmF2Jyk7XG4gICAgICAgICAgICAgICAgdG9hc3Rfc3VjY2VzcygnT2shJywgJ1Byb2R1Y3RvIGVsaW1pbmFkbyBkZSBmYXZvcml0b3MnLCAnYm90dG9tQ2VudGVyJywgJycsIDEwMDApO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgc2V0RmF2c1RvdGFsSWNvbihkYXRhLmZhdnNDb3VudCk7XG4gICAgICAgIH0sXG4gICAgICAgIGVycm9yOiBmdW5jdGlvbiAoZGF0YSkge1xuICAgICAgICAgICAgJCgnI0Vycm9yJykuaHRtbChkYXRhLnJlc3BvbnNlVGV4dCk7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhkYXRhKTtcbiAgICAgICAgfVxuICAgIH0pO1xufVxuXG5mdW5jdGlvbiBzZXRGYXZzVG90YWxJY29uKGZhdnMpIHtcbiAgICBpZiAoZmF2cyA+IDApIHtcbiAgICAgICAgJCgnLkZhdk1haW5JY29uJykucmVtb3ZlQ2xhc3MoJ2ZhcicpO1xuICAgICAgICAkKCcuRmF2TWFpbkljb24nKS5hZGRDbGFzcygnZmEnKTtcbiAgICB9IGVsc2UgaWYgKGZhdnMgPT0gMCkge1xuICAgICAgICAkKCcuRmF2TWFpbkljb24nKS5yZW1vdmVDbGFzcygnZmEnKTtcbiAgICAgICAgJCgnLkZhdk1haW5JY29uJykuYWRkQ2xhc3MoJ2ZhcicpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgICQoJy5GYXZNYWluSWNvbicpLnJlbW92ZUNsYXNzKCdmYScpO1xuICAgICAgICAkKCcuRmF2TWFpbkljb24nKS5yZW1vdmVDbGFzcygnZmFyJyk7XG4gICAgICAgICQoJy5GYXZNYWluSWNvbicpLmFkZENsYXNzKCdmYScpO1xuICAgICAgICBjb25zb2xlLmxvZyhcIkVycm9yIGVuIHNldEZhdnNUb3RhbEljb24oKVwiKTtcbiAgICB9XG59XG5cbndpbmRvdy5yZW1vdmVBcnRpY2xlRnJvbUZhdnMgPSBmdW5jdGlvbiAocm91dGUsIGZhdmlkLCBhY3Rpb24pIHtcbiAgICB2YXIgZG9hY3Rpb24gPSBhY3Rpb247XG4gICAgJC5hamF4KHtcbiAgICAgICAgdXJsOiByb3V0ZSxcbiAgICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICAgIGRhdGFUeXBlOiAnSlNPTicsXG4gICAgICAgIGRhdGE6IHsgZmF2X2lkOiBmYXZpZCB9LFxuICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAoZGF0YSkge1xuICAgICAgICAgICAgJCgnI0Vycm9yJykuaHRtbChkYXRhLnJlc3BvbnNlVGV4dCk7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhkYXRhKTtcbiAgICAgICAgICAgIGlmIChkYXRhLnJlc3BvbnNlID09IHRydWUpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhkb2FjdGlvbik7XG4gICAgICAgICAgICAgICAgc3dpdGNoIChkb2FjdGlvbikge1xuICAgICAgICAgICAgICAgICAgICBjYXNlICdyZWxvYWQnOlxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGFjdGlvbiA9ICdyZWxvYWQnO1xuICAgICAgICAgICAgICAgICAgICAgICAgdG9hc3Rfc3VjY2VzcygnT2shJywgJ1Byb2R1Y3RvIGVsaW1pbmFkbyBkZSBmYXZvcml0b3MnLCAnYm90dG9tQ2VudGVyJywgYWN0aW9uLCAxMDAwKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ05vIGhheSBhY2Npw7NuJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIC8vJCgnI0Vycm9yJykuaHRtbChkYXRhLm1lc3NhZ2VbJ2Vycm9ySW5mbyddKTtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhkYXRhKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgZXJyb3I6IGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgICAgICAgICAvLyQoJyNFcnJvcicpLmh0bWwoZGF0YS5yZXNwb25zZVRleHQpO1xuICAgICAgICAgICAgY29uc29sZS5sb2coZGF0YSk7XG4gICAgICAgIH1cbiAgICB9KTtcbn1cblxuXG53aW5kb3cucmVtb3ZlQWxsQXJ0aWNsZXNGcm9tRmF2cyA9IGZ1bmN0aW9uIChyb3V0ZSwgY3VzdG9tZXJpZCwgYWN0aW9uKSB7XG4gICAgJC5hamF4KHtcbiAgICAgICAgdXJsOiByb3V0ZSxcbiAgICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICAgIGRhdGFUeXBlOiAnSlNPTicsXG4gICAgICAgIGRhdGE6IHsgY3VzdG9tZXJfaWQ6IGN1c3RvbWVyaWQgfSxcbiAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKGRhdGEpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGRhdGEpO1xuICAgICAgICAgICAgLy8kKCcjRXJyb3InKS5odG1sKGRhdGEucmVzcG9uc2VUZXh0KTtcbiAgICAgICAgICAgIGlmIChkYXRhLnJlc3BvbnNlID09IHRydWUpIHtcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKGFjdGlvbikge1xuICAgICAgICAgICAgICAgICAgICBjYXNlICdyZWxvYWQnOlxuICAgICAgICAgICAgICAgICAgICAgICAgbG9jYXRpb24ucmVsb2FkKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdObyBoYXkgYWNjacOzbicpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAkKCcjRXJyb3InKS5odG1sKGRhdGEubWVzc2FnZVsnZXJyb3JJbmZvJ10pO1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGRhdGEpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBlcnJvcjogZnVuY3Rpb24gKGRhdGEpIHtcbiAgICAgICAgICAgIC8vJCgnI0Vycm9yJykuaHRtbChkYXRhLnJlc3BvbnNlVGV4dCk7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhkYXRhKTtcbiAgICAgICAgfVxuICAgIH0pO1xufVxuXG4vKlxufC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG58IExPR0lOIEFORCBSRUdJU1RFUlxufC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4qL1xuXG4kKCcjUmVzZWxsZXJCb3gnKS5oaWRlKCk7XG5cbndpbmRvdy5vcGVuUmVzZWxsZXJSZWdpc3RyYXRpb24gPSBmdW5jdGlvbigpXG57XG4gICAgJCgnI0lzUmVzZWxsZXJDaGVja2JveCcpLnByb3AoJ2NoZWNrZWQnLCB0cnVlKTtcbiAgICAkKCcuSWZSZXNlbGxlckVuYWJsZScpLnByb3AoJ2Rpc2FibGVkJywgZmFsc2UpO1xuICAgICQoJyNSZXNlbGxlckJveCcpLnNob3coMTAwKTtcbiAgICAkKCcjUmVzZWxsZXJDVEEnKS5oaWRlKDApO1xuICAgICQoJy5Ob3JtYUNsaWVudFRpdGxlJykuaGlkZSgwKTtcbiAgICAkKCcuUmVzZWxsZXJUaXRsZScpLnNob3coMCk7XG59XG5cblxud2luZG93LmNsb3NlUmVzZWxsZXJSZWdpc3RyYXRpb24gPSBmdW5jdGlvbigpXG57XG4gICAgJCgnI0lzUmVzZWxsZXJDaGVja2JveCcpLnByb3AoJ2NoZWNrZWQnLCBmYWxzZSk7XG4gICAgJCgnLklmUmVzZWxsZXJFbmFibGUnKS5wcm9wKCdkaXNhYmxlZCcsIHRydWUpO1xuICAgICQoJyNSZXNlbGxlckJveCcpLmhpZGUoMCk7XG4gICAgJCgnI1Jlc2VsbGVyQ1RBJykuc2hvdygxMDApO1xuICAgICQoJy5Ob3JtYUNsaWVudFRpdGxlJykuc2hvdygwKTtcbiAgICAkKCcuUmVzZWxsZXJUaXRsZScpLmhpZGUoMCk7XG59XG5cbiQoZG9jdW1lbnQpLnJlYWR5KGZ1bmN0aW9uKCl7XG4gICAgJCgnLkdlb1Byb3ZTZWxlY3QnKS5vbignY2hhbmdlJywgZnVuY3Rpb24oKXtcbiAgICAgICAgbGV0IHByb3ZfaWQgPSAkKHRoaXMpLnZhbCgpO1xuICAgICAgICBnZXRHZW9Mb2NzKHByb3ZfaWQpO1xuICAgIH0pO1xufSk7XG5cblxuLypcbnwtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxufCBNSVggRlVOQ1RJT05TXG58LS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiovXG5cbndpbmRvdy5jbG9zZUVsZW1lbnQgPSBmdW5jdGlvbihzZWxlY3RvcilcbntcbiAgICAkKHNlbGVjdG9yKS5oaWRlKDEwMCk7XG59XG5cbndpbmRvdy5nZXRQYXJhbSA9IGZ1bmN0aW9uKHBhcmFtZXRlck5hbWUpIHtcbiAgICB2YXIgcmVzdWx0ID0gbnVsbCxcbiAgICAgICAgdG1wID0gW107XG4gICAgbG9jYXRpb24uc2VhcmNoXG4gICAgICAgIC5zdWJzdHIoMSlcbiAgICAgICAgLnNwbGl0KFwiJlwiKVxuICAgICAgICAuZm9yRWFjaChmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgICB0bXAgPSBpdGVtLnNwbGl0KFwiPVwiKTtcbiAgICAgICAgaWYgKHRtcFswXSA9PT0gcGFyYW1ldGVyTmFtZSkgcmVzdWx0ID0gZGVjb2RlVVJJQ29tcG9uZW50KHRtcFsxXSk7XG4gICAgICAgIH0pO1xuICAgIHJldHVybiByZXN1bHQ7XG59XG5cblxud2luZG93LmdldFBhcmFtcyA9IGZ1bmN0aW9uKHVybCkge1xuICAgIHZhciBwYXJhbXMgPSB7fTtcblx0dmFyIHBhcnNlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2EnKTtcblx0cGFyc2VyLmhyZWYgPSB1cmw7XG5cdHZhciBxdWVyeSA9IHBhcnNlci5zZWFyY2guc3Vic3RyaW5nKDEpO1xuXHR2YXIgdmFycyA9IHF1ZXJ5LnNwbGl0KCcmJyk7XG5cdGZvciAodmFyIGkgPSAwOyBpIDwgdmFycy5sZW5ndGg7IGkrKykge1xuXHRcdHZhciBwYWlyID0gdmFyc1tpXS5zcGxpdCgnPScpO1xuXHRcdHBhcmFtc1twYWlyWzBdXSA9IGRlY29kZVVSSUNvbXBvbmVudChwYWlyWzFdKTtcblx0fVxuXHRyZXR1cm4gcGFyYW1zO1xufVxuXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9yZXNvdXJjZXMvYXNzZXRzL2pzL3N0b3JlL3NjcmlwdHMuanMiXSwic291cmNlUm9vdCI6IiJ9