"use strict";
var header = jQuery('.main_header'),
	header_holder = jQuery('.header_holder'),
	footer = jQuery('.footer_area'),
	main_wrapper = jQuery('.main_wrapper'),
	site_wrapper = jQuery('.site_wrapper'),
	nav = jQuery('nav.main_nav'),
	menu = nav.find('ul.menu'),
	html = jQuery('html'),
	body = jQuery('body'),
	myWindow = jQuery(window),
	is_masonry = jQuery('.is_masonry'),
	fl_container = jQuery('.fl-container'),
	socials_wrapper = jQuery('.socials_wrapper'),
	gt3_imgs2preload = [],
	gt3_pp_array = {},
	aside_menu_nav = jQuery('.aside_main_nav'),
	aside_menu = jQuery('.aside_main_nav ul.menu'),
	aside_header_title = jQuery('.aside_header .header_title');
var timeout;
var menuStep = 200,
	menuGround = aside_menu_nav.height(),
	menuThisTop = 0,
	deltaY = 0;

jQuery(document).ready(function($) {
	/* Comments */
	if (jQuery('ol.commentlist').size() > 0) {
		jQuery('ol.commentlist li').each(function(){
			if (jQuery(this).children('ul.children').size() > 0) {
				jQuery(this).addClass('has_replays');
			}
		})
	}
	
	/* 404 */
	if (jQuery('#wpadminbar').size() > 0) {
		jQuery('html').addClass('has_admin_bar');
	}
	if (jQuery('.wrapper_404').size() > 0) {
		jQuery('html').addClass('page_404');
	}
	if (jQuery('.wrapper_pp').size() > 0) {
		jQuery('html').addClass('page_pp');
	}
	
	/* Link # to Void(0) */
    jQuery("a[href='#']").each(function () {
		jQuery(this).attr('href', 'javascript:void(0)');
    });
	
	//Menu
	if (header.size() > 0) {
		jQuery('.mobile_menu_toggler').on('click', function() {
			jQuery('.mobile_menu_wrapper').stop().slideToggle(300);
			jQuery(this).toggleClass('show_mobile_header');
		});
	}
	if (jQuery('.swipebox').size() > 0) {
		jQuery('html').addClass('gt3_swipe_box');
		jQuery('.swipebox').swipebox_pg();
	}
	if (jQuery('.fadeOnLoad').size() > 0) {
		setTimeout("jQuery('.fadeOnLoad').animate({'opacity' : '1'}, 500)", 500);
	}
	gt3_content_update();

	if (jQuery('.bg404').size() > 0) {
		html.addClass('page404');
	}

	if(jQuery('.gt3_js_bg_img').size() > 0) {
		jQuery('.gt3_js_bg_img').each(function(){
			jQuery(this).css('background-image', 'url('+jQuery(this).attr('data-src')+')');
		});
	}
	if(jQuery('.gt3_js_bg_color').size() > 0) {
		jQuery('.gt3_js_bg_color').each(function(){
			jQuery(this).css('background-color', jQuery(this).attr('data-bgcolor'));
		});
	}
	if(jQuery('.gt3_js_color').size() > 0) {
		jQuery('.gt3_js_color').each(function(){
			jQuery(this).css('color', jQuery(this).attr('data-color'));
		});
	}
	if(jQuery('.gt3_js_transition').size() > 0) {
		jQuery('.gt3_js_transition').each(function(){
			var transition_time = jQuery(this).attr('data-transition') + 'ms';
			jQuery(this).css({'transition-duration': transition_time});
		});
	}
	if(jQuery('.gt3_js_height').size() > 0) {
		jQuery('.gt3_js_height').each(function(){
			jQuery(this).css('height', jQuery(this).attr('data-height'));
		});
	}

	if (jQuery('.personal_preloader').size() > 0) {
		if (jQuery('.gt3_preloader_content').size() > 0) {
			jQuery('.gt3_preloader_content').remove();
		}
		init_personal_preloader();
	}

	if (jQuery('.global_count_wrapper').size() > 0 ) {
		html.addClass('page_coming_soon');
		jQuery('.bg_coundown').css('background-image', 'url('+ jQuery('.bg_coundown').attr('data-bg') +')');
	}
	jQuery('.nivoSlider').each(function(){
		jQuery(this).nivoSlider({
			directionNav: true,
			controlNav: false,
			effect:'fade',
			pauseTime:4000,
			prevText:"<span></span>",
			nextText:"<span></span>",
			slices: 1
		});
	});

	jQuery('.featured_video_play').on('click', function(){
		jQuery(this).parents('.featured_video_wrapper').addClass('show_video');
		jQuery(this).parents('.featured_video_wrapper').find('iframe')[0].src += "&autoplay=1";
	});

	// GT3 Flicker Widget
	gt3_flickr_widget ();

	// Sidebar hover
	if (jQuery('.sidepanel').size() > 0) {
		jQuery('.sidepanel').each(function () {
			jQuery(this).find('li > a').mouseenter(function(){
				jQuery(this).parent().addClass('active_list_item');
			}).mouseleave(function(){
				jQuery(this).parent().removeClass('active_list_item');
			});
		});
	}

	// GT3 Counter
	if (jQuery('.gt3_module_counter').length) {
		gt3_initCounter();
	}

	// GT3 Message Box
	if (jQuery('.gt3_message_box').length) {
		gt3_message_close();
	}

	// GT3 Testimonials List
	gt3_testimonials_list ();

	// Gt3 ajax_sorting
	var ajax_sorting_block_html = jQuery('.ajax_sorting_block');
	if (ajax_sorting_block_html.length) {
		ajax_sorting_block_html.each(function(){
			jQuery(".load_more_works").on("click", function(){

				var this_parent_container = jQuery(this).parents('.gt3_module_portfolio'),
					append_container = this_parent_container.find('.ajax_sorting_block'),
					posts_per_page = append_container.attr('data-posts_per_page'),
					view_type = append_container.attr('data-view_type'),
					posts_per_line = append_container.attr('data-posts_per_line'),
					post_type_terms = append_container.attr('data-post_type_terms'),
					order = append_container.attr('data-order'),
					orderby = append_container.attr('data-orderby'),
					image_proportions = append_container.attr('data-image_proportions'),
					items_per_click = append_container.attr('data-items_per_click'),
					posts_already_showed = append_container.attr('data-already_showed');

				gt3_get_posts("gt3_get_posts", this_parent_container, append_container, "portfolio", items_per_click, posts_already_showed, view_type, posts_per_line, post_type_terms, order, orderby, image_proportions);

				posts_already_showed = parseInt(posts_already_showed, 10) + parseInt(items_per_click, 10);
				append_container.attr('data-already_showed', posts_already_showed);
				return false;
			});
		});
	}

	// Flexslider Update
	gt3_flex_update();

	// GT3 Services Box
	gt3_services_box ();

	// Gt3 Carousel List
	gt3_carousel_list ();

	// Video Popup
	if (jQuery('.swipebox-video').size() > 0) {
		jQuery('html').addClass('gt3_swipe_box');
		jQuery('.swipebox-video').swipebox_pg();
	}

	// Progress Bar
	if (jQuery('.vc_progress_bar').length) {
		jQuery('.vc_single_bar').each(function () {
			var data_units = jQuery(this).find('.vc_label_units').html();
			jQuery(this).find('.vc_bar ').attr('data-units-bar', data_units);
		});
	}

	// Gt3 coming soon
	gt3_coming_soon ();

	/* RS slider count info */
	var rev_slider_tag = jQuery('.rev_slider');
	if (rev_slider_tag.length) {
		rev_slider_tag.each(function() {
			jQuery(this).append('<div class="gt3_slider_count_info" />');

			var id = jQuery(this).attr('id'),
				api = eval('revapi' + id.split('rev_slider_')[1].split('_')[0]);

			api.bind("revolution.slide.onchange",function (e,data) {
				var slider_counts = jQuery(this).find('.tp-revslider-slidesli').length;
				var current_slide = data.slideLIIndex + 1;

				if (slider_counts > 1) {
					jQuery(this).find('.gt3_slider_count_info').html(current_slide+'<span>-</span>'+slider_counts);
				}

			});
		});
	}
	
	jQuery('.gt3_search_toggler').on('click',function(){
		jQuery('html').addClass('showed_header_search');
		jQuery('.header_search_input').focus();
	});
	jQuery('.header_search_input').on('blur',function(){
		jQuery('html').removeClass('showed_header_search');
	});
	
});

