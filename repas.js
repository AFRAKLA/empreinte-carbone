document.getElementById("repas-form").addEventListener("submit", function (event) {
  event.preventDefault();

  let nbRepas = parseInt(document.getElementById("nb-repas").value);

  if (isNaN(nbRepas) || nbRepas <= 0) {
    alert("Merci d'entrer un nombre de repas valide.");
    return;
  }

  let typesRepas = document.querySelectorAll('input[name="type-repas"]:checked');
  if (typesRepas.length === 0) {
    alert("Merci de choisir au moins un type de repas.");
    return;
  }

  let totalEmissionParRepas = 0;
  typesRepas.forEach(function (rep) {
    if (rep.value === "vegetarien") {
      totalEmissionParRepas += 0.6;
    } else if (rep.value === "mixte") {
      totalEmissionParRepas += 1.2;
    } else if (rep.value === "viande") {
      totalEmissionParRepas += 2.5;
    }
  });

  let emissionParRepas = totalEmissionParRepas / typesRepas.length;
  let total = nbRepas * emissionParRepas;

  // Affichage du résultat
let resultat = document.getElementById("resultat");
resultat.innerText = "Votre impact carbone pour les repas est de " + total.toFixed(2) + " kg de CO₂ par semaine.";

// Enregistrement localStorage
localStorage.setItem("repasCO2", total.toFixed(2));
});
