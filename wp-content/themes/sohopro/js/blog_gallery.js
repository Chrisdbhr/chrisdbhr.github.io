if (jQuery('.gt3_blog_grid_inner').size() > 0) {
	var $blog_container = jQuery('.gt3_blog_grid_inner');
}

jQuery(function () {
    $blog_container.isotope({
        itemSelector: '.element'
    });

    var $blog_optionSets = jQuery('.optionset'),
        $blog_optionLinks = $blog_optionSets.find('a'),
        $blog_showAll = jQuery('.blog_show_all');

    $blog_optionLinks.on('click', function () {
        var $this = jQuery(this);
        // don't proceed if already selected
        if ($this.parent('li').hasClass('selected')) {
            return false;
        }
        var $optionSet = $this.parents('.optionset');
        $optionSet.find('.selected').removeClass('selected');
        $this.parent('li').addClass('selected');
		if ($this.attr('data-option-value') == "*") {
			$blog_container.removeClass('now_filtering');
		} else {
			$blog_container.addClass('now_filtering');
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
            $blog_container.isotope(options);
        }
        return false;
    });

	$blog_container.find('img').load(function () {
		$blog_container.isotope('reLayout');
	});
	$blog_container.isotope('reLayout');
});

function animateListGridBlog() {
	if (jQuery('.blog_grid_block2preload:first').size() > 0) {
		(function (img, src) {
			img.src = src;
			img.onload = function () {
				jQuery('.blog_grid_block2preload:first').removeClass('loading').removeClass('anim_el').removeClass('blog_grid_block2preload').addClass('block_loaded').animate({
					'z-index': '15'
				}, 200, function() {
					$blog_container.isotope('reLayout');
					animateListGridBlog();
				});
			};
		}(new Image(), jQuery('.blog_grid_block2preload:first').find('img').attr('src')));
	}
}

function setup_blog_grid() {
	jQuery('.gt3_blog_grid').each(function() {
		var setPad = Math.floor(parseInt(jQuery(this).attr('data-pad'))/2);
		jQuery(this).find('.gt3_blog_grid_inner').css('margin', setPad+'px').css('margin-top', setPad+'px');
		jQuery(this).find('.blog_grid_item_inner').css({
			'margin-left' : setPad+'px',
			'margin-top' : setPad+'px',
			'margin-right' : setPad+'px',
			'margin-bottom' : setPad+'px'
		});
		jQuery(this).find('.blog_grid_item').each(function(){
			if (jQuery(this).hasClass('anim_el2')) {
				jQuery(this).removeClass('anim_el2');
			}
		});
		if (jQuery('.gt3_blog_grid_inner').size() > 0) {
			$blog_container.isotope('reLayout');
		}
	});
}

jQuery(document).ready(function(){
	setup_blog_grid();
	animateListGridBlog();

	  jQuery(".blog_grid_load_more").on("click", function(){
		  var this_container = jQuery(this).parents('.gt3_blog_grid'),
			  append_container = this_container.find('.gt3_blog_grid_inner'),
			  post_per_load = this_container.attr('data-perload'),
			  already_showed = this_container.attr('data-showed'),
			  categs = this_container.attr('data-categs'),
			  hoverType = this_container.attr('data-hover'),
			  imgWidth = this_container.attr('data-imgwidth'),
			  imgHeight = this_container.attr('data-imgheight');
  
		  gt3_get_blog("gt3_get_ajax_works", this_container, append_container , "post", "postcat", post_per_load, already_showed, categs, hoverType, imgWidth, imgHeight);
		  already_showed = parseInt(already_showed) + parseInt(post_per_load);
		  this_container.attr('data-showed', already_showed);
		  return false;
	});

});

jQuery(window).load(function(){
	setup_blog_grid();
	$blog_container.isotope('reLayout');
});

jQuery(window).resize(function(){
	setup_blog_grid();
	$blog_container.isotope('reLayout');
});

function gt3_get_blog(action, this_container, append_container, post_type, post_taxonomy, posts_per_load, posts_already_showed, categs, hoverType, imgWidth, imgHeight) {
	jQuery.post(gt3_ajaxurl, {
		action: action,
		module_type: 'grid',
		post_type: post_type,
		post_taxonomy: post_taxonomy,
		posts_count: posts_per_load,
		posts_already_showed: posts_already_showed,
		categs: categs,
		hoverType: hoverType,
		imgWidth: imgWidth,
		imgHeight: imgHeight
	})
	.done(function (data) {
		if (data.length < 1) {
			this_container.find(".gt3_blog_grid_module_button").hide("fast").parent().addClass("all_loaded");
		} 
		append_container.isotope("insert", jQuery(data), function () {
			append_container.isotope("reLayout");
		});
		setup_blog_grid();
		setTimeout("animateListGridBlog()", 500);
	});
}
