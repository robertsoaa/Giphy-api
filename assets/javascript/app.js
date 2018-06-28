
     $(document).ready(function() {

      //Array for searched topics to be added
      var audio = new Audio("assets/music/got.mp3");
      var topics = [];
      
        //limit 10 results
        //Create div with respective still and animate image sources with "data-state", "data-still" and "data-animate" attributes
         function displaygotCharacter() {
          audio.play();
        var x = $(this).data("search") + " and game of thrones";
        console.log(x);
      
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + x + "&api_key=4LT46EenLHU3nAfNBfYynVBElb10Pe8A&limit=10";
      
        console.log(queryURL);
      
           $.ajax({
             url: queryURL,
             method: "GET"
           }).done(function (response) {
             var results = response.data;
             console.log(results);
             for (var i = 0; i < results.length; i++) {

               var characterDiv = $("<div class='col-md-4'>");

               var title = results[i].title;
               var AnimatedImageSrc = results[i].images.fixed_height.url;
               var staticImageSrc = results[i].images.fixed_height_still.url;
               var ImageTagDiv = $("<img>");
               var pLineRating = $("<p>").text("Title: " + title);

               ImageTagDiv.attr("src", staticImageSrc);
               ImageTagDiv.addClass("GoTGiphy");
               ImageTagDiv.attr("data-state", "still");
               ImageTagDiv.attr("data-still", staticImageSrc);
               ImageTagDiv.attr("data-animate", AnimatedImageSrc);
               characterDiv.append(pLineRating);
               characterDiv.append(ImageTagDiv);
               $("#areaForPictures").prepend(characterDiv);

             }
           });
          }
      
        //Submit button click event takes search term from form input, trims it, and pushes to topics array, displays button
        $("#addCharacter").on("click", function(event) {
              event.preventDefault();
              var newCharacter = $("#newCharacterInput").val().trim();
              topics.push(newCharacter);
              console.log(topics);
              $("#newCharacterInput").val('');
              displayButtons();

            });
      
              
        //Function iterates through topics array to display button with array values in "myButtons" section of HTML
        function displayButtons() {
          $("#myButtons").empty();
          for (var i = 0; i < topics.length; i++) {
            var a = $('<button class="btn btn-primary">');
            a.attr("id", "character");
            a.attr("data-search", topics[i]);
            a.text(topics[i]);
            $("#myButtons").append(a);
          }
        }
            
        displayButtons();
      
        //Click event on button executes displaygotCharacter function
        $(document).on("click", "#character", displaygotCharacter);
      
        //Click event on gifs executes pausePlayGifs function
        $(document).on("click", ".GoTGiphy", pausePlayGifs);
      
        //Function accesses "data-state" attribute and depending on status, changes image source to "data-animate" or "data-still"
        function pausePlayGifs() {
           var state = $(this).attr("data-state");
            if (state === "still") {
              $(this).attr("src", $(this).attr("data-animate"));
              $(this).attr("data-state", "animate");
            } else {
              $(this).attr("src", $(this).attr("data-still"));
              $(this).attr("data-state", "still");
        }
      }
    


      });