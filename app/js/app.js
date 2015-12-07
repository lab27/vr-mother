'use strict';
var statueNum = 0;
var slidesAreUp = 0;
var app = (function(document, $) {
    var docElem = document.documentElement,
        _userAgentInit = function() {
            docElem.setAttribute('data-useragent', navigator.userAgent);
        },
        _init = function() {
            $(document).foundation({
                reveal: {
                    animation: 'fade',
                    animation_speed: 200
                }
            });
            // needed to use joyride
            // doc: http://foundation.zurb.com/docs/components/joyride.html
            // $(document).on('click', '#start-jr', function() {
            //     $(document).foundation('joyride', 'start');
            // });
            $(document).foundation('tab','reflow');

            _userAgentInit();
        };
    return {
        init: _init
    };
})(document, jQuery);


//Smooth scrolll
// $(function() {
//     $('a[href*=#]:not([href=#])').click(function() {
//         if (location.pathname.replace(/^\//, '') === this.pathname.replace(/^\//, '') && location.hostname === this.hostname) {
//             var target = $(this.hash);
//             target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
//             if (target.length) {
//                 $('html,body').animate({
//                     scrollTop: target.offset().top
//                 }, 1000);
//                 return false;
//             }
//         }
//     });
// });

(function() {
    app.init();
})();

$('.my-slides').slick({
    centerMode: true,
    centerPadding: '0',
    slidesToShow: 1,
    dots: true,
    respondTo: 'slider',
    nextArrow: $('#right-slide'),
    prevArrow: $('#left-slide')

    // responsive: [
    //   {
    //     breakpoint: 768,
    //     settings: {
    //       arrows: false,
    //       centerMode: true,
    //       centerPadding: '40px',
    //       slidesToShow: 3
    //     }
    //   },
    //   {
    //     breakpoint: 480,
    //     settings: {
    //       arrows: false,
    //       centerMode: true,
    //       centerPadding: '40px',
    //       slidesToShow: 1
    //     }
    //   }
    // ]
});

// Manually refresh positioning of slick
$('.my-slides').slick('setPosition');

// if (Modernizr.touch) { 
//     $('html').addClass('touch');
// } else { 
//     $('html').addClass('no-touch');
// }

$('.thumb-image').each(function() {
    var myBG = 'img/thumbs/' + $(this).data('bg') + '.jpg';
    //console.log('myBG: ' + myBG);
    $(this).css('background-image', 'url(' + myBG + ')');
});

$('.topic-image').each(function() {
    var myBG = 'img/topics/' + $(this).data('bg') + '.jpg';
    //console.log('myBG: ' + myBG);
    $(this).css('background-image', 'url(' + myBG + ')');
});

$('.publisher-image').each(function() {
    var myBG = 'img/publishers/' + $(this).data('bg') + '.png';
    //console.log('myBG: ' + myBG);
    $(this).css('background-image', 'url(' + myBG + ')');
});


var imageWidth = 'test';

$('#image-width').html(imageWidth);


// $(window).on('resize', function() {
//     var imageWidth = $(window).width() / 10;
//     var factor = 100 - ($(window).width() / 1920) * 100;
//     //console.log('factor: ' + factor);
//     $('#image-width').html(imageWidth);

// });

$('.thumb-listenlater').on('click', function() {
    $('.thumb-listenlater:after').css('color', '#ff0000');
    $(this).toggleClass('selected');
});

$('.sortby .button').on('click', function() {
    $('.sortby .button').each(function() {
        $(this).removeClass('selected');
    });
    $(this).addClass('selected');
});


$('.start-listening .thumbnail h3.topic').each(function() {
    $(this).removeClass('hide').addClass('show-for-small-up');
});

$('.button-play-pause').on('click', function() {
    $(this).children('span').each(function() {
        $(this).toggleClass('hide');

    });
    $('#indicator').toggleClass('metering');
});

$('.button-volume').on('click', function() {
    $(this).children('span').each(function() {
        $(this).toggleClass('hide');

    });
    $(this).toggleClass('muted');
});

$('.classification-tag').on('click', function() {
    $(this).toggleClass('selected');
});

$('#view-slides').on('click', function() {
    //console.log('view, slides: ' + slidesAreUp);
    $('#slides-holder').removeClass('hide').removeClass('fadeOut').addClass('fadeIn');
    // Manually refresh positioning of slick
    $('.my-slides').slick('setPosition');
});

$('#view-slides2').on('click', function() {
    //console.log('view, slides: ' + slidesAreUp);
    $('#slides-holder').removeClass('hide').removeClass('fadeOut').addClass('fadeIn');
    // Manually refresh positioning of slick
    $('.my-slides').slick('setPosition');
});


$('.slide-close').on('click', function() {
    //console.log('hide, slides: ' + slidesAreUp);
    $('#slides-holder').removeClass('fadeIn').addClass('fadeOut');

});

//checks the animation end of slides hodler to see wha tto doe:
$('#slides-holder').on('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function() {
    //console.log('animation ended, slides: ' + slidesAreUp);
    $('.play-count').toggleClass('hide');
    $('#slide-counter').toggleClass('hide');

    if (slidesAreUp === 1) {
        $(this).addClass('hide');
        // .removeClass('fadeOut');
        slidesAreUp = 0;
    } else if (slidesAreUp === 0) {
        // $(this).addClass('hide');    
        slidesAreUp = 1;
    }
});

// change picture on talk click
$('.track-playing').on('click', function() {
    $('.talk-picture img').attr('src', 'img/bg/chantal/chantal' + statueNum + '.jpg');
    if (statueNum < 9) {
        statueNum += 1;
    } else {
        statueNum = 0;
    }

});

//On after slide change
$('.my-slides').on('afterChange', function(event, slick, currentSlide) {
    // Get the current slide
    currentSlide = $('.my-slides').slick('slickCurrentSlide') + 1;
    //console.log(currentSlide);
    $('#current-slide').html(currentSlide).addClass('animated flash').on('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function() {
        $(this).removeClass('flash');
    });
});


// TILE BG
$('.tile-image').each(function() {
    var myBG = 'img/thumbs/' + $(this).data('bg') + '.jpg';
    //console.log('myBG: ' + myBG);
    $(this).css('background-image', 'url(' + myBG + ')');
});


window.setInterval(function(){
  $('.metering').css(
    {"max-height":Math.random() * 20});
}, 100);

//chaning the viewtoggle targets and visiblility:
$('#tab-upcoming a').on('click', function(){
    // alert('me:' + $(this).parent().attr('id'));
    $('ul.viewtoggle li a#list-vew').attr('href','#upcoming-list');
});
