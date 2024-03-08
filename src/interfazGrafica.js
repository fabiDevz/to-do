import ListaTarea from "./listaTarea";
import Tarea from "./tarea";
import Proyecto from "./proyecto";
import { format, startOfWeek, endOfWeek, isWithinInterval } from 'date-fns';

let listaTotal = new ListaTarea();
let editar = false;
let aux = new Tarea('Hacer los deberes del hogar', 'Sin Fecha', 'Alta');
listaTotal.setListaTarea(aux);
let listaProyectos = [];


function header() {
    const header = document.getElementById('header');
    const titulo = document.createElement('h1');


    titulo.textContent = 'J To-Do';

    header.appendChild(titulo);

}
function sideBar() {
    const sideBarUp = document.createElement('div');
    sideBarUp.classList.add('side-bar-up');

    const sideBarDown = document.createElement('div');
    sideBarDown.classList.add('side-bar-down');

    const sideBar = document.getElementById('side-bar');
    // creacion de elementos 
    const bandejaSideBar = document.createElement('h2');
    const proyectoSideBar = document.createElement('h2');

    const elementosBandeja = [
        { titulo: 'Bandeja', icon: "<span class='material-symbols-outlined'>task</span>" },
        { titulo: 'Hoy', icon: "<span class='material-symbols-outlined'>today</span>" },
        { titulo: 'Semanal', icon: "<span class='material-symbols-outlined'>date_range </span>" }];

    //texto a elementos 
    bandejaSideBar.textContent = 'Principal';
    proyectoSideBar.textContent = 'Proyectos';

    sideBarUp.appendChild(bandejaSideBar);
    //ciclo para construir botones del sidebar
    elementosBandeja.forEach((item) => {
        const btnAux = crearButton(item.titulo, item.icon);
        btnAux.classList.add('btn-side-bar');
        if (item.titulo === 'Bandeja') {
            btnAux.classList.add('btn-side-bar-active');
        }
        btnAux.id = 'btn' + item.titulo;
        sideBarUp.appendChild(btnAux);
    });
    sideBar.appendChild(sideBarUp);

    sideBarDown.appendChild(proyectoSideBar);
    const button = crearButton('Agregar proyecto', "<span class='material-symbols-outlined'>add_circle</span>");
    button.classList.add('btn-add-project');

    button.onclick = () => crearFormularioProyecto();


    sideBarDown.appendChild(button);
    sideBar.appendChild(sideBarDown);
    setEventosSideBar();

}

function crearFormularioProyecto() {
    limpiarMain();
    resetearActive();
    const formulario = document.createElement('div');
    const labelNombre = document.createElement('label');
    const inputNombre = document.createElement('input');
    const labelDescripcion = document.createElement('label');
    const inputDescripcion = document.createElement('input');
    const botonesArea = document.createElement('div');
    const botonAceptar = document.createElement('button');
    const botonCancelar = document.createElement('button');

    labelNombre.textContent = 'Nombre:';
    labelDescripcion.textContent = 'Descripción:';

    formulario.classList.add('main-project-form');
    botonesArea.classList.add('main-project-boton-area');

    inputNombre.setAttribute('type', 'text');
    inputNombre.setAttribute('placeholder', 'ej. Proyecto Portafolio');
    inputNombre.setAttribute('required', '');

    inputNombre.id = 'input-nombre-project';
    inputDescripcion.id = 'input-descripcion-project';

    inputDescripcion.setAttribute('type', 'text');
    inputDescripcion.setAttribute('placeholder', 'ej. Proyecto para recopilar todos mis programas de forma ordenada ...');
    inputDescripcion.setAttribute('required', '');

    botonAceptar.textContent = 'Aceptar';
    botonCancelar.textContent = 'Cancelar';

    botonAceptar.classList.add('btn-aceptar-project');
    botonCancelar.classList.add('btn-cancelar-project');

    botonAceptar.onclick = () => {
        if (agregarProyecto()) {
            mostrarProyectos();
            mostrarItemProyecto();
        }
    };
    botonCancelar.onclick = () => cancelarProyecto();

    // Agregar elementos al formulario
    formulario.appendChild(labelNombre);
    formulario.appendChild(inputNombre);
    formulario.appendChild(labelDescripcion);
    formulario.appendChild(inputDescripcion);
    botonesArea.appendChild(botonAceptar);
    botonesArea.appendChild(botonCancelar);
    formulario.appendChild(botonesArea);

    // Agregar el formulario al div con el ID 'main-project'
    const divMainProject = document.getElementById('main-project');
    divMainProject.appendChild(formulario);
}

