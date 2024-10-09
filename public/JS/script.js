let timeslotIndex = 1;

// Function to add a new timeslot
function addTimeslot() {
    const container = document.getElementById('timeslotsContainer');
    const newTimeslot = document.createElement('div');
    newTimeslot.className = 'timeslot';
    newTimeslot.id = `timeslot-${timeslotIndex}`;

    newTimeslot.innerHTML = `
        <label>Time Slot:</label>
        <input type="date" name="timeslots[${timeslotIndex}][date]" required>
        <input type="time" name="timeslots[${timeslotIndex}][time]" required>
        <button type="button" onclick="removeTimeslot(${timeslotIndex})">Delete</button>
        <br><br>
    `;

    container.appendChild(newTimeslot);
    timeslotIndex++;
}

// Function to remove a timeslot
function removeTimeslot(index) {
    const timeslotToRemove = document.getElementById(`timeslot-${index}`);
    timeslotToRemove.remove();
}