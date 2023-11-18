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
        let listaProdutos = []
        let sql = 'select * from tb_produtos p inner join tb_fornecedores f on p.fornecedor_id=f.fornecedor_id ORDER BY p.produto_id DESC';
        let rows = await conexao.ExecutaComando(sql);

        for(let i=0; i< rows.length; i++) {
            let produto = new ProdutosModel(rows[i]['produto_id'], rows[i]['produto_nome'], rows[i]['produto_descricao'], rows[i]['produto_preco'], rows[i]['produto_qtd'], rows[i]['fornecedor_nome']);
            listaProdutos.push(produto);
        }

        return listaProdutos;
    }

    // Obter Produto
    async obterProduto(id) {
        let sql = 'select * from tb_produtos where produto_id=?'
        let valores = [id];
        let rows = await conexao.ExecutaComando(sql, valores);
        if(rows.length > 0) {
            let produto = new ProdutosModel();
            produto.produtoId = rows[0]['produto_id'];
            produto.produtoNome = rows[0]['produto_nome'];
            produto.produtoPreco = rows[0]['produto_preco'];
            produto.produtoDescricao = rows[0]['produto_descricao'];
            produto.produtoQtd = rows[0]['produto_qtd'];
            produto.#fornecedorId = rows[0]['fornecedor_id'];

            return produto;
        }
    }

    // Adicionar Produto
    async adicionarProduto() {
        if(this.#produtoId == 0) {
            let sql = 'insert into tb_produtos (produto_nome, produto_descricao, produto_qtd, produto_preco, fornecedor_id) values (?, ?, ?, ?, ?)';
            let valores = [this.#produtoNome, this.#produtoDescricao, this.#produtoQtd, this.#produtoPreco, this.#fornecedorId];
            let result = await conexao.ExecutaComandoNonQuery(sql, valores);
            
            return result;
        }
        // Alterar Produto
        else {
            let sql = 'update tb_produtos set produto_nome = ?, produto_descricao = ?, produto_qtd = ?, produto_preco = ?, fornecedor_id = ? where produto_id = ?';
            let valores = [this.#produtoNome, this.#produtoDescricao, this.#produtoQtd, this.#produtoPreco, this.#fornecedorId, this.#produtoId];
            let result = await conexao.ExecutaComandoNonQuery(sql, valores);

            return result;
        }
    }

    // Excluir Produto
    async excluirProduto(id) {
        let sql = 'delete from tb_produtos where produto_id = ?';
        let valores = [id];

        let result = await conexao.ExecutaComandoNonQuery(sql, valores);

        return result;
    }
}

module.exports = ProdutosModel;