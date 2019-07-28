/* FS Slider 1.6.12.06 4Modules */
var	html = jQuery('html'),
	fs_slider_wrapper = jQuery('.fs_gallery_wrapper'),
	fs_slider = jQuery('.fs_slider'),
	fs_gallery_template = jQuery('.fs_gallery_template'),
	fs_title_wrapper = jQuery('.fs_title_wrapper'),
	fs_title = jQuery('.fs_title'),
	fs_descr = jQuery('.fs_descr'),
	fs_btn_prev = jQuery('.fs_slider_prev'),
	fs_btn_next = jQuery('.fs_slider_next'),
	fs_controls = jQuery('.fs_controls'),
	max_slide = fs_slider.find('.fs_slide').size(),
	fs_overlay = jQuery('.fs_overlay'),
	fs_thmb_viewport = jQuery('.fs_thmb_viewport'),
	fs_thumbs = jQuery('.fs_thumbs'),
	set_video_controls = fs_slider.attr('data-video'),
	fs_thumb_slide = jQuery('.thmb_slide'),
	fs_gal_array = [];

/* YouTube API */
var tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

html.addClass('fs_gallery_page');

/* Start FS Gallery */
if (jQuery('.fs_gallery_trigger').size() > 0) {
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
			if (jQuery('.hovered_fsgal_module').size() > 0) {
				event.preventDefault();
				fs_prevSlide(jQuery('.hovered_fsgal_module').attr('data-uniqid'));
			}
		}
		if ((event.keyCode == 39)) {
			if (jQuery('.hovered_fsgal_module').size() > 0) {
				event.preventDefault();
				fs_nextSlide(jQuery('.hovered_fsgal_module').attr('data-uniqid'));
			}
		}
	});
}

jQuery(document).on('mouseenter', '.fs_gallery_wrapper', function(e){
	jQuery(this).addClass('hovered_fsgal_module');
}).on('mouseleave', '.fs_gallery_wrapper', function(e){
	jQuery(this).removeClass('hovered_fsgal_module');
})

