import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { translations, getBrowserLanguage } from '../include/locales';
import './Contests.css';

const Contests = ({ language }) => {
  const { currentUser, logout } = useAuth();
  const [contests, setContests] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [currentLanguage, setCurrentLanguage] = useState(getBrowserLanguage());
  const t = translations[currentLanguage] || translations.en;

  useEffect(() => {
    const fetchContests = async () => {
      try {
        // 模拟API调用
        const mockContests = [
          { 
            id: 1, 
            title: '春季编程大赛', 
            startTime: '2023-05-01T09:00:00',
            endTime: '2023-05-01T12:00:00',
            participants: 1250,
            description: '年度最大的编程竞赛，涵盖多种算法题型',
            organizer: 'Hydro官方'
          },
          { 
            id: 2, 
            title: '算法挑战赛', 
            startTime: '2023-06-15T14:00:00',
            endTime: '2023-06-15T17:00:00',
            participants: 800,
            description: '专注于算法和数据结构的专项比赛',
            organizer: '算法协会'
          },
          { 
            id: 3, 
            title: '新手训练赛', 
            startTime: '2025-06-07T21:00:00',
            endTime: '2025-06-07T21:10:00',
            participants: 10,
            description: '适合编程新手的入门级比赛',
            organizer: '编程教育联盟'
		  }
        ];
        
        // 计算每个比赛的状态
        const contestsWithStatus = mockContests.map(contest => ({
          ...contest,
          status: getContestStatus(contest.startTime, contest.endTime)
        }));
        
        setContests(contestsWithStatus);
        setIsLoading(false);
      } catch (err) {
        setError('加载比赛列表失败');
        setIsLoading(false);
      }
    };

    fetchContests();
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

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString(currentLanguage === 'zh' ? 'zh-CN' : 'en-US');
  };

  const getContestStatus = (startTime, endTime) => {
    const now = new Date();
    const start = new Date(startTime);
    const end = new Date(endTime);
    
    if (now < start) return 'upcoming';
    if (now > end) return 'ended';
    return 'ongoing';
  };

  const getStatusText = (status) => {
    const statusMap = {
      zh: {
        upcoming: '未开始',
        ongoing: '进行中',
        ended: '已结束'
      },
      en: {
        upcoming: 'Upcoming',
        ongoing: 'Ongoing',
        ended: 'Ended'
      }
    };
    
    return statusMap[currentLanguage]?.[status] || status;
  };

  if (isLoading) {
    return (
      <div className="hydro-container">
        <header className="hydro-header">
          <h1 className="hydro-title">Hydro</h1>
          {renderNav()}
        </header>
        <main className="hydro-main">
          <div className="loading-container">
            <div className="loading-spinner"></div>
            加载中...
          </div>
        </main>
      </div>
    );
  }
  if (error) {
    return (
      <div className="hydro-container">
        <header className="hydro-header">
          <h1 className="hydro-title">Hydro</h1>
          {renderNav()}
        </header>
        <main className="hydro-main">
          <div className="error-container">
            <span className="error-icon">⚠️</span>
            {error}
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="hydro-container">
      <header className="hydro-header">
        <h1 className="hydro-title">Hydro</h1>
        {renderNav()}
      </header>
      <main className="hydro-main">
        <div className="contests-header">
          <h1>比赛列表</h1>
          {currentUser && (
            <Link to="/contests/create" className="create-contest-button">
              创建比赛
            </Link>
          )}
        </div>
        
        <div className="contest-cards-container">
          {contests.map(contest => (
            <div key={contest.id} className={`contest-card ${contest.status}`}>
              <div className="contest-card-header">
                <h2 className="contest-title">
                  <Link to={`/contests/${contest.id}`}>{contest.title}</Link>
                </h2>
                <span className={`contest-status ${contest.status}`}>
                  {getStatusText(contest.status)}
                </span>
              </div>
              
              <div className="contest-card-body">
                <p className="contest-description">{contest.description}</p>
                
                <div className="contest-meta">
                  <div className="meta-item">
                    <span className="meta-label">主办方:</span>
                    <span className="meta-value">{contest.organizer}</span>
                  </div>
                  <div className="meta-item">
                    <span className="meta-label">开始时间:</span>
                    <span className="meta-value">{formatDate(contest.startTime)}</span>
                  </div>
                  <div className="meta-item">
                    <span className="meta-label">结束时间:</span>
                    <span className="meta-value">{formatDate(contest.endTime)}</span>
                  </div>
                  <div className="meta-item">
                    <span className="meta-label">参赛人数:</span>
                    <span className="meta-value">{contest.participants}</span>
                  </div>
                </div>
              </div>
              
              <div className="contest-card-footer">
                <Link 
                  to={`/contests/${contest.id}`} 
                  className="contest-action-button"
                >
                  {contest.status === 'ended' ? '查看结果' : '进入比赛'}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </main>
      <footer className="hydro-footer">
        <p>{t.footer.replace('{year}', new Date().getFullYear())}</p>
      </footer>
    </div>
  );
};

export default Contests;