import ListaTarea from "./listaTarea";
import Tarea from "./tarea";
import { format } from 'date-fns';

let listaTotal = new ListaTarea('Todo');

let aux = new Tarea('Hacer los deberes del hogar', 'Sin Fecha', 'Alta');
listaTotal.setListaTarea(aux);

let listaHoy = new ListaTarea('Hoy');
let listaSemanal = new ListaTarea('Semanal');
let listaPrioridad = new ListaTarea('Prioritario');

function header() {
    const header = document.getElementById('header');
    const titulo = document.createElement('h1');


    titulo.textContent = 'J To-Do';

    header.appendChild(titulo);

}
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

    mostrarTareas();
    btnAgregarTarea();
    setEventosMain();

}



function setEventosMain() {
    const btnMain = document.querySelector('.btn-main');
    const btnAceptar = document.querySelector('.btn-aceptar');
    const btnCancelar = document.querySelector('.btn-cancelar');

    if (btnMain) {
        btnMain.addEventListener('click', () => {
            construirFormularioMain();
        });
    }
    if (btnAceptar) {
        btnAceptar.addEventListener('click', () => {
            if (agregarTarea()) {
                mostrarTareas();
                limpiarFormulario();
            }

        });
    }
    if (btnCancelar) {
        btnCancelar.addEventListener('click', () => {
            mostrarTareas();
            limpiarFormulario();
        });
    }


}


function btnAgregarTarea() {
    const mainBtnArea = document.getElementById('main-btn-area');
    const btnMain = crearButton('Agregar tarea', "<span class='material-symbols-outlined'>add_circle</span>");
    btnMain.classList.add('btn-main');

    mainBtnArea.appendChild(btnMain);
}

function construirFormularioMain() {
    const mainFormArea = document.getElementById('main-form-area');
    if (mainFormArea.childElementCount === 0) {
        //elementos div del formulario
        const formularioTarea = document.createElement('div');
        const formBtnArea = document.createElement('div');
        const formInputArea = document.createElement('div');

        //Form : input nombre
        const labelNombre = document.createElement('label');
        const inputNombre = document.createElement('input');
        labelNombre.textContent = 'Tarea';
        inputNombre.id = 'input-nombre';

        //Form: inputFecha
        const fechaHoy = format(new Date(), 'yyyy-MM-dd');
        const labelFecha = document.createElement('label');
        const inputFecha = document.createElement('input');
        labelFecha.textContent = 'Fecha de finalización';
        inputFecha.id = 'input-fecha';
        inputFecha.type = 'date';
        inputFecha.value = fechaHoy;

        //Form: inputPrioridad
        const labelPrioridad = document.createElement('label');
        const inputPrioridad = document.createElement('select');
        inputPrioridad.id = 'input-prioridad';
        labelPrioridad.textContent = 'Nivel de prioridad';

        const opcionAlta = document.createElement('option');
        opcionAlta.value = 'Alta';
        opcionAlta.textContent = 'Alta';

        const opcionMedia = document.createElement('option');
        opcionMedia.value = 'Media';
        opcionMedia.textContent = 'Media';

        const opcionBaja = document.createElement('option');
        opcionBaja.value = 'Baja';
        opcionBaja.textContent = 'Baja';

        inputPrioridad.appendChild(opcionAlta);
        inputPrioridad.appendChild(opcionMedia);
        inputPrioridad.appendChild(opcionBaja);

        //opcion por defecto
        opcionBaja.selected = true;

        //Form: botones 'Agregar''Cancelar'
        const btnAceptar = document.createElement('button');
        const btnCancelar = document.createElement('button');
        btnAceptar.textContent = 'Agregar';
        btnCancelar.textContent = 'Cancelar';

        btnAceptar.classList.add('btn-aceptar');
        btnCancelar.classList.add('btn-cancelar');

        //Clases para estilos Css
        formularioTarea.classList.add('main-form-tarea');
        formBtnArea.classList.add('main-form-btnArea');
        formInputArea.classList.add('main-form-InputArea');

        //Juntamos todo
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


        formularioTarea.appendChild(formInputArea);
        formularioTarea.appendChild(formBtnArea);

        mainFormArea.appendChild(formularioTarea);

        setEventosMain();
    }
}

