var	html = jQuery('html'),
	flow_slider_wrapper = jQuery('.flow_slider_wrapper'),
	flow_slider = jQuery('.flow_slider'),
	flow_slide = jQuery('.flow_slider li'),
	fs_play_pause = jQuery('.fs_play_pause'),
	flow_controls = jQuery('.flow_controls'),
	r_max_slide = flow_slider.find('.flow_slide').size(),
	flow_gal_array = [];
	
jQuery(document).ready(function ($) {
	if (jQuery('.flow_gallery_trigger').size() > 0) {
		if (jQuery('.flow_fs_on').size() > 0) {
			jQuery('.main_wrapper').addClass('like_fullscreen_type');
			html.addClass('fullscreen_flow_slider');
			if (jQuery('.flow_fs_on').size() > 1) {
				jQuery('.flow_fs_on:not(:first)').remove();
			}
		}

		flow_slider_wrapper.each(function(){
			flow_gal_array['flow_gal_' + jQuery(this).attr('data-uniqid')] = {};
			flow_gal_array['flow_gal_' + jQuery(this).attr('data-uniqid')].id = jQuery(this).attr('data-uniqid');
			flow_gal_array['flow_gal_' + jQuery(this).attr('data-uniqid')].autoplay = jQuery(this).attr('data-autoplay');
			flow_gal_array['flow_gal_' + jQuery(this).attr('data-uniqid')].set_interval = setInterval('flow_nextSlide('+ jQuery(this).attr('data-uniqid') +')', jQuery(this).attr('data-interval'));
			if (jQuery(this).attr('data-autoplay') == 'off') {
				clearInterval(flow_gal_array['flow_gal_' + jQuery(this).attr('data-uniqid')].set_interval);
			}

			flow_gal_array['flow_gal_' + jQuery(this).attr('data-uniqid')].thmb_interval = setInterval(function () {}, 100);
			clearInterval(flow_gal_array['flow_gal_' + jQuery(this).attr('data-uniqid')].thmb_interval);

			flow_gal_array['flow_gal_' + jQuery(this).attr('data-uniqid')].ready_state = false;
			flow_gal_array['flow_gal_' + jQuery(this).attr('data-uniqid')].full_loaded = false;
		});

				
		jQuery('.flow_prevSlide').on('click', function () {
			slideObj = jQuery(this).parents('.flow_slider_wrapper').attr('data-uniqid');
			flow_prevSlide(slideObj);
		});
		jQuery('.flow_nextSlide').on('click', function () {
			slideObj = jQuery(this).parents('.flow_slider_wrapper').attr('data-uniqid');
			flow_nextSlide(slideObj);
		});

		jQuery('.flow_slide').on('click', function(){
			if (!jQuery(this).hasClass('flow_current')) {
				slideObj = jQuery(this).parents('.flow_slider_wrapper').attr('data-uniqid');
				var set_slide = jQuery(this).attr('data-count');			
				set_flow_Slide(set_slide, slideObj);
			}
		});
	}
});

jQuery(window).resize(function () {
	if (jQuery('.flow_gallery_trigger').size() > 0) {
		setup_flow('all');
	}
});

function flow_prevSlide(slideObj) {
	current_slider = jQuery('.flow_gal_'+slideObj);
	cur_slide = parseInt(current_slider.find('.flow_current').attr('data-count'));
	cur_slide--;
	r_max_slide = current_slider.find('.flow_slide').size();
	if (cur_slide > r_max_slide) cur_slide = 1;
	if (cur_slide < 1) cur_slide = r_max_slide;	
	set_flow_Slide(cur_slide, slideObj);
}

function flow_nextSlide(slideObj) {
	current_slider = jQuery('.flow_gal_'+slideObj);
	cur_slide = parseInt(current_slider.find('.flow_current').attr('data-count'));
	cur_slide++;
	r_max_slide = current_slider.find('.flow_slide').size();
	if (cur_slide > r_max_slide) cur_slide = 1;
	if (cur_slide < 1) cur_slide = r_max_slide;
	set_flow_Slide(cur_slide, slideObj);
}

