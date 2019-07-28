/* SORTING */
if (jQuery('.packery_gallery').size() > 0) {
	var $container = jQuery('.packery_gallery');
	var $packery_gallery = jQuery('.packery_gallery'),
		$packery_gallery_wrapper = jQuery('.packery_gallery_wrapper');	
}
jQuery(function () {

    $container.isotope({
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
			$container.removeClass('now_filtering');
		} else {
			$container.addClass('now_filtering');
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
            $container.isotope(options);
        }
        return false;
    });

    if (jQuery('.fs_blog_module').size() > 0) {
        jQuery('.fs_blog_module').find('img').load(function () {
            $container.isotope('reLayout');
        });
    } else {
        $container.find('img').load(function () {
            $container.isotope('reLayout');
        });
    }
	$container.isotope('reLayout');
});

jQuery(document).ready(function(){
	if (jQuery('.packery_gallery').size() > 0) {
		setTimeout("animateListPackery()", 500);
		setup_packery('all');
	}
});

jQuery(window).load(function () {
	if (jQuery('.packery_gallery').size() > 0) {
		setup_packery('all');		
	}	
	if (jQuery('.packery_gallery').size() > 0) {
		setTimeout("setup_packery('all')", 1000);
		setTimeout("$container.isotope('reLayout')", 1000);
	}
	
});
jQuery(window).resize(function () {
	if (jQuery('.packery_gallery').size() > 0) {
		setup_packery('all');
		setTimeout("setup_packery('all')",1000);		
	}	
	$container.isotope('reLayout');
});

function setup_packery(packery_id) {	
	
	jQuery('.packery_gallery_wrapper').each(function(){
		var setPad = Math.floor(parseInt(jQuery(this).attr('data-pad'))/2);
		
		jQuery(this).find('.packery_gallery').css('margin', setPad+'px');
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
		jQuery(this).find('.packery_gallery').isotope({
			layoutMode: 'masonry',
			masonry: {
				columnWidth: norm_size
			}
		});
		jQuery(this).find('.packery_gallery').isotope('reLayout');
	});
}

function animateListPackery() {
	jQuery('.packery_gallery').isotope("reLayout");
	if (jQuery('.packery_block2preload:first').size() > 0) {
		(function (img, src) {
			img.src = src;
			img.onload = function () {
				jQuery('.packery_block2preload:first').removeClass('packery_block2preload').removeClass('loading').removeClass('anim_el').addClass('block_loaded').animate({
					'z-index': '15'
				}, 200, function() {
					animateListPackery();
				});
			};                
		}(new Image(), jQuery('.packery_block2preload:first').find('.packery_item_inner').attr('data-src')));
	}
}

jQuery(document).on("click", ".packery_load_more", function () {
	var what_to_append = '',		
		packery_post_per_page = jQuery(this).parents('.packery_gallery_wrapper').attr('data-perload'),
		uniqid = jQuery(this).parents('.packery_gallery_wrapper').attr('data-uniqid'),
		allposts = packery_gal_array['packery_' + uniqid].items.length,
		overlay = jQuery(this).parents('.packery_gallery_wrapper').find('.packery_gallery').attr('data-overlay');
	var ins_container = jQuery('.packery_'+uniqid).find('.packery_gallery');
	
	if (packery_gal_array['packery_' + uniqid].showed >= allposts) {
		jQuery(this).parent('.gt3_grid_module_button').slideUp(300).addClass('hided_load_more');
	} else {
		var now_step = packery_gal_array['packery_' + uniqid].showed + parseInt(packery_post_per_page) - 1;
		if (now_step < allposts) {
			var limit = now_step;
		} else {
			var limit = allposts - 1;
			jQuery(this).parent('.gt3_grid_module_button').slideUp(300).addClass('hided_load_more');
		}
		for (var i = packery_gal_array['packery_' + uniqid].showed; i <= limit; i++) {
			if (packery_gal_array['packery_' + uniqid].items[i].slide_type == 'video') {
				var thishref = packery_gal_array['packery_' + uniqid].items[i].src,
					thisvideoclass = 'video_zoom';							
			} else {
				var thishref = packery_gal_array['packery_' + uniqid].items[i].img,
					thisvideoclass = '';
			}
			what_to_append = what_to_append +'\
			<div class="packery-item element anim_el anim_el2 loading packery_block2preload packery-item' + packery_gal_array['packery_' + uniqid].items[i].counter + '" data-count="'+ packery_gal_array['packery_' + uniqid].items[i].counter +'">\
					<div class="packery_item_inner" data-src="'+ packery_gal_array['packery_' + uniqid].items[i].thmb +'" style="background-image:url('+ packery_gal_array['packery_' + uniqid].items[i].thmb +')">\
						<a href="' + thishref +'" class="packery_gallery_href swipebox ' + thisvideoclass + '" title="' + packery_gal_array['packery_' + uniqid].items[i].title + '" data-description="' + packery_gal_array['packery_' + uniqid].items[i].caption + '"></a>\
						<div class="packery_overlay"></div>\
						<div class="img-preloader"></div>\
					</div>\
			</div><!-- .fw_packery_item -->';
			packery_gal_array['packery_' + uniqid].showed++;
		}
							
		var $newItems = jQuery(what_to_append);
		
		ins_container.isotope('insert', $newItems, function() {
			ins_container.find('.packery_gallery').ready(function() {
				ins_container.isotope('reLayout');
				setup_packery('all');
			});
		});
		setup_packery('all');			
		setTimeout("animateListPackery()", 500);
	}
	jQuery('.packery_gallery').isotope("reLayout");
	setTimeout(function () {jQuery('.packery_grid').isotope("reLayout");}, 1500);
});