function cancelarProyecto() {
    limpiarMain();
    const btnHoy = document.getElementById('btnBandeja');
    btnHoy.classList.add('btn-side-bar-active');
    mostrarTareas();
}

function mostrarItemProyecto(nombreProyecto) {

    const inputNombre = document.getElementById('input-nombre-project');
    const inputDescripcion = document.getElementById('input-descripcion-project');

    const mainProject = document.getElementById('main-project');

    let nombre = '';
    let descripcion = '';
    if (nombreProyecto === undefined) {
        nombre = inputNombre.value;
        descripcion = inputDescripcion.value;
    } else {
        let proyecto = listaProyectos.find(project => {
            return project.getNombreProyecto() === nombreProyecto
        });
        nombre = proyecto.getNombreProyecto();
        descripcion = proyecto.getDescripcionProyecto();
    }
    limpiarMain();
    resetearActive();




    // Crear contenedor div
    const divProyecto = document.createElement('div');
    divProyecto.classList.add('main-project-item');

    // Crear elementos h2 y p
    const titulo = document.createElement('h2');
    const parrafo = document.createElement('p');

    // Configurar contenido
    titulo.textContent = nombre;
    parrafo.textContent = descripcion;


    const divTitulos = document.createElement('div');
    divTitulos.classList.add('main-titulos-tareas-project');

    const spanNombre = document.createElement('span');
    const spanFecha = document.createElement('span');
    const spanPrioridad = document.createElement('span');
    const spanAcciones = document.createElement('span');

    spanNombre.textContent = 'Tarea';
    spanFecha.textContent = 'Fecha';
    spanPrioridad.textContent = 'Prioridad';
    spanAcciones.textContent = 'Acciones';

    divTitulos.appendChild(spanNombre);
    divTitulos.appendChild(spanFecha);
    divTitulos.appendChild(spanPrioridad);
    divTitulos.appendChild(spanAcciones);
    // Agregar elementos al contenedor
    divProyecto.appendChild(titulo);
    divProyecto.appendChild(parrafo);
    divProyecto.appendChild(divTitulos);

    // Agregar contenedor al elemento main-project
    mainProject.appendChild(divProyecto);

    /*agregar los elementos tareas a visualizar*/
    let proyecto = listaProyectos.find(project => {
        return project.getNombreProyecto() === nombreProyecto
    });
   
    if (proyecto) {
        proyecto.getListaTareas().forEach(task => {
            const div = document.createElement('div');
            const spanNombre = document.createElement('span');
            const spanFecha = document.createElement('span');
            const spanPrioridad = document.createElement('span');
            const spanAcciones = document.createElement('span');
            const botonDelete = crearButton('', "<span class='material-symbols-outlined'>close</span>");

            botonDelete.id = 'btn-delete-task-project';

            div.classList.add('main-project-task-item');

            spanNombre.textContent = task.getTitulo();
            spanFecha.textContent = task.getFecha();
            if (spanFecha.textContent.trim() === '') {
                spanFecha.textContent = 'Sin Fecha';
            }
            spanPrioridad.textContent = task.getPrioridad();

            div.appendChild(spanNombre);
            div.appendChild(spanFecha);
            div.appendChild(spanPrioridad);

            botonDelete.onclick = () => eliminarTareaDelProyecto(proyecto.getNombreProyecto(), task.getTitulo());
            spanAcciones.appendChild(botonDelete);
            div.appendChild(spanAcciones);

            mainProject.appendChild(div);

        });
    }

    const botonAgregarTarea = crearButton('Agregar tarea', "<span class='material-symbols-outlined'>add_circle</span>");
    botonAgregarTarea.classList.add('btn-add-task-project');
    const botonArea = document.createElement('div');
    botonArea.classList.add('main-project-btn-area');


    botonAgregarTarea.onclick = () => formularioTareaItemProyecto(nombre);
    botonArea.appendChild(botonAgregarTarea);
    mainProject.appendChild(botonArea);
}

