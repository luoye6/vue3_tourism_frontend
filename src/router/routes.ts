//对外暴露配置路由(常量路由):全部用户都可以访问到的路由
export const constantRoute = [
  {
    path: "/",
    redirect: "/login",
    meta: {
      title: null,
      hidden: true,
      icon: null
    }
  },
  {
    //登录
    path: "/login",
    component: () => import("@/views/login/index.vue"),
    name: "login",
    meta: {
      title: "登录", //菜单标题
      hidden: true, //代表路由标题在菜单中是否隐藏  true:隐藏 false:不隐藏
      icon: "Promotion" //菜单文字左侧的图标,支持element-plus全部图标
    }
  },

  {
    // 注册
    path: "/register",
    component: () => import("@/views/register/index.vue"),
    name: "register",
    meta: {
      title: "注册", //菜单标题
      hidden: true, //代表路由标题在菜单中是否隐藏  true:隐藏 false:不隐藏
      icon: "Promotion" //菜单文字左侧的图标,支持element-plus全部图标
    }
  },

  {
    //登录成功以后展示数据的路由
    path: "/index",
    component: () => import("@/layout/index.vue"),
    name: "Layout",
    meta: {
      title: "公共导航",
      hidden: false,
      icon: "ChromeFilled"
    },
    redirect: "/welcome",
    children: [
      {
        //欢迎页面
        path: "/welcome",
        component: () => import("@/views/welcome/index.vue"),
        name: "welcome",
        meta: {
          title: "欢迎", //菜单标题
          hidden: false, //代表路由标题在菜单中是否隐藏  true:隐藏 false:不隐藏
          icon: "Promotion" //菜单文字左侧的图标,支持element-plus全部图标
        }
      }
    ]
  },

  {
    //404
    path: "/404",
    component: () => import("@/views/404/index.vue"),
    name: "404",
    meta: {
      title: "404",
      hidden: true,
      icon: "DocumentDelete"
    }
  }
];

