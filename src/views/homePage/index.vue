<template>
  <div class="dashboard-editor-container">
    <div class="basic_information">
      <div class="basic_information_left">
        <el-card class="information_preview custom-card" :body-style="{ padding: '0px' }">
          <div class="information_preview_content">
            <div class="bed_number">657B</div>
            <div class="date_of_birth">
              <div class="data_of_birth_title">{{ $t('homePage.Birthday') }}</div>
              <div class="data_of_birth_content">29/10/1998</div>
            </div>
            <div class="medical_record_number">
              <div class="medical_record_number_title">{{ $t('homePage.MedicalRecordNumber') }}</div>
              <div class="medical_record_number_content">123456789</div>
            </div>
            <div class="admission_date">
              <div class="admission_date_title">{{ $t('homePage.AdmissionDate') }}</div>
              <div class="admission_date_content">29/10/1998</div>
            </div>
          </div>
          <div class="user_information">
            <img src="../../assets/imgs/man.png" alt="" style="width: 48px; height: 48px" />
            <div class="user_information_name">THIRUGNANA SAMBANTHAN A/L A. <br />SUBRAMANIAM.</div>
          </div>
          <div class="visit_information">
            <div class="attending_doctor">
              <div class="attending_doctor_title">{{ $t('homePage.AttendingDoctor') }}</div>
              <div class="attending_doctor_content">DR AMARANATHAN</div>
            </div>
            <div class="visiting_nurse" style="margin-left: 20px">
              <div class="visiting_nurse_title">{{ $t('homePage.VisitingNurse') }}</div>
              <div class="visiting_nurse_content">Rashidah Abdul Rahman</div>
            </div>
          </div>
          <Notice v-bind:content="content" v-bind:speed="speed"></Notice>
          <div class="alarm_information">
            <!-- 根据具体的字段（alerm）和值调整 -->
            <div class="alarm_information_content" v-if="alerm == 1">
              <img src="../../assets/imgs/warn_info.png" alt="" style="width: 48px; height: 48px" />
              <div class="alarm_information_content_title">{{ $t('homePage.Alarm') }}</div>
            </div>
            <div class="alarm_information_content" v-if="alerm1 == 1" style="margin-left: 60px">
              <img src="../../assets/imgs/fallcaution.png" alt="" style="width: 48px; height: 48px" />
              <div class="alarm_information_content_title">{{ $t('homePage.Alarm1') }}</div>
            </div>
          </div>
        </el-card>
        <el-card
          class="custom-card"
          :body-style="{ padding: '0px' }"
          style="margin-top: 10px; border-radius: 10px; padding: 0px"
        >
          <div class="functional_operation">
            <div v-for="(item, index) in operationList" :key="index" class="functional_operation_content">
              <el-badge
                v-if="item.notice_number > 1"
                :show-zero="false"
                :value="item.notice_number"
                :offset="[-6, 14]"
                :max="99"
              >
                <img :src="item.img" alt="" class="functional_operation_content_img" />
              </el-badge>
              <el-badge v-else-if="item.notice_number == 1" is-dot :offset="[0, 10]">
                <img :src="item.img" alt="" class="functional_operation_content_img" />
              </el-badge>
              <el-badge v-else-if="item.notice_number == 0" :hidden="true">
                <img :src="item.img" alt="" class="functional_operation_content_img" />
              </el-badge>
              <div class="functional_operation_content_title">{{ getCurrentLanguageName(item) }}</div>
            </div>
          </div>
        </el-card>
      </div>
      <div class="basic_information_right">
        <div class="patients_seeking_help">
          <div
            v-for="(item, index) in patientsHelpList"
            :key="index"
            :class="item.status == 1 ? 'patients_seeking_help_content' : 'patients_seeking_help_content_notice'"
          >
            <img
              src="../../assets/imgs/patients_help.png"
              v-if="item.status == 0"
              alt=""
              class="patients_seeking_help_content_notice_icon"
            />
            <img :src="item.img" alt="" class="patients_seeking_help_content_img" />
            <div class="patients_seeking_help_content_title">{{ getCurrentLanguageName(item) }}</div>
          </div>
        </div>
        <div>
          <el-card style="border-radius: 10px; margin-left: 10px">
            <div v-for="(item, index) in to_do_items" :key="index" class="">
              <div class="to_do_items_title">
                <span>{{ item.title }}</span>
              </div>
              <div class="to_do_items_content">
                <p v-for="(item1, index1) in item.List" :key="index1" class="text item">{{ item1.title }}</p>
              </div>
            </div>
          </el-card>
        </div>
      </div>
    </div>
  </div>
  <countdown></countdown>
