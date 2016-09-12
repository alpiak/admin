/**

origin usage:

	http://mindmup.github.io/editable-table/

added usage:

	set the identifier:
	$('#table').editableTableWidget({
		editor: $('<textarea>'),
		identifier: "text"
	});

**/

/*global $, window*/
$.fn.editableTableWidget = function (options) {
	'use strict';
	return $(this).each(function () {
		var buildDefaultOptions = function () {
				var opts = $.extend({}, $.fn.editableTableWidget.defaultOptions);
				opts.editor = opts.editor.clone();
				return opts;
			},
			activeOptions = $.extend(buildDefaultOptions(), options),
			ARROW_LEFT = 37, ARROW_UP = 38, ARROW_RIGHT = 39, ARROW_DOWN = 40, ENTER = 13, ESC = 27, TAB = 9,
			element = $(this).parent().parent().parent(),
			editor = activeOptions.editor.css('position', 'absolute').hide().appendTo(element.parent()),
			identifier = activeOptions.identifier,
			active = $(this),
			showEditor = function (select) {
				if (active.length) {
					if (editor[0].tagName.toLowerCase() === "input" ||
						editor[0].tagName.toLowerCase() === "textarea") {
						editor.val(active.text());
					} else if (editor[0].tagName.toLowerCase() === "select") {
						editor.val(active.text());
					}
					editor.removeClass('error')
						.show()
						.offset(active.offset())
						.css(active.css(activeOptions.cloneProperties))
						.width(active.width())
						.height(active.height())
						.focus();
					if (select) {
						editor.select();
					}
				}
			},
			setActiveText = function () {
				var evt = $.Event('change'),
					originalContent;
				if (editor[0].tagName.toLowerCase() === "input" ||
					editor[0].tagName.toLowerCase() === "textarea") {
					var text = editor.val();	
				} else if (editor[0].tagName.toLowerCase() === "select") {
					var text = editor.val();
				}
				if (active.text() === text || editor.hasClass('error')) {
					return true;
				}
				originalContent = active.html();
				if (active.children().size() === 0) {
					active.text(text).trigger(evt, text);
				} else {
					active.children().text(text).trigger(evt, text);
				}
				if (evt.result === false) {
					active.html(originalContent);
				}
			},
			movement = function (element, keycode) {
				if (keycode === ARROW_RIGHT) {
					return element.next('td');
				} else if (keycode === ARROW_LEFT) {
					return element.prev('td');
				} else if (keycode === ARROW_UP) {
					return element.parent().prev().children().eq(element.index());
				} else if (keycode === ARROW_DOWN) {
					return element.parent().next().children().eq(element.index());
				}
				return [];
			};
		editor.blur(function () {
			setActiveText();
		}).keydown(function (e) {
			if (e.which === ENTER) {
				setActiveText();
				editor.next().focus();
				e.preventDefault();
				e.stopPropagation();
			} else if (e.which === ESC) {
				editor.val(active.text());
				e.preventDefault();
				e.stopPropagation();
			} else if (e.which === TAB) {
				editor.next().focus();
			} else if (this.selectionEnd - this.selectionStart === this.value.length) {
				var possibleMove = movement(active, e.which);
				if (possibleMove.length > 0) {
					possibleMove.focus();
					e.preventDefault();
					e.stopPropagation();
				}
			}
		})
		.on('input paste', function () {
			var evt = $.Event('validate');
			active.trigger(evt, editor.val());
			if (evt.result === false) {
				editor.addClass('error');
			} else {
				editor.removeClass('error');
			}
		});
		element.css('cursor', 'pointer')
		.keydown(function (e) {
			var prevent = true,
				possibleMove = movement($(e.target), e.which);
			if (possibleMove.length > 0) {
				possibleMove.focus();
			} else if (e.which === ENTER) {
				showEditor(false);
			} else if (e.which === 17 || e.which === 91 || e.which === 93) {
				showEditor(true);
				prevent = false;
			} else {
				prevent = false;
			}
			if (prevent) {
				e.stopPropagation();
				e.preventDefault();
			}
		});

		element.find('td').prop('tabindex', 1);

		$(window).on('resize', function () {
			if (editor.is(':visible')) {
				editor.offset(active.offset())
				.width(active.width())
				.height(active.height());
			}
		});
		showEditor();
	});

};
$.fn.editableTableWidget.defaultOptions = {
	cloneProperties: ['padding', 'padding-top', 'padding-bottom', 'padding-left', 'padding-right',
					  'text-align', 'font', 'font-size', 'font-family', 'font-weight',
					  'border', 'border-top', 'border-bottom', 'border-left', 'border-right'],
	editor: $('<input>')
};

