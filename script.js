// Select element
const form = document.getElementById('todoform')
const todoInput = document.getElementById('newtodo')
const todosListEl = document.getElementById('todos-list');
// Vars
let todos = [];
let EditTodoId= -1;

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
    if(EditTodoId >= 0){
        // update the todo
        todos = todos.map((todo, index) => ({
            
                ...todo,
                value: index === EditTodoId ? todoValue : todo.value,

            
        }));
        EditTodoId = -1
    }
    else{
        todos.push({
            value: todoValue,
            checked: false,
            color:'#' + Math.floor(Math.random()* 16777215).toString(16)
        }
    );
    }
   

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
            data-action="check"
        ></i> 
        <p class=""  data-action="check">${todo.value}</p>
        <i class="bi bi-pencil-square" data-action="edit"></i>
        <i class="bi bi-trash" data-action="delete"></i>

      </div>
        `
    })

}

//Click event listener for all clciks on todo

todosListEl.addEventListener('click', (event)=>{
    const target = event.target;
    const parentElement = target.parentNode;
    if (parentElement.className !== 'todo') return;

    // Todo Id
    const todo = parentElement;
    const todoId = Number(todo.id);

    // target action
    const action = target.dataset.action;

    action === "check" && checkTodo(todoId);
    action === "edit" && editTodo(todoId);
   // action === "delete" && deleteTodo(todoId);
    
    
});

//check A todo
function checkTodo(todoId){
   todos = todos.map((todo, index)=> ({
            ...todo,
            checked: index === todoId ? !todo.checked : todo.checked
        }));


        renderTodos();

   
}
//edit a todo
function editTodo(todoId){
    todoInput.value =todos[todoId].value;
    EditTodoId = todoId;

}


