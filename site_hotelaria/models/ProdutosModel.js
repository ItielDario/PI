const Database = require('../utils/database');
const conexao = new Database;

class ProdutosModel {

    #produtoId;
    #produtoNome;
    #produtoDescricao;
    #produtoPreco;
    #produtoQtd;
    #fornecedorId;

    get produtoId() { return this.#produtoId; }
    set produtoId(produtoId) { this.#produtoId = produtoId; }
    get produtoNome() { return this.#produtoNome; }
    set produtoNome(produtoNome) { this.#produtoNome = produtoNome; }
    get produtoDescricao() { return this.#produtoDescricao; }
    set produtoDescricao(produtoDescricao) { this.#produtoDescricao = produtoDescricao; }
    get produtoPreco() { return this.#produtoPreco; }
    set produtoPreco(produtoPreco) { this.#produtoPreco = produtoPreco; }
    get produtoQtd() { return this.#produtoQtd; }
    set produtoQtd(produtoQtd) { this.#produtoQtd = produtoQtd; }
    get fornecedorId() { return this.#fornecedorId; }
    set fornecedorId(fornecedorId) { this.#fornecedorId = fornecedorId; }
                                  
    constructor(produtoId, produtoNome, produtoDescricao, produtoPreco, produtoQtd, fornecedorId) {
        this.#produtoId = produtoId;
        this.#produtoNome = produtoNome;
        this.#produtoDescricao = produtoDescricao;
        this.#produtoPreco = produtoPreco;
        this.#produtoQtd = produtoQtd;
        this.#fornecedorId = fornecedorId;
    }
    
    // Visualizar Produtos
    async visualisarProduos() {
        let lista = []
        let sql = 'select * from tb_produto';
        let linhas = await conexao.executaltarComandoLista(sql);

        for(let i = 0; i < linhas.length; i++){
            lista.push(linhas[i]);
        }
        return lista;
    }

    // Obter Produto
    async obterProduto(id) {
        let sql = 'select * from tb_produto where pro_cod = ?'
        let valores = [id];
        let rows = await conexao.executaltarComandoR(sql, valores);

        if(rows.length > 0) { 
            let produto = rows;
            
            return produto;
        }
    }

    // Adicionar Produto
    async adicionarProduto() {
        if(this.#produtoId == 0) {
            let sql = 'insert into tb_produto (pro_nome, pro_descricao, pro_estoque, pro_preco) values (?, ?, ?, ?)';
            let valores = [this.#produtoNome, this.#produtoDescricao, this.#produtoQtd, this.#produtoPreco];
            let result = await conexao.executaltarComandoCUD(sql, valores);
            
            return result;
        }
        // Alterar Produto
        else {
            let sql = 'update tb_produto set pro_nome = ?, pro_descricao = ?, pro_estoque = ?, pro_preco = ? where pro_cod = ?';
            let valores = [this.#produtoNome, this.#produtoDescricao, this.#produtoQtd, this.#produtoPreco, this.#produtoId];
            let result = await conexao.executaltarComandoCUD(sql, valores);

            return result;
        }
    }

    // Excluir Produto
    async excluirProduto(id) {
        let sql = 'delete from tb_produto where pro_cod = ?';
        let valores = [id];

        let result = await conexao.executaltarComandoCUD(sql, valores);

        return result;
    }
}

module.exports = ProdutosModel;