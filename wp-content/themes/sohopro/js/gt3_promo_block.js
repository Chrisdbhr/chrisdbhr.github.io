"use strict";

jQuery(document).ready(function(){
	jQuery('.gt3_promo_block_wrapper').each(function(){
		var set_num = 0,
			set_margin = parseInt(jQuery(this).attr('data-margin'))/2;
		jQuery(this).append('<div class="gt3_promo_block_content"></div>');
		jQuery(this).find('.gt3_promo_block_item').each(function(){
			var set_href = jQuery(this).attr('data-link'),
				set_target = jQuery(this).attr('data-target'),
				set_title = jQuery(this).attr('data-title');
			set_num++;
			if (set_num == 1) {
				var cur_class = 'current_promo_link ';
			} else {
				var cur_class = '';
			}
			jQuery(this).parents('.gt3_promo_block_wrapper').find('.gt3_promo_block_content').append('<a href="'+ set_href +'" class="gt3_promo_block_link '+ cur_class +'gt3_promo_block_link'+ set_num +'" data-count="'+ set_num +'" target="'+ set_target +'" style="margin:'+ set_margin +'px 0;">'+ set_title +'</a><br>');
			jQuery(this).addClass('gt3_promo_block_item'+set_num).attr('data-count', set_num);			
		});
	});
	jQuery('.gt3_promo_block_item1').addClass('current_promo_block');
});

jQuery(document).on('mouseenter', '.gt3_promo_block_link', function(){
	jQuery(this).parents('.gt3_promo_block_wrapper').find('.current_promo_link').removeClass('current_promo_link');
	jQuery(this).parents('.gt3_promo_block_wrapper').find('.current_promo_block').removeClass('current_promo_block');
	jQuery(this).parents('.gt3_promo_block_wrapper').find('.gt3_promo_block_item' + jQuery(this).attr('data-count')).addClass('current_promo_block');
	jQuery(this).addClass('current_promo_link');
});