jQuery(document).ready(function ($) {	
	fs_slider_wrapper.each(function(){
		fs_gal_array['fs_gal_' + jQuery(this).attr('data-uniqid')] = {};
		fs_gal_array['fs_gal_' + jQuery(this).attr('data-uniqid')].id = jQuery(this).attr('data-uniqid');
		fs_gal_array['fs_gal_' + jQuery(this).attr('data-uniqid')].autoplay = jQuery(this).attr('data-autoplay');
		fs_gal_array['fs_gal_' + jQuery(this).attr('data-uniqid')].set_interval = setInterval('fs_nextSlide('+ jQuery(this).attr('data-uniqid') +')', jQuery(this).attr('data-interval'));
		jQuery(this).find('.fs_play_pause').addClass('fs_state_play');
		if (jQuery(this).attr('data-autoplay') == 'off') {
			jQuery(this).find('.fs_play_pause').removeClass('fs_state_play');
			clearInterval(fs_gal_array['fs_gal_' + jQuery(this).attr('data-uniqid')].set_interval);
		}

		fs_gal_array['fs_gal_' + jQuery(this).attr('data-uniqid')].thmb_interval = setInterval(function () {}, 100);
		clearInterval(fs_gal_array['fs_gal_' + jQuery(this).attr('data-uniqid')].thmb_interval);

		fs_gal_array['fs_gal_' + jQuery(this).attr('data-uniqid')].ready_state = false;
		fs_gal_array['fs_gal_' + jQuery(this).attr('data-uniqid')].full_loaded = false;

	});

	if (jQuery('.fs_gallery_trigger').size() > 0) {
		if (jQuery('.fs_style_on').size() > 0) {
			jQuery('.main_wrapper').addClass('like_fullscreen_type');
			html.addClass('fullscreen_slider');
			//Touch Events
			/* None */
			
			jQuery('.fs_controls_toggler').on('click', function () {
				html.toggleClass('hide_fs_controls');
			});
		} else {
			jQuery('.fs_controls_toggler').on('click', function () {
				fs_slider_wrapper.toggleClass('hide_fs_controls');
			});			
		}
		
		jQuery('.fs_slider_prev').on('click', function () {
			slideObj = jQuery(this).parents('.fs_gallery_wrapper').attr('data-uniqid');
			fs_prevSlide(slideObj);
		});
		jQuery('.fs_slider_next').on('click', function () {
			slideObj = jQuery(this).parents('.fs_gallery_wrapper').attr('data-uniqid');
			fs_nextSlide(slideObj);
		});
		
		jQuery('.fs_slider_controls').on('click', function () {
			slideObj = jQuery(this).parents('.fs_gallery_wrapper');
			if (slideObj.hasClass('fs_style_on')) {
				html.toggleClass('fullview_fs_slider');
			} else {
				slideObj.toggleClass('fullview_fs_slider');
			}
		});
		jQuery('.fs_play_pause').on('click', function(){
			current_slider = jQuery(this).parents('.fs_gallery_wrapper');
			slideObj = jQuery(this).parents('.fs_gallery_wrapper').attr('data-uniqid');
			if (jQuery(this).hasClass('fs_state_play')) {
				clearInterval(fs_gal_array['fs_gal_' + slideObj].set_interval);
			} else {
				if (!jQuery(this).hasClass('paused_by_video')) {
					fs_gal_array['fs_gal_' + slideObj].set_interval = setInterval('fs_nextSlide('+slideObj+')', current_slider.attr('data-interval'));
				}
			}
			jQuery(this).toggleClass('fs_state_play');
		});
		
		if (jQuery('.fs_thumbs').size() > 0) {
			fs_thumbs_setup();
		}
		fs_thumb_slide.on('click', function(){
			slideObj = jQuery(this).parents('.fs_gallery_wrapper').attr('data-uniqid');
			var setThmb = jQuery(this).attr('data-count');
			fs_setSlide(setThmb, slideObj);
		});
		jQuery('.bullet_slide ').on('click', function() {
			slideObj = jQuery(this).parents('.fs_gallery_wrapper').attr('data-uniqid');
			var setThmb = jQuery(this).attr('data-count');
			fs_setSlide(setThmb, slideObj);
		});
	}
});

jQuery(window).resize(function () {
	if (jQuery('.fs_gallery_trigger').size() > 0) {
		setup_fs_gallery('all');
		setVideoFrame();
	}
});

function fs_prevSlide(cur_slider) {
	current_slider = jQuery('.fs_gal_'+cur_slider);
	cur_slide = parseInt(current_slider.find('.current-slide').attr('data-count'));
	cur_slide--;
	max_slide = current_slider.find('.fs_slide').size();
	if (cur_slide > max_slide) cur_slide = 1;
	if (cur_slide < 1) cur_slide = max_slide;	
	fs_setSlide(cur_slide, cur_slider);
}

function fs_nextSlide(cur_slider) {	
	current_slider = jQuery('.fs_gal_'+cur_slider);
	cur_slide = parseInt(current_slider.find('.current-slide').attr('data-count'));
	cur_slide++;
	max_slide = current_slider.find('.fs_slide').size();
	if (cur_slide > max_slide) cur_slide = 1;
	if (cur_slide < 1) cur_slide = max_slide;
	fs_setSlide(cur_slide, cur_slider);
}

