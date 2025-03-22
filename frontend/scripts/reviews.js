document.addEventListener('DOMContentLoaded', () => {
    // Funzione per caricare i ristoranti
    const loadRestaurants = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/restaurants'); // Chiamata API per ottenere i ristoranti
            if (!response.ok) {
                throw new Error('Errore nel recupero dei ristoranti');
            }
            const restaurants = await response.json();

            const restaurantListContainer = document.getElementById('restaurant-list');
            restaurantListContainer.innerHTML = ''; // Pulisce l'area prima di aggiungere nuovi ristoranti

            restaurants.forEach(restaurant => {
                const restaurantDiv = document.createElement('div');
                restaurantDiv.classList.add('restaurant');
                restaurantDiv.innerHTML = `
                    <h4>${restaurant.nome}</h4>
                    <p>${restaurant.tipo_cucina}</p>
                    <p>${restaurant.prezzo}</p>
                    <button onclick="showReviewForm(${restaurant.id})">Scrivi una recensione</button>
                `;
                restaurantListContainer.appendChild(restaurantDiv);
            });
        } catch (error) {
            console.error('Errore durante il caricamento dei ristoranti:', error);
        }
    };

    // Carica i ristoranti quando la pagina è pronta
    loadRestaurants();
});

// Funzione per mostrare il form della recensione
const showReviewForm = (ristoranteId) => {
    const reviewFormContainer = document.getElementById('review-form-container');
    document.getElementById('ristorante_id').value = ristoranteId; // Imposta l'ID del ristorante nel form
    reviewFormContainer.classList.remove('hidden');
};

// Funzione per inviare la recensione
document.getElementById('review-form').addEventListener('submit', async (event) => {
    event.preventDefault(); // Evita che il form venga inviato normalmente

    const formData = new FormData();
    const ristoranteId = document.getElementById('ristorante_id').value;
    const voto = document.getElementById('voto').value;
    const commento = document.getElementById('commento').value;
    const immagine = document.getElementById('immagine').files[0];

    formData.append('ristorante_id', ristoranteId);
    formData.append('voto', voto);
    formData.append('commento', commento);
    if (immagine) {
        formData.append('immagine', immagine); // Aggiungi il file immagine
    }

    try {
        // La richiesta non ha più l'intestazione di autorizzazione
        const response = await fetch('http://localhost:5000/api/reviews', {
            method: 'POST',
            body: formData
        });

        if (!response.ok) {
            throw new Error('Errore nell\'invio della recensione');
        }

        const result = await response.json();
        alert(result.message); // Mostra un messaggio di successo

        // Rimuovi la recensione dal form e nascondi il form
        document.getElementById('review-form').reset();
        document.getElementById('review-form-container').classList.add('hidden');
    } catch (error) {
        console.error('Errore durante l\'invio della recensione:', error);
        alert('Si è verificato un errore, prova di nuovo.');
    }
});
