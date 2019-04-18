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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgMDJlODY2MzRkMjc1ZDA0NjhmYzciLCJ3ZWJwYWNrOi8vLy4vcmVzb3VyY2VzL2Fzc2V0cy9qcy92YWRtaW4tZnVuY3Rpb25zLmpzIl0sIm5hbWVzIjpbIiQiLCJhamF4U2V0dXAiLCJoZWFkZXJzIiwiYXR0ciIsImRvY3VtZW50Iiwib24iLCJlIiwic3RvcFByb3BhZ2F0aW9uIiwiQ2hlY2tUb0RlbGV0aW9uIiwicHJvcCIsImxlbmd0aCIsInJlbW92ZUNsYXNzIiwiYWRkQ2xhc3MiLCJ0eXBlIiwicm93Iiwic2VsZWN0ZWRSb3dzIiwiZWFjaCIsInB1c2giLCJ2YWwiLCJzaG93QnV0dG9ucyIsInVuZGVmaW5lZCIsImNoZWNrYm94IiwicGFyZW50IiwidHJpZ2dlciIsImNvdW50U2VsZWN0ZWQiLCJzY3JvbGwiLCJzY3JvbGxBbW91bnQiLCJ3aW5kb3ciLCJzY3JvbGxUb3AiLCJjc3MiLCJ1bmNoZWNrQWxsIiwiZmluZCIsImRlbGV0ZVJlY29yZCIsImlkIiwicm91dGUiLCJiaWd0ZXh0Iiwic21hbGx0ZXh0Iiwic3dhbCIsInRpdGxlIiwidGV4dCIsInNob3dDYW5jZWxCdXR0b24iLCJjb25maXJtQnV0dG9uQ29sb3IiLCJjYW5jZWxCdXR0b25Db2xvciIsImNvbmZpcm1CdXR0b25UZXh0IiwiY2FuY2VsQnV0dG9uVGV4dCIsImNvbmZpcm1CdXR0b25DbGFzcyIsImNhbmNlbEJ1dHRvbkNsYXNzIiwiYnV0dG9uc1N0eWxpbmciLCJ0aGVuIiwiYWpheCIsInVybCIsIm1ldGhvZCIsImRhdGFUeXBlIiwiZGF0YSIsImJlZm9yZVNlbmQiLCJzdWNjZXNzIiwiaGlkZSIsImkiLCJhbGVydF9vayIsImNvbnNvbGUiLCJsb2ciLCJhbGVydF9lcnJvciIsImVycm9yIiwiaHRtbCIsInJlc3BvbnNlVGV4dCIsImNvbXBsZXRlIiwiZGVsZXRlQW5kUmVsb2FkIiwibG9jYXRpb24iLCJyZWxvYWQiLCJhbGVydF9p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WjtBQUNBLFlBQU8sS0FBUDtBQUNBO0FBQ0QsSUFsQks7QUFtQk5TLFVBQU8sZUFBU1QsSUFBVCxFQUNQO0FBQ0NyRCxNQUFFLFFBQUYsRUFBWStELElBQVosQ0FBaUJWLEtBQUtXLFlBQXRCO0FBQ0FMLFlBQVFDLEdBQVIsQ0FBWVAsSUFBWjtBQUNBO0FBdkJLLEdBQVA7QUF5QkEsRUF0Q0Q7QUF3Q0EsQ0F6Q0Q7O0FBMkNBOzs7Ozs7QUFNQSxTQUFTSyxRQUFULENBQWtCdkIsT0FBbEIsRUFBMkJDLFNBQTNCLEVBQXFDO0FBQ2pDQyxNQUNJRixPQURKLEVBRUlDLFNBRkosRUFHSSxTQUhKO0FBS0g7O0FBRUQsU0FBU3lCLFdBQVQsQ0FBcUIxQixPQUFyQixFQUE4QkMsU0FBOUIsRUFBd0M7QUFDcENDLE1BQ0lGLE9BREosRUFFSUMsU0FGSixFQUdJLE9BSEo7QUFLSDs7QUFFRCxTQUFTaUMsVUFBVCxDQUFvQmxDLE9BQXBCLEVBQTZCQyxTQUE3QixFQUF1Qzs7QUFFbkNDLE1BQUs7QUFDR0MsU0FBT0gsT0FEVjtBQUVEdEIsUUFBTSxNQUZMO0FBR0RrRCxRQUFNM0IsU0FITDtBQUlEa0MsbUJBQWlCLElBSmhCO0FBS0Q5QixvQkFBa0IsS0FMakI7QUFNREcscUJBQ0k7QUFQSCxFQUFMO0FBU0g7O0FBR0QsU0FBUzRCLFdBQVQsR0FBc0I7QUFDckJ2RSxHQUFFLElBQUYsRUFBUXNCLE1BQVIsQ0FBZSxNQUFmO0FBQ0EsQyIsImZpbGUiOiIvanMvdmFkbWluLWZ1bmN0aW9ucy5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwge1xuIFx0XHRcdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcbiBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4gXHRcdFx0XHRnZXQ6IGdldHRlclxuIFx0XHRcdH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIi9cIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSA3Nik7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgMDJlODY2MzRkMjc1ZDA0NjhmYzciLCIkLmFqYXhTZXR1cCh7XHJcbiAgICBoZWFkZXJzOiB7XHJcbiAgICAgICAgJ1gtQ1NSRi1UT0tFTic6ICQoJ21ldGFbbmFtZT1cImNzcmYtdG9rZW5cIl0nKS5hdHRyKCdjb250ZW50JylcclxuICAgIH1cclxufSk7XHJcbiBcclxuLypcclxufC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbnwgTElTVFNcclxufC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiovXHJcblxyXG5cclxuLy8gU2VsZWN0IGNoZWNrYm94IHRvIGRlbGV0aW9uXHJcbiQoZG9jdW1lbnQpLm9uKFwiY2xpY2tcIiwgXCIuTGlzdC1DaGVja2JveFwiLCBmdW5jdGlvbihlKVxyXG57XHJcblx0ZS5zdG9wUHJvcGFnYXRpb24oKTtcclxuXHRDaGVja1RvRGVsZXRpb24oXCJzaW5nbGVcIiwgJCh0aGlzKSk7XHJcbn0pO1xyXG5cclxuLy8gU2VsZWN0IEFsbCBwcmVzZW50IGNoZWNrYm94ZXMgdG8gZGVsZXRpb25cclxuJCgnLlNlbGVjdC1BbGwtVG8tRGVsZXRlJykub24oXCJjbGlja1wiLCBmdW5jdGlvbigpIHtcclxuXHRcclxuXHRpZiAoJCh0aGlzKS5wcm9wKCdjaGVja2VkJykpIHtcclxuXHRcdCQoJy5MaXN0LUNoZWNrYm94JykucHJvcCgnY2hlY2tlZCcsIHRydWUpO1xyXG5cdFx0aWYoJCgnLkxpc3QtQ2hlY2tib3gnKS5sZW5ndGggPj0gMSlcclxuXHRcdHtcclxuXHRcdFx0Q2hlY2tUb0RlbGV0aW9uKFwiYWxsXCIpXHJcblx0XHRcdCQoJy5EZWxldGVCdG4nKS5yZW1vdmVDbGFzcygnSGlkZGVuJyk7XHJcblx0XHR9XHJcblxyXG5cdFx0JCgndGJvZHkgdHInKS5hZGRDbGFzcygncm93LXNlbGVjdGVkJyk7XHJcblx0fSBlbHNlIHtcclxuXHRcdCQoJy5MaXN0LUNoZWNrYm94JykucHJvcCgnY2hlY2tlZCcsIGZhbHNlKTtcclxuXHRcdCQoJy5EZWxldGVCdG4nKS5hZGRDbGFzcygnSGlkZGVuJyk7XHJcblx0XHQkKCd0Ym9keSB0cicpLnJlbW92ZUNsYXNzKCdyb3ctc2VsZWN0ZWQnKTtcclxuXHR9XHJcbn0pO1xyXG5cclxuZnVuY3Rpb24gQ2hlY2tUb0RlbGV0aW9uKHR5cGUsIHJvdylcclxue1xyXG5cdHZhciBzZWxlY3RlZFJvd3MgPSBbXTtcclxuXHQkKFwiLkxpc3QtQ2hlY2tib3g6Y2hlY2tlZFwiKS5lYWNoKGZ1bmN0aW9uKCkgeyAgICAgICAgICBcclxuXHRcdHNlbGVjdGVkUm93cy5wdXNoKCQodGhpcykuYXR0cignZGF0YS1pZCcpKTtcclxuXHRcdCQoJyNSb3dzVG9EZWxldGlvbicpLnZhbChzZWxlY3RlZFJvd3MpO1xyXG5cdH0pO1xyXG5cdFxyXG5cdGlmKHNlbGVjdGVkUm93cy5sZW5ndGggPT0gMSl7XHJcblx0XHQkKCcjRWRpdElkLCAjQ3JlYXRlRnJvbUFub3RoZXJJZCcpLnZhbChzZWxlY3RlZFJvd3MpO1xyXG5cdH0gZWxzZSBpZihzZWxlY3RlZFJvd3MubGVuZ3RoIDwgMSl7XHJcblx0XHQkKCcjRWRpdElkLCAjQ3JlYXRlRnJvbUFub3RoZXJJZCcpLnZhbCgnJyk7XHJcblx0fSBlbHNlIGlmKHNlbGVjdGVkUm93cy5sZW5ndGggPiAxKXtcclxuXHRcdCQoJyNFZGl0SWQsICNDcmVhdGVGcm9tQW5vdGhlcklkJykudmFsKCcnKTtcclxuXHR9IGVsc2Uge1xyXG5cdFx0JCgnI0VkaXRJZCwgI0NyZWF0ZUZyb21Bbm90aGVySWQnKS52YWwoJycpO1xyXG5cdH1cclxuXHJcblx0c2hvd0J1dHRvbnModGhpcyk7XHJcblx0aWYodHlwZSA9PSAnc2luZ2xlJyAmJiByb3cgIT0gdW5kZWZpbmVkKVxyXG5cdHtcclxuXHRcdHZhciBjaGVja2JveCA9IHJvdy5wcm9wKCdjaGVja2VkJyk7XHJcblx0XHRpZihjaGVja2JveCl7XHJcblx0XHRcdHJvdy5wYXJlbnQoKS5wYXJlbnQoKS5wYXJlbnQoKS5hZGRDbGFzcygncm93LXNlbGVjdGVkJyk7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHRyb3cucGFyZW50KCkucGFyZW50KCkucGFyZW50KCkucmVtb3ZlQ2xhc3MoJ3Jvdy1zZWxlY3RlZCcpO1xyXG5cdFx0fVxyXG5cdH1cclxufVxyXG5cclxuLy8gT3JpZ2luYWwgbGluZXNcclxuLy8gU2V0IExpc3QgQWN0aW9uIEJ1dHRvbnNcclxuLy8gJChkb2N1bWVudCkub24oXCJjbGlja1wiLCBcIi5MaXN0LUNoZWNrYm94XCIsIGZ1bmN0aW9uKGUpe1xyXG4vLyAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcclxuLy8gXHR2YXIgc2VsZWN0ZWRSb3dzID0gW107XHJcbi8vICAgICAkKFwiLkxpc3QtQ2hlY2tib3g6Y2hlY2tlZFwiKS5lYWNoKGZ1bmN0aW9uKCkgeyAgICAgICAgICBcclxuLy8gICAgICAgICBzZWxlY3RlZFJvd3MucHVzaCgkKHRoaXMpLmF0dHIoJ2RhdGEtaWQnKSk7XHJcbi8vIFx0XHQkKCcjUm93c1RvRGVsZXRpb24nKS52YWwoc2VsZWN0ZWRSb3dzKTtcclxuLy8gICAgIH0pO1xyXG4gICAgICAgXHJcbi8vICAgICBpZihzZWxlY3RlZFJvd3MubGVuZ3RoID09IDEpe1xyXG4vLyBcdFx0JCgnI0VkaXRJZCwgI0NyZWF0ZUZyb21Bbm90aGVySWQnKS52YWwoc2VsZWN0ZWRSb3dzKTtcclxuLy8gICAgIH0gZWxzZSBpZihzZWxlY3RlZFJvd3MubGVuZ3RoIDwgMSl7XHJcbi8vIFx0XHQkKCcjRWRpdElkLCAjQ3JlYXRlRnJvbUFub3RoZXJJZCcpLnZhbCgnJyk7XHJcbi8vICAgICB9IGVsc2UgaWYoc2VsZWN0ZWRSb3dzLmxlbmd0aCA+IDEpe1xyXG4vLyAgICAgICAgICQoJyNFZGl0SWQsICNDcmVhdGVGcm9tQW5vdGhlcklkJykudmFsKCcnKTtcclxuLy8gICAgIH0gZWxzZSB7XHJcbi8vICAgICAgICAgJCgnI0VkaXRJZCwgI0NyZWF0ZUZyb21Bbm90aGVySWQnKS52YWwoJycpO1xyXG4vLyAgICAgfVxyXG5cclxuLy8gICAgIHNob3dCdXR0b25zKHRoaXMpO1xyXG5cclxuLy8gXHR2YXIgY2hlY2tib3ggPSAkKHRoaXMpLnByb3AoJ2NoZWNrZWQnKTtcclxuLy8gXHRpZihjaGVja2JveCl7XHJcbi8vIFx0XHQkKHRoaXMpLnBhcmVudCgpLnBhcmVudCgpLnBhcmVudCgpLmFkZENsYXNzKCdyb3ctc2VsZWN0ZWQnKTtcclxuLy8gXHR9IGVsc2Uge1xyXG4vLyBcdFx0JCh0aGlzKS5wYXJlbnQoKS5wYXJlbnQoKS5wYXJlbnQoKS5yZW1vdmVDbGFzcygncm93LXNlbGVjdGVkJyk7XHJcbi8vIFx0fVxyXG4vLyB9KTtcclxuXHJcblxyXG5mdW5jdGlvbiBzaG93QnV0dG9ucyh0cmlnZ2VyKSB7XHJcblx0XHJcblx0dmFyIGNvdW50U2VsZWN0ZWQgPSAkKCcuTGlzdC1DaGVja2JveDpjaGVja2JveDpjaGVja2VkJykubGVuZ3RoO1xyXG5cdGlmKGNvdW50U2VsZWN0ZWQgPT0gMSkge1xyXG4gICAgICAgICQoJy5EZWxldGVCdG4nKS5yZW1vdmVDbGFzcygnSGlkZGVuJyk7XHJcblx0XHQkKCcuRWRpdEJ0bicpLnJlbW92ZUNsYXNzKCdIaWRkZW4nKTtcclxuXHRcdCQoJy5DcmVhdGVGcm9tQW5vdGhlckJ0bicpLnJlbW92ZUNsYXNzKCdIaWRkZW4nKTtcclxuXHR9IGVsc2UgaWYoY291bnRTZWxlY3RlZCA+PSAyKSB7XHJcblx0XHQkKCcuRWRpdEJ0bicpLmFkZENsYXNzKCdIaWRkZW4nKTtcclxuXHRcdCQoJy5DcmVhdGVGcm9tQW5vdGhlckJ0bicpLmFkZENsYXNzKCdIaWRkZW4nKTtcclxuICAgIH0gZWxzZSBpZihjb3VudFNlbGVjdGVkID09IDApIHtcclxuICAgICAgICAkKCcuRGVsZXRlQnRuJykuYWRkQ2xhc3MoJ0hpZGRlbicpO1xyXG5cdFx0JCgnLkVkaXRCdG4nKS5hZGRDbGFzcygnSGlkZGVuJyk7XHJcblx0XHQkKCcuQ3JlYXRlRnJvbUFub3RoZXJCdG4nKS5hZGRDbGFzcygnSGlkZGVuJyk7XHJcbiAgICB9XHJcbn1cclxuXHJcbi8vIFNob3cgRWRpdCBhbmQgRGVsZXRlIGJ1dHRvbnMgaW4gYm90dG9tIGlmIHNjcm9sbGVkIHRvIG11dGNoXHJcbiQoZG9jdW1lbnQpLnNjcm9sbChmdW5jdGlvbihlKXtcclxuXHR2YXIgc2Nyb2xsQW1vdW50ID0gJCh3aW5kb3cpLnNjcm9sbFRvcCgpO1xyXG5cdGlmKHNjcm9sbEFtb3VudCA+IDE1MCl7XHJcblx0XHQkKCcuRGVsZXRlQnRuJykuY3NzKHtcInBvc2l0aW9uXCI6XCJmaXhlZFwiLCBcImJvdHRvbVwiOlwiNTBweFwiLCBcInJpZ2h0XCI6XCIxMHB4XCIsIFwiei1pbmRleFwiOlwiOTk5XCJ9KTtcclxuXHRcdCQoJy5FZGl0QnRuJykuY3NzKHtcInBvc2l0aW9uXCI6XCJmaXhlZFwiLCBcImJvdHRvbVwiOlwiNTBweFwiLCBcInJpZ2h0XCI6XCIxMzBweFwiLCBcInotaW5kZXhcIjpcIjk5OVwifSk7XHJcblx0XHQkKCcuQ3JlYXRlRnJvbUFub3RoZXJCdG4nKS5jc3Moe1wicG9zaXRpb25cIjpcImZpeGVkXCIsIFwiYm90dG9tXCI6XCI1MHB4XCIsIFwicmlnaHRcIjpcIjIzNXB4XCIsIFwiei1pbmRleFwiOlwiOTk5XCJ9KTtcclxuXHR9IGVsc2Uge1xyXG5cdFx0JCgnLkRlbGV0ZUJ0bicpLmNzcyh7XCJwb3NpdGlvblwiOlwicmVsYXRpdmVcIiwgXCJib3R0b21cIjpcImF1dG9cIiwgXCJyaWdodFwiOlwiYXV0b1wiLCBcInotaW5kZXhcIjpcIjk5OVwifSk7XHJcblx0XHQkKCcuRWRpdEJ0bicpLmNzcyh7XCJwb3NpdGlvblwiOlwicmVsYXRpdmVcIiwgXCJib3R0b21cIjpcImF1dG9cIiwgXCJyaWdodFwiOlwiYXV0b1wiLCBcInotaW5kZXhcIjpcIjk5OVwifSk7XHJcblx0XHQkKCcuQ3JlYXRlRnJvbUFub3RoZXJCdG4nKS5jc3Moe1wicG9zaXRpb25cIjpcInJlbGF0aXZlXCIsIFwiYm90dG9tXCI6XCJhdXRvXCIsIFwicmlnaHRcIjpcImF1dG9cIiwgXCJ6LWluZGV4XCI6XCI5OTlcIn0pO1xyXG5cdFx0XHJcblx0fVxyXG59KTtcclxuXHJcbi8vIFVuY2hlY2sgYWxsIGNoZWNrYm94ZXMgb24gcmVsb2FkLlxyXG5mdW5jdGlvbiB1bmNoZWNrQWxsKCl7XHJcblx0JCgnI1RhYmxlTGlzdCB0Ym9keSAuQ2hlY2tCb3hlcycpLmZpbmQoJ2lucHV0W3R5cGU9XCJjaGVja2JveFwiXScpLmVhY2goZnVuY3Rpb24oKSB7XHJcblx0XHQkKHRoaXMpLnByb3AoJ2NoZWNrZWQnLCBmYWxzZSk7XHRcclxuXHR9KTtcdFxyXG59XHJcbnVuY2hlY2tBbGwoKTtcclxuXHJcbi8qXHJcbnwtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG58IEZVTkNUSU9OU1xyXG58LS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuKi9cclxuXHJcbmRlbGV0ZVJlY29yZCA9IGZ1bmN0aW9uKGlkLCByb3V0ZSwgYmlndGV4dCwgc21hbGx0ZXh0KSB7XHJcblx0c3dhbCh7XHJcblx0XHR0aXRsZTogYmlndGV4dCxcclxuXHRcdHRleHQ6IHNtYWxsdGV4dCxcclxuXHRcdHR5cGU6ICd3YXJuaW5nJyxcclxuXHRcdHNob3dDYW5jZWxCdXR0b246IHRydWUsXHJcblx0XHRjb25maXJtQnV0dG9uQ29sb3I6ICcjMzA4NWQ2JyxcclxuXHRcdGNhbmNlbEJ1dHRvbkNvbG9yOiAnI2QzMycsXHJcblx0XHRjb25maXJtQnV0dG9uVGV4dDogJ0VMSU1JTkFSJyxcclxuXHRcdGNhbmNlbEJ1dHRvblRleHQ6ICdDYW5jZWxhcicsXHJcblx0XHRjb25maXJtQnV0dG9uQ2xhc3M6ICdidG4gYnRuR3JlZW4nLFxyXG5cdFx0Y2FuY2VsQnV0dG9uQ2xhc3M6ICdidG4gYnRuUmVkJyxcclxuXHRcdGJ1dHRvbnNTdHlsaW5nOiBmYWxzZVxyXG5cdH0pLnRoZW4oZnVuY3Rpb24gKCkge1xyXG5cclxuIFx0XHQkLmFqYXgoe1xyXG5cdFx0XHR1cmw6IHJvdXRlLFxyXG5cdFx0XHRtZXRob2Q6ICdQT1NUJywgICAgICAgICAgICAgXHJcblx0XHRcdGRhdGFUeXBlOiAnSlNPTicsXHJcblx0XHRcdGRhdGE6IHsgaWQ6IGlkIH0sXHJcblx0XHRcdGJlZm9yZVNlbmQ6IGZ1bmN0aW9uKCl7XHJcblx0XHRcdFx0Ly8gJCgnI01haW4tTG9hZGVyJykucmVtb3ZlQ2xhc3MoJ0hpZGRlbicpO1xyXG5cdFx0XHR9LFxyXG5cdFx0XHRzdWNjZXNzOiBmdW5jdGlvbihkYXRhKXtcclxuXHRcdFx0XHQkKCcjQmF0Y2hEZWxldGVCdG4nKS5hZGRDbGFzcygnSGlkZGVuJyk7XHJcblx0XHRcdFx0aWYgKGRhdGEuc3VjY2VzcyA9PSB0cnVlKSB7XHJcblx0XHRcdFx0XHQkKCcjSWQnK2lkKS5oaWRlKDIwMCk7XHJcblx0XHRcdFx0XHRmb3IoaT0wOyBpIDwgaWQubGVuZ3RoIDsgaSsrKXtcclxuXHRcdFx0XHRcdFx0JCgnI0lkJytpZFtpXSkuaGlkZSgyMDApO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0YWxlcnRfb2soJ09rIScsJ0VsaW1pbmFjacOzbiBjb21wbGV0YScpO1xyXG5cdFx0XHRcdFx0Y29uc29sZS5sb2coZGF0YSk7XHJcblx0XHRcdFx0XHRyZXR1cm4gdHJ1ZTtcclxuXHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0YWxlcnRfZXJyb3IoJ1VwcyEnLCdIYSBvY3VycmlkbyB1biBlcnJvciAoUHVlZGUgcXVlIGVzdGUgcmVnaXN0cm8gdGVuZ2EgcmVsYWNpw7NuIGNvbiBvdHJvcyBpdGVtcyBlbiBlbCBzaXN0ZW1hKS4gRGViZSBlbGltaW5hciBwcmltZXJvIGxvcyBtaXNtb3MuJyk7XHJcblx0XHRcdFx0XHRjb25zb2xlLmxvZyhkYXRhKTtcclxuXHRcdFx0XHRcdHJldHVybiBmYWxzZTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH0sXHJcblx0XHRcdGVycm9yOiBmdW5jdGlvbihkYXRhKVxyXG5cdFx0XHR7XHJcbiAgICAgICAgICAgICAgICAkKCcjRXJyb3InKS5odG1sKGRhdGEucmVzcG9uc2VUZXh0KTtcclxuXHRcdFx0XHRjb25zb2xlLmxvZyhkYXRhKTtcdFxyXG5cdFx0XHR9LFxyXG5cdFx0XHRjb21wbGV0ZTogZnVuY3Rpb24oKVxyXG5cdFx0XHR7XHJcblx0XHRcdFx0Ly8gJCgnI01haW4tTG9hZGVyJykuYWRkQ2xhc3MoJ0hpZGRlbicpO1xyXG5cdFx0XHR9XHJcblx0XHR9KTtcclxuXHR9KTtcclxuXHJcbn1cclxuXHJcbmRlbGV0ZUFuZFJlbG9hZCA9IGZ1bmN0aW9uKGlkLCByb3V0ZSwgYmlndGV4dCwgc21hbGx0ZXh0KSB7XHJcblx0c3dhbCh7XHJcblx0XHR0aXRsZTogYmlndGV4dCxcclxuXHRcdHRleHQ6IHNtYWxsdGV4dCxcclxuXHRcdHR5cGU6ICd3YXJuaW5nJyxcclxuXHRcdHNob3dDYW5jZWxCdXR0b246IHRydWUsXHJcblx0XHRjb25maXJtQnV0dG9uQ29sb3I6ICcjMzA4NWQ2JyxcclxuXHRcdGNhbmNlbEJ1dHRvbkNvbG9yOiAnI2QzMycsXHJcblx0XHRjb25maXJtQnV0dG9uVGV4dDogJ0VMSU1JTkFSJyxcclxuXHRcdGNhbmNlbEJ1dHRvblRleHQ6ICdDYW5jZWxhcicsXHJcblx0XHRjb25maXJtQnV0dG9uQ2xhc3M6ICdidG4gYnRuR3JlZW4nLFxyXG5cdFx0Y2FuY2VsQnV0dG9uQ2xhc3M6ICdidG4gYnRuUmVkJyxcclxuXHRcdGJ1dHRvbnNTdHlsaW5nOiBmYWxzZVxyXG5cdH0pLnRoZW4oZnVuY3Rpb24gKCkge1xyXG5cdFx0JC5hamF4KHtcclxuXHRcdFx0dXJsOiByb3V0ZSxcclxuXHRcdFx0bWV0aG9kOiAnUE9TVCcsICAgICAgICAgICAgIFxyXG5cdFx0XHRkYXRhVHlwZTogJ0pTT04nLFxyXG5cdFx0XHRkYXRhOiB7IGlkOiBpZCB9LFxyXG5cdFx0XHRiZWZvcmVTZW5kOiBmdW5jdGlvbigpe1xyXG5cdFx0XHRcdC8vICQoJyNNYWluLUxvYWRlcicpLnJlbW92ZUNsYXNzKCdIaWRkZW4nKTtcclxuXHRcdFx0fSxcclxuXHRcdFx0c3VjY2VzczogZnVuY3Rpb24oZGF0YSl7XHJcblx0XHRcdFx0JCgnI0JhdGNoRGVsZXRlQnRuJykuYWRkQ2xhc3MoJ0hpZGRlbicpO1xyXG5cdFx0XHRcdGlmIChkYXRhLnN1Y2Nlc3MgPT0gdHJ1ZSkge1xyXG5cdFx0XHRcdFx0Ly8gYWxlcnRfb2soJ09rIScsJ0VsaW1pbmFjacOzbiBjb21wbGV0YScpO1xyXG5cdFx0XHRcdFx0bG9jYXRpb24ucmVsb2FkKCk7XHJcblx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdGFsZXJ0X2Vycm9yKCdVcHMhJywnSGEgb2N1cnJpZG8gdW4gZXJyb3IgKFB1ZWRlIHF1ZSBlc3RlIHJlZ2lzdHJvIHRlbmdhIHJlbGFjacOzbiBjb24gb3Ryb3MgaXRlbXMgZW4gZWwgc2lzdGVtYSkuIERlYmUgZWxpbWluYXIgcHJpbWVybyBsb3MgbWlzbW9zLicpO1xyXG5cdFx0XHRcdFx0Y29uc29sZS5sb2coZGF0YSk7XHJcblx0XHRcdFx0XHRyZXR1cm4gZmFsc2U7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9LFxyXG5cdFx0XHRlcnJvcjogZnVuY3Rpb24oZGF0YSlcclxuXHRcdFx0e1xyXG5cdFx0XHRcdCQoJyNFcnJvcicpLmh0bWwoZGF0YS5yZXNwb25zZVRleHQpO1xyXG5cdFx0XHRcdGNvbnNvbGUubG9nKGRhdGEpO1x0XHJcblx0XHRcdH1cclxuXHRcdH0pO1xyXG5cdH0pO1xyXG5cclxufVxyXG5cclxuLypcclxufC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbnwgQUxFUlRTXHJcbnwtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4qL1xyXG5cclxuZnVuY3Rpb24gYWxlcnRfb2soYmlndGV4dCwgc21hbGx0ZXh0KXtcclxuICAgIHN3YWwoXHJcbiAgICAgICAgYmlndGV4dCxcclxuICAgICAgICBzbWFsbHRleHQsXHJcbiAgICAgICAgJ3N1Y2Nlc3MnXHJcbiAgICApOyAgICBcclxufVxyXG4gICAgXHJcbmZ1bmN0aW9uIGFsZXJ0X2Vycm9yKGJpZ3RleHQsIHNtYWxsdGV4dCl7XHJcbiAgICBzd2FsKFxyXG4gICAgICAgIGJpZ3RleHQsXHJcbiAgICAgICAgc21hbGx0ZXh0LFxyXG4gICAgICAgICdlcnJvcidcclxuICAgICk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGFsZXJ0X2luZm8oYmlndGV4dCwgc21hbGx0ZXh0KXtcclxuXHJcbiAgICBzd2FsKHtcclxuICAgICAgICAgICAgdGl0bGU6IGJpZ3RleHQsXHJcbiAgICAgICAgdHlwZTogJ2luZm8nLFxyXG4gICAgICAgIGh0bWw6IHNtYWxsdGV4dCxcclxuICAgICAgICBzaG93Q2xvc2VCdXR0b246IHRydWUsXHJcbiAgICAgICAgc2hvd0NhbmNlbEJ1dHRvbjogZmFsc2UsXHJcbiAgICAgICAgY29uZmlybUJ1dHRvblRleHQ6XHJcbiAgICAgICAgICAgICc8aSBjbGFzcz1cImlvbi1jaGVja21hcmstcm91bmRcIj48L2k+IE9rISdcclxuICAgICAgICB9KTtcclxufVxyXG5cclxuXHJcbmZ1bmN0aW9uIGNsb3NlUGFyZW50KCl7XHJcblx0JCh0aGlzKS5wYXJlbnQoJ2hpZGUnKTtcclxufVxyXG5cclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vcmVzb3VyY2VzL2Fzc2V0cy9qcy92YWRtaW4tZnVuY3Rpb25zLmpzIl0sInNvdXJjZVJvb3QiOiIifQ==