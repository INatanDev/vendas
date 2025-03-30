package io.github.inatandev.vendasapi.rest.vendas;

import io.github.inatandev.vendasapi.model.Venda;
import io.github.inatandev.vendasapi.model.repositories.ItemVendaRepository;
import io.github.inatandev.vendasapi.model.repositories.VendaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/vendas")
@CrossOrigin("*")
public class VendasController {

    @Autowired
    private VendaRepository repository;

    @Autowired
    private ItemVendaRepository itemVendaRepository;

    @PostMapping
    @Transactional
    public void realizarVenda( @RequestBody Venda venda ) {
        repository.save(venda);
        venda.getItens().stream().forEach( iv -> iv.setVenda(venda));
        itemVendaRepository.saveAll(venda.getItens());
    }
}
