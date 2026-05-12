import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <div className="footer-brand">
          <span className="brand-icon">🛒</span>
          <span className="footer-brand-text">ShopVerse</span>
        </div>
        <p className="footer-text">
          &copy; {new Date().getFullYear()} ShopVerse. Built with MERN Stack.
        </p>
        <div className="footer-links">
          <span className="footer-tech">MongoDB</span>
          <span className="footer-divider">•</span>
          <span className="footer-tech">Express</span>
          <span className="footer-divider">•</span>
          <span className="footer-tech">React</span>
          <span className="footer-divider">•</span>
          <span className="footer-tech">Node.js</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
