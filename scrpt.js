document.addEventListener('DOMContentLoaded', () => {
    // Preenche as datas automaticamente
    const d = document.getElementById('dia'), m = document.getElementById('mes'), a = document.getElementById('ano');
    for(let i=1; i<=31; i++) d.innerHTML += `<option value="${i}">${i}</option>`;
    for(let i=1; i<=12; i++) m.innerHTML += `<option value="${i}">${i}</option>`;
    for(let i=2026; i>=1940; i--) a.innerHTML += `<option value="${i}">${i}</option>`;
    
    // CORREÇÃO: Recupera o estado se a página atualizar
    if (localStorage.getItem('palpiteGerado')) {
        const numerosSalvos = localStorage.getItem('numerosSorte');
        document.getElementById('resultado').style.display = 'block';
        document.getElementById('numeros-sorte').innerHTML = `<strong>${numerosSalvos}</strong>`;
        // Trava os campos
        document.querySelectorAll('input, select, .btn-calc').forEach(el => el.disabled = true);
    }
});

function interagirCal() {
    const balao = document.getElementById('balao-fala');
    document.getElementById('trevinho').style.transform = "rotate(360deg)";
    balao.innerText = "Deixe-me pensar...";
    setTimeout(() => { balao.innerText = "COMO VOU SABER? EU SOU APENAS UM SER VIRTUAL! Hahahaha!"; }, 2000);
    setTimeout(() => { balao.innerText = "Poxa... só eu rio dessa piada? (╥_╥)"; document.getElementById('trevinho').style.transform = "rotate(0deg)"; }, 5000);
}

function executarCalculo() {
    const nome = document.getElementById('nome').value;
    if (!nome) { alert("Preencha seu nome!"); return; }

    // 1. Gera os números
    let nums = Array.from({length: 6}, () => Math.floor(Math.random() * 60) + 1).sort((a,b) => a - b);
    let resultadoFinal = nums.join(" - ");
    
    // 2. Exibe o resultado
    document.getElementById('numeros-sorte').innerHTML = `<strong>${resultadoFinal}</strong>`;
    document.getElementById('relatorio-concurso').innerHTML = "Tendência de equilíbrio. Concurso: 3018";
    document.getElementById('resultado').style.display = 'block';

    // 3. Salva no navegador para o F5 não apagar
    localStorage.setItem('palpiteGerado', 'true');
    localStorage.setItem('numerosSorte', resultadoFinal);
    
    // Trava os campos
    document.querySelectorAll('input, select, .btn-calc').forEach(el => el.disabled = true);
}
