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

// MASCARA PARA CNPJ
document.getElementById('cnpj').addEventListener('input', function (e) {
    var x = e.target.value.replace(/\D/g, '').match(/(\d{0,2})(\d{0,3})(\d{0,3})(\d{0,4})(\d{0,2})/);
    e.target.value = !x[2] ? x[1] : x[1] + '.' + x[2] + '.' + x[3] + '/' + x[4] + (x[5] ? '-' + x[5] : '');
});

const btnCadastrar = document.querySelector('#btn-cadastrar');
btnCadastrar.addEventListener('click', () => {
    const cnpj = document.querySelector('#cnpj');
    const fone = document.querySelector('#fone');
    const nome = document.querySelector('#nome');
    const alert = document.querySelector('#alert-msg');
    alert.innerHTML = '';
    cnpj.style["border-color"] = "";
    fone.style["border-color"] = "";
    nome.style["border-color"] = "";

    if(validarCNPJ(cnpj.value)){
        if(validarCampos(cnpj.value,fone.value, nome.value)){

            const json = JSON.stringify({
                cnpj: cnpj.value,
                fone: fone.value,
                nome: nome.value,
            })

            fetch('/adm/fornecedor/cadastrar', {
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

                    cnpj.value = ''
                    fone.value = ''
                    nome.value = ''
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
    }   
    else{
        setTimeout(() => {
            alert.innerHTML = `<div class="alert alert-danger">O CNPJ está incorreto!</div>`
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

function validarCNPJ(cnpj) {
 
    cnpj = cnpj.replace(/[^\d]+/g,'');
 
    if(cnpj == '') return false;
     
    if (cnpj.length != 14)
        return false;
 
    // Elimina CNPJs invalidos conhecidos
    if (cnpj == "00000000000000" || 
        cnpj == "11111111111111" || 
        cnpj == "22222222222222" || 
        cnpj == "33333333333333" || 
        cnpj == "44444444444444" || 
        cnpj == "55555555555555" || 
        cnpj == "66666666666666" || 
        cnpj == "77777777777777" || 
        cnpj == "88888888888888" || 
        cnpj == "99999999999999")
        return false;
         
    // Valida DVs
    tamanho = cnpj.length - 2
    numeros = cnpj.substring(0,tamanho);
    digitos = cnpj.substring(tamanho);
    soma = 0;
    pos = tamanho - 7;
    for (i = tamanho; i >= 1; i--) {
      soma += numeros.charAt(tamanho - i) * pos--;
      if (pos < 2)
            pos = 9;
    }
    resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
    if (resultado != digitos.charAt(0))
        return false;
         
    tamanho = tamanho + 1;
    numeros = cnpj.substring(0,tamanho);
    soma = 0;
    pos = tamanho - 7;
    for (i = tamanho; i >= 1; i--) {
      soma += numeros.charAt(tamanho - i) * pos--;
      if (pos < 2)
            pos = 9;
    }
    resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
    if (resultado != digitos.charAt(1))
          return false;
           
    return true;
    
}


