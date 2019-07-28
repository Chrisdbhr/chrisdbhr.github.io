/* SORTING */
if (jQuery('.packery_portfolio').size() > 0) {
	var $port_packery_container = jQuery('.packery_portfolio');
	var $packery_portfolio = jQuery('.packery_portfolio'),
		$packery_portfolio_wrapper = jQuery('.packery_portfolio_wrapper');	
}
jQuery(function () {

    $port_packery_container.isotope({
        itemSelector: '.element'
    });

    var $optionSets = jQuery('.optionset'),
        $optionLinks = $optionSets.find('a'),
        $showAll = jQuery('.show_all');

    $optionLinks.on('click', function () {
        var $this = jQuery(this);
        // don't proceed if already selected
        if ($this.parent('li').hasClass('selected')) {
            return false;
        }
        var $optionSet = $this.parents('.optionset');
        $optionSet.find('.selected').removeClass('selected');
        $this.parent('li').addClass('selected');
		if ($this.attr('data-option-value') == "*") {
			$port_packery_container.removeClass('now_filtering');
		} else {
			$port_packery_container.addClass('now_filtering');
		}

        // make option object dynamically, i.e. { filter: '.my-filter-class' }
        var options = {},
            key = $optionSet.attr('data-option-key'),
            value = $this.attr('data-option-value');
        // parse 'false' as false boolean
        value = value === 'false' ? false : value;
        options[key] = value;
        if (key === 'layoutMode' && typeof changeLayoutMode === 'function') {
            // changes in layout modes need extra logic
            changeLayoutMode($this, options)
        } else {
            // otherwise, apply new options
            $port_packery_container.isotope(options);
        }
        return false;
    });

    if (jQuery('.fs_blog_module').size() > 0) {
        jQuery('.fs_blog_module').find('img').load(function () {
            $port_packery_container.isotope('reLayout');
        });
    } else {
        $port_packery_container.find('img').load(function () {
            $port_packery_container.isotope('reLayout');
        });
    }
	$port_packery_container.isotope('reLayout');
});

jQuery(document).ready(function(){
	if (jQuery('.packery_portfolio').size() > 0) {
		setTimeout("animateListPortPackery()", 500);
		setup_packery_portfolio('all');
	}
});

jQuery(window).load(function () {
	if (jQuery('.packery_portfolio').size() > 0) {
		setup_packery_portfolio('all');		
	}	
	if (jQuery('.packery_portfolio').size() > 0) {
		setTimeout("setup_packery_portfolio('all')", 1000);
		setTimeout("$port_packery_container.isotope('reLayout')", 1000);
	}
	
});
jQuery(window).resize(function () {
	if (jQuery('.packery_portfolio').size() > 0) {
		setup_packery_portfolio('all');
		setTimeout("setup_packery_portfolio('all')",1000);		
	}	
	$port_packery_container.isotope('reLayout');
});

