"use strict";

var	html = jQuery('html'),
	fw_pf_silder = jQuery('.fw_pf_silder');
	
jQuery(document.documentElement).keyup(function (event) {
	if (event.keyCode == 37) {
		event.preventDefault();
		fw_pf_prevSlide();
	}
	if (event.keyCode == 39 ) {
		event.preventDefault();
		fw_pf_nextSlide();
	}
});

jQuery(document).ready(function() {
	fw_pf_setSlide(1);
	jQuery('.fw_pf_slide_prev').on('click', function(){
		fw_pf_prevSlide();
	});
	jQuery('.fw_pf_slide_next').on('click', function(){
		fw_pf_nextSlide();
	});
});

function fw_pf_prevSlide() {
	var	cur_slide = parseInt(fw_pf_silder.find('.current-slide').attr('data-count'));
	cur_slide--;
	var	fw_pf_max_slide = jQuery('.fw_pf_slide').size();
	if (cur_slide > fw_pf_max_slide) cur_slide = 1;
	if (cur_slide < 1) cur_slide = fw_pf_max_slide;
	fw_pf_setSlide(cur_slide);
}

function fw_pf_nextSlide() {
	var	cur_slide = parseInt(fw_pf_silder.find('.current-slide').attr('data-count'));
	cur_slide++;
	var	fw_pf_max_slide = jQuery('.fw_pf_slide').size();
	if (cur_slide > fw_pf_max_slide) cur_slide = 1;
	if (cur_slide < 1) cur_slide = fw_pf_max_slide;	
	fw_pf_setSlide(cur_slide);
}

function fw_pf_setSlide(slideNum) {
	var	slideNum = parseInt(slideNum);
	
	fw_pf_silder.find('.prev-slide').removeClass('prev-slide');
	fw_pf_silder.find('.current-slide').removeClass('current-slide');
	fw_pf_silder.find('.next-slide').removeClass('next-slide');

	var fw_pf_max_slide = fw_pf_silder.find('.fw_pf_slide').size();
	
	if((parseInt(slideNum)+1) > fw_pf_max_slide) {
		var	nextSlide = fw_pf_silder.find('.fw_pf_slide1');
	} else if ((parseInt(slideNum)+1) == fw_pf_max_slide){
		var	nextSlide = fw_pf_silder.find('.fw_pf_slide'+fw_pf_max_slide);
	} else {
		var	nextSlide = fw_pf_silder.find('.fw_pf_slide'+(parseInt(slideNum)+1));
	}
	
	if((parseInt(slideNum)-1) < 1) {
		var	prevSlide = fw_pf_silder.find('.fw_pf_slide'+fw_pf_max_slide);
	} else if ((slideNum-1) == 1){
		var	prevSlide = fw_pf_silder.find('.fw_pf_slide1');
	} else {
		var	prevSlide = fw_pf_silder.find('.fw_pf_slide'+(parseInt(slideNum)-1));
	}

	prevSlide.addClass('prev-slide');
	var curSlide = fw_pf_silder.find('.fw_pf_slide'+slideNum);
	
	curSlide.addClass('current-slide');
	nextSlide.addClass('next-slide');
	
	if (!prevSlide.hasClass('was_showed')) {
		prevSlide.addClass('was_showed');
	}
	if (!curSlide.hasClass('was_showed')) {
		curSlide.addClass('was_showed');
	}
	if (!nextSlide.hasClass('was_showed')) {
		nextSlide.addClass('was_showed');
	}	
}