# heimamm-vue3

## Vue2.x 和 Vue3.x不一致的地方

### ref的使用

vue2.x

```vue
<template>
	<div>
        <el-form
            class="login-form"
            :model="ruleForm"
            :rules="rules"
            ref="ruleForm">
    	</el-form>
    </div>
</template>

<script>
export default {
   methods: {
      login () {
          this.$refs.ruleForm.validate(async valid => {
              if (!valid) return
              ...
          })
      }
   }
}
</script>
```

vue3.x

```vue
<template>
	<div>
        <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleFormRef"
        class="login-form">
    	</el-form>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive } from 'vue'
export default defineComponent({
    setup () {
        // 表单的ref
    	const ruleFormRef = ref(null)
        
        return {
        	ruleFormRef
        }
    }
})
</script>
```

### 路由跳转方式不一样

vue2.x

```js
this.$router.push('/layout')
```

vue3.x

```vue
<script lang="ts">
import { useRouter } from 'vue-router'
export default defineComponent({
    setup() {
		// 路由对象
    	const router = useRouter()
        
        // 登录
    	const handleLogin = async () => {
		  ...
          // 跳转到登录页面
          router.push('/layout')
    	}
    }
})
</script>
```

### watch用法不一样

vue2.x

```vue
<script>
export default {
   data() {
     	return {
             dialogVisible: false, // 决定是否显示
        }  
   },
   watch: {
    dialogVisible (newValue) {
      if (!newValue) {
        // 调用表单的清空方法（把校验也清空）
        this.$refs.form.resetFields()

        // 清空预览的图片
        this.imageUrl = ''
      }
    }
  }
}
</script>
```

vue3.x

```vue
<script lang="ts">
import { defineComponent, ref, reactive } from 'vue'
export default defineComponent({
    setup () {
        // 对话框显示隐藏
    	const dialogVisible = ref(false)
        
        watch(dialogVisible, newValue => {
          if (!newValue) {
            // 调用表单的清空方法（把校验也清空）
            ruleFormRef.value.resetFields()

            // 清空预览的图片
            imageUrl.value = ''
          }
        })
    }
})
</script>
```

## Vue3.x 中 ref 和 reactive

相同点：

- ref和reactive都能实现响应式

不同点：

- ref适用于值类型、子组件设置ref，要给它赋值，必须通过 `xxx.value=值` 进行赋值，取值必须通过`xxx.value`获取值
- reactive适用于引用类型

