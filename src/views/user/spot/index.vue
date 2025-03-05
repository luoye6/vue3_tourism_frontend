<template>
  <div class="spot-page">
    <h1 style="font-size: 24px; font-weight: 700; margin-bottom: 10px">
      景点列表
    </h1>
    <SpotList :spotList="spotList" />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { listSpotVoByPageUsingPost } from "@/api/spotController";
import SpotList from "@/components/SpotList/index.vue";
import { ElMessage } from "element-plus";

// 景点列表数据
const spotList = ref([]);

// 加载景点列表
const loadSpotList = async () => {
  try {
    const res = await listSpotVoByPageUsingPost({
      current: 1,
      pageSize: 10
    });
    if (res.code === 200) {
      spotList.value = res.data.records;
    } else {
      ElMessage.error("获取景点列表失败");
    }
  } catch (error: any) {
    ElMessage.error("获取景点列表失败", error);
  }
};

// 初始化加载数据
onMounted(() => {
  loadSpotList();
});
</script>

<style scoped lang="scss">
.spot-page {
  padding: 20px;
}
</style>
