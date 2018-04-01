export const settingElemList = [
    {
        link:"/account/edit",
        label:"编辑主页",
        active:false
    },
    {
        link:"/account/password/change",
        label:"修改密码",
        active:false
    }
]





export const editForm = {
    username:{key:"username",label:"姓名",type:"text",value:null},
    fullname:{key:"fullname",label:"帐号",type:"text",value:null},
    web_page:{key:"web_page",label:"网站",type:"text",value:null},
    self_intro:{key:"self_intro",label:"个人简介",type:"text",value:null},
    email:{key:"email",type:"email",label:"邮箱",value:null},
    phone:{key:"phone",type:"number",label:"电话号码",value:null},
    gender:{key:"gender",type:"select",label:"性别",value:null,options:[{key:"男",value:1},{key:"女",value:2}]}
}


export const passwordChangeForm = {
    oldPassword:{key:"oldPassword",label:"旧密码",type:"password",value:null},
    newPassword:{key:"newPassword",label:"新密码",type:"password",value:null},
    newPasswordRepeat:{key:"newPasswordRepeat",label:"再次输入新密码",type:"password",value:null},
}