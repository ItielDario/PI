document.addEventListener('DOMContentLoaded', function() {

    document.querySelector('#btnGravar').addEventListener('click', adicionar);

    function adicionar() {

        let nomeProduto = document.querySelector('#nomeProduto');
        let descricaoProduto = document.querySelector('#descricaoProduto');
        let precoProduto = document.querySelector('#precoProduto');
        let qtdProduto = document.querySelector('#qtdProduto');
        let fornecedorProduto = document.querySelector('#produtoFornecedor');

        if(validar(nomeProduto, descricaoProduto, precoProduto, qtdProduto, fornecedorProduto)) {

            let produto = {
                nomeProduto: nomeProduto.value,
                descricaoProduto: descricaoProduto.value,
                precoProduto: parseFloat(precoProduto.value).toFixed(2),
                qtdProduto: qtdProduto.value,
                fornecedorProduto: fornecedorProduto.value
            }

            fetch('/adm/produto/adicionar', {
                method: 'POST',
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
                    window.location.reload();
                }
                else {
                    alert(r.msg)
                }
            })
        }
    }
    function validar(nomeProduto, descricaoProduto, precoProduto, qtdProduto, fornecedorProduto) {

        nomeProduto.style["border-color"] = "";
        descricaoProduto.style["border-color"] = "";
        precoProduto.style["border-color"] = "";
        qtdProduto.style["border-color"] = "";
        document.querySelector('.nice-select').style["border-color"] = "none";

        let erros = [];
        if(nomeProduto.value == "")
            erros.push(nomeProduto);
        if(descricaoProduto.value == "")
            erros.push(descricaoProduto);
        if(precoProduto.value == "" || precoProduto.value <= 0)
            erros.push(precoProduto);
        if(qtdProduto.value < 0 || qtdProduto.value == "")
            erros.push(qtdProduto);
        if(fornecedorProduto.value == 0)
            document.querySelector('.nice-select').style["border-color"] = "red";

        if(erros.length > 0) {
            for(let i = 0; i<erros.length; i++){
                erros[i].style["border-color"] = "red";
            }

            return false;
        }
        else {

            return true;
        }
    }
})