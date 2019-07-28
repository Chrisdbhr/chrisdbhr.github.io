var	html = jQuery('html'),
	ribbon_slider_wrapper = jQuery('.ribbon_slider_wrapper'),
	ribbon_slider = jQuery('.ribbon_slider'),
	ribbon_slide = jQuery('.ribbon_slider li'),
	fs_play_pause = jQuery('.fs_play_pause'),
	ribbon_controls = jQuery('.ribbon_controls'),
	r_max_slide = ribbon_slider.find('.ribbon_slide').size(),
	ribbon_gal_array = [];

if (jQuery('.ribbon_gallery_trigger').size() > 0) {
	jQuery(document.documentElement).keyup(function (event) {
		if (jQuery('.hovered_fsgal_module').size() > 0) {
			if ((event.keyCode == 37)) {
				event.preventDefault();
			}
			if ((event.keyCode == 39)) {
				event.preventDefault();
			}
		}		

		if ((event.keyCode == 37)) {
			if (jQuery('.hovered_ribbongal_module').size() > 0) {
				event.preventDefault();
				ribbon_prevSlide(jQuery('.hovered_ribbongal_module').attr('data-uniqid'));
			}
		}
		if ((event.keyCode == 39)) {
			if (jQuery('.hovered_ribbongal_module').size() > 0) {
				event.preventDefault();
				ribbon_nextSlide(jQuery('.hovered_ribbongal_module').attr('data-uniqid'));
			}
		}
	});
}

jQuery(document).on('mouseenter', '.ribbon_slider_wrapper', function(e){
	jQuery(this).addClass('hovered_ribbongal_module');
}).on('mouseleave', '.ribbon_slider_wrapper', function(e){
	jQuery(this).removeClass('hovered_ribbongal_module');
})

jQuery(document).ready(function ($) {
	if (jQuery('.ribbon_gallery_trigger').size() > 0) {
		if (jQuery('.ribbon_fs_on').size() > 0) {
			jQuery('.main_wrapper').addClass('like_fullscreen_type');
			html.addClass('fullscreen_ribbon_slider');
			if (jQuery('.ribbon_fs_on').size() > 1) {
				jQuery('.ribbon_fs_on:not(:first)').remove();
			}
		}

		ribbon_slider_wrapper.each(function(){
			ribbon_gal_array['ribbon_gal_' + jQuery(this).attr('data-uniqid')] = {};
			ribbon_gal_array['ribbon_gal_' + jQuery(this).attr('data-uniqid')].id = jQuery(this).attr('data-uniqid');
			ribbon_gal_array['ribbon_gal_' + jQuery(this).attr('data-uniqid')].autoplay = jQuery(this).attr('data-autoplay');
			ribbon_gal_array['ribbon_gal_' + jQuery(this).attr('data-uniqid')].set_interval = setInterval('ribbon_nextSlide('+ jQuery(this).attr('data-uniqid') +')', jQuery(this).attr('data-interval'));
			if (jQuery(this).attr('data-autoplay') == 'off') {
				clearInterval(ribbon_gal_array['ribbon_gal_' + jQuery(this).attr('data-uniqid')].set_interval);
			}

			ribbon_gal_array['ribbon_gal_' + jQuery(this).attr('data-uniqid')].thmb_interval = setInterval(function () {}, 100);
			clearInterval(ribbon_gal_array['ribbon_gal_' + jQuery(this).attr('data-uniqid')].thmb_interval);

			ribbon_gal_array['ribbon_gal_' + jQuery(this).attr('data-uniqid')].ready_state = false;
			ribbon_gal_array['ribbon_gal_' + jQuery(this).attr('data-uniqid')].full_loaded = false;
		});

				
		jQuery('.ribbon_prevSlide').on('click', function () {
			slideObj = jQuery(this).parents('.ribbon_slider_wrapper').attr('data-uniqid');
			ribbon_prevSlide(slideObj);
		});
		jQuery('.ribbon_nextSlide').on('click', function () {
			slideObj = jQuery(this).parents('.ribbon_slider_wrapper').attr('data-uniqid');
			ribbon_nextSlide(slideObj);
		});

		jQuery('.ribbon_slide').on('click', function(){
			if (!jQuery(this).hasClass('ribbon_current')) {
				slideObj = jQuery(this).parents('.ribbon_slider_wrapper').attr('data-uniqid');
				var set_slide = jQuery(this).attr('data-count');			
				set_ribbon_Slide(set_slide, slideObj);
			}
		});
	}
});

