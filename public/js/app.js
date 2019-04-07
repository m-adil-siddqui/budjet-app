class UI{
    constructor () {
        this.budgetFeedback = document.querySelector(".budget-feedback");
        this.expenseFeedback = document.querySelector(".expensefeedback");
        this.budgetForm = document.getElementById("budget-form");
        this.budgetInput = document.getElementById("budget-input");
        this.budgetAmount = document.getElementById("budget-amount");
        this.balance = document.getElementById("balance");
        this.expenseInput = document.getElementById("expense-input");
        this.amountInput = document.getElementById("amount-input"); 
        this.expenseTitle = document.getElementById("title");
        this.expnseAmount = document.getElementById("budget-expense");
        this.expenseAction =  document.getElementById("action");
        this.expenselist = document.querySelector(".expense-list");
        this.itemList = [];
        this.itemID = 0;
    }

    //submit Budget Form
    submitBudgetForm () {
        const value = this.budgetInput.value;
        if (value === '' || value < 0) {
           this.budgetFeedback.classList.add("showItem");
           this.budgetFeedback.innerHTML = `<p>value cannot be empty or negative</p>`;
        
            setTimeout(() => {
            this.budgetFeedback.classList.remove('showItem');
            },4000);
        }
        else {
            this.budgetAmount.textContent = value;
            this.budgetInput.value = '';
            this.showBalance();
        }
    }

    showBalance () {
       const expense =  this.totalExpense();
       const total = parseInt(this.budgetAmount.textContent) - expense;
       this.balance.textContent = total;

       if (total < 0) {
           this.balance.classList.add("showRed");
       }
       else if(total > 0) {
           this.balance.classList.remove("showRed");
           this.balance.classList.add("showGreen");
       }

    }


    //submit expense Form
    submitExpenseForm () {
       const expenseVal = this.expenseInput.value;
       const amount = this.amountInput.value;
    
       if(expenseVal === '' || amount === '' || amount < 0) {
           this.expenseFeedback.classList.add("showItem");
           this.expenseFeedback.innerHTML = `<p>value cannot be empty or negative</p>`;
            //const self = this;

           setTimeout(() => {
               this.expenseFeedback.classList.remove("showItem");
           },4000);
       }
       else{
           const amountVal = parseInt(amount);
           this.amountInput.value = "";
           this.expenseInput.value = "";

           var expense = {
               id:this.itemID,
               title:expenseVal,
               amount:amount
           }

           this.itemID++;
           this.itemList.push(expense);
           this.addExpense(expense);
           this.showBalance();
           
       }
    }

    addExpense(expense) {
        let span = document.createElement("span");
        span.innerHTML = `<div class="row" style="display:flex">
           <div class="col-4"><p id="title" class="ex-content">${expense.title}</p></div>

            <div class="col-4"><p id="amount" class="ex-content">${expense.amount}</p></div>
            
            <div class="col-4"><p id="action"><a href="#" data-id="${expense.id}" class="edit-icon"><i class="fa fa-edit"></i></a> 
            <a href="#" data-id="${expense.id}" class="delete-icon">
            <i class="fa fa-trash"></i></a></p>
            </div>
            
            </div>`;
        this.expenselist.appendChild(span);
 
         
    }

    //total expense
    totalExpense () {
        let total = 0 ;
        if(this.itemList.length > 0) {
            total = this.itemList.reduce(function(pos,curr) {
              pos += parseInt(curr.amount);
              return pos;
            },0);
           
        }
        this.expnseAmount.textContent = total;
        return total;
    }

    //edit expense
    editExpense(element) {
        let id = parseInt(element.dataset.id);
        let parent = element.parentElement.parentElement.parentElement.parentElement;
      
        this.expenselist.removeChild(parent);
    
        let expense = this.itemList.filter((item) => {
           return item.id === id;
        })
        
        //show value
        this.expenseInput.value = expense[0].title;
        this.amountInput.value = expense[0].amount;

        let temList = this.itemList.filter((item) => {
            return item.id !== id;
        })
         
        this.itemList = temList;
        this.showBalance();
    }

    //delete Expense

    deleteExpense(element) {
        let id = parseInt(element.dataset.id);
        let parent = element.parentElement.parentElement.parentElement.parentElement;
         
        console.log(parent);

        this.expenselist.removeChild(parent);

        let expense = this.itemList.filter((item) => {
            return item.id === id;
        });

        let itemList = this.itemList.filter((item) => {
            return item.id !== id;
        })

        this.itemList = itemList;
        this.showBalance();
    }

}/*  /class */


function eventListeners () {
    const budgetForm = document.getElementById("budget-form");
    const expenseForm = document.getElementById("expense-form");
    const expenseList = document.getElementById("expense-list-data");

    //new instance of UI class
    const ui = new UI();
    //ui.totalExpense();

    //budget form submit
    budgetForm.addEventListener('submit', (event) => {
        event.preventDefault();
        ui.submitBudgetForm();
    });

    //expense form submit
    expenseForm.addEventListener('submit', (event) => {
        event.preventDefault();
        ui.submitExpenseForm();
       
    });

    //expnse list
     expenseList.addEventListener('click', (event) => {
      //console.log(event.target.parentElement.classList.contains('edit-icon')); == true

      if(event.target.parentElement.classList.contains('edit-icon')) {
        ui.editExpense(event.target.parentElement);
      }
      else if(event.target.parentElement.classList.contains('delete-icon')) {
        ui.deleteExpense(event.target.parentElement);
        console.log(event.target.parentElement);
      }
     })

}

document.addEventListener('DOMContentLoaded', () => {
  eventListeners();
   
});


