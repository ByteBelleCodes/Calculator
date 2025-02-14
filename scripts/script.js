const lightTheme = "styles/light.css";
const darkTheme = "styles/dark.css";
const sunIcon = "assets/SunIcon.svg";
const moonIcon = "assets/MoonIcon.svg";
const themeIcon = document.getElementById("theme-icon");
const res = document.getElementById("result");
const toast = document.getElementById("toast");

let isNewCalculation = false; // Flag to track new calculation

document.getElementById('clear-button').onclick = function() {
  res.value = ''; // Clear the display
  isNewCalculation = false; // Reset the flag
};


function calculate(value) {
  const calculatedValue = eval(value || null);
  if (isNaN(calculatedValue)) {
    res.value = "Can't divide 0 with 0";
    setTimeout(() => {
      res.value = "";
    }, 1300);
  } else {
    res.value = calculatedValue;
    isNewCalculation = true; // Set flag for new calculation
  }
}


// Swaps the stylesheet to achieve dark mode.
function changeTheme() {
  const theme = document.getElementById("theme");
  setTimeout(() => {
    toast.innerHTML = "Calculator";
  }, 1500);
  if (theme.getAttribute("href") === lightTheme) {
    theme.setAttribute("href", darkTheme);
    themeIcon.setAttribute("src", sunIcon);
    toast.innerHTML = "Dark Mode 🌙";
  } else {
    theme.setAttribute("href", lightTheme);
    themeIcon.setAttribute("src", moonIcon);
    toast.innerHTML = "Light Mode ☀️";
  }
}

function liveScreen(enteredValue) {
  if (isNewCalculation) {
    res.value = ""; // Clear previous result
    isNewCalculation = false; // Reset the flag
  }
  res.value += enteredValue; // Append new value
}


//adding event handler on the document to handle keyboard inputs
document.addEventListener("keydown", keyboardInputHandler);


function keyboardInputHandler(e) {
  e.preventDefault(); // Prevent default behavior

  // Check if a new calculation is being started
  if (isNewCalculation) {
    res.value = ""; // Clear previous result
    isNewCalculation = false; // Reset the flag
  }

  // Handle number inputs
  if (e.key >= "0" && e.key <= "9") {
    res.value += e.key; // Append number
  }

  // Handle operator inputs
  if (e.key === "+" || e.key === "-" || e.key === "*" || e.key === "/") {
    res.value += e.key; // Append operator
  }

  // Handle decimal input
  if (e.key === ".") {
    res.value += "."; // Append decimal
  }

  // Handle Enter key for calculation
  if (e.key === "Enter") {
    calculate(res.value); // Calculate the result
  }

  // Handle Backspace for removing the last input
  if (e.key === "Backspace") {
    res.value = res.value.slice(0, -1); // Remove last character
  }
}
