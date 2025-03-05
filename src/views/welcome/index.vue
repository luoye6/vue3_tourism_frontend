<template>
  <div style="display: flex; justify-content: center">
    <el-card style="width: 100%">
      <el-row style="font-size: 28px">欢迎使用智能 AI 旅游推荐平台 🎉</el-row>
      <el-row style="font-size: 20px; margin: 40px 0"
        >智能 AI
        旅游推荐平台！在这里，您可以通过我们强大的平台探索世界各地的美景，规划您的完美旅行路线。
        🛠
      </el-row>
      <!--      介绍-->
      <el-row>
        <el-row
          >😀
          作为用户，您可以通过注册登录账户，浏览风景轮播图，查看最新公告，分享您的旅游攻略，与
          AI
          进行智能对话获取个性化旅游推荐，探索景点列表，规划景点路线，购买景点门票，并管理您的个人主页。
        </el-row>
        <el-row style="margin: 20px 0">
          💻 作为管理者，我们提供了用户管理、公告管理、旅游攻略管理、AI
          对话管理、景点管理、景点路线管理、景点评分管理、景点门票管理以及用户订单管理功能。
        </el-row>
        <el-row>
          🤝
          我们提供多种精心设计的旅游推荐功能，帮助您全方位规划旅行。您可以管理和跟踪每个景点的浏览和收藏情况，实时分析并优化您的旅行策略。无论是短途旅行还是长途探险，我们都将为您提供最全面的旅行支持。
        </el-row>
        <el-row style="margin: 20px 0">
          👌
          我们还提供了个人旅游日历、订单详情查看、评论查看、收藏的旅游攻略查看以及个人详情信息查看功能。
        </el-row>
        <el-row style="margin-bottom: 20px"
          >🏁 无论您是用户还是管理者，智能 AI
          旅游推荐平台都致力于提供稳定、安全、高效的旅行规划服务，帮助您实现更快速、便捷的旅行体验。
        </el-row>
      </el-row>
      <el-row class="card_container" style="margin: 40px 0">
        <el-card>
          <el-row style="margin: 15px 0; font-size: 20px; font-weight: bold"
            >⭐全方位的旅游推荐
          </el-row>
          <el-row style="font-size: 16px; font-weight: bold; line-height: 24px"
            >🐼平台提供丰富多样的旅游景点推荐，涵盖从热门景点到冷门秘境，帮助您全面提升旅行体验，轻松规划完美行程。
          </el-row>
        </el-card>
        <el-card>
          <el-row style="margin: 15px 0; font-size: 20px; font-weight: bold"
            >⭐智能AI旅游推荐
          </el-row>
          <el-row style="font-size: 16px; font-weight: bold; line-height: 24px"
            >🐶️平台提供AI智能对话功能，实时评估您的旅行偏好，分析您的旅行需求，帮助您规划个性化旅行路线。
          </el-row>
        </el-card>
        <el-card>
          <el-row style="margin: 15px 0; font-size: 20px; font-weight: bold"
            >⭐个人旅行进度跟踪
          </el-row>
          <el-row style="font-size: 16px; font-weight: bold; line-height: 24px"
            >🐰️平台为您提供个性化的旅行进度跟踪，自动记录您的旅行计划，帮助您了解旅行进度并优化旅行安排。
          </el-row>
        </el-card>
        <el-card>
          <el-row style="margin: 15px 0; font-size: 20px; font-weight: bold"
            >⭐详尽的景点解析
          </el-row>
          <el-row style="font-size: 16px; font-weight: bold; line-height: 24px"
            >🐨平台提供详细的景点解析，帮助您深入理解每个景点的特色与亮点，让您不仅仅了解景点，更懂得如何玩转景点。
          </el-row>
        </el-card>
        <el-card>
          <el-row style="margin: 15px 0; font-size: 20px; font-weight: bold"
            >⭐多种旅行方式支持
          </el-row>
          <el-row style="font-size: 16px; font-weight: bold; line-height: 24px"
            >🐷平台支持多种旅行方式的推荐，您可以根据个人需求选择相应的旅行方式，全面提升您的旅行体验。
          </el-row>
        </el-card>
      </el-row>
    </el-card>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
a {
  text-decoration: none;
  color: rgb(37, 130, 255);
  font-weight: bold;
}

.card_container {
  display: flex;
  justify-content: space-between;
  align-items: center;

  .el-card {
    height: 250px;
    flex-basis: calc(20% - 1rem);
    margin: 0 0.5rem;
  }
}
</style>