</template>

<script setup>
import countdown from '@/components/countdown/index.vue'
import Notice from '@/components/notice/index.vue'
import { useAppStore } from '@/store'
import { ref, reactive } from 'vue'
const content = ref('跑马灯效果,跑马灯效果,跑马灯效果')
const operationList = ref([
  {
    zh_name: '饮食订购',
    us_name: 'Diet Ordering',
    img: '../../src/assets/imgs/operation.png',
    notice_number: '1',
  },
  {
    zh_name: '进气输出记录',

    us_name: 'Intake Output Recording',
    img: '../../src/assets/imgs/operation1.png',
    notice_number: '1',
  },
  {
    zh_name: '治疗计划',
    us_name: 'Treatment Plan',
    img: '../../src/assets/imgs/operation2.png',

    notice_number: '10',
  },
  {
    zh_name: '药物教育',
    us_name: 'Medication Education',
    img: '../../src/assets/imgs/operation3.png',
    notice_number: '10',
  },
  {
    zh_name: '健康教育',
    us_name: 'Health Education',
    img: '../../src/assets/imgs/operation4.png',
    notice_number: '10',
  },
  {
    zh_name: '出院状况',
    us_name: 'Discharge Status',
    img: '../../src/assets/imgs/operation5.png',
    notice_number: '10',
  },
  {
    zh_name: '付款人信息',
    us_name: 'Payor Information',
    img: '../../src/assets/imgs/operation6.png',
    notice_number: '10',
  },
  {
    zh_name: '通知',
    us_name: 'Notification',
    img: '../../src/assets/imgs/operation7.png',
    notice_number: '10',
  },
  {
    zh_name: '满意度调查',
    us_name: 'Satisfaction Survey',
    img: '../../src/assets/imgs/operation8.png',
    notice_number: '10',
  },
  {
    zh_name: '医院信息',
    us_name: 'Hospital Information',
    img: '../../src/assets/imgs/operation9.png',
    notice_number: '10',
  },
  {
    zh_name: '消防计划',
    us_name: 'Fire Plan',
    img: '../../src/assets/imgs/operation10.png',
    notice_number: '1',
  },
  {
    zh_name: '用户菜单',
    us_name: 'User Menu',
    img: '../../src/assets/imgs/operation11.png',
    is_dot: true,
    notice_number: '0',
  },
])
const patientsHelpList = ref([
  {
    img: '../../src/assets/imgs/patients_help.png',
    zh_name: '疼痛辅助',
    us_name: 'Pain Assist',
    status: '1',
  },
  {
    img: '../../src/assets/imgs/patients_help1.png',
    zh_name: '滴水岛',
    us_name: 'Drip lssue',
    status: '0',
  },
  {
    img: '../../src/assets/imgs/patients_help2.png',
    zh_name: '请求水',
    us_name: 'Request Water',
    status: '1',
  },
  {
    img: '../../src/assets/imgs/patients_help3.png',
    zh_name: '如厕',
    us_name: 'Toileting',
    status: '1',
  },
  {
    img: '../../src/assets/imgs/patients_help4.png',
    zh_name: '铺床',
    us_name: 'Bed Making',
    status: '1',
  },
  {
    img: '../../src/assets/imgs/patients_help5.png',
    zh_name: '家政',
    us_name: 'Housekeeping',
    status: '1',
  },
  {
    img: '../../src/assets/imgs/patients_help6.png',
    zh_name: '客服服务',
    us_name: 'Customer Service',
    status: '1',
  },
])
const to_do_items = ref([
  {
    title: 'Special Precaution',
    List: [
      {
        title: 'Complete rest in bed',
      },
      {
        title: 'Fluid restriction',
      },
      {
        title: 'Preserve hand',
      },
      {
        title: 'Restrict visitors',
      },
    ],
  },
  {
    title: 'Allergy',
    List: [
      {
        title: 'Complete rest in bed',
      },
      {
        title: 'Fluid restriction',
      },
      {
        title: 'Preserve hand',
      },
      {
        title: 'Restrict visitors',
      },
    ],
  },
])
const speed = ref(500)
const alerm = ref(1)
const alerm1 = ref(1)
//写一个方法，根据当前语言环境取operationList中不同的name
function getCurrentLanguageName(item) {
  const currentLanguage = useAppStore().lang
  if (currentLanguage === 'zh') {
    return item.zh_name
  } else if (currentLanguage === 'en') {
    return item.us_name
  }
}
</script>

