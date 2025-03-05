<template>
  <div class="route-list">
    <el-row :gutter="16">
      <el-col :span="8" v-for="item in routeList" :key="item.id">
        <el-card style="margin-bottom: 16px">
          <el-link @click="goRouteDetail(item.id)" :underline="false">
            <el-avatar
              :src="item.spotRouteAvatar"
              size="large"
              style="margin-right: 10px"
            />
            <div class="content">
              <div class="title">{{ item.spotRouteDescription }}</div>
              <div class="description">
                <div>创建时间: {{ item.createTime }}</div>
                <div>管理员ID: {{ item.adminId }}</div>
              </div>
            </div>
          </el-link>
        </el-card>
      </el-col>
    </el-row>

    <!-- 分页组件 -->
    <el-pagination
      style="margin-top: 20px; text-align: center"
      background
      layout="prev, pager, next"
      :total="total"
      :page-size="pageSize"
      :current-page="currentPage"
      @current-change="handlePageChange"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { listSpotRouteVoByPageUsingPost } from "@/api/spotRouteController";
import { ElMessage } from "element-plus";

const $router = useRouter();

// 分页相关数据
const currentPage = ref(1);
const pageSize = ref(10);
const total = ref(0);
const routeList = ref([]);

// 获取景点路线列表
const fetchRouteList = async () => {
  try {
    const response = await listSpotRouteVoByPageUsingPost({
      current: currentPage.value,
      pageSize: pageSize.value
    });
    routeList.value = response.data.records;
    total.value = response.data.total;
  } catch (error) {
    ElMessage.error("Failed to fetch route list:", error);
  }
};

// 分页切换
const handlePageChange = (page: number) => {
  currentPage.value = page;
  fetchRouteList();
};

// 跳转到路线详情页
const goRouteDetail = (id: number) => {
  $router.push(`/user/spotRoute/detail/${id}`);
};

// 组件挂载时加载数据
onMounted(() => {
  fetchRouteList();
});
</script>

<style scoped lang="scss">
.route-list .content {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
}

.route-list .title {
  font-size: 18px;
  font-weight: bold;
  margin-left: 10px;
}

.route-list .description {
  font-size: 14px;
  margin: 10px 0 0 10px;
  color: #888;

  div {
    margin-bottom: 5px; // 增加行间距
  }
}
</style>
