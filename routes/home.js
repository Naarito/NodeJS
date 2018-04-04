module.exports = function (app) {
    app.get('/', function (req, res) {
        var connection = app.infra.connectionFactory();
        var produtosBancoDAO = new app.infra.ProdutosDAO(connection);

        produtosBancoDAO.lista(function (erros, results) {
            res.render('home/index', {
                livros: results
            });
        });
        connection.end();
    });
}
