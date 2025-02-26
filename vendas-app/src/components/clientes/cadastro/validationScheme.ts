import * as Yup from 'yup'

const campoObrigatorioMensagem = "Campo Obrigatorio";
const campoObrigratorioValidation = Yup.string().trim().required(campoObrigatorioMensagem);

export const validationScheme = Yup.object().shape({
  cpf: Yup.string().trim().required(campoObrigatorioMensagem).length(14, "CPF Invalido!"),
  dataNascimento: Yup.string().trim().required(campoObrigatorioMensagem).length(10, "Data Invalida") ,
  email: Yup.string().trim().required(campoObrigatorioMensagem).email("Email Invalido"),
  endereco: campoObrigratorioValidation,
  nome: campoObrigratorioValidation,
  telefone: campoObrigratorioValidation
})