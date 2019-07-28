/* Shift Slider 1.6.10.04 */

var	html = jQuery('html'),
	shift_gallery_wrapper = jQuery('.shift_gallery_wrapper'),
	shift_gallery = jQuery('.shift_gallery'),
	shift_wrapper_act, shift_gallery_act,
	shift_slide = jQuery('.shift_slide'),
	shift_gal_array = [];
	var counter = 0;

if (jQuery('.shift_gallery_wrapper').size() > 0) {
	jQuery(document.documentElement).keydown(function (event) {
		if (jQuery('.hovered_shift_module').size() > 0) {
			if ((event.keyCode == 40)) {
				event.preventDefault();
			}
			if ((event.keyCode == 38)) {
				event.preventDefault();
			}
			if ((event.keyCode == 37)) {
				event.preventDefault();
			}
			if ((event.keyCode == 39)) {
				event.preventDefault();
			}
		}
	});
	jQuery(document.documentElement).keyup(function (event) {
		if ((event.keyCode == 40)) {
			if (jQuery('.hovered_shift_module').size() > 0) {
				event.preventDefault();
				shift_nextSlide(jQuery('.hovered_shift_module').attr('data-uniqid'));
			}
		}
		if ((event.keyCode == 38)) {
			if (jQuery('.hovered_shift_module').size() > 0) {
				event.preventDefault();
				shift_prevSlide(jQuery('.hovered_shift_module').attr('data-uniqid'));
			}
		}
		if ((event.keyCode == 37)) {
			if (jQuery('.hovered_shift_module').size() > 0) {
				event.preventDefault();
				shift_wrapper_act = jQuery('.hovered_shift_module');
				if (!shift_wrapper_act.hasClass('now_animate') && shift_wrapper_act.attr('data-expand') == 'on') {				
					if (!shift_wrapper_act.hasClass('fullview')) {
						slider_id = shift_wrapper_act.attr('data-uniqid');
						clearInterval(shift_gal_array['shift_' + slider_id].set_interval);
						shift_wrapper_act.find('.shift_odd_current').addClass('slide_fullview');
						shift_wrapper_act.addClass('fullview');
					} else {
						slider_id = shift_wrapper_act.attr('data-uniqid');		
						if (shift_wrapper_act.attr('data-autoplay') == 'on') {
							shift_gal_array['shift_' + slider_id].set_interval = setInterval('shift_nextSlide('+ slider_id +')', shift_wrapper_act.attr('data-interval'));
						}						
						shift_wrapper_act.find('.shift_even_current').removeClass('slide_fullview');
						shift_wrapper_act.find('.shift_odd_current').removeClass('slide_fullview');
						shift_wrapper_act.removeClass('fullview');
					}
				}
			}
		}
		if ((event.keyCode == 39)) {
			if (jQuery('.hovered_shift_module').size() > 0) {
				event.preventDefault();
				shift_wrapper_act = jQuery('.hovered_shift_module');
				if (!shift_wrapper_act.hasClass('now_animate') && shift_wrapper_act.attr('data-expand') == 'on') {
					if (!shift_wrapper_act.hasClass('fullview')) {
						slider_id = shift_wrapper_act.attr('data-uniqid');
						clearInterval(shift_gal_array['shift_' + slider_id].set_interval);
						shift_wrapper_act.find('.shift_even_current').addClass('slide_fullview');
						shift_wrapper_act.addClass('fullview');
					} else {
						slider_id = shift_wrapper_act.attr('data-uniqid');
						if (shift_wrapper_act.attr('data-autoplay') == 'on') {
							shift_gal_array['shift_' + slider_id].set_interval = setInterval('shift_nextSlide('+ slider_id +')', shift_wrapper_act.attr('data-interval'));
						}
						shift_wrapper_act.find('.shift_even_current').removeClass('slide_fullview');
						shift_wrapper_act.find('.shift_odd_current').removeClass('slide_fullview');
						shift_wrapper_act.removeClass('fullview');
					}
				}
			}
		}
	});
}
	
