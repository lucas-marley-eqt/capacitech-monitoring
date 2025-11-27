'use client'

import { useState, useEffect } from "react";
import { GetHello } from "../api/hello/route";

export default function HelloFetcher() {
  const [data, setData] = useState<GetHello>();
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/hello') // Rota relativa, funciona tanto em dev quanto em produção
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setLoading(false);
      });
  }, []);

  if (isLoading) return <p>Carregando...</p>;
  if (!data) return <p>Nenhum dado encontrado.</p>;

  return (
    <div>
      <h1>Dados da API:</h1>
      <p>Mensagem: {data.message}</p>
      <p>Data: {data.date}</p>
    </div>
  );
}