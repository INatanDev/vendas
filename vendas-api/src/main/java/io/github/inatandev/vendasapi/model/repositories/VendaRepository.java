package io.github.inatandev.vendasapi.model.repositories;

import io.github.inatandev.vendasapi.model.Venda;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface VendaRepository extends JpaRepository<Venda, Long> {
}
