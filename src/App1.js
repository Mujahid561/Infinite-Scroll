import React, { useState, useEffect, useCallback } from 'react';
import { useInView } from 'react-intersection-observer';
import './App.css';  // Import your shimmer effect CSS

const fetchProducts = async (page) => {
  // Fetch products from your API with pagination
  const response = await fetch(`https://api.escuelajs.co/api/v1/products?offset=${page * 10}&limit=6`);
  const data = await response.json();
  console.log(data)
  return data;
};

const ProductCard = ({ product }) => (
  <div style={{ display: 'flex', flexDirection: 'column', width: '19%' }}>
    <img src={product.images[0]} alt="product" style={{ height: '300px' }} />
    <h3>Price: {product.price}</h3>
  </div>
);

const ShimmerCard = () => (
  <div className="shimmer shimmer-card" />
);

const App1 = () => {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const { ref, inView } = useInView({ threshold: 1 });

  const loadMoreProducts = useCallback(async () => {
    if (loading || !hasMore) return;

    setLoading(true);
    try {
      const newProducts = await fetchProducts(page);
      setProducts((prev) => [...prev, ...newProducts]);
      setHasMore(newProducts.length > 0);
      setPage((prev) => prev + 1);
    } catch (error) {
      console.error('Failed to fetch products', error);
    } finally {
      setLoading(false);
    }
  }, [page, loading, hasMore]);

  useEffect(() => {
    if (inView) {
      loadMoreProducts();
    }
  }, [inView, loadMoreProducts]);

  return (
    <div>
      <div style={{ display: 'flex', width: '100%', flexWrap: 'wrap', justifyContent: 'space-evenly' }}>
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
        {loading && (
          <div className="shimmer-wrapper">
            {[...Array(10).keys()].map((_, index) => (
              <ShimmerCard key={index} />
            ))}
          </div>
        )}
      </div>
      <div ref={ref} style={{ height: '10px' }}></div> {/* Sentinel element for infinite scroll */}
    </div>
  );
};

export default App1;
