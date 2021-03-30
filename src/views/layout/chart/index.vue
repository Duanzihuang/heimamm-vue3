<template>
  <div>
    <el-card>
      <ul class="list">
        <li>
          <div class="itemContent color1">{{ titleObj.increment_users }}</div>
          <p>今日新增用户</p>
        </li>
        <li>
          <div class="itemContent color1">{{ titleObj.total_users }}</div>
          <p>总用户量</p>
        </li>
        <li>
          <div class="itemContent color2">
            {{ titleObj.increment_questions }}
          </div>
          <p>新增试题</p>
        </li>
        <li>
          <div class="itemContent color2">{{ titleObj.total_questions }}</div>
          <p>总试题量</p>
        </li>
        <li>
          <div class="itemContent color3">
            {{ titleObj.total_done_questions }}
          </div>
          <p>总刷题量</p>
        </li>
        <li>
          <div class="itemContent color3">
            {{ titleObj.personal_questions }}
          </div>
          <p>人均刷题量</p>
        </li>
      </ul>
    </el-card>
    <el-card style="margin-top:15px;">
      <div style="height:500px;" ref="echartsRef"></div>
    </el-card>
  </div>
</template>

<script>
// echarts 4.x 之前是这样导入
// import echarts from 'echarts'
// import * as obj from '@/utils/token'
// console.log(obj.saveToken)
// console.log(obj.getToken)
// console.log(obj.removeToken)

// echarts 5.x 之后要如下导入
import * as echarts from 'echarts'
import { getTitle, getStatistics } from '@/api/statistics'
import { ref, onMounted } from 'vue'
export default {
  name: 'Chart',
  setup () {
    const echartsRef = ref()

    const titleObj = ref({})

    const getTitleObjData = async () => {
      const res = await getTitle()

      if (res.code === 200) {
        titleObj.value = res.data
      }
    }

    const getStatisticsData = async () => {
      const res = await getStatistics()
      // 基于准备好的dom，初始化echarts实例
      const myChart = echarts.init(echartsRef.value)
      // 设置options
      myChart.setOption({
        tooltip: {
          trigger: 'item'
        },
        legend: {
          right: '5%',
          orient: 'vertical'
          // left: 'center'
        },
        series: [
          {
            name: '访问来源',
            type: 'pie',
            radius: ['40%', '70%'],
            avoidLabelOverlap: false,
            label: {
              show: false,
              position: 'center'
            },
            emphasis: {
              label: {
                show: true,
                fontSize: '40',
                fontWeight: 'bold'
              }
            },
            labelLine: {
              show: false
            },
            data: res.data
          }
        ]
      })
    }

    onMounted(() => {
      getTitleObjData()

      getStatisticsData()
    })

    return {
      echartsRef,
      titleObj
    }
  }
}
</script>

<style lang="less" scoped>
.list {
  display: flex;
  justify-content: space-around;
  align-items: center;
  text-align: center;
}
.itemContent {
  border-radius: 50%;
  width: 99px;
  height: 99px;
  line-height: 99px;
}
.color1 {
  border: 3px solid #0086fa;
  color: #0086fa;
}
.color2 {
  border: 3px solid #f76137;
  color: #f76137;
}
.color3 {
  border: 3px solid #44ba81;
  color: #44ba81;
}
</style>
