module.exports = function (app) {
    var listaProdutos = function (req, res, next) {
        console.log("Atendendo Requisição GET em /produtos");

        var connection = app.infra.connectionFactory();
        var produtosBancoDAO = new app.infra.ProdutosDAO(connection);

        produtosBancoDAO.lista(function (erros, results) {
            console.log(erros);
            if (erros) {
                return next(erros);
            }

            res.format({
                html: function () {
                    res.render('produtos/lista', {
                        lista: results
                    });
                },
                json: function () {
                    res.json(results);
                }
            });

        });

        connection.end();
    }

    app.get('/produtos', listaProdutos);

    app.get('/produtos/form', function (req, res) {
        console.log("> Atendendo a Requisição GET em /produtos/form");

        res.render('produtos/form', {
            errosValidacao: {},
            produto: {}
        });
    });

    app.post('/produtos', function (req, res) {
        console.log("> Atendendo a Requisição POST em /produtos/form");

        var produto = req.body;

        req.assert('titulo', 'Campo obrigatório').notEmpty();
        req.assert('preco', 'Formato invalido').notEmpty();
        var erros = req.validationErrors();
        if (erros) {
            res.format({
                html: function () {
                    res.status(400).render('produtos/form', {
                        errosValidacao: erros,
                        produto: produto
                    });
                },
                json: function () {
                    res.status(400).json(erros);
                }
            });
            return;
        }

        console.log("   Subindo novo produto:")
        console.log(produto);

        var connection = app.infra.connectionFactory();
        var produtosBancoDAO = new app.infra.ProdutosDAO(connection);

        produtosBancoDAO.salva(produto, function (erros, resultados) {
            res.redirect('/produtos')
        });
    });
}
