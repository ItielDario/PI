const FornecedorModel = require('../models/fornecedorModel');


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

    async cadastrarCompra(req, res){
        console.log(req.body)
    }
}

module.exports = ComprasController;