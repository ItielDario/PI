
const ProdutosModel = require("../models/ProdutosModel");
const FornecedoresModel = require("../models/fornecedorModel");

class ProdutosController {

    // GET - Visualisar lista de produtos
    async produtosView(req, res) {
        let produto = new ProdutosModel();
        let listaProdutos = await produto.visualisarProduos()
        res.render('produtos/listarProdutos', {layout: 'produtos/listarProdutos', listaProdutos: listaProdutos});
    }

    // GET - Visualizar formulário de add produtos
    async adicionarView(req, res) {
        let fornecedor = new FornecedoresModel();
        let listaFornecedores = await fornecedor.listarFornecedores();
        res.render('produtos/adicionarProdutos', {layout: 'produtos/adicionarProdutos', listaFornecedores: listaFornecedores});
    }

    // POST - Adicionar produtos
    async adicionar(req, res) {
        if(req.body.nomeProduto != '' && req.body.descricaoProduto != '' && req.body.precoProduto != '' && req.body.qtdProduto != '', req.body.fornecedorProduto != '') {
            
            let produto = new ProdutosModel(0, req.body.nomeProduto, req.body.descricaoProduto, req.body.precoProduto, req.body.qtdProduto, req.body.fornecedorProduto);
            let retorno = await produto.adicionarProduto();
            if(retorno == true) {
                res.send({ok: true, msg: 'Produto adicionado'});
            }
            else {
                res.send({ok: false, msg: 'Erro ao adicionar produto'});
            }
        }
        else {
            res.send({ok: false, msg: 'Dados inválidos'});
        }
    }

    // GET - Visualisar formulario de alterar produto
    async alterarView(req, res) {
        if(req.params.id != undefined) {
            let produto = new ProdutosModel();
            produto = await produto.obterProduto(req.params.id);
            let fornecedor = new FornecedoresModel();
            let listaFornecedores = await fornecedor.visualisarFornecedores();
            res.render('produtos/alterarProdutos', {produto: produto, listaFornecedores: listaFornecedores});
        }
        else {
            res.redirect('/');
        }
    }

    // PUT - Alterar produto
    async alterar(req, res) {

        if(req.body.idProduto > 0 && req.body.nomeProduto != '' && req.body.descricaoProduto != '' && req.body.precoProduto > 0 && req.body.qtdProduto != '') {
            let produto = new ProdutosModel(req.body.idProduto, req.body.nomeProduto, req.body.descricaoProduto, req.body.precoProduto, req.body.qtdProduto, req.body.fornecedorId);
            let retorno = await produto.adicionarProduto();

            if(retorno == true) {
                res.send({ok: true, msg: 'Dados atualizados'});
            }
            else {
                res.send({ok: false, msg: 'Erro ao atualizar produto'});
            }
        }
        else {
            res.send({ok: false, msg: 'Dados Inválidos'});
        }
    }
    
    async excluir(req, res) {
        if(req.body.id != undefined && req.body.id != '') {
            
            let produto = new ProdutosModel();
            let retorno = await produto.excluirProduto(req.body.id);

            if(retorno == true) {
                res.send({ok: true, msg: 'Produto Excluído'});
            }
            else {
                res.send({ok: false, msg: 'Erro ao excluir o produto'});
            }
        }
        else {
            res.send({ok: false, msg: 'Dados inválidos'});
        }
    }
}

module.exports = ProdutosController;