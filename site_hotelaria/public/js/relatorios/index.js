document.addEventListener('DOMContentLoaded', function() {

    var date = new Date().toLocaleDateString()

    document.querySelector('#exportPDF').addEventListener('click', exportPDF);

    function exportPDF() {

        var title = document.title;
        document.title = 'Report created on ' + date;
        window.print();
        document.title = title;

    }

    document.querySelector('#exportEXCEL').addEventListener('click', exportExcel);

    function exportExcel() {

        var wb = XLSX.utils.table_to_book(document.querySelector('.relatGeral'));
        XLSX.writeFile(wb, 'Report created on ' + date + '.xlsx');

    }

    document.querySelector('#btnSearch').addEventListener('click', tableFilter);

    function mountOrders(list) {

        var tbody = `<tbody>`;

        list.forEach(function(value, index) {

            tbody += `<tr class="align-middle text-center">
                            <td class="align-middle" style="font-weight: 400;">${value.ite_com_cod}</td>
                            <td class="align-middle" style="font-weight: 400;">${value.for_razao_social}</td>
                            <td class="align-middle" style="font-weight: 400;">${value.pro_nome}</td>
                            <td class="align-middle" style="font-weight: 400;">${value.ite_quantidade}</td>
                            <td class="align-middle" style="font-weight: 400;">${value.ite_valor_uni}</td>
                            <td class="align-middle" style="font-weight: 400;">${value.com_data}</td>
                            <td class="align-middle" style="font-weight: 400;">${value.com_desconto}</td>
                      </tr>`

        })

        tbody += `</tbody>`;

        document.querySelector('.relatGeral > tbody').innerHTML = tbody;

    }

    function tableFilter() { 
        var searchCriteria = document.querySelector('input[name="searchCriteria"]:checked').value;
        var searchTerm = document.querySelector('#inputSearch').value;

        fetch('/adm/relatorio-geral/filter', {

            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({criteria: searchCriteria, term: searchTerm})

        })
        .then(r => {
            
            return r.json();

        })
        .then(r => {
  
            if(r.list.length > 0) {
                
                mountOrders(r.list);

            }
            else {

                document.querySelector('.relatGeral > tbody').innerHTML = '<tr class="align-middle"></tr>';

            }

        })
        .catch(e => {

            console.log(e);

        })

    }

})
