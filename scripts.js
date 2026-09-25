/*pedido que é enviado para a IA*/
let pedido = 'Olhe a foto deste comprovante e responda em uma linha, sem escrever mais nada, com 2 pedaços separados por |. Primeiro pedaço: o emoji da categoria, o nome do estabelecimento dentor de <strong> e depois cada item comprado com seu valor, um por linha usando <br>. Segundo pedaçõ: o total pago, só o número, com ponto e sempre com duas casas decimais. As categorias são: 🛒 Mercado, 🚗 Transporte, 🍔 Comida, 🏥 Saúde, 🎮 Lazer, 🏠 Casa, 📦 Outros. Exemplo de resposta: 🍔 <strong>Padaria Pão Quente</strong><br>Pão - R$ 5,00<br>Leite - R$ 4,50|9,50';
let total = 0;

async function lerFoto(){
    let foto = document.querySelector(".foto").files[0]
    /*chamada assincrona
    pega a informação e envia para a IA precisa usar o async e o await*/
    let resposta = await puter.ai.chat(pedido, foto) /*o pedido e a foto seram enviados para a IA*/
    //pegar a resposta da IA e filtrar para mostrar na tela
    let texto = resposta.message.content
    let partes = texto.split("|") //irá pegar o texto e separar em partes
    
    // Tratamento para garantir que o valor seja numérico:
    // substitui vírgula por ponto e remove espaços nas pontas
    let valorTexto = partes[1].trim().replace(",", ".");
    let valorNumero = Number(valorTexto);

    //colocar na tela com o innerHTML. Sinal Mais vai adicionar outras imagens
    document.querySelector(".lista").innerHTML += ` 
        <div class="comprovante">
            <div class="itens">${partes[0]}</div>
            <div class="total-notas">Total da nota: R$ ${partes[1]}</div>
        </div>
    `
    /*total += Number(partes[1])    
    document.querySelector(".total-gasto").innerHTML = "R$" + total.toFixed(2).replace(".", ",") // duas casas decimais          */

    if (!isNaN(valorNumero)) {
        total += valorNumero;
        document.querySelector(".total-gasto").innerHTML = "R$ " + total.toFixed(2).replace(".", ",");
    }

}