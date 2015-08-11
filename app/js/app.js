'use strict';

var app = (function(document, $) {
	var docElem = document.documentElement,
		_userAgentInit = function() {
			docElem.setAttribute('data-useragent', navigator.userAgent);
		},
		_init = function() {
			$(document).foundation();
            // needed to use joyride
            // doc: http://foundation.zurb.com/docs/components/joyride.html
            $(document).on('click', '#start-jr', function () {
                $(document).foundation('joyride', 'start');
            });
			_userAgentInit();
		};
	return {
		init: _init
	};
})(document, jQuery);

(function() {
	app.init();
})();

if (Modernizr.touch) { 
    $('html').addClass('touch');
} else { 
    $('html').addClass('no-touch');
}

$('.thumb-image').each(function(){
	var myBG = 'img/thumbs/'+$(this).data('bg')+'.jpg';
	console.log('myBG: ' + myBG);
	$(this).css('background-image','url(' + myBG + ')')
});

$('.topic-image').each(function(){
	var myBG = 'img/topics/'+$(this).data('bg')+'.jpg';
	console.log('myBG: ' + myBG);
	$(this).css('background-image','url(' + myBG + ')')
});

$('.publisher-image').each(function(){
	var myBG = 'img/publishers/'+$(this).data('bg')+'.png';
	console.log('myBG: ' + myBG);
	$(this).css('background-image','url(' + myBG + ')')
});


var imageWidth = "test";

$('#image-width').html(imageWidth)


$(window).on('resize', function(){
      var imageWidth = $( window ).width() / 10;
      var factor = 100 - ($( window ).width() / 1920)*100;
      console.log('factor: '+factor)
      $('#image-width').html(imageWidth)
 
});

$('.thumb-listenlater').on('click',function(){
	$('.thumb-listenlater:after').css('color','#ff0000')
	$(this).toggleClass('selected')
});

$('.sortby .button').on('click',function(){
	$('.sortby .button').each(function(){
		$(this).removeClass('selected')
	});
	$(this).addClass('selected')
});