function eliminarTareaDelProyecto(nombreProyecto, nombreTarea) {
    let proyecto = listaProyectos.find(project => {
        return nombreProyecto === project.getNombreProyecto()
    });

    proyecto.setListaTareas(proyecto.getListaTareas().filter(task => task.getTitulo() !== nombreTarea));

    mostrarItemProyecto(nombreProyecto);

}

function formularioTareaItemProyecto(nombreProyecto) {
    limpiarMain();
    const mainProject = document.getElementById('main-project');

    // Crear formulario
    const divFormProject = document.createElement('div');
    divFormProject.classList.add('main-project-form-tarea');

    // Crear label e input para el nombre de la tarea
    const labelNombre = document.createElement('label');
    labelNombre.textContent = "Nombre de tarea ";
    const inputNombre = document.createElement('input');
    inputNombre.type = 'text';
    inputNombre.id = 'input-nombre-project';

    // Crear label e input para la fecha de la tarea
    const labelFecha = document.createElement('label');
    labelFecha.textContent = "Fecha de la tarea:";
    const inputFecha = document.createElement('input');
    inputFecha.type = 'date';
    inputFecha.id = 'input-fecha-project';

    const formattedDate = format(new Date(), 'yyyy-MM-dd');

    inputFecha.value = formattedDate;

    // Crear label e input para la prioridad de la tarea
    const labelPrioridad = document.createElement('label');
    const inputPrioridad = document.createElement('select');
    labelPrioridad.textContent = 'Nivel de prioridad';
    inputPrioridad.id = 'input-prioridad-project';

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


    // Crear botón "Agregar al proyecto"
    const botonAgregar = document.createElement('button');
    const divBtns = document.createElement('div');
    divBtns.classList.add('main-project-form-area-btn');
    botonAgregar.textContent = "Agregar al proyecto";
    botonAgregar.classList.add('btn-agregar-tarea-proyecto');

    botonAgregar.onclick = () => {

        if (agregarTareaProyecto(nombreProyecto)) {
           
            limpiarMain();
            mostrarItemProyecto(nombreProyecto);
        }
    };

    // Crear botón "Cancelar"
    const botonCancelar = document.createElement('button');
    botonCancelar.type = 'button';
    botonCancelar.textContent = "Cancelar";
    botonCancelar.classList.add('btn-cancelar-tarea-proyecto');

    botonCancelar.onclick = () => {
        limpiarMain();
        mostrarItemProyecto(nombreProyecto);
    }

    // Agregar elementos al formulario
    divFormProject.appendChild(labelNombre);
    divFormProject.appendChild(inputNombre);
    divFormProject.appendChild(labelFecha);
    divFormProject.appendChild(inputFecha);
    divFormProject.appendChild(labelPrioridad);
    divFormProject.appendChild(inputPrioridad);
    divBtns.appendChild(botonAgregar);
    divBtns.appendChild(botonCancelar);
    divFormProject.appendChild(divBtns);

    // Agregar formulario al elemento main-project
    mainProject.appendChild(divFormProject);
}

