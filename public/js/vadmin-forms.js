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
        item: '<li class="fileuploader-item">' + '<div class="fileuploader-item-inner">' + '<div class="thumbnail-holder">${image}</div>' + '<div class="actions-holder">' + '<a class="fileuploader-action fileuploader-action-remove" title="${captions.remove}"><i class="remove"></i></a>' + '<span class="fileuploader-action-popup"></span>' + '</div>' + '<div class="progress-holder">${progressBar}</div>' + '</div>' + '</li>',
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgMWU2MWI1OGY1MzA4MzlmNmMzYTMiLCJ3ZWJwYWNrOi8vLy4vcmVzb3VyY2VzL2Fzc2V0cy9qcy92YWRtaW4tZm9ybXMuanMiXSwibmFtZXMiOlsiJCIsImNob3NlbiIsInBsYWNlaG9sZGVyX3RleHRfbXVsdGlwbGUiLCJzZWFyY2hfY29udGFpbnMiLCJub19yZXN1bHRzX3RleHQiLCJwbGFjZWhvbGRlcl90ZXh0X3NpbmdsZSIsImtleXVwIiwiVGV4dCIsInZhbCIsInRvTG93ZXJDYXNlIiwicmVnRXhwIiwicmVwbGFjZSIsImV2ZW50Iiwic3R0IiwiY2xpY2siLCJub3RlcyIsImhhc0NsYXNzIiwicmVtb3ZlQ2xhc3MiLCJhZGRDbGFzcyIsImFkZHJlc3NJbnB1dCIsImxvY0lucHV0IiwiYXBwZW5kIiwid2luZG93IiwiY2hlY2tWYXJpYW50cyIsImV4aXN0aW5nQ29tYmluYXRpb25zIiwiZWFjaCIsInB1c2giLCJkYXRhIiwibWFrZVZhcmlhbnRzIiwidmFyaWFudHNDb250YWluZXIiLCJ2YXJpYW50U2l6ZSIsInZhcmlhbnRDb2xvciIsImNvbG9ycyIsInNpemVzIiwiaXMiLCJzaXplIiwiY29sb3IiLCJjb21iaW5hdGlvbnMiLCJpbmRleCIsIml0ZW0iLCJ2YWx1ZSIsImluY2x1ZGVzIiwidmFyaWFudFJvdyIsIm9uIiwiZSIsInByZXZlbnREZWZhdWx0IiwicGFyZW50cyIsInJlbW92ZSIsImNvbnNvbGUiLCJsb2ciLCJkZWxldGVEQkl0ZW0iLCJyb3V0ZSIsImlkIiwicm93aWQiLCJhamF4IiwidXJsIiwibWV0aG9kIiwiZGF0YVR5cGUiLCJiZWZvcmVTZW5kIiwic3VjY2VzcyIsImFsZXJ0X2Vycm9yIiwibWVzc2FnZSIsImVycm9yIiwiaHRtbCIsInJlc3BvbnNlVGV4dCIsImZpbGV1cGxvYWRlciIsImV4dGVuc2lvbnMiLCJsaW1pdCIsImFkZE1vcmUiLCJmaWxlTWF4U2l6ZSIsImNhcHRpb25zIiwiYnV0dG9uIiwib3B0aW9ucyIsImZlZWRiYWNrIiwiZmVlZGJhY2syIiwibGVuZ3RoIiwiZHJvcCIsInBhc3RlIiwicmVtb3ZlQ29uZmlybWF0aW9uIiwiZXJyb3JzIiwiZmlsZXNMaW1pdCIsImZpbGVzVHlwZSIsImZpbGVTaXplIiwiZmlsZU5hbWUiLCJmb2xkZXJVcGxvYWQiLCJkaWFsb2dzIiwiYWxlcnQiLCJ0ZXh0IiwiY29uZmlybSIsImNhbGxiYWNrIiwiY2hhbmdlSW5wdXQiLCJ0aGVtZSIsImVuYWJsZUFwaSIsInRodW1ibmFpbHMiLCJib3giLCJpdGVtMiIsInN0YXJ0SW1hZ2VSZW5kZXJlciIsImNhbnZhc0ltYWdlIiwiX3NlbGVjdG9ycyIsImxpc3QiLCJzdGFydCIsInJldHJ5Iiwib25JdGVtU2hvdyIsImxpc3RFbCIsInBhcmVudEVsIiwibmV3SW5wdXRFbCIsImlucHV0RWwiLCJwbHVzSW5wdXQiLCJmaW5kIiwiYXBpIiwiZ2V0SW5zdGFuY2UiLCJnZXQiLCJpbnNlcnRBZnRlciIsImdldE9wdGlvbnMiLCJnZXRDaG9vc2VkRmlsZXMiLCJmb3JtYXQiLCJoaWRlIiwiYWZ0ZXJSZW5kZXIiLCJvcGVuIiwib25SZW1vdmUiLCJzaG93IiwiJGVsIiwiJGlucHV0IiwicmVwbGFjZVdpdGgiLCJzYXZlIiwiJHAiLCJvbmUiLCJmb2N1cyJdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7QUFDaEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOERBQXNELCtEQUErRDs7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UixDQUFZLENBQVosQ0FBM0IsQ0FEVjs7QUFHQSxZQUFJRixJQUFJSSxVQUFKLEdBQWlCOUMsS0FBakIsSUFBMEIwQyxJQUFJSyxlQUFKLEdBQXNCdkMsTUFBdEIsR0FBK0IsQ0FBL0IsR0FBbUNrQyxJQUFJSSxVQUFKLEdBQWlCOUMsS0FBbEYsRUFDSXdDLFVBQVVhLElBQVY7QUFDUDtBQUNEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBbEU0QixDQUFoQzs7QUE2R0F4SCxFQUFFLDRCQUFGLEVBQWdDYyxLQUFoQyxDQUFzQyxZQUFVO0FBQzVDZCxNQUFFLElBQUYsRUFBUWlCLFdBQVIsQ0FBb0Isd0JBQXBCO0FBQ0gsQ0FGRDs7QUFLQTtBQUNBO0FBQ0E7O0FBRUFqQixFQUFFLE1BQUYsRUFBVTJDLEVBQVYsQ0FBYSxPQUFiLEVBQXNCLGlCQUF0QixFQUF5QyxZQUFVOztBQUUvQyxRQUFJOEUsTUFBTXpILEVBQUUsSUFBRixDQUFWOztBQUVBLFFBQUkwSCxTQUFTMUgsRUFBRSxVQUFGLEVBQWNRLEdBQWQsQ0FBbUJpSCxJQUFJbEMsSUFBSixFQUFuQixDQUFiO0FBQ0FrQyxRQUFJRSxXQUFKLENBQWlCRCxNQUFqQjs7QUFFQSxRQUFJRSxPQUFPLFNBQVBBLElBQU8sR0FBVTtBQUNuQixZQUFJQyxLQUFLN0gsRUFBRSxxQkFBRixFQUF5QnVGLElBQXpCLENBQStCbUMsT0FBT2xILEdBQVAsRUFBL0IsQ0FBVDtBQUNBa0gsZUFBT0MsV0FBUCxDQUFvQkUsRUFBcEI7QUFDRCxLQUhEOztBQUtBOzs7Ozs7O0FBT0FILFdBQU9JLEdBQVAsQ0FBVyxNQUFYLEVBQW1CRixJQUFuQixFQUF5QkcsS0FBekI7QUFFRCxDQXJCSCxFIiwiZmlsZSI6Ii9qcy92YWRtaW4tZm9ybXMuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHtcbiBcdFx0XHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0Z2V0OiBnZXR0ZXJcbiBcdFx0XHR9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCIvXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gNzgpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svYm9vdHN0cmFwIDFlNjFiNThmNTMwODM5ZjZjM2EzIiwiLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbi8vICAgICAgICAgICAgICAgICAgICBDb2xvcnNcclxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcblxyXG4kKCcuU2VsZWN0LUNvbG9ycycpLmNob3Nlbih7XHJcbiAgICBwbGFjZWhvbGRlcl90ZXh0X211bHRpcGxlOiAnU2VsZWNjaW9uZSBsb3MgY29sb3JlcycsXHJcbiAgICAvLyBtYXhfc2VsZWN0ZWRfb3B0aW9uczogMyxcclxuICAgIHNlYXJjaF9jb250YWluczogdHJ1ZSxcclxuICAgIG5vX3Jlc3VsdHNfdGV4dDogJ05vIHNlIGhhIGVuY29udHJhZG8gZWwgY29sb3InXHJcbn0pO1xyXG5cclxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbi8vICAgICAgICAgICAgICAgICAgICAgVGFnc1xyXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuJCgnLlNlbGVjdC1UYWdzJykuY2hvc2VuKHtcclxuICAgIHBsYWNlaG9sZGVyX3RleHRfbXVsdGlwbGU6ICdTZWxlY2Npb25lIGxhcyBldGlxdWV0YXMnLFxyXG4gICAgLy8gbWF4X3NlbGVjdGVkX29wdGlvbnM6IDMsXHJcbiAgICBzZWFyY2hfY29udGFpbnM6IHRydWUsXHJcbiAgICBub19yZXN1bHRzX3RleHQ6ICdObyBzZSBoYSBlbmNvbnRyYWRvIGxhIGV0aXF1ZXRhJ1xyXG59KTtcclxuXHJcbiQoJy5TZWxlY3QtQnJhbmQnKS5jaG9zZW4oe1xyXG4gICAgcGxhY2Vob2xkZXJfdGV4dF9zaW5nbGU6ICdTZWxlY2Npb25lIGxhIG1hcmNhJyxcclxuICAgIC8vIG1heF9zZWxlY3RlZF9vcHRpb25zOiAzLFxyXG4gICAgc2VhcmNoX2NvbnRhaW5zOiB0cnVlLFxyXG4gICAgbm9fcmVzdWx0c190ZXh0OiAnTm8gc2UgaGEgZW5jb250cmFkbyBsYSBtYXJjYSdcclxufSk7XHJcblxyXG5cclxuXHJcbiQoJy5TZWxlY3QtQXRyaWJ1dGUnKS5jaG9zZW4oe1xyXG4gICAgcGxhY2Vob2xkZXJfdGV4dF9tdWx0aXBsZTogJ1NlbGVjY2lvbmFyJyxcclxuICAgIC8vIG1heF9zZWxlY3RlZF9vcHRpb25zOiAzLFxyXG4gICAgc2VhcmNoX2NvbnRhaW5zOiB0cnVlLFxyXG4gICAgbm9fcmVzdWx0c190ZXh0OiAnTm8gc2UgaGEgZW5jb250cmFkbydcclxufSk7XHJcblxyXG4kKCcuU2VsZWN0LUNhdGVnb3J5JykuY2hvc2VuKHtcclxuICAgIHBsYWNlaG9sZGVyX3RleHRfc2luZ2xlOiAnU2VsZWNjaW9uZSB1bmEgY2F0ZWdvcsOtYScsXHJcbn0pO1xyXG5cclxuJCgnLlNlbGVjdC1DaG9zZW4nKS5jaG9zZW4oe1xyXG4gICAgcGxhY2Vob2xkZXJfdGV4dF9zaW5nbGU6ICdTZWxlY2Npb25lIHVuYSBjYXRlZ29yw61hJyxcclxufSk7XHJcblxyXG5cclxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbi8vICAgICAgICAgICAgICBTbHVnIGNyZWF0b3JcclxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcblxyXG4kKFwiLlNsdWdJbnB1dFwiKS5rZXl1cChmdW5jdGlvbigpe1xyXG4gICAgdmFyIFRleHQgICAgID0gJCh0aGlzKS52YWwoKTtcclxuICAgIFRleHQgICAgICAgICA9IFRleHQudG9Mb3dlckNhc2UoKTtcclxuICAgIHZhciByZWdFeHAgICA9IC9cXHMrL2c7XHJcbiAgICBUZXh0ICAgICAgICAgPSBUZXh0LnJlcGxhY2UoL1smXFwvXFxcXCMswqEhwrQjKygpJH4lLidcIjoqPzw+e31dL2csJycpO1xyXG4gICAgVGV4dCAgICAgICAgID0gVGV4dC5yZXBsYWNlKHJlZ0V4cCwnLScpO1xyXG4gICAgVGV4dCAgICAgICAgID0gVGV4dC5yZXBsYWNlKCfDsScsICduJykgO1xyXG4gICAgVGV4dCAgICAgICAgID0gVGV4dC5yZXBsYWNlKCfDoScsICdhJykgO1xyXG4gICAgVGV4dCAgICAgICAgID0gVGV4dC5yZXBsYWNlKCfDqScsICdlJykgO1xyXG4gICAgVGV4dCAgICAgICAgID0gVGV4dC5yZXBsYWNlKCfDrScsICdpJykgO1xyXG4gICAgVGV4dCAgICAgICAgID0gVGV4dC5yZXBsYWNlKCfDsycsICdvJykgO1xyXG4gICAgVGV4dCAgICAgICAgID0gVGV4dC5yZXBsYWNlKCfDuicsICd1JykgO1xyXG4gICAgXHJcbiAgICAkKFwiLlNsdWdJbnB1dFwiKS52YWwoVGV4dCk7ICAgXHJcbn0pO1xyXG5cclxuLy8gU2x1ZyBBdXRvRmlsbG5wdXQgZnJvbSB0aXRsZSBcclxuXHJcbiQoXCIjVGl0bGVJbnB1dFwiKS5rZXl1cChmdW5jdGlvbihldmVudCkge1xyXG4gICAgdmFyIHN0dCA9ICQodGhpcykudmFsKCk7XHJcbiAgICB2YXIgVGV4dCAgICAgPSAkKHRoaXMpLnZhbCgpO1xyXG4gICAgVGV4dCAgICAgICAgID0gVGV4dC50b0xvd2VyQ2FzZSgpO1xyXG4gICAgdmFyIHJlZ0V4cCAgID0gL1xccysvZztcclxuICAgIFRleHQgICAgICAgICA9IFRleHQucmVwbGFjZSgvWyZcXC9cXFxcIyzCoSHCtCMrKCkkfiUuJ1wiOio/PD57fV0vZywnJyk7XHJcbiAgICBUZXh0ICAgICAgICAgPSBUZXh0LnJlcGxhY2UocmVnRXhwLCctJyk7XHJcbiAgICBUZXh0ICAgICAgICAgPSBUZXh0LnJlcGxhY2UoJ8OxJywgJ24nKSA7XHJcbiAgICBUZXh0ICAgICAgICAgPSBUZXh0LnJlcGxhY2UoJ8OhJywgJ2EnKSA7XHJcbiAgICBUZXh0ICAgICAgICAgPSBUZXh0LnJlcGxhY2UoJ8OpJywgJ2UnKSA7XHJcbiAgICBUZXh0ICAgICAgICAgPSBUZXh0LnJlcGxhY2UoJ8OtJywgJ2knKSA7XHJcbiAgICBUZXh0ICAgICAgICAgPSBUZXh0LnJlcGxhY2UoJ8OzJywgJ28nKSA7XHJcbiAgICBUZXh0ICAgICAgICAgPSBUZXh0LnJlcGxhY2UoJ8O6JywgJ3UnKSA7XHJcbiAgICAkKFwiLlNsdWdJbnB1dFwiKS52YWwoVGV4dCk7ICAgXHJcbn0pO1xyXG5cclxuXHJcbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4vLyAgICAgIENSRUFURSBGT1JNXHJcbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG5cclxuLy8gU2hvdyBOb3RlcyBUZXh0IEFyZWFcclxuJCgnLlNob3dOb3Rlc1RleHRBcmVhJykuY2xpY2soZnVuY3Rpb24oKXtcclxuICAgIHZhciBub3RlcyA9ICQoJy5Ob3Rlc1RleHRBcmVhJyk7XHJcbiAgICBpZiAobm90ZXMuaGFzQ2xhc3MoJ0hpZGRlbicpKXtcclxuICAgICAgICBub3Rlcy5yZW1vdmVDbGFzcygnSGlkZGVuJyk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIG5vdGVzLmFkZENsYXNzKCdIaWRkZW4nKTtcclxuICAgIH1cclxufSk7XHJcblxyXG4vLyBBZGQgQW5vdGhlciBBZGRyZXNzXHJcbiQoJy5BZGRBbm90aGVyQWRkcmVzc0J0bicpLmNsaWNrKGZ1bmN0aW9uKCl7XHJcbiAgICB2YXIgYWRkcmVzc0lucHV0ID0gXCI8aW5wdXQgY2xhc3M9J2Zvcm0tY29udHJvbCcgcGxhY2Vob2xkZXI9J0luZ3Jlc2Ugb3RybyB0ZWzDqWZvbm8nIG5hbWU9J2RlbGl2ZXJ5YWRkcmVzc1tdJyB0eXBlPSd0ZXh0JyBzdHlsZT0nbWFyZ2luLXRvcDo1cHgnPlwiO1xyXG4gICAgdmFyIGxvY0lucHV0ICAgICA9IFwiPGlucHV0IGNsYXNzPSdmb3JtLWNvbnRyb2wnIHBsYWNlaG9sZGVyPSdJbmdyZXNlIG90cm8gdGVsw6lmb25vJyBuYW1lPSdkZWxpdmVyeWFkZHJlc3NbXScgdHlwZT0ndGV4dCcgc3R5bGU9J21hcmdpbi10b3A6NXB4Jz5cIjtcclxuXHJcbiAgICAkKCcuQW5vdGhlckFkZHJlc3MnKS5hcHBlbmQoYWRkcmVzc0lucHV0KTtcclxuICAgICQoJy5Bbm90aGVyTG9jJykuYXBwZW5kKGxvY0lucHV0KTtcclxufSk7XHJcblxyXG5cclxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbi8vICAgICBDUkVBVEUgQVJUSUNMRSBWQVJJQU5UU1xyXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuXHJcbndpbmRvdy5jaGVja1ZhcmlhbnRzID0gZnVuY3Rpb24oKVxyXG57XHJcbiAgICBsZXQgZXhpc3RpbmdDb21iaW5hdGlvbnMgPSBbXTtcclxuICAgICQoXCIuQ29tYmluYXRpb25cIikuZWFjaChmdW5jdGlvbigpe1xyXG4gICAgICAgIGV4aXN0aW5nQ29tYmluYXRpb25zLnB1c2goJCh0aGlzKS5kYXRhKCdjb21iaW5hdGlvbicpKTtcclxuICAgIH0pO1xyXG4gICAgcmV0dXJuIGV4aXN0aW5nQ29tYmluYXRpb25zO1xyXG59XHJcblxyXG5cclxud2luZG93Lm1ha2VWYXJpYW50cyA9IGZ1bmN0aW9uKClcclxue1xyXG4gICAgY29uc3QgdmFyaWFudHNDb250YWluZXIgPSAkKCcjQXJ0aWNsZVZhcmlhbnRzJyk7XHJcbiAgICBjb25zdCB2YXJpYW50U2l6ZSA9ICQoJy5WYXJpYW50U2l6ZScpO1xyXG4gICAgY29uc3QgdmFyaWFudENvbG9yID0gJCgnLlZhcmlhbnRDb2xvcicpO1xyXG4gICAgXHJcbiAgICBsZXQgY29sb3JzID0gW107XHJcbiAgICBsZXQgc2l6ZXMgPSBbXTtcclxuXHJcbiAgICAkLmVhY2godmFyaWFudFNpemUsIGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgaWYoJCh0aGlzKS5pcygnOmNoZWNrZWQnKSlcclxuICAgICAgICB7ICAgXHJcbiAgICAgICAgICAgIHNpemUgPSB7fTtcclxuICAgICAgICAgICAgc2l6ZVsnaWQnXSA9ICQodGhpcykudmFsKCk7XHJcbiAgICAgICAgICAgIHNpemVbJ25hbWUnXSA9ICQodGhpcykuZGF0YSgnbmFtZScpO1xyXG4gICAgICAgICAgICBzaXplcy5wdXNoKHNpemUpO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG4gICAgXHJcbiAgICAkLmVhY2godmFyaWFudENvbG9yLCBmdW5jdGlvbigpe1xyXG4gICAgICAgIGlmKCQodGhpcykuaXMoJzpjaGVja2VkJykpXHJcbiAgICAgICAgeyAgIFxyXG4gICAgICAgICAgICBjb2xvciA9IHt9O1xyXG4gICAgICAgICAgICBjb2xvclsnaWQnXSA9ICQodGhpcykudmFsKCk7XHJcbiAgICAgICAgICAgIGNvbG9yWyduYW1lJ10gPSAkKHRoaXMpLmRhdGEoJ25hbWUnKTtcclxuICAgICAgICAgICAgY29sb3JzLnB1c2goY29sb3IpO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG4gICAgICAgXHJcbiAgICB2YXIgY29tYmluYXRpb25zID0gW107XHJcblxyXG4gICAgJC5lYWNoKGNvbG9ycywgZnVuY3Rpb24oaW5kZXgsIGNvbG9yKXtcclxuICAgICAgICAkLmVhY2goc2l6ZXMsICBmdW5jdGlvbihpbmRleCwgc2l6ZSl7XHJcbiAgICAgICAgICAgIGxldCBpdGVtID0ge307IFxyXG4gICAgICAgICAgICBpdGVtWydjb21iaW5hdGlvbiddID0gY29sb3JbJ25hbWUnXStcIi9cIitzaXplWyduYW1lJ107XHJcbiAgICAgICAgICAgIGl0ZW1bJ2NvbG9yJ10gPSBjb2xvclsnbmFtZSddO1xyXG4gICAgICAgICAgICBpdGVtWydjb2xvcl9pZCddID0gY29sb3JbJ2lkJ107XHJcbiAgICAgICAgICAgIGl0ZW1bJ3NpemUnXSA9IHNpemVbJ25hbWUnXTtcclxuICAgICAgICAgICAgaXRlbVsnc2l6ZV9pZCddID0gc2l6ZVsnaWQnXTtcclxuICAgICAgICAgICAgY29tYmluYXRpb25zLnB1c2goaXRlbSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9KTtcclxuICAgIGxldCBleGlzdGluZ0NvbWJpbmF0aW9ucyA9IGNoZWNrVmFyaWFudHMoKTtcclxuXHJcbiAgICAkLmVhY2goY29tYmluYXRpb25zLCBmdW5jdGlvbihpbmRleCwgdmFsdWUpXHJcbiAgICB7ICAgXHJcbiAgICAgICAgLy8gRUNNQSBzY3JpcHQgNiBcclxuICAgICAgICBpZighZXhpc3RpbmdDb21iaW5hdGlvbnMuaW5jbHVkZXModmFsdWVbJ2NvbWJpbmF0aW9uJ10pKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgbGV0IHZhcmlhbnRSb3cgPSBcIjx0cj5cIiArXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCI8dGQgY2xhc3M9J0NvbWJpbmF0aW9uJyBkYXRhLWNvbWJpbmF0aW9uPVwiKyB2YWx1ZVsnY29sb3InXSArXCIvXCIgKyB2YWx1ZVsnc2l6ZSddICsgXCI+XCIrIHZhbHVlWydjb2xvciddICtcIi9cIiArIHZhbHVlWydzaXplJ10gKyBcIjwvdGQ+XCIgK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiPGlucHV0IG5hbWU9J3ZhcmlhbnRzW1wiK3ZhbHVlWydjb21iaW5hdGlvbiddK1wiXVtjb2xvcl0nIHZhbHVlPVwiKyB2YWx1ZVsnY29sb3JfaWQnXSArXCIgdHlwZT0naGlkZGVuJyBjbGFzcz0nZm9ybS1jb250cm9sJz5cIiArXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCI8aW5wdXQgbmFtZT0ndmFyaWFudHNbXCIrdmFsdWVbJ2NvbWJpbmF0aW9uJ10rXCJdW3NpemVdJyB2YWx1ZT1cIisgdmFsdWVbJ3NpemVfaWQnXSArXCIgdHlwZT0naGlkZGVuJyBjbGFzcz0nZm9ybS1jb250cm9sJz5cIiArXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCI8dGQ+PGlucHV0IG5hbWU9J3ZhcmlhbnRzW1wiK3ZhbHVlWydjb21iaW5hdGlvbiddK1wiXVtzdG9ja10nIHZhbHVlPScxMCcgdHlwZT0nbnVtYmVyJyBtaW49JzAnIGNsYXNzPSdmb3JtLWNvbnRyb2wnPjwvdGQ+XCIgK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiPHRkPjxhIGNsYXNzPSdSZW1vdmVEeW5Sb3cgZGVsZXRlLWljb24nPjxpIGNsYXNzPSdkZWxldGUtaWNvbiBmYSBmYS10cmFzaCc+PC9pPjwvYT48L3RkPlwiICtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIjwvdHI+XCI7XHJcbiAgICAgICAgICAgIHZhcmlhbnRzQ29udGFpbmVyLmFwcGVuZCh2YXJpYW50Um93KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgfSk7XHJcbiAgICAkKCcjSGVhZGVyVmFyaWFudHMnKS5yZW1vdmVDbGFzcygnSGlkZGVuJyk7XHJcbn1cclxuXHJcblxyXG4vLyBSZW1vdmUgbmV3IHZhcmlhbnRzIHJvd1xyXG4kKCcjQXJ0aWNsZVZhcmlhbnRzJykub24oJ2NsaWNrJywgJy5SZW1vdmVEeW5Sb3cnLCBmdW5jdGlvbihlKSB7XHJcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAkKHRoaXMpLnBhcmVudHMoJ3RyJykucmVtb3ZlKCk7XHJcbn0pO1xyXG5cclxuJCgnLlJlbW92ZVZhcmlhbnQnKS5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcclxuICAgIGNvbnNvbGUubG9nKCQodGhpcykuZGF0YSgncm93aWQnKSk7XHJcbiAgICBkZWxldGVEQkl0ZW0oJCh0aGlzKS5kYXRhKCdyb3V0ZScpLCAkKHRoaXMpLmRhdGEoJ2lkJyksICQodGhpcykuZGF0YSgncm93aWQnKSk7XHJcbn0pO1xyXG5cclxuXHJcbndpbmRvdy5kZWxldGVEQkl0ZW0gPSBmdW5jdGlvbihyb3V0ZSwgaWQsIHJvd2lkKXtcclxuICAgICQuYWpheCh7XHJcbiAgICAgICAgdXJsOiByb3V0ZSxcclxuICAgICAgICBtZXRob2Q6ICdQT1NUJywgICAgICAgICAgICAgXHJcbiAgICAgICAgZGF0YVR5cGU6ICdKU09OJyxcclxuICAgICAgICBkYXRhOiB7IGlkOiBpZCB9LFxyXG4gICAgICAgIGJlZm9yZVNlbmQ6IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbihkYXRhKXtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coZGF0YSk7XHJcbiAgICAgICAgICAgIGlmIChkYXRhLnN1Y2Nlc3MgPT0gdHJ1ZSkge1xyXG4gICAgICAgICAgICAgICAgLy8gJChcIiNcIityb3dpZCkuaGlkZSgpO1xyXG4gICAgICAgICAgICAgICAgJChcIiNcIityb3dpZCkucmVtb3ZlKCk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBhbGVydF9lcnJvcignVXBzIScsJ0hhIG9jdXJyaWRvIHVuIGVycm9yIGFsIGVsaW1pbmFyIGxhIHZhcmlhbnRlJyk7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhkYXRhKTtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGRhdGEubWVzc2FnZSk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG4gICAgICAgIGVycm9yOiBmdW5jdGlvbihkYXRhKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgJCgnI0Vycm9yJykuaHRtbChkYXRhLnJlc3BvbnNlVGV4dCk7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGRhdGEpO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhkYXRhLm1lc3NhZ2UpO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG59XHJcblxyXG5cclxuXHJcbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4vLyAgIEVESVRPUlMgQU5EIEZJRUxEUyBcclxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcblxyXG4vLyAkKCcjTXVsdGlfSW1hZ2VzJykuZmlsZXVwbG9hZGVyKHtcclxuLy8gICAgIGV4dGVuc2lvbnM6IFsnanBnJywgJ2pwZWcnLCAncG5nJywgJ2dpZiddLFxyXG4vLyAgICAgbGltaXQ6IG51bGwsXHJcbi8vICAgICBhZGRNb3JlOiB0cnVlLFxyXG4vLyAgICAgLy8gUGVzbyBtw6F4aW1vIGRlIHRvZGFzIGxhcyBpbcOhZ2VuZXNcclxuLy8gICAgIG1heFNpemU6IDUsXHJcbi8vICAgICAvLyBQZXNvIG3DoXhpbW8gcG9yIGltw6FnZW5cclxuLy8gICAgIGZpbGVNYXhTaXplOiAyLFxyXG4vLyAgICAgdGhlbWU6ICd0aHVtYm5haWxzJyxcclxuLy8gICAgIGVuYWJsZUFwaTogdHJ1ZSxcclxuLy8gICAgIGNhcHRpb25zOiB7XHJcbi8vICAgICAgICAgYnV0dG9uOiBmdW5jdGlvbihvcHRpb25zKSB7IHJldHVybiAnU2VsZWNjaW9uYXIgJyArIChvcHRpb25zLmxpbWl0ID09IDEgPyAnSW3DoWdlbmVzJyA6ICdJbcOhZ2VuJyk7IH0sXHJcbi8vICAgICAgICAgZmVlZGJhY2s6IGZ1bmN0aW9uKG9wdGlvbnMpIHsgcmV0dXJuICdIYWdhIGNsaWNrIHBhcmEgYWdyZWdhci4uLic7IH0sXHJcbi8vICAgICAgICAgZmVlZGJhY2syOiBmdW5jdGlvbihvcHRpb25zKSB7IHJldHVybiBvcHRpb25zLmxlbmd0aCArICcgJyArIChvcHRpb25zLmxlbmd0aCA+IDEgPyAnIGltw6FnZW5lcyBzZWxlY2Npb25hZGFzJyA6ICcgaW3DoWdlbiBzZWxlY2Npb25hZGEnKTsgfSxcclxuLy8gICAgICAgICBkcm9wOiAnQXJyYXN0cmUgbGFzIGltw6FnZW5lcyBhcXXDrScsXHJcbi8vICAgICAgICAgcGFzdGU6ICc8ZGl2IGNsYXNzPVwiZmlsZXVwbG9hZGVyLXBlbmRpbmctbG9hZGVyXCI+PGRpdiBjbGFzcz1cImxlZnQtaGFsZlwiIHN0eWxlPVwiYW5pbWF0aW9uLWR1cmF0aW9uOiAke21zfXNcIj48L2Rpdj48ZGl2IGNsYXNzPVwic3Bpbm5lclwiIHN0eWxlPVwiYW5pbWF0aW9uLWR1cmF0aW9uOiAke21zfXNcIj48L2Rpdj48ZGl2IGNsYXNzPVwicmlnaHQtaGFsZlwiIHN0eWxlPVwiYW5pbWF0aW9uLWR1cmF0aW9uOiAke21zfXNcIj48L2Rpdj48L2Rpdj4gUGFzdGluZyBhIGZpbGUsIGNsaWNrIGhlcmUgdG8gY2FuY2VsLicsXHJcbi8vICAgICAgICAgcmVtb3ZlQ29uZmlybWF0aW9uOiAnRWxpbWluYXI/JyxcclxuLy8gICAgICAgICBlcnJvcnM6IHtcclxuLy8gICAgICAgICAgICAgZmlsZXNMaW1pdDogJ1NvbG8gZXMgcG9zaWJsZSBzdWJpciAke2xpbWl0fSBpbcOhZ2VuLicsXHJcbi8vICAgICAgICAgICAgIGZpbGVzVHlwZTogJ1NvbG8gc2UgYWNlcHRhbiBsb3MgZm9ybWF0b3M6ICR7ZXh0ZW5zaW9uc30uJyxcclxuLy8gICAgICAgICAgICAgZmlsZVNpemU6ICcke25hbWV9IGVzIG11eSBncmFuZGVzISBTZWxlY2Npb25lIHVuYSBkZSAke2ZpbGVNYXhTaXplfU1CLiBjb21vIG3DoXhpbW8nLFxyXG4vLyAgICAgICAgICAgICBmaWxlc1NpemVBbGw6ICcke25hbWV9IHNvbiBtdXkgZ3JhbmRlcyEgU2VsZWNjaW9uZSB1bmFzIGRlICR7ZmlsZU1heFNpemV9TUIuIGNvbW8gbcOheGltbycsXHJcbi8vICAgICAgICAgICAgIGZpbGVOYW1lOiAnTGEgaW3DoWdlbiBjb24gZWwgbm9tYnJlICR7bmFtZX0geWEgZXN0w6Egc2VsZWNjaW9uYWRhLicsXHJcbi8vICAgICAgICAgICAgIGZvbGRlclVwbG9hZDogJ05vIGVzdMOhIHBlcm1pdGlkbyBzdWJpciBjYXJwZXRhcy4nXHJcbi8vICAgICAgICAgfSxcclxuLy8gICAgICAgICBkaWFsb2dzOiB7XHJcbi8vICAgICAgICAgICAgIC8vIGFsZXJ0IGRpYWxvZ1xyXG4vLyAgICAgICAgICAgICBhbGVydDogZnVuY3Rpb24odGV4dCkge1xyXG4vLyAgICAgICAgICAgICAgICAgcmV0dXJuIGFsZXJ0X2NvbmZpcm0odGV4dCk7XHJcbi8vICAgICAgICAgICAgIH0sXHJcbi8vICAgICAgICAgICAgIC8vIGNvbmZpcm0gZGlhbG9nXHJcbi8vICAgICAgICAgICAgIGNvbmZpcm06IGZ1bmN0aW9uKHRleHQsIGNhbGxiYWNrKSB7XHJcbi8vICAgICAgICAgICAgICAgICAnY29uZmlybSh0ZXh0KSA/IGNhbGxiYWNrKCkgOiBudWxsOydcclxuLy8gICAgICAgICAgICAgfVxyXG4vLyAgICAgICAgIH0sXHJcbi8vICAgICB9XHJcbi8vIH0pO1xyXG5cclxuJCgnI1NpbmdsZV9JbWFnZScpLmZpbGV1cGxvYWRlcih7XHJcbiAgICBleHRlbnNpb25zOiBbJ2pwZycsICdqcGVnJywgJ3BuZycsICdnaWYnXSxcclxuICAgIGxpbWl0OiAxLFxyXG4gICAgYWRkTW9yZTogZmFsc2UsXHJcbiAgICBmaWxlTWF4U2l6ZTogMixcclxuICAgIGNhcHRpb25zOiB7XHJcbiAgICAgICAgYnV0dG9uOiBmdW5jdGlvbihvcHRpb25zKSB7IHJldHVybiAnU2VsZWNjaW9uYXIgJyArIChvcHRpb25zLmxpbWl0ID09IDEgPyAnSW3DoWdlbicgOiAnSW3DoWdlbicpOyB9LFxyXG4gICAgICAgIGZlZWRiYWNrOiBmdW5jdGlvbihvcHRpb25zKSB7IHJldHVybiAnQWdyZWdhciBpbcOhZ2VuZXMuLi4nOyB9LFxyXG4gICAgICAgIGZlZWRiYWNrMjogZnVuY3Rpb24ob3B0aW9ucykgeyByZXR1cm4gb3B0aW9ucy5sZW5ndGggKyAnICcgKyAob3B0aW9ucy5sZW5ndGggPiAxID8gJyBpbcOhZ2VuZXMgc2VsZWNjaW9uYWRhcycgOiAnIGltw6FnZW4gc2VsZWNjaW9uYWRhJyk7IH0sXHJcbiAgICAgICAgZHJvcDogJ0FycmFzdHJlIGxhcyBpbcOhZ2VuZXMgYXF1w60nLFxyXG4gICAgICAgIHBhc3RlOiAnPGRpdiBjbGFzcz1cImZpbGV1cGxvYWRlci1wZW5kaW5nLWxvYWRlclwiPjxkaXYgY2xhc3M9XCJsZWZ0LWhhbGZcIiBzdHlsZT1cImFuaW1hdGlvbi1kdXJhdGlvbjogJHttc31zXCI+PC9kaXY+PGRpdiBjbGFzcz1cInNwaW5uZXJcIiBzdHlsZT1cImFuaW1hdGlvbi1kdXJhdGlvbjogJHttc31zXCI+PC9kaXY+PGRpdiBjbGFzcz1cInJpZ2h0LWhhbGZcIiBzdHlsZT1cImFuaW1hdGlvbi1kdXJhdGlvbjogJHttc31zXCI+PC9kaXY+PC9kaXY+IFBhc3RpbmcgYSBmaWxlLCBjbGljayBoZXJlIHRvIGNhbmNlbC4nLFxyXG4gICAgICAgIHJlbW92ZUNvbmZpcm1hdGlvbjogJ0VsaW1pbmFyPycsXHJcbiAgICAgICAgZXJyb3JzOiB7XHJcbiAgICAgICAgICAgIGZpbGVzTGltaXQ6ICdTb2xvIGVzIHBvc2libGUgc3ViaXIgJHtsaW1pdH0gaW3DoWdlbi4nLFxyXG4gICAgICAgICAgICBmaWxlc1R5cGU6ICdTb2xvIHNlIGFjZXB0YW4gbG9zIGZvcm1hdG9zOiAke2V4dGVuc2lvbnN9LicsXHJcbiAgICAgICAgICAgIGZpbGVTaXplOiAnTGEgaW3DoWdlbiBwZXNhIG11Y2hvISBFbGlqYSB1bmEgZGUgJHtmaWxlTWF4U2l6ZX1NQiBjb21vIG3DoXhpbW8uJyxcclxuICAgICAgICAgICAgZmlsZU5hbWU6ICdMYSBpbcOhZ2VuIGNvbiBlc2Ugbm9tYnJlIHlhIGhhIHNpZG8gZWxlZ2lkYScsXHJcbiAgICAgICAgICAgIGZvbGRlclVwbG9hZDogJ05vIGVzdMOhIHBlcm1pdGlkbyBzdWJpciBjYXJwZXRhcy4nLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZGlhbG9nczoge1xyXG4gICAgICAgICAgICAvLyBhbGVydCBkaWFsb2dcclxuICAgICAgICAgICAgYWxlcnQ6IGZ1bmN0aW9uKHRleHQpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBhbGVydCh0ZXh0KTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgLy8gY29uZmlybSBkaWFsb2dcclxuICAgICAgICAgICAgY29uZmlybTogZnVuY3Rpb24odGV4dCwgY2FsbGJhY2spIHtcclxuICAgICAgICAgICAgICAgICdjb25maXJtKHRleHQpID8gY2FsbGJhY2soKSA6IG51bGw7J1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuICAgIH1cclxufSk7XHJcblxyXG5cclxuJCgnI011bHRpX0ltYWdlcycpLmZpbGV1cGxvYWRlcih7XHJcbiAgICBleHRlbnNpb25zOiBbJ2pwZycsICdqcGVnJywgJ3BuZycsICdnaWYnLCAnYm1wJ10sXHJcbiAgICBjaGFuZ2VJbnB1dDogJyAnLFxyXG4gICAgdGhlbWU6ICd0aHVtYm5haWxzJyxcclxuICAgIGVuYWJsZUFwaTogdHJ1ZSxcclxuICAgIGFkZE1vcmU6IHRydWUsXHJcbiAgICB0aHVtYm5haWxzOiB7XHJcbiAgICAgICAgYm94OiAnPGRpdiBjbGFzcz1cImZpbGV1cGxvYWRlci1pdGVtc1wiPicgK1xyXG4gICAgICAgICAgICAgICAgICAnPHVsIGNsYXNzPVwiZmlsZXVwbG9hZGVyLWl0ZW1zLWxpc3RcIj4nICtcclxuICAgICAgICAgICAgICAgICAgICAgICc8bGkgY2xhc3M9XCJmaWxldXBsb2FkZXItdGh1bWJuYWlscy1pbnB1dFwiPjxkaXYgY2xhc3M9XCJmaWxldXBsb2FkZXItdGh1bWJuYWlscy1pbnB1dC1pbm5lclwiPis8L2Rpdj48L2xpPicgK1xyXG4gICAgICAgICAgICAgICAgICAnPC91bD4nICtcclxuICAgICAgICAgICAgICAnPC9kaXY+JyxcclxuICAgICAgICBpdGVtOiAnPGxpIGNsYXNzPVwiZmlsZXVwbG9hZGVyLWl0ZW1cIj4nICtcclxuICAgICAgICAgICAgICAgICAgICc8ZGl2IGNsYXNzPVwiZmlsZXVwbG9hZGVyLWl0ZW0taW5uZXJcIj4nICtcclxuICAgICAgICAgICAgICAgICAgICAgICAnPGRpdiBjbGFzcz1cInRodW1ibmFpbC1ob2xkZXJcIj4ke2ltYWdlfTwvZGl2PicgK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICc8ZGl2IGNsYXNzPVwiYWN0aW9ucy1ob2xkZXJcIj4nICtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJzxhIGNsYXNzPVwiZmlsZXVwbG9hZGVyLWFjdGlvbiBmaWxldXBsb2FkZXItYWN0aW9uLXJlbW92ZVwiIHRpdGxlPVwiJHtjYXB0aW9ucy5yZW1vdmV9XCI+PGkgY2xhc3M9XCJyZW1vdmVcIj48L2k+PC9hPicgK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAnPHNwYW4gY2xhc3M9XCJmaWxldXBsb2FkZXItYWN0aW9uLXBvcHVwXCI+PC9zcGFuPicgK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICc8L2Rpdj4nICtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAnPGRpdiBjbGFzcz1cInByb2dyZXNzLWhvbGRlclwiPiR7cHJvZ3Jlc3NCYXJ9PC9kaXY+JyArXHJcbiAgICAgICAgICAgICAgICAgICAnPC9kaXY+JyArXHJcbiAgICAgICAgICAgICAgICc8L2xpPicsXHJcbiAgICAgICAgaXRlbTI6ICc8bGkgY2xhc3M9XCJmaWxldXBsb2FkZXItaXRlbVwiPicgK1xyXG4gICAgICAgICAgICAgICAgICAgJzxkaXYgY2xhc3M9XCJmaWxldXBsb2FkZXItaXRlbS1pbm5lclwiPicgK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICc8ZGl2IGNsYXNzPVwidGh1bWJuYWlsLWhvbGRlclwiPiR7aW1hZ2V9PC9kaXY+JyArXHJcbiAgICAgICAgICAgICAgICAgICAgICAgJzxkaXYgY2xhc3M9XCJhY3Rpb25zLWhvbGRlclwiPicgK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAnPGEgY2xhc3M9XCJmaWxldXBsb2FkZXItYWN0aW9uIGZpbGV1cGxvYWRlci1hY3Rpb24tcmVtb3ZlXCIgdGl0bGU9XCIke2NhcHRpb25zLnJlbW92ZX1cIj48aSBjbGFzcz1cInJlbW92ZVwiPjwvaT48L2E+JyArXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICc8c3BhbiBjbGFzcz1cImZpbGV1cGxvYWRlci1hY3Rpb24tcG9wdXBcIj48L3NwYW4+JyArXHJcbiAgICAgICAgICAgICAgICAgICAgICAgJzwvZGl2PicgK1xyXG4gICAgICAgICAgICAgICAgICAgJzwvZGl2PicgK1xyXG4gICAgICAgICAgICAgICAnPC9saT4nLFxyXG4gICAgICAgIHN0YXJ0SW1hZ2VSZW5kZXJlcjogdHJ1ZSxcclxuICAgICAgICBjYW52YXNJbWFnZTogZmFsc2UsXHJcbiAgICAgICAgX3NlbGVjdG9yczoge1xyXG4gICAgICAgICAgICBsaXN0OiAnLmZpbGV1cGxvYWRlci1pdGVtcy1saXN0JyxcclxuICAgICAgICAgICAgaXRlbTogJy5maWxldXBsb2FkZXItaXRlbScsXHJcbiAgICAgICAgICAgIHN0YXJ0OiAnLmZpbGV1cGxvYWRlci1hY3Rpb24tc3RhcnQnLFxyXG4gICAgICAgICAgICByZXRyeTogJy5maWxldXBsb2FkZXItYWN0aW9uLXJldHJ5JyxcclxuICAgICAgICAgICAgcmVtb3ZlOiAnLmZpbGV1cGxvYWRlci1hY3Rpb24tcmVtb3ZlJ1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgb25JdGVtU2hvdzogZnVuY3Rpb24oaXRlbSwgbGlzdEVsLCBwYXJlbnRFbCwgbmV3SW5wdXRFbCwgaW5wdXRFbCkge1xyXG4gICAgICAgICAgICB2YXIgcGx1c0lucHV0ID0gbGlzdEVsLmZpbmQoJy5maWxldXBsb2FkZXItdGh1bWJuYWlscy1pbnB1dCcpLFxyXG4gICAgICAgICAgICAgICAgYXBpID0gJC5maWxldXBsb2FkZXIuZ2V0SW5zdGFuY2UoaW5wdXRFbC5nZXQoMCkpO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgcGx1c0lucHV0Lmluc2VydEFmdGVyKGl0ZW0uaHRtbClbYXBpLmdldE9wdGlvbnMoKS5saW1pdCAmJiBhcGkuZ2V0Q2hvb3NlZEZpbGVzKCkubGVuZ3RoID49IGFwaS5nZXRPcHRpb25zKCkubGltaXQgPyAnaGlkZScgOiAnc2hvdyddKCk7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBpZihpdGVtLmZvcm1hdCA9PSAnaW1hZ2UnKSB7XHJcbiAgICAgICAgICAgICAgICBpdGVtLmh0bWwuZmluZCgnLmZpbGV1cGxvYWRlci1pdGVtLWljb24nKS5oaWRlKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgYWZ0ZXJSZW5kZXI6IGZ1bmN0aW9uKGxpc3RFbCwgcGFyZW50RWwsIG5ld0lucHV0RWwsIGlucHV0RWwpIHtcclxuICAgICAgICB2YXIgcGx1c0lucHV0ID0gbGlzdEVsLmZpbmQoJy5maWxldXBsb2FkZXItdGh1bWJuYWlscy1pbnB1dCcpLFxyXG4gICAgICAgICAgICBhcGkgPSAkLmZpbGV1cGxvYWRlci5nZXRJbnN0YW5jZShpbnB1dEVsLmdldCgwKSk7XHJcbiAgICBcclxuICAgICAgICBwbHVzSW5wdXQub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIGFwaS5vcGVuKCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9LFxyXG4gICAgb25SZW1vdmU6IGZ1bmN0aW9uKGl0ZW0sIGxpc3RFbCwgcGFyZW50RWwsIG5ld0lucHV0RWwsIGlucHV0RWwpIHtcclxuICAgICAgICB2YXIgcGx1c0lucHV0ID0gbGlzdEVsLmZpbmQoJy5maWxldXBsb2FkZXItdGh1bWJuYWlscy1pbnB1dCcpLFxyXG4gICAgICAgICAgICBhcGkgPSAkLmZpbGV1cGxvYWRlci5nZXRJbnN0YW5jZShpbnB1dEVsLmdldCgwKSk7XHJcbiAgICBcclxuICAgICAgICBpZiAoYXBpLmdldE9wdGlvbnMoKS5saW1pdCAmJiBhcGkuZ2V0Q2hvb3NlZEZpbGVzKCkubGVuZ3RoIC0gMSA8IGFwaS5nZXRPcHRpb25zKCkubGltaXQpXHJcbiAgICAgICAgICAgIHBsdXNJbnB1dC5zaG93KCk7XHJcbiAgICB9LFxyXG4gICAgLypcclxuICAgIC8vIHdoaWxlIHVzaW5nIHVwbG9hZCBvcHRpb24sIHBsZWFzZSBzZXRcclxuICAgIC8vIHN0YXJ0SW1hZ2VSZW5kZXJlcjogZmFsc2VcclxuICAgIC8vIGZvciBhIGJldHRlciBlZmZlY3RcclxuICAgIHVwbG9hZDoge1xyXG4gICAgICAgIHVybDogJy4vcGhwL3VwbG9hZF9maWxlLnBocCcsXHJcbiAgICAgICAgZGF0YTogbnVsbCxcclxuICAgICAgICB0eXBlOiAnUE9TVCcsXHJcbiAgICAgICAgZW5jdHlwZTogJ211bHRpcGFydC9mb3JtLWRhdGEnLFxyXG4gICAgICAgIHN0YXJ0OiB0cnVlLFxyXG4gICAgICAgIHN5bmNocm9uOiB0cnVlLFxyXG4gICAgICAgIGJlZm9yZVNlbmQ6IG51bGwsXHJcbiAgICAgICAgb25TdWNjZXNzOiBmdW5jdGlvbihkYXRhLCBpdGVtKSB7XHJcbiAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICBpdGVtLmh0bWwuZmluZCgnLnByb2dyZXNzLWhvbGRlcicpLmhpZGUoKTtcclxuICAgICAgICAgICAgICAgIGl0ZW0ucmVuZGVyVGh1bWJuYWlsKCk7XHJcbiAgICAgICAgICAgIH0sIDQwMCk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBvbkVycm9yOiBmdW5jdGlvbihpdGVtKSB7XHJcbiAgICAgICAgICAgIGl0ZW0uaHRtbC5maW5kKCcucHJvZ3Jlc3MtaG9sZGVyJykuaGlkZSgpO1xyXG4gICAgICAgICAgICBpdGVtLmh0bWwuZmluZCgnLmZpbGV1cGxvYWRlci1pdGVtLWljb24gaScpLnRleHQoJ0ZhaWxlZCEnKTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIG9uUHJvZ3Jlc3M6IGZ1bmN0aW9uKGRhdGEsIGl0ZW0pIHtcclxuICAgICAgICAgICAgdmFyIHByb2dyZXNzQmFyID0gaXRlbS5odG1sLmZpbmQoJy5wcm9ncmVzcy1ob2xkZXInKTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGlmKHByb2dyZXNzQmFyLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgICAgIHByb2dyZXNzQmFyLnNob3coKTtcclxuICAgICAgICAgICAgICAgIHByb2dyZXNzQmFyLmZpbmQoJy5maWxldXBsb2FkZXItcHJvZ3Jlc3NiYXIgLmJhcicpLndpZHRoKGRhdGEucGVyY2VudGFnZSArIFwiJVwiKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICBkcmFnRHJvcDoge1xyXG4gICAgICAgIGNvbnRhaW5lcjogJy5maWxldXBsb2FkZXItdGh1bWJuYWlscy1pbnB1dCdcclxuICAgIH0sXHJcbiAgICBvblJlbW92ZTogZnVuY3Rpb24oaXRlbSkge1xyXG4gICAgICAgICQucG9zdCgncGhwL3VwbG9hZF9yZW1vdmUucGhwJywge1xyXG4gICAgICAgICAgICBmaWxlOiBpdGVtLm5hbWVcclxuICAgICAgICB9KTtcclxuICAgIH0sXHJcbiAgICAqL1xyXG59KTtcclxuXHJcblxyXG4kKCcuRGlzcGxheS1JbnB1dC1Nb2RpZmljYWJsZScpLmNsaWNrKGZ1bmN0aW9uKCl7XHJcbiAgICAkKHRoaXMpLnJlbW92ZUNsYXNzKCdkaXNwbGF5LWlucHV0LWRpc2FibGVkJyk7IFxyXG59KTtcclxuXHJcblxyXG4vLyAtLS0tIE1vZGlmaWNhYmxlIGlucHV0IHRleHRcclxuLy8gSHRtbCBlbGVtZW50XHJcbi8vPHAgZGF0YS1lZGl0YWJsZSBjbGFzcz1cIlNsdWdJbnB1dFwiPnt7ICRhcnRpY2xlLT5zbHVnIH19PC9wPiAgIFxyXG5cclxuJCgnYm9keScpLm9uKCdjbGljaycsICdbZGF0YS1lZGl0YWJsZV0nLCBmdW5jdGlvbigpe1xyXG4gIFxyXG4gICAgdmFyICRlbCA9ICQodGhpcyk7XHJcbiAgICAgICAgICAgICAgICBcclxuICAgIHZhciAkaW5wdXQgPSAkKCc8aW5wdXQvPicpLnZhbCggJGVsLnRleHQoKSApO1xyXG4gICAgJGVsLnJlcGxhY2VXaXRoKCAkaW5wdXQgKTtcclxuICAgIFxyXG4gICAgdmFyIHNhdmUgPSBmdW5jdGlvbigpe1xyXG4gICAgICB2YXIgJHAgPSAkKCc8cCBkYXRhLWVkaXRhYmxlIC8+JykudGV4dCggJGlucHV0LnZhbCgpICk7XHJcbiAgICAgICRpbnB1dC5yZXBsYWNlV2l0aCggJHAgKTtcclxuICAgIH07XHJcbiAgICBcclxuICAgIC8qKlxyXG4gICAgICBXZSdyZSBkZWZpbmluZyB0aGUgY2FsbGJhY2sgd2l0aCBgb25lYCwgYmVjYXVzZSB3ZSBrbm93IHRoYXRcclxuICAgICAgdGhlIGVsZW1lbnQgd2lsbCBiZSBnb25lIGp1c3QgYWZ0ZXIgdGhhdCwgYW5kIHdlIGRvbid0IHdhbnQgXHJcbiAgICAgIGFueSBjYWxsYmFja3MgbGVmdG92ZXJzIHRha2UgbWVtb3J5LiBcclxuICAgICAgTmV4dCB0aW1lIGBwYCB0dXJucyBpbnRvIGBpbnB1dGAgdGhpcyBzaW5nbGUgY2FsbGJhY2sgXHJcbiAgICAgIHdpbGwgYmUgYXBwbGllZCBhZ2Fpbi5cclxuICAgICovXHJcbiAgICAkaW5wdXQub25lKCdibHVyJywgc2F2ZSkuZm9jdXMoKTtcclxuICAgIFxyXG4gIH0pO1xyXG4gIFxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3Jlc291cmNlcy9hc3NldHMvanMvdmFkbWluLWZvcm1zLmpzIl0sInNvdXJjZVJvb3QiOiIifQ==