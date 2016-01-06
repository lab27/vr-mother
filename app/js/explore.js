var animEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
var getUrlParameter = function getUrlParameter(sParam) {
    var sPageURL = decodeURIComponent(window.location.search.substring(1)),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : sParameterName[1];
        }
    }
};

var active = getUrlParameter('active');


$('#' + active).addClass('active');

$('.category-buttons a').on('click', doCardChange);

var doCardChange = function() {
    console.log('running card change');
    $('.talk-card').addClass('animated zoomOut').one(animEnd, function(){
        $(this).removeClass('animated zoomOut').one(animEnd, function(){
            $(this).addClass('animated zoomIn').one(animEnd,function(){
                $(this).removeClass('animated zoomIn');
            });
        });
    });
};