jQuery(window).resize(function () {
	if (jQuery('.ribbon_gallery_trigger').size() > 0) {
		setup_ribbon('all');
		setup_ribbon_video();
	}
});
jQuery(window).load(function () {
	if (jQuery('.ribbon_gallery_trigger').size() > 0) {
		setup_ribbon('all');
		setup_ribbon_video();
	}
});

function ribbon_prevSlide(slideObj) {
	current_slider = jQuery('.ribbon_gal_'+slideObj);
	cur_slide = parseInt(current_slider.find('.ribbon_current').attr('data-count'));
	cur_slide--;
	r_max_slide = current_slider.find('.ribbon_slide').size();
	if (cur_slide > r_max_slide) cur_slide = 1;
	if (cur_slide < 1) cur_slide = r_max_slide;	
	set_ribbon_Slide(cur_slide, slideObj);
}

function ribbon_nextSlide(slideObj) {
	current_slider = jQuery('.ribbon_gal_'+slideObj);
	cur_slide = parseInt(current_slider.find('.ribbon_current').attr('data-count'));
	cur_slide++;
	r_max_slide = current_slider.find('.ribbon_slide').size();
	if (cur_slide > r_max_slide) cur_slide = 1;
	if (cur_slide < 1) cur_slide = r_max_slide;
	set_ribbon_Slide(cur_slide, slideObj);
}

