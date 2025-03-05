<template>
  <div class="notice-container">
    <div class="header">
      <div class="scroll-text" ref="scrollText">
        <i class="el-icon-s-opportunity"></i> {{ text }}
        <i class="el-icon-s-opportunity"></i>
      </div>
    </div>
    <div class="banner">
      <div class="banner-header"><p>近期旅游公告</p></div>
      <div
        class="banner-main"
        v-loading="loading"
        element-loading-text="拼命加载中"
        element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(0, 0, 0, 0.8)"
      >
        <div class="banner-main-item" v-for="item in noticeList" :key="item.id">
          <div class="banner-main-item-header">
            <p>{{ item.noticeTitle }} {{ item.createTime }}</p>
          </div>
          <div class="banner-main-item-main">
            <p>{{ item.noticeContent }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { listNoticeVoByPageUsingPost } from "@/api/noticeController";
import { ElMessage } from "element-plus";

// 初始化数据
const text = ref(
  "智能 AI 旅游推荐平台公告栏,记得查收公告呀!小项目请勿恶意攻击,谢谢"
);
const noticeList = ref([]);
const loading = ref(true);
// 获取公告数据
const getNoticeList = async () => {
  loading.value = true;
  try {
    const res = await listNoticeVoByPageUsingPost({
      current: 1,
      pageSize: 15
    });
    noticeList.value = res.data.records;
    loading.value = false;
  } catch (error) {
    loading.value = false;
    ElMessage.error("获取公告列表失败，" + error.message);
  }
};
// 页面加载时获取数据
onMounted(() => {
  getNoticeList();
  const containerWidth = document.querySelector(".scroll-text")?.offsetWidth;
  const textWidth = document.querySelector(".scroll-text")?.scrollWidth;

  // 如果文本宽度大于容器宽度，则启动动画
  if (textWidth && textWidth > containerWidth) {
    document
      .querySelector(".scroll-text")
      ?.style.setProperty("animation", "scroll 10s linear infinite");
  }
});
</script>

<style scoped lang="scss">
.notice-container {
  overflow: hidden;
}

.header {
  width: 100%;
  height: 50px;
  background-color: rgb(242, 242, 242);
  border-radius: 15px;
  color: black;
  text-align: center;
  line-height: 50px;
  font-size: 24px;
}

.scroll-text {
  white-space: nowrap;
  animation: scroll 10s linear infinite;
}

@keyframes scroll {
  from {
    transform: translateX(100%);
  }
  to {
    transform: translateX(-100%);
  }
}

.banner {
  width: 100%;
  height: 100%;
  margin-top: 30px;
}

.banner-header {
  width: 100%;
  height: 80px;

  p {
    color: black;
    font-size: 30px;
    text-align: center;
    line-height: 80px;
  }
}

.banner-main {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: skyblue;
}

.banner-main-item:nth-child(n + 2) {
  margin-top: 30px;
}

.banner-main-item:nth-child(n + 2) {
  background-color: #d1eeee;
}

.banner-main-item:nth-child(1) {
  background-color: pink;
}

.banner-main-item {
  width: 80%;
  height: 120px;

  .banner-main-item-header {
    width: 100%;
    height: 50px;
    border: 1px solid skyblue;
    box-sizing: border-box;

    p {
      color: rgb(175, 129, 143);
      text-align: center;
      line-height: 50px;
      font-size: 16px;
    }
  }

  .banner-main-item-main {
    width: 100%;
    height: 70px;
    background-color: white;
    border: 1px solid skyblue;
    box-sizing: border-box;
    text-align: center;

    p {
      line-height: 70px;
    }
  }
}
</style>
