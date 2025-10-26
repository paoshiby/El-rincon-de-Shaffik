"use strict";

const tooltipsMap = {};
const cerrarModal = document.getElementById('buut');

AOS.init();

function tooltipsWithEvents(selector, titleText, placement, forcePlacement, useBodyContainer) {
    const elements = document.querySelectorAll(selector);

    elements.forEach((element, index) => {
        const key = `${selector}-${index}`; 

        const options = {
            title: titleText,
            placement: placement
        };

        if (forcePlacement) {
            options.fallbackPlacement = 'none';
        }

        element.addEventListener('mouseenter', () => {
            if (!tooltipsMap[key]) {
                element.removeAttribute('data-bs-toggle'); 
                tooltipsMap[key] = new bootstrap.Tooltip(element, options);
            }
            tooltipsMap[key].show();
        });

        element.addEventListener('mouseleave', () => {
            if (tooltipsMap[key]) {
                tooltipsMap[key].hide();
            }
        });
    });
}
// Tarjetas
tooltipsWithEvents(
    '.card-cover',
    'País Árabe', 
    'bottom', 
    true
);
// Video
tooltipsWithEvents(
    '#vid', 
    'Samia Gammal', 
    'bottom',
    true
);
function mostrarEstadoTooltips() {
    const totalTooltips = Object.keys(tooltipsMap).length;
    console.log(`[ESTADO] Total de elementos con Tooltip inicializado: ${totalTooltips}`);
}
// Página
function verificarScroll(){
    console.log("El usuario se desplazó por la página");
}
window.addEventListener("scroll",verificarScroll);
// Cerrar
function cerrar(){
    console.log("El usuario cerró el modal");
}
cerrarModal.addEventListener("click", cerrar);