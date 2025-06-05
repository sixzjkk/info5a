import { useState } from "react";
import styles from "../styles/Periodo.module.css";

export default function CotacaoPorPeriodo() {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [dados, setDados] = useState([]);
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState("");

  const handleBuscar = async () => {
    if (!startDate || !endDate) {
      setErro("Preencha as datas, pô!");
      return;
    }

    const dataInicio = startDate.replaceAll("-", "");
    const dataFim = endDate.replaceAll("-", "");

    setLoading(true);
    setErro("");
    setDados([]);

    try {
      const res = await fetch(`https://economia.awesomeapi.com.br/json/daily/USD-BRL/365?start_date=${dataInicio}&end_date=${dataFim}`);
      const json = await res.json();
      setDados(json);
    } catch (err) {
      setErro("Erro ao buscar dados.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className={styles.container}>
      <h1 className={styles.title}>Cotação USD/BRL por Período</h1>

      <label className={styles.label}>Data Início:</label>
      <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} className={styles.input} />

      <label className={styles.label}>Data Fim:</label>
      <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} className={styles.input} />

      <button onClick={handleBuscar} className={styles.button}>Buscar</button>

      {loading && <p className={styles.label}>Carregando...</p>}
      {erro && <p className={styles.error}>{erro}</p>}

      {dados.length > 0 && (
        <ul className={styles.list}>
          {dados.map((item) => (
            <li key={item.timestamp} className={styles.item}>
              {new Date(item.timestamp * 1000).toLocaleDateString("pt-BR")} — R$ {item.bid}
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}