

import Action from "./classes/Action.js";
import ActionsManager from "./classes/ActionsManager.js";

const manager = new ActionsManager();

// const ac = new Action(Action.amountTypes.income, "desc a", 123);
// manager.actions.push(ac);
//manager.addAction(new Action(Action.amountTypes.income, " salary", 100));
//manager.addAction(new Action(Action.amountTypes.expense, "shopping", 200));
//manager.addAction(new Action(Action.amountTypes.income, "salaryB", 300));

console.log(manager.actions);

console.log(manager.balance);

window.addEventListener('load', function () {
    const actions = localStorage.getItem('actions');
    try {
        const realActionsArray = JSON.parse(actions);
        realActionsArray.forEach(function (elem) {
            manager.addAction(new Action(elem.type, elem.description, elem.amount));
        });
        showActionsInTable();
    } catch (err) {
        console.error('has no actions in local storage', err.message);
    }
})

function showActionsInTable() {
    document.getElementById("actions").innerHTML = "";
    for (let action of manager.actions) {
        document.getElementById("actions").innerHTML += `<tr class=${action.type === "income" ? "text-success" : "text-danger"
            }>
                <td>${action.description}</td>
                <td>${action.amount}</td>
                <td onclick="updateAmount(${action.id
            })"><i class="fa-solid fa-pen-to-square"></i></td>
                <td onclick="deleteAction(${action.id
            })"><i class="fa-solid fa-trash"></i></td>
              </tr>`;
    }
    document.querySelector(".alert").innerHTML = `Balance: ${manager.balance}`;
}

document.querySelector(".alert").innerHTML = `Balance: ${manager.balance}`;
window.addNewAction = () => {
    // get data from select & inputs
    let type = document.getElementById("type").value;
    let description = document.getElementById("description").value;
    let amount = document.getElementById("amount").value;
    // add action to actions array
    manager.addAction(new Action(type, description, amount));
    // show current actions in table
    showActionsInTable();
    // clear inputs
    document.getElementById("description").value = "";
    document.getElementById("amount").value = "";
    localStorage.setItem('actions', JSON.stringify(manager.actions));
};
showActionsInTable();

window.updateAmount = (actionId) => {
    let newAmount = prompt("Enter new amount please: ");
    if (newAmount == null || newAmount == "") alert("Sorry wrong input");
    else {
        manager.updateAction(actionId, +newAmount);
        showActionsInTable();
    }
};

window.deleteAction = (actionId) => {
    if (confirm("Are you sure?")) {
        manager.deleteAction(actionId);
        showActionsInTable();
    }
};


// import Action from "./Action";
// import ActionsManager from "./ActionsManager";

// const manager = new ActionsManager();

// const ac = new Action(Action.amountTypes.income, "desc a", 123);
// manager.actions.push(ac);

// manager.actions.push(new Action(Action.amountTypes.expense, "desc b", 456));

// const sum = manager.calcBalance();
// console.log(sum);