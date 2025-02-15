import { Produto } from 'app/models/produtos'

interface TabelaProdutosProps {
  produtos: Array<Produto>
}

export const TabelaProdutos: React.FC<TabelaProdutosProps> = ({
  produtos
}) => {
  return (
    <table className="table is-striped is-hoverable">
      <thead>
        <tr>
          <th>Codigo</th>
          <th>SKU</th>
          <th>nome</th>
          <th>preco</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {
          produtos.map( produto => <ProdutosRow key={produto.id} produto= {produto} />)
        }
      </tbody>
    </table>
  )
}

interface ProdutoRowProps {
  produto: Produto;
}

const ProdutosRow: React.FC<ProdutoRowProps> = ({
  produto
}) => {
  return (
    <tr>
      <td>{produto.id}</td>
      <td>{produto.sku}</td>
      <td>{produto.nome}</td>
      <td>{produto.preco}</td>
      <td>
        <button className="button is-success">Editar</button>
        <button className="button is-danger">Deletar</button>
      </td>
    </tr>
  )
}