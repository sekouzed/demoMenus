import animate;

import ui.View as View;

import src.constants.menuConstants as menuConstants;

import .components.BoxBorderView as BoxBorderView;
import .components.BoxDialogView as BoxDialogView;
import .components.ButtonView as ButtonView;
import .components.DialogView as DialogView;

exports = Class(DialogView, function (supr) {
	this.init = function (opts) {
		// Get the height from opts before the super init is executed!
		var width = opts.width || GC.app.baseWidth - 80;
		var height = opts.height || 400;

		supr(this, 'init', arguments);

		var contentStyle = menuConstants.CONTENT;

		// The dialog containing the actual content...
		this._dialogView = new BoxDialogView({
			superview: this._dialogContainerView,
			x: (GC.app.baseWidth - width) * 0.5,
			y: (GC.app.baseHeight - height) * 0.5,
			width: width,
			height: height,
			fontFamily: contentStyle.FONT_FAMILY,
			fontSize: contentStyle.FONT_SIZE,
			textPadding: contentStyle.PADDING,
			text: opts.text,
			title: opts.title,
			closeCB: bind(this, 'hide', opts.closeCB)
		});
		this._dialogView.text.updateOpts({
			wrap: true,
			x: 10,
			y: 80,
			width: this._dialogView.style.width - 20,
			height: height - 164
		});

		this._dialogView.content = new BoxBorderView({
			superview: this._dialogView,
			x: 10,
			y: 80,
			image: contentStyle.BACKGROUND,
			width: this._dialogView.style.width - 20,
			height: height - 164,
			zIndex: -1
		});

		var buttons =  opts.buttons;

		this.buttons = [];

		// Calculate the total width of the buttons...
		var width = -10;
		for (var i = 0; i < buttons.length; i++) {
			width += buttons[i].width + 10;
		}
		var x = (this._dialogView.style.width - width) * 0.5;

		for (var i = 0; i < buttons.length; i++) {
			bind(
				this,
				function (button) {
					new ButtonView({
						superview: this._dialogView,
						x: x,
						y: height - 74,
						width: button.width,
						height: 64,
						title: button.title,
						style: button.style || 'BLUE',
						on: {
							up: bind(this, 'hide', button.cb)
						}
					});
					x += button.width + 10;
				}
			)(buttons[i]);
		}
	};

	this.setTitle = function (text) {
		this._dialogView.title.setText(text);
	};

	this.setText = function (text) {
		this._dialogView.text.setText(text);
	};
});