function init_personal_preloader() {
	if (jQuery('.shift_block2preload').size() > 0) {
		//Run Preloading Shift Items
		init_pp4shift();
	}
	if (jQuery('.fs_block2preload').size() > 0) {
		init_pp4fs_slider();
	}
	if (jQuery('.stripe_block2preload').size() > 0) {
		init_pp4stripe_slider();
	}
	if (jQuery('.flow_block2preload').size() > 0) {
		init_pp4flow_slider();
	}
	if (jQuery('.ribbon_block2preload').size() > 0) {
		init_pp4ribbon_slider();
	}
	if (jQuery('.circles_block2preload').size() > 0) {
		init_pp4circles_slider();
	}
}
function init_pp4ribbon_slider() {
	if (jQuery('.ribbon_block2preload:first').size() > 0) {
		var $this_obj = jQuery('.ribbon_block2preload:first');
		(function (img, src) {
			img.src = src;			
			img.onload = function () {
				$this_obj.removeClass('ribbon_block2preload').addClass('block_loaded').animate({					
					'z-index': '3'
				}, 100, function() {					
					init_pp4ribbon_slider();
				});
			};                
		}(new Image(), $this_obj.find('img').attr('src')));

		if ($this_obj.parents('.ribbon_slider_wrapper').find('.ribbon_slide1').hasClass('block_loaded') && !$this_obj.parents('.ribbon_slider_wrapper').find('.ribbon_slider').hasClass('started')) {
			$this_obj.parents('.ribbon_slider_wrapper').find('.ribbon_slider').addClass('started');
			setup_ribbon($this_obj.parents('.ribbon_slider_wrapper').attr('data-uniqid'));
		}
	}
}

