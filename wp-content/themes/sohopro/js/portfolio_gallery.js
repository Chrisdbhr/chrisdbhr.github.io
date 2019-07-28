if (jQuery('.gt3_portfolio_grid_inner').size() > 0) {
	var $portfolio_container = jQuery('.gt3_portfolio_grid_inner');
}

jQuery(function () {
    $portfolio_container.isotope({
        itemSelector: '.element'
    });

    var $portfolio_optionSets = jQuery('.optionset'),
        $portfolio_optionLinks = $portfolio_optionSets.find('a'),
        $portfolio_showAll = jQuery('.portfolio_show_all');

    $portfolio_optionLinks.on('click', function () {
        var $this = jQuery(this);
        // don't proceed if already selected
        if ($this.parent('li').hasClass('selected')) {
            return false;
        }
        var $optionSet = $this.parents('.optionset');
        $optionSet.find('.selected').removeClass('selected');
        $this.parent('li').addClass('selected');
		if ($this.attr('data-option-value') == "*") {
			$portfolio_container.removeClass('now_filtering');
		} else {
			$portfolio_container.addClass('now_filtering');
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
            $portfolio_container.isotope(options);
        }
        return false;
    });

	$portfolio_container.find('img').load(function () {
		$portfolio_container.isotope('reLayout');
	});
	$portfolio_container.isotope('reLayout');
});

function animateListGridPortfolio() {
	if (jQuery('.portfolio_grid_block2preload:first').size() > 0) {
		(function (img, src) {
			img.src = src;
			img.onload = function () {
				jQuery('.portfolio_grid_block2preload:first').removeClass('loading').removeClass('anim_el').removeClass('portfolio_grid_block2preload').addClass('block_loaded').animate({
					'z-index': '15'
				}, 200, function() {
					animateListGridPortfolio();
				});
			};
		}(new Image(), jQuery('.portfolio_grid_block2preload:first').find('img').attr('src')));
	}
}

function setup_portfolio_grid() {
	jQuery('.gt3_portfolio_grid').each(function() {
		var setPad = Math.floor(parseInt(jQuery(this).attr('data-pad'))/2);
		jQuery(this).find('.gt3_portfolio_grid_inner').css('margin', setPad+'px').css('margin-top', setPad+'px');
		jQuery(this).find('.portfolio_grid_item_inner').css({
			'margin-left' : setPad+'px',
			'margin-top' : setPad+'px',
			'margin-right' : setPad+'px',
			'margin-bottom' : setPad+'px'
		});
		jQuery(this).find('.portfolio_grid_item').each(function(){
			if (jQuery(this).hasClass('anim_el2')) {
				jQuery(this).removeClass('anim_el2');
			}
		});
		if (jQuery('.gt3_portfolio_grid_inner').size() > 0) {
			$portfolio_container.isotope('reLayout');
		}
	});
}

jQuery(document).ready(function(){
	setup_portfolio_grid();
	animateListGridPortfolio();

	  jQuery(".portfolio_grid_load_more").on("click", function(){
		  var this_container = jQuery(this).parents('.gt3_portfolio_grid'),
			  append_container = this_container.find('.gt3_portfolio_grid_inner'),
			  post_per_load = this_container.attr('data-perload'),
			  already_showed = this_container.attr('data-showed'),
			  categs = this_container.attr('data-categs'),
			  hoverType = this_container.attr('data-hover'),
			  imgWidth = this_container.attr('data-imgwidth'),
			  imgHeight = this_container.attr('data-imgheight');
  
		  gt3_get_portfolio("gt3_get_ajax_works", this_container, append_container , "port", "portcat", post_per_load, already_showed, categs, hoverType, imgWidth, imgHeight);
		  already_showed = parseInt(already_showed) + parseInt(post_per_load);
		  this_container.attr('data-showed', already_showed);
		  return false;
	});

});

jQuery(window).load(function(){
	setup_portfolio_grid();
	$portfolio_container.isotope('reLayout');
});

jQuery(window).resize(function(){
	setup_portfolio_grid();
	$portfolio_container.isotope('reLayout');
});

function gt3_get_portfolio(action, this_container, append_container, post_type, post_taxonomy, posts_per_load, posts_already_showed, categs, hoverType, imgWidth, imgHeight) {
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
			this_container.find(".gt3_portfolio_grid_module_button").hide("fast").parent().addClass("all_loaded");
		} 
		append_container.isotope("insert", jQuery(data), function () {
			append_container.isotope("reLayout");
		});
		setup_portfolio_grid();
		setTimeout("animateListGridPortfolio()", 500);
	});
}
