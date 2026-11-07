import AppShell from '../components/AppShell.jsx';

export default function Profile({ user, onLogout }) {
  const name = user?.name || user?.username || 'Neighbour';
  return (
    <AppShell onLogout={onLogout} mainClass="profile-main">
      <section className="profile-card">
        <h1>My Profile</h1>
        <div className="profile-intro">
          <h2>{name}</h2>
          <p>{user?.email || 'Email not available'}</p>
        </div>
        <div className="profile-grid">
          <div className="profile-detail"><strong>Username</strong><span>{user?.username || name}</span></div>
          <div className="profile-detail"><strong>Phone</strong><span>{user?.phone || '+254 700 000 000'}</span></div>
          <div className="profile-detail"><strong>Location</strong><span>{user?.location || 'Nairobi, Kenya'}</span></div>
        </div>
        
      </section>
    </AppShell>
  );
}