function set_flow_Slide(slideNum, slideObj) {
	current_slider = jQuery('.flow_gal_'+slideObj);
	r_max_slide = current_slider.find('.flow_slide').size();
	clearInterval(flow_gal_array['flow_gal_' + slideObj].set_interval);
	slideNum = parseInt(slideNum);
	if (r_max_slide < 5) {
		current_slider.find('.flow_prev').removeClass('flow_prev');
		current_slider.find('.flow_current').removeClass('flow_current');
		current_slider.find('.flow_next').removeClass('flow_next');
		
		var curSlide = current_slider.find('.flow_slide'+slideNum);
		curSlide.addClass('flow_current');

		if((parseInt(slideNum)+1) > r_max_slide) {
			var nextSlide = current_slider.find('.flow_slide1');
		} else if ((parseInt(slideNum)+1) == r_max_slide){
			var nextSlide = current_slider.find('.flow_slide'+r_max_slide);
		} else {
			var nextSlide = current_slider.find('.flow_slide'+(parseInt(slideNum)+1));
		}
		
		if((parseInt(slideNum)-1) < 1) {
			var prevSlide = current_slider.find('.flow_slide'+r_max_slide);
		} else if ((slideNum-1) == 1){
			var prevSlide = current_slider.find('.flow_slide1');
		} else {
			var prevSlide = current_slider.find('.flow_slide'+(parseInt(slideNum)-1));
		}

		prevSlide.addClass('flow_prev');
		curSlide.addClass('flow_current');
		nextSlide.addClass('flow_next');
	
		if (current_slider.attr('data-autoplay') == 'on') {
			flow_gal_array['flow_gal_' + slideObj].set_interval = setInterval('flow_nextSlide(' + slideObj + ')', current_slider.attr('data-interval'));
		}
	} else {
		current_slider.find('.flow_prev2').removeClass('flow_prev2');
		current_slider.find('.flow_prev').removeClass('flow_prev');
		current_slider.find('.flow_current').removeClass('flow_current');
		current_slider.find('.flow_next').removeClass('flow_next');
		current_slider.find('.flow_next2').removeClass('flow_next2');
		
		var curSlide = current_slider.find('.flow_slide'+slideNum);
		curSlide.addClass('flow_current');

		if((parseInt(slideNum)+1) > r_max_slide) {
			var nextSlide = current_slider.find('.flow_slide1');
			var nextSlide2 = current_slider.find('.flow_slide2');
		} else if ((parseInt(slideNum)+1) == r_max_slide){
			var nextSlide = current_slider.find('.flow_slide'+r_max_slide);
			var nextSlide2 = current_slider.find('.flow_slide1');
		} else {
			var nextSlide = current_slider.find('.flow_slide'+(parseInt(slideNum)+1));
			var nextSlide2 = current_slider.find('.flow_slide'+(parseInt(slideNum)+2));
		}
		
		if((parseInt(slideNum)-1) < 1) {
			var prevSlide = current_slider.find('.flow_slide'+r_max_slide);
			var prevSlide2 = current_slider.find('.flow_slide'+(r_max_slide-1));
		} else if ((slideNum-1) == 1){
			var prevSlide = current_slider.find('.flow_slide1');
			var prevSlide2 = current_slider.find('.flow_slide'+r_max_slide);
		} else {
			var prevSlide = current_slider.find('.flow_slide'+(parseInt(slideNum)-1));
			var prevSlide2 = current_slider.find('.flow_slide'+(parseInt(slideNum)-2));
		}

		prevSlide2.addClass('flow_prev2');
		prevSlide.addClass('flow_prev');
		curSlide.addClass('flow_current');
		nextSlide.addClass('flow_next');
		nextSlide2.addClass('flow_next2');

		if (current_slider.attr('data-autoplay') == 'on') {
			flow_gal_array['flow_gal_' + slideObj].set_interval = setInterval('flow_nextSlide(' + slideObj + ')', current_slider.attr('data-interval'));
		}
	}

	flow_slider_arrow_position();
}
function setup_flow(cur_slider) {
	if (jQuery('.single_gallery_content').size() > 0) {
		var set_gallery_cont = myWindow.height();
		if (jQuery('#wpadminbar').size() > 0) {
			set_gallery_cont = set_gallery_cont - jQuery('#wpadminbar').height();
		}
		if (jQuery('.top_header').size() > 0) {			
			set_gallery_cont = set_gallery_cont - jQuery('.top_header').height();
		}
		jQuery('.single_gallery_content').height(set_gallery_cont);
	}	
	if (jQuery('.flow_fs_on').size() > 0) {
		var fs_flow_gal = jQuery('.flow_fs_on');
		var height_fixer = fs_flow_gal.find('.flow_gallery_trigger').height()*2;
			setHeight = myWindow.height() - jQuery('header.main_header').height(),
			setTop = jQuery('header.main_header').height();
		if (jQuery('#wpadminbar').size() > 0) {
			setHeight = setHeight - jQuery('#wpadminbar').height();
			//setTop = setTop + jQuery('#wpadminbar').height();
		}
		if (fs_flow_gal.attr('data-toppx') !== '') {
			setTop = setTop + parseInt(fs_flow_gal.attr('data-toppx'));
		}
		if (fs_flow_gal.attr('data-topcont') !== '') {
			if (jQuery(fs_flow_gal.attr('data-topcont')).size() > 0) {
				setTop = setTop + parseInt(jQuery(fs_flow_gal.attr('data-topcont')).height());
			}
		}
		if (fs_flow_gal.attr('data-decpx') !== '') {
			setHeight = setHeight - parseInt(fs_flow_gal.attr('data-decpx'));
		}
		if (fs_flow_gal.attr('data-deccont') !== '') {
			var str = fs_flow_gal.attr('data-deccont'),
			deccont_obj = str.split(' ');
			for (var i = 0; i < deccont_obj.length; i++) {
				if (jQuery(deccont_obj[i]).size() > 0) {
					setHeight = setHeight - jQuery(deccont_obj[i]).height();
				}
			}
		}
		fs_flow_gal.height(setHeight).css('top', setTop+'px');
		jQuery('.gt3_content_holder').height(setHeight);
		fs_flow_gal.find('.flow_slider').height(parseInt(setHeight - height_fixer)).css('top', fs_flow_gal.find('.flow_gallery_trigger').height() + 'px');
		fs_flow_gal.find('.flow_slide').height(parseInt(setHeight - height_fixer));
		
		if (fs_flow_gal.find('.flow_current').size() < 1) {
			set_flow_Slide(1, fs_flow_gal.attr('data-uniqid'));
		}
	} else if (cur_slider == 'all') {
		flow_slider_wrapper.each(function(){
			setHeight = jQuery(this).attr('data-height');
			height_fixer = jQuery(this).find('.flow_gallery_trigger').height()*2;
			if (setHeight == '100%') {
				jQuery(this).css('height', '100vh');
				jQuery(this).find('.flow_slider').css('height', 'calc(100vh - '+ height_fixer +'px)').css('top', jQuery(this).find('.flow_gallery_trigger').height()+'px');
				jQuery(this).find('.flow_slide').css('height', 'calc(100vh - '+ height_fixer +'px)');
			} else {
				jQuery(this).height(parseInt(setHeight));
				jQuery(this).find('.flow_slider').height(parseInt(setHeight) - height_fixer).css('top', jQuery(this).find('.flow_gallery_trigger').height()+'px');;
				jQuery(this).find('.flow_slide').height(parseInt(setHeight) - height_fixer);
			}
			
			if (jQuery(this).find('.flow_current').size() < 1) {
				set_flow_Slide(1, jQuery(this).attr('data-uniqid'));
			}
		});		
	} else {
		current_slider = jQuery('.flow_gal_'+cur_slider);
		height_fixer = current_slider.find('.flow_gallery_trigger').height()*2;
		setHeight = current_slider.attr('data-height');
			if (setHeight == '100%') {
				current_slider.css('height', '100vh');
				current_slider.find('.flow_slider').css('height', 'calc(100vh - '+ height_fixer +'px)').css('top', current_slider.find('.flow_gallery_trigger').height()+'px');
				current_slider.find('.flow_slide').css('height', 'calc(100vh - '+ height_fixer +'px)');
			} else {
				current_slider.height(parseInt(setHeight));
				current_slider.find('.flow_slider').height(parseInt(setHeight) - height_fixer).css('top', current_slider.find('.flow_gallery_trigger').height()+'px');
				current_slider.find('.flow_slide').height(parseInt(setHeight) - height_fixer);
			}

		if (current_slider.find('.flow_current').size() < 1) {
			set_flow_Slide(1, cur_slider);
		}		
	}
}

function run_flow_slider() {

}

// Flow Slider Arrow position
function flow_slider_arrow_position() {
	if (jQuery('.flow_slide').length) {
		jQuery('.flow_slider_wrapper').each(function () {
			var flow_active_w = jQuery(this).find('.flow_current').width(),
				flow_slide_length = jQuery(this).find('.flow_slide').length;

			if (flow_slide_length < 5) {
				var flow_arrow_position = flow_active_w*0.8334 - flow_active_w*0.212;
			} else {
				var flow_arrow_position = flow_active_w*0.6667 + flow_active_w*0.0759*2;
			}

			jQuery(this).find('.flow_prevSlide').css({'margin-right': flow_arrow_position + 'px'});
			jQuery(this).find('.flow_nextSlide').css({'margin-left': flow_arrow_position + 'px'});
		});
	}
}

