<template>
  <div>
    <el-dialog
      :title="mode === 'add' ? '新增用户' : '编辑用户'"
      v-model="dialogVisible"
      width="600px"
      center
    >
      <!-- 默认插槽 -->
      <el-form
        :model="form"
        ref="formRef"
        :rules="rules"
        label-width="80px"
        :inline="false"
        size="normal"
      >
        <el-form-item label="用户名" prop="username">
          <el-input v-model="form.username"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="form.email"></el-input>
        </el-form-item>
        <el-form-item label="电话" prop="phone">
          <el-input v-model="form.phone"></el-input>
        </el-form-item>
        <el-form-item label="角色" prop="role_id">
          <el-select
            v-model="form.role_id"
            placeholder="请选择角色"
            size="medium"
          >
            <el-option
              v-for="item in roleOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-select
            v-model="form.status"
            placeholder="请选择状态"
            size="medium"
          >
            <el-option
              v-for="item in statusOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="用户备注" prop="remark">
          <el-input v-model="form.remark"></el-input>
        </el-form-item>
      </el-form>

      <!-- 具名插槽，名字叫footer -->
      <template #footer>
        <span>
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="submit">确定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { ref, reactive, watch, getCurrentInstance } from 'vue'
import { addUser, editUser } from '@/api/user'
export default {
  name: 'UserEdit',
  setup () {
    const instance: any = getCurrentInstance()

    const formRef = ref()

    const dialogVisible = ref(false) // 控制窗口显示与隐藏

    const mode = ref('') // mode是模型的意思，它的值有两个，一个是 add、一个是edit

    const roleOptions = reactive([
      {
        value: 1,
        label: '超级管理员'
      },
      {
        value: 2,
        label: '管理员'
      },
      {
        value: 3,
        label: '老师'
      },
      {
        value: 4,
        label: '学生'
      }
    ])

    const statusOptions = reactive([
      {
        value: 0,
        label: '禁用'
      },
      {
        value: 1,
        label: '启用'
      }
    ])

    const form = ref({
      username: '', // 用户名
      email: '', // 邮箱
      phone: '', // 电话
      // eslint-disable-next-line
      role_id: '', // 角色
      status: '', // 状态
      remark: '' // 备注
    })

    watch(dialogVisible, newValue => {
      if (!newValue) {
        formRef.value.resetFields()
      }
    })

    const rules = ref({
      username: [
        { required: true, message: '用户名不能为空', trigger: 'blur' }
      ],
      email: [
        {
          required: true,
          validator: (rule: any, value: any, callback: Function) => {
            // rule：规则，value:输入的值 callback回调函数
            if (!value) return callback(new Error('邮箱不能为空'))

            // 在下一行禁用eslint，类似上一种方法，只是写的位置不同罢了
            // eslint-disable-next-line
            const reg = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/
            if (!reg.test(value)) return callback(new Error('邮箱不合法'))

            // 不要忘了我，这是处理正确的情况
            callback()
          },
          trigger: 'blur'
        }
      ],
      phone: [
        {
          required: true,
          /**
           * rule：规则
           * value: 输入的值
           * callback：回调，决定是否校验通过
           */ validator: (rule: any, value: any, callback: Function) => {
            if (!value) return callback(new Error('手机号不能为空'))

            const reg = /^1[3456789][0-9]{9}$/
            if (!reg.test(value)) return callback(new Error('手机号不合法'))

            // 能来到这里肯定是成功了，callback也要执行
            callback()
          },
          trigger: 'blur'
        }
      ],
      // eslint-disable-next-line
      role_id: [{ required: true, message: '角色不能为空', trigger: 'change' }]
    })

    const submit = () => {
      formRef.value.validate(async (valid: any) => {
        if (!valid) return

        let res: any = null
        if (mode.value === 'add') {
          res = await addUser(form.value)
        } else {
          res = await editUser(form.value)
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
      roleOptions,
      statusOptions,
      form,
      rules,
      submit,
      formRef
    }
  }
}
</script>
