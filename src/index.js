import './styles.css'

import { Todo, TodoList } from './class'
import { crearTodoHtml } from './js/components';

export const TodoL = new TodoList();

TodoL.todos.forEach(crearTodoHtml);
