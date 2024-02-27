
function sideBar() {
    const sideBar = document.getElementById('side-bar');
    // creacion de elementos 
    const bandejaSideBar = document.createElement('h2');
    const listaBandeja = document.createElement('ul');
    const proyectoSideBar = document.createElement('h2');
    const listaProyectos = document.createElement('ul');
    const btnProyecto = document.createElement('button');
    const elementosBandeja = ['Hoy', 'Semanal', 'Importancia'];
    
    //texto a elementos 
    bandejaSideBar.textContent = 'Bandeja';
    proyectoSideBar.textContent = 'Proyectos';
    btnProyecto.textContent = 'Agregar nuevo proyecto';
    //ciclo para construir el side-bar
    elementosBandeja.forEach((item) => {
        const itemLista = document.createElement('li');
        itemLista.textContent = item;
        listaBandeja.appendChild(itemLista);
    });

    sideBar.appendChild(bandejaSideBar);
    sideBar.appendChild(listaBandeja);
    sideBar.appendChild(proyectoSideBar);
    sideBar.appendChild(btnProyecto);

}

function main() {
    const main = document.getElementById('main-content');

    const btnMain = document.createElement('button');

    btnMain.textContent = 'Agregar nueva tarea';

    main.appendChild(btnMain);

}

function header() {
    const header = document.getElementById('header');
    const titulo = document.createElement('h1');
    

    titulo.textContent = 'J To-Do';

    header.appendChild(titulo);

}

function loadPage(){
    header();
    sideBar();
    main();

}

export default loadPage;