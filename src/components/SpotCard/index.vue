<template>
  <div class="spot-detail">
    <el-card style="margin-bottom: 10px">
      <!-- 标题和头像在同一行 -->
      <div class="header">
        <h1 style="margin: 0; font-weight: 700; font-size: 24px">
          {{ spot.spotName }}
        </h1>
        <el-avatar
          :src="spot.spotAvatar"
          :size="64"
          style="border-radius: 8px; margin-left: 16px"
        />
      </div>

      <!-- 标签 -->
      <div class="tags" style="margin-top: 16px">
        <el-tag
          v-for="(tag, index) in spot.spotTagList"
          :key="index"
          type="success"
          style="margin-right: 5px; margin-bottom: 10px"
        >
          {{ tag }}
        </el-tag>
      </div>

      <!-- 坐标 -->
      <p style="font-size: 16px; color: #666; margin: 16px 0 0 0">
        {{ spot.spotLocation }}
      </p>

      <!-- 分割线 -->
      <el-divider />

      <!-- 三个图标 -->
      <div class="icon-container">
        <div class="icon-item">
          <el-icon :size="20">
            <View />
          </el-icon>
          <span>{{ viewCount }}</span>
        </div>
        <div class="icon-item" @click="handleCollect">
          <el-icon :size="20">
            <Star v-if="initStatus === 0" />
            <StarFilled v-if="initStatus === 1" color="#fadb14" :size="20" />
          </el-icon>
          <span>{{ favourCount }}</span>
        </div>
        <div class="icon-item" @click="handleShare">
          <el-icon :size="20">
            <Share />
          </el-icon>
          <span>分享</span>
        </div>
      </div>
    </el-card>

    <!-- 新增的详情卡片 -->
    <el-card style="margin-bottom: 10px">
      <el-tabs v-model="detailActiveName" class="demo-tabs">
        <!-- 景点详情 -->
        <el-tab-pane label="景点详情" name="first">
          <div style="font-size: 16px; line-height: 1.8; color: #666">
            {{ spot.spotDescription }}
          </div>
        </el-tab-pane>

        <!-- 景点评分 -->
        <el-tab-pane label="景点评分" name="second">
          <div style="padding: 20px">
            <SpotScore></SpotScore>
            <SpotScoreList></SpotScoreList>
          </div>
        </el-tab-pane>

        <!-- 门票列表 -->
        <el-tab-pane label="门票列表" name="third">
          <div style="padding: 20px">
            <SpotFeeList :spotId="spotId"></SpotFeeList>
          </div>
        </el-tab-pane>
      </el-tabs>
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
          分享此景点
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
import { Share, Star, View, StarFilled } from "@element-plus/icons-vue";
import QRCodeVue3 from "qrcode-vue3";
import { editSpotUsingPost, getSpotVoByIdUsingGet } from "@/api/spotController";
import useClipboard from "vue-clipboard3";
import {
  addUserSpotFavoritesUsingPost,
  editUserSpotFavoritesUsingPost,
  listMyUserSpotFavoritesVoByPageUsingPost
} from "@/api/userSpotFavoritesController";
import SpotScore from "@/components/SpotScore/index.vue";
import SpotScoreList from "@/components/SpotScoreList/index.vue";
import SpotFeeList from "@/components/SpotFeeList/index.vue";
// 使用 `useRoute` 获取当前路由对象
const route = useRoute();
// 获取路由参数中的 id
const spotId = route.params.id as string;
// 新增的响应式变量
const detailActiveName = ref("first");
// 景点详情数据
const spot = ref({
  spotName: "",
  spotTagList: [],
  spotAvatar: "",
  spotLocation: "",
  spotDescription: "",
  viewNum: 0,
  favourNum: 0
});

// 浏览量
const viewCount = ref(0);
// 收藏量
const favourCount = ref(0);
// 原来的收藏情况 1收藏 0未收藏
const initStatus = ref(0);
// 记录原来是否有关联记录
const alreadyRecord = ref(0);
// 保存原来的关联 id
const id = ref();