function agregarTareaProyecto(nombreProyecto) {
    const inputNombre = document.getElementById('input-nombre-project');
    const inputFecha = document.getElementById('input-fecha-project');
    const inputPrioridad = document.getElementById('input-prioridad-project');

    if (inputNombre.value.trim() === '') {
        alert('Debe poner un nombre a la tarea');
        return false;
    }




    let proyecto = listaProyectos.find(project => {
        return project.getNombreProyecto() === nombreProyecto
    });


    if (proyecto) {
        //agregar desde el objeto
        if (inputFecha.value.trim() === '') {
            inputFecha.value = 'Sin Fecha';
        }
        let tarea = new Tarea(inputNombre.value, inputFecha.value, inputPrioridad.value);

        let tareaDuplicada = proyecto.getListaTareas().find(task => {
            return task.getTitulo() === tarea.getTitulo()
        })
        if (tareaDuplicada) {
            alert('Ya existe esa tarea en el proyecto');
            return false;
        }

        proyecto.agregarTarea(tarea);
        return true
    }
    return false;
}


function mostrarProyectos() {
    //agregamos al DOM
    limpiarProyectos();

    const sideBarDown = document.querySelector('.side-bar-down');

    listaProyectos.forEach((project) => {
        const divButtonProject = document.createElement('div');
        divButtonProject.classList.add('side-bar-down-div-project');
        const botonProyecto = crearButton(project.getNombreProyecto(), "<span class='material-symbols-outlined'>folder</span>");
        botonProyecto.classList.add('btn-item-project');
        botonProyecto.id = listaProyectos.indexOf(project) + 1;
        botonProyecto.onclick = () => mostrarItemProyecto(project.getNombreProyecto());

        const botonDeleteProyecto = crearButton('', "<span class='material-symbols-outlined'>close</span>");
        botonDeleteProyecto.onclick = () => eliminarProyecto(project.getNombreProyecto());
        botonDeleteProyecto.classList.add('btn-delete-project');

        divButtonProject.appendChild(botonProyecto);
        divButtonProject.appendChild(botonDeleteProyecto);

        sideBarDown.appendChild(divButtonProject);
    });

    const botonNuevo = crearButton('Agregar proyecto', "<span class='material-symbols-outlined'>add_circle</span>");
    botonNuevo.classList.add('btn-add-project');

    botonNuevo.onclick = () => crearFormularioProyecto();

    sideBarDown.appendChild(botonNuevo);

}

function eliminarProyecto(nombre) {
    listaProyectos = listaProyectos.filter(project => project.getNombreProyecto() !== nombre);
    limpiarMain();
    mostrarProyectos();
    const btnBandeja = document.getElementById('btnBandeja');
    btnBandeja.classList.add('btn-side-bar-active');
    mostrarTareas();
}

function limpiarProyectos() {
    const sideBarDown = document.querySelector('.side-bar-down');

    while (sideBarDown.firstChild) {

        sideBarDown.removeChild(sideBarDown.firstChild);

    }

    const titulo = document.createElement('h2');
    titulo.textContent = 'Proyectos';

    sideBarDown.appendChild(titulo);
}

function agregarProyecto() {
    const inputNombre = document.getElementById('input-nombre-project');
    const inputDescripcion = document.getElementById('input-descripcion-project');

    let nombre = inputNombre.value;
    let descripcion = inputDescripcion.value;

    if (nombre.trim() === '' || descripcion.trim() === '') {
        alert('Debe rellenar todos los campos.');
        return false;
    }

    let proyectoDuplicado = listaProyectos.find(project => {
        return project.getNombreProyecto() === nombre
    });

    if (proyectoDuplicado === undefined) {
        console.log('Se agrego un nuevo proyecto');

        let proyecto = new Proyecto();
        proyecto.setNombreProyecto(nombre);
        proyecto.setDescripcionProyecto(descripcion);
        listaProyectos.push(proyecto);
        console.log(listaProyectos);

        return true;
    } else {
        alert('Ya existe un proyecto con ese nombre.');
        return false;
    }
}


// Función para eliminar la clase 'btn-side-bar-active' de todos los botones
function resetearActive() {
    const btnBandeja = document.getElementById('btnBandeja');
    const btnHoy = document.getElementById('btnHoy');
    const btnSemanal = document.getElementById('btnSemanal');

    btnBandeja.classList.remove('btn-side-bar-active');
    btnHoy.classList.remove('btn-side-bar-active');
    btnSemanal.classList.remove('btn-side-bar-active');


}

