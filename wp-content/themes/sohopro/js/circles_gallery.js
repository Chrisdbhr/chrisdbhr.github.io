var	html = jQuery('html'),
	circles_slider_wrapper = jQuery('.circles_slider_wrapper'),
	circles_slider = jQuery('.circles_slider'),
	circles_slide = jQuery('.circles_slider li'),
	fs_play_pause = jQuery('.fs_play_pause'),
	circles_controls = jQuery('.circles_controls'),
	r_max_slide = circles_slider.find('.circles_slide').size(),
	circles_gal_array = [],
	circles_title = jQuery('.circles_title'),
	circles_descr = jQuery('.circles_descr');
	
jQuery(document).ready(function ($) {
	if (jQuery('.circles_gallery_trigger').size() > 0) {
		if (jQuery('.circles_fs_on').size() > 0) {
			jQuery('.main_wrapper').addClass('like_fullscreen_type');
			html.addClass('fullscreen_circles_slider');
			if (jQuery('.circles_fs_on').size() > 1) {
				jQuery('.circles_fs_on:not(:first)').remove();
			}
		}
		
		jQuery('.circles_slide').each(function(){
			jQuery(this).css('border', 'solid '+ jQuery(this).attr('data-bWidth') +' ' + jQuery(this).attr('data-bColor'));
		});

		circles_slider_wrapper.each(function(){
			circles_gal_array['circles_gal_' + jQuery(this).attr('data-uniqid')] = {};
			circles_gal_array['circles_gal_' + jQuery(this).attr('data-uniqid')].id = jQuery(this).attr('data-uniqid');
			circles_gal_array['circles_gal_' + jQuery(this).attr('data-uniqid')].autoplay = jQuery(this).attr('data-autoplay');
			circles_gal_array['circles_gal_' + jQuery(this).attr('data-uniqid')].set_interval = setInterval('circles_nextSlide('+ jQuery(this).attr('data-uniqid') +')', jQuery(this).attr('data-interval'));
			if (jQuery(this).attr('data-autoplay') == 'off') {
				clearInterval(circles_gal_array['circles_gal_' + jQuery(this).attr('data-uniqid')].set_interval);
			}

			circles_gal_array['circles_gal_' + jQuery(this).attr('data-uniqid')].thmb_interval = setInterval(function () {}, 100);
			clearInterval(circles_gal_array['circles_gal_' + jQuery(this).attr('data-uniqid')].thmb_interval);

			circles_gal_array['circles_gal_' + jQuery(this).attr('data-uniqid')].ready_state = false;
			circles_gal_array['circles_gal_' + jQuery(this).attr('data-uniqid')].full_loaded = false;
		});

				
		jQuery('.circles_prevSlide').on('click', function () {
			slideObj = jQuery(this).parents('.circles_slider_wrapper').attr('data-uniqid');
			circles_prevSlide(slideObj);
		});
		jQuery('.circles_nextSlide').on('click', function () {
			slideObj = jQuery(this).parents('.circles_slider_wrapper').attr('data-uniqid');
			circles_nextSlide(slideObj);
		});

		jQuery('.circles_slide').on('click', function(){
			if (!jQuery(this).hasClass('circles_current')) {
				slideObj = jQuery(this).parents('.circles_slider_wrapper').attr('data-uniqid');
				var set_slide = jQuery(this).attr('data-count');			
				set_circles_Slide(set_slide, slideObj);
			}
		});
	}
});

jQuery(window).resize(function () {
	if (jQuery('.circles_gallery_trigger').size() > 0) {
		setup_circles('all');
	}
});

function circles_prevSlide(slideObj) {
	current_slider = jQuery('.circles_gal_'+slideObj);
	cur_slide = parseInt(current_slider.find('.circles_current').attr('data-count'));
	cur_slide--;
	r_max_slide = current_slider.find('.circles_slide').size();
	if (cur_slide > r_max_slide) cur_slide = 1;
	if (cur_slide < 1) cur_slide = r_max_slide;	
	set_circles_Slide(cur_slide, slideObj);
}

