import "./App.css";

import { useState, useEffect } from "react";
const url = "http://localhost:3005/products"

function App() {
  const [products, setProducts] = useState([]);

  // 01 Resgatando  dados

  useEffect(() => {
  async function fetchData() {
    try {
      const res = await fetch(url);
      const data = await res.json();
      console.log("Dados recebidos:", data); // ✅ Veja no console
      setProducts(data);
    } catch (error) {
      console.error("Erro ao buscar os produtos:", error); // 🚨 Mostra erros
    }
  }

  fetchData();
}, []);

  

  return (
    <div className="App">
      <h1>Lista de Produtos</h1>
      <ul>
         {products.map((product)=>(
          <li key={product.id}>
            {product.name} - R$: {product.price}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
