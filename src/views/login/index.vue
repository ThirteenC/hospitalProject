<template>
  <div class="section-container login-container un-select">
    <div class="fixed-header">
      <NavBar />
    </div>
    <div class="body fix-width">
      <div class="top">
        <div class="top-title">{{ $t('system.loginTitle') }}</div>
      </div>
      <div class="main">
        <login-pwd />
        <p class="tips">{{ $t('system.loginTips') }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { NavBar } from '@/layout/components'
import LoginPwd from './loginPwd.vue'

defineOptions({
  name: 'Login',
})
</script>

<style lang="scss" scoped>
.fixed-header {
  position: fixed;
  top: 0;
  right: 0;
  z-index: 9 !important;
  width: 100%;
  transition: width 0.28s;
}

.login-container {
  width: 100%;
  min-height: 100vh;
  padding: 22vh 0 100px;
  box-sizing: border-box;
  position: relative;
  background: #fff;
}

.body {
  width: 380px;
  margin: 0 auto;
}

.top-title {
  color: rgba(16, 16, 16, 1);
  font-size: 24px;
  text-align: center;
}

.main {
  margin-top: 30px;
}

.tips {
  margin-top: 30px;
  text-align: center;
  color: #777;
}

// 适配移动端
@media screen and (max-width: 768px) {
  .body {
    padding: 0 30px;
    box-shadow: none;
    border: 0;
    background: transparent;
    border-radius: 0;
  }
  .w380 {
    margin: 0 auto;
    width: 100vw;
    min-width: 100vw;
  }
}
</style>
