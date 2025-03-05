<template>
  <div class="register_container">
    <el-row>
      <el-col :span="12" :xs="0"></el-col>
      <el-col :span="12" :xs="24">
        <el-form
          class="register_form"
          :model="registerForm"
          :rules="rules"
          ref="registerForms"
        >
          <el-row
            ><img
              src="../../assets/images/logo.png"
              style="width: 128px; height: 128px"
            />
            <h1 style="text-align: center; line-height: 128px">Hello</h1>
          </el-row>

          <h2>欢迎来到智能 AI 旅游推荐平台,请注册您的账号</h2>
          <el-form-item prop="userAccount">
            <el-input
              placeholder="请输入您的账号"
              :prefix-icon="User"
              v-model="registerForm.userAccount"
            ></el-input>
          </el-form-item>
          <el-form-item prop="userPassword">
            <el-input
              placeholder="请输入您的密码"
              type="password"
              :prefix-icon="Lock"
              v-model="registerForm.userPassword"
              show-password
            ></el-input>
          </el-form-item>
          <el-form-item prop="checkPassword">
            <el-input
              placeholder="请再次输入您的密码"
              type="password"
              :prefix-icon="Lock"
              v-model="registerForm.checkPassword"
              show-password
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button
              :loading="loading"
              type="success"
              size="default"
              class="register_btn"
              @click="register"
              >注册
            </el-button>
            <el-button
              type="primary"
              size="default"
              class="back_login_btn"
              @click="backToLogin"
              >返回登录
            </el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { Lock, User } from "@element-plus/icons-vue";
import { reactive, ref } from "vue";
// 引入用户相关的小仓库
// import userUserStore from "@/store/modules/user";
// 引入路由
import { useRouter } from "vue-router";
// 引入ElementUI-Plus
import { ElMessage } from "element-plus";
// 引入时间函数
// import { getTime } from "@/utils/time";
import { userRegisterUsingPost } from "@/api/userController";
//收集账号与密码的数据
let registerForm = reactive({
  userAccount: "",
  userPassword: "",
  checkPassword: ""
});

// 获取registerForms组件
let registerForms = ref();
// 定义变量控制按钮加载效果
let loading = ref(false);
// 获取路由器
let $router = useRouter();
// // 获取路由
// let $route = useRoute();
// let userStore = userUserStore();
//登录按钮的回调
const register = async () => {
  // 保证全部表单相校验通过再发请求
  const valid = registerForms.value.validate();
  if (!valid) {
    ElMessage({
      type: "error",
      message: "表单参数不合法",
      duration: 1000
    });
  }

  // 那么开始注册
  let result: any = await userRegisterUsingPost(registerForm);
  if (result.code == 200) {
    ElMessage.success({
      message: "注册用户成功",
      duration: 1500
    });
    // 注册成功，跳转到登录页面
    $router.push("/login");
  } else {
    ElMessage.error({
      message: result.message,
      duration: 1500
    });
  }
  // console.log(result);
};
// 返回登录按钮的回调
const backToLogin = () => {
  $router.push("/login");
};
const validatorUserName = (_rule: any, value: any, callback: any) => {
  if (/^\w{4,15}$/.test(value)) {
    callback();
  } else {
    callback(new Error("账号长度应该在4位-15位之间"));
  }
};
const validatorPassword = (_rule: any, value: any, callback: any) => {
  if (/^\w{8,10}$/.test(value)) {
    callback();
  } else {
    callback(new Error("密码长度应该在8位-15位之间"));
  }
};
const validatorCheckPassword = (_rule: any, value: any, callback: any) => {
  if (registerForm.userPassword != value) {
    callback(new Error("两次输入的密码不一致"));
  }
};
// 定义表单校验参数
const rules = {
  userAccount: [{ trigger: "change", validator: validatorUserName }],
  userPassword: [{ trigger: "change", validator: validatorPassword }],
  checkPassword: [{ trigger: "change", validator: validatorCheckPassword }]
};
</script>
<style scoped lang="scss">
.register_container {
  width: 100%;
  height: 100vh;
  background: url("@/assets/images/background.jpg") no-repeat;
  background-size: cover;

  .register_form {
    position: relative;
    width: 80%;
    top: 20vh;
    background: url("@/assets/images/login_form.png") no-repeat;
    background-size: cover;
    padding: 40px;

    h1 {
      color: white;
      font-size: 40px;
    }

    h2 {
      font-size: 20px;
      color: white;
      margin: 20px 0px;
    }

    .register_btn {
      width: 20%;
    }

    .back_login_btn {
      width: 20%;
    }
  }
}
</style>
