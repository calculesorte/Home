// Aguarda o documento carregar totalmente
document.addEventListener('DOMContentLoaded', () => {
    console.log("Script carregando...");

    const diaSelect = document.getElementById('dia');
    const mesSelect = document.getElementById('mes');
    const anoSelect = document.getElementById('ano');

    // Função auxiliar para criar opções
    function popularSelect(elemento, inicio, fim, passo = 1) {
        elemento.innerHTML = ''; // Limpa anterior
        for (let i = inicio; passo > 0 ? i <= fim : i >= fim; i += passo) {
            let opt = document.createElement('option');
            opt.value = i;
            opt.textContent = i;
            elemento.appendChild(opt);
        }
    }

    // Popular os campos
    popularSelect(diaSelect, 1, 31);
    popularSelect(mesSelect, 1, 12);
    popularSelect(anoSelect, 2026, 1940, -1);
    
    console.log("Campos populados com sucesso!");
});

// Função do botão
function executarCalculo() {
    alert("Cálculo realizado!");
}
