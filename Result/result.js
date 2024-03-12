// Retrieve the stored analytics data from localStorage
const correctPuzzlesCount = parseInt(
  localStorage.getItem("correctPuzzlesCount"),
);
const multipleAttemptsCount = parseInt(
  localStorage.getItem("multipleAttemptsCount"),
);
const longestStreak = parseInt(localStorage.getItem("longestStreak"));
const maxAttempts = parseInt(localStorage.getItem("maxAttempts"));

const totalIncorrectAttemptsCount = parseInt(localStorage.getItem("totalIncorrectAttempts"));

// Get references to the HTML elements where we want to display the data
const accuracyElement = document.getElementById("accuracy");
const multipleAttemptsCountElement =
  document.getElementById("multiple-attempts");
const longestStreakElement = document.getElementById("longest-streak");
const maxAttemptsElement = document.getElementById("max-attempts");

// Calculate the accuracy percentage
const totalPuzzles =
  parseInt(correctPuzzlesCount) + parseInt(multipleAttemptsCount);

const accuracy = ((correctPuzzlesCount / totalPuzzles) * 100).toFixed(2) + "%";

// Calculate the score
const maxPossibleStreak = totalPuzzles; // Assuming all puzzles can be solved on the first attempt

const accuracyScore = (correctPuzzlesCount / totalPuzzles) * 100;
const streakReward = (longestStreak / maxPossibleStreak) * 15; // Maximum reward of 20 points for a perfect streak
const totalIncorrectAttemptsPenalty = (totalIncorrectAttemptsCount / 5) * 10; // Maximum penalty of 10 points for all puzzles requiring multiple attempts

const totalScore = accuracyScore + streakReward - totalIncorrectAttemptsPenalty;
const clampedScore = Math.max(0, Math.min(totalScore, 100)).toFixed(0); // Ensure the score is between 0 and 100

// Render the analytics data
accuracyElement.textContent = accuracy;
multipleAttemptsCountElement.textContent = multipleAttemptsCount;
longestStreakElement.textContent = longestStreak;
maxAttemptsElement.textContent = maxAttempts;

const counter = document.getElementById("score-number");

const button = document.querySelector(".PlayAgain");
button.addEventListener("click", function () {
  // Redirect to results.html
  window.location.href = "../index.html";
});

function countUp() {
  const target = clampedScore;
  const count = +counter.innerText;
  const increment = target / 100;
  if (count < target) {
    counter.innerText = `${Math.ceil(count + increment)}`;
    setTimeout(countUp, 30);
  } else {
    counter.innerText = target;
  }
}

countUp();
