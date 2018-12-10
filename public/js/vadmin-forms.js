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

//enable fileuploader plugin
$('#ImagesUploader').fileuploader({
    extensions: ['jpg', 'jpeg', 'png', 'gif'],
    addMore: true,
    enableApi: true,
    thumbnails: {
        onImageLoaded: function onImageLoaded(item) {
            item.html.find('.fileuploader-action-remove').before('<a class="fileuploader-action fileuploader-action-sort fas fa-sort title="Sort"><i></i></a>');
            if (!item.html.find('.fileuploader-action-edit').length) item.html.find('.fileuploader-action-remove').before('<a class="fileuploader-action fileuploader-action-popup fileuploader-action-edit fas fa-edit" title="Edit"><i></i></a>');
        }
    },
    editor: {
        cropper: {
            ratio: '1:1',
            minWidth: 100,
            minHeight: 100,
            showGrid: true
        }
    },
    sorter: {
        selectorExclude: null,
        placeholder: null,
        scrollContainer: window,
        onSort: function onSort(list, listEl, parentEl, newInputEl, inputEl) {
            // onSort callback
        }
    }
});

// $('#Multi_Images').fileuploader({
//     extensions: ['jpg', 'jpeg', 'png', 'gif', 'bmp'],
//     changeInput: ' ',
//     theme: 'thumbnails',
//     enableApi: true,
//     addMore: true,
//     dragDrop: {
//         // set the drop container {null, String, jQuery Object}
//         // example: 'body'
//         container: null,

//         // Callback fired on entering with dragging files the drop container
//         onDragEnter: function(event, listEl, parentEl, newInputEl, inputEl) {
//             // callback will go here
//         },

//         // Callback fired on leaving with dragging files the drop container
//         onDragLeave: function(event, listEl, parentEl, newInputEl, inputEl) {
//             // callback will go here
//         },

//         // Callback fired on dropping the files in the drop container
//         onDrop: function(event, listEl, parentEl, newInputEl, inputEl) {
//             // callback will go here
//         }
//     },
//     sorter: {
//         selectorExclude: null,
//         placeholder: null,
//         scrollContainer: window,
//         onSort: function(list, listEl, parentEl, newInputEl, inputEl) {
//             // onSort callback
//         }
//     },
//     thumbnails: {
//         onItemShow: function(item) {
//             // add sorter button to the item html<i class="fas fa-sort"></i>
//             item.html.find('.fileuploader-action-remove').before('<a class="fileuploader-action fileuploader-action-sort fas fa-sort" title="Sort"><i></i></a>');
//         },
//         box: '<div class="fileuploader-items">' +
//                   '<ul class="fileuploader-items-list">' +
//                       '<li class="fileuploader-thumbnails-input"><div class="fileuploader-thumbnails-input-inner">+</div></li>' +
//                   '</ul>' +
//               '</div>',
//         item: '<li class="fileuploader-item">' + 
//                    '<div class="fileuploader-item-inner">' +
//                        '<div class="thumbnail-holder">${image}</div>' +
//                        '<div class="actions-holder">' +
//                               '<a class="fileuploader-action fileuploader-action-remove" title="${captions.remove}"><i class="remove"></i></a>' +
//                            '<span class="fileuploader-action-popup"></span>' +
//                        '</div>' +
//                           '<div class="progress-holder">${progressBar}</div>' +
//                    '</div>' +
//                '</li>',
//         item2: '<li class="fileuploader-item">' +
//                    '<div class="fileuploader-item-inner">' +
//                        '<div class="thumbnail-holder">${image}</div>' +
//                        '<div class="actions-holder">' +
//                            '<a class="fileuploader-action fileuploader-action-remove" title="${captions.remove}"><i class="remove"></i></a>' +
//                            '<span class="fileuploader-action-popup"></span>' +
//                        '</div>' +
//                    '</div>' +
//                '</li>',
//         startImageRenderer: true,
//         canvasImage: false,
//         _selectors: {
//             list: '.fileuploader-items-list',
//             item: '.fileuploader-item',
//             start: '.fileuploader-action-start',
//             retry: '.fileuploader-action-retry',
//             sorter: '.fileuploader-action-sort',
//             remove: '.fileuploader-action-remove'
//         },
//         onItemShow: function(item, listEl, parentEl, newInputEl, inputEl) {
//             var plusInput = listEl.find('.fileuploader-thumbnails-input'),
//                 api = $.fileuploader.getInstance(inputEl.get(0));

//             plusInput.insertAfter(item.html)[api.getOptions().limit && api.getChoosedFiles().length >= api.getOptions().limit ? 'hide' : 'show']();

//             if(item.format == 'image') {
//                 item.html.find('.fileuploader-item-icon').hide();
//             }
//         }
//     },
//     afterRender: function(listEl, parentEl, newInputEl, inputEl) {
//         var plusInput = listEl.find('.fileuploader-thumbnails-input'),
//             api = $.fileuploader.getInstance(inputEl.get(0));

//         plusInput.on('click', function() {
//             api.open();
//         });
//     },
//     onRemove: function(item, listEl, parentEl, newInputEl, inputEl) {
//         var plusInput = listEl.find('.fileuploader-thumbnails-input'),
//             api = $.fileuploader.getInstance(inputEl.get(0));

//         if (api.getOptions().limit && api.getChoosedFiles().length - 1 < api.getOptions().limit)
//             plusInput.show();
//     },
//     /*
//     // while using upload option, please set
//     // startImageRenderer: false
//     // for a better effect
//     upload: {
//         url: './php/upload_file.php',
//         data: null,
//         type: 'POST',
//         enctype: 'multipart/form-data',
//         start: true,
//         synchron: true,
//         beforeSend: null,
//         onSuccess: function(data, item) {
//             setTimeout(function() {
//                 item.html.find('.progress-holder').hide();
//                 item.renderThumbnail();
//             }, 400);
//         },
//         onError: function(item) {
//             item.html.find('.progress-holder').hide();
//             item.html.find('.fileuploader-item-icon i').text('Failed!');
//         },
//         onProgress: function(data, item) {
//             var progressBar = item.html.find('.progress-holder');

