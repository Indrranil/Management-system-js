// frontend.js

function fetchCustomers() {
    fetch('/customers')
        .then(response => response.json())
        .then(data => {
            displayCustomers(data);
        })
        .catch(error => {
            console.error('Error fetching customers:', error);
        });
}

function displayCustomers(customers) {
    const table = document.getElementById('customer-table');
    table.innerHTML = '';

    const headers = ['Name', 'Email', 'State', 'Number'];
    const headerRow = document.createElement('tr');
    headers.forEach(headerText => {
        const th = document.createElement('th');
        th.textContent = headerText;
        headerRow.appendChild(th);
    });
    table.appendChild(headerRow);

    customers.forEach(customer => {
        const row = document.createElement('tr');
        Object.values(customer).forEach(value => {
            const cell = document.createElement('td');
            cell.textContent = value;
            row.appendChild(cell);
        });
        table.appendChild(row);
    });
}

window.addEventListener('DOMContentLoaded', () => {
    fetchCustomers();
});
