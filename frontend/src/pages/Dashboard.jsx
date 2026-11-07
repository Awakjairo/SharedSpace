import { useEffect, useState } from 'react';
import AppShell from '../components/AppShell.jsx';
import StatusMessage from '../components/StatusMessage.jsx';
import { createPost, createService, getPosts, getServices, getWeather, getErrorMessage } from '../services/api.js';

const postCategories = ['Lost & Found', 'Event', 'Alert', 'Security'];
const serviceCategories = ['Tutoring', 'Delivery', 'Home Repair'];

function formatDate(value) {
  if (!value || value === 'Unknown') return 'Date unavailable';
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? value : date.toLocaleString();
}

export default function Dashboard({ user, onLogout }) {
  const [posts, setPosts] = useState([]);
  const [services, setServices] = useState([]);
  const [weather, setWeather] = useState(null);
  const [postForm, setPostForm] = useState({ title: '', content: '', category: '' });
  const [serviceForm, setServiceForm] = useState({ title: '', description: '', contact_info: '', category: '' });
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const userId = user?.id ?? user?.user_id;

  const loadDashboard = async () => {
    try {
      const [postResponse, serviceResponse] = await Promise.all([getPosts(), getServices()]);
      setPosts(Array.isArray(postResponse.data) ? postResponse.data : []);
      setServices(Array.isArray(serviceResponse.data) ? serviceResponse.data : []);
    } catch (err) {
      setError(getErrorMessage(err, 'Could not load community information. Is the Flask backend running?'));
    }
    try {
      const { data } = await getWeather('Nairobi');
      setWeather(data);
    } catch { setWeather(null); }
  };

  useEffect(() => { loadDashboard(); }, []);

  const submitPost = async (e) => {
    e.preventDefault(); setMessage(''); setError('');
    if (!userId) { setError('Your login response does not include a user ID. Please log out and log in again.'); return; }
    setBusy(true);
    try {
      await createPost({ ...postForm, user_id: userId });
      setMessage('Post created successfully');
      setPostForm({ title: '', content: '', category: '' });
      const { data } = await getPosts(); setPosts(Array.isArray(data) ? data : []);
    } catch (err) { setError(getErrorMessage(err, 'Could not create the post.')); }
    finally { setBusy(false); }
  };

  const submitService = async (e) => {
    e.preventDefault(); setMessage(''); setError('');
    if (!userId) { setError('Your login response does not include a user ID. Please log out and log in again.'); return; }
    setBusy(true);
    try {
      await createService({ ...serviceForm, user_id: userId });
      setMessage('Service created successfully');
      setServiceForm({ title: '', description: '', contact_info: '', category: '' });
      const { data } = await getServices(); setServices(Array.isArray(data) ? data : []);
    } catch (err) { setError(getErrorMessage(err, 'Could not add the service.')); }
    finally { setBusy(false); }
  };

  return (
    <AppShell onLogout={onLogout}>
      <section className="dashboard-floating-container">
        <header className="welcome-header">
          <h1>Welcome, {user?.name || 'Neighbour'}</h1>
          <p>Your local hub for community posts and services.</p>
        </header>

        <div className="weather-panel">
          <strong>☁ {weather?.city || 'Nairobi'}</strong>
          {weather ? <><span>Temperature: {Number(weather.temperature).toFixed(2)}°C</span><span>{weather.description}</span></> : <span>Weather information is currently unavailable.</span>}
        </div>

        <StatusMessage type="error">{error}</StatusMessage>
        <StatusMessage type="success">{message}</StatusMessage>

        <div className="dashboard-row">
          <section className="dashboard-card">
            <h2>Create a Post</h2>
            <form className="stack-form" onSubmit={submitPost}>
              <input placeholder="Title" value={postForm.title} onChange={(e) => setPostForm({ ...postForm, title: e.target.value })} required />
              <textarea placeholder="Content" value={postForm.content} onChange={(e) => setPostForm({ ...postForm, content: e.target.value })} required />
              <select value={postForm.category} onChange={(e) => setPostForm({ ...postForm, category: e.target.value })} required>
                <option value="">Select Category</option>
                {postCategories.map((category) => <option key={category}>{category}</option>)}
              </select>
              <button className="primary-button" disabled={busy}>Post</button>
            </form>
          </section>

          <section className="dashboard-card">
            <h2>Recent Posts</h2>
            <div className="recent-list">
              {posts.slice(0, 4).map((post) => (
                <article className="recent-item" key={post.id}>
                  <div className="item-heading"><strong>{post.title}</strong>{post.category && <span className="category-badge blue">{post.category}</span>}</div>
                  <p>{post.content}</p>
                  <small>By {post.author || `User #${post.user_id}`} at {formatDate(post.timestamp)}</small>
                </article>
              ))}
              {!posts.length && <p className="muted">No community posts yet.</p>}
            </div>
          </section>

          <section className="dashboard-card">
            <h2>Add a Service</h2>
            <form className="stack-form" onSubmit={submitService}>
              <input placeholder="Service title" value={serviceForm.title} onChange={(e) => setServiceForm({ ...serviceForm, title: e.target.value })} required />
              <textarea placeholder="Description" value={serviceForm.description} onChange={(e) => setServiceForm({ ...serviceForm, description: e.target.value })} required />
              <input placeholder="Contact information" value={serviceForm.contact_info} onChange={(e) => setServiceForm({ ...serviceForm, contact_info: e.target.value })} required />
              <select value={serviceForm.category} onChange={(e) => setServiceForm({ ...serviceForm, category: e.target.value })} required>
                <option value="">Select Category</option>
                {serviceCategories.map((category) => <option key={category}>{category}</option>)}
              </select>
              <button className="primary-button" disabled={busy}>Add Service</button>
            </form>
          </section>

          <section className="dashboard-card">
            <h2>Recent Services</h2>
            <div className="recent-list">
              {services.slice(0, 4).map((service) => (
                <article className="recent-item" key={service.id}>
                  <div className="item-heading"><strong>{service.title}</strong></div>
                  <p>{service.description}</p>
                  <small>Contact: {service.contact_info}</small>
                </article>
              ))}
              {!services.length && <p className="muted">No services listed yet.</p>}
            </div>
          </section>
        </div>
      </section>
    </AppShell>
  );
}
