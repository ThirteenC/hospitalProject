import { defineStore } from 'pinia'
import cookies from '@/utils/cookies'
import { TOKEN, AVATAR } from '@/config/constant'
import { logout, getInfo } from '@/api/user'
import { resetRouter } from '@/router'
import useTagsViewStore from './tagsView'

const useUserStore = defineStore({
  id: 'users',
  state: () => {
    return {
      token: cookies.get(TOKEN),
      uid: '9527',
      avatar: AVATAR,
      name: '',
      phone: '',
      email: '',
      identity: '',
      roles: []
    }
  },
  actions: {
    SET_TOKEN(token = '') {
      token ? cookies.set(TOKEN, token) : cookies.remove(TOKEN)
      this.token = token
    },
    async LOGIN_OUT() {
      try {
        const { code } = await logout(this.token)
        if (code == 200) {
          this.token = ''
          this.name = ''
          this.avatar = ''
          this.phone = ''
          this.email = ''
          this.identity = ''
          this.roles = []
          this.RESET_INFO()
        }
      } catch (error) {
        return error
      }
    },
    // 清空所有登录信息
    RESET_INFO() {
      return new Promise(resolve => {
        const tagsViewStore = useTagsViewStore()
        cookies.clearAll()
        resetRouter()
        tagsViewStore.DEL_ALL_VIEWS(null)
        resolve()
      })
    }
  }
})
export default useUserStore
