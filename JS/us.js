"use strict";

AOS.init();

"use strict";

AOS.init();

const accordionPaises = document.getElementById('paises');

function crearItemAcordeon(id, title, subtitle, bodyContent) {
    if (!accordionPaises) {
        console.error("No se encontró el contenedor del acordeón con ID 'accordionPaises'.");
        return;
    }
    const newItemHTML = `
        <div class="accordion-item">        
            <h2 class="accordion-header">
                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#${id}" aria-expanded="false" aria-controls="${id}">
                    <div class="teaser">            
                        <div class="title">
                            <h3 id="tte">${title}</h3>
                            <h6 class="theme">${subtitle}</h6>
                        </div>
                    </div>
                    <div class="accordion-toggle">
                        <span class="one"></span>
                        <span class="two"></span>
                    </div>
                </button>
            </h2>
            <div id="${id}" class="accordion-collapse collapse" data-bs-parent="#accordionPaises">
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
    const codigosPaises = 'TUR;DZA;SAU;BHR;QAT;COM;DJI;EGY;ARE;IRQ;JOR;KWT;LBN;LBY;MAR;MRT;OMN;PSE;SYR;SOM;SDN;TUN;YEM'; 

    const apiUrl = `https://restcountries.com/v3.1/alpha?codes=${codigosPaises}&fields=name,capital,region,languages,currencies,translation`;

    try {
        const respuesta = await fetch(apiUrl);

        if (!respuesta.ok) {
            throw new Error(`Error en la solicitud: ${respuesta.status}`);
        }

        const datos = await respuesta.json();

        datos.forEach((pais, index) => {
            
            const nombreEspanol = pais.translations && pais.translations.spa 
                ? pais.translations.spa.common
                : pais.name.common; 

            const capital = pais.capital ? pais.capital[0] : 'No tiene capital'; 
            const region = pais.region || 'Región no disponible';

            const idiomas = pais.languages ? Object.values(pais.languages).join(', ') : 'No disponible';

            const monedasArray = pais.currencies ? Object.values(pais.currencies) : [];
            const monedas = monedasArray.map(moneda => `${moneda.name} (${moneda.symbol || moneda.code})`).join(', ');

            // Usamos el nombre en español en el título
            const title = nombreEspanol; 
            const subtitle = `Capital: ${capital}`;

            const bodyContent = `
                <p><strong>Datos Clave:</strong></p>
                <ul>
                    <li><strong>Región:</strong> ${region}</li>
                    <li><strong>Capital:</strong> ${capital}</li>
                    <li><strong>Idiomas Oficiales:</strong> ${idiomas}</li>
                    <li><strong>Monedas Principales:</strong> ${monedas || 'No disponible'}</li>
                </ul>
            `;
            
            const id = `collapsePais_${index + 4}`;

            crearItemAcordeon(id, title, subtitle, bodyContent);
        });

        console.log(`[PAÍSES] Se han cargado ${datos.length} países específicos en el acordeón.`);

    } catch (error) {
        console.error("Hubo un problema al obtener los datos de los países:", error);
    }
}

document.addEventListener('DOMContentLoaded', cargarDatosPaisesEnAcordeon);
