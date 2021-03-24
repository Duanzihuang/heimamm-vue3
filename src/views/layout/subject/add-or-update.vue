<template>
  <div>
    <el-dialog
      :title="mode === 'add' ? '新增学科' : '编辑学科'"
      v-model="dialogVisible"
      width="600px"
      center
    >
      <el-form
        :model="form"
        ref="formRef"
        :rules="rules"
        label-width="80px"
        :inline="false"
        size="normal"
      >
        <el-form-item label="学科编号" prop="rid">
          <el-input v-model="form.rid"></el-input>
        </el-form-item>
        <el-form-item label="学科名称" prop="name">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="学科简称" prop="short_name">
          <el-input v-model="form.short_name"></el-input>
        </el-form-item>
        <el-form-item label="学科简介" prop="intro">
          <el-input v-model="form.intro"></el-input>
        </el-form-item>
        <el-form-item label="学科备注" prop="remark">
          <el-input v-model="form.remark"></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="submit">确定</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { ref, watch, getCurrentInstance } from 'vue'
import { addSubject, editSubject } from '@/api/subject'
export default {
  name: 'SubjectEdit',
  setup () {
    const instance: any = getCurrentInstance()

    const formRef = ref()

    const dialogVisible = ref(false) // 控制窗口显示与隐藏

    const mode = ref('') // mode是模型的意思，它的值有两个，一个是 add、一个是edit

    const form = ref({
      rid: '',
      name: '',
      // eslint-disable-next-line
      short_name: '',
      intro: '',
      remark: ''
    })

    watch(dialogVisible, newValue => {
      if (!newValue) {
        formRef.value.resetFields()
      }
    })

    const rules = ref({
      rid: [{ required: true, message: '学科编号不能为空', trigger: 'blur' }],
      name: [{ required: true, message: '学科名称不能为空', trigger: 'blur' }],
      // eslint-disable-next-line
      short_name: [
        { required: true, message: '学科简称不能为空', trigger: 'blur' }
      ],
      intro: [{ required: true, message: '学科简介不能为空', trigger: 'blur' }]
    })

    const submit = () => {
      formRef.value.validate(async (valid: any) => {
        if (!valid) return

        let res: any = null
        if (mode.value === 'add') {
          res = await addSubject(form.value)
        } else {
          res = await editSubject(form.value)
        }

        if (res.code === 200) {
          // 提示
          instance.ctx.$message.success(
            mode.value === 'add' ? '新增成功~' : '编辑成功~'
          )
          // 关闭
          dialogVisible.value = false
          // 调用父组件的search方法，展示出刚刚新增的用户
          instance.ctx.$parent.search()
        } else {
          instance.ctx.$message.error(res.message)
        }
      })
    }

    return {
      dialogVisible,
      mode,
      form,
      rules,
      submit,
      formRef
    }
  }
}
</script>
