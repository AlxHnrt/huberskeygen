let data = []; // Stocke toutes les données chargées depuis l'API

// Charger les données depuis l'API Flask
fetch("/api/donnees")
  .then(response => response.json())
  .then(json => {
    data = json;
    //afficherDonnees(data);
    remplirMenuDeroulant(data);
  });

// Affiche toutes les données dans le tableau
//function afficherDonnees(donnees) {
//  const tbody = document.getElementById("dataBody");
//  tbody.innerHTML = "";
 // donnees.forEach(row => {
 //   const tr = document.createElement("tr");
 //   tr.innerHTML = `<td>${row.date}</td><td>${row.key}</td>`;
  //  tbody.appendChild(tr);
  //});
//}

// Remplit le menu déroulant avec les dates JJ/MM
function remplirMenuDeroulant(donnees) {
  const select = document.getElementById("dateSelect");
  const dates = [...new Set(donnees.map(row => row.date.slice(0, 5)))].sort();
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

