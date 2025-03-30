CREATE TABLE financas.usuario
(
    id number(19) NOT NULL PRIMARY KEY,
    nome varchar2(150),
    email varchar2(100),
    senha varchar2(20),
    data_cadastro date default systimestamp
);

CREATE TABLE financas.lancamento
(
    id number(19) NOT NULL PRIMARY KEY ,
    descricao varchar2(100) NOT NULL,
    mes number(10) NOT NULL,
    ano number(10) NOT NULL,
    valor number(16,2),
    tipo varchar2(20),
    status varchar2(20),
    id_usuario number(19) REFERENCES financas.usuario (id),
    data_cadastro date default systimestamp
);