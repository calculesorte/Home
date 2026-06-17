document.addEventListener('DOMContentLoaded', function() {
    console.log("Iniciando preenchimento...");
    
    const d = document.getElementById('dia');
    const m = document.getElementById('mes');
    const a = document.getElementById('ano');

    // Limpa para garantir
    d.innerHTML = '<option value="">Dia</option>';
    m.innerHTML = '<option value="">Mês</option>';
    a.innerHTML = '<option value="">Ano</option>';

    // Preenche Dia
    for(let i = 1; i <= 31; i++) {
        let opt = document.createElement('option');
        opt.value = i;
        opt.textContent = i;
        d.appendChild(opt);
    }

    // Preenche Mês
    for(let i = 1; i <= 12; i++) {
        let opt = document.createElement('option');
        opt.value = i;
        opt.textContent = i;
        m.appendChild(opt);
    }

    // Preenche Ano
    for(let i = 2026; i >= 1940; i--) {
        let opt = document.createElement('option');
        opt.value = i;
        opt.textContent = i;
        a.appendChild(opt);
    }
    
    console.log("Preenchimento concluído!");
});

function executarCalculo() {
    alert("Calculando...");
}
