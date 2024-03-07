export default class Proyecto{
    constructor(nombre,descripcion,tareas = [])
    {
        this._nombre = nombre;
        this._descripcion = descripcion;
        this._lista = tareas;
    }


    getNombreProyecto()
    {
        return this._nombre;
    }

    getDescripcionProyecto()
    {
        return this._descripcion;
    }

    setDescripcionProyecto(descripcion)
    {
        this._descripcion = descripcion;
    }

    setNombreProyecto(nombre)
    {   
        this._nombre = nombre;
    }

    getListaTareas() {
        return this._listaTareas;
    }
    
    agregarTarea(tarea) {
        this._listaTareas.push(tarea);
    }
}