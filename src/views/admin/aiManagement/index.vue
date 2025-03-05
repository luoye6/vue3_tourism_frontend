<template>
  <div class="ai-message-admin">
    <!-- 查询区域 -->
    <el-card style="margin-bottom: 10px">
      <el-row :gutter="10">
        <el-col :span="6">
          <el-form-item label="用户ID">
            <el-input v-model="queryParams.userId" placeholder="请输入用户ID" />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="用户输入">
            <el-input
              v-model="queryParams.userInputText"
              placeholder="请输入用户输入"
            />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="AI 生成内容">
            <el-input
              v-model="queryParams.aiGenerateText"
              placeholder="请输入 AI 生成内容"
            />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item>
            <el-button @click="resetQuery">重置</el-button>
            <el-button type="primary" @click="getAiMessageList">查询</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-card>

    <!-- AI 消息列表表格 -->
    <el-card>
      <el-table :data="aiMessageList" style="width: 100%" :loading="loading">
        <el-table-column
          prop="id"
          label="ID"
          width="80"
          show-overflow-tooltip
        />
        <el-table-column prop="userId" label="用户ID" width="100" />
        <el-table-column
          prop="userInputText"
          label="用户输入"
          width="200"
          show-overflow-tooltip
        />
        <el-table-column
          prop="aiGenerateText"
          label="AI 生成内容"
          width="300"
          show-overflow-tooltip
        />
        <el-table-column prop="createTime" label="创建时间" width="160" />
        <el-table-column prop="updateTime" label="更新时间" width="160" />
        <el-table-column label="操作" width="200">
          <template #default="{ row }">
            <el-popconfirm
              title="你确定要删除该消息吗？"
              @confirm="deleteAiMessage(row)"
              @cancel="cancelEvent"
            >
              <template #reference>
                <el-button type="danger">删除</el-button>
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页 -->
      <el-pagination
        style="margin-top: 20px"
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

    <!-- 修改 AI 消息的对话框 -->
    <el-dialog
      title="修改 AI 消息"
      v-model="editDialogVisible"
      width="50%"
      @close="resetEditField(editFormRef)"
    >
      <el-form :model="editForm" ref="editFormRef" label-width="100px">
        <el-form-item label="用户输入" prop="userInputText">
          <el-input v-model="editForm.userInputText" />
        </el-form-item>
        <el-form-item label="AI 生成内容" prop="aiGenerateText">
          <el-input type="textarea" v-model="editForm.aiGenerateText" />
        </el-form-item>
      </el-form>
      <span class="dialog-footer">
        <slot name="footer">
          <el-button @click="resetEditField(editFormRef)">取消</el-button>
          <el-button type="primary" @click="editAiMessage">确定</el-button>
        </slot>
      </span>
    </el-dialog>

    <!-- 添加 AI 消息的对话框 -->
    <el-dialog
      title="添加 AI 消息"
      v-model="addDialogVisible"
      width="50%"
      @close="addDialogClosed"
    >
      <el-form :model="addForm" ref="addFormRef" label-width="100px">
        <el-form-item label="用户ID" prop="userId">
          <el-input v-model="addForm.userId" />
        </el-form-item>
        <el-form-item label="用户输入" prop="userInputText">
          <el-input v-model="addForm.userInputText" />
        </el-form-item>
        <el-form-item label="AI 生成内容" prop="aiGenerateText">
          <el-input type="textarea" v-model="addForm.aiGenerateText" />
        </el-form-item>
      </el-form>
      <span class="dialog-footer" style="margin-left: 100px">
        <slot name="footer">
          <el-button @click="addDialogVisible = false">取消</el-button>
          <el-button type="primary" @click="addAiMessage">添加</el-button>
        </slot>
      </span>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import {
  ElButton,
  ElDialog,
  ElForm,
  ElFormItem,
  ElInput,
  ElMessage,
  FormInstance
} from "element-plus";
import {
  addUserAiMessageUsingPost,
  deleteUserAiMessageUsingPost,
  listUserAiMessageVoByPageUsingPost,
  updateUserAiMessageUsingPost
} from "@/api/userAiMessageController";

