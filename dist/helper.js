document.addEventListener("keydown", function (e) {
  // Enter was pressed without shift key
  if (e.key === "Enter" && !e.shiftKey) {
    // prevent default behavior
    e.preventDefault();
  }
});

// Function to adjust the height
function adjustHeight() {
  // Get the screen width
  const screenWidth = window.innerWidth || document.documentElement.clientWidth;

  // Get the element by ID
  const termElement = document.getElementById("term");

  // Check if the element exists
  if (termElement) {
    // Count the number of divs inside <!-- Class name --> level
    const divsInsideClass = termElement.querySelectorAll('#class').length;

    // Calculate the adjusted height
    const adjustedHeight = (divsInsideClass * 6.28); // 7 is the initial height

    // Set the height of the element
    termElement.style.height = screenWidth < 768 ? `${adjustedHeight}rem` : `auto`;
  }
}

// Run the function initially
document.addEventListener("DOMContentLoaded", adjustHeight);

// Run the function whenever the window is resized
window.addEventListener("resize", adjustHeight);

// Function to adjust the margin incrementally
function adjustMargin() {
  const screenWidth = window.innerWidth || document.documentElement.clientWidth;

  // Get the element by ID
  const termElement = document.getElementById("term");

  // Check if the element exists
  if (termElement) {
    // Get all divs with id "class" inside the term element
    const classDivs = termElement.querySelectorAll("#class");

    // Loop through each class div and set the margin incrementally
    classDivs.forEach((div, index) => {
      const adjustedMargin = screenWidth < 768 && index != 0 ? 2.75 : 0.25; // Calculate the adjusted margin
      div.style.marginTop = `${adjustedMargin}rem`;
    });
  }

}

// Run the function initially
document.addEventListener("DOMContentLoaded", adjustMargin);

// Run the function whenever the window is resized
window.addEventListener("resize", adjustMargin);
