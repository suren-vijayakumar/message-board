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
    //with .data it 'kittyfoofoo'
    //with the attribute, its dta-kittyfoofoo


    $("#writeData").on('click', 'button', function(){
        //var $el = $(this);
        $.ajax({
            type:"DELETE",
            url:"/things/" + $(this).data("id"),
            success: function(){
                console.log(" He's gone Jim!");

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
        $el.append("<button data-id='"+ data[i]._id+ "'> DELETE </button>");
        //$(".writeData").append("<div class = 'foundData'><p>" + data[i].name + "</p></div>");
    }
}