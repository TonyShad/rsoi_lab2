/**
 * Created by user on 27.01.2016.
 */
;
function signUser() {
    var name = $("#inputName").val();
    var password = $("#inputPassword").val();
    $.ajax({
        url: "/signinuser",
        method: "get",
        data: {
            name: name,
            password: password
        },
        error: onError,
        success: function(){
            alert("пользователь Авторизирован");
        }
    });
}

function onError(error){
    $("body").html(error.responseText);
}
$(document).ready(function(){
    $("#submitLogin").click(signUser);
});