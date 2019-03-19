var topics = ["cats"];


// Function to capture form input on 'submit' click, then runs function to turn it into a button.
$("#add-button").on("click", function (event) {
    event.preventDefault();
    var topic = $("#button-input").val().trim();
    topics.push(topic);
    renderButtons();
    $("#button-form").each(function () {
        this.reset();
    });
    console.log(topics);
});

// Function to display GIF stills on topic button click.
function displayGifs(event) {
    event.preventDefault();
    $("#image-container").empty();
    var topic = $(this).attr("data-name");
    console.log(topic);
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + topic + "&api_key=Mqq9vOn84u1fdVW1LfKPBb8JocQ5QXh6&limit=10";
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {

        // JSON.parse(response);
        // console.log(response);
        // var topicDiv = $("<div class ='topic'>");
        // var imgURL = response.data[0].images["fixed_height_still"].url;
        // console.log("Image: " + imgURL);
        // var image = $("<img>").attr("src", imgURL);
        // topicDiv.append(image);
        // var rating = response.data[0].rating;
        // console.log(rating);
        // var pOne = $("<p>").text("Rating: " + rating);
        // topicDiv.append(pOne);
        // $("#image-container").append(topicDiv);

        // Writing for loop to add all 10 images to page.
        var results = response.data;
        for (var i = 0; i < results.length; i++) {
            var topicDiv = $("<span>");
            var imgURL = response.data[i].images["downsized_still"].url;
            var gifURL = response.data[i].images["downsized"].url;
            console.log("Image: " + imgURL);
            console.log("GIF: " + gifURL);
            var image = $("<img class='image'>").attr("src", imgURL);
            image.attr("data-still", imgURL);
            image.attr("data-gif", gifURL);
            image.attr("data-state", "still");
            topicDiv.append(image);
            var rating = response.data[0].rating;
            console.log(rating);
            var pOne = $("<p>").text("Rating: " + rating);
            topicDiv.append(pOne);
            $("#image-container").append(topicDiv);
        };




    });

    console.log(queryURL);


};

function runGif() {
    var state = $(this).attr("data-state");
    if (state === "still") {
        $(this).attr("src", $(this).attr("data-gif"));
        $(this).attr("data-state", "animate");
    } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
    };
};

// Function to create new buttons.
function renderButtons() {
    $("#button-container").empty();
    for (var i = 0; i < topics.length; i++) {
        var x = $("<button>");
        x.addClass("topic-button");
        x.attr("data-name", topics[i]);
        x.text(topics[i]);
        $("#button-container").append(x);
    };
};

$(document).on("click", ".topic-button", displayGifs);
$(document).on("click", ".image", runGif);
renderButtons();