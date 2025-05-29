import useSWR from 'swr';
import { fetcher } from '../lib/fetcher';
import styles from '../styles/Cotacao.module.css';

export default function Home() {
  const { data, error, isLoading } = useSWR(
    'https://economia.awesomeapi.com.br/json/last/USD-BRL,EUR-BRL?token=927c456f9a4bec44887e5cc0e2d154c8f843f33855ec2ec0d15db596ee7d19cd',
    fetcher,
    { refreshInterval: 5000 }
  );

  if (error) return <div className={styles.container}>Erro ao carregar dados.</div>;
  if (isLoading || !data) return <div className={styles.container}>Carregando...</div>;

  const usdbrl = data.USDBRL;

  return (
    <main className={styles.container}>
      <h1 className={styles.title}>Cotação Dólar Hoje (USD/BRL)</h1>
      <p className={styles.item}><strong className={styles.label}>Compra:</strong> R$ {usdbrl.bid}</p>
      <p className={styles.item}><strong className={styles.label}>Venda:</strong> R$ {usdbrl.ask}</p>
      <p className={styles.item}><strong className={styles.label}>Alta:</strong> R$ {usdbrl.high}</p>
      <p className={styles.item}><strong className={styles.label}>Baixa:</strong> R$ {usdbrl.low}</p>
      <p className={styles.item}>
        <strong className={styles.label}>Variação:</strong> {usdbrl.varBid} ({usdbrl.pctChange}%)
      </p>
      <small className={styles.times}>
        Atualizado: {new Date(Number(usdbrl.timestamp) * 1000).toLocaleString()}
      </small>
    </main>
  );
}
