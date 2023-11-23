const Database = require('../utils/database');

const conexao = new Database();


class CompraModel {
    #cnpj
    #numNota
    #dataNota
    #valorNota
    #desconto

    constructor(cnpj, numNota, dataNota, valorNota, desconto){
        this.#cnpj = cnpj;
        this.#numNota = numNota;
        this.#dataNota = dataNota;
        this.#valorNota = valorNota;
        this.#desconto = desconto;
    }

    async gravarCompra(){
        var sql = 'INSERT INTO tb_compra (com_for_cnpj, com_num_nota, com_data, com_valor_total, com_desconto) VALUES (?, ?, ?, ?, ?)';
        var valores = [
            this.#cnpj,
            this.#numNota,
            this.#dataNota,
            this.#valorNota,
            this.#desconto,
        ];

        const query = await conexao.executaltarComandoCUD(sql, valores);
        const compra = query;
        return compra;
    }

    async listarCompra(){
        var sql = 'SELECT com_cod FROM tb_compra ORDER BY com_cod ASC';

        const query = await conexao.executaltarComandoLista(sql);
        const comprasId = query;

        for(let i = 0; i < comprasId.length; i++){
            if(i == comprasId.length - 1){
                var ultimoId = comprasId[i].com_cod;
            }
        }

        return ultimoId;
    }
}

module.exports = CompraModel;