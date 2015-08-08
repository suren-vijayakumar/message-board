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
});

    $("#refresh").on('click', 'button', function(){

        location.reload(true);

    });



function getData(){
    $.ajax({
        type:"GET",
        url: "/things",
        success: function(data){
            console.log(data);
            appendToDom(data);
        }
    })
}

function appendToDom(data) {
    $('#writeData').empty();
    for (var i=0; i<data.length; i++) {
        $('#writeData').append("<div></div>")
        var $el = $('#writeData').children().last();
        $el.append("<p>" + data[i].name + "</p>");
        $el.append("<p>" + data[i].message + "</p>");
        $el.append("<p>" + data[i].time + "</p>");

    }
}