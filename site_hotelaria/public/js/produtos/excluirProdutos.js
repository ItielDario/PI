document.addEventListener('DOMContentLoaded', function() {

    let btnExcluir = document.querySelectorAll('.btnExclusao');

    for(let i=0; i<btnExcluir.length; i++) {
        btnExcluir[i].onclick = excluir;
    }

    function excluir() {

        let idExcluir = this.dataset.id;
        if(confirm('Tem certeza que deseja excluir?')) {

            if(idExcluir != undefined && idExcluir != '') {

                fetch('/produtos/excluir', {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({id: idExcluir})
                })
                .then((r) => {
                    return r.json();
                })
                .then((r) => {
                    if(r.ok) {
                        window.location.reload();
                    }
                    else {
                        alert(r.msg);
                    }
                })
            }
        }
    }
})