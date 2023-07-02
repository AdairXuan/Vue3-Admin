//路由鉴权，设定各个路由访问条件
import router from '@/router';
//路由切换进度条
import NProgress from 'nprogress';
//引入进度条样式
import 'nprogress/nprogress.css';
//取消加载进度条后边的转圈
NProgress.configure( { showSpinner: false } );
import setting from './setting';
import pinia from './store';
import useUserStore  from './store/modules/user';
import useStore from 'element-plus/es/components/table/src/store';


const UserStore = useUserStore(pinia);

//全局守卫：项目当中任意路由切换都会触发的钩子
//全局前置守卫
//访问路由之前的守卫
router.beforeEach( async (to: any, from: any, next: any) => {
    //to 你要访问的路由
    //from 你从哪个路由来
    //next 路由的放行函数
    document.title = `${setting.title} - ${to.meta.title}`;
    NProgress.start();
    //未登录只能访问login路由，登陆之后不能访问login    
    let token = UserStore.token;
    let username = UserStore.username;
    if(token){
        if(to.path == '/login')
            next({path: '/'});
        else
        {
            if(username)
                next();
            else {
                //如果没有用户信息，在这里获取用户信息再放行
                try {
                    await UserStore.userInfo();
                    next();
                } catch (e) {
                    //token过期或错误 
                    //退出登录
                    UserStore.userLogout();
                    next({path : '/login',query: {redirect:to.path}});

                };

            }
        }
    } else {
        if(to.path == '/login')
            next();
        else
            next({path : '/login',query: {redirect:to.path}});

    }

    next();
})

//全局后置守卫
//访问路由之后守卫
router.afterEach((to:any, from:any) => {
    NProgress.done();
})