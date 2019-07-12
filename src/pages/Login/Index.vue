<template>
  <div class="loginContainer">
    <LoginForm :propsData="loginFormConfig" />
  </div>
</template>

<script>
import LoginForm from '@/components/BaseForm'
import form from './form.config.js'
export default {
  components: {LoginForm},
  data () {
    return {
      loginFormConfig: {}
    }
  },
  created () {
    this.setLoginFormConfig()
  },
  methods: {
    setLoginFormConfig () {
      this.loginFormConfig = {...form(this)}
    },
    onLogin (formName) {
      formName.validate((valid) => {
        if (valid) {
          this.$router.push({
            path: './index'
          })
          // this.$post('login', {
          //   username: this.loginFormConfig.formData.account,
          //   password: this.loginFormConfig.formData.password
          // }, res => {
          //   this.$store.dispatch('setUserInfo', res.data)
          //   console.log(res.data)
          // }, err => {
          //   console.log(err)
          // })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>

<style lang="less">
  @import url('./Index.less');
</style>
