/**
 * Created by user on 27.01.2016.
 */
;
function updateArtists() {
    $.ajax({
        url: "/api/artists",
        error: onError,
        success: function(data){
            $('#artists').empty();
            data.forEach(function(current, index, array){
                $('#artists').append(constructArtist(current));
                $('#'+current._id).click(removeArtist);
            });
        }
    });
}

function removeArtist(e){
    $.ajax({
        url: "/api/artists/" + e.target.id,
        method: "delete",
        error: onError,
        success: updateArtists
    });
}

function onError(error){
    $("body").html(error.responseText);
}

function constructArtist(artist){
    return $.parseHTML("<div class='song'><li><h3>" + artist.name + "</h3><div class='remove' id='"+artist._id+"'>УДАЛИТЬ</div></li></div>");
}

function addArtist() {
    var name = $("#inputName").val();
    $.ajax({
        url: "/api/artists",
        method: "post",
        data: {name: name},
        error: onError,
        success: updateArtists
    });
}

$(document).ready(function(){
    $("#addArtist").click(addArtist);
    updateArtists();
});