<style lang="scss" scoped>
.dashboard-editor-container {
  padding: 16px;
  background-color: rgb(240, 242, 245);
  position: relative;
  .el-card ::deep .el-card__body {
    padding: 0px;
  }
  .basic_information {
    display: flex;

    .basic_information_left {
      flex: 4;

      .information_preview {
        padding: 0px;
        border-radius: 10px;
      }
      .information_preview_content {
        display: flex;
        align-items: center;
        .bed_number {
          height: 87px;
          line-height: 87px;
          background: #25c168;
          font-size: 72px;
          text-align: center;
          color: #fff;
          padding: 0px 40px;
          border-radius: 4px 0px 60px 0px;
        }
        .date_of_birth,
        .medical_record_number {
          margin-left: 20px;
          .data_of_birth_title,
          .medical_record_number_title {
            color: #909090;
            font-size: 16px;
          }
          .data_of_birth_content,
          .medical_record_number_content {
            font-size: 24px;
            margin-top: 6px;
          }
        }
        .admission_date {
          margin-left: auto;
          margin-right: 20px;
          .admission_date_title {
            color: #909090;
            font-size: 16px;
          }
          .admission_date_content {
            font-size: 24px;
            margin-top: 6px;
          }
        }
      }
      .user_information {
        display: flex;
        align-items: center;
        padding: 10px;
        .user_information_name {
          color: #222222;
          font-size: 40px;
          white-space: break-spaces;
        }
      }
      .visit_information {
        display: flex;
        margin-left: 20px;
        margin-top: 10px;
        .attending_doctor_title,
        .visiting_nurse_title {
          color: #909090;
          font-size: 16px;
        }
        .attending_doctor_content,
        .visiting_nurse_content {
          color: #222222;
          font-size: 24px;
          margin-top: 6px;
        }
      }
      .alarm_information {
        display: flex;
        align-items: center;
        margin-left: 20px;
        margin-bottom: 10px;
        .alarm_information_content {
          display: flex;
          align-content: center;
          .alarm_information_content_title {
            margin-left: 10px;
            color: #dc2626;
            line-height: 48px;
            font-size: 24px;
            font-weight: 600;
          }
        }
      }
      .functional_operation {
        display: flex;
        flex-wrap: wrap;
        margin: 20px;
        margin-bottom: 0px;
        .functional_operation_content {
          width: 117px;
          height: 116px;
          text-align: center;
          background-color: #f9fafb;
          border: 1px solid #dedede;
          border-radius: 4px;
          margin-right: 20px;
          margin-bottom: 20px;
          .functional_operation_content_img {
            width: 85px;
            height: 61px;
            padding-top: 10px;
          }
          .functional_operation_content_title {
            color: #222222;
            font-size: 14px;
            margin-top: 10px;
            font-weight: 600;
          }
        }
      }
    }
    .basic_information_right {
      flex: 1;
      .patients_seeking_help {
        display: flex;
        flex-wrap: wrap;

        .patients_seeking_help_content_notice {
          background-color: #dedede;
          width: 154px;
          height: 96px;
          background: #dedede;
          border: 1px solid #dedede;
          border-radius: 10px;
          margin-left: 10px;
          text-align: center;
          margin-bottom: 10px;
          position: relative;
          .patients_seeking_help_content_notice_icon {
            position: absolute;
            right: 0px;
            top: -10px;
            width: 32px;
            height: 32px;
            opacity: 1;
          }
          .patients_seeking_help_content_img {
            width: 52px;
            height: 52px;
            margin-top: 10px;
            opacity: 0.4;
          }
          .patients_seeking_help_content_title {
            color: #222222;
            font-size: 14px;
            margin-top: 10px;
            font-weight: 600;
            opacity: 0.4;
          }
        }
        .patients_seeking_help_content_notice::before {
          content: '';
          position: absolute;
          left: 0;
          top: 0;
          background-color: #fff;
          z-index: -1;
        }
        .patients_seeking_help_content {
          width: 154px;
          height: 96px;
          background: #fff;
          border: 1px solid #dedede;
          border-radius: 10px;
          margin-left: 10px;
          text-align: center;
          margin-bottom: 10px;

          .patients_seeking_help_content_img {
            width: 52px;
            height: 52px;
            margin-top: 10px;
          }
          .patients_seeking_help_content_title {
            color: #222222;
            font-size: 14px;
            margin-top: 10px;
            font-weight: 600;
          }
        }
      }

      .to_do_items_title {
        font-size: 18px;
        color: #222222;
        font-weight: 600;
        margin-bottom: 10px;
        border-bottom: 1px solid #dedede;
        padding-bottom: 10px;
      }
      .to_do_items_content p {
        font-size: 15px;
        color: #222222;
        font-weight: 4600;
        margin-bottom: 10px;
      }
    }
  }
}
</style>