// 分享对话框的显示状态
const shareDialogVisible = ref(false);
// 当前页面地址
const currentPageUrl = ref(window.location.href);

// 获取景点详情
const fetchSpotDetail = async () => {
  try {
    const res = await getSpotVoByIdUsingGet({ id: spotId });
    if (res.code === 200) {
      spot.value = res.data;
      viewCount.value = res.data.viewNum || 0;
      favourCount.value = res.data.favourNum || 0;
    } else {
      ElMessage.error("获取景点详情失败");
    }
  } catch (error) {
    ElMessage.error("获取景点详情失败");
  }
};

// 更新浏览量
const updateViewCount = async () => {
  try {
    const res = await editSpotUsingPost({
      id: spotId,
      viewNum: (spot.value.viewNum || 0) + 1
    });
    if (res.code === 200) {
      viewCount.value = (spot.value.viewNum || 0) + 1;
    } else {
      ElMessage.error("更新浏览量失败");
    }
  } catch (error) {
    ElMessage.error("更新浏览量失败");
  }
};

// 获取初始收藏状态
const fetchInitFavour = async () => {
  const res = await listMyUserSpotFavoritesVoByPageUsingPost({
    current: 1,
    pageSize: 1,
    spotId: spotId
  });
  if (res.code !== 200) {
    return ElMessage.error({
      duration: 1000,
      message: "获取用户收藏关联表失败"
    });
  }
  if (res.data.records.length > 0) {
    alreadyRecord.value = 1;
    initStatus.value = res.data.records[0].status;
    id.value = res.data.records[0].id;
  } else {
    alreadyRecord.value = 0;
    initStatus.value = 0;
  }
};

// 处理收藏的接口方法
const handleCollect = async () => {
  if (alreadyRecord.value === 0) {
    // 调用新增关联
    const res2 = await addUserSpotFavoritesUsingPost({
      spotId: spotId
    });
    if (res2.code !== 200) {
      return ElMessage.error({
        duration: 1000,
        message: "添加收藏失败"
      });
    }
    ElMessage.success({
      duration: 1000,
      message: "添加收藏成功"
    });
  } else {
    // 有关联关系，直接取反
    const res3 = await editUserSpotFavoritesUsingPost({
      id: id.value,
      status: initStatus.value === 1 ? 0 : 1
    });
    if (res3.code !== 200) {
      return ElMessage.error({
        duration: 1000,
        message: `${initStatus.value === 1 ? "取消" : "添加"}收藏失败`
      });
    }
    ElMessage.success({
      duration: 1000,
      message: `${initStatus.value === 1 ? "取消" : "添加"}收藏成功`
    });
  }
  // 更新该景点的收藏量信息
  const res4 = await editSpotUsingPost({
    id: spotId,
    favourNum:
      initStatus.value === 0 ? favourCount.value + 1 : favourCount.value - 1
  });
  if (res4.code !== 200) {
    return ElMessage.error({
      duration: 1000,
      message: "更新该景点收藏信息失败"
    });
  }
  // 重新获取该景点收藏量信息
  await fetchSpotDetail();
  await fetchInitFavour();
};

// 处理分享的点击事件
const handleShare = () => {
  shareDialogVisible.value = true;
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
  await fetchSpotDetail();
  await updateViewCount();
  await fetchInitFavour();
});
</script>

<style lang="scss">
.spot-detail {
  padding: 20px;

  .header {
    display: flex;
    align-items: center;
  }

  .tags {
    margin-top: 16px;
  }

  .icon-container {
    display: flex;
    justify-content: space-around; /* 均匀分布 */
    align-items: center;
    margin-top: 20px;

    .icon-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 5px;
      cursor: pointer;
      color: #666;
      transition: color 0.3s;

      &:hover {
        color: #409eff;
      }

      span {
        font-size: 14px;
      }
    }
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
