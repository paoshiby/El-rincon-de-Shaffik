"use strict";

const userIn = document.getElementById('user-in');
const passIn = document.getElementById('pass-in');
const btnSignIn = document.querySelector('.login-form .sign-in-htm .button');
const nombre = document.getElementById('nuser');
const apellido = document.getElementById('luser');
const usuario = document.getElementById('user');
const passw = document.getElementById('pass');
const pass = document.getElementById('passw');
const emailLocal = document.getElementById('email');
const emailDominio = document.getElementById('dom-select');
const fNacimiento = document.getElementById('bday');
const formContainer = document.querySelector('.log-form'); 
const btnRegistro = document.querySelector('.breg'); 
//------------------------------------------------------------------------------------
//                                FUNCIONES COMUNES
//------------------------------------------------------------------------------------
function aplicarEstilo(elemento, esValido) {
    const colorExito = "#5bc71cff"; 
    const colorError = "red"; 
        
    elemento.style.border = esValido 
        ? `2px solid ${colorExito}`
        : `2px solid ${colorError}`;
}

function mostrarErrorTemporal(elementoReferencia, mensajeError) {
    const errorExistente = elementoReferencia.parentNode.querySelector('.error-temporal');
    if (errorExistente) {
        errorExistente.remove();
    }
    
    const errorDisplay = document.createElement('div');
    errorDisplay.textContent = `❌ ${mensajeError}`;
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

function clearErrorOnSuccess(elemento) {
    const elementoReferencia = elemento.classList.contains('input-group') ? elemento : elemento;
    
    if (elementoReferencia.nextElementSibling && elementoReferencia.nextElementSibling.classList.contains('error-temporal')) {
        elementoReferencia.nextElementSibling.remove();
    }
}

//-------------------------------------------------------------
//              VALIDACIÓN INICIO DE SESIÓN
//-------------------------------------------------------------

function iniciarSesionValidation(event) {
    event.preventDefault();
    let valido = true;
    const username = userIn.value.trim();
    const password = passIn.value.trim();

    aplicarEstilo(userIn, true);
    aplicarEstilo(passIn, true);
    clearErrorOnSuccess(userIn);
    clearErrorOnSuccess(passIn);

    
    if (username.length === 0) {
        valido = false;
        mostrarErrorTemporal(userIn, "El campo usuario no puede estar vacío.");
        aplicarEstilo(userIn, false);
    } 

    if (password.length === 0) {
        valido = false;
        mostrarErrorTemporal(passIn, "El campo contraseña no puede estar vacío.");
        aplicarEstilo(passIn, false);
    } 
    
    if (valido) {
        alert(`🎉 ¡Bienvenido, ${username}! Has iniciado sesión con éxito.`);
        
        userIn.value = '';
        passIn.value = '';
    }
}
//-------------------------------------------------------------
//              VALIDACIÓN FORMULARIO REGISTRO
//-------------------------------------------------------------

// Función que valida la complejidad de la contraseña (passw)
function confPass(passwordValue) {
    const requirements = [
        { regex: /.{6,8}/, text: 'Debe tener entre 6 y 8 caracteres.' },
        { regex: /[A-Z]/,    text: 'Debe contener al menos una letra mayúscula.' },
        { regex: /[a-z]/,    text: 'Debe contener al menos una letra minúscula.' },
        { regex: /[0-9]/,    text: 'Debe contener al menos un número.' },
        { regex: /[^a-zA-Z0-9\s]/, text: 'Debe contener al menos un carácter especial.' }
    ];

    let valid = true;
    const results = requirements.map(req => {
        const passed = req.regex.test(passwordValue);

        if (!passed) {
            valid = false;
        }
        return `<div class="req-item ${passed ? 'valid' : 'invalid'}">
                    ${passed ? '✅' : '❌'} ${req.text}
                </div>`;
    }).join(''); 

    return { valid, html: `<div class="requirements-list">${results}</div>` };
}

// Función que valida la complejidad del usuario
function usuarioCond(usuarioValue){
    const requirements = [
        { regex: /.{4,12}/, text: 'Debe tener entre 4 y 12 caracteres.' },
        { regex: /^[a-zA-Z0-9]+$/, text: 'Solo puede contener letras y números.' }
    ];

    let valid = true;
    const results = requirements.map(req => {
        const passed = req.regex.test(usuarioValue);
        if (!passed) {
            valid = false;
        }
        // MODIFICADO: Usa <div> y las clases CSS correctas
        return `<div class="req-item ${passed ? 'valid' : 'invalid'}">
                    ${passed ? '✅' : '❌'} ${req.text}
                </div>`;
    }).join('');
    
   
    return { valid, html: `<div class="requirements-list">${results}</div>` };
}

// Función para mostrar requisitos de usuario/contraseña debajo del campo
function showRequirements(inputElement, validationResult) {
    // La lógica para ELIMINAR requisitos anteriores es crucial (Q3)
    const existingReqs = inputElement.parentNode.querySelector('.requirements-display');
    if (existingReqs) {
        existingReqs.remove();
    }
    
    if (validationResult.html) {
        const reqDisplay = document.createElement('div');
        reqDisplay.className = 'requirements-display';
        reqDisplay.innerHTML = validationResult.html;
        
        // ESTILOS PARA QUE EL CONTENEDOR SE VEA COMO UN INPUT (.in)
        reqDisplay.style.fontSize = '0.85em';
        reqDisplay.style.marginTop = '5px';
        reqDisplay.style.padding = '10px 15px'; // Simula el padding de .in
        reqDisplay.style.background = 'rgba(255,255,255,.1)';
        reqDisplay.style.borderRadius = '25px';
        reqDisplay.style.color = 'var(--color-tres)'; // Asegura el color del texto

        inputElement.parentNode.insertBefore(reqDisplay, inputElement.nextSibling);
    }
}

// Event listeners para mostrar requisitos al hacer foco
usuario.addEventListener('focus', () => {
    const result = usuarioCond(usuario.value);
    showRequirements(usuario, result);
});
usuario.addEventListener('input', () => {
    const result = usuarioCond(usuario.value);
    showRequirements(usuario, result);
});

passw.addEventListener('focus', () => {
    const result = confPass(passw.value);
    showRequirements(passw, result);
});
passw.addEventListener('input', () => {
    const result = confPass(passw.value);
    showRequirements(passw, result);
});

function validacion(event){
    event.preventDefault();

    let valido = true;

    // --- Validación Nombre ---
    if (nombre.value.trim().length < 3){
        valido = false;
        mostrarErrorTemporal(nombre, "El nombre debe tener mínimo 3 letras."); 
        aplicarEstilo(nombre, false);
    } else {
        aplicarEstilo(nombre, true);
    }

    // --- Validación Apellido  ---
    if (apellido.value.trim().length < 2){
        valido = false;
        mostrarErrorTemporal(apellido, "El apellido debe tener mínimo 2 letras.");
        aplicarEstilo(apellido, false);
    } else {
        aplicarEstilo(apellido, true);
    }
    
    // --- Validación Usuario ---
    const userResult = usuarioCond(usuario.value.trim());
    if (!userResult.valid) {
        valido = false;
        mostrarErrorTemporal(usuario, "El usuario no cumple con los requisitos. Ver debajo.");
        aplicarEstilo(usuario, false);
        showRequirements(usuario, userResult);
    } else {
        aplicarEstilo(usuario, true);
        const existingReqs = usuario.parentNode.querySelector('.requirements-display');
        if (existingReqs) existingReqs.remove();
    }

    // --- Validación Contraseña (passw) ---
    const passwResult = confPass(passw.value.trim());
    if (!passwResult.valid) {
        valido = false;
        mostrarErrorTemporal(passw, "La contraseña no cumple con los requisitos. Ver debajo.");
        aplicarEstilo(passw, false);
        showRequirements(passw, passwResult);
    } else {
        aplicarEstilo(passw, true);
        const existingReqs = passw.parentNode.querySelector('.requirements-display');
        if (existingReqs) existingReqs.remove();
    }
    
    // --- Validación Repetir Contraseña (pass) ---
    if (pass.value.trim() !== passw.value.trim() || pass.value.trim() === '') {
        valido = false;
        mostrarErrorTemporal(pass, "Las contraseñas no coinciden o el campo está vacío.");
        aplicarEstilo(pass, false);
    } else {
        aplicarEstilo(pass, true);
    }
    
    // --- Validación Email (local + dominio) ---
    if (emailLocal.value.trim() === '' || emailDominio.value === '') {
        valido = false;
        const emailGroup = emailLocal.closest('.input-group'); 
        mostrarErrorTemporal(emailGroup, "Debe completar la dirección de email y seleccionar un dominio.");
        aplicarEstilo(emailLocal, false);
        aplicarEstilo(emailDominio, false);
    } else {
        aplicarEstilo(emailLocal, true);
        aplicarEstilo(emailDominio, true);
    }
    
    // --- Validación Fecha de Nacimiento ---
    if (fNacimiento.value.trim() === ''){
        valido = false;
        mostrarErrorTemporal(fNacimiento, "Debe seleccionar una fecha de nacimiento.");
        aplicarEstilo(fNacimiento, false);
    } else {
        const fechaNac = new Date(fNacimiento.value);
        const hoy = new Date();
        if (fechaNac > hoy) {
            valido = false;
            mostrarErrorTemporal(fNacimiento, "La fecha de nacimiento no puede ser futura.");
            aplicarEstilo(fNacimiento, false);
        } else {
            aplicarEstilo(fNacimiento, true);
        }
    }
    
    // --- Envío del formulario ---
    if (valido) {
        alert("✅ ¡Formulario enviado con éxito!"); 
        // Como no tenemos el <form> completo, simulamos el reset de los campos principales
        nombre.value = '';
        apellido.value = '';
        usuario.value = '';
        passw.value = '';
        pass.value = '';
        emailLocal.value = '';
        emailDominio.value = '';
        fNacimiento.value = '';

        // Limpiar estilos de éxito después del reset
        aplicarEstilo(nombre, true); 
        aplicarEstilo(apellido, true);
        aplicarEstilo(usuario, true);
        aplicarEstilo(passw, true);
        aplicarEstilo(pass, true);
        aplicarEstilo(emailLocal, true);
        aplicarEstilo(emailDominio, true);
        aplicarEstilo(fNacimiento, true);
    }
}

if (btnSignIn) {
    btnSignIn.addEventListener('click', iniciarSesionValidation);
}

if (btnRegistro) {
    btnRegistro.addEventListener('click', validacion);
}

nombre.addEventListener('blur', function() { 
    if (nombre.value.trim().length < 3) {
        mostrarErrorTemporal(nombre, "El nombre debe tener mínimo 3 letras."); 
        aplicarEstilo(nombre, false);
    } else {
        aplicarEstilo(nombre, true);
        clearErrorOnSuccess(nombre);
    }
}); 

apellido.addEventListener('blur', function() { 
    if (apellido.value.trim().length < 2) {
        mostrarErrorTemporal(apellido, "El apellido debe tener mínimo 2 letras.");
        aplicarEstilo(apellido, false);
    } else {
        aplicarEstilo(apellido, true);
        clearErrorOnSuccess(apellido);
    }
});

function validateEmailOnBlur() {
    const isEmailValid = emailLocal.value.trim() !== '' && emailDominio.value !== '';
    const emailGroup = emailLocal.closest('.input-group'); 

    if (!isEmailValid) {
        mostrarErrorTemporal(emailGroup, "Debe completar la dirección de email y seleccionar un dominio.");
        aplicarEstilo(emailLocal, false);
        aplicarEstilo(emailDominio, false);
    } else {
        aplicarEstilo(emailLocal, true);
        aplicarEstilo(emailDominio, true);
        clearErrorOnSuccess(emailGroup); 
    }
}
emailLocal.addEventListener('blur', validateEmailOnBlur);
emailDominio.addEventListener('blur', validateEmailOnBlur);

fNacimiento.addEventListener('blur', function() {
    const fechaValor = fNacimiento.value.trim();
    let isDateValid = true;
    let errorMessage = "";

    if (fechaValor === '') {
        isDateValid = false;
        errorMessage = "Debe seleccionar una fecha de nacimiento.";
    } else {
        const fechaNac = new Date(fechaValor);
        const hoy = new Date();
        // Ajustamos hoy a medianoche para que la comparación de fechas sea solo por día
        hoy.setHours(0, 0, 0, 0); 
        
        if (fechaNac > hoy) {
            isDateValid = false;
            errorMessage = "La fecha de nacimiento no puede ser futura.";
        }
    }

    if (!isDateValid) {
        mostrarErrorTemporal(fNacimiento, errorMessage);
        aplicarEstilo(fNacimiento, false);
    } else {
        aplicarEstilo(fNacimiento, true);
        clearErrorOnSuccess(fNacimiento);
    }
});