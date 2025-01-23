import { useLocation } from "react-router-dom";
import { useState } from "react";
import { Link } from "react-router-dom";
import Header from "./Header";
import { useEffect } from "react";

export default function Cart() {
  const location = useLocation();
  const { title, price, rating, count, image, description, quantity } =
    location.state || {};

  const [cart, setCart] = useState([]);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(storedCart);
    const itemExists = storedCart.some((item) => item.title === title);

    // Update quantity if item already exists in cart
    if (itemExists) {
      const existingItem = storedCart.find((item) => item.title === title);
      const updatedItem = { ...existingItem, quantity };
      const updatedCart = storedCart.map((item) =>
        item.title === title ? updatedItem : item
      );
      setCart(updatedCart);
      localStorage.setItem("cart", JSON.stringify(storedCart));
    }

    if (!itemExists) {
      if (!title || !price || !image) {
        return;
      }
      const newItem = {
        id: Date.now(), // Add unique ID
        title,
        price,
        image,
        quantity,
      };
      const updatedCart = [...storedCart, newItem];
      setCart(updatedCart);
      localStorage.setItem("cart", JSON.stringify(updatedCart));
    }
  }, [title, price, image, quantity]);

  const handleIncrement = (title) => {
    setCart((prevCart) => {
      const updatedCart = prevCart.map((item) =>
        item.title === title
          ? { ...item, quantity: Math.max(1, item.quantity + 1) }
          : item
      );
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      return updatedCart;
    });
  };

  const handleDecrement = (title) => {
    setCart((prevCart) => {
      const updatedCart = prevCart.map((item) =>
        item.title === title
          ? { ...item, quantity: Math.max(1, item.quantity - 1) }
          : item
      );
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      return updatedCart;
    });
  };

  const handleRemove = (idToRemove) => {
    const updatedCart = cart.filter((item) => item.id !== idToRemove);
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const calculateTotal = () => {
    return Math.round(
      cart.reduce((acc, item) => acc + item.price * item.quantity, 0)
    );
  };

  const calculateTax = () => {
    return Math.round(calculateTotal() * 0.1);
  };

  if (cart.length === 0) {
    return (
      <>
        <div className="flex flex-col min-h-screen">
          <Header />
          <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-48 h-48 text-gray-400 mb-8"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1}
                d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
              />
            </svg>
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">
              Your cart is empty
            </h2>
            <p className="text-gray-500 mb-6 text-center">
              Looks like you havent added any items to your cart yet.
            </p>
            <Link
              to="/shop"
              className="px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Header />
      <section className="bg-white py-8 antialiased ">
        <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
          <h2 className="text-xl font-semibold text-gray-900  sm:text-2xl">
            Shopping Cart
          </h2>

          <div className="mt-6 sm:mt-8 md:gap-6 lg:flex lg:items-start xl:gap-8">
            <div className="mx-auto w-full flex-none lg:max-w-2xl xl:max-w-4xl">
              <div className="space-y-6">
                {/* Map Through all goods */}
                {cart.map((item) => (
                  <div
                    className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm "
                    key={item.id}
                  >
                    <div className="space-y-4 md:flex md:items-center md:justify-between md:gap-6 md:space-y-0">
                      <a href="#" className="shrink-0 md:order-1">
                        <img
                          className="h-20 w-20 "
                          src={item.image}
                          alt="imac image"
                        />
                      </a>

                      <label htmlFor="counter-input" className="sr-only">
                        Choose quantity:
                      </label>
                      <div className="flex items-center justify-between md:order-3 md:justify-end">
                        <div className="">
                          <div className="mt-2 flex items-center gap-2">
                            <button
                              onClick={() => handleDecrement(item.title)}
                              className="inline-flex h-8 w-8 items-center justify-center rounded-md border bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-100  border-gray-300 text-gray-500 "
                            >
                              -
                            </button>
                            <input
                              //   type="number"
                              id="quantity"
                              value={item.quantity}
                              readOnly
                              className="h-8 w-16 rounded-lg border  border-gray-300 text-center text-sm focus:border-primary-500 focus:ring-primary-500"
                              min="1"
                            />
                            <button
                              onClick={() => handleIncrement(item.title)}
                              className="inline-flex h-8 w-8 items-center justify-center rounded-md border bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-100  border-gray-300 text-gray-500"
                            >
                              +
                            </button>
                          </div>
                        </div>
                        <div className="text-end md:order-4 md:w-32">
                          <p className="text-base font-bold text-gray-900 ">
                            ${(item.price * item.quantity).toFixed(1)}
                          </p>
                        </div>
                      </div>

                      <div className="w-full min-w-0 flex-1 space-y-4 md:order-2 md:max-w-md">
                        <Link
                          to="/shop/description"
                          state={{
                            title,
                            price,
                            rating,
                            count,
                            image,
                            description,
                          }}
                          className="text-base font-medium text-gray-900 hover:underline "
                        >
                          {item.title}
                        </Link>

                        <div className="flex items-center gap-4">
                          <button
                            type="button"
                            className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-900 hover:underline "
                          >
                            <svg
                              className="me-1.5 h-5 w-5"
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
                            Add to Favorites
                          </button>

                          <button
                            type="button"
                            onClick={() => handleRemove(item.id)}
                            className="inline-flex items-center text-sm font-medium text-red-600 hover:underline "
                          >
                            <svg
                              className="me-1.5 h-5 w-5"
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
                                d="M6 18 17.94 6M18 18 6.06 6"
                              />
                            </svg>
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mx-auto mt-6 max-w-4xl flex-1 space-y-6 lg:mt-0 lg:w-full">
              <div className="space-y-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm   sm:p-6">
                <p className="text-xl font-semibold text-gray-900 ">
                  Order summary
                </p>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <dl className="flex items-center justify-between gap-4">
                      <dt className="text-base font-normal text-gray-500 ">
                        Original price
                      </dt>
                      <dd className="text-base font-medium text-gray-900 ">
                        ${calculateTotal()}
                      </dd>
                    </dl>

                    <dl className=" items-center justify-between gap-4 hidden">
                      <dt className="text-base font-normal text-gray-500 ">
                        Savings
                      </dt>
                      <dd className="text-base font-medium text-green-600">
                        -$299.00
                      </dd>
                    </dl>

                    <dl className="flex items-center justify-between gap-4">
                      <dt className="text-base font-normal text-gray-500 ">
                        Delivery
                      </dt>
                      <dd className="text-base font-medium text-gray-900 ">
                        $1.5
                      </dd>
                    </dl>

                    <dl className="flex items-center justify-between gap-4">
                      <dt className="text-base font-normal text-gray-500 ">
                        Tax
                      </dt>
                      <dd className="text-base font-medium text-gray-900 ">
                        ${calculateTax()}
                      </dd>
                    </dl>
                  </div>

                  <dl className="flex items-center justify-between gap-4 border-t border-gray-200 pt-2 ">
                    <dt className="text-base font-bold text-gray-900 ">
                      Total
                    </dt>
                    <dd className="text-base font-bold text-gray-900 ">
                      ${calculateTotal() + parseFloat(calculateTax()) + 1.5}
                    </dd>
                  </dl>
                </div>

                <a
                  href="#"
                  className="flex w-full items-center justify-center rounded-lg bg-primary-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 bg-primary-600 hover:bg-primary-700 focus:ring-primary-800"
                >
                  Proceed to Checkout
                </a>

                <div className="flex items-center justify-center gap-2">
                  <span className="text-sm font-normal text-gray-500 ">
                    {" "}
                    or{" "}
                  </span>
                  <Link
                    to="/shop"
                    title=""
                    className="inline-flex items-center gap-2 text-sm font-medium text-primary-700 underline hover:no-underline "
                  >
                    Continue Shopping
                    <svg
                      className="h-5 w-5"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 12H5m14 0-4 4m4-4-4-4"
                      />
                    </svg>
                  </Link>
                </div>
              </div>

              <div className="space-y-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm   sm:p-6">
                <form className="space-y-4">
                  <div>
                    <label
                      htmlFor="voucher"
                      className="mb-2 block text-sm font-medium text-gray-900 "
                    >
                      {" "}
                      Do you have a voucher or gift card?{" "}
                    </label>
                    <input
                      type="text"
                      id="voucher"
                      className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500   "
                      placeholder=""
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    className="flex w-full items-center justify-center rounded-lg bg-primary-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 bg-primary-600 hover:bg-primary-700 focus:ring-primary-800"
                  >
                    Apply Code
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
