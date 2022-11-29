// Select element
const form = document.getElementById('todoform')
const todoInput = document.getElementById('newtodo')
const todosListEl = document.getElementById('todos-list');
// Vars
let todos = [];

//form submit
form.addEventListener('submit', function (event) {
    event.preventDefault();

    saveTodo();
    renderTodos();
})

// save todo function
function saveTodo(){
    const todoValue = todoInput.value
    
// check if todo is empty
const isEmpty = todoValue === '';

// check for repitition of todo
const isDuplicate = todos.some((todo)=> todo.value.toUpperCase() === todoValue.toUpperCase());
   

if (isEmpty){
    alert("Todo's input is empty");
}
else if(isDuplicate){
    alert("Todo already exist");

}else{
   
    todos.push({
        value: todoValue,
        checked: false,
        color:'#' + Math.floor(Math.random()* 16777215).toString(16)
    }
);
    todoInput.value = '';

  

}


    

}

//function render Todos
function renderTodos(){
//clear element before re-render
todosListEl.innerHTML = "";

//render Todos
    todos.forEach((todo, index)=>{
        todosListEl.innerHTML += `
        <div class="todo" id=${index}>
        <i 
            class="bi ${todo.checked ? 'bi-check-circle-fill' : 'bi-circle'}"
            style="color : ${todo.color}"
        ></i> 
        <p class="" >${todo.value}</p>
        <i class="bi bi-pencil-square"></i>
        <i class="bi bi-trash"></i>

      </div>
        `
    })
}

