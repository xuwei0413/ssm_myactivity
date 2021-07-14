<%--
  Created by IntelliJ IDEA.
  Customer: YQF
  Date: 2019/10/14
  Time: 18:50
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <meta charset="utf-8">
    <title>活动发布</title>
    <meta name="renderer" content="webkit">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <meta http-equiv="Access-Control-Allow-Origin" content="*">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
    <meta name="apple-mobile-web-app-status-bar-style" content="black">
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="format-detection" content="telephone=no">
    <%--<link rel="icon" href="favicon.ico">--%>
    <link rel="stylesheet" href="${yeqifu}/static/layui/css/layui.css" media="all"/>
    <link rel="stylesheet" href="${yeqifu}/static/css/public.css" media="all"/>
    <link rel="stylesheet" href="${yeqifu}/static/layui_ext/dtree/dtree.css">
    <link rel="stylesheet" href="${yeqifu}/static/layui_ext/dtree/font/dtreefont.css">
</head>
<body class="childrenBody">

<!-- 搜索条件开始 -->
<fieldset class="layui-elem-field layui-field-title" style="margin-top: 20px;">
    <legend>查询条件</legend>
</fieldset>
<form class="layui-form" method="post" id="searchFrm">

    <div class="layui-form-item">
        <div class="layui-inline">
            <label class="layui-form-label">活动名称:</label>
            <div class="layui-input-inline" style="padding: 5px">
                <input type="text" name="custname" autocomplete="off" class="layui-input layui-input-inline"
                       placeholder="请输入活动名称" style="height: 30px;border-radius: 10px">
            </div>
        </div>
        <div class="layui-inline">
            <label class="layui-form-label">活动编号:</label>
            <div class="layui-input-inline" style="padding: 5px">
                <input type="text" name="identity" autocomplete="off" class="layui-input layui-input-inline"
                       placeholder="请输入活动编号" style="height: 30px;border-radius: 10px">
            </div>
        </div>
        <div class="layui-inline">
            <label class="layui-form-label">活动地址:</label>
            <div class="layui-input-inline" style="padding: 5px">
                <input type="text" name="address" autocomplete="off" class="layui-input layui-input-inline"
                       placeholder="请输入活动地址" style="height: 30px;border-radius: 10px">
            </div>
        </div>
    </div>
    <div class="layui-form-item">
        <div class="layui-inline">
            <label class="layui-form-label">活动电话:</label>
            <div class="layui-input-inline" style="padding: 5px">
                <input type="text" name="phone" autocomplete="off" class="layui-input layui-input-inline"
                       placeholder="请输入活动电话" style="height: 30px;border-radius: 10px">
            </div>
        </div>
        <div class="layui-inline">
            <label class="layui-form-label">消费方式:</label>
            <div class="layui-input-inline">
                <input type="radio" name="sex" value="0" title="个人承包">
                <input type="radio" name="sex" value="1" title="AA消费">
            </div>
            <button type="button"
                    class="layui-btn layui-btn-normal layui-icon layui-icon-search layui-btn-radius layui-btn-sm"
                    id="doSearch" style="margin-top: 4px">查询
            </button>
            <button type="reset"
                    class="layui-btn layui-btn-warm layui-icon layui-icon-refresh layui-btn-radius layui-btn-sm"
                    style="margin-top: 4px">重置
            </button>
            <button type="button"
                    class="layui-btn layui-btn-green layui-icon layui-icon-download-circle layui-btn-radius layui-btn-sm"
                    id="doExport" style="margin-top: 4px">导出
            </button>
        </div>
    </div>

</form>

<!-- 数据表格开始 -->
<table class="layui-hide" id="customerTable" lay-filter="customerTable"></table>
<div id="customerToolBar" style="display: none;">
    <button type="button" class="layui-btn layui-btn-sm layui-btn-radius" lay-event="add">增加</button>
    <button type="button" class="layui-btn layui-btn-danger layui-btn-sm layui-btn-radius" lay-event="deleteBatch">
        批量删除
    </button>
</div>
<div id="customerBar" style="display: none;">
    <a class="layui-btn layui-btn-xs layui-btn-radius" lay-event="edit">编辑</a>
    <a class="layui-btn layui-btn-danger layui-btn-xs layui-btn-radius" lay-event="del">删除</a>
</div>

