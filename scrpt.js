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

    const dados = { nome, whatsapp, dia, mes, ano };

    // Aqui vai o seu link do Apps Script
    const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbwd5dxvPHgziAL12JIGVXzQUl4p6TJyyPPTND4NdMZa_mF0ZsGIcHnkT7bii4DpnEzT/exec"; 

    fetch(SCRIPT_URL, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dados)
    })
    .then(() => {
        alert("Dados enviados com sucesso!");
        // Opcional: Travar o site após o envio para evitar spam
        document.getElementById('btn-calc').disabled = true;
    })
    .catch(error => {
        console.error("Erro:", error);
        alert("Erro ao enviar. Verifique o console.");
    });
}
