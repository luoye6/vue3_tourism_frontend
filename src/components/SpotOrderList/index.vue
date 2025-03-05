<template>
  <div class="order-list-container">
    <!-- 订单列表 -->
    <el-card
      v-for="order in props.spotOrderList"
      :key="order.id"
      class="order-item"
    >
      <div class="order-header">
        <span class="order-id">订单号：{{ order.id }}</span>
        <el-tag :type="getPayStatusTagType(order.payStatus)">
          {{ getPayStatusText(order.payStatus) }}
        </el-tag>
      </div>

      <el-divider />

      <div class="order-body">
        <div class="order-field">
          <span class="field-label">门票 ID：</span>
          <span class="field-value">{{ order.spotFeeId }}</span>
        </div>
        <div class="order-field">
          <span class="field-label">景点名称：</span>
          <span class="field-value">{{ order.spotName }}</span>
        </div>
        <div class="order-field">
          <span class="field-label">联系人：</span>
          <span class="field-value">{{ order.userName }}</span>
        </div>
        <div class="order-field">
          <span class="field-label">联系电话：</span>
          <span class="field-value">{{ order.userPhone }}</span>
        </div>
        <div class="order-field">
          <span class="field-label">创建时间：</span>
          <span class="field-value">{{ formatTime(order.createTime) }}</span>
        </div>
        <div class="order-field">
          <span class="field-label">支付金额：</span>
          <span class="field-value">{{ order.paymentAmount }} 元</span>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ElCard, ElTag, ElDivider } from "element-plus";
import dayjs from "dayjs";

// 定义 props
const props = defineProps({
  spotOrderList: {
    type: Array
  }
});

// 格式化时间
const formatTime = (time?: string) => {
  return time ? dayjs(time).format("YYYY-MM-DD HH:mm") : "未知时间";
};

// 获取支付状态对应的标签类型
const getPayStatusTagType = (payStatus?: number) => {
  switch (payStatus) {
    case 1:
      return "success"; // 支付成功
    case 0:
      return "danger"; // 未支付
    default:
      return "info"; // 其他状态
  }
};

// 获取支付状态对应的文本
const getPayStatusText = (payStatus?: number) => {
  switch (payStatus) {
    case 1:
      return "支付成功";
    case 0:
      return "未支付";
    default:
      return "未知状态";
  }
};
</script>

<style scoped lang="scss">
.order-list-container {
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 20px;
}

.order-item {
  border-radius: 8px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.3s ease;

  &:hover {
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
  }
}

.order-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;

  .order-id {
    font-size: 16px;
    font-weight: bold;
    color: #333;
  }
}

.order-body {
  padding: 12px 16px;

  .order-field {
    display: flex;
    align-items: center;
    margin-bottom: 8px;

    .field-label {
      font-size: 14px;
      color: #666;
      min-width: 80px;
    }

    .field-value {
      font-size: 14px;
      color: #333;
    }
  }
}
</style>
