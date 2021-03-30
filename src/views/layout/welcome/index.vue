<template>
  <div>
    <el-card>
      <!-- 推荐这种写法，因为getters有缓存 -->
      欢迎 {{ $store.getters.getUserInfo.username }} 登录，您的角色是
      {{ $store.getters.getUserInfo.role }}
    </el-card>
    <!-- 这种写法不推荐 -->
    <!-- <el-card style="margin-top:20px;">
      欢迎 {{ $store.state.userInfo.username }} 登录，您的角色是
      {{ $store.state.userInfo.role }}
    </el-card> -->
  </div>
</template>
