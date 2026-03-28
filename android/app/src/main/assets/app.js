
        let appointmentData = { doctor: '', time: '', sucursal: '' };

        function nextStep(step, doctorName = null) {
            if(doctorName) appointmentData.doctor = doctorName;
            
            if(step === 3) {
                appointmentData.sucursal = document.getElementById('sucursal').value;
                if(!appointmentData.time) return alert("Por favor selecciona un horario");
                
                document.getElementById('summary-doctor').innerText = appointmentData.doctor;
                document.getElementById('summary-time').innerText = appointmentData.time;
                document.getElementById('summary-sucursal').innerText = appointmentData.sucursal;
            }

            document.querySelectorAll('.step-container').forEach(el => el.classList.add('hidden'));
            document.getElementById(`step${step}`).classList.remove('hidden');
            
            if(step === 2) document.getElementById('selected-doctor').innerText = "Doctor elegido: " + appointmentData.doctor;
            
            updateIndicators(step);
        }

        function prevStep(step) {
            document.querySelectorAll('.step-container').forEach(el => el.classList.add('hidden'));
            document.getElementById(`step${step}`).classList.remove('hidden');
            updateIndicators(step);
        }

        function selectTime(time) {
            appointmentData.time = time;
        }

        function updateIndicators(currentStep) {
            for(let i=1; i<=4; i++) {
                let ind = document.getElementById(`step${i}-indicator`);
                if(i === currentStep) {
                    ind.className = "step active";
                } else if (i < currentStep) {
                    ind.className = "step completed";
                } else {
                    ind.className = "step";
                }
            }
        }

        function simulatePayment(isSuccess) {
            // 1. Leer lo que el usuario escribió
            const tarjetaInput = document.getElementById('numero-tarjeta').value;

            // 2. Validar que no esté vacío
            if (tarjetaInput.trim() === "") {
                alert("Por favor, ingresa tu número de tarjeta antes de pagar.");
                return; // Esto detiene la función para que no intente pagar
            }
            const btn = document.getElementById('btn-pagar');
            const errorMsg = document.getElementById('payment-error');
            
            btn.innerText = "Validando...";
            btn.disabled = true;
            errorMsg.classList.add('hidden');

            setTimeout(() => {
                btn.innerText = "Pagar y Agendar";
                btn.disabled = false;

                if(isSuccess) {
                    nextStep(4);
                } else {
                    errorMsg.classList.remove('hidden');
                }
            }, 1500);
        }

        function toggleAuth() {
    // Alterna entre mostrar Login o Registro
    document.getElementById('login-form').classList.toggle('hidden');
    document.getElementById('register-form').classList.toggle('hidden');
}

function iniciarSesion() {
    // 1. Ocultar la sección de autenticación
    document.getElementById('auth-section').classList.add('hidden');
    
    // 2. Mostrar la sección principal (y el footer si lo ocultaste)
    document.getElementById('main-section').classList.remove('hidden');
    // document.getElementById('footer-section').classList.remove('hidden'); // Descomenta si ocultaste el footer
    
    // Opcional: Actualizar el nombre en la barra de navegación
    document.querySelector('.user-info').innerText = "👤 Hola, " + document.getElementById('login-user').value;
}


function registrarUsuario() {
    const name = document.getElementById('reg-name').value;
    const user = document.getElementById('reg-user').value;
    const pass = document.getElementById('reg-pass').value;

    if(name.trim() === "" || user.trim() === "" || pass.trim() === "") {
        alert("Por favor llena todos los campos para registrarte.");
        return;
    }

    // Simulamos que se registró y hace login automáticamente
    alert("¡Registro exitoso! Bienvenido a CasaMedica, " + name);
    entrarAlSistema(name);
}

function entrarAlSistema(nombreUsuario) {
    // 1. Ocultamos la sección de autenticación
    document.getElementById('auth-section').classList.add('hidden');
    
    // 2. Mostramos el flujo principal de citas
    document.getElementById('main-app').classList.remove('hidden');
    
    // 3. Actualizamos el nombre en el Navbar
    document.getElementById('nav-user-info').innerText = "👤 Hola, " + nombreUsuario;
}

// ==================== LÓGICA DEL MENÚ LATERAL ====================

function cambiarVista(vista) {
    // 1. Ocultar todas las vistas
    document.getElementById('vista-agendar').classList.add('hidden');
    document.getElementById('vista-mis-citas').classList.add('hidden');

    // 2. Quitar la clase 'active' de todos los items del menú
    document.getElementById('menu-agendar').classList.remove('active');
    document.getElementById('menu-citas').classList.remove('active');

    // 3. Mostrar la vista solicitada y activar su menú
    document.getElementById(`vista-${vista}`).classList.remove('hidden');
    document.getElementById(`menu-${vista}`).classList.add('active');
}

function cancelarCita(idCita) {
    // Pedir confirmación al usuario
    const confirmacion = confirm("¿Estás seguro de que deseas cancelar esta cita médica? Esta acción no se puede deshacer.");
    
    if (confirmacion) {
        // Encontrar la cita en el DOM
        const elementoCita = document.getElementById(idCita);
        
        if (elementoCita) {
            // Eliminar el nodo visualmente
            elementoCita.remove();
            
            // A futuro: Aquí enviarías la petición a tu Backend en Python/Java 
            // para ejecutar el UPDATE o DELETE correspondiente en SQL Server.
            
            alert("Cita cancelada exitosamente.");
            
            // Verificar si la lista de citas quedó vacía
            const listaCitas = document.getElementById('lista-citas');
            if (listaCitas.children.length === 0) {
                document.getElementById('mensaje-sin-citas').classList.remove('hidden');
            }
        }
    }
}
