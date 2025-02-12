import { useState } from 'react'
import { Layout, Input, Message } from 'components'
import { useProdutoService } from 'app/services'
import { Produto } from 'app/models/produtos'
import { converterEmBigDecimal } from 'app/util/money'
import { Alert } from 'components/common/message'
import * as yup from 'yup'

const msgCampoObrigatorio = "Campo Obrigatorio";

const validationSchema = yup.object().shape({
  sku: yup.string().trim().required(msgCampoObrigatorio),
  nome: yup.string().trim().required(msgCampoObrigatorio),
  preco: yup.number().required(msgCampoObrigatorio).moreThan(0, "Valor deve ser maior que 0,00(ZERO)"),
  descricao: yup.string().trim().required(msgCampoObrigatorio)
})

export const CadastroProdutos: React.FC = () => {

  const service = useProdutoService()
  const [ sku, setSku ] = useState<string>('')
  const [ preco, setPreco ] = useState<string>('')
  const [ nome, setNome ] = useState<string>('')
  const [ descricao, setDescricao ] = useState<string>('')
  const [ id, setId ] = useState<string>('')
  const [ cadastro, setCadastro ] = useState<string>('')
  const [ messages, setMessages ] = useState<Array<Alert>>([])

  const submit = () => {
    const produto: Produto = {id, sku,preco: converterEmBigDecimal(preco) , nome, descricao }

    validationSchema.validate(produto).then(obj => {
      if(id){
        service.atualizar(produto).then(response => {setMessages([{
          tipo: "success", texto: "Produto atualizado com sucesso!"
        }])})
      }else{
  
        service.salvar(produto).then(produtoResposta => {
          setId(produtoResposta.id ?? '')
          setCadastro(produtoResposta.cadastro ?? '')
          setMessages([{
            tipo: "success", texto: "Produto salvo com sucesso!"
          }])
        })
      }
    }).catch(err => {
      const field = err.path;
      const message = err.message;

      setMessages([{
        tipo: "danger", field, texto: message
      }])
    })

  }

  return (
    <Layout titulo="Produtos" mensagens={messages}>

      {id && 
        <div className="columns">

          <Input label="Código:" columnClasses="is-half" value={id} id="inputId" disabled/> 

          <Input label="Data Cadastro:" columnClasses="is-half" value={cadastro} id="inputDataCadastro" disabled />

        </div> 
      }
      
      <div className="columns">

        <Input label="SKU: *" columnClasses="is-half" onChange={setSku} value={sku} id="inputSku" placeholder="Digite o SKU do produto" /> 

        <Input label="Preço: *" columnClasses="is-half" onChange={setPreco} value={preco} id="inputPreco" placeholder="Digite o Preço do produto" currency maxLength={16}/>

      </div>  

      <div className="columns">

        <Input label="Nome: *" columnClasses="is-full" onChange={setNome} value={nome} id="inputNome" placeholder="Digite o Nome do produto" />

      </div>

      <div className="columns">  
        <div className="field is-full column" >
          <label className="label" htmlFor="inputDescricao" >Descrição: *</label>
          <div className="control">
            <textarea className="textarea" id="inputDescricao" value={descricao} onChange={event => setDescricao(event.target.value)}
              placeholder="Digite o Descrição detalhada do produto" />
          </div>
        </div>
      </div>  

      <div className="field is-grouped" >
        <div className="control">
          <button onClick={submit} className="button is-link">

            {
              id ? "Atualizar" : "Salvar"
            }

          </button>
        </div>

        <div className="control">
          <button className="button is-link is-light">Voltar</button>
        </div>
      </div>
    </Layout>
  )
}