function limpiarMain() {
    const elementos = ['main-lista-tareas', 'main-form-area', 'main-btn-area', 'main-project'];

    for (const elementoId of elementos) {
        const elemento = document.getElementById(elementoId);
        while (elemento.firstChild) {
            elemento.removeChild(elemento.firstChild);
        }
    }
}

function limpiarMainProject() {
    const main = document.getElementById('main-project');

    while (main.firstChild) {
        main.removeChild(main.firstChild);
    }
}



function setEventosSideBar() {
    const btnBandeja = document.getElementById('btnBandeja');
    const btnHoy = document.getElementById('btnHoy');
    const btnSemanal = document.getElementById('btnSemanal');

    // Función para eliminar la clase 'btn-side-bar-active' de todos los botones
    function resetearBotones() {
        btnBandeja.classList.remove('btn-side-bar-active');
        btnHoy.classList.remove('btn-side-bar-active');
        btnSemanal.classList.remove('btn-side-bar-active');
    }

    btnBandeja.addEventListener('click', () => {
        limpiarMainProject();

        limpiarFormulario();
        mostrarTareas();
        resetearBotones();
        btnBandeja.classList.add('btn-side-bar-active');
    });

    btnHoy.addEventListener('click', () => {
        limpiarMainProject();

        limpiarFormulario();
        mostrarTareas('Hoy');
        resetearBotones();
        btnHoy.classList.add('btn-side-bar-active');
    });

    btnSemanal.addEventListener('click', () => {
        limpiarMainProject();

        limpiarFormulario();
        mostrarTareas('Semanal');
        resetearBotones();
        btnSemanal.classList.add('btn-side-bar-active');
    });
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
    setEventosMain();

}





