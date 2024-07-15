let todoItemsContainer=document.getElementById("taskcontainer");
let addBtn=document.getElementById("addBtn");

function gettodoListfromLocalStorage(){
    let stringifiedTodoList=localStorage.getItem("todoList");
    let parsedTodo=JSON.parse(stringifiedTodoList);
    if(parsedTodo===null){
        return [];
    }
    else{
        return parsedTodo;
    }
}

let todoList=gettodoListfromLocalStorage();
let count=todoList.length;

function saveButton(){
    localStorage.setItem("todoList", JSON.stringify(todoList));
};



function AddButton(){
    let userInputTask=document.getElementById("userInputTask");
    let userEnteredTask=userInputTask.value;
    if(userEnteredTask===""){
        alert("Please enter valid Task..");
        return;
    }
    count=count+1;
    console.log("count");
    console.log(count);
    let newTodo={
        text:userEnteredTask,
        uniqueNo:count,
        isChecked:false
    };
    todoList.push(newTodo);
    createAndAppendTodo(newTodo);
    userInputTask.value="";
};
function onTodoStatusChange(checkboxId, labelId,todoId){
    let checkboxElement=document.getElementById(checkboxId);
    let labelElement=document.getElementById(labelId);
    labelElement.classList.toggle("checked");

    let StatusEleIndex=todoList.findIndex(function(eachItem){
        let todoItem="todo"+eachItem.uniqueNo;
        if(todoItem===todoId){
            return true;
        }
        else{
            return false;
        }
    });
    console.log(StatusEleIndex);
    let todoObject=todoList[StatusEleIndex];
    if(todoObject.isChecked===true){
        todoObject.isChecked=false;
    }
    else{
        todoObject.isChecked=true;
    }
};

function onDeleteTodo(todoId){
    let todoEle=document.getElementById(todoId);
    todoItemsContainer.removeChild(todoEle);

    let deleteEleIndex=todoList.findIndex(function(eachItem){
        let todoItem="todo"+eachItem.uniqueNo;
        console.log(todoItem);
        console.log(todoId);
        if(todoItem===todoId){
            return true;
        }
        else{
            return false;
        }
    });
    console.log(deleteEleIndex);
    todoList.splice(deleteEleIndex,1);

};
function createAndAppendTodo(todo) {
    let todoId = "todo" + todo.uniqueNo;
    console.log(todoId);
    let checkboxId = "checkbox" + todo.uniqueNo;
    let labelId = "label" + todo.uniqueNo;
  
    let todoElement = document.createElement("li");
    todoElement.classList.add("todo-item-container", "d-flex", "flex-row");
    todoElement.id = todoId;
    todoItemsContainer.appendChild(todoElement);
  
    let inputElement = document.createElement("input");
    inputElement.type = "checkbox";
    inputElement.id = checkboxId;
    inputElement.checked=todo.isChecked;

    inputElement.onclick = function() {
      onTodoStatusChange(checkboxId, labelId,todoId);
    };
  
    inputElement.classList.add("checkbox-input");
    todoElement.appendChild(inputElement);
  
    let labelContainer = document.createElement("div");
    labelContainer.classList.add("label-container", "d-flex", "flex-row");
    todoElement.appendChild(labelContainer);
  
    let labelElement = document.createElement("label");
    labelElement.setAttribute("for", checkboxId);
    labelElement.id = labelId;
    labelElement.classList.add("checkbox-label");
    labelElement.textContent = todo.text;
    if(todo.isChecked===true){
        labelElement.classList.add("checked");
    }
    labelContainer.appendChild(labelElement);
  
    let deleteIconContainer = document.createElement("div");
    deleteIconContainer.classList.add("delete-icon-container");
    labelContainer.appendChild(deleteIconContainer);
  
    let deleteIcon = document.createElement("i");
    deleteIcon.classList.add("far", "fa-trash-alt", "delete-icon");
  
    deleteIcon.onclick = function () {
      onDeleteTodo(todoId);
    };
  
    deleteIconContainer.appendChild(deleteIcon);
  }
  
  for (let todo of todoList) {
    createAndAppendTodo(todo);
  }