const Database = require('../utils/database');

const conexao = new Database();


class FornecedorModel {
    #cnpj
    #fone
    #nome

    constructor(cnpj = 0, fone = 0, nome = 0){
        this.#cnpj = cnpj;
        this.#fone = fone;
        this.#nome = nome;
    }

    async listarFornecedores(){
        let lista = []
        const sql = 'SELECT * FROM tb_fornecedor';

        const linhas = await conexao.executaltarComandoLista(sql);

        for(let i = 0; i < linhas.length; i++){
            lista.push(linhas[i]);
        }
        return lista;
    }

    async gravarFornecedor(create){
        if(create){    
            var sql = 'INSERT INTO tb_fornecedor (for_cnpj, for_fone, for_razao_social) VALUES (? , ?, ?)';

            var valores = [
                this.#cnpj,
                this.#fone,
                this.#nome
            ];
        }
        else{
            var sql = 'UPDATE tb_fornecedor SET for_fone = ?, for_razao_social = ? WHERE for_cnpj = ?';

            var valores = [
                this.#fone,
                this.#nome,
                this.#cnpj,
            ];
        }
        
        const query = await conexao.executaltarComandoCUD(sql, valores);
        const fornecedor = query;
        return fornecedor;
    }

    async excluirFornecedor(cnpj){
        const sql = 'DELETE FROM tb_fornecedor WHERE for_cnpj = ?';
        const valor = cnpj;

        const query = await conexao.executaltarComandoCUD(sql, valor);
        return query;
    }

    async buscarFornecedor(cnpj){ 
        const sql = 'SELECT * FROM tb_fornecedor WHERE for_cnpj = ?';
        const valor = cnpj;

        const query = await conexao.executaltarComandoR(sql, valor);
        return query;
    }
}

module.exports = FornecedorModel;