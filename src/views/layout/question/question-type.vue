<template>
  <div class="question-type">
    <!-- 单选渲染 -->
    <div v-if="form.type === 1">
      <div v-for="item in form.select_options" :key="item.label" class="item">
        <!-- radio，绑定的值要是单选答案 -->
        <el-radio v-model="form.single_select_answer" :label="item.label">{{
          item.label
        }}</el-radio>
        <!-- text -->
        <el-input v-model="item.text" style="margin-right:15px;" />
        <!-- upload-file -->
        <upload-file :obj="item" />
      </div>
    </div>
    <!-- 多选渲染 -->
    <div v-if="form.type === 2">
      <div v-for="item in form.select_options" :key="item.label" class="item">
        <!-- checkbox，绑定的值要是多选答案 -->
        <el-checkbox
          v-model="form.multiple_select_answer"
          :label="item.label"
          >{{ item.label }}</el-checkbox
        >
        <!-- text -->
        <el-input
          v-model="item.text"
          style="margin-left:15px;margin-right:15px;"
        />
        <!-- upload-file -->
        <upload-file :obj="item" />
      </div>
    </div>
    <!-- 渲染简答 -->
    <div v-if="form.type === 3">
      <el-input
        type="textarea"
        :rows="10"
        placeholder="请输入简答答案..."
        v-model="form.short_answer"
      />
    </div>
  </div>
</template>

<script>
import UploadFile from './upload-file'
export default {
  name: 'QuestionType',
  components: {
    UploadFile
  },
  props: {
    form: Object
  }
}
</script>

<style lang="less" scoped>
.question-type {
  .item {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}
</style>