function setup_packery_portfolio(packery_id) {
	jQuery('.packery_portfolio_wrapper').each(function(){
		var setPad = Math.floor(parseInt(jQuery(this).attr('data-pad'))/2);
		
		jQuery(this).find('.packery_portfolio').css('margin', setPad+'px');
		if (jQuery(this).attr('data-layout') == '3') {			
			var	norm_size = Math.floor((jQuery(this).width() - setPad*2)/3),
				double_size = norm_size*2;
			jQuery(this).find('.packery-item').each(function(){
				var set_w = norm_size,
					set_h = norm_size;					
				if (jQuery(this).hasClass('packery-item1')) {
					set_w = double_size,
					set_h = double_size;
				}
				if (jQuery(this).hasClass('packery-item4') || jQuery(this).hasClass('packery-item6')) {
					set_w = double_size,
					set_h = norm_size;
				}
				if (jQuery(this).hasClass('packery-item3')) {
					set_w = norm_size,
					set_h = double_size;
				}
				if (myWindow.width() < 760) {
					set_w = myWindow.width() - setPad*2;
					set_h = myWindow.width() - setPad*2;
				}
				jQuery(this).find('.packery_item_inner').css({
					'margin-left' : setPad+'px',
					'margin-top' : setPad+'px',
					'margin-right' : setPad+'px',
					'margin-bottom' : setPad+'px',
					'width' : (set_w-setPad*2)+'px',
					'height' : (set_h-setPad*2)+'px'
				});
				jQuery(this).css({
					'width' : set_w+'px',
					'height' : set_h+'px'
				});
				if (jQuery(this).hasClass('anim_el2')) {
					jQuery(this).removeClass('anim_el2');
				}				
			});
		}
		if (jQuery(this).attr('data-layout') == '4') {
			var	norm_size = Math.floor((jQuery(this).width() - setPad*2)/4),
				double_size = norm_size*2;				
			jQuery(this).find('.packery-item').each(function(){
				var set_w = norm_size,
					set_h = norm_size;					
				if (jQuery(this).hasClass('packery-item1') || jQuery(this).hasClass('packery-item7')) {
					set_w = double_size,
					set_h = double_size;
				}
				if (jQuery(this).hasClass('packery-item4') || jQuery(this).hasClass('packery-item8')) {
					set_w = double_size,
					set_h = norm_size;
				}
				if (myWindow.width() < 760) {
					set_w = myWindow.width() - setPad*2;
					set_h = myWindow.width() - setPad*2;
				}				
				jQuery(this).find('.packery_item_inner').css({
					'margin-left' : setPad+'px',
					'margin-top' : setPad+'px',
					'margin-right' : setPad+'px',
					'margin-bottom' : setPad+'px',
					'width' : (set_w-setPad*2)+'px',
					'height' : (set_h-setPad*2)+'px'
				});
				jQuery(this).css({
					'width' : set_w+'px',
					'height' : set_h+'px'
				});
				if (jQuery(this).hasClass('anim_el2')) {
					jQuery(this).removeClass('anim_el2');
				}				
			});
		}
		if (jQuery(this).attr('data-layout') == '5') {
			var	norm_size = Math.floor((jQuery(this).width() - setPad*2)/5),
				double_size = norm_size*2;
			jQuery(this).find('.packery-item').each(function(){
				var set_w = norm_size,
					set_h = norm_size;
				if (jQuery(this).hasClass('packery-item2') || jQuery(this).hasClass('packery-item4')) {
					set_w = norm_size,
					set_h = double_size;
				}
				if (jQuery(this).hasClass('packery-item3') || jQuery(this).hasClass('packery-item10')) {
					set_w = double_size,
					set_h = norm_size;
				}
				if (jQuery(this).hasClass('packery-item6') || jQuery(this).hasClass('packery-item7')) {
					set_w = double_size,
					set_h = double_size;
				}
				if (myWindow.width() < 760) {
					set_w = myWindow.width() - setPad*2;
					set_h = myWindow.width() - setPad*2;
				}				
				jQuery(this).find('.packery_item_inner').css({
					'margin-left' : setPad+'px',
					'margin-top' : setPad+'px',
					'margin-right' : setPad+'px',
					'margin-bottom' : setPad+'px',
					'width' : (set_w-setPad*2)+'px',
					'height' : (set_h-setPad*2)+'px'
				});
				jQuery(this).css({
					'width' : set_w+'px',
					'height' : set_h+'px'
				});
				if (jQuery(this).hasClass('anim_el2')) {
					jQuery(this).removeClass('anim_el2');
				}
			});
		}
		if (jQuery(this).attr('data-layout') == '6') {
			var	norm_size = Math.floor((jQuery(this).width() - setPad*2)/6),
				double_size = norm_size*2;
				jQuery(this).css('margin', setPad+'px');
			jQuery(this).find('.packery-item').each(function(){
				var set_w = norm_size,
					set_h = norm_size;
				if (jQuery(this).hasClass('packery-item2') || jQuery(this).hasClass('packery-item7') || jQuery(this).hasClass('packery-item9') || jQuery(this).hasClass('packery-item11')) {
					set_w = norm_size,
					set_h = double_size;
				}
				if (jQuery(this).hasClass('packery-item3') || jQuery(this).hasClass('packery-item12')) {
					set_w = double_size,
					set_h = norm_size;
				}
				if (jQuery(this).hasClass('packery-item4') || jQuery(this).hasClass('packery-item8')) {
					set_w = double_size,
					set_h = double_size;
				}
				if (myWindow.width() < 760) {
					set_w = myWindow.width() - setPad*2;
					set_h = myWindow.width() - setPad*2;
				}				
				jQuery(this).find('.packery_item_inner').css({
					'margin-left' : setPad+'px',
					'margin-top' : setPad+'px',
					'margin-right' : setPad+'px',
					'margin-bottom' : setPad+'px',
					'width' : (set_w-setPad*2)+'px',
					'height' : (set_h-setPad*2)+'px'
				});
				jQuery(this).css({
					'width' : set_w+'px',
					'height' : set_h+'px'
				});
				if (jQuery(this).hasClass('anim_el2')) {
					jQuery(this).removeClass('anim_el2');
				}
			});
		}
		jQuery(this).find('.packery_portfolio').isotope({
			layoutMode: 'masonry',
			masonry: {
				columnWidth: norm_size
			}
		});
		jQuery(this).find('.packery_portfolio').isotope('reLayout');
	});
}

