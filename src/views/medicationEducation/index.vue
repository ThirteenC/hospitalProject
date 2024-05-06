<template>
  <div class="dashboard-editor-container">
    <el-card>
      <p class="title">
        {{ $t('medicationEducation.title') }}
      </p>
      <ul class="medication-wall">
        <li v-for="item in list" :key="item" class="medication-card">
          <p class="name">xxxxx</p>
          <div class="info">
            <p class="desc">{{ $t('medicationEducation.instruction') }}</p>
            <p v-for="i in 3" :key="i">xxxx</p>
            <p class="desc">{{ $t('medicationEducation.medicationInformation') }}</p>
            <p>xxxxx</p>
          </div>
        </li>
      </ul>
    </el-card>

    <countdown></countdown>
  </div>
</template>

<script setup>
import { ref, onBeforeMount } from 'vue'
import countdown from '@/components/countdown/index.vue'

let list = ref([1, 2, 3, 4, 5, 6, 7, 8, 9, 0])
</script>

<style lang="scss" scoped>
.dashboard-editor-container {
  padding: 20px;
  background-color: rgb(240, 242, 245);
  position: relative;
  .title {
    font-weight: bold;
    font-size: 26px;
  }
  .medication-wall {
    margin-top: 5px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    .medication-card {
      border: 1px solid #ddd;
      border-radius: 5px;
      padding: 12px 18px;
      box-sizing: border-box;
      margin: 10px 0;
      width: 49%;
      min-width: 450px;
      .name {
        font-weight: bold;
        font-size: 18px;
      }
      .info {
        padding-left: 50px;

        .desc {
          color: #aaa;
          margin-top: 10px;
        }
      }
    }
  }
}
</style>
