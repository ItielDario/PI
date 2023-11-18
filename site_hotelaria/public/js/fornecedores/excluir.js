const btnExclusao = document.querySelectorAll('.btn-excluir');
const alertMsg = document.querySelector('#alert-msg');

for (let i = 0; i < btnExclusao.length; i++){
    btnExclusao[i].addEventListener('click', (evt) => {

        const cnpjSelecionado = {
            cnpj: evt.target.id
        };

        fetch('/adm/fornecedor', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(cnpjSelecionado),
        })
        .then((resposta1) => {
            return resposta1.json();
        })
        .then((resposta2) => {
            if(resposta2.ok){
                window.location.reload();
            }
            else{
                alert(resposta2.msg)
            }
        })
    }); 
}