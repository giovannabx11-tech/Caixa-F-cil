// ==========================================
// CONFIGURAÇÃO DO CAIXA
// ==========================================

let saldo = 1000;

const notasDisponiveis = [100, 50, 20, 10, 5, 2];


// ==========================================
// FORMATAÇÃO DE VALORES
// ==========================================

function formatarMoeda(valor) {
    return valor.toLocaleString("pt-BR", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });
}


// ==========================================
// REALIZAR SAQUE
// ==========================================

function realizarSaque() {

    const campoValor = document.getElementById("valor");
    const resultado = document.getElementById("resultado");
    const saldoTela = document.getElementById("saldo");

    const valor = Number(campoValor.value);


    // Limpa o resultado anterior
    resultado.className = "resultado";
    resultado.innerHTML = "";


    // ======================================
    // VALIDAÇÕES
    // ======================================

    if (campoValor.value === "") {

        mostrarErro(
            "Informe o valor que deseja sacar."
        );

        campoValor.focus();
        return;
    }


    if (!Number.isInteger(valor)) {

        mostrarErro(
            "Valor inválido. Digite apenas valores inteiros."
        );

        campoValor.focus();
        return;
    }


    if (valor <= 0) {

        mostrarErro(
            "O valor do saque deve ser maior que zero."
        );

        campoValor.focus();
        return;
    }


    if (valor > saldo) {

        mostrarErro(
            `Saldo insuficiente. Seu saldo atual é R$ ${formatarMoeda(saldo)}.`
        );

        campoValor.focus();
        return;
    }


    // ======================================
    // CALCULAR NOTAS
    // ======================================

    let restante = valor;
    let notasUsadas = [];


    for (let nota of notasDisponiveis) {

        let quantidade = Math.floor(restante / nota);

        if (quantidade > 0) {

            notasUsadas.push({
                valor: nota,
                quantidade: quantidade
            });

            restante = restante % nota;
        }
    }


    // ======================================
    // VERIFICA SE O VALOR PODE SER SACADO
    // ======================================

    if (restante !== 0) {

        mostrarErro(
            "Não é possível realizar este saque com as notas disponíveis."
        );

        campoValor.focus();
        return;
    }


    // ======================================
    // ATUALIZA O SALDO
    // ======================================

    saldo -= valor;

    saldoTela.textContent = formatarMoeda(saldo);


    // ======================================
    // MOSTRAR RESULTADO
    // ======================================

    mostrarSucesso(valor, notasUsadas, saldo);


    // Limpa o campo
    campoValor.value = "";

}


// ==========================================
// MOSTRAR ERRO
// ==========================================

function mostrarErro(mensagem) {

    const resultado = document.getElementById("resultado");

    resultado.className = "resultado erro";

    resultado.innerHTML = `
        <div class="resultado-titulo">
            ⚠️ Não foi possível realizar o saque
        </div>

        <div>
            ${mensagem}
        </div>
    `;
}


// ==========================================
// MOSTRAR SUCESSO
// ==========================================

function mostrarSucesso(valor, notas, saldoAtual) {

    const resultado = document.getElementById("resultado");

    let listaNotas = "";


    for (let nota of notas) {

        const textoNota =
            nota.quantidade === 1
                ? "nota"
                : "notas";

        listaNotas += `
            <div class="nota-item">
                <span>
                    ${nota.quantidade} ${textoNota}
                </span>

                <strong>
                    R$ ${formatarMoeda(nota.valor)}
                </strong>
            </div>
        `;
    }


    resultado.className = "resultado sucesso";

    resultado.innerHTML = `

        <div class="resultado-titulo">
            ✓ Saque realizado com sucesso!
        </div>

        <div>
            Valor sacado:
            <strong>R$ ${formatarMoeda(valor)}</strong>
        </div>

        <div class="lista-notas">
            ${listaNotas}
        </div>

        <div class="saldo-final">
            Saldo restante:
            R$ ${formatarMoeda(saldoAtual)}
        </div>
    `;
}


// ==========================================
// PERMITIR ENTER PARA SACAR
// ==========================================

document.getElementById("valor").addEventListener(
    "keydown",
    function(event) {

        if (event.key === "Enter") {
            realizarSaque();
        }

    }
);