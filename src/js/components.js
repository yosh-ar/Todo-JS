import { Todo } from "../class";
import { TodoL } from "../index";

// 
const ulTodo = document.querySelector('.todo-list');
const new_todo = document.querySelector('.new-todo');
const btnBorrar = document.querySelector('.clear-completed');
const ulFilters = document.querySelector('.filters');
const liFiltros = document.querySelectorAll('.filtro');


export const crearTodoHtml = ({tarea, id, completed})=>{
    const htmlTodo = `<li class="${(completed == true)?'completed' : ''}" data-id="${id}">
                        <div class="view">
                            <input class="toggle" type="checkbox" ${(completed == true)? 'checked' : ''}>
                            <label>${tarea}</label>
                            <button class="destroy"></button>
                        </div>
                        <input class="edit" value="Create a TodoMVC template">
                    </li>`;

    const div = document.createElement('div');
    div.innerHTML = htmlTodo;
    ulTodo.append(div.firstElementChild)
    return div.firstElementChild;
}

// eventos
new_todo.addEventListener('keyup', (event)=>{
    if(event.keyCode ===13 && event.target.value.length){
        const valor = event.target.value;
        const tarea = new Todo(valor);
        TodoL.nuevoTodo(tarea);
        event.target.value = '';
        crearTodoHtml(tarea)
    }
});

ulTodo.addEventListener('click',(event)=>{
    const nombreElemento = event.target.localName;
    const li = event.target.parentElement.parentElement;
    const id = li.getAttribute('data-id');
    if(nombreElemento.includes('input')){
        TodoL.marcarCompletado(id);
        li.classList.toggle('completed')

    }else if(nombreElemento.includes('button')){
        TodoL.eliminarTodo(id);
        ulTodo.removeChild(li);
        console.log(TodoL.todos);
    }
});
btnBorrar.addEventListener('click', (event)=>{
    TodoL.eliminarTodosCompletados();
    for(let i = ulTodo.children.length-1; i>=0; i--){
        let elemento = ulTodo.children[i];
        if(elemento.classList.contains('completed')){
            ulTodo.removeChild(elemento);
        }
    }
}); 
// filtros

ulFilters.addEventListener('click', (event)=>{
    const filtro = event.target.text;
    if(!filtro) return;
    liFiltros.forEach(element => element.classList.remove('selected'));
    event.target.classList.add('selected');
    // event.target.classList.add('selected');
    for(const elemento of ulTodo.children){
        elemento.classList.remove('hidden');
        const completado = elemento.classList.contains('completed');

        switch(filtro){
            case 'Pendientes':
                if(completado){
                    elemento.classList.add('hidden');
                }
                break;
            case 'Completados':
                if(!completado){
                    elemento.classList.add('hidden');
                }
                break;
        }
    }
});