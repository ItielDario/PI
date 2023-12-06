const FornecedorModel = require('../models/fornecedorModel');
const ProdutosModel = require('../models/ProdutosModel');
const CompraModel = require('../models/CompraModel');
const ItensCompraModel = require('../models/ItensCompraModel');


class ComprasController{

    async comprasView(req, res){
        let produto = new ProdutosModel();
        let listaProdutos = await produto.visualisarProduos()
        res.render('compras/index', {layout: 'compras/index', lista: listaProdutos});
    }

    async buscarCNPJ(req, res){
        
        if(req.body.cnpj != ''){
            const fornecedor = new FornecedorModel();
            const resposta = await fornecedor.buscarFornecedor(req.body.cnpj)
            if(resposta.length > 0){
                res.send({ok: true, msg: resposta[0].for_razao_social});
            }
            else{
                res.send({ok: false, msg: "Fornecedor não cadastrado!"});
            }
        }
        else{
            res.send({ok: false, msg: "Por favor, preencha os campos corretamente!"});
        }
    }   
    
    async buscarProduto(req, res) {
        
        if(req.body.id != undefined) {
            let produto = new ProdutosModel();
            produto = await produto.obterProduto(req.body.id);
            if(produto != undefined){
                res.send({ok: true, msg: produto[0].pro_nome});
            }
            else{
                res.send({ok: false, msg: "Produto não cadastrado!"});
            }
            
        }
        else {
            res.send({ok: false, msg: "Por favor, preencha os campos corretamente!"});
        }
    }

    async cadastrarCompra(req, res){
        let dadosNota = req.body[0];
        let itensNota = req.body[1];

        let compra = new CompraModel(dadosNota.cnpj, dadosNota.numNota, dadosNota.dataNota, dadosNota.valorNota, dadosNota.desconto);
        compra = await compra.gravarCompra();

        if(compra){
            for(let i = 0; i < itensNota.length; i++){
                var itenscompra = new ItensCompraModel(itensNota[i].id, itensNota[i].quantidade, itensNota[i].valorUnitario);
                itenscompra = await itenscompra.gravarItensCompra();

                let produto = new ProdutosModel();
                let produtoResult = await produto.obterProduto(itensNota[i].id);
                let novoEstoque = produtoResult[0].pro_estoque + Number(itensNota[i].quantidade);

                produto.alterarQuantidadeProduto(itensNota[i].id, novoEstoque)
            }

            if(itenscompra){
                res.send({ok: true, msg: "Compra gravada com sucesso!"});
            }
            else{
                res.send({ok: false, msg: "Erro ao gravar compra!"});
            }
        }
        else{
            res.send({ok: false, msg: "Erro ao gravar compra!"});
        }
    }
}

module.exports = ComprasController;