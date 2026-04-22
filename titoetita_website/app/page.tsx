"use client";

import Image from "next/image";
import { useState } from "react";

export default function Page() {
  const [metro, setMetro] = useState("");
  const [quantidade, setQuantidade] = useState("");
  const [fibra, setFibra] = useState("");
  const [tecido, setTecido] = useState("");
  const [resultado, setResultado] = useState<number | null>(null);

  const [calculos, setCalculos] = useState<any[]>([]);
  const [editIndex, setEditIndex] = useState<number | null>(null);

  const [valorVenda, setValorVenda] = useState("");
  const [pagamento, setPagamento] = useState("");
  const [vendas, setVendas] = useState<any[]>([]);
  const [editVendaIndex, setEditVendaIndex] = useState<number | null>(null);

  const calcular = () => {
    const custo =
      Number(metro) * (Number(quantidade) / 100) + Number(fibra);
    setResultado(custo);
  };

  const salvarCalculo = () => {
    if (resultado === null) return;

    const novo = { metro, quantidade, fibra, tecido, resultado };

    if (editIndex !== null) {
      const copia = [...calculos];
      copia[editIndex] = novo;
      setCalculos(copia);
      setEditIndex(null);
    } else {
      setCalculos([...calculos, novo]);
    }

    setMetro("");
    setQuantidade("");
    setFibra("");
    setTecido("");
    setResultado(null);
  };

  const salvarVenda = () => {
    const nova = {
      valor: Number(valorVenda),
      pagamento,
      data: new Date(),
    };

    if (editVendaIndex !== null) {
      const copia = [...vendas];
      copia[editVendaIndex] = nova;
      setVendas(copia);
      setEditVendaIndex(null);
    } else {
      setVendas([...vendas, nova]);
    }

    setValorVenda("");
    setPagamento("");
  };

  return (
    <div className="min-h-screen ">
      {/* HEADER */}
      <header className="w-full flex items-center gap-5 px-10 py-6 text-white shadow bg-[#f5f1eb]">
        <Image src="/logo-titoetita.svg" alt="Logo" width={60} height={60} />
<h1 className="font-bold text-gray-700">Tito & Tita</h1> <h3 className="text-gray-700">| Camas para Pets</h3>
      </header>

      <main className="p-10 grid md:grid-cols-2 gap-8">
        {/* CUSTO */}
        <section className=" rounded-2xl  p-6 flex flex-col gap-3">
          <h2 className="text-lg font-semibold text-[#4b2e2b]">
            Cálculo de Custo
          </h2>

          <input
            value={metro}
            onChange={(e) => setMetro(e.target.value)}
            placeholder="Metro tecido (R$)"
            className="border rounded p-2 focus:outline-none focus:ring-2 focus:ring-[#c58b2b]"
          />

          <input
            value={quantidade}
            onChange={(e) => setQuantidade(e.target.value)}
            placeholder="Quantidade (cm)"
            className="border rounded p-2 focus:ring-2 focus:ring-[#c58b2b]"
          />

          <select
            value={tecido}
            onChange={(e) => setTecido(e.target.value)}
            className="border rounded p-2 focus:ring-2 focus:ring-[#c58b2b]"
          >
            <option value="">Tipo de tecido</option>
            <option>Tricoline</option>
            <option>Brim</option>
            <option>Jeans</option>
            <option>Oxford</option>
          </select>

          <input
            value={fibra}
            onChange={(e) => setFibra(e.target.value)}
            placeholder="Fibra (R$)"
            className="border rounded p-2 focus:ring-2 focus:ring-[#c58b2b]"
          />
{resultado !== null && (
            <p className="font-semibold text-[#4b2e2b]">
              Custo: R$ {resultado.toFixed(2)}
            </p>
          )}

          <button
            onClick={calcular}
            className="bg-[#c58b2b] text-white py-2 w-50 rounded hover:opacity-90"
          >
            Calcular
          </button>

          
          <button
            onClick={salvarCalculo}
            className="bg-[#4b2e2b] text-white py-2 w-50 rounded hover:opacity-90"
          >
            Salvar
          </button>

          {/* LISTA */}
          <div className="mt-4 space-y-2">
            {calculos.map((c, i) => (
              <div
                key={i}
                className="border rounded p-3 flex justify-between items-center"
              >
                <span className="text-sm">
                  R$ {c.resultado.toFixed(2)} • {c.tecido}
                </span>
                <div className="flex gap-2">
                  <button
                    onClick={() => setEditIndex(i)}
                    className="text-[#c58b2b] text-sm"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() =>
                      setCalculos(calculos.filter((_, idx) => idx !== i))
                    }
                    className="text-red-500 text-sm"
                  >
                    Excluir
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* VENDAS */}
        <section className=" rounded-2xl p-6 flex flex-col gap-3">
          <h2 className="text-lg font-semibold text-[#4b2e2b]">
            Vendas
          </h2>

          <input
            value={valorVenda}
            onChange={(e) => setValorVenda(e.target.value)}
            placeholder="Valor (R$)"
            className="border rounded p-2 focus:ring-2 focus:ring-[#c58b2b]"
          />

          <select
            value={pagamento}
            onChange={(e) => setPagamento(e.target.value)}
            className="border rounded p-2 focus:ring-2 focus:ring-[#c58b2b]"
          >
            <option value="">Pagamento</option>
            <option>Pix</option>
            <option>Cartão</option>
            <option>Dinheiro</option>
          </select>

          <button
            onClick={salvarVenda}
            className="bg-[#c58b2b] text-white py-2 rounded"
          >
            Registrar venda
          </button>

          <div className="mt-4 space-y-2">
            {vendas.map((v, i) => (
              <div
                key={i}
                className="border rounded p-3 flex justify-between"
              >
                <span>
                  R$ {v.valor} • {v.pagamento}
                </span>
                <button
                  onClick={() =>
                    setVendas(vendas.filter((_, idx) => idx !== i))
                  }
                  className="text-red-500 text-sm"
                >
                  Excluir
                </button>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}