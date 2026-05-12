import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchOrderById } from '../api';
import './OrderSuccessPage.css';

const OrderSuccessPage = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadOrder = async () => {
      try {
        const { data } = await fetchOrderById(id);
        setOrder(data);
      } catch (error) {
        console.error('Failed to load order:', error);
      } finally {
        setLoading(false);
      }
    };
    loadOrder();
  }, [id]);

  if (loading) {
    return (
      <div className="container" style={{ padding: '4rem 0', textAlign: 'center' }}>
        <p className="loading-text">Loading order details...</p>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="container empty-state" style={{ padding: '4rem 0' }}>
        <span className="empty-icon">😕</span>
        <h3>Order not found</h3>
        <Link to="/" className="btn btn-primary" style={{ marginTop: '1rem' }}>
          Back to Home
        </Link>
      </div>
    );
  }

  return (
    <main className="success-page animate-fade-in">
      <div className="container">
        <div className="success-card glass">
          {/* Success Header */}
          <div className="success-header">
            <div className="success-icon-wrapper">
              <span className="success-check">✓</span>
            </div>
            <h1 className="success-title">Order Placed Successfully!</h1>
            <p className="success-subtitle">
              Thank you for your purchase, <strong>{order.customerName}</strong>.
              Your order is being processed.
            </p>
          </div>

          {/* Order Info */}
          <div className="order-info-grid">
            <div className="order-info-item">
              <span className="order-info-label">Order ID</span>
              <span className="order-info-value">#{order._id.slice(-8).toUpperCase()}</span>
            </div>
            <div className="order-info-item">
              <span className="order-info-label">Status</span>
              <span className="order-status-badge">{order.status}</span>
            </div>
            <div className="order-info-item">
              <span className="order-info-label">Date</span>
              <span className="order-info-value">
                {new Date(order.createdAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </span>
            </div>
            <div className="order-info-item">
              <span className="order-info-label">Total</span>
              <span className="order-info-value order-total">${order.totalPrice.toFixed(2)}</span>
            </div>
          </div>

          {/* Order Items */}
          <div className="order-items-section">
            <h3 className="order-section-title">Items Ordered</h3>
            <div className="order-items-list">
              {order.orderItems.map((item, index) => (
                <div key={index} className="order-item">
                  <img src={item.image} alt={item.name} className="order-item-image" />
                  <div className="order-item-details">
                    <span className="order-item-name">{item.name}</span>
                    <span className="order-item-meta">
                      Qty: {item.quantity} × ${item.price.toFixed(2)}
                    </span>
                  </div>
                  <span className="order-item-total">
                    ${(item.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Shipping Details */}
          <div className="shipping-section">
            <h3 className="order-section-title">Shipping Details</h3>
            <div className="shipping-info">
              <p>{order.customerName}</p>
              <p>{order.customerEmail}</p>
              <p>{order.shippingAddress.address}</p>
              <p>{order.shippingAddress.city}, {order.shippingAddress.postalCode}</p>
            </div>
          </div>

          {/* Actions */}
          <div className="success-actions">
            <Link to="/" className="btn btn-primary btn-lg">
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
};

export default OrderSuccessPage;
