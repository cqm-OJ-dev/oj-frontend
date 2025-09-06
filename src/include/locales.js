export const translations = {
  en: {
    title: "Hydro",
    issues: "Having issues?",
    feedback: "send feedback",
    nav: {
      problems: "Problems",
      contests: "Contests",
      submissions: "Submissions",
      login: "Login",
      register: "Register"
    },
    welcome: {
      title: "Welcome to Hydro",
      subtitle: "A modern online judge system for programming contests and practice"
    },
    problems: {
      recent: "Recent Problems"
    },
    footer: "Hydro OJ © {year}",
    auth: {
      loginTitle: "Login to Hydro",
      registerTitle: "Create an Account",
      email: "Email",
      password: "Password",
      confirmPassword: "Confirm Password",
      username: "Username",
      loginButton: "Login",
      registerButton: "Register",
      noAccount: "Don't have an account?",
      haveAccount: "Already have an account?",
      registerHere: "Register here",
      loginHere: "Login here"
    }
  },
  zh: {
    title: "Hydro",
    issues: "服务器断线?",
    feedback: "发送反馈",
    nav: {
      problems: "题目",
      contests: "比赛",
      submissions: "提交记录",
      login: "登录",
      register: "注册"
    },
    welcome: {
      title: "欢迎使用 Hydro",
      subtitle: "现代化的编程竞赛与练习在线评测系统"
    },
    problems: {
      recent: "近期题目"
    },
    footer: "Hydro 在线评测 © {year}",
    auth: {
      loginTitle: "登录 Hydro",
      registerTitle: "创建账户",
      email: "电子邮箱",
      password: "密码",
      confirmPassword: "确认密码",
      username: "用户名",
      loginButton: "登录",
      registerButton: "注册",
      noAccount: "没有账户？",
      haveAccount: "已有账户？",
      registerHere: "立即注册",
      loginHere: "立即登录"
    }
  }
};

export const getBrowserLanguage = () => {
  const userLanguage = navigator.language || navigator.userLanguage;
  return userLanguage.split('-')[0];
};