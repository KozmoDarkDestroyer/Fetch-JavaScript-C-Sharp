//------------------------------------------------------------------------------------------------

let listaEstudiantes = [];
const form = document.querySelector('.item-2');
form.style.display = 'none';
let modo;
let idEditar;
//------------------------------------------------------------------------------------------------

// Listar estudiantes (Petición Fetch):

const listar = document.getElementById('listar');
const apiGetEstudiantes = 'https://localhost:44337/api/Estudiante/ListarEstudiantes';

function listarEstudiantes() {
    return fetch(apiGetEstudiantes);
}

// Listar estudiantes (Imprimir en el navegador)

const table = document.getElementById('table');

function imprimirLista(estudiantes) {
    form.style.display = 'none';
    const beforeTbody = document.getElementById('tbody');
    return new Promise(function (resolve,reject) {
        if (beforeTbody) {
            table.removeChild(beforeTbody);
        }
        const tbody = document.createElement('tbody');
        tbody.setAttribute('id','tbody');
        tbody.setAttribute('class','tbody');
        estudiantes.forEach((element) =>{
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${element.id_estudiante}</td>
                <td>${element.nombre_completo}</td>
                <td>${element.identificacion}</td>
                <td>${element.carrera}</td>
                <td>${element.semestre}</td>
                <td>
                <button onclick="obtener(${element.id_estudiante})"><em>Actualizar</em></button>
                <button onclick="eliminar(${element.id_estudiante})"><em>Eliminar</em></button>
                </td>
            `;
            tbody.appendChild(tr);
        })
        table.appendChild(tbody);
        resolve();
        reject();
    })   
}

// Listar estudiantes (Evento)

listar.addEventListener('click',function(){
    listarEstudiantes()
        .then(function(response){
            return response.json();
        })
        .catch(function (error) {
            console.error(error);
            alert('Error en la conexión al servidor, vuelve a intentarlo más tarde -> (' 
            + error + ') -> código 01');
        })
        .then(function(response){
            console.log(response);
            listaEstudiantes = response;
            return imprimirLista(listaEstudiantes);
        })
        .catch(function (error) {
            console.error(error);
            alert('Error en la conexión al servidor, vuelve a intentarlo más tarde -> (' 
            + error + ') -> código 02');
        })
})

//------------------------------------------------------------------------------------------------

// Crear estudiante (Petición Fetch)

const crear = document.getElementById('crear');
const apiPostEstudiante = 'https://localhost:44337/api/Estudiante/CrearEstudiante';

class Estudiante {
    constructor(nombre_completo,identificacion,carrera,semestre){
        this.nombre_completo = nombre_completo;
        this.identificacion = identificacion;
        this.carrera = carrera;
        this.semestre = semestre;
    }
}

function crearEstudiante (estudiante) {
    return fetch(apiPostEstudiante,{
        headers:{
            'content-type':'application/json'
        },
        method:'POST',
        body:
            JSON.stringify(estudiante)
    })
}

// Crear estudiante (Imprimir en navegador)

function asignarAtributos() {
    return new Promise(function (resolve,reject) {
        let nombre = document.getElementById('nombre').value;
        let idetificacion = document.getElementById('idetificacion').value;
        let carrera = document.getElementById('carrera').value;
        let semestre = document.getElementById('semestre').value;

        const inputNombre = document.getElementById('nombre');
        const inputIdentificacion = document.getElementById('idetificacion');
        const inputCarrera = document.getElementById('carrera');
        const inputSemestre = document.getElementById('semestre');

        if (nombre.trim() == null || nombre.trim().length == 0) {
            alert('Por favor complete el campo nombre');
            inputNombre.style.borderRadius = '1px solid red';
            return false;
        }

        else if (idetificacion.trim() == null || idetificacion.trim().length == 0) {
            alert('Por favor complete el campo identificacion');
            inputIdentificacion.style.borderRadius = '1px solid red';
            return false;
        }

        else if(carrera.trim() == null || carrera.trim().length == 0){
            alert('Por favor complete el campo carrera');
            inputCarrera.style.borderRadius = '1px solid red';
            return false;
        }

        else if (semestre.trim() == null || semestre.trim().length == 0) {
            alert('Por favor complete el campo semestre');
            inputSemestre.style.borderRadius = '1px solid red';
            return false;
        }

        let estudiante = new Estudiante(nombre,idetificacion,carrera,semestre);
        resolve(estudiante);
        reject();
    })
}

// Crear estudiante (Evento)

crear.addEventListener('click',function(){
    form.style.display = 'block';
    modo = 'crear';
})

//------------------------------------------------------------------------------------------------

// Salvar estudiante crear / editar

function salvarEstudiante(modo) {
    return new Promise(function (resolve,reject) {
       if (modo == 'crear') {
           asignarAtributos()
            .then(function(estudiante){
                console.log(estudiante);
                return crearEstudiante(estudiante);
            })
            .catch(function (error) {
                console.error(error);
                alert('Error interno del cliente, vuelve a intentarlo más tarde -> (' 
                + error + ') -> código 03');
            })
       }
       else if (modo == 'editar') {
            asignarAtributos()
            .then(function (estudiante) {
                return actualizarEstudiante(idEditar,estudiante);
            })
            .catch(function (error) {
                console.error(error);
                alert('Error interno del cliente, vuelve a intentarlo más tarde -> (' 
                + error + ') -> código 07');
            })
       }
       else{
           alert('No has seleccionado editar o crear un estudiante');
       }
       resolve();
       reject();
    })
}

const aceptar = document.getElementById('aceptar');
aceptar.addEventListener('click',function(){
    salvarEstudiante(modo)
        .then(function(){
            alert('Por favor actualiza la lista para apreciar los cambios');
        })
        .catch(function (error) {
            console.error(error);
            alert('Error en la conexión al servidor, vuelve a intentarlo más tarde -> (' 
            + error + ') -> código 06');
        })
})

//------------------------------------------------------------------------------------------------

// Actualizar estudiante (Petición Fetch)

const apiPutEstudiantes = `https://localhost:44337/api/Estudiante/ActualizarEstudiante`;
const apiGetEstudiante = `https://localhost:44337/api/Estudiante/MostrarEstudiante`;

function actualizarEstudiante (id,estudiante) {
    return fetch(apiPutEstudiantes + `/${id}`,{
        headers:{
            'content-type':'application/json'
        },
        method: 'PUT',
        body: 
                JSON.stringify(estudiante)
    });
}

// Obtener estudiante (Petición Fetch)

function obtenerEstudiante(id) {
    return fetch(apiGetEstudiante + `/${id}`);
}

// Actualizar estudiante (Evento)

function obtener(id) {
    modo = 'editar';
    idEditar = id;
    form.style.display = 'block';
    obtenerEstudiante(id)
        .then(function(response){
            return response.json();
        })
        .catch(function (error) {
            console.error(error);
            alert('Error en la conexión al servidor, vuelve a intentarlo más tarde -> (' 
            + error + ') -> código 04');    
        })
        .then(function(response){
            let estudiante = response;
            return imprimirEstudiante(estudiante);
        })
        .catch(function (error) {
            console.error(error);
            alert('Error en la conexión al servidor, vuelve a intentarlo más tarde -> (' 
            + error + ') -> código 05');
        })
}

//  Obtener estudiante (Imprimir en el navegador)

function imprimirEstudiante(estudiante) {
    let nombre = document.getElementById('nombre').value = estudiante.nombre_completo;
    let idetificacion = document.getElementById('idetificacion').value = estudiante.identificacion;
    let carrera = document.getElementById('carrera').value = estudiante.carrera;
    let semestre = document.getElementById('semestre').value = estudiante.semestre;
}

//------------------------------------------------------------------------------------------------

// Limpiar inputs

const limpiar = document.getElementById('limpiar');
limpiar.addEventListener('click',function(){
    let nombre = document.getElementById('nombre').value = '';
    let idetificacion = document.getElementById('idetificacion').value = '';
    let carrera = document.getElementById('carrera').value = '';
    let semestre = document.getElementById('semestre').value = '';
})

//------------------------------------------------------------------------------------------------

// Eliminar estudiantes (Petición Fetch)

const apiDeleteEstudiante = 'https://localhost:44337/api/Estudiante/EliminarEstudiante';

function eliminar(id) {
    console.log(id)
    fetch(apiDeleteEstudiante + `/${id}`,
    {
      method:'DELETE'  
    });
}