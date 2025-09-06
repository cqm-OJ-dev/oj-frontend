import React, { useState, useRef, useEffect } from 'react';
import Editor from '@monaco-editor/react';
import axios from 'axios';

const OnlineIDE = () => {
  const [code, setCode] = useState('// 欢迎使用在线IDE\nconsole.log("Hello, World!");\n\nfunction add(a, b) {\n  return a + b;\n}\n\nconsole.log(add(2, 3));');
  const [language, setLanguage] = useState('javascript'); // 默认语言
  const [output, setOutput] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [error, setError] = useState('');
  const consoleRef = useRef(null);

  // 执行代码 - 发送到后端
  const runCode = async () => {
    setIsRunning(true);
    setOutput('');
    setError('');
    
    try {
      const response = await axios.post('http://120.55.185.165:8000/judge/', {
        code: code,
        language: language
      }, {
        headers: {
            'Content-Type': 'application/json'
        },
        withCredentials: false  // 如果需要跨域携带凭证
      });
      
      // 假设后端返回格式: { output: "控制台输出", error: "错误信息" }
      if (response.data.message) {
        setError(response.data.message);
      } else {
        setOutput(response.data.output || '程序执行完成，没有输出');
      }
    } catch (err) {
      if (err.response) {
        // 请求已发出，服务器响应状态码不在2xx范围内
        setError(`服务器错误: ${err.response.status} - ${err.response.data?.message || '未知错误'}`);
      } else if (err.request) {
        // 请求已发出但没有收到响应
        setError('网络错误: 服务器无响应');
      } else {
        // 设置请求时出错
        setError(`请求错误: ${err.message}`);
      }
    } finally {
      setIsRunning(false);
    }
  };

  // 清空控制台
  const clearConsole = () => {
    setOutput('');
    setError('');
  };

  // 自动滚动控制台到底部
  useEffect(() => {
    if (consoleRef.current) {
      consoleRef.current.scrollTop = consoleRef.current.scrollHeight;
    }
  }, [output, error]);

  // 处理语言选择变化
  const handleLanguageChange = (e) => {
    setLanguage(e.target.value);
  };

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      height: '100vh',
      backgroundColor: '#1e1e1e',
      color: '#d4d4d4',
      overflow: 'hidden'
    }}>
      {/* 顶部导航栏 */}
      <div style={{
        backgroundColor: '#252526',
        padding: '8px 16px',
        display: 'flex',
        alignItems: 'center',
        borderBottom: '1px solid #333'
      }}>
        <div style={{
          fontSize: '18px',
          fontWeight: 'bold',
          marginRight: '20px'
        }}>
          在线IDE
        </div>
        <select 
          value={language} 
          onChange={handleLanguageChange}
          style={{
            padding: '5px',
            marginRight: '10px',
            backgroundColor: '#333',
            color: 'white',
            border: '1px solid #555',
            borderRadius: '3px'
          }}
        >
          <option value="javascript">JavaScript</option>
          <option value="python">Python</option>
          <option value="java">Java</option>
        </select>
        <button 
          onClick={runCode} 
          disabled={isRunning}
          style={{
            padding: '5px 10px',
            marginRight: '10px',
            backgroundColor: isRunning ? '#555' : '#0078d4',
            color: 'white',
            border: 'none',
            borderRadius: '3px',
            cursor: isRunning ? 'not-allowed' : 'pointer'
          }}
        >
          {isRunning ? '运行中...' : '运行'}
        </button>
        <button 
          onClick={clearConsole}
          style={{
            padding: '5px 10px',
            backgroundColor: '#0078d4',
            color: 'white',
            border: 'none',
            borderRadius: '3px',
            cursor: 'pointer'
          }}
        >
          清空控制台
        </button>
      </div>

      {/* 主内容区 */}
      <div style={{
        display: 'flex',
        flex: 1,
        overflow: 'hidden'
      }}>
        {/* 代码编辑器 */}
        <div style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          borderRight: '1px solid #333'
        }}>
          <div style={{
            padding: '8px',
            backgroundColor: '#2d2d2d',
            borderBottom: '1px solid #333'
          }}>
            代码编辑器
          </div>
          <Editor
            height="90vh"
            language={language}
            value={code}
            onChange={(value) => setCode(value || '')}
            theme="vs-dark"
            options={{
              minimap: { enabled: false }
            }}
          />
        </div>

        {/* 控制台 */}
        <div style={{
          width: '300px',
          display: 'flex',
          flexDirection: 'column'
        }}>
          <div style={{
            padding: '8px',
            backgroundColor: '#2d2d2d',
            borderBottom: '1px solid #333'
          }}>
            控制台输出
          </div>
          <div 
            ref={consoleRef}
            style={{
              flex: 1,
              padding: '8px',
              overflowY: 'auto',
              fontSize: '13px',
              whiteSpace: 'pre-wrap',
              fontFamily: 'monospace',
              backgroundColor: '#1e1e1e',
              color: '#d4d4d4'
            }}
          >
            {error ? `错误: ${error}` : output || '等待输出...'}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OnlineIDE;