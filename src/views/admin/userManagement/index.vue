<template>
  <div>
    <el-card style="margin-bottom: 20px">
      <el-row :gutter="10">
        <el-col :span="8">
          <el-form-item label="用户名">
            <el-input
              v-model="searchParams.userName"
              placeholder="请输入用户名"
            />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="用户简介">
            <el-input
              v-model="searchParams.userProfile"
              placeholder="请输入用户简介"
            />
          </el-form-item>
        </el-col>
        <el-col :span="3" :offset="5">
          <el-form-item>
            <el-button @click="resetSearchParams">重置</el-button>
            <el-button type="primary" @click="getUserList">查询 </el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-card>
    <el-table
      v-loading="loading"
      :data="userList"
      border
      style="width: 100%; margin-bottom: 10px"
      :pagination="pagination"
    >
      <el-table-column type="index" width="48"></el-table-column>
      <el-table-column
        label="用户名"
        prop="userName"
        :copyable="true"
      ></el-table-column>
      <el-table-column
        label="用户账户"
        prop="userAccount"
        :copyable="true"
      ></el-table-column>
      <el-table-column label="头像" prop="userAvatar" width="150px">
        <template #default="{ row }">
          <el-image :src="row.userAvatar" style="width: 100px" />
        </template>
      </el-table-column>
      <el-table-column
        label="用户简介"
        prop="userProfile"
        :copyable="true"
      ></el-table-column>
      <el-table-column label="角色" prop="userRole">
        <template #default="{ row }">
          <el-select v-model="row.userRole" placeholder="选择角色" disabled>
            <el-option
              v-for="(item, value) in roleEnum"
              :key="value"
              :label="item.text"
              :value="value"
            ></el-option>
          </el-select>
        </template>
      </el-table-column>
      <el-table-column
        label="创建时间"
        prop="createTime"
        sortable
        :formatter="formatDate"
      ></el-table-column>
      <el-table-column label="操作" width="250px">
        <template #default="{ row }">
          <el-button @click="edit(row)">编辑</el-button>
          <el-button type="primary" @click="view(row)"> 查看</el-button>
          <el-popconfirm
            title="你确定要删除该用户吗？"
            @confirm="deleteUser(row)"
            @cancel="cancelEvent"
          >
            <template #reference>
              <el-button type="success"> 删除</el-button>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      background
      layout="total, sizes, prev, pager, next, jumper"
      :page-sizes="[5, 10, 15, 20]"
      :current-page="pagination.currentPage"
      :total="pagination.total"
      :page-size="pagination.pageSize"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />

    <!-- 编辑对话框 -->
    <el-dialog
      title="编辑用户"
      v-model="editDialogVisible"
      width="50%"
      @close="resetEditField(editFormRef)"
    >
      <el-form :model="editForm" ref="editFormRef">
        <el-form-item
          label="用户名"
          :label-width="formLabelWidth"
          label-position="left"
        >
          <el-input v-model="editForm.userName" autocomplete="off" />
        </el-form-item>
        <el-form-item
          label="用户头像"
          :label-width="formLabelWidth"
          label-position="left"
        >
          <el-input v-model="editForm.userAvatar" autocomplete="off" />
        </el-form-item>
        <el-form-item
          label="用户简介"
          :label-width="formLabelWidth"
          label-position="left"
        >
          <el-input v-model="editForm.userProfile" autocomplete="off" />
        </el-form-item>
        <el-form-item
          label="角色"
          :label-width="formLabelWidth"
          label-position="left"
        >
          <el-select
            v-model="editForm.userRole"
            placeholder="选择角色"
            clearable
            readonly
          >
            <el-option
              v-for="(item, value) in roleEnum"
              :key="value"
              :label="item.text"
              :value="value"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span class="dialog-footer">
        <slot name="footer">
          <el-button @click="resetEditField(editFormRef)">取消</el-button>
          <el-button type="primary" @click="saveEditForm">保存</el-button></slot
        >
      </span>
    </el-dialog>

    <!-- 查看对话框 -->
    <el-dialog title="查看用户" v-model="viewDialogVisible" width="50%">
      <el-form :model="viewForm" ref="viewFormRef" disabled>
        <el-form-item label="用户名" :label-width="formLabelWidth">
          <el-input v-model="viewForm.userName" readonly />
        </el-form-item>
        <el-form-item label="用户账户" :label-width="formLabelWidth">
          <el-input v-model="viewForm.userAccount" readonly />
        </el-form-item>
        <el-form-item label="用户简介" :label-width="formLabelWidth">
          <el-input v-model="viewForm.userProfile" readonly />
        </el-form-item>
        <el-form-item label="角色" :label-width="formLabelWidth">
          <el-select
            v-model="editForm.userRole"
            placeholder="选择角色"
            clearable
            readonly
          >
            <el-option
              v-for="(item, value) in roleEnum"
              :key="value"
              :label="item.text"
              :value="value"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span class="dialog-footer">
        <slot name="footer">
          <el-button @click="viewDialogVisible = false">关闭</el-button></slot
        >
      </span>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import {
  ElButton,
  ElImage,
  ElMessage,
  ElOption,
  ElPagination,
  ElSelect,
  ElTable,
  ElTableColumn,
  FormInstance
} from "element-plus";
import {
  deleteUserUsingPost,
  listUserByPageUsingPost,
  updateUserUsingPost
} from "@/api/userController";