function init_pp4flow_slider() {
	if (jQuery('.flow_block2preload:first').size() > 0) {
		var $this_obj = jQuery('.flow_block2preload:first');
		(function (img, src) {
			img.src = src;			
			img.onload = function () {
				$this_obj.removeClass('flow_block2preload').addClass('block_loaded').animate({					
					'z-index': '3'
				}, 100, function() {					
					init_pp4flow_slider();
				});
			};                
		}(new Image(), $this_obj.find('img').attr('src')));

		if ($this_obj.parents('.flow_slider_wrapper').find('.flow_slide1').hasClass('block_loaded') && !$this_obj.parents('.flow_slider_wrapper').find('.flow_slider').hasClass('started')) {
			$this_obj.parents('.flow_slider_wrapper').find('.flow_slider').addClass('started');
			setup_flow($this_obj.parents('.flow_slider_wrapper').attr('data-uniqid'));
		}
		if ($this_obj.parents('.flow_slider_wrapper').find('.flow_block2preload').size() < 1) {
			$this_obj.parents('.flow_slider').removeClass('wait4load').animate({					
				'z-index': '3'
			}, 500, function() {					
				flow_slider.removeClass('wait4load2');
			});
		}
	} else {
		flow_slider.removeClass('wait4load').animate({					
			'z-index': '3'
		}, 500, function() {					
			flow_slider.removeClass('wait4load2');
		});
	}
}

