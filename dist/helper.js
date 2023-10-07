document.addEventListener("keydown", function (e) {
  // Enter was pressed without shift key
  if (e.key === "Enter" && !e.shiftKey) {
    // prevent default behavior
    e.preventDefault();
  }
});