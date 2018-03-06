$('document').ready(function () {


	var movies = ["The Blues Brothers", "Full Metal Jacket", "Goodfellas", "Scrooged", "Bad Santa", "The Big Lebowski", "Four Rooms", "So I Married An Axe Murderer", "My Cousin Vinny", "Animal House", "Chasing Amy"];
	var apikey = "ljAoPP2wCtxvB68gzS9cDEf9jwTjHnV8";
	var movieTitle;


	//displays our preselected movies when the page loads

	function showButtons() {

		//clears div to avoid duplicate buttons
		$("#initialMovieListButtons").empty();

		//loops through our array to make a button for each movie
		for (var i = 0; i < movies.length; i++) {


			//creates a variable to store our button
			var topicbutton = $("<button>");

			topicbutton.addClass("movie-btn");
			topicbutton.attr("data-name", movies[i]);
			topicbutton.text(movies[i]);
			$("#initialMovieListButtons").append(topicbutton);

			console.log(movies[i]);


		}
	}

	//adding button once a movie is suggested
	$("#addMovie").on("click", function (event) {
		//stops page from refreshing
		event.preventDefault();
		//create a place for our input to go and make it look nice
		var movie = $("#movieTitle").val().trim();

		// Adding movie from the textbox to our array
		movies.push(movie);
		//uses array to show buttons
		showButtons();
		//test
		console.log(movies);
		//clears the input box for the next suggestion
		$("#movieTitle").val(" ");
	});








	//ajax call to queryURL 
	function displayPulledGifs() {

		var movie = $(this).attr("data-name");
		var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + movie + "&api_key=ljAoPP2wCtxvB68gzS9cDEf9jwTjHnV8&limit=10";

		$.ajax({
			url: queryURL,
			method: "GET"
		}).then(function (response) {

			// from giphy api documentation 
			//javascript, jQuery 
			//var xhr = $.get("https://api.giphy.com/v1/gifs/search?q=ryan+gosling&api_key=jAoPP2wCtxvB68gzS9cDEf9jwTjHnV8&limit=5");
			//xhr.done(function (data) { console.log("success got data", data); });

			var apiData = response.data;
			console.log("success got data", response);



			//get image url, rating info, and display it with jquery
			//do it 9 times in a for loop
			for (var i = 0; i < apiData.length; i++) {


				//creates a div to hold the image and rating
				var gifHolder = $("<div class='gif'>");



				//creates a var to hold the image
				var movieGif = $("<img>");

				//creates a variable for the rating
				var rating = apiData[i].rating;

				//test
				// console.log(rating);

				//create a variable to make/hold the rating tags
				var ratingTag = $("<p>").text("Rating: " + rating);


				//this will show the gifs as still pictures 
				movieGif.attr("src", apiData[i].images.fixed_height_still.url);





				//adding more attributes to enable click to animate functionality
				movieGif.attr("data-still", apiData[i].images.fixed_height_still.url);
				movieGif.attr("data-animate", apiData[i].images.fixed_height.url);
				movieGif.attr("data-state", "still");
				movieGif.attr("class", "gif");









				// this is the more generic movie gif description
				// movieGif.attr("alt", "movie gif");

				//this alt description actually changes with which movie button is pressed.  
				movieGif.attr("alt", movie + " image");


				//add the gifs and the rating to the holder div

				gifHolder.append(movieGif);
				gifHolder.append(ratingTag);


				//display them on the page 
				$("#gifCollection").prepend(gifHolder);

			}
		});

	}

	//this is where i am trying to add the animate function outside the loop
	//i don't need to declare these variables, the issue 
	// var movieGif = $("<img>");
	// var rating = apiData[i].rating;

	//here is the function, it is almost identical to the pausing-gifs-solution from the in-class activities
	//extra thanks to will young and rich key for helping with my version
	//i originally had: $(".gif").on("click", function() {

	$("body").on("click", ".gif", function () {

		var dataState = $(this).attr("data-state");

		if (dataState === "still") {
			$(this).attr("src", $(this).attr("data-animate"));
			$(this).attr("data-state", "animate");
		} else {
			$(this).attr("src", $(this).attr("data-still"));
			$(this).attr("data-state", "still");
		}



	});



	//this will show the buttons and activate the listener for clicks

	showButtons();
	$(document).on("click", ".movie-btn", displayPulledGifs);


});