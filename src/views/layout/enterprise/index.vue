<template>
  <div>
    <el-card>
      <el-form
        :model="query"
        ref="formRef"
        label-width="80px"
        inline
        size="normal"
      >
        <el-form-item label="企业编号" prop="eid">
          <el-input style="width:130px;" v-model="query.eid"></el-input>
        </el-form-item>
        <el-form-item label="企业名称" prop="name">
          <el-input style="width:130px;" v-model="query.name"></el-input>
        </el-form-item>
        <el-form-item label="创建者" prop="username">
          <el-input style="width:130px;" v-model="query.username"></el-input>
        </el-form-item>
        <el-form-item label="状态" prop="status" label-width="50px;">
          <el-select
            style="width:130px;"
            v-model="query.status"
            placeholder="请选择状态"
            size="medium"
          >
            <el-option
              v-for="item in statuses"
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
          <el-button type="primary" @click="add">+新增企业</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card style="margin-top:20px;">
      <el-table :data="list" style="width: 100%">
        <el-table-column type="index" label="序号"> </el-table-column>
        <el-table-column prop="eid" label="企业编号"> </el-table-column>
        <el-table-column prop="name" label="企业名称"> </el-table-column>
        <el-table-column prop="username" label="创建者"> </el-table-column>
        <el-table-column prop="create_time" label="创建日期"> </el-table-column>
        <el-table-column label="状态">
          <template v-slot:default="scope">
            <!-- scope.row 就可以拿到要渲染的那一行的值 -->
            <span
              :style="{ color: scope.row.status === 0 ? 'red' : '#606266' }"
              >{{ scope.row.status === 0 ? '禁用' : '启用' }}</span
            >
          </template>
        </el-table-column>
        <el-table-column label="操作" width="280">
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
import {
  getEnterpriseList,
  changeStatus,
  delEnterprise
} from '@/api/enterprise'
import {
  defineComponent,
  ref,
  reactive,
  onMounted,
  getCurrentInstance
} from 'vue'
export default defineComponent({
  name: 'EnterpriseList',
  components: {
    AddOrUpdate
  },
  setup () {
    // form的ref
    const formRef = ref()
    const addOrUpdateRef = ref()

    const instance = getCurrentInstance()

    const statuses = ref([
      { label: '启用', value: 1 },
      { label: '禁用', value: 0 }
    ])

    const query = ref({
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
      const res = await getEnterpriseList({
        ...query.value,
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
          const res = await delEnterprise({ id })

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
      addOrUpdateRef.value.mode = 'edit'

      // 等子组件，渲染完毕之后，再给它赋值，这样的话，子组件中form表单的prop就准备好了
      addOrUpdateRef.value.$nextTick(() => {
        // JSON.parse(JSON.stringify(row)) 这个是深拷贝的写法
        addOrUpdateRef.value.form = JSON.parse(JSON.stringify(row))
      })
    }

    onMounted(() => {
      getListData()
    })

    return {
      statuses,
      query,
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