jQuery(document).ready(function ($) {
	shift_gallery_wrapper.each(function(){
		shift_gal_array['shift_' + jQuery(this).attr('data-uniqid')] = {};
		shift_gal_array['shift_' + jQuery(this).attr('data-uniqid')].id = jQuery(this).attr('data-uniqid');
		shift_gal_array['shift_' + jQuery(this).attr('data-uniqid')].autoplay = jQuery(this).attr('data-autoplay');
		shift_gal_array['shift_' + jQuery(this).attr('data-uniqid')].set_interval = setInterval('shift_nextSlide('+ jQuery(this).attr('data-uniqid') +')', jQuery(this).attr('data-interval'));
		if (jQuery(this).attr('data-autoplay') == 'off') {
			clearInterval(shift_gal_array['shift_' + jQuery(this).attr('data-uniqid')].set_interval);
		}
		shift_gal_array['shift_' + jQuery(this).attr('data-uniqid')].ready_state = false;
		shift_gal_array['shift_' + jQuery(this).attr('data-uniqid')].full_loaded = false;
	});

	setup_shift_gallery('all');
	jQuery('.shift_btn_prev').on('click', function () {
		slideObj = jQuery(this).parents('.shift_gallery_wrapper').attr('data-uniqid');
		shift_prevSlide(slideObj);
	});
	jQuery('.shift_btn_next').on('click', function () {
		slideObj = jQuery(this).parents('.shift_gallery_wrapper').attr('data-uniqid');
		shift_nextSlide(slideObj);
	});

	shift_gallery_wrapper.on('mouseenter', function(){
		jQuery(this).addClass('hovered_shift_module');
	}).on('mouseleave', function(){
		jQuery(this).removeClass('hovered_shift_module');
	})

	//Touch Events
	/*shift_gallery.on("swipeleft", function () {
		if (!shift_gallery_wrapper.hasClass('fullview')) {
			jQuery('.shift_even_current').addClass('slide_fullview');
			shift_gallery_wrapper.addClass('fullview');
		} else {
			jQuery('.shift_even_current').removeClass('slide_fullview');
			jQuery('.shift_odd_current').removeClass('slide_fullview');
			shift_gallery_wrapper.removeClass('fullview');
		}
	});
	shift_gallery.on("swiperight", function () {
		if (!shift_gallery_wrapper.hasClass('fullview')) {
			jQuery('.shift_odd_current').addClass('slide_fullview');
			shift_gallery_wrapper.addClass('fullview');
		} else {
			jQuery('.shift_even_current').removeClass('slide_fullview');
			jQuery('.shift_odd_current').removeClass('slide_fullview');
			shift_gallery_wrapper.removeClass('fullview');
		}
	});
	shift_gallery.on("swipeup", function () {
		shift_nextSlide();
	});
	shift_gallery.on("swipedown", function () {
		shift_prevSlide();
	});*/
});

jQuery(window).resize(function () {
	setup_shift_gallery('all');
});

jQuery(document).on("click", ".shift_slide", function() {
	shift_wrapper_act = jQuery(this).parents('.shift_gallery_wrapper');
	if (!shift_wrapper_act.hasClass('now_animate') && shift_wrapper_act.attr('data-expand') == 'on') {
		jQuery(this).toggleClass('slide_fullview');	
		shift_wrapper_act.toggleClass('fullview');
		if (jQuery(this).hasClass('slide_fullview')) {
			slider_id = shift_wrapper_act.attr('data-uniqid');
			clearInterval(shift_gal_array['shift_' + slider_id].set_interval);
		} else {
			slider_id = shift_wrapper_act.attr('data-uniqid');		
			if (shift_wrapper_act.attr('data-autoplay') == 'on') {
				shift_gal_array['shift_' + slider_id].set_interval = setInterval('shift_nextSlide('+ slider_id +')', shift_wrapper_act.attr('data-interval'));
			}			
		}
	}
});

