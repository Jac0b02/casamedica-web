
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
