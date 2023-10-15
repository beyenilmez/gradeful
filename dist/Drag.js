/*===== DRAG and DROP =====*/
const dropContainers = document.querySelectorAll('.drop_container');

dropContainers.forEach(dropItems => {
    const sortable = new Sortable(dropItems, {
        animation: 300,
        delay:100,
        chosenClass: "sortable-chosen",
        dragClass: "sortable-drag",
        ghostClass: "sortable-ghost",
        onEnd: function (evt) {
            // Get the current order of elements after a drag-and-drop action
            const currentOrder = sortable.toArray();

console.log(currentOrder)

            // Save the order to localStorage, using the container's unique ID
            localStorage.setItem(`elementOrder-${dropItems.id}`, JSON.stringify(currentOrder));
        }
    });

    // Function to render elements in the saved order
    function renderSavedOrder() {
        const savedOrder = localStorage.getItem(`elementOrder-${dropItems.id}`);
        if (savedOrder) {
            const orderArray = JSON.parse(savedOrder);
            orderArray.forEach(itemId => {
                const element = dropItems.querySelector(`[data-id="${itemId}"]`);
                if (element) {
                    dropItems.appendChild(element);
                }
            });
        }
    }

    // Check if there's a saved order in localStorage and render elements accordingly
    window.addEventListener('load', renderSavedOrder);
});