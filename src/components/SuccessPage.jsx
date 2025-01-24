import { useState, useEffect } from "react";
import Header from "./Header";
import { Link } from "react-router-dom";

export default function SuccessPage() {
  const [visible, setVisible] = useState(true);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      setShowSuccessMessage(true);
    }, 2000); // 2 seconds

    return () => clearTimeout(timer); // Cleanup the timer
  }, []);

  return (
    <>
      <Header />
      {visible && (
        <div className="success-animation">
          <svg
            className="checkmark"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 52 52"
          >
            <circle
              className="checkmark__circle"
              cx="26"
              cy="26"
              r="25"
              fill="none"
            />
            <path
              className="checkmark__check"
              fill="none"
              d="M14.1 27.2l7.1 7.2 16.7-16.8"
            />
          </svg>
        </div>
      )}
      {showSuccessMessage && (
        <section className="bg-white py-8 antialiased  md:py-16">
          <div className="mx-auto max-w-2xl px-4 2xl:px-0">
            <h2 className="text-xl font-semibold text-gray-900  sm:text-2xl mb-2">
              Thanks for your order!
            </h2>
            <p className="text-gray-500  mb-6 md:mb-8">
              Your order{" "}
              <a
                href="#"
                className="font-medium text-gray-900  hover:underline"
              >
                #7564804
              </a>{" "}
              will be processed within 24 hours during working days. We will
              notify you by email once your order has been shipped.
            </p>
            <div className="space-y-4 sm:space-y-2 rounded-lg border border-gray-100 bg-gray-50 p-6   mb-6 md:mb-8">
              <dl className="sm:flex items-center justify-between gap-4">
                <dt className="font-normal mb-1 sm:mb-0 text-gray-500 ">
                  Date
                </dt>
                <dd className="font-medium text-gray-900  sm:text-end">
                  14 May 2024
                </dd>
              </dl>
              <dl className="sm:flex items-center justify-between gap-4">
                <dt className="font-normal mb-1 sm:mb-0 text-gray-500 ">
                  Payment Method
                </dt>
                <dd className="font-medium text-gray-900  sm:text-end">
                  JPMorgan monthly installments
                </dd>
              </dl>
              <dl className="sm:flex items-center justify-between gap-4">
                <dt className="font-normal mb-1 sm:mb-0 text-gray-500 ">
                  Name
                </dt>
                <dd className="font-medium text-gray-900  sm:text-end">
                  Flowbite Studios LLC
                </dd>
              </dl>
              <dl className="sm:flex items-center justify-between gap-4">
                <dt className="font-normal mb-1 sm:mb-0 text-gray-500 ">
                  Address
                </dt>
                <dd className="font-medium text-gray-900  sm:text-end">
                  34 Scott Street, San Francisco, California, USA
                </dd>
              </dl>
              <dl className="sm:flex items-center justify-between gap-4">
                <dt className="font-normal mb-1 sm:mb-0 text-gray-500 ">
                  Phone
                </dt>
                <dd className="font-medium text-gray-900  sm:text-end">
                  +(123) 456 7890
                </dd>
              </dl>
            </div>
            <div className="flex items-center space-x-4">
              <a
                href="#"
                className="text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5   focus:outline-none bg-primary-600 hover:bg-primary-700 focus:ring-primary-800"
              >
                Track your order
              </a>
              <Link
                to="/shop"
                className="py-2.5 px-5 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-100      "
              >
                Return to shopping
              </Link>
            </div>
          </div>
        </section>
      )}
    </>
  );
}
