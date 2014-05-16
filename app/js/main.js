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
