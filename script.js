// Select element
const form = document.getElementById('todoform')
const todoInput = document.getElementById('newtodo')
const todosListEl = document.getElementById('todos-list');
const notificationEl = document.querySelector('.notification');
// Vars
let todos = JSON.parse(localStorage.getItem('todos')) || [];
let EditTodoId= -1;

//1st render
renderTodos();

//form submit
form.addEventListener('submit', function (event) {
    event.preventDefault();

    saveTodo();
    renderTodos();
    localStorage.setItem('todos', JSON.stringify(todos))
})

// save todo function
function saveTodo(){
    const todoValue = todoInput.value
    
// check if todo is empty
const isEmpty = todoValue === '';

// check for repitition of todo
const isDuplicate = todos.some((todo)=> todo.value.toUpperCase() === todoValue.toUpperCase());
   

if (isEmpty){
    showNotification("Todo's input is empty");
}
else if(isDuplicate){
    showNotification("Todo already exist");

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
 if(todos.length === 0){
    todosListEl.innerHTML = '<center> Nothing to do ! </center>'
    return; 
 }
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
        <p class="${todo.checked ? 'checked' : ''}"  data-action="check">${todo.value}</p>
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
    action === "delete" && deleteTodo(todoId);
    
    
});

//check A todo
function checkTodo(todoId){
   todos = todos.map((todo, index)=> ({
            ...todo,
            checked: index === todoId ? !todo.checked : todo.checked
        }));


        renderTodos();
        localStorage.setItem('todos', JSON.stringify(todos));

   
}
//edit a todo
function editTodo(todoId){
    todoInput.value =todos[todoId].value;
    EditTodoId = todoId;

}

// Delete a todo
function deleteTodo(todoId){
  todos =  todos.filter((todo, index) => index!==todoId);
  EditTodoId = -1;

  //re-render todos
  renderTodos();
  localStorage.setItem('todos', JSON.stringify(todos))
}
// show a nitification
function showNotification(msg){
    notificationEl.innerHTML = msg;

    notificationEl.classList.add('notif-enter');

    setTimeout(() => {
        notificationEl.classList.remove('notif-enter')

    }, 2000)

}