function circles_nextSlide(slideObj) {
	current_slider = jQuery('.circles_gal_'+slideObj);
	cur_slide = parseInt(current_slider.find('.circles_current').attr('data-count'));
	cur_slide++;
	r_max_slide = current_slider.find('.circles_slide').size();
	if (cur_slide > r_max_slide) cur_slide = 1;
	if (cur_slide < 1) cur_slide = r_max_slide;
	set_circles_Slide(cur_slide, slideObj);
}

function set_circles_Slide(slideNum, slideObj) {
	clearInterval(circles_gal_array['circles_gal_' + slideObj].set_interval);
	
	current_slider = jQuery('.circles_gal_'+slideObj);
	r_max_slide = current_slider.find('.circles_slide').size();
	clearInterval(circles_gal_array['circles_gal_' + slideObj].set_interval);
	slideNum = parseInt(slideNum);
	
	current_slider.find('.circles_prev').removeClass('circles_prev');
	current_slider.find('.circles_current').removeClass('circles_current');
	current_slider.find('.circles_next').removeClass('circles_next');
	
	var curSlide = current_slider.find('.circles_slide'+slideNum);
	curSlide.addClass('circles_current');

	if((parseInt(slideNum)+1) > r_max_slide) {
		var nextSlide = current_slider.find('.circles_slide1');
	} else if ((parseInt(slideNum)+1) == r_max_slide){
		var nextSlide = current_slider.find('.circles_slide'+r_max_slide);
	} else {
		var nextSlide = current_slider.find('.circles_slide'+(parseInt(slideNum)+1));
	}
	
	if((parseInt(slideNum)-1) < 1) {
		var prevSlide = current_slider.find('.circles_slide'+r_max_slide);
	} else if ((slideNum-1) == 1){
		var prevSlide = current_slider.find('.circles_slide1');
	} else {
		var prevSlide = current_slider.find('.circles_slide'+(parseInt(slideNum)-1));
	}

	prevSlide.addClass('circles_prev');
	curSlide.addClass('circles_current');
	nextSlide.addClass('circles_next');

	current_slider.find('.circles_descr').fadeOut(500, function () {
		if (!html.hasClass('gallery_started')) html.addClass('gallery_started');
		setTimeout("current_slider.find('.circles_descr').html(current_slider.find('.circles_current').attr('data-descr'))",100);
		setTimeout("current_slider.find('.circles_descr').fadeIn(500)",200);
	});
	current_slider.find('.circles_title').fadeOut(500, function () {
		setTimeout("current_slider.find('.circles_title').html(current_slider.find('.circles_current').attr('data-title'))",100);
		setTimeout("current_slider.find('.circles_title').fadeIn(500)",200);
	});
	
	if (current_slider.attr('data-autoplay') == 'on') {
		circles_gal_array['circles_gal_' + slideObj].set_interval = setInterval('circles_nextSlide('+ current_slider.attr('data-uniqid') +')', current_slider.attr('data-interval'));
	}
}

