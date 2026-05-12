import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchProductById } from '../api';
import { useCart } from '../context/CartContext';
import './ProductPage.css';

const ProductPage = () => {
  const { id } = useParams();
  const { addToCart, cartItems } = useCart();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [added, setAdded] = useState(false);

  const inCart = cartItems.find((item) => item._id === id);

  useEffect(() => {
    const loadProduct = async () => {
      try {
        const { data } = await fetchProductById(id);
        setProduct(data);
      } catch (error) {
        console.error('Failed to load product:', error);
      } finally {
        setLoading(false);
      }
    };
    loadProduct();
  }, [id]);

  const handleAddToCart = () => {
    addToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  if (loading) {
    return (
      <div className="container product-page-loading">
        <div className="skeleton-detail-image" />
        <div className="skeleton-detail-info">
          <div className="skeleton-line long" />
          <div className="skeleton-line medium" />
          <div className="skeleton-line short" />
          <div className="skeleton-line long" />
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container empty-state" style={{ padding: '4rem 0' }}>
        <span className="empty-icon">😕</span>
        <h3>Product not found</h3>
        <Link to="/" className="btn btn-primary" style={{ marginTop: '1rem' }}>
          Back to Home
        </Link>
      </div>
    );
  }

  return (
    <main className="product-page animate-fade-in">
      <div className="container">
        {/* Breadcrumb */}
        <nav className="breadcrumb">
          <Link to="/" className="breadcrumb-link">Home</Link>
          <span className="breadcrumb-sep">/</span>
          <span className="breadcrumb-link">{product.category}</span>
          <span className="breadcrumb-sep">/</span>
          <span className="breadcrumb-current">{product.name}</span>
        </nav>

        <div className="product-detail">
          {/* Image */}
          <div className="detail-image-wrapper">
            <img
              src={product.image}
              alt={product.name}
              className="detail-image"
            />
            <span className="detail-category-badge">{product.category}</span>
          </div>

          {/* Info */}
          <div className="detail-info">
            <h1 className="detail-name">{product.name}</h1>

            <div className="detail-rating">
              <div className="star-rating-large">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className={`star ${i < Math.floor(product.rating) ? 'filled' : ''}`}>
                    ★
                  </span>
                ))}
              </div>
              <span className="detail-reviews">
                {product.rating} ({product.numReviews} reviews)
              </span>
            </div>

            <p className="detail-description">{product.description}</p>

            <div className="detail-price-box">
              <span className="detail-price">${product.price.toFixed(2)}</span>
              <span className={`stock-status ${product.countInStock > 0 ? 'in-stock' : 'out-of-stock'}`}>
                {product.countInStock > 0
                  ? `✓ In Stock (${product.countInStock} left)`
                  : '✕ Out of Stock'}
              </span>
            </div>

            <div className="detail-actions">
              <button
                className={`btn btn-lg ${added ? 'btn-success-animate' : 'btn-primary'}`}
                onClick={handleAddToCart}
                disabled={product.countInStock === 0}
                id="add-to-cart-btn"
              >
                {added ? '✓ Added to Cart!' : inCart ? `In Cart (${inCart.quantity}) — Add More` : 'Add to Cart'}
              </button>
              <Link to="/cart" className="btn btn-secondary btn-lg">
                View Cart
              </Link>
            </div>

            <div className="detail-features">
              <div className="feature">
                <span className="feature-icon">🚚</span>
                <span>Free Shipping</span>
              </div>
              <div className="feature">
                <span className="feature-icon">🔄</span>
                <span>30-Day Returns</span>
              </div>
              <div className="feature">
                <span className="feature-icon">🛡️</span>
                <span>Secure Checkout</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ProductPage;