function init_pp4circles_slider() {
	if (jQuery('.circles_block2preload:first').size() > 0) {
		var $this_obj = jQuery('.circles_block2preload:first');
		(function (img, src) {
			img.src = src;
			img.onload = function () {
				$this_obj.removeClass('circles_block2preload').addClass('block_loaded').animate({
					'z-index': '3'
				}, 100, function() {
					init_pp4circles_slider();
				});
			};
		}(new Image(), $this_obj.find('img').attr('src')));

		if ($this_obj.parents('.circles_slider_wrapper').find('.circles_slide1').hasClass('block_loaded') && !$this_obj.parents('.circles_slider_wrapper').find('.circles_slider').hasClass('started')) {
			$this_obj.parents('.circles_slider_wrapper').find('.circles_slider').addClass('started');
			setup_circles($this_obj.parents('.circles_slider_wrapper').attr('data-uniqid'));
		}
		if ($this_obj.parents('.circles_slider_wrapper').find('.circles_block2preload').size() < 1) {
			setup_circles($this_obj.parents('.circles_slider_wrapper').attr('data-uniqid'));
			$this_obj.parents('.circles_slider').removeClass('wait4load');
		}
	} else {
		setup_circles('all');
		circles_slider.removeClass('wait4load');
	}
}
function init_pp4stripe_slider() {
	if (jQuery('.stripe_block2preload:first').size() > 0) {
		var $this_obj = jQuery('.stripe_block2preload:first');
		(function (img, src) {
			img.src = src;			
			img.onload = function () {
				$this_obj.attr('style', 'background-image:url('+ $this_obj.attr('data-src') +')').removeClass('stripe_block2preload').addClass('block_loaded').animate({
					'z-index': '3'
				}, 100, function() {
					init_pp4stripe_slider();
				});
			};                
		}(new Image(), $this_obj.attr('data-src')));

		if ($this_obj.parents('.stripe_gallery_wrapper').find('.stripe_slide1').hasClass('block_loaded') && !$this_obj.parents('.stripe_gallery_wrapper').find('.stripe_slider').hasClass('started')) {
			$this_obj.parents('.stripe_gallery_wrapper').find('.stripe_slider').addClass('started');
			setup_stripe_gallery($this_obj.parents('.stripe_gallery_wrapper').attr('data-uniqid'));
		}
	} else {
		stripe_slider.removeClass('wait4load');
	}
}

function init_pp4fs_slider() {
	if (jQuery('.fs_block2preload:first').size() > 0) {
		var $this_obj = jQuery('.fs_block2preload:first');
		(function (img, src) {
			img.src = src;			
			img.onload = function () {
				$this_obj.removeClass('fs_block2preload').addClass('block_loaded').animate({					
					'z-index': '3'
				}, 100, function() {					
					init_pp4fs_slider();
				});
			};                
		}(new Image(), $this_obj.attr('data-src')));

		if ($this_obj.parents('.fs_gallery_wrapper').find('.fs_slide1').hasClass('block_loaded') && !$this_obj.parents('.fs_gallery_wrapper').find('.fs_slider').hasClass('started')) {
			$this_obj.parents('.fs_gallery_wrapper').find('.fs_slider').addClass('started');
			setup_fs_gallery($this_obj.parents('.fs_gallery_wrapper').attr('data-uniqid'));
		}
	} else {
		fs_slider.removeClass('wait4load');
	}
}
function init_pp4shift() {
	if (jQuery('.shift_block2preload:first').size() > 0) {
		var $this_obj = jQuery('.shift_block2preload:first');
		(function (img, src) {
			img.src = src;			
			img.onload = function () {
				$this_obj.removeClass('shift_block2preload').addClass('block_loaded').animate({					
					'z-index': '3'
				}, 100, function() {					
					init_pp4shift();
				});
			};                
		}(new Image(), $this_obj.attr('data-src')));

		if (($this_obj.parents('.shift_gallery_wrapper').find('.odd_slide1').hasClass('block_loaded') && $this_obj.parents('.shift_gallery_wrapper').find('.even_slide1').hasClass('block_loaded')) && !$this_obj.parents('.shift_gallery_wrapper').find('.shift_gallery').hasClass('started')) {
			$this_obj.parents('.shift_gallery_wrapper').find('.shift_gallery').addClass('started');
			setup_shift_gallery($this_obj.parents('.shift_gallery_wrapper').attr('data-uniqid'));
		}
	} else {
		shift_gallery_wrapper.find('.shift_gallery').removeClass('wait4load');
	}
}

