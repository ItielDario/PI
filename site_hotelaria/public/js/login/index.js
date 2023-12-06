
document.addEventListener('DOMContentLoaded', function() {

    document.getElementById("btnEntrar").addEventListener('click', autenticar);
    function autenticar() {

        let email = document.querySelector("#email").value;
        let senha = document.querySelector("#senha").value;

        if(email != "" && senha != ""){

            let body = {
                email: email,
                senha: senha 
            }

            fetch('/login', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(body)
            }).then(function(r) {
                return r.json()
            }).then(function(r) {
                if(r.status == true){
                    window.location.href = "/adm";
                }
                else{
                    document.getElementById("msgRetorno").innerHTML = '<p style="color: #ff0000;background-color: #f8d7da; border-color: #d6e9c6;padding: 15px; margin-bottom: 20px; border: 1px solid transparent; border-radius: 4px;">'+ r.msg +'</p>';
                    setTimeout(() => {
                        document.getElementById("msgRetorno").innerHTML = '';
                      }, 4000);
                }
            })

        }
        else{
            alert("Usuário/Senha inválidos!");
        }
    }
})