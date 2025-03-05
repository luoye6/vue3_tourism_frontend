import { defineStore } from "pinia";
import { ref } from "vue";
import { listSpotScoreVoByPageUsingPost } from "@/api/spotScoreController";
import { ElMessage } from "element-plus";

export const useSpotScoreStore = defineStore("spotScore", () => {
  const scoreList = ref([]);
  const total = ref(0);
  const loading = ref(false);

  const fetchScoreList = async (spotId, currentPage, pageSize) => {
    try {
      loading.value = true;
      const res: any = await listSpotScoreVoByPageUsingPost({
        spotId,
        current: currentPage,
        pageSize,
        sortField: "createTime",
        sortOrder: "desc"
      });
      if (res.code === 200 && res.data) {
        scoreList.value = res.data.records || [];
        total.value = parseInt(res.data.total) || 0;
      }
    } catch (error: any) {
      ElMessage.error("获取评分列表失败", error);
    } finally {
      loading.value = false;
    }
  };

  return { scoreList, total, loading, fetchScoreList };
});
