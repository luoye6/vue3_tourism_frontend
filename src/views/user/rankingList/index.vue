<template>
  <div class="rank-container">
    <!-- ECharts 图表 -->
    <div ref="chartRef" class="chart-container"></div>

    <!-- ElementPlus 表格展示排行榜 -->
    <el-table :data="rankList" style="width: 900px" stripe border>
      <el-table-column type="index" label="排行" width="100" />
      <el-table-column prop="spotName" label="景点名称" width="150" />
      <el-table-column prop="spotLocation" label="景点坐标" width="200" />
      <el-table-column prop="viewNum" label="浏览量" width="125" />
      <el-table-column prop="favourNum" label="收藏量" width="125" />
      <el-table-column prop="createTime" label="创建时间" width="200" />
    </el-table>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import * as echarts from "echarts";
import { ElMessage, ElTable, ElTableColumn } from "element-plus";
import { getTop10SpotsByViewsUsingGet } from "@/api/spotController";

// 排行榜数据
const rankList = ref([]);

// ECharts 图表 DOM 引用
const chartRef = ref(null);

// 获取排行榜数据
const fetchRankList = async () => {
  try {
    const res = await getTop10SpotsByViewsUsingGet();
    rankList.value = res.data;

    // 渲染 ECharts 饼图
    renderChart(res.data);
  } catch (error) {
    ElMessage.error("获取排行榜数据失败:", error);
  }
};

// 渲染 ECharts 饼图
const renderChart = (data) => {
  const chart = echarts.init(chartRef.value);

  const pieData = data.map((item) => ({
    name:
      item.spotName.length > 10
        ? item.spotName.slice(0, 10) + "..."
        : item.spotName,
    value: item.viewNum
  }));

  const option = {
    title: {
      text: "热门景点浏览量分布",
      left: "center"
    },
    tooltip: {
      trigger: "item",
      formatter: "{b}: {c} ({d}%)" // 显示景点名称、浏览量、占比
    },
    legend: {
      orient: "vertical",
      left: "left"
    },
    series: [
      {
        name: "浏览量",
        type: "pie",
        radius: "55%", // 饼图大小
        center: ["50%", "50%"], // 居中显示
        data: pieData,
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: "rgba(0, 0, 0, 0.5)"
          }
        }
      }
    ]
  };

  chart.setOption(option);
};

// 页面加载时获取数据
onMounted(() => {
  fetchRankList();
});
</script>

<style scoped>
.rank-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

.chart-container {
  width: 100%;
  height: 500px;
  margin-bottom: 20px;
}

h1 {
  text-align: center;
  margin-bottom: 20px;
  font-size: 24px;
  color: #333;
}
</style>
