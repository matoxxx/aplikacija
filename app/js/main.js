function loadTagCategories(id) {	
	// $('#' + id).tagsInput({
	// 	autocomplete_url:'http://myserver.com/api/autocomplete'
	// });
	$('#' + id).tagsInput({
	   'height' : 'auto',
	   'width':'100%',
	   'interactive':false,
	   'defaultText':'+',
	});
}

var jumboHeight = $('.jumbotron').outerHeight();
function parallax(){
    var scrolled = $(window).scrollTop();
    $('.bg').css('height', (jumboHeight-scrolled) + 'px');
}

$(window).scroll(function(e){
    parallax();
});
