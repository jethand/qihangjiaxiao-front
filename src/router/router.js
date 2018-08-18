import Main from '@/views/Main.vue';

// 不作为Main组件的子页面展示的页面单独写，如下
export const loginRouter = {
    path: '/login',
    name: 'login',
    meta: {
        title: 'Login - 登录'
    },
    component: () => import('@/views/login.vue')
};

export const page404 = {
    path: '/*',
    name: 'error-404',
    meta: {
        title: '404-页面不存在'
    },
    component: () => import('@/views/error-page/404.vue')
};

export const page403 = {
    path: '/403',
    meta: {
        title: '403-权限不足'
    },
    name: 'error-403',
    component: () => import('@//views/error-page/403.vue')
};

export const page500 = {
    path: '/500',
    meta: {
        title: '500-服务端错误'
    },
    name: 'error-500',
    component: () => import('@/views/error-page/500.vue')
};

export const preview = {
    path: '/preview',
    name: 'preview',
    component: () => import('@/views/form/article-publish/preview.vue')
};

export const locking = {
    path: '/locking',
    name: 'locking',
    component: () => import('@/views/main-components/lockscreen/components/locking-page.vue')
};

// 作为Main组件的子页面展示但是不在左侧菜单显示的路由写在otherRouter里
export const otherRouter = {
    path: '/',
    name: 'otherRouter',
    redirect: '/home',
    component: Main,
    children: [
        { path: 'home', title: {i18n: 'home'}, name: 'home_index', component: () => import('@/views/home/home.vue') },
        { path: 'ownspace', title: '个人中心', name: 'ownspace_index', component: () => import('@/views/own-space/own-space.vue') },
        { path: 'order/:order_id', title: '订单详情', name: 'order-info', component: () => import('@/views/advanced-router/component/order-info.vue') }, // 用于展示动态路由
        { path: 'shopping', title: '购物详情', name: 'shopping', component: () => import('@/views/advanced-router/component/shopping-info.vue') }, // 用于展示带参路由
        { path: 'message', title: '消息中心', name: 'message_index', component: () => import('@/views/message/message.vue') }
    ]
};

// 作为Main组件的子页面展示并且在左侧菜单显示的路由写在appRouter里
export const appRouter = [
    {
        path: '/home-manage',
        icon: 'ios-home',
        title: '管理中心',
        name: 'home-manage',
        component: Main,
        children: [
            { 
                path: 'print-manage', 
                icon: 'printer', 
                title: '打印管理', 
                name: 'print-manage', 
                component: () => import('@/views/qihangjiaxiao/print/print.vue') 
            },
            {
                path: 'logger-manage',
                icon: 'search',
                title: '日志管理', 
                name: 'logger-manager',
                component: () => import('@/views/qihangjiaxiao/logs/logs.vue')
            },
            {
                path: 'school-manage',
                icon: 'model-s', 
                title: '驾校管理', 
                name: 'school-person',
                component: () => import('@/views/qihangjiaxiao/school/school.vue')
            }
        ]
    },
    {
        path: '/user-manage',
        icon: 'social-twitch', 
        title: '用户管理',
        name: 'user-manage',
        component: Main, 
        children: [
            {
                path: 'group-manage',
                icon: 'person-stalker', 
                title: '群组管理', 
                name: 'group-manage',
                component: () => import('@/views/qihangjiaxiao/user/group.vue')
            },
            {
                path: 'user-manage',
                icon: 'person', 
                title: '用户管理', 
                name: 'ios-person',
                component: () => import('@/views/qihangjiaxiao/user/user.vue')
            },
        ]
    },
    {
        path: '/permission-manage',
        icon: 'android-lock',
        title: '权限管理',
        name: 'permission-manage',
        component: Main, 
        children: [
            {
                path: 'permission-self',
                icon: 'android-happy', 
                title: '我的权限', 
                name: 'permission-self',
                component: () => import('@/views/qihangjiaxiao/permission/permission-self.vue')
            },
            {
                path: 'permission-manager',
                icon: 'android-unlock', 
                title: '权限管理', 
                name: 'permission-manager',
                component: () => import('@/views/qihangjiaxiao/permission/permission-manage.vue')
            }
        ]
    }
];

// 所有上面定义的路由都要写在下面的routers里
export const routers = [
    loginRouter,
    otherRouter,
    preview,
    locking,
    ...appRouter,
    page500,
    page403,
    page404
];
