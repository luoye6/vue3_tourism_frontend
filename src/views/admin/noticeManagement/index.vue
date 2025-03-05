<template>
  <div class="search_container">
    <el-card shadow="always">
      <!-- 搜索内容和导出区域 -->
      <el-row style="margin-bottom: 20px">
        <el-col :span="4">
          <el-button type="primary" @click="showAddDialog()" :icon="Promotion">
            发布新公告
          </el-button>
        </el-col>
      </el-row>
      <!-- 表格区域 -->
      <el-table
        :data="tableData"
        border
        style="width: 100%"
        stripe
        v-loading="loading"
        element-loading-text="拼命加载中"
        element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(0, 0, 0, 0.8)"
      >
        <el-table-column prop="id" label="ID"></el-table-column>
        <el-table-column prop="noticeTitle" label="标题"></el-table-column>
        <el-table-column prop="noticeContent" label="公告"></el-table-column>
        <el-table-column prop="createTime" label="发布日期"></el-table-column>
        <el-table-column label="操作">
          <template #default="{ row }">
            <el-button type="primary" @click="showEditDialog(row.id)">
              修改
            </el-button>
            <el-popconfirm
              title="你确定要删除该公告吗？"
              @confirm="deleteNotice(row)"
              @cancel="cancelEvent"
            >
              <template #reference>
                <el-button type="danger"> 删除</el-button>
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页查询区域 -->
      <el-pagination
        style="margin-top: 20px"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pagination.currentPage"
        :page-sizes="[1, 2, 3, 4, 5]"
        :page-size="pagination.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      />
      <!-- 修改公告的对话框 -->
      <el-dialog
        title="修改公告"
        v-model="editDialogVisible"
        width="50%"
        @close="resetEditField(editFormRef)"
      >
        <el-form
          :model="editForm"
          ref="editFormRef"
          :rules="editFormRules"
          label-width="100px"
        >
          <el-form-item label="公告标题" prop="noticeTitle">
            <el-input v-model="editForm.noticeTitle"></el-input>
          </el-form-item>
          <el-form-item label="公告内容" prop="noticeContent">
            <el-input
              type="textarea"
              v-model="editForm.noticeContent"
            ></el-input>
          </el-form-item>
        </el-form>
        <span class="dialog-footer">
          <slot name="footer">
            <el-button @click="resetEditField(editFormRef)">取 消</el-button>
            <el-button type="primary" @click="editNoticeById">确 定</el-button>
          </slot>
        </span>
      </el-dialog>
      <!-- 添加公告的对话框 -->
      <el-dialog
        title="添加公告"
        v-model="addDialogVisible"
        width="50%"
        @close="addDialogClosed"
      >
        <el-form
          :model="addForm"
          ref="addFormRef"
          :rules="addFormRules"
          label-width="100px"
        >
          <el-form-item label="公告标题" prop="noticeTitle">
            <el-input v-model="addForm.noticeTitle"></el-input>
          </el-form-item>
          <el-form-item label="公告内容" prop="noticeContent">
            <el-input
              type="textarea"
              v-model="addForm.noticeContent"
            ></el-input>
          </el-form-item>
        </el-form>
        <span class="dialog-footer">
          <slot name="footer">
            <el-button @click="addDialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="addNotice">添加公告</el-button>
          </slot>
        </span>
      </el-dialog>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { Promotion } from "@element-plus/icons-vue";
import { onMounted, ref } from "vue";
import {
  ElButton,
  ElCol,
  ElDialog,
  ElForm,
  ElFormItem,
  ElInput,
  ElMessage,
  ElPagination,
  ElRow,
  ElTable,
  ElTableColumn,
  FormInstance
} from "element-plus";
import {
  addNoticeUsingPost,
  deleteNoticeUsingPost,
  getNoticeVoByIdUsingGet,
  listNoticeByPageUsingPost,
  updateNoticeUsingPost
} from "@/api/noticeController";
import { GET_ID } from "@/utils/token";

