import ListaTarea from "./listaTarea";
import Tarea from "./tarea";

function sideBar() {
    const sideBar = document.getElementById('side-bar');
    // creacion de elementos 
    const bandejaSideBar = document.createElement('h2');
    const proyectoSideBar = document.createElement('h2');

    const elementosBandeja = [
        { titulo: 'Principal', icon: "<span class='material-symbols-outlined'>task</span>" },
        { titulo: 'Hoy', icon: "<span class='material-symbols-outlined'>today</span>" },
        { titulo: 'Semanal', icon: "<span class='material-symbols-outlined'>date_range </span>" },
        { titulo: 'Importancia', icon: "<span class='material-symbols-outlined'>priority_high</span>" }];

    //texto a elementos 
    bandejaSideBar.textContent = 'Bandeja';
    proyectoSideBar.textContent = 'Proyectos';

    sideBar.appendChild(bandejaSideBar);
    //ciclo para construir botones del sidebar
    elementosBandeja.forEach((item) => {
        const btnAux = crearButton(item.titulo, item.icon);
        btnAux.classList.add('btn-side-bar');
        sideBar.appendChild(btnAux);
    });

    sideBar.appendChild(proyectoSideBar);
    const button = crearButton('Agregar proyecto', "<span class='material-symbols-outlined'>add_circle</span>");
    button.classList.add('btn-add-project');
    sideBar.appendChild(button);

}
function crearButton(texto, icono) {
    const button = document.createElement('button');
    const iconoSpan = document.createElement('span');
    const textSpan = document.createElement('span');
    iconoSpan.innerHTML = icono;
    textSpan.innerHTML = texto;
    button.appendChild(iconoSpan);
    button.appendChild(textSpan);

    return button
}

function main() {
    const main = document.getElementById('main-content');
    const listaDiv = document.getElementById('main-lista-tareas');

    const btnMain = crearButton('Agregar tarea', "<span class='material-symbols-outlined'>add_circle</span>");
    btnMain.classList.add('btn-main');

    btnMain.addEventListener('click', () => {
        formularioTarea()
    });

    main.appendChild(listaDiv);
    main.appendChild(btnMain);
}

function header() {
    const header = document.getElementById('header');
    const titulo = document.createElement('h1');


    titulo.textContent = 'J To-Do';

    header.appendChild(titulo);

}

function inicializarListaTareas() {
    let listaFull = new ListaTarea('Todo');
    let listaHoy = new ListaTarea('Hoy');
    let listaSemanal = new ListaTarea('Semanal');
    let listaPrioridad = new ListaTarea('Prioritario');

    console.log(listaHoy.getTitulo() + '-- :' + listaHoy.getListaTareas());
}

function formularioTarea() {
    const mainListaTareas = document.getElementById('main-lista-tareas');
    const formularioTarea = document.createElement('div');
    const formBtnArea = document.createElement('div');
    const formInputArea = document.createElement('div');

    formularioTarea.classList.add('main-form-tarea');
    formBtnArea.classList.add('main-form-btnArea');
    formInputArea.classList.add('main-form-InputArea');

    // elementos del formulario

    const labelNombre = document.createElement('label');
    const labelFecha = document.createElement('label');
    const labelPrioridad = document.createElement('label');
    const btnAceptar = document.createElement('button');
    const btnCancelar = document.createElement('button');

    const inputNombre = document.createElement('input');
    const inputFecha = document.createElement('input');
    const inputPrioridad = document.createElement('select');

    const opcionAlta = document.createElement('option');
    opcionAlta.value = 'Alta';
    opcionAlta.textContent = 'Alta';

    const opcionMedia = document.createElement('option');
    opcionMedia.value = 'Media';
    opcionMedia.textContent = 'Media';

    const opcionBaja = document.createElement('option');
    opcionBaja.value = 'Baja';
    opcionBaja.textContent = 'Baja';

    // Establecer la opción por defecto
    opcionBaja.selected = true;

    // Agregar las opciones al elemento select
    inputPrioridad.appendChild(opcionAlta);
    inputPrioridad.appendChild(opcionMedia);
    inputPrioridad.appendChild(opcionBaja);

    inputNombre.id = 'input-nombre';
    inputFecha.id = 'input-fecha';
    inputFecha.type = 'date';
    inputPrioridad.id = 'input-prioridad';

    labelNombre.textContent = 'Tarea';
    labelFecha.textContent = 'Fecha de finalización';
    labelPrioridad.textContent = 'Nivel de prioridad';
    btnAceptar.textContent = 'Agregar';
    btnCancelar.textContent = 'Cancelar';

    btnAceptar.classList.add('btn-aceptar');
    btnCancelar.classList.add('btn-cancelar');

    btnAceptar.addEventListener('click', () => {
        validarForm();

    });

    formBtnArea.appendChild(btnAceptar);
    formBtnArea.appendChild(btnCancelar);

    formInputArea.appendChild(labelNombre);
    formInputArea.appendChild(labelFecha);
    formInputArea.appendChild(labelPrioridad);
    formInputArea.appendChild(inputNombre);
    formInputArea.appendChild(inputFecha);
    formInputArea.appendChild(inputPrioridad);

    formularioTarea.appendChild(formInputArea);
    formularioTarea.appendChild(formBtnArea);



    mainListaTareas.appendChild(formularioTarea);

}

function validarForm() {
    const nombre = document.getElementById('input-nombre');
    const fecha = document.getElementById('input-fecha');
    const prioridad = document.getElementById('input-prioridad');

    console.log(nombre.value);
    console.log(fecha.value);
    console.log(prioridad.value);
}

function loadPage() {

    inicializarListaTareas();

    header();
    sideBar();
    main();



}

export default loadPage;