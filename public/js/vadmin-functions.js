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
/******/ 	return __webpack_require__(__webpack_require__.s = 76);
/******/ })
/************************************************************************/
/******/ ({

/***/ 76:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(77);


/***/ }),

/***/ 77:
/***/ (function(module, exports) {

$.ajaxSetup({
	headers: {
		'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
	}
});

/*
|--------------------------------------------------------------------------
| LISTS
|--------------------------------------------------------------------------
*/

// Select checkbox to deletion
$(document).on("click", ".List-Checkbox", function (e) {
	e.stopPropagation();
	CheckToDeletion("single", $(this));
});

// Select All present checkboxes to deletion
$('.Select-All-To-Delete').on("click", function () {

	if ($(this).prop('checked')) {
		$('.List-Checkbox').prop('checked', true);
		if ($('.List-Checkbox').length >= 1) {
			CheckToDeletion("all");
			$('.DeleteBtn').removeClass('Hidden');
		}

		$('tbody tr').addClass('row-selected');
	} else {
		$('.List-Checkbox').prop('checked', false);
		$('.DeleteBtn').addClass('Hidden');
		$('tbody tr').removeClass('row-selected');
	}
});

function CheckToDeletion(type, row) {
	var selectedRows = [];
	$(".List-Checkbox:checked").each(function () {
		selectedRows.push($(this).attr('data-id'));
		$('#RowsToDeletion').val(selectedRows);
	});

	if (selectedRows.length == 1) {
		$('#EditId, #CreateFromAnotherId').val(selectedRows);
	} else if (selectedRows.length < 1) {
		$('#EditId, #CreateFromAnotherId').val('');
	} else if (selectedRows.length > 1) {
		$('#EditId, #CreateFromAnotherId').val('');
	} else {
		$('#EditId, #CreateFromAnotherId').val('');
	}

	showButtons(this);
	if (type == 'single' && row != undefined) {
		var checkbox = row.prop('checked');
		if (checkbox) {
			row.parent().parent().parent().addClass('row-selected');
		} else {
			row.parent().parent().parent().removeClass('row-selected');
		}
	}
}

// Original lines
// Set List Action Buttons
// $(document).on("click", ".List-Checkbox", function(e){
//     e.stopPropagation();
// 	var selectedRows = [];
//     $(".List-Checkbox:checked").each(function() {          
//         selectedRows.push($(this).attr('data-id'));
// 		$('#RowsToDeletion').val(selectedRows);
//     });

//     if(selectedRows.length == 1){
// 		$('#EditId, #CreateFromAnotherId').val(selectedRows);
//     } else if(selectedRows.length < 1){
// 		$('#EditId, #CreateFromAnotherId').val('');
//     } else if(selectedRows.length > 1){
//         $('#EditId, #CreateFromAnotherId').val('');
//     } else {
//         $('#EditId, #CreateFromAnotherId').val('');
//     }

//     showButtons(this);

// 	var checkbox = $(this).prop('checked');
// 	if(checkbox){
// 		$(this).parent().parent().parent().addClass('row-selected');
// 	} else {
// 		$(this).parent().parent().parent().removeClass('row-selected');
// 	}
// });


function showButtons(trigger) {

	var countSelected = $('.List-Checkbox:checkbox:checked').length;
	if (countSelected == 1) {
		$('.DeleteBtn').removeClass('Hidden');
		$('.EditBtn').removeClass('Hidden');
		$('.CreateFromAnotherBtn').removeClass('Hidden');
	} else if (countSelected >= 2) {
		$('.EditBtn').addClass('Hidden');
		$('.CreateFromAnotherBtn').addClass('Hidden');
	} else if (countSelected == 0) {
		$('.DeleteBtn').addClass('Hidden');
		$('.EditBtn').addClass('Hidden');
		$('.CreateFromAnotherBtn').addClass('Hidden');
	}
}

// Show Edit and Delete buttons in bottom if scrolled to mutch
$(document).scroll(function (e) {
	var scrollAmount = $(window).scrollTop();
	if (scrollAmount > 150) {
		$('.DeleteBtn').css({ "position": "fixed", "bottom": "50px", "right": "10px", "z-index": "999" });
		$('.EditBtn').css({ "position": "fixed", "bottom": "50px", "right": "130px", "z-index": "999" });
		$('.CreateFromAnotherBtn').css({ "position": "fixed", "bottom": "50px", "right": "235px", "z-index": "999" });
	} else {
		$('.DeleteBtn').css({ "position": "relative", "bottom": "auto", "right": "auto", "z-index": "999" });
		$('.EditBtn').css({ "position": "relative", "bottom": "auto", "right": "auto", "z-index": "999" });
		$('.CreateFromAnotherBtn').css({ "position": "relative", "bottom": "auto", "right": "auto", "z-index": "999" });
	}
});

// Uncheck all checkboxes on reload.
function uncheckAll() {
	$('#TableList tbody .CheckBoxes').find('input[type="checkbox"]').each(function () {
		$(this).prop('checked', false);
	});
}
uncheckAll();

/*
|--------------------------------------------------------------------------
| FUNCTIONS
|--------------------------------------------------------------------------
*/

deleteRecord = function deleteRecord(id, route, bigtext, smalltext) {
	swal({
		title: bigtext,
		text: smalltext,
		type: 'warning',
		showCancelButton: true,
		confirmButtonColor: '#3085d6',
		cancelButtonColor: '#d33',
		confirmButtonText: 'ELIMINAR',
		cancelButtonText: 'Cancelar',
		confirmButtonClass: 'btn btnGreen',
		cancelButtonClass: 'btn btnRed',
		buttonsStyling: false
	}).then(function () {

		$.ajax({
			url: route,
			method: 'POST',
			dataType: 'JSON',
			data: { id: id },
			beforeSend: function beforeSend() {
				// $('#Main-Loader').removeClass('Hidden');
			},
			success: function success(data) {
				$('#BatchDeleteBtn').addClass('Hidden');
				if (data.success == true) {
					$('#Id' + id).hide(200);
					for (i = 0; i < id.length; i++) {
						$('#Id' + id[i]).hide(200);
					}
					alert_ok('Ok!', 'Eliminación completa');
					console.log(data);
					return true;
				} else {
					alert_error('Ups!', 'Ha ocurrido un error (Puede que este registro tenga relación con otros items en el sistema). Debe eliminar primero los mismos.');
					console.log(data);
					return false;
				}
			},
			error: function error(data) {
				$('#Error').html(data.responseText);
				console.log(data);
			},
			complete: function complete() {
				// $('#Main-Loader').addClass('Hidden');
			}
		});
	});
};

deleteAndReload = function deleteAndReload(id, route, bigtext, smalltext) {
	swal({
		title: bigtext,
		text: smalltext,
		type: 'warning',
		showCancelButton: true,
		confirmButtonColor: '#3085d6',
		cancelButtonColor: '#d33',
		confirmButtonText: 'ELIMINAR',
		cancelButtonText: 'Cancelar',
		confirmButtonClass: 'btn btnGreen',
		cancelButtonClass: 'btn btnRed',
		buttonsStyling: false
	}).then(function () {
		$.ajax({
			url: route,
			method: 'POST',
			dataType: 'JSON',
			data: { id: id },
			beforeSend: function beforeSend() {
				// $('#Main-Loader').removeClass('Hidden');
			},
			success: function success(data) {
				$('#BatchDeleteBtn').addClass('Hidden');
				if (data.success == true) {
					// alert_ok('Ok!','Eliminación completa');
					location.reload();
				} else {
					alert_error('Ups!', 'Ha ocurrido un error (Puede que este registro tenga relación con otros items en el sistema). Debe eliminar primero los mismos.');
					console.log(data);
					return false;
				}
			},
			error: function error(data) {
				$('#Error').html(data.responseText);
				console.log(data);
			}
		});
	});
};

// Remove product from cart
// -------------------------------------------
window.removeFromCart = function (route, cartItemId, action, element) {
	$.ajax({
		url: route,
		method: 'POST',
		dataType: 'JSON',
		data: { cartItemId: cartItemId, action: action },
		success: function success(data) {
			console.log(data);
			if (data.response == 'success') {
				element.remove();
			} else {
				console.log("ERROR");
			}
		},
		error: function error(data) {
			$('#Error').html(data.responseText);
			console.log("Error en removeFromCart()");
			console.log(data);
			// If an error pops when destroying an item, reload and prevent bad magic
			// location.reload();
		}
	});
};
/*
|--------------------------------------------------------------------------
| ALERTS
|--------------------------------------------------------------------------
*/

function alert_ok(bigtext, smalltext) {
	swal(bigtext, smalltext, 'success');
}

function alert_error(bigtext, smalltext) {
	swal(bigtext, smalltext, 'error');
}

function alert_info(bigtext, smalltext) {

	swal({
		title: bigtext,
		type: 'info',
		html: smalltext,
		showCloseButton: true,
		showCancelButton: false,
		confirmButtonText: '<i class="ion-checkmark-round"></i> Ok!'
	});
}

function closeParent() {
	$(this).parent('hide');
}

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgNTE3ZDA2NmJmOGJlMDcwNzBlYzgiLCJ3ZWJwYWNrOi8vLy4vcmVzb3VyY2VzL2Fzc2V0cy9qcy92YWRtaW4tZnVuY3Rpb25zLmpzIl0sIm5hbWVzIjpbIiQiLCJhamF4U2V0dXAiLCJoZWFkZXJzIiwiYXR0ciIsImRvY3VtZW50Iiwib24iLCJlIiwic3RvcFByb3BhZ2F0aW9uIiwiQ2hlY2tUb0RlbGV0aW9uIiwicHJvcCIsImxlbmd0aCIsInJlbW92ZUNsYXNzIiwiYWRkQ2xhc3MiLCJ0eXBlIiwicm93Iiwic2VsZWN0ZWRSb3dzIiwiZWFjaCIsInB1c2giLCJ2YWwiLCJzaG93QnV0dG9ucyIsInVuZGVmaW5lZCIsImNoZWNrYm94IiwicGFyZW50IiwidHJpZ2dlciIsImNvdW50U2VsZWN0ZWQiLCJzY3JvbGwiLCJzY3JvbGxBbW91bnQiLCJ3aW5kb3ciLCJzY3JvbGxUb3AiLCJjc3MiLCJ1bmNoZWNrQWxsIiwiZmluZCIsImRlbGV0ZVJlY29yZCIsImlkIiwicm91dGUiLCJiaWd0ZXh0Iiwic21hbGx0ZXh0Iiwic3dhbCIsInRpdGxlIiwidGV4dCIsInNob3dDYW5jZWxCdXR0b24iLCJjb25maXJtQnV0dG9uQ29sb3IiLCJjYW5jZWxCdXR0b25Db2xvciIsImNvbmZpcm1CdXR0b25UZXh0IiwiY2FuY2VsQnV0dG9uVGV4dCIsImNvbmZpcm1CdXR0b25DbGFzcyIsImNhbmNlbEJ1dHRvbkNsYXNzIiwiYnV0dG9uc1N0eWxpbmciLCJ0aGVuIiwiYWpheCIsInVybCIsIm1ldGhvZCIsImRhdGFUeXBlIiwiZGF0YSIsImJlZm9yZVNlbmQiLCJzdWNjZXNzIiwiaGlkZSIsImkiLCJhbGVydF9vayIsImNvbnNvbGUiLCJsb2ciLCJhbGVydF9lcnJvciIsImVycm9yIiwiaHRtbCIsInJlc3BvbnNlVGV4dCIsImNvbXBsZXRlIiwiZGVsZXRlQW5kUmVsb2FkIiwibG9jYXRpb24iLCJyZWxvYWQiLCJyZW1vdmVGcm9tQ2FydCIsImNhcnRJdGVtSWQiLCJhY3Rpb24iLCJlbGVtZW50IiwicmVzcG9uc2UiLCJyZW1vdmUiLCJhbGVydF9pbmZvIiwic2hvd0Nsb3NlQnV0dG9uIiwiY2xvc2VQYXJlbnQiXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUNBQTJCLDBCQUEwQixFQUFFO0FBQ3ZELHlDQUFpQyxlQUFlO0FBQ2hEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDhEQUFzRCwrREFBK0Q7O0FBRXJIO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7Ozs7Ozs7Ozs7OztBQzdEQUEsRUFBRUMsU0FBRixDQUFZO0FBQ1JDLFVBQVM7QUFDTCxrQkFBZ0JGLEVBQUUseUJBQUYsRUFBNkJHLElBQTdCLENBQWtDLFNBQWxDO0FBRFg7QUFERCxDQUFaOztBQU1BOzs7Ozs7QUFPQTtBQUNBSCxFQUFFSSxRQUFGLEVBQVlDLEVBQVosQ0FBZSxPQUFmLEVBQXdCLGdCQUF4QixFQUEwQyxVQUFTQyxDQUFULEVBQzFDO0FBQ0NBLEdBQUVDLGVBQUY7QUFDQUMsaUJBQWdCLFFBQWhCLEVBQTBCUixFQUFFLElBQUYsQ0FBMUI7QUFDQSxDQUpEOztBQU1BO0FBQ0FBLEVBQUUsdUJBQUYsRUFBMkJLLEVBQTNCLENBQThCLE9BQTlCLEVBQXVDLFlBQVc7O0FBRWpELEtBQUlMLEVBQUUsSUFBRixFQUFRUyxJQUFSLENBQWEsU0FBYixDQUFKLEVBQTZCO0FBQzVCVCxJQUFFLGdCQUFGLEVBQW9CUyxJQUFwQixDQUF5QixTQUF6QixFQUFvQyxJQUFwQztBQUNBLE1BQUdULEVBQUUsZ0JBQUYsRUFBb0JV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U0FGSixFQUdJLFNBSEo7QUFLSDs7QUFFRCxTQUFTeUIsV0FBVCxDQUFxQjFCLE9BQXJCLEVBQThCQyxTQUE5QixFQUF3QztBQUNwQ0MsTUFDSUYsT0FESixFQUVJQyxTQUZKLEVBR0ksT0FISjtBQUtIOztBQUVELFNBQVN1QyxVQUFULENBQW9CeEMsT0FBcEIsRUFBNkJDLFNBQTdCLEVBQXVDOztBQUVuQ0MsTUFBSztBQUNHQyxTQUFPSCxPQURWO0FBRUR0QixRQUFNLE1BRkw7QUFHRGtELFFBQU0zQixTQUhMO0FBSUR3QyxtQkFBaUIsSUFKaEI7QUFLRHBDLG9CQUFrQixLQUxqQjtBQU1ERyxxQkFDSTtBQVBILEVBQUw7QUFTSDs7QUFHRCxTQUFTa0MsV0FBVCxHQUFzQjtBQUNyQjdFLEdBQUUsSUFBRixFQUFRc0IsTUFBUixDQUFlLE1BQWY7QUFDQSxDIiwiZmlsZSI6Ii9qcy92YWRtaW4tZnVuY3Rpb25zLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7XG4gXHRcdFx0XHRjb25maWd1cmFibGU6IGZhbHNlLFxuIFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGdldDogZ2V0dGVyXG4gXHRcdFx0fSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiL1wiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDc2KTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCA1MTdkMDY2YmY4YmUwNzA3MGVjOCIsIiQuYWpheFNldHVwKHtcclxuICAgIGhlYWRlcnM6IHtcclxuICAgICAgICAnWC1DU1JGLVRPS0VOJzogJCgnbWV0YVtuYW1lPVwiY3NyZi10b2tlblwiXScpLmF0dHIoJ2NvbnRlbnQnKVxyXG4gICAgfVxyXG59KTtcclxuIFxyXG4vKlxyXG58LS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxufCBMSVNUU1xyXG58LS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuKi9cclxuXHJcblxyXG4vLyBTZWxlY3QgY2hlY2tib3ggdG8gZGVsZXRpb25cclxuJChkb2N1bWVudCkub24oXCJjbGlja1wiLCBcIi5MaXN0LUNoZWNrYm94XCIsIGZ1bmN0aW9uKGUpXHJcbntcclxuXHRlLnN0b3BQcm9wYWdhdGlvbigpO1xyXG5cdENoZWNrVG9EZWxldGlvbihcInNpbmdsZVwiLCAkKHRoaXMpKTtcclxufSk7XHJcblxyXG4vLyBTZWxlY3QgQWxsIHByZXNlbnQgY2hlY2tib3hlcyB0byBkZWxldGlvblxyXG4kKCcuU2VsZWN0LUFsbC1Uby1EZWxldGUnKS5vbihcImNsaWNrXCIsIGZ1bmN0aW9uKCkge1xyXG5cdFxyXG5cdGlmICgkKHRoaXMpLnByb3AoJ2NoZWNrZWQnKSkge1xyXG5cdFx0JCgnLkxpc3QtQ2hlY2tib3gnKS5wcm9wKCdjaGVja2VkJywgdHJ1ZSk7XHJcblx0XHRpZigkKCcuTGlzdC1DaGVja2JveCcpLmxlbmd0aCA+PSAxKVxyXG5cdFx0e1xyXG5cdFx0XHRDaGVja1RvRGVsZXRpb24oXCJhbGxcIilcclxuXHRcdFx0JCgnLkRlbGV0ZUJ0bicpLnJlbW92ZUNsYXNzKCdIaWRkZW4nKTtcclxuXHRcdH1cclxuXHJcblx0XHQkKCd0Ym9keSB0cicpLmFkZENsYXNzKCdyb3ctc2VsZWN0ZWQnKTtcclxuXHR9IGVsc2Uge1xyXG5cdFx0JCgnLkxpc3QtQ2hlY2tib3gnKS5wcm9wKCdjaGVja2VkJywgZmFsc2UpO1xyXG5cdFx0JCgnLkRlbGV0ZUJ0bicpLmFkZENsYXNzKCdIaWRkZW4nKTtcclxuXHRcdCQoJ3Rib2R5IHRyJykucmVtb3ZlQ2xhc3MoJ3Jvdy1zZWxlY3RlZCcpO1xyXG5cdH1cclxufSk7XHJcblxyXG5mdW5jdGlvbiBDaGVja1RvRGVsZXRpb24odHlwZSwgcm93KVxyXG57XHJcblx0dmFyIHNlbGVjdGVkUm93cyA9IFtdO1xyXG5cdCQoXCIuTGlzdC1DaGVja2JveDpjaGVja2VkXCIpLmVhY2goZnVuY3Rpb24oKSB7ICAgICAgICAgIFxyXG5cdFx0c2VsZWN0ZWRSb3dzLnB1c2goJCh0aGlzKS5hdHRyKCdkYXRhLWlkJykpO1xyXG5cdFx0JCgnI1Jvd3NUb0RlbGV0aW9uJykudmFsKHNlbGVjdGVkUm93cyk7XHJcblx0fSk7XHJcblx0XHJcblx0aWYoc2VsZWN0ZWRSb3dzLmxlbmd0aCA9PSAxKXtcclxuXHRcdCQoJyNFZGl0SWQsICNDcmVhdGVGcm9tQW5vdGhlcklkJykudmFsKHNlbGVjdGVkUm93cyk7XHJcblx0fSBlbHNlIGlmKHNlbGVjdGVkUm93cy5sZW5ndGggPCAxKXtcclxuXHRcdCQoJyNFZGl0SWQsICNDcmVhdGVGcm9tQW5vdGhlcklkJykudmFsKCcnKTtcclxuXHR9IGVsc2UgaWYoc2VsZWN0ZWRSb3dzLmxlbmd0aCA+IDEpe1xyXG5cdFx0JCgnI0VkaXRJZCwgI0NyZWF0ZUZyb21Bbm90aGVySWQnKS52YWwoJycpO1xyXG5cdH0gZWxzZSB7XHJcblx0XHQkKCcjRWRpdElkLCAjQ3JlYXRlRnJvbUFub3RoZXJJZCcpLnZhbCgnJyk7XHJcblx0fVxyXG5cclxuXHRzaG93QnV0dG9ucyh0aGlzKTtcclxuXHRpZih0eXBlID09ICdzaW5nbGUnICYmIHJvdyAhPSB1bmRlZmluZWQpXHJcblx0e1xyXG5cdFx0dmFyIGNoZWNrYm94ID0gcm93LnByb3AoJ2NoZWNrZWQnKTtcclxuXHRcdGlmKGNoZWNrYm94KXtcclxuXHRcdFx0cm93LnBhcmVudCgpLnBhcmVudCgpLnBhcmVudCgpLmFkZENsYXNzKCdyb3ctc2VsZWN0ZWQnKTtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdHJvdy5wYXJlbnQoKS5wYXJlbnQoKS5wYXJlbnQoKS5yZW1vdmVDbGFzcygncm93LXNlbGVjdGVkJyk7XHJcblx0XHR9XHJcblx0fVxyXG59XHJcblxyXG4vLyBPcmlnaW5hbCBsaW5lc1xyXG4vLyBTZXQgTGlzdCBBY3Rpb24gQnV0dG9uc1xyXG4vLyAkKGRvY3VtZW50KS5vbihcImNsaWNrXCIsIFwiLkxpc3QtQ2hlY2tib3hcIiwgZnVuY3Rpb24oZSl7XHJcbi8vICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xyXG4vLyBcdHZhciBzZWxlY3RlZFJvd3MgPSBbXTtcclxuLy8gICAgICQoXCIuTGlzdC1DaGVja2JveDpjaGVja2VkXCIpLmVhY2goZnVuY3Rpb24oKSB7ICAgICAgICAgIFxyXG4vLyAgICAgICAgIHNlbGVjdGVkUm93cy5wdXNoKCQodGhpcykuYXR0cignZGF0YS1pZCcpKTtcclxuLy8gXHRcdCQoJyNSb3dzVG9EZWxldGlvbicpLnZhbChzZWxlY3RlZFJvd3MpO1xyXG4vLyAgICAgfSk7XHJcbiAgICAgICBcclxuLy8gICAgIGlmKHNlbGVjdGVkUm93cy5sZW5ndGggPT0gMSl7XHJcbi8vIFx0XHQkKCcjRWRpdElkLCAjQ3JlYXRlRnJvbUFub3RoZXJJZCcpLnZhbChzZWxlY3RlZFJvd3MpO1xyXG4vLyAgICAgfSBlbHNlIGlmKHNlbGVjdGVkUm93cy5sZW5ndGggPCAxKXtcclxuLy8gXHRcdCQoJyNFZGl0SWQsICNDcmVhdGVGcm9tQW5vdGhlcklkJykudmFsKCcnKTtcclxuLy8gICAgIH0gZWxzZSBpZihzZWxlY3RlZFJvd3MubGVuZ3RoID4gMSl7XHJcbi8vICAgICAgICAgJCgnI0VkaXRJZCwgI0NyZWF0ZUZyb21Bbm90aGVySWQnKS52YWwoJycpO1xyXG4vLyAgICAgfSBlbHNlIHtcclxuLy8gICAgICAgICAkKCcjRWRpdElkLCAjQ3JlYXRlRnJvbUFub3RoZXJJZCcpLnZhbCgnJyk7XHJcbi8vICAgICB9XHJcblxyXG4vLyAgICAgc2hvd0J1dHRvbnModGhpcyk7XHJcblxyXG4vLyBcdHZhciBjaGVja2JveCA9ICQodGhpcykucHJvcCgnY2hlY2tlZCcpO1xyXG4vLyBcdGlmKGNoZWNrYm94KXtcclxuLy8gXHRcdCQodGhpcykucGFyZW50KCkucGFyZW50KCkucGFyZW50KCkuYWRkQ2xhc3MoJ3Jvdy1zZWxlY3RlZCcpO1xyXG4vLyBcdH0gZWxzZSB7XHJcbi8vIFx0XHQkKHRoaXMpLnBhcmVudCgpLnBhcmVudCgpLnBhcmVudCgpLnJlbW92ZUNsYXNzKCdyb3ctc2VsZWN0ZWQnKTtcclxuLy8gXHR9XHJcbi8vIH0pO1xyXG5cclxuXHJcbmZ1bmN0aW9uIHNob3dCdXR0b25zKHRyaWdnZXIpIHtcclxuXHRcclxuXHR2YXIgY291bnRTZWxlY3RlZCA9ICQoJy5MaXN0LUNoZWNrYm94OmNoZWNrYm94OmNoZWNrZWQnKS5sZW5ndGg7XHJcblx0aWYoY291bnRTZWxlY3RlZCA9PSAxKSB7XHJcbiAgICAgICAgJCgnLkRlbGV0ZUJ0bicpLnJlbW92ZUNsYXNzKCdIaWRkZW4nKTtcclxuXHRcdCQoJy5FZGl0QnRuJykucmVtb3ZlQ2xhc3MoJ0hpZGRlbicpO1xyXG5cdFx0JCgnLkNyZWF0ZUZyb21Bbm90aGVyQnRuJykucmVtb3ZlQ2xhc3MoJ0hpZGRlbicpO1xyXG5cdH0gZWxzZSBpZihjb3VudFNlbGVjdGVkID49IDIpIHtcclxuXHRcdCQoJy5FZGl0QnRuJykuYWRkQ2xhc3MoJ0hpZGRlbicpO1xyXG5cdFx0JCgnLkNyZWF0ZUZyb21Bbm90aGVyQnRuJykuYWRkQ2xhc3MoJ0hpZGRlbicpO1xyXG4gICAgfSBlbHNlIGlmKGNvdW50U2VsZWN0ZWQgPT0gMCkge1xyXG4gICAgICAgICQoJy5EZWxldGVCdG4nKS5hZGRDbGFzcygnSGlkZGVuJyk7XHJcblx0XHQkKCcuRWRpdEJ0bicpLmFkZENsYXNzKCdIaWRkZW4nKTtcclxuXHRcdCQoJy5DcmVhdGVGcm9tQW5vdGhlckJ0bicpLmFkZENsYXNzKCdIaWRkZW4nKTtcclxuICAgIH1cclxufVxyXG5cclxuLy8gU2hvdyBFZGl0IGFuZCBEZWxldGUgYnV0dG9ucyBpbiBib3R0b20gaWYgc2Nyb2xsZWQgdG8gbXV0Y2hcclxuJChkb2N1bWVudCkuc2Nyb2xsKGZ1bmN0aW9uKGUpe1xyXG5cdHZhciBzY3JvbGxBbW91bnQgPSAkKHdpbmRvdykuc2Nyb2xsVG9wKCk7XHJcblx0aWYoc2Nyb2xsQW1vdW50ID4gMTUwKXtcclxuXHRcdCQoJy5EZWxldGVCdG4nKS5jc3Moe1wicG9zaXRpb25cIjpcImZpeGVkXCIsIFwiYm90dG9tXCI6XCI1MHB4XCIsIFwicmlnaHRcIjpcIjEwcHhcIiwgXCJ6LWluZGV4XCI6XCI5OTlcIn0pO1xyXG5cdFx0JCgnLkVkaXRCdG4nKS5jc3Moe1wicG9zaXRpb25cIjpcImZpeGVkXCIsIFwiYm90dG9tXCI6XCI1MHB4XCIsIFwicmlnaHRcIjpcIjEzMHB4XCIsIFwiei1pbmRleFwiOlwiOTk5XCJ9KTtcclxuXHRcdCQoJy5DcmVhdGVGcm9tQW5vdGhlckJ0bicpLmNzcyh7XCJwb3NpdGlvblwiOlwiZml4ZWRcIiwgXCJib3R0b21cIjpcIjUwcHhcIiwgXCJyaWdodFwiOlwiMjM1cHhcIiwgXCJ6LWluZGV4XCI6XCI5OTlcIn0pO1xyXG5cdH0gZWxzZSB7XHJcblx0XHQkKCcuRGVsZXRlQnRuJykuY3NzKHtcInBvc2l0aW9uXCI6XCJyZWxhdGl2ZVwiLCBcImJvdHRvbVwiOlwiYXV0b1wiLCBcInJpZ2h0XCI6XCJhdXRvXCIsIFwiei1pbmRleFwiOlwiOTk5XCJ9KTtcclxuXHRcdCQoJy5FZGl0QnRuJykuY3NzKHtcInBvc2l0aW9uXCI6XCJyZWxhdGl2ZVwiLCBcImJvdHRvbVwiOlwiYXV0b1wiLCBcInJpZ2h0XCI6XCJhdXRvXCIsIFwiei1pbmRleFwiOlwiOTk5XCJ9KTtcclxuXHRcdCQoJy5DcmVhdGVGcm9tQW5vdGhlckJ0bicpLmNzcyh7XCJwb3NpdGlvblwiOlwicmVsYXRpdmVcIiwgXCJib3R0b21cIjpcImF1dG9cIiwgXCJyaWdodFwiOlwiYXV0b1wiLCBcInotaW5kZXhcIjpcIjk5OVwifSk7XHJcblx0XHRcclxuXHR9XHJcbn0pO1xyXG5cclxuLy8gVW5jaGVjayBhbGwgY2hlY2tib3hlcyBvbiByZWxvYWQuXHJcbmZ1bmN0aW9uIHVuY2hlY2tBbGwoKXtcclxuXHQkKCcjVGFibGVMaXN0IHRib2R5IC5DaGVja0JveGVzJykuZmluZCgnaW5wdXRbdHlwZT1cImNoZWNrYm94XCJdJykuZWFjaChmdW5jdGlvbigpIHtcclxuXHRcdCQodGhpcykucHJvcCgnY2hlY2tlZCcsIGZhbHNlKTtcdFxyXG5cdH0pO1x0XHJcbn1cclxudW5jaGVja0FsbCgpO1xyXG5cclxuLypcclxufC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbnwgRlVOQ1RJT05TXHJcbnwtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4qL1xyXG5cclxuZGVsZXRlUmVjb3JkID0gZnVuY3Rpb24oaWQsIHJvdXRlLCBiaWd0ZXh0LCBzbWFsbHRleHQpIHtcclxuXHRzd2FsKHtcclxuXHRcdHRpdGxlOiBiaWd0ZXh0LFxyXG5cdFx0dGV4dDogc21hbGx0ZXh0LFxyXG5cdFx0dHlwZTogJ3dhcm5pbmcnLFxyXG5cdFx0c2hvd0NhbmNlbEJ1dHRvbjogdHJ1ZSxcclxuXHRcdGNvbmZpcm1CdXR0b25Db2xvcjogJyMzMDg1ZDYnLFxyXG5cdFx0Y2FuY2VsQnV0dG9uQ29sb3I6ICcjZDMzJyxcclxuXHRcdGNvbmZpcm1CdXR0b25UZXh0OiAnRUxJTUlOQVInLFxyXG5cdFx0Y2FuY2VsQnV0dG9uVGV4dDogJ0NhbmNlbGFyJyxcclxuXHRcdGNvbmZpcm1CdXR0b25DbGFzczogJ2J0biBidG5HcmVlbicsXHJcblx0XHRjYW5jZWxCdXR0b25DbGFzczogJ2J0biBidG5SZWQnLFxyXG5cdFx0YnV0dG9uc1N0eWxpbmc6IGZhbHNlXHJcblx0fSkudGhlbihmdW5jdGlvbiAoKSB7XHJcblxyXG4gXHRcdCQuYWpheCh7XHJcblx0XHRcdHVybDogcm91dGUsXHJcblx0XHRcdG1ldGhvZDogJ1BPU1QnLCAgICAgICAgICAgICBcclxuXHRcdFx0ZGF0YVR5cGU6ICdKU09OJyxcclxuXHRcdFx0ZGF0YTogeyBpZDogaWQgfSxcclxuXHRcdFx0YmVmb3JlU2VuZDogZnVuY3Rpb24oKXtcclxuXHRcdFx0XHQvLyAkKCcjTWFpbi1Mb2FkZXInKS5yZW1vdmVDbGFzcygnSGlkZGVuJyk7XHJcblx0XHRcdH0sXHJcblx0XHRcdHN1Y2Nlc3M6IGZ1bmN0aW9uKGRhdGEpe1xyXG5cdFx0XHRcdCQoJyNCYXRjaERlbGV0ZUJ0bicpLmFkZENsYXNzKCdIaWRkZW4nKTtcclxuXHRcdFx0XHRpZiAoZGF0YS5zdWNjZXNzID09IHRydWUpIHtcclxuXHRcdFx0XHRcdCQoJyNJZCcraWQpLmhpZGUoMjAwKTtcclxuXHRcdFx0XHRcdGZvcihpPTA7IGkgPCBpZC5sZW5ndGggOyBpKyspe1xyXG5cdFx0XHRcdFx0XHQkKCcjSWQnK2lkW2ldKS5oaWRlKDIwMCk7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRhbGVydF9vaygnT2shJywnRWxpbWluYWNpw7NuIGNvbXBsZXRhJyk7XHJcblx0XHRcdFx0XHRjb25zb2xlLmxvZyhkYXRhKTtcclxuXHRcdFx0XHRcdHJldHVybiB0cnVlO1xyXG5cdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHRhbGVydF9lcnJvcignVXBzIScsJ0hhIG9jdXJyaWRvIHVuIGVycm9yIChQdWVkZSBxdWUgZXN0ZSByZWdpc3RybyB0ZW5nYSByZWxhY2nDs24gY29uIG90cm9zIGl0ZW1zIGVuIGVsIHNpc3RlbWEpLiBEZWJlIGVsaW1pbmFyIHByaW1lcm8gbG9zIG1pc21vcy4nKTtcclxuXHRcdFx0XHRcdGNvbnNvbGUubG9nKGRhdGEpO1xyXG5cdFx0XHRcdFx0cmV0dXJuIGZhbHNlO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fSxcclxuXHRcdFx0ZXJyb3I6IGZ1bmN0aW9uKGRhdGEpXHJcblx0XHRcdHtcclxuICAgICAgICAgICAgICAgICQoJyNFcnJvcicpLmh0bWwoZGF0YS5yZXNwb25zZVRleHQpO1xyXG5cdFx0XHRcdGNvbnNvbGUubG9nKGRhdGEpO1x0XHJcblx0XHRcdH0sXHJcblx0XHRcdGNvbXBsZXRlOiBmdW5jdGlvbigpXHJcblx0XHRcdHtcclxuXHRcdFx0XHQvLyAkKCcjTWFpbi1Mb2FkZXInKS5hZGRDbGFzcygnSGlkZGVuJyk7XHJcblx0XHRcdH1cclxuXHRcdH0pO1xyXG5cdH0pO1xyXG5cclxufVxyXG5cclxuZGVsZXRlQW5kUmVsb2FkID0gZnVuY3Rpb24oaWQsIHJvdXRlLCBiaWd0ZXh0LCBzbWFsbHRleHQpIHtcclxuXHRzd2FsKHtcclxuXHRcdHRpdGxlOiBiaWd0ZXh0LFxyXG5cdFx0dGV4dDogc21hbGx0ZXh0LFxyXG5cdFx0dHlwZTogJ3dhcm5pbmcnLFxyXG5cdFx0c2hvd0NhbmNlbEJ1dHRvbjogdHJ1ZSxcclxuXHRcdGNvbmZpcm1CdXR0b25Db2xvcjogJyMzMDg1ZDYnLFxyXG5cdFx0Y2FuY2VsQnV0dG9uQ29sb3I6ICcjZDMzJyxcclxuXHRcdGNvbmZpcm1CdXR0b25UZXh0OiAnRUxJTUlOQVInLFxyXG5cdFx0Y2FuY2VsQnV0dG9uVGV4dDogJ0NhbmNlbGFyJyxcclxuXHRcdGNvbmZpcm1CdXR0b25DbGFzczogJ2J0biBidG5HcmVlbicsXHJcblx0XHRjYW5jZWxCdXR0b25DbGFzczogJ2J0biBidG5SZWQnLFxyXG5cdFx0YnV0dG9uc1N0eWxpbmc6IGZhbHNlXHJcblx0fSkudGhlbihmdW5jdGlvbiAoKSB7XHJcblx0XHQkLmFqYXgoe1xyXG5cdFx0XHR1cmw6IHJvdXRlLFxyXG5cdFx0XHRtZXRob2Q6ICdQT1NUJywgICAgICAgICAgICAgXHJcblx0XHRcdGRhdGFUeXBlOiAnSlNPTicsXHJcblx0XHRcdGRhdGE6IHsgaWQ6IGlkIH0sXHJcblx0XHRcdGJlZm9yZVNlbmQ6IGZ1bmN0aW9uKCl7XHJcblx0XHRcdFx0Ly8gJCgnI01haW4tTG9hZGVyJykucmVtb3ZlQ2xhc3MoJ0hpZGRlbicpO1xyXG5cdFx0XHR9LFxyXG5cdFx0XHRzdWNjZXNzOiBmdW5jdGlvbihkYXRhKXtcclxuXHRcdFx0XHQkKCcjQmF0Y2hEZWxldGVCdG4nKS5hZGRDbGFzcygnSGlkZGVuJyk7XHJcblx0XHRcdFx0aWYgKGRhdGEuc3VjY2VzcyA9PSB0cnVlKSB7XHJcblx0XHRcdFx0XHQvLyBhbGVydF9vaygnT2shJywnRWxpbWluYWNpw7NuIGNvbXBsZXRhJyk7XHJcblx0XHRcdFx0XHRsb2NhdGlvbi5yZWxvYWQoKTtcclxuXHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0YWxlcnRfZXJyb3IoJ1VwcyEnLCdIYSBvY3VycmlkbyB1biBlcnJvciAoUHVlZGUgcXVlIGVzdGUgcmVnaXN0cm8gdGVuZ2EgcmVsYWNpw7NuIGNvbiBvdHJvcyBpdGVtcyBlbiBlbCBzaXN0ZW1hKS4gRGViZSBlbGltaW5hciBwcmltZXJvIGxvcyBtaXNtb3MuJyk7XHJcblx0XHRcdFx0XHRjb25zb2xlLmxvZyhkYXRhKTtcclxuXHRcdFx0XHRcdHJldHVybiBmYWxzZTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH0sXHJcblx0XHRcdGVycm9yOiBmdW5jdGlvbihkYXRhKVxyXG5cdFx0XHR7XHJcblx0XHRcdFx0JCgnI0Vycm9yJykuaHRtbChkYXRhLnJlc3BvbnNlVGV4dCk7XHJcblx0XHRcdFx0Y29uc29sZS5sb2coZGF0YSk7XHRcclxuXHRcdFx0fVxyXG5cdFx0fSk7XHJcblx0fSk7XHJcblxyXG59XHJcblxyXG5cclxuLy8gUmVtb3ZlIHByb2R1Y3QgZnJvbSBjYXJ0XHJcbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxud2luZG93LnJlbW92ZUZyb21DYXJ0ID0gZnVuY3Rpb24gKHJvdXRlLCBjYXJ0SXRlbUlkLCBhY3Rpb24sIGVsZW1lbnQpIHtcclxuICAgICQuYWpheCh7XHJcbiAgICAgICAgdXJsOiByb3V0ZSxcclxuICAgICAgICBtZXRob2Q6ICdQT1NUJyxcclxuXHRcdGRhdGFUeXBlOiAnSlNPTicsXHJcbiAgICAgICAgZGF0YTogeyBjYXJ0SXRlbUlkOiBjYXJ0SXRlbUlkLCBhY3Rpb246IGFjdGlvbiB9LFxyXG4gICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChkYXRhKSB7XHJcblx0XHRcdGNvbnNvbGUubG9nKGRhdGEpO1xyXG4gICAgICAgICAgICBpZiAoZGF0YS5yZXNwb25zZSA9PSAnc3VjY2VzcycpIHtcclxuXHRcdFx0XHRlbGVtZW50LnJlbW92ZSgpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG5cdFx0XHRcdGNvbnNvbGUubG9nKFwiRVJST1JcIik7XHJcblx0XHRcdH0gIFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZXJyb3I6IGZ1bmN0aW9uIChkYXRhKSB7XHJcbiAgICAgICAgICAgICQoJyNFcnJvcicpLmh0bWwoZGF0YS5yZXNwb25zZVRleHQpO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIkVycm9yIGVuIHJlbW92ZUZyb21DYXJ0KClcIik7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGRhdGEpO1xyXG4gICAgICAgICAgICAvLyBJZiBhbiBlcnJvciBwb3BzIHdoZW4gZGVzdHJveWluZyBhbiBpdGVtLCByZWxvYWQgYW5kIHByZXZlbnQgYmFkIG1hZ2ljXHJcbiAgICAgICAgICAgIC8vIGxvY2F0aW9uLnJlbG9hZCgpO1xyXG5cdFx0fVxyXG4gICAgfSk7XHRcclxufVxyXG4vKlxyXG58LS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxufCBBTEVSVFNcclxufC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiovXHJcblxyXG5mdW5jdGlvbiBhbGVydF9vayhiaWd0ZXh0LCBzbWFsbHRleHQpe1xyXG4gICAgc3dhbChcclxuICAgICAgICBiaWd0ZXh0LFxyXG4gICAgICAgIHNtYWxsdGV4dCxcclxuICAgICAgICAnc3VjY2VzcydcclxuICAgICk7ICAgIFxyXG59XHJcbiAgICBcclxuZnVuY3Rpb24gYWxlcnRfZXJyb3IoYmlndGV4dCwgc21hbGx0ZXh0KXtcclxuICAgIHN3YWwoXHJcbiAgICAgICAgYmlndGV4dCxcclxuICAgICAgICBzbWFsbHRleHQsXHJcbiAgICAgICAgJ2Vycm9yJ1xyXG4gICAgKTtcclxufVxyXG5cclxuZnVuY3Rpb24gYWxlcnRfaW5mbyhiaWd0ZXh0LCBzbWFsbHRleHQpe1xyXG5cclxuICAgIHN3YWwoe1xyXG4gICAgICAgICAgICB0aXRsZTogYmlndGV4dCxcclxuICAgICAgICB0eXBlOiAnaW5mbycsXHJcbiAgICAgICAgaHRtbDogc21hbGx0ZXh0LFxyXG4gICAgICAgIHNob3dDbG9zZUJ1dHRvbjogdHJ1ZSxcclxuICAgICAgICBzaG93Q2FuY2VsQnV0dG9uOiBmYWxzZSxcclxuICAgICAgICBjb25maXJtQnV0dG9uVGV4dDpcclxuICAgICAgICAgICAgJzxpIGNsYXNzPVwiaW9uLWNoZWNrbWFyay1yb3VuZFwiPjwvaT4gT2shJ1xyXG4gICAgICAgIH0pO1xyXG59XHJcblxyXG5cclxuZnVuY3Rpb24gY2xvc2VQYXJlbnQoKXtcclxuXHQkKHRoaXMpLnBhcmVudCgnaGlkZScpO1xyXG59XHJcblxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9yZXNvdXJjZXMvYXNzZXRzL2pzL3ZhZG1pbi1mdW5jdGlvbnMuanMiXSwic291cmNlUm9vdCI6IiJ9