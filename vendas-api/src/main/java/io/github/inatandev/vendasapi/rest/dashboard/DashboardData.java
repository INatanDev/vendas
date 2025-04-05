package io.github.inatandev.vendasapi.rest.dashboard;

import io.github.inatandev.vendasapi.model.Venda;
import io.github.inatandev.vendasapi.model.repositories.projections.VendaPorMes;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

public class DashboardData {

    private Long produtos;

    private Long clientes;

    private Long vendas;

    private List<VendaPorMes> vendasPorMes;

    public DashboardData(Long produtos, Long clientes, Long vendas, List<VendaPorMes> vendasPorMes) {
        this.produtos = produtos;
        this.clientes = clientes;
        this.vendas = vendas;
        this.vendasPorMes = vendasPorMes;
        this.preencherMesesFaltantes();
    }

    public Long getProdutos() {
        return produtos;
    }

    public void setProdutos(Long produtos) {
        this.produtos = produtos;
    }

    public Long getClientes() {
        return clientes;
    }

    public void setClientes(Long clientes) {
        this.clientes = clientes;
    }

    public Long getVendas() {
        return vendas;
    }

    public void setVendas(Long vendas) {
        this.vendas = vendas;
    }

    public List<VendaPorMes> getVendasPorMes() {
        if (vendasPorMes == null) {
            vendasPorMes = new ArrayList<>();
        }
        return vendasPorMes;
    }

    public void setVendasPorMes(List<VendaPorMes> vendasPorMes) {
        this.vendasPorMes = vendasPorMes;
    }

    public void preencherMesesFaltantes() {
        Integer mesMaximo = getVendasPorMes().stream().mapToInt(VendaPorMes :: getMes).max().getAsInt();

        List<Integer> listaMeses = IntStream.rangeClosed(1, mesMaximo).boxed().collect(Collectors.toList());

        List<Integer> mesesAdicionados = getVendasPorMes().stream().map(VendaPorMes::getMes).collect(Collectors.toList());

        listaMeses.stream().forEach(mes -> {
            if(!mesesAdicionados.contains(mes)) {
                VendaPorMes vendaPorMes = new VendaPorMes() {
                    @Override
                    public Integer getMes() {
                        return mes;
                    }

                    @Override
                    public BigDecimal getValor() {
                        return BigDecimal.ZERO;
                    }
                };
                getVendasPorMes().add(vendaPorMes);
            }
        });

        getVendasPorMes().sort(Comparator.comparing(VendaPorMes::getMes));
    }
}
