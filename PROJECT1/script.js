let resultData = [];

function saveResult() {
    const name = document.getElementById('name').value.trim();
    const reg = document.getElementById('reg').value.trim();
    const course = document.getElementById('course').value.trim();

    if (name === '' || reg === '' || course === '') {
        alert('Please fill all fields!');
        return;
    }

    resultData.push({ name, reg, course });
    displayResults();
    clearInputs();
}

function displayResults() {
    const resultTable = document.getElementById('resultTable');
    resultTable.innerHTML = `
        <tr>
            <th>S.No</th>
            <th>Name</th>
            <th>Reg. No</th>
            <th>Course</th>
            <th>Action</th>
        </tr>
    `;

    resultData.forEach((data, index) => {
        const row = resultTable.insertRow();
        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${data.name}</td>
            <td>${data.reg}</td>
            <td>${data.course}</td>
            <td><button class="delete-btn" onclick="deleteRow(${index})">Delete</button></td>
        `;
    });
}

function deleteRow(index) {
    // array.splice(start, deleteCount)
    resultData.splice(index, 1);
    displayResults();
}

function clearInputs() {
    document.getElementById('name').value = '';
    document.getElementById('reg').value = '';
    document.getElementById('course').value = '';
    document.getElementById('name').focus();
}
