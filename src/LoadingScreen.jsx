import React, { useEffect, useState } from 'react';
import './LoadingScreen.css';

import { translations, getBrowserLanguage } from './include/locales';

const LoadingScreen = ({ showFeedbackPrompt })  => {
  const [loadingText, setLoadingText] = useState('Loading...');
  const [language, setLanguage] = useState(getBrowserLanguage);
  const t = translations[language] || translations.en;
  useEffect(() => {
    const userLanguage = navigator.language || navigator.userLanguage;
    const translations = {
    'zh': '正在连接服务器...',
    'zh-CN': '正在连接服务器...',
    'zh-TW': '正在連接伺服器...',
    'ja': 'サーバーに接続中...',
    'ko': '서버에 연결 중...',
    'en': 'Connecting to server...',
    'es': 'Conectando al servidor...',
    'fr': 'Connexion au serveur...',
    'de': 'Verbindung zum Server...',
    'ru': 'Подключение к серверу...',
    'pt': 'Conectando ao servidor...',
    'it': 'Connessione al server...',
    'ar': 'جارٍ الاتصال بالخادم...',
    'hi': 'सर्वर से कनेक्ट हो रहा है...',
    };
    
    setLoadingText(translations[userLanguage.split('-')[0]] || translations[userLanguage] || 'Connecting to judge server...');
  }, []);

  return (
    <div className="hydro-loading-screen">
      <div className="hydro-loading-content">
        <div className="hydro-logo">
          <span className="hydro-logo-text">Hydro</span>
          <div className="hydro-logo-subtext">Online Judge</div>
        </div>
        <div className="hydro-loading-bar">
          <div className="hydro-loading-progress"></div>
        </div>
        <p className="hydro-loading-text">{loadingText}</p>
        {showFeedbackPrompt && (
          <div className="feedback-prompt">
            <p>{t.issues}<a href="#" onClick={() => alert('发送反馈')}>{t.feedback}</a></p>
          </div>
        )}
      </div>
    </div>
  );
};

export default LoadingScreen;