var html = jQuery('html'),
	base_wrapper = jQuery('.port_half_single_wrapper'),
	left_part = jQuery('.port_half_single_left'),
	right_part = jQuery('.port_half_single_right');
var lastChange = +new Date();
	
jQuery(document).ready(function(){
	side2side_port_setup();

	if (myWindow.width() > 760) {
		myWindow.on('scroll', function(){
			check_fixed_parts(myWindow.scrollTop());
			if (jQuery('#wpadminbar').size() > 0) {
				var check_height = jQuery('.header_tagline').height(),
					setFixedTop = -1*jQuery('.header_tagline').height() + jQuery('#wpadminbar').height(),
					setDefTop = jQuery('#wpadminbar').height();
			} else {
				var check_height = jQuery('.header_tagline').height(),
					setFixedTop = -1*jQuery('.header_tagline').height(),
					setDefTop = 0;
			}
			if (myWindow.scrollTop() >= check_height) {
				jQuery('html').addClass('header_fixed');
				jQuery('.simple_sticky').css('top', setFixedTop+'px');
			} else {
				jQuery('html').removeClass('header_fixed');
				jQuery('.simple_sticky').css('top', '0px');
			}
		});
	}
});

jQuery(window).resize(function(){
	side2side_port_setup();
});

jQuery(window).load(function(){
	side2side_port_setup();
});

function side2side_port_setup() {
	if (jQuery('.port_half_title_wrapper').size() > 0) {
		jQuery('.port_half_title_wrapper').height(jQuery('.port_half_title_wrapper').width());
	}
	if (jQuery('.featured_video_wrapper').size() > 0) {
		jQuery('.featured_video_wrapper').height(jQuery('.featured_video_wrapper').width());
		jQuery('.half_port_pf_wrapper').height(jQuery('.featured_video_wrapper').width());
	}

	jQuery('.gt3_stick_this_part').removeClass('gt3_stick_this_part');
	jQuery('.gt3_scrolled_part').removeClass('gt3_scrolled_part');
	
	check_fixed_parts(myWindow.scrollTop());
}

function check_fixed_parts(currentTop) {
	var start_height = jQuery('header.main_header').height(),
		end_height = start_height + base_wrapper.height() - myWindow.height();
	if (jQuery('#wpadminbar').size() > 0) {
		start_height = start_height;
		end_height = end_height + jQuery('#wpadminbar').height();
	}
	
	if (currentTop > start_height && currentTop < end_height) {
		if (left_part.height() < base_wrapper.height()) {
			if (left_part.height() < myWindow.height()) {
				if (jQuery('#wpadminbar').size() > 0) {
					var set_top = currentTop - start_height;
				} else {
					var set_top = currentTop - start_height;
				}
			} else {
				var ratio1 = (base_wrapper.height() - left_part.height())/(end_height - start_height);
				var set_top = (currentTop - start_height)*ratio1;				
			}
			left_part.css('padding-top', set_top + 'px');
		}
		if (right_part.height() < base_wrapper.height()) {
			if (right_part.height() < myWindow.height()) {
				if (jQuery('#wpadminbar').size() > 0) {
					var set_top = currentTop - start_height;
				} else {
					var set_top = currentTop - start_height;
				}
			} else {
				var ratio1 = (base_wrapper.height() - right_part.height())/(end_height - start_height);
				var set_top = (currentTop - start_height)*ratio1;
			}
			right_part.css('padding-top', set_top + 'px');
		}
	}
	if (currentTop >= end_height) {
		var check_left_height = left_part.height() + parseInt(left_part.css('padding-top')),
			check_right_height = right_part.height() + parseInt(right_part.css('padding-top'));

		if (check_left_height <= base_wrapper.height() && left_part.height() < myWindow.height()) {
			if (jQuery('#wpadminbar').size() > 0) {
				var set_top = currentTop - start_height;
			} else {
				var set_top = currentTop - start_height;
			}
			var recheck_left_height = left_part.height() + set_top;
			if (recheck_left_height > base_wrapper.height()) {
				set_top = base_wrapper.height() - left_part.height();
			}
			left_part.css('padding-top', set_top + 'px');
		} 
		
		if (check_right_height <= base_wrapper.height()  && right_part.height() < myWindow.height()) {
			if (jQuery('#wpadminbar').size() > 0) {
				var set_top = currentTop - start_height;
			} else {
				var set_top = currentTop - start_height;
			}
			var recheck_right_height = right_part.height() + set_top;
			if (recheck_right_height > base_wrapper.height()) {
				set_top = base_wrapper.height() - right_part.height();
			}
			right_part.css('padding-top', set_top + 'px');
		} 

	}
	if (currentTop <= start_height) {
		left_part.css('padding-top', '0px');
		right_part.css('padding-top', '0px');
	}
}