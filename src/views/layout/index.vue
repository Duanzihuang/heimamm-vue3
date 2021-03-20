<template>
  <el-container class="layout-container">
    <el-header class="header">
      <div class="left">
        <i
          @click="isCollapse = !isCollapse"
          class="el-icon-s-fold setheight"
        ></i>
        <img src="@/assets/img/layout_icon.png" class="marginlr" alt="" />
        <span class="title">黑马面面</span>
      </div>
      <div class="right">
        <img :src="avatar" alt="" />
        <span class="name">{{ userInfo.username }} 欢迎您</span>
        <el-button type="primary" @click="onLogout">退出</el-button>
      </div>
    </el-header>
    <el-container>
      <el-aside width="auto">
        <el-menu
          :default-active="$route.path"
          class="el-menu-vertical-demo"
          :collapse="isCollapse"
          router
        >
          <el-menu-item index="/layout/chart">
            <i class="el-icon-pie-chart"></i>
            <template v-slot:title>
              <span>数据预览</span>
            </template>
          </el-menu-item>
          <el-menu-item index="/layout/user">
            <i class="el-icon-user"></i>
            <template v-slot:title>
              <span>用户列表</span>
            </template>
          </el-menu-item>
          <el-menu-item index="/layout/enterprise">
            <i class="el-icon-office-building"></i>
            <template v-slot:title>
              <span>企业列表</span>
            </template>
          </el-menu-item>
          <el-menu-item index="/layout/question">
            <i class="el-icon-edit-outline"></i>
            <template v-slot:title>
              <span>题库列表</span>
            </template>
          </el-menu-item>
          <el-menu-item index="/layout/subject">
            <i class="el-icon-notebook-2"></i>
            <template v-slot:title>
              <span>学科列表</span>
            </template>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-main class="main">
        <!-- 嵌套的路由出口 -->
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import { removeToken } from '@/utils/token'
import { getUseInfo, logout } from '@/api/user'
import { onMounted, ref, getCurrentInstance } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
export default {
  setup () {
    const isCollapse = ref(false) // 是否收起
    const avatar = ref('') // 头像
    const userInfo = ref({}) // 用户信息
    const router = useRouter()
    const store = useStore()
    const instance = getCurrentInstance()

    // 获取用户信息
    const getUseInfoData = async () => {
      const res = await getUseInfo()

      if (res.code === 200) {
        userInfo.value = res.data
        avatar.value = process.env.VUE_APP_BASEURL + '/' + res.data.avatar

        // 调用仓库中的mutations的setUserInfo方法
        store.commit('setUserInfo', res.data)
      }
    }

    // 退出
    const onLogout = () => {
      instance.ctx
        .$confirm('确定退出吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
        .then(async () => {
          const res = await logout()
          if (res.code === 200) {
            // 删除token
            removeToken()
            // 跳转到登录页面
            router.push('/login')
          }
        })
        .catch(() => {
          console.log('------取消--------')
        })
    }

    onMounted(() => {
      getUseInfoData()
    })

    return {
      isCollapse,
      avatar,
      userInfo,
      getUseInfoData,
      logout,
      onLogout
    }
  }
}
</script>

<style lang="less">
.layout-container {
  height: 100%;
  .header {
    height: 60px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid rgb(249, 249, 249);
    .left {
      display: flex;
      align-items: center;
      .setheight {
        font-size: 20px;
      }
      .marginlr {
        margin-left: 10px;
        margin-right: 10px;
      }
      .title {
        font-size: 22px;
        color: rgb(73, 161, 255);
      }
    }
    .right {
      display: flex;
      align-items: center;
      img {
        width: 43px;
        height: 43px;
        margin-right: 9px;
        border-radius: 50%;
      }
      .name {
        margin-right: 38px;
      }
    }
  }
  .el-menu {
    border-right: none;
  }
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }
  .main {
    background-color: #e8e9ec;
  }
}
</style>