// 查询参数
const queryParams = ref({
  userId: "",
  userInputText: "",
  aiGenerateText: ""
});

// AI 消息列表
const aiMessageList = ref([]);
const loading = ref<boolean>(false);

// 分页配置
const paginationConfig = ref({
  pageSize: 10,
  total: 0,
  current: 1
});

// 对话框状态
const editDialogVisible = ref(false);
const addDialogVisible = ref(false);

// 表单引用
const editFormRef = ref<FormInstance>();
const addFormRef = ref<FormInstance>();

// 编辑表单数据
const editForm = ref({
  id: 0,
  userInputText: "",
  aiGenerateText: ""
});

// 添加表单数据
const addForm = ref({
  userId: "",
  userInputText: "",
  aiGenerateText: ""
});

// 获取 AI 消息列表
const getAiMessageList = async () => {
  loading.value = true;
  try {
    const res = await listUserAiMessageVoByPageUsingPost({
      ...queryParams.value,
      current: paginationConfig.value.current,
      pageSize: paginationConfig.value.pageSize
    });
    if (res.code === 200) {
      aiMessageList.value = res.data.records;
      paginationConfig.value.total = parseInt(res.data.total);
    } else {
      ElMessage.error("获取 AI 消息列表失败");
    }
  } catch (error) {
    ElMessage.error("获取 AI 消息列表失败");
  } finally {
    loading.value = false;
  }
};

// 重置查询条件
const resetQuery = () => {
  queryParams.value = {
    userId: "",
    userInputText: "",
    aiGenerateText: ""
  };
  getAiMessageList();
};

// 修改 AI 消息
const editAiMessage = async () => {
  try {
    const res = await updateUserAiMessageUsingPost(editForm.value);
    if (res.code === 200) {
      ElMessage.success("修改 AI 消息成功");
      editDialogVisible.value = false;
      await getAiMessageList();
    } else {
      ElMessage.error("修改 AI 消息失败");
    }
  } catch (error) {
    ElMessage.error("修改 AI 消息失败");
  }
};

// 添加 AI 消息
const addAiMessage = async () => {
  try {
    const res = await addUserAiMessageUsingPost(addForm.value);
    if (res.code === 200) {
      ElMessage.success("添加 AI 消息成功");
      addDialogVisible.value = false;
      await getAiMessageList();
    } else {
      ElMessage.error("添加 AI 消息失败");
    }
  } catch (error) {
    ElMessage.error("添加 AI 消息失败");
  }
};

// 删除 AI 消息
const deleteAiMessage = async (row) => {
  try {
    const res = await deleteUserAiMessageUsingPost({ id: row.id });
    if (res.code === 200) {
      ElMessage.success("删除 AI 消息成功");
      await getAiMessageList();
    } else {
      ElMessage.error("删除 AI 消息失败");
    }
  } catch (error) {
    ElMessage.error("删除 AI 消息失败");
  }
};

// 关闭添加对话框
const addDialogClosed = () => {
  addForm.value = { userId: "", userInputText: "", aiGenerateText: "" };
};

// 关闭修改对话框
const resetEditField = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  editDialogVisible.value = false;
  formEl.resetFields();
};

// 分页处理
const handleSizeChange = (size: number) => {
  paginationConfig.value.pageSize = size;
  getAiMessageList();
};

const handleCurrentChange = (page: number) => {
  paginationConfig.value.current = page;
  getAiMessageList();
};

// 取消删除
const cancelEvent = () => {
  ElMessage.success("取消删除成功");
};

// 初始化加载 AI 消息列表
onMounted(() => {
  getAiMessageList();
});
</script>

<style scoped>
.ai-message-admin {
  padding: 20px;
}
</style>
