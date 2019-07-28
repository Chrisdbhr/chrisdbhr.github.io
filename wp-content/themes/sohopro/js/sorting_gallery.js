/* SORTING */
if (jQuery('.grid_gallery').size() > 0) {
	var $container = jQuery('.grid_gallery');
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
	if (jQuery('.grid_gallery').size() > 0) {
		setTimeout("animateListGrid()", 500);
		setup_grid();
	}
});

jQuery(window).load(function () {
	$container.isotope('reLayout');
});
jQuery(window).resize(function () {
	$container.isotope('reLayout');
});

function setup_grid() {	
	jQuery('.grid_gallery').each(function() {
		var setPad = Math.floor(parseInt(jQuery(this).attr('data-pad'))/2);
		jQuery(this).css('margin', setPad+'px').css('margin-top', -1*setPad+'px');
		jQuery(this).find('.grid_item_inner').css({
			'margin-left' : setPad+'px',
			'margin-top' : setPad+'px',
			'margin-right' : setPad+'px',
			'margin-bottom' : setPad+'px'
		});
		jQuery(this).find('.grid-item').each(function(){
			if (jQuery(this).hasClass('anim_el2')) {
				jQuery(this).removeClass('anim_el2');
			}
		});
		$container.isotope('reLayout');
	});
}

function animateListGrid() {
	if (jQuery('.grid_block2preload:first').size() > 0) {
		(function (img, src) {
			img.src = src;
			img.onload = function () {
				jQuery('.grid_block2preload:first').removeClass('loading').removeClass('anim_el').removeClass('grid_block2preload').addClass('block_loaded').animate({
					'z-index': '15'
				}, 200, function() {
					animateListGrid();
				});
			};
		}(new Image(), jQuery('.loading:first').find('img').attr('src')));
	}
}

jQuery(document).on("click", ".grid_load_more", function () {
	var what_to_append = '',		
		grid_post_per_page = jQuery(this).parents('.grid_gallery_wrapper').attr('data-perload'),
		uniqid = jQuery(this).parents('.grid_gallery_wrapper').attr('data-uniqid'),
		allposts = grid_gal_array['grid_' + uniqid].items.length,
		overlay = jQuery(this).parents('.grid_gallery_wrapper').find('.grid_gallery').attr('data-overlay');
	var ins_container = jQuery('.grid_'+uniqid).find('.grid_gallery');
	
	if (grid_gal_array['grid_' + uniqid].showed >= allposts) {
		jQuery(this).parent('.gt3_grid_module_button').slideUp(300).addClass('hided_load_more');
	} else {
		var now_step = grid_gal_array['grid_' + uniqid].showed + parseInt(grid_post_per_page) - 1;
		if (now_step < allposts) {
			var limit = now_step;
		} else {
			var limit = allposts - 1;
			jQuery(this).slideUp(300);
		}
		for (var i = grid_gal_array['grid_' + uniqid].showed; i <= limit; i++) {
			if (grid_gal_array['grid_' + uniqid].items[i].slide_type == 'video') {
				var thishref = grid_gal_array['grid_' + uniqid].items[i].src,
					thisvideoclass = 'video_zoom';							
			} else {
				var thishref = grid_gal_array['grid_' + uniqid].items[i].img,
					thisvideoclass = '';
			}
			what_to_append = what_to_append +'\
			<div class="grid-item element anim_el anim_el2 loading grid_block2preload">\
					<div class="grid_item_inner">\
						<a href="' + thishref +'" class="swipebox ' + thisvideoclass + '" title="' + grid_gal_array['grid_' + uniqid].items[i].title + '"  data-description="' + grid_gal_array['grid_' + uniqid].items[i].caption + '"></a>\
						<img src="'+ grid_gal_array['grid_' + uniqid].items[i].thmb +'" alt="' + grid_gal_array['grid_' + uniqid].items[i].title + '" class="grid_gallery_thmb"/>\
						<div class="grid_overlay"></div>\
						<div class="img-preloader"></div>\
					</div>\
			</div><!-- .fw_grid_item -->';
			grid_gal_array['grid_' + uniqid].showed++;
		}
							
		var $newItems = jQuery(what_to_append);
		
		ins_container.isotope('insert', $newItems, function() {
			ins_container.find('.grid_gallery').ready(function() {
				ins_container.isotope('reLayout');
				setup_grid();
			});
		});
		setup_grid();			
		setTimeout("animateListGrid()", 500);
	}
	jQuery('.grid_gallery').isotope("reLayout");
	setTimeout(function () {jQuery('.gallery_grid').isotope("reLayout");}, 1500);
});			
