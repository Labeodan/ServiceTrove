let timeslotIndex = 1;

// Function to add a new timeslot
function addTimeslot() {
    const container = document.getElementById('timeslotsContainer');
    const newTimeslot = document.createElement('div');
    newTimeslot.className = 'timeslot';
    newTimeslot.id = `timeslot-${timeslotIndex}`;

    newTimeslot.innerHTML = `
    <div class="timeslot mb-3 d-flex align-items-center" id="timeslot-${timeslotIndex}">
        <input type="date" class="form-control rounded-4 me-2" name="timeslots[${timeslotIndex}][date]" required>
        <input type="time" class="form-control rounded-4 me-2" name="timeslots[${timeslotIndex}][time]" required>
        <button type="button" class="btn btn-danger btn-sm" onclick="removeTimeslot(${timeslotIndex})">
            <i class="fas fa-trash"></i>
        </button>
    </div>
`;


    container.appendChild(newTimeslot);
    timeslotIndex++;
}

// Function to remove a timeslot
function removeTimeslot(index) {
    const timeslotToRemove = document.getElementById(`timeslot-${index}`);
    timeslotToRemove.remove();
}