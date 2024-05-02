<template>
  <el-form ref="ruleForm" :model="form" :rules="rules" label-width="0" status-icon class="login-ruleForm">
    <el-form-item prop="userName">
      <el-input
        ref="userName"
        v-model="form.userName"
        class="h40"
        name="userName"
        :placeholder="$t('form.userName')"
        :clearable="true"
        tabindex="1"
        type="text"
        maxlength="100"
        autocomplete="off"
      />
    </el-form-item>

    <el-form-item prop="password">
      <el-input
        ref="password"
        v-model="form.password"
        class="h40"
        show-password
        name="password"
        :placeholder="$t('form.password')"
        :clearable="true"
        tabindex="2"
        maxlength="16"
        type="password"
        autocomplete="off"
        @keyup.enter="loginHandle"
      />
    </el-form-item>

    <el-form-item style="margin-bottom: 0">
      <el-button class="h40" :loading="loading" type="primary" style="width: 100%" @click.prevent="loginHandle">
        {{ $t('system.login') }}
      </el-button>
    </el-form-item>
  </el-form>
</template>

<script setup>
import { ref, onBeforeMount, reactive } from 'vue'
import { login } from '@/api/user'
import { useUserStore } from '@/store'
import { useRouter, useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
const { t } = useI18n()

const router = useRouter()
const route = useRoute()
const userStore = useUserStore()

const ruleForm = ref()
const trigger = ['blur', 'change']
const message = t('form.requiredTips')

const form = reactive({
  userName: 'admin',
  password: '123',
})
const rules = {
  userName: [{ required: true, message, trigger }],
  password: [{ required: true, message, trigger }],
}
const loading = ref(false)

onBeforeMount(() => {
  getQueryParams()
})

function getQueryParams() {
  const query = route.query
}

function loginHandle() {
  loading.value = true
  ruleForm.value.validate(async valid => {
    if (valid) {
      try {
        userStore.SET_TOKEN('test_token')
        // router.push('/')
        const params = {
          username: form.userName,
          password: form.password,
        }
        login().then(res => {
          const { token } = res
          userStore.SET_TOKEN(token)
          router.push('/')
        })
      } catch (e) {
        console.warn(e)
      } finally {
        loading.value = false
      }
    }
  })
}

defineOptions({
  name: 'LoginPwd',
})
</script>

<style lang="scss" scoped></style>
