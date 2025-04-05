package io.github.inatandev.vendasapi.model.repositories.projections;

import java.math.BigDecimal;

public interface VendaPorMes {

    Integer getMes();
    BigDecimal getValor();
}
