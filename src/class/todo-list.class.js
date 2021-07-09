import { Todo } from "./todo.class";

export class TodoList{
    constructor (){
        this.recuperarLocalStorage();
    }
    nuevoTodo(todo){
        this.todos.push(todo);
        this.guardarLocalStorage();
    }
    eliminarTodo(id){
        this.todos = this.todos.filter(todo=>todo.id!=id);
        this.guardarLocalStorage();
    }
    marcarCompletado(id){
        this.todos.forEach(todo=>{
            if(todo.id == id){
                todo.completed =!todo.completed ;
                this.guardarLocalStorage();
            }
        })
    }
    eliminarTodosCompletados(){
        this.todos = this.todos.filter(todo=> !todo.completed);
        this.guardarLocalStorage();
        // console.log(this.todos);
    }
    guardarLocalStorage(){
        localStorage.setItem('todo', JSON.stringify(this.todos));
    }
    recuperarLocalStorage(){
        this.todos = (localStorage.getItem('todo')) ? JSON.parse(localStorage.getItem('todo')) : [];

        this.todos = this.todos.map(Todo.fromJson);
    }
}