document.addEventListener('DOMContentLoaded', () => {
    const d = document.getElementById('dia'), m = document.getElementById('mes'), a = document.getElementById('ano');
    for(let i=1; i<=31; i++) d.innerHTML += `<option value="${i}">${i}</option>`;
    for(let i=1; i<=12; i++) m.innerHTML += `<option value="${i}">${i}</option>`;
    for(let i=2026; i>=1940; i--) a.innerHTML += `<option value="${i}">${i}</option>`;
    
    if (localStorage.getItem('palpiteGerado')) {
        document.getElementById('numeros-sorte').innerHTML = localStorage.getItem('numerosSalvos');
        document.getElementById('resultado').style.display = 'block';
        travarInterface();
    }
});

function executarCalculo() {
    const nome = document.getElementById('nome').value;
    if (!nome) { alert("Preencha seu nome!"); return; }

    let nums = Array.from({length: 6}, () => Math.floor(Math.random() * 60) + 1).sort((a,b) => a - b);
    let resultado = `<strong>${nums.join(" - ")}</strong>`;
    
    document.getElementById('numeros-sorte').innerHTML = resultado;
    document.getElementById('relatorio-concurso').innerHTML = "Tendência de equilíbrio. Concurso: 3018";
    document.getElementById('resultado').style.display = 'block';

    localStorage.setItem('palpiteGerado', 'true');
    localStorage.setItem('numerosSalvos', resultado);
    travarInterface();
}

function travarInterface() {
    document.querySelectorAll('input, select, .btn-calc').forEach(el => el.disabled = true);
}
