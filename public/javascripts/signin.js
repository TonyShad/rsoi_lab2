/**
 * Created by user on 27.01.2016.
 */
;
function signUser() {
    var name = $("#inputName").val();
    var password = $("#inputPassword").val();

    $.ajax({
        url: "/signinuser?"+"name="+name+"&password="+password+"&"+window.location.href.split('?')[1] ,
        error: onError,
        success: function(data){
            if(data.url){
                location.replace(data.url);
            }
            else
            {
                alert("пользователь Авторизирован");
            }
        }
    });
}

function onError(error){
    $("body").html(error.responseText);
}
$(document).ready(function(){
    $("#submitLogin").click(signUser);
});