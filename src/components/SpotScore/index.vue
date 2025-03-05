<template>
  <div class="rating-component">
    <!-- 左侧评分区域 -->
    <div class="rating-left">
      <p class="rating-text">点此处进行评分</p>
      <div class="star-container">
        <el-icon
          v-for="index in 5"
          :key="index"
          :size="24"
          :color="
            index <= (hoverRating || currentRating) ? '#ffc107' : '#e4e5e9'
          "
          @click="handleRating(index)"
          @mouseover="hoverRating = index"
          @mouseleave="hoverRating = 0"
          :class="{ disabled: hasRated }"
        >
          <StarFilled />
        </el-icon>
      </div>
      <p v-if="hasRated" class="rated-text">您已评分：{{ currentRating }} 分</p>
    </div>

    <!-- 右侧平均分区域 -->
    <div class="rating-right">
      <p class="average-rating">平均 {{ averageRating }} 分</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { StarFilled } from "@element-plus/icons-vue";
import { ElMessage } from "element-plus";
import {
  addSpotScoreUsingPost,
  getAverageScoreUsingGet,
  listSpotScoreVoByPageUsingPost
} from "@/api/spotScoreController"; // 根据实际路径导入接口
import { useRoute } from "vue-router";
import { GET_ID } from "@/utils/token";
import eventBus from "@/utils/eventBus"; // 假设 GET_ID 是获取当前用户 ID 的工具函数

// 使用路由获取当前景点 ID
const route = useRoute();
const spotId = route.params.id as string;

// 当前用户评分
const currentRating = ref(0);
// 鼠标悬停时的评分
const hoverRating = ref(0);
// 平均分
const averageRating = ref(0);
// 用户是否已评分
const hasRated = ref(false);

// 获取当前用户 ID
const userId = GET_ID();

// 获取平均评分
const fetchAverageScore = async () => {
  try {
    const res = await getAverageScoreUsingGet({ spotId });
    if (res.code === 200) {
      averageRating.value = res.data;
    } else {
      ElMessage.info(res.message);
    }
  } catch (error) {
    ElMessage.error("获取平均评分失败");
  }
};

// 检查用户是否已评分
const checkUserRating = async () => {
  try {
    const res = await listSpotScoreVoByPageUsingPost({
      spotId: spotId,
      userId: userId,
      pageSize: 1,
      current: 1
    });
    if (res.code === 200 && res.data.records.length > 0) {
      // 用户已评分
      hasRated.value = true;
      currentRating.value = res.data.records[0].score;
    } else {
      // 用户未评分
      hasRated.value = false;
    }
  } catch (error) {
    ElMessage.error("检查用户评分失败");
  }
};

// 处理评分点击事件
const handleRating = async (rating: number) => {
  if (hasRated.value) {
    ElMessage.warning("您已评分，不可重复评分");
    return;
  }
  try {
    const res = await addSpotScoreUsingPost({
      spotId: spotId,
      score: rating
    });
    if (res.code === 200) {
      currentRating.value = rating;
      hasRated.value = true;
      ElMessage.success("评分成功");
      // 重新获取平均评分
      await fetchAverageScore();
      // 触发事件，通知 SpotScoreList 刷新数据
      eventBus.emit("refresh-score-list");
    } else {
      ElMessage.error("评分失败");
    }
  } catch (error) {
    ElMessage.error("评分失败");
  }
};

// 组件加载时获取平均评分和用户评分状态
onMounted(() => {
  fetchAverageScore();
  checkUserRating();
});
</script>

<style scoped lang="scss">
.rating-component {
  display: flex;
  align-items: center;
  gap: 20px;
  padding: 16px;
  border: 1px solid #e4e5e9;
  border-radius: 8px;
}

.rating-left {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}

.rating-text {
  margin: 0;
  font-size: 14px;
  color: #666;
}

.star-container {
  display: flex;
  gap: 4px;
  cursor: pointer;
}

.rating-right {
  font-size: 16px;
  font-weight: bold;
  color: #333;
}

.average-rating {
  margin: 0;
}

.disabled {
  cursor: not-allowed;
  opacity: 0.6;
}

.rated-text {
  margin: 0;
  font-size: 14px;
  color: #666;
}
</style>
