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

