// Contador global persistente
let count = parseInt(localStorage.getItem('totalVisits')) || 19;
count++; 
localStorage.setItem('totalVisits', count);
document.getElementById('visit-count').innerText = count;

document.getElementById('calc-form').addEventListener('submit', (e) => {
    e.preventDefault();
    let rodadas = parseInt(localStorage.getItem('rodadas')) || 0;
    if (rodadas < 5) {
        rodadas++;
        localStorage.setItem('rodadas', rodadas);
        alert("Análise realizada com sucesso! Rodada " + rodadas + " de 5.");
    } else {
        window.location.href = "segunda-tela.html";
    }
});
