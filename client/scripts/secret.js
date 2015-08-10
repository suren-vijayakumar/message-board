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

        $("body").on('click', '.refresh', function(){
        location.reload(true);
        getData();
    });
        getData();
    });




    $("#writeData").on('click', 'button', function(){


        if(confirm("Are you sure, you want to delete this post?") ){
            $.ajax({
                type: "DELETE",
                url: "/things/" + $(this).data("id"),
                success: function () {

                },
                error: function (xhr, status) {
                    alert("Error: ", status);
                },
                complete: function () {
                    console.log("Delete Complete!");

                }
            });

        $(this).fadeTo("slow", 0.05, function(){ //fade

            $(this).slideUp("slow", function() { //slide up

                $(this).parent().remove();//then remove from the DOM

            });

        });

        }
        return false;

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
        $('#writeData').append("<div></div>");
        var $el = $('#writeData').children().last();

        $el.append("<p>A post from: " + data[i].name + "</p>");
        $el.append("<p> Your post: " + data[i].message + "</p>");
        $el.append("<p> Posted on: " + data[i].time + "</p>");

        $el.append("<button class='btn btn-danger btn-sm' data-id='" + data[i]._id + "'> delete </button>");

    }
}