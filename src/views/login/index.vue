<template>
  <div class="login_container">
    <el-row>
      <!-- :xs属性，当你的屏幕小于768时候的占用份数 -->
      <el-col :span="12" :xs="0"></el-col>
      <el-col :span="12" :xs="24">
        <!-- 添加model绑定数据对象，添加rules对象进行数据校验 -->
        <el-form
          class="login_form"
          :model="loginForm"
          :rules="rules"
          ref="loginFormRef"
        >
          <h1>Hello</h1>
          <h2>Welcome To My System</h2>
          <el-form-item prop="username">
            <el-input
              :prefix-icon="User"
              v-model="loginForm.username"
              placeholder="请输入账号"
            ></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              :prefix-icon="Lock"
              v-model="loginForm.password"
              placeholder="请输入密码"
              show-password
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button
              :loading="loading"
              class="login_btn"
              type="primary"
              size="default"
              @click="login"
            >
              登录
            </el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { User, Lock } from '@element-plus/icons-vue'
import { reactive, ref } from 'vue'
import useUserStore from '@/store/modules/user' //引入用户仓库
import { ElNotification } from 'element-plus' //引入Element消息通知
import { useRouter, useRoute } from 'vue-router'
// import type { loginFormData } from '@/api/user/type'
import { getTime } from '@/utils/timeUtils'

const useStore = useUserStore()
//定义变量控制按钮加载效果
let loading = ref(false)
const loginForm: any = reactive({
  username: 'admin',
  password: 'atguigu123',
  verifyCode: '1234',
})
//获取路由对象
const $router = useRouter()
const $route = useRoute()
const loginFormRef = ref()

//自定义表单校验函数
// rule:any 传参字段
// value:any 字段数据
// callback:any回调
const validatorUserName = (rule: any, value: any, callback: any) => {
  //rule:即为校验规则对象
  //value:即为表单元素文本内容
  //函数:如果符合条件callBack放行通过即为
  //如果不符合条件callBack方法,注入错误提示信息
  if (value.length >= 5) {
    callback()
  } else {
    callback(new Error('账号长度至少五位'))
  }
}

//密码自定义表单校验
const validatorPassword = (rule: any, value: any, callback: any) => {
  if (value.length >= 6) {
    callback()
  } else {
    callback(new Error('密码长度至少六位'))
  }
}

const login = async () => {
  loading.value = true
  //校验表单
  //发送登录请求
  //登陆成功-》保存token
  //登陆失败-》提示错误
  try {
    //校验表单
    await loginFormRef.value.validate()

    await useStore.userLogin(loginForm)
    //编程式导航跳转到展示数据首页
    //判断是否有query参数，有就使用query跳转
    let redirectPath: string = $route.query.redirect as string
    $router.push({ path: redirectPath || '/' })
    ElNotification({
      type: 'success',
      message: 'Login successfully',
      title: getTime(),
    })
    loading.value = false
  } catch (error) {
    let errorMessage = ErrorMessageGetting(error)
    //登录失败提示
    ElNotification({
      type: 'error',
      message: errorMessage == '' ? (error as Error).message : errorMessage,
    })
    loading.value = false
  }
}

const ErrorMessageGetting = (error: any): string => {
  let message = ''
  if (error && error.username && error.username.length > 0) {
    message += error.username[0].message
  }
  if (message != '') return message
  if (error && error.password && error.password.length > 0) {
    message += error.password[0].message
  }

  return message
}

// 定义表达需要校验的对象
//规则对象属性
/**
 *  required 是否必须校验
 *  message 校验提示信息
 *  trigger 什么时候校验 blur 失去焦点时候校验，change，值改变时校验
 *  min 最小多少位字符
 *  max 最大多少位字符
 */
const rules = {
  username: [
    // {
    //   required: true,
    //   message: '用户名不能为空!',
    //   trigger: 'blur',
    // },
    // {
    //   required: true,
    //   message: '用户名必须3-10位',
    //   min: 3,
    //   max: 10,
    //   trigger: 'blur',
    // },
    {
      trigger: 'blur',
      validator: validatorUserName,
    },
  ],
  password: [
    // {
    //   required: true,
    //   message: '密码不能为空',
    //   trigger: '',
    // },
    {
      trigger: 'blur',
      validator: validatorPassword,
    },
  ],
}
</script>

<style scoped lang="scss">
.login_container {
  width: 100%;
  height: 100vh;
  background: url('@/assets/images/loginBackground.jpg') no-repeat;
  background-size: cover;

  .login_form {
    position: relative;
    width: 80%;
    top: 40vh;
    background: url('@/assets/images/login_form.png') no-repeat;
    background-size: cover;
    padding: 40px;

    h1 {
      color: white;
      font-size: 40px;
    }

    h2 {
      color: white;
      font-size: 20px;
      margin: 20px 0px;
    }

    .login_btn {
      width: 100%;
    }
  }
}
</style>