function fs_setSlide(slideNum, cur_slider) {	
	current_slider = jQuery('.fs_gal_'+cur_slider);
	clearInterval(fs_gal_array['fs_gal_' + cur_slider].set_interval);
	slideNum = parseInt(slideNum);
	max_slide = current_slider.find('.fs_slide').size();

	current_slider.find('.prev-slide').removeClass('prev-slide');
	current_slider.find('.current-slide').removeClass('current-slide');
	current_slider.find('.next-slide').removeClass('next-slide');

	if((parseInt(slideNum)+1) > max_slide) {
		nextSlide = current_slider.find('.fs_slide1');
	} else if ((parseInt(slideNum)+1) == max_slide){
		nextSlide = current_slider.find('.fs_slide'+max_slide);
	} else {
		nextSlide = current_slider.find('.fs_slide'+(parseInt(slideNum)+1));
	}
	
	if((parseInt(slideNum)-1) < 1) {
		prevSlide = current_slider.find('.fs_slide'+max_slide);
	} else if ((slideNum-1) == 1){
		prevSlide = current_slider.find('.fs_slide1');
	} else {
		prevSlide = current_slider.find('.fs_slide'+(parseInt(slideNum)-1));
	}

	prevSlide.addClass('prev-slide');
	var curSlide = current_slider.find('.fs_slide'+slideNum);
	
	curSlide.addClass('current-slide');
	nextSlide.addClass('next-slide');
	
	if (prevSlide.find('iframe').size() > 0) {
		prevSlide.find('iframe').remove();
	}
	if (nextSlide.find('iframe').size() > 0) {
		nextSlide.find('iframe').remove();
	}
	if (prevSlide.find('div').size() > 0) {
		prevSlide.find('div').remove();
	}
	if (nextSlide.find('div').size() > 0) {
		nextSlide.find('div').remove();
	}
	current_slider.find('.fs_descr').fadeOut(500, function () {
		if (!html.hasClass('gallery_started')) html.addClass('gallery_started');
		setTimeout("current_slider.find('.fs_descr').html(current_slider.find('.current-slide').attr('data-descr'))",100);
		setTimeout("current_slider.find('.fs_descr').fadeIn(500)",200);
	});
	current_slider.find('.fs_title').fadeOut(500, function () {
		setTimeout("current_slider.find('.fs_title').html(current_slider.find('.current-slide').attr('data-title'))",100);
		setTimeout("current_slider.find('.fs_title').fadeIn(500)",200);
	});
	
	if (curSlide.attr('data-type') == 'image' && !curSlide.hasClass('block_loaded'))  {
		curSlide.attr('style', 'background:none');
		slide_not_loaded(curSlide.attr('data-count'));
	} else {
		current_slider.find('.paused_by_video').removeClass('paused_by_video');	
		if (curSlide.attr('data-type') == 'image') {
			curSlide.attr('style', 'background:url(' + curSlide.attr('data-src') + ') no-repeat;');		
		} else if (curSlide.attr('data-type') == 'youtube') {
			curSlide.attr('style', 'background:url(' + curSlide.attr('data-bg') + ') no-repeat;');
			add_YT_video(cur_slider);
			current_slider.find('.fs_play_pause').addClass('paused_by_video');
		} else {
			curSlide.attr('style', 'background:url(' + curSlide.attr('data-bg') + ') no-repeat;');
			current_slider.find('.fs_play_pause').addClass('paused_by_video');
			add_vimeo_video(cur_slider);
		}
			
		if (nextSlide.attr('data-type') == 'image') {
			nextSlide.attr('style', 'background:url(' + nextSlide.attr('data-src') + ') no-repeat;');
		} else if (nextSlide.attr('data-type') == 'youtube') {
			nextSlide.attr('style', 'background:url(' + nextSlide.attr('data-bg') + ') no-repeat;');		
		} else {
			nextSlide.attr('style', 'background:url(' + nextSlide.attr('data-bg') + ') no-repeat;');
		}
	
		if (prevSlide.attr('data-type') == 'image') {
			prevSlide.attr('style', 'background:url(' + prevSlide.attr('data-src') + ') no-repeat;');
		} else if (prevSlide.attr('data-type') == 'youtube') {
			prevSlide.attr('style', 'background:url(' + prevSlide.attr('data-bg') + ') no-repeat;');
		} else {
			prevSlide.attr('style', 'background:url(' + prevSlide.attr('data-bg') + ') no-repeat;');
		}

		if (!prevSlide.hasClass('was_showed')) {
			prevSlide.addClass('was_showed');
		}
		if (!curSlide.hasClass('was_showed')) {
			curSlide.addClass('was_showed');
		}
		if (!nextSlide.hasClass('was_showed')) {
			nextSlide.addClass('was_showed');
		}

		if (current_slider.find('.thmb_slide').size() > 0) {
			if (max_slide < 5) {
				current_slider.find('.fs_thmb_prev').removeClass('fs_thmb_prev');
				current_slider.find('.fs_thmb_current').removeClass('fs_thmb_current');
				current_slider.find('.fs_thmb_next').removeClass('fs_thmb_next');
				
				var curSlide = current_slider.find('.thmb_slide'+slideNum);
				curSlide.addClass('fs_thmb_current');
		
				if((parseInt(slideNum)+1) > max_slide) {
					var nextSlide = current_slider.find('.thmb_slide1');
				} else if ((parseInt(slideNum)+1) == max_slide){
					var nextSlide = current_slider.find('.thmb_slide'+max_slide);
				} else {
					var nextSlide = current_slider.find('.thmb_slide'+(parseInt(slideNum)+1));
				}
				
				if((parseInt(slideNum)-1) < 1) {
					var prevSlide = current_slider.find('.thmb_slide'+max_slide);
				} else if ((slideNum-1) == 1){
					var prevSlide = current_slider.find('.thmb_slide1');
				} else {
					var prevSlide = current_slider.find('.thmb_slide'+(parseInt(slideNum)-1));
				}
		
				prevSlide.addClass('fs_thmb_prev');
				curSlide.addClass('fs_thmb_current');
				nextSlide.addClass('fs_thmb_next');
	
			} else {
				current_slider.find('.fs_thmb_prev2').removeClass('fs_thmb_prev2')
				current_slider.find('.fs_thmb_prev').removeClass('fs_thmb_prev');
				current_slider.find('.fs_thmb_current').removeClass('fs_thmb_current');
				current_slider.find('.fs_thmb_next').removeClass('fs_thmb_next');
				current_slider.find('.fs_thmb_next2').removeClass('fs_thmb_next2');
				
				var curSlide = current_slider.find('.thmb_slide'+slideNum);
				curSlide.addClass('fs_thmb_current');
		
				if((parseInt(slideNum)+1) > max_slide) {
					var nextSlide = current_slider.find('.thmb_slide1');
					var nextSlide2 = current_slider.find('.thmb_slide2');
				} else if ((parseInt(slideNum)+1) == max_slide){
					var nextSlide = current_slider.find('.thmb_slide'+max_slide);
					var nextSlide2 = current_slider.find('.thmb_slide1');
				} else {
					var nextSlide = current_slider.find('.thmb_slide'+(parseInt(slideNum)+1));
					var nextSlide2 = current_slider.find('.thmb_slide'+(parseInt(slideNum)+2));
				}
				
				if((parseInt(slideNum)-1) < 1) {
					var prevSlide = current_slider.find('.thmb_slide'+max_slide);
					var prevSlide2 = current_slider.find('.thmb_slide'+(max_slide-1));
				} else if ((slideNum-1) == 1){
					var prevSlide = current_slider.find('.thmb_slide1');
					var prevSlide2 = current_slider.find('.thmb_slide'+max_slide);
				} else {
					var prevSlide = current_slider.find('.thmb_slide'+(parseInt(slideNum)-1));
					var prevSlide2 = current_slider.find('.thmb_slide'+(parseInt(slideNum)-2));
				}
		
				prevSlide2.addClass('fs_thmb_prev2');
				prevSlide.addClass('fs_thmb_prev');
				curSlide.addClass('fs_thmb_current');
				nextSlide.addClass('fs_thmb_next');
				nextSlide2.addClass('fs_thmb_next2');	
			}
		}
		
		if (current_slider.find('.fs_bullets').size() > 0) {
			current_slider.find('.current_bullet').removeClass('current_bullet');
			current_slider.find('.bullet_slide'+slideNum).addClass('current_bullet');
		}
		
		setVideoFrame();
		if (current_slider.find('.fs_play_pause').hasClass('fs_state_play') && !current_slider.find('.fs_play_pause').hasClass('paused_by_video')) {
			fs_gal_array['fs_gal_' + cur_slider].set_interval = setInterval('fs_nextSlide('+cur_slider+')', current_slider.attr('data-interval'));
		}		
	}
}
function setup_fs_gallery(cur_slider) {	
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
	if (jQuery('.fs_style_on').size() > 0) {
		//Fullscreen Slider Setup
		if (jQuery('.fs_style_on').size() > 1) {
			jQuery('.fs_style_on:not(:first)').remove();
		}
		var fs_gal = jQuery('.fs_style_on');
		var setHeight = myWindow.height() - jQuery('header.main_header').height(),
			setWidth = myWindow.width(),
			setTop = jQuery('header.main_header').height();
		if (jQuery('.aside_header').size() > 0) {
			setWidth = myWindow.width() - jQuery('.aside_header').width();
		}
		if (jQuery('#wpadminbar').size() > 0) {
			setHeight = setHeight - jQuery('#wpadminbar').height();
			//setTop = setTop + jQuery('#wpadminbar').height();
		}
		if (fs_gal.attr('data-toppx') !== '') {
			setTop = setTop + parseInt(fs_gal.attr('data-toppx'));
		}
		if (fs_gal.attr('data-topcont') !== '') {
			if (jQuery(fs_gal.attr('data-topcont')).size() > 0) {
				setTop = setTop + parseInt(jQuery(fs_gal.attr('data-topcont')).height());
			}
		}
		if (fs_gal.attr('data-decpx') !== '') {
			setHeight = setHeight - parseInt(fs_gal.attr('data-decpx'));
		}
		if (fs_gal.attr('data-deccont') !== '') {
			var str = fs_gal.attr('data-deccont'),
			deccont_obj = str.split(' ');
			for (var i = 0; i < deccont_obj.length; i++) {
				if (jQuery(deccont_obj[i]).size() > 0) {
					setHeight = setHeight - jQuery(deccont_obj[i]).height();
				}
			}
		}
		jQuery('.gt3_content_holder').height(setHeight);
		fs_gal.height(setHeight - jQuery('header.main_header').height()).css('top', setTop+'px');
		if (fs_gal.find('.current-slide').size() < 1) {
			fs_setSlide(1, fs_gal.attr('data-uniqid'));
		}		
	} else {		
		if (cur_slider == 'all') {
			fs_slider_wrapper.each(function(){
				setHeight = jQuery(this).attr('data-height');
				if (setHeight == '100%') {
					jQuery(this).css('height', '100vh');
				} else {
					jQuery(this).height(parseInt(setHeight));
				}
				if (jQuery(this).find('.current-slide').size() < 1) {
					fs_setSlide(1, jQuery(this).attr('data-uniqid'));
				}
			});
		} else {
			current_slider = jQuery('.fs_gal_'+cur_slider);
			setHeight = current_slider.attr('data-height');
			if (setHeight == '100%') {
				current_slider.css('height', '100vh');
			} else {
				current_slider.height(parseInt(setHeight));
			}
			if (current_slider.find('.current-slide').size() < 1) {
				fs_setSlide(1, cur_slider);
			}
		}		
	}
	fs_thumbs_setup();
}