function animateListPortPackery() {
	jQuery('.packery_portfolio').isotope("reLayout");
	if (jQuery('html').find('.packery_block2preload').size() > 0) {
		(function (img, src) {
			img.src = src;
			img.onload = function () {
				jQuery('.packery_block2preload:first').find('.packery_item_inner').css('background-image', 'url('+jQuery('.packery_block2preload:first').find('.packery_item_inner').attr('data-src')+')');
				jQuery('html').find('.packery_block2preload:first').removeClass('packery_block2preload').removeClass('loading').removeClass('anim_el').addClass('block_loaded').animate({
					'z-index': '15'
				}, 200, function() {
					animateListPortPackery();
				});
				
			};                
		}(new Image(), jQuery('html').find('.packery_block2preload:first').find('.packery_item_inner').attr('data-src')));
	}
}

jQuery(document).on("click", ".port_packery_load_more", function () {
	var this_container = jQuery(this).parents('.packery_portfolio_wrapper'),
	  append_container = this_container.find('.packery_portfolio'),
	  post_per_load = this_container.attr('data-perload'),
	  already_showed = this_container.attr('data-showed'),
	  categs = this_container.attr('data-categs'),
	  layoutType = this_container.attr('data-layout'),
	  imgWidth = this_container.attr('data-imgwidth'),
	  imgHeight = this_container.attr('data-imgheight');
	
	gt3_get_portfolio_packery("gt3_get_ajax_works", this_container, append_container , "port", "portcat", post_per_load, already_showed, categs, layoutType, imgWidth, imgHeight);
	already_showed = parseInt(already_showed) + parseInt(post_per_load);
	this_container.attr('data-showed', already_showed);
	return false;	
});

function gt3_get_portfolio_packery(action, this_container, append_container, post_type, post_taxonomy, posts_per_load, posts_already_showed, categs, layoutType, imgWidth, imgHeight) {
	jQuery.post(gt3_ajaxurl, {
		action: action,
		module_type: 'packery',
		post_type: post_type,
		post_taxonomy: post_taxonomy,
		posts_count: posts_per_load,
		posts_already_showed: posts_already_showed,
		categs: categs,
		layoutType: layoutType,
		imgWidth: imgWidth,
		imgHeight: imgHeight
	})
	.done(function (data) {
		if (data.length < 1) {
			this_container.find(".gt3_portfolio_packery_button").hide("fast").parent().addClass("all_loaded");
		} 
		append_container.isotope("insert", jQuery(data), function () {
			append_container.isotope("reLayout");
		});
		setup_packery_portfolio(this_container.attr('data-uniqid'));
		setTimeout("animateListPortPackery()", 500);
	});
}
