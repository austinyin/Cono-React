
/**
 * 注册
*/
export const REGIST = 'REGIST';
export const REGIST_SUCCEEDED = 'REGIST_SUCCEEDED';
export const REGIST_FAILED = 'REGIST_FAILED';

/**
 * 登陆
 */
export const LOGIN = 'LOGIN';
export const LOGIN_SUCCEEDED = 'LOGIN_SUCCEEDED';
export const LOGIN_FAILED = 'LOGIN_FAILED';

/**
 * 登出
 */
export const LOGOUT = 'LOGOUT';
export const LOGOUT_SUCCEEDED = 'LOGOUT_SUCCEEDED';
export const LOGOUT_FAILED = 'LOGOUT_FAILED';

/**
 * 检测
 */
export const LOGIN_CHECK = 'LOGIN_CHECK';
export const LOGIN_CHECK_SUCCEEDED = 'LOGIN_CHECK_SUCCEEDED';
export const LOGIN_CHECK_FAILED = 'LOGIN_CHECK_FAILED';

export const FormType = {
    login : 'login',
    regist : 'regist'
};

export const LoginState = {
    login: 1,
    logout: 0,
};



export const AccountForm = {
    loginUsername: null,
    loginPassword: null,
    registPhone: null,
    registEmail: null,
    registFullname: null,
    registUsername: null,
    registPassword: null
};



export const LoginForm = {
    username: null,
    password: null,
    vericode: null
};

export const RegistForm = {
    username: null,
    password: null,
    fullname: null,
    phone: null,
    email: null,
    vericode: null
};

