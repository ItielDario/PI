const Database = require('../utils/database');
const CompraModel = require('../models/CompraModel');

const conexao = new Database();
let comprasId = new CompraModel();



class ItensCompraModel {
    #codCompra
    #codProduto
    #quantidade
    #valorUni

    constructor(codProduto, quantidade, valorUni){
        this.#codProduto = codProduto;
        this.#quantidade = quantidade;
        this.#valorUni = valorUni;
        
    }

    async gravarItensCompra(){
        let ultimoId = await comprasId.listarCompra()
        this.#codCompra = ultimoId;
        

        var sql = 'INSERT INTO tb_itens_compra (ite_com_cod, ite_pro_cod, ite_quantidade, ite_valor_uni) VALUES (?, ?, ?, ?)';
        var valores = [
            this.#codCompra,
            this.#codProduto,
            this.#quantidade,
            this.#valorUni,
        ];

        const query = await conexao.executaltarComandoCUD(sql, valores);
        const compra = query;
        return compra;
    }
}

module.exports = ItensCompraModel;