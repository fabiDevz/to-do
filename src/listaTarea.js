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

    agregarListaTareas(lista)
    {
        this._tareas = lista;
    }
    
    editListaTareas(indiceTareaEditar, tareaNueva)
    {
       return this._tareas.splice(indiceTareaEditar, 1, tareaNueva);
    }
}