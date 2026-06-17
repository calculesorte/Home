document.addEventListener('DOMContentLoaded', () => {
    const d = document.getElementById('dia');
    const m = document.getElementById('mes');
    const a = document.getElementById('ano');

    // Limpeza garantida
    d.innerHTML = '<option value="">Dia</option>';
    m.innerHTML = '<option value="">Mês</option>';
    a.innerHTML = '<option value="">Ano</option>';

    for(let i=1; i<=31; i++) d.options.add(new Option(i, i));
    for(let i=1; i<=12; i++) m.options.add(new Option(i, i));
    for(let i=1940; i<=2026; i++) a.options.add(new Option(i, i));
});
