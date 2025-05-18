import React, { useState } from "react";
import "./App.css";
import { productData } from "./constant/product";
import { produtorData } from "./constant/produtor";

function App() {
  const [busca, setBusca] = useState("");
  const [filtro, setFiltro] = useState<"produtor" | "item" | "default">(
    "default"
  );

  const produtosFiltrados = productData.filter((produto) =>
    produto.name.toLowerCase().includes(busca.toLowerCase())
  );

  const produtoresFiltrados = produtorData.filter((product) =>
    product.name.toLowerCase().includes(busca.toLowerCase())
  );

  return (
    <div className="max-w-3xl mx-auto p-4">
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-2xl font-bold mb-2">Family Agro</h2>
        <p className="text-gray-600 mb-4">
          Centro de compras online de produtos agropecuários, com entrega rápida
          e segura. Encontre os melhores produtos direto do produtor local.
        </p>
      </div>
      <input
        type="text"
        placeholder={
          filtro === "item"
            ? "Buscar itens..."
            : filtro === "produtor"
            ? "Buscar produtores..."
            : "Buscar todos..."
        }
        value={busca}
        onChange={(e) => setBusca(e.target.value)}
        className="w-full mb-3 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-400"
      />
      <div className="flex gap-2 mb-4">
        <button
          className={`px-4 py-2 rounded ${
            filtro === "produtor"
              ? "bg-green-500 text-white"
              : "bg-gray-200 text-gray-700"
          }`}
          onClick={() =>
            setFiltro(filtro === "produtor" ? "default" : "produtor")
          }
        >
          Produtor
        </button>
        <button
          className={`px-4 py-2 rounded ${
            filtro === "item"
              ? "bg-green-500 text-white"
              : "bg-gray-200 text-gray-700"
          }`}
          onClick={() => setFiltro(filtro === "item" ? "default" : "item")}
        >
          Itens
        </button>
      </div>
      <h3 className="text-xl font-semibold mb-4">
        {filtro === "default"
          ? "Produtos em Destaque"
          : filtro === "item"
          ? "Produtos Encontrados"
          : "Produtores Encontrados"}
      </h3>
      {/* Carrossel de produtos e lista de produtores quando filtro está em default */}
      {filtro === "default" && (
        <>
          <div className="flex overflow-x-auto gap-4 pb-2 mb-6">
            {produtosFiltrados.length === 0 ? (
              <div className="text-gray-500 p-4">
                Nenhum produto encontrado.
              </div>
            ) : (
              produtosFiltrados.map((produto) => (
                <div
                  key={produto.id}
                  className="min-w-[250px] bg-green-50 rounded-lg p-4 shadow flex-shrink-0"
                >
                  <h4 className="font-bold">{produto.name}</h4>
                  <p className="text-green-700">{produto.price}</p>
                  <p className="text-gray-500">{produto.description}</p>
                  <p className="text-sm text-gray-400">
                    Produtor: {produto.farmer.name}
                  </p>
                </div>
              ))
            )}
          </div>
          <h3 className="text-xl font-semibold mb-4">Produtores Encontrados</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {produtoresFiltrados.length === 0 ? (
              <div className="text-gray-500 p-4">
                Nenhum produtor encontrado.
              </div>
            ) : (
              produtoresFiltrados.map((produtor) => (
                <div
                  key={produtor.id}
                  className="bg-green-50 rounded-lg p-4 shadow"
                >
                  <h4 className="font-bold">{produtor.name}</h4>
                  <p className="text-green-700">{produtor.phone}</p>
                  <p className="text-gray-500">{produtor.address.city}</p>
                </div>
              ))
            )}
          </div>
        </>
      )}
      {/* Lista normal de itens se filtro for "item" */}
      {filtro === "item" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {produtosFiltrados.length === 0 ? (
            <div className="text-gray-500 p-4">Nenhum produto encontrado.</div>
          ) : (
            produtosFiltrados.map((produto) => (
              <div
                key={produto.id}
                className="bg-green-50 rounded-lg p-4 shadow"
              >
                <h4 className="font-bold">{produto.name}</h4>
                <p className="text-green-700">{produto.price}</p>
                <p className="text-gray-500">{produto.description}</p>
                <p className="text-sm text-gray-400">
                  Produtor: {produto.farmer.name}
                </p>
              </div>
            ))
          )}
        </div>
      )}
      {/* Lista normal de produtores se filtro for "produtor" */}
      {filtro === "produtor" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {produtoresFiltrados.length === 0 ? (
            <div className="text-gray-500 p-4">Nenhum produtor encontrado.</div>
          ) : (
            produtoresFiltrados.map((produtor) => (
              <div
                key={produtor.id}
                className="bg-green-50 rounded-lg p-4 shadow"
              >
                <h4 className="font-bold">{produtor.name}</h4>
                <p className="text-green-700">{produtor.phone}</p>
                <p className="text-gray-500">{produtor.address.city}</p>
              </div>
            ))
          )}
        </div>
      )}{" "}
    </div>
  );
}

export default App;
