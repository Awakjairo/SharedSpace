export default function StatusMessage({ type = 'info', children }) {
  if (!children) return null;
  return <div className={`status-message ${type}`} role="status">{children}</div>;
}
