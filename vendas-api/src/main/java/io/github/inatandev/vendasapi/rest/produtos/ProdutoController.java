package io.github.inatandev.vendasapi.rest.produtos;

import io.github.inatandev.vendasapi.model.Produto;
import io.github.inatandev.vendasapi.repositories.ProdutoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/produtos")
@CrossOrigin("*")
public class ProdutoController {

    @Autowired
    private ProdutoRepository repository;

    @PostMapping
    public ProdutoFormRequest salvar( @RequestBody ProdutoFormRequest produto) {

        Produto entity = produto.toModel();
        repository.save(entity);
        produto.setId(entity.getId());
        return ProdutoFormRequest.fromModel(entity);
    }

    @PutMapping("{id}")
    public ResponseEntity<Void> atualizar(@PathVariable Long id, @RequestBody ProdutoFormRequest produto ) {
        Optional<Produto> produtoExistente = repository.findById(id);

        if (produtoExistente.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        Produto entity = produto.toModel();
        entity.setId(id);
        repository.save(entity);

        return ResponseEntity.ok().build();
    }
}
