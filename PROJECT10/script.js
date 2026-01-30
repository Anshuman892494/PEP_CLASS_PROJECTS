// - DOM METHODS -
const userList = document.querySelector("#userList");
const searchInput = document.getElementById("search");
const totalUsersEl = document.getElementById("totalUsers");
const comUsersEl = document.getElementById("comUsers");
const sortBtn = document.querySelector("#sortBtn");

// - PROMISE + ASYNC -
async function fetchUsers() {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve([
                { id: 1, name: "Anshu Kumar", email: "anshu@gmail.com" },
                { id: 2, name: "Ravi Sharma", email: "ravi@yahoo.com" },
                { id: 3, name: "Neha Singh", email: "neha@company.com" },
                { id: 4, name: "Amit Verma", email: "amit@gmail.com" },
                { id: 5, name: "Radha Rani", email: "radha@outlook.com" },
                { id: 6, name: "Utkarsh Yadav", email: "utkarsh@gmail.com" },
                { id: 7, name: "Sujeet Yadav", email: "sujeet@gmail.com" }
            ]);
        }, 1000);
    });
}

let users = [];

// - RENDER FUNCTION -
function renderUsers(list) {
    userList.innerHTML = "";

    list.forEach(user => {
        const li = document.createElement("li");
        li.textContent = `${user.name} - ${user.email}`;
        userList.appendChild(li);
    });
}

// - ARRAY METHODS -
function updateStats() {
    totalUsersEl.textContent = users.length;

    const comUsers = users.filter(user =>
        user.email.includes("gmail")
    );

    comUsersEl.textContent = comUsers.length;
}

// - STRING METHODS + FILTER -
searchInput.addEventListener("input", () => {
    const value = searchInput.value.toLowerCase().trim();

    const filtered = users.filter(user =>
        user.name.toLowerCase().includes(value)
    );

    renderUsers(filtered);
});

// - SORT METHOD -
sortBtn.addEventListener("click", () => {
    users.sort((a, b) => a.name.localeCompare(b.name));
    renderUsers(users);
});

// - INIT -
async function init() {
    users = await fetchUsers();
    renderUsers(users);
    updateStats();
}
init();
