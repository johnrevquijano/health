let currentEditIndex = null;

function showForm() {
    document.getElementById('health-form').style.display = 'block';
    document.getElementById('home').style.display = 'none';
    document.getElementById('history').style.display = 'none';
    clearForm();
    document.getElementById('message').innerText = ""; // Clear message
}

function hideForm() {
    document.getElementById('health-form').style.display = 'none';
}

function toggleHistory() {
    const history = document.getElementById('history');
    history.style.display = history.style.display === 'none' ? 'block' : 'none';
}

function exitApp() {
    hideForm();
    if (confirm("Are you sure you want to exit?")) {
        document.getElementById('home').style.display = 'block';
        document.getElementById('action-buttons').style.display = 'none';
    }
}

function goHome() {
    document.getElementById('home').style.display = 'none';
    document.getElementById('action-buttons').style.display = 'block';
}

function clearForm() {
    document.getElementById('age').value = '';
    document.getElementById('weight').value = '';
    document.getElementById('height').value = '';
    document.getElementById('heartRate').value = '';
    document.getElementById('gender').value = 'male'; // Default to male
}

document.getElementById('health-form').onsubmit = function(event) {
    event.preventDefault(); // Prevent the default form submission

    const age = document.getElementById('age').value;
    const weight = document.getElementById('weight').value;
    const height = document.getElementById('height').value;
    const heartRate = document.getElementById('heartRate').value;
    const gender = document.getElementById('gender').value;

    const message = document.getElementById('message');

    // Validation
    if (!age || age <= 0) {
        message.innerText = "Please enter a valid age.";
        message.style.color = "red";
        return;
    }
    if (!weight || weight <= 0) {
        message.innerText = "Please enter a valid weight.";
        message.style.color = "red";
        return;
    }
    if (!height || height <= 0) {
        message.innerText = "Please enter a valid height.";
        message.style.color = "red";
        return;
    }
    if (!heartRate || heartRate <= 0) {
        message.innerText = "Please enter a valid heart rate.";
        message.style.color = "red";
        return;
    }

    // Calculate BMI
    const heightInMeters = height / 100;
    const bmi = (weight / (heightInMeters * heightInMeters)).toFixed(2);
    const bodyFat = (gender === 'male' ? (1.20 * bmi) + (0.23 * age) - 16.2 : (1.20 * bmi) + (0.23 * age) - 5.4).toFixed(2);

    // Determine BMI classification
    let classification;
    if (bmi < 18.5) {
        classification = "Underweight";
    } else if (bmi >= 18.5 && bmi < 24.9) {
        classification = "Normal weight";
    } else if (bmi >= 25 && bmi < 29.9) {
        classification = "Overweight";
    } else {
        classification = "Obese";
    }

    const historyList = document.getElementById('history-list');
    if (currentEditIndex !== null) {
        // Update existing record
        const rowToEdit = historyList.children[currentEditIndex];
        rowToEdit.innerHTML = `<td>${age}</td><td>${weight}</td><td>${height}</td><td>${heartRate}</td><td>${gender}</td><td>${bmi}</td><td>${bodyFat}</td><td>${classification}</td>
            <td class="actions"><button onclick="editRecord(${currentEditIndex})">Edit</button>
            <button onclick="deleteRecord(${currentEditIndex})">Delete</button></td>`;
        message.innerText = "Record updated successfully!";
        currentEditIndex = null; // Reset edit index after editing
    } else {
        // Add new record
        const newRow = document.createElement('tr');
        newRow.innerHTML = `<td>${age}</td><td>${weight}</td><td>${height}</td><td>${heartRate}</td><td>${gender}</td><td>${bmi}</td><td>${bodyFat}</td><td>${classification}</td>
            <td class="actions"><button onclick="editRecord(${historyList.children.length})">Edit</button>
            <button onclick="deleteRecord(${historyList.children.length})">Delete</button></td>`;
        historyList.appendChild(newRow);
        message.innerText = "Record added successfully!";
    }

    clearForm(); // Clear the form after adding a new record
    hideForm();
};

function editRecord(index) {
    const row = document.getElementById('history-list').children[index];
    const cells = row.children;

    // Fill the form with existing record's data
    document.getElementById('age').value = cells[0].innerText;
    document.getElementById('weight').value = cells[1].innerText;
    document.getElementById('height').value = cells[2].innerText;
    document.getElementById('heartRate').value = cells[3].innerText;
    document.getElementById('gender').value = cells[4].innerText.toLowerCase();

    currentEditIndex = index;
    showForm(); // Show the form with filled data
}

function deleteRecord(index) {
    const historyList = document.getElementById('history-list');
    historyList.removeChild(historyList.children[index]);
    document.getElementById('message').innerText = "Record deleted successfully!";
}
