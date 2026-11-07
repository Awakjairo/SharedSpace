import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { loginUser, getErrorMessage } from '../services/api.js';
import StatusMessage from '../components/StatusMessage.jsx';

export default function Login({ setUser }) {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const update = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const { data } = await loginUser(form);
      const user = data.user || {
        email: form.email,
        name: form.email.split('@')[0]
      };

      setUser(user);
      navigate('/dashboard');
    } catch (err) {
      setError(
        getErrorMessage(
          err,
          'Unable to log in. Check your details and try again.'
        )
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-layout">

        <section className="auth-brand">
          <div className="brand-logo">
            <span>S</span>
            <span>SharedSpace</span>
          </div>

          <div className="brand-content">
            <span className="brand-tagline">CONNECT. SHARE. GROW.</span>
            <h1>Your community.<br />Your space.</h1>
            <p>
              A place to connect with people, share ideas,
              discover useful services and stay informed.
            </p>
          </div>

          <div className="brand-decoration">
            <div className="decoration-circle circle-one"></div>
            <div className="decoration-circle circle-two"></div>
            <div className="decoration-circle circle-three"></div>
          </div>

          <p className="brand-footer">
            Bringing communities closer, one connection at a time.
          </p>
        </section>

        <section className="auth-content">
          <form className="auth-form" onSubmit={submit}>
            <div className="auth-heading">
              <span className="auth-eyebrow">WELCOME BACK</span>
              <h2>Sign in to SharedSpace</h2>
              <p>We're glad to have you back. Enter your details below.</p>
            </div>

            <StatusMessage type="error">{error}</StatusMessage>

            <div className="auth-field">
              <label htmlFor="email">Email address</label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="you@example.com"
                value={form.email}
                onChange={update}
                autoComplete="email"
                required
              />
            </div>

            <div className="auth-field">
              <label htmlFor="password">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                placeholder="Enter your password"
                value={form.password}
                onChange={update}
                autoComplete="current-password"
                required
              />
            </div>

            <button className="auth-submit" disabled={loading}>
              {loading ? 'Signing in...' : 'Sign In'}
              <span aria-hidden="true">→</span>
            </button>

            <p className="auth-switch">
              Don't have an account?
              <Link to="/register"> Create an account</Link>
            </p>
          </form>
        </section>

      </div>
    </div>
  );
}