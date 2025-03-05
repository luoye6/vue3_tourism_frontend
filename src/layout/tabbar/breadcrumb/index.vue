<template>
  <!-- 顶部左侧静态 -->
  <el-icon style="margin-right: 10px" @click="changeIcon">
    <component :is="LayOutSettingStore.fold ? 'Fold' : 'Expand'"></component>
  </el-icon>
  <!-- 顶部左侧面包屑 -->
  <el-breadcrumb separator-icon="ArrowRight">
    <!-- 面包动态展示路由名字与标题 -->
    <el-breadcrumb-item
      v-for="(item, index) in $route.matched"
      :key="index"
      v-show="item.meta.title"
      :to="item.path"
    >
      <!-- 图标 -->
      <el-icon>
        <component :is="item.meta.icon"></component>
      </el-icon>
      <!-- 面包屑展示匹配路由的标题 -->
      <span>{{ item.meta.title }}</span>
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script setup lang="ts">
// 引入路由对象
import { useRoute } from "vue-router";
import useLayOutSettingStore from "@/store/modules/setting";

let LayOutSettingStore = useLayOutSettingStore();
// 获取路由对象实例
let $route = useRoute();
const changeIcon = () => {
  LayOutSettingStore.fold = !LayOutSettingStore.fold;
};
</script>
<script lang="ts">
export default {
  name: "Breadcrumb"
};
</script>
<style scoped lang="scss"></style>
