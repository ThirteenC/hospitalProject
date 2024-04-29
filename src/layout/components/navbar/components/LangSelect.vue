<template>
  <div>
    <el-button @click="dialogVisible = true">
      {{ language == 'zh' ? '中文' : 'ENG' }}
    </el-button>
    <el-dialog v-model="dialogVisible" :title="t('system.langSetting.title')" width="450">
      <div>
        <el-radio-group v-model="langSelect" style="display: flex; flex-direction: column; align-items: start">
          <el-radio value="en" label="en">English</el-radio>
          <el-radio value="zh" label="zh">中文</el-radio>
        </el-radio-group>
      </div>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="dialogVisible = false">{{ $t('system.cancel') }}</el-button>
          <el-button type="primary" @click="onLangChange"> {{ $t('system.confirm') }} </el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { ElMessage } from 'element-plus'
import { useAppStore } from '@/store'
import { useI18n } from 'vue-i18n'
const { t, locale } = useI18n()
const appStore = useAppStore()

let dialogVisible = ref(false)
let langSelect = ref('zh')

const language = computed(() => {
  return appStore.lang
})

locale.value = language.value
langSelect.value = language.value

const onLangChange = () => {
  appStore.SET_LANG(langSelect.value)
  locale.value = langSelect.value
  dialogVisible.value = false
  ElMessage.success(t('system.langSetting.langChangeTips'))
}

defineOptions({
  name: 'LangSelect',
})
</script>

<style lang="scss" scoped>
::v-deep(.el-dialog__header) {
  text-align: center;
}
</style>
