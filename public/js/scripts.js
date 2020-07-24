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

window.loaderBars = function (action) {

    var loader = $('#LoaderBars');

    if (action) {
        loader.removeClass('Hidden');
    } else {
        loader.addClass('Hidden');
    }
};

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

    loaderBars(true);

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
                updateTotals(data.totalCartItems, data.cartSubTotal);
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
            // $('#Error').html(data.responseText);
            console.log("Error en addtoCart()");
            // location.reload();
            console.log(data);
        },
        complete: function complete() {
            loaderBars(false);
        }
    });
};

// Remove product from cart
// -------------------------------------------
window.removeFromCart = function (route, cartItemId, variantId, quantity, div, action) {

    loaderBars(true);

    $.ajax({
        url: route,
        method: 'POST',
        dataType: 'JSON',
        data: { cartItemId: cartItemId, variantId: variantId, quantity: quantity, action: action, method: 'ajax' },
        success: function success(data) {
            if (data.response == 'cart-removed') {
                // console.log(data);
                updateTotals(data.totalCartItems, data.cartSubTotal);
                window.location = window.location.href.split("?")[0];
                setItemsData();
            } else if (data.response == 'success') {
                $(div).hide(100);
                $(div).remove();
                updateTotals(data.totalCartItems, data.cartSubTotal);
                setItemsData();
            }
        },
        error: function error(data) {
            $('#Error').html(data.responseText);
            console.log("Error en removeFromCart()");
            console.log(data);
            // If an error pops when destroying an item, reload and prevent bad magic
            // location.reload();
        },
        complete: function complete() {
            loaderBars(false);
        }
    });
};

function updateTotals(totalCartItems, cartSubtotal) {

    // Live Reloading stuff
    $(".TotalCartItems").html(totalCartItems);
    $(".CartSubTotal").html(cartSubtotal);
    $("#SideContainerItemsFixed").load(window.location.href + " #SideContainerItemsFixed");
    $("#SideContainerItemsFloating").load(window.location.href + " #SideContainerItemsFloating");
    $(".TotalCartItemsSidebar").load(window.location.href + " .TotalCartItemsSidebar");
    $(".AvailableStock").load(window.location.href + " .AvailableStock");
}