//异步路由(管理员)
export const asnycAdminRoute = [
  {
    path: "/admin",
    component: () => import("@/layout/index.vue"),
    name: "admin",
    meta: {
      title: "管理页",
      icon: "Tools"
    },
    children: [
      {
        path: "/user/account",
        component: () => import("@/views/user/account/index.vue"),
        name: "account",
        meta: {
          title: "个人主页",
          icon: "UserFilled",
          hidden: true
        }
      },
      {
        //用户管理
        path: "/admin/userManagement",
        component: () => import("@/views/admin/userManagement/index.vue"),
        name: "userManagement",
        meta: {
          title: "用户管理", //菜单标题
          hidden: false, //代表路由标题在菜单中是否隐藏  true:隐藏 false:不隐藏
          icon: "Management" //菜单文字左侧的图标,支持element-plus全部图标
        }
      },

      {
        //权限管理页面
        path: "/admin/noticeManagement",
        component: () => import("@/views/admin/noticeManagement/index.vue"),
        name: "noticeManagement",
        meta: {
          title: "公告管理", //菜单标题
          hidden: false, //代表路由标题在菜单中是否隐藏  true:隐藏 false:不隐藏
          icon: "VideoCamera" //菜单文字左侧的图标,支持element-plus全部图标
        }
      },
      {
        //面经管理页面
        path: "/admin/postManagement",
        component: () => import("@/views/admin/postManagement/index.vue"),
        name: "postManagement",
        meta: {
          title: "攻略管理", //菜单标题
          hidden: false, //代表路由标题在菜单中是否隐藏  true:隐藏 false:不隐藏
          icon: "Scissor" //菜单文字左侧的图标,支持element-plus全部图标
        }
      },
      {
        //面经管理页面
        path: "/admin/aiManagement",
        component: () => import("@/views/admin/aiManagement/index.vue"),
        name: "aiManagement",
        meta: {
          title: "AI 管理", //菜单标题
          hidden: false, //代表路由标题在菜单中是否隐藏  true:隐藏 false:不隐藏
          icon: "Mic" //菜单文字左侧的图标,支持element-plus全部图标
        }
      },
      {
        //景点管理页面
        path: "/admin/spotManagement",
        component: () => import("@/views/admin/spotManagement/index.vue"),
        name: "spotManagement",
        meta: {
          title: "景点管理", //菜单标题
          hidden: false, //代表路由标题在菜单中是否隐藏  true:隐藏 false:不隐藏
          icon: "Sunny" //菜单文字左侧的图标,支持element-plus全部图标
        }
      },
      {
        //景点路线管理页面
        path: "/admin/spotRouteManagement",
        component: () => import("@/views/admin/spotRouteManagement/index.vue"),
        name: "spotRouteManagement",
        meta: {
          title: "景点路线管理", //菜单标题
          hidden: false, //代表路由标题在菜单中是否隐藏  true:隐藏 false:不隐藏
          icon: "VideoCameraFilled" //菜单文字左侧的图标,支持element-plus全部图标
        }
      },
      {
        //景点门票管理页面
        path: "/admin/spotFeeManagement",
        component: () => import("@/views/admin/spotFeeManagement/index.vue"),
        name: "spotFeeManagement",
        meta: {
          title: "景点门票管理", //菜单标题
          hidden: false, //代表路由标题在菜单中是否隐藏  true:隐藏 false:不隐藏
          icon: "Money" //菜单文字左侧的图标,支持element-plus全部图标
        }
      },
      {
        //景点订单管理页面
        path: "/admin/spotOrderManagement",
        component: () => import("@/views/admin/spotOrderManagement/index.vue"),
        name: "spotOrderManagement",
        meta: {
          title: "景点订单管理", //菜单标题
          hidden: false, //代表路由标题在菜单中是否隐藏  true:隐藏 false:不隐藏
          icon: "Notebook" //菜单文字左侧的图标,支持element-plus全部图标
        }
      }
    ]
  }
];
//异步路由(用户)
export const asnycUserRoute = [
  {
    path: "/user",
    component: () => import("@/layout/index.vue"),
    name: "user",
    meta: {
      title: "用户大厅",
      icon: "Tools"
    },
    children: [
      {
        path: "/user/account",
        component: () => import("@/views/user/account/index.vue"),
        name: "account",
        meta: {
          title: "个人主页",
          icon: "UserFilled",
          hidden: true
        }
      },
      {
        path: `/user/home`,
        component: () => import("@/views/home/index.vue"),
        name: "home",
        meta: {
          title: "主页",
          icon: "HomeFilled",
          hidden: false
        }
      },
      {
        path: `/user/spot`,
        component: () => import("@/views/user/spot/index.vue"),
        name: "spot",
        meta: {
          title: "景点",
          icon: "HomeFilled",
          hidden: false
        }
      },
      {
        path: `/user/spotRoute`,
        component: () => import("@/views/user/spotRoute/index.vue"),
        name: "spotRoute",
        meta: {
          title: "景点路线",
          icon: "TrendCharts",
          hidden: false
        }
      },
      {
        path: `/user/spotRoute/detail/:id`,
        component: () => import("@/views/user/spotRouteDetail/index.vue"),
        name: "spotRouteDetail",
        meta: {
          title: "景点路线详情",
          icon: "HomeFilled",
          hidden: true
        }
      },
      {
        path: `/user/spot/detail/:id`,
        component: () => import("@/views/user/spotDetail/index.vue"),
        name: "spotDetail",
        meta: {
          title: "景点详情",
          icon: "HomeFilled",
          hidden: true
        }
      },
      {
        path: "/user/notice",
        component: () => import("@/views/user/notice/index.vue"),
        name: "notice",
        meta: {
          title: "旅游公告",
          icon: "Bell",
          hidden: false
        }
      },

      {
        path: "/user/message",
        component: () => import("@/views/user/message/index.vue"),
        name: "message",
        meta: {
          title: "旅客留言",
          icon: "Mouse",
          hidden: false
        }
      },
      {
        path: "/user/post",
        component: () => import("@/views/user/post/index.vue"),
        name: "post",
        meta: {
          title: "旅游攻略",
          icon: "Postcard",
          hidden: false
        }
      },
      {
        path: "/user/post/:id",
        component: () => import("@/views/user/post/postDetail/index.vue"),
        name: "PostDetail",
        meta: {
          title: "旅游攻略详情",
          icon: "Postcard",
          hidden: true
        }
      },
      {
        path: "/user/AiTalk",
        component: () => import("@/views/user/AITalk/index.vue"),
        name: "AiTalk",
        meta: {
          title: "AI对话",
          icon: "Microphone",
          hidden: false
        }
      },
      {
        path: "/user/rankingList",
        component: () => import("@/views/user/rankingList/index.vue"),
        name: "rankingList",
        meta: {
          title: "热门景点",
          icon: "List",
          hidden: false
        }
      }
    ]
  }
];
//任意路由
export const anyRoute = {
  //任意路由
  path: "/:pathMatch(.*)*",
  redirect: "/404",
  name: "Any",
  meta: {
    title: "任意路由",
    hidden: true,
    icon: "DataLine"
  }
};
