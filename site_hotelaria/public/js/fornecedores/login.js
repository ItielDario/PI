document.querySelector('#btn-entrar').addEventListener('click', () => {

  const email = document.querySelector('#email');
  const senha = document.querySelector('#senha');
  const alert = document.querySelector('#alert-msg');
  alert.innerHTML = '';

  if(validarCampos(email.value, senha.value)){
    const usuario = {
      email: email.value,
      senha: senha.value,
    }

    fetch('/login', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(usuario), 
    })
    .then((resposta1) => {
      return resposta1.json();
    })
    .then((resposta2) => {
      if(resposta2.ok){
        window.location.href = '/';
      }
      else{
        setTimeout(() => {
          alert.innerHTML = `<div class="alert alert-danger">${resposta2.msg}</div>`
        }, 200);
      }
    })
  }
  else{
    setTimeout(() => {
      alert.innerHTML = `<div class="alert alert-danger">Por favor, preencha os campos abaixo!</div>`
    }, 200);
  }
})

function validarCampos(email, senha){

  if(email != '' && senha != ''){
    return true;
  }
  else{
    return false;
  }
}
