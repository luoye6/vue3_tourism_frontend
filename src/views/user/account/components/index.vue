<template>
  <div class="question-table">
    <el-card style="margin-bottom: 10px">
      <el-row :gutter="10">
        <el-col :span="8">
          <el-form-item label="标题">
            <el-input v-model="title" placeholder="请输入标题" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="标签">
            <el-input-tag
              v-model="typeList"
              placeholder="请选择题目标签"
              :max="4"
            />
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item>
            <el-button @click="reset">重置</el-button>
            <el-button type="primary" @click="getQuestionVoListByPage"
              >查询
            </el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-card>
    <el-card>
      <el-table :data="questionList" style="width: 100%; margin-bottom: 10px">
        <el-table-column prop="title" label="题目">
          <template #default="scope">
            <el-link
              type="primary"
              :underline="false"
              @click="goQuestionDetail(scope.row.id)"
              >{{ scope.row.title }}
            </el-link>
          </template>
        </el-table-column>
        <el-table-column prop="difficulty" label="难度">
          <template #default="{ row }">
            <el-text type="primary" v-if="row.difficulty == 'easy'" size="large"
              >简单
            </el-text>
            <el-text
              type="warning"
              v-if="row.difficulty == 'medium'"
              size="large"
              >中等
            </el-text>
            <el-text type="danger" v-if="row.difficulty == 'hard'" size="large"
              >困难
            </el-text>
          </template>
        </el-table-column>
        <el-table-column prop="tags" label="标签">
          <template #default="scope">
            <!-- 遍历 tagList 数组 -->
            <el-tag
              v-for="(tag, index) in scope.row.tags"
              :key="index"
              type="success"
              style="margin-right: 5px"
            >
              {{ tag }}
            </el-tag>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        background
        layout="total, sizes, prev, pager, next, jumper"
        :page-sizes="[5, 10, 15, 20]"
        :current-page="paginationConfig.current"
        :total="paginationConfig.total"
        :page-size="paginationConfig.pageSize"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { defineProps, onMounted, ref } from "vue";
import { ElMessage } from "element-plus";
import { useRouter } from "vue-router";
import { listMyFavourQuestionVoByPageUsingPost } from "@/api/userQuestionFavoritesController";

let $router = useRouter();
// do not use same name with ref
const title = ref<string>();
const typeList = ref<string[]>();
const reset = () => {
  title.value = "";
  typeList.value = [];
  questionBankId.value = "";
};
const props = defineProps({
  defaultQuestionList: {
    type: Array,
    default: () => []
  },
  defaultTotal: {
    type: Number,
    default: 0
  },
  defaultSearchParams: {
    type: Object,
    default: () => ({})
  }
});

const questionList = ref([]);
const paginationConfig = ref({
  pageSize: 10,
  total: props.defaultTotal,
  current: 1
});

const questionBankId = ref("");
const handleSizeChange = (val: number) => {
  paginationConfig.value.pageSize = val;
  getQuestionVoListByPage();
};
const handleCurrentChange = (val: number) => {
  paginationConfig.value.current = val;
  getQuestionVoListByPage();
};
const goQuestionDetail = (id: number) => {
  $router.push("/user/question/" + id);
};
onMounted(() => {
  getQuestionVoListByPage();
});
const getQuestionVoListByPage = async () => {
  const { data, code } = await listMyFavourQuestionVoByPageUsingPost({
    pageSize: paginationConfig.value.pageSize,
    current: paginationConfig.value.current,
    title: title.value,
    tagList: typeList.value
  });
  if (code !== 200) {
    return ElMessage.error("获取题库列表页失败");
  }
  // 处理 tags 数据
  questionList.value = data.records.map((item) => {
    return {
      ...item,
      tags: JSON.parse(item.tags)
    };
  });
  paginationConfig.value.total = parseInt(data?.total) ?? 0;
};
</script>

<style scoped>
.question-table {
  margin-top: 20px;
}
</style>
