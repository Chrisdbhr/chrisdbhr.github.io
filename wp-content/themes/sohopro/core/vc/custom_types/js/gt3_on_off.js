!function($) {
	jQuery(".gt3_radio_toggle_cont").each(function () {
		var cur_val = jQuery(this).find('.gt3_checkbox_value').val();
		if (cur_val == '') {
			jQuery(this).find(".gt3_radio_toggle_mirage").removeClass("not_checked").addClass("checked");
			jQuery('.gt3_checkbox_value').val('on');
		} else {
			if (cur_val == 'on') {
				jQuery(this).find(".gt3_radio_toggle_mirage").removeClass("not_checked").addClass("checked");
			} else {
				jQuery(this).find(".gt3_radio_toggle_mirage").removeClass("checked").addClass("not_checked");
			}
		}
	});
}(window.jQuery);