"use strict";

AOS.init();

"use strict";

AOS.init();

const accordionPaises = document.getElementById('paises');
const PAISES_POR_CARGA = 3;
let todosLosPaises = [];
let paisesMostrados = 0;

function crearItemAcordeon(id, title, subtitle, bodyContent) {
    if (!accordionPaises) {
        console.error("No se encontró el contenedor del acordeón con ID 'paises'.");
        return;
    }
    const newItemHTML = `
        <div class="accordion-item">        
            <h2 class="accordion-header">
                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#${id}" aria-expanded="false" aria-controls="${id}">
                    <div class="teaser">            
                        <div class="title">
                            <h3 id="tte">${title}</h3>
                        </div>
                    </div>
                    <div class="accordion-toggle">
                        <span class="one"></span>
                        <span class="two"></span>
                    </div>
                </button>
            </h2>
            <div id="${id}" class="accordion-collapse collapse" data-bs-parent="#paises">
                <div class="accordion-body">
                    <div class="content">
                        ${bodyContent}
                    </div>
                </div>
            </div>
        </div>
    `;
    
    accordionPaises.insertAdjacentHTML('beforeend', newItemHTML);
}

async function cargarDatosPaisesEnAcordeon() {
    const codigosPaises = 'TUR,DZA,SAU,BHR,QAT,COM,DJI,EGY,ARE,IRQ,JOR,KWT,LBN,LBY,MAR,MRT,OMN,PSE,SYR,SOM,SDN,TUN,YEM'; 

    const apiUrl = `https://restcountries.com/v3.1/alpha?codes=${codigosPaises}&fields=name,capital,region,languages,currencies,translations`;

    try {
        const respuesta = await fetch(apiUrl);

        if (!respuesta.ok) {
            throw new Error(`Error en la solicitud: ${respuesta.status}`);
        }

        const datos = await respuesta.json();
        
        todosLosPaises = datos;

        mostrarSiguienteGrupoPaises(); 

    } catch (error) {
        console.error("Hubo un problema al obtener los datos de los países:", error);
    }
}

function mostrarSiguienteGrupoPaises() {
    const botonMasExistente = document.getElementById('btnCargarMas');
    if (botonMasExistente) {
        botonMasExistente.remove();
    }

    const inicio = paisesMostrados;
    const fin = Math.min(paisesMostrados + PAISES_POR_CARGA, todosLosPaises.length);

    for (let i = inicio; i < fin; i++) {
        const pais = todosLosPaises[i];

        const nombreEspanol = pais.translations && pais.translations.spa 
            ? pais.translations.spa.common
            : pais.name.common; 

        const capital = pais.capital ? pais.capital[0] : 'No tiene capital'; 
        const region = pais.region || 'Región no disponible';

        const idiomas = pais.languages ? Object.values(pais.languages).join(', ') : 'No disponible';

        const monedasArray = pais.currencies ? Object.values(pais.currencies) : [];
        const monedas = monedasArray.map(moneda => `${moneda.name} (${moneda.symbol || moneda.code})`).join(', ');

        const title = nombreEspanol; 
        const subtitle = `Capital: ${capital}`;

        const bodyContent = `
            <p class="fact"><strong id="fct">Datos Clave:</strong></p>
            <ul class="fact">
                <li><strong>Continente:</strong> ${region}</li>
                <li><strong>Capital:</strong> ${capital}</li>
                <li><strong>Idiomas Oficiales:</strong> ${idiomas}</li>
                <li><strong>Monedas Principales:</strong> ${monedas || 'No disponible'}</li>
            </ul>
        `;
        
        const id = `collapsePais_${i + 1}`; 

        crearItemAcordeon(id, title, subtitle, bodyContent);
    }

    paisesMostrados = fin;
    
    console.log(`[PAGINACION] Se han cargado ${paisesMostrados} de ${todosLosPaises.length} países.`);

    if (paisesMostrados < todosLosPaises.length) {
        const botonMasHTML = `
            <div class="d-flex justify-content-center my-4" id="btnCargarMas">
                <button class="btn btnPaises fw-bold" onclick="mostrarSiguienteGrupoPaises()">
                    Mostrar más países...
                </button>
            </div>
        `;
        accordionPaises.insertAdjacentHTML('afterend', botonMasHTML);
        
    }
}

window.onload = cargarDatosPaisesEnAcordeon;
