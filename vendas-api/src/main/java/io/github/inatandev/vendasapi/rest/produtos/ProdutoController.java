package io.github.inatandev.vendasapi.rest.produtos;

import io.github.inatandev.vendasapi.model.Produto;
import io.github.inatandev.vendasapi.model.repositories.ProdutoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/produtos")
@CrossOrigin("*")
public class ProdutoController {

    @Autowired
    private ProdutoRepository repository;

    @GetMapping
    public List<ProdutoFormRequest> getList() {
        return repository.findAll().stream().map( ProdutoFormRequest :: fromModel ).collect(Collectors.toList());
    }

    @GetMapping("{id}")
    public ResponseEntity<ProdutoFormRequest> getById(@PathVariable Long id){
        Optional<Produto> produtoExistente = repository.findById(id);
        if(produtoExistente.isEmpty()){
            return ResponseEntity.notFound().build();
        }

        var produto = produtoExistente.map(ProdutoFormRequest::fromModel).get();
        return ResponseEntity.ok(produto);
    }

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

    @DeleteMapping("{id}")
    public ResponseEntity<Void> deletar(@PathVariable Long id){
        Optional<Produto> produtoExistente = repository.findById(id);

        if (produtoExistente.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        repository.delete(produtoExistente.get());
        return ResponseEntity.noContent().build();
    }
}
