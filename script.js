// URLs Configuradas do Projeto
const APPS_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbzlOJGeZF5sjQB6nraL9e2kXSbqEeYnRKrCFGj1_6VvoVd67n-iHXijB3xx7JH155-M/exec";

// Configuração dos 5 Anunciantes Rotativos
const bannerData = [
    { img: "https://via.placeholder.com/728x90/111/fff?text=Anunciante+01+CalculeSorte", link: "https://www.google.com" },
    { img: "https://via.placeholder.com/728x90/222/fff?text=Anunciante+02+CalculeSorte", link: "https://www.google.com" },
    { img: "https://via.placeholder.com/728x90/333/fff?text=Anunciante+03+CalculeSorte", link: "https://www.google.com" },
    { img: "https://via.placeholder.com/728x90/444/fff?text=Anunciante+04+CalculeSorte", link: "https://www.google.com" },
    { img: "https://via.placeholder.com/728x90/555/fff?text=Anunciante+05+CalculeSorte", link: "https://www.google.com" }
];

let currentAttempts = parseInt(localStorage.getItem("cs_attempts")) || 0;
const MAX_ATTEMPTS = 5;

document.addEventListener("DOMContentLoaded", () => {
    initBanners();
    updateCounterAndCheckAttempts();
// Gerar Dias (01 a 31) nos botões de seleção
    const daySelect = document.getElementById("birth-day");
    for (let i = 1; i <= 31; i++) {
        daySelect.options[daySelect.options.length] = new Option(i.toString().padStart(2, '0'), i);
    }

    // Gerar Meses (Janeiro a Dezembro) nos botões de seleção
    const monthSelect = document.getElementById("birth-month");
    const months = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];
    months.forEach((m, idx) => {
        monthSelect.options[monthSelect.options.length] = new Option(m, idx + 1);
    });

    // Gerar Anos (2026 até 1920) nos botões de seleção
    const yearSelect = document.getElementById("birth-year");
    for (let i = 2026; i >= 1920; i--) {
        yearSelect.options[yearSelect.options.length] = new Option(i, i);
    }

    // Gatilho para abrir o Painel Admin através do link oculto do Rodapé
    document.getElementById("link-admin-footer").addEventListener("click", (e) => {
        e.preventDefault();
        document.getElementById("admin-modal").classList.remove("hidden");
    });
    // Evento do Formulário Principal
    document.getElementById("calc-form").addEventListener("submit", handleFormSubmit);
    
    // Evento de Tentar Novamente
    document.getElementById("btn-retry").addEventListener("click", () => {
        document.getElementById("result-section").classList.add("hidden");
        document.getElementById("form-section").classList.remove("hidden");
    });

    // Eventos do Painel Oculto Admin
    document.getElementById("btn-login").addEventListener("click", handleAdminLogin);
    document.getElementById("btn-close-admin").addEventListener("click", () => {
        document.getElementById("admin-modal").classList.add("hidden");
    });

    // Atalho Secreto: Pressione Alt + A para abrir o Painel Administrativo
    window.addEventListener("keydown", (e) => {
        if (e.altKey && e.key.toLowerCase() === 'a') {
            document.getElementById("admin-modal").classList.remove("hidden");
        }
    });
});

// Rotatividade de Banners
function initBanners() {
    const randomIndex = Math.floor(Math.random() * bannerData.length);
    document.getElementById("banner-img").src = bannerData[randomIndex].img;
    document.getElementById("banner-link").href = bannerData[randomIndex].link;
}

// Atualiza Contador de Visitantes Real e Valida Bloqueio
function updateCounterAndCheckAttempts() {
    fetch(`${APPS_SCRIPT_URL}?action=getStats`)
        .then(res => res.json())
        .then(data => {
            document.getElementById("counter-val").textContent = data.visitors || 1;
        })
        .catch(() => {
            document.getElementById("counter-val").textContent = Math.floor(Math.random() * (140 - 80) + 80);
        });

    if (currentAttempts >= MAX_ATTEMPTS) {
        document.getElementById("paywall-modal").classList.remove("hidden");
    }
}

// Envio do Lead para o Google Sheets e Geração Matemática
function handleFormSubmit(e) {
    e.preventDefault();

    if (currentAttempts >= MAX_ATTEMPTS) {
        document.getElementById("paywall-modal").classList.remove("hidden");
        return;
    }

    const payload = {
        action: "saveLead",
        nome: document.getElementById("user-name").value,
        whatsapp: document.getElementById("user-phone").value,
        dia: document.getElementById("birth-day").value,
        mes: document.getElementById("birth-month").value,
        ano: document.getElementById("birth-year").value
    };

    // Salva na planilha via Apps Script
    fetch(APPS_SCRIPT_URL, {
        method: "POST",
        mode: "no-cors",
        cache: "no-cache",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
    });

    // Fluxo Visual e Lógica Matemática Local das dezenas
    currentAttempts++;
    localStorage.setItem("cs_attempts", currentAttempts);
    document.getElementById("attempts-left").textContent = MAX_ATTEMPTS - currentAttempts;

    generateLuckyNumbers();
}

function generateLuckyNumbers() {
    let numbers = [];
    while(numbers.length < 6) {
        let r = Math.floor(Math.random() * 60) + 1;
        if(numbers.indexOf(r) === -1) numbers.push(r);
    }
    numbers.sort((a, b) => a - b);

    const display = document.getElementById("numbers-display");
    display.innerHTML = "";
    numbers.forEach(n => {
        const ball = document.createElement("div");
        ball.className = "ball";
        ball.textContent = n.toString().padStart(2, '0');
        display.appendChild(ball);
    });

    document.getElementById("form-section").classList.add("hidden");
    document.getElementById("result-section").classList.remove("hidden");
}

// Login e Autenticação do Painel Secreto
function handleAdminLogin() {
    const user = document.getElementById("admin-user").value;
    const pass = document.getElementById("admin-pass").value;

    if (user === "xexeu" && pass === "pazael@0660") {
        document.getElementById("admin-auth").classList.add("hidden");
        document.getElementById("admin-data").classList.remove("hidden");
        
        // Puxa os dados em tempo real armazenados na sua planilha
        fetch(`${APPS_SCRIPT_URL}?action=getLeads`)
            .then(res => res.json())
            .then(data => {
                const tbody = document.querySelector("#leads-table tbody");
                tbody.innerHTML = "";
                data.forEach(lead => {
                    const row = `<tr>
                        <td>${lead.nome}</td>
                        <td>${lead.whatsapp}</td>
                        <td><span style="color:#00f2fe">${lead.status}</span></td>
                    </tr>`;
                    tbody.innerHTML += row;
                });
            });
    } else {
        alert("Credenciais Incorretas!");
    }
}
