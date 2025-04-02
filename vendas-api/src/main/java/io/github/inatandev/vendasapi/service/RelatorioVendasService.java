package io.github.inatandev.vendasapi.service;

import net.sf.jasperreports.engine.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.stereotype.Service;

import javax.sql.DataSource;
import java.io.IOException;
import java.sql.Connection;
import java.sql.SQLException;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@Service
public class RelatorioVendasService {

    @Value("classpath:reports/relatorios-vendas.jrxml")
    private Resource relatorioVendasSource;

    @Value("classpath:reports/relatorios-vendas.jasper")
    private Resource relatorioVendasCompilado;

    @Autowired
    private DataSource dataSource;

    /*
    versao: 1
    descricao: metodo principal que e chamado para gerar o arquivo
     */
    public byte[] gerarRelatorio1() {

        try(
                Connection connection = dataSource.getConnection();
            ){

            Map<String, Object> parameters = new HashMap<>();

            JasperPrint print = JasperFillManager.fillReport(relatorioVendasCompilado.getInputStream(), parameters, connection);

            return JasperExportManager.exportReportToPdf(print);

        }catch(SQLException ex){
            ex.printStackTrace();
        } catch (JRException e) {
            throw new RuntimeException(e);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }


        return null;
    }

    /*
    versao: 2
    descricao: testando forma mais simples de geracao de relatorio
     */
    public byte[] gerarRelatorioCompilando() {

        try(
                Connection connection = dataSource.getConnection();
        ){

            JasperReport compiledReport = JasperCompileManager.compileReport(relatorioVendasSource.getInputStream());

            Map<String, Object> parameters = new HashMap<>();

            JasperPrint print = JasperFillManager.fillReport(compiledReport, parameters, connection);

            return JasperExportManager.exportReportToPdf(print);

        }catch(SQLException ex){
            ex.printStackTrace();
        } catch (JRException e) {
            throw new RuntimeException(e);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }


        return null;
    }

    /*
    versao: 3
    descricao: outro metodo modificado formatado
     */
    public byte[] gerarRelatorio(Long idCliente, Date dataInicio, Date dataFim) {

        try(
                Connection connection = dataSource.getConnection();
        ){
            Map<String, Object> parameters = new HashMap<>();
            parameters.put("ID_CLIENTE", idCliente);
            parameters.put("DATA_INICIO", dataInicio);
            parameters.put("DATA_FIM", dataFim);
            return JasperRunManager.runReportToPdf(relatorioVendasCompilado.getInputStream(), parameters, connection);

        }catch(SQLException ex){
            ex.printStackTrace();
        } catch (JRException e) {
            throw new RuntimeException(e);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }


        return null;
    }

}
