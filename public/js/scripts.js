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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgNDIyYjIyNTdkMTBlYWM1MzJmN2YiLCJ3ZWJwYWNrOi8vLy4vcmVzb3VyY2VzL2Fzc2V0cy9qcy9zdG9yZS9zY3JpcHRzLmpzIl0sIm5hbWVzIjpbIiQiLCJvbiIsInJlbW92ZUNsYXNzIiwia2V5cHJlc3MiLCJlIiwiY29uc29sZSIsImxvZyIsIndoaWNoIiwicHJldmVudERlZmF1bHQiLCJ3aW5kb3ciLCJjb2xsYXBzZUZpbHRlciIsImVsZW0iLCJmaWx0ZXIiLCJzaWJsaW5ncyIsImhhc0NsYXNzIiwic2hvdyIsImh0bWwiLCJhZGRDbGFzcyIsImhpZGUiLCJ2YWx1ZSIsInZhbCIsInF1YW50aXR5IiwibmV3VmFsdWUiLCJuZXdQcmljZVRhcmdldCIsInBhcmVudCIsIm1vZGlmeUNhcnRJdGVtUSIsImNsaWNrIiwiY2hlY2tvdXRTaWRlYmFyIiwic3RhdGUiLCJzaWRlYmFyIiwid3JhcHBlciIsInVuZGVmaW5lZCIsIm9wZW5DaGVja291dERlc2t0b3AiLCJ3aWR0aCIsIm9wZW5GaWx0ZXJzIiwiZmlsdGVycyIsInRyaWdnZXIiLCJzdW1BbGxJdGVtcyIsInN1bSIsImVhY2giLCJpbmRleCIsInBhcnNlSW50Iiwic3VtRGl2cyIsIm9yaWdpbnMiLCJ0YXJnZXQiLCJwYXJzZUZsb2F0IiwidGV4dCIsImNoZWNrVmFyaWFudFN0b2NrIiwiZm9ybSIsImRhdGEiLCJzZXJpYWxpemUiLCJhbGxvd1N1Ym1pdCIsInN1Ym1pdEJ1dHRvbiIsImFqYXgiLCJ1cmwiLCJtZXRob2QiLCJkYXRhVHlwZSIsImFzeW5jIiwic3VjY2VzcyIsInJlc3BvbnNlIiwibWVzc2FnZSIsInByb3AiLCJlcnJvciIsInJlc3BvbnNlVGV4dCIsImxvY2F0aW9uIiwicmVsb2FkIiwic2V0SXRlbXNEYXRhIiwiaXRlbURhdGEiLCJpZCIsInByaWNlIiwidmFyaWFudF9pZCIsIml0ZW0iLCJ0b3RhbCIsInB1c2giLCJhZGRUb0NhcnQiLCJyb3V0ZSIsIm5ld1N0b2NrIiwidG9hc3Rfc3VjY2VzcyIsInVwZGF0ZVRvdGFscyIsInNldFRpbWVvdXQiLCJyZW1vdmVGcm9tQ2FydCIsImNhcnRJdGVtSWQiLCJ2YXJpYW50SWQiLCJkaXYiLCJhY3Rpb24iLCJocmVmIiwic3BsaXQiLCJyZW1vdmUiLCJsb2FkIiwic3VibWl0Q2FydFRvQ2hlY2tvdXQiLCJ0b2FzdF9lcnJvciIsInZhbGlkYXRlQW5kU2V0Q291cG9uIiwiY29kZSIsImNhcnRpZCIsImNvdXBvbkRpdiIsImNvdXBvblNldCIsImJlZm9yZVNlbmQiLCJjb21wbGV0ZSIsImFkZEFydGljbGVUb0ZhdnMiLCJmYXZpZCIsImFydGljbGVpZCIsImRpc3BsYXlCdXR0b24iLCJmYXZfaWQiLCJhcnRpY2xlX2lkIiwicmVzdWx0Iiwic2V0RmF2c1RvdGFsSWNvbiIsImZhdnNDb3VudCIsImZhdnMiLCJyZW1vdmVBcnRpY2xlRnJvbUZhdnMiLCJkb2FjdGlvbiIsInJlbW92ZUFsbEFydGljbGVzRnJvbUZhdnMiLCJjdXN0b21lcmlkIiwiY3VzdG9tZXJfaWQiLCJvcGVuUmVzZWxsZXJSZWdpc3RyYXRpb24iLCJjbG9zZVJlc2VsbGVyUmVnaXN0cmF0aW9uIiwiZG9jdW1lbnQiLCJyZWFkeSIsInByb3ZfaWQiLCJnZXRHZW9Mb2NzIiwiY2xvc2VFbGVtZW50Iiwic2VsZWN0b3IiLCJnZXRQYXJhbSIsInBhcmFtZXRlck5hbWUiLCJ0bXAiLCJzZWFyY2giLCJzdWJzdHIiLCJmb3JFYWNoIiwiZGVjb2RlVVJJQ29tcG9uZW50IiwiZ2V0UGFyYW1zIiwicGFyYW1zIiwicGFyc2VyIiwiY3JlYXRlRWxlbWVudCIsInF1ZXJ5Iiwic3Vic3RyaW5nIiwidmFycyIsImkiLCJsZW5ndGgiLCJwYWlyIl0sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUEyQiwwQkFBMEIsRUFBRTtBQUN2RCx5Q0FBaUMsZUFBZTtBQUNoRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4REFBc0QsK0RBQStEOztBQUVySDtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7QUM3REE7QUFDQTtBQUNBQSxFQUFFLG1CQUFGLEVBQXVCQyxFQUF2QixDQUEwQixRQUExQixFQUFvQyxZQUFZO0FBQzVDRCxNQUFFLGNBQUYsRUFBa0JFLFdBQWxCLENBQThCLFFBQTlCO0FBQ0EsV0FBTyxJQUFQO0FBQ0gsQ0FIRDs7QUFLQUYsRUFBRSxtQkFBRixFQUF1QkMsRUFBdkIsQ0FBMEIsUUFBMUIsRUFBb0MsWUFBWTtBQUM1Q0QsTUFBRSxjQUFGLEVBQWtCRSxXQUFsQixDQUE4QixRQUE5QjtBQUNBLFdBQU8sSUFBUDtBQUNILENBSEQ7O0FBS0FGLEVBQUUsOEJBQUYsRUFBa0NHLFFBQWxDLENBQTJDLFVBQVVDLENBQVYsRUFBYTtBQUNwREMsWUFBUUMsR0FBUixDQUFZLE9BQVo7QUFDQSxRQUFJRixFQUFFRyxLQUFGLElBQVcsRUFBZixFQUFtQixPQUFPLEtBQVA7QUFDbkIsUUFBSUgsRUFBRUcsS0FBRixJQUFXLEVBQWYsRUFBbUJILEVBQUVJLGNBQUY7QUFDdEIsQ0FKRDs7QUFNQTtBQUNBOztBQUVBQyxPQUFPQyxjQUFQLEdBQXdCLFVBQVNDLElBQVQsRUFBZTtBQUNuQyxRQUFNQyxTQUFTRCxLQUFLRSxRQUFMLENBQWMsSUFBZCxDQUFmO0FBQ0EsUUFBR0QsT0FBT0UsUUFBUCxDQUFnQixXQUFoQixDQUFILEVBQ0E7QUFDSUYsZUFBT1YsV0FBUCxDQUFtQixXQUFuQjtBQUNBVSxlQUFPRyxJQUFQLENBQVksR0FBWjtBQUNBSixhQUFLSyxJQUFMLENBQVUsR0FBVjtBQUNILEtBTEQsTUFPQTtBQUNJSixlQUFPSyxRQUFQLENBQWdCLFdBQWhCO0FBQ0FMLGVBQU9NLElBQVAsQ0FBWSxHQUFaO0FBQ0FQLGFBQUtLLElBQUwsQ0FBVSxHQUFWO0FBQ0g7QUFDSixDQWREOztBQWlCQTtBQUNBO0FBQ0FoQixFQUFFLFlBQUYsRUFBZ0JDLEVBQWhCLENBQW1CLGNBQW5CLEVBQW1DLFlBQVk7QUFDM0M7QUFDQSxRQUFJa0IsUUFBUW5CLEVBQUUsSUFBRixFQUFRYSxRQUFSLENBQWlCLGVBQWpCLEVBQWtDTyxHQUFsQyxFQUFaO0FBQ0E7QUFDQSxRQUFJQyxXQUFXckIsRUFBRSxJQUFGLEVBQVFvQixHQUFSLEVBQWY7QUFDQTtBQUNBLFFBQUlFLFdBQVlILFFBQVFFLFFBQXhCO0FBQ0E7QUFDQSxRQUFJRSxpQkFBaUJ2QixFQUFFLElBQUYsRUFBUXdCLE1BQVIsR0FBaUJBLE1BQWpCLEdBQTBCQSxNQUExQixHQUFtQ1gsUUFBbkMsQ0FBNEMsaUJBQTVDLENBQXJCOztBQUVBUixZQUFRQyxHQUFSLENBQVlhLEtBQVosRUFBbUJFLFFBQW5CLEVBQTZCQyxRQUE3QjtBQUNBRyxvQkFBZ0J6QixFQUFFLElBQUYsQ0FBaEIsRUFBeUJ1QixjQUF6QixFQUF5Q0QsUUFBekM7QUFDSCxDQVpEOztBQWNBLFNBQVNHLGVBQVQsQ0FBeUJyQixDQUF6QixFQUE0Qm1CLGNBQTVCLEVBQTRDRCxRQUE1QyxFQUFzRDtBQUNsRGxCLE1BQUVTLFFBQUYsQ0FBVyxZQUFYLEVBQXlCWCxXQUF6QixDQUFxQyxRQUFyQztBQUNBcUIsbUJBQWVQLElBQWYsQ0FBb0IsT0FBT00sUUFBM0I7QUFDSDs7QUFHRHRCLEVBQUUsY0FBRixFQUFrQjBCLEtBQWxCLENBQXdCLFlBQVU7QUFDOUJDLG9CQUFnQixNQUFoQjtBQUNILENBRkQ7QUFHQTtBQUNBO0FBQ0FsQixPQUFPa0IsZUFBUCxHQUF5QixVQUFVQyxLQUFWLEVBQWlCOztBQUV0QyxRQUFNQyxVQUFVN0IsRUFBRSxlQUFGLENBQWhCO0FBQ0EsUUFBTThCLFVBQVU5QixFQUFFLGVBQUYsQ0FBaEI7O0FBRUEsUUFBTWUsT0FBTyxTQUFQQSxJQUFPLEdBQVk7QUFDckJjLGdCQUFRWixRQUFSLENBQWlCLFFBQWpCO0FBQ0FhLGdCQUFRYixRQUFSLENBQWlCLGVBQWpCO0FBQ0gsS0FIRDs7QUFLQSxRQUFNQyxPQUFPLFNBQVBBLElBQU8sR0FBWTtBQUNyQlcsZ0JBQVEzQixXQUFSLENBQW9CLFFBQXBCO0FBQ0E0QixnQkFBUTVCLFdBQVIsQ0FBb0IsZUFBcEI7QUFDSCxLQUhEOztBQU1BLFFBQUkwQixTQUFTRyxTQUFiLEVBQXdCO0FBQ3BCLFlBQUlGLFFBQVFmLFFBQVIsQ0FBaUIsUUFBakIsQ0FBSixFQUFnQztBQUM1Qkk7QUFDSCxTQUZELE1BRU87QUFDSEg7QUFDSDtBQUNKLEtBTkQsTUFNTyxJQUFJYSxTQUFTLE1BQWIsRUFBcUI7QUFDeEJiO0FBQ0EsZUFBTyxLQUFQO0FBQ0gsS0FITSxNQUdBLElBQUlhLFNBQVMsTUFBYixFQUFxQjtBQUN4QlY7QUFDQSxlQUFPLEtBQVA7QUFDSDtBQUNKLENBN0JEOztBQWlDQVQsT0FBT3VCLG1CQUFQLEdBQTZCLFlBQzdCO0FBQ0ksUUFBSWhDLEVBQUVTLE1BQUYsRUFBVXdCLEtBQVYsS0FBb0IsR0FBeEIsRUFBNkI7QUFDekJOLHdCQUFnQixNQUFoQjtBQUNIO0FBQ0QsV0FBTyxLQUFQO0FBQ0gsQ0FORDs7QUFRQWxCLE9BQU95QixXQUFQLEdBQXFCLFlBQVk7QUFDN0IsUUFBTUMsVUFBVW5DLEVBQUUsZ0JBQUYsQ0FBaEI7QUFDQSxRQUFNb0MsVUFBVXBDLEVBQUUsdUJBQUYsQ0FBaEI7QUFDQSxRQUFHbUMsUUFBUXJCLFFBQVIsQ0FBaUIsUUFBakIsQ0FBSCxFQUNBO0FBQ0lxQixnQkFBUWpDLFdBQVIsQ0FBb0IsUUFBcEI7QUFDQWtDLGdCQUFRckIsSUFBUjtBQUNILEtBSkQsTUFNQTtBQUNJb0IsZ0JBQVFsQixRQUFSLENBQWlCLFFBQWpCO0FBQ0FtQixnQkFBUWxCLElBQVI7QUFDSDtBQUVKLENBZEQ7O0FBaUJBOzs7Ozs7QUFPQVQsT0FBTzRCLFdBQVAsR0FBcUIsWUFBWTtBQUM3QkMsVUFBTSxDQUFOO0FBQ0F0QyxNQUFFLGlCQUFGLEVBQXFCdUMsSUFBckIsQ0FBMEIsVUFBVUMsS0FBVixFQUFpQjtBQUN2Q0YsZUFBT0csU0FBU3pDLEVBQUUsSUFBRixFQUFRZ0IsSUFBUixFQUFULENBQVA7QUFDSCxLQUZEO0FBR0FoQixNQUFFLFdBQUYsRUFBZWdCLElBQWYsQ0FBb0JzQixHQUFwQjtBQUNILENBTkQ7O0FBU0E7QUFDQTdCLE9BQU9pQyxPQUFQLEdBQWlCLFVBQVVDLE9BQVYsRUFBbUJDLE1BQW5CLEVBQTJCO0FBQ3hDLFFBQUlOLE1BQU0sQ0FBVjtBQUNBSyxZQUFRSixJQUFSLENBQWEsWUFBWTtBQUNyQkQsZUFBT08sV0FBVzdDLEVBQUUsSUFBRixFQUFROEMsSUFBUixFQUFYLENBQVA7QUFDSCxLQUZEO0FBR0FGLFdBQU9FLElBQVAsQ0FBWVIsR0FBWjtBQUNILENBTkQ7O0FBU0E7QUFDQTtBQUNBN0IsT0FBT3NDLGlCQUFQLEdBQTJCLFlBQVc7QUFDbEMsUUFBSUMsT0FBT2hELEVBQUUsZ0JBQUYsQ0FBWDtBQUNBLFFBQUlpRCxPQUFPRCxLQUFLRSxTQUFMLEVBQVg7QUFDQSxRQUFJQyxjQUFjLEtBQWxCO0FBQ0EsUUFBSUMsZUFBZ0JwRCxFQUFFLG1CQUFGLENBQXBCO0FBQ0FBLE1BQUVxRCxJQUFGLENBQU87QUFDSEMsYUFBS04sS0FBS0MsSUFBTCxDQUFVLE9BQVYsQ0FERjtBQUVITSxnQkFBUSxLQUZMO0FBR0hDLGtCQUFVLE1BSFA7QUFJSEMsZUFBTyxLQUpKO0FBS0hSLGNBQU1BLElBTEg7QUFNSFMsaUJBQVMsaUJBQVVULElBQVYsRUFBZ0I7QUFDckIsZ0JBQUdBLEtBQUtVLFFBQUwsSUFBaUIsSUFBcEIsRUFDQTtBQUNJLG9CQUFHVixLQUFLVyxPQUFMLElBQWdCLEdBQW5CLEVBQ0k7QUFDSTVELHNCQUFFLGlCQUFGLEVBQXFCZ0IsSUFBckIsQ0FBMEIseUJBQTFCO0FBQ0FvQyxpQ0FBYVMsSUFBYixDQUFrQixVQUFsQixFQUE4QixJQUE5QjtBQUNILGlCQUpMLE1BTUk7QUFDSTtBQUNBN0Qsc0JBQUUsaUJBQUYsRUFBcUJnQixJQUFyQixDQUEwQix1QkFBdUJpQyxLQUFLVyxPQUF0RDtBQUNBUixpQ0FBYVMsSUFBYixDQUFrQixVQUFsQixFQUE4QixLQUE5QjtBQUNBVixrQ0FBYyxJQUFkO0FBQ0E7QUFDSDtBQUNMbkQsa0JBQUUsY0FBRixFQUFrQjZELElBQWxCLENBQXVCLEtBQXZCLEVBQThCWixLQUFLVyxPQUFuQztBQUNILGFBaEJELE1Ba0JBO0FBQ0k7QUFDQTtBQUNBNUQsa0JBQUUsaUJBQUYsRUFBcUJnQixJQUFyQixDQUEwQmlDLEtBQUtXLE9BQS9CO0FBQ0FSLDZCQUFhUyxJQUFiLENBQWtCLFVBQWxCLEVBQThCLElBQTlCO0FBQ0g7QUFDSixTQS9CRTtBQWdDSEMsZUFBTyxlQUFVYixJQUFWLEVBQWdCO0FBQ25CakQsY0FBRSxRQUFGLEVBQVlnQixJQUFaLENBQWlCaUMsS0FBS2MsWUFBdEI7QUFDQUMscUJBQVNDLE1BQVQ7QUFDQWQsMEJBQWMsS0FBZDtBQUNBQyx5QkFBYVMsSUFBYixDQUFrQixVQUFsQixFQUE4QixJQUE5QjtBQUNBeEQsb0JBQVFDLEdBQVIsQ0FBWTJDLElBQVo7QUFDQTVDLG9CQUFRQyxHQUFSLENBQVksa0JBQVo7QUFDSDtBQXZDRSxLQUFQO0FBeUNBLFdBQU82QyxXQUFQO0FBQ0gsQ0EvQ0Q7O0FBaURBO0FBQ0E7QUFDQTFDLE9BQU95RCxZQUFQLEdBQXNCLFlBQVk7QUFDOUJDLGVBQVcsRUFBWDs7QUFFQW5FLE1BQUUsWUFBRixFQUFnQnVDLElBQWhCLENBQXFCLFlBQVk7QUFDN0IsWUFBSTZCLEtBQUtwRSxFQUFFLElBQUYsRUFBUWlELElBQVIsQ0FBYSxJQUFiLENBQVQ7QUFDQSxZQUFJb0IsUUFBUXJFLEVBQUUsSUFBRixFQUFRaUQsSUFBUixDQUFhLE9BQWIsQ0FBWjtBQUNBLFlBQUlxQixhQUFhdEUsRUFBRSxJQUFGLEVBQVFpRCxJQUFSLENBQWEsU0FBYixDQUFqQjtBQUNBLFlBQUk1QixXQUFXckIsRUFBRSxJQUFGLEVBQVFvQixHQUFSLEVBQWY7O0FBRUFtRCxlQUFPLEVBQVA7QUFDQUEsYUFBSyxJQUFMLElBQWFILEVBQWI7QUFDQUcsYUFBSyxZQUFMLElBQXFCRCxVQUFyQjtBQUNBQyxhQUFLLE9BQUwsSUFBZ0JGLEtBQWhCO0FBQ0FFLGFBQUssVUFBTCxJQUFtQmxELFFBQW5CO0FBQ0E7QUFDQW1ELGdCQUFRSCxRQUFRaEQsUUFBaEI7QUFDQXJCLFVBQUUsTUFBTW9FLEVBQU4sR0FBVyxpQkFBYixFQUFnQ3BELElBQWhDLENBQXFDd0QsS0FBckM7O0FBRUFMLGlCQUFTTSxJQUFULENBQWNGLElBQWQ7QUFDSCxLQWhCRDtBQWlCQTtBQUNBO0FBQ0FsQztBQUNBckMsTUFBRSxhQUFGLEVBQWlCb0IsR0FBakIsQ0FBcUIrQyxRQUFyQjtBQUNILENBeEJEOztBQTBCQTtBQUNBO0FBQ0ExRCxPQUFPaUUsU0FBUCxHQUFtQixVQUFVQyxLQUFWLEVBQWlCMUIsSUFBakIsRUFBdUI7QUFDdENqRCxNQUFFcUQsSUFBRixDQUFPO0FBQ0hDLGFBQUtxQixLQURGO0FBRUhwQixnQkFBUSxNQUZMO0FBR0hDLGtCQUFVLE1BSFA7QUFJSFAsY0FBTUEsSUFKSDtBQUtIUyxpQkFBUyxpQkFBVVQsSUFBVixFQUFnQjtBQUNyQjtBQUNBLGdCQUFJQSxLQUFLVSxRQUFMLElBQWlCLFNBQXJCLEVBQWdDO0FBQzVCO0FBQ0EzRCxrQkFBRSxpQkFBRixFQUFxQmdCLElBQXJCLENBQTBCLHVCQUF1QmlDLEtBQUsyQixRQUF0RDtBQUNBQyw4QkFBYyxLQUFkLEVBQXFCNUIsS0FBS1csT0FBMUIsRUFBbUMsY0FBbkMsRUFBbUQsRUFBbkQsRUFBdUQsSUFBdkQ7QUFDQWtCO0FBQ0FaO0FBQ0FhLDJCQUFXLFlBQVk7QUFDbkJiO0FBQ0E3QjtBQUNBO0FBQ0gsaUJBSkQsRUFJRyxHQUpIO0FBS0gsYUFYRCxNQVdPLElBQUlZLEtBQUtVLFFBQUwsSUFBaUIsU0FBckIsRUFBZ0M7QUFDbkNrQiw4QkFBYyxNQUFkLEVBQXNCNUIsS0FBS1csT0FBM0IsRUFBb0MsY0FBcEM7QUFDSDtBQUNKLFNBckJFO0FBc0JIRSxlQUFPLGVBQVViLElBQVYsRUFBZ0I7QUFDbkJqRCxjQUFFLFFBQUYsRUFBWWdCLElBQVosQ0FBaUJpQyxLQUFLYyxZQUF0QjtBQUNBMUQsb0JBQVFDLEdBQVIsQ0FBWSxzQkFBWjtBQUNBO0FBQ0FELG9CQUFRQyxHQUFSLENBQVkyQyxJQUFaO0FBQ0g7QUEzQkUsS0FBUDtBQTZCSCxDQTlCRDs7QUFrQ0E7QUFDQTtBQUNBeEMsT0FBT3VFLGNBQVAsR0FBd0IsVUFBVUwsS0FBVixFQUFpQk0sVUFBakIsRUFBNkJDLFNBQTdCLEVBQXdDN0QsUUFBeEMsRUFBa0Q4RCxHQUFsRCxFQUF1REMsTUFBdkQsRUFBK0Q7QUFDbkZwRixNQUFFcUQsSUFBRixDQUFPO0FBQ0hDLGFBQUtxQixLQURGO0FBRUhwQixnQkFBUSxNQUZMO0FBR0hDLGtCQUFVLE1BSFA7QUFJSFAsY0FBTSxFQUFFZ0MsWUFBWUEsVUFBZCxFQUEwQkMsV0FBV0EsU0FBckMsRUFBZ0Q3RCxVQUFVQSxRQUExRCxFQUFvRStELFFBQVFBLE1BQTVFLEVBQW9GN0IsUUFBUSxNQUE1RixFQUpIO0FBS0hHLGlCQUFTLGlCQUFVVCxJQUFWLEVBQWdCO0FBQ3JCLGdCQUFJQSxLQUFLVSxRQUFMLElBQWlCLGNBQXJCLEVBQXFDO0FBQ2pDO0FBQ0FtQjtBQUNBckUsdUJBQU91RCxRQUFQLEdBQWtCdkQsT0FBT3VELFFBQVAsQ0FBZ0JxQixJQUFoQixDQUFxQkMsS0FBckIsQ0FBMkIsR0FBM0IsRUFBZ0MsQ0FBaEMsQ0FBbEI7QUFDQXBCO0FBQ0gsYUFMRCxNQUtPLElBQUlqQixLQUFLVSxRQUFMLElBQWlCLFNBQXJCLEVBQWdDO0FBQ25DM0Qsa0JBQUVtRixHQUFGLEVBQU9qRSxJQUFQLENBQVksR0FBWjtBQUNBbEIsa0JBQUVtRixHQUFGLEVBQU9JLE1BQVA7QUFDQVQ7QUFDQVo7QUFDSDtBQUNKLFNBakJFO0FBa0JISixlQUFPLGVBQVViLElBQVYsRUFBZ0I7QUFDbkI7QUFDQTVDLG9CQUFRQyxHQUFSLENBQVksMkJBQVo7QUFDQUQsb0JBQVFDLEdBQVIsQ0FBWTJDLElBQVo7QUFDQTtBQUNBZSxxQkFBU0MsTUFBVDtBQUNIO0FBeEJFLEtBQVA7QUEwQkgsQ0EzQkQ7O0FBNkJBLFNBQVNhLFlBQVQsR0FBd0I7QUFDcEI7QUFDQTlFLE1BQUUsMEJBQUYsRUFBOEJ3RixJQUE5QixDQUFtQy9FLE9BQU91RCxRQUFQLENBQWdCcUIsSUFBaEIsR0FBdUIsMkJBQTFEO0FBQ0FyRixNQUFFLDZCQUFGLEVBQWlDd0YsSUFBakMsQ0FBc0MvRSxPQUFPdUQsUUFBUCxDQUFnQnFCLElBQWhCLEdBQXVCLDhCQUE3RDtBQUNBckYsTUFBRSxpQkFBRixFQUFxQndGLElBQXJCLENBQTBCL0UsT0FBT3VELFFBQVAsQ0FBZ0JxQixJQUFoQixHQUF1QixrQkFBakQ7QUFDQXJGLE1BQUUsd0JBQUYsRUFBNEJ3RixJQUE1QixDQUFpQy9FLE9BQU91RCxRQUFQLENBQWdCcUIsSUFBaEIsR0FBdUIseUJBQXhEO0FBQ0FyRixNQUFFLGVBQUYsRUFBbUJ3RixJQUFuQixDQUF3Qi9FLE9BQU91RCxRQUFQLENBQWdCcUIsSUFBaEIsR0FBdUIsZ0JBQS9DO0FBQ0FyRixNQUFFLGlCQUFGLEVBQXFCd0YsSUFBckIsQ0FBMEIvRSxPQUFPdUQsUUFBUCxDQUFnQnFCLElBQWhCLEdBQXVCLGtCQUFqRDtBQUNIOztBQUVEO0FBQ0E7QUFDQTVFLE9BQU9nRixvQkFBUCxHQUE4QixVQUFVZCxLQUFWLEVBQWlCL0IsTUFBakIsRUFBeUJLLElBQXpCLEVBQStCbUMsTUFBL0IsRUFBdUM7QUFDakU7QUFDQXBGLE1BQUVxRCxJQUFGLENBQU87QUFDSEMsYUFBS3FCLEtBREY7QUFFSHBCLGdCQUFRLE1BRkw7QUFHSEMsa0JBQVUsTUFIUDtBQUlIUCxjQUFNLEVBQUVBLFVBQUYsRUFBUW1DLFFBQVFBLE1BQWhCLEVBSkg7QUFLSDFCLGlCQUFTLGlCQUFVVCxJQUFWLEVBQWdCO0FBQ3JCNUMsb0JBQVFDLEdBQVIsQ0FBWTJDLElBQVo7QUFDQSxnQkFBSUEsS0FBS1UsUUFBTCxJQUFpQixTQUFyQixFQUFnQztBQUM1QnRELHdCQUFRQyxHQUFSLENBQVlzQyxNQUFaO0FBQ0Esb0JBQUlBLFVBQVUsUUFBZCxFQUF3QjtBQUNwQjtBQUNBbkMsMkJBQU91RCxRQUFQLEdBQWtCdkQsT0FBT3VELFFBQVAsQ0FBZ0JxQixJQUFoQixDQUFxQkMsS0FBckIsQ0FBMkIsR0FBM0IsRUFBZ0MsQ0FBaEMsSUFBcUMsY0FBdkQ7QUFDSCxpQkFIRCxNQUdPO0FBQ0g3RSwyQkFBT3VELFFBQVAsQ0FBZ0JxQixJQUFoQixHQUF1QnpDLE1BQXZCO0FBQ0g7QUFDSixhQVJELE1BUU87QUFDSHZDLHdCQUFRQyxHQUFSLENBQVkscUJBQVo7QUFDQUQsd0JBQVFDLEdBQVIsQ0FBWTJDLElBQVo7QUFDQXlDLDRCQUFZLEVBQVosRUFBZ0J6QyxLQUFLVyxPQUFyQixFQUE4QixjQUE5QixFQUE4QyxFQUE5QztBQUNBNUQsa0JBQUUscUJBQUYsRUFBeUJnQixJQUF6QixDQUE4QmlDLEtBQUtXLE9BQW5DO0FBQ0E7QUFDSDtBQUNEO0FBQ0gsU0F2QkU7QUF3QkhFLGVBQU8sZUFBVWIsSUFBVixFQUFnQjtBQUNuQjtBQUNBNUMsb0JBQVFDLEdBQVIsQ0FBWSx1QkFBWjtBQUNBMEQscUJBQVNDLE1BQVQ7QUFDQTVELG9CQUFRQyxHQUFSLENBQVkyQyxJQUFaO0FBQ0E7QUFDSDtBQTlCRSxLQUFQO0FBZ0NILENBbENEOztBQW9DQTtBQUNBO0FBQ0F4QyxPQUFPa0Ysb0JBQVAsR0FBOEIsVUFBVWhCLEtBQVYsRUFBaUJpQixJQUFqQixFQUF1QkMsTUFBdkIsRUFBK0I7QUFDekQsUUFBSUMsWUFBWTlGLEVBQUUsWUFBRixDQUFoQjtBQUNBLFFBQUkrRixZQUFZL0YsRUFBRSxlQUFGLENBQWhCO0FBQ0FLLFlBQVFDLEdBQVIsQ0FBWXNGLElBQVosRUFBa0JDLE1BQWxCO0FBQ0E3RixNQUFFcUQsSUFBRixDQUFPO0FBQ0hDLGFBQUtxQixLQURGO0FBRUhwQixnQkFBUSxNQUZMO0FBR0hDLGtCQUFVLE1BSFA7QUFJSFAsY0FBTSxFQUFFMkMsTUFBTUEsSUFBUixFQUFjQyxRQUFRQSxNQUF0QixFQUpIO0FBS0hHLG9CQUFZLHNCQUFZO0FBQ3BCM0Ysb0JBQVFDLEdBQVIsQ0FBWSxzQkFBWjtBQUNBTixjQUFFLGVBQUYsRUFBbUJFLFdBQW5CLENBQStCLFFBQS9CO0FBQ0gsU0FSRTtBQVNId0QsaUJBQVMsaUJBQVVULElBQVYsRUFBZ0I7QUFDckIsZ0JBQUlBLEtBQUtVLFFBQUwsSUFBaUIsSUFBckIsRUFBMkI7QUFDdkIzRCxrQkFBRSwwQkFBRixFQUE4QmdCLElBQTlCLENBQW1DLGtCQUFuQztBQUNBOEUsMEJBQVU1RSxJQUFWLENBQWUsR0FBZixFQUFvQixZQUFZO0FBQzVCNkUsOEJBQVU3RixXQUFWLENBQXNCLFFBQXRCO0FBQ0gsaUJBRkQ7QUFHQThELHlCQUFTQyxNQUFUO0FBQ0gsYUFORCxNQU1PLElBQUloQixLQUFLVSxRQUFMLElBQWlCLElBQXJCLEVBQTJCO0FBQzlCM0Qsa0JBQUUsMEJBQUYsRUFBOEJnQixJQUE5QixDQUFtQ2lDLEtBQUtXLE9BQXhDO0FBQ0g7QUFDSixTQW5CRTtBQW9CSEUsZUFBTyxlQUFVYixJQUFWLEVBQWdCO0FBQ25CakQsY0FBRSwwQkFBRixFQUE4QmdCLElBQTlCLENBQW1DaUMsS0FBS2MsWUFBeEM7QUFDQTFELG9CQUFRQyxHQUFSLENBQVkyQyxJQUFaO0FBQ0gsU0F2QkU7QUF3QkhnRCxrQkFBVSxvQkFBWTtBQUNsQmpHLGNBQUUsZUFBRixFQUFtQmlCLFFBQW5CLENBQTRCLFFBQTVCO0FBQ0g7QUExQkUsS0FBUDtBQTRCSCxDQWhDRDs7QUFrQ0E7QUFDQTtBQUNBUixPQUFPeUYsZ0JBQVAsR0FBMEIsVUFBVXZCLEtBQVYsRUFBaUJ3QixLQUFqQixFQUF3QkMsU0FBeEIsRUFBbUNoQixNQUFuQyxFQUEyQ2lCLGFBQTNDLEVBQTBEO0FBQ2hGckcsTUFBRXFELElBQUYsQ0FBTztBQUNIQyxhQUFLcUIsS0FERjtBQUVIcEIsZ0JBQVEsTUFGTDtBQUdIQyxrQkFBVSxNQUhQO0FBSUhQLGNBQU0sRUFBRXFELFFBQVFILEtBQVYsRUFBaUJJLFlBQVlILFNBQTdCLEVBSkg7QUFLSDFDLGlCQUFTLGlCQUFVVCxJQUFWLEVBQWdCO0FBQ3JCLGdCQUFJQSxLQUFLVSxRQUFMLElBQWlCLElBQWpCLElBQXlCVixLQUFLdUQsTUFBTCxJQUFlLE9BQTVDLEVBQXFEO0FBQ2pELHdCQUFRcEIsTUFBUjtBQUNJLHlCQUFLLFFBQUw7QUFDSXBCLGlDQUFTQyxNQUFUO0FBQ0E7QUFDSix5QkFBSyxNQUFMO0FBQ0lvQyxzQ0FBY25HLFdBQWQsQ0FBMEIsZ0JBQTFCO0FBQ0FtRyxzQ0FBY3BGLFFBQWQsQ0FBdUIsZ0JBQXZCO0FBQ0E0RCxzQ0FBYyxLQUFkLEVBQXFCLCtCQUFyQixFQUFzRCxjQUF0RCxFQUFzRSxFQUF0RSxFQUEwRSxJQUExRTtBQUNBO0FBQ0oseUJBQUssTUFBTDtBQUNJeEUsZ0NBQVFDLEdBQVIsQ0FBWSwwQkFBWjtBQUNKO0FBQ0lELGdDQUFRQyxHQUFSLENBQVksZUFBWjtBQUNBO0FBYlI7QUFlSCxhQWhCRCxNQWdCTyxJQUFJMkMsS0FBS1UsUUFBTCxJQUFpQixJQUFqQixJQUF5QlYsS0FBS3VELE1BQUwsSUFBZSxTQUE1QyxFQUF1RDtBQUMxREgsOEJBQWNwRixRQUFkLENBQXVCLGdCQUF2QjtBQUNBb0YsOEJBQWNuRyxXQUFkLENBQTBCLGdCQUExQjtBQUNBMkUsOEJBQWMsS0FBZCxFQUFxQixpQ0FBckIsRUFBd0QsY0FBeEQsRUFBd0UsRUFBeEUsRUFBNEUsSUFBNUU7QUFDSDtBQUNENEIsNkJBQWlCeEQsS0FBS3lELFNBQXRCO0FBQ0gsU0E1QkU7QUE2Qkg1QyxlQUFPLGVBQVViLElBQVYsRUFBZ0I7QUFDbkJqRCxjQUFFLFFBQUYsRUFBWWdCLElBQVosQ0FBaUJpQyxLQUFLYyxZQUF0QjtBQUNBMUQsb0JBQVFDLEdBQVIsQ0FBWTJDLElBQVo7QUFDSDtBQWhDRSxLQUFQO0FBa0NILENBbkNEOztBQXFDQSxTQUFTd0QsZ0JBQVQsQ0FBMEJFLElBQTFCLEVBQWdDO0FBQzVCLFFBQUlBLE9BQU8sQ0FBWCxFQUFjO0FBQ1YzRyxVQUFFLGNBQUYsRUFBa0JFLFdBQWxCLENBQThCLEtBQTlCO0FBQ0FGLFVBQUUsY0FBRixFQUFrQmlCLFFBQWxCLENBQTJCLElBQTNCO0FBQ0gsS0FIRCxNQUdPLElBQUkwRixRQUFRLENBQVosRUFBZTtBQUNsQjNHLFVBQUUsY0FBRixFQUFrQkUsV0FBbEIsQ0FBOEIsSUFBOUI7QUFDQUYsVUFBRSxjQUFGLEVBQWtCaUIsUUFBbEIsQ0FBMkIsS0FBM0I7QUFDSCxLQUhNLE1BR0E7QUFDSGpCLFVBQUUsY0FBRixFQUFrQkUsV0FBbEIsQ0FBOEIsSUFBOUI7QUFDQUYsVUFBRSxjQUFGLEVBQWtCRSxXQUFsQixDQUE4QixLQUE5QjtBQUNBRixVQUFFLGNBQUYsRUFBa0JpQixRQUFsQixDQUEyQixJQUEzQjtBQUNBWixnQkFBUUMsR0FBUixDQUFZLDZCQUFaO0FBQ0g7QUFDSjs7QUFFREcsT0FBT21HLHFCQUFQLEdBQStCLFVBQVVqQyxLQUFWLEVBQWlCd0IsS0FBakIsRUFBd0JmLE1BQXhCLEVBQWdDO0FBQzNELFFBQUl5QixXQUFXekIsTUFBZjtBQUNBcEYsTUFBRXFELElBQUYsQ0FBTztBQUNIQyxhQUFLcUIsS0FERjtBQUVIcEIsZ0JBQVEsTUFGTDtBQUdIQyxrQkFBVSxNQUhQO0FBSUhQLGNBQU0sRUFBRXFELFFBQVFILEtBQVYsRUFKSDtBQUtIekMsaUJBQVMsaUJBQVVULElBQVYsRUFBZ0I7QUFDckJqRCxjQUFFLFFBQUYsRUFBWWdCLElBQVosQ0FBaUJpQyxLQUFLYyxZQUF0QjtBQUNBMUQsb0JBQVFDLEdBQVIsQ0FBWTJDLElBQVo7QUFDQSxnQkFBSUEsS0FBS1UsUUFBTCxJQUFpQixJQUFyQixFQUEyQjtBQUN2QnRELHdCQUFRQyxHQUFSLENBQVl1RyxRQUFaO0FBQ0Esd0JBQVFBLFFBQVI7QUFDSSx5QkFBSyxRQUFMO0FBQ0ksNEJBQUl6QixTQUFTLFFBQWI7QUFDQVAsc0NBQWMsS0FBZCxFQUFxQixpQ0FBckIsRUFBd0QsY0FBeEQsRUFBd0VPLE1BQXhFLEVBQWdGLElBQWhGO0FBQ0E7QUFDSjtBQUNJL0UsZ0NBQVFDLEdBQVIsQ0FBWSxlQUFaO0FBQ0E7QUFQUjtBQVNILGFBWEQsTUFXTztBQUNIO0FBQ0FELHdCQUFRQyxHQUFSLENBQVkyQyxJQUFaO0FBQ0g7QUFDSixTQXZCRTtBQXdCSGEsZUFBTyxlQUFVYixJQUFWLEVBQWdCO0FBQ25CO0FBQ0E1QyxvQkFBUUMsR0FBUixDQUFZMkMsSUFBWjtBQUNIO0FBM0JFLEtBQVA7QUE2QkgsQ0EvQkQ7O0FBaUNBeEMsT0FBT3FHLHlCQUFQLEdBQW1DLFVBQVVuQyxLQUFWLEVBQWlCb0MsVUFBakIsRUFBNkIzQixNQUE3QixFQUFxQztBQUNwRXBGLE1BQUVxRCxJQUFGLENBQU87QUFDSEMsYUFBS3FCLEtBREY7QUFFSHBCLGdCQUFRLE1BRkw7QUFHSEMsa0JBQVUsTUFIUDtBQUlIUCxjQUFNLEVBQUUrRCxhQUFhRCxVQUFmLEVBSkg7QUFLSHJELGlCQUFTLGlCQUFVVCxJQUFWLEVBQWdCO0FBQ3JCNUMsb0JBQVFDLEdBQVIsQ0FBWTJDLElBQVo7QUFDQTtBQUNBLGdCQUFJQSxLQUFLVSxRQUFMLElBQWlCLElBQXJCLEVBQTJCO0FBQ3ZCLHdCQUFReUIsTUFBUjtBQUNJLHlCQUFLLFFBQUw7QUFDSXBCLGlDQUFTQyxNQUFUO0FBQ0E7QUFDSjtBQUNJNUQsZ0NBQVFDLEdBQVIsQ0FBWSxlQUFaO0FBQ0E7QUFOUjtBQVFILGFBVEQsTUFTTztBQUNITixrQkFBRSxRQUFGLEVBQVlnQixJQUFaLENBQWlCaUMsS0FBS1csT0FBTCxDQUFhLFdBQWIsQ0FBakI7QUFDQXZELHdCQUFRQyxHQUFSLENBQVkyQyxJQUFaO0FBQ0g7QUFDSixTQXJCRTtBQXNCSGEsZUFBTyxlQUFVYixJQUFWLEVBQWdCO0FBQ25CO0FBQ0E1QyxvQkFBUUMsR0FBUixDQUFZMkMsSUFBWjtBQUNIO0FBekJFLEtBQVA7QUEyQkgsQ0E1QkQ7O0FBOEJBOzs7Ozs7QUFNQWpELEVBQUUsY0FBRixFQUFrQmtCLElBQWxCOztBQUVBVCxPQUFPd0csd0JBQVAsR0FBa0MsWUFDbEM7QUFDSWpILE1BQUUscUJBQUYsRUFBeUI2RCxJQUF6QixDQUE4QixTQUE5QixFQUF5QyxJQUF6QztBQUNBN0QsTUFBRSxtQkFBRixFQUF1QjZELElBQXZCLENBQTRCLFVBQTVCLEVBQXdDLEtBQXhDO0FBQ0E3RCxNQUFFLGNBQUYsRUFBa0JlLElBQWxCLENBQXVCLEdBQXZCO0FBQ0FmLE1BQUUsY0FBRixFQUFrQmtCLElBQWxCLENBQXVCLENBQXZCO0FBQ0FsQixNQUFFLG1CQUFGLEVBQXVCa0IsSUFBdkIsQ0FBNEIsQ0FBNUI7QUFDQWxCLE1BQUUsZ0JBQUYsRUFBb0JlLElBQXBCLENBQXlCLENBQXpCO0FBQ0gsQ0FSRDs7QUFVQU4sT0FBT3lHLHlCQUFQLEdBQW1DLFlBQ25DO0FBQ0lsSCxNQUFFLHFCQUFGLEVBQXlCNkQsSUFBekIsQ0FBOEIsU0FBOUIsRUFBeUMsS0FBekM7QUFDQTdELE1BQUUsbUJBQUYsRUFBdUI2RCxJQUF2QixDQUE0QixVQUE1QixFQUF3QyxJQUF4QztBQUNBN0QsTUFBRSxjQUFGLEVBQWtCa0IsSUFBbEIsQ0FBdUIsQ0FBdkI7QUFDQWxCLE1BQUUsY0FBRixFQUFrQmUsSUFBbEIsQ0FBdUIsR0FBdkI7QUFDQWYsTUFBRSxtQkFBRixFQUF1QmUsSUFBdkIsQ0FBNEIsQ0FBNUI7QUFDQWYsTUFBRSxnQkFBRixFQUFvQmtCLElBQXBCLENBQXlCLENBQXpCO0FBQ0gsQ0FSRDs7QUFVQWxCLEVBQUVtSCxRQUFGLEVBQVlDLEtBQVosQ0FBa0IsWUFBVTtBQUN4QnBILE1BQUUsZ0JBQUYsRUFBb0JDLEVBQXBCLENBQXVCLFFBQXZCLEVBQWlDLFlBQVU7QUFDdkMsWUFBSW9ILFVBQVVySCxFQUFFLElBQUYsRUFBUW9CLEdBQVIsRUFBZDtBQUNBa0csbUJBQVdELE9BQVg7QUFDSCxLQUhEO0FBSUgsQ0FMRDs7QUFPQTs7Ozs7O0FBTUE1RyxPQUFPOEcsWUFBUCxHQUFzQixVQUFTQyxRQUFULEVBQ3RCO0FBQ0l4SCxNQUFFd0gsUUFBRixFQUFZdEcsSUFBWixDQUFpQixHQUFqQjtBQUNILENBSEQ7O0FBS0FULE9BQU9nSCxRQUFQLEdBQWtCLFVBQVNDLGFBQVQsRUFBd0I7QUFDdEMsUUFBSWxCLFNBQVMsSUFBYjtBQUFBLFFBQ0ltQixNQUFNLEVBRFY7QUFFQTNELGFBQVM0RCxNQUFULENBQ0tDLE1BREwsQ0FDWSxDQURaLEVBRUt2QyxLQUZMLENBRVcsR0FGWCxFQUdLd0MsT0FITCxDQUdhLFVBQVV2RCxJQUFWLEVBQWdCO0FBQ3pCb0QsY0FBTXBELEtBQUtlLEtBQUwsQ0FBVyxHQUFYLENBQU47QUFDQSxZQUFJcUMsSUFBSSxDQUFKLE1BQVdELGFBQWYsRUFBOEJsQixTQUFTdUIsbUJBQW1CSixJQUFJLENBQUosQ0FBbkIsQ0FBVDtBQUM3QixLQU5MO0FBT0EsV0FBT25CLE1BQVA7QUFDSCxDQVhEOztBQWFBL0YsT0FBT3VILFNBQVAsR0FBbUIsVUFBUzFFLEdBQVQsRUFBYztBQUM3QixRQUFJMkUsU0FBUyxFQUFiO0FBQ0gsUUFBSUMsU0FBU2YsU0FBU2dCLGFBQVQsQ0FBdUIsR0FBdkIsQ0FBYjtBQUNBRCxXQUFPN0MsSUFBUCxHQUFjL0IsR0FBZDtBQUNBLFFBQUk4RSxRQUFRRixPQUFPTixNQUFQLENBQWNTLFNBQWQsQ0FBd0IsQ0FBeEIsQ0FBWjtBQUNBLFFBQUlDLE9BQU9GLE1BQU05QyxLQUFOLENBQVksR0FBWixDQUFYO0FBQ0EsU0FBSyxJQUFJaUQsSUFBSSxDQUFiLEVBQWdCQSxJQUFJRCxLQUFLRSxNQUF6QixFQUFpQ0QsR0FBakMsRUFBc0M7QUFDckMsWUFBSUUsT0FBT0gsS0FBS0MsQ0FBTCxFQUFRakQsS0FBUixDQUFjLEdBQWQsQ0FBWDtBQUNBMkMsZUFBT1EsS0FBSyxDQUFMLENBQVAsSUFBa0JWLG1CQUFtQlUsS0FBSyxDQUFMLENBQW5CLENBQWxCO0FBQ0E7QUFDRCxXQUFPUixNQUFQO0FBQ0EsQ0FYRCxDIiwiZmlsZSI6Ii9qcy9zY3JpcHRzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7XG4gXHRcdFx0XHRjb25maWd1cmFibGU6IGZhbHNlLFxuIFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGdldDogZ2V0dGVyXG4gXHRcdFx0fSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiL1wiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDcyKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCA0MjJiMjI1N2QxMGVhYzUzMmY3ZiIsIi8vIExvYWRlcnNcclxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4kKFwiLmxvYWRlci1vbi1jaGFuZ2VcIikub24oJ2NoYW5nZScsIGZ1bmN0aW9uICgpIHtcclxuICAgICQoJyNmdWxsLWxvYWRlcicpLnJlbW92ZUNsYXNzKCdIaWRkZW4nKTtcclxuICAgIHJldHVybiB0cnVlO1xyXG59KTtcclxuXHJcbiQoXCIubG9hZGVyLW9uLXN1Ym1pdFwiKS5vbignc3VibWl0JywgZnVuY3Rpb24gKCkge1xyXG4gICAgJCgnI2Z1bGwtbG9hZGVyJykucmVtb3ZlQ2xhc3MoJ0hpZGRlbicpO1xyXG4gICAgcmV0dXJuIHRydWU7XHJcbn0pO1xyXG5cclxuJCgnLmRvbnQtc3VibWl0LW9uLWVudGVyLCAuZHNvbicpLmtleXByZXNzKGZ1bmN0aW9uIChlKSB7XHJcbiAgICBjb25zb2xlLmxvZyhcIkVOVEVSXCIpO1xyXG4gICAgaWYgKGUud2hpY2ggPT0gMTMpIHJldHVybiBmYWxzZTtcclxuICAgIGlmIChlLndoaWNoID09IDEzKSBlLnByZXZlbnREZWZhdWx0KCk7XHJcbn0pO1xyXG5cclxuLy8gU3RvcmUgRmlsdGVyc1xyXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcblxyXG53aW5kb3cuY29sbGFwc2VGaWx0ZXIgPSBmdW5jdGlvbihlbGVtKSB7XHJcbiAgICBjb25zdCBmaWx0ZXIgPSBlbGVtLnNpYmxpbmdzKCd1bCcpO1xyXG4gICAgaWYoZmlsdGVyLmhhc0NsYXNzKCdjb2xsYXBzZWQnKSlcclxuICAgIHtcclxuICAgICAgICBmaWx0ZXIucmVtb3ZlQ2xhc3MoJ2NvbGxhcHNlZCcpO1xyXG4gICAgICAgIGZpbHRlci5zaG93KDEwMCk7XHJcbiAgICAgICAgZWxlbS5odG1sKCctJyk7XHJcbiAgICB9XHJcbiAgICBlbHNlXHJcbiAgICB7XHJcbiAgICAgICAgZmlsdGVyLmFkZENsYXNzKCdjb2xsYXBzZWQnKTtcclxuICAgICAgICBmaWx0ZXIuaGlkZSgxMDApO1xyXG4gICAgICAgIGVsZW0uaHRtbCgnKycpO1xyXG4gICAgfVxyXG59XHJcblxyXG5cclxuLy8gTW9kaWZ5IGNhcnQgaXRlbSBxdWFudGl0eSBcclxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4kKCcuSW5wdXRCdG5RJykub24oJ2NoYW5nZSBrZXl1cCcsIGZ1bmN0aW9uICgpIHtcclxuICAgIC8vICBPcmlnaW5hbCBBcnRpY2xlIFByaWNlXHJcbiAgICBsZXQgdmFsdWUgPSAkKHRoaXMpLnNpYmxpbmdzKCcuQXJ0aWNsZVByaWNlJykudmFsKCk7XHJcbiAgICAvLyBRdWFudGl0eVxyXG4gICAgbGV0IHF1YW50aXR5ID0gJCh0aGlzKS52YWwoKTtcclxuICAgIC8vIE5lciBWYWx1ZVxyXG4gICAgbGV0IG5ld1ZhbHVlID0gKHZhbHVlICogcXVhbnRpdHkpO1xyXG4gICAgLy8gTmV3IFByaWNlIFRhcmdldFxyXG4gICAgbGV0IG5ld1ByaWNlVGFyZ2V0ID0gJCh0aGlzKS5wYXJlbnQoKS5wYXJlbnQoKS5wYXJlbnQoKS5zaWJsaW5ncygnLlRvdGFsSXRlbVByaWNlJyk7XHJcblxyXG4gICAgY29uc29sZS5sb2codmFsdWUsIHF1YW50aXR5LCBuZXdWYWx1ZSk7XHJcbiAgICBtb2RpZnlDYXJ0SXRlbVEoJCh0aGlzKSwgbmV3UHJpY2VUYXJnZXQsIG5ld1ZhbHVlKTtcclxufSlcclxuXHJcbmZ1bmN0aW9uIG1vZGlmeUNhcnRJdGVtUShlLCBuZXdQcmljZVRhcmdldCwgbmV3VmFsdWUpIHtcclxuICAgIGUuc2libGluZ3MoJy5JbnB1dEJ0blEnKS5yZW1vdmVDbGFzcygnSGlkZGVuJyk7XHJcbiAgICBuZXdQcmljZVRhcmdldC5odG1sKCckICcgKyBuZXdWYWx1ZSk7XHJcbn1cclxuXHJcblxyXG4kKCcjTWFpbk92ZXJsYXknKS5jbGljayhmdW5jdGlvbigpe1xyXG4gICAgY2hlY2tvdXRTaWRlYmFyKCdoaWRlJyk7XHJcbn0pXHJcbi8vIENoZWNrb3V0IHNpZGViYXJcclxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVx0XHRcclxud2luZG93LmNoZWNrb3V0U2lkZWJhciA9IGZ1bmN0aW9uIChzdGF0ZSkge1xyXG5cclxuICAgIGNvbnN0IHNpZGViYXIgPSAkKCcuQ2hlY2tvdXRDYXJ0Jyk7XHJcbiAgICBjb25zdCB3cmFwcGVyID0gJCgnLm1haW4td3JhcHBlcicpO1xyXG5cclxuICAgIGNvbnN0IHNob3cgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgc2lkZWJhci5hZGRDbGFzcygnYWN0aXZlJyk7XHJcbiAgICAgICAgd3JhcHBlci5hZGRDbGFzcygnYWxsb3ctc2lkZWJhcicpO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IGhpZGUgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgc2lkZWJhci5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XHJcbiAgICAgICAgd3JhcHBlci5yZW1vdmVDbGFzcygnYWxsb3ctc2lkZWJhcicpO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICBpZiAoc3RhdGUgPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgaWYgKHNpZGViYXIuaGFzQ2xhc3MoJ2FjdGl2ZScpKSB7XHJcbiAgICAgICAgICAgIGhpZGUoKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBzaG93KCk7XHJcbiAgICAgICAgfVxyXG4gICAgfSBlbHNlIGlmIChzdGF0ZSA9PSAnc2hvdycpIHtcclxuICAgICAgICBzaG93KCk7XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfSBlbHNlIGlmIChzdGF0ZSA9PSAnaGlkZScpIHtcclxuICAgICAgICBoaWRlKCk7XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG59XHJcblxyXG5cclxuXHJcbndpbmRvdy5vcGVuQ2hlY2tvdXREZXNrdG9wID0gZnVuY3Rpb24oKVxyXG57XHJcbiAgICBpZiAoJCh3aW5kb3cpLndpZHRoKCkgPiA3NjgpIHtcclxuICAgICAgICBjaGVja291dFNpZGViYXIoJ3Nob3cnKTtcclxuICAgIH1cclxuICAgIHJldHVybiBmYWxzZTtcclxufVxyXG5cclxud2luZG93Lm9wZW5GaWx0ZXJzID0gZnVuY3Rpb24gKCkge1xyXG4gICAgY29uc3QgZmlsdGVycyA9ICQoJyNTZWFyY2hGaWx0ZXJzJyk7XHJcbiAgICBjb25zdCB0cmlnZ2VyID0gJCgnI1NlYXJjaEZpbHRlcnNUcmlnZ2VyJyk7XHJcbiAgICBpZihmaWx0ZXJzLmhhc0NsYXNzKCdhY3RpdmUnKSlcclxuICAgIHtcclxuICAgICAgICBmaWx0ZXJzLnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcclxuICAgICAgICB0cmlnZ2VyLnNob3coKTtcclxuICAgIH1cclxuICAgIGVsc2VcclxuICAgIHtcclxuICAgICAgICBmaWx0ZXJzLmFkZENsYXNzKCdhY3RpdmUnKTtcclxuICAgICAgICB0cmlnZ2VyLmhpZGUoKTtcclxuICAgIH1cclxuXHJcbn1cclxuXHJcblxyXG4vKlxyXG58LS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxufCBDQVJUXHJcbnwtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4qL1xyXG5cclxuXHJcbndpbmRvdy5zdW1BbGxJdGVtcyA9IGZ1bmN0aW9uICgpIHtcclxuICAgIHN1bSA9IDA7XHJcbiAgICAkKCcuVG90YWxJdGVtUHJpY2UnKS5lYWNoKGZ1bmN0aW9uIChpbmRleCkge1xyXG4gICAgICAgIHN1bSArPSBwYXJzZUludCgkKHRoaXMpLmh0bWwoKSk7XHJcbiAgICB9KTtcclxuICAgICQoJy5TdWJUb3RhbCcpLmh0bWwoc3VtKTtcclxufVxyXG5cclxuXHJcbi8vIFN1bSBkaXZzIHRleHRcclxud2luZG93LnN1bURpdnMgPSBmdW5jdGlvbiAob3JpZ2lucywgdGFyZ2V0KSB7XHJcbiAgICBsZXQgc3VtID0gMDtcclxuICAgIG9yaWdpbnMuZWFjaChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgc3VtICs9IHBhcnNlRmxvYXQoJCh0aGlzKS50ZXh0KCkpO1xyXG4gICAgfSk7XHJcbiAgICB0YXJnZXQudGV4dChzdW0pO1xyXG59XHJcblxyXG5cclxuLy8gQ2hlY2sgcHJvZHVjdCB2YXJpYW50IHN0b2NrXHJcbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxud2luZG93LmNoZWNrVmFyaWFudFN0b2NrID0gZnVuY3Rpb24oKSB7XHJcbiAgICBsZXQgZm9ybSA9ICQoJyNBZGRUb0NhcnRGb3JtJyk7XHJcbiAgICBsZXQgZGF0YSA9IGZvcm0uc2VyaWFsaXplKCk7XHJcbiAgICBsZXQgYWxsb3dTdWJtaXQgPSBmYWxzZTtcclxuICAgIGxldCBzdWJtaXRCdXR0b24gPSAgJCgnI0FkZFRvQ2FydEZvcm1CdG4nKTtcclxuICAgICQuYWpheCh7XHJcbiAgICAgICAgdXJsOiBmb3JtLmRhdGEoJ3JvdXRlJyksXHJcbiAgICAgICAgbWV0aG9kOiAnR0VUJyxcclxuICAgICAgICBkYXRhVHlwZTogJ0pTT04nLFxyXG4gICAgICAgIGFzeW5jOiBmYWxzZSxcclxuICAgICAgICBkYXRhOiBkYXRhLFxyXG4gICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChkYXRhKSB7XHJcbiAgICAgICAgICAgIGlmKGRhdGEucmVzcG9uc2UgPT0gdHJ1ZSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgaWYoZGF0YS5tZXNzYWdlID09ICcwJylcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICQoJy5BdmFpbGFibGVTdG9jaycpLmh0bWwoXCJObyBoYXkgc3RvY2sgZGlzcG9uaWJsZVwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc3VibWl0QnV0dG9uLnByb3AoJ2Rpc2FibGVkJywgdHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKGRhdGEpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAkKCcuQXZhaWxhYmxlU3RvY2snKS5odG1sKFwiU3RvY2sgZGlzcG9uaWJsZTogXCIgKyBkYXRhLm1lc3NhZ2UpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzdWJtaXRCdXR0b24ucHJvcCgnZGlzYWJsZWQnLCBmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFsbG93U3VibWl0ID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coXCJFbnRybyBlbiBTVUNDRVNTXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICQoJyNNYXhRdWFudGl0eScpLnByb3AoXCJtYXhcIiwgZGF0YS5tZXNzYWdlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKGRhdGEpO1xyXG4gICAgICAgICAgICAgICAgLy8gJCgnI0Vycm9yJykuaHRtbChkYXRhLnJlc3BvbnNlVGV4dCk7XHJcbiAgICAgICAgICAgICAgICAkKCcuQXZhaWxhYmxlU3RvY2snKS5odG1sKGRhdGEubWVzc2FnZSk7XHJcbiAgICAgICAgICAgICAgICBzdWJtaXRCdXR0b24ucHJvcCgnZGlzYWJsZWQnLCB0cnVlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZXJyb3I6IGZ1bmN0aW9uIChkYXRhKSB7XHJcbiAgICAgICAgICAgICQoJyNFcnJvcicpLmh0bWwoZGF0YS5yZXNwb25zZVRleHQpO1xyXG4gICAgICAgICAgICBsb2NhdGlvbi5yZWxvYWQoKTtcclxuICAgICAgICAgICAgYWxsb3dTdWJtaXQgPSBmYWxzZTtcclxuICAgICAgICAgICAgc3VibWl0QnV0dG9uLnByb3AoJ2Rpc2FibGVkJywgdHJ1ZSk7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGRhdGEpO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIkVudHJvIGVuIGVycm9yIDJcIik7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcbiAgICByZXR1cm4gYWxsb3dTdWJtaXQ7XHJcbn1cclxuXHJcbi8vIFNldCBjYXJ0IGl0ZW1zIEpTT05cclxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG53aW5kb3cuc2V0SXRlbXNEYXRhID0gZnVuY3Rpb24gKCkge1xyXG4gICAgaXRlbURhdGEgPSBbXTtcclxuXHJcbiAgICAkKCcuSXRlbS1EYXRhJykuZWFjaChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgbGV0IGlkID0gJCh0aGlzKS5kYXRhKCdpZCcpO1xyXG4gICAgICAgIGxldCBwcmljZSA9ICQodGhpcykuZGF0YSgncHJpY2UnKTtcclxuICAgICAgICBsZXQgdmFyaWFudF9pZCA9ICQodGhpcykuZGF0YSgndmFyaWFudCcpO1xyXG4gICAgICAgIGxldCBxdWFudGl0eSA9ICQodGhpcykudmFsKCk7XHJcblxyXG4gICAgICAgIGl0ZW0gPSB7fVxyXG4gICAgICAgIGl0ZW1bJ2lkJ10gPSBpZDtcclxuICAgICAgICBpdGVtWyd2YXJpYW50X2lkJ10gPSB2YXJpYW50X2lkO1xyXG4gICAgICAgIGl0ZW1bJ3ByaWNlJ10gPSBwcmljZTtcclxuICAgICAgICBpdGVtWydxdWFudGl0eSddID0gcXVhbnRpdHk7XHJcbiAgICAgICAgLy8gVXBkYXRlIGRpc3BsYXkgdG90YWwgaXRlbSBwcmljZVxyXG4gICAgICAgIHRvdGFsID0gcHJpY2UgKiBxdWFudGl0eTtcclxuICAgICAgICAkKCcuJyArIGlkICsgJy1Ub3RhbEl0ZW1QcmljZScpLmh0bWwodG90YWwpO1xyXG5cclxuICAgICAgICBpdGVtRGF0YS5wdXNoKGl0ZW0pO1xyXG4gICAgfSk7XHJcbiAgICAvLyBVcGRhdGUgVG90YWxcclxuICAgIC8vIGNvbnNvbGUuaW5mbyhpdGVtRGF0YSk7XHJcbiAgICBzdW1BbGxJdGVtcygpO1xyXG4gICAgJCgnI0l0ZW1zLURhdGEnKS52YWwoaXRlbURhdGEpO1xyXG59XHJcblxyXG4vLyBBZGQgcHJvZHVjdCB0byBjYXJ0XHJcbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxud2luZG93LmFkZFRvQ2FydCA9IGZ1bmN0aW9uIChyb3V0ZSwgZGF0YSkge1xyXG4gICAgJC5hamF4KHtcclxuICAgICAgICB1cmw6IHJvdXRlLFxyXG4gICAgICAgIG1ldGhvZDogJ1BPU1QnLFxyXG4gICAgICAgIGRhdGFUeXBlOiAnSlNPTicsXHJcbiAgICAgICAgZGF0YTogZGF0YSxcclxuICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAoZGF0YSkge1xyXG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhkYXRhKTtcclxuICAgICAgICAgICAgaWYgKGRhdGEucmVzcG9uc2UgPT0gJ3N1Y2Nlc3MnKSB7XHJcbiAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhkYXRhKTtcclxuICAgICAgICAgICAgICAgICQoJy5BdmFpbGFibGVTdG9jaycpLmh0bWwoXCJTdG9jayBkaXNwb25pYmxlOiBcIiArIGRhdGEubmV3U3RvY2spO1xyXG4gICAgICAgICAgICAgICAgdG9hc3Rfc3VjY2VzcygnT2shJywgZGF0YS5tZXNzYWdlLCAnYm90dG9tQ2VudGVyJywgJycsIDI1MDApO1xyXG4gICAgICAgICAgICAgICAgdXBkYXRlVG90YWxzKCk7XHJcbiAgICAgICAgICAgICAgICBzZXRJdGVtc0RhdGEoKTtcclxuICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHNldEl0ZW1zRGF0YSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIHN1bUFsbEl0ZW1zKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gb3BlbkNoZWNrb3V0RGVza3RvcCgpO1xyXG4gICAgICAgICAgICAgICAgfSwgMTAwKTtcclxuICAgICAgICAgICAgfSBlbHNlIGlmIChkYXRhLnJlc3BvbnNlID09ICd3YXJuaW5nJykge1xyXG4gICAgICAgICAgICAgICAgdG9hc3Rfc3VjY2VzcygnVXBzIScsIGRhdGEubWVzc2FnZSwgJ2JvdHRvbUNlbnRlcicpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuICAgICAgICBlcnJvcjogZnVuY3Rpb24gKGRhdGEpIHtcclxuICAgICAgICAgICAgJCgnI0Vycm9yJykuaHRtbChkYXRhLnJlc3BvbnNlVGV4dCk7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiRXJyb3IgZW4gYWRkdG9DYXJ0KClcIik7XHJcbiAgICAgICAgICAgIC8vIGxvY2F0aW9uLnJlbG9hZCgpO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhkYXRhKTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxufVxyXG5cclxuIFxyXG5cclxuLy8gUmVtb3ZlIHByb2R1Y3QgZnJvbSBjYXJ0XHJcbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxud2luZG93LnJlbW92ZUZyb21DYXJ0ID0gZnVuY3Rpb24gKHJvdXRlLCBjYXJ0SXRlbUlkLCB2YXJpYW50SWQsIHF1YW50aXR5LCBkaXYsIGFjdGlvbikge1xyXG4gICAgJC5hamF4KHtcclxuICAgICAgICB1cmw6IHJvdXRlLFxyXG4gICAgICAgIG1ldGhvZDogJ1BPU1QnLFxyXG4gICAgICAgIGRhdGFUeXBlOiAnSlNPTicsXHJcbiAgICAgICAgZGF0YTogeyBjYXJ0SXRlbUlkOiBjYXJ0SXRlbUlkLCB2YXJpYW50SWQ6IHZhcmlhbnRJZCwgcXVhbnRpdHk6IHF1YW50aXR5LCBhY3Rpb246IGFjdGlvbiwgbWV0aG9kOiAnYWpheCcgfSxcclxuICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAoZGF0YSkge1xyXG4gICAgICAgICAgICBpZiAoZGF0YS5yZXNwb25zZSA9PSAnY2FydC1yZW1vdmVkJykge1xyXG4gICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coZGF0YSk7XHJcbiAgICAgICAgICAgICAgICB1cGRhdGVUb3RhbHMoKTtcclxuICAgICAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbiA9IHdpbmRvdy5sb2NhdGlvbi5ocmVmLnNwbGl0KFwiP1wiKVswXTtcclxuICAgICAgICAgICAgICAgIHNldEl0ZW1zRGF0YSgpO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKGRhdGEucmVzcG9uc2UgPT0gJ3N1Y2Nlc3MnKSB7XHJcbiAgICAgICAgICAgICAgICAkKGRpdikuaGlkZSgxMDApO1xyXG4gICAgICAgICAgICAgICAgJChkaXYpLnJlbW92ZSgpO1xyXG4gICAgICAgICAgICAgICAgdXBkYXRlVG90YWxzKCk7XHJcbiAgICAgICAgICAgICAgICBzZXRJdGVtc0RhdGEoKTtcclxuICAgICAgICAgICAgfSAgIFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZXJyb3I6IGZ1bmN0aW9uIChkYXRhKSB7XHJcbiAgICAgICAgICAgIC8vJCgnI0Vycm9yJykuaHRtbChkYXRhLnJlc3BvbnNlVGV4dCk7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiRXJyb3IgZW4gcmVtb3ZlRnJvbUNhcnQoKVwiKTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coZGF0YSk7XHJcbiAgICAgICAgICAgIC8vIElmIGFuIGVycm9yIHBvcHMgd2hlbiBkZXN0cm95aW5nIGFuIGl0ZW0sIHJlbG9hZCBhbmQgcHJldmVudCBiYWQgbWFnaWNcclxuICAgICAgICAgICAgbG9jYXRpb24ucmVsb2FkKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHVwZGF0ZVRvdGFscygpIHtcclxuICAgIC8vIExpdmUgUmVsb2FkaW5nIHN0dWZmXHJcbiAgICAkKFwiI1NpZGVDb250YWluZXJJdGVtc0ZpeGVkXCIpLmxvYWQod2luZG93LmxvY2F0aW9uLmhyZWYgKyBcIiAjU2lkZUNvbnRhaW5lckl0ZW1zRml4ZWRcIik7XHJcbiAgICAkKFwiI1NpZGVDb250YWluZXJJdGVtc0Zsb2F0aW5nXCIpLmxvYWQod2luZG93LmxvY2F0aW9uLmhyZWYgKyBcIiAjU2lkZUNvbnRhaW5lckl0ZW1zRmxvYXRpbmdcIik7XHJcbiAgICAkKFwiLlRvdGFsQ2FydEl0ZW1zXCIpLmxvYWQod2luZG93LmxvY2F0aW9uLmhyZWYgKyBcIiAuVG90YWxDYXJ0SXRlbXNcIik7XHJcbiAgICAkKFwiLlRvdGFsQ2FydEl0ZW1zU2lkZWJhclwiKS5sb2FkKHdpbmRvdy5sb2NhdGlvbi5ocmVmICsgXCIgLlRvdGFsQ2FydEl0ZW1zU2lkZWJhclwiKTtcclxuICAgICQoXCIuQ2FydFN1YlRvdGFsXCIpLmxvYWQod2luZG93LmxvY2F0aW9uLmhyZWYgKyBcIiAuQ2FydFN1YlRvdGFsXCIpO1xyXG4gICAgJChcIi5BdmFpbGFibGVTdG9ja1wiKS5sb2FkKHdpbmRvdy5sb2NhdGlvbi5ocmVmICsgXCIgLkF2YWlsYWJsZVN0b2NrXCIpO1xyXG59XHJcblxyXG4vLyBTdWJtaXQgQ2FydCBGb3JtIHRvIENoZWNrb3V0XHJcbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxud2luZG93LnN1Ym1pdENhcnRUb0NoZWNrb3V0ID0gZnVuY3Rpb24gKHJvdXRlLCB0YXJnZXQsIGRhdGEsIGFjdGlvbikge1xyXG4gICAgLy9jb25zb2xlLmxvZyhcIlJ1dGE6IFwiICsgcm91dGUgKyBcIiBUYXJnZXQ6IFwiICsgdGFyZ2V0ICsgXCIgRGF0YTogXCIgKyBkYXRhICsgXCJBY3Rpb246IFwiKyBhY3Rpb24pO1xyXG4gICAgJC5hamF4KHtcclxuICAgICAgICB1cmw6IHJvdXRlLFxyXG4gICAgICAgIG1ldGhvZDogJ1BPU1QnLFxyXG4gICAgICAgIGRhdGFUeXBlOiAnSlNPTicsXHJcbiAgICAgICAgZGF0YTogeyBkYXRhLCBhY3Rpb246IGFjdGlvbiB9LFxyXG4gICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChkYXRhKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGRhdGEpO1xyXG4gICAgICAgICAgICBpZiAoZGF0YS5yZXNwb25zZSA9PSAnc3VjY2VzcycpIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHRhcmdldCk7XHJcbiAgICAgICAgICAgICAgICBpZiAodGFyZ2V0ID09ICdyZWxvYWQnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gUmVmcmVzaCBwYWdlLCBkZWxldGUgcGFyYW1ldHRlcnMgYW5kIG9wZW4gY2hlY2tvdXQgc2lkZWJhclxyXG4gICAgICAgICAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbiA9IHdpbmRvdy5sb2NhdGlvbi5ocmVmLnNwbGl0KFwiP1wiKVswXSArIFwiP2NoZWNrb3V0LW9uXCI7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gdGFyZ2V0O1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ0Vycm9yIGVuIHN1Ym1pdEZvcm0nKTtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGRhdGEpO1xyXG4gICAgICAgICAgICAgICAgdG9hc3RfZXJyb3IoJycsIGRhdGEubWVzc2FnZSwgJ2JvdHRvbUNlbnRlcicsICcnKTtcclxuICAgICAgICAgICAgICAgICQoJy5TaWRlQ29udGFpbmVyRXJyb3InKS5odG1sKGRhdGEubWVzc2FnZSk7XHJcbiAgICAgICAgICAgICAgICAvLyAkKCcjRXJyb3InKS5odG1sKGRhdGEucmVzcG9uc2VUZXh0KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvLyAkKCcjRXJyb3InKS5odG1sKGRhdGEucmVzcG9uc2VUZXh0KTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIGVycm9yOiBmdW5jdGlvbiAoZGF0YSkge1xyXG4gICAgICAgICAgICAvLyAkKCcjRXJyb3InKS5odG1sKGRhdGEucmVzcG9uc2VUZXh0KTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJFcnJvciBlbiBzdWJtaXRGb3JtKClcIik7XHJcbiAgICAgICAgICAgIGxvY2F0aW9uLnJlbG9hZCgpO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhkYXRhKTtcclxuICAgICAgICAgICAgLy8gbG9jYXRpb24ucmVsb2FkKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcbn1cclxuXHJcbi8vIFZhbGlkYXRlIGFuZCBzZXQgY291cG9uXHJcbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxud2luZG93LnZhbGlkYXRlQW5kU2V0Q291cG9uID0gZnVuY3Rpb24gKHJvdXRlLCBjb2RlLCBjYXJ0aWQpIHtcclxuICAgIGxldCBjb3Vwb25EaXYgPSAkKCcjQ291cG9uRGl2Jyk7XHJcbiAgICBsZXQgY291cG9uU2V0ID0gJCgnI1NldHRlZENvdXBvbicpO1xyXG4gICAgY29uc29sZS5sb2coY29kZSwgY2FydGlkKTtcclxuICAgICQuYWpheCh7XHJcbiAgICAgICAgdXJsOiByb3V0ZSxcclxuICAgICAgICBtZXRob2Q6ICdQT1NUJyxcclxuICAgICAgICBkYXRhVHlwZTogJ0pTT04nLFxyXG4gICAgICAgIGRhdGE6IHsgY29kZTogY29kZSwgY2FydGlkOiBjYXJ0aWQgfSxcclxuICAgICAgICBiZWZvcmVTZW5kOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiQ29tcHJvYmFuZG8gY3Vww7NuLi4uXCIpO1xyXG4gICAgICAgICAgICAkKCcuQ291cG9uTG9hZGVyJykucmVtb3ZlQ2xhc3MoJ0hpZGRlbicpO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKGRhdGEpIHtcclxuICAgICAgICAgICAgaWYgKGRhdGEucmVzcG9uc2UgPT0gdHJ1ZSkge1xyXG4gICAgICAgICAgICAgICAgJCgnI0NvdXBvblZhbGlkYXRpb25NZXNzYWdlJykuaHRtbChcIkN1cMOzbiBhY2VwdGFkbyAhXCIpO1xyXG4gICAgICAgICAgICAgICAgY291cG9uRGl2LmhpZGUoMjAwLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY291cG9uU2V0LnJlbW92ZUNsYXNzKCdIaWRkZW4nKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgbG9jYXRpb24ucmVsb2FkKCk7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoZGF0YS5yZXNwb25zZSA9PSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICAkKCcjQ291cG9uVmFsaWRhdGlvbk1lc3NhZ2UnKS5odG1sKGRhdGEubWVzc2FnZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG4gICAgICAgIGVycm9yOiBmdW5jdGlvbiAoZGF0YSkge1xyXG4gICAgICAgICAgICAkKCcjQ291cG9uVmFsaWRhdGlvbk1lc3NhZ2UnKS5odG1sKGRhdGEucmVzcG9uc2VUZXh0KTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coZGF0YSk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBjb21wbGV0ZTogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAkKCcuQ291cG9uTG9hZGVyJykuYWRkQ2xhc3MoJ0hpZGRlbicpO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG59XHJcblxyXG4vLyBGYXZzXHJcbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxud2luZG93LmFkZEFydGljbGVUb0ZhdnMgPSBmdW5jdGlvbiAocm91dGUsIGZhdmlkLCBhcnRpY2xlaWQsIGFjdGlvbiwgZGlzcGxheUJ1dHRvbikge1xyXG4gICAgJC5hamF4KHtcclxuICAgICAgICB1cmw6IHJvdXRlLFxyXG4gICAgICAgIG1ldGhvZDogJ1BPU1QnLFxyXG4gICAgICAgIGRhdGFUeXBlOiAnSlNPTicsXHJcbiAgICAgICAgZGF0YTogeyBmYXZfaWQ6IGZhdmlkLCBhcnRpY2xlX2lkOiBhcnRpY2xlaWQgfSxcclxuICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAoZGF0YSkge1xyXG4gICAgICAgICAgICBpZiAoZGF0YS5yZXNwb25zZSA9PSB0cnVlICYmIGRhdGEucmVzdWx0ID09ICdhZGRlZCcpIHtcclxuICAgICAgICAgICAgICAgIHN3aXRjaCAoYWN0aW9uKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAncmVsb2FkJzpcclxuICAgICAgICAgICAgICAgICAgICAgICAgbG9jYXRpb24ucmVsb2FkKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJ3Nob3cnOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBkaXNwbGF5QnV0dG9uLnJlbW92ZUNsYXNzKCdmYXYtaWNvbi1ub2ZhdicpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBkaXNwbGF5QnV0dG9uLmFkZENsYXNzKCdmYXYtaWNvbi1pc2ZhdicpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0b2FzdF9zdWNjZXNzKCdPayEnLCAnUHJvZHVjdG8gYWdyZWdhZG8gYSBmYXZvcml0b3MnLCAnYm90dG9tQ2VudGVyJywgJycsIDEwMDApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICBjYXNlICdub25lJzpcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ0FjdHVhbGl6YWRvIC0gU2luIEFjY2nDs24nKTtcclxuICAgICAgICAgICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnTm8gaGF5IGFjY2nDs24nKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoZGF0YS5yZXNwb25zZSA9PSB0cnVlICYmIGRhdGEucmVzdWx0ID09ICdyZW1vdmVkJykge1xyXG4gICAgICAgICAgICAgICAgZGlzcGxheUJ1dHRvbi5hZGRDbGFzcygnZmF2LWljb24tbm9mYXYnKTtcclxuICAgICAgICAgICAgICAgIGRpc3BsYXlCdXR0b24ucmVtb3ZlQ2xhc3MoJ2Zhdi1pY29uLWlzZmF2Jyk7XHJcbiAgICAgICAgICAgICAgICB0b2FzdF9zdWNjZXNzKCdPayEnLCAnUHJvZHVjdG8gZWxpbWluYWRvIGRlIGZhdm9yaXRvcycsICdib3R0b21DZW50ZXInLCAnJywgMTAwMCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgc2V0RmF2c1RvdGFsSWNvbihkYXRhLmZhdnNDb3VudCk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBlcnJvcjogZnVuY3Rpb24gKGRhdGEpIHtcclxuICAgICAgICAgICAgJCgnI0Vycm9yJykuaHRtbChkYXRhLnJlc3BvbnNlVGV4dCk7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGRhdGEpO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG59XHJcblxyXG5mdW5jdGlvbiBzZXRGYXZzVG90YWxJY29uKGZhdnMpIHtcclxuICAgIGlmIChmYXZzID4gMCkge1xyXG4gICAgICAgICQoJy5GYXZNYWluSWNvbicpLnJlbW92ZUNsYXNzKCdmYXInKTtcclxuICAgICAgICAkKCcuRmF2TWFpbkljb24nKS5hZGRDbGFzcygnZmEnKTtcclxuICAgIH0gZWxzZSBpZiAoZmF2cyA9PSAwKSB7XHJcbiAgICAgICAgJCgnLkZhdk1haW5JY29uJykucmVtb3ZlQ2xhc3MoJ2ZhJyk7XHJcbiAgICAgICAgJCgnLkZhdk1haW5JY29uJykuYWRkQ2xhc3MoJ2ZhcicpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICAkKCcuRmF2TWFpbkljb24nKS5yZW1vdmVDbGFzcygnZmEnKTtcclxuICAgICAgICAkKCcuRmF2TWFpbkljb24nKS5yZW1vdmVDbGFzcygnZmFyJyk7XHJcbiAgICAgICAgJCgnLkZhdk1haW5JY29uJykuYWRkQ2xhc3MoJ2ZhJyk7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJFcnJvciBlbiBzZXRGYXZzVG90YWxJY29uKClcIik7XHJcbiAgICB9XHJcbn1cclxuXHJcbndpbmRvdy5yZW1vdmVBcnRpY2xlRnJvbUZhdnMgPSBmdW5jdGlvbiAocm91dGUsIGZhdmlkLCBhY3Rpb24pIHtcclxuICAgIHZhciBkb2FjdGlvbiA9IGFjdGlvbjtcclxuICAgICQuYWpheCh7XHJcbiAgICAgICAgdXJsOiByb3V0ZSxcclxuICAgICAgICBtZXRob2Q6ICdQT1NUJyxcclxuICAgICAgICBkYXRhVHlwZTogJ0pTT04nLFxyXG4gICAgICAgIGRhdGE6IHsgZmF2X2lkOiBmYXZpZCB9LFxyXG4gICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChkYXRhKSB7XHJcbiAgICAgICAgICAgICQoJyNFcnJvcicpLmh0bWwoZGF0YS5yZXNwb25zZVRleHQpO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhkYXRhKTtcclxuICAgICAgICAgICAgaWYgKGRhdGEucmVzcG9uc2UgPT0gdHJ1ZSkge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coZG9hY3Rpb24pO1xyXG4gICAgICAgICAgICAgICAgc3dpdGNoIChkb2FjdGlvbikge1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJ3JlbG9hZCc6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBhY3Rpb24gPSAncmVsb2FkJztcclxuICAgICAgICAgICAgICAgICAgICAgICAgdG9hc3Rfc3VjY2VzcygnT2shJywgJ1Byb2R1Y3RvIGVsaW1pbmFkbyBkZSBmYXZvcml0b3MnLCAnYm90dG9tQ2VudGVyJywgYWN0aW9uLCAxMDAwKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ05vIGhheSBhY2Npw7NuJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgLy8kKCcjRXJyb3InKS5odG1sKGRhdGEubWVzc2FnZVsnZXJyb3JJbmZvJ10pO1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coZGF0YSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG4gICAgICAgIGVycm9yOiBmdW5jdGlvbiAoZGF0YSkge1xyXG4gICAgICAgICAgICAvLyQoJyNFcnJvcicpLmh0bWwoZGF0YS5yZXNwb25zZVRleHQpO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhkYXRhKTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxufVxyXG5cclxud2luZG93LnJlbW92ZUFsbEFydGljbGVzRnJvbUZhdnMgPSBmdW5jdGlvbiAocm91dGUsIGN1c3RvbWVyaWQsIGFjdGlvbikge1xyXG4gICAgJC5hamF4KHtcclxuICAgICAgICB1cmw6IHJvdXRlLFxyXG4gICAgICAgIG1ldGhvZDogJ1BPU1QnLFxyXG4gICAgICAgIGRhdGFUeXBlOiAnSlNPTicsXHJcbiAgICAgICAgZGF0YTogeyBjdXN0b21lcl9pZDogY3VzdG9tZXJpZCB9LFxyXG4gICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChkYXRhKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGRhdGEpO1xyXG4gICAgICAgICAgICAvLyQoJyNFcnJvcicpLmh0bWwoZGF0YS5yZXNwb25zZVRleHQpO1xyXG4gICAgICAgICAgICBpZiAoZGF0YS5yZXNwb25zZSA9PSB0cnVlKSB7XHJcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKGFjdGlvbikge1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJ3JlbG9hZCc6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxvY2F0aW9uLnJlbG9hZCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnTm8gaGF5IGFjY2nDs24nKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAkKCcjRXJyb3InKS5odG1sKGRhdGEubWVzc2FnZVsnZXJyb3JJbmZvJ10pO1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coZGF0YSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG4gICAgICAgIGVycm9yOiBmdW5jdGlvbiAoZGF0YSkge1xyXG4gICAgICAgICAgICAvLyQoJyNFcnJvcicpLmh0bWwoZGF0YS5yZXNwb25zZVRleHQpO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhkYXRhKTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxufVxyXG5cclxuLypcclxufC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbnwgTE9HSU4gQU5EIFJFR0lTVEVSXHJcbnwtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4qL1xyXG5cclxuJCgnI1Jlc2VsbGVyQm94JykuaGlkZSgpO1xyXG5cclxud2luZG93Lm9wZW5SZXNlbGxlclJlZ2lzdHJhdGlvbiA9IGZ1bmN0aW9uKClcclxue1xyXG4gICAgJCgnI0lzUmVzZWxsZXJDaGVja2JveCcpLnByb3AoJ2NoZWNrZWQnLCB0cnVlKTtcclxuICAgICQoJy5JZlJlc2VsbGVyRW5hYmxlJykucHJvcCgnZGlzYWJsZWQnLCBmYWxzZSk7XHJcbiAgICAkKCcjUmVzZWxsZXJCb3gnKS5zaG93KDEwMCk7XHJcbiAgICAkKCcjUmVzZWxsZXJDVEEnKS5oaWRlKDApO1xyXG4gICAgJCgnLk5vcm1hQ2xpZW50VGl0bGUnKS5oaWRlKDApO1xyXG4gICAgJCgnLlJlc2VsbGVyVGl0bGUnKS5zaG93KDApO1xyXG59XHJcblxyXG53aW5kb3cuY2xvc2VSZXNlbGxlclJlZ2lzdHJhdGlvbiA9IGZ1bmN0aW9uKClcclxue1xyXG4gICAgJCgnI0lzUmVzZWxsZXJDaGVja2JveCcpLnByb3AoJ2NoZWNrZWQnLCBmYWxzZSk7XHJcbiAgICAkKCcuSWZSZXNlbGxlckVuYWJsZScpLnByb3AoJ2Rpc2FibGVkJywgdHJ1ZSk7XHJcbiAgICAkKCcjUmVzZWxsZXJCb3gnKS5oaWRlKDApO1xyXG4gICAgJCgnI1Jlc2VsbGVyQ1RBJykuc2hvdygxMDApO1xyXG4gICAgJCgnLk5vcm1hQ2xpZW50VGl0bGUnKS5zaG93KDApO1xyXG4gICAgJCgnLlJlc2VsbGVyVGl0bGUnKS5oaWRlKDApO1xyXG59XHJcblxyXG4kKGRvY3VtZW50KS5yZWFkeShmdW5jdGlvbigpe1xyXG4gICAgJCgnLkdlb1Byb3ZTZWxlY3QnKS5vbignY2hhbmdlJywgZnVuY3Rpb24oKXtcclxuICAgICAgICBsZXQgcHJvdl9pZCA9ICQodGhpcykudmFsKCk7XHJcbiAgICAgICAgZ2V0R2VvTG9jcyhwcm92X2lkKTtcclxuICAgIH0pO1xyXG59KTtcclxuXHJcbi8qXHJcbnwtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG58IE1JWCBGVU5DVElPTlNcclxufC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiovXHJcblxyXG53aW5kb3cuY2xvc2VFbGVtZW50ID0gZnVuY3Rpb24oc2VsZWN0b3IpXHJcbntcclxuICAgICQoc2VsZWN0b3IpLmhpZGUoMTAwKTtcclxufVxyXG5cclxud2luZG93LmdldFBhcmFtID0gZnVuY3Rpb24ocGFyYW1ldGVyTmFtZSkge1xyXG4gICAgdmFyIHJlc3VsdCA9IG51bGwsXHJcbiAgICAgICAgdG1wID0gW107XHJcbiAgICBsb2NhdGlvbi5zZWFyY2hcclxuICAgICAgICAuc3Vic3RyKDEpXHJcbiAgICAgICAgLnNwbGl0KFwiJlwiKVxyXG4gICAgICAgIC5mb3JFYWNoKGZ1bmN0aW9uIChpdGVtKSB7XHJcbiAgICAgICAgdG1wID0gaXRlbS5zcGxpdChcIj1cIik7XHJcbiAgICAgICAgaWYgKHRtcFswXSA9PT0gcGFyYW1ldGVyTmFtZSkgcmVzdWx0ID0gZGVjb2RlVVJJQ29tcG9uZW50KHRtcFsxXSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICByZXR1cm4gcmVzdWx0O1xyXG59XHJcblxyXG53aW5kb3cuZ2V0UGFyYW1zID0gZnVuY3Rpb24odXJsKSB7XHJcbiAgICB2YXIgcGFyYW1zID0ge307XHJcblx0dmFyIHBhcnNlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2EnKTtcclxuXHRwYXJzZXIuaHJlZiA9IHVybDtcclxuXHR2YXIgcXVlcnkgPSBwYXJzZXIuc2VhcmNoLnN1YnN0cmluZygxKTtcclxuXHR2YXIgdmFycyA9IHF1ZXJ5LnNwbGl0KCcmJyk7XHJcblx0Zm9yICh2YXIgaSA9IDA7IGkgPCB2YXJzLmxlbmd0aDsgaSsrKSB7XHJcblx0XHR2YXIgcGFpciA9IHZhcnNbaV0uc3BsaXQoJz0nKTtcclxuXHRcdHBhcmFtc1twYWlyWzBdXSA9IGRlY29kZVVSSUNvbXBvbmVudChwYWlyWzFdKTtcclxuXHR9XHJcblx0cmV0dXJuIHBhcmFtcztcclxufVxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9yZXNvdXJjZXMvYXNzZXRzL2pzL3N0b3JlL3NjcmlwdHMuanMiXSwic291cmNlUm9vdCI6IiJ9