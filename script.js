// Contador Real
document.addEventListener("DOMContentLoaded", () => {
    let count = localStorage.getItem('visitorCount') || 19;
    count = parseInt(count) + 1;
    localStorage.setItem('visitorCount', count);
    document.getElementById('visit-count').innerText = count;
});

// Fluxo de envio (Simulando as 5 rodadas)
document.getElementById('calc-form').addEventListener('submit', (e) => {
    e.preventDefault();
    // Lógica para controle das 5 rodadas
    let rodadas = localStorage.getItem('rodadas') || 0;
    if (rodadas < 5) {
        rodadas++;
        localStorage.setItem('rodadas', rodadas);
        alert("Análise realizada! Rodada " + rodadas + " de 5.");
    } else {
        window.location.href = "segunda-tela.html"; // Redireciona para a tela de Planos
    }
});
