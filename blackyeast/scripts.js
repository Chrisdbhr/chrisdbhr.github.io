$(function () {
	console.log("Page loaded.");

	var movementStrength = 25;
	var height = movementStrength / $(window).height();
	var width = movementStrength / $(window).width();
	$("#div_bg_movable").mousemove(function (e) {
		var pageX = e.pageX - ($(window).width() / 2);
		var pageY = e.pageY - ($(window).height() / 2);
		var newvalueX = width * pageX * -1 - 25;
		var newvalueY = height * pageY * -1 - 50;
		$('#div_bg_movable').css("background-position", newvalueX + "px     " + newvalueY + "px");
	});

	AutoSetLanguage();

	// bg img flicking animation
	$("#div_byName").shake();

	SmoothScroll();

});


// Logo shake effect
var shakeDelay;
var shakeY;
var shakeTime;

jQuery.fn.shake = function () {
	this.each(function (i) {
		$(this).css({ "position": "relative" });
		for (var x = 1; x <= 100; x++) {
			shakeDelay = Math.random() * 10000;
			shakeY = Math.random() * 10;
			shakeTime = Math.random() * 20;
			$(this).fadeTo(shakeTime, Math.random() + 0.5);
			$(this).animate({ top: -shakeY }, shakeTime).animate({ top: shakeY }, shakeTime).animate({ top: 0 }, shakeTime);
			$(this).fadeTo(shakeTime, 1);
			$(this).delay(shakeDelay);

		}
	});
	return this;
}

// Particles
/* particlesJS.load(@dom-id, @path-json, @callback (optional)); */
particlesJS.load('particles-js', 'assets/particlesjs-config.json', function () {
	console.log('callback - particles.js config loaded');
});

// Language
function AutoSetLanguage() {
	//User is from Brasil or portugal
	if (navigator.language.startsWith("pt")) {
		SetLanguage("pt")
	} else {
		SetLanguage("en")

	}
}

function SwapLanguage() {
	if (document.documentElement.getAttribute('lang') == 'pt') {
		SetLanguage("en")

	} else {
		SetLanguage("pt")
	}
}

function SetLanguage(language) {
	if (language == "pt") {
		$(".en").css("display", "none");
		$(".pt").css("display", "inline");
		document.documentElement.setAttribute('lang', 'pt');

	} else {
		$(".en").css("display", "inline");
		$(".pt").css("display", "none");
		document.documentElement.setAttribute('lang', 'en');
	}
}

function SmoothScroll() {
	var $root = $('html, body');
	$('a[href^="#"]').click(function () {
		$root.animate({
			scrollTop: $($.attr(this, 'href')).offset().top
		}, 180);

		return false;
	});

}



//// Menu collapse for small screens
//// DOM ready
//$(function () {

//	// Create the dropdown base
//	$("<select />").appendTo("nav");

//	// Create default option "Go to..."
//	$("<option />", {
//		"selected": "selected",
//		"value": "",
//		"text": "="
//	}).appendTo("nav select");

//	// Populate dropdown with menu items
//	$("nav a").each(function () {
//		var el = $(this);
//		$("<option />", {
//			"value": el.attr("href"),
//			"text": el.text()
//		}).appendTo("nav select");
//	});

//	// To make dropdown actually work
//	// To make more unobtrusive: http://css-tricks.com/4064-unobtrusive-page-changer/
//	$("nav select").change(function () {
//		window.location = $(this).find("option:selected").val();
//	});

//});