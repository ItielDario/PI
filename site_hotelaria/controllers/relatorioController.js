const ItensCompraModel = require('../models/ItensCompraModel');


class RelatorioController {

   async relatorioView(req, res) {
        const fornecedor = new ItensCompraModel();
        const listaRelatorio = await fornecedor.listaCompleta();
        res.render('relatorio/index', {layout: 'relatorio/index', lista: listaRelatorio});
    }
}

module.exports = RelatorioController;