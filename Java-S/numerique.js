document.addEventListener('DOMContentLoaded', () => {
    const calculateBtn = document.getElementById('calculate-btn');
    const resultDiv = document.getElementById('result');
  
    calculateBtn.addEventListener('click', () => {
      // Récupération des valeurs
      const streaming = parseFloat(document.getElementById('streaming').value) || 0;
      const visio = parseFloat(document.getElementById('visio').value) || 0;
      const cloud = parseFloat(document.getElementById('cloud').value) || 0;
  
      // Calcul de l'empreinte carbone
      const co2Streaming = streaming * 100; // 100g CO2/h
      const co2Visio = visio * 50;         // 50g CO2/h
      const co2Cloud = cloud * 10;         // 10g CO2/Go
  
      const totalCO2 = co2Streaming + co2Visio + co2Cloud;
  
      // Affichage du résultat
      resultDiv.innerHTML = `
        <p>Votre impact numérique cette semaine : <strong>${totalCO2} g CO₂eq</strong></p>
        <small>Soit ${(totalCO2 / 1000).toFixed(2)} kg CO₂eq</small>
        ${totalCO2 > 1000 ? '<p class="advice">💡 Conseil : Réduisez le streaming en HD pour économiser du CO₂ !</p>' : ''}
      `;
  
      // Ajout de l’effet visuel
      resultDiv.classList.add('active');
      localStorage.setItem("numeriqueCO2", (totalCO2 / 1000).toFixed(2));

    });
  });
  
