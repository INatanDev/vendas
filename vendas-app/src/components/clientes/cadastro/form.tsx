import { Cliente } from 'app/models/clientes'
import { useFormik } from 'formik'
import { Input, InputCPF, InputTelefone, InputDate } from 'components'
import { validationScheme } from './validationScheme'
import Router from 'next/router'

interface ClienteFormProps {
  cliente: Cliente;
  onSubmit: (cliente: Cliente ) => void;
}

const formScheme: Cliente = {
  cadastro: '',
  cpf: '',
  dataNascimento: '',
  email: '',
  endereco: '',
  id: '',
  nome: '',
  telefone: ''
}

export const ClienteForm: React.FC<ClienteFormProps> = ({cliente, onSubmit}) => {

  const formik = useFormik<Cliente>({
    initialValues: { ...formScheme, ...cliente },
    onSubmit,
    enableReinitialize: true,
    validationSchema: validationScheme
  })

  return (
    <form onSubmit={formik.handleSubmit}>
      {formik.values.id &&
        <div className="columns" >
          <Input id="id" name="id" disabled value={formik.values.id} label="Codigo: " autoComplete="off" columnClasses="is-half" />
          <Input id="cadastro" name="cadastro" disabled value={formik.values.cadastro} label="Data Cadastro: " autoComplete="off" columnClasses="is-half" />
        </div>
      }
      <div className="columns"  >
        <Input id="nome" name="nome" onChange={formik.handleChange} value={formik.values.nome} label="Nome: *" autoComplete="off" columnClasses="is-full" error={formik.errors.nome} />  
      </div>
      
      <div className="columns" >
        <InputCPF id="cpf" name="cpf" onChange={formik.handleChange} value={formik.values.cpf} label="CPF: *" autoComplete="off" columnClasses="is-half" error={formik.errors.cpf} />
        <InputDate id="dataNascimento" name="dataNascimento" onChange={formik.handleChange} value={formik.values.dataNascimento} label="Data Nascimento: *" autoComplete="off" columnClasses="is-half" error={formik.errors.dataNascimento} />
      </div>
      
      <div className="columns"  >
        <Input id="endereco" name="endereco" onChange={formik.handleChange} value={formik.values.endereco} label="Endereco: *" autoComplete="off" columnClasses="is-full" error={formik.errors.endereco} />  
      </div>  

      <div className="columns" >
        <Input id="email" name="email" onChange={formik.handleChange} value={formik.values.email} label="Email: *" autoComplete="off" columnClasses="is-half" error={formik.errors.email} />
        <InputTelefone id="telefone" name="telefone" onChange={formik.handleChange} value={formik.values.telefone} label="Telefone: *" autoComplete="off" columnClasses="is-half" error={formik.errors.telefone} />
      </div>

      <div className="field is-grouped" >
        <div className="control is link" >
          <button type="submit" className="button is-success" >
            {formik.values.id ? "Atualizar" : "Salvar" }
          </button>

        </div>
        <div className="control">  
          <button type="button" onClick={e => Router.push("/consultas/clientes")} className="button is-light" >
            Voltar
          </button>
        </div>  
      </div>
    </form>
  )
}