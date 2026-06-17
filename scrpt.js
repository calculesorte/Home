function executarCalculo() {
    // 1. Captura os valores dos campos
    const nome = document.getElementById('nome').value;
    const whatsapp = document.getElementById('whatsapp').value;
    const dia = document.getElementById('dia').value;
    const mes = document.getElementById('mes').value;
    const ano = document.getElementById('ano').value;

    // 2. Validação básica
    if (!nome || !whatsapp || !dia || !mes || !ano) {
        alert("Por favor, preencha todos os campos!");
        return;
    }

    // 3. Monta o objeto para enviar (certifique-se que os nomes batem com o Apps Script)
    const dadosParaEnviar = {
        nome: nome,
        whatsapp: whatsapp,
        dia: dia,
        mes: mes,
        ano: ano,
        resultado: "Calculado" // Adicionei este campo pois seu Apps Script espera
    };

    const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbwd5dxvPHgziAL12JIGVXzQUl4p6TJyyPPTND4NdMZa_mF0ZsGIcHnkT7bii4DpnEzT/exec";

    // 4. Envia para o Google Sheets
    fetch(SCRIPT_URL, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dadosParaEnviar)
    })
    .then(() => {
        alert("Cálculo realizado com sucesso!");
        document.getElementById('btn-calc').disabled = true;
    })
    .catch(error => {
        console.error("Erro:", error);
        alert("Erro na conexão com o servidor.");
    });
}
