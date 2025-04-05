package io.github.inatandev.vendasapi.rest.dashboard;

import io.github.inatandev.vendasapi.model.repositories.ClienteRepository;
import io.github.inatandev.vendasapi.model.repositories.ProdutoRepository;
import io.github.inatandev.vendasapi.model.repositories.VendaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDate;

@RestController
@RequestMapping("/api/dashboard")
public class DashboardController {

    @Autowired
    private VendaRepository vendas;

    @Autowired
    private ClienteRepository clientes;

    @Autowired
    private ProdutoRepository produtos;

    @GetMapping
    public DashboardData getDashboardData() {
        long vendasCount = vendas.count();

        long clientesCount = clientes.count();

        long produtosCount = produtos.count();

        int anoCorrente = LocalDate.now().getYear();
        var vendasPorMes = vendas.obterSomatoriaVendasPorMes(anoCorrente);

        return new DashboardData(produtosCount, clientesCount, vendasCount, vendasPorMes);
    }
}