jQuery(window).resize(function() {
	gt3_content_update();

	// Portfolio Masonry
	gt3_portfolio_is_masonry();

	// Flexslider Update
	gt3_flex_update();

	// GT3 Services Box
	gt3_services_box ();

	// Gt3 coming soon
	gt3_coming_soon ();

});
jQuery(window).load(function() {
	gt3_content_update();

	// Gt3 ajax_sorting
	var ajax_sorting_block_html = jQuery('.ajax_sorting_block');
	if (ajax_sorting_block_html.length) {
		ajax_sorting_block_html.each(function(){

			var this_parent_container = jQuery(this).parents('.gt3_module_portfolio'),
				append_container = this_parent_container.find('.ajax_sorting_block'),
				posts_per_page = append_container.attr('data-posts_per_page'),
			    view_type = append_container.attr('data-view_type'),
			    posts_per_line = append_container.attr('data-posts_per_line'),
			    post_type_terms = append_container.attr('data-post_type_terms'),
			    order = append_container.attr('data-order'),
			    orderby = append_container.attr('data-orderby'),
			    image_proportions = append_container.attr('data-image_proportions'),
			    items_per_click = append_container.attr('data-items_per_click'),
				posts_already_showed = append_container.attr('data-already_showed');

			gt3_get_posts("gt3_get_posts", this_parent_container, append_container, "portfolio", posts_per_page, posts_already_showed, view_type, posts_per_line, post_type_terms, order, orderby, image_proportions);
			posts_already_showed = parseInt(posts_already_showed, 10) + parseInt(posts_per_page, 10);
			append_container.attr('data-already_showed', posts_already_showed);
		});
		jQuery('.ajax_sorting_block').isotope("reLayout");
		setTimeout("jQuery('.ajax_sorting_block').isotope('reLayout')", 500);
	}

	// Portfolio Masonry
	gt3_portfolio_is_masonry();
	var module_portfolio_html = jQuery('.gt3_module_portfolio');
	if (module_portfolio_html.length) {
		module_portfolio_html.each(function() {
			jQuery(this).find(".optionset li").eq(0).find("a").click();
		});
	}

	// Flexslider Update
	gt3_flex_update();

	if (jQuery('.contentarea .wpb_flexslider').length) {
		jQuery('.wpb_flexslider .flex-control-nav').fadeIn();
	}

});

