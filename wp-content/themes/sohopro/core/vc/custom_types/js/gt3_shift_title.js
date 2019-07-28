!function($) {
	jQuery('.gt3_elpos_block').each(function() {
		var base_val = jQuery(this).find('.gt3_elpos_value_base').val(),
			left_val = base_val.split('+')[0],
			right_val = base_val.split('+')[1];
			if (left_val == '') {
				jQuery(this).find(".gt3_elpos_inner_left .left_top").attr("checked", "checked");
				jQuery(this).find('.gt3_elpos_value_left').val('left_top');
				left_val = 'left_top';
			} else {
				jQuery(this).find('.gt3_elpos_inner_left .gt3_elpos_el').removeAttr("checked");
				jQuery(this).find('.gt3_elpos_inner_left .'+left_val).attr("checked", "checked");				
			}
			if (right_val == '') {
				jQuery(this).find(".gt3_elpos_inner_right .right_top").attr("checked", "checked");
				jQuery(this).find('.gt3_elpos_value_right').val('right_top');
				right_val = 'right_top';				
			} else {
				jQuery(this).find('.gt3_elpos_inner_right .gt3_elpos_el').removeAttr("checked");
				jQuery(this).find('.gt3_elpos_inner_right .'+right_val).attr("checked", "checked");
			}
			jQuery(this).find('.gt3_elpos_value_base').val(left_val+'+'+right_val);
	});
}(window.jQuery);

jQuery(document).on("click", ".gt3_elpos_el", function () {
	var parent_block = jQuery(this).parents('.gt3_elpos_block');
	if (jQuery(this).parent('.gt3_elpos_inner').hasClass('gt3_elpos_inner_left')) {
		parent_block.find('.gt3_elpos_value_left').val(jQuery(this).val());
	}
	if (jQuery(this).parent('.gt3_elpos_inner').hasClass('gt3_elpos_inner_right')) {
		parent_block.find('.gt3_elpos_value_right').val(jQuery(this).val());
	}
	var base_val = parent_block.find('.gt3_elpos_value_left').val() + '+' + parent_block.find('.gt3_elpos_value_right').val();
	parent_block.find('.gt3_elpos_value_base').val(base_val);
});	
