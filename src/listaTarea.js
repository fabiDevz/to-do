import Tarea from "./tarea";

export default class ListaTarea{
    constructor()
    {
        this._tareas = [];
    }


    getListaTareas()
    {
        return this._tareas;
    }

    setListaTarea(tarea)
    {   
        this._tareas.push(tarea);
    }

    setListaTareas(lista)
    {
        this._tareas = lista;
    }
}