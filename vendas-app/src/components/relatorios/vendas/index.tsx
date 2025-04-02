import { Layout } from 'components/layout'
import { useFormik } from 'formik'
import { Page } from 'app/models/common/page'
import { Cliente } from 'app/models/clientes'
import { AutoComplete, AutoCompleteCompleteEvent } from 'primereact/autocomplete'
import { InputDate } from 'components/'
import { useState } from 'react'
import { useClienteService, useVendaService } from 'app/services'
import { Button } from 'primereact/button'

interface RelatorioVendasForm {
  cliente: Cliente;
  dataInicio: string;
  dataFim: string;
}

export const RelatorioVendas: React.FC = () => {

  const vendaService = useVendaService();
  const clienteService = useClienteService();
  const [ listaClientes, setListaClientes] = useState<Page<Cliente>>({
    content: [], first: 0, number: 0, size: 20, totalElements: 0 
  })

  const handleSubmit = (formData: RelatorioVendasForm) => {
    vendaService.gerarRelatorioVendas(formData.cliente?.id, formData.dataInicio, formData.dataFim).then(blob => {
      const fileURL = URL.createObjectURL(blob);
      window.open(fileURL);
    });
  }

  const formik = useFormik<RelatorioVendasForm>({
    onSubmit: handleSubmit,
    initialValues: {
      cliente: null,
      dataInicio: '',
      dataFim: ''
    }
  })

  const handleClienteAutocomplete = (e: AutoCompleteCompleteEvent) => {
    const nome = e.query;
    clienteService.find(nome, '', 0, 20).then(clientes => setListaClientes(clientes))
  }

  return (
    <Layout titulo="Relatório de vendas">
      <form onSubmit={formik.handleSubmit} >
        <div className="p-fluid">
          <div className="grid" >
            <div className="col-12" >
              <AutoComplete suggestions={listaClientes.content} completeMethod={handleClienteAutocomplete} value={formik.values.cliente} field="nome" id="cliente" name="cliente" onChange={(e: AutoCompleteCompleteEvent) => {
                formik.setFieldValue("cliente", e.value)
              }} />
            </div>
            <div className="col-6" >
              <InputDate id="dataInicio" name="dataInicio" label="Data Início" value={formik.values.dataInicio} onChange={formik.handleChange} />
            </div>
            <div className="col-6" >
            <InputDate id="dataFim" name="dataFim" label="Data Fim" value={formik.values.dataFim} onChange={formik.handleChange} />
            </div>
            <div className="col" >
              <Button type="submit" label="Gerar Relatório" />
            </div>
          </div>
        </div>
      </form>
    </Layout>
  )
}