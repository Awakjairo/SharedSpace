import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { registerUser, getErrorMessage } from '../services/api.js';
import StatusMessage from '../components/StatusMessage.jsx';

export default function Register() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: ''
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const update = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      await registerUser(form);
      setSuccess('Account created successfully. You can now log in.');
      setTimeout(() => navigate('/'), 1200);
    } catch (err) {
      setError(getErrorMessage(err, 'Unable to create your account.'));
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
            <span className="brand-tagline">A COMMUNITY OF POSSIBILITIES</span>
            <h1>Good things<br />happen together.</h1>
            <p>
              Join a growing community where people connect,
              exchange ideas, share opportunities and help
              one another.
            </p>
          </div>

          <div className="brand-decoration">
            <div className="decoration-circle circle-one"></div>
            <div className="decoration-circle circle-two"></div>
            <div className="decoration-circle circle-three"></div>
          </div>

          <p className="brand-footer">
            Your space to connect, contribute and belong.
          </p>
        </section>

        <section className="auth-content">
          <form className="auth-form" onSubmit={submit}>
            <div className="auth-heading">
              <span className="auth-eyebrow">JOIN OUR COMMUNITY</span>
              <h2>Create your account</h2>
              <p>It only takes a moment to get started.</p>
            </div>

            <StatusMessage type="error">{error}</StatusMessage>
            <StatusMessage type="success">{success}</StatusMessage>

            <div className="auth-field">
              <label htmlFor="name">Full name</label>
              <input
                id="name"
                name="name"
                type="text"
                placeholder="Enter your full name"
                value={form.name}
                onChange={update}
                autoComplete="name"
                required
              />
            </div>

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
                placeholder="Create a password"
                value={form.password}
                onChange={update}
                autoComplete="new-password"
                minLength="6"
                required
              />
              <small>Use at least 6 characters.</small>
            </div>

            <button className="auth-submit" disabled={loading}>
              {loading ? 'Creating account...' : 'Create Account'}
              <span aria-hidden="true">→</span>
            </button>

            <p className="auth-switch">
              Already have an account?
              <Link to="/"> Sign in</Link>
            </p>
          </form>
        </section>

      </div>
    </div>
  );
}