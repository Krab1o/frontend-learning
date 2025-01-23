const bank = {
    transactions: [],
    addTransaction(value) {
        newTransaction = {
            id: Math.max(...this.transactions.map((tr) => tr.id)) + 1,
            value: value
        }
        newTransaction.id = !isFinite(newTransaction?.id) ? 1 : newTransaction.id
        this.transactions.push(newTransaction)
        return newTransaction;
    },
    removeTransaction(id) {
        this.transactions = this.transactions.filter((tr) => {
            return tr.id !== id
        })
    },
    calculateTransactions() {
        if (this.transactions.length === 0) {
            return 0;
        }
        return this.transactions.map((tr) => tr.value).reduce((acc, val) => acc + val)
    },
    printTransactions(){
        console.log(this.transactions)
    }
}

const onSubmitEvent = (form) => (e) => {
    e.preventDefault()
    
    let coeff = form.id === "incomeForm" ? 1 : -1;
    let value = parseFloat(form.firstElementChild.value)

    if (isNaN(value)) {
        alert("Not a number")
        return;
    }
    if (value <= 0) {
        alert("No negative value allowed")
        return;
    }
    let amount = coeff * value;
    let newTransaction = bank.addTransaction(amount)
    render(newTransaction);
}

const onClickEvent = (li, id) => (e) => {
    bank.removeTransaction(id)
    li.remove()
    renderTotal();
}

function renderLists(transaction) {
    let lists = document.getElementsByClassName("money-block__list");
    let list;
    let form;

    li = document.createElement("li");
    liText = document.createTextNode(transaction.value + "$")
    li.appendChild(liText)
    li.addEventListener("click", onClickEvent(li, transaction.id))

    if (transaction.value > 0) {
        list = lists[0]
        li.className = "list-item green"
        form = document.getElementById("incomeInput")
    } else {
        list = lists[1]
        li.className = "list-item red"
        form = document.getElementById("expenseInput")
    }
    form.value = '';
    list.append(li)
}

function renderTotal() {
    let sum = bank.calculateTransactions();
    balance = document.getElementById("balance")
    if (sum > 0) { balance.style.color = "green" }
    if (sum < 0) { balance.style.color = "red" }
    if (sum == 0) { balance.style.color = "black" }
    balance.textContent = `${sum}\$`;
    bank.printTransactions();
}

function render(newTransaction) {
    renderLists(newTransaction)
    renderTotal()
}

let forms = document.getElementsByTagName("form")

for (form of forms) {
    form.addEventListener("submit", onSubmitEvent(form))
    const formInput = form.firstElementChild
}
