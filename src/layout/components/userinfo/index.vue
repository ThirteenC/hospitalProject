<template>
  <div class="info_content">
    <img class="return_icon" :src="returnBack" />
    <div class="room_code">701A</div>
    <div class="user_info_content">
      <div class="user_info">
        <div class="user_sex"><img :src="sex"></div>
        <div class="user_name">DHIRUGNANA KAMBANTHAN A/P S. SUMRA</div>
      </div>
      <div class="user_age">
        <div class="user_age_title">{{ $t('system.Birthday')}}</div>
        <div class="user_age_number">29/10/1988</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import returnBack from '@/assets/imgs/return_back.png'
import sex from '@/assets/imgs/man.png'
defineOptions({
  name: 'UserInfo',
})
</script>

<style lang="scss" scoped>
.info_content {
  display: flex;
  align-items: center;
  width: calc(100% - 20px);
  margin: auto;
  .return_icon {
    width: 40px;
    height: 40px;
  }
  .room_code {
    color: #16a342;
    font-size: 44px;
  }
  .user_info_content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-left: 20px;
    width: 100%;
    background: #f9fafb;
    height: 48px;
    border-radius: 2px;
    .user_info{
      display: flex;
      align-items: center;
    }
  }
  .user_age{
    color: #222222;
    .user_age_title{
      font-size: 14px;
    }
    .user_age_number{
      font-size: 24px;

    }
  }
}
</style>
