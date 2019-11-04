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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgNDg0MWY1YmE1ZTM2Y2RlMDA3NzUiLCJ3ZWJwYWNrOi8vLy4vcmVzb3VyY2VzL2Fzc2V0cy9qcy92YWRtaW4tZnVuY3Rpb25zLmpzIl0sIm5hbWVzIjpbIiQiLCJhamF4U2V0dXAiLCJoZWFkZXJzIiwiYXR0ciIsImRvY3VtZW50Iiwib24iLCJlIiwic3RvcFByb3BhZ2F0aW9uIiwiQ2hlY2tUb0RlbGV0aW9uIiwicHJvcCIsImxlbmd0aCIsInJlbW92ZUNsYXNzIiwiYWRkQ2xhc3MiLCJ0eXBlIiwicm93IiwiY29uc29sZSIsImxvZyIsInNlbGVjdGVkUm93cyIsImVhY2giLCJwdXNoIiwidmFsIiwic2hvd0J1dHRvbnMiLCJ1bmRlZmluZWQiLCJjaGVja2JveCIsInBhcmVudCIsInRyaWdnZXIiLCJjb3VudFNlbGVjdGVkIiwic2Nyb2xsIiwic2Nyb2xsQW1vdW50Iiwid2luZG93Iiwic2Nyb2xsVG9wIiwiY3NzIiwidW5jaGVja0FsbCIsImZpbmQiLCJkZWxldGVSZWNvcmQiLCJpZCIsInJvdXRlIiwiYmlndGV4dCIsInNtYWxsdGV4dCIsInN3YWwiLCJ0aXRsZSIsInRleHQiLCJzaG93Q2FuY2VsQnV0dG9uIiwiY29uZmlybUJ1dHRvbkNvbG9yIiwiY2FuY2VsQnV0dG9uQ29sb3IiLCJjb25maXJtQnV0dG9uVGV4dCIsImNhbmNlbEJ1dHRvblRleHQiLCJjb25maXJtQnV0dG9uQ2xhc3MiLCJjYW5jZWxCdXR0b25DbGFzcyIsImJ1dHRvbnNTdHlsaW5nIiwidGhlbiIsImFqYXgiLCJ1cmwiLCJtZXRob2QiLCJkYXRhVHlwZSIsImRhdGEiLCJiZWZvcmVTZW5kIiwic3VjY2VzcyIsImhpZGUiLCJpIiwiYWxlcnRfb2siLCJhbGVydF9lcnJvciIsImVycm9yIiwiaHRtbCIsInJlc3BvbnNlVGV4dCIsImNvbXBsZXRlIiwiZGVsZXRlQW5kUmVsb2FkIiwibG9jYXRpb24iLCJyZWxvYWQiLCJyZW1vdmVGcm9tQ2FydCIsImNhcnRJdGVtSWQiLCJhY3Rpb24iLCJlbGVtZW50IiwicmVzcG9uc2UiLCJyZW1vdmUiLCJhbGVydF9pbmZvIiwic2hvd0Nsb3NlQnV0dG9uIiwiY2xvc2VQYXJlbnQiXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUNBQTJCLDBCQUEwQixFQUFFO0FBQ3ZELHlDQUFpQyxlQUFlO0FBQ2hEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDhEQUFzRCwrREFBK0Q7O0FBRXJIO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7Ozs7Ozs7Ozs7OztBQzdEQUEsRUFBRUMsU0FBRixDQUFZO0FBQ1JDLFVBQVM7QUFDTCxrQkFBZ0JGLEVBQUUseUJBQUYsRUFBNkJHLElBQTdCLENBQWtDLFNBQWxDO0FBRFg7QUFERCxDQUFaOztBQU1BOzs7Ozs7QUFPQTtBQUNBSCxFQUFFSSxRQUFGLEVBQVlDLEVBQVosQ0FBZSxPQUFmLEVBQXdCLGdCQUF4QixFQUEwQyxVQUFTQyxDQUFULEVBQzFDO0FBQ0NBLEdBQUVDLGVBQUY7QUFDQUMsaUJBQWdCLFFBQWhCLEVBQTBCUixFQUFFLElBQUYsQ0FBMUI7QUFDQSxDQUpEOztBQU1BO0FBQ0FBLEVBQUUsdUJBQUYsRUFBMkJLLEVBQTNCLENBQThCLE9BQTlCLEVBQXVDLFlBQVc7O0FBRWpELEtBQUlMLEVBQUUsSUFBRixFQUFRUyxJQUFSLENBQWEsU0FBYixDQUFKLEVBQTZCO0FBQzVCVCxJQUFFLGdCQUFGLEVBQW9CUyxJQUFwQixDQUF5QixTQUF6QixFQUFvQyxJQUFwQztBQUNBLE1BQUdULEVBQUUsZ0JBQUYsRUFBb0JV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QWtCdkIsT0FBbEIsRUFBMkJDLFNBQTNCLEVBQXFDO0FBQ2pDQyxNQUNJRixPQURKLEVBRUlDLFNBRkosRUFHSSxTQUhKO0FBS0g7O0FBRUQsU0FBU3VCLFdBQVQsQ0FBcUJ4QixPQUFyQixFQUE4QkMsU0FBOUIsRUFBd0M7QUFDcENDLE1BQ0lGLE9BREosRUFFSUMsU0FGSixFQUdJLE9BSEo7QUFLSDs7QUFFRCxTQUFTcUMsVUFBVCxDQUFvQnRDLE9BQXBCLEVBQTZCQyxTQUE3QixFQUF1Qzs7QUFFbkNDLE1BQUs7QUFDR0MsU0FBT0gsT0FEVjtBQUVEeEIsUUFBTSxNQUZMO0FBR0RrRCxRQUFNekIsU0FITDtBQUlEc0MsbUJBQWlCLElBSmhCO0FBS0RsQyxvQkFBa0IsS0FMakI7QUFNREcscUJBQ0k7QUFQSCxFQUFMO0FBU0g7O0FBR0QsU0FBU2dDLFdBQVQsR0FBc0I7QUFDckI3RSxHQUFFLElBQUYsRUFBUXdCLE1BQVIsQ0FBZSxNQUFmO0FBQ0EsQyIsImZpbGUiOiIvanMvdmFkbWluLWZ1bmN0aW9ucy5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwge1xuIFx0XHRcdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcbiBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4gXHRcdFx0XHRnZXQ6IGdldHRlclxuIFx0XHRcdH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIi9cIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSA3Nik7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgNDg0MWY1YmE1ZTM2Y2RlMDA3NzUiLCIkLmFqYXhTZXR1cCh7XHJcbiAgICBoZWFkZXJzOiB7XHJcbiAgICAgICAgJ1gtQ1NSRi1UT0tFTic6ICQoJ21ldGFbbmFtZT1cImNzcmYtdG9rZW5cIl0nKS5hdHRyKCdjb250ZW50JylcclxuICAgIH1cclxufSk7XHJcbiBcclxuLypcclxufC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbnwgTElTVFNcclxufC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiovXHJcblxyXG5cclxuLy8gU2VsZWN0IGNoZWNrYm94IHRvIGRlbGV0aW9uXHJcbiQoZG9jdW1lbnQpLm9uKFwiY2xpY2tcIiwgXCIuTGlzdC1DaGVja2JveFwiLCBmdW5jdGlvbihlKVxyXG57XHJcblx0ZS5zdG9wUHJvcGFnYXRpb24oKTtcclxuXHRDaGVja1RvRGVsZXRpb24oXCJzaW5nbGVcIiwgJCh0aGlzKSk7XHJcbn0pO1xyXG5cclxuLy8gU2VsZWN0IEFsbCBwcmVzZW50IGNoZWNrYm94ZXMgdG8gZGVsZXRpb25cclxuJCgnLlNlbGVjdC1BbGwtVG8tRGVsZXRlJykub24oXCJjbGlja1wiLCBmdW5jdGlvbigpIHtcclxuXHRcclxuXHRpZiAoJCh0aGlzKS5wcm9wKCdjaGVja2VkJykpIHtcclxuXHRcdCQoJy5MaXN0LUNoZWNrYm94JykucHJvcCgnY2hlY2tlZCcsIHRydWUpO1xyXG5cdFx0aWYoJCgnLkxpc3QtQ2hlY2tib3gnKS5sZW5ndGggPj0gMSlcclxuXHRcdHtcclxuXHRcdFx0Q2hlY2tUb0RlbGV0aW9uKFwiYWxsXCIpXHJcblx0XHRcdCQoJy5EZWxldGVCdG4nKS5yZW1vdmVDbGFzcygnSGlkZGVuJyk7XHJcblx0XHR9XHJcblxyXG5cdFx0JCgndGJvZHkgdHInKS5hZGRDbGFzcygncm93LXNlbGVjdGVkJyk7XHJcblx0fSBlbHNlIHtcclxuXHRcdCQoJy5MaXN0LUNoZWNrYm94JykucHJvcCgnY2hlY2tlZCcsIGZhbHNlKTtcclxuXHRcdCQoJy5EZWxldGVCdG4nKS5hZGRDbGFzcygnSGlkZGVuJyk7XHJcblx0XHQkKCd0Ym9keSB0cicpLnJlbW92ZUNsYXNzKCdyb3ctc2VsZWN0ZWQnKTtcclxuXHR9XHJcbn0pO1xyXG5cclxuZnVuY3Rpb24gQ2hlY2tUb0RlbGV0aW9uKHR5cGUsIHJvdylcclxue1xyXG5cdGNvbnNvbGUubG9nKHR5cGUsIHJvdyk7XHJcblx0dmFyIHNlbGVjdGVkUm93cyA9IFtdO1xyXG5cdCQoXCIuTGlzdC1DaGVja2JveDpjaGVja2VkXCIpLmVhY2goZnVuY3Rpb24oKSB7ICAgICAgICAgIFxyXG5cdFx0c2VsZWN0ZWRSb3dzLnB1c2goJCh0aGlzKS5hdHRyKCdkYXRhLWlkJykpO1xyXG5cdFx0JCgnI1Jvd3NUb0RlbGV0aW9uJykudmFsKHNlbGVjdGVkUm93cyk7XHJcblx0fSk7XHJcblx0XHJcblx0JCgnI1Jvd3NUb0V4cG9ydCcpLnZhbChzZWxlY3RlZFJvd3MpO1xyXG5cdGlmKHNlbGVjdGVkUm93cy5sZW5ndGggPT0gMSl7XHJcblx0XHQkKCcjRWRpdElkLCAjQ3JlYXRlRnJvbUFub3RoZXJJZCcpLnZhbChzZWxlY3RlZFJvd3MpO1xyXG5cdH0gZWxzZSBpZihzZWxlY3RlZFJvd3MubGVuZ3RoIDwgMSl7XHJcblx0XHQkKCcjRWRpdElkLCAjQ3JlYXRlRnJvbUFub3RoZXJJZCcpLnZhbCgnJyk7XHJcblx0fSBlbHNlIGlmKHNlbGVjdGVkUm93cy5sZW5ndGggPiAxKXtcclxuXHRcdCQoJyNFZGl0SWQsICNDcmVhdGVGcm9tQW5vdGhlcklkJykudmFsKCcnKTtcclxuXHR9IGVsc2Uge1xyXG5cdFx0JCgnI0VkaXRJZCwgI0NyZWF0ZUZyb21Bbm90aGVySWQnKS52YWwoJycpO1xyXG5cdH1cclxuXHJcblx0c2hvd0J1dHRvbnModGhpcyk7XHJcblx0aWYodHlwZSA9PSAnc2luZ2xlJyAmJiByb3cgIT0gdW5kZWZpbmVkKVxyXG5cdHtcclxuXHRcdHZhciBjaGVja2JveCA9IHJvdy5wcm9wKCdjaGVja2VkJyk7XHJcblx0XHRpZihjaGVja2JveCl7XHJcblx0XHRcdHJvdy5wYXJlbnQoKS5wYXJlbnQoKS5wYXJlbnQoKS5hZGRDbGFzcygncm93LXNlbGVjdGVkJyk7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHRyb3cucGFyZW50KCkucGFyZW50KCkucGFyZW50KCkucmVtb3ZlQ2xhc3MoJ3Jvdy1zZWxlY3RlZCcpO1xyXG5cdFx0fVxyXG5cdH1cclxufVxyXG5cclxuZnVuY3Rpb24gc2hvd0J1dHRvbnModHJpZ2dlcikge1xyXG5cdFxyXG5cdHZhciBjb3VudFNlbGVjdGVkID0gJCgnLkxpc3QtQ2hlY2tib3g6Y2hlY2tib3g6Y2hlY2tlZCcpLmxlbmd0aDtcclxuXHRpZihjb3VudFNlbGVjdGVkID09IDEpIHtcclxuICAgICAgICAkKCcuRGVsZXRlQnRuJykucmVtb3ZlQ2xhc3MoJ0hpZGRlbicpO1xyXG5cdFx0JCgnLkVkaXRCdG4nKS5yZW1vdmVDbGFzcygnSGlkZGVuJyk7XHJcblx0XHQkKCcuQ3JlYXRlRnJvbUFub3RoZXJCdG4nKS5yZW1vdmVDbGFzcygnSGlkZGVuJyk7XHJcblx0XHQkKCcuRXhwb3J0U2VsZWN0ZWRCdG4nKS5yZW1vdmVDbGFzcygnSGlkZGVuJyk7XHJcblx0fSBlbHNlIGlmKGNvdW50U2VsZWN0ZWQgPj0gMikge1xyXG5cdFx0JCgnLkVkaXRCdG4nKS5hZGRDbGFzcygnSGlkZGVuJyk7XHJcblx0XHQkKCcuQ3JlYXRlRnJvbUFub3RoZXJCdG4nKS5hZGRDbGFzcygnSGlkZGVuJyk7XHJcbiAgICB9IGVsc2UgaWYoY291bnRTZWxlY3RlZCA9PSAwKSB7XHJcbiAgICAgICAgJCgnLkRlbGV0ZUJ0bicpLmFkZENsYXNzKCdIaWRkZW4nKTtcclxuXHRcdCQoJy5FZGl0QnRuJykuYWRkQ2xhc3MoJ0hpZGRlbicpO1xyXG5cdFx0JCgnLkNyZWF0ZUZyb21Bbm90aGVyQnRuJykuYWRkQ2xhc3MoJ0hpZGRlbicpO1xyXG5cdFx0JCgnLkV4cG9ydFNlbGVjdGVkQnRuJykuYWRkQ2xhc3MoJ0hpZGRlbicpO1xyXG4gICAgfVxyXG59XHJcblxyXG4vLyBTaG93IEVkaXQgYW5kIERlbGV0ZSBidXR0b25zIGluIGJvdHRvbSBpZiBzY3JvbGxlZCB0byBtdXRjaFxyXG4kKGRvY3VtZW50KS5zY3JvbGwoZnVuY3Rpb24oZSl7XHJcblx0dmFyIHNjcm9sbEFtb3VudCA9ICQod2luZG93KS5zY3JvbGxUb3AoKTtcclxuXHRpZihzY3JvbGxBbW91bnQgPiAxNTApe1xyXG5cdFx0JCgnLkRlbGV0ZUJ0bicpLmNzcyh7XCJwb3NpdGlvblwiOlwiZml4ZWRcIiwgXCJib3R0b21cIjpcIjUwcHhcIiwgXCJyaWdodFwiOlwiMTBweFwiLCBcInotaW5kZXhcIjpcIjk5OVwifSk7XHJcblx0XHQkKCcuRWRpdEJ0bicpLmNzcyh7XCJwb3NpdGlvblwiOlwiZml4ZWRcIiwgXCJib3R0b21cIjpcIjUwcHhcIiwgXCJyaWdodFwiOlwiMTMwcHhcIiwgXCJ6LWluZGV4XCI6XCI5OTlcIn0pO1xyXG5cdFx0JCgnLkNyZWF0ZUZyb21Bbm90aGVyQnRuJykuY3NzKHtcInBvc2l0aW9uXCI6XCJmaXhlZFwiLCBcImJvdHRvbVwiOlwiNTBweFwiLCBcInJpZ2h0XCI6XCIyMzVweFwiLCBcInotaW5kZXhcIjpcIjk5OVwifSk7XHJcblx0fSBlbHNlIHtcclxuXHRcdCQoJy5EZWxldGVCdG4nKS5jc3Moe1wicG9zaXRpb25cIjpcInJlbGF0aXZlXCIsIFwiYm90dG9tXCI6XCJhdXRvXCIsIFwicmlnaHRcIjpcImF1dG9cIiwgXCJ6LWluZGV4XCI6XCI5OTlcIn0pO1xyXG5cdFx0JCgnLkVkaXRCdG4nKS5jc3Moe1wicG9zaXRpb25cIjpcInJlbGF0aXZlXCIsIFwiYm90dG9tXCI6XCJhdXRvXCIsIFwicmlnaHRcIjpcImF1dG9cIiwgXCJ6LWluZGV4XCI6XCI5OTlcIn0pO1xyXG5cdFx0JCgnLkNyZWF0ZUZyb21Bbm90aGVyQnRuJykuY3NzKHtcInBvc2l0aW9uXCI6XCJyZWxhdGl2ZVwiLCBcImJvdHRvbVwiOlwiYXV0b1wiLCBcInJpZ2h0XCI6XCJhdXRvXCIsIFwiei1pbmRleFwiOlwiOTk5XCJ9KTtcclxuXHRcdFxyXG5cdH1cclxufSk7XHJcblxyXG4vLyBVbmNoZWNrIGFsbCBjaGVja2JveGVzIG9uIHJlbG9hZC5cclxuZnVuY3Rpb24gdW5jaGVja0FsbCgpe1xyXG5cdCQoJyNUYWJsZUxpc3QgdGJvZHkgLkNoZWNrQm94ZXMnKS5maW5kKCdpbnB1dFt0eXBlPVwiY2hlY2tib3hcIl0nKS5lYWNoKGZ1bmN0aW9uKCkge1xyXG5cdFx0JCh0aGlzKS5wcm9wKCdjaGVja2VkJywgZmFsc2UpO1x0XHJcblx0fSk7XHRcclxufVxyXG51bmNoZWNrQWxsKCk7XHJcblxyXG4vKlxyXG58LS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxufCBGVU5DVElPTlNcclxufC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiovXHJcblxyXG5cclxuLy8gRGVsZXRlIHJvd3NcclxuZGVsZXRlUmVjb3JkID0gZnVuY3Rpb24oaWQsIHJvdXRlLCBiaWd0ZXh0LCBzbWFsbHRleHQpIHtcclxuXHRzd2FsKHtcclxuXHRcdHRpdGxlOiBiaWd0ZXh0LFxyXG5cdFx0dGV4dDogc21hbGx0ZXh0LFxyXG5cdFx0dHlwZTogJ3dhcm5pbmcnLFxyXG5cdFx0c2hvd0NhbmNlbEJ1dHRvbjogdHJ1ZSxcclxuXHRcdGNvbmZpcm1CdXR0b25Db2xvcjogJyMzMDg1ZDYnLFxyXG5cdFx0Y2FuY2VsQnV0dG9uQ29sb3I6ICcjZDMzJyxcclxuXHRcdGNvbmZpcm1CdXR0b25UZXh0OiAnRUxJTUlOQVInLFxyXG5cdFx0Y2FuY2VsQnV0dG9uVGV4dDogJ0NhbmNlbGFyJyxcclxuXHRcdGNvbmZpcm1CdXR0b25DbGFzczogJ2J0biBidG5HcmVlbicsXHJcblx0XHRjYW5jZWxCdXR0b25DbGFzczogJ2J0biBidG5SZWQnLFxyXG5cdFx0YnV0dG9uc1N0eWxpbmc6IGZhbHNlXHJcblx0fSkudGhlbihmdW5jdGlvbiAoKSB7XHJcblxyXG4gXHRcdCQuYWpheCh7XHJcblx0XHRcdHVybDogcm91dGUsXHJcblx0XHRcdG1ldGhvZDogJ1BPU1QnLCAgICAgICAgICAgICBcclxuXHRcdFx0ZGF0YVR5cGU6ICdKU09OJyxcclxuXHRcdFx0ZGF0YTogeyBpZDogaWQgfSxcclxuXHRcdFx0YmVmb3JlU2VuZDogZnVuY3Rpb24oKXtcclxuXHRcdFx0XHQvLyAkKCcjTWFpbi1Mb2FkZXInKS5yZW1vdmVDbGFzcygnSGlkZGVuJyk7XHJcblx0XHRcdH0sXHJcblx0XHRcdHN1Y2Nlc3M6IGZ1bmN0aW9uKGRhdGEpe1xyXG5cdFx0XHRcdCQoJyNCYXRjaERlbGV0ZUJ0bicpLmFkZENsYXNzKCdIaWRkZW4nKTtcclxuXHRcdFx0XHRpZiAoZGF0YS5zdWNjZXNzID09IHRydWUpIHtcclxuXHRcdFx0XHRcdCQoJyNJZCcraWQpLmhpZGUoMjAwKTtcclxuXHRcdFx0XHRcdGZvcihpPTA7IGkgPCBpZC5sZW5ndGggOyBpKyspe1xyXG5cdFx0XHRcdFx0XHQkKCcjSWQnK2lkW2ldKS5oaWRlKDIwMCk7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRhbGVydF9vaygnT2shJywnRWxpbWluYWNpw7NuIGNvbXBsZXRhJyk7XHJcblx0XHRcdFx0XHRjb25zb2xlLmxvZyhkYXRhKTtcclxuXHRcdFx0XHRcdHJldHVybiB0cnVlO1xyXG5cdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHRhbGVydF9lcnJvcignVXBzIScsJ0hhIG9jdXJyaWRvIHVuIGVycm9yIChQdWVkZSBxdWUgZXN0ZSByZWdpc3RybyB0ZW5nYSByZWxhY2nDs24gY29uIG90cm9zIGl0ZW1zIGVuIGVsIHNpc3RlbWEpLiBEZWJlIGVsaW1pbmFyIHByaW1lcm8gbG9zIG1pc21vcy4nKTtcclxuXHRcdFx0XHRcdGNvbnNvbGUubG9nKGRhdGEpO1xyXG5cdFx0XHRcdFx0cmV0dXJuIGZhbHNlO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fSxcclxuXHRcdFx0ZXJyb3I6IGZ1bmN0aW9uKGRhdGEpXHJcblx0XHRcdHtcclxuICAgICAgICAgICAgICAgICQoJyNFcnJvcicpLmh0bWwoZGF0YS5yZXNwb25zZVRleHQpO1xyXG5cdFx0XHRcdGNvbnNvbGUubG9nKGRhdGEpO1x0XHJcblx0XHRcdH0sXHJcblx0XHRcdGNvbXBsZXRlOiBmdW5jdGlvbigpXHJcblx0XHRcdHtcclxuXHRcdFx0XHQvLyAkKCcjTWFpbi1Mb2FkZXInKS5hZGRDbGFzcygnSGlkZGVuJyk7XHJcblx0XHRcdH1cclxuXHRcdH0pO1xyXG5cdH0pO1xyXG5cclxufVxyXG5cclxuZGVsZXRlQW5kUmVsb2FkID0gZnVuY3Rpb24oaWQsIHJvdXRlLCBiaWd0ZXh0LCBzbWFsbHRleHQpIHtcclxuXHRzd2FsKHtcclxuXHRcdHRpdGxlOiBiaWd0ZXh0LFxyXG5cdFx0dGV4dDogc21hbGx0ZXh0LFxyXG5cdFx0dHlwZTogJ3dhcm5pbmcnLFxyXG5cdFx0c2hvd0NhbmNlbEJ1dHRvbjogdHJ1ZSxcclxuXHRcdGNvbmZpcm1CdXR0b25Db2xvcjogJyMzMDg1ZDYnLFxyXG5cdFx0Y2FuY2VsQnV0dG9uQ29sb3I6ICcjZDMzJyxcclxuXHRcdGNvbmZpcm1CdXR0b25UZXh0OiAnRUxJTUlOQVInLFxyXG5cdFx0Y2FuY2VsQnV0dG9uVGV4dDogJ0NhbmNlbGFyJyxcclxuXHRcdGNvbmZpcm1CdXR0b25DbGFzczogJ2J0biBidG5HcmVlbicsXHJcblx0XHRjYW5jZWxCdXR0b25DbGFzczogJ2J0biBidG5SZWQnLFxyXG5cdFx0YnV0dG9uc1N0eWxpbmc6IGZhbHNlXHJcblx0fSkudGhlbihmdW5jdGlvbiAoKSB7XHJcblx0XHQkLmFqYXgoe1xyXG5cdFx0XHR1cmw6IHJvdXRlLFxyXG5cdFx0XHRtZXRob2Q6ICdQT1NUJywgICAgICAgICAgICAgXHJcblx0XHRcdGRhdGFUeXBlOiAnSlNPTicsXHJcblx0XHRcdGRhdGE6IHsgaWQ6IGlkIH0sXHJcblx0XHRcdGJlZm9yZVNlbmQ6IGZ1bmN0aW9uKCl7XHJcblx0XHRcdFx0Ly8gJCgnI01haW4tTG9hZGVyJykucmVtb3ZlQ2xhc3MoJ0hpZGRlbicpO1xyXG5cdFx0XHR9LFxyXG5cdFx0XHRzdWNjZXNzOiBmdW5jdGlvbihkYXRhKXtcclxuXHRcdFx0XHQkKCcjQmF0Y2hEZWxldGVCdG4nKS5hZGRDbGFzcygnSGlkZGVuJyk7XHJcblx0XHRcdFx0aWYgKGRhdGEuc3VjY2VzcyA9PSB0cnVlKSB7XHJcblx0XHRcdFx0XHQvLyBhbGVydF9vaygnT2shJywnRWxpbWluYWNpw7NuIGNvbXBsZXRhJyk7XHJcblx0XHRcdFx0XHRsb2NhdGlvbi5yZWxvYWQoKTtcclxuXHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0YWxlcnRfZXJyb3IoJ1VwcyEnLCdIYSBvY3VycmlkbyB1biBlcnJvciAoUHVlZGUgcXVlIGVzdGUgcmVnaXN0cm8gdGVuZ2EgcmVsYWNpw7NuIGNvbiBvdHJvcyBpdGVtcyBlbiBlbCBzaXN0ZW1hKS4gRGViZSBlbGltaW5hciBwcmltZXJvIGxvcyBtaXNtb3MuJyk7XHJcblx0XHRcdFx0XHRjb25zb2xlLmxvZyhkYXRhKTtcclxuXHRcdFx0XHRcdHJldHVybiBmYWxzZTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH0sXHJcblx0XHRcdGVycm9yOiBmdW5jdGlvbihkYXRhKVxyXG5cdFx0XHR7XHJcblx0XHRcdFx0JCgnI0Vycm9yJykuaHRtbChkYXRhLnJlc3BvbnNlVGV4dCk7XHJcblx0XHRcdFx0Y29uc29sZS5sb2coZGF0YSk7XHRcclxuXHRcdFx0fVxyXG5cdFx0fSk7XHJcblx0fSk7XHJcblxyXG59XHJcblxyXG5cclxuLy8gUmVtb3ZlIHByb2R1Y3QgZnJvbSBjYXJ0XHJcbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxud2luZG93LnJlbW92ZUZyb21DYXJ0ID0gZnVuY3Rpb24gKHJvdXRlLCBjYXJ0SXRlbUlkLCBhY3Rpb24sIGVsZW1lbnQpIHtcclxuICAgICQuYWpheCh7XHJcbiAgICAgICAgdXJsOiByb3V0ZSxcclxuICAgICAgICBtZXRob2Q6ICdQT1NUJyxcclxuXHRcdGRhdGFUeXBlOiAnSlNPTicsXHJcbiAgICAgICAgZGF0YTogeyBjYXJ0SXRlbUlkOiBjYXJ0SXRlbUlkLCBhY3Rpb246IGFjdGlvbiB9LFxyXG4gICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChkYXRhKSB7XHJcblx0XHRcdGNvbnNvbGUubG9nKGRhdGEpO1xyXG4gICAgICAgICAgICBpZiAoZGF0YS5yZXNwb25zZSA9PSAnc3VjY2VzcycpIHtcclxuXHRcdFx0XHRlbGVtZW50LnJlbW92ZSgpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG5cdFx0XHRcdGNvbnNvbGUubG9nKFwiRVJST1JcIik7XHJcblx0XHRcdH0gIFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZXJyb3I6IGZ1bmN0aW9uIChkYXRhKSB7XHJcbiAgICAgICAgICAgICQoJyNFcnJvcicpLmh0bWwoZGF0YS5yZXNwb25zZVRleHQpO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIkVycm9yIGVuIHJlbW92ZUZyb21DYXJ0KClcIik7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGRhdGEpO1xyXG4gICAgICAgICAgICAvLyBJZiBhbiBlcnJvciBwb3BzIHdoZW4gZGVzdHJveWluZyBhbiBpdGVtLCByZWxvYWQgYW5kIHByZXZlbnQgYmFkIG1hZ2ljXHJcbiAgICAgICAgICAgIC8vIGxvY2F0aW9uLnJlbG9hZCgpO1xyXG5cdFx0fVxyXG4gICAgfSk7XHRcclxufVxyXG4vKlxyXG58LS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxufCBBTEVSVFNcclxufC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiovXHJcblxyXG5mdW5jdGlvbiBhbGVydF9vayhiaWd0ZXh0LCBzbWFsbHRleHQpe1xyXG4gICAgc3dhbChcclxuICAgICAgICBiaWd0ZXh0LFxyXG4gICAgICAgIHNtYWxsdGV4dCxcclxuICAgICAgICAnc3VjY2VzcydcclxuICAgICk7ICAgIFxyXG59XHJcbiAgICBcclxuZnVuY3Rpb24gYWxlcnRfZXJyb3IoYmlndGV4dCwgc21hbGx0ZXh0KXtcclxuICAgIHN3YWwoXHJcbiAgICAgICAgYmlndGV4dCxcclxuICAgICAgICBzbWFsbHRleHQsXHJcbiAgICAgICAgJ2Vycm9yJ1xyXG4gICAgKTtcclxufVxyXG5cclxuZnVuY3Rpb24gYWxlcnRfaW5mbyhiaWd0ZXh0LCBzbWFsbHRleHQpe1xyXG5cclxuICAgIHN3YWwoe1xyXG4gICAgICAgICAgICB0aXRsZTogYmlndGV4dCxcclxuICAgICAgICB0eXBlOiAnaW5mbycsXHJcbiAgICAgICAgaHRtbDogc21hbGx0ZXh0LFxyXG4gICAgICAgIHNob3dDbG9zZUJ1dHRvbjogdHJ1ZSxcclxuICAgICAgICBzaG93Q2FuY2VsQnV0dG9uOiBmYWxzZSxcclxuICAgICAgICBjb25maXJtQnV0dG9uVGV4dDpcclxuICAgICAgICAgICAgJzxpIGNsYXNzPVwiaW9uLWNoZWNrbWFyay1yb3VuZFwiPjwvaT4gT2shJ1xyXG4gICAgICAgIH0pO1xyXG59XHJcblxyXG5cclxuZnVuY3Rpb24gY2xvc2VQYXJlbnQoKXtcclxuXHQkKHRoaXMpLnBhcmVudCgnaGlkZScpO1xyXG59XHJcblxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9yZXNvdXJjZXMvYXNzZXRzL2pzL3ZhZG1pbi1mdW5jdGlvbnMuanMiXSwic291cmNlUm9vdCI6IiJ9