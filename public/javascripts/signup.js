/**
 * Created by user on 27.01.2016.
 */
;
function addUser() {
    var name = $("#inputName").val();
    var password = $("#inputPassword").val();
    $.ajax({
        url: "/signup",
        method: "post",
        data: {
            name: name,
            password: password
        },
        error: onError,
        success: function(){
            alert("пользователь зарегистрирован");
        }
    });
}

function onError(error){
    $("body").html(error.responseText);
}
$(document).ready(function(){
    $("#submitUser").click(addUser);
});