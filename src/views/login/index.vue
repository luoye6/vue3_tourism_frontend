<template>
  <div class="login_container">
    <el-row>
      <el-col :span="12" :xs="0"></el-col>
      <el-col :span="12" :xs="24">
        <el-form
          class="login_form"
          :model="loginForm"
          :rules="rules"
          ref="loginForms"
        >
          <el-row
            ><img
              src="../../assets/images/logo.png"
              style="width: 128px; height: 128px"
            />
            <h1 style="text-align: center; line-height: 128px">Hello</h1>
          </el-row>
          <h2>欢迎来到智能 AI 旅游推荐平台</h2>
          <el-form-item prop="userAccount">
            <el-input
              :prefix-icon="User"
              v-model="loginForm.userAccount"
            ></el-input>
          </el-form-item>
          <el-form-item prop="userPassword">
            <el-input
              type="password"
              :prefix-icon="Lock"
              v-model="loginForm.userPassword"
              show-password
            ></el-input>
          </el-form-item>

          <el-form-item>
            <el-button
              :loading="loading"
              type="primary"
              size="default"
              class="login_btn"
              @click="login"
              >登录
            </el-button>
            <el-button
              :loading="loading"
              type="success"
              size="default"
              class="login_btn"
              @click="register"
              >注册
            </el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
    <el-row>
      <p class="login_footer">
        <i class="iconfont icon-banquan" style="font-size: 18px"></i>
        2023 小白条出品 |
        <a href="https://beian.miit.gov.cn/#/Integrated/index"
          >浙ICP备2023044565号-1</a
        >
        |<a href="https://beian.mps.gov.cn/#/query/webSearch">
          <img
            src="../../assets/images/logoPolice.png"
            style="height: 16px; width: 16px; margin: 5px 0px 0px 5px"
          />
          浙公网安备33028202001002号
        </a>
      </p>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { Lock, User } from "@element-plus/icons-vue";
import { onMounted, reactive, ref } from "vue";
// 引入用户相关的小仓库
// import userUserStore from "@/store/modules/user";
// 引入路由
import { useRoute, useRouter } from "vue-router";
// 引入ElementUI-Plus
import { ElMessage, ElNotification } from "element-plus";
// 引入时间函数
import { getTime } from "@/utils/time";
import useUserStore from "@/store/modules/user";
//收集账号与密码的数据
let loginForm = reactive({
  // userAccount: "yupi",
  userAccount: "xiaobaitiao",
  userPassword: "12345678"
});
// 获取loginForms组件
let loginForms = ref();
// 定义变量控制按钮加载效果
let loading = ref(false);
// 获取路由器
let $router = useRouter();
// 获取路由
let $route = useRoute();
let userStore = useUserStore();
// let userStore = userUserStore();
//登录按钮的回调
const login = async () => {
  // 保证全部表单相校验通过再发请求
  await loginForms.value.validate(async (valid: any) => {
    if (!valid) {
      ElMessage({
        type: "error",
        message: "表单参数不合法",
        duration: 1000
      });
    } else {
      // 点击按钮后发送登录请求，请求成功->首页展示数据的地方,请你失败->弹出登录失败的信息
      loading.value = true;
      try {
        await userStore.userLogin(loginForm);
        // 登录成功，跳转到展示数据的页面
        // 判断登录的时候，如果路由路径中有query参数，那么往query参数跳转，没有的话跳转到首页
        let redirect: any = $route.query.redirect;
        $router.push({ path: redirect || "/index" });
        // 提示信息
        ElNotification({
          type: "success",
          message: "欢迎回来",
          title: `HI,${getTime()}好`,
          duration: 3000
        });
      } catch (error) {
        // console.log(error);
        ElNotification({
          type: "error",
          message: "用户名或密码错误"
        });
      } finally {
        loading.value = false;
      }
    }
  });
};

onMounted(async () => {
  // console.log(1);
  // const res = await UserControllerService.userLoginUsingPost({
  //   userAccount: "yupi",
  //   userPassword: "12345678"
  // });
  // console.log(res);
});

// 注册按钮回调
const register = () => {
  $router.push("/register");
};
const validatorUserName = (_rule: any, value: any, callback: any) => {
  if (/^\w{4,15}$/.test(value)) {
    callback();
  } else {
    callback(new Error("账号长度应该在4位-15位之间"));
  }
};
const validatorPassword = (_rule: any, value: any, callback: any) => {
  if (/^\w{6,10}$/.test(value)) {
    callback();
  } else {
    callback(new Error("密码长度应该在6位-15位之间"));
  }
};
// 定义表单校验参数
const rules = {
  userAccount: [{ trigger: "change", validator: validatorUserName }],
  userPassword: [{ trigger: "change", validator: validatorPassword }]
};
</script>
<style scoped lang="scss">
.login_container {
  width: 100%;
  height: 100vh;
  background: url("@/assets/images/background.jpg") no-repeat;
  background-size: cover;

  .login_form {
    position: relative;
    width: 80%;
    top: 30vh;
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

    .login_btn {
      width: 20%;
    }
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  .login_footer {
    position: fixed;
    bottom: 0px;
    left: 50%;
    transform: translate(-50%, -50%);
  }
}
</style>
