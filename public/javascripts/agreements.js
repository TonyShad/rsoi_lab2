/**
 * Created by user on 10.02.2016.
 */
;
function generateAccessKey(){
    var params = window.location.href.split('?')[1];
    $.ajax({
        url: "/api/keyAccepted?"+params,
        error: onError,
        success: function(data) {
            if (data.url) {
                location.replace(data.url);
            }
        }
    })
}

function onError(error){
    $("body").html(error.responseText);
}

$(document).ready(function(){
    $("#accept").click(generateAccessKey);
});