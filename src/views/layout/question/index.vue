<template>
  <div>
    <el-card>
      <el-form
        :model="query"
        ref="formRef"
        label-width="50px"
        :inline="true"
        size="normal"
      >
        <el-row>
          <el-col :span="6">
            <el-form-item label="学科" prop="subject">
              <el-select
                v-model="query.subject"
                placeholder="请选择学科"
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
          </el-col>
          <el-col :span="6">
            <el-form-item label="阶段" prop="step">
              <el-select
                v-model="query.step"
                placeholder="请选择阶段"
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
          </el-col>
          <el-col :span="6">
            <el-form-item label="企业" prop="enterprise">
              <el-select
                v-model="query.enterprise"
                placeholder="请选择企业"
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
          </el-col>
          <el-col :span="6">
            <el-form-item label="题型" prop="type">
              <el-select
                v-model="query.type"
                placeholder="请选择题型"
                size="medium"
              >
                <el-option
                  v-for="item in typeList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <el-form-item label="难度" prop="difficulty">
              <el-select
                v-model="query.difficulty"
                placeholder="请选择难度"
                size="medium"
              >
                <el-option
                  v-for="item in difficultyList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="作者" prop="username">
              <el-input v-model="query.username"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="状态" prop="status">
              <el-select
                v-model="query.status"
                placeholder="请选择状态"
                size="medium"
              >
                <el-option
                  v-for="item in statusList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="日期" prop="create_date" size="medium">
              <el-date-picker
                v-model="query.create_date"
                type="date"
                placeholder="请选择日期"
              >
              </el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="标题" prop="title">
              <el-input style="width:500px;" v-model="query.title"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item>
              <el-button type="primary" @click="search">搜索</el-button>
              <el-button @click="clear">清除</el-button>
              <el-button type="primary" @click="add">+新增试题</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-card>
    <el-card style="margin-top:20px;">
      <el-table :data="list" border stripe>
        <el-table-column label="序号" width="50" type="index">
        </el-table-column>
        <el-table-column label="题目" width="200">
          <template #default="scope">
            <span v-html="scope.row.title"></span>
          </template>
        </el-table-column>
        <el-table-column label="学科.阶段">
          <template #default="scope">
            <span v-if="scope.row.step === 1"
              >{{ scope.row.subject_name }}.初级</span
            >
            <span v-else-if="scope.row.step === 2"
              >{{ scope.row.subject_name }}.中级</span
            >
            <span v-else-if="scope.row.step === 3"
              >{{ scope.row.subject_name }}.高级</span
            >
          </template>
        </el-table-column>
        <el-table-column label="题型" :formatter="formatType">
        </el-table-column>
        <el-table-column label="企业" prop="enterprise_name"> </el-table-column>
        <el-table-column label="创建者" prop="username"> </el-table-column>
        <el-table-column label="访问量" prop="reads"> </el-table-column>
        <el-table-column label="状态">
          <template #default="scope">
            <!-- scope.row 就可以拿到要渲染的那一行的值 -->
            <span
              :style="{ color: scope.row.status === 0 ? 'red' : '#606266' }"
              >{{ scope.row.status === 0 ? '禁用' : '启用' }}</span
            >
          </template>
        </el-table-column>
        <el-table-column label="操作" width="280">
          <template #default="scope">
            <el-button @click="edit(scope.row)">编辑</el-button>
            <el-button
              @click="onChangeStatus(scope.row.id)"
              :type="scope.row.status === 0 ? 'success' : 'info'"
              >{{ scope.row.status === 0 ? '启用' : '禁用' }}</el-button
            >
            <el-button @click="del(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!--
        size-change：每页多少条改变
        current-change：当前页改变
        current-page：当前页
        page-size：每页多少条
        -->
      <el-pagination
        @size-change="sizeChange"
        @current-change="currentChange"
        :current-page="page"
        :page-sizes="[1, 2, 5, 10]"
        :page-size="limit"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        background
      >
      </el-pagination>
    </el-card>
    <add-or-update
      ref="addOrUpdateRef"
      :subjectList="subjectList"
      :enterpriseList="enterpriseList"
      :stepList="stepList"
      :typeList="typeList"
      :difficultyList="difficultyList"
    />
  </div>
</template>

<script>
import { defineComponent, ref, getCurrentInstance, onMounted } from 'vue'
import { getQuestionList, changeStatus, delQuestion } from '@/api/question'
import { getEnterpriseList } from '@/api/enterprise'
import { getSubjectList } from '@/api/subject'
import AddOrUpdate from './add-or-update'

