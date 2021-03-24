<template>
  <div>
    <el-card>
      <!-- inline form表单横线排列 -->
      <el-form :model="form" ref="formRef" label-width="70px" inline>
        <!-- prop要设置，在这里是清除搜索的内容 -->
        <el-form-item label="用户名称" prop="username">
          <el-input v-model="form.username"></el-input>
        </el-form-item>
        <el-form-item label="用户邮箱" prop="email">
          <el-input v-model="form.email"></el-input>
        </el-form-item>
        <el-form-item label-width="50px" label="角色" prop="role_id">
          <el-select v-model="form.role_id" placeholder="请选择角色">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="search">搜索</el-button>
          <el-button @click="clear">清除</el-button>
          <el-button type="primary" @click="add">+新增用户</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card style="margin-top:20px;">
      <el-table :data="list" border stripe>
        <el-table-column label="序号" type="index" width="50">
        </el-table-column>
        <!-- prop代表的是取哪个属性的值 -->
        <el-table-column label="用户名" prop="username" />
        <el-table-column label="电话" prop="phone" />
        <el-table-column label="邮箱" prop="email" />
        <el-table-column label="角色" prop="role" />
        <el-table-column label="备注" prop="remark" />
        <el-table-column label="状态">
          <!--
            slot-scope 这是固定写法，并且使vue之前版本的写法
            scope是变量，可以更改，但是一般都叫scope
            scope.row 遍历到的每一行数据 -->
          <template v-slot:default="scope">
            <span
              :style="{ color: scope.row.status === 0 ? 'red' : '#606266' }"
              >{{ scope.row.status === 0 ? '禁用' : '启用' }}</span
            >
          </template>
        </el-table-column>
        <el-table-column label="操作" width="280px">
          <!-- 这个template是作用域插槽中的固定语法，跟最外层的不一样 -->
          <template v-slot:default="scope">
            <el-button @click="edit(scope.row)">编辑</el-button>
            <el-button
              @click="onChangeStatus(scope.row.id)"
              :type="scope.row.status === 0 ? 'success' : 'info'"
              >{{ scope.row.status === 0 ? '启用' : '禁用' }}</el-button
            >
            <el-button @click="del(scope.row.id, scope)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!--
          size-change：每页多少条改变了
          current-change：当前页改变了
          current-page：当前页
          page-sizes：可以选择的每页多少条
          page-size：每页多少条
          layout：布局的元素
          total：总条数
      -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="page"
        :page-sizes="[1, 2, 5, 10]"
        :page-size="limit"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </el-card>
    <add-or-update ref="addOrUpdateRef" />
  </div>
</template>

<script>
import AddOrUpdate from './add-or-update'
import { getUserList, changeStatus, delUser } from '@/api/user'
import {
  defineComponent,
  ref,
  reactive,
  onMounted,
  getCurrentInstance
} from 'vue'
export default defineComponent({
  name: 'UserList',
  components: {
    AddOrUpdate
  },
  setup () {
    // form的ref
    const formRef = ref()
    const addOrUpdateRef = ref()

    const instance = getCurrentInstance()

    const options = reactive([
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

    const form = ref({
      username: '', // 昵称
      email: '', // 邮箱
      // eslint-disable-next-line
      role_id: '' // 角色id 1：超级管理员 2：管理员 3:老师 4:学生
    })

    const page = ref(1) // 页面
    const limit = ref(2) // 每页多少条
    const list = ref([]) // 列表数据
    const total = ref(0) // 总条数，为分页服务

    // 获取用户信息
    const getListData = async () => {
      const res = await getUserList({
        ...form.value,
        page: page.value,
        limit: limit.value
      })

      if (res.code === 200) {
        list.value = res.data.items
        total.value = res.data.pagination.total
      }
    }
    // 搜索
    const search = () => {
      // 搜索一定要从第一页开始
      page.value = 1

      getListData()
    }
    // 清除
    const clear = () => {
      formRef.value.resetFields()

      search()
    }
    // 分页相关
    // 每页多少条改变了
    const handleSizeChange = val => {
      limit.value = val

      getListData()
    }
    // 当前页发生了改变
    const handleCurrentChange = val => {
      page.value = val

      getListData()
    }
    // 更改状态
    const onChangeStatus = async id => {
      const res = await changeStatus({ id })

      if (res.code === 200) {
        instance.ctx.$message.success('更改状态成功~')
        getListData()
      }
    }
    // 删除
    const del = (id, scope) => {
      instance.ctx
        .$confirm('确定删除吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
        .then(async () => {
          const res = await delUser({ id })

          if (res.code === 200) {
            instance.ctx.$message.success('删除成功~')

            // 删除成功之后，从第一页开始查（产品经理说的第一种处理方式）
            // search()

            // 删除之后，在当前页、如果当前页没有数据则跳转到上一页（产品经理说的另外一种处理方式）
            // 1、先从list中删除
            list.value.splice(scope.$index, 1)

            // 2、判断list的长度是否为0，如果为0则跳转到上一页（但是要注意，如果当前页已经是第一页，则不处理）
            if (list.value.length === 0) {
              if (page.value === 1) return

              page.value--
            }
            getListData()
          }
        })
        .catch(error => {
          console.log(error)
        })
    }
    const add = () => {
      addOrUpdateRef.value.dialogVisible = true
      addOrUpdateRef.value.mode = 'add'
    }
    const edit = row => {
      addOrUpdateRef.value.dialogVisible = true

      // 等子组件，渲染完毕之后，再给它赋值，这样的话，子组件中form表单的prop就准备好了
      addOrUpdateRef.value.$nextTick(() => {
        addOrUpdateRef.value.mode = 'edit'
        // JSON.parse(JSON.stringify(row)) 这个是深拷贝的写法
        addOrUpdateRef.value.form = JSON.parse(JSON.stringify(row))
      })
    }

    onMounted(() => {
      getListData()
    })

    return {
      options,
      form,
      page,
      limit,
      list,
      total,
      search,
      clear,
      handleSizeChange,
      handleCurrentChange,
      onChangeStatus,
      del,
      add,
      edit,
      addOrUpdateRef,
      formRef
    }
  }
})
</script>
