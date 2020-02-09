/* Stick up menus
 ========================================================*/
;
(function ($) {
    var o = $('html');
    if (o.hasClass('desktop')) {
        $(document).ready(function () {
            $('#stuck_container').TMStickUp({})
        });
    }
})(jQuery);



(function ($, undefined) {
    var
        def = {
            stuckClass: 'isStuck'
        }
        , doc = $(document), anim = false;

    $.fn.TMStickUp = function (opt) {
        opt = $.extend(true, {}, def, opt)

        $(this).each(function () {
            var $this = $(this)
                , posY//=$this.offset().top+$this.outerHeight()
                , isStuck = false
                , clone = $this.clone().appendTo($this.parent()).addClass(opt.stuckClass)
                , height//=$this.outerHeight()
                , stuckedHeight = clone.outerHeight()
                , opened//=$.cookie&&$.cookie('panel1')==='opened'
                , tmr

            $(window).resize(function () {
                clearTimeout(tmr)
                clone.css({top: isStuck ? 0 : -stuckedHeight, visibility: isStuck ? 'visible' : 'hidden'})
                tmr = setTimeout(function () {
                    posY = $this.offset().top//+$this.outerHeight()
                    height = $this.outerHeight()
                    stuckedHeight = clone.outerHeight()
                    opened = $.cookie && $.cookie('panel1') === 'opened'

                    clone.css({top: isStuck ? 0 : -stuckedHeight})
                }, 40)
            }).resize()

            clone.css({
                position: 'fixed'
                , width: '100%'
            })

            $this
                .on('rePosition', function (e, d) {
                    if (isStuck)
                        clone.animate({marginTop: d}, {easing: 'linear'})
                    if (d === 0)
                        opened = false
                    else
                        opened = true
                })

            doc
                .on('scroll', function () {
                    var scrollTop = doc.scrollTop()
                    // console.log(scrollTop);
                    // console.log(posY);
                    // console.log("height" + height);
                    if (scrollTop >= posY && !isStuck) {
                        clone
                            .stop()
                            .css({visibility: 'visible'})
                            .animate({
                                top: 0
                                , marginTop: opened ? 50 : 0
                            }, {})

                        isStuck = true
                    }

                    if (scrollTop < posY + height && isStuck) {
                        if ($('.search-form_toggle').length > 0) {
                            if ($(window).width() > 767) {
                                var o_stuck = $('.search-form_toggle'),
                                    f_stuck = $('.search-form');

                                if (!anim && o_stuck.hasClass('active')) {
                                    anim = true;
                                    o_stuck.removeClass('active');
                                    f_stuck.removeClass('on').slideUp();
                                    anim = false;
                                }
                            }
                        }

                        $('.sf-menu ul').css('display', 'none');
                        clone
                            .stop()
                            .animate({
                                top: -stuckedHeight
                                , marginTop: 0
                            }, {
                                duration: 200
                                , complete: function () {
                                    clone.css({visibility: 'hidden'})
                                }
                            });

                        isStuck = false;

                    }
                })
                .trigger('scroll')
        })
    }
})(jQuery);

/*=== JS click totop btn ===*/

(function($){
	$.fn.UItoTop = function(options) {

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
		var containerHoverIDHash = '#'+settings.containerHoverID;
			
		$('body').append('<a href="#" id="'+settings.containerID+'" class="'+settings.containerClass+'" >'+settings.text+'</a>');		
		
		$(containerIDhash).hide().click(function(){			
			$('html, body').stop().animate({scrollTop:0}, settings.scrollSpeed, settings.easingType);
			$('#'+settings.containerHoverID, this).stop().animate({'opacity': 0 }, settings.inDelay, settings.easingType);
			return false;
		})
		
								
		$(window).scroll(function() {
			var sd = $(window).scrollTop();
			if(typeof document.body.style.maxHeight === "undefined") {
				$(containerIDhash).css({
					'position': 'absolute',
					'top': $(window).scrollTop() + $(window).height() - 50
				});
			}
			if ( sd > settings.min ) 
				$(containerIDhash).stop(true,true).fadeIn(600);
			else 
				$(containerIDhash).fadeOut(800);
		});
};
})(jQuery);

// ======= Js Search click show box search ============
;
(function ($) {
    $.CTSearch = function (o) {
        var defaults = {
            container: '.stuck_container',
            form: '.search-form',
            input: '.search-form_input',
            toggle: '.search-form_toggle',
            liveout: '.search-form_liveout',
            out: '#search-results',
            scope: 1,

            handler: 'bat/SearchHandler.php'
        }

        var options = $.extend({}, defaults, o);

        var $form = $(options.form),
            $input = $(options.input, $form),
            $liveout = $(options.liveout, $form),
            $toggle = $(options.toggle),
            $out = $(options.out);

        // Search toggle
        if ($toggle.length > 0) {
            $toggle.click(function () {
                if ($(window).width() > 280) {
                    $(this).parents(options.container).find(options.form).toggleClass('on').slideToggle();
                }
                else {
                    $(this).parents(options.container).find(options.form).toggleClass('on').css("display", "block");
                }

                if (!$(this).parents(options.container).find(options.toggle).hasClass('active')) {
                    $(this).parents(options.container).find(options.form).find('input').val('').focus();
                }
                if ($('.rd-mobilemenu').hasClass('active')) {
                    $('.rd-mobilemenu').removeClass('active');
                    $('.rd-mobilepanel_toggle').removeClass('active');
                }
                $(this).parents(options.container).find(options.toggle).toggleClass('active');
                return false;
            });

            $(document).click(function (e) {
                if ($(window).width() > 280) {
                    if ($toggle.hasClass('active') && e.target.className.indexOf(options.form.substr(1, options.form.length - 1))) {
                        $toggle.removeClass('active');
                        $form.removeClass('on').slideUp();
                    }
                }
                else {
                    if ($toggle.hasClass('active') && e.target.className.indexOf(options.form.substr(1, options.form.length - 1))) {
                        $toggle.removeClass('active');
                        $form.removeClass('on').slideUp();
                    }
                }
            });
        }

        // Live Search
        if ($('html').hasClass('desktop')) {
            $input.on("keyup", function () {
                $.get(
                    options.handler,
                    {
                        s: $(this).val(),
                        liveSearch: "true",
                        dataType: "html"
                    },
                    onSuccess
                );
                function onSuccess(data) {
                    $liveout.html(data);
                }
            });

            $input.on('focusout', function () {
                setTimeout(function () {
                    $liveout.html('');
                }, 300);
            })
        }

        // Frame Search
        if ($out.length > 0) {
            $out.height(0);
            var s = location.search.replace(/^\?.*s=([^&]+)/, '$1'),
                ifr = $('<iframe width="100%" height="100%" frameborder="0" marginheight="0" marginwidth="0" allowTransparency="true"></iframe>')

            if ($out.length) {
                ifr.attr({src: options.handler + '?s=' + s}).appendTo($out), $input.val(decodeURI(s));
            }

            window._resize = function (h) {
                $out.height(h)
            }
        }
    }

})(jQuery);

$(document).ready(function () {
    $.CTSearch();
});
