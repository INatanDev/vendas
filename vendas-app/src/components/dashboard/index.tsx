import { Card } from 'primereact/card';
import { Chart } from 'primereact/chart';
import { useState, useEffect } from 'react'
import { VendaPorMes } from 'app/models/dashboard'
import { MESES } from 'app/util/meses'

interface DashboardProps {
  clientes?: number;
  produtos?: number;
  vendas?: number;
  vendasPorMes?: VendaPorMes[];
}

export const Dashboard: React.FC<DashboardProps> = ({
  clientes,
  produtos,
  vendas,
  vendasPorMes
}) => {

  const [ chartData, setChartData ] = useState({});

  const carregaDadosGrafico = () => {
    const labels: string[] = vendasPorMes?.map(vm => MESES[vm.mes -1]);
    const valores = vendasPorMes?.map(vm => vm.valor);

    const dadosGrafico = {
      labels: labels,
      datasets: [
        {
          label: "Valor Mensal",
          backgroundColor: '#42A5F5',
          data: valores
        }
      ]
    }

    setChartData(dadosGrafico);
  }

  useEffect(carregaDadosGrafico, []);

  const produtosStyle = {
    background: "red",
    color: "white"
  } 

  const clienteStyle = {
    background: "blue",
    color: "white"
  }

  const vendaStyle = {
    background: "green",
    color: "white"
  }

  return (
    <div className="p-fluid">
      <div className="grid">
        <div className="col">
          <Card title="Produtos" style={produtosStyle} >
            <p className="p-m-0">{produtos}</p>
          </Card>
        </div>
        <div className="col">
          <Card title="Clientes" style={clienteStyle} >
            <p className="p-m-0">{clientes}</p>
          </Card>
        </div>
        <div className="col">
          <Card title="Vendas" style={vendaStyle} >
            <p className="p-m-0">{vendas}</p>
          </Card>
        </div>
      </div>
      <div className="grid" >
        <div className="col">
          <Chart type="bar" data={chartData}  />
        </div>
      </div>
    </div>
  )
}