const loading = ref(false);
const userList = ref([]);
const pagination = ref({
  currentPage: 1,
  pageSize: 5,
  total: 0
});
const searchParams = ref({
  userName: "",
  userProfile: ""
});
const formLabelWidth = "80px";
const roleEnum = {
  user: { text: "普通用户", status: "Default" },
  admin: { text: "管理员", status: "Success" }
};

// 表单数据
const editDialogVisible = ref(false);
const viewDialogVisible = ref(false);
const editForm = ref({
  id: 0,
  userName: "",
  userAccount: "",
  userProfile: "",
  userRole: ""
});
const editFormRef = ref<FormInstance>();
const viewForm = ref();
// 格式化时间
const formatDate = (row, column, cellValue) => {
  return new Date(cellValue).toLocaleString();
};
const handleSizeChange = (val: number) => {
  pagination.value.pageSize = val;
  getUserList();
};
// 获取用户数据
const getUserList = async () => {
  loading.value = true;
  try {
    const res = await listUserByPageUsingPost({
      current: pagination.value.currentPage,
      pageSize: pagination.value.pageSize,
      userProfile: searchParams.value.userProfile,
      userName: searchParams.value.userName
    });
    if (res.code !== 200) {
      ElMessage.error(res.msg);
      return;
    }
    userList.value = res.data.records || [];
    pagination.value.total = parseInt(res.data.total) || 0;
  } catch (error: any) {
    ElMessage.error("获取用户列表失败，" + error.message);
  } finally {
    loading.value = false;
  }
};
// 编辑用户
const edit = (row) => {
  editDialogVisible.value = row;
  Object.assign(editForm.value, row);
};

// 保存编辑
const saveEditForm = async () => {
  try {
    const res = await updateUserUsingPost({
      ...editForm.value
    });
    if (res.code === 200) {
      ElMessage.success("编辑成功");
      editDialogVisible.value = false;
      await getUserList();
    } else {
      ElMessage.error("编辑失败");
    }
  } catch (error: any) {
    ElMessage.error("编辑失败，" + error.message);
  }
};
const resetEditField = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  editDialogVisible.value = false;
  formEl.resetFields();
};

// 查看用户
const view = (row) => {
  viewForm.value = { ...row };
  viewDialogVisible.value = true;
};
const deleteUser = async (row) => {
  try {
    const res = await deleteUserUsingPost({
      id: row.id
    });
    if (res.code === 200) {
      ElMessage.success("删除成功");
      await getUserList();
    } else {
      ElMessage.error("删除失败");
    }
  } catch (error: any) {
    ElMessage.error("删除失败，" + error.message);
  }
};
// 分页改变时触发
const handleCurrentChange = (page) => {
  pagination.value.currentPage = page;
  getUserList();
};
const cancelEvent = () => {
  ElMessage.success({
    duration: 1000,
    message: "取消删除成功"
  });
};
const resetSearchParams = () => {
  searchParams.value.userName = "";
  searchParams.value.userProfile = "";
};
// 页面挂载时初始化数据
onMounted(() => {
  getUserList();
});
</script>

<style scoped lang="scss"></style>
