/* SORTING */
if (jQuery('.packery_grid').size() > 0) {
	var $container = jQuery('.packery_grid');
	var $packery_grid = jQuery('.packery_grid'),
		$packery_grid_wrapper = jQuery('.packery_grid_wrapper');	
}

if (jQuery('.gallery_grid').size() > 0) {
	var $container = jQuery('.gallery_grid');
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
});

jQuery(document).ready(function(){
	if (jQuery('.packery_grid').size() > 0) {
		setTimeout("animateListPackery()", 500);
		setup_packery();
	}
	if (jQuery('.gallery_grid').size() > 0) {
		setTimeout("animateListGrid()", 500);
		setup_grid();
	}
});

jQuery(window).load(function () {
	if (jQuery('.packery_grid').size() > 0) {
		setup_packery();		
	}	
	$container.isotope('reLayout');
});
jQuery(window).resize(function () {
	if (jQuery('.packery_grid').size() > 0) {
		setup_packery();
		setTimeout("setup_packery()",1000);		
	}	
	$container.isotope('reLayout');
});

function setup_grid() {	
	var setPad = Math.floor(parseInt(jQuery('.gallery_grid').attr('data-pad'))/2);
	jQuery('.gallery_grid').css('margin', setPad+'px').css('margin-top', -1*setPad+'px');
	jQuery('.grid_item_inner').css({
		'margin-left' : setPad+'px',
		'margin-top' : setPad+'px',
		'margin-right' : setPad+'px',
		'margin-bottom' : setPad+'px'
	});
	jQuery('.grid-item').each(function(){
		if (jQuery(this).hasClass('anim_el2')) {
			jQuery(this).removeClass('anim_el2');
		}
	});
	$container.isotope('reLayout');
}

function setup_packery() {	
	var setPad = Math.floor(parseInt($packery_grid.attr('data-pad'))/2),
		norm_size = Math.floor((myWindow.width() - setPad*2)/5) - setPad*2,
		double_size = norm_size*2+setPad*2;
	jQuery('.gallery_grid_wrapper').css('margin', setPad+'px');
	jQuery('.packery-item').each(function(){
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
		jQuery(this).css({
			'margin-left' : setPad+'px',
			'margin-top' : setPad+'px',
			'margin-right' : setPad+'px',
			'margin-bottom' : setPad+'px',
			'width' : set_w+'px',
			'height' : set_h+'px'
		});
		if (jQuery(this).hasClass('anim_el2')) {
			jQuery(this).removeClass('anim_el2');
		}
	});
	$container.isotope('reLayout');
}