function shift_prevSlide(slider_id) {
	shift_wrapper_act = jQuery('.shift_gal_'+slider_id);	
	if (!shift_wrapper_act.hasClass('fullview') && !shift_wrapper_act.hasClass('now_animate')) {
		even_max_slide = shift_wrapper_act.find('.even_slide').size();
		odd_max_slide = shift_wrapper_act.find('.odd_slide').size();

		if (even_max_slide < 5 && odd_max_slide < 5) {
			shift_wrapper_act.find('.shift_gallery').addClass('prev_power');
		}
		cur_slide_even = parseInt(shift_wrapper_act.find('.shift_even_current').attr('data-count'));
		cur_slide_odd = parseInt(shift_wrapper_act.find('.shift_odd_current').attr('data-count'));
	
		cur_slide_even--;
		cur_slide_odd--;

		if (shift_wrapper_act.attr('data-infinity') == 'off') {
			shift_wrapper_act.removeClass('reached_top');
			shift_wrapper_act.removeClass('reached_bottom');
			if (cur_slide_even >= even_max_slide && cur_slide_odd >= odd_max_slide) {
				shift_wrapper_act.addClass('reached_bottom');
			}
			if (cur_slide_even <= 1 && cur_slide_odd <= 1) {
				shift_wrapper_act.addClass('reached_top');
			}
		}
		
		if (shift_wrapper_act.attr('data-infinity') == 'on') {
			if (cur_slide_even > even_max_slide) cur_slide_even = 1;
			if (cur_slide_even < 1) cur_slide_even = even_max_slide;
		
			if (cur_slide_odd > odd_max_slide) cur_slide_odd = 1;
			if (cur_slide_odd < 1) cur_slide_odd = odd_max_slide;
		} else {
			if (cur_slide_even > even_max_slide) cur_slide_even = even_max_slide;
			if (cur_slide_even < 1) cur_slide_even = 1;
		
			if (cur_slide_odd > odd_max_slide) cur_slide_odd = odd_max_slide;
			if (cur_slide_odd < 1) cur_slide_odd = 1;			
		}
	
		set_shift_Slide(cur_slide_even, cur_slide_odd, slider_id);
	}
}

function shift_nextSlide(slider_id) {
	shift_wrapper_act = jQuery('.shift_gal_'+slider_id);	
	if (!shift_wrapper_act.hasClass('fullview') && !shift_wrapper_act.hasClass('now_animate')) {
		if (shift_wrapper_act.find('.shift_gallery').hasClass('started')) {
			even_max_slide = shift_wrapper_act.find('.even_slide').size();
			odd_max_slide = shift_wrapper_act.find('.odd_slide').size();
			
			if (even_max_slide < 5 && odd_max_slide < 5) {
				shift_wrapper_act.find('.shift_gallery').addClass('next_power');
			}
			cur_slide_even = parseInt(shift_wrapper_act.find('.shift_even_current').attr('data-count'));
			cur_slide_odd = parseInt(shift_wrapper_act.find('.shift_odd_current').attr('data-count'));
		
			cur_slide_even++;
			cur_slide_odd++;
			if (shift_wrapper_act.attr('data-infinity') == 'off') {
				shift_wrapper_act.removeClass('reached_top');
				shift_wrapper_act.removeClass('reached_bottom');
				if (cur_slide_even >= even_max_slide && cur_slide_odd >= odd_max_slide) {
					shift_wrapper_act.addClass('reached_bottom');
				}
				if (cur_slide_even <= 1 && cur_slide_odd <= 1) {
					shift_wrapper_act.addClass('reached_top');
				}
			}
			
			
			if (shift_wrapper_act.attr('data-infinity') == 'on') {
				if (cur_slide_even > even_max_slide) cur_slide_even = 1;
				if (cur_slide_even < 1) cur_slide_even = even_max_slide;
			
				if (cur_slide_odd > odd_max_slide) cur_slide_odd = 1;
				if (cur_slide_odd < 1) cur_slide_odd = odd_max_slide;
			} else {
				if (cur_slide_even > even_max_slide) cur_slide_even = even_max_slide;
				if (cur_slide_even < 1) cur_slide_even = 1;
			
				if (cur_slide_odd > odd_max_slide) cur_slide_odd = odd_max_slide;
				if (cur_slide_odd < 1) cur_slide_odd = 1;			
			}
		
			set_shift_Slide(cur_slide_even, cur_slide_odd, slider_id);
		} else {
			clearInterval(shift_gal_array['shift_' + slider_id].set_interval);
			shift_gal_array['shift_' + slider_id].set_interval = setInterval('shift_nextSlide('+ slider_id +')', shift_wrapper_act.attr('data-interval'));
		}
	}
}

