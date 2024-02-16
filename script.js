// Execute when the DOM content is loaded
document.addEventListener("DOMContentLoaded", (event) => {
  var dragSrcEl = null;

  // Function to handle the start of a drag operation
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
});

// Execute when the document is ready
$(document).ready(function () {
  console.log("Document ready");

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
    var totalDirectories = 3; // Total number of directories

    // Randomly select a directory
    var randomDirectory = getRandomInt(1, totalDirectories);

    // Array to keep track of selected image numbers
    var selectedImages = [];

    // Display images from the selected directory on the book divs in random order
    $(".box").each(function () {
      var imgId;
      // Ensure each image is unique
      do {
        imgId = getRandomInt(1, 3); // Assuming there are 3 images in each directory
      } while (selectedImages.includes(imgId));

      selectedImages.push(imgId);
      var newSrc = path + "/" + randomDirectory + "/" + imgId + ".PNG";
      $(this).find("img").attr("src", newSrc).attr("id", imgId);
    });
  });
});
