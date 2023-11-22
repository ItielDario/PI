const btnAdicionar = document.querySelector('#btn-adicionar');
const btnGravar = document.querySelector('#btn-gravar');

btnGravar.addEventListener('click', gravarProdutos);

function gravarProdutos(){
    console.log('aaaaaaaaaa')
}

let listaProdutos = [];
let valorTotalCompra = 0;
let idProduto = 0;

btnAdicionar.addEventListener('click', adicionarProduto);

function adicionarProduto(){
    const alertProdutos = document.querySelector('#alert-msg-produtos');
    const desconto = document.querySelector('#desconto');
    const produto = document.querySelector('#produto');
    const quantidade = document.querySelector('#quantidade');
    const valorUni = document.querySelector('#valor-uni');
    
    const valorTotalProduto = document.querySelector('.valor-total-produtos');
    alertProdutos.innerHTML = '';

    if(validarCampos(produto.value, quantidade.value, valorUni.value)){

        setTimeout(() => {
            alertProdutos.innerHTML = `<div class="alert alert-primary">TAÍ MEU CUMPADE</div>`
        }, 200);
        setTimeout(() => {
            alertProdutos.innerHTML = ''
        }, 3000);

        let totalProduto = Number((valorUni.value * quantidade.value));
        valorTotalCompra = (valorTotalCompra + totalProduto);

        listaProdutos.push({
            id: `${idProduto}`,
            produto: `${produto.value}`,
            quantidade: `${quantidade.value}`,
            valorUnitario: (valorUni.value * 1).toFixed(2),
            valorTotalProduto: totalProduto.toFixed(2)
        });

        
        exibirTabela(listaProdutos);

        valorTotalProduto.innerHTML = `<h3>Valor total: R$ ${valorTotalCompra.toFixed(2)} </h3>`;
        produto.value = '';
        produto.focus();
        quantidade.value = '';
        valorUni.value = '';

        desconto.addEventListener('keyup', () => {
            let valorComDesconto = valorTotalCompra - desconto.value;

            valorTotalProduto.innerHTML = `<h3>Valor total: R$ ${valorComDesconto.toFixed(2)} </h3>`;
        })

        const btn = document.querySelectorAll(`.btn-excluir`);
        for(let i = 0; i < btn.length; i++){
            btn[i].addEventListener('click', excluir);
        }

        idProduto++;
    }
    else{
        setTimeout(() => {
            alertProdutos.innerHTML = `<div class="alert alert-danger">Por favor, preencha os campos corretamente!</div>`
        }, 200);
    }
}

function validarCampos(produto, quantidade, valorUni){
    if(produto == '' || quantidade <= 0  || valorUni <= 0){
        return false;
    }
    else{
        return true;
    }
}

function exibirTabela(listaProdutos){
    const tabelaProdutos = document.querySelector('#lista-produtos');
    tabelaProdutos.innerHTML = '';
    
    for(let i = 0; i < listaProdutos.length; i++){
        tabelaProdutos.innerHTML += 
        `
            <tr>
                <td>${listaProdutos[i].id}</td>
                <td>${listaProdutos[i].produto}</td>
                <td>${listaProdutos[i].quantidade}</td>
                <td>R$ ${listaProdutos[i].valorUnitario}</td>
                <td>R$ ${listaProdutos[i].valorTotalProduto}</td>
                <td><a class="btn-excluir"><img id="e${listaProdutos[i].id}" src="/img/btn_excluir.png" alt="Botão de exluir"></a></td>
            </tr>
        `
    }
}

function excluir(evt){
    let str = evt.target.id;
    const idProdutoEvt = str.replace(/[^0-9]/g, '');

    let vetAux = [];
    for(let i = 0; i < listaProdutos.length; i++){
        console.log(listaProdutos[i].id)
        console.log(idProdutoEvt)
        if(listaProdutos[i].id != idProdutoEvt){
            console.log('salva');
            vetAux.push(listaProdutos[i]);
        }
        else{
            console.log('NAO salva');
        }
    }

    listaProdutos = vetAux;
    exibirTabela(listaProdutos);
}

