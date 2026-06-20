// Contador Global Simulado (Substitua pela chamada do seu banco/API quando tiver)
let count = parseInt(localStorage.getItem('totalVisits')) || 19;
count++; 
localStorage.setItem('totalVisits', count);
document.getElementById('visit-count').innerText = count;

// Fluxo de Cálculo
document.getElementById('calc-form').addEventListener('submit', (e) => {
    e.preventDefault();
    // Aqui entra sua lógica de cálculo que mostrará os números
    alert("Números da sorte gerados!"); 
    
    let rodadas = parseInt(localStorage.getItem('rodadas')) || 0;
    if (rodadas >= 5) {
        window.location.href = "segunda-tela.html";
    } else {
        localStorage.setItem('rodadas', rodadas + 1);
    }
});
