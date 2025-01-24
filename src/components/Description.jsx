import PropTypes from "prop-types";
import Header from "./Header";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function Description() {
  const location = useLocation();
  const { title, price, rating, count, image, description } =
    location.state || {};
  const [quantity, setQuantity] = useState(1);

  console.log(title, price, rating, count, image);

  if (!title || !price || !rating || !count || !image) {
    return <div>No product data found.</div>;
  }

  const handleIncrement = () => {
    setQuantity((prev) => prev + 1);
  };

  const handleDecrement = () => {
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
  };

  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value >= 1) {
      setQuantity(value);
    }
  };

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= rating) {
        stars.push(
          <svg
            key={i}
            className="h-4 w-4 text-yellow-400"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M13.8 4.2a2 2 0 0 0-3.6 0L8.4 8.4l-4.6.3a2 2 0 0 0-1.1 3.5l3.5 3-1 4.4c-.5 1.7 1.4 3 2.9 2.1l3.9-2.3 3.9 2.3c1.5 1 3.4-.4 3-2.1l-1-4.4 3.4-3a2 2 0 0 0-1.1-3.5l-4.6-.3-1.8-4.2Z" />
          </svg>
        );
      } else {
        stars.push(
          <svg
            key={i}
            className="h-4 w-4 text-gray-300"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M13.8 4.2a2 2 0 0 0-3.6 0L8.4 8.4l-4.6.3a2 2 0 0 0-1.1 3.5l3.5 3-1 4.4c-.5 1.7 1.4 3 2.9 2.1l3.9-2.3 3.9 2.3c1.5 1 3.4-.4 3-2.1l-1-4.4 3.4-3a2 2 0 0 0-1.1-3.5l-4.6-.3-1.8-4.2Z" />
          </svg>
        );
      }
    }
    return stars;
  };

  return (
    <>
      <Header />
      <section className="bg-white py-8 antialiased md:py-16">
        <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
          <div className="lg:grid lg:grid-cols-2 lg:gap-8 xl:gap-16">
            <div className="mx-auto max-w-md shrink-0 lg:max-w-lg">
              <img className="w-full" src={image} alt="" />
            </div>

            <div className="mt-6 sm:mt-8 lg:mt-0">
              <h1 className="text-xl font-semibold text-gray-900 sm:text-2xl">
                {title}
              </h1>
              <div className="mt-4 sm:flex sm:items-center sm:gap-4">
                <p className="text-2xl font-extrabold text-gray-900 sm:text-3xl">
                  ${price}
                </p>

                <div className="mt-2 flex items-center gap-2 sm:mt-0">
                  <div className="flex items-center gap-1">
                    {renderStars(rating)}
                  </div>
                  <p className="text-sm font-medium leading-none text-gray-500">
                    ({rating})
                  </p>
                  <a
                    href="#"
                    className="text-sm font-medium leading-none text-gray-900 underline hover:no-underline"
                  >
                    345 Reviews
                  </a>
                </div>
              </div>

              {/* Quantity Selector */}
              <div className="mt-6">
                <label
                  htmlFor="quantity"
                  className="block text-sm font-medium text-gray-700"
                >
                  Quantity
                </label>
                <div className="mt-2 flex items-center gap-2">
                  <button
                    onClick={handleDecrement}
                    className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-gray-300 bg-white text-gray-500 hover:bg-gray-100"
                  >
                    -
                  </button>
                  <input
                    type="number"
                    id="quantity"
                    value={quantity}
                    onChange={handleQuantityChange}
                    className="h-8 w-16 rounded-lg border border-gray-300 text-center text-sm focus:border-primary-500 focus:ring-primary-500"
                    min="1"
                  />
                  <button
                    onClick={handleIncrement}
                    className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-gray-300 bg-white text-gray-500 hover:bg-gray-100"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="mt-6 sm:flex sm:gap-4 sm:items-center sm:mt-8">
                <a
                  href="#"
                  title=""
                  className="flex items-center justify-center rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100"
                  role="button"
                >
                  <svg
                    className="-ms-2 me-2 h-5 w-5"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12.01 6.001C6.5 1 1 8 5.782 13.001L12.011 20l6.23-7C23 8 17.5 1 12.01 6.002Z"
                    />
                  </svg>
                  Add to favorites
                </a>

                <Link
                  to="/cart"
                  state={{
                    title,
                    price,
                    rating,
                    count,
                    image,
                    description,
                    quantity,
                  }}
                  title=""
                  className="inline-flex items-center rounded-lg bg-primary-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 bg-primary-600 hover:bg-primary-700 focus:ring-primary-800"
                  role="button"
                >
                  <svg
                    className="-ms-2 me-2 h-5 w-5"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 4h1.5L8 16m0 0h8m-8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm.75-3H7.5M11 7H6.312M17 4v6m-3-3h6"
                    />
                  </svg>
                  Add {quantity} to cart
                </Link>
              </div>

              <hr className="my-6 border-gray-200 md:my-8" />

              <p className="mb-6 text-gray-500">{description}</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

Description.propTypes = {
  title: PropTypes.string,
  price: PropTypes.number,
  rating: PropTypes.number,
  count: PropTypes.number,
  image: PropTypes.string,
};