function gt3_content_update() {
	if (header_holder.size() > 0) {
		header_holder.height(header.height());
	}
	if(jQuery('.gt3_js_width').size() > 0) {
		jQuery('.gt3_js_width').each(function(){
			if (jQuery(this).attr('data-width') == '100%') {
				jQuery(this).css('width', '100%');
			} else {
				jQuery(this).width(parseInt(jQuery(this).attr('data-width')));
			}			
		});
	}
	if (jQuery('.gt3_stripes').size() > 0) {
		if (myWindow.width() > 760) {
			jQuery('.gt3_stripes').each(function(){
				var set_width = Math.floor(jQuery(this).width()/jQuery(this).find('.gt3_stripe').size());
				jQuery(this).find('.gt3_stripe').width(set_width);
			});
		} else {
			jQuery('.gt3_stripes').each(function(){
				var set_height = Math.floor(jQuery(this).height()/jQuery(this).find('.gt3_stripe').size());
				jQuery(this).find('.gt3_stripe').height(set_height);
			});		
		}
	}
	if(jQuery('.gt3_js_height').size() > 0) {
		jQuery('.gt3_js_height').each(function(){
			if (jQuery(this).attr('data-height') == '100%') {
				jQuery(this).height(jQuery(window).height());
				if (jQuery(this).find('.gt3_js_height_child').size() > 0) {
					jQuery(this).find('.gt3_js_height_child').height(jQuery(window).height());
				}
			} else {
				jQuery(this).height(parseInt(jQuery(this).attr('data-height')));
				if (jQuery(this).find('.gt3_js_height_child').size() > 0) {
					jQuery(this).find('.gt3_js_height_child').height(parseInt(jQuery(this).attr('data-height')));
				}
			}	
		});
	}	
	if (jQuery('.thumbs_grid_gallery').size() > 0) {
		jQuery('.thumbs_grid_gallery').each(function(){
			var set_pad = parseInt(jQuery(this).attr('data-pad'))/2;
			jQuery(this).css('margin', -1*set_pad+'px');
			jQuery(this).find('.thumbs_grid_item').css('margin', set_pad+'px');
		});
	}
	if (jQuery('.gt3_related_posts').size() > 0) {
		jQuery('.gt3_related_posts').each(function(){
			var set_pad = -1*parseInt(jQuery(this).attr('data-pad'));
			jQuery(this).css('margin-left', set_pad+'px');
		});
	}
	if (jQuery('.gt3_related_post_item_inner').size() > 0) {
		jQuery('.gt3_related_post_item_inner').each(function(){
			var set_pad = parseInt(jQuery(this).attr('data-pad'));
			jQuery(this).css('padding-left', set_pad+'px');
		});
	}
	if (jQuery('.gt3_home_promo').size() > 0) {
		jQuery('.gt3_home_promo').each(function(){
			var setHeight = myWindow.height();
			if (jQuery('#wpadminbar').size() > 0) {
				setHeight = setHeight - jQuery('#wpadminbar').height();
			}			
			jQuery(this).height(setHeight);
		});
	}
	
	//Main Wrapper Min Height
	if (jQuery('.header_holder').size() > 0) {
		var header_height = jQuery('.header_holder').height();
	} else {
		var header_height = header.height();
	}
	if (jQuery('#wpadminbar').size() > 0) {	
		var check_height = myWindow.height() - jQuery('#wpadminbar').height() - header_height - footer.height();
	} else {
		var check_height = myWindow.height() - header_height - footer.height();
	}
	if (jQuery('.prefooter_shortcode_area').size() > 0) {
		var check_height = check_height - jQuery('.prefooter_shortcode_area').height();
	}
	if (check_height > main_wrapper.height()) {
		site_wrapper.css('min-height', check_height+'px');
	}
}

// GT3 Flicker Widget
function gt3_flickr_widget () {
	if (jQuery('.flickr_widget_wrapper').length) {
		jQuery('.flickr_widget_wrapper').each(function () {
			var flickrid = jQuery(this).attr('data-flickrid');
			var widget_id = jQuery(this).attr('data-widget_id');
			var widget_number = jQuery(this).attr('data-widget_number');
			jQuery(this).addClass('flickr_widget_wrapper_'+flickrid);

			jQuery.getJSON("http://api.flickr.com/services/feeds/photos_public.gne?id="+widget_id+"&lang=en-us&format=json&jsoncallback=?", function(data){
				jQuery.each(data.items, function(i,item){
					if(i<widget_number){
						jQuery("<img/>").attr("src", item.media.m).appendTo(".flickr_widget_wrapper_"+flickrid).wrap("<div class=\'flickr_badge_image\'><a href=\'" + item.link + "\' target=\'_blank\' title=\'Flickr\'></a></div>");
					}
				});
			});
		});
	}
}

function mouseStop() {
	html.removeClass('mouse_move');
}

// -------------------- //
// --- GT3 COMPOSER --- //
// -------------------- //

