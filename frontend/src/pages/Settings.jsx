import AppShell from '../components/AppShell.jsx';

export default function Settings({ user, onLogout }) {
  return (
    <AppShell onLogout={onLogout}>
      <section className="profile-card settings-card">
        <h1>Settings</h1>
        <p>Settings management was listed as a recommendation in the project report, not as a completed feature.</p>
        <p className="muted">Signed in as {user?.email || 'your account'}.</p>
      </section>
    </AppShell>
  );
}
