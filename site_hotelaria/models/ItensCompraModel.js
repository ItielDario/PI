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

    async listaCompleta(){
        let lista = []
        const sql = 'select i.ite_com_cod, f.for_razao_social , p.pro_nome, i.ite_quantidade, i.ite_valor_uni, c.com_valor_total, c.com_data, c.com_desconto from tb_itens_compra i inner join tb_compra c on i.ite_com_cod = c.com_cod inner join tb_produto p on i.ite_pro_cod = p.pro_cod inner join tb_fornecedor f on c.com_for_cnpj = f.for_cnpj order by i.ite_com_cod asc';

        const linhas = await conexao.executaltarComandoLista(sql);

        for(let i = 0; i < linhas.length; i++){
            lista.push(linhas[i]);
        }
        return lista;
    }
}

module.exports = ItensCompraModel;