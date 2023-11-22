const btnAdicionar = document.querySelector('#btn-adicionar');
const btnBuscar = document.querySelector('#btn-cnpj');
const btnGravar = document.querySelector('#btn-gravar');
const cnpj = document.querySelector('#cnpj');
let listaProdutos = [];
let valorTotalCompra = 0;
let valorComDesconto = 0;


// DADOS DA NOTA
cnpj.addEventListener('input', function (e) {
    var x = e.target.value.replace(/\D/g, '').match(/(\d{0,2})(\d{0,3})(\d{0,3})(\d{0,4})(\d{0,2})/);
    e.target.value = !x[2] ? x[1] : x[1] + '.' + x[2] + '.' + x[3] + '/' + x[4] + (x[5] ? '-' + x[5] : '');
});

btnBuscar.addEventListener('click', () => { 
    const alertDados = document.querySelector('#alert-msg-dados');
    alertDados.innerHTML = ''

    if(cnpj.value.length != 18){
        setTimeout(() => {
            alertDados.innerHTML = `<div class="alert alert-danger">Por favor, preencha os campos corretamente!</div>`
        }, 200);
    }
    else{ 
          
        const json = JSON.stringify({
            cnpj: cnpj.value,
        })

        fetch('/adm/compras/buscar', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            }, 
            body: json,
        })
        .then(function(resposta1) {
            return resposta1.json()
        })
        .then(function(resposta2) {
            if(resposta2.ok){
                document.querySelector('#nome').value = resposta2.msg;
                
            }
            else{
                setTimeout(() => {
                    alertDados.innerHTML = `<div class="alert alert-danger">${resposta2.msg}</div>`
                }, 200);
            }
            
        });
    }
});


// LISTA DE PRODUTOS
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

        const id = {
            id: produto.value,
        }

        fetch('/adm/compras/buscar/produto', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            }, 
            body: JSON.stringify(id)
        })
        .then(function(resposta1) {
            return resposta1.json()
        })
        .then(function(resposta2) {
            if(resposta2.ok){
                setTimeout(() => {
                    alertProdutos.innerHTML = `<div class="alert alert-primary">TAÍ MEU CUMPADE</div>`
                }, 200);
                setTimeout(() => {
                    alertProdutos.innerHTML = ''
                }, 3000);

                let totalProduto = Number((valorUni.value * quantidade.value));
        
                listaProdutos.push({
                    id: `${produto.value}`,
                    produto: `${resposta2.msg}`,
                    quantidade: `${quantidade.value}`,
                    valorUnitario: (valorUni.value * 1).toFixed(2),
                    valorTotalProduto: totalProduto.toFixed(2)
                });
        
                exibirTabela(listaProdutos);

                produto.value = '';
                produto.focus();
                quantidade.value = '';
                valorUni.value = '';
        
                desconto.addEventListener('keyup', () => {
                    valorComDesconto = valorTotalCompra - desconto.value;
        
                    valorTotalProduto.innerHTML = `<h3>Valor total: R$ ${valorComDesconto.toFixed(2)} </h3>`;
                })
        
                const btn = document.querySelectorAll(`.btn-excluir`);
                for(let i = 0; i < btn.length; i++){
                    btn[i].addEventListener('click', excluir);
                }
            }
            else{
                setTimeout(() => {
                    alertProdutos.innerHTML = `<div class="alert alert-danger">${resposta2.msg}</div>`
                }, 200);
            }
            
        });
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
    const valorTotalProduto = document.querySelector('.valor-total-produtos');
    tabelaProdutos.innerHTML = '';
    valorTotalCompra = 0;

    for(let i = 0; i < listaProdutos.length; i++){
        valorTotalCompra = (valorTotalCompra + Number(listaProdutos[i].valorTotalProduto));

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

    valorTotalProduto.innerHTML = `<h3>Valor total: R$ ${valorTotalCompra.toFixed(2)} </h3>`;
}

function excluir(evt){
    let str = evt.target.id;
    const idProdutoEvt = str.replace(/[^0-9]/g, '');

    let vetAux = [];
    for(let i = 0; i < listaProdutos.length; i++){
        if(listaProdutos[i].id != idProdutoEvt){
            vetAux.push(listaProdutos[i]);
        }
    }

    listaProdutos = vetAux;
    exibirTabela(listaProdutos);
}


// GRAVAR TODOS OS DADOS
btnGravar.addEventListener('click', () => {
    const alertDados = document.querySelector('#alert-msg-dados');
    const alertValor = document.querySelector('#alert-msg-valor');
    const nome = document.querySelector('#nome');
    const numNota = document.querySelector('#num-nota');
    const dataNota = document.querySelector('#data-nota');
    const valorNota = document.querySelector('#valor-nota');
    const desconto = document.querySelector('#desconto');
    alertDados.innerHTML = ''
    alertValor.innerHTML = ''

    if(valorComDesconto == 0){
        valorComDesconto = valorTotalCompra;
    }

    if(cnpj.value.length != 18 || nome.value == '' || numNota.value < 0 || numNota.value == '' || dataNota.value == '' || valorNota.value < 0 || valorNota.value == ''){
        setTimeout(() => {
            alertDados.innerHTML = `<div class="alert alert-danger">Por favor, preencha os campos corretamente!</div>`
        }, 200);
    }
    else{ 
        if(valorComDesconto != valorNota.value){
            setTimeout(() => {
                alertValor.innerHTML = `<div class="alert alert-danger">O valor da nota é diferente do valor total</div>`
            }, 200);
        }
        else{
            const dadosNota = {
                cnpj: cnpj.value,
                nome: nome.value,
                numNota: numNota.value,
                dataNota: dataNota.value,
                valorNota: valorNota.value,
                desconto: desconto.value,
            }
    
            const dadosCompra = [dadosNota, listaProdutos]
    
            fetch('/adm/compras/cadastrar', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                }, 
                body: JSON.stringify(dadosCompra)
            })
            .then(function(resposta1) {
                return resposta1.json()
            })
            .then(function(resposta2) {
                if(resposta2.ok){
                    document.querySelector('#nome').value = resposta2.msg;
                    
                }
                else{
                    setTimeout(() => {
                        alertDados.innerHTML = `<div class="alert alert-danger">${resposta2.msg}</div>`
                    }, 200);
                }
                
            });
        }
    }
})