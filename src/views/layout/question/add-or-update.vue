<template>
  <div class="question-container">
    <el-dialog v-model="dialogVisible" fullscreen>
      <template #title>
        <div class="title">
          {{ mode === 'add' ? '新增题目' : '修改试题' }}
        </div>
      </template>
      <el-form
        :model="form"
        ref="formRef"
        :rules="rules"
        label-width="120px"
        :inline="false"
        size="normal"
        class="form"
        label-position="left"
      >
        <el-form-item label="学科" prop="subject">
          <el-select
            v-model="form.subject"
            placeholder="请选择学科"
            style="width:300px;"
            size="medium"
          >
            <el-option
              v-for="item in subjectList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="阶段" prop="step">
          <el-select
            v-model="form.step"
            placeholder="请选择阶段"
            style="width:300px;"
            size="medium"
          >
            <el-option
              v-for="item in stepList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="企业" prop="enterprise">
          <el-select
            v-model="form.enterprise"
            placeholder="请选择企业"
            style="width:300px;"
            size="medium"
          >
            <el-option
              v-for="item in enterpriseList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="城市" prop="city">
          <el-cascader
            :props="{ value: 'label', children: 'children' }"
            size="large"
            :options="options"
            v-model="form.city"
          >
          </el-cascader>
        </el-form-item>
        <el-form-item label="题型" prop="type">
          <el-radio-group v-model="form.type">
            <el-radio
              v-for="item in typeList"
              :key="item.value"
              :label="item.value"
              >{{ item.label }}</el-radio
            >
          </el-radio-group>
        </el-form-item>
        <el-form-item label="难度" prop="difficulty">
          <el-radio-group v-model="form.difficulty">
            <el-radio
              v-for="item in difficultyList"
              :key="item.value"
              :label="item.value"
              >{{ item.label }}</el-radio
            >
          </el-radio-group>
        </el-form-item>
        <hr class="hrMargin" />
        <el-form-item class="setMargin" label="试题标题" prop="title">
          <!-- <quill-editor
            :options="{ placeholder: '请输入试题标题...' }"
            v-model="form.title"
            @blur="onEditorBlur('title')"
          ></quill-editor> -->
        </el-form-item>
        <el-form-item :label="typeObj[form.type]" :prop="propObj[form.type]">
          <question-type :form="form" />
        </el-form-item>
        <hr class="hrMargin" />
        <el-form-item label="解析视频">
          <upload-file type="video" :obj="form" />
        </el-form-item>
        <el-form-item class="setMargin" label="答案解析" prop="answer_analyze">
          <!-- <quill-editor
            :options="{ placeholder: '请输入答案解析...' }"
            v-model="form.answer_analyze"
            @blur="onEditorBlur('answer_analyze')"
          ></quill-editor> -->
        </el-form-item>
        <hr class="hrMargin" />
        <el-form-item label="答案备注" prop="remark">
          <el-input v-model="form.remark" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submit">立即创建</el-button>
          <el-button>取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { regionData } from 'element-china-area-data' // 这个只是数据
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
// import { quillEditor } from 'vue-quill-editor'
import UploadFile from './upload-file'
import QuestionType from './question-type.vue'
import { defineComponent, ref, getCurrentInstance } from 'vue'
export default defineComponent({
  name: 'QuestionEdit',
  components: {
    // quillEditor,
    UploadFile,
    QuestionType
  },
  props: {
    subjectList: {
      type: Array,
      default: () => {
        return []
      }
    },
    enterpriseList: {
      type: Array,
      default: () => {
        return []
      }
    },
    stepList: {
      type: Array,
      default: () => {
        return []
      }
    },
    typeList: {
      type: Array,
      default: () => {
        return []
      }
    },
    difficultyList: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  setup () {
    const formRef = ref()
    const instance = getCurrentInstance()

    const options = ref(regionData) // 城市选择所需的数据
    const dialogVisible = ref(false)
    const mode = ref('') // 模式 新增/修改
    const form = ref({
      subject: '', // 学科
      step: '', // 阶段
      enterprise: '', // 企业
      type: 1, // 题型
      difficulty: 1, // 难度
      city: [], // 城市
      title: '', // 试题标题
      // eslint-disable-next-line
      answer_analyze: '', // 答案解析
      remark: '', // 答案备注
      video: '', // 上传视频的地址
      // eslint-disable-next-line
      select_options: [
        // 单选或是多选的选项
        {
          label: 'A',
          text: '',
          image: ''
        },
        {
          label: 'B',
          text: '',
          image: ''
        },
        {
          label: 'C',
          text: '',
          image: ''
        },
        {
          label: 'D',
          text: '',
          image: ''
        }
      ],
      // eslint-disable-next-line
      single_select_answer: '', // 单选答案
      // eslint-disable-next-line
      multiple_select_answer: [], // 多选答案
      // eslint-disable-next-line
      short_answer: '' // 简答答案
    })
    const typeObj = ref({
      1: '单选',
      2: '多选',
      3: '简答'
    })
    const propObj = ref({
      1: 'single_select_answer',
      2: 'multiple_select_answer',
      3: 'short_answer'
    })

    const rules = ref({
      subject: [{ required: true, message: '学科不能为空', trigger: 'change' }],
      step: [{ required: true, message: '阶段不能为空', trigger: 'change' }],
      enterprise: [
        { required: true, message: '企业不能为空', trigger: 'change' }
      ],
      type: [{ required: true, message: '题型不能为空', trigger: 'change' }],
      difficulty: [
        { required: true, message: '难度不能为空', trigger: 'change' }
      ],
      city: [{ required: true, message: '城市不能为空', trigger: 'change' }],
      title: [{ required: true, message: '试题标题不能为空' }],
      // eslint-disable-next-line
      answer_analyze: [{ required: true, message: '答案解析不能为空' }],
      remark: [
        { required: true, message: '试题备注不能为空', trigger: 'blur' }
      ],
      // eslint-disable-next-line
      single_select_answer: [
        { required: true, message: '单选答案不能为空', trigger: 'change' }
      ],
      // eslint-disable-next-line
      multiple_select_answer: [
        { required: true, message: '多选答案不能为空', trigger: 'change' }
      ],
      // eslint-disable-next-line
      short_answer: [
        { required: true, message: '简答答案不能为空', trigger: 'blur' }
      ]
    })

    const onEditorBlur = field => {
      formRef.value.validateField(field)
    }

    const submit = () => {
      formRef.value.validate(async valid => {
        if (!valid) return

        let url = ''
        if (this.mode === 'add') {
          url = '/question/add'
        } else {
          url = '/question/edit'
        }

        const res = await this.$axios.post(url, this.form)
        if (res.code === 200) {
          // 提示
          instance.ctx.$message({
            type: 'success',
            message: this.mode === 'add' ? '新增成功~' : '编辑成功~',
            duration: 1000
          })

          // 关闭页面
          dialogVisible.value = false

          // 刷新父页面
          instance.ctx.$parent.search()
        } else {
          // 提示
          instance.ctx.$message({
            type: 'error',
            message: res.message,
            duration: 1000
          })
        }
      })
    }

    // watch('form.type', () => {
    //   formRef.value.clearValidate([
    //     'single_select_answer',
    //     'multiple_select_answer',
    //     'short_answer'
    //   ])
    // })

    return {
      formRef,
      options,
      dialogVisible,
      mode,
      form,
      typeObj,
      propObj,
      rules,
      onEditorBlur,
      submit
    }
  }
})
</script>

<style lang="less" scoped>
.question-container {
  ::v-deep .el-dialog__header {
    padding: 0px;
    background: transparent;
    text-align: left;
  }
  .title {
    color: rgb(255, 255, 255);
    padding-left: 15px;
    height: 54px;
    line-height: 54px;
    background-color: rgb(4, 188, 250);
  }
  .form {
    width: 832px;
    margin: 0px auto;
  }
  .hrMargin {
    margin-bottom: 20px;
  }
  ::v-deep .ql-editor {
    height: 200px;
  }
  .setMargin {
    ::v-deep .el-form-item__content {
      margin-left: 0 !important;
      margin-top: 40px;
    }
  }
}
</style>
