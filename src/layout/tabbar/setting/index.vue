<template>
  <el-button
    size="small"
    @click="updateRefsh"
    icon="Refresh"
    circle
  ></el-button>
  <el-button
    size="small"
    @click="fullScren"
    icon="FullScreen"
    circle
  ></el-button>

  <el-popover placement="bottom" title="主题设置" :width="300" trigger="click">
    <!-- 表单元素 -->
    <el-form>
      <el-form-item label="主题颜色">
        <el-color-picker
          @change="setColor"
          v-model="color"
          :teleported="false"
          size="small"
          show-alpha
          :predefine="predefineColors"
        />
      </el-form-item>
      <el-form-item label="暗黑模式">
        <el-switch
          @change="changeDark"
          v-model="dark"
          class="mt-2"
          style="margin-left: 24px"
          inline-prompt
          active-icon="MoonNight"
          inactive-icon="Sunny"
        />
      </el-form-item>
    </el-form>
    <template #reference>
      <el-button size="small" icon="Setting" circle></el-button>
    </template>
  </el-popover>
  <img
    :src="userStore.avatar"
    style="width: 24px; height: 24px; margin: 0 0 0 10px; border-radius: 50%"
  />
  <!-- 下拉菜单 -->
  <el-dropdown>
    <span class="el-dropdown-link">
      {{ userStore.userAccount }}
      <el-icon class="el-icon--right">
        <arrow-down />
      </el-icon>
    </span>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item icon="UserFilled" @click="goPersonalHomePage"
          >个人主页
        </el-dropdown-item>
        <el-dropdown-item @click="logout" icon="CircleClose"
          >退出登录
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script setup lang="ts">
// 引入路由器和路由
import { useRouter } from "vue-router";
import { onMounted, ref } from "vue";
// 引入用户相关的小仓库
import userUserStore from "@/store/modules/user";
import useLayOutSettingStore from "@/store/modules/setting";
import { GET_ID } from "@/utils/token";
import { UserData } from "@/api/user/type";
import { getUserVoByIdUsingGet } from "@/api/userController";
import { ElMessage } from "element-plus";
// 创建路由器对象
let $router = useRouter();
let layOutSettingStore = useLayOutSettingStore();
let userStore = userUserStore();
// 创建路由对象
// let $route = useRoute();
//收集开关的数据
let dark = ref<boolean>(false);
const user = ref<UserData>({
  id: 0,
  userName: "",
  userAccount: "",
  userAvatar: "",
  gender: 0,
  userRole: "",
  userPassword: "",
  accessKey: "",
  secretKey: "",
  invitationCode: "",
  email: "",
  balance: 0,
  createTime: "",
  updateTime: "",
  isDelete: 0,
  tokenValue: ""
});
onMounted(() => {
  getUserInformationById();
});

const getUserInformationById = async () => {
  const id = GET_ID();
  if (id == null) {
    return ElMessage.info("获取用户信息失败");
  }
  const stringId = BigInt(id as string) as any;
  let result: any = await getUserVoByIdUsingGet({
    id: stringId
  });
  if (result.code == 200) {
    user.value = result.data;
  }
  getUserAvatar();
  getUserAccount();
};
const getUserAvatar = () => {
  userStore.avatar = user.value.userAvatar;
};
const getUserAccount = () => {
  userStore.userAccount = user.value.userAccount;
};
// 刷新按钮回调
const updateRefsh = () => {
  layOutSettingStore.refsh = !layOutSettingStore.refsh;
};
// 全屏按钮回调
const fullScren = () => {
  // Dom对象的一个属性: 可以用来判断当前是否为全屏模式(trueORfalse)
  let full = document.fullscreenElement;
  // 切换为全屏模式
  if (!full) {
    // 文档根节点的方法requestFullscreen实现全屏模式
    document.documentElement.requestFullscreen();
  } else {
    // 退出全屏模式
    document.exitFullscreen();
  }
};
const goPersonalHomePage = () => {
  $router.push("/user/account");
};
const logout = async () => {
  await userStore.userLogout();
  $router.push({ path: "/login" });
};
//颜色组件组件的数据
const color = ref("rgba(255, 120, 0)");
const predefineColors = ref([
  "#ff4500",
  "#ff8c00",
  "#ffd700",
  "#90ee90",
  "#00ced1",
  "#1e90ff",
  "#c71585",
  "rgba(255, 69, 0, 0.68)",
  "rgb(255, 120, 0)",
  "hsv(51, 100, 98)",
  "hsva(120, 40, 94, 0.5)",
  "hsl(181, 100%, 37%)",
  "hsla(209, 100%, 56%, 0.73)",
  "#c7158577"
]);

//switch开关的chang事件进行暗黑模式的切换
const changeDark = () => {
  //获取HTML根节点
  let html = document.documentElement;
  //判断HTML标签是否有类名dark
  dark.value ? (html.className = "dark") : (html.className = "");
};

//主题颜色的设置
const setColor = () => {
  //通知js修改根节点的样式对象的属性与属性值
  const html = document.documentElement;
  html.style.setProperty("--el-color-primary", color.value);
};
</script>
<script lang="ts">
export default {
  name: "Setting"
};
</script>
<style scoped lang="scss"></style>
