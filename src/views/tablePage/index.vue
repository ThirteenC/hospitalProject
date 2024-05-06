<template>
  <div class="dashboard-editor-container">
    <el-card>
      <div class="table_Title">
        <div class="unit_container">
          <div class="title">{{ $t('table.tableUnitTile') }}</div>
          <div class="unit">{{ $t('table.tableUnit') }}</div>
        </div>
        <el-button type="primary" @click="handleAdd">{{ $t('table.add') }}</el-button>
      </div>
      <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
        <el-tab-pane :label="$t('table.tabTitle1')" name="first">
          <!-- name 请根据具体的情况修复对应的名称，这里只是一个例子 -->
          <tablePage v-if="activeName == 'first'"></tablePage>
        </el-tab-pane>
        <el-tab-pane :label="$t('table.tabTitle2')" name="second">
          <tablePage v-if="activeName == 'second'"></tablePage>
        </el-tab-pane>
        <el-tab-pane :label="$t('table.tabTitle3')" name="third">
          <tablePage v-if="activeName == 'third'"></tablePage>
        </el-tab-pane>
      </el-tabs>
    </el-card>
    <countdown></countdown>
  </div>
</template>

<script setup>
import { ref, } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import countdown from '@/components/countdown/index.vue'
import tablePage from './components/tablePage.vue'
const router = useRouter()
function handleClick(tab, event) {
  // console.log(tab, event)
}
const activeName = ref('first')
function handleAdd() {
  router.push({
    path: 'addForm',
    query: {}
  })
}
</script>

<style lang="scss" scoped>
.dashboard-editor-container {
  padding: 20px;
  background-color: rgb(240, 242, 245);
  position: relative;
  .table_Title {
    display: flex;
    align-items: center;
    justify-content: space-between;
    .unit_container {
      display: flex;
      align-items: center;
      .title {
        color: #222222;
        font-size: 24px;
        font-weight: 500;
      }
      .unit {
        color: #909090;
        margin-left: 6px;
        font-size: 15px;
      }
    }
  }
}
</style>