<!-- 添加和修改的弹出层-->
<div style="display: none;padding: 20px" id="saveOrUpdateDiv">
    <form class="layui-form" lay-filter="dataFrm" id="dataFrm">
        <div class="layui-form-item">
            <div class="layui-inline">
                <label class="layui-form-label">活动名称:</label>
                <div class="layui-input-inline">
                    <input type="text" name="custname" lay-verify="required" placeholder="请输入活动名称" autocomplete="off"
                           class="layui-input">
                </div>
            </div>
            <div class="layui-inline">
                <label class="layui-form-label">活动编号:</label>
                <div class="layui-input-inline">
                    <input type="text" name="identity" lay-verify="required" placeholder="请输入活动名称" autocomplete="off"
                           class="layui-input">
                </div>
            </div>
        </div>
        <div class="layui-form-item">
            <div class="layui-inline">
                <label class="layui-form-label">开始时间:</label>
                <div class="layui-input-inline" style="padding: 5px">
                    <input type="text" name="starttime" id="starttime" readonly="readonly"
                           class="layui-input layui-input-inline"
                           placeholder="yyyy-MM-dd" style="height: 30px;border-radius: 10px">
                </div>
            </div>
            <div class="layui-inline">
                <label class="layui-form-label">结束时间:</label>
                <div class="layui-input-inline" style="padding: 5px">
                    <input type="text" name="endtime" id="endtime" readonly="readonly"
                           class="layui-input layui-input-inline"
                           placeholder="yyyy-MM-dd" style="height: 30px;border-radius: 10px">
                </div>
            </div>
        </div>
        <div class="layui-form-item">
            <div class="layui-inline">
                <label class="layui-form-label">活动地址:</label>
                <div class="layui-input-inline">
                    <input type="text" name="address" placeholder="请输入活动地址" autocomplete="off" class="layui-input">
                </div>
            </div>
        </div>
        <div class="layui-form-item">
            <div class="layui-inline">
                <label class="layui-form-label">活动电话:</label>
                <div class="layui-input-inline">
                    <input type="text" name="phone" lay-verify="required|phone" placeholder="请输入活动电话" autocomplete="off"
                           class="layui-input">
                </div>
            </div>
            <div class="layui-inline">
                <label class="layui-form-label">活动消费方式:</label>
                <div class="layui-input-inline">
                    <input type="radio" name="sex" value="0" checked="checked" title="个人承包">
                    <input type="radio" name="sex" value="1" title="AA消费">
                </div>
            </div>
        </div>
        <div class="layui-form-item">
            <div class="layui-inline">
                <label class="layui-form-label">团队人数:</label>
                <div class="layui-input-inline">
                    <input type="number" name="personnumber" placeholder="请输入团队人数" autocomplete="off" class="layui-input">
                </div>
            </div>
            <div class="layui-inline">
                <label class="layui-form-label">消费总金额/元（整数）:</label>
                <div class="layui-input-inline">
                    <input type="number" name="totalmoney" placeholder="请输入消费总金额" autocomplete="off" class="layui-input">
                </div>
            </div>
        </div>
        <div class="layui-form-item">
            <div class="layui-input-block" style="text-align: center;padding-right: 120px">
                <button type="button"
                        class="layui-btn layui-btn-normal layui-btn-md layui-icon layui-icon-release layui-btn-radius"
                        lay-filter="doSubmit" lay-submit="">提交
                </button>
                <button type="reset"
                        class="layui-btn layui-btn-warm layui-btn-md layui-icon layui-icon-refresh layui-btn-radius">重置
                </button>
            </div>
        </div>
    </form>
</div>

