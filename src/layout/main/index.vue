<template>
  <!-- 路由组件出口的位置 -->
  <router-view v-slot="{ Component }">
    <transition name="fade">
      <!-- 渲染layout一级路由组件的子路由 -->
      <component :is="Component" v-if="flag" />
    </transition>
  </router-view>
  <div class="footer">
    <p>
      <span style="margin: 0px 10px">
        <i class="iconfont icon-gitee" style="color: #d81e06"></i>
        <a
          href="https://gitee.com/falle22222n-leaves/vue_-book-manage-system"
          target="_blank"
        >
          支持项目</a
        ></span
      >
      <span style="margin: 0px 10px">
        <i class="iconfont icon-weixin"></i>
        <el-popover placement="top-start" :width="150" trigger="hover">
          <template #reference> 联系作者 </template>
          <template #default>
            <img
              src="https://pic.yupi.icu/5563/202312061315664.png"
              style="height: 100px; width: 100px"
            />
          </template>
        </el-popover>
        <!--        <a href="https://pic.yupi.icu/5563/image-20231030110224977.png"-->
        <!--          ></a-->
        <!--        >-->
      </span>
      <span style="margin: 0px 10px">
        <i class="iconfont icon-jinggao"></i>
        <a href="https://gitee.com/falle22222n-leaves/vue_-book-manage-system">
          免责声明</a
        >
      </span>
    </p>
    <p>
      <i class="iconfont icon-banquan" style="font-size: 18px"></i>
      2025 程序员小白条出品 |
      <a href="https://beian.miit.gov.cn/#/Integrated/index"
        >浙ICP备2023044565号-1</a
      >
      |<a href="https://beian.mps.gov.cn/#/query/webSearch">
        <img
          src="../../assets/images/logoPolice.png"
          style="height: 16px; width: 16px; margin: 5px 0px 0px 5px"
        />
        浙公网安备33028202001002号
      </a>
    </p>
  </div>
</template>

<script setup lang="ts">
import { watch, ref, nextTick } from "vue";
import useLayOutSettingStore from "@/store/modules/setting";

let layOutSettingStore = useLayOutSettingStore();

//控制当前组件是否销毁重建
let flag = ref(true);

//监听仓库内部数据是否发生变化,如果发生变化，说明用户点击过刷新按钮
watch(
  () => layOutSettingStore.refsh,
  () => {
    //点击刷新按钮:路由组件销毁
    flag.value = false;
    nextTick(() => {
      flag.value = true;
    });
  }
);
</script>
<script lang="ts">
export default {
  name: "Main"
};
</script>

<style scoped lang="scss">
.fade-enter-from {
  opacity: 0;
  transform: scale(0);
}

.fade-enter-active {
  transition: all 0.3s;
}

.fade-enter-to {
  opacity: 1;
  transform: scale(1);
}

.footer {
  width: calc(100% - $base-menu-width);
  margin: 10px 0px;
  text-align: center;
}

a {
  text-decoration: none;
  color: inherit;
}
</style>
