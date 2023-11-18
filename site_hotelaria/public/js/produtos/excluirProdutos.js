document.addEventListener('DOMContentLoaded', function() {
 
    let btnExcluir = document.querySelectorAll('.btn-excluir');

    for(let i=0; i<btnExcluir.length; i++) {
        btnExcluir[i].onclick = excluir;
    }

    function excluir() {

        let idExcluir = this.id;        

        if(confirm('Tem certeza que deseja excluir?')) {

            if(idExcluir != undefined && idExcluir != '') {

                idExcluir = {
                    id: idExcluir
                };

                fetch('/adm/produto/excluir', {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(idExcluir)
                })
                .then((r) => {
                    return r.json();
                })
                .then((r) => {
                    if(r.ok) {
                        window.location.reload();
                    }
                    else {
                        setTimeout(() => {
                            alert.innerHTML = `<div class="alert alert-danger">${r.msg}</div>`
                        }, 200);
                    }
                })
            }
        }
    }
})