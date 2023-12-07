document.addEventListener('DOMContentLoaded', function() {

    const btnAlterar = document.querySelector('.btn-alterar');
    const alert = document.querySelector('#alert-msg');

    btnAlterar.addEventListener('click', alterar);

    function alterar() {

        let idProduto = btnAlterar.dataset.id;
        let nomeProduto = document.querySelector('#nomeProduto');
        let descricaoProduto = document.querySelector('#descricaoProduto');
        let precoProduto = document.querySelector('#precoProduto');
        let qtdProduto = document.querySelector('#qtdProduto');

        if(validar(idProduto, nomeProduto, descricaoProduto, precoProduto, qtdProduto)) {

            let produto = {
                idProduto: idProduto,
                nomeProduto: nomeProduto.value,
                descricaoProduto: descricaoProduto.value,
                precoProduto: parseFloat(precoProduto.value).toFixed(2),
                qtdProduto: qtdProduto.value,
            }

            fetch('/adm/produto/alterar', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
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
                }
                else {
                    setTimeout(() => {
                        alert.innerHTML = `<div class="alert alert-danger">${r.msg}</div>`
                    }, 200);
                }
            })
        }
        else{
            setTimeout(() => {
                alert.innerHTML = `<div class="alert alert-danger">Por favor, preencha os campos corretamente!</div>`
            }, 200);
        }
    }
    function validar(idProduto, nomeProduto, descricaoProduto, precoProduto, qtdProduto) {

        nomeProduto.style["border-color"] = "";
        descricaoProduto.style["border-color"] = "";
        precoProduto.style["border-color"] = "";
        qtdProduto.style["border-color"] = "";
        alert.innerHTML = '';

        let erros = [];
        if(idProduto.value == "")
            erros.push(idProduto);
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
                erros[i].style["border-color"] = "";
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