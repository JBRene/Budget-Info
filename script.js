const budgetData = {
    james: {
        title: "James",
        breakdown: [
            { category: "Mortgage", amount: 475 },
            { category: "Bills", amount: 385 },
            { category: "Groceries", amount: 303 },
            { category: "Savings", amount: 78 },
            { category: "Health", amount: 13 },
            { category: "Entertainment", amount: 13 },
            { category: "Debts", amount: 39 },
            { category: "Disposable", amount: 330}
        ],
    },
    beth: {
        title: "Beth",
        breakdown: [
            { category: "Mortgage", amount: 451 },
            { category: "Bills", amount: 366 },
            { category: "Groceries", amount: 288 },
            { category: "Savings", amount: 74 },
            { category: "Health", amount: 13 },
            { category: "Entertainment", amount: 13 },
            { category: "Debts", amount: 37 },
            { category: "Disposable", amount: 314}
        ],
    },

};

let startX = 0;
let currentTable = "james";
let currentPerson = null;

const tableWrapper = document.getElementById("swipe-wrapper");

function toggleBreakdown(person) {
    const container = document.getElementById("breakdown-container");
    // const title = document.getElementById("breakdown-title");
    const tableBody = document.getElementById("breakdown-table");
    
    if (currentPerson === person) {
        container.style.display = "none";
        currentPerson = null;
    } else {
        const data = budgetData[person];

        tableBody.innerHTML = "";

        data.breakdown.forEach((item) => {
            const row = document.createElement("tr");
            if (item.category === "Groceries") {
                row.innerHTML = `
                    <td class = "cat" style = "border-bottom: 1px solid #04724D">${item.category}</td>
                    <td class = "dollar" style = "border-bottom: 1px solid #04724D">$ ${item.amount}.00</td>
                `;
            } else {
                row.innerHTML = `
                    <td class = "cat">${item.category}</td>
                    <td class = "dollar">$ ${item.amount}.00</td>
                `;
            }

            tableBody.appendChild(row);
    });

    container.style.display = "block";
    currentPerson = person;
    }
}

if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('sw.js').then((registration) => {
        console.log('Service Worker registered with scope:', registration.scope);

        // Check for updates
        registration.onupdatefound = () => {
            const installingWorker = registration.installing;
            installingWorker.onstatechange = () => {
                if (installingWorker.state === 'installed') {
                    if (navigator.serviceWorker.controller) {
                        // Notify user of the update
                        showUpdateNotification();
                    }
                }
            };
        };
    }).catch((error) => {
        console.error('Service Worker registration failed:', error);
    });
}

function showUpdateNotification() {
    const updateNotification = document.createElement('div');
    updateNotification.innerHTML = `
        <div id="update-notification"
                style="position: fixed;
                bottom: 10px;
                right: 10px;
                background: #007bff;
                color: white;
                padding: 10px;
                border-radius: 5px; 
                z-index: 1000;">
            A new update is available. <button id="reload">Reload</button>
        </div>
    `;
    document.body.appendChild(updateNotification);

    // Reload the page on button click
    document.getElementById('reload').addEventListener('click', () => {
        window.location.reload();
    });
}
