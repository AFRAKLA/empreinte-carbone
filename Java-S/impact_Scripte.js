async function calculate() {
  const surface = parseFloat(document.getElementById('surface').value);
  const apiUrl = `https://impactco2.fr/api/v1/chauffage?m2=10000&language=fr`;
  const resultDiv = document.getElementById('result');

  if (isNaN(surface) || surface <= 0) {
    resultDiv.innerHTML = `<p class="error">Merci d’entrer une surface valide.</p>`;
    return;
  }

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    const heatingData = data.data.find(item => item.slug === 'chauffagegaz');

    if (heatingData) {
      //  CORRECTION ICI : conversion en kg/semaine
      const ecvParM2 = heatingData.ecv / 10000;       // g/m²/an
      const totalGramsAn = ecvParM2 * surface;        // g/an
      const totalKgSemaine = totalGramsAn / 52 / 1000; // ➜ kg/semaine

      // Sauvegarde
      localStorage.setItem("chauffageCO2", totalKgSemaine.toFixed(2));

      //  Affichage
      resultDiv.innerHTML = `
        <p>Pour <strong>${surface} m²</strong>, l'impact CO₂ est de :</p>
        <ul>
          <li><strong>Total</strong> : ${totalKgSemaine.toFixed(2)} kg CO₂e / semaine</li>
          <li><strong>Par m²</strong> : ${(ecvParM2 / 52 / 1000).toFixed(4)} kg CO₂e / m² / semaine</li>
        </ul>
      `;
    } else {
      throw new Error("Données non disponibles pour le chauffage au gaz.");
    }
  } catch (error) {
    resultDiv.innerHTML = `<p class="error">Erreur : ${error.message}</p>`;
  }
}
