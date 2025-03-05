<template>
  <div class="big">
    <el-card class="card-container">
      <div class="backgroundImg">
        <img src="@/assets/images/animeboySkyMin.jpg" alt="" />
      </div>

      <vue-danmaku
        class="danmaku"
        ref="danmaku"
        style="height: 700px; width: 1600px"
        v-model:danmus="danmus"
        :top="25"
        useSlot
        loop
        :speeds="speeds"
        :channels="12"
      >
        <template v-slot:dm="{ danmu }">
          <div>
            <span class="bullet-item" :style="{ color: getRandomColor() }">
              <img
                :src="danmu.userAvatar"
                alt="用户头像"
                style="
                  width: 30px;
                  height: 30px;
                  border-radius: 50%;
                  margin-right: 10px;
                "
              />
              {{ danmu.message }}
            </span>
          </div>
        </template>
      </vue-danmaku>

      <el-card class="buts">
        <h3 style="font-size: 20px; font-weight: 700; margin-bottom: 5px">
          弹幕玩法
        </h3>
        <el-button round style="margin-bottom: 10px" @click="dplay()"
          >继续
        </el-button>
        <el-button
          type="primary"
          round
          style="margin-bottom: 10px"
          @click="pause()"
        >
          暂停
        </el-button>
        <br />
        <el-button
          type="success"
          round
          style="margin-bottom: 10px"
          @click="show()"
          >显示
        </el-button>
        <el-button type="info" round style="margin-bottom: 10px" @click="hide()"
          >隐藏
        </el-button>
        <br />
        <el-button
          type="warning"
          round
          style="margin-bottom: 10px"
          @click="addspeeds()"
        >
          加速
        </el-button>
        <el-button
          type="danger"
          round
          style="margin-bottom: 10px"
          @click="jianspeeds()"
        >
          减速
        </el-button>
      </el-card>
      <!-- 留言输入框 -->
      <el-card shadow="hover" class="input-card">
        <el-row>
          <el-col :span="22" :xs="12">
            <el-input
              v-model="comment"
              type="textarea"
              autosize
              placeholder="请输入您的祝福留言,切勿输入无意义留言"
              maxlength="50"
              show-word-limit
            ></el-input>
          </el-col>
          <el-col :span="2" :xs="12">
            <el-button
              type="primary"
              style="margin-left: 20px; z-index: 10; position: relative"
              @click="addDanmu"
              :disabled="!comment.trim()"
            >
              发送弹幕
            </el-button>
          </el-col>
        </el-row>
      </el-card>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import vueDanmaku from "vue3-danmaku";
import { onMounted, ref } from "vue";
import {
  addBarrageUsingPost,
  listBarrageVoByPageUsingPost
} from "@/api/barrageController";
import { ElMessage } from "element-plus";
import { GET_AVATAR } from "@/utils/token";

const colorList = ref([
  "rgb(204,255,255)",
  "white",
  "rgb(204,255,204)",
  "white",
  "rgb(0,255,255)",
  "white",
  "rgb(255,204,255)",
  "pink"
]);

// 生成随机颜色的函数
function getRandomColor() {
  const color = colorList.value[Math.floor(Math.random() * 8)];
  return color;
}

//弹幕速度
const speeds = ref(150);
// 留言内容
const comment = ref("");
//内容
const danmus = ref([]);
// 添加弹幕
const addDanmu = async () => {
  if (comment.value.trim()) {
    // 将留言添加到弹幕列表
    const res = await addBarrageUsingPost({
      message: comment.value.trim(),
      userAvatar: GET_AVATAR()
    });
    if (res.code !== 200) {
      ElMessage.error({
        message: "添加弹幕失败",
        duration: 1000
      });
    } else {
      ElMessage.success({
        message: "添加弹幕成功",
        duration: 1000
      });
    }
    await getBarrageList();
    comment.value = ""; // 清空输入框
    danmaku.value.play(); // 继续播放弹幕
  }
};
const getBarrageList = async () => {
  const res = await listBarrageVoByPageUsingPost({
    pageSize: 100,
    current: 1
  });
  if (res.code !== 200) {
    ElMessage.error({
      message: "获取弹幕列表失败",
      duration: 1000
    });
  }
  danmus.value = res.data.records;
  ElMessage.success({
    message: "获取弹幕列表成功",
    duration: 1000
  });
};
onMounted(() => {
  getBarrageList();
});
//弹幕组件
const danmaku = ref();
//继续播放弹幕
const dplay = () => {
  danmaku.value.play();
};
//暂停播放弹幕
const pause = () => {
  danmaku.value.pause();
};
//显示弹幕
const show = () => {
  danmaku.value.show();
};
//隐藏弹幕
const hide = () => {
  danmaku.value.hide();
};
//弹幕加速
const addspeeds = () => {
  speeds.value += 10;
};
//弹幕减速
const jianspeeds = () => {
  speeds.value -= 10;
};
</script>

<style scoped lang="scss">
.big {
  position: relative;
}

.card-container {
  position: relative;
  padding: 20px; /* 卡片的内边距 */
  overflow: hidden; /* 防止背景图溢出 */
}

.backgroundImg {
  position: absolute;
  top: 10px; /* 背景图与卡片上边的间距 */
  left: 10px; /* 背景图与卡片左边的间距 */
  right: 10px; /* 背景图与卡片右边的间距 */
  bottom: 10px; /* 背景图与卡片下边的间距 */
  z-index: 0; /* 确保背景图在弹幕和按钮之下 */

  img {
    height: 100%;
    width: 100%;
    opacity: 0.7;
    object-fit: cover; /* 确保图片覆盖整个区域 */
  }
}

.buts {
  position: absolute;
  opacity: 0.5;
  bottom: 26%;
  left: 40px;
  text-align: center;
  z-index: 1; /* 确保按钮在背景图之上 */
}

.input-card {
  opacity: 0.8;
  margin-bottom: 20px;
  position: relative; /* 确保按钮在卡片内正确定位 */
  z-index: 10; /* 确保输入框和按钮在弹幕之上 */
}

.bullet-item {
  white-space: nowrap;
  background-color: rgba(0, 0, 0, 0.5);
  border-radius: 30px;
  height: 30px;
  font-size: 16px;
  color: #ffffff;
  line-height: 30px;
  padding-right: 20px;
  display: flex;
}
</style>
