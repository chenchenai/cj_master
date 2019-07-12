export default (vm, data) => {
  const enterEvent = {
    enterEvent: () => {
      vm.onLogin()
    }
  }
  return {
    props: {
      class: 'loginForm',
      ref: 'loginForm',
      labelWidth: '80px',
      errorMsg: {}
    },
    rules: {
      account: [
        { required: true, message: '请输入用户账号', trigger: 'blur' }
      ],
      password: [
        { required: true, message: '请输入密码', trigger: 'blur' }
      ]
    },
    formData: {},
    formItems: {
      account: {
        name: 'account',
        type: 'input',
        label: '账号',
        placeholder: '请输入用户账号',
        on: enterEvent
      },
      password: {
        name: 'password',
        type: 'password',
        label: '密码',
        placeholder: '请输入密码',
        on: enterEvent
      },
      button: {
        name: 'submit',
        type: 'button',
        class: 'btnFormItem',
        btns: [
          {
            type: 'primary',
            text: '登陆',
            class: 'confirmLogin',
            onClick: vm.onLogin
          }
        ]
      }
    }
  }
}
