import React, { useState } from "react";
import "./App.css";
import { productData } from "./constant/product";
import { produtorData } from "./constant/produtor";
import Logo from "./assets/logo-branca.svg";

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
    <div className="max-w mx-auto  justify-center items-center">
      <div className=" justify-items-center bg-emerald-600  shadow-md p-10 mb-6 ">
        <img src={Logo} alt="Logo" className="w-40 h-20 " />
        <p className="text-white text-xl font-normal mt-2">
          CENTRAL DE PRODUTOS
        </p>
        {/* <p className="text-white mb-4">
          CENTRAL DE PRODUTOS
        </p> */}
      </div>
      <div className="flex  px-10 py-5 ">
        <div className="min-h-screen">
          <h1 className="text-2xl font-bold mb-2">Cateoria</h1>
          <p className="text-gray-600">
            Encontre produtos e produtores de forma rápida e fácil
          </p>
        </div>
        <div>
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
            className="w-56 mb-3 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-400"
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
              <h3 className="text-xl font-semibold mb-4">
                Produtores Encontrados
              </h3>
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
                <div className="text-gray-500 p-4">
                  Nenhum produto encontrado.
                </div>
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
          )}{" "}
        </div>
      </div>
    </div>
  );
}

export default App;
