import { NavLink, useNavigate } from 'react-router-dom';
import { LayoutDashboard, FileText, Wrench, UserRound, Settings as SettingsIcon, LogOut } from 'lucide-react';

const links = [
  { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/posts', label: 'Posts', icon: FileText },
  { to: '/services', label: 'Services', icon: Wrench },
  { to: '/profile', label: 'Profile', icon: UserRound }
];

export default function Sidebar({ onLogout }) {
  const navigate = useNavigate();
  return (
    <aside className="sidebar">
      <div className="sidebar-header">SharedSpace</div>
      <nav className="sidebar-nav" aria-label="Main navigation">
        {links.map(({ to, label, icon: Icon }) => (
          <NavLink key={to} to={to} className={({ isActive }) => `sidebar-link${isActive ? ' active' : ''}`}>
            <Icon size={16} strokeWidth={1.8} />
            <span>{label}</span>
          </NavLink>
        ))}
      </nav>
      <button className="logout-link" onClick={() => { onLogout?.(); navigate('/'); }}>
        <LogOut size={15} /> Logout
      </button>
    </aside>
  );
}
