<template>
  <div class="spot-fee-list">
    <!-- 门票列表 -->
    <el-card v-for="item in spotFeeList" :key="item.id" class="spot-fee-item">
      <div class="item-content">
        <div class="item-info">
          <p><strong>景点名称：</strong>{{ item.spotName }}</p>
          <p><strong>门票价格：</strong>{{ item.spotFeePrice }} 元</p>
          <p><strong>门票描述：</strong>{{ item.spotFeeDescription }}</p>
          <p><strong>创建时间：</strong>{{ item.createTime }}</p>
        </div>
        <el-button type="primary" @click="showBuyDialog(item)">购票</el-button>
      </div>
    </el-card>

    <!-- 购票对话框 -->
    <el-dialog
      title="购票"
      v-model="buyDialogVisible"
      width="30%"
      @close="resetBuyForm"
    >
      <!-- 门票信息 -->
      <div class="ticket-info">
        <p><strong>景点名称：</strong>{{ selectedTicket.spotName }}</p>
        <p><strong>门票价格：</strong>{{ selectedTicket.spotFeePrice }} 元</p>
        <p>
          <strong>门票描述：</strong>{{ selectedTicket.spotFeeDescription }}
        </p>
        <p><strong>创建时间：</strong>{{ selectedTicket.createTime }}</p>
      </div>

      <!-- 购票表单 -->
      <el-form :model="buyForm">
        <el-form-item label="联系人" label-width="80px" label-position="left">
          <el-input v-model="buyForm.userName" placeholder="请输入联系人姓名" />
        </el-form-item>
        <el-form-item label="联系电话" label-width="80px" label-position="left">
          <el-input v-model="buyForm.userPhone" placeholder="请输入联系电话" />
        </el-form-item>
        <el-form-item label="购票数量" label-width="80px" label-position="left">
          <el-input-number
            v-model="buyForm.quantity"
            :min="1"
            :max="10"
            @change="calculateTotalPrice"
          />
        </el-form-item>
        <el-form-item label="总价">
          <span>{{ totalPrice }} 元</span>
        </el-form-item>
      </el-form>

      <span class="dialog-footer">
        <el-button @click="buyDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="submitBuyOrder">确认购票</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { ElMessage } from "element-plus";
import {
  buySpotFeeUsingPost,
  listSpotFeeVoByPageUsingPost
} from "@/api/spotFeeController";
// 定义 props
const props = defineProps({
  spotId: {
    type: String,
    required: true
  }
});
// 门票列表数据
const spotFeeList = ref([]);

// 购票对话框状态
const buyDialogVisible = ref(false);

// 当前选中的门票
const selectedTicket = ref({
  id: 0,
  spotFeePrice: 0,
  spotFeeDescription: "",
  createTime: "",
  spotName: ""
});

// 购票表单数据
const buyForm = ref({
  userName: "",
  userPhone: "",
  quantity: 1
});

// 总价
const totalPrice = ref(0);

// 获取门票列表
const getSpotFeeList = async () => {
  try {
    const res = await listSpotFeeVoByPageUsingPost({
      current: 1,
      pageSize: 10,
      spotId: props.spotId,
      spotFeeStatus: 1
    });
    if (res.code === 200) {
      if (res.data.records.length == 0) {
        ElMessage.info("该景点门票列表为空");
      }
      spotFeeList.value = res.data.records;
    } else {
      ElMessage.error("获取门票列表失败");
    }
  } catch (error) {
    ElMessage.error("获取门票列表失败");
  }
};

// 打开购票对话框
const showBuyDialog = (item) => {
  selectedTicket.value = item;
  buyForm.value.quantity = 1; // 重置购票数量
  calculateTotalPrice(); // 计算总价
  buyDialogVisible.value = true;
};

// 计算总价
const calculateTotalPrice = () => {
  totalPrice.value = selectedTicket.value.spotFeePrice * buyForm.value.quantity;
};

// 提交购票订单
const submitBuyOrder = async () => {
  try {
    const res = await buySpotFeeUsingPost({
      spotFeeId: selectedTicket.value.id,
      userName: buyForm.value.userName,
      userPhone: buyForm.value.userPhone,
      paymentAmount: totalPrice.value,
      payStatus: 1, // 假设默认已支付,
      spotFeeQuantity: buyForm.value.quantity
    });
    if (res.code === 200) {
      ElMessage.success("购票成功");
      buyDialogVisible.value = false;
    } else {
      ElMessage.error(res.message);
    }
  } catch (error) {
    ElMessage.error("购票失败");
  }
};

// 重置购票表单
const resetBuyForm = () => {
  buyForm.value = {
    userName: "",
    userPhone: "",
    quantity: 1
  };
};

// 初始化加载门票列表
onMounted(() => {
  getSpotFeeList();
});
</script>

<style scoped>
.spot-fee-list {
  padding: 20px;
}

.spot-fee-item {
  margin-bottom: 20px;
}

.item-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.item-info p {
  margin: 5px 0;
}

.ticket-info {
  margin-bottom: 20px;
}

.ticket-info p {
  margin: 5px 0;
}
</style>
