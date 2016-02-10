/**
 * Created by user on 09.02.2016.
 */
;

function updateApps(){
    $.ajax({
        url: "/api/apps",
        error: onError,
        success: function(data){
            $('#apps').empty();
            data.forEach(function(current, index, array){
                $('#apps').append(constructApps(current));
                $('#'+current._id+' .remove').click(removeApp);
            });
        }
    });
}

function constructApps(app){
    return $.parseHTML("<div class='app' id='"+app._id+"'><li><h3 class='Name'>" + app.name + "</h3><br/><h3 class='SECRET'>" + app.secret + "</h3></h3><br/><h3 class='redirectURL'>" + app.redirectURL + "</h3></h3><br/><h3 class='name'>" + app._id.toString() + "</h3><div class='remove'>УДАЛИТЬ</div></li></div>");
}

function removeApp(e){
    var songId = $(e.target).parent().parent()[0].id;
    $.ajax({
        url: "/api/apps/" + songId,
        method: "delete",
        error: onError,
        success: updateApps
    });
}

function appSignUp() {
    var name = $("#inputName").val();
    var redirectURL = $("#inputRedirect").val();
    console.log(name +" "+ redirectURL);
    $.ajax({
        url: '/api/apps',
        method: 'post',
        data: {
            name: name,
            redirectURL: redirectURL
        },
        error: onError,
        success: function(){
            alert("приложение зарегистрировано");
            updateApps();
        }
    });
}

function onError(error){
    $("body").html(error.responseText);
}

$(document).ready(function(){
    $("#submitApp").click(appSignUp);
    updateApps();

});