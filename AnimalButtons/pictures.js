var animals = ["dog","cat"];

function renderButtons() {
  console.log("Rendering Buttons")
  var buttonArea = $("#buttons");
  buttonArea.empty();
  for (var i = 0; i < animals.length; i++) {
    var btn = document.createElement("BUTTON");
    btn.className = "animalButton";
    var label = document.createTextNode(animals[i]);
    btn.append(label);
    btn.setAttribute("value",animals[i]);
    //btn.value = animals[i];
    buttonArea.append(btn);
  }
}

$("#submit").on("click", function() {
  var newAnimal = $("#input").val();
  //console.log(newAnimal);
  animals.push(newAnimal);
  console.log(animals);
  renderButtons();
});

$(document).on("click",".animalButton", function() {
  var animal = this.getAttribute("value");
  var numToDisplay = 10;
  var rating = "PG-13";
  console.log(animal);

  var queryURL = "https://api.giphy.com/v1/gifs/search?q="+animal+"&api_key=eliytP7Lpnyx5Sf8IyASZEpW8SDm3GHh&limit="+numToDisplay+"%rating="+rating;

  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {
    var data = response.data;
    $("#pictures").empty();
    for (var i = 0; i < data.length; i++) {
      var oneAnimal = response.data[i].images;
      var div = document.createElement("div");
      div.className = "contentBox";
      var text = document.createElement("p");
      text.innerHTML = "Rating: "+data[i].rating;
      var img = document.createElement("IMG");
      img.src = oneAnimal.fixed_height_still.url;
      img.className = "pic";
      img.setAttribute("gifURL", oneAnimal.fixed_height.url);
      img.setAttribute("picURL", oneAnimal.fixed_height_still.url);
      img.setAttribute("runningGIF", "false");
      div.append(text,img);
      $("#pictures").append(div);
    }
  });
});

$(document).on("click", ".pic", function() {
  if (this.getAttribute("runningGIF") === "true") {
    console.log("Making it a pic");
    var picURL = this.getAttribute("picURL");
    this.src = picURL;
    this.setAttribute("runningGIF", "false");
  } else {
    console.log("Making it a gif");
    var gifURL = this.getAttribute("gifURL");
    this.src = gifURL;
    this.setAttribute("runningGIF", "true");
  }
});

renderButtons();
