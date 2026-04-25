import { useState } from "react";

export type Calculo = {
  formato: string;
  metro: string;
  quantidade: string;
  fibra: string;
  tecido: string;
  resultado: number;
};

export function useCalculos() {
  const [calculos, setCalculos] = useState<Calculo[]>([]);
  const [resultado, setResultado] = useState<number | null>(null);
  const [editIndex, setEditIndex] = useState<number | null>(null);

  const calcular = (metro: string, quantidade: string, fibra: string) => {
    const custo =
      (parseFloat(metro) || 0) * ((parseFloat(quantidade) || 0) / 100) +
      (parseFloat(fibra) || 0);

    setResultado(custo);
  };

  const salvarCalculo = (calculo: Omit<Calculo, "resultado">) => {
    if (resultado === null) return;

    const novo = { ...calculo, resultado };

    if (editIndex !== null) {
      const copia = [...calculos];
      copia[editIndex] = novo;
      setCalculos(copia);
      setEditIndex(null);
    } else {
      setCalculos([...calculos, novo]);
    }

    setResultado(null);
  };

  const editarCalculo = (index: number) => {
    setEditIndex(index);
    return calculos[index];
  };

  
const excluirCalculo = (index: number) => {
  setCalculos(calculos.filter((_, i) => i !== index));
};


  return {
    calculos,
    resultado,
    calcular,
    salvarCalculo,
    editarCalculo,
    excluirCalculo,
  };
}
