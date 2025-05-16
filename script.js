// DOM element references
const authContainer = document.getElementById("authContainer");
const bmiContainer = document.getElementById("bmiContainer");
const result = document.getElementById("result");
const themeToggle = document.getElementById("themeToggle");
let isDark = false;

// Load theme preference and login state on page load
window.onload = function() {
  // Load theme preference
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark') {
    document.body.classList.add('dark');
    themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    isDark = true;
  }
  
  // Check if user was logged in
  const isLoggedIn = localStorage.getItem('isLoggedIn');
  if (isLoggedIn === 'true') {
    authContainer.classList.add("hidden");
    bmiContainer.classList.remove("hidden");
  }
};

// Login functionality
function login() {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  const storedPassword = localStorage.getItem(username);
  
  if (storedPassword === password) {
    authContainer.classList.add("hidden");
    bmiContainer.classList.remove("hidden");
    localStorage.setItem('isLoggedIn', 'true');
  } else {
    alert("Invalid credentials");
  }
}

// Registration functionality
function register() {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  
  if (username && password) {
    localStorage.setItem(username, password);
    alert("Registered successfully!");
  } else {
    alert("Please enter username and password");
  }
}

// Logout functionality
function logout() {
  authContainer.classList.remove("hidden");
  bmiContainer.classList.add("hidden");
  localStorage.removeItem('isLoggedIn');
}

// Input validation function
function validateInput(value, min, max) {
  const num = parseFloat(value);
  return !isNaN(num) && num >= min && num <= max;
}

// Calculate BMI
function calculateBMI() {
  const height = document.getElementById("height").value;
  const weight = document.getElementById("weight").value;
  
  if (!validateInput(height, 50, 250)) {
    result.innerText = "Please enter a valid height (50-250cm)";
    return;
  }
  
  if (!validateInput(weight, 10, 500)) {
    result.innerText = "Please enter a valid weight (10-500kg)";
    return;
  }
  
  const heightValue = parseFloat(height);
  const weightValue = parseFloat(weight);
  
  const bmi = (weightValue / ((heightValue / 100) ** 2)).toFixed(2);
  let status = "";
  let cssClass = "";
  
  if (bmi < 18.5) {
    status = "Underweight"; 
    cssClass = "underweight";
  }
  else if (bmi < 24.9) {
    status = "Normal weight";
    cssClass = "normal";
  }
  else if (bmi < 29.9) {
    status = "Overweight";
    cssClass = "overweight";
  }
  else {
    status = "Obese";
    cssClass = "obese";
  }
  
  result.innerHTML = `<div class="bmi-result ${cssClass}">Your BMI is ${bmi} (${status})</div>`;
}

// Theme toggle
themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  isDark = !isDark;
  themeToggle.innerHTML = isDark ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
});