export default defineComponent({
  components: {
    AddOrUpdate
  },
  setup () {
    const instance = getCurrentInstance()

    const formRef = ref()
    const addOrUpdateRef = ref()

    const subjectList = ref([]) // 学科列表
    const enterpriseList = ref([]) // 企业列表
    const stepList = ref([
      // 阶段列表
      { label: '初级', value: 1 },
      { label: '中级', value: 2 },
      { label: '高级', value: 3 }
    ])
    const typeList = ref([
      // 题型列表
      { label: '单选', value: 1 },
      { label: '多选', value: 2 },
      { label: '简答', value: 3 }
    ])
    const difficultyList = ref([
      // 难度列表
      { label: '简单', value: 1 },
      { label: '一般', value: 2 },
      { label: '困难', value: 3 }
    ])
    const statusList = ref([
      // 状态
      {
        value: 0,
        label: '禁用'
      },
      {
        value: 1,
        label: '启用'
      }
    ])
    const query = ref({
      title: '', // 标题
      subject: '', // 学科
      enterprise: '', // 企业
      type: '', // 题型 1 单选 2 多选 3 简答
      step: '', // 阶段 1 初级 2 中级 3高级
      username: '', // 作者
      status: '', // 状态 0 禁用 1 启用
      difficulty: '', // 题目难度: 1(简单),2(一般),3(困难)
      // eslint-disable-next-line
      create_date: '' // 创建日期
    })
    const page = ref(1) // 页码
    const limit = ref(2) // 每页多少条
    const list = ref([]) // 列表
    const total = ref(0) // 总条数

    const getSubjectListData = async () => {
      const res = await getSubjectList()

      if (res.code === 200) {
        subjectList.value = res.data.items
      }
    }
    const getEnterpriseListData = async () => {
      const res = await getEnterpriseList()

      if (res.code === 200) {
        enterpriseList.value = res.data.items
      }
    }
    const getListData = async () => {
      const res = await getQuestionList({
        ...query.value,
        page: page.value,
        limit: limit.value
      })

      if (res.code === 200) {
        list.value = res.data.items
        total.value = res.data.pagination.total
      }
    }

    onMounted(() => {
      // 获取学科列表数据
      getSubjectListData()
      // 获取企业列表数据
      getEnterpriseListData()
      // 获取题库列表数据
      getListData()
    })

    // 搜索
    const search = () => {
      page.value = 1

      getListData()
    }
    // 清除
    const clear = () => {
      formRef.value.resetFields()

      search()
    }
    // 格式化类型那一列
    const formatType = row => {
      let typeName = ''
      switch (row.type) {
        case 1:
          typeName = '单选'
          break

        case 2:
          typeName = '多选'
          break

        case 3:
          typeName = '简答'
          break

        default:
          break
      }
      return typeName
    }
    // 分页相关
    // 每页多少条改变
    const sizeChange = size => {
      limit.value = size

      search()
    }
    // 当前页发生了改变
    const currentChange = val => {
      page.value = val

      getListData()
    }

    // 编辑
    const edit = row => {
      console.log(row)
    }

    const onChangeStatus = async id => {
      const res = await changeStatus({ id })

      if (res.code === 200) {
        instance.ctx.$message({
          type: 'success',
          message: '更改状态成功~',
          duration: 1000
        })

        getListData()
      }
    }
    const del = id => {
      instance.ctx
        .$confirm('确定删除该数据吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
        .then(async () => {
          const res = await delQuestion({ id })

          if (res.code === 200) {
            instance.ctx.$message({
              type: 'success',
              message: '删除成功~',
              duration: 1000
            })

            // 回到第一页
            page.value = 1

            getListData()
          }
        })
        .catch(err => {
          console.log(err)
        })
    }
    const add = () => {
      addOrUpdateRef.value.dialogVisible = true
      addOrUpdateRef.value.mode = 'add'
    }

    return {
      formRef,
      addOrUpdateRef,
      subjectList,
      enterpriseList,
      stepList,
      typeList,
      difficultyList,
      statusList,
      query,
      page,
      limit,
      list,
      total,
      search,
      clear,
      formatType,
      sizeChange,
      currentChange,
      edit,
      onChangeStatus,
      del,
      add
    }
  }
})
</script>
