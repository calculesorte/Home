document.addEventListener('DOMContentLoaded', () => {
    const diaSelect = document.getElementById('dia');
    const mesSelect = document.getElementById('mes');
    const anoSelect = document.getElementById('ano');

    function popularSelect(elemento, inicio, fim, passo = 1) {
        elemento.innerHTML = '<option value="">' + elemento.id.charAt(0).toUpperCase() + elemento.id.slice(1) + '</option>';
        for (let i = inicio; passo > 0 ? i <= fim : i >= fim; i += passo) {
            let opt = document.createElement('option');
            opt.value = i;
            opt.textContent = i;
            elemento.appendChild(opt);
        }
    }

    popularSelect(diaSelect, 1, 31);
    popularSelect(mesSelect, 1, 12);
    popularSelect(anoSelect, 2026, 1940, -1);
});

function executarCalculo() {
    const nome = document.getElementById('nome').value;
    const whatsapp = document.getElementById('whatsapp').value;
    const dia = document.getElementById('dia').value;
    const mes = document.getElementById('mes').value;
    const ano = document.getElementById('ano').value;

    if (!nome || !whatsapp || !dia || !mes || !ano) {
        alert("Por favor, preencha todos os campos!");
        return;
    }

    // A URL que você me passou está aqui:
    const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbwd5dxvPHgziAL12JIGVXzQUl4p6TJyyPPTND4NdMZa_mF0ZsGIcHnkT7bii4DpnEzT/exec";

    fetch(SCRIPT_URL, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nome, whatsapp, dia, mes, ano })
    })
    .then(() => {
        alert("Cálculo realizado com sucesso! Em breve entraremos em contato.");
        document.getElementById('btn-calc').disabled = true;
    })
    .catch(error => {
        console.error("Erro:", error);
        alert("Erro na conexão. Tente novamente.");
    });
}
