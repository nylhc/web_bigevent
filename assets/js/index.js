$(function () {
    //获取用户信息
    getUserInfo()

    //退出功能
    var layer = layui.layer
    $('#btnLogout').on('click', function () {
        //提示用户是否确认退出
        layer.confirm('确定退出登录?', { icon: 3, title: '提示' }, function (index) {
            //do something
            //1.清空本地存储token
            localStorage.removeItem('token')
            //2.重新跳转登录页面
            location.href = 'login.html'
            layer.close(index);
        })
    })
})

//获取用户基本信息
function getUserInfo() {
    $.ajax({
        type: 'GET',
        url: '/my/userinfo',
        // headers: {
        //     Authorization: localStorage.getItem('token') || ''
        // },
        success: function (res) {
            if (res.status !== 0) {
                return layui.layer.msg('获取用户信息失败！')
            }
            //调用renderAvatar渲染用户头像
            renderAvatar(res.data)
        },
        // complete: function (res) {
        //     if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
        //         //1.强制清空token
        //         localStorage.removeItem('token')
        //         //2.强制跳转
        //         location.href = '/login.html'
        //     }
        // }
    })
}

//渲染用户头像
function renderAvatar(user) {
    //获取用户的名称
    var name = user.nickname || user.username
    //渲染欢迎文本
    $('#welcome').html('欢迎&nbsp;&nbsp;' + name);
    //按需渲染用户头像
    if (user.user_pic !== null) {
        //渲染图片头像
        $('.layui-nav-img').attr('src', user.user_pic).show()
        $('.text-avatar').hide()
    } else {
        //渲染文本头像
        $('.layui-nav-img').hide()
        var first = name[0].toUpperCase()
        $('.text-avatar').html(first).show()
    }
}