import React, { useState } from "react";
import "./App.css";
import { productData } from "./constant/product";
import { produtorData } from "./constant/produtor";
import Logo from "./assets/logo-branca.svg";
import { Productor } from "./types/produtor";
import { Product } from "./types/product";
import { formatPhone } from "./constant/formatFunctions";

const produtosPorPagina = 8;

function App() {
  const [busca, setBusca] = useState("");
  const [filtro, setFiltro] = useState<"produtor" | "item" | "default">(
    "default"
  );
  const [pagina, setPagina] = useState(0);
  const [bagpProducts, setBagProducts] = useState<Product[]>([]);
  const [bagProdutores, setBagProdutores] = useState<Productor[]>([]);

  const produtosFiltrados = productData.filter((produto) =>
    produto.name.toLowerCase().includes(busca.toLowerCase())
  );

  const produtoresFiltrados = produtorData.filter((product) =>
    product.name.toLowerCase().includes(busca.toLowerCase())
  );

  // Quantos produtos por página no carrossel
  const inicio = pagina * produtosPorPagina;
  const fim = inicio + produtosPorPagina;
  const produtosPagina = produtosFiltrados.slice(inicio, fim);
  const totalPaginas = Math.ceil(produtosFiltrados.length / produtosPorPagina);

  // Função para adicionar produto na sacola
  // const adicionarNaSacola = (produto: Product) => {
  //   setBag((prev) => [...prev, produto]);
  // };

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
      <div className="flex flex-1 px-10 py-5 ">
        <div className="min-h-screen w-1/5  bg-white p-8 rounded-lg border-r-2 my-10 mr-10">
          <h1 className="text-2xl font-bold mb-10">Carrinho</h1>
          {bagpProducts.length > 0 ? (
            <div className=" mb-4">
              <div className="mx-5">
                <h2 className="text-xl font-semibold mb-2">Itens na Sacola</h2>
                <ul className="list-disc pl-5">
                  {bagpProducts.map((produto, index) => (
                    <li key={index} className="mb-2">
                      <span className="font-semibold">{produto.name}</span> -{" "}
                      <span className="text-green-700">
                        {Number(produto.price).toLocaleString("pt-BR", {
                          style: "currency",
                          currency: "BRL",
                        })}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex flex-col pt-10">
                <button className="mt-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition">
                  Finalizar Compra
                </button>
                <button
                  className="mt-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
                  onClick={() => setBagProducts([])}
                >
                  Limpar Sacola
                </button>
              </div>
            </div>
          ) : (
            <p className="text-gray-600">
              Seu carrinho está vazio. Adicione produtos para começar a comprar.
            </p>
          )}
        </div>
        <div className="flex-1 ">
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
            className="w-1/4 mb-3 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-400"
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
          {/* <h3 className="text-xl font-semibold mb-4">
            {filtro === "default"
              ? "Produtos em Destaque"
              : filtro === "item"
              ? "Produtos Encontrados"
              : "Produtores Encontrados"}
          </h3> */}
          {/* Carrossel de produtos e lista de produtores quando filtro está em default */}
          {filtro === "default" && (
            <>
              <h3 className="text-xl font-semibold mb-4">
                Produtos em Destaque
              </h3>
              <div className="w-full">
                <div className="flex gap-4 pb-2 mb-6 overflow-x-auto md:overflow-x-visible">
                  {produtosPagina.length === 0 ? (
                    <div className="text-gray-500 p-4">
                      Nenhum produto encontrado.
                    </div>
                  ) : (
                    produtosPagina.map((produto) => (
                      <div
                        key={produto.id}
                        className="min-w-40 bg-green-50 rounded-lg p-5 shadow flex-shrink-0 cursor-pointer hover:bg-green-100 transition"
                        onClick={() =>
                          setBagProducts((prev) => [...prev, produto])
                        }
                        title="Adicionar à sacola"
                      >
                        <h3 className="font-bold">{produto.name}</h3>
                        <p className="text-gray-500">{produto.description}</p>
                        <div className="flex gap-2 ">
                          <p className="text-green-700">
                            {Number(produto.price).toLocaleString("pt-BR", {
                              style: "currency",
                              currency: "BRL",
                            })}
                            {" / "}
                          </p>
                          <p className="text-gray-500">{produto.unit}</p>
                        </div>
                        <div className="flex gap-2 ">
                          <p className="text-green-700">
                            Disponivel: {produto.stock}{" "}
                          </p>
                        </div>
                        <p className="text-sm text-gray-400">
                          Produtor: {produto.farmer.name}
                        </p>
                      </div>
                    ))
                  )}
                </div>
                {/* Paginação do carrossel */}
                {totalPaginas > 1 && (
                  <div className="flex justify-center gap-2 mb-4">
                    <button
                      className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300"
                      onClick={() => setPagina((p) => Math.max(p - 1, 0))}
                      disabled={pagina === 0}
                    >
                      Anterior
                    </button>
                    <span className="px-2 py-1 text-gray-700">
                      Página {pagina + 1} de {totalPaginas}
                    </span>
                    <button
                      className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300"
                      onClick={() =>
                        setPagina((p) => Math.min(p + 1, totalPaginas - 1))
                      }
                      disabled={pagina === totalPaginas - 1}
                    >
                      Próxima
                    </button>
                  </div>
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
                      className="bg-green-50 rounded-lg p-4 shadow cursor-pointer hover:bg-green-100 transition"
                      onClick={() =>
                        setBagProdutores((prev) => [...prev, produtor])
                      }
                      title="Adicionar à sacola"
                    >
                      <h4 className="font-bold">{produtor.name}</h4>
                      <p className="text-green-700">
                        {formatPhone(produtor.phone)}
                      </p>
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
                    className="bg-green-50 rounded-lg p-4 shadow cursor-pointer hover:bg-green-100 transition"
                    onClick={() => setBagProducts((prev) => [...prev, produto])}
                    title="Adicionar à sacola"
                  >
                    <h4 className="font-bold">{produto.name}</h4>
                    <p className="text-gray-500">{produto.description}</p>
                    <div className="flex gap-2 ">
                      <p className="text-green-700">
                        {Number(produto.price).toLocaleString("pt-BR", {
                          style: "currency",
                          currency: "BRL",
                        })}
                        {" / "}
                      </p>
                      <p className="text-gray-500">{produto.unit}</p>
                    </div>
                    <div className="flex gap-2 ">
                      <p className="text-green-700">
                        Disponivel: {produto.stock}{" "}
                      </p>
                    </div>
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
                    className="bg-green-50 rounded-lg p-4 shadow cursor-pointer hover:bg-green-100 transition"
                    onClick={() =>
                      setBagProdutores((prev) => [...prev, produtor])
                    }
                    title="Adicionar à sacola"
                  >
                    <h4 className="font-bold">{produtor.name}</h4>
                    <p className="text-green-700">
                      {" "}
                      {formatPhone(produtor.phone)}
                    </p>
                    <p className="text-gray-500">{produtor.address.city}</p>
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
