import { useState, useEffect } from 'react'
import { Layout, Input, InputMoney } from 'components'
import { useProdutoService } from 'app/services'
import { Produto } from 'app/models/produtos'
import { converterEmBigDecimal, formatReal } from 'app/util/money'
import { Alert } from 'components/common/message'
import * as yup from 'yup'
import Link from 'next/link'
import { useRouter } from 'next/router' 

const msgCampoObrigatorio = "Campo Obrigatorio";

const validationSchema = yup.object().shape({
  sku: yup.string().trim().required(msgCampoObrigatorio),
  nome: yup.string().trim().required(msgCampoObrigatorio),
  preco: yup.number().required(msgCampoObrigatorio).moreThan(0, "Valor deve ser maior que 0,00(ZERO)"),
  descricao: yup.string().trim().required(msgCampoObrigatorio)
})

interface FormErros {
  sku?: string;
  nome?: string;
  preco?: string;
  descricao?: string;
}

export const CadastroProdutos: React.FC = () => {

  const service = useProdutoService()
  const [ sku, setSku ] = useState<string>('')
  const [ preco, setPreco ] = useState<string>('')
  const [ nome, setNome ] = useState<string>('')
  const [ descricao, setDescricao ] = useState<string>('')
  const [ id, setId ] = useState<string>('')
  const [ cadastro, setCadastro ] = useState<string>('')
  const [ messages, setMessages ] = useState<Array<Alert>>([])
  const [ erros, setErros ] = useState<FormErros>({}) 
  const router = useRouter();
  const { id:queryId } = router.query;

  useEffect( () => {
    if(queryId){
      service.carregarProduto(queryId).then(produtoEncontrado => {
        setId(produtoEncontrado.id || '')
        setSku(produtoEncontrado.sku || '')
        setNome(produtoEncontrado.nome || '')
        setDescricao(produtoEncontrado.descricao || '')
        setCadastro(produtoEncontrado.cadastro || '')
        setPreco(formatReal(`${produtoEncontrado.preco}`))
      })
    }
  } , [queryId] )

  const submit = () => {
    const produto: Produto = {id, sku,preco: converterEmBigDecimal(preco) , nome, descricao }

    validationSchema.validate(produto).then(obj => {
      setErros({})

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

      setErros({
        [field]: message
      })

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

        <Input label="SKU: *" columnClasses="is-half" onChange={ e => setSku(e.target.value) } value={sku} id="inputSku" placeholder="Digite o SKU do produto" error={erros.sku}/> 

        <InputMoney label="Preço: *" columnClasses="is-half" onChange={ e => setPreco(e.target.value) } value={preco} id="inputPreco" placeholder="Digite o Preço do produto" maxLength={16} error={erros.preco} />

      </div>  

      <div className="columns">

        <Input label="Nome: *" columnClasses="is-full" onChange={ e => setNome(e.target.value) } value={nome} id="inputNome" placeholder="Digite o Nome do produto" error= {erros.nome} />

      </div>

      <div className="columns">  
        <div className="field is-full column" >
          <label className="label" htmlFor="inputDescricao" >Descrição: *</label>
          <div className="control">
            <textarea className="textarea" id="inputDescricao" value={descricao} onChange={event => setDescricao(event.target.value)}
              placeholder="Digite o Descrição detalhada do produto" />
            { erros.descricao && <p className= "help is-danger" >{erros.descricao}</p> }  
          </div>
        </div>
      </div>  

      <div className="field is-grouped" >
        <div className="control">
          <button onClick={submit} className="button is-link is-success">

            {
              id ? "Atualizar" : "Salvar"
            }

          </button>
        </div>

        <div className="control">
          <Link href="/consultas/produtos">
            <button className="button is-link is-light">Voltar</button>
          </Link>  
        </div>
      </div>
    </Layout>
  )
}