<template>
  <div class="personalHomePage">
    <el-card>
      <el-tabs v-model="activeName" class="demo-tabs">
        <el-tab-pane label="个人信息" name="first">
          <el-card style="margin-bottom: 20px">
            <template #header>
              <el-row>
                <el-col :span="22" style="font-weight: bold"
                  >个人信息设置
                </el-col>
                <el-col :span="2">
                  <el-button size="default" @click="updateUserInfo"
                    >提交修改
                  </el-button>
                </el-col>
              </el-row>
            </template>
            <el-row :gutter="20" style="margin-bottom: 20px">
              <el-col>
                用户头像：
                <img
                  v-if="user.userAvatar"
                  :src="user.userAvatar"
                  class="avatar"
                  style="height: 64px; width: 64px; border-radius: 50%"
                />
              </el-col>
            </el-row>
            <el-row>
              <el-col>
                修改用户头像：
                <el-input
                  style="margin: 10px 0"
                  placeholder="请输入一个http在线图片链接，例如:https://www.xiaobaitiao.top/logo.png"
                  v-model="newUserAvatar"
                ></el-input>
              </el-col>
            </el-row>
            <!--        id-->
            <el-row style="margin-bottom: 20px"> 用户ID: {{ user.id }}</el-row>
            <!--        昵称设置-->
            <el-row style="margin-bottom: 20px">
              <el-col>
                昵称:
                <el-text v-if="!isEditing">{{ user.userName }}</el-text>
                <el-input
                  v-else
                  v-model="newUserName"
                  style="width: 200px"
                  @blur="saveEdit"
                ></el-input>
                <el-button
                  style="margin-left: 10px"
                  size="small"
                  type="primary"
                  v-if="!isEditing"
                  icon="Edit"
                  @click="startEditing"
                ></el-button>
              </el-col>
            </el-row>

            <!--        用户简介-->
            <el-row style="margin-bottom: 20px">
              用户简介：
              <el-input
                type="textarea"
                v-model="user.userProfile"
                style="margin-top: 20px"
              ></el-input>
            </el-row>
            <!--        用户角色-->
            <!--        用户简介-->
            <el-row style="margin-bottom: 20px">
              用户身份：
              <el-input
                disabled
                v-model="user.userRole"
                style="margin-top: 20px"
              ></el-input>
            </el-row>
          </el-card>
        </el-tab-pane>
        <el-tab-pane label="收藏攻略" name="second">
          <Post></Post>
        </el-tab-pane>
        <el-tab-pane label="收藏景点" name="third">
          <SpotList :spotList="spotList" />
        </el-tab-pane>
        <el-tab-pane label="个人订单" name="fourth">
          <SpotOrderList :spot-order-list="spotOrderList"></SpotOrderList>
        </el-tab-pane>
        <el-tab-pane label="我的评论" name="fifth">
          <MyComment></MyComment>
        </el-tab-pane>
        <el-tab-pane label="旅游日历" name="sixth">
          <HeatmapChart :data="chartData" :year="selectedYear" />
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { GET_ID } from "@/utils/token";
import Post from "@/components/Post/index.vue";
import MyComment from "@/components/MyComment/index.vue";
import SpotOrderList from "@/components/SpotOrderList/index.vue";
import {
  getUserVoByIdUsingGet,
  updateMyUserUsingPost
} from "@/api/userController";
import { ElMessage } from "element-plus";
import useUserStore from "@/store/modules/user";
import SpotList from "@/components/SpotList/index.vue";
import { listUserSpotFavoritesVoByPageUsingPost } from "@/api/userSpotFavoritesController";
import {
  getTravelDataUsingGet,
  listSpotOrderVoByPageUsingPost
} from "@/api/spotOrderController";
import HeatmapChart from "@/components/CalendarChart/index.vue";
// 定义响应式数据
const activeName = ref("first");
const userStore = useUserStore();
const newUserAvatar = ref();
const newUserName = ref("");
const isEditing = ref(false);
const spotOrderList = ref();
// 定义数据
const chartData = ref<{ date: string; value: number }[]>([]);
const selectedYear = ref("2025"); // 假设默认年份为 2025
const user = ref({
  id: 0,
  userAvatar: "",
  userName: "",
  userProfile: "",
  userRole: ""
});
// 景点列表数据
const spotList = ref([]);
onMounted(() => {
  getUserInformationById();
  loadSpotList();
  loadSpotOrderList();
  fetchTravelData(GET_ID(), 1);
});
// 调用后端接口获取数据
const fetchTravelData = async (userId: number, payStatus: number) => {
  try {
    const res = await getTravelDataUsingGet({
      userId,
      payStatus
    });
    if (res.code === 200) {
      chartData.value = res.data;
    } else {
      ElMessage.error("获取数据失败:", res.message);
    }
  } catch (error: any) {
    ElMessage.error("请求失败:", error);
  }
};
// 加载景点列表
const loadSpotOrderList = async () => {
  try {
    const res = await listSpotOrderVoByPageUsingPost({
      current: 1,
      pageSize: 10,
      userId: GET_ID()
    });
    if (res.code === 200) {
      spotOrderList.value = res.data.records;
    } else {
      ElMessage.error("获取景点列表失败");
    }
  } catch (error) {
    ElMessage.error("获取景点列表失败", error);
  }
};
// 加载景点列表
const loadSpotList = async () => {
  try {
    const res = await listUserSpotFavoritesVoByPageUsingPost({
      current: 1,
      pageSize: 10,
      userId: GET_ID(),
      status: 1
    });
    if (res.code === 200) {
      spotList.value = res.data.records.map((item) => {
        return {
          ...item, // 保留其他字段
          id: item.spotId // 将 spotId 重命名为 id
        };
      });
    } else {
      ElMessage.error("获取景点列表失败");
    }
  } catch (error) {
    ElMessage.error("获取景点列表失败", error);
  }
};
const updateUserInfo = async () => {
  const res = await updateMyUserUsingPost({
    userAvatar: newUserAvatar.value || user.value.userAvatar,
    userName: user.value.userName,
    userProfile: user.value.userProfile
  });
  if (res.code !== 200) {
    return ElMessage.error({
      duration: 1000,
      message: "更新用户信息失败"
    });
  }
  // 调用 userStore 的 updateAvatar 方法
  await userStore.updateAvatar(newUserAvatar.value || user.value.userAvatar);
  ElMessage.success({
    duration: 1000,
    message: "更新用户信息成功"
  });
  await getUserInformationById();
};
const getUserInformationById = async () => {
  const id = GET_ID();
  let result: any = await getUserVoByIdUsingGet({
    id: id
  });
  if (result.code == 200) {
    user.value = result.data;
  }
};
const startEditing = () => {
  isEditing.value = true;
  newUserName.value = user.value.userName;
};
const saveEdit = () => {
  isEditing.value = false;
  user.value.userName = newUserName.value;
};
</script>

<style lang="scss">
.el-card__header {
  background-color: #fafafa;
}

.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 50%;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 96px;
  height: 96px;
  text-align: center;
}
</style>
