<template>
  <div class="block text-center">
    <el-carousel height="700px" motion-blur>
      <el-carousel-item v-for="(item, index) in images" :key="index">
        <img
          :src="item"
          alt="轮播图"
          style="width: 100%; height: 100%; object-fit: cover"
        />
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script setup>
const images = [
  "https://pic.yupi.icu/5563/202502241324131.png",
  "https://pic.yupi.icu/5563/202502241324758.png",
  "https://pic.yupi.icu/5563/202502241324627.jpg",
  "https://pic.yupi.icu/5563/202502241320811.jpg"
];
</script>

<style scoped lang="scss">
.block {
  margin: 0 auto;
  max-width: 1200px; /* 根据需要调整轮播图宽度 */
}

.el-carousel {
  border-radius: 8px; /* 添加圆角效果 */
  overflow: hidden; /* 确保图片不超出边界 */
}
</style>
