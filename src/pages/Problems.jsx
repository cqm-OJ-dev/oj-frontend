import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { translations, getBrowserLanguage } from '../include/locales';
import './Problems.css';

const Problems = ({ language }) => {
  const { currentUser, logout } = useAuth();
  const [problems, setProblems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [currentLanguage, setCurrentLanguage] = useState(getBrowserLanguage());
  const t = translations[currentLanguage] || translations.en;

  useEffect(() => {
    const fetchProblems = async () => {
      try {
        // 模拟API调用
        const mockProblems = [
          { id: 101, title: '两数之和', difficulty: '简单', acceptance: '72.5%', submissions: 1500 },
          { id: 102, title: '反转链表', difficulty: '中等', acceptance: '58.3%', submissions: 1200 },
          { id: 103, title: '最长回文子串', difficulty: '困难', acceptance: '32.1%', submissions: 800 },
        ];
        
        setProblems(mockProblems);
        setIsLoading(false);
      } catch (err) {
        setError('加载题目列表失败');
        setIsLoading(false);
      }
    };

    fetchProblems();
  }, []);

  const changeLanguage = (lang) => {
    if (translations[lang]) {
      setCurrentLanguage(lang);
    }
  };

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
      <Link to="/problems">{t.nav.problems}</Link>
      <Link to="/contests">{t.nav.contests}</Link>
      <Link to="/submissions">{t.nav.submissions}</Link>
      {currentUser ? (
        <UserAvatar user={currentUser} />
      ) : (
        <>
          <Link to="/login">{t.nav.login}</Link>
          <Link to="/register">{t.nav.register}</Link>
        </>
      )}
      <div className="language-switcher">
        <select 
          value={currentLanguage}
          onChange={(e) => changeLanguage(e.target.value)}
          className="language-select"
        >
          <option value="zh">中文</option>
          <option value="en">English</option>
        </select>
      </div>
    </nav>
  );

  if (isLoading) {
    return (
      <div className="hydro-container">
        <header className="hydro-header">
          <h1 className="hydro-title">{t.title}</h1>
          {renderNav()}
        </header>
        <main className="hydro-main">
          <div className="loading-container">加载中...</div>
        </main>
      </div>
    );
  }

  if (error) {
    return (
      <div className="hydro-container">
        <header className="hydro-header">
          <h1 className="hydro-title">{t.title}</h1>
          {renderNav()}
        </header>
        <main className="hydro-main">
          <div className="error-container">{error}</div>
        </main>
      </div>
    );
  }

  return (
    <div className="hydro-container">
      <header className="hydro-header">
        <h1 className="hydro-title">{t.title}</h1>
        {renderNav()}
      </header>
      <main className="hydro-main">
        <div className="problems-header">
          <h1>题目列表</h1>
          <div className="problems-filter">
            <select className="difficulty-filter">
              <option value="all">所有难度</option>
              <option value="easy">简单</option>
              <option value="medium">中等</option>
              <option value="hard">困难</option>
            </select>
          </div>
        </div>
        
        <div className="problems-card">
          <table className="problems-table">
            <thead>
              <tr>
                <th>题目ID</th>
                <th>题目名称</th>
                <th>难度</th>
                <th>通过率</th>
                <th>提交次数</th>
                <th>操作</th>
              </tr>
            </thead>
            <tbody>
              {problems.map(problem => (
                <tr key={problem.id}>
                  <td>{problem.id}</td>
                  <td>
                    <Link to={`/problems/${problem.id}`}>{problem.title}</Link>
                  </td>
                  <td>
                    <span className={`difficulty ${problem.difficulty === '简单' ? 'easy' : problem.difficulty === '中等' ? 'medium' : 'hard'}`}>
                      {problem.difficulty}
                    </span>
                  </td>
                  <td>{problem.acceptance}</td>
                  <td>{problem.submissions}</td>
                  <td>
                    <Link 
                      to={`/problems/${problem.id}`} 
                      className="solve-link"
                    >
                      开始做题
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
      <footer className="hydro-footer">
        <p>{t.footer.replace('{year}', new Date().getFullYear())}</p>
      </footer>
    </div>
  );
};

export default Problems;