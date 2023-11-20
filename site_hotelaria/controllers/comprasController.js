const FornecedorModel = require('../models/fornecedorModel');


class ComprasController{

    async comprasView(req, res){
        res.render('compras/index', {layout: 'compras/index'});
    }

    
    
}

module.exports = ComprasController;