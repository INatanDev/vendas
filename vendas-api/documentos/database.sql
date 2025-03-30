CREATE DATABASE VENDAS;

CREATE TABLE PRODUTO(
     ID BIGSERIAL NOT NULL PRIMARY KEY,
     NOME VARCHAR(100) NOT NULL,
     DESCRICAO VARCHAR(255),
     PRECO NUMERIC(16,2),
     SKU VARCHAR(20),
     DATA_CADASTRO DATE
);

CREATE TABLE cliente(
     ID BIGSERIAL NOT NULL PRIMARY KEY,
     NASCIMENTO DATE NOT NULL,
     NOME VARCHAR(100) NOT NULL,
     ENDERECO VARCHAR(255) NOT NULL,
     CPF VARCHAR(14) NOT NULL,
     TELEFONE VARCHAR(14),
     EMAIL VARCHAR(100),
     DATA_CADASTRO DATE
);

CREATE TABLE VENDA(
      ID BIGSERIAL NOT NULL PRIMARY KEY,
      ID_CLIENTE BIGINT REFERENCES CLIENTE(ID) NOT NULL,
      FORMA_PAGAMENTO VARCHAR(8) CHECK( FORMA_PAGAMENTO IN('DINHEIRO', 'CARTAO'))  NOT NULL,
      TOTAL NUMERIC(16,2) NOT NULL
);

CREATE TABLE ITEM_VENDA(
      ID BIGSERIAL NOT NULL PRIMARY KEY,
      ID_VENDA BIGINT REFERENCES VENDA(ID) NOT NULL,
      ID_PRODUTO BIGINT REFERENCES PRODUTO(ID) NOT NULL,
      QUANTIDADE INTEGER NOT NULL
);

