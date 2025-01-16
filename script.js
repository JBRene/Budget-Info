const budgetData = {
    james: {
        title: "James",
        breakdown: [
            { category: "Mortgage", amount: 549 },
            { category: "Bills", amount: 438 },
            { category: "Groceries", amount: 298 },
            { category: "Savings", amount: 268 },
            { category: "Health", amount: 60 },
            { category: "Entertainment", amount: 18 },
            { category: "Debts", amount: 119 },
            { category: "Other", amount: 454 }
        ],
    },
    beth: {
        title: "Beth",
        breakdown: [
            { category: "Mortgage", amount: 377 },
            { category: "Bills", amount: 298 },
            { category: "Groceries", amount: 203 },
            { category: "Savings", amount: 183 },
            { category: "Health", amount: 41 },
            { category: "Entertainment", amount: 13 },
            { category: "Debts", amount: 82 },
            { category: "Other", amount: 307 }
        ],
    },

};

function toggleBreakdown(person) {
    const container = document.getElementById("breakdown-container");
    const title = document.getElementById("breakdown-title");
    const tableBody = document.getElementById("breakdown-table");
    
    // Toggle visibility of the container
    if (container.style.display === "none" || container.style.display === "") {
        // Populate the table with selected person's data
        const data = budgetData[person];
        title.textContent = data.title;

        // Clear existing rows
        tableBody.innerHTML = "";

        // Add rows dynamically
        data.breakdown.forEach((item) => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${item.category}</td>
                <td>$${item.amount}</td>
            `;
            tableBody.appendChild(row);
    });

    container.style.display = "block";
    } else {
        container.style.display = "none";
    }
}