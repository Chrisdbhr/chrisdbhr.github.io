jQuery(document).ready(function($) {
	gt3_add_wrapper_tabs();
})


function gt3_add_wrapper_tabs() {
	jQuery('.woocommerce div.product .woocommerce-tabs ul.tabs li a').wrapInner('<span />'); 
}