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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgZmJlNmNkOWEzZGQ4MWI4ZjZhODkiLCJ3ZWJwYWNrOi8vLy4vcmVzb3VyY2VzL2Fzc2V0cy9qcy92YWRtaW4tZm9ybXMuanMiXSwibmFtZXMiOlsiJCIsImNob3NlbiIsInBsYWNlaG9sZGVyX3RleHRfbXVsdGlwbGUiLCJzZWFyY2hfY29udGFpbnMiLCJub19yZXN1bHRzX3RleHQiLCJwbGFjZWhvbGRlcl90ZXh0X3NpbmdsZSIsImtleXVwIiwiVGV4dCIsInZhbCIsInRvTG93ZXJDYXNlIiwicmVnRXhwIiwicmVwbGFjZSIsImV2ZW50Iiwic3R0IiwiY2xpY2siLCJub3RlcyIsImhhc0NsYXNzIiwicmVtb3ZlQ2xhc3MiLCJhZGRDbGFzcyIsImFkZHJlc3NJbnB1dCIsImxvY0lucHV0IiwiYXBwZW5kIiwid2luZG93IiwiY2hlY2tWYXJpYW50cyIsImV4aXN0aW5nQ29tYmluYXRpb25zIiwiZWFjaCIsInB1c2giLCJkYXRhIiwibWFrZVZhcmlhbnRzIiwidmFyaWFudHNDb250YWluZXIiLCJ2YXJpYW50U2l6ZSIsInZhcmlhbnRDb2xvciIsImNvbG9ycyIsInNpemVzIiwiaXMiLCJzaXplIiwiY29sb3IiLCJjb21iaW5hdGlvbnMiLCJpbmRleCIsIml0ZW0iLCJjb25zb2xlIiwibG9nIiwidmFsdWUiLCJpbmNsdWRlcyIsInZhcmlhbnRSb3ciLCJvbiIsImUiLCJwcmV2ZW50RGVmYXVsdCIsInBhcmVudHMiLCJyZW1vdmUiLCJkZWxldGVEQkl0ZW0iLCJyb3V0ZSIsImlkIiwicm93aWQiLCJhamF4IiwidXJsIiwibWV0aG9kIiwiZGF0YVR5cGUiLCJiZWZvcmVTZW5kIiwic3VjY2VzcyIsImFsZXJ0X2Vycm9yIiwibWVzc2FnZSIsImVycm9yIiwiaHRtbCIsInJlc3BvbnNlVGV4dCIsImZpbGV1cGxvYWRlciIsImV4dGVuc2lvbnMiLCJsaW1pdCIsImFkZE1vcmUiLCJmaWxlTWF4U2l6ZSIsImNhcHRpb25zIiwiYnV0dG9uIiwib3B0aW9ucyIsImZlZWRiYWNrIiwiZmVlZGJhY2syIiwibGVuZ3RoIiwiZHJvcCIsInBhc3RlIiwicmVtb3ZlQ29uZmlybWF0aW9uIiwiZXJyb3JzIiwiZmlsZXNMaW1pdCIsImZpbGVzVHlwZSIsImZpbGVTaXplIiwiZmlsZU5hbWUiLCJmb2xkZXJVcGxvYWQiLCJkaWFsb2dzIiwiYWxlcnQiLCJ0ZXh0IiwiY29uZmlybSIsImNhbGxiYWNrIiwiY2hhbmdlSW5wdXQiLCJ0aGVtZSIsImVuYWJsZUFwaSIsInRodW1ibmFpbHMiLCJib3giLCJpdGVtMiIsInN0YXJ0SW1hZ2VSZW5kZXJlciIsImNhbnZhc0ltYWdlIiwiX3NlbGVjdG9ycyIsImxpc3QiLCJzdGFydCIsInJldHJ5Iiwib25JdGVtU2hvdyIsImxpc3RFbCIsInBhcmVudEVsIiwibmV3SW5wdXRFbCIsImlucHV0RWwiLCJwbHVzSW5wdXQiLCJmaW5kIiwiYXBpIiwiZ2V0SW5zdGFuY2UiLCJnZXQiLCJpbnNlcnRBZnRlciIsImdldE9wdGlvbnMiLCJnZXRDaG9vc2VkRmlsZXMiLCJmb3JtYXQiLCJoaWRlIiwiYWZ0ZXJSZW5kZXIiLCJvcGVuIiwib25SZW1vdmUiLCJzaG93IiwiJGVsIiwiJGlucHV0IiwicmVwbGFjZVdpdGgiLCJzYXZlIiwiJHAiLCJvbmUiLCJmb2N1cyJdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7QUFDaEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOERBQXNELCtEQUErRDs7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LFdBQWYsQ0FBMkJKLFFBQVFLLEdBQVIsQ0FBWSxDQUFaLENBQTNCLENBRFY7O0FBR0EsWUFBSUYsSUFBSUksVUFBSixHQUFpQjlDLEtBQWpCLElBQTBCMEMsSUFBSUssZUFBSixHQUFzQnZDLE1BQXRCLEdBQStCLENBQS9CLEdBQW1Da0MsSUFBSUksVUFBSixHQUFpQjlDLEtBQWxGLEVBQ0l3QyxVQUFVYSxJQUFWO0FBQ1A7QUFDRDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQWxFNEIsQ0FBaEM7O0FBNkdBeEgsRUFBRSw0QkFBRixFQUFnQ2MsS0FBaEMsQ0FBc0MsWUFBVTtBQUM1Q2QsTUFBRSxJQUFGLEVBQVFpQixXQUFSLENBQW9CLHdCQUFwQjtBQUNILENBRkQ7O0FBS0E7QUFDQTtBQUNBOztBQUVBakIsRUFBRSxNQUFGLEVBQVU2QyxFQUFWLENBQWEsT0FBYixFQUFzQixpQkFBdEIsRUFBeUMsWUFBVTs7QUFFL0MsUUFBSTRFLE1BQU16SCxFQUFFLElBQUYsQ0FBVjs7QUFFQSxRQUFJMEgsU0FBUzFILEVBQUUsVUFBRixFQUFjUSxHQUFkLENBQW1CaUgsSUFBSWxDLElBQUosRUFBbkIsQ0FBYjtBQUNBa0MsUUFBSUUsV0FBSixDQUFpQkQsTUFBakI7O0FBRUEsUUFBSUUsT0FBTyxTQUFQQSxJQUFPLEdBQVU7QUFDbkIsWUFBSUMsS0FBSzdILEVBQUUscUJBQUYsRUFBeUJ1RixJQUF6QixDQUErQm1DLE9BQU9sSCxHQUFQLEVBQS9CLENBQVQ7QUFDQWtILGVBQU9DLFdBQVAsQ0FBb0JFLEVBQXBCO0FBQ0QsS0FIRDs7QUFLQTs7Ozs7OztBQU9BSCxXQUFPSSxHQUFQLENBQVcsTUFBWCxFQUFtQkYsSUFBbkIsRUFBeUJHLEtBQXpCO0FBRUQsQ0FyQkgsRSIsImZpbGUiOiIvanMvdmFkbWluLWZvcm1zLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7XG4gXHRcdFx0XHRjb25maWd1cmFibGU6IGZhbHNlLFxuIFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGdldDogZ2V0dGVyXG4gXHRcdFx0fSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiL1wiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDc4KTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCBmYmU2Y2Q5YTNkZDgxYjhmNmE4OSIsIi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4vLyAgICAgICAgICAgICAgICAgICAgQ29sb3JzXHJcbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG5cclxuJCgnLlNlbGVjdC1Db2xvcnMnKS5jaG9zZW4oe1xyXG4gICAgcGxhY2Vob2xkZXJfdGV4dF9tdWx0aXBsZTogJ1NlbGVjY2lvbmUgbG9zIGNvbG9yZXMnLFxyXG4gICAgLy8gbWF4X3NlbGVjdGVkX29wdGlvbnM6IDMsXHJcbiAgICBzZWFyY2hfY29udGFpbnM6IHRydWUsXHJcbiAgICBub19yZXN1bHRzX3RleHQ6ICdObyBzZSBoYSBlbmNvbnRyYWRvIGVsIGNvbG9yJ1xyXG59KTtcclxuXHJcbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4vLyAgICAgICAgICAgICAgICAgICAgIFRhZ3NcclxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiQoJy5TZWxlY3QtVGFncycpLmNob3Nlbih7XHJcbiAgICBwbGFjZWhvbGRlcl90ZXh0X211bHRpcGxlOiAnU2VsZWNjaW9uZSBsYXMgZXRpcXVldGFzJyxcclxuICAgIC8vIG1heF9zZWxlY3RlZF9vcHRpb25zOiAzLFxyXG4gICAgc2VhcmNoX2NvbnRhaW5zOiB0cnVlLFxyXG4gICAgbm9fcmVzdWx0c190ZXh0OiAnTm8gc2UgaGEgZW5jb250cmFkbyBsYSBldGlxdWV0YSdcclxufSk7XHJcblxyXG4kKCcuU2VsZWN0LUJyYW5kJykuY2hvc2VuKHtcclxuICAgIHBsYWNlaG9sZGVyX3RleHRfc2luZ2xlOiAnU2VsZWNjaW9uZSBsYSBtYXJjYScsXHJcbiAgICAvLyBtYXhfc2VsZWN0ZWRfb3B0aW9uczogMyxcclxuICAgIHNlYXJjaF9jb250YWluczogdHJ1ZSxcclxuICAgIG5vX3Jlc3VsdHNfdGV4dDogJ05vIHNlIGhhIGVuY29udHJhZG8gbGEgbWFyY2EnXHJcbn0pO1xyXG5cclxuXHJcblxyXG4kKCcuU2VsZWN0LUF0cmlidXRlJykuY2hvc2VuKHtcclxuICAgIHBsYWNlaG9sZGVyX3RleHRfbXVsdGlwbGU6ICdTZWxlY2Npb25hcicsXHJcbiAgICAvLyBtYXhfc2VsZWN0ZWRfb3B0aW9uczogMyxcclxuICAgIHNlYXJjaF9jb250YWluczogdHJ1ZSxcclxuICAgIG5vX3Jlc3VsdHNfdGV4dDogJ05vIHNlIGhhIGVuY29udHJhZG8nXHJcbn0pO1xyXG5cclxuJCgnLlNlbGVjdC1DYXRlZ29yeScpLmNob3Nlbih7XHJcbiAgICBwbGFjZWhvbGRlcl90ZXh0X3NpbmdsZTogJ1NlbGVjY2lvbmUgdW5hIGNhdGVnb3LDrWEnLFxyXG59KTtcclxuXHJcbiQoJy5TZWxlY3QtQ2hvc2VuJykuY2hvc2VuKHtcclxuICAgIHBsYWNlaG9sZGVyX3RleHRfc2luZ2xlOiAnU2VsZWNjaW9uZSB1bmEgY2F0ZWdvcsOtYScsXHJcbn0pO1xyXG5cclxuXHJcbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4vLyAgICAgICAgICAgICAgU2x1ZyBjcmVhdG9yXHJcbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG5cclxuJChcIi5TbHVnSW5wdXRcIikua2V5dXAoZnVuY3Rpb24oKXtcclxuICAgIHZhciBUZXh0ICAgICA9ICQodGhpcykudmFsKCk7XHJcbiAgICBUZXh0ICAgICAgICAgPSBUZXh0LnRvTG93ZXJDYXNlKCk7XHJcbiAgICB2YXIgcmVnRXhwICAgPSAvXFxzKy9nO1xyXG4gICAgVGV4dCAgICAgICAgID0gVGV4dC5yZXBsYWNlKC9bJlxcL1xcXFwjLMKhIcK0IysoKSR+JS4nXCI6Kj88Pnt9XS9nLCcnKTtcclxuICAgIFRleHQgICAgICAgICA9IFRleHQucmVwbGFjZShyZWdFeHAsJy0nKTtcclxuICAgIFRleHQgICAgICAgICA9IFRleHQucmVwbGFjZSgnw7EnLCAnbicpIDtcclxuICAgIFRleHQgICAgICAgICA9IFRleHQucmVwbGFjZSgnw6EnLCAnYScpIDtcclxuICAgIFRleHQgICAgICAgICA9IFRleHQucmVwbGFjZSgnw6knLCAnZScpIDtcclxuICAgIFRleHQgICAgICAgICA9IFRleHQucmVwbGFjZSgnw60nLCAnaScpIDtcclxuICAgIFRleHQgICAgICAgICA9IFRleHQucmVwbGFjZSgnw7MnLCAnbycpIDtcclxuICAgIFRleHQgICAgICAgICA9IFRleHQucmVwbGFjZSgnw7onLCAndScpIDtcclxuICAgIFxyXG4gICAgJChcIi5TbHVnSW5wdXRcIikudmFsKFRleHQpOyAgIFxyXG59KTtcclxuXHJcbi8vIFNsdWcgQXV0b0ZpbGxucHV0IGZyb20gdGl0bGUgXHJcblxyXG4kKFwiI1RpdGxlSW5wdXRcIikua2V5dXAoZnVuY3Rpb24oZXZlbnQpIHtcclxuICAgIHZhciBzdHQgPSAkKHRoaXMpLnZhbCgpO1xyXG4gICAgdmFyIFRleHQgICAgID0gJCh0aGlzKS52YWwoKTtcclxuICAgIFRleHQgICAgICAgICA9IFRleHQudG9Mb3dlckNhc2UoKTtcclxuICAgIHZhciByZWdFeHAgICA9IC9cXHMrL2c7XHJcbiAgICBUZXh0ICAgICAgICAgPSBUZXh0LnJlcGxhY2UoL1smXFwvXFxcXCMswqEhwrQjKygpJH4lLidcIjoqPzw+e31dL2csJycpO1xyXG4gICAgVGV4dCAgICAgICAgID0gVGV4dC5yZXBsYWNlKHJlZ0V4cCwnLScpO1xyXG4gICAgVGV4dCAgICAgICAgID0gVGV4dC5yZXBsYWNlKCfDsScsICduJykgO1xyXG4gICAgVGV4dCAgICAgICAgID0gVGV4dC5yZXBsYWNlKCfDoScsICdhJykgO1xyXG4gICAgVGV4dCAgICAgICAgID0gVGV4dC5yZXBsYWNlKCfDqScsICdlJykgO1xyXG4gICAgVGV4dCAgICAgICAgID0gVGV4dC5yZXBsYWNlKCfDrScsICdpJykgO1xyXG4gICAgVGV4dCAgICAgICAgID0gVGV4dC5yZXBsYWNlKCfDsycsICdvJykgO1xyXG4gICAgVGV4dCAgICAgICAgID0gVGV4dC5yZXBsYWNlKCfDuicsICd1JykgO1xyXG4gICAgJChcIi5TbHVnSW5wdXRcIikudmFsKFRleHQpOyAgIFxyXG59KTtcclxuXHJcblxyXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuLy8gICAgICBDUkVBVEUgRk9STVxyXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuXHJcbi8vIFNob3cgTm90ZXMgVGV4dCBBcmVhXHJcbiQoJy5TaG93Tm90ZXNUZXh0QXJlYScpLmNsaWNrKGZ1bmN0aW9uKCl7XHJcbiAgICB2YXIgbm90ZXMgPSAkKCcuTm90ZXNUZXh0QXJlYScpO1xyXG4gICAgaWYgKG5vdGVzLmhhc0NsYXNzKCdIaWRkZW4nKSl7XHJcbiAgICAgICAgbm90ZXMucmVtb3ZlQ2xhc3MoJ0hpZGRlbicpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICBub3Rlcy5hZGRDbGFzcygnSGlkZGVuJyk7XHJcbiAgICB9XHJcbn0pO1xyXG5cclxuLy8gQWRkIEFub3RoZXIgQWRkcmVzc1xyXG4kKCcuQWRkQW5vdGhlckFkZHJlc3NCdG4nKS5jbGljayhmdW5jdGlvbigpe1xyXG4gICAgdmFyIGFkZHJlc3NJbnB1dCA9IFwiPGlucHV0IGNsYXNzPSdmb3JtLWNvbnRyb2wnIHBsYWNlaG9sZGVyPSdJbmdyZXNlIG90cm8gdGVsw6lmb25vJyBuYW1lPSdkZWxpdmVyeWFkZHJlc3NbXScgdHlwZT0ndGV4dCcgc3R5bGU9J21hcmdpbi10b3A6NXB4Jz5cIjtcclxuICAgIHZhciBsb2NJbnB1dCAgICAgPSBcIjxpbnB1dCBjbGFzcz0nZm9ybS1jb250cm9sJyBwbGFjZWhvbGRlcj0nSW5ncmVzZSBvdHJvIHRlbMOpZm9ubycgbmFtZT0nZGVsaXZlcnlhZGRyZXNzW10nIHR5cGU9J3RleHQnIHN0eWxlPSdtYXJnaW4tdG9wOjVweCc+XCI7XHJcblxyXG4gICAgJCgnLkFub3RoZXJBZGRyZXNzJykuYXBwZW5kKGFkZHJlc3NJbnB1dCk7XHJcbiAgICAkKCcuQW5vdGhlckxvYycpLmFwcGVuZChsb2NJbnB1dCk7XHJcbn0pO1xyXG5cclxuXHJcbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4vLyAgICAgQ1JFQVRFIEFSVElDTEUgVkFSSUFOVFNcclxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcblxyXG53aW5kb3cuY2hlY2tWYXJpYW50cyA9IGZ1bmN0aW9uKClcclxue1xyXG4gICAgbGV0IGV4aXN0aW5nQ29tYmluYXRpb25zID0gW107XHJcbiAgICAkKFwiLkNvbWJpbmF0aW9uXCIpLmVhY2goZnVuY3Rpb24oKXtcclxuICAgICAgICBleGlzdGluZ0NvbWJpbmF0aW9ucy5wdXNoKCQodGhpcykuZGF0YSgnY29tYmluYXRpb24nKSk7XHJcbiAgICB9KTtcclxuICAgIHJldHVybiBleGlzdGluZ0NvbWJpbmF0aW9ucztcclxufVxyXG5cclxuXHJcbndpbmRvdy5tYWtlVmFyaWFudHMgPSBmdW5jdGlvbigpXHJcbntcclxuICAgIGNvbnN0IHZhcmlhbnRzQ29udGFpbmVyID0gJCgnI0FydGljbGVWYXJpYW50cycpO1xyXG4gICAgY29uc3QgdmFyaWFudFNpemUgPSAkKCcuVmFyaWFudFNpemUnKTtcclxuICAgIGNvbnN0IHZhcmlhbnRDb2xvciA9ICQoJy5WYXJpYW50Q29sb3InKTtcclxuICAgIFxyXG4gICAgbGV0IGNvbG9ycyA9IFtdO1xyXG4gICAgbGV0IHNpemVzID0gW107XHJcblxyXG4gICAgXHJcblxyXG4gICAgJC5lYWNoKHZhcmlhbnRTaXplLCBmdW5jdGlvbigpe1xyXG4gICAgICAgIGlmKCQodGhpcykuaXMoJzpjaGVja2VkJykpXHJcbiAgICAgICAgeyAgIFxyXG4gICAgICAgICAgICBzaXplID0ge307XHJcbiAgICAgICAgICAgIHNpemVbJ2lkJ10gPSAkKHRoaXMpLnZhbCgpO1xyXG4gICAgICAgICAgICBzaXplWyduYW1lJ10gPSAkKHRoaXMpLmRhdGEoJ25hbWUnKTtcclxuICAgICAgICAgICAgc2l6ZXMucHVzaChzaXplKTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuICAgIFxyXG4gICAgJC5lYWNoKHZhcmlhbnRDb2xvciwgZnVuY3Rpb24oKXtcclxuICAgICAgICBpZigkKHRoaXMpLmlzKCc6Y2hlY2tlZCcpKVxyXG4gICAgICAgIHsgICBcclxuICAgICAgICAgICAgY29sb3IgPSB7fTtcclxuICAgICAgICAgICAgY29sb3JbJ2lkJ10gPSAkKHRoaXMpLnZhbCgpO1xyXG4gICAgICAgICAgICBjb2xvclsnbmFtZSddID0gJCh0aGlzKS5kYXRhKCduYW1lJyk7XHJcbiAgICAgICAgICAgIGNvbG9ycy5wdXNoKGNvbG9yKTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuICAgICAgIFxyXG4gICAgbGV0IGNvbWJpbmF0aW9ucyA9IFtdO1xyXG5cclxuICAgICQuZWFjaChjb2xvcnMsIGZ1bmN0aW9uKGluZGV4LCBjb2xvcil7XHJcbiAgICAgICAgJC5lYWNoKHNpemVzLCAgZnVuY3Rpb24oaW5kZXgsIHNpemUpe1xyXG4gICAgICAgICAgICBsZXQgaXRlbSA9IHt9OyBcclxuICAgICAgICAgICAgaXRlbVsnY29tYmluYXRpb24nXSA9IGNvbG9yWyduYW1lJ10rXCIvXCIrc2l6ZVsnbmFtZSddO1xyXG4gICAgICAgICAgICBpdGVtWydjb2xvciddID0gY29sb3JbJ25hbWUnXTtcclxuICAgICAgICAgICAgaXRlbVsnY29sb3JfaWQnXSA9IGNvbG9yWydpZCddO1xyXG4gICAgICAgICAgICBpdGVtWydzaXplJ10gPSBzaXplWyduYW1lJ107XHJcbiAgICAgICAgICAgIGl0ZW1bJ3NpemVfaWQnXSA9IHNpemVbJ2lkJ107XHJcbiAgICAgICAgICAgIGNvbWJpbmF0aW9ucy5wdXNoKGl0ZW0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSk7XHJcblxyXG4gICAgY29uc29sZS5sb2coY29tYmluYXRpb25zKTtcclxuICAgIFxyXG4gICAgbGV0IGV4aXN0aW5nQ29tYmluYXRpb25zID0gY2hlY2tWYXJpYW50cygpO1xyXG5cclxuICAgICQuZWFjaChjb21iaW5hdGlvbnMsIGZ1bmN0aW9uKGluZGV4LCB2YWx1ZSlcclxuICAgIHsgICBcclxuICAgICAgICAvLyBFQ01BIHNjcmlwdCA2IFxyXG4gICAgICAgIGlmKCFleGlzdGluZ0NvbWJpbmF0aW9ucy5pbmNsdWRlcyh2YWx1ZVsnY29tYmluYXRpb24nXSkpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBsZXQgdmFyaWFudFJvdyA9IFwiPHRyPlwiICtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIjx0ZCBjbGFzcz0nQ29tYmluYXRpb24nIGRhdGEtY29tYmluYXRpb249XCIrIHZhbHVlWydjb2xvciddICtcIi9cIiArIHZhbHVlWydzaXplJ10gKyBcIj5cIisgdmFsdWVbJ2NvbG9yJ10gK1wiL1wiICsgdmFsdWVbJ3NpemUnXSArIFwiPC90ZD5cIiArXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCI8aW5wdXQgbmFtZT0ndmFyaWFudHNbXCIrdmFsdWVbJ2NvbWJpbmF0aW9uJ10rXCJdW2NvbG9yXScgdmFsdWU9XCIrIHZhbHVlWydjb2xvcl9pZCddICtcIiB0eXBlPSdoaWRkZW4nIGNsYXNzPSdmb3JtLWNvbnRyb2wnPlwiICtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIjxpbnB1dCBuYW1lPSd2YXJpYW50c1tcIit2YWx1ZVsnY29tYmluYXRpb24nXStcIl1bc2l6ZV0nIHZhbHVlPVwiKyB2YWx1ZVsnc2l6ZV9pZCddICtcIiB0eXBlPSdoaWRkZW4nIGNsYXNzPSdmb3JtLWNvbnRyb2wnPlwiICtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIjx0ZD48aW5wdXQgbmFtZT0ndmFyaWFudHNbXCIrdmFsdWVbJ2NvbWJpbmF0aW9uJ10rXCJdW3N0b2NrXScgdmFsdWU9JzEwJyB0eXBlPSdudW1iZXInIG1pbj0nMCcgY2xhc3M9J2Zvcm0tY29udHJvbCc+PC90ZD5cIiArXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCI8dGQ+PGEgY2xhc3M9J1JlbW92ZUR5blJvdyBkZWxldGUtaWNvbic+PGkgY2xhc3M9J2RlbGV0ZS1pY29uIGZhIGZhLXRyYXNoJz48L2k+PC9hPjwvdGQ+XCIgK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiPC90cj5cIjtcclxuICAgICAgICAgICAgdmFyaWFudHNDb250YWluZXIuYXBwZW5kKHZhcmlhbnRSb3cpO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG4gICAgJCgnI0hlYWRlclZhcmlhbnRzJykucmVtb3ZlQ2xhc3MoJ0hpZGRlbicpO1xyXG59XHJcblxyXG5cclxuLy8gUmVtb3ZlIG5ldyB2YXJpYW50cyByb3dcclxuJCgnI0FydGljbGVWYXJpYW50cycpLm9uKCdjbGljaycsICcuUmVtb3ZlRHluUm93JywgZnVuY3Rpb24oZSkge1xyXG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgJCh0aGlzKS5wYXJlbnRzKCd0cicpLnJlbW92ZSgpO1xyXG59KTtcclxuXHJcbiQoJy5SZW1vdmVWYXJpYW50Jykub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XHJcbiAgICBjb25zb2xlLmxvZygkKHRoaXMpLmRhdGEoJ3Jvd2lkJykpO1xyXG4gICAgZGVsZXRlREJJdGVtKCQodGhpcykuZGF0YSgncm91dGUnKSwgJCh0aGlzKS5kYXRhKCdpZCcpLCAkKHRoaXMpLmRhdGEoJ3Jvd2lkJykpO1xyXG59KTtcclxuXHJcblxyXG53aW5kb3cuZGVsZXRlREJJdGVtID0gZnVuY3Rpb24ocm91dGUsIGlkLCByb3dpZCl7XHJcbiAgICAkLmFqYXgoe1xyXG4gICAgICAgIHVybDogcm91dGUsXHJcbiAgICAgICAgbWV0aG9kOiAnUE9TVCcsICAgICAgICAgICAgIFxyXG4gICAgICAgIGRhdGFUeXBlOiAnSlNPTicsXHJcbiAgICAgICAgZGF0YTogeyBpZDogaWQgfSxcclxuICAgICAgICBiZWZvcmVTZW5kOiBmdW5jdGlvbigpe1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgc3VjY2VzczogZnVuY3Rpb24oZGF0YSl7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGRhdGEpO1xyXG4gICAgICAgICAgICBpZiAoZGF0YS5zdWNjZXNzID09IHRydWUpIHtcclxuICAgICAgICAgICAgICAgIC8vICQoXCIjXCIrcm93aWQpLmhpZGUoKTtcclxuICAgICAgICAgICAgICAgICQoXCIjXCIrcm93aWQpLnJlbW92ZSgpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgYWxlcnRfZXJyb3IoJ1VwcyEnLCdIYSBvY3VycmlkbyB1biBlcnJvciBhbCBlbGltaW5hciBsYSB2YXJpYW50ZScpO1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coZGF0YSk7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhkYXRhLm1lc3NhZ2UpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuICAgICAgICBlcnJvcjogZnVuY3Rpb24oZGF0YSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgICQoJyNFcnJvcicpLmh0bWwoZGF0YS5yZXNwb25zZVRleHQpO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhkYXRhKTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coZGF0YS5tZXNzYWdlKTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxufVxyXG5cclxuXHJcblxyXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuLy8gICBFRElUT1JTIEFORCBGSUVMRFMgXHJcbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG5cclxuLy8gJCgnI011bHRpX0ltYWdlcycpLmZpbGV1cGxvYWRlcih7XHJcbi8vICAgICBleHRlbnNpb25zOiBbJ2pwZycsICdqcGVnJywgJ3BuZycsICdnaWYnXSxcclxuLy8gICAgIGxpbWl0OiBudWxsLFxyXG4vLyAgICAgYWRkTW9yZTogdHJ1ZSxcclxuLy8gICAgIC8vIFBlc28gbcOheGltbyBkZSB0b2RhcyBsYXMgaW3DoWdlbmVzXHJcbi8vICAgICBtYXhTaXplOiA1LFxyXG4vLyAgICAgLy8gUGVzbyBtw6F4aW1vIHBvciBpbcOhZ2VuXHJcbi8vICAgICBmaWxlTWF4U2l6ZTogMixcclxuLy8gICAgIHRoZW1lOiAndGh1bWJuYWlscycsXHJcbi8vICAgICBlbmFibGVBcGk6IHRydWUsXHJcbi8vICAgICBjYXB0aW9uczoge1xyXG4vLyAgICAgICAgIGJ1dHRvbjogZnVuY3Rpb24ob3B0aW9ucykgeyByZXR1cm4gJ1NlbGVjY2lvbmFyICcgKyAob3B0aW9ucy5saW1pdCA9PSAxID8gJ0ltw6FnZW5lcycgOiAnSW3DoWdlbicpOyB9LFxyXG4vLyAgICAgICAgIGZlZWRiYWNrOiBmdW5jdGlvbihvcHRpb25zKSB7IHJldHVybiAnSGFnYSBjbGljayBwYXJhIGFncmVnYXIuLi4nOyB9LFxyXG4vLyAgICAgICAgIGZlZWRiYWNrMjogZnVuY3Rpb24ob3B0aW9ucykgeyByZXR1cm4gb3B0aW9ucy5sZW5ndGggKyAnICcgKyAob3B0aW9ucy5sZW5ndGggPiAxID8gJyBpbcOhZ2VuZXMgc2VsZWNjaW9uYWRhcycgOiAnIGltw6FnZW4gc2VsZWNjaW9uYWRhJyk7IH0sXHJcbi8vICAgICAgICAgZHJvcDogJ0FycmFzdHJlIGxhcyBpbcOhZ2VuZXMgYXF1w60nLFxyXG4vLyAgICAgICAgIHBhc3RlOiAnPGRpdiBjbGFzcz1cImZpbGV1cGxvYWRlci1wZW5kaW5nLWxvYWRlclwiPjxkaXYgY2xhc3M9XCJsZWZ0LWhhbGZcIiBzdHlsZT1cImFuaW1hdGlvbi1kdXJhdGlvbjogJHttc31zXCI+PC9kaXY+PGRpdiBjbGFzcz1cInNwaW5uZXJcIiBzdHlsZT1cImFuaW1hdGlvbi1kdXJhdGlvbjogJHttc31zXCI+PC9kaXY+PGRpdiBjbGFzcz1cInJpZ2h0LWhhbGZcIiBzdHlsZT1cImFuaW1hdGlvbi1kdXJhdGlvbjogJHttc31zXCI+PC9kaXY+PC9kaXY+IFBhc3RpbmcgYSBmaWxlLCBjbGljayBoZXJlIHRvIGNhbmNlbC4nLFxyXG4vLyAgICAgICAgIHJlbW92ZUNvbmZpcm1hdGlvbjogJ0VsaW1pbmFyPycsXHJcbi8vICAgICAgICAgZXJyb3JzOiB7XHJcbi8vICAgICAgICAgICAgIGZpbGVzTGltaXQ6ICdTb2xvIGVzIHBvc2libGUgc3ViaXIgJHtsaW1pdH0gaW3DoWdlbi4nLFxyXG4vLyAgICAgICAgICAgICBmaWxlc1R5cGU6ICdTb2xvIHNlIGFjZXB0YW4gbG9zIGZvcm1hdG9zOiAke2V4dGVuc2lvbnN9LicsXHJcbi8vICAgICAgICAgICAgIGZpbGVTaXplOiAnJHtuYW1lfSBlcyBtdXkgZ3JhbmRlcyEgU2VsZWNjaW9uZSB1bmEgZGUgJHtmaWxlTWF4U2l6ZX1NQi4gY29tbyBtw6F4aW1vJyxcclxuLy8gICAgICAgICAgICAgZmlsZXNTaXplQWxsOiAnJHtuYW1lfSBzb24gbXV5IGdyYW5kZXMhIFNlbGVjY2lvbmUgdW5hcyBkZSAke2ZpbGVNYXhTaXplfU1CLiBjb21vIG3DoXhpbW8nLFxyXG4vLyAgICAgICAgICAgICBmaWxlTmFtZTogJ0xhIGltw6FnZW4gY29uIGVsIG5vbWJyZSAke25hbWV9IHlhIGVzdMOhIHNlbGVjY2lvbmFkYS4nLFxyXG4vLyAgICAgICAgICAgICBmb2xkZXJVcGxvYWQ6ICdObyBlc3TDoSBwZXJtaXRpZG8gc3ViaXIgY2FycGV0YXMuJ1xyXG4vLyAgICAgICAgIH0sXHJcbi8vICAgICAgICAgZGlhbG9nczoge1xyXG4vLyAgICAgICAgICAgICAvLyBhbGVydCBkaWFsb2dcclxuLy8gICAgICAgICAgICAgYWxlcnQ6IGZ1bmN0aW9uKHRleHQpIHtcclxuLy8gICAgICAgICAgICAgICAgIHJldHVybiBhbGVydF9jb25maXJtKHRleHQpO1xyXG4vLyAgICAgICAgICAgICB9LFxyXG4vLyAgICAgICAgICAgICAvLyBjb25maXJtIGRpYWxvZ1xyXG4vLyAgICAgICAgICAgICBjb25maXJtOiBmdW5jdGlvbih0ZXh0LCBjYWxsYmFjaykge1xyXG4vLyAgICAgICAgICAgICAgICAgJ2NvbmZpcm0odGV4dCkgPyBjYWxsYmFjaygpIDogbnVsbDsnXHJcbi8vICAgICAgICAgICAgIH1cclxuLy8gICAgICAgICB9LFxyXG4vLyAgICAgfVxyXG4vLyB9KTtcclxuXHJcbiQoJyNTaW5nbGVfSW1hZ2UnKS5maWxldXBsb2FkZXIoe1xyXG4gICAgZXh0ZW5zaW9uczogWydqcGcnLCAnanBlZycsICdwbmcnLCAnZ2lmJ10sXHJcbiAgICBsaW1pdDogMSxcclxuICAgIGFkZE1vcmU6IGZhbHNlLFxyXG4gICAgZmlsZU1heFNpemU6IDIsXHJcbiAgICBjYXB0aW9uczoge1xyXG4gICAgICAgIGJ1dHRvbjogZnVuY3Rpb24ob3B0aW9ucykgeyByZXR1cm4gJ1NlbGVjY2lvbmFyICcgKyAob3B0aW9ucy5saW1pdCA9PSAxID8gJ0ltw6FnZW4nIDogJ0ltw6FnZW4nKTsgfSxcclxuICAgICAgICBmZWVkYmFjazogZnVuY3Rpb24ob3B0aW9ucykgeyByZXR1cm4gJ0FncmVnYXIgaW3DoWdlbmVzLi4uJzsgfSxcclxuICAgICAgICBmZWVkYmFjazI6IGZ1bmN0aW9uKG9wdGlvbnMpIHsgcmV0dXJuIG9wdGlvbnMubGVuZ3RoICsgJyAnICsgKG9wdGlvbnMubGVuZ3RoID4gMSA/ICcgaW3DoWdlbmVzIHNlbGVjY2lvbmFkYXMnIDogJyBpbcOhZ2VuIHNlbGVjY2lvbmFkYScpOyB9LFxyXG4gICAgICAgIGRyb3A6ICdBcnJhc3RyZSBsYXMgaW3DoWdlbmVzIGFxdcOtJyxcclxuICAgICAgICBwYXN0ZTogJzxkaXYgY2xhc3M9XCJmaWxldXBsb2FkZXItcGVuZGluZy1sb2FkZXJcIj48ZGl2IGNsYXNzPVwibGVmdC1oYWxmXCIgc3R5bGU9XCJhbmltYXRpb24tZHVyYXRpb246ICR7bXN9c1wiPjwvZGl2PjxkaXYgY2xhc3M9XCJzcGlubmVyXCIgc3R5bGU9XCJhbmltYXRpb24tZHVyYXRpb246ICR7bXN9c1wiPjwvZGl2PjxkaXYgY2xhc3M9XCJyaWdodC1oYWxmXCIgc3R5bGU9XCJhbmltYXRpb24tZHVyYXRpb246ICR7bXN9c1wiPjwvZGl2PjwvZGl2PiBQYXN0aW5nIGEgZmlsZSwgY2xpY2sgaGVyZSB0byBjYW5jZWwuJyxcclxuICAgICAgICByZW1vdmVDb25maXJtYXRpb246ICdFbGltaW5hcj8nLFxyXG4gICAgICAgIGVycm9yczoge1xyXG4gICAgICAgICAgICBmaWxlc0xpbWl0OiAnU29sbyBlcyBwb3NpYmxlIHN1YmlyICR7bGltaXR9IGltw6FnZW4uJyxcclxuICAgICAgICAgICAgZmlsZXNUeXBlOiAnU29sbyBzZSBhY2VwdGFuIGxvcyBmb3JtYXRvczogJHtleHRlbnNpb25zfS4nLFxyXG4gICAgICAgICAgICBmaWxlU2l6ZTogJ0xhIGltw6FnZW4gcGVzYSBtdWNobyEgRWxpamEgdW5hIGRlICR7ZmlsZU1heFNpemV9TUIgY29tbyBtw6F4aW1vLicsXHJcbiAgICAgICAgICAgIGZpbGVOYW1lOiAnTGEgaW3DoWdlbiBjb24gZXNlIG5vbWJyZSB5YSBoYSBzaWRvIGVsZWdpZGEnLFxyXG4gICAgICAgICAgICBmb2xkZXJVcGxvYWQ6ICdObyBlc3TDoSBwZXJtaXRpZG8gc3ViaXIgY2FycGV0YXMuJyxcclxuICAgICAgICB9LFxyXG4gICAgICAgIGRpYWxvZ3M6IHtcclxuICAgICAgICAgICAgLy8gYWxlcnQgZGlhbG9nXHJcbiAgICAgICAgICAgIGFsZXJ0OiBmdW5jdGlvbih0ZXh0KSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gYWxlcnQodGV4dCk7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIC8vIGNvbmZpcm0gZGlhbG9nXHJcbiAgICAgICAgICAgIGNvbmZpcm06IGZ1bmN0aW9uKHRleHQsIGNhbGxiYWNrKSB7XHJcbiAgICAgICAgICAgICAgICAnY29uZmlybSh0ZXh0KSA/IGNhbGxiYWNrKCkgOiBudWxsOydcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcbiAgICB9XHJcbn0pO1xyXG5cclxuXHJcbiQoJyNNdWx0aV9JbWFnZXMnKS5maWxldXBsb2FkZXIoe1xyXG4gICAgZXh0ZW5zaW9uczogWydqcGcnLCAnanBlZycsICdwbmcnLCAnZ2lmJywgJ2JtcCddLFxyXG4gICAgY2hhbmdlSW5wdXQ6ICcgJyxcclxuICAgIHRoZW1lOiAndGh1bWJuYWlscycsXHJcbiAgICBlbmFibGVBcGk6IHRydWUsXHJcbiAgICBhZGRNb3JlOiB0cnVlLFxyXG4gICAgdGh1bWJuYWlsczoge1xyXG4gICAgICAgIGJveDogJzxkaXYgY2xhc3M9XCJmaWxldXBsb2FkZXItaXRlbXNcIj4nICtcclxuICAgICAgICAgICAgICAgICAgJzx1bCBjbGFzcz1cImZpbGV1cGxvYWRlci1pdGVtcy1saXN0XCI+JyArXHJcbiAgICAgICAgICAgICAgICAgICAgICAnPGxpIGNsYXNzPVwiZmlsZXVwbG9hZGVyLXRodW1ibmFpbHMtaW5wdXRcIj48ZGl2IGNsYXNzPVwiZmlsZXVwbG9hZGVyLXRodW1ibmFpbHMtaW5wdXQtaW5uZXJcIj4rPC9kaXY+PC9saT4nICtcclxuICAgICAgICAgICAgICAgICAgJzwvdWw+JyArXHJcbiAgICAgICAgICAgICAgJzwvZGl2PicsXHJcbiAgICAgICAgaXRlbTogJzxsaSBjbGFzcz1cImZpbGV1cGxvYWRlci1pdGVtXCI+JyArXHJcbiAgICAgICAgICAgICAgICAgICAnPGRpdiBjbGFzcz1cImZpbGV1cGxvYWRlci1pdGVtLWlubmVyXCI+JyArXHJcbiAgICAgICAgICAgICAgICAgICAgICAgJzxkaXYgY2xhc3M9XCJ0aHVtYm5haWwtaG9sZGVyXCI+JHtpbWFnZX08L2Rpdj4nICtcclxuICAgICAgICAgICAgICAgICAgICAgICAnPGRpdiBjbGFzcz1cImFjdGlvbnMtaG9sZGVyXCI+JyArXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICc8YSBjbGFzcz1cImZpbGV1cGxvYWRlci1hY3Rpb24gZmlsZXVwbG9hZGVyLWFjdGlvbi1yZW1vdmVcIiB0aXRsZT1cIiR7Y2FwdGlvbnMucmVtb3ZlfVwiPjxpIGNsYXNzPVwicmVtb3ZlXCI+PC9pPjwvYT4nICtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgJzxzcGFuIGNsYXNzPVwiZmlsZXVwbG9hZGVyLWFjdGlvbi1wb3B1cFwiPjwvc3Bhbj4nICtcclxuICAgICAgICAgICAgICAgICAgICAgICAnPC9kaXY+JyArXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgJzxkaXYgY2xhc3M9XCJwcm9ncmVzcy1ob2xkZXJcIj4ke3Byb2dyZXNzQmFyfTwvZGl2PicgK1xyXG4gICAgICAgICAgICAgICAgICAgJzwvZGl2PicgK1xyXG4gICAgICAgICAgICAgICAnPC9saT4nLFxyXG4gICAgICAgIGl0ZW0yOiAnPGxpIGNsYXNzPVwiZmlsZXVwbG9hZGVyLWl0ZW1cIj4nICtcclxuICAgICAgICAgICAgICAgICAgICc8ZGl2IGNsYXNzPVwiZmlsZXVwbG9hZGVyLWl0ZW0taW5uZXJcIj4nICtcclxuICAgICAgICAgICAgICAgICAgICAgICAnPGRpdiBjbGFzcz1cInRodW1ibmFpbC1ob2xkZXJcIj4ke2ltYWdlfTwvZGl2PicgK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICc8ZGl2IGNsYXNzPVwiYWN0aW9ucy1ob2xkZXJcIj4nICtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgJzxhIGNsYXNzPVwiZmlsZXVwbG9hZGVyLWFjdGlvbiBmaWxldXBsb2FkZXItYWN0aW9uLXJlbW92ZVwiIHRpdGxlPVwiJHtjYXB0aW9ucy5yZW1vdmV9XCI+PGkgY2xhc3M9XCJyZW1vdmVcIj48L2k+PC9hPicgK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAnPHNwYW4gY2xhc3M9XCJmaWxldXBsb2FkZXItYWN0aW9uLXBvcHVwXCI+PC9zcGFuPicgK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICc8L2Rpdj4nICtcclxuICAgICAgICAgICAgICAgICAgICc8L2Rpdj4nICtcclxuICAgICAgICAgICAgICAgJzwvbGk+JyxcclxuICAgICAgICBzdGFydEltYWdlUmVuZGVyZXI6IHRydWUsXHJcbiAgICAgICAgY2FudmFzSW1hZ2U6IGZhbHNlLFxyXG4gICAgICAgIF9zZWxlY3RvcnM6IHtcclxuICAgICAgICAgICAgbGlzdDogJy5maWxldXBsb2FkZXItaXRlbXMtbGlzdCcsXHJcbiAgICAgICAgICAgIGl0ZW06ICcuZmlsZXVwbG9hZGVyLWl0ZW0nLFxyXG4gICAgICAgICAgICBzdGFydDogJy5maWxldXBsb2FkZXItYWN0aW9uLXN0YXJ0JyxcclxuICAgICAgICAgICAgcmV0cnk6ICcuZmlsZXVwbG9hZGVyLWFjdGlvbi1yZXRyeScsXHJcbiAgICAgICAgICAgIHJlbW92ZTogJy5maWxldXBsb2FkZXItYWN0aW9uLXJlbW92ZSdcclxuICAgICAgICB9LFxyXG4gICAgICAgIG9uSXRlbVNob3c6IGZ1bmN0aW9uKGl0ZW0sIGxpc3RFbCwgcGFyZW50RWwsIG5ld0lucHV0RWwsIGlucHV0RWwpIHtcclxuICAgICAgICAgICAgdmFyIHBsdXNJbnB1dCA9IGxpc3RFbC5maW5kKCcuZmlsZXVwbG9hZGVyLXRodW1ibmFpbHMtaW5wdXQnKSxcclxuICAgICAgICAgICAgICAgIGFwaSA9ICQuZmlsZXVwbG9hZGVyLmdldEluc3RhbmNlKGlucHV0RWwuZ2V0KDApKTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHBsdXNJbnB1dC5pbnNlcnRBZnRlcihpdGVtLmh0bWwpW2FwaS5nZXRPcHRpb25zKCkubGltaXQgJiYgYXBpLmdldENob29zZWRGaWxlcygpLmxlbmd0aCA+PSBhcGkuZ2V0T3B0aW9ucygpLmxpbWl0ID8gJ2hpZGUnIDogJ3Nob3cnXSgpO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgaWYoaXRlbS5mb3JtYXQgPT0gJ2ltYWdlJykge1xyXG4gICAgICAgICAgICAgICAgaXRlbS5odG1sLmZpbmQoJy5maWxldXBsb2FkZXItaXRlbS1pY29uJykuaGlkZSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIGFmdGVyUmVuZGVyOiBmdW5jdGlvbihsaXN0RWwsIHBhcmVudEVsLCBuZXdJbnB1dEVsLCBpbnB1dEVsKSB7XHJcbiAgICAgICAgdmFyIHBsdXNJbnB1dCA9IGxpc3RFbC5maW5kKCcuZmlsZXVwbG9hZGVyLXRodW1ibmFpbHMtaW5wdXQnKSxcclxuICAgICAgICAgICAgYXBpID0gJC5maWxldXBsb2FkZXIuZ2V0SW5zdGFuY2UoaW5wdXRFbC5nZXQoMCkpO1xyXG4gICAgXHJcbiAgICAgICAgcGx1c0lucHV0Lm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBhcGkub3BlbigpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSxcclxuICAgIG9uUmVtb3ZlOiBmdW5jdGlvbihpdGVtLCBsaXN0RWwsIHBhcmVudEVsLCBuZXdJbnB1dEVsLCBpbnB1dEVsKSB7XHJcbiAgICAgICAgdmFyIHBsdXNJbnB1dCA9IGxpc3RFbC5maW5kKCcuZmlsZXVwbG9hZGVyLXRodW1ibmFpbHMtaW5wdXQnKSxcclxuICAgICAgICAgICAgYXBpID0gJC5maWxldXBsb2FkZXIuZ2V0SW5zdGFuY2UoaW5wdXRFbC5nZXQoMCkpO1xyXG4gICAgXHJcbiAgICAgICAgaWYgKGFwaS5nZXRPcHRpb25zKCkubGltaXQgJiYgYXBpLmdldENob29zZWRGaWxlcygpLmxlbmd0aCAtIDEgPCBhcGkuZ2V0T3B0aW9ucygpLmxpbWl0KVxyXG4gICAgICAgICAgICBwbHVzSW5wdXQuc2hvdygpO1xyXG4gICAgfSxcclxuICAgIC8qXHJcbiAgICAvLyB3aGlsZSB1c2luZyB1cGxvYWQgb3B0aW9uLCBwbGVhc2Ugc2V0XHJcbiAgICAvLyBzdGFydEltYWdlUmVuZGVyZXI6IGZhbHNlXHJcbiAgICAvLyBmb3IgYSBiZXR0ZXIgZWZmZWN0XHJcbiAgICB1cGxvYWQ6IHtcclxuICAgICAgICB1cmw6ICcuL3BocC91cGxvYWRfZmlsZS5waHAnLFxyXG4gICAgICAgIGRhdGE6IG51bGwsXHJcbiAgICAgICAgdHlwZTogJ1BPU1QnLFxyXG4gICAgICAgIGVuY3R5cGU6ICdtdWx0aXBhcnQvZm9ybS1kYXRhJyxcclxuICAgICAgICBzdGFydDogdHJ1ZSxcclxuICAgICAgICBzeW5jaHJvbjogdHJ1ZSxcclxuICAgICAgICBiZWZvcmVTZW5kOiBudWxsLFxyXG4gICAgICAgIG9uU3VjY2VzczogZnVuY3Rpb24oZGF0YSwgaXRlbSkge1xyXG4gICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgaXRlbS5odG1sLmZpbmQoJy5wcm9ncmVzcy1ob2xkZXInKS5oaWRlKCk7XHJcbiAgICAgICAgICAgICAgICBpdGVtLnJlbmRlclRodW1ibmFpbCgpO1xyXG4gICAgICAgICAgICB9LCA0MDApO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgb25FcnJvcjogZnVuY3Rpb24oaXRlbSkge1xyXG4gICAgICAgICAgICBpdGVtLmh0bWwuZmluZCgnLnByb2dyZXNzLWhvbGRlcicpLmhpZGUoKTtcclxuICAgICAgICAgICAgaXRlbS5odG1sLmZpbmQoJy5maWxldXBsb2FkZXItaXRlbS1pY29uIGknKS50ZXh0KCdGYWlsZWQhJyk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBvblByb2dyZXNzOiBmdW5jdGlvbihkYXRhLCBpdGVtKSB7XHJcbiAgICAgICAgICAgIHZhciBwcm9ncmVzc0JhciA9IGl0ZW0uaHRtbC5maW5kKCcucHJvZ3Jlc3MtaG9sZGVyJyk7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBpZihwcm9ncmVzc0Jhci5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgICAgICBwcm9ncmVzc0Jhci5zaG93KCk7XHJcbiAgICAgICAgICAgICAgICBwcm9ncmVzc0Jhci5maW5kKCcuZmlsZXVwbG9hZGVyLXByb2dyZXNzYmFyIC5iYXInKS53aWR0aChkYXRhLnBlcmNlbnRhZ2UgKyBcIiVcIik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgZHJhZ0Ryb3A6IHtcclxuICAgICAgICBjb250YWluZXI6ICcuZmlsZXVwbG9hZGVyLXRodW1ibmFpbHMtaW5wdXQnXHJcbiAgICB9LFxyXG4gICAgb25SZW1vdmU6IGZ1bmN0aW9uKGl0ZW0pIHtcclxuICAgICAgICAkLnBvc3QoJ3BocC91cGxvYWRfcmVtb3ZlLnBocCcsIHtcclxuICAgICAgICAgICAgZmlsZTogaXRlbS5uYW1lXHJcbiAgICAgICAgfSk7XHJcbiAgICB9LFxyXG4gICAgKi9cclxufSk7XHJcblxyXG5cclxuJCgnLkRpc3BsYXktSW5wdXQtTW9kaWZpY2FibGUnKS5jbGljayhmdW5jdGlvbigpe1xyXG4gICAgJCh0aGlzKS5yZW1vdmVDbGFzcygnZGlzcGxheS1pbnB1dC1kaXNhYmxlZCcpOyBcclxufSk7XHJcblxyXG5cclxuLy8gLS0tLSBNb2RpZmljYWJsZSBpbnB1dCB0ZXh0XHJcbi8vIEh0bWwgZWxlbWVudFxyXG4vLzxwIGRhdGEtZWRpdGFibGUgY2xhc3M9XCJTbHVnSW5wdXRcIj57eyAkYXJ0aWNsZS0+c2x1ZyB9fTwvcD4gICBcclxuXHJcbiQoJ2JvZHknKS5vbignY2xpY2snLCAnW2RhdGEtZWRpdGFibGVdJywgZnVuY3Rpb24oKXtcclxuICBcclxuICAgIHZhciAkZWwgPSAkKHRoaXMpO1xyXG4gICAgICAgICAgICAgICAgXHJcbiAgICB2YXIgJGlucHV0ID0gJCgnPGlucHV0Lz4nKS52YWwoICRlbC50ZXh0KCkgKTtcclxuICAgICRlbC5yZXBsYWNlV2l0aCggJGlucHV0ICk7XHJcbiAgICBcclxuICAgIHZhciBzYXZlID0gZnVuY3Rpb24oKXtcclxuICAgICAgdmFyICRwID0gJCgnPHAgZGF0YS1lZGl0YWJsZSAvPicpLnRleHQoICRpbnB1dC52YWwoKSApO1xyXG4gICAgICAkaW5wdXQucmVwbGFjZVdpdGgoICRwICk7XHJcbiAgICB9O1xyXG4gICAgXHJcbiAgICAvKipcclxuICAgICAgV2UncmUgZGVmaW5pbmcgdGhlIGNhbGxiYWNrIHdpdGggYG9uZWAsIGJlY2F1c2Ugd2Uga25vdyB0aGF0XHJcbiAgICAgIHRoZSBlbGVtZW50IHdpbGwgYmUgZ29uZSBqdXN0IGFmdGVyIHRoYXQsIGFuZCB3ZSBkb24ndCB3YW50IFxyXG4gICAgICBhbnkgY2FsbGJhY2tzIGxlZnRvdmVycyB0YWtlIG1lbW9yeS4gXHJcbiAgICAgIE5leHQgdGltZSBgcGAgdHVybnMgaW50byBgaW5wdXRgIHRoaXMgc2luZ2xlIGNhbGxiYWNrIFxyXG4gICAgICB3aWxsIGJlIGFwcGxpZWQgYWdhaW4uXHJcbiAgICAqL1xyXG4gICAgJGlucHV0Lm9uZSgnYmx1cicsIHNhdmUpLmZvY3VzKCk7XHJcbiAgICBcclxuICB9KTtcclxuICBcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9yZXNvdXJjZXMvYXNzZXRzL2pzL3ZhZG1pbi1mb3Jtcy5qcyJdLCJzb3VyY2VSb290IjoiIn0=