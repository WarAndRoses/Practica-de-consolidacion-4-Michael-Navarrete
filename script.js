// conectar
async function* traerPersonajes(start, end) {
  for (let i = start; i <= end; i++) {
    const response = await fetch(`https://swapi.tech/api/people/${i}/`);
    const data = await response.json();
    
    if (data.message === 'ok') {
      yield data.result; // Acceder a la propiedad 'result' que contiene los datos del personaje
    } else {
      console.log('Error al obtener el personaje', i);
    }
  }
}



function mostrarPersonajes(datitos) {
  const mostrador = document.getElementById('mostrador');
  console.log(datitos);
  
  // Crear un contenedor único 
  const infoPjs = document.createElement('div');
  infoPjs.classList.add('cajasPjs');
  
// info de los pjs
  const nombre = document.createElement('h3');
  nombre.textContent = datitos.properties.name;
  infoPjs.appendChild(nombre);

 
  const altura = document.createElement('p');
  altura.textContent = `Estatura: ${datitos.properties.height} cm`;
  infoPjs.appendChild(altura);

 
  const peso = document.createElement('p');
  peso.textContent = `Peso: ${datitos.properties.mass} kg`;
  infoPjs.appendChild(peso);
  
  
  mostrador.appendChild(infoPjs);
}

async function cargarPersonajes(range) {
  const [start, end] = range.split('-').map(Number); 

  const mostrador = document.getElementById('mostrador');
  mostrador.innerHTML = ''; 

 
  const section = traerPersonajes(start, end);
  for await (let character of section) {
      mostrarPersonajes(character); 
  }
}

// Función para manejar el evento de mouse 
let isLoading = false; // esto es para que no se muestren varias veces la info 

function EntrarMouse() {
  const sections = document.querySelectorAll('.section');
  
  sections.forEach(section => {
      section.addEventListener('mouseenter', (event) => {
          if (isLoading) return; 
          
          const range = event.target.closest('.section').dataset.range; 
          isLoading = true; 
          cargarPersonajes(range).then(() => {
            isLoading = false; 
          }); 
      });

      section.addEventListener('mouseleave', () => {
         
          const mostrador = document.getElementById('mostrador');
          mostrador.innerHTML = ''; 
      });
  });
}
const refranes = [
 "Hazlo o no lo hagas. No hay intento Una lección sobre el compromiso y el poder de darlo todo.", 
"El miedo es el camino hacia el Lado Oscuro. El miedo lleva a la ira, la ira lleva al odio, el odio lleva al sufrimiento", 
"La muerte es una parte natural de la vida. Alégrate por aquellos a tu alrededor que se transforman en la Fuerza. No los llores. No los eches de menos", 
"Caminos a la victoria hay, distintos que aplastar a un enemigo", 
"Las armas no ganan batallas. Tu mente, poderosa ella es",
"Imposible nada es. Difícil, muchas cosas son",
"El mejor profesor, el fracaso es",
"¿Quieres saber la diferencia entre un maestro y un aprendiz? El maestro ha fallado más veces de las que el principiante lo ha intentado", 
"Verdaderamente maravillosa es la mente de un niño",
"Gran guerrero. Las guerras no lo hacen a uno grande" 
];

function mostrarRefran() {
  document.getElementById('refranes').innerHTML = refranes[Math.floor(Math.random() * refranes.length)];
}

document.getElementById('botonYoda').addEventListener('click', mostrarRefran);
// Iniciar funcion
window.onload = EntrarMouse;
