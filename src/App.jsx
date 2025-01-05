import "./App.css";
import { useEffect, useState } from "react";
import Card from "./components/Card";
import Header from "./components/Header";

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

  return (
    <>
      <Header />

      <div className="mb-4 grid gap-4 sm:grid-cols-2 md:mb-8 lg:grid-cols-3 xl:grid-cols-4 mx-24 mt-4">
        {allProduct.map((product) => (
          <Card key={product.id} {...product} />
        ))}
      </div>
      <div className="w-full text-center">
        <button
          type="button"
          className="rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100  "
        >
          Show more
        </button>
      </div>
    </>
  );
}

export default App;
