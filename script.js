// Function to handle the start of a drag operation
var dragSrcEl = null;
function handleDragStart(e) {
  dragSrcEl = this;

  // Set data to be transferred during drag
  e.dataTransfer.effectAllowed = "move";
  e.dataTransfer.setData("text/html", this.innerHTML);
}

// Function to handle dragging over a target
function handleDragOver(e) {
  // Prevent default behavior
  if (e.preventDefault) {
    e.preventDefault();
  }
  e.dataTransfer.dropEffect = "move";

  return false;
}

// Function to handle when an element is dragged into a target
function handleDragEnter(e) {
  this.classList.add("over");
}

// Function to handle when an element is dragged out of a target
function handleDragLeave(e) {
  this.classList.remove("over");
}

// Function to handle dropping an element into a target
function handleDrop(e) {
  if (e.stopPropagation) {
    e.stopPropagation(); // Prevents the browser from redirecting.
  }

  // Swap HTML content between source and target elements
  if (dragSrcEl != this) {
    dragSrcEl.innerHTML = this.innerHTML;
    this.innerHTML = e.dataTransfer.getData("text/html");
  }

  return false;
}

// Function to handle the end of a drag operation
function handleDragEnd(e) {
  this.style.opacity = "1";

  // Remove 'over' class from all items
  items.forEach(function (item) {
    item.classList.remove("over");
  });
}

// Execute when the DOM content is loaded
document.addEventListener("DOMContentLoaded", (event) => {
  // Select all elements with class 'box' inside '.container' and attach drag and drop event listeners
  let items = document.querySelectorAll(".container .box");
  items.forEach(function (item) {
    item.addEventListener("dragstart", handleDragStart, false);
    item.addEventListener("dragenter", handleDragEnter, false);
    item.addEventListener("dragover", handleDragOver, false);
    item.addEventListener("dragleave", handleDragLeave, false);
    item.addEventListener("drop", handleDrop, false);
    item.addEventListener("dragend", handleDragEnd, false);
  });

  // Initially disable the Next Puzzle button
  $(".buttonReset").prop("disabled", true);
});

// Flag to keep track of whether the current puzzle is solved
var isPuzzleSolved = false;

// Execute when the document is ready
$(document).ready(function () {
  console.log("Document ready");
  $(".buttonRest").prop("disabled", true);
  // Create a map to store directory and number of images
  const directoryImagesMap = new Map();

  // Populate the map with directory and corresponding number of images
  directoryImagesMap.set("1", 3);
  directoryImagesMap.set("2", 3);
  directoryImagesMap.set("3", 3);
  directoryImagesMap.set("4", 7);
  directoryImagesMap.set("5", 5);
  directoryImagesMap.set("6", 7);
  directoryImagesMap.set("7", 5);
  directoryImagesMap.set("8", 7);
  directoryImagesMap.set("9", 6);

  // Function to handle click on submit button
  $(".buttonSubmit").click(function () {
    console.log("Button clicked");

    // Array to store IDs of images inside '.box' elements
    var divContents = [];
    $(".box").each(function () {
      var imgId = $(this).find("img").attr("id");
      divContents.push(imgId);
    });
    console.log("Div contents:", divContents);

    // Check if the IDs are in ascending order
    var isAscending = true;
    for (var i = 1; i < divContents.length; i++) {
      if (parseInt(divContents[i]) < parseInt(divContents[i - 1])) {
        isAscending = false;
        break;
      }
    }

    // Display result based on the order of IDs
    if (isAscending) {
      $(result).text("Correct Answer").css("background-color", "#c7efcf");
      isPuzzleSolved = true; // Puzzle is solved
      $(".buttonReset").prop("disabled", false); // Enable the Next Puzzle button
    } else {
      $(result).text("Incorrect Answer").css("background-color", "#fe5f55");
    }
  });

  // Function to handle click on reset button
  $(".buttonReset").click(function () {
    // Hide the result div
    $(result).text("").css("background-color", "transparent");

    // Function to get a random integer between min and max (inclusive)
    function getRandomInt(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    var path = "/Books/Sets"; // Path to the directory containing images
    var totalDirectories = directoryImagesMap.size; // Total number of directories

    // Randomly select a directory
    var randomDirectory = getRandomInt(1, totalDirectories);

    var numberOfImages = directoryImagesMap.get(String(randomDirectory));

    // Update the grid-template-columns property of the .container class using jQuery
    $(".container").css(
      "grid-template-columns",
      `repeat(${numberOfImages}, 1fr)`,
    );

    // Remove existing box divs
    $(".box").remove();

    // Generate an array containing IDs of all images in the selected directory
    var imageIds = [];
    for (var i = 1; i <= numberOfImages; i++) {
      imageIds.push(i);
    }

    // Shuffle the array to randomize the order of image IDs
    for (var i = imageIds.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = imageIds[i];
      imageIds[i] = imageIds[j];
      imageIds[j] = temp;
    }

    // Create new box divs and assign each image ID in the shuffled order
    for (var i = 0; i < numberOfImages; i++) {
      // Create new box divs and assign each image ID in the shuffled order
      var newDiv = document.createElement("div");
      newDiv.setAttribute("draggable", true);
      newDiv.classList.add("box");
      newDiv.setAttribute("id", "book-" + (i + 1));

      var newImg = document.createElement("img");
      newImg.setAttribute(
        "src",
        `${path}/${randomDirectory}/${imageIds[i]}.PNG`,
      );
      newImg.setAttribute("id", imageIds[i]);
      newImg.setAttribute("width", "120");
      newImg.setAttribute("height", "550");

      newDiv.appendChild(newImg);
      $(".container").append(newDiv);

      // Attach event listeners for drag and drop operations to the new elements
      newDiv.addEventListener("dragstart", handleDragStart);
      newDiv.addEventListener("dragenter", handleDragEnter);
      newDiv.addEventListener("dragover", handleDragOver);
      newDiv.addEventListener("dragleave", handleDragLeave);
      newDiv.addEventListener("drop", handleDrop);
      newDiv.addEventListener("dragend", handleDragEnd);
    }
    // Initially disable the Next Puzzle button
    $(".buttonReset").prop("disabled", true);
  });
});