// Submit Cart Form to Checkout
// -------------------------------------------
window.submitCartToCheckout = function (route, target, data, action) {

    $.ajax({
        url: route,
        method: 'POST',
        dataType: 'JSON',
        data: { data: data, action: action },
        success: function success(data) {
            console.log(data);
            if (data.response == 'success') {
                // console.log(target);
                if (target == 'reload') {
                    // Refresh page, delete parametters and open checkout sidebar
                    // window.location = window.location.href.split("?")[0] + "?checkout-on";
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
            // location.reload();
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgOTQ0OWNjNzA1MDEwMWI1MTVkZjciLCJ3ZWJwYWNrOi8vLy4vcmVzb3VyY2VzL2Fzc2V0cy9qcy9zdG9yZS9zY3JpcHRzLmpzIl0sIm5hbWVzIjpbIiQiLCJjbGljayIsInRvZ2dsZU5hdiIsIndpbmRvdyIsIm5hdiIsImJvZHkiLCJ0cmlnZ2VyIiwiYm90dG9tVHJpZ2dlciIsImNvbnRlbnRUZXh0IiwiaGFzQ2xhc3MiLCJyZW1vdmVDbGFzcyIsImNzcyIsImhpZGUiLCJhZGRDbGFzcyIsImZhZGVJbiIsIm9uIiwia2V5cHJlc3MiLCJlIiwiY29uc29sZSIsImxvZyIsIndoaWNoIiwicHJldmVudERlZmF1bHQiLCJsb2FkZXJCYXJzIiwiYWN0aW9uIiwibG9hZGVyIiwiY29sbGFwc2VGaWx0ZXIiLCJlbGVtIiwiZmlsdGVyIiwic2libGluZ3MiLCJzaG93IiwiaHRtbCIsInZhbHVlIiwidmFsIiwicXVhbnRpdHkiLCJuZXdWYWx1ZSIsIm5ld1ByaWNlVGFyZ2V0IiwicGFyZW50IiwibW9kaWZ5Q2FydEl0ZW1RIiwiY2hlY2tvdXRTaWRlYmFyIiwic3RhdGUiLCJzaWRlYmFyIiwid3JhcHBlciIsInVuZGVmaW5lZCIsIm9wZW5DaGVja291dERlc2t0b3AiLCJ3aWR0aCIsIm9wZW5GaWx0ZXJzIiwiZmlsdGVycyIsInN1bUFsbEl0ZW1zIiwic3VtIiwiZWFjaCIsImluZGV4IiwicGFyc2VJbnQiLCJzdW1EaXZzIiwib3JpZ2lucyIsInRhcmdldCIsInBhcnNlRmxvYXQiLCJ0ZXh0IiwiY2hlY2tWYXJpYW50U3RvY2siLCJmb3JtIiwiZGF0YSIsInNlcmlhbGl6ZSIsImFsbG93U3VibWl0Iiwic3VibWl0QnV0dG9uIiwiYWpheCIsInVybCIsIm1ldGhvZCIsImRhdGFUeXBlIiwiYXN5bmMiLCJzdWNjZXNzIiwicmVzcG9uc2UiLCJtZXNzYWdlIiwicHJvcCIsImVycm9yIiwicmVzcG9uc2VUZXh0IiwibG9jYXRpb24iLCJyZWxvYWQiLCJzZXRJdGVtc0RhdGEiLCJpdGVtRGF0YSIsImlkIiwicHJpY2UiLCJ2YXJpYW50X2lkIiwiaXRlbSIsInRvdGFsIiwicHVzaCIsImFkZFRvQ2FydCIsInJvdXRlIiwibmV3U3RvY2siLCJ0b2FzdF9zdWNjZXNzIiwidXBkYXRlVG90YWxzIiwidG90YWxDYXJ0SXRlbXMiLCJjYXJ0U3ViVG90YWwiLCJzZXRUaW1lb3V0IiwiY29tcGxldGUiLCJyZW1vdmVGcm9tQ2FydCIsImNhcnRJdGVtSWQiLCJ2YXJpYW50SWQiLCJkaXYiLCJocmVmIiwic3BsaXQiLCJyZW1vdmUiLCJjYXJ0U3VidG90YWwiLCJsb2FkIiwic3VibWl0Q2FydFRvQ2hlY2tvdXQiLCJ0b2FzdF9lcnJvciIsInZhbGlkYXRlQW5kU2V0Q291cG9uIiwiY29kZSIsImNhcnRpZCIsImNvdXBvbkRpdiIsImNvdXBvblNldCIsImJlZm9yZVNlbmQiLCJhZGRBcnRpY2xlVG9GYXZzIiwiZmF2aWQiLCJhcnRpY2xlaWQiLCJkaXNwbGF5QnV0dG9uIiwiZmF2X2lkIiwiYXJ0aWNsZV9pZCIsInJlc3VsdCIsInNldEZhdnNUb3RhbEljb24iLCJmYXZzQ291bnQiLCJmYXZzIiwicmVtb3ZlQXJ0aWNsZUZyb21GYXZzIiwiZG9hY3Rpb24iLCJyZW1vdmVBbGxBcnRpY2xlc0Zyb21GYXZzIiwiY3VzdG9tZXJpZCIsImN1c3RvbWVyX2lkIiwib3BlblJlc2VsbGVyUmVnaXN0cmF0aW9uIiwiY2xvc2VSZXNlbGxlclJlZ2lzdHJhdGlvbiIsImRvY3VtZW50IiwicmVhZHkiLCJwcm92X2lkIiwiZ2V0R2VvTG9jcyIsImNsb3NlRWxlbWVudCIsInNlbGVjdG9yIiwiZ2V0UGFyYW0iLCJwYXJhbWV0ZXJOYW1lIiwidG1wIiwic2VhcmNoIiwic3Vic3RyIiwiZm9yRWFjaCIsImRlY29kZVVSSUNvbXBvbmVudCIsImdldFBhcmFtcyIsInBhcmFtcyIsInBhcnNlciIsImNyZWF0ZUVsZW1lbnQiLCJxdWVyeSIsInN1YnN0cmluZyIs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QXNDO0FBQ3JDLFlBQUlFLE9BQU9ILEtBQUtDLENBQUwsRUFBUWpELEtBQVIsQ0FBYyxHQUFkLENBQVg7QUFDQTJDLGVBQU9RLEtBQUssQ0FBTCxDQUFQLElBQWtCVixtQkFBbUJVLEtBQUssQ0FBTCxDQUFuQixDQUFsQjtBQUNBO0FBQ0QsV0FBT1IsTUFBUDtBQUNBLENBWEQsQyIsImZpbGUiOiIvanMvc2NyaXB0cy5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwge1xuIFx0XHRcdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcbiBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4gXHRcdFx0XHRnZXQ6IGdldHRlclxuIFx0XHRcdH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIi9cIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSA3Mik7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgOTQ0OWNjNzA1MDEwMWI1MTVkZjciLCIvL1xyXG4vLyB8LS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuLy8gfCBOYXZpZ2F0aW9uXHJcbi8vIHwtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4vL1xyXG4kKCcjbmF2ZnVsbC10b3AtYnRuLCAjbmF2ZnVsbC1ib3R0b20tYnRuJykuY2xpY2soZnVuY3Rpb24oKSB7XHJcbiAgICB0b2dnbGVOYXYoKTtcclxufSk7XHJcblxyXG53aW5kb3cudG9nZ2xlTmF2ID0gZnVuY3Rpb24oKVxyXG57XHJcbiAgICBjb25zdCBuYXYgPSAkKCcuTW9iaWxlTmF2aWdhdGlvbicpO1xyXG4gICAgY29uc3QgYm9keSA9ICQoJ2JvZHknKTtcclxuICAgIGNvbnN0IHRyaWdnZXIgPSAkKCcjbmF2ZnVsbC10b3AtYnRuJyk7XHJcbiAgICBjb25zdCBib3R0b21UcmlnZ2VyID0gJCgnI25hdmZ1bGwtYm90dG9tLWJ0bicpO1xyXG4gICAgY29uc3QgY29udGVudFRleHQgPSAkKCcuY29udGVudC1lZmZlY3QnKTtcclxuXHJcbiAgICBpZihuYXYuaGFzQ2xhc3MoJ25hdmZ1bGwtYWN0aXZlJykpXHJcbiAgICB7XHJcbiAgICAgICAgbmF2LnJlbW92ZUNsYXNzKCduYXZmdWxsLWFjdGl2ZScpO1xyXG4gICAgICAgIHRyaWdnZXIucmVtb3ZlQ2xhc3MoJ25hdmZ1bGwtdG9wLWFjdGl2ZScpO1xyXG4gICAgICAgIGJvdHRvbVRyaWdnZXIucmVtb3ZlQ2xhc3MoJ25hdmZ1bGwtYm90dG9tLWFjdGl2ZScpO1xyXG4gICAgICAgIGJvZHkuY3NzKCdvdmVyZmxvdycsJ2F1dG8nKTtcclxuICAgICAgICBjb250ZW50VGV4dC5oaWRlKCk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIG5hdi5hZGRDbGFzcygnbmF2ZnVsbC1hY3RpdmUnKTtcclxuICAgICAgICB0cmlnZ2VyLmFkZENsYXNzKCduYXZmdWxsLXRvcC1hY3RpdmUnKTtcclxuICAgICAgICBib3R0b21UcmlnZ2VyLmFkZENsYXNzKCduYXZmdWxsLWJvdHRvbS1hY3RpdmUnKTtcclxuICAgICAgICBib2R5LmNzcygnb3ZlcmZsb3cnLCdoaWRkZW4nKTtcclxuICAgICAgICBjb250ZW50VGV4dC5mYWRlSW4oNTAwKTtcclxuICAgIH1cclxufVxyXG5cclxuXHJcbi8vIExvYWRlcnNcclxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4kKFwiLmxvYWRlci1vbi1jaGFuZ2VcIikub24oJ2NoYW5nZScsIGZ1bmN0aW9uICgpIHtcclxuICAgICQoJyNmdWxsLWxvYWRlcicpLnJlbW92ZUNsYXNzKCdIaWRkZW4nKTtcclxuICAgIHJldHVybiB0cnVlO1xyXG59KTtcclxuXHJcbiQoXCIubG9hZGVyLW9uLXN1Ym1pdFwiKS5vbignc3VibWl0JywgZnVuY3Rpb24gKCkge1xyXG4gICAgJCgnI2Z1bGwtbG9hZGVyJykucmVtb3ZlQ2xhc3MoJ0hpZGRlbicpO1xyXG4gICAgcmV0dXJuIHRydWU7XHJcbn0pO1xyXG5cclxuJCgnLmRvbnQtc3VibWl0LW9uLWVudGVyLCAuZHNvbicpLmtleXByZXNzKGZ1bmN0aW9uIChlKSB7XHJcbiAgICBjb25zb2xlLmxvZyhcIkVOVEVSXCIpO1xyXG4gICAgaWYgKGUud2hpY2ggPT0gMTMpIHJldHVybiBmYWxzZTtcclxuICAgIGlmIChlLndoaWNoID09IDEzKSBlLnByZXZlbnREZWZhdWx0KCk7XHJcbn0pO1xyXG5cclxud2luZG93LmxvYWRlckJhcnMgPSBmdW5jdGlvbiAoYWN0aW9uKSB7XHJcbiAgICBcclxuICAgIGNvbnN0IGxvYWRlciA9ICQoJyNMb2FkZXJCYXJzJyk7XHJcblxyXG4gICAgaWYoYWN0aW9uKSB7XHJcbiAgICAgICAgbG9hZGVyLnJlbW92ZUNsYXNzKCdIaWRkZW4nKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgbG9hZGVyLmFkZENsYXNzKCdIaWRkZW4nKTtcclxuICAgIH1cclxuXHJcbn07XHJcblxyXG4vLyBTdG9yZSBGaWx0ZXJzXHJcbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuXHJcbndpbmRvdy5jb2xsYXBzZUZpbHRlciA9IGZ1bmN0aW9uKGVsZW0pIHtcclxuICAgIGNvbnN0IGZpbHRlciA9IGVsZW0uc2libGluZ3MoJ3VsJyk7XHJcbiAgICBpZihmaWx0ZXIuaGFzQ2xhc3MoJ2NvbGxhcHNlZCcpKVxyXG4gICAge1xyXG4gICAgICAgIGZpbHRlci5yZW1vdmVDbGFzcygnY29sbGFwc2VkJyk7XHJcbiAgICAgICAgZmlsdGVyLnNob3coMTAwKTtcclxuICAgICAgICBlbGVtLmh0bWwoJy0nKTtcclxuICAgIH1cclxuICAgIGVsc2VcclxuICAgIHtcclxuICAgICAgICBmaWx0ZXIuYWRkQ2xhc3MoJ2NvbGxhcHNlZCcpO1xyXG4gICAgICAgIGZpbHRlci5oaWRlKDEwMCk7XHJcbiAgICAgICAgZWxlbS5odG1sKCcrJyk7XHJcbiAgICB9XHJcbn1cclxuXHJcblxyXG4vLyBNb2RpZnkgY2FydCBpdGVtIHF1YW50aXR5IFxyXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiQoJy5JbnB1dEJ0blEnKS5vbignY2hhbmdlIGtleXVwJywgZnVuY3Rpb24gKCkge1xyXG4gICAgLy8gIE9yaWdpbmFsIEFydGljbGUgUHJpY2VcclxuICAgIGxldCB2YWx1ZSA9ICQodGhpcykuc2libGluZ3MoJy5BcnRpY2xlUHJpY2UnKS52YWwoKTtcclxuICAgIC8vIFF1YW50aXR5XHJcbiAgICBsZXQgcXVhbnRpdHkgPSAkKHRoaXMpLnZhbCgpO1xyXG4gICAgLy8gTmVyIFZhbHVlXHJcbiAgICBsZXQgbmV3VmFsdWUgPSAodmFsdWUgKiBxdWFudGl0eSk7XHJcbiAgICAvLyBOZXcgUHJpY2UgVGFyZ2V0XHJcbiAgICBsZXQgbmV3UHJpY2VUYXJnZXQgPSAkKHRoaXMpLnBhcmVudCgpLnBhcmVudCgpLnBhcmVudCgpLnNpYmxpbmdzKCcuVG90YWxJdGVtUHJpY2UnKTtcclxuXHJcbiAgICBjb25zb2xlLmxvZyh2YWx1ZSwgcXVhbnRpdHksIG5ld1ZhbHVlKTtcclxuICAgIG1vZGlmeUNhcnRJdGVtUSgkKHRoaXMpLCBuZXdQcmljZVRhcmdldCwgbmV3VmFsdWUpO1xyXG59KVxyXG5cclxuZnVuY3Rpb24gbW9kaWZ5Q2FydEl0ZW1RKGUsIG5ld1ByaWNlVGFyZ2V0LCBuZXdWYWx1ZSkge1xyXG4gICAgZS5zaWJsaW5ncygnLklucHV0QnRuUScpLnJlbW92ZUNsYXNzKCdIaWRkZW4nKTtcclxuICAgIG5ld1ByaWNlVGFyZ2V0Lmh0bWwoJyQgJyArIG5ld1ZhbHVlKTtcclxufVxyXG5cclxuXHJcbiQoJyNNYWluT3ZlcmxheScpLmNsaWNrKGZ1bmN0aW9uKCl7XHJcbiAgICBjaGVja291dFNpZGViYXIoJ2hpZGUnKTtcclxufSlcclxuLy8gQ2hlY2tvdXQgc2lkZWJhclxyXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHRcdFxyXG53aW5kb3cuY2hlY2tvdXRTaWRlYmFyID0gZnVuY3Rpb24gKHN0YXRlKSB7XHJcblxyXG4gICAgY29uc3Qgc2lkZWJhciA9ICQoJy5DaGVja291dENhcnQnKTtcclxuICAgIGNvbnN0IHdyYXBwZXIgPSAkKCcubWFpbi13cmFwcGVyJyk7XHJcblxyXG4gICAgY29uc3Qgc2hvdyA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBzaWRlYmFyLmFkZENsYXNzKCdhY3RpdmUnKTtcclxuICAgICAgICB3cmFwcGVyLmFkZENsYXNzKCdhbGxvdy1zaWRlYmFyJyk7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgaGlkZSA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBzaWRlYmFyLnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcclxuICAgICAgICB3cmFwcGVyLnJlbW92ZUNsYXNzKCdhbGxvdy1zaWRlYmFyJyk7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIGlmIChzdGF0ZSA9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICBpZiAoc2lkZWJhci5oYXNDbGFzcygnYWN0aXZlJykpIHtcclxuICAgICAgICAgICAgaGlkZSgpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHNob3coKTtcclxuICAgICAgICB9XHJcbiAgICB9IGVsc2UgaWYgKHN0YXRlID09ICdzaG93Jykge1xyXG4gICAgICAgIHNob3coKTtcclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9IGVsc2UgaWYgKHN0YXRlID09ICdoaWRlJykge1xyXG4gICAgICAgIGhpZGUoKTtcclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcbn1cclxuXHJcblxyXG5cclxud2luZG93Lm9wZW5DaGVja291dERlc2t0b3AgPSBmdW5jdGlvbigpXHJcbntcclxuICAgIGlmICgkKHdpbmRvdykud2lkdGgoKSA+IDc2OCkge1xyXG4gICAgICAgIGNoZWNrb3V0U2lkZWJhcignc2hvdycpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGZhbHNlO1xyXG59XHJcblxyXG53aW5kb3cub3BlbkZpbHRlcnMgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICBjb25zdCBmaWx0ZXJzID0gJCgnI1NlYXJjaEZpbHRlcnMnKTtcclxuICAgIGNvbnN0IHRyaWdnZXIgPSAkKCcjU2VhcmNoRmlsdGVyc1RyaWdnZXInKTtcclxuICAgIGlmKGZpbHRlcnMuaGFzQ2xhc3MoJ2FjdGl2ZScpKVxyXG4gICAge1xyXG4gICAgICAgIGZpbHRlcnMucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xyXG4gICAgICAgIHRyaWdnZXIuc2hvdygpO1xyXG4gICAgfVxyXG4gICAgZWxzZVxyXG4gICAge1xyXG4gICAgICAgIGZpbHRlcnMuYWRkQ2xhc3MoJ2FjdGl2ZScpO1xyXG4gICAgICAgIHRyaWdnZXIuaGlkZSgpO1xyXG4gICAgfVxyXG5cclxufVxyXG5cclxuXHJcbi8qXHJcbnwtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG58IENBUlRcclxufC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiovXHJcblxyXG5cclxud2luZG93LnN1bUFsbEl0ZW1zID0gZnVuY3Rpb24gKCkge1xyXG4gICAgc3VtID0gMDtcclxuICAgICQoJy5Ub3RhbEl0ZW1QcmljZScpLmVhY2goZnVuY3Rpb24gKGluZGV4KSB7XHJcbiAgICAgICAgc3VtICs9IHBhcnNlSW50KCQodGhpcykuaHRtbCgpKTtcclxuICAgIH0pO1xyXG4gICAgJCgnLlN1YlRvdGFsJykuaHRtbChzdW0pO1xyXG59XHJcblxyXG5cclxuLy8gU3VtIGRpdnMgdGV4dFxyXG53aW5kb3cuc3VtRGl2cyA9IGZ1bmN0aW9uIChvcmlnaW5zLCB0YXJnZXQpIHtcclxuICAgIGxldCBzdW0gPSAwO1xyXG4gICAgb3JpZ2lucy5lYWNoKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBzdW0gKz0gcGFyc2VGbG9hdCgkKHRoaXMpLnRleHQoKSk7XHJcbiAgICB9KTtcclxuICAgIHRhcmdldC50ZXh0KHN1bSk7XHJcbn1cclxuXHJcblxyXG4vLyBDaGVjayBwcm9kdWN0IHZhcmlhbnQgc3RvY2tcclxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG53aW5kb3cuY2hlY2tWYXJpYW50U3RvY2sgPSBmdW5jdGlvbigpIHtcclxuICAgIGxldCBmb3JtID0gJCgnI0FkZFRvQ2FydEZvcm0nKTtcclxuICAgIGxldCBkYXRhID0gZm9ybS5zZXJpYWxpemUoKTtcclxuICAgIGxldCBhbGxvd1N1Ym1pdCA9IGZhbHNlO1xyXG4gICAgbGV0IHN1Ym1pdEJ1dHRvbiA9ICAkKCcjQWRkVG9DYXJ0Rm9ybUJ0bicpO1xyXG4gICAgJC5hamF4KHtcclxuICAgICAgICB1cmw6IGZvcm0uZGF0YSgncm91dGUnKSxcclxuICAgICAgICBtZXRob2Q6ICdHRVQnLFxyXG4gICAgICAgIGRhdGFUeXBlOiAnSlNPTicsXHJcbiAgICAgICAgYXN5bmM6IGZhbHNlLFxyXG4gICAgICAgIGRhdGE6IGRhdGEsXHJcbiAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKGRhdGEpIHtcclxuICAgICAgICAgICAgaWYoZGF0YS5yZXNwb25zZSA9PSB0cnVlKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBpZihkYXRhLm1lc3NhZ2UgPT0gJzAnKVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJCgnLkF2YWlsYWJsZVN0b2NrJykuaHRtbChcIk5vIGhheSBzdG9jayBkaXNwb25pYmxlXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzdWJtaXRCdXR0b24ucHJvcCgnZGlzYWJsZWQnLCB0cnVlKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coZGF0YSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICQoJy5BdmFpbGFibGVTdG9jaycpLmh0bWwoXCJTdG9jayBkaXNwb25pYmxlOiBcIiArIGRhdGEubWVzc2FnZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHN1Ym1pdEJ1dHRvbi5wcm9wKCdkaXNhYmxlZCcsIGZhbHNlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYWxsb3dTdWJtaXQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhcIkVudHJvIGVuIFNVQ0NFU1NcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgJCgnI01heFF1YW50aXR5JykucHJvcChcIm1heFwiLCBkYXRhLm1lc3NhZ2UpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coZGF0YSk7XHJcbiAgICAgICAgICAgICAgICAvLyAkKCcjRXJyb3InKS5odG1sKGRhdGEucmVzcG9uc2VUZXh0KTtcclxuICAgICAgICAgICAgICAgICQoJy5BdmFpbGFibGVTdG9jaycpLmh0bWwoZGF0YS5tZXNzYWdlKTtcclxuICAgICAgICAgICAgICAgIHN1Ym1pdEJ1dHRvbi5wcm9wKCdkaXNhYmxlZCcsIHRydWUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuICAgICAgICBlcnJvcjogZnVuY3Rpb24gKGRhdGEpIHtcclxuICAgICAgICAgICAgJCgnI0Vycm9yJykuaHRtbChkYXRhLnJlc3BvbnNlVGV4dCk7XHJcbiAgICAgICAgICAgIGxvY2F0aW9uLnJlbG9hZCgpO1xyXG4gICAgICAgICAgICBhbGxvd1N1Ym1pdCA9IGZhbHNlO1xyXG4gICAgICAgICAgICBzdWJtaXRCdXR0b24ucHJvcCgnZGlzYWJsZWQnLCB0cnVlKTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coZGF0YSk7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiRW50cm8gZW4gZXJyb3IgMlwiKTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuICAgIHJldHVybiBhbGxvd1N1Ym1pdDtcclxufVxyXG5cclxuLy8gU2V0IGNhcnQgaXRlbXMgSlNPTlxyXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbndpbmRvdy5zZXRJdGVtc0RhdGEgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICBpdGVtRGF0YSA9IFtdO1xyXG5cclxuICAgICQoJy5JdGVtLURhdGEnKS5lYWNoKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBsZXQgaWQgPSAkKHRoaXMpLmRhdGEoJ2lkJyk7XHJcbiAgICAgICAgbGV0IHByaWNlID0gJCh0aGlzKS5kYXRhKCdwcmljZScpO1xyXG4gICAgICAgIGxldCB2YXJpYW50X2lkID0gJCh0aGlzKS5kYXRhKCd2YXJpYW50Jyk7XHJcbiAgICAgICAgbGV0IHF1YW50aXR5ID0gJCh0aGlzKS52YWwoKTtcclxuXHJcbiAgICAgICAgaXRlbSA9IHt9O1xyXG4gICAgICAgIGl0ZW1bJ2lkJ10gPSBpZDtcclxuICAgICAgICBpdGVtWyd2YXJpYW50X2lkJ10gPSB2YXJpYW50X2lkO1xyXG4gICAgICAgIGl0ZW1bJ3ByaWNlJ10gPSBwcmljZTtcclxuICAgICAgICBpdGVtWydxdWFudGl0eSddID0gcXVhbnRpdHk7XHJcbiAgICAgICAgLy8gVXBkYXRlIGRpc3BsYXkgdG90YWwgaXRlbSBwcmljZVxyXG4gICAgICAgIHRvdGFsID0gcHJpY2UgKiBxdWFudGl0eTtcclxuICAgICAgICAkKCcuJyArIGlkICsgJy1Ub3RhbEl0ZW1QcmljZScpLmh0bWwodG90YWwpO1xyXG5cclxuICAgICAgICBpdGVtRGF0YS5wdXNoKGl0ZW0pO1xyXG4gICAgfSk7XHJcbiAgICAvLyBVcGRhdGUgVG90YWxcclxuICAgIC8vIGNvbnNvbGUuaW5mbyhpdGVtRGF0YSk7XHJcbiAgICBzdW1BbGxJdGVtcygpO1xyXG4gICAgJCgnI0l0ZW1zLURhdGEnKS52YWwoaXRlbURhdGEpO1xyXG59XHJcblxyXG4vLyBBZGQgcHJvZHVjdCB0byBjYXJ0XHJcbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxud2luZG93LmFkZFRvQ2FydCA9IGZ1bmN0aW9uIChyb3V0ZSwgZGF0YSkge1xyXG4gICAgXHJcbiAgICBsb2FkZXJCYXJzKHRydWUpO1xyXG5cclxuICAgICQuYWpheCh7XHJcbiAgICAgICAgdXJsOiByb3V0ZSxcclxuICAgICAgICBtZXRob2Q6ICdQT1NUJyxcclxuICAgICAgICBkYXRhVHlwZTogJ0pTT04nLFxyXG4gICAgICAgIGRhdGE6IGRhdGEsXHJcbiAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKGRhdGEpIHtcclxuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coZGF0YSk7XHJcbiAgICAgICAgICAgIGlmIChkYXRhLnJlc3BvbnNlID09ICdzdWNjZXNzJykge1xyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAkKCcuQXZhaWxhYmxlU3RvY2snKS5odG1sKFwiU3RvY2sgZGlzcG9uaWJsZTogXCIgKyBkYXRhLm5ld1N0b2NrKTtcclxuICAgICAgICAgICAgICAgIHRvYXN0X3N1Y2Nlc3MoJ09rIScsIGRhdGEubWVzc2FnZSwgJ2JvdHRvbUNlbnRlcicsICcnLCAyNTAwKTtcclxuICAgICAgICAgICAgICAgIHVwZGF0ZVRvdGFscyhkYXRhLnRvdGFsQ2FydEl0ZW1zLCBkYXRhLmNhcnRTdWJUb3RhbCk7XHJcbiAgICAgICAgICAgICAgICBzZXRJdGVtc0RhdGEoKTtcclxuICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHNldEl0ZW1zRGF0YSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIHN1bUFsbEl0ZW1zKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gb3BlbkNoZWNrb3V0RGVza3RvcCgpO1xyXG4gICAgICAgICAgICAgICAgfSwgMTAwKTtcclxuICAgICAgICAgICAgfSBlbHNlIGlmIChkYXRhLnJlc3BvbnNlID09ICd3YXJuaW5nJykge1xyXG4gICAgICAgICAgICAgICAgdG9hc3Rfc3VjY2VzcygnVXBzIScsIGRhdGEubWVzc2FnZSwgJ2JvdHRvbUNlbnRlcicpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuICAgICAgICBlcnJvcjogZnVuY3Rpb24gKGRhdGEpIHtcclxuICAgICAgICAgICAgLy8gJCgnI0Vycm9yJykuaHRtbChkYXRhLnJlc3BvbnNlVGV4dCk7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiRXJyb3IgZW4gYWRkdG9DYXJ0KClcIik7XHJcbiAgICAgICAgICAgIC8vIGxvY2F0aW9uLnJlbG9hZCgpO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhkYXRhKTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIGNvbXBsZXRlOiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgbG9hZGVyQmFycyhmYWxzZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcbn1cclxuXHJcblxyXG4vLyBSZW1vdmUgcHJvZHVjdCBmcm9tIGNhcnRcclxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG53aW5kb3cucmVtb3ZlRnJvbUNhcnQgPSBmdW5jdGlvbiAocm91dGUsIGNhcnRJdGVtSWQsIHZhcmlhbnRJZCwgcXVhbnRpdHksIGRpdiwgYWN0aW9uKSB7XHJcblxyXG4gICAgbG9hZGVyQmFycyh0cnVlKTtcclxuXHJcbiAgICAkLmFqYXgoe1xyXG4gICAgICAgIHVybDogcm91dGUsXHJcbiAgICAgICAgbWV0aG9kOiAnUE9TVCcsXHJcbiAgICAgICAgZGF0YVR5cGU6ICdKU09OJyxcclxuICAgICAgICBkYXRhOiB7IGNhcnRJdGVtSWQ6IGNhcnRJdGVtSWQsIHZhcmlhbnRJZDogdmFyaWFudElkLCBxdWFudGl0eTogcXVhbnRpdHksIGFjdGlvbjogYWN0aW9uLCBtZXRob2Q6ICdhamF4JyB9LFxyXG4gICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChkYXRhKSB7XHJcbiAgICAgICAgICAgIGlmIChkYXRhLnJlc3BvbnNlID09ICdjYXJ0LXJlbW92ZWQnKSB7XHJcbiAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhkYXRhKTtcclxuICAgICAgICAgICAgICAgIHVwZGF0ZVRvdGFscyhkYXRhLnRvdGFsQ2FydEl0ZW1zLCBkYXRhLmNhcnRTdWJUb3RhbCk7XHJcbiAgICAgICAgICAgICAgICB3aW5kb3cubG9jYXRpb24gPSB3aW5kb3cubG9jYXRpb24uaHJlZi5zcGxpdChcIj9cIilbMF07XHJcbiAgICAgICAgICAgICAgICBzZXRJdGVtc0RhdGEoKTtcclxuICAgICAgICAgICAgfSBlbHNlIGlmIChkYXRhLnJlc3BvbnNlID09ICdzdWNjZXNzJykge1xyXG4gICAgICAgICAgICAgICAgJChkaXYpLmhpZGUoMTAwKTtcclxuICAgICAgICAgICAgICAgICQoZGl2KS5yZW1vdmUoKTtcclxuICAgICAgICAgICAgICAgIHVwZGF0ZVRvdGFscyhkYXRhLnRvdGFsQ2FydEl0ZW1zLCBkYXRhLmNhcnRTdWJUb3RhbCk7XHJcbiAgICAgICAgICAgICAgICBzZXRJdGVtc0RhdGEoKTtcclxuICAgICAgICAgICAgfSAgIFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZXJyb3I6IGZ1bmN0aW9uIChkYXRhKSB7XHJcbiAgICAgICAgICAgICQoJyNFcnJvcicpLmh0bWwoZGF0YS5yZXNwb25zZVRleHQpO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIkVycm9yIGVuIHJlbW92ZUZyb21DYXJ0KClcIik7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGRhdGEpO1xyXG4gICAgICAgICAgICAvLyBJZiBhbiBlcnJvciBwb3BzIHdoZW4gZGVzdHJveWluZyBhbiBpdGVtLCByZWxvYWQgYW5kIHByZXZlbnQgYmFkIG1hZ2ljXHJcbiAgICAgICAgICAgIC8vIGxvY2F0aW9uLnJlbG9hZCgpO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgY29tcGxldGU6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgbG9hZGVyQmFycyhmYWxzZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHVwZGF0ZVRvdGFscyh0b3RhbENhcnRJdGVtcywgY2FydFN1YnRvdGFsKSB7XHJcblxyXG4gICAgLy8gTGl2ZSBSZWxvYWRpbmcgc3R1ZmZcclxuICAgICQoXCIuVG90YWxDYXJ0SXRlbXNcIikuaHRtbCh0b3RhbENhcnRJdGVtcyk7XHJcbiAgICAkKFwiLkNhcnRTdWJUb3RhbFwiKS5odG1sKGNhcnRTdWJ0b3RhbCk7XHJcbiAgICAkKFwiI1NpZGVDb250YWluZXJJdGVtc0ZpeGVkXCIpLmxvYWQod2luZG93LmxvY2F0aW9uLmhyZWYgKyBcIiAjU2lkZUNvbnRhaW5lckl0ZW1zRml4ZWRcIik7XHJcbiAgICAkKFwiI1NpZGVDb250YWluZXJJdGVtc0Zsb2F0aW5nXCIpLmxvYWQod2luZG93LmxvY2F0aW9uLmhyZWYgKyBcIiAjU2lkZUNvbnRhaW5lckl0ZW1zRmxvYXRpbmdcIik7XHJcbiAgICAkKFwiLlRvdGFsQ2FydEl0ZW1zU2lkZWJhclwiKS5sb2FkKHdpbmRvdy5sb2NhdGlvbi5ocmVmICsgXCIgLlRvdGFsQ2FydEl0ZW1zU2lkZWJhclwiKTtcclxuICAgICQoXCIuQXZhaWxhYmxlU3RvY2tcIikubG9hZCh3aW5kb3cubG9jYXRpb24uaHJlZiArIFwiIC5BdmFpbGFibGVTdG9ja1wiKTtcclxufVxyXG5cclxuLy8gU3VibWl0IENhcnQgRm9ybSB0byBDaGVja291dFxyXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbndpbmRvdy5zdWJtaXRDYXJ0VG9DaGVja291dCA9IGZ1bmN0aW9uIChyb3V0ZSwgdGFyZ2V0LCBkYXRhLCBhY3Rpb24pIHtcclxuXHJcbiAgICAkLmFqYXgoe1xyXG4gICAgICAgIHVybDogcm91dGUsXHJcbiAgICAgICAgbWV0aG9kOiAnUE9TVCcsXHJcbiAgICAgICAgZGF0YVR5cGU6ICdKU09OJyxcclxuICAgICAgICBkYXRhOiB7IGRhdGEsIGFjdGlvbjogYWN0aW9uIH0sXHJcbiAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKGRhdGEpIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coZGF0YSk7XHJcbiAgICAgICAgICAgIGlmIChkYXRhLnJlc3BvbnNlID09ICdzdWNjZXNzJykge1xyXG4gICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2codGFyZ2V0KTtcclxuICAgICAgICAgICAgICAgIGlmICh0YXJnZXQgPT0gJ3JlbG9hZCcpIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyBSZWZyZXNoIHBhZ2UsIGRlbGV0ZSBwYXJhbWV0dGVycyBhbmQgb3BlbiBjaGVja291dCBzaWRlYmFyXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gd2luZG93LmxvY2F0aW9uID0gd2luZG93LmxvY2F0aW9uLmhyZWYuc3BsaXQoXCI/XCIpWzBdICsgXCI/Y2hlY2tvdXQtb25cIjtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSB0YXJnZXQ7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnRXJyb3IgZW4gc3VibWl0Rm9ybScpO1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coZGF0YSk7XHJcbiAgICAgICAgICAgICAgICB0b2FzdF9lcnJvcignJywgZGF0YS5tZXNzYWdlLCAnYm90dG9tQ2VudGVyJywgJycpO1xyXG4gICAgICAgICAgICAgICAgJCgnLlNpZGVDb250YWluZXJFcnJvcicpLmh0bWwoZGF0YS5tZXNzYWdlKTtcclxuICAgICAgICAgICAgICAgIC8vICQoJyNFcnJvcicpLmh0bWwoZGF0YS5yZXNwb25zZVRleHQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vICQoJyNFcnJvcicpLmh0bWwoZGF0YS5yZXNwb25zZVRleHQpO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZXJyb3I6IGZ1bmN0aW9uIChkYXRhKSB7XHJcbiAgICAgICAgICAgIC8vICQoJyNFcnJvcicpLmh0bWwoZGF0YS5yZXNwb25zZVRleHQpO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIkVycm9yIGVuIHN1Ym1pdEZvcm0oKVwiKTtcclxuICAgICAgICAgICAgLy8gbG9jYXRpb24ucmVsb2FkKCk7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGRhdGEpO1xyXG4gICAgICAgICAgICAvLyBsb2NhdGlvbi5yZWxvYWQoKTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxufVxyXG5cclxuLy8gVmFsaWRhdGUgYW5kIHNldCBjb3Vwb25cclxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG53aW5kb3cudmFsaWRhdGVBbmRTZXRDb3Vwb24gPSBmdW5jdGlvbiAocm91dGUsIGNvZGUsIGNhcnRpZCkge1xyXG4gICAgbGV0IGNvdXBvbkRpdiA9ICQoJyNDb3Vwb25EaXYnKTtcclxuICAgIGxldCBjb3Vwb25TZXQgPSAkKCcjU2V0dGVkQ291cG9uJyk7XHJcbiAgICBjb25zb2xlLmxvZyhjb2RlLCBjYXJ0aWQpO1xyXG4gICAgJC5hamF4KHtcclxuICAgICAgICB1cmw6IHJvdXRlLFxyXG4gICAgICAgIG1ldGhvZDogJ1BPU1QnLFxyXG4gICAgICAgIGRhdGFUeXBlOiAnSlNPTicsXHJcbiAgICAgICAgZGF0YTogeyBjb2RlOiBjb2RlLCBjYXJ0aWQ6IGNhcnRpZCB9LFxyXG4gICAgICAgIGJlZm9yZVNlbmQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJDb21wcm9iYW5kbyBjdXDDs24uLi5cIik7XHJcbiAgICAgICAgICAgICQoJy5Db3Vwb25Mb2FkZXInKS5yZW1vdmVDbGFzcygnSGlkZGVuJyk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAoZGF0YSkge1xyXG4gICAgICAgICAgICBpZiAoZGF0YS5yZXNwb25zZSA9PSB0cnVlKSB7XHJcbiAgICAgICAgICAgICAgICAkKCcjQ291cG9uVmFsaWRhdGlvbk1lc3NhZ2UnKS5odG1sKFwiQ3Vww7NuIGFjZXB0YWRvICFcIik7XHJcbiAgICAgICAgICAgICAgICBjb3Vwb25EaXYuaGlkZSgyMDAsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb3Vwb25TZXQucmVtb3ZlQ2xhc3MoJ0hpZGRlbicpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICBsb2NhdGlvbi5yZWxvYWQoKTtcclxuICAgICAgICAgICAgfSBlbHNlIGlmIChkYXRhLnJlc3BvbnNlID09IG51bGwpIHtcclxuICAgICAgICAgICAgICAgICQoJyNDb3Vwb25WYWxpZGF0aW9uTWVzc2FnZScpLmh0bWwoZGF0YS5tZXNzYWdlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZXJyb3I6IGZ1bmN0aW9uIChkYXRhKSB7XHJcbiAgICAgICAgICAgICQoJyNDb3Vwb25WYWxpZGF0aW9uTWVzc2FnZScpLmh0bWwoZGF0YS5yZXNwb25zZVRleHQpO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhkYXRhKTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIGNvbXBsZXRlOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICQoJy5Db3Vwb25Mb2FkZXInKS5hZGRDbGFzcygnSGlkZGVuJyk7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcbn1cclxuXHJcbi8vIEZhdnNcclxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG53aW5kb3cuYWRkQXJ0aWNsZVRvRmF2cyA9IGZ1bmN0aW9uIChyb3V0ZSwgZmF2aWQsIGFydGljbGVpZCwgYWN0aW9uLCBkaXNwbGF5QnV0dG9uKSB7XHJcbiAgICAkLmFqYXgoe1xyXG4gICAgICAgIHVybDogcm91dGUsXHJcbiAgICAgICAgbWV0aG9kOiAnUE9TVCcsXHJcbiAgICAgICAgZGF0YVR5cGU6ICdKU09OJyxcclxuICAgICAgICBkYXRhOiB7IGZhdl9pZDogZmF2aWQsIGFydGljbGVfaWQ6IGFydGljbGVpZCB9LFxyXG4gICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChkYXRhKSB7XHJcbiAgICAgICAgICAgIGlmIChkYXRhLnJlc3BvbnNlID09IHRydWUgJiYgZGF0YS5yZXN1bHQgPT0gJ2FkZGVkJykge1xyXG4gICAgICAgICAgICAgICAgc3dpdGNoIChhY3Rpb24pIHtcclxuICAgICAgICAgICAgICAgICAgICBjYXNlICdyZWxvYWQnOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBsb2NhdGlvbi5yZWxvYWQoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAnc2hvdyc6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRpc3BsYXlCdXR0b24ucmVtb3ZlQ2xhc3MoJ2Zhdi1pY29uLW5vZmF2Jyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRpc3BsYXlCdXR0b24uYWRkQ2xhc3MoJ2Zhdi1pY29uLWlzZmF2Jyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRvYXN0X3N1Y2Nlc3MoJ09rIScsICdQcm9kdWN0byBhZ3JlZ2FkbyBhIGZhdm9yaXRvcycsICdib3R0b21DZW50ZXInLCAnJywgMTAwMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJ25vbmUnOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnQWN0dWFsaXphZG8gLSBTaW4gQWNjacOzbicpO1xyXG4gICAgICAgICAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdObyBoYXkgYWNjacOzbicpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSBlbHNlIGlmIChkYXRhLnJlc3BvbnNlID09IHRydWUgJiYgZGF0YS5yZXN1bHQgPT0gJ3JlbW92ZWQnKSB7XHJcbiAgICAgICAgICAgICAgICBkaXNwbGF5QnV0dG9uLmFkZENsYXNzKCdmYXYtaWNvbi1ub2ZhdicpO1xyXG4gICAgICAgICAgICAgICAgZGlzcGxheUJ1dHRvbi5yZW1vdmVDbGFzcygnZmF2LWljb24taXNmYXYnKTtcclxuICAgICAgICAgICAgICAgIHRvYXN0X3N1Y2Nlc3MoJ09rIScsICdQcm9kdWN0byBlbGltaW5hZG8gZGUgZmF2b3JpdG9zJywgJ2JvdHRvbUNlbnRlcicsICcnLCAxMDAwKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBzZXRGYXZzVG90YWxJY29uKGRhdGEuZmF2c0NvdW50KTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIGVycm9yOiBmdW5jdGlvbiAoZGF0YSkge1xyXG4gICAgICAgICAgICAkKCcjRXJyb3InKS5odG1sKGRhdGEucmVzcG9uc2VUZXh0KTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coZGF0YSk7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHNldEZhdnNUb3RhbEljb24oZmF2cykge1xyXG4gICAgaWYgKGZhdnMgPiAwKSB7XHJcbiAgICAgICAgJCgnLkZhdk1haW5JY29uJykucmVtb3ZlQ2xhc3MoJ2ZhcicpO1xyXG4gICAgICAgICQoJy5GYXZNYWluSWNvbicpLmFkZENsYXNzKCdmYScpO1xyXG4gICAgfSBlbHNlIGlmIChmYXZzID09IDApIHtcclxuICAgICAgICAkKCcuRmF2TWFpbkljb24nKS5yZW1vdmVDbGFzcygnZmEnKTtcclxuICAgICAgICAkKCcuRmF2TWFpbkljb24nKS5hZGRDbGFzcygnZmFyJyk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgICQoJy5GYXZNYWluSWNvbicpLnJlbW92ZUNsYXNzKCdmYScpO1xyXG4gICAgICAgICQoJy5GYXZNYWluSWNvbicpLnJlbW92ZUNsYXNzKCdmYXInKTtcclxuICAgICAgICAkKCcuRmF2TWFpbkljb24nKS5hZGRDbGFzcygnZmEnKTtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIkVycm9yIGVuIHNldEZhdnNUb3RhbEljb24oKVwiKTtcclxuICAgIH1cclxufVxyXG5cclxud2luZG93LnJlbW92ZUFydGljbGVGcm9tRmF2cyA9IGZ1bmN0aW9uIChyb3V0ZSwgZmF2aWQsIGFjdGlvbikge1xyXG4gICAgdmFyIGRvYWN0aW9uID0gYWN0aW9uO1xyXG4gICAgJC5hamF4KHtcclxuICAgICAgICB1cmw6IHJvdXRlLFxyXG4gICAgICAgIG1ldGhvZDogJ1BPU1QnLFxyXG4gICAgICAgIGRhdGFUeXBlOiAnSlNPTicsXHJcbiAgICAgICAgZGF0YTogeyBmYXZfaWQ6IGZhdmlkIH0sXHJcbiAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKGRhdGEpIHtcclxuICAgICAgICAgICAgJCgnI0Vycm9yJykuaHRtbChkYXRhLnJlc3BvbnNlVGV4dCk7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGRhdGEpO1xyXG4gICAgICAgICAgICBpZiAoZGF0YS5yZXNwb25zZSA9PSB0cnVlKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhkb2FjdGlvbik7XHJcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKGRvYWN0aW9uKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAncmVsb2FkJzpcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGFjdGlvbiA9ICdyZWxvYWQnO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0b2FzdF9zdWNjZXNzKCdPayEnLCAnUHJvZHVjdG8gZWxpbWluYWRvIGRlIGZhdm9yaXRvcycsICdib3R0b21DZW50ZXInLCBhY3Rpb24sIDEwMDApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnTm8gaGF5IGFjY2nDs24nKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAvLyQoJyNFcnJvcicpLmh0bWwoZGF0YS5tZXNzYWdlWydlcnJvckluZm8nXSk7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhkYXRhKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZXJyb3I6IGZ1bmN0aW9uIChkYXRhKSB7XHJcbiAgICAgICAgICAgIC8vJCgnI0Vycm9yJykuaHRtbChkYXRhLnJlc3BvbnNlVGV4dCk7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGRhdGEpO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG59XHJcblxyXG53aW5kb3cucmVtb3ZlQWxsQXJ0aWNsZXNGcm9tRmF2cyA9IGZ1bmN0aW9uIChyb3V0ZSwgY3VzdG9tZXJpZCwgYWN0aW9uKSB7XHJcbiAgICAkLmFqYXgoe1xyXG4gICAgICAgIHVybDogcm91dGUsXHJcbiAgICAgICAgbWV0aG9kOiAnUE9TVCcsXHJcbiAgICAgICAgZGF0YVR5cGU6ICdKU09OJyxcclxuICAgICAgICBkYXRhOiB7IGN1c3RvbWVyX2lkOiBjdXN0b21lcmlkIH0sXHJcbiAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKGRhdGEpIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coZGF0YSk7XHJcbiAgICAgICAgICAgIC8vJCgnI0Vycm9yJykuaHRtbChkYXRhLnJlc3BvbnNlVGV4dCk7XHJcbiAgICAgICAgICAgIGlmIChkYXRhLnJlc3BvbnNlID09IHRydWUpIHtcclxuICAgICAgICAgICAgICAgIHN3aXRjaCAoYWN0aW9uKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAncmVsb2FkJzpcclxuICAgICAgICAgICAgICAgICAgICAgICAgbG9jYXRpb24ucmVsb2FkKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdObyBoYXkgYWNjacOzbicpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICQoJyNFcnJvcicpLmh0bWwoZGF0YS5tZXNzYWdlWydlcnJvckluZm8nXSk7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhkYXRhKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZXJyb3I6IGZ1bmN0aW9uIChkYXRhKSB7XHJcbiAgICAgICAgICAgIC8vJCgnI0Vycm9yJykuaHRtbChkYXRhLnJlc3BvbnNlVGV4dCk7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGRhdGEpO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG59XHJcblxyXG4vKlxyXG58LS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxufCBMT0dJTiBBTkQgUkVHSVNURVJcclxufC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiovXHJcblxyXG4kKCcjUmVzZWxsZXJCb3gnKS5oaWRlKCk7XHJcblxyXG53aW5kb3cub3BlblJlc2VsbGVyUmVnaXN0cmF0aW9uID0gZnVuY3Rpb24oKVxyXG57XHJcbiAgICAkKCcjSXNSZXNlbGxlckNoZWNrYm94JykucHJvcCgnY2hlY2tlZCcsIHRydWUpO1xyXG4gICAgJCgnLklmUmVzZWxsZXJFbmFibGUnKS5wcm9wKCdkaXNhYmxlZCcsIGZhbHNlKTtcclxuICAgICQoJyNSZXNlbGxlckJveCcpLnNob3coMTAwKTtcclxuICAgICQoJyNSZXNlbGxlckNUQScpLmhpZGUoMCk7XHJcbiAgICAkKCcuTm9ybWFDbGllbnRUaXRsZScpLmhpZGUoMCk7XHJcbiAgICAkKCcuUmVzZWxsZXJUaXRsZScpLnNob3coMCk7XHJcbn1cclxuXHJcbndpbmRvdy5jbG9zZVJlc2VsbGVyUmVnaXN0cmF0aW9uID0gZnVuY3Rpb24oKVxyXG57XHJcbiAgICAkKCcjSXNSZXNlbGxlckNoZWNrYm94JykucHJvcCgnY2hlY2tlZCcsIGZhbHNlKTtcclxuICAgICQoJy5JZlJlc2VsbGVyRW5hYmxlJykucHJvcCgnZGlzYWJsZWQnLCB0cnVlKTtcclxuICAgICQoJyNSZXNlbGxlckJveCcpLmhpZGUoMCk7XHJcbiAgICAkKCcjUmVzZWxsZXJDVEEnKS5zaG93KDEwMCk7XHJcbiAgICAkKCcuTm9ybWFDbGllbnRUaXRsZScpLnNob3coMCk7XHJcbiAgICAkKCcuUmVzZWxsZXJUaXRsZScpLmhpZGUoMCk7XHJcbn1cclxuXHJcbiQoZG9jdW1lbnQpLnJlYWR5KGZ1bmN0aW9uKCl7XHJcbiAgICAkKCcuR2VvUHJvdlNlbGVjdCcpLm9uKCdjaGFuZ2UnLCBmdW5jdGlvbigpe1xyXG4gICAgICAgIGxldCBwcm92X2lkID0gJCh0aGlzKS52YWwoKTtcclxuICAgICAgICBnZXRHZW9Mb2NzKHByb3ZfaWQpO1xyXG4gICAgfSk7XHJcbn0pO1xyXG5cclxuLypcclxufC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbnwgTUlYIEZVTkNUSU9OU1xyXG58LS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuKi9cclxuXHJcbndpbmRvdy5jbG9zZUVsZW1lbnQgPSBmdW5jdGlvbihzZWxlY3Rvcilcclxue1xyXG4gICAgJChzZWxlY3RvcikuaGlkZSgxMDApO1xyXG59XHJcblxyXG53aW5kb3cuZ2V0UGFyYW0gPSBmdW5jdGlvbihwYXJhbWV0ZXJOYW1lKSB7XHJcbiAgICB2YXIgcmVzdWx0ID0gbnVsbCxcclxuICAgICAgICB0bXAgPSBbXTtcclxuICAgIGxvY2F0aW9uLnNlYXJjaFxyXG4gICAgICAgIC5zdWJzdHIoMSlcclxuICAgICAgICAuc3BsaXQoXCImXCIpXHJcbiAgICAgICAgLmZvckVhY2goZnVuY3Rpb24gKGl0ZW0pIHtcclxuICAgICAgICB0bXAgPSBpdGVtLnNwbGl0KFwiPVwiKTtcclxuICAgICAgICBpZiAodG1wWzBdID09PSBwYXJhbWV0ZXJOYW1lKSByZXN1bHQgPSBkZWNvZGVVUklDb21wb25lbnQodG1wWzFdKTtcclxuICAgICAgICB9KTtcclxuICAgIHJldHVybiByZXN1bHQ7XHJcbn1cclxuXHJcbndpbmRvdy5nZXRQYXJhbXMgPSBmdW5jdGlvbih1cmwpIHtcclxuICAgIHZhciBwYXJhbXMgPSB7fTtcclxuXHR2YXIgcGFyc2VyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYScpO1xyXG5cdHBhcnNlci5ocmVmID0gdXJsO1xyXG5cdHZhciBxdWVyeSA9IHBhcnNlci5zZWFyY2guc3Vic3RyaW5nKDEpO1xyXG5cdHZhciB2YXJzID0gcXVlcnkuc3BsaXQoJyYnKTtcclxuXHRmb3IgKHZhciBpID0gMDsgaSA8IHZhcnMubGVuZ3RoOyBpKyspIHtcclxuXHRcdHZhciBwYWlyID0gdmFyc1tpXS5zcGxpdCgnPScpO1xyXG5cdFx0cGFyYW1zW3BhaXJbMF1dID0gZGVjb2RlVVJJQ29tcG9uZW50KHBhaXJbMV0pO1xyXG5cdH1cclxuXHRyZXR1cm4gcGFyYW1zO1xyXG59XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3Jlc291cmNlcy9hc3NldHMvanMvc3RvcmUvc2NyaXB0cy5qcyJdLCJzb3VyY2VSb290IjoiIn0=