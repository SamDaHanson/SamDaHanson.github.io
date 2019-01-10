$(document).ready(function () {

    var topics = ["Usher", "Foo Fighters", "Green Day", "Black Sabbath", "Kanye", "Cage The Elephant", "Will Smith", "Beyonce"];

    function getLyrics(artist) {
      var artistSearch = artist;
      document.getElementById("lyrics").textContent = "";
      $.ajax({
        type: "GET",
        data: {
          apikey: "970c468c2829771311ab874e41367e44",
          q_artist: artistSearch,
          format: "jsonp",
          callback: "jsonp_callback"
        },
        url: "https://api.musixmatch.com/ws/1.1/track.search",
        dataType: "jsonp",
        jsonpCallback: "jsonp_callback",
        contentType: "application/json",
        success: function(data) {
          var randomTracks = data.message.body.track_list;
          for (var i = 0; i < randomTracks.length; i++) {
            var thisTrack = randomTracks[i].track.track_name;

            var p = document.createElement("p");
            p.textContent = thisTrack;
            p.id = thisTrack;

            document.getElementById("lyrics").appendChild(p).style.opacity = 1;
            var b = document.createElement("br");
            document.getElementById("lyrics").appendChild(b).style.opacity = 1;
            var b2 = document.createElement("br");
            document.getElementById("lyrics").appendChild(b2).style.opacity = 1;
            var b3 = document.createElement("br");
            document.getElementById("lyrics").appendChild(b3).style.opacity = 1;

          }
          document.getElementById("tracksTitle").setAttribute("opacity", "1.0");
        },
        error: function(jqXHR, textStatus, errorThrown) {
          console.log(jqXHR);
          console.log(textStatus);
          console.log(errorThrown);
        }
      });
    }

    function displaySpaceStuff() {
        var space = $(this).attr("data-name");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + space + "&api_key=mePpseQoZWWEY5RregXq0iDwpYlq2U9J&limit=10";
        getLyrics(space);
        $.ajax({
            url: queryURL,
            method: "GET"
        }).done(function (response) {
            $("#space-value").empty();

            for (var i = 0; i < response.data.length; i++) {
                var space = $("<div class='spaceGif'>");
                var rating = response.data[i].rating;
                var picRating = $("<p>").text("Rating: " + rating);
                var picStill = response.data[i].images.fixed_height_still.url;
                var picAnimate = response.data[i].images.fixed_height.url;
                var image = $("<img>").addClass("image").attr("src", picStill).attr("data-still", picStill).attr("data-animate", picAnimate).attr("data-state", "still");

                space.append(image);
                space.append(picRating);

                if (rating === 'pg' || rating === 'g') {
                    space.append(image);
                    $("#space-value").append(space);
                }
            }

            $(".image").on("click", function () {
                var state = $(this).attr("data-state");

                if (state === "still") {
                    $(this).attr("src", $(this).attr("data-animate"));
                    $(this).attr("data-state", "animate");
                } else {
                    $(this).attr("src", $(this).attr("data-still"));
                    $(this).attr("data-state", "still");
                }
            });
        });
    }

    function myButtons() {
        $("#myButtons").empty();
        for (var i = 0; i < topics.length; i++) {
            var z = $("<button>");
            z.addClass("spaceClass");
            z.attr("data-name", topics[i]);
            z.text(topics[i]);
            $("#myButtons").append(z);
        }
    }

    $("#spaceTheme").on("click", function (event) {
        event.preventDefault();
        var space = $("#space-input").val().trim();
        topics.push(space);
        $("#space-input").val(" ");
        myButtons();
    });

    $(document).on("click", ".spaceClass", displaySpaceStuff);
    myButtons();
});
