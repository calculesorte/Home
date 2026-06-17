document.addEventListener('DOMContentLoaded', () => {
    const d = document.getElementById('dia');
    const m = document.getElementById('mes');
    const a = document.getElementById('ano');

    // Preenche os selects
    for(let i=1; i<=31; i++) d.innerHTML += `<option value="${i}">${i}</option>`;
    for(let i=1; i<=12; i++) m.innerHTML += `<option value="${i}">${i}</option>`;
    for(let i=1940; i<=2026; i++) a.innerHTML += `<option value="${i}">${i}</option>`;
});

function executarCalculo() {
    const nome = document.getElementById('nome').value;
    if (!nome) { alert("Por favor, preencha o nome!"); return; }
    
    document.getElementById('resultado').innerText = "Calculado! Em breve seu relatório.";
    document.getElementById('resultado').style.display = 'block';
    
    // Desativa tudo para evitar fraude
    document.getElementById('btn-calc').disabled = true;
    console.log("Dados processados com sucesso!");
}
