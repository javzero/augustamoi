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
	console.log(type, row);
	var selectedRows = [];
	$(".List-Checkbox:checked").each(function () {
		selectedRows.push($(this).attr('data-id'));
		$('#RowsToDeletion').val(selectedRows);
	});

	$('#RowsToExport').val(selectedRows);
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

function showButtons(trigger) {

	var countSelected = $('.List-Checkbox:checkbox:checked').length;
	if (countSelected == 1) {
		$('.DeleteBtn').removeClass('Hidden');
		$('.EditBtn').removeClass('Hidden');
		$('.CreateFromAnotherBtn').removeClass('Hidden');
		$('.ExportSelectedBtn').removeClass('Hidden');
	} else if (countSelected >= 2) {
		$('.EditBtn').addClass('Hidden');
		$('.CreateFromAnotherBtn').addClass('Hidden');
	} else if (countSelected == 0) {
		$('.DeleteBtn').addClass('Hidden');
		$('.EditBtn').addClass('Hidden');
		$('.CreateFromAnotherBtn').addClass('Hidden');
		$('.ExportSelectedBtn').addClass('Hidden');
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
// Receive ID with #
setOtherToCero = function setOtherToCero(other) {
	$(other).val(0);
};

// Delete rows
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgYmQzMTllNjA4MzU0ZGNhZDVlOWEiLCJ3ZWJwYWNrOi8vLy4vcmVzb3VyY2VzL2Fzc2V0cy9qcy92YWRtaW4tZnVuY3Rpb25zLmpzIl0sIm5hbWVzIjpbIiQiLCJhamF4U2V0dXAiLCJoZWFkZXJzIiwiYXR0ciIsImRvY3VtZW50Iiwib24iLCJlIiwic3RvcFByb3BhZ2F0aW9uIiwiQ2hlY2tUb0RlbGV0aW9uIiwicHJvcCIsImxlbmd0aCIsInJlbW92ZUNsYXNzIiwiYWRkQ2xhc3MiLCJ0eXBlIiwicm93IiwiY29uc29sZSIsImxvZyIsInNlbGVjdGVkUm93cyIsImVhY2giLCJwdXNoIiwidmFsIiwic2hvd0J1dHRvbnMiLCJ1bmRlZmluZWQiLCJjaGVja2JveCIsInBhcmVudCIsInRyaWdnZXIiLCJjb3VudFNlbGVjdGVkIiwic2Nyb2xsIiwic2Nyb2xsQW1vdW50Iiwid2luZG93Iiwic2Nyb2xsVG9wIiwiY3NzIiwidW5jaGVja0FsbCIsImZpbmQiLCJzZXRPdGhlclRvQ2VybyIsIm90aGVyIiwiZGVsZXRlUmVjb3JkIiwiaWQiLCJyb3V0ZSIsImJpZ3RleHQiLCJzbWFsbHRleHQiLCJzd2FsIiwidGl0bGUiLCJ0ZXh0Iiwic2hvd0NhbmNlbEJ1dHRvbiIsImNvbmZpcm1CdXR0b25Db2xvciIsImNhbmNlbEJ1dHRvbkNvbG9yIiwiY29uZmlybUJ1dHRvblRleHQiLCJjYW5jZWxCdXR0b25UZXh0IiwiY29uZmlybUJ1dHRvbkNsYXNzIiwiY2FuY2VsQnV0dG9uQ2xhc3MiLCJidXR0b25zU3R5bGluZyIsInRoZW4iLCJhamF4IiwidXJsIiwibWV0aG9kIiwiZGF0YVR5cGUiLCJkYXRhIiwiYmVmb3JlU2VuZCIsInN1Y2Nlc3MiLCJoaWRlIiwiaSIsImFsZXJ0X29rIiwiYWxlcnRfZXJyb3IiLCJlcnJvciIsImh0bWwiLCJyZXNwb25zZVRleHQiLCJjb21wbGV0ZSIsImRlbGV0ZUFuZFJlbG9hZCIsImxvY2F0aW9uIiwicmVsb2FkIiwicmVtb3ZlRnJvbUNhcnQiLCJjYXJ0SXRlbUlkIiwiYWN0aW9uIiwiZWxlbWVudCIsInJlc3BvbnNlIiwicmVtb3ZlIiwiYWxlcnRfaW5mbyIsInNob3dDbG9zZUJ1dHRvbiIsImNsb3NlUGFyZW50Il0sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUEyQiwwQkFBMEIsRUFBRTtBQUN2RCx5Q0FBaUMsZUFBZTtBQUNoRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4REFBc0QsK0RBQStEOztBQUVySDtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7QUM3REFBLEVBQUVDLFNBQUYsQ0FBWTtBQUNSQyxVQUFTO0FBQ0wsa0JBQWdCRixFQUFFLHlCQUFGLEVBQTZCRyxJQUE3QixDQUFrQyxTQUFsQztBQURYO0FBREQsQ0FBWjs7QUFNQTs7Ozs7O0FBT0E7QUFDQUgsRUFBRUksUUFBRixFQUFZQyxFQUFaLENBQWUsT0FBZixFQUF3QixnQkFBeEIsRUFBMEMsVUFBU0MsQ0FBVCxFQUMxQztBQUNDQSxHQUFFQyxlQUFGO0FBQ0FDLGlCQUFnQixRQUFoQixFQUEwQlIsRUFBRSxJQUFGLENBQTFCO0FBQ0EsQ0FKRDs7QUFNQTtBQUNBQSxFQUFFLHVCQUFGLEVBQTJCSyxFQUEzQixDQUE4QixPQUE5QixFQUF1QyxZQUFXOztBQUVqRCxLQUFJTCxFQUFFLElBQUYsRUFBUVMsSUFBUixDQUFhLFNBQWIsQ0FBSixFQUE2QjtBQUM1QlQsSUFBRSxnQkFBRixFQUFvQlMsSUFBcEIsQ0FBeUIsU0FBekIsRUFBb0MsSUFBcEM7QUFD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LEdBQVIsQ0FBWSwyQkFBWjtBQUNBRCxXQUFRQyxHQUFSLENBQVl5QyxJQUFaO0FBQ0E7QUFDQTtBQUNUO0FBbkJRLEVBQVA7QUFxQkgsQ0F0QkQ7QUF1QkE7Ozs7OztBQU1BLFNBQVNLLFFBQVQsQ0FBa0J2QixPQUFsQixFQUEyQkMsU0FBM0IsRUFBcUM7QUFDakNDLE1BQ0lGLE9BREosRUFFSUMsU0FGSixFQUdJLFNBSEo7QUFLSDs7QUFFRCxTQUFTdUIsV0FBVCxDQUFxQnhCLE9BQXJCLEVBQThCQyxTQUE5QixFQUF3QztBQUNwQ0MsTUFDSUYsT0FESixFQUVJQyxTQUZKLEVBR0ksT0FISjtBQUtIOztBQUVELFNBQVNxQyxVQUFULENBQW9CdEMsT0FBcEIsRUFBNkJDLFNBQTdCLEVBQXVDOztBQUVuQ0MsTUFBSztBQUNHQyxTQUFPSCxPQURWO0FBRUQxQixRQUFNLE1BRkw7QUFHRG9ELFFBQU16QixTQUhMO0FBSURzQyxtQkFBaUIsSUFKaEI7QUFLRGxDLG9CQUFrQixLQUxqQjtBQU1ERyxxQkFDSTtBQVBILEVBQUw7QUFTSDs7QUFHRCxTQUFTZ0MsV0FBVCxHQUFzQjtBQUNyQi9FLEdBQUUsSUFBRixFQUFRd0IsTUFBUixDQUFlLE1BQWY7QUFDQSxDIiwiZmlsZSI6Ii9qcy92YWRtaW4tZnVuY3Rpb25zLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7XG4gXHRcdFx0XHRjb25maWd1cmFibGU6IGZhbHNlLFxuIFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGdldDogZ2V0dGVyXG4gXHRcdFx0fSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiL1wiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDc2KTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCBiZDMxOWU2MDgzNTRkY2FkNWU5YSIsIiQuYWpheFNldHVwKHtcclxuICAgIGhlYWRlcnM6IHtcclxuICAgICAgICAnWC1DU1JGLVRPS0VOJzogJCgnbWV0YVtuYW1lPVwiY3NyZi10b2tlblwiXScpLmF0dHIoJ2NvbnRlbnQnKVxyXG4gICAgfVxyXG59KTtcclxuIFxyXG4vKlxyXG58LS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxufCBMSVNUU1xyXG58LS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuKi9cclxuXHJcblxyXG4vLyBTZWxlY3QgY2hlY2tib3ggdG8gZGVsZXRpb25cclxuJChkb2N1bWVudCkub24oXCJjbGlja1wiLCBcIi5MaXN0LUNoZWNrYm94XCIsIGZ1bmN0aW9uKGUpXHJcbntcclxuXHRlLnN0b3BQcm9wYWdhdGlvbigpO1xyXG5cdENoZWNrVG9EZWxldGlvbihcInNpbmdsZVwiLCAkKHRoaXMpKTtcclxufSk7XHJcblxyXG4vLyBTZWxlY3QgQWxsIHByZXNlbnQgY2hlY2tib3hlcyB0byBkZWxldGlvblxyXG4kKCcuU2VsZWN0LUFsbC1Uby1EZWxldGUnKS5vbihcImNsaWNrXCIsIGZ1bmN0aW9uKCkge1xyXG5cdFxyXG5cdGlmICgkKHRoaXMpLnByb3AoJ2NoZWNrZWQnKSkge1xyXG5cdFx0JCgnLkxpc3QtQ2hlY2tib3gnKS5wcm9wKCdjaGVja2VkJywgdHJ1ZSk7XHJcblx0XHRpZigkKCcuTGlzdC1DaGVja2JveCcpLmxlbmd0aCA+PSAxKVxyXG5cdFx0e1xyXG5cdFx0XHRDaGVja1RvRGVsZXRpb24oXCJhbGxcIilcclxuXHRcdFx0JCgnLkRlbGV0ZUJ0bicpLnJlbW92ZUNsYXNzKCdIaWRkZW4nKTtcclxuXHRcdH1cclxuXHJcblx0XHQkKCd0Ym9keSB0cicpLmFkZENsYXNzKCdyb3ctc2VsZWN0ZWQnKTtcclxuXHR9IGVsc2Uge1xyXG5cdFx0JCgnLkxpc3QtQ2hlY2tib3gnKS5wcm9wKCdjaGVja2VkJywgZmFsc2UpO1xyXG5cdFx0JCgnLkRlbGV0ZUJ0bicpLmFkZENsYXNzKCdIaWRkZW4nKTtcclxuXHRcdCQoJ3Rib2R5IHRyJykucmVtb3ZlQ2xhc3MoJ3Jvdy1zZWxlY3RlZCcpO1xyXG5cdH1cclxufSk7XHJcblxyXG5mdW5jdGlvbiBDaGVja1RvRGVsZXRpb24odHlwZSwgcm93KVxyXG57XHJcblx0Y29uc29sZS5sb2codHlwZSwgcm93KTtcclxuXHR2YXIgc2VsZWN0ZWRSb3dzID0gW107XHJcblx0JChcIi5MaXN0LUNoZWNrYm94OmNoZWNrZWRcIikuZWFjaChmdW5jdGlvbigpIHsgICAgICAgICAgXHJcblx0XHRzZWxlY3RlZFJvd3MucHVzaCgkKHRoaXMpLmF0dHIoJ2RhdGEtaWQnKSk7XHJcblx0XHQkKCcjUm93c1RvRGVsZXRpb24nKS52YWwoc2VsZWN0ZWRSb3dzKTtcclxuXHR9KTtcclxuXHRcclxuXHQkKCcjUm93c1RvRXhwb3J0JykudmFsKHNlbGVjdGVkUm93cyk7XHJcblx0aWYoc2VsZWN0ZWRSb3dzLmxlbmd0aCA9PSAxKXtcclxuXHRcdCQoJyNFZGl0SWQsICNDcmVhdGVGcm9tQW5vdGhlcklkJykudmFsKHNlbGVjdGVkUm93cyk7XHJcblx0fSBlbHNlIGlmKHNlbGVjdGVkUm93cy5sZW5ndGggPCAxKXtcclxuXHRcdCQoJyNFZGl0SWQsICNDcmVhdGVGcm9tQW5vdGhlcklkJykudmFsKCcnKTtcclxuXHR9IGVsc2UgaWYoc2VsZWN0ZWRSb3dzLmxlbmd0aCA+IDEpe1xyXG5cdFx0JCgnI0VkaXRJZCwgI0NyZWF0ZUZyb21Bbm90aGVySWQnKS52YWwoJycpO1xyXG5cdH0gZWxzZSB7XHJcblx0XHQkKCcjRWRpdElkLCAjQ3JlYXRlRnJvbUFub3RoZXJJZCcpLnZhbCgnJyk7XHJcblx0fVxyXG5cclxuXHRzaG93QnV0dG9ucyh0aGlzKTtcclxuXHRpZih0eXBlID09ICdzaW5nbGUnICYmIHJvdyAhPSB1bmRlZmluZWQpXHJcblx0e1xyXG5cdFx0dmFyIGNoZWNrYm94ID0gcm93LnByb3AoJ2NoZWNrZWQnKTtcclxuXHRcdGlmKGNoZWNrYm94KXtcclxuXHRcdFx0cm93LnBhcmVudCgpLnBhcmVudCgpLnBhcmVudCgpLmFkZENsYXNzKCdyb3ctc2VsZWN0ZWQnKTtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdHJvdy5wYXJlbnQoKS5wYXJlbnQoKS5wYXJlbnQoKS5yZW1vdmVDbGFzcygncm93LXNlbGVjdGVkJyk7XHJcblx0XHR9XHJcblx0fVxyXG59XHJcblxyXG5mdW5jdGlvbiBzaG93QnV0dG9ucyh0cmlnZ2VyKSB7XHJcblx0XHJcblx0dmFyIGNvdW50U2VsZWN0ZWQgPSAkKCcuTGlzdC1DaGVja2JveDpjaGVja2JveDpjaGVja2VkJykubGVuZ3RoO1xyXG5cdGlmKGNvdW50U2VsZWN0ZWQgPT0gMSkge1xyXG4gICAgICAgICQoJy5EZWxldGVCdG4nKS5yZW1vdmVDbGFzcygnSGlkZGVuJyk7XHJcblx0XHQkKCcuRWRpdEJ0bicpLnJlbW92ZUNsYXNzKCdIaWRkZW4nKTtcclxuXHRcdCQoJy5DcmVhdGVGcm9tQW5vdGhlckJ0bicpLnJlbW92ZUNsYXNzKCdIaWRkZW4nKTtcclxuXHRcdCQoJy5FeHBvcnRTZWxlY3RlZEJ0bicpLnJlbW92ZUNsYXNzKCdIaWRkZW4nKTtcclxuXHR9IGVsc2UgaWYoY291bnRTZWxlY3RlZCA+PSAyKSB7XHJcblx0XHQkKCcuRWRpdEJ0bicpLmFkZENsYXNzKCdIaWRkZW4nKTtcclxuXHRcdCQoJy5DcmVhdGVGcm9tQW5vdGhlckJ0bicpLmFkZENsYXNzKCdIaWRkZW4nKTtcclxuICAgIH0gZWxzZSBpZihjb3VudFNlbGVjdGVkID09IDApIHtcclxuICAgICAgICAkKCcuRGVsZXRlQnRuJykuYWRkQ2xhc3MoJ0hpZGRlbicpO1xyXG5cdFx0JCgnLkVkaXRCdG4nKS5hZGRDbGFzcygnSGlkZGVuJyk7XHJcblx0XHQkKCcuQ3JlYXRlRnJvbUFub3RoZXJCdG4nKS5hZGRDbGFzcygnSGlkZGVuJyk7XHJcblx0XHQkKCcuRXhwb3J0U2VsZWN0ZWRCdG4nKS5hZGRDbGFzcygnSGlkZGVuJyk7XHJcbiAgICB9XHJcbn1cclxuXHJcbi8vIFNob3cgRWRpdCBhbmQgRGVsZXRlIGJ1dHRvbnMgaW4gYm90dG9tIGlmIHNjcm9sbGVkIHRvIG11dGNoXHJcbiQoZG9jdW1lbnQpLnNjcm9sbChmdW5jdGlvbihlKXtcclxuXHR2YXIgc2Nyb2xsQW1vdW50ID0gJCh3aW5kb3cpLnNjcm9sbFRvcCgpO1xyXG5cdGlmKHNjcm9sbEFtb3VudCA+IDE1MCl7XHJcblx0XHQkKCcuRGVsZXRlQnRuJykuY3NzKHtcInBvc2l0aW9uXCI6XCJmaXhlZFwiLCBcImJvdHRvbVwiOlwiNTBweFwiLCBcInJpZ2h0XCI6XCIxMHB4XCIsIFwiei1pbmRleFwiOlwiOTk5XCJ9KTtcclxuXHRcdCQoJy5FZGl0QnRuJykuY3NzKHtcInBvc2l0aW9uXCI6XCJmaXhlZFwiLCBcImJvdHRvbVwiOlwiNTBweFwiLCBcInJpZ2h0XCI6XCIxMzBweFwiLCBcInotaW5kZXhcIjpcIjk5OVwifSk7XHJcblx0XHQkKCcuQ3JlYXRlRnJvbUFub3RoZXJCdG4nKS5jc3Moe1wicG9zaXRpb25cIjpcImZpeGVkXCIsIFwiYm90dG9tXCI6XCI1MHB4XCIsIFwicmlnaHRcIjpcIjIzNXB4XCIsIFwiei1pbmRleFwiOlwiOTk5XCJ9KTtcclxuXHR9IGVsc2Uge1xyXG5cdFx0JCgnLkRlbGV0ZUJ0bicpLmNzcyh7XCJwb3NpdGlvblwiOlwicmVsYXRpdmVcIiwgXCJib3R0b21cIjpcImF1dG9cIiwgXCJyaWdodFwiOlwiYXV0b1wiLCBcInotaW5kZXhcIjpcIjk5OVwifSk7XHJcblx0XHQkKCcuRWRpdEJ0bicpLmNzcyh7XCJwb3NpdGlvblwiOlwicmVsYXRpdmVcIiwgXCJib3R0b21cIjpcImF1dG9cIiwgXCJyaWdodFwiOlwiYXV0b1wiLCBcInotaW5kZXhcIjpcIjk5OVwifSk7XHJcblx0XHQkKCcuQ3JlYXRlRnJvbUFub3RoZXJCdG4nKS5jc3Moe1wicG9zaXRpb25cIjpcInJlbGF0aXZlXCIsIFwiYm90dG9tXCI6XCJhdXRvXCIsIFwicmlnaHRcIjpcImF1dG9cIiwgXCJ6LWluZGV4XCI6XCI5OTlcIn0pO1xyXG5cdFx0XHJcblx0fVxyXG59KTtcclxuXHJcbi8vIFVuY2hlY2sgYWxsIGNoZWNrYm94ZXMgb24gcmVsb2FkLlxyXG5mdW5jdGlvbiB1bmNoZWNrQWxsKCl7XHJcblx0JCgnI1RhYmxlTGlzdCB0Ym9keSAuQ2hlY2tCb3hlcycpLmZpbmQoJ2lucHV0W3R5cGU9XCJjaGVja2JveFwiXScpLmVhY2goZnVuY3Rpb24oKSB7XHJcblx0XHQkKHRoaXMpLnByb3AoJ2NoZWNrZWQnLCBmYWxzZSk7XHRcclxuXHR9KTtcdFxyXG59XHJcbnVuY2hlY2tBbGwoKTtcclxuXHJcbi8qXHJcbnwtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG58IEZVTkNUSU9OU1xyXG58LS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuKi9cclxuLy8gUmVjZWl2ZSBJRCB3aXRoICNcclxuc2V0T3RoZXJUb0Nlcm8gPSBmdW5jdGlvbihvdGhlcikge1xyXG5cdCQob3RoZXIpLnZhbCgwKTtcclxufVxyXG5cclxuLy8gRGVsZXRlIHJvd3NcclxuZGVsZXRlUmVjb3JkID0gZnVuY3Rpb24oaWQsIHJvdXRlLCBiaWd0ZXh0LCBzbWFsbHRleHQpIHtcclxuXHRzd2FsKHtcclxuXHRcdHRpdGxlOiBiaWd0ZXh0LFxyXG5cdFx0dGV4dDogc21hbGx0ZXh0LFxyXG5cdFx0dHlwZTogJ3dhcm5pbmcnLFxyXG5cdFx0c2hvd0NhbmNlbEJ1dHRvbjogdHJ1ZSxcclxuXHRcdGNvbmZpcm1CdXR0b25Db2xvcjogJyMzMDg1ZDYnLFxyXG5cdFx0Y2FuY2VsQnV0dG9uQ29sb3I6ICcjZDMzJyxcclxuXHRcdGNvbmZpcm1CdXR0b25UZXh0OiAnRUxJTUlOQVInLFxyXG5cdFx0Y2FuY2VsQnV0dG9uVGV4dDogJ0NhbmNlbGFyJyxcclxuXHRcdGNvbmZpcm1CdXR0b25DbGFzczogJ2J0biBidG5HcmVlbicsXHJcblx0XHRjYW5jZWxCdXR0b25DbGFzczogJ2J0biBidG5SZWQnLFxyXG5cdFx0YnV0dG9uc1N0eWxpbmc6IGZhbHNlXHJcblx0fSkudGhlbihmdW5jdGlvbiAoKSB7XHJcblxyXG4gXHRcdCQuYWpheCh7XHJcblx0XHRcdHVybDogcm91dGUsXHJcblx0XHRcdG1ldGhvZDogJ1BPU1QnLCAgICAgICAgICAgICBcclxuXHRcdFx0ZGF0YVR5cGU6ICdKU09OJyxcclxuXHRcdFx0ZGF0YTogeyBpZDogaWQgfSxcclxuXHRcdFx0YmVmb3JlU2VuZDogZnVuY3Rpb24oKXtcclxuXHRcdFx0XHQvLyAkKCcjTWFpbi1Mb2FkZXInKS5yZW1vdmVDbGFzcygnSGlkZGVuJyk7XHJcblx0XHRcdH0sXHJcblx0XHRcdHN1Y2Nlc3M6IGZ1bmN0aW9uKGRhdGEpe1xyXG5cdFx0XHRcdCQoJyNCYXRjaERlbGV0ZUJ0bicpLmFkZENsYXNzKCdIaWRkZW4nKTtcclxuXHRcdFx0XHRpZiAoZGF0YS5zdWNjZXNzID09IHRydWUpIHtcclxuXHRcdFx0XHRcdCQoJyNJZCcraWQpLmhpZGUoMjAwKTtcclxuXHRcdFx0XHRcdGZvcihpPTA7IGkgPCBpZC5sZW5ndGggOyBpKyspe1xyXG5cdFx0XHRcdFx0XHQkKCcjSWQnK2lkW2ldKS5oaWRlKDIwMCk7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRhbGVydF9vaygnT2shJywnRWxpbWluYWNpw7NuIGNvbXBsZXRhJyk7XHJcblx0XHRcdFx0XHRjb25zb2xlLmxvZyhkYXRhKTtcclxuXHRcdFx0XHRcdHJldHVybiB0cnVlO1xyXG5cdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHRhbGVydF9lcnJvcignVXBzIScsJ0hhIG9jdXJyaWRvIHVuIGVycm9yIChQdWVkZSBxdWUgZXN0ZSByZWdpc3RybyB0ZW5nYSByZWxhY2nDs24gY29uIG90cm9zIGl0ZW1zIGVuIGVsIHNpc3RlbWEpLiBEZWJlIGVsaW1pbmFyIHByaW1lcm8gbG9zIG1pc21vcy4nKTtcclxuXHRcdFx0XHRcdGNvbnNvbGUubG9nKGRhdGEpO1xyXG5cdFx0XHRcdFx0cmV0dXJuIGZhbHNlO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fSxcclxuXHRcdFx0ZXJyb3I6IGZ1bmN0aW9uKGRhdGEpXHJcblx0XHRcdHtcclxuICAgICAgICAgICAgICAgICQoJyNFcnJvcicpLmh0bWwoZGF0YS5yZXNwb25zZVRleHQpO1xyXG5cdFx0XHRcdGNvbnNvbGUubG9nKGRhdGEpO1x0XHJcblx0XHRcdH0sXHJcblx0XHRcdGNvbXBsZXRlOiBmdW5jdGlvbigpXHJcblx0XHRcdHtcclxuXHRcdFx0XHQvLyAkKCcjTWFpbi1Mb2FkZXInKS5hZGRDbGFzcygnSGlkZGVuJyk7XHJcblx0XHRcdH1cclxuXHRcdH0pO1xyXG5cdH0pO1xyXG5cclxufVxyXG5cclxuZGVsZXRlQW5kUmVsb2FkID0gZnVuY3Rpb24oaWQsIHJvdXRlLCBiaWd0ZXh0LCBzbWFsbHRleHQpIHtcclxuXHRzd2FsKHtcclxuXHRcdHRpdGxlOiBiaWd0ZXh0LFxyXG5cdFx0dGV4dDogc21hbGx0ZXh0LFxyXG5cdFx0dHlwZTogJ3dhcm5pbmcnLFxyXG5cdFx0c2hvd0NhbmNlbEJ1dHRvbjogdHJ1ZSxcclxuXHRcdGNvbmZpcm1CdXR0b25Db2xvcjogJyMzMDg1ZDYnLFxyXG5cdFx0Y2FuY2VsQnV0dG9uQ29sb3I6ICcjZDMzJyxcclxuXHRcdGNvbmZpcm1CdXR0b25UZXh0OiAnRUxJTUlOQVInLFxyXG5cdFx0Y2FuY2VsQnV0dG9uVGV4dDogJ0NhbmNlbGFyJyxcclxuXHRcdGNvbmZpcm1CdXR0b25DbGFzczogJ2J0biBidG5HcmVlbicsXHJcblx0XHRjYW5jZWxCdXR0b25DbGFzczogJ2J0biBidG5SZWQnLFxyXG5cdFx0YnV0dG9uc1N0eWxpbmc6IGZhbHNlXHJcblx0fSkudGhlbihmdW5jdGlvbiAoKSB7XHJcblx0XHQkLmFqYXgoe1xyXG5cdFx0XHR1cmw6IHJvdXRlLFxyXG5cdFx0XHRtZXRob2Q6ICdQT1NUJywgICAgICAgICAgICAgXHJcblx0XHRcdGRhdGFUeXBlOiAnSlNPTicsXHJcblx0XHRcdGRhdGE6IHsgaWQ6IGlkIH0sXHJcblx0XHRcdGJlZm9yZVNlbmQ6IGZ1bmN0aW9uKCl7XHJcblx0XHRcdFx0Ly8gJCgnI01haW4tTG9hZGVyJykucmVtb3ZlQ2xhc3MoJ0hpZGRlbicpO1xyXG5cdFx0XHR9LFxyXG5cdFx0XHRzdWNjZXNzOiBmdW5jdGlvbihkYXRhKXtcclxuXHRcdFx0XHQkKCcjQmF0Y2hEZWxldGVCdG4nKS5hZGRDbGFzcygnSGlkZGVuJyk7XHJcblx0XHRcdFx0aWYgKGRhdGEuc3VjY2VzcyA9PSB0cnVlKSB7XHJcblx0XHRcdFx0XHQvLyBhbGVydF9vaygnT2shJywnRWxpbWluYWNpw7NuIGNvbXBsZXRhJyk7XHJcblx0XHRcdFx0XHRsb2NhdGlvbi5yZWxvYWQoKTtcclxuXHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0YWxlcnRfZXJyb3IoJ1VwcyEnLCdIYSBvY3VycmlkbyB1biBlcnJvciAoUHVlZGUgcXVlIGVzdGUgcmVnaXN0cm8gdGVuZ2EgcmVsYWNpw7NuIGNvbiBvdHJvcyBpdGVtcyBlbiBlbCBzaXN0ZW1hKS4gRGViZSBlbGltaW5hciBwcmltZXJvIGxvcyBtaXNtb3MuJyk7XHJcblx0XHRcdFx0XHRjb25zb2xlLmxvZyhkYXRhKTtcclxuXHRcdFx0XHRcdHJldHVybiBmYWxzZTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH0sXHJcblx0XHRcdGVycm9yOiBmdW5jdGlvbihkYXRhKVxyXG5cdFx0XHR7XHJcblx0XHRcdFx0JCgnI0Vycm9yJykuaHRtbChkYXRhLnJlc3BvbnNlVGV4dCk7XHJcblx0XHRcdFx0Y29uc29sZS5sb2coZGF0YSk7XHRcclxuXHRcdFx0fVxyXG5cdFx0fSk7XHJcblx0fSk7XHJcblxyXG59XHJcblxyXG5cclxuLy8gUmVtb3ZlIHByb2R1Y3QgZnJvbSBjYXJ0XHJcbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxud2luZG93LnJlbW92ZUZyb21DYXJ0ID0gZnVuY3Rpb24gKHJvdXRlLCBjYXJ0SXRlbUlkLCBhY3Rpb24sIGVsZW1lbnQpIHtcclxuICAgICQuYWpheCh7XHJcbiAgICAgICAgdXJsOiByb3V0ZSxcclxuICAgICAgICBtZXRob2Q6ICdQT1NUJyxcclxuXHRcdGRhdGFUeXBlOiAnSlNPTicsXHJcbiAgICAgICAgZGF0YTogeyBjYXJ0SXRlbUlkOiBjYXJ0SXRlbUlkLCBhY3Rpb246IGFjdGlvbiB9LFxyXG4gICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChkYXRhKSB7XHJcblx0XHRcdGNvbnNvbGUubG9nKGRhdGEpO1xyXG4gICAgICAgICAgICBpZiAoZGF0YS5yZXNwb25zZSA9PSAnc3VjY2VzcycpIHtcclxuXHRcdFx0XHRlbGVtZW50LnJlbW92ZSgpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG5cdFx0XHRcdGNvbnNvbGUubG9nKFwiRVJST1JcIik7XHJcblx0XHRcdH0gIFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZXJyb3I6IGZ1bmN0aW9uIChkYXRhKSB7XHJcbiAgICAgICAgICAgICQoJyNFcnJvcicpLmh0bWwoZGF0YS5yZXNwb25zZVRleHQpO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIkVycm9yIGVuIHJlbW92ZUZyb21DYXJ0KClcIik7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGRhdGEpO1xyXG4gICAgICAgICAgICAvLyBJZiBhbiBlcnJvciBwb3BzIHdoZW4gZGVzdHJveWluZyBhbiBpdGVtLCByZWxvYWQgYW5kIHByZXZlbnQgYmFkIG1hZ2ljXHJcbiAgICAgICAgICAgIC8vIGxvY2F0aW9uLnJlbG9hZCgpO1xyXG5cdFx0fVxyXG4gICAgfSk7XHRcclxufVxyXG4vKlxyXG58LS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxufCBBTEVSVFNcclxufC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiovXHJcblxyXG5mdW5jdGlvbiBhbGVydF9vayhiaWd0ZXh0LCBzbWFsbHRleHQpe1xyXG4gICAgc3dhbChcclxuICAgICAgICBiaWd0ZXh0LFxyXG4gICAgICAgIHNtYWxsdGV4dCxcclxuICAgICAgICAnc3VjY2VzcydcclxuICAgICk7ICAgIFxyXG59XHJcbiAgICBcclxuZnVuY3Rpb24gYWxlcnRfZXJyb3IoYmlndGV4dCwgc21hbGx0ZXh0KXtcclxuICAgIHN3YWwoXHJcbiAgICAgICAgYmlndGV4dCxcclxuICAgICAgICBzbWFsbHRleHQsXHJcbiAgICAgICAgJ2Vycm9yJ1xyXG4gICAgKTtcclxufVxyXG5cclxuZnVuY3Rpb24gYWxlcnRfaW5mbyhiaWd0ZXh0LCBzbWFsbHRleHQpe1xyXG5cclxuICAgIHN3YWwoe1xyXG4gICAgICAgICAgICB0aXRsZTogYmlndGV4dCxcclxuICAgICAgICB0eXBlOiAnaW5mbycsXHJcbiAgICAgICAgaHRtbDogc21hbGx0ZXh0LFxyXG4gICAgICAgIHNob3dDbG9zZUJ1dHRvbjogdHJ1ZSxcclxuICAgICAgICBzaG93Q2FuY2VsQnV0dG9uOiBmYWxzZSxcclxuICAgICAgICBjb25maXJtQnV0dG9uVGV4dDpcclxuICAgICAgICAgICAgJzxpIGNsYXNzPVwiaW9uLWNoZWNrbWFyay1yb3VuZFwiPjwvaT4gT2shJ1xyXG4gICAgICAgIH0pO1xyXG59XHJcblxyXG5cclxuZnVuY3Rpb24gY2xvc2VQYXJlbnQoKXtcclxuXHQkKHRoaXMpLnBhcmVudCgnaGlkZScpO1xyXG59XHJcblxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9yZXNvdXJjZXMvYXNzZXRzL2pzL3ZhZG1pbi1mdW5jdGlvbnMuanMiXSwic291cmNlUm9vdCI6IiJ9