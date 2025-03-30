package io.github.inatandev.vendasapi.model.repositories;

import io.github.inatandev.vendasapi.model.Cliente;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface ClienteRepository extends JpaRepository<Cliente, Long> {

    @Query("SELECT c FROM Cliente c WHERE UPPER(c.nome) like UPPER(:nome) and c.cpf like :cpf")
    Page<Cliente> buscarPorCpfNome(@Param("nome") String nome, @Param("cpf") String cpf, Pageable pageable);
}
