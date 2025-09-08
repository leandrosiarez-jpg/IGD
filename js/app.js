const bloques = [
    {
      nombre: "Entradas",
      items: [
        { titulo: "Bruschetta", descripcion: "Pan tostado con tomate, albahaca y aceite de oliva.", precio: "$1200" },
        { titulo: "Rolls de jamón y queso", descripcion: "Rolls suaves rellenos de jamón cocido y queso crema.", precio: "$950" }
      ]
    },
    {
      nombre: "Principales",
      items: [
        { titulo: "Risotto de hongos", descripcion: "Arroz cremoso con hongos frescos y parmesano.", precio: "$2400" },
        { titulo: "Pollo al limón", descripcion: "Pechuga de pollo marinada en limón y especias, acompañada de papas.", precio: "$2100" }
      ]
    }
  ];
  
  let bloqueActual = 0;
  let bloqueAnterior = 0;
  
  function renderBloques() {
    const container = document.getElementById('menu-block-container');
    container.innerHTML = '';
    bloques.forEach((bloque, idx) => {
      const div = document.createElement('div');
      div.className = 'menu-block';
      if (idx === bloqueActual) {
        div.classList.add('show');
      } else if (idx < bloqueActual) {
        div.classList.add('hide-left');
      } else {
        div.classList.add('hide-right');
      }
      div.innerHTML = `
        <h2>${bloque.nombre}</h2>
        <div class="menu-items">
          ${bloque.items.map(item => `
            <div class="menu-item-row">
              <span class="menu-item-title">${item.titulo}</span>
              <span class="menu-item-desc">${item.descripcion}</span>
              <span class="menu-item-price">${item.precio}</span>
            </div>
          `).join('')}
        </div>
      `;
      container.appendChild(div);
    });
  }
  
  function navegarBloque(nuevoIdx) {
    if (nuevoIdx < 0 || nuevoIdx >= bloques.length || nuevoIdx === bloqueActual) return;
    bloqueAnterior = bloqueActual;
    bloqueActual = nuevoIdx;
  
    const container = document.getElementById('menu-block-container');
    const bloquesDiv = Array.from(container.getElementsByClassName('menu-block'));
    bloquesDiv.forEach((div, idx) => {
      div.classList.remove('show', 'hide-left', 'hide-right');
      if (idx === bloqueActual) {
        div.classList.add('show');
      } else if (idx < bloqueActual) {
        div.classList.add('hide-left');
      } else {
        div.classList.add('hide-right');
      }
    });
  }
  
  document.addEventListener('DOMContentLoaded', () => {
    renderBloques();
  
    document.getElementById('prev-block').onclick = () => navegarBloque(bloqueActual - 1);
    document.getElementById('next-block').onclick = () => navegarBloque(bloqueActual + 1);
  });