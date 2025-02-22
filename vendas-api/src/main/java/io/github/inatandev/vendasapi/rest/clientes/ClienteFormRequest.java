package io.github.inatandev.vendasapi.rest.clientes;

import io.github.inatandev.vendasapi.model.Cliente;

import java.time.LocalDate;

public class ClienteFormRequest {

    private Long id;
    private String nome;
    private String cpf;
    private String email;
    private String telefone;
    private String endereco;
    private LocalDate dataNascimento;
    private LocalDate cadastro;

    public ClienteFormRequest() {
    }

    public ClienteFormRequest(Long id, String nome, String cpf, String email, String telefone, String endereco, LocalDate dataNascimento, LocalDate cadastro) {
        this.id = id;
        this.nome = nome;
        this.cpf = cpf;
        this.email = email;
        this.telefone = telefone;
        this.endereco = endereco;
        this.dataNascimento = dataNascimento;
        this.cadastro = cadastro;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getCpf() {
        return cpf;
    }

    public void setCpf(String cpf) {
        this.cpf = cpf;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getTelefone() {
        return telefone;
    }

    public void setTelefone(String telefone) {
        this.telefone = telefone;
    }

    public String getEndereco() {
        return endereco;
    }

    public void setEndereco(String endereco) {
        this.endereco = endereco;
    }

    public LocalDate getDataNascimento() {
        return dataNascimento;
    }

    public void setDataNascimento(LocalDate dataNascimento) {
        this.dataNascimento = dataNascimento;
    }

    public LocalDate getCadastro() {
        return cadastro;
    }

    public void setCadastro(LocalDate cadastro) {
        this.cadastro = cadastro;
    }

    public Cliente toModel(){
        return new Cliente(id, dataNascimento, nome, cpf, email, telefone, endereco, cadastro);
    }

    public static ClienteFormRequest fromModel(Cliente cliente){
        return new ClienteFormRequest(cliente.getId(), cliente.getNome(), cliente.getCpf(), cliente.getEmail(), cliente.getTelefone(), cliente.getEndereco(), cliente.getNascimento(), cliente.getDataCadastro());
    }
}
