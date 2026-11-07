import { useEffect, useState } from 'react';
import AppShell from '../components/AppShell.jsx';
import { getServices, getErrorMessage } from '../services/api.js';
import StatusMessage from '../components/StatusMessage.jsx';

export default function ServiceList({ onLogout }) {
  const [services, setServices] = useState([]);
  const [error, setError] = useState('');
  useEffect(() => {
    getServices().then(({ data }) => setServices(Array.isArray(data) ? data : []))
      .catch((err) => setError(getErrorMessage(err, 'Unable to load services.')));
  }, []);
  return (
    <AppShell onLogout={onLogout}>
      <section className="page-content">
        <h1 className="page-title">Community Services</h1>
        <StatusMessage type="error">{error}</StatusMessage>
        <div className="service-list">
          {services.map((service) => (
            <article className="service-card" key={service.id}>
              <div className="item-heading"><strong>{service.title}</strong>{service.category && <span className="category-badge green">{service.category}</span>}</div>
              <p>{service.description}</p>
              <small>Contact: {service.contact_info}</small>
            </article>
          ))}
          {!services.length && !error && <p className="muted">No community services have been listed yet.</p>}
        </div>
      </section>
    </AppShell>
  );
}
