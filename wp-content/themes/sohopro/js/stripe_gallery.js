/* FS Slider 1.6.12.06 4Modules */
var	html = jQuery('html'),
	stripe_slider_wrapper = jQuery('.stripe_gallery_wrapper'),
	stripe_slider = jQuery('.stripe_slider'),
	stripe_title_wrapper = jQuery('.stripe_title_wrapper'),
	stripe_title = jQuery('.stripe_title'),
	stripe_descr = jQuery('.stripe_descr'),
	stripe_btn_prev = jQuery('.stripe_slider_prev'),
	stripe_btn_next = jQuery('.stripe_slider_next'),
	stripe_controls = jQuery('.stripe_controls'),
	stripe_gal_array = [];

/* YouTube API */
var tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

html.addClass('stripe_gallery_page');

/* Start FS Gallery */
if (jQuery('.stripe_gallery_trigger').size() > 0) {
	jQuery(document.documentElement).keyup(function (event) {
		if (jQuery('.hovered_stripegal_module').size() > 0) {
			if ((event.keyCode == 37)) {
				event.preventDefault();
			}
			if ((event.keyCode == 39)) {
				event.preventDefault();
			}
		}		

		if ((event.keyCode == 37)) {
			if (jQuery('.hovered_stripegal_module').size() > 0) {
				event.preventDefault();
				stripe_prevSlide(jQuery('.hovered_stripegal_module').attr('data-uniqid'));
			}
		}
		if ((event.keyCode == 39)) {
			if (jQuery('.hovered_stripegal_module').size() > 0) {
				event.preventDefault();
				stripe_nextSlide(jQuery('.hovered_stripegal_module').attr('data-uniqid'));
			}
		}
	});
}

jQuery(document).on('click', '.stripe_slide', function(e){
	current_slider = jQuery(this).parents('.stripe_gallery_wrapper');
	slideObj = current_slider.attr('data-uniqid');
	if (!jQuery(this).hasClass('current-slide')) {
		var set_slide = jQuery(this).attr('data-count');			
		stripe_setSlide(set_slide, slideObj);
	}
	if (current_slider.attr('data-expandeble') == 'on') {
		current_slider.toggleClass('stripe_slider_expanded');
	}
});

jQuery(document).on('mouseenter', '.stripe_gallery_wrapper', function(e){
	jQuery(this).addClass('hovered_stripegal_module');
}).on('mouseleave', '.stripe_gallery_wrapper', function(e){
	jQuery(this).removeClass('hovered_stripegal_module');
})

jQuery(document).ready(function ($) {	
	stripe_slider_wrapper.each(function(){
		stripe_gal_array['stripe_gal_' + jQuery(this).attr('data-uniqid')] = {};
		stripe_gal_array['stripe_gal_' + jQuery(this).attr('data-uniqid')].id = jQuery(this).attr('data-uniqid');
		stripe_gal_array['stripe_gal_' + jQuery(this).attr('data-uniqid')].autoplay = jQuery(this).attr('data-autoplay');
		stripe_gal_array['stripe_gal_' + jQuery(this).attr('data-uniqid')].set_interval = setInterval('stripe_nextSlide('+ jQuery(this).attr('data-uniqid') +')', jQuery(this).attr('data-interval'));
		if (jQuery(this).attr('data-autoplay') == 'off') {
			clearInterval(stripe_gal_array['stripe_gal_' + jQuery(this).attr('data-uniqid')].set_interval);
		}
		stripe_gal_array['stripe_gal_' + jQuery(this).attr('data-uniqid')].ready_state = false;
		stripe_gal_array['stripe_gal_' + jQuery(this).attr('data-uniqid')].full_loaded = false;

	});

	if (jQuery('.stripe_gallery_trigger').size() > 0) {
		if (jQuery('.fs_stripe_style_on').size() > 0) {
			jQuery('.main_wrapper').addClass('like_fullscreen_type');
			html.addClass('fullscreen_slider');
			//Touch Events
			/*if (stripe_overlay.size() > 0) {
				var touch_container = stripe_overlay;
			} else {
				var touch_container = stripe_slider;
			}
			touch_container.on('touchstart', function(event) {
				clearInterval(stripe_interval);
				touch = event.originalEvent.touches[0];
				startAt = touch.pageX;
				html.addClass('touched');
			});		
			
			touch_container.on('touchmove', function(event) {			
				touch = event.originalEvent.touches[0];
				movePath = -1* (startAt - touch.pageX)/2;
				movePercent = (movePath*100)/myWindow.width();
			});
			touch_container.on('touchend', function(event) {
				html.removeClass('touched');
				touch = event.originalEvent.changedTouches[0];
				if (touch.pageX < startAt) {
					stripe_nextSlide();
				}
				if (touch.pageX > startAt) {
					stripe_prevSlide();
				}
			});*/			
			jQuery('.stripe_controls_toggler').on('click', function () {
				html.toggleClass('hide_stripe_controls');
			});
		} else {
			jQuery('.stripe_controls_toggler').on('click', function () {
				stripe_slider_wrapper.toggleClass('hide_stripe_controls');
			});			
		}
		
		jQuery('.stripe_slider_prev').on('click', function () {
			slideObj = jQuery(this).parents('.stripe_gallery_wrapper').attr('data-uniqid');
			stripe_prevSlide(slideObj);
		});
		jQuery('.stripe_slider_next').on('click', function () {
			slideObj = jQuery(this).parents('.stripe_gallery_wrapper').attr('data-uniqid');
			stripe_nextSlide(slideObj);
		});		
	}
});

