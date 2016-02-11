/**
 * Created by user on 27.01.2016.
 */
;
function updateSongs(pageStart) {
    $.ajax({
        url: "/api/songs?pageStart="+pageStart,
        error: onError,
        success: function(data){
            if(data.songs.length == 0){
                page -= 5;
                return;
            }
            $('#songs').empty();
            data.songs.forEach(function(current, index, array){
                $('#songs').append(constructSong(current));
                $('#'+current._id+' .remove').click(removeSong);
                $('#'+current._id+' h3').click(openRichSong);
            });
        }
    });
}

function removeSong(e){
    var songId = $(e.target).parent().parent()[0].id;
    $.ajax({
        url: "/api/songs/" + songId,
        method: "delete",
        error: onError,
        success: updateSongs
    });
}

function onError(error){
    $("body").html(error.responseText);
}

function constructSong(song){
    return $.parseHTML("<div class='song' id='"+song._id+"'><li><h3 class='songName'>" + song.name + "</h3><div class='remove'>УДАЛИТЬ</div></li></div>");
}


function addSong() {
    var name = $("#inputName").val();
    var text = $("#inputText").val();
    var artistId = $("#selectArtist").val();
    $.ajax({
        url: "/api/songs",
        method: "post",
        data: {
            name: name,
            text: text,
            artistId: artistId
        },
        error: onError,
        success: updateSongs
    });
}

function addOption(artist) {
    return $.parseHTML("<option value="+artist._id+">"+artist.name+"</option>");
}
function requestArtists() {
    $.ajax({
        url: "/api/artists",
        error: onError,
        success: function(data){
            data.forEach(function(current, index, array){
                $('#selectArtist').append(addOption(current));
            });
        }
    });
}


function constructRichSong(song) {
    return $.parseHTML("<div class='artist'>"+song.artistId+"</div><pre class='text'>"+ song.text+"</pre>");
}

function openRichSong(e) {
    var songId = $(e.target).parent().parent()[0].id;
    if($("#" + songId + " pre").length > 0){
        return;
    }
    $.ajax({
        url: "/api/songs/" + songId,
        error: onError,
        success: function(data){

            $("#" + songId).append(constructRichSong(data));
        }
    });
}

var page = 0;
$(document).ready(function(){
    $("#addSong").click(addSong);
    requestArtists();
    updateSongs();
    $("#next").click(function(){
        page += 5;
        updateSongs(page);
    });
    $("#prev").click(function(){
        page -= 5;
        if(page < 0){
            page = 0;
        }
        updateSongs(page);
    })


});