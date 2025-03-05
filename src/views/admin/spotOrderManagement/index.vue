<template>
  <div class="spot-order-admin">
    <!-- 查询区域 -->
    <el-card style="margin-bottom: 10px">
      <el-row :gutter="10">
        <el-col :span="6">
          <el-form-item label="订单ID" label-width="80px">
            <el-input v-model="queryParams.id" placeholder="请输入订单ID" />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="门票ID" label-width="80px">
            <el-input
              v-model="queryParams.spotFeeId"
              placeholder="请输入门票ID"
            />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="用户ID" label-width="80px">
            <el-input v-model="queryParams.userId" placeholder="请输入用户ID" />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="用户名" label-width="80px">
            <el-input
              v-model="queryParams.userName"
              placeholder="请输入用户名"
            />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="支付状态" label-width="80px">
            <el-select
              v-model="queryParams.payStatus"
              placeholder="请选择支付状态"
            >
              <el-option label="已支付" :value="1" />
              <el-option label="未支付" :value="0" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label-width="20px">
            <el-button @click="resetQuery">重置</el-button>
            <el-button type="primary" @click="getSpotOrderList">查询</el-button>
            <el-button type="primary" @click="showAddDialog" :icon="Promotion">
              添加新订单
            </el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-card>

    <!-- 订单列表表格 -->
    <el-card>
      <el-table :data="spotOrderList" style="width: 100%" :loading="loading">
        <el-table-column prop="id" label="订单ID" />
        <el-table-column prop="spotFeeId" label="门票ID" />
        <el-table-column prop="userId" label="用户ID" />
        <el-table-column prop="userName" label="用户名" />
        <el-table-column prop="userPhone" label="用户电话" />
        <el-table-column prop="paymentAmount" label="支付金额" />
        <el-table-column prop="payStatus" label="支付状态">
          <template #default="{ row }">
            <el-tag :type="row.payStatus === 1 ? 'success' : 'danger'">
              {{ row.payStatus === 1 ? "已支付" : "未支付" }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="createTime" label="创建时间" />
        <el-table-column prop="updateTime" label="更新时间" />
        <el-table-column label="操作" width="200px">
          <template #default="{ row }">
            <el-button type="primary" @click="showEditDialog(row.id)"
              >修改
            </el-button>
            <el-popconfirm
              title="你确定要删除该订单吗？"
              @confirm="deleteSpotOrder(row)"
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

    <!-- 修改订单的对话框 -->
    <el-dialog
      title="修改订单"
      v-model="editDialogVisible"
      width="50%"
      @close="resetEditField(editFormRef)"
    >
      <el-form :model="editForm" ref="editFormRef" label-width="100px">
        <el-form-item label="用户名" prop="userName">
          <el-input v-model="editForm.userName" />
        </el-form-item>
        <el-form-item label="用户电话" prop="userPhone">
          <el-input v-model="editForm.userPhone" />
        </el-form-item>
        <el-form-item label="支付金额" prop="paymentAmount">
          <el-input v-model="editForm.paymentAmount" />
        </el-form-item>
        <el-form-item label="支付状态" prop="payStatus">
          <el-select v-model="editForm.payStatus" placeholder="请选择支付状态">
            <el-option label="已支付" :value="1" />
            <el-option label="未支付" :value="0" />
          </el-select>
        </el-form-item>
      </el-form>
      <span class="dialog-footer">
        <slot name="footer">
          <el-button @click="resetEditField(editFormRef)">取消</el-button>
          <el-button type="primary" @click="editSpotOrder">确定</el-button>
        </slot>
      </span>
    </el-dialog>

    <!-- 添加订单的对话框 -->
    <el-dialog
      title="添加订单"
      v-model="addDialogVisible"
      width="50%"
      @close="addDialogClosed"
    >
      <el-form :model="addForm" ref="addFormRef" label-width="100px">
        <el-form-item label="门票ID" prop="spotFeeId">
          <el-input v-model="addForm.spotFeeId" />
        </el-form-item>
        <el-form-item label="用户ID" prop="userId">
          <el-input v-model="addForm.userId" />
        </el-form-item>
        <el-form-item label="用户名" prop="userName">
          <el-input v-model="addForm.userName" />
        </el-form-item>
        <el-form-item label="用户电话" prop="userPhone">
          <el-input v-model="addForm.userPhone" />
        </el-form-item>
        <el-form-item label="支付金额" prop="paymentAmount">
          <el-input v-model="addForm.paymentAmount" />
        </el-form-item>
        <el-form-item label="支付状态" prop="payStatus">
          <el-select v-model="addForm.payStatus" placeholder="请选择支付状态">
            <el-option label="已支付" :value="1" />
            <el-option label="未支付" :value="0" />
          </el-select>
        </el-form-item>
      </el-form>
      <span class="dialog-footer" style="margin-left: 100px">
        <slot name="footer">
          <el-button @click="addDialogVisible = false">取消</el-button>
          <el-button type="primary" @click="addSpotOrder">添加</el-button>
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
  ElTag,
  FormInstance,
  ElSelect,
  ElOption
} from "element-plus";
import { Promotion } from "@element-plus/icons-vue";
import {
  addSpotOrderUsingPost,
  deleteSpotOrderUsingPost,
  getSpotOrderVoByIdUsingGet,
  listSpotOrderByPageUsingPost,
  updateSpotOrderUsingPost
} from "@/api/spotOrderController";

