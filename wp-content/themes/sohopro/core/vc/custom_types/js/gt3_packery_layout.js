!function($) {
	jQuery(".gt3_packery_ls_cont").each(function () {
		jQuery(this).find(".checked").removeClass('checked');
		var cur_val = jQuery(this).find('.gt3_packery_ls_value').val();
		if (cur_val == '') {
			jQuery(this).find(".gt3_packery_ls_item:first").addClass("checked");
			jQuery('.gt3_packery_ls_value').val('pls_3items');
		} else {
			jQuery(this).find('.'+cur_val).addClass('checked');
		}
	});
}(window.jQuery);