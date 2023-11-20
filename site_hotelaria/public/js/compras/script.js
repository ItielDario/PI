const btnAdicionar = document.querySelector('#btn-adicionar');
let listaProdutos = [];
let valorTotalCompra = 0;

btnAdicionar.addEventListener('click', adicionarProduto);

function adicionarProduto(){
    const alertProdutos = document.querySelector('#alert-msg-produtos');
    const desconto = document.querySelector('#desconto');
    const produto = document.querySelector('#produto');
    const quantidade = document.querySelector('#quantidade');
    const valorUni = document.querySelector('#valor-uni');
    const tabelaProdutos = document.querySelector('#lista-produtos');
    const valorTotalProduto = document.querySelector('.valor-total-produtos');
    
    
    tabelaProdutos.innerHTML = '';
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
            produto: `${produto.value}`,
            quantidade: `${quantidade.value}`,
            valorUnitario: (valorUni.value * 1).toFixed(2),
            valorTotalProduto: totalProduto.toFixed(2)
        });

        for(let i = 0; i < listaProdutos.length; i++){
            tabelaProdutos.innerHTML += 
            `
                <td>${i}</td>
                <td>${listaProdutos[i].produto}</td>
                <td>${listaProdutos[i].quantidade}</td>
                <td>R$ ${listaProdutos[i].valorUnitario}</td>
                <td>R$ ${listaProdutos[i].valorTotalProduto}</td>
                <td><a class="btn-excluir"><img id="${i}" src="/img/btn_excluir.png" alt="Botão de exluir"></a></td>
            `
        }

        valorTotalProduto.innerHTML = `<h3>Valor total: R$ ${valorTotalCompra.toFixed(2)} </h3>`;
        produto.value = '';
        produto.focus();
        quantidade.value = '';
        valorUni.value = '';

        desconto.addEventListener('keyup', () => {
            let valorComDesconto = valorTotalCompra - desconto.value;

            valorTotalProduto.innerHTML = `<h3>Valor total: R$ ${valorComDesconto.toFixed(2)} </h3>`;
        })

        const boteosExcluir = document.querySelector('.btn-excluir');
        console.log(boteosExcluir)
        for(let i = 0; i < boteosExcluir.length; i++){
            boteosExcluir[i].addEventListener('clcik', (evt) => {
                console.log(evt)
            });
        }
        
       
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

function excluir(evt){
    console.log(evt.target.id)
}