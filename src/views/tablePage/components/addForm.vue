<template>
  <UserInfo></UserInfo>
  <div class="dashboard-editor-container">
    <el-card>
      <div class="form_container_header">
        <div class="form_container_header_title">
          <div class="form_container_header_title_text">{{ $t('table.addFormTitle') }}</div>
          <el-button>{{ $t('table.addFormHistory') }}</el-button>
        </div>
        <div class="form_container_header_btn">
          <el-button>{{ $t('table.addFormCancel') }}</el-button>
          <el-button type="primary" @click="onSubmit">{{ $t('table.addFormConfirm') }}</el-button>
        </div>
      </div>
      <el-form ref="formRef" :model="form" label-width="120px" label-position="top">
        <div class="form_container">
          <div class="form_container_left">
            <el-form-item :label="$t('table.addFormLabel1')">
              <div style="margin-right: 10px">{{ nowTime }}</div>
              <el-time-select
                v-model="form.time"
                style="width: 240px"
                start="00:00"
                step="00:05"
                end="23:59"
                placeholder="Select time"
                format="hh:mm A"
              />
            </el-form-item>
            <el-form-item :label="$t('table.addFormLabel2')">
              <el-radio-group v-model="form.radio">
                <el-radio value="1" size="large" border>Option A</el-radio>
                <el-radio value="2" size="large" border>Option B</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item :label="$t('table.addFormLabel3')"> </el-form-item>
          </div>
          <div class="form_container_right">
            <el-form-item :label="$t('table.addFormLabel4')"> </el-form-item>
          </div>
        </div>
      </el-form>
    </el-card>
    <countdown></countdown>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import moment from 'moment'
import { UserInfo } from '@/layout/components'
import countdown from '@/components/countdown/index.vue'
const nowTime = moment().format('DD/MM/YYYY')
const form = reactive({
  time: '',
  radio: '',
})
</script>

<style lang="scss" scoped>
.dashboard-editor-container {
  padding: 20px;
  background-color: rgb(240, 242, 245);
  position: relative;
  .form_container_header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .form_container_header_title {
      font-size: 24px;
      font-weight: 500;
      color: #222222;
      display: flex;
      .form_container_header_title_text {
        margin-right: 20px;
      }
    }
    .form_container_header_btn {
      display: flex;
      align-items: center;
      .el-button {
        margin-left: 10px;
      }
    }
  }
  .form_container {
    margin-top: 10px;
    display: flex;
    width: 100%;
    .form_container_left {
      flex: 1;
      padding: 10px;
      border-right: 1px solid #e6e6e6;
    }
    .form_container_right {
      flex: 1;
      padding: 10px;
    }
  }
}
</style>
