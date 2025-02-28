import { Cliente } from 'app/models/clientes';
import { Layout } from 'components'
import { Input, InputCPF } from 'components'
import { useFormik } from 'formik'
import { useState } from 'react';
import { DataTable, DataTableStateEvent } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { Page } from 'app/models/common/page'
import { useClienteService } from 'app/services/'
import { Button } from 'primereact/button'
import Router from 'next/router'

interface ConsultaClientesForm{
  nome?: string;
  cpf?: string;
}

export const ListagemClientes: React.FC = () => {

  const service = useClienteService();

  const [loading, setLoading] = useState<boolean>(false)

  const [clientes, setClientes] = useState<Page<Cliente>>({
    content: [],
    first: 0,
    number: 0,
    size: 10,
    totalElements: 0
  });

  const handleSubmit = (filtro: ConsultaClientesForm) => {
    handlePage(null);
  }

  const {handleSubmit: formikSubmit, values: filtro, handleChange} = useFormik<ConsultaClientesForm> ({
    onSubmit: handleSubmit,
    initialValues: {nome: '',cpf: ''}
  })

  const handlePage = (event: DataTableStateEvent ) => {
    setLoading(true)
    service.find(filtro.nome, filtro.cpf, event?.page, event?.rows)
    .then(result => {  
        setClientes({ ...result, first: event?.first })
    })
    .finally(() => setLoading(false));
  }

  const deletar = (cliente: Cliente) => {
    service.deletar(cliente.id).then(result => {
      handlePage(null)
    })
  }

  const actionTemplate = (registro: Cliente) => {
    const url = `/cadastros/clientes?id=${registro.id}`
    return (
      <div>
        <Button label="Editar" onClick={e => Router.push( url ) } className="p-button-rounded p-button-info" />
        <Button label="Deletar" onClick={e => deletar( registro ) }
                        className="p-button-rounded p-button-danger" /> 
      </div>
    )
  }

  return (
    <Layout titulo="Clientes">
      <form onSubmit={formikSubmit}>
        <div className="columns">
          <Input id="nome" name="nome" autoComplete="off" columnClasses="is-half" onChange={handleChange} value={filtro.nome} label="nome" />
          <InputCPF id="cpf" name="cpf" autoComplete="off" columnClasses="is-half" onChange={handleChange} value={filtro.cpf} label="cpf" />
        </div>

        <div className="field is-grouped" >
          <div className="control is link" >
            <button type="submit" className="button is-success" >
              Consultar
            </button>
          </div>

          <div className="control is link" >
            <button type="submit" onClick={e => Router.push("/cadastros/clientes")} className="button is-warning" >
              Novo
            </button>
          </div>
        </div>
      </form>

      <br /><br />

      <div className="columns">
        <div className="is-full" style={{ width: '100%' }} >
          <DataTable value={clientes?.content }
          style={{ width: '100%' }} 
          totalRecords={clientes.totalElements} 
          lazy paginator first={clientes.first}
          rows={clientes.size} onPage={handlePage} loading={loading} emptyMessage="Nenhum registro." dataKey="id" >
            <Column field="id" header="Código" />
            <Column field="nome" header="Nome" />
            <Column field="cpf" header="CPF" />
            <Column field="email" header="Email" />
            <Column body={actionTemplate} />
          </DataTable>
        </div>
      </div>
    </Layout>
  )
}