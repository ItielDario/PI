const ItensCompraModel = require('../models/ItensCompraModel');


class RelatorioController {

   async relatorioView(req, res) {
        const fornecedor = new ItensCompraModel();
        const listaRelatorio = await fornecedor.listaCompleta();
        res.render('relatorio/index', {layout: 'relatorio/index', lista: listaRelatorio});
    }

    async filter(req, res) {

        var orderItem = new ItensCompraModel();
        var term = req.body.term == '' ? null : req.body.term;
        var dateIn = req.body.dateIn == '' ? 'empty' : req.body.dateIn;
        var dateOut = req.body.dateOut == '' ? 'empty' : req.body.dateOut;
        var list = await orderItem.ordersFilter(req.body.criteria, term, dateIn, dateOut);

        res.send({list: list});
        
    }
}

module.exports = RelatorioController;