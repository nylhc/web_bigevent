$.ajaxPrefilter(function (options) {
    //拼接Ajax请求根路径
    options.url = 'http://www.liulongbin.top:3007' + options.url

    //统一为有权限接口设置请求头
    if (options.url.indexOf('/my/') !== -1) {
        options.headers = {
            Authorization: localStorage.getItem('token') || ''
        }
    }

    //统一挂载complete回调函数
    options.complete = function (res) {
        if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
            //1.强制清空token
            localStorage.removeItem('token')
            //2.强制跳转
            location.href = '/login.html'
        }
    }
})