function set_ribbon_Slide(slideNum, slideObj) {
	current_slider = jQuery('.ribbon_gal_'+slideObj);
	r_max_slide = current_slider.find('.ribbon_slide').size();

	clearInterval(ribbon_gal_array['ribbon_gal_' + slideObj].set_interval);

	slideNum = parseInt(slideNum);
	if (r_max_slide < 5) {
		current_slider.find('.ribbon_prev2').removeClass('ribbon_prev2');
		current_slider.find('.ribbon_prev').removeClass('ribbon_prev');
		current_slider.find('.ribbon_current').removeClass('ribbon_current');
		current_slider.find('.ribbon_next').removeClass('ribbon_next');
		current_slider.find('.ribbon_next2').removeClass('ribbon_next2');
		
		var curSlide = current_slider.find('.ribbon_slide'+slideNum);
		curSlide.addClass('ribbon_current');

		if((parseInt(slideNum)+1) > r_max_slide) {
			var nextSlide = current_slider.find('.ribbon_slide1');
		} else if ((parseInt(slideNum)+1) == r_max_slide){
			var nextSlide = current_slider.find('.ribbon_slide'+r_max_slide);
		} else {
			var nextSlide = current_slider.find('.ribbon_slide'+(parseInt(slideNum)+1));
		}
		
		if((parseInt(slideNum)-1) < 1) {
			var prevSlide = current_slider.find('.ribbon_slide'+r_max_slide);
		} else if ((slideNum-1) == 1){
			var prevSlide = current_slider.find('.ribbon_slide1');
		} else {
			var prevSlide = current_slider.find('.ribbon_slide'+(parseInt(slideNum)-1));
		}

		prevSlide.addClass('ribbon_prev');
		curSlide.addClass('ribbon_current');
		nextSlide.addClass('ribbon_next');

		if (parseInt(current_slider.attr('data-pad')) > 0) {
			set_ribbon_pad = parseInt(current_slider.attr('data-pad'));
		} else {
			set_ribbon_pad = 0;
		}
		
		mainOffSet = current_slider.width()*0.5 - curSlide.width()*0.5;
		nextOffset = curSlide.width() + mainOffSet + set_ribbon_pad;
		prevOffset = mainOffSet - prevSlide.width() - set_ribbon_pad;

		nextSlide.css('transform' , 'translateX('+nextOffset+'px)');
		nextSlide2.css('transform' , 'translateX('+nextOffset2+'px)');
		prevSlide.css('transform' , 'translateX('+prevOffset+'px)');
		
	} else {
		current_slider.find('.ribbon_prev2').removeClass('ribbon_prev2');
		current_slider.find('.ribbon_prev').removeClass('ribbon_prev');
		current_slider.find('.ribbon_current').removeClass('ribbon_current');
		current_slider.find('.ribbon_next').removeClass('ribbon_next');
		current_slider.find('.ribbon_next2').removeClass('ribbon_next2');
		
		var curSlide = current_slider.find('.ribbon_slide'+slideNum);
		curSlide.addClass('ribbon_current');

		if((parseInt(slideNum)+1) > r_max_slide) {
			var nextSlide = current_slider.find('.ribbon_slide1');
			var nextSlide2 = current_slider.find('.ribbon_slide2');
		} else if ((parseInt(slideNum)+1) == r_max_slide){
			var nextSlide = current_slider.find('.ribbon_slide'+r_max_slide);
			var nextSlide2 = current_slider.find('.ribbon_slide1');
		} else {
			var nextSlide = current_slider.find('.ribbon_slide'+(parseInt(slideNum)+1));
			var nextSlide2 = current_slider.find('.ribbon_slide'+(parseInt(slideNum)+2));
		}
		
		if((parseInt(slideNum)-1) < 1) {
			var prevSlide = current_slider.find('.ribbon_slide'+r_max_slide);
			var prevSlide2 = current_slider.find('.ribbon_slide'+(r_max_slide-1));
		} else if ((slideNum-1) == 1){
			var prevSlide = current_slider.find('.ribbon_slide1');
			var prevSlide2 = current_slider.find('.ribbon_slide'+r_max_slide);
		} else {
			var prevSlide = current_slider.find('.ribbon_slide'+(parseInt(slideNum)-1));
			var prevSlide2 = current_slider.find('.ribbon_slide'+(parseInt(slideNum)-2));
		}

		prevSlide2.addClass('ribbon_prev2');
		prevSlide.addClass('ribbon_prev');
		curSlide.addClass('ribbon_current');
		nextSlide.addClass('ribbon_next');
		nextSlide2.addClass('ribbon_next2');

		if (parseInt(current_slider.attr('data-pad')) > 0) {
			set_ribbon_pad = parseInt(current_slider.attr('data-pad'));
		} else {
			set_ribbon_pad = 0;
		}
		
		mainOffSet = current_slider.width()*0.5 - curSlide.width()*0.5;
		nextOffset = curSlide.width() + mainOffSet + set_ribbon_pad;
		prevOffset = mainOffSet - prevSlide.width() - set_ribbon_pad;
		nextOffset2 = nextSlide.width() + nextOffset + set_ribbon_pad;
		prevOffset2 = prevOffset - prevSlide2.width() - set_ribbon_pad;
		
		curSlide.css('transform' , 'translateX('+mainOffSet+'px)'); 
		nextSlide.css('transform' , 'translateX('+nextOffset+'px)');
		nextSlide2.css('transform' , 'translateX('+nextOffset2+'px)');
		prevSlide.css('transform' , 'translateX('+prevOffset+'px)');
		prevSlide2.css('transform' , 'translateX('+prevOffset2+'px)');
	}	
	
	if (current_slider.attr('data-autoplay') == 'on') {
		ribbon_gal_array['ribbon_gal_' + slideObj].set_interval = setInterval('ribbon_nextSlide(' + slideObj + ')', current_slider.attr('data-interval'));
	}	
}

