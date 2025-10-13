"use strict";

const nombre = document.getElementById('contname');
const apellido = document.getElementById('contlastname');
const tel = document.getElementById('contphone');
const sex = document.getElementsByName('gender');
const asunto = document.getElementById('sub');
const mensaje = document.getElementById('message');
const form = document.getElementById('formulario');

function aplicarEstilo(elemento, esValido) {
        const colorExito = "#00ff3cff"; // Un verde oscuro y visible (puedes usar 'green' si prefieres)
        const colorError = "red"; 
        
        // Usamos Template Literals para aplicar el color
        elemento.style.border = esValido 
            ? `3px solid ${colorExito}` // Borde de 2px para que se note el cambio
            : `2px solid ${colorError}`;
    }

function mostrarErrorTemporal(elementoReferencia, mensaje) {
    const errorExistente = elementoReferencia.parentNode.querySelector('.error-temporal');
    if (errorExistente) {
        errorExistente.remove();
    }
    
    const errorDisplay = document.createElement('div');
    errorDisplay.textContent = `❌ ${mensaje}`;
    errorDisplay.style.color = "red";
    errorDisplay.style.fontWeight = "bold";
    errorDisplay.style.marginTop = "5px";
    errorDisplay.style.fontSize = "0.9em";
    errorDisplay.className = "error-temporal"; 
    
    elementoReferencia.parentNode.insertBefore(errorDisplay, elementoReferencia.nextSibling);

    setTimeout(() => {
        if (elementoReferencia.parentNode.contains(errorDisplay)) {
            errorDisplay.remove();
        }
    }, 5000);
}


function validacion(event){
    event.preventDefault();

    let valido = true;
    // --- Validación Nombre ---
    if (nombre.value.length < 3){
        valido = false;
        mostrarErrorTemporal(nombre, "El nombre debe tener mínimo 3 letras."); 
        aplicarEstilo(nombre, false);
    }else{
        aplicarEstilo(nombre, true);
    }

    // --- Validación Apellido  ---
    if (apellido.value.length < 2){
        valido = false;
        mostrarErrorTemporal(apellido, "El apellido debe tener mínimo 2 letras.");
        aplicarEstilo(apellido, false);
    }else{
        aplicarEstilo(apellido, true);
    }

    // --- Validación Teléfono ---
    if (tel.value.length < 8){
        valido = false;
        const telGroup = tel.closest('.input-group'); 
        mostrarErrorTemporal(telGroup, "El teléfono debe tener 9 dígitos.");
        aplicarEstilo(tel, false);
    }else{
        aplicarEstilo(tel, true);
    }
    // --- Validación Sexo ---
    let sexoSeleccionado = false;
    for (let i = 0; i < sex.length; i++) {
        if (sex[i].checked) {
            sexoSeleccionado = true;
            break; 
        }
    }
    if (!sexoSeleccionado) {
        valido = false;
        
        const labelSexo = form.querySelector('label[for="gender"]');
        
        let opcionesRadio = labelSexo ? labelSexo.nextElementSibling : null;

        if (opcionesRadio) {
            mostrarErrorTemporal(opcionesRadio, "Debe seleccionar una opción de Sexo.");
        } else {
            const contenedorColumna = labelSexo.closest('.col-md-6');
            mostrarErrorTemporal(contenedorColumna, "Debe seleccionar una opción de Sexo.");
        }
    }
    // --- Validación Asunto ---
    if (asunto.value === "1") { 
        valido = false;
        mostrarErrorTemporal(asunto, "Debe seleccionar un asunto distinto de 'Otro'.");
        aplicarEstilo(asunto, false);
    } else {
        aplicarEstilo(asunto, true);
    }

    // --- Validación  Mensaje ---
    if (mensaje.value.length < 7) { 
        valido = false;
        mostrarErrorTemporal(mensaje, "El mensaje debe tener al menos 7 caracteres.");
        aplicarEstilo(mensaje, false);
    } else {
        aplicarEstilo(mensaje, true);
    }
    
    if (valido) {
        alert("✅ ¡Formulario enviado con éxito!"); 
        form.reset();
    }
}

form.addEventListener("submit", validacion);

nombre.addEventListener('blur', function() { 
    if (nombre.value.length < 3) {
        mostrarErrorTemporal(nombre, "El nombre debe tener mínimo 3 letras."); 
        aplicarEstilo(nombre, false);
    } else {
        aplicarEstilo(nombre, true);
        if (nombre.nextElementSibling && nombre.nextElementSibling.classList.contains('error-temporal')) {
            nombre.nextElementSibling.remove();
        }
    }
}); 
apellido.addEventListener('blur', function() { 
    if (apellido.value.length < 2) {
        mostrarErrorTemporal(apellido, "El apellido debe tener mínimo 2 letras.");
        aplicarEstilo(apellido, false);
    } else {
        aplicarEstilo(apellido, true);
        if (apellido.nextElementSibling && apellido.nextElementSibling.classList.contains('error-temporal')) {
            apellido.nextElementSibling.remove();
        }
    }
}); 
tel.addEventListener('blur', function() { 
    if (tel.value.length < 8) {
        const telGroup = tel.closest('.input-group');
        mostrarErrorTemporal(telGroup, "El teléfono debe tener 9 dígitos.");
        aplicarEstilo(tel, false);
    } else {
        aplicarEstilo(tel, true);
        const telGroup = tel.closest('.input-group');
        if (telGroup.nextElementSibling && telGroup.nextElementSibling.classList.contains('error-temporal')) {
            telGroup.nextElementSibling.remove();
        }
    }
}); 
asunto.addEventListener('change', function() {
    if (asunto.value === "1") { 
        mostrarErrorTemporal(asunto, "Debe seleccionar un asunto distinto de 'Otro'.");
        aplicarEstilo(asunto, false);
    } else {
        aplicarEstilo(asunto, true);
        if (asunto.nextElementSibling && asunto.nextElementSibling.classList.contains('error-temporal')) {
            asunto.nextElementSibling.remove();
        }
    }
});
mensaje.addEventListener('blur', function() { 
    if (mensaje.value.length < 10) {
        mostrarErrorTemporal(mensaje, "El mensaje debe tener al menos 10 caracteres.");
        aplicarEstilo(mensaje, false);
    } else {
        aplicarEstilo(mensaje, true);
        // Limpiar mensaje de error si existe
        if (mensaje.nextElementSibling && mensaje.nextElementSibling.classList.contains('error-temporal')) {
            mensaje.nextElementSibling.remove();
        }
    }
});