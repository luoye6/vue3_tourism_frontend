<template>
  <div class="spot-list">
    <el-row :gutter="16">
      <el-col :span="8" v-for="item in props.spotList" :key="item.id">
        <el-card style="margin-bottom: 16px">
          <el-link @click="goSpotDetail(item.id)" :underline="false">
            <el-avatar
              :src="item.spotAvatar"
              size="large"
              style="margin-right: 10px"
            />
            <div class="content">
              <div class="title">{{ item.spotName }}</div>
              <div class="description">
                {{ item.spotLocation }}
              </div>
              <div class="tags">
                <el-tag
                  v-for="tag in item.spotTagList"
                  :key="tag"
                  style="margin-right: 5px"
                >
                  {{ tag }}
                </el-tag>
              </div>
              <div class="stats">
                <div class="icon-item">
                  <el-icon :size="16">
                    <View />
                  </el-icon>
                  <span>{{ item.viewNum || 0 }}</span>
                </div>
                <div class="icon-item">
                  <el-icon :size="16">
                    <Star />
                  </el-icon>
                  <span>{{ item.favourNum || 0 }}</span>
                </div>
              </div>
            </div>
          </el-link>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from "vue";
import { useRouter } from "vue-router";
import { ElTag, ElIcon } from "element-plus";
import { View, Star } from "@element-plus/icons-vue";

let $router = useRouter();
const props = defineProps({
  spotList: {
    type: Array,
    required: true
  }
});

const goSpotDetail = (id: number) => {
  $router.push("/user/spot/detail/" + id);
};
</script>

<style scoped lang="scss">
.spot-list .content {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
}

.spot-list .title {
  font-size: 18px;
  font-weight: bold;
  margin-left: 10px;
}

.spot-list .description {
  font-size: 14px;
  margin: 10px 0 0 10px;
  color: #888;
}

.spot-list .tags {
  margin: 10px 0 0 10px;
}

.spot-list .stats {
  display: flex;
  align-items: center;
  margin: 10px 0 0 10px;
}

.spot-list .icon-item {
  display: flex;
  align-items: center;
  margin-right: 16px;
  color: #666;

  span {
    margin-left: 4px;
    font-size: 14px;
  }
}
</style>
