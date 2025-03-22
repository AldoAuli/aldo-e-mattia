fetch('http://localhost:5000/api/restaurants')
    .then(res => res.json())
    .then(data => {
        const container = document.getElementById('restaurant-list');
        data.forEach(restaurant => {
            const div = document.createElement('div');
            div.innerHTML = `<h2>${restaurant.nome}</h2><p>${restaurant.tipo_cucina}</p>`;
            container.appendChild(div);
        });
    });