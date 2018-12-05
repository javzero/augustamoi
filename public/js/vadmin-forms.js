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
/******/ 	return __webpack_require__(__webpack_require__.s = 78);
/******/ })
/************************************************************************/
/******/ ({

/***/ 78:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(79);


/***/ }),

/***/ 79:
/***/ (function(module, exports) {

//----------------------------------------------
//                    Colors
//----------------------------------------------

$('.Select-Colors').chosen({
    placeholder_text_multiple: 'Seleccione los colores',
    // max_selected_options: 3,
    search_contains: true,
    no_results_text: 'No se ha encontrado el color'
});

//----------------------------------------------
//                     Tags
//----------------------------------------------
$('.Select-Tags').chosen({
    placeholder_text_multiple: 'Seleccione las etiquetas',
    // max_selected_options: 3,
    search_contains: true,
    no_results_text: 'No se ha encontrado la etiqueta'
});

$('.Select-Brand').chosen({
    placeholder_text_single: 'Seleccione la marca',
    // max_selected_options: 3,
    search_contains: true,
    no_results_text: 'No se ha encontrado la marca'
});

$('.Select-Atribute').chosen({
    placeholder_text_multiple: 'Seleccionar',
    // max_selected_options: 3,
    search_contains: true,
    no_results_text: 'No se ha encontrado'
});

$('.Select-Category').chosen({
    placeholder_text_single: 'Seleccione una categoría'
});

$('.Select-Chosen').chosen({
    placeholder_text_single: 'Seleccione una categoría'
});

//----------------------------------------------
//              Slug creator
//----------------------------------------------

$(".SlugInput").keyup(function () {
    var Text = $(this).val();
    Text = Text.toLowerCase();
    var regExp = /\s+/g;
    Text = Text.replace(/[&\/\\#,¡!´#+()$~%.'":*?<>{}]/g, '');
    Text = Text.replace(regExp, '-');
    Text = Text.replace('ñ', 'n');
    Text = Text.replace('á', 'a');
    Text = Text.replace('é', 'e');
    Text = Text.replace('í', 'i');
    Text = Text.replace('ó', 'o');
    Text = Text.replace('ú', 'u');

    $(".SlugInput").val(Text);
});

// Slug AutoFillnput from title 

$("#TitleInput").keyup(function (event) {
    var stt = $(this).val();
    var Text = $(this).val();
    Text = Text.toLowerCase();
    var regExp = /\s+/g;
    Text = Text.replace(/[&\/\\#,¡!´#+()$~%.'":*?<>{}]/g, '');
    Text = Text.replace(regExp, '-');
    Text = Text.replace('ñ', 'n');
    Text = Text.replace('á', 'a');
    Text = Text.replace('é', 'e');
    Text = Text.replace('í', 'i');
    Text = Text.replace('ó', 'o');
    Text = Text.replace('ú', 'u');
    $(".SlugInput").val(Text);
});

//----------------------------------------------
//      CREATE FORM
//----------------------------------------------

// Show Notes Text Area
$('.ShowNotesTextArea').click(function () {
    var notes = $('.NotesTextArea');
    if (notes.hasClass('Hidden')) {
        notes.removeClass('Hidden');
    } else {
        notes.addClass('Hidden');
    }
});

// Add Another Address
$('.AddAnotherAddressBtn').click(function () {
    var addressInput = "<input class='form-control' placeholder='Ingrese otro teléfono' name='deliveryaddress[]' type='text' style='margin-top:5px'>";
    var locInput = "<input class='form-control' placeholder='Ingrese otro teléfono' name='deliveryaddress[]' type='text' style='margin-top:5px'>";

    $('.AnotherAddress').append(addressInput);
    $('.AnotherLoc').append(locInput);
});

//----------------------------------------------
//     CREATE ARTICLE VARIANTS
//----------------------------------------------

window.checkVariants = function () {
    var existingCombinations = [];
    $(".Combination").each(function () {
        existingCombinations.push($(this).data('combination'));
    });
    return existingCombinations;
};

window.makeVariants = function () {
    var variantsContainer = $('#ArticleVariants');
    var variantSize = $('.VariantSize');
    var variantColor = $('.VariantColor');

    var colors = [];
    var sizes = [];

    $.each(variantSize, function () {
        if ($(this).is(':checked')) {
            size = {};
            size['id'] = $(this).val();
            size['name'] = $(this).data('name');
            sizes.push(size);
        }
    });

    $.each(variantColor, function () {
        if ($(this).is(':checked')) {
            color = {};
            color['id'] = $(this).val();
            color['name'] = $(this).data('name');
            colors.push(color);
        }
    });

    var combinations = [];

    $.each(colors, function (index, color) {
        $.each(sizes, function (index, size) {
            var item = {};
            item['combination'] = color['name'] + "/" + size['name'];
            item['color'] = color['name'];
            item['color_id'] = color['id'];
            item['size'] = size['name'];
            item['size_id'] = size['id'];
            combinations.push(item);
        });
    });

    console.log(combinations);

    var existingCombinations = checkVariants();

    $.each(combinations, function (index, value) {
        // ECMA script 6 
        if (!existingCombinations.includes(value['combination'])) {
            var variantRow = "<tr>" + "<td class='Combination' data-combination=" + value['color'] + "/" + value['size'] + ">" + value['color'] + "/" + value['size'] + "</td>" + "<input name='variants[" + value['combination'] + "][color]' value=" + value['color_id'] + " type='hidden' class='form-control'>" + "<input name='variants[" + value['combination'] + "][size]' value=" + value['size_id'] + " type='hidden' class='form-control'>" + "<td><input name='variants[" + value['combination'] + "][stock]' value='10' type='number' min='0' class='form-control'></td>" + "<td><a class='RemoveDynRow delete-icon'><i class='delete-icon fa fa-trash'></i></a></td>" + "</tr>";
            variantsContainer.append(variantRow);
        }
    });
    $('#HeaderVariants').removeClass('Hidden');
};

// Remove new variants row
$('#ArticleVariants').on('click', '.RemoveDynRow', function (e) {
    e.preventDefault();
    $(this).parents('tr').remove();
});

$('.RemoveVariant').on('click', function () {
    console.log($(this).data('rowid'));
    deleteDBItem($(this).data('route'), $(this).data('id'), $(this).data('rowid'));
});

window.deleteDBItem = function (route, id, rowid) {
    $.ajax({
        url: route,
        method: 'POST',
        dataType: 'JSON',
        data: { id: id },
        beforeSend: function beforeSend() {},
        success: function success(data) {
            console.log(data);
            if (data.success == true) {
                // $("#"+rowid).hide();
                $("#" + rowid).remove();
            } else {
                alert_error('Ups!', 'Ha ocurrido un error al eliminar la variante');
                console.log(data);
                console.log(data.message);
                return false;
            }
        },
        error: function error(data) {
            $('#Error').html(data.responseText);
            console.log(data);
            console.log(data.message);
        }
    });
};

//----------------------------------------------
//   EDITORS AND FIELDS 
//----------------------------------------------

// $('#Multi_Images').fileuploader({
//     extensions: ['jpg', 'jpeg', 'png', 'gif'],
//     limit: null,
//     addMore: true,
//     // Peso máximo de todas las imágenes
//     maxSize: 5,
//     // Peso máximo por imágen
//     fileMaxSize: 2,
//     theme: 'thumbnails',
//     enableApi: true,
//     captions: {
//         button: function(options) { return 'Seleccionar ' + (options.limit == 1 ? 'Imágenes' : 'Imágen'); },
//         feedback: function(options) { return 'Haga click para agregar...'; },
//         feedback2: function(options) { return options.length + ' ' + (options.length > 1 ? ' imágenes seleccionadas' : ' imágen seleccionada'); },
//         drop: 'Arrastre las imágenes aquí',
//         paste: '<div class="fileuploader-pending-loader"><div class="left-half" style="animation-duration: ${ms}s"></div><div class="spinner" style="animation-duration: ${ms}s"></div><div class="right-half" style="animation-duration: ${ms}s"></div></div> Pasting a file, click here to cancel.',
//         removeConfirmation: 'Eliminar?',
//         errors: {
//             filesLimit: 'Solo es posible subir ${limit} imágen.',
//             filesType: 'Solo se aceptan los formatos: ${extensions}.',
//             fileSize: '${name} es muy grandes! Seleccione una de ${fileMaxSize}MB. como máximo',
//             filesSizeAll: '${name} son muy grandes! Seleccione unas de ${fileMaxSize}MB. como máximo',
//             fileName: 'La imágen con el nombre ${name} ya está seleccionada.',
//             folderUpload: 'No está permitido subir carpetas.'
//         },
//         dialogs: {
//             // alert dialog
//             alert: function(text) {
//                 return alert_confirm(text);
//             },
//             // confirm dialog
//             confirm: function(text, callback) {
//                 'confirm(text) ? callback() : null;'
//             }
//         },
//     }
// });

$('#Single_Image').fileuploader({
    extensions: ['jpg', 'jpeg', 'png', 'gif'],
    limit: 1,
    addMore: false,
    fileMaxSize: 2,
    captions: {
        button: function button(options) {
            return 'Seleccionar ' + (options.limit == 1 ? 'Imágen' : 'Imágen');
        },
        feedback: function feedback(options) {
            return 'Agregar imágenes...';
        },
        feedback2: function feedback2(options) {
            return options.length + ' ' + (options.length > 1 ? ' imágenes seleccionadas' : ' imágen seleccionada');
        },
        drop: 'Arrastre las imágenes aquí',
        paste: '<div class="fileuploader-pending-loader"><div class="left-half" style="animation-duration: ${ms}s"></div><div class="spinner" style="animation-duration: ${ms}s"></div><div class="right-half" style="animation-duration: ${ms}s"></div></div> Pasting a file, click here to cancel.',
        removeConfirmation: 'Eliminar?',
        errors: {
            filesLimit: 'Solo es posible subir ${limit} imágen.',
            filesType: 'Solo se aceptan los formatos: ${extensions}.',
            fileSize: 'La imágen pesa mucho! Elija una de ${fileMaxSize}MB como máximo.',
            fileName: 'La imágen con ese nombre ya ha sido elegida',
            folderUpload: 'No está permitido subir carpetas.'
        },
        dialogs: {
            // alert dialog
            alert: function (_alert) {
                function alert(_x) {
                    return _alert.apply(this, arguments);
                }

                alert.toString = function () {
                    return _alert.toString();
                };

                return alert;
            }(function (text) {
                return alert(text);
            }),
            // confirm dialog
            confirm: function confirm(text, callback) {
                'confirm(text) ? callback() : null;';
            }
        }
    }
});

$('#Multi_Images').fileuploader({
    extensions: ['jpg', 'jpeg', 'png', 'gif', 'bmp'],
    changeInput: ' ',
    theme: 'thumbnails',
    enableApi: true,
    addMore: true,
    thumbnails: {
        box: '<div class="fileuploader-items">' + '<ul class="fileuploader-items-list">' + '<li class="fileuploader-thumbnails-input"><div class="fileuploader-thumbnails-input-inner">+</div></li>' + '</ul>' + '</div>',
        item: '<li class="fileuploader-item">' + '<div class="fileuploader-item-inner" onclick="featureOnClick();">' + '<div class="thumbnail-holder">${image}</div>' + '<div class="actions-holder">' + '<a class="fileuploader-action fileuploader-action-remove" title="${captions.remove}"><i class="remove"></i></a>' + '<span class="fileuploader-action-popup"></span>' + '</div>' + '<div class="progress-holder">${progressBar}</div>' + '</div>' + '</li>',
        item2: '<li class="fileuploader-item">' + '<div class="fileuploader-item-inner">' + '<div class="thumbnail-holder">${image}</div>' + '<div class="actions-holder">' + '<a class="fileuploader-action fileuploader-action-remove" title="${captions.remove}"><i class="remove"></i></a>' + '<span class="fileuploader-action-popup"></span>' + '</div>' + '</div>' + '</li>',
        startImageRenderer: true,
        canvasImage: false,
        _selectors: {
            list: '.fileuploader-items-list',
            item: '.fileuploader-item',
            start: '.fileuploader-action-start',
            retry: '.fileuploader-action-retry',
            remove: '.fileuploader-action-remove'
        },
        onItemShow: function onItemShow(item, listEl, parentEl, newInputEl, inputEl) {
            var plusInput = listEl.find('.fileuploader-thumbnails-input'),
                api = $.fileuploader.getInstance(inputEl.get(0));

            plusInput.insertAfter(item.html)[api.getOptions().limit && api.getChoosedFiles().length >= api.getOptions().limit ? 'hide' : 'show']();

            if (item.format == 'image') {
                item.html.find('.fileuploader-item-icon').hide();
            }
        }
    },
    afterRender: function afterRender(listEl, parentEl, newInputEl, inputEl) {
        var plusInput = listEl.find('.fileuploader-thumbnails-input'),
            api = $.fileuploader.getInstance(inputEl.get(0));

        plusInput.on('click', function () {
            api.open();
        });
    },
    onRemove: function onRemove(item, listEl, parentEl, newInputEl, inputEl) {
        var plusInput = listEl.find('.fileuploader-thumbnails-input'),
            api = $.fileuploader.getInstance(inputEl.get(0));

        if (api.getOptions().limit && api.getChoosedFiles().length - 1 < api.getOptions().limit) plusInput.show();
    }
    /*
    // while using upload option, please set
    // startImageRenderer: false
    // for a better effect
    upload: {
        url: './php/upload_file.php',
        data: null,
        type: 'POST',
        enctype: 'multipart/form-data',
        start: true,
        synchron: true,
        beforeSend: null,
        onSuccess: function(data, item) {
            setTimeout(function() {
                item.html.find('.progress-holder').hide();
                item.renderThumbnail();
            }, 400);
        },
        onError: function(item) {
            item.html.find('.progress-holder').hide();
            item.html.find('.fileuploader-item-icon i').text('Failed!');
        },
        onProgress: function(data, item) {
            var progressBar = item.html.find('.progress-holder');
            
            if(progressBar.length > 0) {
                progressBar.show();
                progressBar.find('.fileuploader-progressbar .bar').width(data.percentage + "%");
            }
        }
    },
    dragDrop: {
        container: '.fileuploader-thumbnails-input'
    },
    onRemove: function(item) {
        $.post('php/upload_remove.php', {
            file: item.name
        });
    },
    */
});

window.featureOnClick = function () {
    alert();
};

$('.Display-Input-Modificable').click(function () {
    $(this).removeClass('display-input-disabled');
});

// ---- Modificable input text
// Html element
//<p data-editable class="SlugInput">{{ $article->slug }}</p>   

$('body').on('click', '[data-editable]', function () {

    var $el = $(this);

    var $input = $('<input/>').val($el.text());
    $el.replaceWith($input);

    var save = function save() {
        var $p = $('<p data-editable />').text($input.val());
        $input.replaceWith($p);
    };

    /**
      We're defining the callback with `one`, because we know that
      the element will be gone just after that, and we don't want 
      any callbacks leftovers take memory. 
      Next time `p` turns into `input` this single callback 
      will be applied again.
    */
    $input.one('blur', save).focus();
});

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgNzIwMTI2OWExMjJlZjQzMzc1ZWIiLCJ3ZWJwYWNrOi8vLy4vcmVzb3VyY2VzL2Fzc2V0cy9qcy92YWRtaW4tZm9ybXMuanMiXSwibmFtZXMiOlsiJCIsImNob3NlbiIsInBsYWNlaG9sZGVyX3RleHRfbXVsdGlwbGUiLCJzZWFyY2hfY29udGFpbnMiLCJub19yZXN1bHRzX3RleHQiLCJwbGFjZWhvbGRlcl90ZXh0X3NpbmdsZSIsImtleXVwIiwiVGV4dCIsInZhbCIsInRvTG93ZXJDYXNlIiwicmVnRXhwIiwicmVwbGFjZSIsImV2ZW50Iiwic3R0IiwiY2xpY2siLCJub3RlcyIsImhhc0NsYXNzIiwicmVtb3ZlQ2xhc3MiLCJhZGRDbGFzcyIsImFkZHJlc3NJbnB1dCIsImxvY0lucHV0IiwiYXBwZW5kIiwid2luZG93IiwiY2hlY2tWYXJpYW50cyIsImV4aXN0aW5nQ29tYmluYXRpb25zIiwiZWFjaCIsInB1c2giLCJkYXRhIiwibWFrZVZhcmlhbnRzIiwidmFyaWFudHNDb250YWluZXIiLCJ2YXJpYW50U2l6ZSIsInZhcmlhbnRDb2xvciIsImNvbG9ycyIsInNpemVzIiwiaXMiLCJzaXplIiwiY29sb3IiLCJjb21iaW5hdGlvbnMiLCJpbmRleCIsIml0ZW0iLCJjb25zb2xlIiwibG9nIiwidmFsdWUiLCJpbmNsdWRlcyIsInZhcmlhbnRSb3ciLCJvbiIsImUiLCJwcmV2ZW50RGVmYXVsdCIsInBhcmVudHMiLCJyZW1vdmUiLCJkZWxldGVEQkl0ZW0iLCJyb3V0ZSIsImlkIiwicm93aWQiLCJhamF4IiwidXJsIiwibWV0aG9kIiwiZGF0YVR5cGUiLCJiZWZvcmVTZW5kIiwic3VjY2VzcyIsImFsZXJ0X2Vycm9yIiwibWVzc2FnZSIsImVycm9yIiwiaHRtbCIsInJlc3BvbnNlVGV4dCIsImZpbGV1cGxvYWRlciIsImV4dGVuc2lvbnMiLCJsaW1pdCIsImFkZE1vcmUiLCJmaWxlTWF4U2l6ZSIsImNhcHRpb25zIiwiYnV0dG9uIiwib3B0aW9ucyIsImZlZWRiYWNrIiwiZmVlZGJhY2syIiwibGVuZ3RoIiwiZHJvcCIsInBhc3RlIiwicmVtb3ZlQ29uZmlybWF0aW9uIiwiZXJyb3JzIiwiZmlsZXNMaW1pdCIsImZpbGVzVHlwZSIsImZpbGVTaXplIiwiZmlsZU5hbWUiLCJmb2xkZXJVcGxvYWQiLCJkaWFsb2dzIiwiYWxlcnQiLCJ0ZXh0IiwiY29uZmlybSIsImNhbGxiYWNrIiwiY2hhbmdlSW5wdXQiLCJ0aGVtZSIsImVuYWJsZUFwaSIsInRodW1ibmFpbHMiLCJib3giLCJpdGVtMiIsInN0YXJ0SW1hZ2VSZW5kZXJlciIsImNhbnZhc0ltYWdlIiwiX3NlbGVjdG9ycyIsImxpc3QiLCJzdGFydCIsInJldHJ5Iiwib25JdGVtU2hvdyIsImxpc3RFbCIsInBhcmVudEVsIiwibmV3SW5wdXRFbCIsImlucHV0RWwiLCJwbHVzSW5wdXQiLCJmaW5kIiwiYXBpIiwiZ2V0SW5zdGFuY2UiLCJnZXQiLCJpbnNlcnRBZnRlciIsImdldE9wdGlvbnMiLCJnZXRDaG9vc2VkRmlsZXMiLCJmb3JtYXQiLCJoaWRlIiwiYWZ0ZXJSZW5kZXIiLCJvcGVuIiwib25SZW1vdmUiLCJzaG93IiwiZmVhdHVyZU9uQ2xpY2siLCIkZWwiLCIkaW5wdXQiLCJyZXBsYWNlV2l0aCIsInNhdmUiLCIkcCIsIm9uZSIsImZvY3VzIl0sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUEyQiwwQkFBMEIsRUFBRTtBQUN2RCx5Q0FBaUMsZUFBZTtBQUNoRDtBQUNBO0FBQ0E7O0FBRUE7QUFD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Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7XG4gXHRcdFx0XHRjb25maWd1cmFibGU6IGZhbHNlLFxuIFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGdldDogZ2V0dGVyXG4gXHRcdFx0fSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiL1wiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDc4KTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCA3MjAxMjY5YTEyMmVmNDMzNzVlYiIsIi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4vLyAgICAgICAgICAgICAgICAgICAgQ29sb3JzXHJcbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG5cclxuJCgnLlNlbGVjdC1Db2xvcnMnKS5jaG9zZW4oe1xyXG4gICAgcGxhY2Vob2xkZXJfdGV4dF9tdWx0aXBsZTogJ1NlbGVjY2lvbmUgbG9zIGNvbG9yZXMnLFxyXG4gICAgLy8gbWF4X3NlbGVjdGVkX29wdGlvbnM6IDMsXHJcbiAgICBzZWFyY2hfY29udGFpbnM6IHRydWUsXHJcbiAgICBub19yZXN1bHRzX3RleHQ6ICdObyBzZSBoYSBlbmNvbnRyYWRvIGVsIGNvbG9yJ1xyXG59KTtcclxuXHJcbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4vLyAgICAgICAgICAgICAgICAgICAgIFRhZ3NcclxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiQoJy5TZWxlY3QtVGFncycpLmNob3Nlbih7XHJcbiAgICBwbGFjZWhvbGRlcl90ZXh0X211bHRpcGxlOiAnU2VsZWNjaW9uZSBsYXMgZXRpcXVldGFzJyxcclxuICAgIC8vIG1heF9zZWxlY3RlZF9vcHRpb25zOiAzLFxyXG4gICAgc2VhcmNoX2NvbnRhaW5zOiB0cnVlLFxyXG4gICAgbm9fcmVzdWx0c190ZXh0OiAnTm8gc2UgaGEgZW5jb250cmFkbyBsYSBldGlxdWV0YSdcclxufSk7XHJcblxyXG4kKCcuU2VsZWN0LUJyYW5kJykuY2hvc2VuKHtcclxuICAgIHBsYWNlaG9sZGVyX3RleHRfc2luZ2xlOiAnU2VsZWNjaW9uZSBsYSBtYXJjYScsXHJcbiAgICAvLyBtYXhfc2VsZWN0ZWRfb3B0aW9uczogMyxcclxuICAgIHNlYXJjaF9jb250YWluczogdHJ1ZSxcclxuICAgIG5vX3Jlc3VsdHNfdGV4dDogJ05vIHNlIGhhIGVuY29udHJhZG8gbGEgbWFyY2EnXHJcbn0pO1xyXG5cclxuXHJcblxyXG4kKCcuU2VsZWN0LUF0cmlidXRlJykuY2hvc2VuKHtcclxuICAgIHBsYWNlaG9sZGVyX3RleHRfbXVsdGlwbGU6ICdTZWxlY2Npb25hcicsXHJcbiAgICAvLyBtYXhfc2VsZWN0ZWRfb3B0aW9uczogMyxcclxuICAgIHNlYXJjaF9jb250YWluczogdHJ1ZSxcclxuICAgIG5vX3Jlc3VsdHNfdGV4dDogJ05vIHNlIGhhIGVuY29udHJhZG8nXHJcbn0pO1xyXG5cclxuJCgnLlNlbGVjdC1DYXRlZ29yeScpLmNob3Nlbih7XHJcbiAgICBwbGFjZWhvbGRlcl90ZXh0X3NpbmdsZTogJ1NlbGVjY2lvbmUgdW5hIGNhdGVnb3LDrWEnLFxyXG59KTtcclxuXHJcbiQoJy5TZWxlY3QtQ2hvc2VuJykuY2hvc2VuKHtcclxuICAgIHBsYWNlaG9sZGVyX3RleHRfc2luZ2xlOiAnU2VsZWNjaW9uZSB1bmEgY2F0ZWdvcsOtYScsXHJcbn0pO1xyXG5cclxuXHJcbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4vLyAgICAgICAgICAgICAgU2x1ZyBjcmVhdG9yXHJcbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG5cclxuJChcIi5TbHVnSW5wdXRcIikua2V5dXAoZnVuY3Rpb24oKXtcclxuICAgIHZhciBUZXh0ICAgICA9ICQodGhpcykudmFsKCk7XHJcbiAgICBUZXh0ICAgICAgICAgPSBUZXh0LnRvTG93ZXJDYXNlKCk7XHJcbiAgICB2YXIgcmVnRXhwICAgPSAvXFxzKy9nO1xyXG4gICAgVGV4dCAgICAgICAgID0gVGV4dC5yZXBsYWNlKC9bJlxcL1xcXFwjLMKhIcK0IysoKSR+JS4nXCI6Kj88Pnt9XS9nLCcnKTtcclxuICAgIFRleHQgICAgICAgICA9IFRleHQucmVwbGFjZShyZWdFeHAsJy0nKTtcclxuICAgIFRleHQgICAgICAgICA9IFRleHQucmVwbGFjZSgnw7EnLCAnbicpIDtcclxuICAgIFRleHQgICAgICAgICA9IFRleHQucmVwbGFjZSgnw6EnLCAnYScpIDtcclxuICAgIFRleHQgICAgICAgICA9IFRleHQucmVwbGFjZSgnw6knLCAnZScpIDtcclxuICAgIFRleHQgICAgICAgICA9IFRleHQucmVwbGFjZSgnw60nLCAnaScpIDtcclxuICAgIFRleHQgICAgICAgICA9IFRleHQucmVwbGFjZSgnw7MnLCAnbycpIDtcclxuICAgIFRleHQgICAgICAgICA9IFRleHQucmVwbGFjZSgnw7onLCAndScpIDtcclxuICAgIFxyXG4gICAgJChcIi5TbHVnSW5wdXRcIikudmFsKFRleHQpOyAgIFxyXG59KTtcclxuXHJcbi8vIFNsdWcgQXV0b0ZpbGxucHV0IGZyb20gdGl0bGUgXHJcblxyXG4kKFwiI1RpdGxlSW5wdXRcIikua2V5dXAoZnVuY3Rpb24oZXZlbnQpIHtcclxuICAgIHZhciBzdHQgPSAkKHRoaXMpLnZhbCgpO1xyXG4gICAgdmFyIFRleHQgICAgID0gJCh0aGlzKS52YWwoKTtcclxuICAgIFRleHQgICAgICAgICA9IFRleHQudG9Mb3dlckNhc2UoKTtcclxuICAgIHZhciByZWdFeHAgICA9IC9cXHMrL2c7XHJcbiAgICBUZXh0ICAgICAgICAgPSBUZXh0LnJlcGxhY2UoL1smXFwvXFxcXCMswqEhwrQjKygpJH4lLidcIjoqPzw+e31dL2csJycpO1xyXG4gICAgVGV4dCAgICAgICAgID0gVGV4dC5yZXBsYWNlKHJlZ0V4cCwnLScpO1xyXG4gICAgVGV4dCAgICAgICAgID0gVGV4dC5yZXBsYWNlKCfDsScsICduJykgO1xyXG4gICAgVGV4dCAgICAgICAgID0gVGV4dC5yZXBsYWNlKCfDoScsICdhJykgO1xyXG4gICAgVGV4dCAgICAgICAgID0gVGV4dC5yZXBsYWNlKCfDqScsICdlJykgO1xyXG4gICAgVGV4dCAgICAgICAgID0gVGV4dC5yZXBsYWNlKCfDrScsICdpJykgO1xyXG4gICAgVGV4dCAgICAgICAgID0gVGV4dC5yZXBsYWNlKCfDsycsICdvJykgO1xyXG4gICAgVGV4dCAgICAgICAgID0gVGV4dC5yZXBsYWNlKCfDuicsICd1JykgO1xyXG4gICAgJChcIi5TbHVnSW5wdXRcIikudmFsKFRleHQpOyAgIFxyXG59KTtcclxuXHJcblxyXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuLy8gICAgICBDUkVBVEUgRk9STVxyXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuXHJcbi8vIFNob3cgTm90ZXMgVGV4dCBBcmVhXHJcbiQoJy5TaG93Tm90ZXNUZXh0QXJlYScpLmNsaWNrKGZ1bmN0aW9uKCl7XHJcbiAgICB2YXIgbm90ZXMgPSAkKCcuTm90ZXNUZXh0QXJlYScpO1xyXG4gICAgaWYgKG5vdGVzLmhhc0NsYXNzKCdIaWRkZW4nKSl7XHJcbiAgICAgICAgbm90ZXMucmVtb3ZlQ2xhc3MoJ0hpZGRlbicpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICBub3Rlcy5hZGRDbGFzcygnSGlkZGVuJyk7XHJcbiAgICB9XHJcbn0pO1xyXG5cclxuLy8gQWRkIEFub3RoZXIgQWRkcmVzc1xyXG4kKCcuQWRkQW5vdGhlckFkZHJlc3NCdG4nKS5jbGljayhmdW5jdGlvbigpe1xyXG4gICAgdmFyIGFkZHJlc3NJbnB1dCA9IFwiPGlucHV0IGNsYXNzPSdmb3JtLWNvbnRyb2wnIHBsYWNlaG9sZGVyPSdJbmdyZXNlIG90cm8gdGVsw6lmb25vJyBuYW1lPSdkZWxpdmVyeWFkZHJlc3NbXScgdHlwZT0ndGV4dCcgc3R5bGU9J21hcmdpbi10b3A6NXB4Jz5cIjtcclxuICAgIHZhciBsb2NJbnB1dCAgICAgPSBcIjxpbnB1dCBjbGFzcz0nZm9ybS1jb250cm9sJyBwbGFjZWhvbGRlcj0nSW5ncmVzZSBvdHJvIHRlbMOpZm9ubycgbmFtZT0nZGVsaXZlcnlhZGRyZXNzW10nIHR5cGU9J3RleHQnIHN0eWxlPSdtYXJnaW4tdG9wOjVweCc+XCI7XHJcblxyXG4gICAgJCgnLkFub3RoZXJBZGRyZXNzJykuYXBwZW5kKGFkZHJlc3NJbnB1dCk7XHJcbiAgICAkKCcuQW5vdGhlckxvYycpLmFwcGVuZChsb2NJbnB1dCk7XHJcbn0pO1xyXG5cclxuXHJcbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4vLyAgICAgQ1JFQVRFIEFSVElDTEUgVkFSSUFOVFNcclxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcblxyXG53aW5kb3cuY2hlY2tWYXJpYW50cyA9IGZ1bmN0aW9uKClcclxue1xyXG4gICAgbGV0IGV4aXN0aW5nQ29tYmluYXRpb25zID0gW107XHJcbiAgICAkKFwiLkNvbWJpbmF0aW9uXCIpLmVhY2goZnVuY3Rpb24oKXtcclxuICAgICAgICBleGlzdGluZ0NvbWJpbmF0aW9ucy5wdXNoKCQodGhpcykuZGF0YSgnY29tYmluYXRpb24nKSk7XHJcbiAgICB9KTtcclxuICAgIHJldHVybiBleGlzdGluZ0NvbWJpbmF0aW9ucztcclxufVxyXG5cclxuXHJcbndpbmRvdy5tYWtlVmFyaWFudHMgPSBmdW5jdGlvbigpXHJcbntcclxuICAgIGNvbnN0IHZhcmlhbnRzQ29udGFpbmVyID0gJCgnI0FydGljbGVWYXJpYW50cycpO1xyXG4gICAgY29uc3QgdmFyaWFudFNpemUgPSAkKCcuVmFyaWFudFNpemUnKTtcclxuICAgIGNvbnN0IHZhcmlhbnRDb2xvciA9ICQoJy5WYXJpYW50Q29sb3InKTtcclxuICAgIFxyXG4gICAgbGV0IGNvbG9ycyA9IFtdO1xyXG4gICAgbGV0IHNpemVzID0gW107XHJcblxyXG4gICAgXHJcblxyXG4gICAgJC5lYWNoKHZhcmlhbnRTaXplLCBmdW5jdGlvbigpe1xyXG4gICAgICAgIGlmKCQodGhpcykuaXMoJzpjaGVja2VkJykpXHJcbiAgICAgICAgeyAgIFxyXG4gICAgICAgICAgICBzaXplID0ge307XHJcbiAgICAgICAgICAgIHNpemVbJ2lkJ10gPSAkKHRoaXMpLnZhbCgpO1xyXG4gICAgICAgICAgICBzaXplWyduYW1lJ10gPSAkKHRoaXMpLmRhdGEoJ25hbWUnKTtcclxuICAgICAgICAgICAgc2l6ZXMucHVzaChzaXplKTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuICAgIFxyXG4gICAgJC5lYWNoKHZhcmlhbnRDb2xvciwgZnVuY3Rpb24oKXtcclxuICAgICAgICBpZigkKHRoaXMpLmlzKCc6Y2hlY2tlZCcpKVxyXG4gICAgICAgIHsgICBcclxuICAgICAgICAgICAgY29sb3IgPSB7fTtcclxuICAgICAgICAgICAgY29sb3JbJ2lkJ10gPSAkKHRoaXMpLnZhbCgpO1xyXG4gICAgICAgICAgICBjb2xvclsnbmFtZSddID0gJCh0aGlzKS5kYXRhKCduYW1lJyk7XHJcbiAgICAgICAgICAgIGNvbG9ycy5wdXNoKGNvbG9yKTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuICAgICAgIFxyXG4gICAgbGV0IGNvbWJpbmF0aW9ucyA9IFtdO1xyXG5cclxuICAgICQuZWFjaChjb2xvcnMsIGZ1bmN0aW9uKGluZGV4LCBjb2xvcil7XHJcbiAgICAgICAgJC5lYWNoKHNpemVzLCAgZnVuY3Rpb24oaW5kZXgsIHNpemUpe1xyXG4gICAgICAgICAgICBsZXQgaXRlbSA9IHt9OyBcclxuICAgICAgICAgICAgaXRlbVsnY29tYmluYXRpb24nXSA9IGNvbG9yWyduYW1lJ10rXCIvXCIrc2l6ZVsnbmFtZSddO1xyXG4gICAgICAgICAgICBpdGVtWydjb2xvciddID0gY29sb3JbJ25hbWUnXTtcclxuICAgICAgICAgICAgaXRlbVsnY29sb3JfaWQnXSA9IGNvbG9yWydpZCddO1xyXG4gICAgICAgICAgICBpdGVtWydzaXplJ10gPSBzaXplWyduYW1lJ107XHJcbiAgICAgICAgICAgIGl0ZW1bJ3NpemVfaWQnXSA9IHNpemVbJ2lkJ107XHJcbiAgICAgICAgICAgIGNvbWJpbmF0aW9ucy5wdXNoKGl0ZW0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSk7XHJcblxyXG4gICAgY29uc29sZS5sb2coY29tYmluYXRpb25zKTtcclxuICAgIFxyXG4gICAgbGV0IGV4aXN0aW5nQ29tYmluYXRpb25zID0gY2hlY2tWYXJpYW50cygpO1xyXG5cclxuICAgICQuZWFjaChjb21iaW5hdGlvbnMsIGZ1bmN0aW9uKGluZGV4LCB2YWx1ZSlcclxuICAgIHsgICBcclxuICAgICAgICAvLyBFQ01BIHNjcmlwdCA2IFxyXG4gICAgICAgIGlmKCFleGlzdGluZ0NvbWJpbmF0aW9ucy5pbmNsdWRlcyh2YWx1ZVsnY29tYmluYXRpb24nXSkpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBsZXQgdmFyaWFudFJvdyA9IFwiPHRyPlwiICtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIjx0ZCBjbGFzcz0nQ29tYmluYXRpb24nIGRhdGEtY29tYmluYXRpb249XCIrIHZhbHVlWydjb2xvciddICtcIi9cIiArIHZhbHVlWydzaXplJ10gKyBcIj5cIisgdmFsdWVbJ2NvbG9yJ10gK1wiL1wiICsgdmFsdWVbJ3NpemUnXSArIFwiPC90ZD5cIiArXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCI8aW5wdXQgbmFtZT0ndmFyaWFudHNbXCIrdmFsdWVbJ2NvbWJpbmF0aW9uJ10rXCJdW2NvbG9yXScgdmFsdWU9XCIrIHZhbHVlWydjb2xvcl9pZCddICtcIiB0eXBlPSdoaWRkZW4nIGNsYXNzPSdmb3JtLWNvbnRyb2wnPlwiICtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIjxpbnB1dCBuYW1lPSd2YXJpYW50c1tcIit2YWx1ZVsnY29tYmluYXRpb24nXStcIl1bc2l6ZV0nIHZhbHVlPVwiKyB2YWx1ZVsnc2l6ZV9pZCddICtcIiB0eXBlPSdoaWRkZW4nIGNsYXNzPSdmb3JtLWNvbnRyb2wnPlwiICtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIjx0ZD48aW5wdXQgbmFtZT0ndmFyaWFudHNbXCIrdmFsdWVbJ2NvbWJpbmF0aW9uJ10rXCJdW3N0b2NrXScgdmFsdWU9JzEwJyB0eXBlPSdudW1iZXInIG1pbj0nMCcgY2xhc3M9J2Zvcm0tY29udHJvbCc+PC90ZD5cIiArXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCI8dGQ+PGEgY2xhc3M9J1JlbW92ZUR5blJvdyBkZWxldGUtaWNvbic+PGkgY2xhc3M9J2RlbGV0ZS1pY29uIGZhIGZhLXRyYXNoJz48L2k+PC9hPjwvdGQ+XCIgK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiPC90cj5cIjtcclxuICAgICAgICAgICAgdmFyaWFudHNDb250YWluZXIuYXBwZW5kKHZhcmlhbnRSb3cpO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG4gICAgJCgnI0hlYWRlclZhcmlhbnRzJykucmVtb3ZlQ2xhc3MoJ0hpZGRlbicpO1xyXG59XHJcblxyXG5cclxuLy8gUmVtb3ZlIG5ldyB2YXJpYW50cyByb3dcclxuJCgnI0FydGljbGVWYXJpYW50cycpLm9uKCdjbGljaycsICcuUmVtb3ZlRHluUm93JywgZnVuY3Rpb24oZSkge1xyXG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgJCh0aGlzKS5wYXJlbnRzKCd0cicpLnJlbW92ZSgpO1xyXG59KTtcclxuXHJcbiQoJy5SZW1vdmVWYXJpYW50Jykub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XHJcbiAgICBjb25zb2xlLmxvZygkKHRoaXMpLmRhdGEoJ3Jvd2lkJykpO1xyXG4gICAgZGVsZXRlREJJdGVtKCQodGhpcykuZGF0YSgncm91dGUnKSwgJCh0aGlzKS5kYXRhKCdpZCcpLCAkKHRoaXMpLmRhdGEoJ3Jvd2lkJykpO1xyXG59KTtcclxuXHJcblxyXG53aW5kb3cuZGVsZXRlREJJdGVtID0gZnVuY3Rpb24ocm91dGUsIGlkLCByb3dpZCl7XHJcbiAgICAkLmFqYXgoe1xyXG4gICAgICAgIHVybDogcm91dGUsXHJcbiAgICAgICAgbWV0aG9kOiAnUE9TVCcsICAgICAgICAgICAgIFxyXG4gICAgICAgIGRhdGFUeXBlOiAnSlNPTicsXHJcbiAgICAgICAgZGF0YTogeyBpZDogaWQgfSxcclxuICAgICAgICBiZWZvcmVTZW5kOiBmdW5jdGlvbigpe1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgc3VjY2VzczogZnVuY3Rpb24oZGF0YSl7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGRhdGEpO1xyXG4gICAgICAgICAgICBpZiAoZGF0YS5zdWNjZXNzID09IHRydWUpIHtcclxuICAgICAgICAgICAgICAgIC8vICQoXCIjXCIrcm93aWQpLmhpZGUoKTtcclxuICAgICAgICAgICAgICAgICQoXCIjXCIrcm93aWQpLnJlbW92ZSgpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgYWxlcnRfZXJyb3IoJ1VwcyEnLCdIYSBvY3VycmlkbyB1biBlcnJvciBhbCBlbGltaW5hciBsYSB2YXJpYW50ZScpO1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coZGF0YSk7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhkYXRhLm1lc3NhZ2UpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuICAgICAgICBlcnJvcjogZnVuY3Rpb24oZGF0YSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgICQoJyNFcnJvcicpLmh0bWwoZGF0YS5yZXNwb25zZVRleHQpO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhkYXRhKTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coZGF0YS5tZXNzYWdlKTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxufVxyXG5cclxuXHJcblxyXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuLy8gICBFRElUT1JTIEFORCBGSUVMRFMgXHJcbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG5cclxuLy8gJCgnI011bHRpX0ltYWdlcycpLmZpbGV1cGxvYWRlcih7XHJcbi8vICAgICBleHRlbnNpb25zOiBbJ2pwZycsICdqcGVnJywgJ3BuZycsICdnaWYnXSxcclxuLy8gICAgIGxpbWl0OiBudWxsLFxyXG4vLyAgICAgYWRkTW9yZTogdHJ1ZSxcclxuLy8gICAgIC8vIFBlc28gbcOheGltbyBkZSB0b2RhcyBsYXMgaW3DoWdlbmVzXHJcbi8vICAgICBtYXhTaXplOiA1LFxyXG4vLyAgICAgLy8gUGVzbyBtw6F4aW1vIHBvciBpbcOhZ2VuXHJcbi8vICAgICBmaWxlTWF4U2l6ZTogMixcclxuLy8gICAgIHRoZW1lOiAndGh1bWJuYWlscycsXHJcbi8vICAgICBlbmFibGVBcGk6IHRydWUsXHJcbi8vICAgICBjYXB0aW9uczoge1xyXG4vLyAgICAgICAgIGJ1dHRvbjogZnVuY3Rpb24ob3B0aW9ucykgeyByZXR1cm4gJ1NlbGVjY2lvbmFyICcgKyAob3B0aW9ucy5saW1pdCA9PSAxID8gJ0ltw6FnZW5lcycgOiAnSW3DoWdlbicpOyB9LFxyXG4vLyAgICAgICAgIGZlZWRiYWNrOiBmdW5jdGlvbihvcHRpb25zKSB7IHJldHVybiAnSGFnYSBjbGljayBwYXJhIGFncmVnYXIuLi4nOyB9LFxyXG4vLyAgICAgICAgIGZlZWRiYWNrMjogZnVuY3Rpb24ob3B0aW9ucykgeyByZXR1cm4gb3B0aW9ucy5sZW5ndGggKyAnICcgKyAob3B0aW9ucy5sZW5ndGggPiAxID8gJyBpbcOhZ2VuZXMgc2VsZWNjaW9uYWRhcycgOiAnIGltw6FnZW4gc2VsZWNjaW9uYWRhJyk7IH0sXHJcbi8vICAgICAgICAgZHJvcDogJ0FycmFzdHJlIGxhcyBpbcOhZ2VuZXMgYXF1w60nLFxyXG4vLyAgICAgICAgIHBhc3RlOiAnPGRpdiBjbGFzcz1cImZpbGV1cGxvYWRlci1wZW5kaW5nLWxvYWRlclwiPjxkaXYgY2xhc3M9XCJsZWZ0LWhhbGZcIiBzdHlsZT1cImFuaW1hdGlvbi1kdXJhdGlvbjogJHttc31zXCI+PC9kaXY+PGRpdiBjbGFzcz1cInNwaW5uZXJcIiBzdHlsZT1cImFuaW1hdGlvbi1kdXJhdGlvbjogJHttc31zXCI+PC9kaXY+PGRpdiBjbGFzcz1cInJpZ2h0LWhhbGZcIiBzdHlsZT1cImFuaW1hdGlvbi1kdXJhdGlvbjogJHttc31zXCI+PC9kaXY+PC9kaXY+IFBhc3RpbmcgYSBmaWxlLCBjbGljayBoZXJlIHRvIGNhbmNlbC4nLFxyXG4vLyAgICAgICAgIHJlbW92ZUNvbmZpcm1hdGlvbjogJ0VsaW1pbmFyPycsXHJcbi8vICAgICAgICAgZXJyb3JzOiB7XHJcbi8vICAgICAgICAgICAgIGZpbGVzTGltaXQ6ICdTb2xvIGVzIHBvc2libGUgc3ViaXIgJHtsaW1pdH0gaW3DoWdlbi4nLFxyXG4vLyAgICAgICAgICAgICBmaWxlc1R5cGU6ICdTb2xvIHNlIGFjZXB0YW4gbG9zIGZvcm1hdG9zOiAke2V4dGVuc2lvbnN9LicsXHJcbi8vICAgICAgICAgICAgIGZpbGVTaXplOiAnJHtuYW1lfSBlcyBtdXkgZ3JhbmRlcyEgU2VsZWNjaW9uZSB1bmEgZGUgJHtmaWxlTWF4U2l6ZX1NQi4gY29tbyBtw6F4aW1vJyxcclxuLy8gICAgICAgICAgICAgZmlsZXNTaXplQWxsOiAnJHtuYW1lfSBzb24gbXV5IGdyYW5kZXMhIFNlbGVjY2lvbmUgdW5hcyBkZSAke2ZpbGVNYXhTaXplfU1CLiBjb21vIG3DoXhpbW8nLFxyXG4vLyAgICAgICAgICAgICBmaWxlTmFtZTogJ0xhIGltw6FnZW4gY29uIGVsIG5vbWJyZSAke25hbWV9IHlhIGVzdMOhIHNlbGVjY2lvbmFkYS4nLFxyXG4vLyAgICAgICAgICAgICBmb2xkZXJVcGxvYWQ6ICdObyBlc3TDoSBwZXJtaXRpZG8gc3ViaXIgY2FycGV0YXMuJ1xyXG4vLyAgICAgICAgIH0sXHJcbi8vICAgICAgICAgZGlhbG9nczoge1xyXG4vLyAgICAgICAgICAgICAvLyBhbGVydCBkaWFsb2dcclxuLy8gICAgICAgICAgICAgYWxlcnQ6IGZ1bmN0aW9uKHRleHQpIHtcclxuLy8gICAgICAgICAgICAgICAgIHJldHVybiBhbGVydF9jb25maXJtKHRleHQpO1xyXG4vLyAgICAgICAgICAgICB9LFxyXG4vLyAgICAgICAgICAgICAvLyBjb25maXJtIGRpYWxvZ1xyXG4vLyAgICAgICAgICAgICBjb25maXJtOiBmdW5jdGlvbih0ZXh0LCBjYWxsYmFjaykge1xyXG4vLyAgICAgICAgICAgICAgICAgJ2NvbmZpcm0odGV4dCkgPyBjYWxsYmFjaygpIDogbnVsbDsnXHJcbi8vICAgICAgICAgICAgIH1cclxuLy8gICAgICAgICB9LFxyXG4vLyAgICAgfVxyXG4vLyB9KTtcclxuXHJcbiQoJyNTaW5nbGVfSW1hZ2UnKS5maWxldXBsb2FkZXIoe1xyXG4gICAgZXh0ZW5zaW9uczogWydqcGcnLCAnanBlZycsICdwbmcnLCAnZ2lmJ10sXHJcbiAgICBsaW1pdDogMSxcclxuICAgIGFkZE1vcmU6IGZhbHNlLFxyXG4gICAgZmlsZU1heFNpemU6IDIsXHJcbiAgICBjYXB0aW9uczoge1xyXG4gICAgICAgIGJ1dHRvbjogZnVuY3Rpb24ob3B0aW9ucykgeyByZXR1cm4gJ1NlbGVjY2lvbmFyICcgKyAob3B0aW9ucy5saW1pdCA9PSAxID8gJ0ltw6FnZW4nIDogJ0ltw6FnZW4nKTsgfSxcclxuICAgICAgICBmZWVkYmFjazogZnVuY3Rpb24ob3B0aW9ucykgeyByZXR1cm4gJ0FncmVnYXIgaW3DoWdlbmVzLi4uJzsgfSxcclxuICAgICAgICBmZWVkYmFjazI6IGZ1bmN0aW9uKG9wdGlvbnMpIHsgcmV0dXJuIG9wdGlvbnMubGVuZ3RoICsgJyAnICsgKG9wdGlvbnMubGVuZ3RoID4gMSA/ICcgaW3DoWdlbmVzIHNlbGVjY2lvbmFkYXMnIDogJyBpbcOhZ2VuIHNlbGVjY2lvbmFkYScpOyB9LFxyXG4gICAgICAgIGRyb3A6ICdBcnJhc3RyZSBsYXMgaW3DoWdlbmVzIGFxdcOtJyxcclxuICAgICAgICBwYXN0ZTogJzxkaXYgY2xhc3M9XCJmaWxldXBsb2FkZXItcGVuZGluZy1sb2FkZXJcIj48ZGl2IGNsYXNzPVwibGVmdC1oYWxmXCIgc3R5bGU9XCJhbmltYXRpb24tZHVyYXRpb246ICR7bXN9c1wiPjwvZGl2PjxkaXYgY2xhc3M9XCJzcGlubmVyXCIgc3R5bGU9XCJhbmltYXRpb24tZHVyYXRpb246ICR7bXN9c1wiPjwvZGl2PjxkaXYgY2xhc3M9XCJyaWdodC1oYWxmXCIgc3R5bGU9XCJhbmltYXRpb24tZHVyYXRpb246ICR7bXN9c1wiPjwvZGl2PjwvZGl2PiBQYXN0aW5nIGEgZmlsZSwgY2xpY2sgaGVyZSB0byBjYW5jZWwuJyxcclxuICAgICAgICByZW1vdmVDb25maXJtYXRpb246ICdFbGltaW5hcj8nLFxyXG4gICAgICAgIGVycm9yczoge1xyXG4gICAgICAgICAgICBmaWxlc0xpbWl0OiAnU29sbyBlcyBwb3NpYmxlIHN1YmlyICR7bGltaXR9IGltw6FnZW4uJyxcclxuICAgICAgICAgICAgZmlsZXNUeXBlOiAnU29sbyBzZSBhY2VwdGFuIGxvcyBmb3JtYXRvczogJHtleHRlbnNpb25zfS4nLFxyXG4gICAgICAgICAgICBmaWxlU2l6ZTogJ0xhIGltw6FnZW4gcGVzYSBtdWNobyEgRWxpamEgdW5hIGRlICR7ZmlsZU1heFNpemV9TUIgY29tbyBtw6F4aW1vLicsXHJcbiAgICAgICAgICAgIGZpbGVOYW1lOiAnTGEgaW3DoWdlbiBjb24gZXNlIG5vbWJyZSB5YSBoYSBzaWRvIGVsZWdpZGEnLFxyXG4gICAgICAgICAgICBmb2xkZXJVcGxvYWQ6ICdObyBlc3TDoSBwZXJtaXRpZG8gc3ViaXIgY2FycGV0YXMuJyxcclxuICAgICAgICB9LFxyXG4gICAgICAgIGRpYWxvZ3M6IHtcclxuICAgICAgICAgICAgLy8gYWxlcnQgZGlhbG9nXHJcbiAgICAgICAgICAgIGFsZXJ0OiBmdW5jdGlvbih0ZXh0KSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gYWxlcnQodGV4dCk7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIC8vIGNvbmZpcm0gZGlhbG9nXHJcbiAgICAgICAgICAgIGNvbmZpcm06IGZ1bmN0aW9uKHRleHQsIGNhbGxiYWNrKSB7XHJcbiAgICAgICAgICAgICAgICAnY29uZmlybSh0ZXh0KSA/IGNhbGxiYWNrKCkgOiBudWxsOydcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcbiAgICB9XHJcbn0pO1xyXG5cclxuXHJcbiQoJyNNdWx0aV9JbWFnZXMnKS5maWxldXBsb2FkZXIoe1xyXG4gICAgZXh0ZW5zaW9uczogWydqcGcnLCAnanBlZycsICdwbmcnLCAnZ2lmJywgJ2JtcCddLFxyXG4gICAgY2hhbmdlSW5wdXQ6ICcgJyxcclxuICAgIHRoZW1lOiAndGh1bWJuYWlscycsXHJcbiAgICBlbmFibGVBcGk6IHRydWUsXHJcbiAgICBhZGRNb3JlOiB0cnVlLFxyXG4gICAgdGh1bWJuYWlsczoge1xyXG4gICAgICAgIGJveDogJzxkaXYgY2xhc3M9XCJmaWxldXBsb2FkZXItaXRlbXNcIj4nICtcclxuICAgICAgICAgICAgICAgICAgJzx1bCBjbGFzcz1cImZpbGV1cGxvYWRlci1pdGVtcy1saXN0XCI+JyArXHJcbiAgICAgICAgICAgICAgICAgICAgICAnPGxpIGNsYXNzPVwiZmlsZXVwbG9hZGVyLXRodW1ibmFpbHMtaW5wdXRcIj48ZGl2IGNsYXNzPVwiZmlsZXVwbG9hZGVyLXRodW1ibmFpbHMtaW5wdXQtaW5uZXJcIj4rPC9kaXY+PC9saT4nICtcclxuICAgICAgICAgICAgICAgICAgJzwvdWw+JyArXHJcbiAgICAgICAgICAgICAgJzwvZGl2PicsXHJcbiAgICAgICAgaXRlbTogJzxsaSBjbGFzcz1cImZpbGV1cGxvYWRlci1pdGVtXCI+JyArIFxyXG4gICAgICAgICAgICAgICAgICAgJzxkaXYgY2xhc3M9XCJmaWxldXBsb2FkZXItaXRlbS1pbm5lclwiIG9uY2xpY2s9XCJmZWF0dXJlT25DbGljaygpO1wiPicgK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICc8ZGl2IGNsYXNzPVwidGh1bWJuYWlsLWhvbGRlclwiPiR7aW1hZ2V9PC9kaXY+JyArXHJcbiAgICAgICAgICAgICAgICAgICAgICAgJzxkaXYgY2xhc3M9XCJhY3Rpb25zLWhvbGRlclwiPicgK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnPGEgY2xhc3M9XCJmaWxldXBsb2FkZXItYWN0aW9uIGZpbGV1cGxvYWRlci1hY3Rpb24tcmVtb3ZlXCIgdGl0bGU9XCIke2NhcHRpb25zLnJlbW92ZX1cIj48aSBjbGFzcz1cInJlbW92ZVwiPjwvaT48L2E+JyArXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICc8c3BhbiBjbGFzcz1cImZpbGV1cGxvYWRlci1hY3Rpb24tcG9wdXBcIj48L3NwYW4+JyArXHJcbiAgICAgICAgICAgICAgICAgICAgICAgJzwvZGl2PicgK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICc8ZGl2IGNsYXNzPVwicHJvZ3Jlc3MtaG9sZGVyXCI+JHtwcm9ncmVzc0Jhcn08L2Rpdj4nICtcclxuICAgICAgICAgICAgICAgICAgICc8L2Rpdj4nICtcclxuICAgICAgICAgICAgICAgJzwvbGk+JyxcclxuICAgICAgICBpdGVtMjogJzxsaSBjbGFzcz1cImZpbGV1cGxvYWRlci1pdGVtXCI+JyArXHJcbiAgICAgICAgICAgICAgICAgICAnPGRpdiBjbGFzcz1cImZpbGV1cGxvYWRlci1pdGVtLWlubmVyXCI+JyArXHJcbiAgICAgICAgICAgICAgICAgICAgICAgJzxkaXYgY2xhc3M9XCJ0aHVtYm5haWwtaG9sZGVyXCI+JHtpbWFnZX08L2Rpdj4nICtcclxuICAgICAgICAgICAgICAgICAgICAgICAnPGRpdiBjbGFzcz1cImFjdGlvbnMtaG9sZGVyXCI+JyArXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICc8YSBjbGFzcz1cImZpbGV1cGxvYWRlci1hY3Rpb24gZmlsZXVwbG9hZGVyLWFjdGlvbi1yZW1vdmVcIiB0aXRsZT1cIiR7Y2FwdGlvbnMucmVtb3ZlfVwiPjxpIGNsYXNzPVwicmVtb3ZlXCI+PC9pPjwvYT4nICtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgJzxzcGFuIGNsYXNzPVwiZmlsZXVwbG9hZGVyLWFjdGlvbi1wb3B1cFwiPjwvc3Bhbj4nICtcclxuICAgICAgICAgICAgICAgICAgICAgICAnPC9kaXY+JyArXHJcbiAgICAgICAgICAgICAgICAgICAnPC9kaXY+JyArXHJcbiAgICAgICAgICAgICAgICc8L2xpPicsXHJcbiAgICAgICAgc3RhcnRJbWFnZVJlbmRlcmVyOiB0cnVlLFxyXG4gICAgICAgIGNhbnZhc0ltYWdlOiBmYWxzZSxcclxuICAgICAgICBfc2VsZWN0b3JzOiB7XHJcbiAgICAgICAgICAgIGxpc3Q6ICcuZmlsZXVwbG9hZGVyLWl0ZW1zLWxpc3QnLFxyXG4gICAgICAgICAgICBpdGVtOiAnLmZpbGV1cGxvYWRlci1pdGVtJyxcclxuICAgICAgICAgICAgc3RhcnQ6ICcuZmlsZXVwbG9hZGVyLWFjdGlvbi1zdGFydCcsXHJcbiAgICAgICAgICAgIHJldHJ5OiAnLmZpbGV1cGxvYWRlci1hY3Rpb24tcmV0cnknLFxyXG4gICAgICAgICAgICByZW1vdmU6ICcuZmlsZXVwbG9hZGVyLWFjdGlvbi1yZW1vdmUnXHJcbiAgICAgICAgfSxcclxuICAgICAgICBvbkl0ZW1TaG93OiBmdW5jdGlvbihpdGVtLCBsaXN0RWwsIHBhcmVudEVsLCBuZXdJbnB1dEVsLCBpbnB1dEVsKSB7XHJcbiAgICAgICAgICAgIHZhciBwbHVzSW5wdXQgPSBsaXN0RWwuZmluZCgnLmZpbGV1cGxvYWRlci10aHVtYm5haWxzLWlucHV0JyksXHJcbiAgICAgICAgICAgICAgICBhcGkgPSAkLmZpbGV1cGxvYWRlci5nZXRJbnN0YW5jZShpbnB1dEVsLmdldCgwKSk7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBwbHVzSW5wdXQuaW5zZXJ0QWZ0ZXIoaXRlbS5odG1sKVthcGkuZ2V0T3B0aW9ucygpLmxpbWl0ICYmIGFwaS5nZXRDaG9vc2VkRmlsZXMoKS5sZW5ndGggPj0gYXBpLmdldE9wdGlvbnMoKS5saW1pdCA/ICdoaWRlJyA6ICdzaG93J10oKTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGlmKGl0ZW0uZm9ybWF0ID09ICdpbWFnZScpIHtcclxuICAgICAgICAgICAgICAgIGl0ZW0uaHRtbC5maW5kKCcuZmlsZXVwbG9hZGVyLWl0ZW0taWNvbicpLmhpZGUoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICBhZnRlclJlbmRlcjogZnVuY3Rpb24obGlzdEVsLCBwYXJlbnRFbCwgbmV3SW5wdXRFbCwgaW5wdXRFbCkge1xyXG4gICAgICAgIHZhciBwbHVzSW5wdXQgPSBsaXN0RWwuZmluZCgnLmZpbGV1cGxvYWRlci10aHVtYm5haWxzLWlucHV0JyksXHJcbiAgICAgICAgICAgIGFwaSA9ICQuZmlsZXVwbG9hZGVyLmdldEluc3RhbmNlKGlucHV0RWwuZ2V0KDApKTtcclxuICAgIFxyXG4gICAgICAgIHBsdXNJbnB1dC5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgYXBpLm9wZW4oKTtcclxuICAgICAgICB9KTtcclxuICAgIH0sXHJcbiAgICBvblJlbW92ZTogZnVuY3Rpb24oaXRlbSwgbGlzdEVsLCBwYXJlbnRFbCwgbmV3SW5wdXRFbCwgaW5wdXRFbCkge1xyXG4gICAgICAgIHZhciBwbHVzSW5wdXQgPSBsaXN0RWwuZmluZCgnLmZpbGV1cGxvYWRlci10aHVtYm5haWxzLWlucHV0JyksXHJcbiAgICAgICAgICAgIGFwaSA9ICQuZmlsZXVwbG9hZGVyLmdldEluc3RhbmNlKGlucHV0RWwuZ2V0KDApKTtcclxuICAgIFxyXG4gICAgICAgIGlmIChhcGkuZ2V0T3B0aW9ucygpLmxpbWl0ICYmIGFwaS5nZXRDaG9vc2VkRmlsZXMoKS5sZW5ndGggLSAxIDwgYXBpLmdldE9wdGlvbnMoKS5saW1pdClcclxuICAgICAgICAgICAgcGx1c0lucHV0LnNob3coKTtcclxuICAgIH0sXHJcbiAgICAvKlxyXG4gICAgLy8gd2hpbGUgdXNpbmcgdXBsb2FkIG9wdGlvbiwgcGxlYXNlIHNldFxyXG4gICAgLy8gc3RhcnRJbWFnZVJlbmRlcmVyOiBmYWxzZVxyXG4gICAgLy8gZm9yIGEgYmV0dGVyIGVmZmVjdFxyXG4gICAgdXBsb2FkOiB7XHJcbiAgICAgICAgdXJsOiAnLi9waHAvdXBsb2FkX2ZpbGUucGhwJyxcclxuICAgICAgICBkYXRhOiBudWxsLFxyXG4gICAgICAgIHR5cGU6ICdQT1NUJyxcclxuICAgICAgICBlbmN0eXBlOiAnbXVsdGlwYXJ0L2Zvcm0tZGF0YScsXHJcbiAgICAgICAgc3RhcnQ6IHRydWUsXHJcbiAgICAgICAgc3luY2hyb246IHRydWUsXHJcbiAgICAgICAgYmVmb3JlU2VuZDogbnVsbCxcclxuICAgICAgICBvblN1Y2Nlc3M6IGZ1bmN0aW9uKGRhdGEsIGl0ZW0pIHtcclxuICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgIGl0ZW0uaHRtbC5maW5kKCcucHJvZ3Jlc3MtaG9sZGVyJykuaGlkZSgpO1xyXG4gICAgICAgICAgICAgICAgaXRlbS5yZW5kZXJUaHVtYm5haWwoKTtcclxuICAgICAgICAgICAgfSwgNDAwKTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIG9uRXJyb3I6IGZ1bmN0aW9uKGl0ZW0pIHtcclxuICAgICAgICAgICAgaXRlbS5odG1sLmZpbmQoJy5wcm9ncmVzcy1ob2xkZXInKS5oaWRlKCk7XHJcbiAgICAgICAgICAgIGl0ZW0uaHRtbC5maW5kKCcuZmlsZXVwbG9hZGVyLWl0ZW0taWNvbiBpJykudGV4dCgnRmFpbGVkIScpO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgb25Qcm9ncmVzczogZnVuY3Rpb24oZGF0YSwgaXRlbSkge1xyXG4gICAgICAgICAgICB2YXIgcHJvZ3Jlc3NCYXIgPSBpdGVtLmh0bWwuZmluZCgnLnByb2dyZXNzLWhvbGRlcicpO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgaWYocHJvZ3Jlc3NCYXIubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICAgICAgcHJvZ3Jlc3NCYXIuc2hvdygpO1xyXG4gICAgICAgICAgICAgICAgcHJvZ3Jlc3NCYXIuZmluZCgnLmZpbGV1cGxvYWRlci1wcm9ncmVzc2JhciAuYmFyJykud2lkdGgoZGF0YS5wZXJjZW50YWdlICsgXCIlXCIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIGRyYWdEcm9wOiB7XHJcbiAgICAgICAgY29udGFpbmVyOiAnLmZpbGV1cGxvYWRlci10aHVtYm5haWxzLWlucHV0J1xyXG4gICAgfSxcclxuICAgIG9uUmVtb3ZlOiBmdW5jdGlvbihpdGVtKSB7XHJcbiAgICAgICAgJC5wb3N0KCdwaHAvdXBsb2FkX3JlbW92ZS5waHAnLCB7XHJcbiAgICAgICAgICAgIGZpbGU6IGl0ZW0ubmFtZVxyXG4gICAgICAgIH0pO1xyXG4gICAgfSxcclxuICAgICovXHJcbn0pO1xyXG5cclxud2luZG93LmZlYXR1cmVPbkNsaWNrID0gZnVuY3Rpb24oKXtcclxuICAgIGFsZXJ0KCk7XHJcbn1cclxuXHJcbiQoJy5EaXNwbGF5LUlucHV0LU1vZGlmaWNhYmxlJykuY2xpY2soZnVuY3Rpb24oKXtcclxuICAgICQodGhpcykucmVtb3ZlQ2xhc3MoJ2Rpc3BsYXktaW5wdXQtZGlzYWJsZWQnKTsgXHJcbn0pO1xyXG5cclxuXHJcbi8vIC0tLS0gTW9kaWZpY2FibGUgaW5wdXQgdGV4dFxyXG4vLyBIdG1sIGVsZW1lbnRcclxuLy88cCBkYXRhLWVkaXRhYmxlIGNsYXNzPVwiU2x1Z0lucHV0XCI+e3sgJGFydGljbGUtPnNsdWcgfX08L3A+ICAgXHJcblxyXG4kKCdib2R5Jykub24oJ2NsaWNrJywgJ1tkYXRhLWVkaXRhYmxlXScsIGZ1bmN0aW9uKCl7XHJcbiAgXHJcbiAgICB2YXIgJGVsID0gJCh0aGlzKTtcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgdmFyICRpbnB1dCA9ICQoJzxpbnB1dC8+JykudmFsKCAkZWwudGV4dCgpICk7XHJcbiAgICAkZWwucmVwbGFjZVdpdGgoICRpbnB1dCApO1xyXG4gICAgXHJcbiAgICB2YXIgc2F2ZSA9IGZ1bmN0aW9uKCl7XHJcbiAgICAgIHZhciAkcCA9ICQoJzxwIGRhdGEtZWRpdGFibGUgLz4nKS50ZXh0KCAkaW5wdXQudmFsKCkgKTtcclxuICAgICAgJGlucHV0LnJlcGxhY2VXaXRoKCAkcCApO1xyXG4gICAgfTtcclxuICAgIFxyXG4gICAgLyoqXHJcbiAgICAgIFdlJ3JlIGRlZmluaW5nIHRoZSBjYWxsYmFjayB3aXRoIGBvbmVgLCBiZWNhdXNlIHdlIGtub3cgdGhhdFxyXG4gICAgICB0aGUgZWxlbWVudCB3aWxsIGJlIGdvbmUganVzdCBhZnRlciB0aGF0LCBhbmQgd2UgZG9uJ3Qgd2FudCBcclxuICAgICAgYW55IGNhbGxiYWNrcyBsZWZ0b3ZlcnMgdGFrZSBtZW1vcnkuIFxyXG4gICAgICBOZXh0IHRpbWUgYHBgIHR1cm5zIGludG8gYGlucHV0YCB0aGlzIHNpbmdsZSBjYWxsYmFjayBcclxuICAgICAgd2lsbCBiZSBhcHBsaWVkIGFnYWluLlxyXG4gICAgKi9cclxuICAgICRpbnB1dC5vbmUoJ2JsdXInLCBzYXZlKS5mb2N1cygpO1xyXG4gICAgXHJcbiAgfSk7XHJcbiAgXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vcmVzb3VyY2VzL2Fzc2V0cy9qcy92YWRtaW4tZm9ybXMuanMiXSwic291cmNlUm9vdCI6IiJ9