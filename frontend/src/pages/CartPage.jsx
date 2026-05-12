import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { createOrder } from '../api';
import './CartPage.css';

const CartPage = () => {
  const { cartItems, removeFromCart, updateQuantity, clearCart, cartTotal } = useCart();
  const navigate = useNavigate();
  const [isCheckout, setIsCheckout] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    customerName: '',
    customerEmail: '',
    address: '',
    city: '',
    postalCode: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCheckout = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const orderData = {
        orderItems: cartItems.map((item) => ({
          product: item._id,
          name: item.name,
          image: item.image,
          price: item.price,
          quantity: item.quantity,
        })),
        customerName: formData.customerName,
        customerEmail: formData.customerEmail,
        shippingAddress: {
          address: formData.address,
          city: formData.city,
          postalCode: formData.postalCode,
        },
        totalPrice: cartTotal,
      };

      const { data } = await createOrder(orderData);
      clearCart();
      navigate(`/order-success/${data._id}`);
    } catch (error) {
      console.error('Order failed:', error);
      alert('Failed to place order. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (cartItems.length === 0 && !isCheckout) {
    return (
      <main className="cart-page animate-fade-in">
        <div className="container">
          <div className="empty-cart">
            <span className="empty-cart-icon">🛒</span>
            <h2>Your cart is empty</h2>
            <p>Looks like you haven't added any products yet.</p>
            <Link to="/" className="btn btn-primary btn-lg">
              Start Shopping
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="cart-page animate-fade-in">
      <div className="container">
        <h1 className="page-title">{isCheckout ? 'Checkout' : 'Shopping Cart'}</h1>

        <div className="cart-layout">
          {/* Cart Items / Checkout Form */}
          <div className="cart-main">
            {!isCheckout ? (
              <div className="cart-items" id="cart-items">
                {cartItems.map((item) => (
                  <div key={item._id} className="cart-item" id={`cart-item-${item._id}`}>
                    <div className="cart-item-image-wrapper">
                      <img src={item.image} alt={item.name} className="cart-item-image" />
                    </div>

                    <div className="cart-item-details">
                      <Link to={`/product/${item._id}`} className="cart-item-name">
                        {item.name}
                      </Link>
                      <span className="cart-item-price">${item.price.toFixed(2)}</span>
                    </div>

                    <div className="cart-item-quantity">
                      <button
                        className="qty-btn"
                        onClick={() => updateQuantity(item._id, item.quantity - 1)}
                      >
                        −
                      </button>
                      <span className="qty-value">{item.quantity}</span>
                      <button
                        className="qty-btn"
                        onClick={() => updateQuantity(item._id, item.quantity + 1)}
                      >
                        +
                      </button>
                    </div>

                    <span className="cart-item-subtotal">
                      ${(item.price * item.quantity).toFixed(2)}
                    </span>

                    <button
                      className="cart-item-remove"
                      onClick={() => removeFromCart(item._id)}
                      title="Remove item"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <form className="checkout-form" onSubmit={handleCheckout} id="checkout-form">
                <h3 className="form-section-title">Customer Information</h3>
                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Full Name</label>
                    <input
                      type="text"
                      name="customerName"
                      className="input"
                      placeholder="John Doe"
                      value={formData.customerName}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Email</label>
                    <input
                      type="email"
                      name="customerEmail"
                      className="input"
                      placeholder="john@example.com"
                      value={formData.customerEmail}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <h3 className="form-section-title">Shipping Address</h3>
                <div className="form-group">
                  <label className="form-label">Address</label>
                  <input
                    type="text"
                    name="address"
                    className="input"
                    placeholder="123 Main Street"
                    value={formData.address}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">City</label>
                    <input
                      type="text"
                      name="city"
                      className="input"
                      placeholder="New York"
                      value={formData.city}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Postal Code</label>
                    <input
                      type="text"
                      name="postalCode"
                      className="input"
                      placeholder="10001"
                      value={formData.postalCode}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="btn btn-primary btn-lg checkout-submit"
                  disabled={loading}
                >
                  {loading ? 'Placing Order...' : `Place Order — $${cartTotal.toFixed(2)}`}
                </button>
              </form>
            )}
          </div>

          {/* Order Summary */}
          <div className="cart-summary glass">
            <h3 className="summary-title">Order Summary</h3>

            <div className="summary-items">
              {cartItems.map((item) => (
                <div key={item._id} className="summary-item">
                  <span className="summary-item-name">
                    {item.name} <span className="summary-qty">×{item.quantity}</span>
                  </span>
                  <span className="summary-item-price">
                    ${(item.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>

            <div className="summary-divider" />

            <div className="summary-row">
              <span>Subtotal</span>
              <span>${cartTotal.toFixed(2)}</span>
            </div>
            <div className="summary-row">
              <span>Shipping</span>
              <span className="free-shipping">Free</span>
            </div>

            <div className="summary-divider" />

            <div className="summary-row summary-total">
              <span>Total</span>
              <span>${cartTotal.toFixed(2)}</span>
            </div>

            {!isCheckout ? (
              <div className="summary-actions">
                <button
                  className="btn btn-primary btn-lg summary-checkout-btn"
                  onClick={() => setIsCheckout(true)}
                  id="proceed-to-checkout"
                >
                  Proceed to Checkout
                </button>
                <button
                  className="btn btn-secondary btn-sm"
                  onClick={clearCart}
                >
                  Clear Cart
                </button>
              </div>
            ) : (
              <button
                className="btn btn-secondary btn-sm"
                onClick={() => setIsCheckout(false)}
              >
                ← Back to Cart
              </button>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

export default CartPage;
