const user = JSON.parse(localStorage.getItem('user'));
const usuarioId = user.usuario_id;
const errorMessage = document.getElementById('errorMessage');
const successMessage = document.getElementById('successMessage');



document.getElementById('verBarberosDisponibles').addEventListener('click', function() {
    fetch('/usuario/getBarberos',{
    method: "get",
    headers: {
        "Content-Type": "aplicación/JSON"
    }
    })

    .then(response => response.json())
    .then(data => {
        console.log(data);
        const barberoSeleccionado = document.getElementById("barberoSeleccionado");
        barberoSeleccionado.innerHTML = '<option value="">Selecciona un barbero</option>';

        data.forEach(barbero=>{
            const option = document.createElement("option");
            option.value = barbero.usuario_id;
            option.textContent = barbero.nombre;
            barberoSeleccionado.appendChild(option);
        })
    })
    .catch(error => console.error(error));
});

document.getElementById('barberoSeleccionado').addEventListener('change', function() {
    const barberoId = this.value;
    console.log(barberoId);
    if (barberoId) {
        fetch(`/usuario/getHorariosDisponibles/${barberoId}`)
            .then(response => response.json())
            .then(data => {
                mostrarHorariosDisponibles(data);
            })
            .catch(error => console.error('Error al obtener citas:', error));
    } else {
        document.getElementById('horariosDisponibles').innerHTML = '';
    }
});

function mostrarHorariosDisponibles(horarios) {
    const horariosDisponiblesDiv = document.getElementById('horariosDisponibles');
    horariosDisponiblesDiv.innerHTML = " "; // Limpiar contenido previo

    if (horarios.length === 0) {
        horariosDisponiblesDiv.innerHTML = '<p>No hay citas disponibles.</p>';
        return;
    }

    const ul = document.createElement('ul');
    ul.classList.add("list-group");
    horarios.forEach(horario => {
        const li = document.createElement('li');
        li.classList.add("list-group-item", "d-flex", "justify-content-between", "align-items-center");
        li.textContent = `Horario: ${horario.fecha}`; // Asume que la columna es "fecha" y "horario_id"
        
        const button = document.createElement('button');
        button.classList.add("btn", "btn-dark");
        button.textContent = 'Seleccionar';
        button.addEventListener('click', () => seleccionarCita(horario.horario_id));
        button.setAttribute("data-bs-dismiss", "modal");
        li.appendChild(button);
        ul.appendChild(li);
    });

    horariosDisponiblesDiv.appendChild(ul);
}

function seleccionarCita(horarioId) {
    const barberoId = parseInt(document.getElementById('barberoSeleccionado').value,10);
    fetch('/usuario/agendarCita', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            usuario_id: usuarioId,
            barbero_id: barberoId,
            horario_id: horarioId
        })
    })
    .then(response =>{
        if(response.status === 501){
            errorMessage.textContent = "Limite de citas excedido";
            errorMessage.style.display = 'block';
            successMessage.style.display = 'none';
            alert("Limite de citas excedido");
        }
        if(response.status === 500){
            alert("Error en el servidor");
        }
        if(response.status === 201){
            successMessage.textContent = "Cita agendada con exito";
            successMessage.style.display = 'block';    
            errorMessage.style.display = "none";
            alert("Cita agendada con exito");
        }
    })
    .catch(error => console.error('Error al actualizar el estado:', error));
}




document.getElementById('verBarberos').addEventListener('hidden.bs.modal', function () {
    const dynamicContent = this.querySelector('#horariosDisponibles');
    if (dynamicContent) {
        dynamicContent.innerHTML = ''; // Limpia el contenido dinámico
    }
});



