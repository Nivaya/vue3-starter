import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router'
import { ElMessage } from "element-plus";
import { getToken } from '../util/auth.js';
import NProgress from 'nprogress';//加载进度条
import 'nprogress/nprogress.css';
// 进度条配置项
NProgress.configure({
    showSpinner: false
})

//默认不需要权限的页面
const constantRouterMap = [
    {
        path: '/',
        redirect: '/login'
    },
    {
        path: "/login",
        meta: {
            title: '登录'
        },
        component: () => import("../views/Login.vue")
    },
    {
        path: "/main",
        meta: {
            title: '基础'
        },
        component: () => import("../views/Main.vue"),
        children: [
            {
                path: "/homePage",
                meta: {
                    title: '首页'
                },
                component: () => import("../views/homePage.vue")
            },
            {
                path: "/user",
                meta: {
                    title: '用户管理'
                },
                component: () => import("../views/setting/user.vue")
            },
            {
                path: "/role",
                meta: {
                    title: '角色管理'
                },
                component: () => import("../views/setting/role.vue")
            },
            {
                path: "/resource",
                meta: {
                    title: '资源管理'
                },
                component: () => import("../views/setting/resource.vue")
            },
            {
                path: "/messageCenter",
                meta: {
                    title: '消息中心'
                },
                component: () => import("../views/message/messageCenter.vue")
            },
            {
                path: "/easyForm",
                meta: {
                    title: '基础表单'
                },
                component: () => import("../views/form/easyForm.vue")
            },
            {
                path: "/table",
                meta: {
                    title: '表格表单'
                },
                component: () => import("../views/form/table.vue")
            },
            {
                path: "/404",
                meta: {
                    title: '404'
                },
                component: () => import("../views/abnormal/404.vue")
            },
            {
                path: "/403",
                meta: {
                    title: '403'
                },
                component: () => import("../views/abnormal/403.vue")
            },
            {
                path: "/networkError",
                meta: {
                    title: 'networkError'
                },
                component: () => import("../views/abnormal/networkError.vue")
            },
            {
                path: "/noData",
                meta: {
                    title: '暂无数据'
                },
                component: () => import("../views/abnormal/noData.vue")
            },
            {
                path: "/build",
                meta: {
                    title: '功能建设中'
                },
                component: () => import("../views/abnormal/build.vue")
            },
            {
                path: "/textEditor",
                meta: {
                    title: '富文本编辑器'
                },
                component: () => import("../views/editor/textEditor.vue")
            },
            {
                path: "/markdown",
                meta: {
                    title: 'markdown'
                },
                component: () => import("../views/editor/markdown.vue")
            },
            {
                path: "/successTip",
                meta: {
                    title: '成功'
                },
                component: () => import("../views/tip/success.vue")
            },
            {
                path: "/errorTip",
                meta: {
                    title: '失败'
                },
                component: () => import("../views/tip/error.vue")
            },
            {
                path: "/warningTip",
                meta: {
                    title: '异常'
                },
                component: () => import("../views/tip/warning.vue")
            },
            {
                path: "/dialogDrag",
                meta: {
                    title: '可拖拽弹框'
                },
                component: () => import("../views/content/dialogDrag.vue")
            },
            {
                path: "/wartermark",
                meta: {
                    title: '添加水印'
                },
                component: () => import("../views/content/wartermark.vue")
            },
            {
                path: "/map",
                meta: {
                    title: '地图'
                },
                component: () => import("../views/content/map.vue")
            },
            {
                path: "/timePicker",
                meta: {
                    title: '时间选择器'
                },
                component: () => import("../views/content/timePicker.vue")
            },
            {
                path: "/copy",
                meta: {
                    title: '复制'
                },
                component: () => import("../views/content/copy.vue")
            },
            {
                path: "/computerMonitor",
                meta: {
                    title: '监测电脑信息'
                },
                component: () => import("../views/content/computerMonitor.vue")
            },
            {
                path: "/qrcode",
                meta: {
                    title: '生成二维码'
                },
                component: () => import("../views/content/qrcode.vue")
            },
            {
                path: "/infiniteScroll",
                meta: {
                    title: '无限滚动'
                },
                component: () => import("../views/content/infiniteScroll.vue")
            },
            {
                path: "/cardList",
                meta: {
                    title: '卡片列表'
                },
                component: () => import("../views/form/cardList.vue")
            },
            {
                path: "/workflow",
                meta: {
                    title: '工作流程'
                },
                component: () => import("../views/workflow/index.vue")
            },
        ]
    }
]

const router = createRouter({
    // history: createWebHashHistory(),
    history: createWebHistory(),
    routes: constantRouterMap,
})

//手动跳转的页面白名单
const whiteList = ['/login', '/404', '/403'];

router.beforeEach((to, from, next) => {
    document.title = `Admin Frame | ${to.meta.title}`; //添加title
    const user = getToken();//获取token to.path !== '/login'
    NProgress.start();// 路由跳转前钩子函数中 - 执行进度条开始加载
    if (!to.matched.length) {
        next('/404');
    }
    if (user) {
        if (to.path === '/') {
            next();
        } else {
            next();
        }
    } else {
        if (whiteList.includes(to.path)) {  //如果是白名单无须token则直接进入
            next();
        } else {
            ElMessage.error("无登陆凭证,无法访问,请先登陆!")
            next('/login')
        }

    }
});


// 路由跳转后钩子函数中 - 执行进度条加载结束
router.afterEach(() => {
    NProgress.done();
});

export default router;
