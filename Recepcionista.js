// Simulación de cobro en recepción
function cobrarRestante(boton) {
    // 1. En un sistema real, aquí abrirías un modal (ventana emergente) 
    // pidiendo el método de pago (Efectivo, Tarjeta Terminal) y confirmando el monto.
    
    if(confirm("¿Confirmar cobro de $500 MXN (Liquidación) y marcar llegada del paciente?")) {
        
        // 2. Encontrar la fila (tr) donde se hizo clic
        const fila = boton.closest('tr');
        
        // 3. Actualizar la celda de Estado de Pago (Columna 4)
        const celdaPago = fila.cells[4];
        celdaPago.innerHTML = '<span class="badge badge-success">Pagado 100%</span>';

        // 4. Actualizar la celda de Estatus de la Cita (Columna 5)
        const celdaEstatus = fila.cells[5];
        celdaEstatus.innerHTML = '<span class="badge badge-primary">En Sala de Espera</span>';

        // 5. Cambiar el botón para que ya no se pueda volver a cobrar
        const celdaAccion = fila.cells[6];
        celdaAccion.innerHTML = '<button class="btn btn-outline btn-sm" disabled>Listo</button>';

        // Aquí mandarías la actualización a tu base de datos SQL Server
        // alert("Pago registrado en el sistema. El doctor ha sido notificado.");
    }
}

// Variable para recordar qué fila estamos cancelando
let filaEnEdicion = null;
let tieneDerechoAReembolso = false;

// Función que se activa al dar clic en el botón rojo "Cancelar"
function iniciarCancelacion(boton, horasParaCita) {
    filaEnEdicion = boton.closest('tr'); 
    
    // Leer los datos de la tabla (Columnas 0, 1 y 2)
    const hora = filaEnEdicion.cells[0].innerText;
    const paciente = filaEnEdicion.cells[1].querySelector('strong').innerText;
    const doctor = filaEnEdicion.cells[2].innerText;

    // Inyectar datos en el Modal
    document.getElementById('cancel-paciente').innerText = paciente;
    document.getElementById('cancel-doctor').innerText = doctor;
    document.getElementById('cancel-hora').innerText = hora;

    // Lógica de reembolso
    const alertaDiv = document.getElementById('alerta-reembolso');
    if (horasParaCita > 24) {
        tieneDerechoAReembolso = true;
        alertaDiv.className = 'alerta-validacion alerta-success';
        alertaDiv.innerHTML = '✅ <strong>Más de 24 horas restantes.</strong><br>El sistema procesará el reembolso del 50% del anticipo automáticamente.';
    } else {
        tieneDerechoAReembolso = false;
        alertaDiv.className = 'alerta-validacion alerta-danger';
        alertaDiv.innerHTML = '⚠️ <strong>Menos de 24 horas restantes.</strong><br>Política de Clínica: No se procesará reembolso de anticipo.';
    }

    // Mostrar la ventana emergente
    document.getElementById('modal-cancelacion').classList.remove('hidden');
}

// Función para el botón "Volver"
function cerrarModalCancelacion() {
    document.getElementById('modal-cancelacion').classList.add('hidden');
    filaEnEdicion = null;
}

// Función para el botón "Confirmar Cancelación"
function procesarCancelacion() {
    if (!filaEnEdicion) return;

    // Cambiar Estado Pago a "N/A"
    const celdaPago = filaEnEdicion.cells[4];
    celdaPago.innerHTML = '<span class="badge" style="background-color: #f3f4f6; color: #6b7280;">N/A</span>';

    // Cambiar Estatus a "Cancelada"
    const celdaEstatus = filaEnEdicion.cells[5];
    celdaEstatus.innerHTML = '<span class="badge" style="background-color: #fee2e2; color: #dc2626;">Cancelada</span>';

    // Desactivar la fila visualmente
    filaEnEdicion.style.opacity = "0.6";
    
    // Quitar botones de acción
    const celdaAccion = filaEnEdicion.cells[6];
    celdaAccion.innerHTML = '<span class="text-muted">Espacio Liberado</span>';

    // Mensaje final
    const tipoReembolso = tieneDerechoAReembolso ? "CON REEMBOLSO procesado" : "SIN REEMBOLSO (Política aplicada)";
    alert(`--- COMPROBANTE ---\n\nCita cancelada exitosamente.\nEstado: ${tipoReembolso}\n\n✔️ Espacio liberado en Agenda.\n✔️ SMS/Correo enviados.\n✔️ Auditoría registrada.`);

    cerrarModalCancelacion();
}