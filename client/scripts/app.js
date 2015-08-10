$(document).ready(function () {
    $("#inputForm").submit(function (event) {
        event.preventDefault();
        var formData = $("#inputForm").serialize();
        $.ajax({
            type: "POST",
            url: "/things",
            data: formData,
            success: function (data) {
                    getData();

            }
        });
    });


    $("#refresh").on('click', 'button', function(){
        event.preventDefault();
        location.reload(true);
        getData();

    });

});

function getData(){
    $.ajax({
        type: "GET",
        url: "/things",
        success: function (data) {

        appendToDom(data);
}
    });
}

function appendToDom(data) {
    if($.isEmptyObject(data)) {
        alert("Nothing entered");
    }
    else {
        $('#writeData').empty();
        for (var i = 0; i < data.length; i++) {

            $('#writeData').append("<div></div>");
            var $el = $('#writeData').children().last();

            $el.append("<p>A post from: " + data[i].name + "</p>");
            $el.append("<p> Your post: " + data[i].message + "</p>");
            $el.append("<p> Posted on: " + data[i].time + "</p>");
        }

    }
}