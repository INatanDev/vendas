import { Layout } from 'components'
import { Venda } from 'app/models/vendas'
import { VendasForm } from './form'
import { useVendaService } from 'app/services'
import { Alert } from 'components/common/message'
import { useState } from 'react'

export const Vendas: React.FC = () => {

  const service = useVendaService();
  const [mensagem, setMensagem] = useState<Alert[]>([]);
  const [vendaRealizada, setVendaRealizada] = useState<Boolean>(false);

  const handleSubmit = (venda: Venda) => {
    console.log(venda)
    service.realizarVenda(venda).then(response => {
      setMensagem([{ 
        tipo: "success",
        texto: "Venda realizada com sucesso!"
        }])
        setVendaRealizada(true);
    }).catch(error => {
      console.log(error);
      setMensagem([{
        texto: "Ocorreu um erro, entre em contato com o administrador do sistema!",
        tipo: "danger"
        }])
    })
  }

  const handleNovaVenda = () => {
    setVendaRealizada(false);
    setMensagem([]);
  }

  return (
    <Layout titulo='Venda' mensagens={mensagem}>
      <VendasForm onSubmit={handleSubmit} vendaRealizada={vendaRealizada} onNovaVenda={handleNovaVenda} />
    </Layout>
  )
}