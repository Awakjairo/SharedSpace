import Sidebar from './Sidebar.jsx';

export default function AppShell({ children, onLogout, mainClass = '' }) {
  return (
    <div className="app-container">
      <Sidebar onLogout={onLogout} />
      <main className={`main-content ${mainClass}`}>{children}</main>
    </div>
  );
}
