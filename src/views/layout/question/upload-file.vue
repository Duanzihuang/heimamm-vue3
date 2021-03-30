<template>
  <div>
    <!--
          action：上传的地址
          data：额外的参数
          before-upload：上传前（携带额外参数，根据类型来判断上传的图片类型和大小）
          on-success: 预览（分情况去处理视频或是图片预览）、给父组件相关的属性赋值
      -->
    <el-upload
      class="avatar-uploader"
      :action="uploadUrl"
      :data="uploadObj"
      :show-file-list="false"
      :on-success="handleAvatarSuccess"
      :before-upload="beforeAvatarUpload"
    >
      <img v-if="imageUrl" :src="imageUrl" class="avatar" />
      <video
        v-else-if="videoUrl"
        :src="videoUrl"
        controls
        class="avatar"
      ></video>
      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
    </el-upload>
  </div>
</template>

<script>
import { defineComponent, ref, getCurrentInstance } from 'vue'
export default defineComponent({
  name: 'UploadFile',
  props: {
    type: {
      type: String,
      default: 'image'
    },
    obj: {
      type: Object
    }
  },
  setup (props) {
    const instance = getCurrentInstance()

    const uploadUrl = ref(process.env.VUE_APP_BASEURL + '/question/upload')
    const uploadObj = ref({}) // 上传需要的额外参数
    const imageUrl = ref('') // 图片预览的地址
    const videoUrl = ref('') // 视频预览地址

    const handleAvatarSuccess = (res, file) => {
      // 成功
      if (res.code === 200) {
        if (props.type === 'image') {
          // 图片预览
          imageUrl.value = URL.createObjectURL(file.raw)

          // todo 给父组件的图片属性赋值
          // eslint-disable-next-line
          props.obj.image = res.data.url
        } else {
          // 视频预览
          videoUrl.value = URL.createObjectURL(file.raw)

          // 给父组件的video属性赋值
          // eslint-disable-next-line
          props.obj.video = res.data.url
        }
      } else {
        instance.ctx.$message({
          type: 'error',
          message: res.message,
          duration: 1000
        })
      }
    }

    const beforeAvatarUpload = file => {
      // 携带额外参数
      uploadObj.value.file = file

      if (props.type === 'image') {
        const isImage =
          file.type === 'image/jpeg' ||
          file.type === 'image/png' ||
          file.type === 'image/gif'
        const isLt2M = file.size / 1024 / 1024 < 2

        if (!isImage) {
          instance.ctx.$message.error('上传图片只能是 JPG|PNG|GIF 格式!')
        }
        if (!isLt2M) {
          instance.ctx.$message.error('上传图片大小不能超过 2MB!')
        }
        return isImage && isLt2M
      } else {
        const isVideo = file.type === 'video/mp4' || file.type === 'video/avi'
        const isLt2M = file.size / 1024 / 1024 < 2

        if (!isVideo) {
          instance.ctx.$message.error('上传的解析视频只能是 MP4|AVI 格式!')
        }
        if (!isLt2M) {
          instance.ctx.$message.error('上传的解析视频大小不能超过 2MB!')
        }
        return isVideo && isLt2M
      }
    }

    return {
      uploadUrl,
      uploadObj,
      imageUrl,
      videoUrl,
      beforeAvatarUpload,
      handleAvatarSuccess
    }
  }
})
</script>

<style scoped>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
