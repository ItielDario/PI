document.addEventListener('DOMContentLoaded', function() {

    document.querySelector('#btnAlterar').addEventListener('click', alterar);

    function alterar() {

        let idProduto = document.querySelector('#alterarId');
        let nomeProduto = document.querySelector('#nomeProduto');
        let descricaoProduto = document.querySelector('#descricaoProduto');
        let precoProduto = document.querySelector('#precoProduto');
        let qtdProduto = document.querySelector('#qtdProduto');
        let fornecedorId = document.querySelector('#produtoFornecedor')

        if(validar(idProduto, nomeProduto, descricaoProduto, precoProduto, qtdProduto)) {

            let produto = {
                idProduto: idProduto.value,
                nomeProduto: nomeProduto.value,
                descricaoProduto: descricaoProduto.value,
                precoProduto: parseFloat(precoProduto.value).toFixed(2),
                qtdProduto: qtdProduto.value,
                fornecedorId: fornecedorId.value,
            }

            fetch('/produtos/alterar', {
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
                    window.location.reload();
                }
                else {
                    alert(r.msg)
                }
            })
        }
    }
    function validar(idProduto, nomeProduto, descricaoProduto, precoProduto, qtdProduto) {

        nomeProduto.style["border-color"] = "";
        descricaoProduto.style["border-color"] = "";
        precoProduto.style["border-color"] = "";
        qtdProduto.style["border-color"] = "";

        let erros = [];
        if(idProduto.value != document.querySelector('#alterarId').value){
            alert('Algo estranho aconteceu com a ID do produto');
            window.location.href = '/';
        }
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

            return false;
        }
        else {

            return true;
        }
    }
})