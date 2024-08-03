const user = JSON.parse(localStorage.getItem('user'));
const idBarbero = user.usuario_id;

document.getElementById("verCitasPendientes").addEventListener("click", function(){
    fetch(`/barbero/getCitas/${idBarbero}`,{
        method: "GET",
        headers: {
            "Content-type": "aplicación/JSON"
        }
    })
    .then(response =>{
        if(response.status === 500){
            alert("Error en el servidor");
        }
        if(response.status === 401){
            alert("No hay citas aun");
        }
        return response.json();
        })
    .then(data =>{
        mostrarCitasDisponibles(data);
    })
    .catch(err =>{
        console.log(err);
    })
    

    function mostrarCitasDisponibles(citas) {
        const verCitas = document.getElementById('verCitas');
        verCitas.innerHTML = " "; // Limpiar contenido previo
    
        if (citas.length === 0) {
            verCitas.innerHTML = '<p>No hay citas disponibles.</p>';
            return;
        }
    
        const ul = document.createElement('ul');
        ul.classList.add("list-group");
        citas.forEach(cita => {
            const li = document.createElement('li');
            li.classList.add("list-group-item", "d-flex");
            li.textContent = `Cliente: ${cita.cliente_nombre}, Horario: ${cita.fecha}`; // Asume que la columna es "fecha" y "horario_id"
            
            const button = document.createElement('button');
            button.classList.add("btn", "btn-success");
            button.textContent = 'Marcar como completada';
            button.addEventListener('click', () => accionCita(cita.cita_id, cita.horario_id));
            button.setAttribute("data-bs-dismiss", "modal");


            const button2 = document.createElement('button');
            button2.classList.add("btn", "btn-danger");
            button2.textContent = 'Cancelar';
            button2.addEventListener('click', () => accionCita(cita.cita_id, cita.horario_id));
            button2.setAttribute("data-bs-dismiss", "modal");


            li.appendChild(button);
            li.appendChild(button2);
            ul.appendChild(li);
        });
    
        verCitas.appendChild(ul);
    }
})


function accionCita(idCita, idHorario){
    fetch('/barbero/accionCita', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            idCita: idCita,
            idHorario: idHorario,
            idBarbero: idBarbero
        })
    })
    .then(response=>{
        if(response.status === 500){
            alert("Error en el servidor");
        }
        if(response.status === 201){
            alert("Accion realizada con exito");
        }
    })
    .catch(err=>{
        alert("Error");
        log(err);
    })
}