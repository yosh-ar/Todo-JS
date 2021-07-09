export class Todo {
    static fromJson({id, tarea, completed, fecha}){
        let temporalTodo = new Todo(tarea);
        temporalTodo.id = id;
        temporalTodo.completed = completed;
        temporalTodo.fecha = fecha;

        return temporalTodo;
    }
    constructor(tarea){
        this.tarea = tarea;
        this.id = new Date().getTime();
        this.completed = false;
        this.fecha = new Date();
    }
}