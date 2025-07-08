import "./App.css";

import { useState, useEffect, } from "react";
import { useFetch } from "./hooks/useFetch";
const url = "http://localhost:3005/products";


function App() {
  const [products, setProducts] = useState([]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");

  // 4 custom hook 

  const {data:items , httpConfig ,loading} = useFetch(url);

  

  // 01 Resgatando  dados

  // useEffect(() => {
  //   async function fetchData() {
  //     try {
  //       const res = await fetch(url);
  //       const data = await res.json();
  //       console.log("Dados recebidos:", data);
  //       setProducts(data);
  //     } catch (error) {
  //       console.error("Erro ao buscar os produtos:", error); // 🚨 Mostra erros
  //     }
  //   }

  //   fetchData();
  // }, []); 

  // 2 adicionanado Produtos
  const handleSubmit = async (e) => {
    e.preventDefault();

    const product = {
      name,
      price,
    };
    
    // const res = await fetch(url,{
    //   method:"POST",
    //   headers: {
    //     "Content-type": "application/json"
    //   },
    //   body:JSON.stringify(product)
    // })

    // // 3  - carregamento dinamico

    // const addedProduct = await res.json();

    // setProducts((prevProducts) => [...prevProducts, addedProduct ]);

    // 5 - refatorando o post 
    httpConfig(product, "POST");

    setName("");
    setPrice("");
  };

  return (
    <div className="App">
      <h1>Lista de Produtos</h1>
      {/* 6 - loading  */}
      {loading && <p>Carregando dados...</p>}
      {!loading && <ul>
        { items && items.map((product) => (
          <li key={product.id}>
            {product.name} - R$: {product.price}
          </li>
        ))}
      </ul>}

      <div className="add-product">
        <form onSubmit={handleSubmit}>
          <label>
            Nome:
            <input
              type="text"
              value={name}
              name="name"
              onChange={(e) => setName(e.target.value)}
            />
          </label>
          <label>
            Preço:
            <input
              type="number"
              value={price}
              name="price"
              onChange={(e) => setPrice(e.target.value)}
            />
          </label>
          <input type="submit" value="Criar" />
        </form>
      </div>
    </div>
  );
}

export default App;