function agregarTarea() {
    const inputNombre = document.getElementById('input-nombre');
    const inputFecha = document.getElementById('input-fecha');
    const inputPrioridad = document.getElementById('input-prioridad');

    let nombre = inputNombre.value;
    let fecha = inputFecha.value;
    let prioridad = inputPrioridad.value;

    if (listaTotal.getListaTareas().find(task => task.getTitulo() === nombre)) {
        alert('Ya existe esa tarea.');
        return false
    }
    //verificamos si existe una fecha
    fecha = fecha.trim() === '' ? 'Sin fecha' : fecha;
    //creamos el objeto tarea y agregamos a la lista
    let tarea = new Tarea(nombre, fecha, prioridad);
    listaTotal.setListaTarea(tarea);
    console.log(listaTotal.getListaTareas());
    return true;
}

function mostrarTareas() {

    limpiarListaTareas();
    listaTotal.getListaTareas().forEach((task) => {

        const mainLista = document.getElementById('main-lista-tareas');
        const tareaDiv = document.createElement('div');
        const tareaText = document.createElement('span');
        const tareaDate = document.createElement('span');
        const tareaPriority = document.createElement('span');

        tareaText.textContent = task.getTitulo();
        tareaDate.textContent = task.getFecha();
        tareaPriority.textContent = task.getPrioridad();

        tareaDiv.classList.add('tarea-container');

        tareaDiv.appendChild(tareaText);
        tareaDiv.appendChild(tareaDate);
        tareaDiv.appendChild(tareaPriority);

        const btnEdit = crearButton('', "<span class='material-symbols-outlined'>edit</span>");
        btnEdit.onclick = () => editarTarea(task.getTitulo());
        btnEdit.classList.add('btn-editar-tarea');
        tareaDiv.appendChild(btnEdit);

        const btnDelete = crearButton('', "<span class='material-symbols-outlined'>delete</span>");
        btnDelete.onclick = () => eliminarTarea(task.getTitulo());
        btnDelete.classList.add('btn-eliminar-tarea');
        tareaDiv.appendChild(btnDelete);

        mainLista.appendChild(tareaDiv);
    });

    // btnTarea();
}

function limpiarListaTareas() {
    const main = document.getElementById('main-lista-tareas');

    while (main.firstChild) {
        main.removeChild(main.firstChild);
    }

}

function limpiarFormulario() {
    const form = document.getElementById('main-form-area');

    while (form.firstChild) {
        form.removeChild(form.firstChild);
    }
}

function eliminarTarea(titulo) {
    listaTotal.setListaTareas(listaTotal.getListaTareas().filter(task => task.getTitulo() !== titulo));
    mostrarTareas();
}

function editarTarea(nombre) {
    const form = document.querySelector('.main-form-tarea');


    let tarea = listaTotal.getListaTareas().find(item => item.getTitulo() === nombre);
    console.log('tarea : ' + nombre);

    if(!form)
    {
        construirFormularioMain();
    }

    //capturamos los inputs existentes del formulario
    const inputNombre = document.getElementById('input-nombre');
    const inputFecha = document.getElementById('input-fecha');
    const inputPrioridad = document.getElementById('input-prioridad');
    construirFormularioMain();
    //asignamos a los input los datos de la tarea a editar
    inputNombre.value = tarea.getTitulo();
    inputPrioridad.value = tarea.getPrioridad();
    //para el input fecha verificamos si viene sin fecha
    // de ser asi se le asigna la de hoy
    const formatoFecha = /^\d{4}-\d{2}-\d{2}$/;
    if (!formatoFecha.test(tarea.getFecha())) {
        const fechaHoy = format(new Date(), 'yyyy-MM-dd');
        inputFecha.value = fechaHoy;
    } else {
        inputFecha.value = tarea.getFecha();
    }
   
    //falta agregar la edicion de la tarea

        


        

     
        

    
}

function loadPage() {
    header();
    sideBar();
    main();
}

export default loadPage;