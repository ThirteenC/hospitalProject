<template>
  <div class="dashboard-editor-container">
    <el-card v-loading="loading">
      <p class="title">
        {{ $t('medicationEducation.title') }}
      </p>
      <ul class="medication-wall" v-if="list.length > 0">
        <li v-for="(item, index) in list" :key="index" class="medication-card">
          <p class="name">{{ item.Name }}</p>
          <div class="info">
            <p class="desc">{{ $t('medicationEducation.instruction') }}</p>
            <p v-html="item.Instruction"></p>
            <p class="desc">{{ $t('medicationEducation.medicationInformation') }}</p>
            <p v-html="item.Information"></p>
          </div>
        </li>
      </ul>
      <el-empty v-else :description="$t('system.empty')" />
    </el-card>

    <countdown></countdown>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import { medicationEducationList } from '@/api/medication'
import countdown from '@/components/countdown/index.vue'

let list = ref([])
let loading = ref(false)
const route = useRoute()
const { BedCode, PatientRecoreRowId } = route.query

let params = {
  BedCode,
  PatientRecoreRowId,
}

let getList = params => {
  loading.value = true
  medicationEducationList(params)
    .then(res => {
      list.value = res.MedicationList
    })
    .finally(err => {
      loading.value = false
    })
}

getList(params)
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