const tableData = ref([]);
const editDialogVisible = ref(false);
const addDialogVisible = ref(false);
const editForm = ref({
  id: 0,
  noticeTitle: "",
  noticeContent: ""
});
const addForm = ref({
  noticeTitle: "",
  noticeContent: "",
  noticeAdminId: 0
});
const pagination = ref({
  currentPage: 1,
  pageSize: 5,
  total: 0
});
const editFormRef = ref<FormInstance>();
const total = ref(0);
const loading = ref(true);
const editFormRules = {
  noticeTitle: [
    { required: true, message: "请输入公告标题", trigger: "blur" },
    { min: 6, max: 30, message: "长度在6到30个字符", trigger: "blur" }
  ],
  noticeContent: [
    { required: true, message: "请输入公告内容", trigger: "blur" }
  ]
};
const addFormRules = {
  noticeTitle: [
    { required: true, message: "请输入公告标题", trigger: "blur" },
    { min: 6, max: 30, message: "长度在6到30个字符", trigger: "blur" }
  ],
  noticeContent: [
    { required: true, message: "请输入公告内容", trigger: "blur" }
  ]
};

// 获取公告列表
const getNoticeList = async () => {
  loading.value = true;
  try {
    const res = await listNoticeByPageUsingPost({
      current: pagination.value.currentPage,
      pageSize: pagination.value.pageSize
    });
    if (res.code !== 200) {
      total.value = 0;
      loading.value = false;
      ElMessage.error({
        duration: 1000,
        message: "获取公告列表失败"
      });
      return;
    }
    tableData.value = res.data.records;
    total.value = parseInt(res.data.total);
    loading.value = false;
  } catch (error) {
    ElMessage.error("获取数据失败");
    loading.value = false;
  }
};

// 显示修改公告的对话框
const showEditDialog = async (id: number) => {
  loading.value = true;
  try {
    const res = await getNoticeVoByIdUsingGet({
      id
    });
    if (res.code !== 200) {
      return ElMessage.error({
        duration: 1000,
        message: "获取该公告信息失败"
      });
    }
    editForm.value.id = id;
    editForm.value.noticeContent = res.data.noticeContent;
    editForm.value.noticeTitle = res.data.noticeTitle;
    editDialogVisible.value = true;
  } catch (error) {
    ElMessage.error("获取公告数据失败");
  } finally {
    loading.value = false;
  }
};

// 关闭修改对话框
const resetEditField = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  editDialogVisible.value = false;
  formEl.resetFields();
};

// 修改公告
const editNoticeById = async () => {
  try {
    const res = await updateNoticeUsingPost({
      id: editForm.value.id,
      noticeContent: editForm.value.noticeContent,
      noticeTitle: editForm.value.noticeTitle,
      noticeAdminId: parseInt(GET_ID() as string)
    });
    if (res.code !== 200) {
      ElMessage.error({
        duration: 1000,
        message: "修改公告失败"
      });
      return;
    }
    editDialogVisible.value = false;
    ElMessage.success({
      duration: 1000,
      message: "修改公告成功"
    });
    editForm.value.noticeTitle = "";
    editForm.value.noticeContent = "";
    await getNoticeList();
  } catch (error) {
    ElMessage.error("修改公告失败");
  }
};

// 删除公告
const deleteNotice = async (row) => {
  try {
    const res = await deleteNoticeUsingPost({
      id: row.id
    });
    if (res.code === 200) {
      ElMessage.success("删除成功");
      await getNoticeList();
    } else {
      ElMessage.error("删除失败");
    }
  } catch (error: any) {
    ElMessage.error("删除失败，" + error.message);
  }
};
// 显示添加公告的对话框
const showAddDialog = () => {
  addDialogVisible.value = true;
};

// 关闭添加对话框
const addDialogClosed = () => {
  addForm.value = { noticeTitle: "", noticeContent: "", noticeAdminId: 0 };
};

// 添加公告
const addNotice = async () => {
  try {
    addForm.value.noticeAdminId = parseInt(GET_ID() as string);
    const res = await addNoticeUsingPost({ ...addForm.value });
    if (res.code !== 200) {
      return ElMessage.error({
        duration: 1000,
        message: "添加公告失败"
      });
    }
    ElMessage.success({
      duration: 1000,
      message: "添加公告成功"
    });
    addDialogVisible.value = false;
    await getNoticeList();
  } catch (error) {
    ElMessage.error("添加公告失败");
  }
};

// 分页变化
const handleSizeChange = (val) => {
  pagination.value.pageSize = val;
  getNoticeList();
};

const handleCurrentChange = (val) => {
  pagination.value.currentPage = val;
  getNoticeList();
};
const cancelEvent = () => {
  ElMessage.success({
    duration: 1000,
    message: "取消删除成功"
  });
};
// 页面挂载时初始化
onMounted(() => {
  getNoticeList();
});
</script>

<style scoped>
.search_container {
  padding: 20px;
}
</style>