//             if(progressBar.length > 0) {
//                 progressBar.show();
//                 progressBar.find('.fileuploader-progressbar .bar').width(data.percentage + "%");
//             }
//         }
//     },
//     dragDrop: {
//         container: '.fileuploader-thumbnails-input'
//     },
//     onRemove: function(item) {
//         $.post('php/upload_remove.php', {
//             file: item.name
//         });
//     },
//     */
// });


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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgNzc4OTgwNjFiZWUzNWIwZTQ0MGEiLCJ3ZWJwYWNrOi8vLy4vcmVzb3VyY2VzL2Fzc2V0cy9qcy92YWRtaW4tZm9ybXMuanMiXSwibmFtZXMiOlsiJCIsImNob3NlbiIsInBsYWNlaG9sZGVyX3RleHRfbXVsdGlwbGUiLCJzZWFyY2hfY29udGFpbnMiLCJub19yZXN1bHRzX3RleHQiLCJwbGFjZWhvbGRlcl90ZXh0X3NpbmdsZSIsImtleXVwIiwiVGV4dCIsInZhbCIsInRvTG93ZXJDYXNlIiwicmVnRXhwIiwicmVwbGFjZSIsImV2ZW50Iiwic3R0IiwiY2xpY2siLCJub3RlcyIsImhhc0NsYXNzIiwicmVtb3ZlQ2xhc3MiLCJhZGRDbGFzcyIsImFkZHJlc3NJbnB1dCIsImxvY0lucHV0IiwiYXBwZW5kIiwid2luZG93IiwiY2hlY2tWYXJpYW50cyIsImV4aXN0aW5nQ29tYmluYXRpb25zIiwiZWFjaCIsInB1c2giLCJkYXRhIiwibWFrZVZhcmlhbnRzIiwidmFyaWFudHNDb250YWluZXIiLCJ2YXJpYW50U2l6ZSIsInZhcmlhbnRDb2xvciIsImNvbG9ycyIsInNpemVzIiwiaXMiLCJzaXplIiwiY29sb3IiLCJjb21iaW5hdGlvbnMiLCJpbmRleCIsIml0ZW0iLCJjb25zb2xlIiwibG9nIiwidmFsdWUiLCJpbmNsdWRlcyIsInZhcmlhbnRSb3ciLCJvbiIsImUiLCJwcmV2ZW50RGVmYXVsdCIsInBhcmVudHMiLCJyZW1vdmUiLCJkZWxldGVEQkl0ZW0iLCJyb3V0ZSIsImlkIiwicm93aWQiLCJhamF4IiwidXJsIiwibWV0aG9kIiwiZGF0YVR5cGUiLCJiZWZvcmVTZW5kIiwic3VjY2VzcyIsImFsZXJ0X2Vycm9yIiwibWVzc2FnZSIsImVycm9yIiwiaHRtbCIsInJlc3BvbnNlVGV4dCIsImZpbGV1cGxvYWRlciIsImV4dGVuc2lvbnMiLCJsaW1pdCIsImFkZE1vcmUiLCJmaWxlTWF4U2l6ZSIsImNhcHRpb25zIiwiYnV0dG9uIiwib3B0aW9ucyIsImZlZWRiYWNrIiwiZmVlZGJhY2syIiwibGVuZ3RoIiwiZHJvcCIsInBhc3RlIiwicmVtb3ZlQ29uZmlybWF0aW9uIiwiZXJyb3JzIiwiZmlsZXNMaW1pdCIsImZpbGVzVHlwZSIsImZpbGVTaXplIiwiZmlsZU5hbWUiLCJmb2xkZXJVcGxvYWQiLCJkaWFsb2dzIiwiYWxlcnQiLCJ0ZXh0IiwiY29uZmlybSIsImNhbGxiYWNrIiwiZW5hYmxlQXBpIiwidGh1bWJuYWlscyIsIm9uSW1hZ2VMb2FkZWQiLCJmaW5kIiwiYmVmb3JlIiwiZWRpdG9yIiwiY3JvcHBlciIsInJhdGlvIiwibWluV2lkdGgiLCJtaW5IZWlnaHQiLCJzaG93R3JpZCIsInNvcnRlciIsInNlbGVjdG9yRXhjbHVkZSIsInBsYWNlaG9sZGVyIiwic2Nyb2xsQ29udGFpbmVyIiwib25Tb3J0IiwibGlzdCIsImxpc3RFbCIsInBhcmVudEVsIiwibmV3SW5wdXRFbCIsImlucHV0RWwiLCIkZWwiLCIkaW5wdXQiLCJyZXBsYWNlV2l0aCIsInNhdmUiLCIkcCIsIm9uZSIsImZvY3VzIl0sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUEyQiwwQkFBMEIsRUFBRTtBQUN2RCx5Q0FBaUMsZUFBZTtBQUNoRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4REFBc0QsK0RBQStEOztBQUVySDtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7QUM3REE7QUFDQTtBQUNBOztBQUVBQSxFQUFFLGdCQUFGLEVBQW9CQyxNQUFwQixDQUEyQjtBQUN2QkMs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QUosQ0FBaUJELE1BQWpCOztBQUVBLFFBQUlFLE9BQU8sU0FBUEEsSUFBTyxHQUFVO0FBQ25CLFlBQUlDLEtBQUtuSCxFQUFFLHFCQUFGLEVBQXlCdUYsSUFBekIsQ0FBK0J5QixPQUFPeEcsR0FBUCxFQUEvQixDQUFUO0FBQ0F3RyxlQUFPQyxXQUFQLENBQW9CRSxFQUFwQjtBQUNELEtBSEQ7O0FBS0E7Ozs7Ozs7QUFPQUgsV0FBT0ksR0FBUCxDQUFXLE1BQVgsRUFBbUJGLElBQW5CLEVBQXlCRyxLQUF6QjtBQUVELENBckJILEUiLCJmaWxlIjoiL2pzL3ZhZG1pbi1mb3Jtcy5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwge1xuIFx0XHRcdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcbiBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4gXHRcdFx0XHRnZXQ6IGdldHRlclxuIFx0XHRcdH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIi9cIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSA3OCk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgNzc4OTgwNjFiZWUzNWIwZTQ0MGEiLCIvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuLy8gICAgICAgICAgICAgICAgICAgIENvbG9yc1xyXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuXHJcbiQoJy5TZWxlY3QtQ29sb3JzJykuY2hvc2VuKHtcclxuICAgIHBsYWNlaG9sZGVyX3RleHRfbXVsdGlwbGU6ICdTZWxlY2Npb25lIGxvcyBjb2xvcmVzJyxcclxuICAgIC8vIG1heF9zZWxlY3RlZF9vcHRpb25zOiAzLFxyXG4gICAgc2VhcmNoX2NvbnRhaW5zOiB0cnVlLFxyXG4gICAgbm9fcmVzdWx0c190ZXh0OiAnTm8gc2UgaGEgZW5jb250cmFkbyBlbCBjb2xvcidcclxufSk7XHJcblxyXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuLy8gICAgICAgICAgICAgICAgICAgICBUYWdzXHJcbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4kKCcuU2VsZWN0LVRhZ3MnKS5jaG9zZW4oe1xyXG4gICAgcGxhY2Vob2xkZXJfdGV4dF9tdWx0aXBsZTogJ1NlbGVjY2lvbmUgbGFzIGV0aXF1ZXRhcycsXHJcbiAgICAvLyBtYXhfc2VsZWN0ZWRfb3B0aW9uczogMyxcclxuICAgIHNlYXJjaF9jb250YWluczogdHJ1ZSxcclxuICAgIG5vX3Jlc3VsdHNfdGV4dDogJ05vIHNlIGhhIGVuY29udHJhZG8gbGEgZXRpcXVldGEnXHJcbn0pO1xyXG5cclxuJCgnLlNlbGVjdC1CcmFuZCcpLmNob3Nlbih7XHJcbiAgICBwbGFjZWhvbGRlcl90ZXh0X3NpbmdsZTogJ1NlbGVjY2lvbmUgbGEgbWFyY2EnLFxyXG4gICAgLy8gbWF4X3NlbGVjdGVkX29wdGlvbnM6IDMsXHJcbiAgICBzZWFyY2hfY29udGFpbnM6IHRydWUsXHJcbiAgICBub19yZXN1bHRzX3RleHQ6ICdObyBzZSBoYSBlbmNvbnRyYWRvIGxhIG1hcmNhJ1xyXG59KTtcclxuXHJcblxyXG5cclxuJCgnLlNlbGVjdC1BdHJpYnV0ZScpLmNob3Nlbih7XHJcbiAgICBwbGFjZWhvbGRlcl90ZXh0X211bHRpcGxlOiAnU2VsZWNjaW9uYXInLFxyXG4gICAgLy8gbWF4X3NlbGVjdGVkX29wdGlvbnM6IDMsXHJcbiAgICBzZWFyY2hfY29udGFpbnM6IHRydWUsXHJcbiAgICBub19yZXN1bHRzX3RleHQ6ICdObyBzZSBoYSBlbmNvbnRyYWRvJ1xyXG59KTtcclxuXHJcbiQoJy5TZWxlY3QtQ2F0ZWdvcnknKS5jaG9zZW4oe1xyXG4gICAgcGxhY2Vob2xkZXJfdGV4dF9zaW5nbGU6ICdTZWxlY2Npb25lIHVuYSBjYXRlZ29yw61hJyxcclxufSk7XHJcblxyXG4kKCcuU2VsZWN0LUNob3NlbicpLmNob3Nlbih7XHJcbiAgICBwbGFjZWhvbGRlcl90ZXh0X3NpbmdsZTogJ1NlbGVjY2lvbmUgdW5hIGNhdGVnb3LDrWEnLFxyXG59KTtcclxuXHJcblxyXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuLy8gICAgICAgICAgICAgIFNsdWcgY3JlYXRvclxyXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuXHJcbiQoXCIuU2x1Z0lucHV0XCIpLmtleXVwKGZ1bmN0aW9uKCl7XHJcbiAgICB2YXIgVGV4dCAgICAgPSAkKHRoaXMpLnZhbCgpO1xyXG4gICAgVGV4dCAgICAgICAgID0gVGV4dC50b0xvd2VyQ2FzZSgpO1xyXG4gICAgdmFyIHJlZ0V4cCAgID0gL1xccysvZztcclxuICAgIFRleHQgICAgICAgICA9IFRleHQucmVwbGFjZSgvWyZcXC9cXFxcIyzCoSHCtCMrKCkkfiUuJ1wiOio/PD57fV0vZywnJyk7XHJcbiAgICBUZXh0ICAgICAgICAgPSBUZXh0LnJlcGxhY2UocmVnRXhwLCctJyk7XHJcbiAgICBUZXh0ICAgICAgICAgPSBUZXh0LnJlcGxhY2UoJ8OxJywgJ24nKSA7XHJcbiAgICBUZXh0ICAgICAgICAgPSBUZXh0LnJlcGxhY2UoJ8OhJywgJ2EnKSA7XHJcbiAgICBUZXh0ICAgICAgICAgPSBUZXh0LnJlcGxhY2UoJ8OpJywgJ2UnKSA7XHJcbiAgICBUZXh0ICAgICAgICAgPSBUZXh0LnJlcGxhY2UoJ8OtJywgJ2knKSA7XHJcbiAgICBUZXh0ICAgICAgICAgPSBUZXh0LnJlcGxhY2UoJ8OzJywgJ28nKSA7XHJcbiAgICBUZXh0ICAgICAgICAgPSBUZXh0LnJlcGxhY2UoJ8O6JywgJ3UnKSA7XHJcbiAgICBcclxuICAgICQoXCIuU2x1Z0lucHV0XCIpLnZhbChUZXh0KTsgICBcclxufSk7XHJcblxyXG4vLyBTbHVnIEF1dG9GaWxsbnB1dCBmcm9tIHRpdGxlIFxyXG5cclxuJChcIiNUaXRsZUlucHV0XCIpLmtleXVwKGZ1bmN0aW9uKGV2ZW50KSB7XHJcbiAgICB2YXIgc3R0ID0gJCh0aGlzKS52YWwoKTtcclxuICAgIHZhciBUZXh0ICAgICA9ICQodGhpcykudmFsKCk7XHJcbiAgICBUZXh0ICAgICAgICAgPSBUZXh0LnRvTG93ZXJDYXNlKCk7XHJcbiAgICB2YXIgcmVnRXhwICAgPSAvXFxzKy9nO1xyXG4gICAgVGV4dCAgICAgICAgID0gVGV4dC5yZXBsYWNlKC9bJlxcL1xcXFwjLMKhIcK0IysoKSR+JS4nXCI6Kj88Pnt9XS9nLCcnKTtcclxuICAgIFRleHQgICAgICAgICA9IFRleHQucmVwbGFjZShyZWdFeHAsJy0nKTtcclxuICAgIFRleHQgICAgICAgICA9IFRleHQucmVwbGFjZSgnw7EnLCAnbicpIDtcclxuICAgIFRleHQgICAgICAgICA9IFRleHQucmVwbGFjZSgnw6EnLCAnYScpIDtcclxuICAgIFRleHQgICAgICAgICA9IFRleHQucmVwbGFjZSgnw6knLCAnZScpIDtcclxuICAgIFRleHQgICAgICAgICA9IFRleHQucmVwbGFjZSgnw60nLCAnaScpIDtcclxuICAgIFRleHQgICAgICAgICA9IFRleHQucmVwbGFjZSgnw7MnLCAnbycpIDtcclxuICAgIFRleHQgICAgICAgICA9IFRleHQucmVwbGFjZSgnw7onLCAndScpIDtcclxuICAgICQoXCIuU2x1Z0lucHV0XCIpLnZhbChUZXh0KTsgICBcclxufSk7XHJcblxyXG5cclxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbi8vICAgICAgQ1JFQVRFIEZPUk1cclxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcblxyXG4vLyBTaG93IE5vdGVzIFRleHQgQXJlYVxyXG4kKCcuU2hvd05vdGVzVGV4dEFyZWEnKS5jbGljayhmdW5jdGlvbigpe1xyXG4gICAgdmFyIG5vdGVzID0gJCgnLk5vdGVzVGV4dEFyZWEnKTtcclxuICAgIGlmIChub3Rlcy5oYXNDbGFzcygnSGlkZGVuJykpe1xyXG4gICAgICAgIG5vdGVzLnJlbW92ZUNsYXNzKCdIaWRkZW4nKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgbm90ZXMuYWRkQ2xhc3MoJ0hpZGRlbicpO1xyXG4gICAgfVxyXG59KTtcclxuXHJcbi8vIEFkZCBBbm90aGVyIEFkZHJlc3NcclxuJCgnLkFkZEFub3RoZXJBZGRyZXNzQnRuJykuY2xpY2soZnVuY3Rpb24oKXtcclxuICAgIHZhciBhZGRyZXNzSW5wdXQgPSBcIjxpbnB1dCBjbGFzcz0nZm9ybS1jb250cm9sJyBwbGFjZWhvbGRlcj0nSW5ncmVzZSBvdHJvIHRlbMOpZm9ubycgbmFtZT0nZGVsaXZlcnlhZGRyZXNzW10nIHR5cGU9J3RleHQnIHN0eWxlPSdtYXJnaW4tdG9wOjVweCc+XCI7XHJcbiAgICB2YXIgbG9jSW5wdXQgICAgID0gXCI8aW5wdXQgY2xhc3M9J2Zvcm0tY29udHJvbCcgcGxhY2Vob2xkZXI9J0luZ3Jlc2Ugb3RybyB0ZWzDqWZvbm8nIG5hbWU9J2RlbGl2ZXJ5YWRkcmVzc1tdJyB0eXBlPSd0ZXh0JyBzdHlsZT0nbWFyZ2luLXRvcDo1cHgnPlwiO1xyXG5cclxuICAgICQoJy5Bbm90aGVyQWRkcmVzcycpLmFwcGVuZChhZGRyZXNzSW5wdXQpO1xyXG4gICAgJCgnLkFub3RoZXJMb2MnKS5hcHBlbmQobG9jSW5wdXQpO1xyXG59KTtcclxuXHJcblxyXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuLy8gICAgIENSRUFURSBBUlRJQ0xFIFZBUklBTlRTXHJcbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG5cclxud2luZG93LmNoZWNrVmFyaWFudHMgPSBmdW5jdGlvbigpXHJcbntcclxuICAgIGxldCBleGlzdGluZ0NvbWJpbmF0aW9ucyA9IFtdO1xyXG4gICAgJChcIi5Db21iaW5hdGlvblwiKS5lYWNoKGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgZXhpc3RpbmdDb21iaW5hdGlvbnMucHVzaCgkKHRoaXMpLmRhdGEoJ2NvbWJpbmF0aW9uJykpO1xyXG4gICAgfSk7XHJcbiAgICByZXR1cm4gZXhpc3RpbmdDb21iaW5hdGlvbnM7XHJcbn1cclxuXHJcblxyXG53aW5kb3cubWFrZVZhcmlhbnRzID0gZnVuY3Rpb24oKVxyXG57XHJcbiAgICBjb25zdCB2YXJpYW50c0NvbnRhaW5lciA9ICQoJyNBcnRpY2xlVmFyaWFudHMnKTtcclxuICAgIGNvbnN0IHZhcmlhbnRTaXplID0gJCgnLlZhcmlhbnRTaXplJyk7XHJcbiAgICBjb25zdCB2YXJpYW50Q29sb3IgPSAkKCcuVmFyaWFudENvbG9yJyk7XHJcbiAgICBcclxuICAgIGxldCBjb2xvcnMgPSBbXTtcclxuICAgIGxldCBzaXplcyA9IFtdO1xyXG5cclxuICAgIFxyXG5cclxuICAgICQuZWFjaCh2YXJpYW50U2l6ZSwgZnVuY3Rpb24oKXtcclxuICAgICAgICBpZigkKHRoaXMpLmlzKCc6Y2hlY2tlZCcpKVxyXG4gICAgICAgIHsgICBcclxuICAgICAgICAgICAgc2l6ZSA9IHt9O1xyXG4gICAgICAgICAgICBzaXplWydpZCddID0gJCh0aGlzKS52YWwoKTtcclxuICAgICAgICAgICAgc2l6ZVsnbmFtZSddID0gJCh0aGlzKS5kYXRhKCduYW1lJyk7XHJcbiAgICAgICAgICAgIHNpemVzLnB1c2goc2l6ZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcbiAgICBcclxuICAgICQuZWFjaCh2YXJpYW50Q29sb3IsIGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgaWYoJCh0aGlzKS5pcygnOmNoZWNrZWQnKSlcclxuICAgICAgICB7ICAgXHJcbiAgICAgICAgICAgIGNvbG9yID0ge307XHJcbiAgICAgICAgICAgIGNvbG9yWydpZCddID0gJCh0aGlzKS52YWwoKTtcclxuICAgICAgICAgICAgY29sb3JbJ25hbWUnXSA9ICQodGhpcykuZGF0YSgnbmFtZScpO1xyXG4gICAgICAgICAgICBjb2xvcnMucHVzaChjb2xvcik7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcbiAgICAgICBcclxuICAgIGxldCBjb21iaW5hdGlvbnMgPSBbXTtcclxuXHJcbiAgICAkLmVhY2goY29sb3JzLCBmdW5jdGlvbihpbmRleCwgY29sb3Ipe1xyXG4gICAgICAgICQuZWFjaChzaXplcywgIGZ1bmN0aW9uKGluZGV4LCBzaXplKXtcclxuICAgICAgICAgICAgbGV0IGl0ZW0gPSB7fTsgXHJcbiAgICAgICAgICAgIGl0ZW1bJ2NvbWJpbmF0aW9uJ10gPSBjb2xvclsnbmFtZSddK1wiL1wiK3NpemVbJ25hbWUnXTtcclxuICAgICAgICAgICAgaXRlbVsnY29sb3InXSA9IGNvbG9yWyduYW1lJ107XHJcbiAgICAgICAgICAgIGl0ZW1bJ2NvbG9yX2lkJ10gPSBjb2xvclsnaWQnXTtcclxuICAgICAgICAgICAgaXRlbVsnc2l6ZSddID0gc2l6ZVsnbmFtZSddO1xyXG4gICAgICAgICAgICBpdGVtWydzaXplX2lkJ10gPSBzaXplWydpZCddO1xyXG4gICAgICAgICAgICBjb21iaW5hdGlvbnMucHVzaChpdGVtKTtcclxuICAgICAgICB9KTtcclxuICAgIH0pO1xyXG5cclxuICAgIGNvbnNvbGUubG9nKGNvbWJpbmF0aW9ucyk7XHJcbiAgICBcclxuICAgIGxldCBleGlzdGluZ0NvbWJpbmF0aW9ucyA9IGNoZWNrVmFyaWFudHMoKTtcclxuXHJcbiAgICAkLmVhY2goY29tYmluYXRpb25zLCBmdW5jdGlvbihpbmRleCwgdmFsdWUpXHJcbiAgICB7ICAgXHJcbiAgICAgICAgLy8gRUNNQSBzY3JpcHQgNiBcclxuICAgICAgICBpZighZXhpc3RpbmdDb21iaW5hdGlvbnMuaW5jbHVkZXModmFsdWVbJ2NvbWJpbmF0aW9uJ10pKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgbGV0IHZhcmlhbnRSb3cgPSBcIjx0cj5cIiArXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCI8dGQgY2xhc3M9J0NvbWJpbmF0aW9uJyBkYXRhLWNvbWJpbmF0aW9uPVwiKyB2YWx1ZVsnY29sb3InXSArXCIvXCIgKyB2YWx1ZVsnc2l6ZSddICsgXCI+XCIrIHZhbHVlWydjb2xvciddICtcIi9cIiArIHZhbHVlWydzaXplJ10gKyBcIjwvdGQ+XCIgK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiPGlucHV0IG5hbWU9J3ZhcmlhbnRzW1wiK3ZhbHVlWydjb21iaW5hdGlvbiddK1wiXVtjb2xvcl0nIHZhbHVlPVwiKyB2YWx1ZVsnY29sb3JfaWQnXSArXCIgdHlwZT0naGlkZGVuJyBjbGFzcz0nZm9ybS1jb250cm9sJz5cIiArXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCI8aW5wdXQgbmFtZT0ndmFyaWFudHNbXCIrdmFsdWVbJ2NvbWJpbmF0aW9uJ10rXCJdW3NpemVdJyB2YWx1ZT1cIisgdmFsdWVbJ3NpemVfaWQnXSArXCIgdHlwZT0naGlkZGVuJyBjbGFzcz0nZm9ybS1jb250cm9sJz5cIiArXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCI8dGQ+PGlucHV0IG5hbWU9J3ZhcmlhbnRzW1wiK3ZhbHVlWydjb21iaW5hdGlvbiddK1wiXVtzdG9ja10nIHZhbHVlPScxMCcgdHlwZT0nbnVtYmVyJyBtaW49JzAnIGNsYXNzPSdmb3JtLWNvbnRyb2wnPjwvdGQ+XCIgK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiPHRkPjxhIGNsYXNzPSdSZW1vdmVEeW5Sb3cgZGVsZXRlLWljb24nPjxpIGNsYXNzPSdkZWxldGUtaWNvbiBmYSBmYS10cmFzaCc+PC9pPjwvYT48L3RkPlwiICtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIjwvdHI+XCI7XHJcbiAgICAgICAgICAgIHZhcmlhbnRzQ29udGFpbmVyLmFwcGVuZCh2YXJpYW50Um93KTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuICAgICQoJyNIZWFkZXJWYXJpYW50cycpLnJlbW92ZUNsYXNzKCdIaWRkZW4nKTtcclxufVxyXG5cclxuXHJcbi8vIFJlbW92ZSBuZXcgdmFyaWFudHMgcm93XHJcbiQoJyNBcnRpY2xlVmFyaWFudHMnKS5vbignY2xpY2snLCAnLlJlbW92ZUR5blJvdycsIGZ1bmN0aW9uKGUpIHtcclxuICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICQodGhpcykucGFyZW50cygndHInKS5yZW1vdmUoKTtcclxufSk7XHJcblxyXG4kKCcuUmVtb3ZlVmFyaWFudCcpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xyXG4gICAgY29uc29sZS5sb2coJCh0aGlzKS5kYXRhKCdyb3dpZCcpKTtcclxuICAgIGRlbGV0ZURCSXRlbSgkKHRoaXMpLmRhdGEoJ3JvdXRlJyksICQodGhpcykuZGF0YSgnaWQnKSwgJCh0aGlzKS5kYXRhKCdyb3dpZCcpKTtcclxufSk7XHJcblxyXG5cclxud2luZG93LmRlbGV0ZURCSXRlbSA9IGZ1bmN0aW9uKHJvdXRlLCBpZCwgcm93aWQpe1xyXG4gICAgJC5hamF4KHtcclxuICAgICAgICB1cmw6IHJvdXRlLFxyXG4gICAgICAgIG1ldGhvZDogJ1BPU1QnLCAgICAgICAgICAgICBcclxuICAgICAgICBkYXRhVHlwZTogJ0pTT04nLFxyXG4gICAgICAgIGRhdGE6IHsgaWQ6IGlkIH0sXHJcbiAgICAgICAgYmVmb3JlU2VuZDogZnVuY3Rpb24oKXtcclxuICAgICAgICB9LFxyXG4gICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uKGRhdGEpe1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhkYXRhKTtcclxuICAgICAgICAgICAgaWYgKGRhdGEuc3VjY2VzcyA9PSB0cnVlKSB7XHJcbiAgICAgICAgICAgICAgICAvLyAkKFwiI1wiK3Jvd2lkKS5oaWRlKCk7XHJcbiAgICAgICAgICAgICAgICAkKFwiI1wiK3Jvd2lkKS5yZW1vdmUoKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGFsZXJ0X2Vycm9yKCdVcHMhJywnSGEgb2N1cnJpZG8gdW4gZXJyb3IgYWwgZWxpbWluYXIgbGEgdmFyaWFudGUnKTtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGRhdGEpO1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coZGF0YS5tZXNzYWdlKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZXJyb3I6IGZ1bmN0aW9uKGRhdGEpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICAkKCcjRXJyb3InKS5odG1sKGRhdGEucmVzcG9uc2VUZXh0KTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coZGF0YSk7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGRhdGEubWVzc2FnZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcbn1cclxuXHJcblxyXG5cclxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbi8vICAgRURJVE9SUyBBTkQgRklFTERTIFxyXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuXHJcbi8vICQoJyNNdWx0aV9JbWFnZXMnKS5maWxldXBsb2FkZXIoe1xyXG4vLyAgICAgZXh0ZW5zaW9uczogWydqcGcnLCAnanBlZycsICdwbmcnLCAnZ2lmJ10sXHJcbi8vICAgICBsaW1pdDogbnVsbCxcclxuLy8gICAgIGFkZE1vcmU6IHRydWUsXHJcbi8vICAgICAvLyBQZXNvIG3DoXhpbW8gZGUgdG9kYXMgbGFzIGltw6FnZW5lc1xyXG4vLyAgICAgbWF4U2l6ZTogNSxcclxuLy8gICAgIC8vIFBlc28gbcOheGltbyBwb3IgaW3DoWdlblxyXG4vLyAgICAgZmlsZU1heFNpemU6IDIsXHJcbi8vICAgICB0aGVtZTogJ3RodW1ibmFpbHMnLFxyXG4vLyAgICAgZW5hYmxlQXBpOiB0cnVlLFxyXG4vLyAgICAgY2FwdGlvbnM6IHtcclxuLy8gICAgICAgICBidXR0b246IGZ1bmN0aW9uKG9wdGlvbnMpIHsgcmV0dXJuICdTZWxlY2Npb25hciAnICsgKG9wdGlvbnMubGltaXQgPT0gMSA/ICdJbcOhZ2VuZXMnIDogJ0ltw6FnZW4nKTsgfSxcclxuLy8gICAgICAgICBmZWVkYmFjazogZnVuY3Rpb24ob3B0aW9ucykgeyByZXR1cm4gJ0hhZ2EgY2xpY2sgcGFyYSBhZ3JlZ2FyLi4uJzsgfSxcclxuLy8gICAgICAgICBmZWVkYmFjazI6IGZ1bmN0aW9uKG9wdGlvbnMpIHsgcmV0dXJuIG9wdGlvbnMubGVuZ3RoICsgJyAnICsgKG9wdGlvbnMubGVuZ3RoID4gMSA/ICcgaW3DoWdlbmVzIHNlbGVjY2lvbmFkYXMnIDogJyBpbcOhZ2VuIHNlbGVjY2lvbmFkYScpOyB9LFxyXG4vLyAgICAgICAgIGRyb3A6ICdBcnJhc3RyZSBsYXMgaW3DoWdlbmVzIGFxdcOtJyxcclxuLy8gICAgICAgICBwYXN0ZTogJzxkaXYgY2xhc3M9XCJmaWxldXBsb2FkZXItcGVuZGluZy1sb2FkZXJcIj48ZGl2IGNsYXNzPVwibGVmdC1oYWxmXCIgc3R5bGU9XCJhbmltYXRpb24tZHVyYXRpb246ICR7bXN9c1wiPjwvZGl2PjxkaXYgY2xhc3M9XCJzcGlubmVyXCIgc3R5bGU9XCJhbmltYXRpb24tZHVyYXRpb246ICR7bXN9c1wiPjwvZGl2PjxkaXYgY2xhc3M9XCJyaWdodC1oYWxmXCIgc3R5bGU9XCJhbmltYXRpb24tZHVyYXRpb246ICR7bXN9c1wiPjwvZGl2PjwvZGl2PiBQYXN0aW5nIGEgZmlsZSwgY2xpY2sgaGVyZSB0byBjYW5jZWwuJyxcclxuLy8gICAgICAgICByZW1vdmVDb25maXJtYXRpb246ICdFbGltaW5hcj8nLFxyXG4vLyAgICAgICAgIGVycm9yczoge1xyXG4vLyAgICAgICAgICAgICBmaWxlc0xpbWl0OiAnU29sbyBlcyBwb3NpYmxlIHN1YmlyICR7bGltaXR9IGltw6FnZW4uJyxcclxuLy8gICAgICAgICAgICAgZmlsZXNUeXBlOiAnU29sbyBzZSBhY2VwdGFuIGxvcyBmb3JtYXRvczogJHtleHRlbnNpb25zfS4nLFxyXG4vLyAgICAgICAgICAgICBmaWxlU2l6ZTogJyR7bmFtZX0gZXMgbXV5IGdyYW5kZXMhIFNlbGVjY2lvbmUgdW5hIGRlICR7ZmlsZU1heFNpemV9TUIuIGNvbW8gbcOheGltbycsXHJcbi8vICAgICAgICAgICAgIGZpbGVzU2l6ZUFsbDogJyR7bmFtZX0gc29uIG11eSBncmFuZGVzISBTZWxlY2Npb25lIHVuYXMgZGUgJHtmaWxlTWF4U2l6ZX1NQi4gY29tbyBtw6F4aW1vJyxcclxuLy8gICAgICAgICAgICAgZmlsZU5hbWU6ICdMYSBpbcOhZ2VuIGNvbiBlbCBub21icmUgJHtuYW1lfSB5YSBlc3TDoSBzZWxlY2Npb25hZGEuJyxcclxuLy8gICAgICAgICAgICAgZm9sZGVyVXBsb2FkOiAnTm8gZXN0w6EgcGVybWl0aWRvIHN1YmlyIGNhcnBldGFzLidcclxuLy8gICAgICAgICB9LFxyXG4vLyAgICAgICAgIGRpYWxvZ3M6IHtcclxuLy8gICAgICAgICAgICAgLy8gYWxlcnQgZGlhbG9nXHJcbi8vICAgICAgICAgICAgIGFsZXJ0OiBmdW5jdGlvbih0ZXh0KSB7XHJcbi8vICAgICAgICAgICAgICAgICByZXR1cm4gYWxlcnRfY29uZmlybSh0ZXh0KTtcclxuLy8gICAgICAgICAgICAgfSxcclxuLy8gICAgICAgICAgICAgLy8gY29uZmlybSBkaWFsb2dcclxuLy8gICAgICAgICAgICAgY29uZmlybTogZnVuY3Rpb24odGV4dCwgY2FsbGJhY2spIHtcclxuLy8gICAgICAgICAgICAgICAgICdjb25maXJtKHRleHQpID8gY2FsbGJhY2soKSA6IG51bGw7J1xyXG4vLyAgICAgICAgICAgICB9XHJcbi8vICAgICAgICAgfSxcclxuLy8gICAgIH1cclxuLy8gfSk7XHJcblxyXG4kKCcjU2luZ2xlX0ltYWdlJykuZmlsZXVwbG9hZGVyKHtcclxuICAgIGV4dGVuc2lvbnM6IFsnanBnJywgJ2pwZWcnLCAncG5nJywgJ2dpZiddLFxyXG4gICAgbGltaXQ6IDEsXHJcbiAgICBhZGRNb3JlOiBmYWxzZSxcclxuICAgIGZpbGVNYXhTaXplOiAyLFxyXG4gICAgY2FwdGlvbnM6IHtcclxuICAgICAgICBidXR0b246IGZ1bmN0aW9uKG9wdGlvbnMpIHsgcmV0dXJuICdTZWxlY2Npb25hciAnICsgKG9wdGlvbnMubGltaXQgPT0gMSA/ICdJbcOhZ2VuJyA6ICdJbcOhZ2VuJyk7IH0sXHJcbiAgICAgICAgZmVlZGJhY2s6IGZ1bmN0aW9uKG9wdGlvbnMpIHsgcmV0dXJuICdBZ3JlZ2FyIGltw6FnZW5lcy4uLic7IH0sXHJcbiAgICAgICAgZmVlZGJhY2syOiBmdW5jdGlvbihvcHRpb25zKSB7IHJldHVybiBvcHRpb25zLmxlbmd0aCArICcgJyArIChvcHRpb25zLmxlbmd0aCA+IDEgPyAnIGltw6FnZW5lcyBzZWxlY2Npb25hZGFzJyA6ICcgaW3DoWdlbiBzZWxlY2Npb25hZGEnKTsgfSxcclxuICAgICAgICBkcm9wOiAnQXJyYXN0cmUgbGFzIGltw6FnZW5lcyBhcXXDrScsXHJcbiAgICAgICAgcGFzdGU6ICc8ZGl2IGNsYXNzPVwiZmlsZXVwbG9hZGVyLXBlbmRpbmctbG9hZGVyXCI+PGRpdiBjbGFzcz1cImxlZnQtaGFsZlwiIHN0eWxlPVwiYW5pbWF0aW9uLWR1cmF0aW9uOiAke21zfXNcIj48L2Rpdj48ZGl2IGNsYXNzPVwic3Bpbm5lclwiIHN0eWxlPVwiYW5pbWF0aW9uLWR1cmF0aW9uOiAke21zfXNcIj48L2Rpdj48ZGl2IGNsYXNzPVwicmlnaHQtaGFsZlwiIHN0eWxlPVwiYW5pbWF0aW9uLWR1cmF0aW9uOiAke21zfXNcIj48L2Rpdj48L2Rpdj4gUGFzdGluZyBhIGZpbGUsIGNsaWNrIGhlcmUgdG8gY2FuY2VsLicsXHJcbiAgICAgICAgcmVtb3ZlQ29uZmlybWF0aW9uOiAnRWxpbWluYXI/JyxcclxuICAgICAgICBlcnJvcnM6IHtcclxuICAgICAgICAgICAgZmlsZXNMaW1pdDogJ1NvbG8gZXMgcG9zaWJsZSBzdWJpciAke2xpbWl0fSBpbcOhZ2VuLicsXHJcbiAgICAgICAgICAgIGZpbGVzVHlwZTogJ1NvbG8gc2UgYWNlcHRhbiBsb3MgZm9ybWF0b3M6ICR7ZXh0ZW5zaW9uc30uJyxcclxuICAgICAgICAgICAgZmlsZVNpemU6ICdMYSBpbcOhZ2VuIHBlc2EgbXVjaG8hIEVsaWphIHVuYSBkZSAke2ZpbGVNYXhTaXplfU1CIGNvbW8gbcOheGltby4nLFxyXG4gICAgICAgICAgICBmaWxlTmFtZTogJ0xhIGltw6FnZW4gY29uIGVzZSBub21icmUgeWEgaGEgc2lkbyBlbGVnaWRhJyxcclxuICAgICAgICAgICAgZm9sZGVyVXBsb2FkOiAnTm8gZXN0w6EgcGVybWl0aWRvIHN1YmlyIGNhcnBldGFzLicsXHJcbiAgICAgICAgfSxcclxuICAgICAgICBkaWFsb2dzOiB7XHJcbiAgICAgICAgICAgIC8vIGFsZXJ0IGRpYWxvZ1xyXG4gICAgICAgICAgICBhbGVydDogZnVuY3Rpb24odGV4dCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGFsZXJ0KHRleHQpO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAvLyBjb25maXJtIGRpYWxvZ1xyXG4gICAgICAgICAgICBjb25maXJtOiBmdW5jdGlvbih0ZXh0LCBjYWxsYmFjaykge1xyXG4gICAgICAgICAgICAgICAgJ2NvbmZpcm0odGV4dCkgPyBjYWxsYmFjaygpIDogbnVsbDsnXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG4gICAgfVxyXG59KTtcclxuXHJcbi8vZW5hYmxlIGZpbGV1cGxvYWRlciBwbHVnaW5cclxuJCgnI0ltYWdlc1VwbG9hZGVyJykuZmlsZXVwbG9hZGVyKHtcclxuICAgIGV4dGVuc2lvbnM6IFsnanBnJywgJ2pwZWcnLCAncG5nJywgJ2dpZiddLFxyXG4gICAgYWRkTW9yZTogdHJ1ZSxcclxuICAgIGVuYWJsZUFwaTogdHJ1ZSxcclxuICAgIHRodW1ibmFpbHM6IHtcclxuICAgICAgICBvbkltYWdlTG9hZGVkOiBmdW5jdGlvbihpdGVtKSB7XHJcbiAgICAgICAgICAgIGl0ZW0uaHRtbC5maW5kKCcuZmlsZXVwbG9hZGVyLWFjdGlvbi1yZW1vdmUnKS5iZWZvcmUoJzxhIGNsYXNzPVwiZmlsZXVwbG9hZGVyLWFjdGlvbiBmaWxldXBsb2FkZXItYWN0aW9uLXNvcnQgZmFzIGZhLXNvcnQgdGl0bGU9XCJTb3J0XCI+PGk+PC9pPjwvYT4nKTtcclxuICAgICAgICAgICAgaWYgKCFpdGVtLmh0bWwuZmluZCgnLmZpbGV1cGxvYWRlci1hY3Rpb24tZWRpdCcpLmxlbmd0aClcclxuICAgICAgICAgICAgICAgIGl0ZW0uaHRtbC5maW5kKCcuZmlsZXVwbG9hZGVyLWFjdGlvbi1yZW1vdmUnKS5iZWZvcmUoJzxhIGNsYXNzPVwiZmlsZXVwbG9hZGVyLWFjdGlvbiBmaWxldXBsb2FkZXItYWN0aW9uLXBvcHVwIGZpbGV1cGxvYWRlci1hY3Rpb24tZWRpdCBmYXMgZmEtZWRpdFwiIHRpdGxlPVwiRWRpdFwiPjxpPjwvaT48L2E+Jyk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIGVkaXRvcjoge1xyXG4gICAgICAgIGNyb3BwZXI6IHtcclxuICAgICAgICAgICAgcmF0aW86ICcxOjEnLFxyXG4gICAgICAgICAgICBtaW5XaWR0aDogMTAwLFxyXG4gICAgICAgICAgICBtaW5IZWlnaHQ6IDEwMCxcclxuICAgICAgICAgICAgc2hvd0dyaWQ6IHRydWVcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgc29ydGVyOiB7XHJcbiAgICAgICAgc2VsZWN0b3JFeGNsdWRlOiBudWxsLFxyXG4gICAgICAgIHBsYWNlaG9sZGVyOiBudWxsLFxyXG4gICAgICAgIHNjcm9sbENvbnRhaW5lcjogd2luZG93LFxyXG4gICAgICAgIG9uU29ydDogZnVuY3Rpb24obGlzdCwgbGlzdEVsLCBwYXJlbnRFbCwgbmV3SW5wdXRFbCwgaW5wdXRFbCkge1xyXG4gICAgICAgICAgICAvLyBvblNvcnQgY2FsbGJhY2tcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0pO1xyXG5cclxuXHJcbi8vICQoJyNNdWx0aV9JbWFnZXMnKS5maWxldXBsb2FkZXIoe1xyXG4vLyAgICAgZXh0ZW5zaW9uczogWydqcGcnLCAnanBlZycsICdwbmcnLCAnZ2lmJywgJ2JtcCddLFxyXG4vLyAgICAgY2hhbmdlSW5wdXQ6ICcgJyxcclxuLy8gICAgIHRoZW1lOiAndGh1bWJuYWlscycsXHJcbi8vICAgICBlbmFibGVBcGk6IHRydWUsXHJcbi8vICAgICBhZGRNb3JlOiB0cnVlLFxyXG4vLyAgICAgZHJhZ0Ryb3A6IHtcclxuLy8gICAgICAgICAvLyBzZXQgdGhlIGRyb3AgY29udGFpbmVyIHtudWxsLCBTdHJpbmcsIGpRdWVyeSBPYmplY3R9XHJcbi8vICAgICAgICAgLy8gZXhhbXBsZTogJ2JvZHknXHJcbi8vICAgICAgICAgY29udGFpbmVyOiBudWxsLFxyXG4gICAgXHJcbi8vICAgICAgICAgLy8gQ2FsbGJhY2sgZmlyZWQgb24gZW50ZXJpbmcgd2l0aCBkcmFnZ2luZyBmaWxlcyB0aGUgZHJvcCBjb250YWluZXJcclxuLy8gICAgICAgICBvbkRyYWdFbnRlcjogZnVuY3Rpb24oZXZlbnQsIGxpc3RFbCwgcGFyZW50RWwsIG5ld0lucHV0RWwsIGlucHV0RWwpIHtcclxuLy8gICAgICAgICAgICAgLy8gY2FsbGJhY2sgd2lsbCBnbyBoZXJlXHJcbi8vICAgICAgICAgfSxcclxuICAgIFxyXG4vLyAgICAgICAgIC8vIENhbGxiYWNrIGZpcmVkIG9uIGxlYXZpbmcgd2l0aCBkcmFnZ2luZyBmaWxlcyB0aGUgZHJvcCBjb250YWluZXJcclxuLy8gICAgICAgICBvbkRyYWdMZWF2ZTogZnVuY3Rpb24oZXZlbnQsIGxpc3RFbCwgcGFyZW50RWwsIG5ld0lucHV0RWwsIGlucHV0RWwpIHtcclxuLy8gICAgICAgICAgICAgLy8gY2FsbGJhY2sgd2lsbCBnbyBoZXJlXHJcbi8vICAgICAgICAgfSxcclxuICAgIFxyXG4vLyAgICAgICAgIC8vIENhbGxiYWNrIGZpcmVkIG9uIGRyb3BwaW5nIHRoZSBmaWxlcyBpbiB0aGUgZHJvcCBjb250YWluZXJcclxuLy8gICAgICAgICBvbkRyb3A6IGZ1bmN0aW9uKGV2ZW50LCBsaXN0RWwsIHBhcmVudEVsLCBuZXdJbnB1dEVsLCBpbnB1dEVsKSB7XHJcbi8vICAgICAgICAgICAgIC8vIGNhbGxiYWNrIHdpbGwgZ28gaGVyZVxyXG4vLyAgICAgICAgIH1cclxuLy8gICAgIH0sXHJcbi8vICAgICBzb3J0ZXI6IHtcclxuLy8gICAgICAgICBzZWxlY3RvckV4Y2x1ZGU6IG51bGwsXHJcbi8vICAgICAgICAgcGxhY2Vob2xkZXI6IG51bGwsXHJcbi8vICAgICAgICAgc2Nyb2xsQ29udGFpbmVyOiB3aW5kb3csXHJcbi8vICAgICAgICAgb25Tb3J0OiBmdW5jdGlvbihsaXN0LCBsaXN0RWwsIHBhcmVudEVsLCBuZXdJbnB1dEVsLCBpbnB1dEVsKSB7XHJcbi8vICAgICAgICAgICAgIC8vIG9uU29ydCBjYWxsYmFja1xyXG4vLyAgICAgICAgIH1cclxuLy8gICAgIH0sXHJcbi8vICAgICB0aHVtYm5haWxzOiB7XHJcbi8vICAgICAgICAgb25JdGVtU2hvdzogZnVuY3Rpb24oaXRlbSkge1xyXG4vLyAgICAgICAgICAgICAvLyBhZGQgc29ydGVyIGJ1dHRvbiB0byB0aGUgaXRlbSBodG1sPGkgY2xhc3M9XCJmYXMgZmEtc29ydFwiPjwvaT5cclxuLy8gICAgICAgICAgICAgaXRlbS5odG1sLmZpbmQoJy5maWxldXBsb2FkZXItYWN0aW9uLXJlbW92ZScpLmJlZm9yZSgnPGEgY2xhc3M9XCJmaWxldXBsb2FkZXItYWN0aW9uIGZpbGV1cGxvYWRlci1hY3Rpb24tc29ydCBmYXMgZmEtc29ydFwiIHRpdGxlPVwiU29ydFwiPjxpPjwvaT48L2E+Jyk7XHJcbi8vICAgICAgICAgfSxcclxuLy8gICAgICAgICBib3g6ICc8ZGl2IGNsYXNzPVwiZmlsZXVwbG9hZGVyLWl0ZW1zXCI+JyArXHJcbi8vICAgICAgICAgICAgICAgICAgICc8dWwgY2xhc3M9XCJmaWxldXBsb2FkZXItaXRlbXMtbGlzdFwiPicgK1xyXG4vLyAgICAgICAgICAgICAgICAgICAgICAgJzxsaSBjbGFzcz1cImZpbGV1cGxvYWRlci10aHVtYm5haWxzLWlucHV0XCI+PGRpdiBjbGFzcz1cImZpbGV1cGxvYWRlci10aHVtYm5haWxzLWlucHV0LWlubmVyXCI+KzwvZGl2PjwvbGk+JyArXHJcbi8vICAgICAgICAgICAgICAgICAgICc8L3VsPicgK1xyXG4vLyAgICAgICAgICAgICAgICc8L2Rpdj4nLFxyXG4vLyAgICAgICAgIGl0ZW06ICc8bGkgY2xhc3M9XCJmaWxldXBsb2FkZXItaXRlbVwiPicgKyBcclxuLy8gICAgICAgICAgICAgICAgICAgICc8ZGl2IGNsYXNzPVwiZmlsZXVwbG9hZGVyLWl0ZW0taW5uZXJcIj4nICtcclxuLy8gICAgICAgICAgICAgICAgICAgICAgICAnPGRpdiBjbGFzcz1cInRodW1ibmFpbC1ob2xkZXJcIj4ke2ltYWdlfTwvZGl2PicgK1xyXG4vLyAgICAgICAgICAgICAgICAgICAgICAgICc8ZGl2IGNsYXNzPVwiYWN0aW9ucy1ob2xkZXJcIj4nICtcclxuLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJzxhIGNsYXNzPVwiZmlsZXVwbG9hZGVyLWFjdGlvbiBmaWxldXBsb2FkZXItYWN0aW9uLXJlbW92ZVwiIHRpdGxlPVwiJHtjYXB0aW9ucy5yZW1vdmV9XCI+PGkgY2xhc3M9XCJyZW1vdmVcIj48L2k+PC9hPicgK1xyXG4vLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAnPHNwYW4gY2xhc3M9XCJmaWxldXBsb2FkZXItYWN0aW9uLXBvcHVwXCI+PC9zcGFuPicgK1xyXG4vLyAgICAgICAgICAgICAgICAgICAgICAgICc8L2Rpdj4nICtcclxuLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAnPGRpdiBjbGFzcz1cInByb2dyZXNzLWhvbGRlclwiPiR7cHJvZ3Jlc3NCYXJ9PC9kaXY+JyArXHJcbi8vICAgICAgICAgICAgICAgICAgICAnPC9kaXY+JyArXHJcbi8vICAgICAgICAgICAgICAgICc8L2xpPicsXHJcbi8vICAgICAgICAgaXRlbTI6ICc8bGkgY2xhc3M9XCJmaWxldXBsb2FkZXItaXRlbVwiPicgK1xyXG4vLyAgICAgICAgICAgICAgICAgICAgJzxkaXYgY2xhc3M9XCJmaWxldXBsb2FkZXItaXRlbS1pbm5lclwiPicgK1xyXG4vLyAgICAgICAgICAgICAgICAgICAgICAgICc8ZGl2IGNsYXNzPVwidGh1bWJuYWlsLWhvbGRlclwiPiR7aW1hZ2V9PC9kaXY+JyArXHJcbi8vICAgICAgICAgICAgICAgICAgICAgICAgJzxkaXYgY2xhc3M9XCJhY3Rpb25zLWhvbGRlclwiPicgK1xyXG4vLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAnPGEgY2xhc3M9XCJmaWxldXBsb2FkZXItYWN0aW9uIGZpbGV1cGxvYWRlci1hY3Rpb24tcmVtb3ZlXCIgdGl0bGU9XCIke2NhcHRpb25zLnJlbW92ZX1cIj48aSBjbGFzcz1cInJlbW92ZVwiPjwvaT48L2E+JyArXHJcbi8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICc8c3BhbiBjbGFzcz1cImZpbGV1cGxvYWRlci1hY3Rpb24tcG9wdXBcIj48L3NwYW4+JyArXHJcbi8vICAgICAgICAgICAgICAgICAgICAgICAgJzwvZGl2PicgK1xyXG4vLyAgICAgICAgICAgICAgICAgICAgJzwvZGl2PicgK1xyXG4vLyAgICAgICAgICAgICAgICAnPC9saT4nLFxyXG4vLyAgICAgICAgIHN0YXJ0SW1hZ2VSZW5kZXJlcjogdHJ1ZSxcclxuLy8gICAgICAgICBjYW52YXNJbWFnZTogZmFsc2UsXHJcbi8vICAgICAgICAgX3NlbGVjdG9yczoge1xyXG4vLyAgICAgICAgICAgICBsaXN0OiAnLmZpbGV1cGxvYWRlci1pdGVtcy1saXN0JyxcclxuLy8gICAgICAgICAgICAgaXRlbTogJy5maWxldXBsb2FkZXItaXRlbScsXHJcbi8vICAgICAgICAgICAgIHN0YXJ0OiAnLmZpbGV1cGxvYWRlci1hY3Rpb24tc3RhcnQnLFxyXG4vLyAgICAgICAgICAgICByZXRyeTogJy5maWxldXBsb2FkZXItYWN0aW9uLXJldHJ5JyxcclxuLy8gICAgICAgICAgICAgc29ydGVyOiAnLmZpbGV1cGxvYWRlci1hY3Rpb24tc29ydCcsXHJcbi8vICAgICAgICAgICAgIHJlbW92ZTogJy5maWxldXBsb2FkZXItYWN0aW9uLXJlbW92ZSdcclxuLy8gICAgICAgICB9LFxyXG4vLyAgICAgICAgIG9uSXRlbVNob3c6IGZ1bmN0aW9uKGl0ZW0sIGxpc3RFbCwgcGFyZW50RWwsIG5ld0lucHV0RWwsIGlucHV0RWwpIHtcclxuLy8gICAgICAgICAgICAgdmFyIHBsdXNJbnB1dCA9IGxpc3RFbC5maW5kKCcuZmlsZXVwbG9hZGVyLXRodW1ibmFpbHMtaW5wdXQnKSxcclxuLy8gICAgICAgICAgICAgICAgIGFwaSA9ICQuZmlsZXVwbG9hZGVyLmdldEluc3RhbmNlKGlucHV0RWwuZ2V0KDApKTtcclxuICAgICAgICAgICAgXHJcbi8vICAgICAgICAgICAgIHBsdXNJbnB1dC5pbnNlcnRBZnRlcihpdGVtLmh0bWwpW2FwaS5nZXRPcHRpb25zKCkubGltaXQgJiYgYXBpLmdldENob29zZWRGaWxlcygpLmxlbmd0aCA+PSBhcGkuZ2V0T3B0aW9ucygpLmxpbWl0ID8gJ2hpZGUnIDogJ3Nob3cnXSgpO1xyXG4gICAgICAgICAgICBcclxuLy8gICAgICAgICAgICAgaWYoaXRlbS5mb3JtYXQgPT0gJ2ltYWdlJykge1xyXG4vLyAgICAgICAgICAgICAgICAgaXRlbS5odG1sLmZpbmQoJy5maWxldXBsb2FkZXItaXRlbS1pY29uJykuaGlkZSgpO1xyXG4vLyAgICAgICAgICAgICB9XHJcbi8vICAgICAgICAgfVxyXG4vLyAgICAgfSxcclxuLy8gICAgIGFmdGVyUmVuZGVyOiBmdW5jdGlvbihsaXN0RWwsIHBhcmVudEVsLCBuZXdJbnB1dEVsLCBpbnB1dEVsKSB7XHJcbi8vICAgICAgICAgdmFyIHBsdXNJbnB1dCA9IGxpc3RFbC5maW5kKCcuZmlsZXVwbG9hZGVyLXRodW1ibmFpbHMtaW5wdXQnKSxcclxuLy8gICAgICAgICAgICAgYXBpID0gJC5maWxldXBsb2FkZXIuZ2V0SW5zdGFuY2UoaW5wdXRFbC5nZXQoMCkpO1xyXG4gICAgXHJcbi8vICAgICAgICAgcGx1c0lucHV0Lm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xyXG4vLyAgICAgICAgICAgICBhcGkub3BlbigpO1xyXG4vLyAgICAgICAgIH0pO1xyXG4vLyAgICAgfSxcclxuLy8gICAgIG9uUmVtb3ZlOiBmdW5jdGlvbihpdGVtLCBsaXN0RWwsIHBhcmVudEVsLCBuZXdJbnB1dEVsLCBpbnB1dEVsKSB7XHJcbi8vICAgICAgICAgdmFyIHBsdXNJbnB1dCA9IGxpc3RFbC5maW5kKCcuZmlsZXVwbG9hZGVyLXRodW1ibmFpbHMtaW5wdXQnKSxcclxuLy8gICAgICAgICAgICAgYXBpID0gJC5maWxldXBsb2FkZXIuZ2V0SW5zdGFuY2UoaW5wdXRFbC5nZXQoMCkpO1xyXG4gICAgXHJcbi8vICAgICAgICAgaWYgKGFwaS5nZXRPcHRpb25zKCkubGltaXQgJiYgYXBpLmdldENob29zZWRGaWxlcygpLmxlbmd0aCAtIDEgPCBhcGkuZ2V0T3B0aW9ucygpLmxpbWl0KVxyXG4vLyAgICAgICAgICAgICBwbHVzSW5wdXQuc2hvdygpO1xyXG4vLyAgICAgfSxcclxuLy8gICAgIC8qXHJcbi8vICAgICAvLyB3aGlsZSB1c2luZyB1cGxvYWQgb3B0aW9uLCBwbGVhc2Ugc2V0XHJcbi8vICAgICAvLyBzdGFydEltYWdlUmVuZGVyZXI6IGZhbHNlXHJcbi8vICAgICAvLyBmb3IgYSBiZXR0ZXIgZWZmZWN0XHJcbi8vICAgICB1cGxvYWQ6IHtcclxuLy8gICAgICAgICB1cmw6ICcuL3BocC91cGxvYWRfZmlsZS5waHAnLFxyXG4vLyAgICAgICAgIGRhdGE6IG51bGwsXHJcbi8vICAgICAgICAgdHlwZTogJ1BPU1QnLFxyXG4vLyAgICAgICAgIGVuY3R5cGU6ICdtdWx0aXBhcnQvZm9ybS1kYXRhJyxcclxuLy8gICAgICAgICBzdGFydDogdHJ1ZSxcclxuLy8gICAgICAgICBzeW5jaHJvbjogdHJ1ZSxcclxuLy8gICAgICAgICBiZWZvcmVTZW5kOiBudWxsLFxyXG4vLyAgICAgICAgIG9uU3VjY2VzczogZnVuY3Rpb24oZGF0YSwgaXRlbSkge1xyXG4vLyAgICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xyXG4vLyAgICAgICAgICAgICAgICAgaXRlbS5odG1sLmZpbmQoJy5wcm9ncmVzcy1ob2xkZXInKS5oaWRlKCk7XHJcbi8vICAgICAgICAgICAgICAgICBpdGVtLnJlbmRlclRodW1ibmFpbCgpO1xyXG4vLyAgICAgICAgICAgICB9LCA0MDApO1xyXG4vLyAgICAgICAgIH0sXHJcbi8vICAgICAgICAgb25FcnJvcjogZnVuY3Rpb24oaXRlbSkge1xyXG4vLyAgICAgICAgICAgICBpdGVtLmh0bWwuZmluZCgnLnByb2dyZXNzLWhvbGRlcicpLmhpZGUoKTtcclxuLy8gICAgICAgICAgICAgaXRlbS5odG1sLmZpbmQoJy5maWxldXBsb2FkZXItaXRlbS1pY29uIGknKS50ZXh0KCdGYWlsZWQhJyk7XHJcbi8vICAgICAgICAgfSxcclxuLy8gICAgICAgICBvblByb2dyZXNzOiBmdW5jdGlvbihkYXRhLCBpdGVtKSB7XHJcbi8vICAgICAgICAgICAgIHZhciBwcm9ncmVzc0JhciA9IGl0ZW0uaHRtbC5maW5kKCcucHJvZ3Jlc3MtaG9sZGVyJyk7XHJcbiAgICAgICAgICAgIFxyXG4vLyAgICAgICAgICAgICBpZihwcm9ncmVzc0Jhci5sZW5ndGggPiAwKSB7XHJcbi8vICAgICAgICAgICAgICAgICBwcm9ncmVzc0Jhci5zaG93KCk7XHJcbi8vICAgICAgICAgICAgICAgICBwcm9ncmVzc0Jhci5maW5kKCcuZmlsZXVwbG9hZGVyLXByb2dyZXNzYmFyIC5iYXInKS53aWR0aChkYXRhLnBlcmNlbnRhZ2UgKyBcIiVcIik7XHJcbi8vICAgICAgICAgICAgIH1cclxuLy8gICAgICAgICB9XHJcbi8vICAgICB9LFxyXG4vLyAgICAgZHJhZ0Ryb3A6IHtcclxuLy8gICAgICAgICBjb250YWluZXI6ICcuZmlsZXVwbG9hZGVyLXRodW1ibmFpbHMtaW5wdXQnXHJcbi8vICAgICB9LFxyXG4vLyAgICAgb25SZW1vdmU6IGZ1bmN0aW9uKGl0ZW0pIHtcclxuLy8gICAgICAgICAkLnBvc3QoJ3BocC91cGxvYWRfcmVtb3ZlLnBocCcsIHtcclxuLy8gICAgICAgICAgICAgZmlsZTogaXRlbS5uYW1lXHJcbi8vICAgICAgICAgfSk7XHJcbi8vICAgICB9LFxyXG4vLyAgICAgKi9cclxuLy8gfSk7XHJcblxyXG5cclxuXHJcbiQoJy5EaXNwbGF5LUlucHV0LU1vZGlmaWNhYmxlJykuY2xpY2soZnVuY3Rpb24oKXtcclxuICAgICQodGhpcykucmVtb3ZlQ2xhc3MoJ2Rpc3BsYXktaW5wdXQtZGlzYWJsZWQnKTsgXHJcbn0pO1xyXG5cclxuXHJcbi8vIC0tLS0gTW9kaWZpY2FibGUgaW5wdXQgdGV4dFxyXG4vLyBIdG1sIGVsZW1lbnRcclxuLy88cCBkYXRhLWVkaXRhYmxlIGNsYXNzPVwiU2x1Z0lucHV0XCI+e3sgJGFydGljbGUtPnNsdWcgfX08L3A+ICAgXHJcblxyXG4kKCdib2R5Jykub24oJ2NsaWNrJywgJ1tkYXRhLWVkaXRhYmxlXScsIGZ1bmN0aW9uKCl7XHJcbiAgXHJcbiAgICB2YXIgJGVsID0gJCh0aGlzKTtcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgdmFyICRpbnB1dCA9ICQoJzxpbnB1dC8+JykudmFsKCAkZWwudGV4dCgpICk7XHJcbiAgICAkZWwucmVwbGFjZVdpdGgoICRpbnB1dCApO1xyXG4gICAgXHJcbiAgICB2YXIgc2F2ZSA9IGZ1bmN0aW9uKCl7XHJcbiAgICAgIHZhciAkcCA9ICQoJzxwIGRhdGEtZWRpdGFibGUgLz4nKS50ZXh0KCAkaW5wdXQudmFsKCkgKTtcclxuICAgICAgJGlucHV0LnJlcGxhY2VXaXRoKCAkcCApO1xyXG4gICAgfTtcclxuICAgIFxyXG4gICAgLyoqXHJcbiAgICAgIFdlJ3JlIGRlZmluaW5nIHRoZSBjYWxsYmFjayB3aXRoIGBvbmVgLCBiZWNhdXNlIHdlIGtub3cgdGhhdFxyXG4gICAgICB0aGUgZWxlbWVudCB3aWxsIGJlIGdvbmUganVzdCBhZnRlciB0aGF0LCBhbmQgd2UgZG9uJ3Qgd2FudCBcclxuICAgICAgYW55IGNhbGxiYWNrcyBsZWZ0b3ZlcnMgdGFrZSBtZW1vcnkuIFxyXG4gICAgICBOZXh0IHRpbWUgYHBgIHR1cm5zIGludG8gYGlucHV0YCB0aGlzIHNpbmdsZSBjYWxsYmFjayBcclxuICAgICAgd2lsbCBiZSBhcHBsaWVkIGFnYWluLlxyXG4gICAgKi9cclxuICAgICRpbnB1dC5vbmUoJ2JsdXInLCBzYXZlKS5mb2N1cygpO1xyXG4gICAgXHJcbiAgfSk7XHJcbiAgXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vcmVzb3VyY2VzL2Fzc2V0cy9qcy92YWRtaW4tZm9ybXMuanMiXSwic291cmNlUm9vdCI6IiJ9