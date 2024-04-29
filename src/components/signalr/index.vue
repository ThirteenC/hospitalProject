<template>
  <div class="chat">
    <p class="chatInfo">
      通讯连接状态：
      <span :style="{ color: connectState == '已连接' ? 'green' : 'red' }">
        {{ connectState }}
      </span>
    </p>
  </div>
</template>
<script setup>
import Vue from 'vue'
import * as signalR from '@microsoft/signalr'
import { ref, onMounted, onUnmounted } from 'vue'

let signal = ref(null)
// computed: {
//     connectState() {
//       let state = ''
//       if (!this.signal) return '断开'
//       let connectionState = this.signal.connection._connectionState
//       state = connectionState === 'Connected' ? '已连接' : '断开'
//       return state
//     },
//   },

onMounted(() => {})

onUnmounted(() => {})

let initSignalR = () => {
  if (this.signal != null) return
  let url = '' //服务器地址
  const { NickName, AvatarUrl, DoctorCode } = this.imUserInfo
  let nickName = NickName
  let avatar = AvatarUrl
  let msgCode = DoctorCode
  let deviceType = '2' // pc端
  // 创建连接对象
  this.signal = new signalR.HubConnectionBuilder()
    .withUrl(`${url}/chat?nickName=${nickName}&Avatar=${avatar}&MsgSendCode=${msgCode}&deviceType=${deviceType}`, {
      skipNegotiations: true,
    })
    .withAutomaticReconnect()
    .configureLogging(signalR.LogLevel.Information)
    .build()
  if (this.signal) {
    // 定义后端调用的方法
    this.signal.on('receive', res => {
      this.receiveData(res)
    })
    // 开始连接
    this.signal
      .start()
      .then(() => {
        console.log('通讯连接成功')
      })
      .catch(() => {
        console.log('连接失败')
      })

    this.signal.onclose(() => {
      console.log('通讯连接断开')
      this.reconnect()
    })
  }
  console.log(this.signal, '通讯对象')
  Vue.prototype.$signal = this.signal
}

let reconnect = () => {
  const ms = 5000
  const start = timer => {
    setTimeout(() => {
      if (!this.signal) return
      let connectionState = this.signal.connection._connectionState
      if (connectionState === 'Connected') return
      try {
        this.signal
          .start()
          .then(() => {
            console.log('重新连接成功')
          })
          .catch(e => {
            console.log('重新连接成功', e)
            start(ms)
          })
      } catch (e) {
        //重试
        start(ms)
      }
    }, timer)
  }
}
// 接收数据

let receiveData = () => {
  let data = res
  // console.log("list收到消息", data);
  // 更新对应房间最新发送消息
  this.$refs.chatList && this.$refs.chatList.upDateMsg(data)
}
</script>
<style lang="scss" scoped>
</style>