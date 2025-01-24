import Card from "./Card";
import Header from "./Header";
import PropTypes from "prop-types";

function Shop({ allProduct }) {
  return (
    <>
      <Header />

      <div className="mb-4 gap-4  grid sm:grid-cols-2 md:mb-8 lg:grid-cols-3 xl:grid-cols-4 mx-24 mt-4 max-sm:flex max-sm:flex-col max-sm:justify-center">
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

Shop.propTypes = {
  allProduct: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
    })
  ).isRequired,
};

export default Shop;
