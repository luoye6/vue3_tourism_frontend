<template>
  <div ref="chartDom" style="width: 1200px; height: 500px"></div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from "vue";
import * as echarts from "echarts";

// 定义 props
const props = defineProps({
  data: {
    type: Array as () => { date: string; value: number }[],
    required: true
  },
  year: {
    type: String,
    required: true
  }
});

// 获取 DOM 元素
const chartDom = ref<HTMLElement | null>(null);

// 初始化图表
const initChart = () => {
  if (!chartDom.value) return;

  const myChart = echarts.init(chartDom.value);

  // 将数据转换为 ECharts 需要的格式
  const eChartsData = props.data.map((item) => [item.date, item.value]);

  const option: echarts.EChartsOption = {
    visualMap: {
      show: false, // 不显示 visualMap
      min: 0,
      max: 1,
      inRange: {
        color: ["#ffffff", "#aff0b4"] // 值为 0 时白色，值为 1 时绿色
      }
    },
    calendar: {
      range: props.year // 使用父组件传递的年份
    },
    series: {
      type: "heatmap",
      coordinateSystem: "calendar",
      data: eChartsData,
      itemStyle: {
        color: "#aff0b4" // 直接设置颜色为绿色
      }
    }
  };

  myChart.setOption(option);
};

// 监听 props.data 的变化，重新渲染图表
watch(
  () => props.data,
  () => {
    initChart();
  },
  { deep: true }
);

// 组件挂载时初始化图表
onMounted(() => {
  initChart();
});
</script>