function run_fs_slider(cur_slider) {
	current_slider = jQuery('.fs_gal_'+cur_slider);
	current_slider.find('.fs_slider').addClass('started');
	if (current_slider.find('.fs_slider').hasClass('autoplay')) {
		current_slider.find('.fs_play_pause').addClass('fs_state_play');
		clearInterval(fs_gal_array['fs_gal_' + current_slider.attr('data-uniqid')].set_interval);
		fs_gal_array['fs_gal_' + current_slider.attr('data-uniqid')].set_interval = setInterval('fs_nextSlide('+cur_slider+')', current_slider.attr('data-interval'));
	}
	fs_thumbs_setup();
	fs_setSlide(1, cur_slider);
}

function slide_not_loaded(slide_num, cur_slider) {
	current_slider = jQuery('.fs_gal_'+cur_slider);
	slide_num = parseInt(slide_num);
	var curSlide = current_slider.find('.fs_slide'+slide_num);
	if (curSlide.attr('data-type') == 'image' && !curSlide.hasClass('block_loaded'))  {
		curSlide.attr('style', 'background:none');
		setTimeout("slide_not_loaded(current_slider.find('.current-slide').attr('data-count'), cur_slider)",500);	
	} else {
		fs_setSlide(slide_num,cur_slider);
	}
}

