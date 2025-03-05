<template>
  <div class="score-list-container">
    <!-- 列表头部 -->
    <div class="list-header">
      <h3>用户评分列表</h3>
      <span>共 {{ total }} 条评价</span>
    </div>

    <!-- 评分列表 -->
    <div v-loading="loading">
      <!-- 无数据提示 -->
      <div v-if="listData.length === 0" class="empty-tips">
        <el-empty description="暂无评分记录" />
      </div>

      <!-- 评分项 -->
      <div v-for="item in listData" :key="item.id" class="score-item">
        <!-- 用户信息 -->
        <div class="user-info">
          <el-avatar
            :src="
              item.userVO.userAvatar ||
              'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92fc6724dpng.png'
            "
          />
          <div class="user-detail">
            <div class="username">{{ item.userVO.userName || "匿名用户" }}</div>
            <div class="star-display">
              <el-icon
                v-for="star in 5"
                :key="star"
                :size="16"
                :color="star <= item.score ? '#ffc107' : '#e4e5e9'"
              >
                <StarFilled />
              </el-icon>
            </div>
          </div>
        </div>

        <!-- 评分时间 -->
        <div class="score-time">
          {{ formatTime(item.createTime) }}
        </div>
      </div>
    </div>

    <!-- 分页器 -->
    <el-pagination
      v-if="total > 0"
      class="pagination"
      background
      layout="prev, pager, next"
      :page-size="pageSize"
      :total="total"
      @current-change="handlePageChange"
    />
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref } from "vue";
import { StarFilled } from "@element-plus/icons-vue";
import { ElMessage } from "element-plus";
import dayjs from "dayjs";
import { listSpotScoreVoByPageUsingPost } from "@/api/spotScoreController";
import { useRoute } from "vue-router";
import eventBus from "@/utils/eventBus";

const route = useRoute();
const spotId = route.params.id as string;

// 分页参数
const pageSize = ref(10);
const currentPage = ref(1);
const total = ref(0);

// 列表数据
const listData = ref([]);
const loading = ref(false);

// 时间格式化
const formatTime = (time?: string) => {
  return time ? dayjs(time).format("YYYY-MM-DD HH:mm") : "未知时间";
};

// 获取评分列表
const fetchScoreList = async () => {
  try {
    loading.value = true;
    const res = await listSpotScoreVoByPageUsingPost({
      spotId: spotId,
      current: currentPage.value,
      pageSize: pageSize.value,
      // 按时间倒序
      sortField: "createTime",
      sortOrder: "desc"
    });

    if (res.code === 200 && res.data) {
      listData.value = res.data.records || [];
      total.value = parseInt(res.data.total) || 0;
    } else {
      ElMessage.error("获取评分列表失败");
    }
  } catch (error) {
    ElMessage.error("获取评分列表失败");
  } finally {
    loading.value = false;
  }
};

// 分页切换处理
const handlePageChange = (newPage: number) => {
  currentPage.value = newPage;
  fetchScoreList();
};

// 组件挂载时加载数据
onMounted(() => {
  fetchScoreList(); // 初始加载数据
  eventBus.on("refresh-score-list", fetchScoreList); // 监听事件
});

onUnmounted(() => {
  eventBus.off("refresh-score-list", fetchScoreList); // 组件卸载时移除监听
});
</script>

<style scoped lang="scss">
.score-list-container {
  margin-top: 20px;
  background: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.05);

  .list-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
    padding-bottom: 15px;
    border-bottom: 1px solid #ebeef5;

    h3 {
      margin: 0;
      font-size: 16px;
      color: #303133;
    }

    span {
      font-size: 14px;
      color: #909399;
    }
  }

  .score-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 15px 0;
    border-bottom: 1px solid #f0f2f5;

    &:last-child {
      border-bottom: none;
    }

    .user-info {
      display: flex;
      align-items: center;
      gap: 12px;

      .user-detail {
        .username {
          font-size: 14px;
          color: #303133;
          margin-bottom: 4px;
        }

        .star-display {
          display: flex;
          gap: 2px;
        }
      }
    }

    .score-time {
      font-size: 12px;
      color: #909399;
      white-space: nowrap;
    }
  }

  .pagination {
    margin-top: 20px;
    justify-content: flex-end;
  }

  .empty-tips {
    padding: 40px 0;
    text-align: center;
    color: #909399;
  }
}
</style>
