document.querySelector("#mode-transport").addEventListener("change", mettreAJourTypes);
document.querySelector("#calculer").addEventListener("click", calculer);

const modeSelect = document.querySelector("#mode-transport");
const typeSelect = document.querySelector("#type-transport");
const distanceInput = document.querySelector("#distance");
const frequenceInput = document.querySelector("#frequence");
const resultatDiv = document.querySelector("#resultat");
const co2Span = document.querySelector("#co2");

const types = {
  train: ["TER", "TGV", "Intercités"],
  voiture: ["Thermique", "Électrique"],
  bus: ["Bus", "Autocar"],
  metro: ["Métro"],
  tramway: ["Tramway"],
  velo: ["mécanique", "électrique"]
};

function mettreAJourTypes() {
  const mode = modeSelect.value;
  typeSelect.innerHTML = '';

  if (types[mode]) {
    types[mode].forEach(type => {
      const option = document.createElement("option");
      option.value = type;
      option.textContent = type;
      typeSelect.appendChild(option);
    });
  }
}

async function calculer() {
  const distance = parseFloat(distanceInput.value);
  const frequence = parseInt(frequenceInput.value);
  const mode = modeSelect.value;
  const type = typeSelect.value;

  // Vérification des entrées utilisateur pour éviter les valeurs invalides
  if (isNaN(distance) || distance <= 0 || isNaN(frequence) || frequence <= 0) {
    alert("Veuillez entrer une distance et une fréquence valides.");
    return;
  }

  const url = `https://impactco2.fr/api/v1/transport?km=${distance}&displayAll=1&ignoreRadiativeForcing=0&occupencyRate=1&includeConstruction=0&language=fr`;

  try {
    const response = await fetch(url);
    
    if (!response.ok) throw new Error(`Erreur API: ${response.status} - ${response.statusText}`);

    const jsonData = await response.json();
    
    // Ajout du console.log pour afficher les données récupérées de l'API
    console.log("Données API reçues:", jsonData);

    if (!jsonData.data || jsonData.data.length === 0) {
        throw new Error("Aucune donnée reçue de l'API.");
    }

    const entry = jsonData.data.find(e => e.name.toLowerCase().includes(type.toLowerCase()));

    if (!entry) {
        alert("Transport non trouvé. Vérifiez votre sélection.");
        return;
    }

    // Correction du calcul pour obtenir une estimation hebdomadaire
    const emission = (entry.value * frequence * 2).toFixed(2);
    co2Span.textContent = emission;
    resultatDiv.style.display = "block";
    localStorage.setItem("transportCO2", emission); 

  } catch (error) {
    alert("Erreur lors du calcul des émissions.");
    console.error("Détails de l'erreur:", error);
  }
}

// Initialisation des types de transport au chargement de la page
mettreAJourTypes();
