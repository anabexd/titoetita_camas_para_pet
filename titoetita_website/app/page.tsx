"use client";

import Image from "next/image";
import { useState } from "react";

import { useCalculos } from "./utils/calculos";
import { useVendas } from "./utils/useVendas";

export default function Page() {


  const [formato, setFormato] = useState("");
  const [metro, setMetro] = useState("");
  const [quantidade, setQuantidade] = useState("");
  const [fibra, setFibra] = useState("");
  const [tecido, setTecido] = useState("");


  const {
    calculos,
    resultado,
    calcular,
    salvarCalculo,
    editarCalculo,
    excluirCalculo,
  } = useCalculos();

  // =========================
  // HANDLERS (UI → HOOK)
  // =========================
  const handleCalcular = () => {
    calcular(metro, quantidade, fibra);
  };

  const handleSalvar = () => {
    salvarCalculo({
      formato,
      metro,
      quantidade,
      fibra,
      tecido,
    });

    // limpa formulário após salvar
    setFormato("");
    setMetro("");
    setQuantidade("");
    setFibra("");
    setTecido("");
  };

  const handleEditar = (index: number) => {
    const calculo = editarCalculo(index);

    if (!calculo) return;

    setFormato(calculo.formato);
    setMetro(calculo.metro);
    setQuantidade(calculo.quantidade);
    setFibra(calculo.fibra);
    setTecido(calculo.tecido);
  };


  const [valorVenda, setValorVenda] = useState("");
  const [pagamento, setPagamento] = useState("");

  // =========================
  // HOOK DE VENDAS
  // =========================
  const {
    vendas,
    salvarVenda,
    editarVenda,
    excluirVenda,
  } = useVendas();

  // =========================
  // HANDLERS
  // =========================
  const handleSalvarVenda = () => {
    salvarVenda(valorVenda, pagamento);
    setValorVenda("");
    setPagamento("");
  };

  const handleEditarVenda = (index: number) => {
    const venda = editarVenda(index);
    if (!venda) return;

    setValorVenda(venda.valor.toString());
    setPagamento(venda.pagamento);
  };


  return (
    <div className="min-h-screen bg-[#ffff]">
      {/* HEADER */}
      <header className="w-full flex items-center gap-5 px-10 py-6 text-white shadow bg-[#fff]">
        <Image src="/logo-titoetita.svg" alt="Logo" width={60} height={60} />
        <h1 className="font-bold text-black">Tito & Tita</h1> <h3 className="text-gray-800">| Camas para Pets</h3>
      </header>

      <main className="pl-35 pr-35 pt-10 grid md:grid-cols-2 gap-10">
        {/* CUSTO */}
        <section className=" rounded-2xl  p-6 flex flex-col gap-3">
          <h2 className="text-lg font-semibold text-black">
            Cálculo de custo
          </h2>
          <h3 className="subtitle">Formato da caminha</h3>
          <select
            value={formato}
            onChange={(e) => setFormato(e.target.value)}
            className="border rounded p-2 focus:ring-2 focus:ring-[#c58b2b] bg-white"
          >
            <option value="">Formato da caminha</option>
            <option>Quadrada</option>
            <option>Redonda</option>
            <option>Retangular</option>
          </select>
          <h3 className="subtitle">Metro tecido (R$)</h3>
          <input
            value={metro}
            onChange={(e) => setMetro(e.target.value)}
            placeholder="Metro tecido (R$)"
            className="border rounded p-2 focus:outline-none focus:ring-2 focus:ring-[#c58b2b]"
          />

          <h3 className="subtitle">Quantidade (cm)</h3>
          <input
            value={quantidade}
            onChange={(e) => setQuantidade(e.target.value)}
            placeholder="Quantidade (cm)"
            className="border rounded p-2 focus:ring-2 focus:ring-[#c58b2b]"
          />

          <h3 className="subtitle">Tipo de tecido</h3>
          <select
            value={tecido}
            onChange={(e) => setTecido(e.target.value)}
            className="border rounded p-2 focus:ring-2 focus:ring-[#c58b2b] bg-white"
          >
            <option value="">Tipo de tecido</option>
            <option>Tricoline</option>
            <option>Brim</option>
            <option>Jeans</option>
            <option>Oxford</option>
            <option>Gorgurinho</option>
            <option>Gorgurão</option>
            <option>Poliester</option>
            <option>TNT</option>
            <option>Oxford</option>
          </select>

          <h3 className="subtitle">Fibra (R$)</h3>
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
            onClick={handleCalcular}
            className="bg-[#FEB65C] text-white py-2 w-60 rounded hover:opacity-90 mt-5"
          >
            Calcular
          </button>


          <button
            onClick={handleSalvar}
            className="bg-[#FEB65C] text-white py-2 w-60 rounded hover:opacity-90 mt-2"
          >
            Salvar
          </button>

          {/* LISTA */}
          <div className="mt-4 space-y-2 result">
            {calculos.map((c, i) => (
              <div
                key={i}
                className="border rounded p-3 flex justify-between items-center"
              >

                <span className="text-sm">
                  Caminha {c.formato} de {c.tecido}
                </span>

                <span className="text-sm">
                  R$ {c.resultado.toFixed(2)}
                </span>

                <div className="flex gap-2">
                  <button
                    onClick={() => handleEditar(i)}
                    className="text-[#c58b2b] text-sm"
                  >
                    Editar
                  </button>


                  <button
                    onClick={() => excluirCalculo(i)}
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
          <h2 className="text-lg font-bold text-black">
            Registro de Vendas
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
            className="border rounded p-2 focus:ring-2 focus:ring-[#c58b2b] bg-white"
          >
            <option value="">Pagamento</option>
            <option>Pix</option>
            <option>Cartão</option>
            <option>Dinheiro</option>
          </select>

          <button
            onClick={handleSalvarVenda}
            className="bg-[#FEB65C] text-white py-2 rounded"
          >
            Registrar venda
          </button>

          <div className="mt-4 space-y-2 result">
            {vendas.map((v, i) => (
              <div
                key={i}
                className="border rounded p-3 flex justify-between"
              >

                <span>
                  R$ {v.valor.toFixed(2)} no {v.pagamento}
                </span>

                <div className="flex gap-2">
                  <button
                    onClick={() => handleEditarVenda(i)}
                    className="text-[#c58b2b] text-sm"
                  >
                    Editar
                  </button>

                  <button
                    onClick={() => excluirVenda(i)}
                    className="text-red-500 text-sm"
                  >
                    Excluir
                  </button>
                </div>

              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}