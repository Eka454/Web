class UI {
  constructor() {
    this.budgetFeedback = document.querySelector(".budget-feedback");
    this.expenseFeedback = document.querySelector(".expense-feedback");
    this.budgetInput = document.getElementById("budget-input");
    this.budgetAmount = document.getElementById("budget-amount");
    this.expenseAmount = document.getElementById("expense-amount");
    this.balanceAmount = document.getElementById("balance-amount");
    this.expenseInput = document.getElementById("expense-input");
    this.amountInput = document.getElementById("amount-input");
    this.expenseList = document.getElementById("expense-list");
    this.itemList = [];
    this.itemID = 0;
  }

  // добавить бюджет
  submitBudgetForm(){
      const value = this.budgetInput.value;
      if(value === '' || value <= 0){
        this.budgetFeedback.classList.add('showItem');
        this.budgetFeedback.innerHTML = `<p>Введите положительное число</p>`;
        const self = this;
        setTimeout(function(){
          self.budgetFeedback.classList.remove('showItem');
        }, 3000);
      } else {
        this.budgetAmount.textContent = value;
        this.budgetInput.value = '';
        this.showBalance();
      }
  }

  // вывод остатка
  showBalance(){
    const expense = this.totalExpense();
    const total = parseInt(this.budgetAmount.textContent) - expense;
    this.balanceAmount.textContent = total;
  }
  // ввод затрат
  submitExpenseForm(){
    const expenseValue = this.expenseInput.value;
    const amountValue = this.amountInput.value;
    if(expenseValue === '' || amountValue === '' || amountValue <= 0){
      this.expenseFeedback.classList.add('showItem');
      this.expenseFeedback.innerHTML = `<p>Введите положительное число</p>`;
      const self = this;
      setTimeout(function(){
        self.expenseFeedback.classList.remove('showItem');
      }, 3000)
    } else {
      let amount = parseInt(amountValue);
      this.expenseInput.value = '';
      this.amountInput.value = '';

      let expense = {
        id: this.itemID,
        title: expenseValue,
        amount: amount
      }
      this.itemID++;
      this.itemList.push(expense);
      this.addExpense(expense);
      this.showBalance();

    }
  }

  // вывод затрат 
  addExpense(expense){
    const div = document.createElement('div');
    div.classList.add('expense');
    div.innerHTML = `<div class="expense-item d-flex justify-content-between align-items-baseline">

    <h6 class="expense-title mb-0 text-uppercase list-item">${expense.title}</h6>
    <h5 class="expense-amount mb-0 list-item">${expense.amount}&#8381;</h5>

    <div class="expense list-item">

     <a href="#" class="delete" data-id="${expense.id}">
      <i>удалить</i>
     </a>
    </div>
   </div`;
   this.expenseList.appendChild(div);
  }

  // сумма затрат 
  totalExpense(){
    let total = 0;
    if(this.itemList.length > 0){
      total = this.itemList.reduce(function(acc, curr){
        acc += curr.amount;
        return acc;
      }, 0)
    } 
    this.expenseAmount.textContent = total;
    return total;
  }

  // удалить расходы 
  deleteExpense(element){
    let id = parseInt(element.dataset.id);
    let parent = element.parentElement.parentElement.parentElement;

    this.expenseList.removeChild(parent);

    let tempList = this.itemList.filter(function(item){
      return item.id !== id;
    })
    this.itemList = tempList;
    this.showBalance();
  }
}

function eventListeners(){
  const budgetForm = document.getElementById('budget-form');
  const expenseForm = document.getElementById('expense-form');
  const expenseList = document.getElementById('expense-list');

  
  const ui = new UI();
  
  // бюджет
  budgetForm.addEventListener('submit', function(event){
    event.preventDefault();
    ui.submitBudgetForm();
  })
  // затраты
  expenseForm.addEventListener('submit', function(event){
    event.preventDefault();
    ui.submitExpenseForm();

  })
  // удаление
  expenseList.addEventListener('click', function(event){
    if (event.target.parentElement.classList.contains('delete')){
      ui.deleteExpense(event.target.parentElement);
    }
  })
}

document.addEventListener('DOMContentLoaded', function(){
  eventListeners();
})