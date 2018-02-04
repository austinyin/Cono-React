
/**
 * 注册登陆登出
*/
export const REGIST = 'REGIST';
export const REGIST_SUCCEEDED = 'REGIST_SUCCEEDED';
export const REGIST_FAILED = 'REGIST_FAILED';
export const LOGIN = 'LOGIN';
export const LOGIN_SUCCEEDED = 'LOGIN_SUCCEEDED';
export const LOGIN_FAILED = 'LOGIN_FAILED';
export const LOGOUT = 'LOGOUT';
export const LOGOUT_SUCCEEDED = 'LOGOUT_SUCCEEDED';
export const LOGOUT_FAILED = 'LOGOUT_FAILED';


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
    registPhoneOrEmail: null,
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

