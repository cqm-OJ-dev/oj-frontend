import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import './Submissions.css';
import { translations, getBrowserLanguage } from '../include/locales';

const Submissions = ({ language }) => {
  const { currentUser, isLoading: authLoading, login, logout } = useAuth();
  const [submissions, setSubmissions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [language1, setLanguage] = useState(getBrowserLanguage());
  const t = translations[language1] || translations.en;
  document.title = "提交记录";

  useEffect(() => {
    const fetchSubmissions = async () => {
      try {
        if (!currentUser) return;
        
        // 模拟API调用
        const mockSubmissions = [
          { 
            id: 1, 
            problemId: 101, 
            problemTitle: '两数之和',
            language: 'Python',
            status: 'Compile Error',
            runtime: '45ms',
            memory: '14.5MB',
            submittedAt: '2023-04-10T14:30:00'
          },
          { 
            id: 2, 
            problemId: 102, 
            problemTitle: '反转链表',
            language: 'C++',
            status: 'Wrong Answer',
            runtime: 'N/A',
            memory: 'N/A',
            submittedAt: '2023-04-08T09:15:00'
          },
        ];
        
        setSubmissions(mockSubmissions);
        setIsLoading(false);
      } catch (err) {
        setError('加载提交记录失败');
        setIsLoading(false);
      }
    };

    fetchSubmissions();
  }, [currentUser]);
  const changeLanguage = (lang) => {
    if (translations[lang]) {
      setLanguage(lang);
    }
  };
  if (!currentUser) {
    return (
      <div className="auth-required">
        <h2>请登录查看提交记录</h2>
        <Link to="/login" className="login-link">前往登录</Link>
      </div>
    );
  }

  if (isLoading) {
    return <div className="loading-container">加载中...</div>;
  }

  if (error) {
    return <div className="error-container">{error}</div>;
  }
  const UserAvatar = ({ user }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <div className="user-avatar-container">
        <button 
          className="avatar-button"
          onClick={() => setIsOpen(!isOpen)}
        >
          {user.username.charAt(0).toUpperCase()}
        </button>
        
        {isOpen && (
          <div className="user-dropdown">
            <div className="user-info">
              <span className="username">{user.username}</span>
            </div>
            <button className="dropdown-item" onClick={() => setIsOpen(false)}>
              {t.nav.profile || 'Profile'}
            </button>
            <button 
              className="dropdown-item logout" 
              onClick={() => logout()}
            >
              {t.nav.logout || 'Logout'}
            </button>
          </div>
        )}
      </div>
    );
  };

  const renderNav = () => (
    <nav className="hydro-nav">
      {currentUser ? (
        <>
          <a href="/problems">{t.nav.problems}</a>
          <a href="/contests">{t.nav.contests}</a>
          <a href="/submissions">{t.nav.submissions}</a>
          <UserAvatar user={currentUser} />
        </>
      ) : (
        <>
          <a href="/login">{t.nav.login}</a>
          <a href="/register">{t.nav.register}</a>
        </>
      )}
      
      <div className="language-switcher">
        <select 
          value={language1}
          onChange={(e) => changeLanguage(e.target.value)}
          className="language-select"
        >
          <option value="zh">中文</option>
          <option value="en">English</option>
        </select>
      </div>
    </nav>
  );
  return (
    <div className="hydro-container">
      <header className="hydro-header">
        <h1 className="hydro-title">{t.title}</h1>
        {renderNav()}
      </header>
      <main className="hydro-main">
      <table className="hydro-problems">
      <h1>我的提交</h1>
      
      <div className="submissions-table-container">
        <table className="submissions-table">
          <thead>
            <tr>
              <th>提交ID</th>
              <th>题目</th>
              <th>语言</th>
              <th>状态</th>
              <th>运行时间</th>
              <th>内存</th>
              <th>提交时间</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody>
            {submissions.map(sub => (
              <tr key={sub.id}>
                <td>{sub.id}</td>
                <td>
                  <Link to={`/problems/${sub.problemId}`}>{sub.problemTitle}</Link>
                </td>
                <td>{sub.language}</td>
                <td>
                  <span className={`status ${sub.status.toLowerCase().replace(' ', '-')}`}>
                    {sub.status}
                  </span>
                </td>
                <td>{sub.runtime}</td>
                <td>{sub.memory}</td>
                <td>{new Date(sub.submittedAt).toLocaleString()}</td>
                <td>
                  <Link 
                    to={`/submissions/${sub.id}`} 
                    className="detail-link"
                  >
                    详情
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      </table>
      </main>
      <footer className="hydro-footer">
        <p>{t.footer.replace('{year}', new Date().getFullYear())}</p>
      </footer>
    </div>
  );
};

export default Submissions;