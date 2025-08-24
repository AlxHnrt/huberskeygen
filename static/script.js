let data = []; // Stocke toutes les données chargées depuis l'API

// Charger les données depuis l'API Flask
fetch("/api/donnees")
  .then(response => response.json())
  .then(json => {
    data = json;
    //afficherDonnees(data);
    remplirMenuDeroulant(data);
  });

// Remplit le menu déroulant avec les dates JJ/MM
function remplirMenuDeroulant(donnees) {
  const select = document.getElementById("dateSelect");

  // Extraire les dates uniques au format JJ/MM
  const dates = [...new Set(donnees.map(row => row.date.slice(0, 5)))]
    .sort((a, b) => {
      // a et b sont au format "JJ/MM"
      const [dA, mA] = a.split('/').map(Number);
      const [dB, mB] = b.split('/').map(Number);
      return (mA - mB) || (dA - dB); // Tri par mois puis jour
    });

  // Ajouter les options au menu déroulant
  dates.forEach(date => {
    const option = document.createElement("option");
    option.value = date;
    option.textContent = date;
    select.appendChild(option);
  });
}

// Fonction appelée quand on clique sur "Generate Key"
function generateKey() {
  const selectedDate = document.getElementById("dateSelect").value;
  const resultField = document.getElementById("keyOutput");

  if (!selectedDate) {
    resultField.value = "Veuillez sélectionner une date.";
    return;
  }

  // Cherche la première clé correspondant à la date sélectionnée
  const match = data.find(row => row.date.startsWith(selectedDate));
  resultField.value = match ? match.key : "Aucune clé trouvée.";
}

