$(function () {
    //点击"去注册账号"的链接
    $('#link_reg').on('click', function () {
        $('.login-box').hide()
        $('.reg-box').show()
    })

    //点击"去登录"的链接
    $("#link_login").on('click', function () {
        $('.login-box').show()
        $('.reg-box').hide()
    })

    //从layui中获取form对象
    var form = layui.form
    //通过form.verify()函数自定义校验规则
    form.verify({
        //自定义pwd校验规则
        pwd: [
            /^[\S]{6,16}$/
            , '密码必须6到16位，且不能出现空格'
        ],
        //校验两次密码是否一致
        repwd: function (value) {
            var pwd = $('.reg-box [name=password]').val()
            if (pwd !== value) {
                return '两次密码不一致！'
            }
        }
    })

    //从layui中获取layer对象
    var layer = layui.layer
    //监听注册表单的提交事件
    $('#form_reg').on('submit', function (e) {
        //阻止默认提交行为
        e.preventDefault()
        var data = { username: $('#form_reg [name=username]').val(), password: $('#form_reg [name=password]').val() }
        //发起Ajax的Post请求
        $.post(
            "/api/reguser", data,
            function (res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                layer.msg('注册成功，请登录!')
                //模拟点击，自动跳转
                $('#link_login').click()
            }
        )
    })

    //监听登录表单的提交事件
    $('#form_login').submit(function (e) {
        e.preventDefault()
        $.ajax({
            type: 'POST',
            url: '/api/login',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('登录失败！用户名或密码错误')
                }
                layer.msg('登录成功！')
                //将token储存到localStorage中
                localStorage.setItem('token', res.token)
                //跳转页面
                location.href = '/index.html'
            }
        })
    })
})