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
        	console.log('post success!', rsp);
        	successCallback( rsp );
        },
        error: function(rsp){
        	console.log('post failed!', rsp);
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
        	console.log('get success!', rsp);
        },
        error: function(rsp){
        	console.log('get failed!', rsp);
        	var visitortime = new Date();
            var visitortimezone = -visitortime.getTimezoneOffset()/60;
        	StrSocialL10n.api.timezone.post( visitortimezone, function(){
        		// on success reload the page
        			console.log('post success');
	        		location.reload();
        		}, function(){
	        	//error callback
        			console.log('post failed! Retrying...');
	        		StrSocialL10n.fn.postTimeZoneIfNeeded();
        		}
        	);
        }
    });
};



$(document).ready(function(){
	StrSocialL10n.fn.postTimeZoneIfNeeded();
});