// GT3 Counter
function gt3_initCounter() {
	if (jQuery('.gt3_module_counter').length) {
		if (jQuery(window).width() > 760) {
			var waypoint = new Waypoint({
				element: document.getElementsByClassName('gt3_module_counter'),
				handler: function(direction) {},
				offset: 'bottom-in-view'
			});
			waypoint.context.refresh();

			jQuery('.gt3_module_counter').each(function(){
				if (jQuery(this).offset().top < jQuery(window).height()) {
					var cur_this = jQuery(this);
					if (!jQuery(this).hasClass('done')) {
						var stat_count = cur_this.find('.stat_count'),
							set_count = stat_count.attr('data-value'),
							counter_suffix = stat_count.attr('data-suffix'),
							counter_prefix = stat_count.attr('data-prefix');

						jQuery(this).find('.stat_temp').stop().animate({width: set_count}, {duration: 3000, step: function(now) {
							var data = Math.floor(now);
							stat_count.text(counter_prefix + data + counter_suffix);
						}
						});
						jQuery(this).addClass('done');
					}
				} else {
					var cur_this = jQuery(this);
					jQuery(this).waypoint(function(){
						if (!cur_this.hasClass('done')) {
							var stat_count = cur_this.find('.stat_count'),
								set_count = stat_count.attr('data-value'),
								counter_suffix = stat_count.attr('data-suffix'),
								counter_prefix = stat_count.attr('data-prefix');
							cur_this.find('.stat_temp').stop().animate({width: set_count}, {duration: 3000, step: function(now) {
								var data = Math.floor(now);
								stat_count.text(counter_prefix + data + counter_suffix);
							}
							});
							cur_this.addClass('done');
						}
					},{offset: 'bottom-in-view'});
				}
			});
		} else {
			jQuery('.gt3_module_counter').each(function(){
				var stat_count = jQuery(this).find('.stat_count'),
					set_count = stat_count.attr('data-value'),
					counter_suffix = stat_count.attr('data-suffix'),
					counter_prefix = stat_count.attr('data-prefix');
				jQuery(this).find('.stat_temp').stop().animate({width: set_count}, {duration: 3000, step: function(now) {
					var data = Math.floor(now);
					stat_count.text(counter_prefix + data + counter_suffix);
				}
				});
			},{offset: 'bottom-in-view'});
		}
	}
}

// GT3 Message Box
function gt3_message_close(){
	jQuery(".gt3_message_box-closable").each(function(){
		var element = jQuery(this);
		element.find('.gt3_message_box__close').on('click',function(){
			element.slideUp(300);
		})
	})
}

// Gt3 Testimonials
function gt3_testimonials_list () {
	if (jQuery('.module_testimonial.active-carousel').length) {
		jQuery('.module_testimonial.active-carousel').each(function(){
			var cur_slidesToShow = jQuery(this).attr('data-slides-per-line')*1;
			var cur_sliderAutoplay = jQuery(this).attr('data-autoplay-time')*1;
			var cur_fade = jQuery(this).attr('data-slider-fade') == 1;
			jQuery(this).find('.testimonials_rotator').slick({
				slidesToShow: cur_slidesToShow,
				slidesToScroll: cur_slidesToShow,
				autoplay: true,
				autoplaySpeed: cur_sliderAutoplay,
				speed: 500,
				dots: true,
				fade: cur_fade,
				focusOnSelect: true,
				arrows: false,
				infinite: true,
				asNavFor: jQuery(this).find('.testimonials-photo-wrapper')
			});
			jQuery(this).find('.testimonials-photo-wrapper').slick({
				slidesToShow: 3,
				slidesToScroll: 1,
				asNavFor: jQuery(this).find('.testimonials_rotator'),
				dots: false,
				centerMode: true,
				focusOnSelect: true
			})
		});
	}
}