function set_shift_Slide(slideNumEven, slideNumOdd, slider_id) {
	clearInterval(shift_gal_array['shift_' + slider_id].set_interval);
	shift_wrapper_act = jQuery('.shift_gal_'+slider_id);	
	shift_wrapper_act.find('.shift_gallery').addClass('now_animate');
	slideNumEven = parseInt(slideNumEven);
	slideNumOdd = parseInt(slideNumOdd);
	
	even_max_slide = shift_wrapper_act.find('.even_slide').size();
	odd_max_slide = shift_wrapper_act.find('.odd_slide').size();
	
	if (even_max_slide < 5 && odd_max_slide < 5) {
		shift_wrapper_act.find('.shift_even_prev').removeClass('shift_even_prev');
		shift_wrapper_act.find('.shift_even_current').removeClass('shift_even_current');
		shift_wrapper_act.find('.shift_even_next').removeClass('shift_even_next');

		shift_wrapper_act.find('.shift_odd_prev').removeClass('shift_odd_prev');
		shift_wrapper_act.find('.shift_odd_current').removeClass('shift_odd_current');
		shift_wrapper_act.find('.shift_odd_next').removeClass('shift_odd_next');
		
		var curSlideEven = shift_wrapper_act.find('.even_slide'+slideNumEven);
		var curSlideOdd = shift_wrapper_act.find('.odd_slide'+slideNumOdd);
		curSlideEven.addClass('shift_even_current');
		curSlideOdd.addClass('shift_odd_current');

		//EVEN
		if((parseInt(slideNumEven)+1) > even_max_slide) {
			var nextSlideEven = shift_wrapper_act.find('.even_slide1');
		} else if ((parseInt(slideNumEven)+1) == even_max_slide){
			var nextSlideEven = shift_wrapper_act.find('.even_slide'+even_max_slide);
		} else {
			var nextSlideEven = shift_wrapper_act.find('.even_slide'+(parseInt(slideNumEven)+1));
		}
		
		if((parseInt(slideNumEven)-1) < 1) {
			var prevSlideEven = shift_wrapper_act.find('.even_slide'+even_max_slide);
		} else if ((slideNumEven-1) == 1){
			var prevSlideEven = shift_wrapper_act.find('.even_slide1');
		} else {
			var prevSlideEven = shift_wrapper_act.find('.even_slide'+(parseInt(slideNumEven)-1));
		}

		prevSlideEven.addClass('shift_even_prev');
		nextSlideEven.addClass('shift_even_next');
		
		//ODD
		if((parseInt(slideNumOdd)+1) > odd_max_slide) {
			var nextSlideOdd = shift_wrapper_act.find('.odd_slide1');
		} else if ((parseInt(slideNumOdd)+1) == odd_max_slide){
			var nextSlideOdd = shift_wrapper_act.find('.odd_slide'+odd_max_slide);
		} else {
			var nextSlideOdd = shift_wrapper_act.find('.odd_slide'+(parseInt(slideNumOdd)+1));
		}
		
		if((parseInt(slideNumOdd)-1) < 1) {
			var prevSlideOdd = shift_wrapper_act.find('.odd_slide'+odd_max_slide);
		} else if ((slideNumOdd-1) == 1){
			var prevSlideOdd = shift_wrapper_act.find('.odd_slide1');
		} else {
			var prevSlideOdd = shift_wrapper_act.find('.odd_slide'+(parseInt(slideNumOdd)-1));
		}

		prevSlideOdd.addClass('shift_odd_prev');
		nextSlideOdd.addClass('shift_odd_next');
		
		setTimeout("shift_gallery.removeClass('prev_power')",500);
		setTimeout("shift_gallery.removeClass('next_power')",500);
		
	} else {
		shift_wrapper_act.find('.shift_even_prev2').removeClass('shift_even_prev2');
		shift_wrapper_act.find('.shift_even_prev').removeClass('shift_even_prev');
		shift_wrapper_act.find('.shift_even_current').removeClass('shift_even_current');
		shift_wrapper_act.find('.shift_even_next').removeClass('shift_even_next');
		shift_wrapper_act.find('.shift_even_next2').removeClass('shift_even_next2');

		shift_wrapper_act.find('.shift_odd_prev2').removeClass('shift_odd_prev2');
		shift_wrapper_act.find('.shift_odd_prev').removeClass('shift_odd_prev');
		shift_wrapper_act.find('.shift_odd_current').removeClass('shift_odd_current');
		shift_wrapper_act.find('.shift_odd_next').removeClass('shift_odd_next');
		shift_wrapper_act.find('.shift_odd_next2').removeClass('shift_odd_next2');
		
		var curSlideEven = shift_wrapper_act.find('.even_slide'+slideNumEven);
		var curSlideOdd = shift_wrapper_act.find('.odd_slide'+slideNumOdd);
		curSlideEven.addClass('shift_even_current');
		curSlideOdd.addClass('shift_odd_current');

		//EVEN
		if((parseInt(slideNumEven)+1) > even_max_slide) {
			var nextSlideEven = shift_wrapper_act.find('.even_slide1');
			var nextSlideEven2 = shift_wrapper_act.find('.even_slide2');
		} else if ((parseInt(slideNumEven)+1) == even_max_slide){
			var nextSlideEven = shift_wrapper_act.find('.even_slide'+even_max_slide);
			var nextSlideEven2 = shift_wrapper_act.find('.even_slide1');
		} else {
			var nextSlideEven = shift_wrapper_act.find('.even_slide'+(parseInt(slideNumEven)+1));
			var nextSlideEven2 = shift_wrapper_act.find('.even_slide'+(parseInt(slideNumEven)+2));
		}
		
		if((parseInt(slideNumEven)-1) < 1) {
			var prevSlideEven = shift_wrapper_act.find('.even_slide'+even_max_slide);
			var prevSlideEven2 = shift_wrapper_act.find('.even_slide'+(even_max_slide-1));
		} else if ((slideNumEven-1) == 1){
			var prevSlideEven = shift_wrapper_act.find('.even_slide1');
			var prevSlideEven2 = shift_wrapper_act.find('.even_slide'+even_max_slide);
		} else {
			var prevSlideEven = shift_wrapper_act.find('.even_slide'+(parseInt(slideNumEven)-1));
			var prevSlideEven2 = shift_wrapper_act.find('.even_slide'+(parseInt(slideNumEven)-2));
		}

		prevSlideEven2.addClass('shift_even_prev2');
		prevSlideEven.addClass('shift_even_prev');
		nextSlideEven.addClass('shift_even_next');
		nextSlideEven2.addClass('shift_even_next2');
		
		//ODD
		if((parseInt(slideNumOdd)+1) > odd_max_slide) {
			var nextSlideOdd = shift_wrapper_act.find('.odd_slide1');
			var nextSlideOdd2 = shift_wrapper_act.find('.odd_slide2');
		} else if ((parseInt(slideNumOdd)+1) == odd_max_slide){
			var nextSlideOdd = shift_wrapper_act.find('.odd_slide'+odd_max_slide);
			var nextSlideOdd2 = shift_wrapper_act.find('.odd_slide1');
		} else {
			var nextSlideOdd = shift_wrapper_act.find('.odd_slide'+(parseInt(slideNumOdd)+1));
			var nextSlideOdd2 = shift_wrapper_act.find('.odd_slide'+(parseInt(slideNumOdd)+2));
		}
		
		if((parseInt(slideNumOdd)-1) < 1) {
			var prevSlideOdd = shift_wrapper_act.find('.odd_slide'+odd_max_slide);
			var prevSlideOdd2 = shift_wrapper_act.find('.odd_slide'+(odd_max_slide-1));
		} else if ((slideNumOdd-1) == 1){
			var prevSlideOdd = shift_wrapper_act.find('.odd_slide1');
			var prevSlideOdd2 = shift_wrapper_act.find('.odd_slide'+odd_max_slide);
		} else {
			var prevSlideOdd = shift_wrapper_act.find('.odd_slide'+(parseInt(slideNumOdd)-1));
			var prevSlideOdd2 = shift_wrapper_act.find('.odd_slide'+(parseInt(slideNumOdd)-2));
		}

		prevSlideOdd2.addClass('shift_odd_prev2');
		prevSlideOdd.addClass('shift_odd_prev');
		nextSlideOdd.addClass('shift_odd_next');
		nextSlideOdd2.addClass('shift_odd_next2');		
	}
	setTimeout("shift_gallery.removeClass('now_animate')",300);
	if (shift_wrapper_act.attr('data-autoplay') == 'on') {
		shift_gal_array['shift_' + slider_id].set_interval = setInterval('shift_nextSlide('+ slider_id +')', shift_wrapper_act.attr('data-interval'));
	}
}
function setup_shift_gallery(slider_id) {
	if (slider_id == 'all') {
		shift_gallery_wrapper.each(function(){
			if (jQuery(this).find('.even_slide').size() == 1) {
				jQuery(this).addClass('even_alone');
			}	 
			if (jQuery(this).find('.odd_slide').size() == 1) {
				jQuery(this).addClass('odd_alone');
			}	 
			if (jQuery('#wpadminbar').size() > 0 && jQuery(this).hasClass('shift_fs_on')) {
				var top_modify = jQuery('#wpadminbar').height();
			} else {
				var top_modify = 0;
			}	
			var set_top = top_modify;
			if (jQuery(this).find('.shift_gallery').attr('data-height') == '100%' || jQuery(this).find('.shift_gallery').attr('data-height') == '' || jQuery(this).hasClass('shift_fs_on')) {
				var set_height = myWindow.height();
				html.addClass('fullscreen_shift_gallery');
			} else {
				var set_height = parseInt(jQuery(this).find('.shift_gallery').attr('data-height'));
			}
			jQuery(this).css('top', set_top+'px').height(set_height);
			jQuery(this).find('.shift_gallery').height(set_height).css('top', set_top+'px');
			jQuery(this).find('.shift_slide').height(set_height);
			if (jQuery(this).find('.shift_gallery').hasClass('started')) {
				if (jQuery(this).find('.shift_even_current').size() > 0 && jQuery(this).find('.shift_odd_current').size() > 0) {
					cur_slide_even = parseInt(jQuery(this).find('.shift_even_current').attr('data-count'));
					cur_slide_odd = parseInt(jQuery(this).find('.shift_odd_current').attr('data-count'));
					set_shift_Slide(cur_slide_even, cur_slide_odd, jQuery(this).attr('data-uniqid'));
				} else {
					if (jQuery(this).attr('data-infinity') == 'off') {
						jQuery(this).addClass('reached_top');
					}
					set_shift_Slide(1,1, jQuery(this).attr('data-uniqid'));
				}
			}
		});
	} else {
		shift_wrapper_act = jQuery('.shift_gal_'+slider_id);		
		if (shift_wrapper_act.find('.even_slide').size() == 1) {
			shift_wrapper_act.addClass('even_alone');
		}	 
		if (shift_wrapper_act.find('.odd_slide').size() == 1) {
			shift_wrapper_act.addClass('odd_alone');
		}	 
		if (jQuery('#wpadminbar').size() > 0 && jQuery(this).hasClass('shift_fs_on')) {
			var top_modify = jQuery('#wpadminbar').height();
		} else {
			var top_modify = 0;
		}	
		var set_top = top_modify;
		if (shift_wrapper_act.find('.shift_gallery').attr('data-height') == '100%' || shift_wrapper_act.find('.shift_gallery').attr('data-height') == '' || shift_wrapper_act.hasClass('shift_fs_on')) {
			var set_height = myWindow.height();
			html.addClass('fullscreen_shift_gallery');
		} else {
			var set_height = parseInt(shift_wrapper_act.find('.shift_gallery').attr('data-height'));
		}
		shift_wrapper_act.css('top', set_top+'px').height(set_height);
		shift_wrapper_act.find('.shift_gallery').height(set_height).css('top', set_top+'px');
		shift_wrapper_act.find('.shift_slide').height(set_height);
		if (shift_wrapper_act.find('.shift_gallery').hasClass('started')) {
			if (shift_wrapper_act.find('.shift_even_current').size() > 0 && shift_wrapper_act.find('.shift_odd_current').size() > 0) {
				cur_slide_even = parseInt(shift_wrapper_act.find('.shift_even_current').attr('data-count'));
				cur_slide_odd = parseInt(shift_wrapper_act.find('.shift_odd_current').attr('data-count'));
				set_shift_Slide(cur_slide_even,cur_slide_odd, slider_id);
			} else {
				if (shift_wrapper_act.attr('data-infinity') == 'off') {
					shift_wrapper_act.addClass('reached_top');
				}
				set_shift_Slide(1,1, slider_id);
			}
		}		
	}
}
function run_shift_slider() {
	shift_gallery.addClass('started')
	setup_shift_gallery();
}