
var topics = ["happy", "sad", "angry", "sleepy", "confused", "embarrassed", "excited"];


for (var i = 0; i < topics.length; i++) { 
  var buttons = $("<button>"+ topics[i] + "</button>").addClass("btn btn-warning").attr("data-reactions",topics[i]) 
    buttons.appendTo("#topics");   
} 

$("button").on("click", function() {
    event.preventDefault()
    var reactions = $(this).attr("data-reactions")
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + reactions + "&api_key=9pXQX6q74rCUkPxXzVLM0XOEmiBjOetY";
    
    $.ajax({
        url: queryURL,
        method: "GET"
    })
    .then(function(response) {
        var results = response.data;
        

        for (var i = 0; i < results.length; i++) {

            if (results[i].rating !== "r" && results[i].rating !== "pg-13") {
            
                var rating = results[i].rating;
                var reactionsDiv = $("<div>");
                var p = $("<p>").text("Rating: " + rating);
                var reactionsImg = $("<img>");
        
                reactionsImg.attr("src", results[i].images.fixed_height.url);
        
                reactionsDiv.append(p);
                reactionsDiv.append(reactionsImg);
                reactionsImg.addClass("gif");
        
                $("#gifs").prepend(reactionsDiv);
                
            }
        }
    });

});

$("#gifs").on("click", ".gif", function(event){
	event.preventDefault();
	
	var state = $(this).attr("data-state");
	
	if (state === "still") {
    $(this).attr("src", $(this).attr("data-animate"));
    $(this).attr("data-state", "animate");
  } else {
    $(this).attr("src", $(this).attr("data-still"));
    $(this).attr("data-state", "still");
  }

})

$("#add-reaction").on("click", function(event) {
    event.preventDefault();

    var react = $("#reactions-input").val().trim();

    ractions.push(react);
    console.log(react);
    renderButtons();
  });

renderButtons();