jQuery(window).resize(function () {
	if (jQuery('.stripe_gallery_trigger').size() > 0) {
		setup_stripe_gallery('all');
	}
});

function stripe_prevSlide(cur_slider) {
	current_slider = jQuery('.stripe_gal_'+cur_slider);
	cur_slide = parseInt(current_slider.find('.current-slide').attr('data-count'));
	cur_slide--;
	max_slide = current_slider.find('.stripe_slide').size();
	if (cur_slide > max_slide) cur_slide = 1;
	if (cur_slide < 1) cur_slide = max_slide;	
	stripe_setSlide(cur_slide, cur_slider);
}

function stripe_nextSlide(cur_slider) {	
	current_slider = jQuery('.stripe_gal_'+cur_slider);
	cur_slide = parseInt(current_slider.find('.current-slide').attr('data-count'));
	cur_slide++;
	max_slide = current_slider.find('.stripe_slide').size();
	if (cur_slide > max_slide) cur_slide = 1;
	if (cur_slide < 1) cur_slide = max_slide;
	stripe_setSlide(cur_slide, cur_slider);
}

function stripe_setSlide(slideNum, cur_slider) {	
	current_slider = jQuery('.stripe_gal_'+cur_slider);
	clearInterval(stripe_gal_array['stripe_gal_' + cur_slider].set_interval);
	slideNum = parseInt(slideNum);
	var r_max_slide = current_slider.find('.stripe_slide').size();
	if (r_max_slide < 5) {
		current_slider.find('.prev-slide').removeClass('prev-slide');
		current_slider.find('.current-slide').removeClass('current-slide');
		current_slider.find('.next-slide').removeClass('next-slide');
		
		var curSlide = current_slider.find('.stripe_slide'+slideNum);
		curSlide.addClass('current-slide');

		if((parseInt(slideNum)+1) > r_max_slide) {
			var nextSlide = current_slider.find('.stripe_slide1');
		} else if ((parseInt(slideNum)+1) == r_max_slide){
			var nextSlide = current_slider.find('.stripe_slide'+r_max_slide);
		} else {
			var nextSlide = current_slider.find('.stripe_slide'+(parseInt(slideNum)+1));
		}
		
		if((parseInt(slideNum)-1) < 1) {
			var prevSlide = current_slider.find('.stripe_slide'+r_max_slide);
		} else if ((slideNum-1) == 1){
			var prevSlide = current_slider.find('.stripe_slide1');
		} else {
			var prevSlide = current_slider.find('.stripe_slide'+(parseInt(slideNum)-1));
		}

		prevSlide.addClass('prev-slide');
		curSlide.addClass('current-slide');
		nextSlide.addClass('next-slide');

	} else {
		current_slider.find('.prev-slide2').removeClass('prev-slide2');
		current_slider.find('.prev-slide').removeClass('prev-slide');
		current_slider.find('.current-slide').removeClass('current-slide');
		current_slider.find('.next-slide').removeClass('next-slide');
		current_slider.find('.next-slide2').removeClass('next-slide2');
		
		var curSlide = current_slider.find('.stripe_slide'+slideNum);
		curSlide.addClass('stripe_current');

		if((parseInt(slideNum)+1) > r_max_slide) {
			var nextSlide = current_slider.find('.stripe_slide1');
			var nextSlide2 = current_slider.find('.stripe_slide2');
		} else if ((parseInt(slideNum)+1) == r_max_slide){
			var nextSlide = current_slider.find('.stripe_slide'+r_max_slide);
			var nextSlide2 = current_slider.find('.stripe_slide1');
		} else {
			var nextSlide = current_slider.find('.stripe_slide'+(parseInt(slideNum)+1));
			var nextSlide2 = current_slider.find('.stripe_slide'+(parseInt(slideNum)+2));
		}
		
		if((parseInt(slideNum)-1) < 1) {
			var prevSlide = current_slider.find('.stripe_slide'+r_max_slide);
			var prevSlide2 = current_slider.find('.stripe_slide'+(r_max_slide-1));
		} else if ((slideNum-1) == 1){
			var prevSlide = current_slider.find('.stripe_slide1');
			var prevSlide2 = current_slider.find('.stripe_slide'+r_max_slide);
		} else {
			var prevSlide = current_slider.find('.stripe_slide'+(parseInt(slideNum)-1));
			var prevSlide2 = current_slider.find('.stripe_slide'+(parseInt(slideNum)-2));
		}

		prevSlide2.addClass('prev-slide2');
		prevSlide.addClass('prev-slide');
		curSlide.addClass('current-slide');
		nextSlide.addClass('next-slide');
		nextSlide2.addClass('next-slide2');		
	}	
	
	if (current_slider.attr('data-autoplay') == 'on') {
		stripe_gal_array['stripe_gal_' + cur_slider].set_interval = setInterval('stripe_nextSlide(' + cur_slider + ')', current_slider.attr('data-interval'));
	}	

}
function setup_stripe_gallery(cur_slider) {	
	if (jQuery('.fs_stripe_style_on').size() > 0) {
		//Fullscreen Slider Setup
		if (jQuery('.fs_stripe_style_on').size() > 1) {
			jQuery('.fs_stripe_style_on:not(:first)').remove();
		}
		var stripe_gal = jQuery('.fs_stripe_style_on');
		var setHeight = myWindow.height(),
			setTop = 0;			
		if (jQuery('#wpadminbar').size() > 0) {
			setHeight = setHeight - jQuery('#wpadminbar').height();
			setTop = setTop + jQuery('#wpadminbar').height();
		}
		if (stripe_gal.attr('data-toppx') !== '') {
			setTop = setTop + parseInt(stripe_gal.attr('data-toppx'));
		}
		if (stripe_gal.attr('data-topcont') !== '') {
			if (jQuery(stripe_gal.attr('data-topcont')).size() > 0) {
				setTop = setTop + parseInt(jQuery(stripe_gal.attr('data-topcont')).height());
			}
		}
		if (stripe_gal.attr('data-decpx') !== '') {
			setHeight = setHeight - parseInt(stripe_gal.attr('data-decpx'));
		}
		if (stripe_gal.attr('data-deccont') !== '') {
			var str = stripe_gal.attr('data-deccont'),
			deccont_obj = str.split(' ');
			for (var i = 0; i < deccont_obj.length; i++) {
				if (jQuery(deccont_obj[i]).size() > 0) {
					setHeight = setHeight - jQuery(deccont_obj[i]).height();
				}
			}
		}
		
		stripe_gal.height(setHeight).css('top', setTop+'px');
		if (stripe_gal.find('.current-slide').size() < 1) {
			stripe_setSlide(1, stripe_gal.attr('data-uniqid'));
		}		
	} else {		
		if (cur_slider == 'all') {
			stripe_slider_wrapper.each(function(){
				setHeight = jQuery(this).attr('data-height');
				if (setHeight == '100%') {
					jQuery(this).css('height', '100vh');
				} else {
					jQuery(this).height(parseInt(setHeight));
				}
				if (jQuery(this).find('.current-slide').size() < 1) {
					stripe_setSlide(1, jQuery(this).attr('data-uniqid'));
				}
			});
		} else {
			current_slider = jQuery('.stripe_gal_'+cur_slider);
			setHeight = current_slider.attr('data-height');
			if (setHeight == '100%') {
				current_slider.css('height', '100vh');
			} else {
				current_slider.height(parseInt(setHeight));
			}
			if (current_slider.find('.current-slide').size() < 1) {
				stripe_setSlide(1, cur_slider);
			}
		}		
	}
}

function run_stripe_slider(cur_slider) {
	current_slider = jQuery('.stripe_gal_'+cur_slider);
	current_slider.find('.stripe_slider').addClass('started');
	if (current_slider.find('.stripe_slider').hasClass('autoplay')) {
		current_slider.find('.stripe_play_pause').addClass('stripe_state_play');
		clearInterval(stripe_gal_array['stripe_gal_' + current_slider.attr('data-uniqid')].set_interval);
		stripe_gal_array['stripe_gal_' + current_slider.attr('data-uniqid')].set_interval = setInterval('stripe_nextSlide('+cur_slider+')', current_slider.attr('data-interval'));
	}
	stripe_setSlide(1, cur_slider);
}

function slide_not_loaded(slide_num, cur_slider) {
	current_slider = jQuery('.stripe_gal_'+cur_slider);
	slide_num = parseInt(slide_num);
	var curSlide = current_slider.find('.stripe_slide'+slide_num);
	if (curSlide.attr('data-type') == 'image' && !curSlide.hasClass('block_loaded'))  {
	} else {
		stripe_setSlide(slide_num,cur_slider);
	}
}
