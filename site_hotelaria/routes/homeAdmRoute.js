const express = require('express');
const HomeAdmController = require('../controllers/homeAdmController');
const ProdutosController = require('../controllers/produtosController');
const fornecedorController = require('../controllers/fornecedorController');

class HomeAdmRoute {

    #router;
    get router() {
        return this.#router;
    }
    set router(router) {
        this.#router = router;
    }

    constructor() {
        this.#router = express.Router();
        let ctrlHome = new HomeAdmController();
        let ctrlProduto = new ProdutosController();
        let ctrlFornecedor = new fornecedorController()

        this.#router.get('/', ctrlHome.homeView);

        // PRODUTOS
        this.#router.get('/produto', ctrlProduto.produtosView);
        this.#router.get('/produto/adicionar', ctrlProduto.adicionarView);
        this.#router.post('/produto/adicionar', ctrlProduto.adicionar);
        this.#router.get('/produto/alterar/:id', ctrlProduto.alterarView);
        this.#router.put('/produto/alterar', ctrlProduto.alterar);
        this.#router.delete('/produto/excluir', ctrlProduto.excluir);

        //FORNECEDOR
        this.#router.get("/fornecedor", ctrlFornecedor.listarView);
        this.#router.post("/fornecedor", ctrlFornecedor.excluir);
        this.#router.get("/fornecedor/cadastrar", ctrlFornecedor.cadastrarView);
        this.#router.post('/fornecedor/cadastrar', ctrlFornecedor.cadastrar);
        this.#router.get('/fornecedor/alterar/:cnpj', ctrlFornecedor.alterarView);
        this.#router.post('/fornecedor/alterar', ctrlFornecedor.alterar); 
        
    }
}

module.exports = HomeAdmRoute;