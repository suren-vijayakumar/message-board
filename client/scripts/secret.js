$(document).ready(function (){
    $("#inputForm").submit(function(event){
        event.preventDefault();
        var formData = $("#inputForm").serialize();
        console.log(formData);
        $.ajax({
            type: "POST",
            url: "/things",
            data: formData,
            success: function(data){
                console.log(data);
                getData();

            }
        });
    });

    $("#refresh").on('click', 'button', function(){

        location.reload(true);

    });



    $("#writeData").on('click', 'button', function(){
        $.ajax({
            type:"DELETE",
            url:"/things/" + $(this).data("id"),
            success: function(){

            },
            error: function(xhr, status){
                alert("Error: ", status );
            },
            complete: function(){
                console.log("Delete Complete!");

            }
        });
        $(this).parent().remove();
    });
    getData();
});

function getData(){
    $.ajax({
        type:"GET",
        url: "/things",
        success: function(data){
            appendToDom(data);
        }
    })
}

function appendToDom(data) {
    $('#writeData').empty();
    for (var i = 0; i < data.length; i++) {
        $('#writeData').append("<div></div>")
        var $el = $('#writeData').children().last();
        $el.append("<p>" + data[i].name + "</p>");
        $el.append("<p>" + data[i].message + "</p>");
        $el.append("<p>" + data[i].time + "</p>");
        $el.append("<button class='btn btn-warning btn-lg' data-id='" + data[i]._id + "'> delete </button>");

    }
}