function setEventosMain() {
    const btnMain = document.querySelector('.btn-main');
    const btnAceptar = document.querySelector('.btn-aceptar');
    const btnCancelar = document.querySelector('.btn-cancelar');
    const elementoActivo = document.querySelector('.btn-side-bar-active');
    let textoElementoActivo = '';
    if (elementoActivo) {
        textoElementoActivo = elementoActivo.textContent;

    }


    if (btnMain) {
        btnMain.addEventListener('click', () => {
            construirFormularioAgregarTarea();
        });
    }
    if (btnAceptar) {
        btnAceptar.addEventListener('click', () => {
            if (agregarTarea()) {
                console.log('elemento activo : ' + textoElementoActivo);
                if (textoElementoActivo.includes('Hoy')) {
                    console.log('entre a hoy ');
                    mostrarTareas('Hoy');
                } else {
                    if (textoElementoActivo.includes('Semanal')) {
                        console.log('entre a semanal ');
                        mostrarTareas('Semanal');
                    } else {
                        console.log('entre a la normie ');
                        mostrarTareas();
                    }
                }

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

function construirFormularioAgregarTarea() {

    const mainForm = document.getElementById('main-form-area');
    if (mainForm.childElementCount === 0) {
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

        btnCancelar.textContent = 'Cancelar';

        //verificamos si el formulario es para editar
        btnAceptar.classList.add(editar ? 'btn-aceptar-editar' : 'btn-aceptar');
        btnAceptar.textContent = editar ? "Editar" : btnAceptar.textContent = 'Agregar';
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

        mainForm.appendChild(formularioTarea);
        setEventosMain();
    }
}



function agregarTarea() {
    const inputNombre = document.getElementById('input-nombre');
    const inputFecha = document.getElementById('input-fecha');
    const inputPrioridad = document.getElementById('input-prioridad');

    let nombre = inputNombre.value;
    let fecha = inputFecha.value;
    const fechaHoy = format(new Date(), 'yyyy-MM-dd');
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

function mostrarTareas(tipoLista) {

    const button = document.querySelector('.btn-main');
    if (button === null) {
        btnAgregarTarea();
        setEventosMain();
    }
    let lista = [];
    if (tipoLista === undefined) {
        lista = listaTotal.getListaTareas();
    } else {
        if (tipoLista === 'Hoy') {
            const fechaHoy = format(new Date(), 'yyyy-MM-dd');

            lista = listaTotal.getListaTareas().filter(task => {
                return task.getFecha() === fechaHoy;
            });
        }

        if (tipoLista === 'Semanal') {
            // Obtener la fecha de inicio de la semana actual (lunes)
            const fechaInicioSemana = startOfWeek(new Date(), { weekStartsOn: 0 });

            // Obtener la fecha de fin de la semana actual (domingo)
            const fechaFinSemana = endOfWeek(new Date(), { weekStartsOn: 0 });

            // Filtrar las tareas dentro del rango de la semana actual
            lista = listaTotal.getListaTareas().filter(task => {
                const fechaTarea = new Date(task.getFecha());
                return isWithinInterval(fechaTarea, { start: fechaInicioSemana, end: fechaFinSemana });
            });
        }

    }
    limpiarListaTareas();
    const mainLista = document.getElementById('main-lista-tareas');
    if (lista.length === 0) {
        const divTitulos = document.createElement('div');
        divTitulos.classList.add('main-titulo-no-task');
        const noHayTareas = document.createElement('h2');
        noHayTareas.textContent = 'No quedan tareas por hacer aqui ...';

        divTitulos.appendChild(noHayTareas)
        mainLista.appendChild(divTitulos);
    } else {
        const divTitulos = document.createElement('div');
        divTitulos.classList.add('main-titulos-tareas');

        const spanNombre = document.createElement('span');
        const spanFecha = document.createElement('span');
        const spanPrioridad = document.createElement('span');
        const spanAcciones = document.createElement('span');

        spanNombre.textContent = 'Tarea';
        spanFecha.textContent = 'Fecha';
        spanPrioridad.textContent = 'Prioridad';
        spanAcciones.textContent = 'Acciones';

        divTitulos.appendChild(spanNombre);
        divTitulos.appendChild(spanFecha);
        divTitulos.appendChild(spanPrioridad);
        divTitulos.appendChild(spanAcciones);
        mainLista.appendChild(divTitulos);

    }
    lista.forEach((task) => {


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
        btnEdit.onclick = () => abrirEdicion(task.getTitulo());
        btnEdit.classList.add('btn-editar-tarea');
        tareaDiv.appendChild(btnEdit);

        const btnDelete = crearButton('', "<span class='material-symbols-outlined'>delete</span>");
        btnDelete.onclick = () => eliminarTarea(task.getTitulo());
        btnDelete.classList.add('btn-eliminar-tarea');
        tareaDiv.appendChild(btnDelete);

        mainLista.appendChild(tareaDiv);
    });

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

function abrirEdicion(nombre) {
    const form = document.querySelector('.main-form-tarea');


    editar = true;
    let tarea = listaTotal.getListaTareas().find(item => item.getTitulo() === nombre);
    console.log('tarea : ' + tarea.getTitulo());

    if (form) {
        limpiarFormulario();
    }
    construirFormularioAgregarTarea();
    const btnEditar = document.querySelector('.btn-aceptar-editar');


    const inputNombre = document.getElementById('input-nombre');
    const inputFecha = document.getElementById('input-fecha');
    const inputPrioridad = document.getElementById('input-prioridad');

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
    const indice = listaTotal.getListaTareas().findIndex(objeto => objeto.getTitulo() === inputNombre.value);

    console.log('indice capturado : ' + indice);
    if (btnEditar) {
        btnEditar.addEventListener('click', () => {
            if (editarTarea(indice)) {
                mostrarTareas();
                limpiarFormulario();
            }

        });
    }

}

function editarTarea(indice) {
    console.log('estoy llegando aqui al editar');
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

    let tareaNueva = new Tarea();
    tareaNueva.setTitulo(nombre);
    tareaNueva.setFechaTermino(fecha);
    tareaNueva.setPrioridad(prioridad);
    listaTotal.editListaTareas(indice, tareaNueva);
    editar = false;
    return true;
}
function loadPage() {
    header();
    sideBar();
    main();
}

export default loadPage;