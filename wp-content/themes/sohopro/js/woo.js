// Woocommerce Price Filter
if (jQuery('.price_slider_wrapper').size() > 0) {
	setInterval(function woopricefilter() {
		"use strict";
		var price_from = jQuery('.price_slider_amount').find('span.from').text();
		var price_to = jQuery('.price_slider_amount').find('span.to').text();
		
		jQuery('.price_slider').find('.ui-slider-handle').first().attr('data-width', price_from);
		jQuery('.price_slider').find('.ui-slider-handle').last().attr('data-width-r', price_to);
		
	}, 100);
}

jQuery(document).ready(function(){
	"use strict";	
	// Page Title
	if (jQuery('.woocommerce_container').length && jQuery('.page_title').length) {
		var p_title = jQuery('.woocommerce_container').find('h1.page-title').html();
		if (jQuery('.summary').size() > 0) {
			jQuery('.page_title').hide();
		} else {
			jQuery('.page_title').empty().append('<h1>'+p_title+'</h1>');
		}
	}		
	
	// Thumbs Hover	
	jQuery('.woocommerce ul.products li.product, .woocommerce .images .woocommerce-main-image').each(function(){								
		jQuery(this).find("img").wrapAll('<div class="woo_hover_img"></div>');
		jQuery(this).find('.woo_hover_img').append('<span class="featured_items_ico"></span>');								
	});

	if (jQuery('.woocommerce_fullscreen').length) {
		var woo_fullscreen_h = jQuery('.wrapper').height() - jQuery('.fullscreen_shop_title').height();
		jQuery('.woocommerce_fullscreen').css({'min-height': woo_fullscreen_h + 'px'});
	}

});

jQuery(window).load(function(){
	"use strict";
	// Woocommerce
	jQuery(".woocommerce-page .widget_price_filter .price_slider").wrap("<div class='price_filter_wrap'></div>");	
	jQuery("#tab-additional_information .shop_attributes").wrap("<div class='additional_info'></div>");	
	jQuery(".shop_table.cart").wrap("<div class='woo_shop_cart'></div>");	
});
