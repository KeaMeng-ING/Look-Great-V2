import "./App.css";
import { useEffect, useState } from "react";
import Header from "./components/Header";
import Shop from "./components/Shop";
// import { createBrowserRouter } from "react-router-dom";
import Home from "./components/Home";
import { Routes, Route } from "react-router-dom";

function App() {
  const [allProduct, setAllProduct] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products?limit=20", { mode: "cors" })
      .then((response) => {
        if (response.status >= 400) {
          throw new Error("server error");
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
        const productDetails = data.map((product) => ({
          id: product.id,
          title: product.title,
          price: product.price,
          rating: product.rating.rate,
          count: product.rating.count,
          image: product.image,
        }));
        setAllProduct(productDetails);
      })
      .catch((error) => setError(error))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <>
        <Header />
        <div className="loading-container">
          <span className="loader"></span>
        </div>
      </>
    );
  }

  if (error) return <p>A network error was encountered</p>;

  // const router = createBrowserRouter([
  //   {
  //     path: "/",
  //     element: <Home />,
  //   },
  //   {
  //     path: "/shop",
  //     element: <Shop allProduct={allProduct} />,
  //   },
  // ]);

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop allProduct={allProduct} />} />
      </Routes>
    </>
  );
}

export default App;
