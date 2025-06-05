console.log("repasCO2:", localStorage.getItem("repasCO2"));
console.log("transportCO2:", localStorage.getItem("transportCO2"));
console.log("numeriqueCO2:", localStorage.getItem("numeriqueCO2"));
console.log("chauffageCO2:", localStorage.getItem("chauffageCO2"));

// Récupérer les données
const repasCO2 = parseFloat(localStorage.getItem("repasCO2")) || 0;
const transportCO2 = parseFloat(localStorage.getItem("transportCO2")) || 0;
const numeriqueCO2 = parseFloat(localStorage.getItem("numeriqueCO2")) || 0;
const chauffageCO2 = parseFloat(localStorage.getItem("chauffageCO2")) || 0;
const total = repasCO2 + transportCO2 + numeriqueCO2 + chauffageCO2;

// Afficher les données
document.getElementById("repasCO2").textContent = repasCO2.toFixed(2);
document.getElementById("transportCO2").textContent = transportCO2.toFixed(2);
document.getElementById("numeriqueCO2").textContent = numeriqueCO2.toFixed(2);
document.getElementById("chauffageCO2").textContent = chauffageCO2.toFixed(2);
document.getElementById("totalCO2").textContent = total.toFixed(2);

// Créer le graphique
const ctx = document.getElementById("resultatsGraph").getContext("2d");
new Chart(ctx, {
  type: "doughnut",
  data: {
    labels: ["Repas", "Transport", "Numérique", "Chauffage"],
    datasets: [{
      label: "kg CO₂",
      data: [repasCO2, transportCO2, numeriqueCO2, chauffageCO2],
      backgroundColor: [
        "#e67e22",  
        "#3498db",  
        "#2ecc71",  
        "#f39c12"   
      ]
    }]
  },
  options: {
    plugins: {
      legend: { position: "bottom" },
      title: {
        display: true,
        text: "Répartition des émissions de CO₂"
      }
    }
  }
});