// Post Likes
jQuery(document).on("click", ".post_likes_add", function(event) {
	var gallery_likes_this = jQuery(this);
	if (!jQuery.cookie(gallery_likes_this.attr('data-modify')+gallery_likes_this.attr('data-attachid'))) {
		jQuery.post(gt3_ajaxurl, {
			action:'add_like_attachment',
			attach_id:jQuery(this).attr('data-attachid')
		}, function (response) {
			jQuery.cookie(gallery_likes_this.attr('data-modify')+gallery_likes_this.attr('data-attachid'), 'true', { expires: 7, path: '/' });
			gallery_likes_this.addClass('already_liked');
			gallery_likes_this.find('i').removeClass('fa-heart-o').addClass('fa-heart');
			gallery_likes_this.find('span').text(response);
		});
	}
});

// Portfolio Ajax
function gt3_get_posts(action, this_parent_container, append_container, post_type, posts_count, posts_already_showed, template, posts_per_line, selected_terms, order, orderby, image_proportions) {
	jQuery.post(gt3_ajaxurl, {
		action: action,
		post_type: post_type,
		posts_count: posts_count,
		posts_already_showed: posts_already_showed,
		template: template,
		posts_per_line: posts_per_line,
		selected_terms: selected_terms,
		orderby: orderby,
		image_proportions: image_proportions,
		order: order
	})
	.done(function (data) {
		if (data.length < 1) {
			this_parent_container.find(".load_more_works").hide("fast").parent().addClass("all_loaded");
		}
		append_container.isotope("insert", jQuery(data), function () {
			append_container.isotope("reLayout");
			setTimeout("jQuery('.ajax_sorting_block').isotope('reLayout')", 1000);
		});
	});
}

// Portfolio Masonry
function gt3_portfolio_is_masonry() {
	var module_portfolio_html = jQuery('.gt3_module_portfolio');
	if (module_portfolio_html.length) {
		module_portfolio_html.each(function() {
			if (jQuery(this).find('.filter_block').length && jQuery(this).find('.ajax_sorting_block').length) {
				jQuery(this).find(".optionset li a").on("click", function(){
					jQuery(this).parents('.gt3_module_portfolio').find(".optionset li a").removeClass("selected");
					jQuery(this).parents('.gt3_module_portfolio').find(".optionset li").removeClass("selected");
					jQuery(this).addClass("selected");
					jQuery(this).parent().addClass("selected");
					var filterSelector = jQuery(this).attr("data-option-value");
					jQuery(this).parents('.gt3_module_portfolio').find(".sorting_block").isotope({
						filter: filterSelector
					});
					return false;
				});
			} else {
				jQuery(this).find('.sorting_block').isotope();
			}
		});
	}
}

// Flexslider Update
function gt3_flex_update() {
	if (jQuery('.contentarea .wpb_flexslider').length) {
		jQuery('.contentarea .wpb_flexslider').each(function() {
			var img_h = jQuery(this).find('img').height();
			jQuery(this).height(img_h);
		});
	}
}

// GT3 Services Box
function gt3_services_box () {
	jQuery(".gt3_services_box").each(function(){
		if (jQuery(this).find('.text_wrap').length) {
			var text_h = jQuery(this).find('.text_wrap').height();
			jQuery(this).find('.fake_space').height(text_h);
		}
	});
}

// Gt3 Carousel List
function gt3_carousel_list () {
	var carousel_tag = jQuery('.gt3_carousel_list');
	if (carousel_tag.length) {
		carousel_tag.each(function(){
			jQuery(this).slick();
		});
	}
}

// Gt3 coming soon
function gt3_coming_soon () {
	var shortcode_subscribe_tag = jQuery('.shortcode_subscribe');
	if (shortcode_subscribe_tag.length) {
		var send_btn_width = shortcode_subscribe_tag.find('input[type="submit"]').width() + 88;
		shortcode_subscribe_tag.find('.wpcf7-form').css({'padding-right': send_btn_width + 'px'});
	}
}
