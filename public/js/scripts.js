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

//
// |--------------------------------------------------------------------------
// | Navigation
// |--------------------------------------------------------------------------
//
$('#navfull-top-btn, #navfull-bottom-btn').click(function () {
    toggleNav();
});

window.toggleNav = function () {
    var nav = $('.MobileNavigation');
    var body = $('body');
    var trigger = $('#navfull-top-btn');
    var bottomTrigger = $('#navfull-bottom-btn');
    var contentText = $('.content-effect');

    if (nav.hasClass('navfull-active')) {
        nav.removeClass('navfull-active');
        trigger.removeClass('navfull-top-active');
        bottomTrigger.removeClass('navfull-bottom-active');
        body.css('overflow', 'auto');
        contentText.hide();
    } else {
        nav.addClass('navfull-active');
        trigger.addClass('navfull-top-active');
        bottomTrigger.addClass('navfull-bottom-active');
        body.css('overflow', 'hidden');
        contentText.fadeIn(500);
    }
};

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

// Store Filters
// -------------------------------------------

window.collapseFilter = function (elem) {
    var filter = elem.siblings('ul');
    if (filter.hasClass('collapsed')) {
        filter.removeClass('collapsed');
        filter.show(100);
        elem.html('-');
    } else {
        filter.addClass('collapsed');
        filter.hide(100);
        elem.html('+');
    }
};

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
    var submitButton = $('#AddToCartFormBtn');
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
                    submitButton.prop('disabled', true);
                } else {
                    // console.log(data);
                    $('.AvailableStock').html("Stock disponible: " + data.message);
                    submitButton.prop('disabled', false);
                    allowSubmit = true;
                    // console.log("Entro en SUCCESS");
                }
                $('#MaxQuantity').prop("max", data.message);
            } else {
                // console.log(data);
                // $('#Error').html(data.responseText);
                $('.AvailableStock').html(data.message);
                submitButton.prop('disabled', true);
            }
        },
        error: function error(data) {
            $('#Error').html(data.responseText);
            location.reload();
            allowSubmit = false;
            submitButton.prop('disabled', true);
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
    // console.info(itemData);
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
                // console.log(data);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgYjEwYTNkYTQ2MzRmNzgyZDZhYTQiLCJ3ZWJwYWNrOi8vLy4vcmVzb3VyY2VzL2Fzc2V0cy9qcy9zdG9yZS9zY3JpcHRzLmpzIl0sIm5hbWVzIjpbIiQiLCJjbGljayIsInRvZ2dsZU5hdiIsIndpbmRvdyIsIm5hdiIsImJvZHkiLCJ0cmlnZ2VyIiwiYm90dG9tVHJpZ2dlciIsImNvbnRlbnRUZXh0IiwiaGFzQ2xhc3MiLCJyZW1vdmVDbGFzcyIsImNzcyIsImhpZGUiLCJhZGRDbGFzcyIsImZhZGVJbiIsIm9uIiwia2V5cHJlc3MiLCJlIiwiY29uc29sZSIsImxvZyIsIndoaWNoIiwicHJldmVudERlZmF1bHQiLCJjb2xsYXBzZUZpbHRlciIsImVsZW0iLCJmaWx0ZXIiLCJzaWJsaW5ncyIsInNob3ciLCJodG1sIiwidmFsdWUiLCJ2YWwiLCJxdWFudGl0eSIsIm5ld1ZhbHVlIiwibmV3UHJpY2VUYXJnZXQiLCJwYXJlbnQiLCJtb2RpZnlDYXJ0SXRlbVEiLCJjaGVja291dFNpZGViYXIiLCJzdGF0ZSIsInNpZGViYXIiLCJ3cmFwcGVyIiwidW5kZWZpbmVkIiwib3BlbkNoZWNrb3V0RGVza3RvcCIsIndpZHRoIiwib3BlbkZpbHRlcnMiLCJmaWx0ZXJzIiwic3VtQWxsSXRlbXMiLCJzdW0iLCJlYWNoIiwiaW5kZXgiLCJwYXJzZUludCIsInN1bURpdnMiLCJvcmlnaW5zIiwidGFyZ2V0IiwicGFyc2VGbG9hdCIsInRleHQiLCJjaGVja1ZhcmlhbnRTdG9jayIsImZvcm0iLCJkYXRhIiwic2VyaWFsaXplIiwiYWxsb3dTdWJtaXQiLCJzdWJtaXRCdXR0b24iLCJhamF4IiwidXJsIiwibWV0aG9kIiwiZGF0YVR5cGUiLCJhc3luYyIsInN1Y2Nlc3MiLCJyZXNwb25zZSIsIm1lc3NhZ2UiLCJwcm9wIiwiZXJyb3IiLCJyZXNwb25zZVRleHQiLCJsb2NhdGlvbiIsInJlbG9hZCIsInNldEl0ZW1zRGF0YSIsIml0ZW1EYXRhIiwiaWQiLCJwcmljZSIsInZhcmlhbnRfaWQiLCJpdGVtIiwidG90YWwiLCJwdXNoIiwiYWRkVG9DYXJ0Iiwicm91dGUiLCJuZXdTdG9jayIsInRvYXN0X3N1Y2Nlc3MiLCJ1cGRhdGVUb3RhbHMiLCJzZXRUaW1lb3V0IiwicmVtb3ZlRnJvbUNhcnQiLCJjYXJ0SXRlbUlkIiwidmFyaWFudElkIiwiZGl2IiwiYWN0aW9uIiwiaHJlZiIsInNwbGl0IiwicmVtb3ZlIiwibG9hZCIsInN1Ym1pdENhcnRUb0NoZWNrb3V0IiwidG9hc3RfZXJyb3IiLCJ2YWxpZGF0ZUFuZFNldENvdXBvbiIsImNvZGUiLCJjYXJ0aWQiLCJjb3Vwb25EaXYiLCJjb3Vwb25TZXQiLCJiZWZvcmVTZW5kIiwiY29tcGxldGUiLCJhZGRBcnRpY2xlVG9GYXZzIiwiZmF2aWQiLCJhcnRpY2xlaWQiLCJkaXNwbGF5QnV0dG9uIiwiZmF2X2lkIiwiYXJ0aWNsZV9pZCIsInJlc3VsdCIsInNldEZhdnNUb3RhbEljb24iLCJmYXZzQ291bnQiLCJmYXZzIiwicmVtb3ZlQXJ0aWNsZUZyb21GYXZzIiwiZG9hY3Rpb24iLCJyZW1vdmVBbGxBcnRpY2xlc0Zyb21GYXZzIiwiY3VzdG9tZXJpZCIsImN1c3RvbWVyX2lkIiwib3BlblJlc2VsbGVyUmVnaXN0cmF0aW9uIiwiY2xvc2VSZXNlbGxlclJlZ2lzdHJhdGlvbiIsImRvY3VtZW50IiwicmVhZHkiLCJwcm92X2lkIiwiZ2V0R2VvTG9jcyIsImNsb3NlRWxlbWVudCIsInNlbGVjdG9yIiwiZ2V0UGFyYW0iLCJwYXJhbWV0ZXJOYW1lIiwidG1wIiwic2VhcmNoIiwic3Vic3RyIiwiZm9yRWFjaCIsImRlY29kZVVSSUNvbXBvbmVudCIsImdldFBhcmFtcyIsInBhcmFtcyIsInBhcnNlciIsImNyZWF0ZUVsZW1lbnQiLCJxdWVyeSIsInN1YnN0cmluZyIsInZhcnMiLCJpIiwibGVuZ3RoIiwicGFpciJdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtB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VjtBQUVBM0QsYUFBUzRELE1BQVQsQ0FDS0MsTUFETCxDQUNZLENBRFosRUFFS3ZDLEtBRkwsQ0FFVyxHQUZYLEVBR0t3QyxPQUhMLENBR2EsVUFBVXZELElBQVYsRUFBZ0I7QUFDekJvRCxjQUFNcEQsS0FBS2UsS0FBTCxDQUFXLEdBQVgsQ0FBTjtBQUNBLFlBQUlxQyxJQUFJLENBQUosTUFBV0QsYUFBZixFQUE4QmxCLFNBQVN1QixtQkFBbUJKLElBQUksQ0FBSixDQUFuQixDQUFUO0FBQzdCLEtBTkw7QUFPQSxXQUFPbkIsTUFBUDtBQUNILENBWEQ7O0FBYUE1RyxPQUFPb0ksU0FBUCxHQUFtQixVQUFTMUUsR0FBVCxFQUFjO0FBQzdCLFFBQUkyRSxTQUFTLEVBQWI7QUFDSCxRQUFJQyxTQUFTZixTQUFTZ0IsYUFBVCxDQUF1QixHQUF2QixDQUFiO0FBQ0FELFdBQU83QyxJQUFQLEdBQWMvQixHQUFkO0FBQ0EsUUFBSThFLFFBQVFGLE9BQU9OLE1BQVAsQ0FBY1MsU0FBZCxDQUF3QixDQUF4QixDQUFaO0FBQ0EsUUFBSUMsT0FBT0YsTUFBTTlDLEtBQU4sQ0FBWSxHQUFaLENBQVg7QUFDQSxTQUFLLElBQUlpRCxJQUFJLENBQWIsRUFBZ0JBLElBQUlELEtBQUtFLE1BQXpCLEVBQWlDRCxHQUFqQyxFQUFzQztBQUNyQyxZQUFJRSxPQUFPSCxLQUFLQyxDQUFMLEVBQVFqRCxLQUFSLENBQWMsR0FBZCxDQUFYO0FBQ0EyQyxlQUFPUSxLQUFLLENBQUwsQ0FBUCxJQUFrQlYsbUJBQW1CVSxLQUFLLENBQUwsQ0FBbkIsQ0FBbEI7QUFDQTtBQUNELFdBQU9SLE1BQVA7QUFDQSxDQVhELEMiLCJmaWxlIjoiL2pzL3NjcmlwdHMuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHtcbiBcdFx0XHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0Z2V0OiBnZXR0ZXJcbiBcdFx0XHR9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCIvXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gNzIpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svYm9vdHN0cmFwIGIxMGEzZGE0NjM0Zjc4MmQ2YWE0IiwiLy9cclxuLy8gfC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbi8vIHwgTmF2aWdhdGlvblxyXG4vLyB8LS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuLy9cclxuJCgnI25hdmZ1bGwtdG9wLWJ0biwgI25hdmZ1bGwtYm90dG9tLWJ0bicpLmNsaWNrKGZ1bmN0aW9uKCkge1xyXG4gICAgdG9nZ2xlTmF2KCk7XHJcbn0pO1xyXG5cclxud2luZG93LnRvZ2dsZU5hdiA9IGZ1bmN0aW9uKClcclxue1xyXG4gICAgY29uc3QgbmF2ID0gJCgnLk1vYmlsZU5hdmlnYXRpb24nKTtcclxuICAgIGNvbnN0IGJvZHkgPSAkKCdib2R5Jyk7XHJcbiAgICBjb25zdCB0cmlnZ2VyID0gJCgnI25hdmZ1bGwtdG9wLWJ0bicpO1xyXG4gICAgY29uc3QgYm90dG9tVHJpZ2dlciA9ICQoJyNuYXZmdWxsLWJvdHRvbS1idG4nKTtcclxuICAgIGNvbnN0IGNvbnRlbnRUZXh0ID0gJCgnLmNvbnRlbnQtZWZmZWN0Jyk7XHJcblxyXG4gICAgaWYobmF2Lmhhc0NsYXNzKCduYXZmdWxsLWFjdGl2ZScpKVxyXG4gICAge1xyXG4gICAgICAgIG5hdi5yZW1vdmVDbGFzcygnbmF2ZnVsbC1hY3RpdmUnKTtcclxuICAgICAgICB0cmlnZ2VyLnJlbW92ZUNsYXNzKCduYXZmdWxsLXRvcC1hY3RpdmUnKTtcclxuICAgICAgICBib3R0b21UcmlnZ2VyLnJlbW92ZUNsYXNzKCduYXZmdWxsLWJvdHRvbS1hY3RpdmUnKTtcclxuICAgICAgICBib2R5LmNzcygnb3ZlcmZsb3cnLCdhdXRvJyk7XHJcbiAgICAgICAgY29udGVudFRleHQuaGlkZSgpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICBuYXYuYWRkQ2xhc3MoJ25hdmZ1bGwtYWN0aXZlJyk7XHJcbiAgICAgICAgdHJpZ2dlci5hZGRDbGFzcygnbmF2ZnVsbC10b3AtYWN0aXZlJyk7XHJcbiAgICAgICAgYm90dG9tVHJpZ2dlci5hZGRDbGFzcygnbmF2ZnVsbC1ib3R0b20tYWN0aXZlJyk7XHJcbiAgICAgICAgYm9keS5jc3MoJ292ZXJmbG93JywnaGlkZGVuJyk7XHJcbiAgICAgICAgY29udGVudFRleHQuZmFkZUluKDUwMCk7XHJcbiAgICB9XHJcbn1cclxuXHJcblxyXG4vLyBMb2FkZXJzXHJcbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuJChcIi5sb2FkZXItb24tY2hhbmdlXCIpLm9uKCdjaGFuZ2UnLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAkKCcjZnVsbC1sb2FkZXInKS5yZW1vdmVDbGFzcygnSGlkZGVuJyk7XHJcbiAgICByZXR1cm4gdHJ1ZTtcclxufSk7XHJcblxyXG4kKFwiLmxvYWRlci1vbi1zdWJtaXRcIikub24oJ3N1Ym1pdCcsIGZ1bmN0aW9uICgpIHtcclxuICAgICQoJyNmdWxsLWxvYWRlcicpLnJlbW92ZUNsYXNzKCdIaWRkZW4nKTtcclxuICAgIHJldHVybiB0cnVlO1xyXG59KTtcclxuXHJcbiQoJy5kb250LXN1Ym1pdC1vbi1lbnRlciwgLmRzb24nKS5rZXlwcmVzcyhmdW5jdGlvbiAoZSkge1xyXG4gICAgY29uc29sZS5sb2coXCJFTlRFUlwiKTtcclxuICAgIGlmIChlLndoaWNoID09IDEzKSByZXR1cm4gZmFsc2U7XHJcbiAgICBpZiAoZS53aGljaCA9PSAxMykgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG59KTtcclxuXHJcbi8vIFN0b3JlIEZpbHRlcnNcclxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG5cclxud2luZG93LmNvbGxhcHNlRmlsdGVyID0gZnVuY3Rpb24oZWxlbSkge1xyXG4gICAgY29uc3QgZmlsdGVyID0gZWxlbS5zaWJsaW5ncygndWwnKTtcclxuICAgIGlmKGZpbHRlci5oYXNDbGFzcygnY29sbGFwc2VkJykpXHJcbiAgICB7XHJcbiAgICAgICAgZmlsdGVyLnJlbW92ZUNsYXNzKCdjb2xsYXBzZWQnKTtcclxuICAgICAgICBmaWx0ZXIuc2hvdygxMDApO1xyXG4gICAgICAgIGVsZW0uaHRtbCgnLScpO1xyXG4gICAgfVxyXG4gICAgZWxzZVxyXG4gICAge1xyXG4gICAgICAgIGZpbHRlci5hZGRDbGFzcygnY29sbGFwc2VkJyk7XHJcbiAgICAgICAgZmlsdGVyLmhpZGUoMTAwKTtcclxuICAgICAgICBlbGVtLmh0bWwoJysnKTtcclxuICAgIH1cclxufVxyXG5cclxuXHJcbi8vIE1vZGlmeSBjYXJ0IGl0ZW0gcXVhbnRpdHkgXHJcbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuJCgnLklucHV0QnRuUScpLm9uKCdjaGFuZ2Uga2V5dXAnLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAvLyAgT3JpZ2luYWwgQXJ0aWNsZSBQcmljZVxyXG4gICAgbGV0IHZhbHVlID0gJCh0aGlzKS5zaWJsaW5ncygnLkFydGljbGVQcmljZScpLnZhbCgpO1xyXG4gICAgLy8gUXVhbnRpdHlcclxuICAgIGxldCBxdWFudGl0eSA9ICQodGhpcykudmFsKCk7XHJcbiAgICAvLyBOZXIgVmFsdWVcclxuICAgIGxldCBuZXdWYWx1ZSA9ICh2YWx1ZSAqIHF1YW50aXR5KTtcclxuICAgIC8vIE5ldyBQcmljZSBUYXJnZXRcclxuICAgIGxldCBuZXdQcmljZVRhcmdldCA9ICQodGhpcykucGFyZW50KCkucGFyZW50KCkucGFyZW50KCkuc2libGluZ3MoJy5Ub3RhbEl0ZW1QcmljZScpO1xyXG5cclxuICAgIGNvbnNvbGUubG9nKHZhbHVlLCBxdWFudGl0eSwgbmV3VmFsdWUpO1xyXG4gICAgbW9kaWZ5Q2FydEl0ZW1RKCQodGhpcyksIG5ld1ByaWNlVGFyZ2V0LCBuZXdWYWx1ZSk7XHJcbn0pXHJcblxyXG5mdW5jdGlvbiBtb2RpZnlDYXJ0SXRlbVEoZSwgbmV3UHJpY2VUYXJnZXQsIG5ld1ZhbHVlKSB7XHJcbiAgICBlLnNpYmxpbmdzKCcuSW5wdXRCdG5RJykucmVtb3ZlQ2xhc3MoJ0hpZGRlbicpO1xyXG4gICAgbmV3UHJpY2VUYXJnZXQuaHRtbCgnJCAnICsgbmV3VmFsdWUpO1xyXG59XHJcblxyXG5cclxuJCgnI01haW5PdmVybGF5JykuY2xpY2soZnVuY3Rpb24oKXtcclxuICAgIGNoZWNrb3V0U2lkZWJhcignaGlkZScpO1xyXG59KVxyXG4vLyBDaGVja291dCBzaWRlYmFyXHJcbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cdFx0XHJcbndpbmRvdy5jaGVja291dFNpZGViYXIgPSBmdW5jdGlvbiAoc3RhdGUpIHtcclxuXHJcbiAgICBjb25zdCBzaWRlYmFyID0gJCgnLkNoZWNrb3V0Q2FydCcpO1xyXG4gICAgY29uc3Qgd3JhcHBlciA9ICQoJy5tYWluLXdyYXBwZXInKTtcclxuXHJcbiAgICBjb25zdCBzaG93ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHNpZGViYXIuYWRkQ2xhc3MoJ2FjdGl2ZScpO1xyXG4gICAgICAgIHdyYXBwZXIuYWRkQ2xhc3MoJ2FsbG93LXNpZGViYXInKTtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBoaWRlID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHNpZGViYXIucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xyXG4gICAgICAgIHdyYXBwZXIucmVtb3ZlQ2xhc3MoJ2FsbG93LXNpZGViYXInKTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgaWYgKHN0YXRlID09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgIGlmIChzaWRlYmFyLmhhc0NsYXNzKCdhY3RpdmUnKSkge1xyXG4gICAgICAgICAgICBoaWRlKCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgc2hvdygpO1xyXG4gICAgICAgIH1cclxuICAgIH0gZWxzZSBpZiAoc3RhdGUgPT0gJ3Nob3cnKSB7XHJcbiAgICAgICAgc2hvdygpO1xyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH0gZWxzZSBpZiAoc3RhdGUgPT0gJ2hpZGUnKSB7XHJcbiAgICAgICAgaGlkZSgpO1xyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxufVxyXG5cclxuXHJcblxyXG53aW5kb3cub3BlbkNoZWNrb3V0RGVza3RvcCA9IGZ1bmN0aW9uKClcclxue1xyXG4gICAgaWYgKCQod2luZG93KS53aWR0aCgpID4gNzY4KSB7XHJcbiAgICAgICAgY2hlY2tvdXRTaWRlYmFyKCdzaG93Jyk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gZmFsc2U7XHJcbn1cclxuXHJcbndpbmRvdy5vcGVuRmlsdGVycyA9IGZ1bmN0aW9uICgpIHtcclxuICAgIGNvbnN0IGZpbHRlcnMgPSAkKCcjU2VhcmNoRmlsdGVycycpO1xyXG4gICAgY29uc3QgdHJpZ2dlciA9ICQoJyNTZWFyY2hGaWx0ZXJzVHJpZ2dlcicpO1xyXG4gICAgaWYoZmlsdGVycy5oYXNDbGFzcygnYWN0aXZlJykpXHJcbiAgICB7XHJcbiAgICAgICAgZmlsdGVycy5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XHJcbiAgICAgICAgdHJpZ2dlci5zaG93KCk7XHJcbiAgICB9XHJcbiAgICBlbHNlXHJcbiAgICB7XHJcbiAgICAgICAgZmlsdGVycy5hZGRDbGFzcygnYWN0aXZlJyk7XHJcbiAgICAgICAgdHJpZ2dlci5oaWRlKCk7XHJcbiAgICB9XHJcblxyXG59XHJcblxyXG5cclxuLypcclxufC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbnwgQ0FSVFxyXG58LS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuKi9cclxuXHJcblxyXG53aW5kb3cuc3VtQWxsSXRlbXMgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICBzdW0gPSAwO1xyXG4gICAgJCgnLlRvdGFsSXRlbVByaWNlJykuZWFjaChmdW5jdGlvbiAoaW5kZXgpIHtcclxuICAgICAgICBzdW0gKz0gcGFyc2VJbnQoJCh0aGlzKS5odG1sKCkpO1xyXG4gICAgfSk7XHJcbiAgICAkKCcuU3ViVG90YWwnKS5odG1sKHN1bSk7XHJcbn1cclxuXHJcblxyXG4vLyBTdW0gZGl2cyB0ZXh0XHJcbndpbmRvdy5zdW1EaXZzID0gZnVuY3Rpb24gKG9yaWdpbnMsIHRhcmdldCkge1xyXG4gICAgbGV0IHN1bSA9IDA7XHJcbiAgICBvcmlnaW5zLmVhY2goZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHN1bSArPSBwYXJzZUZsb2F0KCQodGhpcykudGV4dCgpKTtcclxuICAgIH0pO1xyXG4gICAgdGFyZ2V0LnRleHQoc3VtKTtcclxufVxyXG5cclxuXHJcbi8vIENoZWNrIHByb2R1Y3QgdmFyaWFudCBzdG9ja1xyXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbndpbmRvdy5jaGVja1ZhcmlhbnRTdG9jayA9IGZ1bmN0aW9uKCkge1xyXG4gICAgbGV0IGZvcm0gPSAkKCcjQWRkVG9DYXJ0Rm9ybScpO1xyXG4gICAgbGV0IGRhdGEgPSBmb3JtLnNlcmlhbGl6ZSgpO1xyXG4gICAgbGV0IGFsbG93U3VibWl0ID0gZmFsc2U7XHJcbiAgICBsZXQgc3VibWl0QnV0dG9uID0gICQoJyNBZGRUb0NhcnRGb3JtQnRuJyk7XHJcbiAgICAkLmFqYXgoe1xyXG4gICAgICAgIHVybDogZm9ybS5kYXRhKCdyb3V0ZScpLFxyXG4gICAgICAgIG1ldGhvZDogJ0dFVCcsXHJcbiAgICAgICAgZGF0YVR5cGU6ICdKU09OJyxcclxuICAgICAgICBhc3luYzogZmFsc2UsXHJcbiAgICAgICAgZGF0YTogZGF0YSxcclxuICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAoZGF0YSkge1xyXG4gICAgICAgICAgICBpZihkYXRhLnJlc3BvbnNlID09IHRydWUpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGlmKGRhdGEubWVzc2FnZSA9PSAnMCcpXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAkKCcuQXZhaWxhYmxlU3RvY2snKS5odG1sKFwiTm8gaGF5IHN0b2NrIGRpc3BvbmlibGVcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHN1Ym1pdEJ1dHRvbi5wcm9wKCdkaXNhYmxlZCcsIHRydWUpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhkYXRhKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJCgnLkF2YWlsYWJsZVN0b2NrJykuaHRtbChcIlN0b2NrIGRpc3BvbmlibGU6IFwiICsgZGF0YS5tZXNzYWdlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc3VibWl0QnV0dG9uLnByb3AoJ2Rpc2FibGVkJywgZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBhbGxvd1N1Ym1pdCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKFwiRW50cm8gZW4gU1VDQ0VTU1wiKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAkKCcjTWF4UXVhbnRpdHknKS5wcm9wKFwibWF4XCIsIGRhdGEubWVzc2FnZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhkYXRhKTtcclxuICAgICAgICAgICAgICAgIC8vICQoJyNFcnJvcicpLmh0bWwoZGF0YS5yZXNwb25zZVRleHQpO1xyXG4gICAgICAgICAgICAgICAgJCgnLkF2YWlsYWJsZVN0b2NrJykuaHRtbChkYXRhLm1lc3NhZ2UpO1xyXG4gICAgICAgICAgICAgICAgc3VibWl0QnV0dG9uLnByb3AoJ2Rpc2FibGVkJywgdHJ1ZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG4gICAgICAgIGVycm9yOiBmdW5jdGlvbiAoZGF0YSkge1xyXG4gICAgICAgICAgICAkKCcjRXJyb3InKS5odG1sKGRhdGEucmVzcG9uc2VUZXh0KTtcclxuICAgICAgICAgICAgbG9jYXRpb24ucmVsb2FkKCk7XHJcbiAgICAgICAgICAgIGFsbG93U3VibWl0ID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHN1Ym1pdEJ1dHRvbi5wcm9wKCdkaXNhYmxlZCcsIHRydWUpO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhkYXRhKTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJFbnRybyBlbiBlcnJvciAyXCIpO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG4gICAgcmV0dXJuIGFsbG93U3VibWl0O1xyXG59XHJcblxyXG4vLyBTZXQgY2FydCBpdGVtcyBKU09OXHJcbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxud2luZG93LnNldEl0ZW1zRGF0YSA9IGZ1bmN0aW9uICgpIHtcclxuICAgIGl0ZW1EYXRhID0gW107XHJcblxyXG4gICAgJCgnLkl0ZW0tRGF0YScpLmVhY2goZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGxldCBpZCA9ICQodGhpcykuZGF0YSgnaWQnKTtcclxuICAgICAgICBsZXQgcHJpY2UgPSAkKHRoaXMpLmRhdGEoJ3ByaWNlJyk7XHJcbiAgICAgICAgbGV0IHZhcmlhbnRfaWQgPSAkKHRoaXMpLmRhdGEoJ3ZhcmlhbnQnKTtcclxuICAgICAgICBsZXQgcXVhbnRpdHkgPSAkKHRoaXMpLnZhbCgpO1xyXG5cclxuICAgICAgICBpdGVtID0ge31cclxuICAgICAgICBpdGVtWydpZCddID0gaWQ7XHJcbiAgICAgICAgaXRlbVsndmFyaWFudF9pZCddID0gdmFyaWFudF9pZDtcclxuICAgICAgICBpdGVtWydwcmljZSddID0gcHJpY2U7XHJcbiAgICAgICAgaXRlbVsncXVhbnRpdHknXSA9IHF1YW50aXR5O1xyXG4gICAgICAgIC8vIFVwZGF0ZSBkaXNwbGF5IHRvdGFsIGl0ZW0gcHJpY2VcclxuICAgICAgICB0b3RhbCA9IHByaWNlICogcXVhbnRpdHk7XHJcbiAgICAgICAgJCgnLicgKyBpZCArICctVG90YWxJdGVtUHJpY2UnKS5odG1sKHRvdGFsKTtcclxuXHJcbiAgICAgICAgaXRlbURhdGEucHVzaChpdGVtKTtcclxuICAgIH0pO1xyXG4gICAgLy8gVXBkYXRlIFRvdGFsXHJcbiAgICAvLyBjb25zb2xlLmluZm8oaXRlbURhdGEpO1xyXG4gICAgc3VtQWxsSXRlbXMoKTtcclxuICAgICQoJyNJdGVtcy1EYXRhJykudmFsKGl0ZW1EYXRhKTtcclxufVxyXG5cclxuLy8gQWRkIHByb2R1Y3QgdG8gY2FydFxyXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbndpbmRvdy5hZGRUb0NhcnQgPSBmdW5jdGlvbiAocm91dGUsIGRhdGEpIHtcclxuICAgICQuYWpheCh7XHJcbiAgICAgICAgdXJsOiByb3V0ZSxcclxuICAgICAgICBtZXRob2Q6ICdQT1NUJyxcclxuICAgICAgICBkYXRhVHlwZTogJ0pTT04nLFxyXG4gICAgICAgIGRhdGE6IGRhdGEsXHJcbiAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKGRhdGEpIHtcclxuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coZGF0YSk7XHJcbiAgICAgICAgICAgIGlmIChkYXRhLnJlc3BvbnNlID09ICdzdWNjZXNzJykge1xyXG4gICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coZGF0YSk7XHJcbiAgICAgICAgICAgICAgICAkKCcuQXZhaWxhYmxlU3RvY2snKS5odG1sKFwiU3RvY2sgZGlzcG9uaWJsZTogXCIgKyBkYXRhLm5ld1N0b2NrKTtcclxuICAgICAgICAgICAgICAgIHRvYXN0X3N1Y2Nlc3MoJ09rIScsIGRhdGEubWVzc2FnZSwgJ2JvdHRvbUNlbnRlcicsICcnLCAyNTAwKTtcclxuICAgICAgICAgICAgICAgIHVwZGF0ZVRvdGFscygpO1xyXG4gICAgICAgICAgICAgICAgc2V0SXRlbXNEYXRhKCk7XHJcbiAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICBzZXRJdGVtc0RhdGEoKTtcclxuICAgICAgICAgICAgICAgICAgICBzdW1BbGxJdGVtcygpO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIG9wZW5DaGVja291dERlc2t0b3AoKTtcclxuICAgICAgICAgICAgICAgIH0sIDEwMCk7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoZGF0YS5yZXNwb25zZSA9PSAnd2FybmluZycpIHtcclxuICAgICAgICAgICAgICAgIHRvYXN0X3N1Y2Nlc3MoJ1VwcyEnLCBkYXRhLm1lc3NhZ2UsICdib3R0b21DZW50ZXInKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZXJyb3I6IGZ1bmN0aW9uIChkYXRhKSB7XHJcbiAgICAgICAgICAgICQoJyNFcnJvcicpLmh0bWwoZGF0YS5yZXNwb25zZVRleHQpO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIkVycm9yIGVuIGFkZHRvQ2FydCgpXCIpO1xyXG4gICAgICAgICAgICAvLyBsb2NhdGlvbi5yZWxvYWQoKTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coZGF0YSk7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcbn1cclxuXHJcblxyXG4vLyBSZW1vdmUgcHJvZHVjdCBmcm9tIGNhcnRcclxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG53aW5kb3cucmVtb3ZlRnJvbUNhcnQgPSBmdW5jdGlvbiAocm91dGUsIGNhcnRJdGVtSWQsIHZhcmlhbnRJZCwgcXVhbnRpdHksIGRpdiwgYWN0aW9uKSB7XHJcbiAgICAkLmFqYXgoe1xyXG4gICAgICAgIHVybDogcm91dGUsXHJcbiAgICAgICAgbWV0aG9kOiAnUE9TVCcsXHJcbiAgICAgICAgZGF0YVR5cGU6ICdKU09OJyxcclxuICAgICAgICBkYXRhOiB7IGNhcnRJdGVtSWQ6IGNhcnRJdGVtSWQsIHZhcmlhbnRJZDogdmFyaWFudElkLCBxdWFudGl0eTogcXVhbnRpdHksIGFjdGlvbjogYWN0aW9uLCBtZXRob2Q6ICdhamF4JyB9LFxyXG4gICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChkYXRhKSB7XHJcbiAgICAgICAgICAgIGlmIChkYXRhLnJlc3BvbnNlID09ICdjYXJ0LXJlbW92ZWQnKSB7XHJcbiAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhkYXRhKTtcclxuICAgICAgICAgICAgICAgIHVwZGF0ZVRvdGFscygpO1xyXG4gICAgICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uID0gd2luZG93LmxvY2F0aW9uLmhyZWYuc3BsaXQoXCI/XCIpWzBdO1xyXG4gICAgICAgICAgICAgICAgc2V0SXRlbXNEYXRhKCk7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoZGF0YS5yZXNwb25zZSA9PSAnc3VjY2VzcycpIHtcclxuICAgICAgICAgICAgICAgICQoZGl2KS5oaWRlKDEwMCk7XHJcbiAgICAgICAgICAgICAgICAkKGRpdikucmVtb3ZlKCk7XHJcbiAgICAgICAgICAgICAgICB1cGRhdGVUb3RhbHMoKTtcclxuICAgICAgICAgICAgICAgIHNldEl0ZW1zRGF0YSgpO1xyXG4gICAgICAgICAgICB9ICAgXHJcbiAgICAgICAgfSxcclxuICAgICAgICBlcnJvcjogZnVuY3Rpb24gKGRhdGEpIHtcclxuICAgICAgICAgICAgLy8kKCcjRXJyb3InKS5odG1sKGRhdGEucmVzcG9uc2VUZXh0KTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJFcnJvciBlbiByZW1vdmVGcm9tQ2FydCgpXCIpO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhkYXRhKTtcclxuICAgICAgICAgICAgLy8gSWYgYW4gZXJyb3IgcG9wcyB3aGVuIGRlc3Ryb3lpbmcgYW4gaXRlbSwgcmVsb2FkIGFuZCBwcmV2ZW50IGJhZCBtYWdpY1xyXG4gICAgICAgICAgICBsb2NhdGlvbi5yZWxvYWQoKTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxufVxyXG5cclxuZnVuY3Rpb24gdXBkYXRlVG90YWxzKCkge1xyXG4gICAgLy8gTGl2ZSBSZWxvYWRpbmcgc3R1ZmZcclxuICAgICQoXCIjU2lkZUNvbnRhaW5lckl0ZW1zRml4ZWRcIikubG9hZCh3aW5kb3cubG9jYXRpb24uaHJlZiArIFwiICNTaWRlQ29udGFpbmVySXRlbXNGaXhlZFwiKTtcclxuICAgICQoXCIjU2lkZUNvbnRhaW5lckl0ZW1zRmxvYXRpbmdcIikubG9hZCh3aW5kb3cubG9jYXRpb24uaHJlZiArIFwiICNTaWRlQ29udGFpbmVySXRlbXNGbG9hdGluZ1wiKTtcclxuICAgICQoXCIuVG90YWxDYXJ0SXRlbXNcIikubG9hZCh3aW5kb3cubG9jYXRpb24uaHJlZiArIFwiIC5Ub3RhbENhcnRJdGVtc1wiKTtcclxuICAgICQoXCIuVG90YWxDYXJ0SXRlbXNTaWRlYmFyXCIpLmxvYWQod2luZG93LmxvY2F0aW9uLmhyZWYgKyBcIiAuVG90YWxDYXJ0SXRlbXNTaWRlYmFyXCIpO1xyXG4gICAgJChcIi5DYXJ0U3ViVG90YWxcIikubG9hZCh3aW5kb3cubG9jYXRpb24uaHJlZiArIFwiIC5DYXJ0U3ViVG90YWxcIik7XHJcbiAgICAkKFwiLkF2YWlsYWJsZVN0b2NrXCIpLmxvYWQod2luZG93LmxvY2F0aW9uLmhyZWYgKyBcIiAuQXZhaWxhYmxlU3RvY2tcIik7XHJcbn1cclxuXHJcbi8vIFN1Ym1pdCBDYXJ0IEZvcm0gdG8gQ2hlY2tvdXRcclxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG53aW5kb3cuc3VibWl0Q2FydFRvQ2hlY2tvdXQgPSBmdW5jdGlvbiAocm91dGUsIHRhcmdldCwgZGF0YSwgYWN0aW9uKSB7XHJcbiAgICAvL2NvbnNvbGUubG9nKFwiUnV0YTogXCIgKyByb3V0ZSArIFwiIFRhcmdldDogXCIgKyB0YXJnZXQgKyBcIiBEYXRhOiBcIiArIGRhdGEgKyBcIkFjdGlvbjogXCIrIGFjdGlvbik7XHJcbiAgICAkLmFqYXgoe1xyXG4gICAgICAgIHVybDogcm91dGUsXHJcbiAgICAgICAgbWV0aG9kOiAnUE9TVCcsXHJcbiAgICAgICAgZGF0YVR5cGU6ICdKU09OJyxcclxuICAgICAgICBkYXRhOiB7IGRhdGEsIGFjdGlvbjogYWN0aW9uIH0sXHJcbiAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKGRhdGEpIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coZGF0YSk7XHJcbiAgICAgICAgICAgIGlmIChkYXRhLnJlc3BvbnNlID09ICdzdWNjZXNzJykge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2codGFyZ2V0KTtcclxuICAgICAgICAgICAgICAgIGlmICh0YXJnZXQgPT0gJ3JlbG9hZCcpIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyBSZWZyZXNoIHBhZ2UsIGRlbGV0ZSBwYXJhbWV0dGVycyBhbmQgb3BlbiBjaGVja291dCBzaWRlYmFyXHJcbiAgICAgICAgICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uID0gd2luZG93LmxvY2F0aW9uLmhyZWYuc3BsaXQoXCI/XCIpWzBdICsgXCI/Y2hlY2tvdXQtb25cIjtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSB0YXJnZXQ7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnRXJyb3IgZW4gc3VibWl0Rm9ybScpO1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coZGF0YSk7XHJcbiAgICAgICAgICAgICAgICB0b2FzdF9lcnJvcignJywgZGF0YS5tZXNzYWdlLCAnYm90dG9tQ2VudGVyJywgJycpO1xyXG4gICAgICAgICAgICAgICAgJCgnLlNpZGVDb250YWluZXJFcnJvcicpLmh0bWwoZGF0YS5tZXNzYWdlKTtcclxuICAgICAgICAgICAgICAgIC8vICQoJyNFcnJvcicpLmh0bWwoZGF0YS5yZXNwb25zZVRleHQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vICQoJyNFcnJvcicpLmh0bWwoZGF0YS5yZXNwb25zZVRleHQpO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZXJyb3I6IGZ1bmN0aW9uIChkYXRhKSB7XHJcbiAgICAgICAgICAgIC8vICQoJyNFcnJvcicpLmh0bWwoZGF0YS5yZXNwb25zZVRleHQpO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIkVycm9yIGVuIHN1Ym1pdEZvcm0oKVwiKTtcclxuICAgICAgICAgICAgbG9jYXRpb24ucmVsb2FkKCk7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGRhdGEpO1xyXG4gICAgICAgICAgICAvLyBsb2NhdGlvbi5yZWxvYWQoKTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxufVxyXG5cclxuLy8gVmFsaWRhdGUgYW5kIHNldCBjb3Vwb25cclxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG53aW5kb3cudmFsaWRhdGVBbmRTZXRDb3Vwb24gPSBmdW5jdGlvbiAocm91dGUsIGNvZGUsIGNhcnRpZCkge1xyXG4gICAgbGV0IGNvdXBvbkRpdiA9ICQoJyNDb3Vwb25EaXYnKTtcclxuICAgIGxldCBjb3Vwb25TZXQgPSAkKCcjU2V0dGVkQ291cG9uJyk7XHJcbiAgICBjb25zb2xlLmxvZyhjb2RlLCBjYXJ0aWQpO1xyXG4gICAgJC5hamF4KHtcclxuICAgICAgICB1cmw6IHJvdXRlLFxyXG4gICAgICAgIG1ldGhvZDogJ1BPU1QnLFxyXG4gICAgICAgIGRhdGFUeXBlOiAnSlNPTicsXHJcbiAgICAgICAgZGF0YTogeyBjb2RlOiBjb2RlLCBjYXJ0aWQ6IGNhcnRpZCB9LFxyXG4gICAgICAgIGJlZm9yZVNlbmQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJDb21wcm9iYW5kbyBjdXDDs24uLi5cIik7XHJcbiAgICAgICAgICAgICQoJy5Db3Vwb25Mb2FkZXInKS5yZW1vdmVDbGFzcygnSGlkZGVuJyk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAoZGF0YSkge1xyXG4gICAgICAgICAgICBpZiAoZGF0YS5yZXNwb25zZSA9PSB0cnVlKSB7XHJcbiAgICAgICAgICAgICAgICAkKCcjQ291cG9uVmFsaWRhdGlvbk1lc3NhZ2UnKS5odG1sKFwiQ3Vww7NuIGFjZXB0YWRvICFcIik7XHJcbiAgICAgICAgICAgICAgICBjb3Vwb25EaXYuaGlkZSgyMDAsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb3Vwb25TZXQucmVtb3ZlQ2xhc3MoJ0hpZGRlbicpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICBsb2NhdGlvbi5yZWxvYWQoKTtcclxuICAgICAgICAgICAgfSBlbHNlIGlmIChkYXRhLnJlc3BvbnNlID09IG51bGwpIHtcclxuICAgICAgICAgICAgICAgICQoJyNDb3Vwb25WYWxpZGF0aW9uTWVzc2FnZScpLmh0bWwoZGF0YS5tZXNzYWdlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZXJyb3I6IGZ1bmN0aW9uIChkYXRhKSB7XHJcbiAgICAgICAgICAgICQoJyNDb3Vwb25WYWxpZGF0aW9uTWVzc2FnZScpLmh0bWwoZGF0YS5yZXNwb25zZVRleHQpO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhkYXRhKTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIGNvbXBsZXRlOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICQoJy5Db3Vwb25Mb2FkZXInKS5hZGRDbGFzcygnSGlkZGVuJyk7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcbn1cclxuXHJcbi8vIEZhdnNcclxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG53aW5kb3cuYWRkQXJ0aWNsZVRvRmF2cyA9IGZ1bmN0aW9uIChyb3V0ZSwgZmF2aWQsIGFydGljbGVpZCwgYWN0aW9uLCBkaXNwbGF5QnV0dG9uKSB7XHJcbiAgICAkLmFqYXgoe1xyXG4gICAgICAgIHVybDogcm91dGUsXHJcbiAgICAgICAgbWV0aG9kOiAnUE9TVCcsXHJcbiAgICAgICAgZGF0YVR5cGU6ICdKU09OJyxcclxuICAgICAgICBkYXRhOiB7IGZhdl9pZDogZmF2aWQsIGFydGljbGVfaWQ6IGFydGljbGVpZCB9LFxyXG4gICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChkYXRhKSB7XHJcbiAgICAgICAgICAgIGlmIChkYXRhLnJlc3BvbnNlID09IHRydWUgJiYgZGF0YS5yZXN1bHQgPT0gJ2FkZGVkJykge1xyXG4gICAgICAgICAgICAgICAgc3dpdGNoIChhY3Rpb24pIHtcclxuICAgICAgICAgICAgICAgICAgICBjYXNlICdyZWxvYWQnOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBsb2NhdGlvbi5yZWxvYWQoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAnc2hvdyc6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRpc3BsYXlCdXR0b24ucmVtb3ZlQ2xhc3MoJ2Zhdi1pY29uLW5vZmF2Jyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRpc3BsYXlCdXR0b24uYWRkQ2xhc3MoJ2Zhdi1pY29uLWlzZmF2Jyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRvYXN0X3N1Y2Nlc3MoJ09rIScsICdQcm9kdWN0byBhZ3JlZ2FkbyBhIGZhdm9yaXRvcycsICdib3R0b21DZW50ZXInLCAnJywgMTAwMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJ25vbmUnOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnQWN0dWFsaXphZG8gLSBTaW4gQWNjacOzbicpO1xyXG4gICAgICAgICAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdObyBoYXkgYWNjacOzbicpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSBlbHNlIGlmIChkYXRhLnJlc3BvbnNlID09IHRydWUgJiYgZGF0YS5yZXN1bHQgPT0gJ3JlbW92ZWQnKSB7XHJcbiAgICAgICAgICAgICAgICBkaXNwbGF5QnV0dG9uLmFkZENsYXNzKCdmYXYtaWNvbi1ub2ZhdicpO1xyXG4gICAgICAgICAgICAgICAgZGlzcGxheUJ1dHRvbi5yZW1vdmVDbGFzcygnZmF2LWljb24taXNmYXYnKTtcclxuICAgICAgICAgICAgICAgIHRvYXN0X3N1Y2Nlc3MoJ09rIScsICdQcm9kdWN0byBlbGltaW5hZG8gZGUgZmF2b3JpdG9zJywgJ2JvdHRvbUNlbnRlcicsICcnLCAxMDAwKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBzZXRGYXZzVG90YWxJY29uKGRhdGEuZmF2c0NvdW50KTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIGVycm9yOiBmdW5jdGlvbiAoZGF0YSkge1xyXG4gICAgICAgICAgICAkKCcjRXJyb3InKS5odG1sKGRhdGEucmVzcG9uc2VUZXh0KTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coZGF0YSk7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHNldEZhdnNUb3RhbEljb24oZmF2cykge1xyXG4gICAgaWYgKGZhdnMgPiAwKSB7XHJcbiAgICAgICAgJCgnLkZhdk1haW5JY29uJykucmVtb3ZlQ2xhc3MoJ2ZhcicpO1xyXG4gICAgICAgICQoJy5GYXZNYWluSWNvbicpLmFkZENsYXNzKCdmYScpO1xyXG4gICAgfSBlbHNlIGlmIChmYXZzID09IDApIHtcclxuICAgICAgICAkKCcuRmF2TWFpbkljb24nKS5yZW1vdmVDbGFzcygnZmEnKTtcclxuICAgICAgICAkKCcuRmF2TWFpbkljb24nKS5hZGRDbGFzcygnZmFyJyk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgICQoJy5GYXZNYWluSWNvbicpLnJlbW92ZUNsYXNzKCdmYScpO1xyXG4gICAgICAgICQoJy5GYXZNYWluSWNvbicpLnJlbW92ZUNsYXNzKCdmYXInKTtcclxuICAgICAgICAkKCcuRmF2TWFpbkljb24nKS5hZGRDbGFzcygnZmEnKTtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIkVycm9yIGVuIHNldEZhdnNUb3RhbEljb24oKVwiKTtcclxuICAgIH1cclxufVxyXG5cclxud2luZG93LnJlbW92ZUFydGljbGVGcm9tRmF2cyA9IGZ1bmN0aW9uIChyb3V0ZSwgZmF2aWQsIGFjdGlvbikge1xyXG4gICAgdmFyIGRvYWN0aW9uID0gYWN0aW9uO1xyXG4gICAgJC5hamF4KHtcclxuICAgICAgICB1cmw6IHJvdXRlLFxyXG4gICAgICAgIG1ldGhvZDogJ1BPU1QnLFxyXG4gICAgICAgIGRhdGFUeXBlOiAnSlNPTicsXHJcbiAgICAgICAgZGF0YTogeyBmYXZfaWQ6IGZhdmlkIH0sXHJcbiAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKGRhdGEpIHtcclxuICAgICAgICAgICAgJCgnI0Vycm9yJykuaHRtbChkYXRhLnJlc3BvbnNlVGV4dCk7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGRhdGEpO1xyXG4gICAgICAgICAgICBpZiAoZGF0YS5yZXNwb25zZSA9PSB0cnVlKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhkb2FjdGlvbik7XHJcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKGRvYWN0aW9uKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAncmVsb2FkJzpcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGFjdGlvbiA9ICdyZWxvYWQnO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0b2FzdF9zdWNjZXNzKCdPayEnLCAnUHJvZHVjdG8gZWxpbWluYWRvIGRlIGZhdm9yaXRvcycsICdib3R0b21DZW50ZXInLCBhY3Rpb24sIDEwMDApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnTm8gaGF5IGFjY2nDs24nKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAvLyQoJyNFcnJvcicpLmh0bWwoZGF0YS5tZXNzYWdlWydlcnJvckluZm8nXSk7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhkYXRhKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZXJyb3I6IGZ1bmN0aW9uIChkYXRhKSB7XHJcbiAgICAgICAgICAgIC8vJCgnI0Vycm9yJykuaHRtbChkYXRhLnJlc3BvbnNlVGV4dCk7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGRhdGEpO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG59XHJcblxyXG53aW5kb3cucmVtb3ZlQWxsQXJ0aWNsZXNGcm9tRmF2cyA9IGZ1bmN0aW9uIChyb3V0ZSwgY3VzdG9tZXJpZCwgYWN0aW9uKSB7XHJcbiAgICAkLmFqYXgoe1xyXG4gICAgICAgIHVybDogcm91dGUsXHJcbiAgICAgICAgbWV0aG9kOiAnUE9TVCcsXHJcbiAgICAgICAgZGF0YVR5cGU6ICdKU09OJyxcclxuICAgICAgICBkYXRhOiB7IGN1c3RvbWVyX2lkOiBjdXN0b21lcmlkIH0sXHJcbiAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKGRhdGEpIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coZGF0YSk7XHJcbiAgICAgICAgICAgIC8vJCgnI0Vycm9yJykuaHRtbChkYXRhLnJlc3BvbnNlVGV4dCk7XHJcbiAgICAgICAgICAgIGlmIChkYXRhLnJlc3BvbnNlID09IHRydWUpIHtcclxuICAgICAgICAgICAgICAgIHN3aXRjaCAoYWN0aW9uKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAncmVsb2FkJzpcclxuICAgICAgICAgICAgICAgICAgICAgICAgbG9jYXRpb24ucmVsb2FkKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdObyBoYXkgYWNjacOzbicpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICQoJyNFcnJvcicpLmh0bWwoZGF0YS5tZXNzYWdlWydlcnJvckluZm8nXSk7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhkYXRhKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZXJyb3I6IGZ1bmN0aW9uIChkYXRhKSB7XHJcbiAgICAgICAgICAgIC8vJCgnI0Vycm9yJykuaHRtbChkYXRhLnJlc3BvbnNlVGV4dCk7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGRhdGEpO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG59XHJcblxyXG4vKlxyXG58LS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxufCBMT0dJTiBBTkQgUkVHSVNURVJcclxufC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiovXHJcblxyXG4kKCcjUmVzZWxsZXJCb3gnKS5oaWRlKCk7XHJcblxyXG53aW5kb3cub3BlblJlc2VsbGVyUmVnaXN0cmF0aW9uID0gZnVuY3Rpb24oKVxyXG57XHJcbiAgICAkKCcjSXNSZXNlbGxlckNoZWNrYm94JykucHJvcCgnY2hlY2tlZCcsIHRydWUpO1xyXG4gICAgJCgnLklmUmVzZWxsZXJFbmFibGUnKS5wcm9wKCdkaXNhYmxlZCcsIGZhbHNlKTtcclxuICAgICQoJyNSZXNlbGxlckJveCcpLnNob3coMTAwKTtcclxuICAgICQoJyNSZXNlbGxlckNUQScpLmhpZGUoMCk7XHJcbiAgICAkKCcuTm9ybWFDbGllbnRUaXRsZScpLmhpZGUoMCk7XHJcbiAgICAkKCcuUmVzZWxsZXJUaXRsZScpLnNob3coMCk7XHJcbn1cclxuXHJcbndpbmRvdy5jbG9zZVJlc2VsbGVyUmVnaXN0cmF0aW9uID0gZnVuY3Rpb24oKVxyXG57XHJcbiAgICAkKCcjSXNSZXNlbGxlckNoZWNrYm94JykucHJvcCgnY2hlY2tlZCcsIGZhbHNlKTtcclxuICAgICQoJy5JZlJlc2VsbGVyRW5hYmxlJykucHJvcCgnZGlzYWJsZWQnLCB0cnVlKTtcclxuICAgICQoJyNSZXNlbGxlckJveCcpLmhpZGUoMCk7XHJcbiAgICAkKCcjUmVzZWxsZXJDVEEnKS5zaG93KDEwMCk7XHJcbiAgICAkKCcuTm9ybWFDbGllbnRUaXRsZScpLnNob3coMCk7XHJcbiAgICAkKCcuUmVzZWxsZXJUaXRsZScpLmhpZGUoMCk7XHJcbn1cclxuXHJcbiQoZG9jdW1lbnQpLnJlYWR5KGZ1bmN0aW9uKCl7XHJcbiAgICAkKCcuR2VvUHJvdlNlbGVjdCcpLm9uKCdjaGFuZ2UnLCBmdW5jdGlvbigpe1xyXG4gICAgICAgIGxldCBwcm92X2lkID0gJCh0aGlzKS52YWwoKTtcclxuICAgICAgICBnZXRHZW9Mb2NzKHByb3ZfaWQpO1xyXG4gICAgfSk7XHJcbn0pO1xyXG5cclxuLypcclxufC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbnwgTUlYIEZVTkNUSU9OU1xyXG58LS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuKi9cclxuXHJcbndpbmRvdy5jbG9zZUVsZW1lbnQgPSBmdW5jdGlvbihzZWxlY3Rvcilcclxue1xyXG4gICAgJChzZWxlY3RvcikuaGlkZSgxMDApO1xyXG59XHJcblxyXG53aW5kb3cuZ2V0UGFyYW0gPSBmdW5jdGlvbihwYXJhbWV0ZXJOYW1lKSB7XHJcbiAgICB2YXIgcmVzdWx0ID0gbnVsbCxcclxuICAgICAgICB0bXAgPSBbXTtcclxuICAgIGxvY2F0aW9uLnNlYXJjaFxyXG4gICAgICAgIC5zdWJzdHIoMSlcclxuICAgICAgICAuc3BsaXQoXCImXCIpXHJcbiAgICAgICAgLmZvckVhY2goZnVuY3Rpb24gKGl0ZW0pIHtcclxuICAgICAgICB0bXAgPSBpdGVtLnNwbGl0KFwiPVwiKTtcclxuICAgICAgICBpZiAodG1wWzBdID09PSBwYXJhbWV0ZXJOYW1lKSByZXN1bHQgPSBkZWNvZGVVUklDb21wb25lbnQodG1wWzFdKTtcclxuICAgICAgICB9KTtcclxuICAgIHJldHVybiByZXN1bHQ7XHJcbn1cclxuXHJcbndpbmRvdy5nZXRQYXJhbXMgPSBmdW5jdGlvbih1cmwpIHtcclxuICAgIHZhciBwYXJhbXMgPSB7fTtcclxuXHR2YXIgcGFyc2VyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYScpO1xyXG5cdHBhcnNlci5ocmVmID0gdXJsO1xyXG5cdHZhciBxdWVyeSA9IHBhcnNlci5zZWFyY2guc3Vic3RyaW5nKDEpO1xyXG5cdHZhciB2YXJzID0gcXVlcnkuc3BsaXQoJyYnKTtcclxuXHRmb3IgKHZhciBpID0gMDsgaSA8IHZhcnMubGVuZ3RoOyBpKyspIHtcclxuXHRcdHZhciBwYWlyID0gdmFyc1tpXS5zcGxpdCgnPScpO1xyXG5cdFx0cGFyYW1zW3BhaXJbMF1dID0gZGVjb2RlVVJJQ29tcG9uZW50KHBhaXJbMV0pO1xyXG5cdH1cclxuXHRyZXR1cm4gcGFyYW1zO1xyXG59XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3Jlc291cmNlcy9hc3NldHMvanMvc3RvcmUvc2NyaXB0cy5qcyJdLCJzb3VyY2VSb290IjoiIn0=