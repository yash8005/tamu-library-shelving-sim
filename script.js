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

   // Get the target element and its index
   const targetEl = this;
   const targetIndex = Array.from(targetEl.parentNode.children).indexOf(targetEl);
 
   // Get the dragged element
   const draggedEl = dragSrcEl;
   const draggedIndex = Array.from(draggedEl.parentNode.children).indexOf(draggedEl);
 
   // If the dragged element is being dropped in the same container
   if (draggedEl.parentNode === targetEl.parentNode) {
     // Move the dragged element to the target position
     draggedEl.parentNode.insertBefore(draggedEl, targetIndex > draggedIndex ? targetEl.nextSibling : targetEl);
   } else {
     // Remove the dragged element from its current position
     draggedEl.parentNode.removeChild(draggedEl);
 
     // Insert the dragged element at the target position
     if (targetIndex < targetEl.parentNode.children.length) {
       targetEl.parentNode.insertBefore(draggedEl, targetEl);
     } else {
       targetEl.parentNode.appendChild(draggedEl);
     }
   }
 
   // Update the order of the images
   const images = Array.from(targetEl.parentNode.children).map(child => child.firstElementChild);
   const imageIds = images.map(img => img.id);
   images.forEach((img, index) => {
     const originalId = imageIds[index];
     img.id = originalId;
   });
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
// Count of correctly solved puzzles on the first attempt
var correctPuzzlesCount = 0;
// Set of directory indices solved correctly on the first attempt
var solvedDirectoryIndices = new Set();
// Attempt count for the current puzzle
var attemptCount = 0;
// Randomly select a directory
var randomDirectory;

// Longest streak of puzzles solved correctly on the first attempt
var longestStreak = 0;
// Current streak of puzzles solved correctly on the first attempt
var currentStreak = 0;
// Maximum attempts required to solve a puzzle
var maxAttempts = 0;
// Number of puzzles that required multiple attempts
var multipleAttemptsCount = 0;

// Number of Incorrect Attempts
var totalIncorrectAttemptsCount = 0;

var progress;

// Execute when the document is ready
$(document).ready(function () {
  console.log("Document ready");
  $(".buttonReset").prop("disabled", true);
  // Create a map to store directory and number of images
  const directoryImagesMap = new Map();

  // Populate the map with directory and corresponding number of images
  directoryImagesMap.set("1", 3);
  directoryImagesMap.set("2", 3);
  directoryImagesMap.set("3", 5);
  directoryImagesMap.set("4", 7);
  directoryImagesMap.set("5", 5);
  directoryImagesMap.set("6", 7);
  directoryImagesMap.set("7", 5);
  directoryImagesMap.set("8", 7);
  directoryImagesMap.set("9", 6);
  directoryImagesMap.set("10", 5);
  directoryImagesMap.set("11", 5);
  directoryImagesMap.set("12", 5);
  directoryImagesMap.set("13", 7);
  directoryImagesMap.set("14", 5);
  directoryImagesMap.set("15", 3);
  directoryImagesMap.set("16", 3);
  directoryImagesMap.set("17", 7);
  directoryImagesMap.set("18", 5);
  directoryImagesMap.set("19", 5);
  directoryImagesMap.set("20", 3);
  directoryImagesMap.set("21", 5);
  directoryImagesMap.set("22", 5);
  directoryImagesMap.set("23", 3);
  directoryImagesMap.set("24", 5);
  directoryImagesMap.set("25", 5);

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
      if (attemptCount === 0) {
        correctPuzzlesCount++;
        solvedDirectoryIndices.add(randomDirectory);
        currentStreak++;
        longestStreak = Math.max(longestStreak, currentStreak);
      } else {
        currentStreak = 0;
        multipleAttemptsCount++;
      }
      maxAttempts = Math.max(maxAttempts, attemptCount + 1);

      progress = (solvedDirectoryIndices.size / directoryImagesMap.size) * 100;
      $(".buttonReset").prop("disabled", false);
      $(".buttonSubmit").prop("disabled", true);
      attemptCount = 0;

      // Check if all directories have been solved correctly on the first attempt
      if (solvedDirectoryIndices.size === directoryImagesMap.size) {
        // Store the metrics in localStorage
        localStorage.setItem("correctPuzzlesCount", correctPuzzlesCount);
        localStorage.setItem("multipleAttemptsCount", multipleAttemptsCount);
        localStorage.setItem("longestStreak", longestStreak);
        localStorage.setItem("maxAttempts", maxAttempts);
        localStorage.setItem(
          "totalIncorrectAttempts",
          totalIncorrectAttemptsCount
        );

        // Redirect to the results page
        window.location.href = "Result/result.html";
      }
    } else {
      $(result).text("Incorrect Answer").css("background-color", "#fe5f55");
      attemptCount++;
      totalIncorrectAttemptsCount++;
      currentStreak = 0;
    }
  });

  // Function to reset and load images
  function resetAndLoadImages() {
    // Hide the result div
    $(result).text("").css("background-color", "transparent");

    $(".progress-bar-fill").css("width", progress + "%");

    // Function to get a random integer between min and max (inclusive)
    function getRandomInt(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    var path = "/Books/Sets"; // Path to the directory containing images
    var totalDirectories = directoryImagesMap.size; // Total number of directories

    do {
      randomDirectory = getRandomInt(1, totalDirectories);
    } while (solvedDirectoryIndices.has(randomDirectory) && solvedDirectoryIndices.size < totalDirectories);

    // If all directories have been solved correctly on the first attempt, reset the solvedDirectoryIndices set
    if (solvedDirectoryIndices.size === totalDirectories) {
      solvedDirectoryIndices.clear();
    }

    var numberOfImages = directoryImagesMap.get(String(randomDirectory));

    // Update the grid-template-columns property of the .container class using jQuery
    $(".container").css(
      "grid-template-columns",
      `repeat(${numberOfImages}, 1fr)`
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
        `${path}/${randomDirectory}/${imageIds[i]}.PNG`
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
    $(".buttonSubmit").prop("disabled", false);
  }

  // Call the resetAndLoadImages function on page load
  resetAndLoadImages();

  // Call the resetAndLoadImages function when the reset button is clicked
  $(".buttonReset").click(function () {
    resetAndLoadImages();
  });
});
const bar = document.querySelector(".bar");
