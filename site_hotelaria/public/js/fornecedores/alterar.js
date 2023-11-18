// MASCARA PARA TELEFONE
const tel = document.getElementById('fone');
tel.addEventListener('keypress', (e) => mascaraTelefone(e.target.value));
tel.addEventListener('change', (e) => mascaraTelefone(e.target.value));
const mascaraTelefone = (valor) => {
    valor = valor.replace(/\D/g, "");
    valor = valor.replace(/^(\d{2})(\d)/g, "($1) $2");
    valor = valor.replace(/(\d)(\d{4})$/, "$1-$2");
    tel.value = valor ;
}

const btnAlterar = document.querySelector('#btn-alterar');
btnAlterar.addEventListener('click', () => {
    const cnpj = document.querySelector('#cnpj');
    const fone = document.querySelector('#fone');
    const nome = document.querySelector('#nome');
    const alert = document.querySelector('#alert-msg');
    alert.innerHTML = '';

    if(validarCampos(fone.value, nome.value)){

        const json = JSON.stringify({
            cnpj: cnpj.value,
            fone: fone.value,
            nome: nome.value,
        })

        fetch('/adm/fornecedor/alterar', {
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
                setTimeout(() => {
                    alert.innerHTML = `<div class="alert alert-primary">${resposta2.msg}</div>`
                }, 200);
            }
            else{
                setTimeout(() => {
                    alert.innerHTML = `<div class="alert alert-danger">${resposta2.msg}</div>`
                }, 200);
            }
        });
    }
    else{
        setTimeout(() => {
            alert.innerHTML = `<div class="alert alert-danger">Por favor, preencha os campos corretamente!</div>`
        }, 200);
    }
});

function validarCampos(fone, nome){
    if(fone.length <= 13  || nome == ''){
        return false;
    }
    else{
        return true;
    }
}


