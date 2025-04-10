import { Layout } from 'components'
import { ClienteForm } from './form';
import { useState } from 'react';
import { Cliente } from 'app/models/clientes'
import { useClienteService } from 'app/services';
import { Alert } from 'components/common/message';
import { useRouter } from 'next/router'
import { useEffect } from 'react'

export const CadastroCliente: React.FC = () => {

  const [cliente, setCliente] = useState<Cliente>({});
  const [mensagem, setMensagem] = useState<Array<Alert>>([])
  const service = useClienteService();
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if(id) {
      service.carregarCliente(id).then(clienteEncontrado => setCliente(clienteEncontrado))
    }
  }, [id])

  const handleSubmit = (cliente: Cliente) => {
    if(cliente.id){
      service.atualizar(cliente).then(response => {
        setMensagem([{
          tipo: "success", texto: "Cliente atualizado com sucesso!"
        }])
      })
    }else{
      service.salvar(cliente).then(clienteSalvo => {
        setCliente(clienteSalvo);
        setMensagem([{
          tipo: "success", texto: "Cliente salvo com sucesso!"
        }])
      })
    }
  }

  return (
    <Layout titulo="Clientes" mensagens={mensagem}>
      <ClienteForm cliente={cliente} onSubmit={handleSubmit} />
    </Layout>
  )
}