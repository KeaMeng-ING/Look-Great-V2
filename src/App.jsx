import "./App.css";
import { useEffect, useState } from "react";

function App() {
  const [allProduct, setAllProduct] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products?limit=5", { mode: "cors" })
      .then((response) => {
        if (response.status >= 400) {
          throw new Error("server error");
        }
        return response.json();
      })
      .then((data) => {
        const productDetails = {
          id: data.id,
          title: data.title,
          price: data.price,
          rating: data.rating,
          image: data.image,
        };
        setAllProduct(productDetails);
      })
      .catch((error) => setError(error))
      .finally(() => setLoading(false));
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>A network error was encountered</p>;

  console.log(allProduct);
  return (
    <>
      <h1>H213i</h1>
      {/* <img src={allProduct[0].image} alt={"placeholder text"} /> */}
    </>
  );
}

export default App;