// 查询参数
const queryParams = ref({
  id: undefined,
  spotFeeId: undefined,
  userId: undefined,
  userName: "",
  payStatus: undefined
});

// 订单列表
const spotOrderList = ref([]);
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
  spotFeeId: 0,
  userId: 0,
  userName: "",
  userPhone: "",
  paymentAmount: 0,
  payStatus: 0
});

// 添加表单数据
const addForm = ref({
  spotFeeId: 0,
  userId: 0,
  userName: "",
  userPhone: "",
  paymentAmount: 0,
  payStatus: 0
});

// 获取订单列表
const getSpotOrderList = async () => {
  loading.value = true;
  try {
    const res = await listSpotOrderByPageUsingPost({
      ...queryParams.value,
      current: paginationConfig.value.current,
      pageSize: paginationConfig.value.pageSize
    });
    if (res.code === 200) {
      spotOrderList.value = res.data.records;
      paginationConfig.value.total = parseInt(res.data.total);
    } else {
      ElMessage.error("获取订单列表失败");
    }
  } catch (error) {
    ElMessage.error("获取订单列表失败");
  } finally {
    loading.value = false;
  }
};

// 重置查询条件
const resetQuery = () => {
  queryParams.value = {
    id: undefined,
    spotFeeId: undefined,
    userId: undefined,
    userName: "",
    payStatus: undefined
  };
  getSpotOrderList();
};

// 显示修改对话框
const showEditDialog = async (id: number) => {
  loading.value = true;
  try {
    const res = await getSpotOrderVoByIdUsingGet({ id });
    if (res.code === 200) {
      editForm.value.id = res.data.id;
      editForm.value.spotFeeId = res.data.spotFeeId;
      editForm.value.userId = res.data.userId;
      editForm.value.userName = res.data.userName;
      editForm.value.userPhone = res.data.userPhone;
      editForm.value.paymentAmount = res.data.paymentAmount;
      editForm.value.payStatus = res.data.payStatus;
      editDialogVisible.value = true;
    } else {
      ElMessage.error("获取订单信息失败");
    }
  } catch (error) {
    ElMessage.error("获取订单信息失败");
  } finally {
    loading.value = false;
  }
};

// 修改订单
const editSpotOrder = async () => {
  try {
    const res = await updateSpotOrderUsingPost(editForm.value);
    if (res.code === 200) {
      ElMessage.success("修改订单成功");
      editDialogVisible.value = false;
      await getSpotOrderList();
    } else {
      ElMessage.error("修改订单失败");
    }
  } catch (error) {
    ElMessage.error("修改订单失败");
  }
};

// 添加订单
const addSpotOrder = async () => {
  try {
    const res = await addSpotOrderUsingPost(addForm.value);
    if (res.code === 200) {
      ElMessage.success("添加订单成功");
      addDialogVisible.value = false;
      await getSpotOrderList();
    } else {
      ElMessage.error("添加订单失败");
    }
  } catch (error) {
    ElMessage.error("添加订单失败");
  }
};

// 删除订单
const deleteSpotOrder = async (row) => {
  try {
    const res = await deleteSpotOrderUsingPost({ id: row.id });
    if (res.code === 200) {
      ElMessage.success("删除订单成功");
      await getSpotOrderList();
    } else {
      ElMessage.error("删除订单失败");
    }
  } catch (error) {
    ElMessage.error("删除订单失败");
  }
};

// 关闭添加对话框
const addDialogClosed = () => {
  addForm.value = {
    spotFeeId: 0,
    userId: 0,
    userName: "",
    userPhone: "",
    paymentAmount: 0,
    payStatus: 0
  };
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
  getSpotOrderList();
};

const handleCurrentChange = (page: number) => {
  paginationConfig.value.current = page;
  getSpotOrderList();
};

// 取消删除
const cancelEvent = () => {
  ElMessage.success("取消删除成功");
};

// 显示添加对话框
const showAddDialog = () => {
  addDialogVisible.value = true;
};

// 初始化加载订单列表
onMounted(() => {
  getSpotOrderList();
});
</script>

<style scoped>
.spot-order-admin {
  padding: 20px;
}
</style>
