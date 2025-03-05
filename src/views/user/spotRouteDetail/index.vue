<template>
  <div class="route-detail">
    <el-card style="margin-bottom: 10px">
      <!-- 标题和头像在同一行 -->
      <div class="header">
        <h1 style="margin: 0; font-weight: 700; font-size: 24px">路线详情</h1>
        <el-avatar
          :src="route.spotRouteAvatar"
          :size="64"
          style="border-radius: 8px; margin-left: 16px"
        />
      </div>

      <!-- 路线描述 -->
      <p style="font-size: 16px; color: #666; margin: 16px 0 0 0">
        {{ route.spotRouteDescription }}
      </p>

      <!-- 创建时间 -->
      <p style="font-size: 14px; color: #999; margin: 8px 0 0 0">
        创建时间：{{ route.createTime }}
      </p>

      <!-- 管理员ID -->
      <p style="font-size: 14px; color: #999; margin: 8px 0 0 0">
        管理员ID：{{ route.adminId }}
      </p>

      <!-- 分割线 -->
      <el-divider />

      <!-- 景点列表 -->
      <div class="spot-list">
        <h3 style="font-size: 20px; font-weight: 600; margin: 16px 0">
          包含景点
        </h3>
        <!-- 景点名称 -->
        <p style="font-size: 16px; color: #333; margin: 8px 0">
          景点名称：{{ route.spotNameList.join(" - ") }}
        </p>
        <!-- 路线距离 -->
        <div v-if="route.spotDistanceList.length > 0">
          <p
            v-for="(distance, index) in route.spotDistanceList"
            :key="index"
            style="font-size: 16px; color: #666; margin: 8px 0"
          >
            第{{ index + 1 }}段路线距离：{{ distance.toFixed(2) }}公里
          </p>
        </div>
      </div>
    </el-card>

    <!-- 分享对话框 -->
    <el-dialog v-model="shareDialogVisible" width="400px">
      <div class="share-dialog-content">
        <!-- 标题 -->
        <h3
          style="
            font-weight: 700;
            font-size: 24px;
            margin: 0;
            text-align: center;
          "
        >
          分享此路线
        </h3>
        <el-divider />
        <!-- 分享链接 -->
        <div class="share-section">
          <p style="margin: 0 0 10px 0; font-weight: 700; font-size: 20px">
            分享链接：
          </p>
          <el-card>
            <div class="link-container">
              <span>{{ currentPageUrl }}</span>
              <el-button type="primary" @click="copyLink">复制</el-button>
            </div>
          </el-card>
        </div>
        <el-divider />
        <!-- 二维码分享 -->
        <div class="share-section">
          <p style="margin: 0 0 10px 0; font-weight: 700; font-size: 20px">
            二维码分享：
          </p>
          <el-card style="margin: 0 auto">
            <QRCodeVue3
              :value="currentPageUrl"
              :width="200"
              :height="200"
              :imageOptions="{
                hideBackgroundDots: false,
                imageSize: 0.4,
                margin: 0
              }"
            />
          </el-card>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import { ElMessage } from "element-plus";
import QRCodeVue3 from "qrcode-vue3";
import { getSpotRouteVoByIdUsingGet } from "@/api/spotRouteController";
import useClipboard from "vue-clipboard3";

// 使用 `useRoute` 获取当前路由对象
const $route = useRoute();
// 获取路由参数中的 id
const routeId = $route.params.id as string;

// 路线详情数据
const route = ref({
  spotNameList: [] as string[],
  spotDistanceList: [] as number[],
  adminId: 0,
  spotRouteAvatar: "",
  spotRouteDescription: "",
  createTime: ""
});

// 分享对话框的显示状态
const shareDialogVisible = ref(false);
// 当前页面地址
const currentPageUrl = ref(window.location.href);

// 获取路线详情
const fetchRouteDetail = async () => {
  try {
    const res = await getSpotRouteVoByIdUsingGet({ id: routeId });
    if (res.code === 200) {
      route.value = res.data;
    } else {
      ElMessage.error("获取路线详情失败");
    }
  } catch (error) {
    ElMessage.error("获取路线详情失败");
  }
};

// 复制链接
const { toClipboard } = useClipboard();
const copyLink = async () => {
  try {
    await toClipboard(currentPageUrl.value);
    ElMessage.success({
      message: "链接已复制到剪贴板",
      duration: 1000
    });
  } catch (e) {
    ElMessage.error("复制失败", e);
  }
};

// 页面加载时触发
onMounted(async () => {
  await fetchRouteDetail();
});
</script>

<style lang="scss">
.route-detail {
  padding: 20px;

  .header {
    display: flex;
    align-items: center;
  }

  .spot-list {
    margin-top: 20px;
  }

  .share-dialog-content {
    display: flex;
    flex-direction: column;
    gap: 20px;

    .share-section {
      display: flex;
      flex-direction: column;
      gap: 10px;
    }

    .link-container {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 10px;

      span {
        flex: 1;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
  }
}
</style>
