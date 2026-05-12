import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchOrders } from '../api';
import './OrdersPage.css';

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadOrders = async () => {
      try {
        const { data } = await fetchOrders();
        setOrders(data);
      } catch (error) {
        console.error('Failed to load orders:', error);
      } finally {
        setLoading(false);
      }
    };
    loadOrders();
  }, []);

  if (loading) {
    return (
      <main className="orders-page">
        <div className="container">
          <h1 className="page-title">Order History</h1>
          <div className="orders-loading">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="skeleton-order">
                <div className="skeleton-line long" />
                <div className="skeleton-line medium" />
                <div className="skeleton-line short" />
              </div>
            ))}
          </div>
        </div>
      </main>
    );
  }

  if (orders.length === 0) {
    return (
      <main className="orders-page animate-fade-in">
        <div className="container">
          <div className="empty-orders">
            <span className="empty-orders-icon">📦</span>
            <h2>No orders yet</h2>
            <p>When you place an order, it will appear here.</p>
            <Link to="/" className="btn btn-primary btn-lg">
              Start Shopping
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="orders-page animate-fade-in">
      <div className="container">
        <div className="orders-header">
          <h1 className="page-title">Order History</h1>
          <span className="orders-count">{orders.length} order{orders.length !== 1 ? 's' : ''}</span>
        </div>

        <div className="orders-list" id="orders-list">
          {orders.map((order) => (
            <div key={order._id} className="order-card glass" id={`order-${order._id}`}>
              {/* Order Header */}
              <div className="order-card-header">
                <div className="order-card-meta">
                  <span className="order-id">Order #{order._id.slice(-8).toUpperCase()}</span>
                  <span className="order-date">
                    {new Date(order.createdAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </span>
                </div>
                <div className="order-card-right">
                  <span className={`order-status-pill status-${order.status.toLowerCase()}`}>
                    {order.status}
                  </span>
                </div>
              </div>

              {/* Order Items */}
              <div className="order-card-items">
                {order.orderItems.map((item, index) => (
                  <div key={index} className="order-card-item">
                    <img src={item.image} alt={item.name} className="order-card-item-img" />
                    <div className="order-card-item-info">
                      <span className="order-card-item-name">{item.name}</span>
                      <span className="order-card-item-qty">
                        Qty: {item.quantity} × ${item.price.toFixed(2)}
                      </span>
                    </div>
                    <span className="order-card-item-subtotal">
                      ${(item.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>

              {/* Order Footer */}
              <div className="order-card-footer">
                <div className="order-shipping-summary">
                  <span className="shipping-label">Ship to:</span>
                  <span className="shipping-value">
                    {order.customerName} — {order.shippingAddress.city}, {order.shippingAddress.postalCode}
                  </span>
                </div>
                <div className="order-card-total">
                  <span className="total-label">Total</span>
                  <span className="total-value">${order.totalPrice.toFixed(2)}</span>
                </div>
              </div>

              {/* View Details Link */}
              <Link to={`/order-success/${order._id}`} className="order-view-details">
                View Full Details →
              </Link>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};

export default OrdersPage;
