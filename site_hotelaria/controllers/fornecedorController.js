const FornecedorModel = require('../models/fornecedorModel');


class FornecedorController{

    async listarView(req, res){
        const fornecedor = new FornecedorModel();
        const listaFornecedores = await fornecedor.listarFornecedores();
        res.render('fornecedores/listar', {layout: 'fornecedores/listar', lista: listaFornecedores});
    }

    cadastrarView(req, res){
        res.render('fornecedores/cadastrar', {layout: 'fornecedores/cadastrar'});
    }

    async cadastrar(req, res) {
        if(req.body.cnpj != '' && req.body.fone != '' && req.body.nome != ''){
            const fornecedor = new FornecedorModel(req.body.cnpj, req.body.fone, req.body.nome);

            const resultado = await fornecedor.gravarFornecedor(true);

            if(resultado){
                res.send({ok: true, msg: "Fornecedor cadastrado com sucesso!"});
            }
            else{
                res.send({ok: false, msg: "Erro ao cadastrar o fornecedor!"});
            }
        }
        else{
            res.send({ok: false, msg: "Dados inválidos!"});
        }
    }

    async excluir(req, res){
        const fornecedor = new FornecedorModel();
        const resposta = await fornecedor.excluirFornecedor(req.body.cnpj);

        if(resposta){
            res.send({ok: true, msg: 'Fornecedor deletado com sucesso!'});
        }
        else{
            res.send({ok: false, msg: 'Erro ao deletar fornecedor!'});
        }
    }

    async alterarView(req, res){

        // MASCARA CNPJ
        function mascararCNPJ(cnpj) {
            // Remove qualquer caractere que não seja dígito
            cnpj = cnpj.replace(/\D/g, '');
            
            // Aplica a máscara de CNPJ (XX.XXX.XXX/XXXX-XX)
            return cnpj.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/, '$1.$2.$3/$4-$5');
        }        
        const cnpjOriginal = req.params.cnpj;
        const cnpjFormatado = mascararCNPJ(cnpjOriginal);

        const fornecedor = new FornecedorModel();
        const resposta = await fornecedor.buscarFornecedor(cnpjFormatado)
        
        res.render('fornecedores/alterar', {layout: 'fornecedores/alterar', cnpj: resposta[0].for_cnpj, fone: resposta[0].for_fone, nome: resposta[0].for_razao_social});
    }
    
    async alterar(req, res){
        if(req.body.cnpj != '' && req.body.fone != '' && req.body.nome != ''){
            const fornecedor = new FornecedorModel(req.body.cnpj, req.body.fone, req.body.nome);

            const resultado = await fornecedor.gravarFornecedor(false);

            if(resultado){
                res.send({ok: true, msg: "Fornecedor alterado com sucesso!"});
            }
            else{
                res.send({ok: false, msg: "Erro ao alterar o fornecedor!"});
            }
        }
        else{
            res.send({ok: false, msg: "Dados inválidos!"});
        }
    }
}

module.exports = FornecedorController;