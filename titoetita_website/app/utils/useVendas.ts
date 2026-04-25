import { useState } from "react";

export type Venda = {
  valor: number;
  pagamento: string;
  data: Date;
};

export function useVendas() {
  const [vendas, setVendas] = useState<Venda[]>([]);
  const [editVendaIndex, setEditVendaIndex] = useState<number | null>(null);

  const salvarVenda = (valor: string, pagamento: string) => {
    if (!valor || !pagamento) return;

    const novaVenda: Venda = {
      valor: parseFloat(valor),
      pagamento,
      data: new Date(),
    };

    if (editVendaIndex !== null) {
      const copia = [...vendas];
      copia[editVendaIndex] = novaVenda;
      setVendas(copia);
      setEditVendaIndex(null);
    } else {
      setVendas([...vendas, novaVenda]);
    }
  };

  const editarVenda = (index: number) => {
    setEditVendaIndex(index);
    return vendas[index];
  };

  const excluirVenda = (index: number) => {
    setVendas(vendas.filter((_, i) => i !== index));
  };

  return {
    vendas,
    salvarVenda,
    editarVenda,
    excluirVenda,
  };
}