(function ($) {
	new WOW().init();
	// js Loading page 
	jQuery(window).load(function () {
		jQuery("#preloader").delay(100).fadeOut("slow");
		jQuery("#load").delay(100).fadeOut("slow");
	});

	//jQuery to collapse the navbar on scroll
	$(window).scroll(function () {
		if ($(".navbar").offset().top > 50) {
			$(".navbar-fixed-top").addClass("top-nav-collapse");
		} else {
			$(".navbar-fixed-top").removeClass("top-nav-collapse");
		}

		// Show hide isStuck menu when scroll
		if ($(".page .stuck_container.isStuck").length > 0) {
			if ($(".page .stuck_container.isStuck").offset().top > 50) {
				$(".page .stuck_container.isStuck").css({
					"top": 0,
					"visibility": "visible"
				});
			} else {
				$(".page .stuck_container.isStuck").css({
					"top": -80,
					"visibility": "hidden"
				});
			}
		}
	});

	//jQuery for page scrolling feature - requires jQuery Easing plugin
	$(function () {
		$('.navbar-nav li a').bind('click', function (event) {
			var $anchor = $(this);
			$('html, body').stop().animate({
				scrollTop: $($anchor.attr('href')).offset().top
			}, 1500, 'easeInOutExpo');
			event.preventDefault();
		});
		$('.page-scroll a').bind('click', function (event) {
			var $anchor = $(this);
			$('html, body').stop().animate({
				scrollTop: $($anchor.attr('href')).offset().top
			}, 1500, 'easeInOutExpo');
			event.preventDefault();
		});
	});

})(jQuery);
/*== show loading 2s ==*/
setInterval(function () {
	$(".wr-loading").css('background-image', 'none');
	//clearInterval(interval)
}, 2000);
/* Owl Carousel
 ========================================================*/
(function ($) {
	var o = $('#owl-banner');
	var slidePro = $('#slide-service');
	var promotion = $('.slider-promotion');
	// include('js/owl.carousel.min.js');
	$(document).ready(function () {
		if (o.length > 0) {
			o.owlCarousel({
				//margin: 30,
				items: 1,
				merge: true,
				loop: true,
				//margin:10,
				video: true,
				lazyLoad: true,
				center: true,
				nav: true,
				navClass: ['owl-prev', 'owl-next'],
				responsive: {
					0: {
						items: 1
					},
					768: {
						items: 1
					},
					980: {
						items: 1
					}
				}
			});
		}

		promotion.owlCarousel({
			margin: 2,
			autoplay: false,
			autoplayTimeout: 10000,
			animateIn: 'fadeIn',
			animateOut: 'fadeOut',
			smartSpeed: 450,
			loop: true,
			dots: false,
			dotsEach: 1,
			nav: true,
			navClass: ['owl-prev fa fa-angle-left', 'owl-next fa fa-angle-right'],
			responsive: {
				0: {
					items: 1
				}
			}
		});

		slidePro.owlCarousel({
			margin: 30,
			autoplay: false,
			smartSpeed: 450,
			loop: true,
			dots: false,
			dotsEach: 1,
			nav: true,
			navClass: ['owl-prev fa fa-angle-left', 'owl-next fa fa-angle-right'],
			responsive: {
				0: {
					items: 1
				},
				320: {
					items: 1
				},
				460: {
					items: 1
				},
				570: {
					items: 2
				},
				840: {
					items: 3
				},
				1040: {
					items: 3
				},
				1200: {
					items: 3
				},
				1360: {
					items: 3
				}
			}
		});

	});

})(jQuery);
/*END  Owl Carousel
 ========================================================*/
/* JS click toTop btn
========================================*/
(function ($) {
	$.fn.UItoTop = function (options) {

		var defaults = {
			text: '',
			min: 100,
			scrollSpeed: 800,
			containerID: 'toTop',
			containerClass: 'toTop fa fa-chevron-up',
			easingType: 'linear'

		};

		var settings = $.extend(defaults, options);
		var containerIDhash = '#' + settings.containerID;
		var containerHoverIDHash = '#' + settings.containerHoverID;

		$('body').append('<a href="#" id="' + settings.containerID + '" class="' + settings.containerClass + '" >' + settings.text + '</a>');

		$(containerIDhash).hide().click(function () {
			$('html, body').stop().animate({
				scrollTop: 0
			}, settings.scrollSpeed, settings.easingType);
			$('#' + settings.containerHoverID, this).stop().animate({
				'opacity': 0
			}, settings.inDelay, settings.easingType);
			return false;
		})


		$(window).scroll(function () {
			var sd = $(window).scrollTop();
			if (typeof document.body.style.maxHeight === "undefined") {
				$(containerIDhash).css({
					'position': 'absolute',
					'top': $(window).scrollTop() + $(window).height() - 50
				});
			}
			if (sd > settings.min)
				$(containerIDhash).stop(true, true).fadeIn(600);
			else
				$(containerIDhash).fadeOut(800);
		});
	};
})(jQuery);
$(document).ready(function () {
	$().UItoTop({
		easingType: 'easeOutQuart',
		containerClass: 'toTop glyphicon glyphicon-chevron-up'
	});
});
/* JS click toTop btn
========================================*/
/*== Atri new fix hover mobi ====
============================================================*/
$(document).ready(function () {
	var touch = window.ontouchstart ||
		(navigator.MaxTouchPoints > 0) ||
		(navigator.msMaxTouchPoints > 0);

	if (touch) { // remove all :hover stylesheets
		try { // prevent exception on browsers not supporting DOM styleSheets properly
			for (var si in document.styleSheets) {
				var styleSheet = document.styleSheets[si];
				if (!styleSheet.rules) continue;

				for (var ri = styleSheet.rules.length - 1; ri >= 0; ri--) {
					if (!styleSheet.rules[ri].selectorText) continue;

					if (styleSheet.rules[ri].selectorText.match(':hover')) {
						styleSheet.deleteRule(ri);
					}
				}
			}
		} catch (ex) {}
	}
	/**/
});

/*js for slide product promotion */
$(document).ready(function () {
	$(".list-pro-click > li").on("click", function () {
		var src = $(this).find('img').data("src");
		//$(this).parents(".wr-box-slider").find(".show-img").attr("src",src)
		$(this).parents(".wr-box-slider").find(".show-img")
			.fadeOut(400, function () {
				$(this).parents(".wr-box-slider").find(".show-img").attr("src", src)
			})
			.fadeIn(400);
		$(this).parents(".wr-box-slider").find("li").removeClass("active");
		$(this).addClass("active");
	});
	$(".close-sp").on("click", function () {
		$('.out-show-scroll-pro').addClass("active");
	});
});

/* ====== Language Toggle ======*/
$(document).ready(function () {
	$('.languages').click(function(e){
		$(this).find(".dropdown-lang").slideToggle(200);
		e.stopPropagation();
	});

	$(document).click(function(){
		$('.languages .dropdown-lang').slideUp(200);
	})
})

/* ===== Same height =======*/
$(document).ready(function () {
	var sameHeight = $(".teaser-1").find(".info");
	sameHeight.equalHeights();
})