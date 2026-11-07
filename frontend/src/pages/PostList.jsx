import { useEffect, useState } from 'react';
import AppShell from '../components/AppShell.jsx';
import { getPosts, getErrorMessage } from '../services/api.js';
import StatusMessage from '../components/StatusMessage.jsx';

export default function PostList({ onLogout }) {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState('');
  const refresh = async () => {
    setError('');
    try { const { data } = await getPosts(); setPosts(Array.isArray(data) ? data : []); }
    catch (err) { setError(getErrorMessage(err, 'Unable to load posts.')); }
  };
  useEffect(() => { refresh(); }, []);
  return (
    <AppShell onLogout={onLogout}>
      <section className="page-content">
        <h1 className="page-title">📢 Community Posts</h1>
        <button className="primary-button refresh-button" onClick={refresh}>↻ Refresh Posts</button>
        <StatusMessage type="error">{error}</StatusMessage>
        <div className="feed-list">
          {posts.map((post) => (
            <article className="feed-card" key={post.id}>
              <div className="item-heading"><strong>{post.title}</strong>{post.category && <span className="category-badge blue">{post.category}</span>}</div>
              <p>{post.content}</p>
              <small>Posted by: {post.author || `User #${post.user_id}`} at {post.timestamp ? new Date(post.timestamp).toLocaleString() : 'Date unavailable'}</small>
            </article>
          ))}
          {!posts.length && !error && <p className="muted">No posts have been shared yet.</p>}
        </div>
      </section>
    </AppShell>
  );
}
