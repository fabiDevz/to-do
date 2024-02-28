export default class ListaTarea{
    constructor(titulo, tareas = [])
    {
        this._titulo = titulo;
        this._tareas = tareas;
    }

    getTitulo()
    {
        return this._titulo;
    }

    getListaTareas()
    {
        return this._tareas;
    }

    setTitulo(nombre){
        this._titulo = nombre;
    }

    setListaTarea(tarea)
    {   
        this._tareas.push(tarea);
    }
}