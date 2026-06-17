document.addEventListener('DOMContentLoaded', () => {
    const d = document.getElementById('dia');
    const m = document.getElementById('mes');
    const a = document.getElementById('ano');

    // Preenche dia
    for(let i=1; i<=31; i++) d.options.add(new Option(i, i));
    // Preenche mes
    for(let i=1; i<=12; i++) m.options.add(new Option(i, i));
    // Preenche ano
    for(let i=2026; i>=1940; i--) a.options.add(new Option(i, i));
    
    // Verifica se já foi calculado antes
    if (localStorage.getItem('calculado')) {
        travarInterface();
    }
});

function executarCalculo() {
    const nome = document.getElementById('nome').value;
    if (!nome) { alert("Por favor, preencha o nome!"); return; }
    
    // Envia para planilha (conforme configuramos antes)
    const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbwd5dxvPHgziAL12JIGVXzQUl4p6TJyyPPTND4NdMZa_mF0ZsGIcHnkT7bii4DpnEzT/exec";
    
    fetch(SCRIPT_URL, {
        method: "POST",
        mode: "no-cors",
        body: JSON.stringify({
            nome: nome,
            whatsapp: document.getElementById('whatsapp').value,
            dia: document.getElementById('dia').value,
            mes: document.getElementById('mes').value,
            ano: document.getElementById('ano').value
        })
    });

    localStorage.setItem('calculado', 'true');
    travarInterface();
}

function travarInterface() {
    document.getElementById('btn-calc').disabled = true;
    document.querySelectorAll('input, select').forEach(el => el.disabled = true);
    document.getElementById('area-vip').style.display = 'block';
}
