/**
 * namespaces
 */
var StrSocialL10n = {
	fn: {},
    api: {
		timezone: {}
    }
};

/**
 * server API
 */
StrSocialL10n.api.timezone.post = function( tz, successCallback, errorCallback ){
	console.log('updating remote timezone...');
	$.ajax({
		type: "POST",
		url: location.protocol + '//' + location.host + StrSocialL10n.fn.frontControllerScriptName() + "/l10n/timezone",
		data: { timezone: tz },
		success: function(rsp){
			successCallback( rsp );
		},
		error: function(rsp){
			errorCallback(rsp);
		},
	});
}


StrSocialL10n.api.timezone.get = function( successCallback, errorCallback ){
	console.log('getting remote timezone...');

	$.ajax({
		type: "GET",
		url: location.protocol + '//' + location.host + StrSocialL10n.fn.frontControllerScriptName() + "/l10n/timezone",
		success: function(rsp){
			successCallback(rsp);
		},
		error: function(rsp){
			errorCallback(rsp);
		}
	});
}



/**
 * This functions checks if server is aware of the client's timezone
 */
StrSocialL10n.fn.postTimeZoneAndReloadPageIfNeeded = function(){
	
	StrSocialL10n.api.timezone.get( function(){},
		function(rsp){
			var visitortime = new Date();
			var visitortimezone = jstz.determine().name();
			StrSocialL10n.api.timezone.post( visitortimezone, function(){
				// on success reload the page
				location.reload();
			}, function(){
				//error callback
				StrSocialL10n.fn.postTimeZoneIfNeeded();
			});
		}
	);

};



StrSocialL10n.fn.frontControllerScriptName = function(){
	var pathArray = window.location.pathname.split( '/' );
	var scriptName = '/';
	
	for( var i=0; scriptName.length <= 1 && i <= pathArray.length; i++ ){
		if(pathArray[i].indexOf('.php')){
			scriptName += pathArray[i];
		}
	}
	return scriptName;
};