function setup_ribbon(cur_slider) {
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
	if (jQuery('.ribbon_fs_on').size() > 0) {
		var fs_ribbon_gal = jQuery('.ribbon_fs_on');
		var setHeight = myWindow.height() - jQuery('header.main_header').height(),
			setTop = jQuery('header.main_header').height();
		if (jQuery('#wpadminbar').size() > 0) {
			setHeight = setHeight - jQuery('#wpadminbar').height();
			//setTop = setTop + jQuery('#wpadminbar').height();
		}
		if (fs_ribbon_gal.attr('data-toppx') !== '') {
			setTop = setTop + parseInt(fs_ribbon_gal.attr('data-toppx'));
		}
		if (fs_ribbon_gal.attr('data-topcont') !== '') {
			if (jQuery(fs_ribbon_gal.attr('data-topcont')).size() > 0) {
				setTop = setTop + parseInt(jQuery(fs_ribbon_gal.attr('data-topcont')).height());
			}
		}
		if (fs_ribbon_gal.attr('data-decpx') !== '') {
			setHeight = setHeight - parseInt(fs_ribbon_gal.attr('data-decpx'));
		}
		if (fs_ribbon_gal.attr('data-deccont') !== '') {
			var str = fs_ribbon_gal.attr('data-deccont'),
			deccont_obj = str.split(' ');
			for (var i = 0; i < deccont_obj.length; i++) {
				if (jQuery(deccont_obj[i]).size() > 0) {
					setHeight = setHeight - jQuery(deccont_obj[i]).height();
				}
			}
		}
		
		jQuery('.gt3_content_holder').height(setHeight);
		fs_ribbon_gal.height(setHeight - jQuery('header.main_header').height()).css('top', setTop+'px');
		fs_ribbon_gal.find('.ribbon_slider').height(parseInt(setHeight - jQuery('header.main_header').height()));
		fs_ribbon_gal.find('.ribbon_slide').height(parseInt(setHeight - jQuery('header.main_header').height()));
		fs_ribbon_gal.find('.ribbon_slide').each(function(){
			jQuery(this).width((setHeight - jQuery('header.main_header').height())*jQuery(this).attr('data-ratio'));
		});
		
		
		if (fs_ribbon_gal.find('.ribbon_current').size() < 1) {
			set_ribbon_Slide(1, fs_ribbon_gal.attr('data-uniqid'));
		}
	} else if (cur_slider == 'all') {
		ribbon_slider_wrapper.each(function(){
			setHeight = jQuery(this).attr('data-height');
			if (setHeight == '100%') {
				jQuery(this).css('height', '100vh');
				jQuery(this).find('.ribbon_slider').css('height', '100vh');
				jQuery(this).find('.ribbon_slide').css('height', '100vh');
				jQuery(this).find('.ribbon_slide').each(function(){
					jQuery(this).width(jQuery(this).height()*jQuery(this).attr('data-ratio'));
				});
			} else {
				jQuery(this).height(parseInt(setHeight));
				jQuery(this).find('.ribbon_slider').height(parseInt(setHeight));
				jQuery(this).find('.ribbon_slide').height(parseInt(setHeight));
				jQuery(this).find('.ribbon_slide').each(function(){
					jQuery(this).width(jQuery(this).height()*jQuery(this).attr('data-ratio'));
				});
			}
			
			if (jQuery(this).find('.ribbon_current').size() < 1) {
				set_ribbon_Slide(1, jQuery(this).attr('data-uniqid'));
			}
		});		
	} else {
		current_slider = jQuery('.ribbon_gal_'+cur_slider);
		setHeight = current_slider.attr('data-height');
		if (setHeight == '100%') {
			current_slider.css('height', '100vh');
			current_slider.find('.ribbon_slider').css('height', '100vh');
			current_slider.find('.ribbon_slide').css('height', '100vh');
			current_slider.find('.ribbon_slide').each(function(){
				jQuery(this).width(jQuery(this).height()*jQuery(this).attr('data-ratio'));
			});
		} else {
			current_slider.height(parseInt(setHeight));
			current_slider.find('.ribbon_slider').height(parseInt(setHeight));
			current_slider.find('.ribbon_slide').height(parseInt(setHeight));
			current_slider.find('.ribbon_slide').each(function(){
				jQuery(this).width(jQuery(this).height()*jQuery(this).attr('data-ratio'));
			});
		}

		if (current_slider.find('.ribbon_current').size() < 1) {
			set_ribbon_Slide(1, cur_slider);
		}		
	}
}

function setup_ribbon_video() {
	ribbon_slider.find('iframe').each(function(){		
		var video_height = jQuery(this).parent('.ribbon_slide').height(),
			video_width = (video_height/9)*16;
		if (video_width > myWindow.width()) {
			video_width = myWindow.width() - parseInt(jQuery(this).css('margin-left')) - parseInt(jQuery(this).css('margin-right'));
		}
		jQuery(this).width(video_width).height(video_height);
		jQuery(this).parent('.ribbon_slide').width(video_width);
	});
}

function run_ribbon_slider() {

}