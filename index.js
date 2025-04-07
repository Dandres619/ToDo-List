let listaTareas = document.querySelector('.tareas-lista');
let tareaInput = document.getElementById('tarea-input');
let descripcionInput = document.getElementById('descripcion-input');
let fechaInput = document.getElementById('fecha-input');
let botonTarea = document.querySelector('.form__container');
let filtros = document.querySelectorAll('.filtro');
let numeroTarea = 1;

let getTareas = JSON.parse(localStorage.getItem('tareas')) || [];

getTareas.forEach(tarea => cargarTareas(tarea));

function cargarTareas(tarea) {
    let elementoLista = document.createElement('li');
    elementoLista.classList.add('list-unstyled', 'tarea-item');

    let elementoContenido = document.createElement('div');
    elementoContenido.classList.add('row', 'align-items-center', 'text-center', 'my-2', 'mx-3');

    let parrafoTarea = document.createElement('p');
    parrafoTarea.textContent = '#' + tarea.id;
    parrafoTarea.classList.add('col', 'text-truncate', 'align-items-center');

    let nombre = document.createElement('p');
    nombre.textContent = tarea.nombre;
    nombre.classList.add('col', 'text-truncate');
    nombre.title = tarea.nombre;

    let descripcion = document.createElement('p');
    descripcion.textContent = tarea.descripcion;
    descripcion.classList.add('col', 'text-truncate');
    descripcion.title = tarea.descripcion;

    let fecha = new Date(tarea.fecha).toLocaleString();
    let fechaElemento = document.createElement('p');
    fechaElemento.textContent = fecha;
    fechaElemento.classList.add('col', 'text-truncate');
    fechaElemento.title = tarea.fecha;

    let botonEliminar = document.createElement('button');
    botonEliminar.textContent = 'Eliminar';
    botonEliminar.classList.add('btn', 'btn-danger', 'btn-sm', 'fw-bold');

    let botonCompletar = document.createElement('button');
    botonCompletar.textContent = 'Completar';
    botonCompletar.classList.add('btn', 'btn-warning', 'btn-sm', 'fw-bold');

    let contenedorBotones = document.createElement('div');
    contenedorBotones.classList.add('col', 'd-flex', 'justify-content-center', 'gap-3');
    contenedorBotones.append(botonEliminar, botonCompletar);

    elementoContenido.append(parrafoTarea, nombre, descripcion, fechaElemento, contenedorBotones);
    elementoLista.appendChild(elementoContenido);
    listaTareas.appendChild(elementoLista);

    botonEliminar.addEventListener('click', () => {
        listaTareas.removeChild(elementoLista);
        getTareas = getTareas.filter(tareaLocal => tareaLocal.id !== tarea.id);
        localStorage.setItem('tareas', JSON.stringify(getTareas));
    });

    botonCompletar.addEventListener('click', () => {
        elementoLista.classList.toggle('completada');
        if (elementoLista.classList.contains('completada')) {
            botonCompletar.textContent = 'Pendiente';
        } else {
            botonCompletar.textContent = 'Completar';
        }
    });

    if (tarea.id + 1 > numeroTarea) {
        numeroTarea = tarea.id + 1;
    }
}


function nombreTarea() {
    let nombre = document.createElement('p');
    nombre.textContent = tareaInput.value;
    nombre.classList.add('col', 'text-truncate');
    nombre.title = tareaInput.value;
    return nombre;
}

function descripcionTarea() {
    let descripcion = document.createElement('p');
    descripcion.textContent = descripcionInput.value;
    descripcion.classList.add('col', 'text-truncate');
    descripcion.title = descripcionInput.value;
    return descripcion;
}

function fechaTarea() {
    let fecha = new Date(fechaInput.value);
    let fechaInfo = fecha.toLocaleString();

    let fechaElemento = document.createElement('p');
    fechaElemento.textContent = fechaInfo;
    fechaElemento.classList.add('col', 'text-truncate');
    fechaElemento.title = fechaInput.value;

    return fechaElemento;
}

function crearTareas() {
    let nuevaTarea = {
        id: numeroTarea,
        nombre: tareaInput.value,
        descripcion: descripcionInput.value,
        fecha: fechaInput.value,
        completada: false
    };

    let elementoLista = document.createElement('li');
    elementoLista.classList.add('list-unstyled', 'tarea-item');

    let elementoContenido = document.createElement('div');
    elementoContenido.classList.add('row', 'align-items-center', 'text-center', 'my-2', 'mx-3');

    let parrafoTarea = document.createElement('p');
    parrafoTarea.textContent = '#' + numeroTarea;
    parrafoTarea.classList.add('col', 'text-truncate', 'align-items-center');

    let botonEliminar = document.createElement('button');
    botonEliminar.textContent = 'Eliminar';
    botonEliminar.classList.add('btn', 'btn-danger', 'btn-sm', 'fw-bold');

    let botonCompletar = document.createElement('button');
    botonCompletar.textContent = 'Completar';
    botonCompletar.classList.add('btn', 'btn-warning', 'btn-sm', 'fw-bold');

    let contenedorBotones = document.createElement('div');
    contenedorBotones.classList.add('col', 'd-flex', 'justify-content-center', 'gap-3');
    contenedorBotones.append(botonEliminar, botonCompletar);

    elementoContenido.append(
        parrafoTarea,
        nombreTarea(),
        descripcionTarea(),
        fechaTarea(),
        contenedorBotones
    );

    elementoLista.appendChild(elementoContenido);
    listaTareas.appendChild(elementoLista);

    botonEliminar.addEventListener('click', () => {
        listaTareas.removeChild(elementoLista);
        getTareas = getTareas.filter(tareaLocal => tareaLocal.id !== nuevaTarea.id);
        localStorage.setItem('tareas', JSON.stringify(getTareas));
    });

    botonCompletar.addEventListener('click', () => {
        elementoLista.classList.toggle('completada');

        if (elementoLista.classList.contains('completada')) {
            botonCompletar.textContent = 'Pendiente';
        } else {
            botonCompletar.textContent = 'Completar';
        }
    });

    getTareas.push(nuevaTarea);
    localStorage.setItem('tareas', JSON.stringify(getTareas));

    tareaInput.value = '';
    descripcionInput.value = '';
    fechaInput.value = '';
}

botonTarea.addEventListener('submit', (e) => {
    e.preventDefault();

    let tareaExiste = getTareas.some(tarea => tareaInput.value === tarea.nombre);
    
    if (tareaExiste) {
        alert("Ya existe una tarea con este nombre.");
    } else {
        crearTareas()
        numeroTarea++;
    }
});

filtros.forEach(boton => {
    boton.addEventListener('click', () => {
        const filtro = boton.dataset.filtro;
        const tareas = document.querySelectorAll('.tarea-item');

        tareas.forEach(tarea => {
            switch (filtro) {
                case 'todas':
                    tarea.style.display = 'block';
                    break;
                case 'completadas':
                    if (tarea.classList.contains('completada')) {
                        tarea.style.display = 'block';
                    } else {
                        tarea.style.display = 'none';
                    }
                    break;
                case 'pendientes':
                    if (!tarea.classList.contains('completada')) {
                        tarea.style.display = 'block';
                    } else {
                        tarea.style.display = 'none';
                    }   
                    break;
            }
        });
    });
});