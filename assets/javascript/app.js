$(document).ready(function () {
	var topics = ["seven", "the bucket list", "bruce almighty", "driving miss daisy", "the dark knight", "kiss the girls", "along came a spider", "million dollar baby"];

	// Add buttons for original topics array
	function renderButtons() {
		$("#movie-buttons").empty();
		for (i = 0; i < topics.length; i++) {
			$("#movie-buttons").append("<button class='btn btn-success' data-movie='" + topics[i] + "'>" + topics[i] + "</button>");
		}
	}

	renderButtons();

	// Adding a button for movie entered
	$("#add-movie").on("click", function () {
		event.preventDefault();
		var movie = $("#movie-input").val().trim();
		topics.push(movie);
		renderButtons();
		return;
	});


	// Getting gifs from api... onto html (***** this is not working!****)
	$("button").on("click", function () {
		var movie = $(this).attr("data-movie");
		var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
			movie + "&api_key=CFywtwsKJ5Zuz2Yurufho8074DXDRTN3=10"

		
		
		//Tried this but it's not working either. 	
		//var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=CFywtwsKJ5Zuz2Yurufho8074DXDRTN3&q=MorganFreeman"; 


		$.ajax({
			url: queryURL,
			method: "GET"
		}).done(function (response) {
			var results = response.data;
			$("#topics").empty();
			for (var i = 0; i < results.length; i++) {
				var movieDiv = $("<div>");
				var p = $("<p>").text("Rating: " + results[i].rating);
				var movieImg = $("<img>");

				movieImg.attr("src", results[i].images.original_still.url);
				movieImg.attr("data-still", results[i].images.original_still.url);
				movieImg.attr("data-animate", results[i].images.original.url);
				movieImg.attr("data-state", "still");
				movieImg.attr("class", "gif");
				movieDiv.append(p);
				movieDiv.append(movieImg);
				$("#topics").append(movieDiv);
			}
		});
	});

	function changeState(){
		var state = $(this).attr("data-state");
		var animateImage = $(this).attr("data-animate");
		var stillImage = $(this).attr("data-still");

		if (state == "still") {
			$(this).attr("src", animateImage);
			$(this).attr("data-state", "animate");
		}

		else if (state == "animate") {
			$(this).attr("src", stillImage);
			$(this).attr("data-state", "still");
		}
	}

	// $("img").on("click", function() {
	// 	console.log("click worked!");
	// 	var src = movieImg.attr(src);
	// 	src = src.substring(0, src.length - 10);
	// 	src += ".url";
	// 	console.log(src);
	// 	movieImg.attr("src", src);
	// });

	// $(document).on("click", "#input", displayImg);
	$(document).on("click", ".gif", changeState);

});