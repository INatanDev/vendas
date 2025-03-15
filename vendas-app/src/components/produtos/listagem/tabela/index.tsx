import { Produto } from 'app/models/produtos'
import { useRef } from 'react'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { Button } from 'primereact/button'
import { confirmDialog, ConfirmDialog } from 'primereact/confirmdialog'
import { Toast } from 'primereact/toast';

interface TabelaProdutosProps {
  produtos: Array<Produto>;
  onEdit: (produto) => void;
  onDelete: (produto) => void;
}

export const TabelaProdutos: React.FC<TabelaProdutosProps> = ({
  produtos,
  onEdit,
  onDelete
}) => {
  const toast = useRef<Toast>(null);

  const accept1 = () => {
      toast.current?.show({ severity: 'info', summary: 'Confirmed', detail: 'Aceito a Confirmação!', life: 3000 });
  }

  const reject = () => {
    toast.current?.show({ severity: 'warn', summary: 'Rejected', detail: 'Voce rejeitou!', life: 3000 });
  }

  const confirmDelete = (registro: Produto) => {
    confirmDialog({
      message: "Confirma a exclusão deste registro?",
      header: "Confirmação",
      acceptLabel: "Sim",
      rejectLabel: "Não",
      accept: () => {onDelete(registro)},
      reject
    });
  };

  const actionTemplate = (registro: Produto) => {
    const url = `/cadastros/produtos?id=${registro.id}`
    return (
    <>  
      <div>
        <Button label="Editar" onClick={e => onEdit(registro) } className="p-button-rounded p-button-info" />
        <Button label="Deletar" className="p-button-rounded p-button-danger" 
          onClick={ () => confirmDelete(registro) }
        /> 
      </div>
    </>  
    )
  }

  return (
    <>
      <Toast ref={toast} />
      <ConfirmDialog />

      <DataTable value={produtos} paginator rows={5}>
        <Column field="id" header = "Código" />
        <Column field="sku" header = "SKU" />
        <Column field="nome" header = "Nome" />
        <Column field="preco" header = "Preço" />
        <Column header = "" body={actionTemplate} />
      </DataTable >  
    </>
  )
}