document.addEventListener('DOMContentLoaded', function() {

    document.querySelector('#btn-cadastrar').addEventListener('click', adicionar);

    function adicionar() {
        let nomeProduto = document.querySelector('#nomeProduto');
        let descricaoProduto = document.querySelector('#descricaoProduto');
        let precoProduto = document.querySelector('#precoProduto');
        let qtdProduto = document.querySelector('#qtdProduto');
        const alert = document.querySelector('#alert-msg');

        if(validar(nomeProduto, descricaoProduto, precoProduto, qtdProduto)) {

            let produto = {
                nomeProduto: nomeProduto.value,
                descricaoProduto: descricaoProduto.value,
                precoProduto: parseFloat(precoProduto.value).toFixed(2),
                qtdProduto: qtdProduto.value,
            }

            fetch('/adm/produto/adicionar', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                }, 
                body: JSON.stringify(produto)
            })
            .then((r) => {
                return r.json();
            })
            .then((r) => {
                if(r.ok) {
                    setTimeout(() => {
                        alert.innerHTML = `<div class="alert alert-primary">${r.msg}</div>`
                    }, 200);
                    
                    nomeProduto.value = ''
                    descricaoProduto.value = ''
                    precoProduto.value = ''
                    qtdProduto.value = ''
                    
                }
                else {
                    setTimeout(() => {
                        alert.innerHTML = `<div class="alert alert-danger">${r.msg}</div>`
                    }, 200);
                }
            })
        }
    }
    function validar(nomeProduto, descricaoProduto, precoProduto, qtdProduto) {

        alert.innerHTML = '';
        nomeProduto.style["border-color"] = "";
        descricaoProduto.style["border-color"] = "";
        precoProduto.style["border-color"] = "";
        qtdProduto.style["border-color"] = "";

        let erros = [];
        if(nomeProduto.value == "")
            erros.push(nomeProduto);
        if(descricaoProduto.value == "")
            erros.push(descricaoProduto);
        if(precoProduto.value == "" || precoProduto.value <= 0)
            erros.push(precoProduto);
        if(qtdProduto.value < 0 || qtdProduto.value == "")
            erros.push(qtdProduto);

        if(erros.length > 0) {
            for(let i = 0; i<erros.length; i++){
                erros[i].style["border-color"] = "red";
            }
            setTimeout(() => {
                alert.innerHTML = `<div class="alert alert-danger">Por favor, preencha os campos corretamente!</div>`
            }, 200);
            return false;
        }
        else {
            return true;
        }
    }
})