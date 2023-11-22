const FornecedorModel = require('../models/fornecedorModel');
const ProdutosModel = require('../models/ProdutosModel');


class ComprasController{

    comprasView(req, res){
        res.render('compras/index', {layout: 'compras/index'});
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
                console.log('false');
                res.send({ok: false, msg: "Produto não cadastrado!"});
            }
            
        }
        else {
            res.send({ok: false, msg: "Por favor, preencha os campos corretamente!"});
        }
    }

    async cadastrarCompra(req, res){
        console.log(req.body)
    }
}

module.exports = ComprasController;