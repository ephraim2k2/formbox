import React, { useState, useEffect } from 'react';
import { Bell, CheckCheck, Clock, CheckCircle, AlertTriangle, X } from 'lucide-react';
import { useWorkspace } from '../context/WorkspaceContext';
import './NotificationCenter.css';

export default function NotificationCenter({ isOpen, onClose }) {
  const { terms } = useWorkspace();
  const [filter, setFilter] = useState('all');
  const [notifications, setNotifications] = useState(terms.notifications);

  useEffect(() => {
    setNotifications(terms.notifications);
  }, [terms]);

  const markAllRead = () => {
    setNotifications(notifications.map(n => ({ ...n, unread: false })));
  };

  const filtered = filter === 'unread' 
    ? notifications.filter(n => n.unread) 
    : notifications;

  const unreadCount = notifications.filter(n => n.unread).length;

  if (!isOpen) return null;

  return (
    <div className="notif-dropdown">
      <div className="notif-header">
        <div className="notif-title-row">
          <div className="notif-title">
            <Bell size={16} />
            <span>Notifications</span>
            {unreadCount > 0 && (
              <span className="notif-count-badge">{unreadCount} new</span>
            )}
          </div>
          <button className="notif-close-btn" onClick={onClose}>
            <X size={15} />
          </button>
        </div>

        <div className="notif-actions-row">
          <div className="notif-tabs">
            <button 
              className={`notif-tab ${filter === 'all' ? 'active' : ''}`}
              onClick={() => setFilter('all')}
            >
              All
            </button>
            <button 
              className={`notif-tab ${filter === 'unread' ? 'active' : ''}`}
              onClick={() => setFilter('unread')}
            >
              Unread ({unreadCount})
            </button>
          </div>
          {unreadCount > 0 && (
            <button className="notif-read-btn" onClick={markAllRead}>
              <CheckCheck size={14} /> Mark all read
            </button>
          )}
        </div>
      </div>

      <div className="notif-body">
        {filtered.length === 0 ? (
          <div className="notif-empty">
            <CheckCircle size={32} className="notif-empty-icon" />
            <p>You're all caught up!</p>
          </div>
        ) : (
          filtered.map(item => (
            <div 
              key={item.id} 
              className={`notif-item ${item.unread ? 'unread' : ''}`}
              onClick={() => {
                setNotifications(notifications.map(n => n.id === item.id ? { ...n, unread: false } : n));
              }}
            >
              <div className={`notif-icon-box ${item.type}`}>
                {item.type === 'success' && <CheckCircle size={15} />}
                {item.type === 'payment' && <Clock size={15} />}
                {item.type === 'warning' && <AlertTriangle size={15} />}
                {item.type === 'info' && <Bell size={15} />}
              </div>
              <div className="notif-content">
                <div className="notif-item-title">{item.title}</div>
                <div className="notif-item-desc">{item.description}</div>
                <div className="notif-item-time">{item.time}</div>
              </div>
              {item.unread && <span className="notif-unread-dot" />}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
