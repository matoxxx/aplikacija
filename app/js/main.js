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

                        /*$('#betRuleAdd').keydown(function (event) {
                            var keypressed = event.keyCode || event.which;
                            if (keypressed == 13) {
                                addRule($(this).val());
                            }
                        });*/

                        function addRule(rule) {
                            var numOfRules = $('.ruleList li').length;
                            var ruleId = "rule"+numOfRules;
                            if (rule != "") {
                            /* dela tudi ta verzija

                            var $li = $("<li id='"+ruleId+"'></li>");
                            var $label = $("<label class='checkbox' for='checkbox"+numOfRules+"'></label>");
                            var $input = $("<input type='checkbox' value='' id='checkbox"+numOfRules+"' data-toggle='checkbox'>");
                            var $button = $("<button type='button' class='btn btn-danger btn-xs' onclick="+ "deleteRule('"+ruleId+"')" +">Warning</button>");

                            $($label).append($input);
                            $($label).append(rule);                           
                            //$($button).bind("click","deleteRule('"+ruleId+"')");  
                            $($label).append($button);                            
                            $($li).append($label);  
                            $('.ruleList').append($li);

                            */                                                    
                                $('.ruleList').append(
                                    "<li id='"+ruleId+"'><label class='checkbox' for='checkbox"+numOfRules+"'><input type='checkbox' value='' id='checkbox"+numOfRules+"' data-toggle='checkbox'>"+rule+"<button type='button' class='btn btn-danger btn-xs' onclick="+ "deleteRule('"+ruleId+"')"+">Warning</button></label></li>"
                                );
                            }
                        }

                        function deleteRule(rule) {
                            var a = '#'+rule;
                            $(a).remove();
                        }