function fs_thumbs_setup() {
	
}

//Video Functions
function onPlayerReady(event) {
        event.target.playVideo();
      }
function onPlayerStateChange(event) {
	var yt_cut_state = event.data;
	if (yt_cut_state == 0) {
		if (jQuery('.fs_play_pause').hasClass('fs_state_play')) {
			cur_slide_obj = jQuery('.current-slide');
			cur_slide = parseInt(jQuery('.current-slide').attr('data-count'));
			cur_slider = cur_slide_obj.parents('.fs_gallery_wrapper').attr('data-uniqid');
			current_slider = cur_slide_obj.parents('.fs_gallery_wrapper');
			cur_slide++;
			max_slide = current_slider.find('.fs_slide').size();
			if (cur_slide > max_slide) cur_slide = 1;
			if (cur_slide < 1) cur_slide = max_slide;
			fs_setSlide(cur_slide, cur_slider);			
		}
	}
	if (yt_cut_state == 1) {
	}
}
function stopVideo() {
	player.stopVideo();
}
function onYouTubeIframeAPIReady() {
	fs_gallery_template.addClass('yt_ready');
}
function add_YT_video() {
	curSlide = jQuery('.fs_slide.current-slide');
	curSlide.append('<div id="player"></div>')
	var player;
	if (fs_gallery_template.hasClass('yt_ready')){
		player = new YT.Player('player', {
			height: '100%',
			width: '100%',
			playerVars: { 'rel': 0, 'disablekb': 1 },
			videoId: curSlide.attr('data-src'),
			events: {
				'onReady': onPlayerReady,
				'onStateChange': onPlayerStateChange
			}
		});
		setVideoFrame();
	} else {
		settimeout("add_YT_video()",500);
	}	
}
function add_vimeo_video() {
	curSlide = jQuery('.fs_slide.current-slide');
	curSlide.append('<div id="vimeo_player"></div>')
    var options = {
        id: curSlide.attr('data-src'),
        width: '100%',
        loop: false,
		autoplay: true
    };
	var v_player = new Vimeo.Player('vimeo_player', options);
	setVideoFrame();
	v_player.on('play', function() {
    });
	v_player.on('ended', function() {
		if (jQuery('.fs_play_pause').hasClass('fs_state_play')) {
			cur_slide_obj = jQuery('.current-slide');
			cur_slide = parseInt(jQuery('.current-slide').attr('data-count'));
			cur_slider = cur_slide_obj.parents('.fs_gallery_wrapper').attr('data-uniqid');
			current_slider = cur_slide_obj.parents('.fs_gallery_wrapper');
			cur_slide++;
			max_slide = current_slider.find('.fs_slide').size();
			if (cur_slide > max_slide) cur_slide = 1;
			if (cur_slide < 1) cur_slide = max_slide;
			fs_setSlide(cur_slide, cur_slider);
		}
    });
	v_player.on('loaded', function() {
        setVideoFrame();
    });
}

function setVideoFrame() {
	jQuery('.video_cover').each(function() {
		if (myWindow.width() > 1024) {
			if (jQuery('iframe').size() > 0) {
				if (((jQuery(this).height() + 150) / 9) * 16 > jQuery(this).width()) {
					jQuery(this).find('iframe').height(jQuery(this).height() + 150).width(((jQuery(this).height() + 150) / 9) * 16);
					jQuery(this).find('iframe').css({
						'margin-left': (-1 * jQuery(this).find('iframe').width() / 2) + 'px',
						'top': "-75px",
						'margin-top': '0px'
					});
				} else {
					jQuery(this).find('iframe').width(jQuery(this).width()).height(((jQuery(this).width()) / 16) * 9);
					jQuery(this).find('iframe').css({
						'margin-left': (-1 * jQuery('iframe').width() / 2) + 'px',
						'margin-top': (-1 * jQuery('iframe').height() / 2) + 'px',
						'top': '50%'
					});
				}
			}
		} else {
			jQuery('iframe').height(myWindow.height()).width(myWindow.width()).css({
				'top': '0px',
				'margin-left' : '0px',
				'left' : '0px',
				'margin-top': '0px'
			});			
		}
	});	
}
