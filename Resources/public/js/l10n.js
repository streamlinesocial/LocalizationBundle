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
		url: location.protocol + '//' + location.host + "/app_dev.php/l10n/gmt-offset",
		data: { timezone: tz },
		success: function(rsp){
			successCallback( rsp );
		},
		error: function(rsp){
			errorCallback(rsp);
		},
	});
}



/**
 * This functions checks if server is aware of the client's timezone
 */
StrSocialL10n.fn.postTimeZoneIfNeeded = function(){
	console.log('checking remote timezone...');

	$.ajax({
		type: "GET",
		url: location.protocol + '//' + location.host + "/app_dev.php/l10n/timezone",
		success: function(rsp){
		},
		error: function(rsp){
			var visitortime = new Date();
			var visitortimezone = -visitortime.getTimezoneOffset()/60;
			StrSocialL10n.api.timezone.post( visitortimezone, function(){
				// on success reload the page
					location.reload();
			}, function(){
				//error callback
				StrSocialL10n.fn.postTimeZoneIfNeeded();
			});
		}
	});
};



$(document).ready(function(){
	StrSocialL10n.fn.postTimeZoneIfNeeded();
});