function setup_circles(cur_slider) {
	if (jQuery('.circles_fs_on').size() > 0) {
		var fs_circles_gal = jQuery('.circles_fs_on');
		var height_fixer = fs_circles_gal.find('.circles_title_content').height() + fs_circles_gal.find('.circles_gallery_trigger').height()*2;
		var setHeight = myWindow.height() - height_fixer,
			setTop = 0,
			less_height = 0;
		if (jQuery('#wpadminbar').size() > 0) {
			setHeight = setHeight - jQuery('#wpadminbar').height();
			setTop = setTop + jQuery('#wpadminbar').height();
		}
		if (fs_circles_gal.attr('data-toppx') !== '') {
			setTop = setTop + parseInt(fs_circles_gal.attr('data-toppx'));
		}
		if (fs_circles_gal.attr('data-topcont') !== '') {
			if (jQuery(fs_circles_gal.attr('data-topcont')).size() > 0) {
				setTop = setTop + parseInt(jQuery(fs_circles_gal.attr('data-topcont')).height());
			}
		}
		
		if (fs_circles_gal.find('.circles_title_content').size() > 0) {
			less_height = fs_circles_gal.find('.circles_title_content').height();
		}
		if (fs_circles_gal.attr('data-decpx') !== '') {
			setHeight = setHeight - parseInt(fs_circles_gal.attr('data-decpx'));
		}
		if (fs_circles_gal.attr('data-deccont') !== '') {
			var str = fs_circles_gal.attr('data-deccont'),
			deccont_obj = str.split(' ');
			for (var i = 0; i < deccont_obj.length; i++) {
				if (jQuery(deccont_obj[i]).size() > 0) {
					setHeight = setHeight - jQuery(deccont_obj[i]).height();
				}
			}
		}
		
		fs_circles_gal.height(setHeight + height_fixer).css('top', setTop+'px');
		fs_circles_gal.find('.circles_slider').height(parseInt(setHeight) - less_height);
		fs_circles_gal.find('.circles_slide').height(parseInt(setHeight) - less_height);
		
		if (fs_circles_gal.find('.circles_current').size() < 1) {
			set_circles_Slide(1, fs_circles_gal.attr('data-uniqid'));
		}
	} else if (cur_slider == 'all') {
		circles_slider_wrapper.each(function(){
			var setHeight = jQuery(this).attr('data-height'),
			less_height = jQuery(this).find('.circles_gallery_trigger').height()*2,
			admin_bar = 0;
			if (jQuery(this).find('.circles_title_content').size() > 0) {
				less_height = less_height + jQuery(this).find('.circles_title_content').height();
			}
			if (jQuery('#wpadminbar').size() > 0) {
				less_height = less_height + jQuery('#wpadminbar').height();
				admin_bar = jQuery('#wpadminbar').height();
			}			
			if (setHeight == '100%') {
				jQuery(this).css('height', 'calc(100vh - '+ admin_bar +'px)');
				jQuery(this).find('.circles_slider').css('height', 'calc(100vh - '+ less_height +'px)');
				jQuery(this).find('.circles_slide').css('height', 'calc(100vh - '+ less_height +'px)');
			} else {
				jQuery(this).height(parseInt(setHeight) - admin_bar);
				jQuery(this).find('.circles_slider').height(parseInt(setHeight) - less_height);
				jQuery(this).find('.circles_slide').height(parseInt(setHeight) - less_height);
			}
			if (jQuery(this).find('.circles_current').size() < 1) {
				set_circles_Slide(1, jQuery(this).attr('data-uniqid'));
			}
		});		
	} else {
		current_slider = jQuery('.circles_gal_'+cur_slider);
		less_height = current_slider.find('.circles_gallery_trigger').height()*2;
		setHeight = current_slider.attr('data-height');
		if (current_slider.find('.circles_title_content').size() > 0) {
			less_height = less_height + jQuery(this).find('.circles_title_content').height();
		}
		if (jQuery('#wpadminbar').size() > 0) {
			less_height = less_height + jQuery('#wpadminbar').height();
			admin_bar = jQuery('#wpadminbar').height();
		}
		if (setHeight == '100%') {
			current_slider.css('height', 'calc(100vh - '+ admin_bar +'px)');
			current_slider.find('.circles_slider').css('height', 'calc(100vh - '+ less_height +'px)');
			current_slider.find('.circles_slide').css('height', 'calc(100vh - '+ less_height +'px)');
		} else {
			current_slider.height(parseInt(setHeight) - admin_bar);
			current_slider.find('.circles_slider').height(parseInt(setHeight) - less_height);
			current_slider.find('.circles_slide').height(parseInt(setHeight) - less_height);
		}

		if (current_slider.find('.circles_current').size() < 1) {
			set_circles_Slide(1, cur_slider);
		}		
	}
}

function run_circles_slider() {

}