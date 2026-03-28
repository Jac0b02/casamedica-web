// Variable global para identificar qué cita estamos atendiendo
let citaActualID = null;

// Función para abrir el Expediente Clínico (Modal)
function abrirConsulta(idCita, nombrePaciente, horaCita) {
    citaActualID = idCita;
    
    // Inyectar datos del paciente en el modal
    document.getElementById('consulta-paciente').innerText = nombrePaciente;
    document.getElementById('consulta-hora').innerText = horaCita;
    
    // Limpiar los campos por si tenían datos de un paciente anterior
    document.getElementById('notas-medicas').value = '';
    document.getElementById('diagnostico').value = '';
    document.getElementById('receta').value = '';

    // Mostrar el modal
    document.getElementById('modal-consulta').classList.remove('hidden');
}

// Función para cerrar el modal sin guardar
function cerrarConsulta() {
    document.getElementById('modal-consulta').classList.add('hidden');
    citaActualID = null;
}

// Función secundaria simulada
function guardarProgreso() {
    alert("Borrador guardado exitosamente. Puede continuar la consulta más tarde.");
}

// Función para concluir la cita médica
function finalizarConsulta() {
    // 1. Validar que al menos haya un diagnóstico
    const diagnostico = document.getElementById('diagnostico').value;
    if (diagnostico.trim() === '') {
        alert("Por favor ingrese un diagnóstico antes de finalizar la consulta.");
        return;
    }

    // 2. Modificar visualmente la tarjeta del paciente en la agenda
    const tarjetaCita = document.getElementById(citaActualID);
    
    // Cambiamos clases CSS
    tarjetaCita.classList.remove('status-waiting');
    tarjetaCita.classList.add('status-done');
    
    // Actualizamos el badge de estatus
    const badgeDiv = tarjetaCita.querySelector('.agenda-time .badge');
    badgeDiv.className = 'badge badge-success';
    badgeDiv.innerText = 'Atendido';

    // Actualizamos el botón para que ya no se pueda volver a "Iniciar Consulta"
    const accionDiv = tarjetaCita.querySelector('.agenda-action');
    accionDiv.innerHTML = '<button class="btn btn-outline" disabled>Consulta Terminada</button>';

    // 3. Simular guardado en Base de Datos y cierre
    alert("Consulta finalizada. \n\n✔️ Expediente actualizado.\n✔️ Receta generada en PDF.");
    cerrarConsulta();
}
// Función para cancelar la cita desde el portal médico
function cancelarCitaDoctor(idCita) {
    // 1. Pedir confirmación
    const confirmacion = confirm("¿Estás seguro de que deseas cancelar esta cita? Se liberará el horario en la agenda.");
    
    if (confirmacion) {
        // 2. Buscar la tarjeta de la cita en el DOM
        const elementoCita = document.getElementById(idCita);
        
        if (elementoCita) {
            // 3. Eliminar el nodo visualmente
            elementoCita.remove();
            
            // 4. (Opcional) Actualizar el KPI de Citas Programadas visualmente
            const contadorCitas = document.querySelector('.kpi-card:first-child .kpi-number');
            if (contadorCitas) {
                let totalActual = parseInt(contadorCitas.innerText);
                if (totalActual > 0) {
                    contadorCitas.innerText = totalActual - 1;
                }
            }
        }
    }
}