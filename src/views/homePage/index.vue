<template>
  <div class="dashboard-editor-container">
    <div>
      <el-card> </el-card>
    </div>

    {{ $t('header.home') }}
    <countdown></countdown>
  </div>
</template>

<script setup>
import countdown from '@/components/countdown/index.vue'
</script>

<style lang="scss" scoped>
.dashboard-editor-container {
  padding: 32px;
  background-color: rgb(240, 242, 245);
  position: relative;
}
</style>
