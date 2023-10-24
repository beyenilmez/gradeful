import Sortable from 'sortablejs';
import '../css/drag.css';

/*===== DRAG and DROP =====*/
const dropContainers = document.querySelectorAll('.drop_container');

dropContainers.forEach(dropItems => {
    const sortable = new Sortable(dropItems, {
        draggable: ".draggable",
        animation: 300,
        delay: 115,
        chosenClass: "sortable-chosen",
        dragClass: "sortable-drag",
        ghostClass: "sortable-ghost",
        onEnd: function (evt) {
            // Get the current order of elements after a drag-and-drop action
            const currentOrder = sortable.toArray();

            console.log(currentOrder)

            // Save the order to localStorage, using the container's unique ID
            localStorage.setItem(`elementOrder-${dropItems.id}`, JSON.stringify(currentOrder));
            console.log(`elementOrder-${dropItems.id}`, JSON.stringify(currentOrder))
        }
    });
});