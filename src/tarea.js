export default class Tarea{
    
    constructor(titulo, fechaTermino = 'Sin fecha', prioridad = 'Baja')
    {
        this._titulo = titulo;
        this._fechaTermino = fechaTermino;
        this._prioridad = prioridad;
    }

    setTitulo(nombreTarea)
    {
        this._titulo = nombreTarea;
    }

    setFechaTermino(fecha)
    {
        this._fechaTermino = fecha;
    }

    setPrioridad(nivel)
    {
        this._prioridad = nivel;
    }

    getTitulo(){
        return this._titulo;
    }

    getFecha(){
        return this._fechaTermino;
    }

    getPrioridad(){
        return this._prioridad;
    }

    getFechaFormato() {
        const dia = this._fechaTermino.split('/')[0];
        const mes = this._fechaTermino.split('/')[1];
        const anio = this._fechaTermino.split('/')[2];
        return `${dia}/${mes}/${anio}`;
      }
}