<script src="${yeqifu}/static/layui/layui.js"></script>
<script type="text/javascript">
    var tableIns;
    layui.use(['jquery', 'layer','laydate', 'form', 'table'], function () {
        var $ = layui.jquery;
        var layer = layui.layer;
        var form = layui.form;
        var table = layui.table;
        var dtree = layui.dtree;
        var laydate = layui.laydate;
        //渲染时间
        laydate.render({
            elem: '#starttime',
            type: 'datetime'
        });
        laydate.render({
            elem: '#endtime',
            type: 'datetime'
        });
        //渲染数据表格
        tableIns = table.render({
            elem: '#customerTable'   //渲染的目标对象
            , url: '${yeqifu}/action/loadAll.action' //数据接口
            , title: '活动数据表'//数据导出来的标题
            , toolbar: "#customerToolBar"   //表格的工具条
            // , height: 'full-210'
            , cellMinWidth: 100 //设置列的最小默认宽度
            , page: true  //是否启用分页
            , cols: [[   //列表数据
                {type: 'checkbox', fixed: 'left'}
                , {field: 'identity', title: '活动编号', align: 'center', width: '200'}
                , {field: 'custname', title: '活动名称', align: 'center', width: '125'}
                , {field: 'address', title: '活动地址', align: 'center', width: '125'}
                , {field: 'career', title: '创建人', align: 'center', width: '150'}
                , {field: 'phone', title: '责任人联系方式', align: 'center', width: '150'}
                , {field: 'personnumber', title: '人数', align: 'center', width: '150'}
                , {field: 'avgmoney', title: 'AA金额', align: 'center', width: '150'}
                , {field: 'totalmoney', title: '总金额', align: 'center', width: '150'}
                , {field: 'status', title: '组团状态', align: 'center', width: '150'}
                , {field: 'remark', title: '已经参团名单', align: 'center', width: '150'}
                , {
                    field: 'sex', title: '消费方式', align: 'center', width: '120', templet: function (d) {
                        return d.sex == '0' ? '<font color=blue>个人承包</font>' : '<font color=red>AA消费</font>';
                    }
                }
                , {field: 'createtime', title: '录入时间', align: 'center', width: '200'}
                , {fixed: 'right', title: '操作', toolbar: '#customerBar', align: 'center', width: '150'}
            ]],
            done:function (data, curr, count) {
                //不是第一页时，如果当前返回的数据为0那么就返回上一页
                if(data.data.length==0&&curr!=1){
                    tableIns.reload({
                        page:{
                            curr:curr-1
                        }
                    })
                }
            }
        });

        //模糊查询
        $("#doSearch").click(function () {
            var params = $("#searchFrm").serialize();
            tableIns.reload({
                url: "${yeqifu}/action/loadAll.action?" + params,
                page: {curr: 1}
            })
        });

        //导出
        $("#doExport").click(function () {
            var params = $("#searchFrm").serialize();
            window.location.href="${yeqifu}/stat/export.action?"+params;
        });

        //监听头部工具栏事件
        table.on("toolbar(customerTable)", function (obj) {
            switch (obj.event) {
                case 'add':
                    openAddCustomer();
                    break;
                case 'deleteBatch':
                    deleteBatch();
                    break;
            }
        });

        //监听行工具事件
        table.on('tool(customerTable)', function (obj) {
            var data = obj.data; //获得当前行数据
            var layEvent = obj.event; //获得 lay-event 对应的值（也可以是表头的 event 参数对应的值）
            if (layEvent === 'del') { //删除
                layer.confirm('真的删除【' + data.custname + '】这个活动么？', function (index) {
                    //向服务端发送删除指令
                    $.post("${yeqifu}/action/delete.action", {identity: data.identity}, function (res) {
                        layer.msg(res.msg);
                        //刷新数据表格
                        tableIns.reload();
                    })
                });
            } else if (layEvent === 'edit') { //编辑
                //编辑，打开修改界面
                openUpdateCustomer(data);
            } else if (layEvent === 'join') { //加入
                //编辑，打开加入界面
                openJoinCustomer(data);
            }
        });

        var url;
        var mainIndex;

        //打开添加页面
        function openAddCustomer() {
            mainIndex = layer.open({
                type: 1,
                title: '添加活动',
                content: $("#saveOrUpdateDiv"),
                area: ['1100px', '620px'],
                success: function (index) {
                    //清空表单数据
                    $("#dataFrm")[0].reset();
                    url = "${yeqifu}/action/add.action";
                }
            });
        }

        //打开修改页面
        function openUpdateCustomer(data) {
            mainIndex = layer.open({
                type: 1,
                title: '修改活动',
                content: $("#saveOrUpdateDiv"),
                area: ['1100px', '620px'],
                success: function (index) {
                    form.val("dataFrm", data);
                    url = "${yeqifu}/action2/update.action";
                }
            });
        }
        //保存
        form.on("submit(doSubmit)", function (obj) {
            //序列化表单数据
            var params = $("#dataFrm").serialize();
            $.post(url, params, function (obj) {
                layer.msg(obj.msg);
                //关闭弹出层
                layer.close(mainIndex)
                //刷新数据 表格
                tableIns.reload();
            })
        });

        //批量删除
        function deleteBatch() {
            //得到选中的数据行
            var checkStatus = table.checkStatus('customerTable');
            var data = checkStatus.data;
            layer.alert(data.length);
            var params = "";
            $.each(data, function (i, item) {
                if (i == 0) {
                    params += "ids=" + item.identity;
                } else {
                    params += "&ids=" + item.identity;
                }
            });
            layer.confirm('真的要删除这些活动么？', function (index) {
                //向服务端发送删除指令
                $.post("${yeqifu}/action/deleteBatch.action", params, function (res) {
                    layer.msg(res.msg);
                    //刷新数据表格
                    tableIns.reload();
                })
            });
        }

    });

</script>
</body>
</html>

