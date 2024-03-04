export default class Proyecto{
    constructor(nombre,tareas = [])
    {
        this._nombre = nombre;
        this._lista = tareas;
    }


    getNombreProyecto()
    {
        return this._nombre;
    }

    setNombreProyecto(nombre)
    {   
        this._nombre = nombre;
    }

    getListaProyecto()
    {
        return this._lista;
    }
    
    setTaskListaProyecto(task)
    {
        this._lista.push(task);
    }
}