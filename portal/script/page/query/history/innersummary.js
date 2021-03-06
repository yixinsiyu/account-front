/**
 * Created by zhangbin on 2017/5/15.
 */
(function ($) {

    var grid_selectorId = "his_innersummary_grid_table";
    var pager_selectorId = "his_innersummary_grid_pager";

    his_innersummary = {};

    /**
     * 生成列表
     *
     * @param grid_selectorId
     * @param pager_selectorId
     */
    his_innersummary.generateGrid = function (grid_selectorId, pager_selectorId) {
        var grid_selector = grid_selectorId;
        var pager_selector = pager_selectorId;
        var param = {
            url: G_webrootPath + "/service/page/query/history/serviceInnersummary",
            postData: {
                search_businessid: function () {
                    return $("#his_innersummary_query_businessid").val();
                },
                search_accountdate: function () {
                    return $("#his_innersummary_query_accountdate").val();
                }
            },
            height: 290,
            sortname: "accountitemcode",
            sortorder: "asc",
            colNames: ['id', 'B户客户号', '科目编码', '科目名称', '上级科目编码', '上级科目名称', '科目层级', '上日余额', '余额', '会计日期'],
            colModel: [{
                name: 'id', index: 'id', hidden: true
            }, {
                name: 'businessid',
                index: 'businessid',
                align: 'center',
                fixed: true,
                width: 220
            }, {
                name: 'accountitemcode',
                index: 'accountitemcode',
                align: 'center'
            }, {
                name: 'accountitemname',
                index: 'accountitemname',
                align: 'center'
            }, {
                name: 'parentcode',
                index: 'parentcode',
                align: 'center'
            }, {
                name: 'parentname',
                index: 'parentname',
                align: 'center'
            }, {
                name: 'level',
                index: 'level',
                align: 'center'
            }, {
                name: 'prevbalance',
                index: 'prevbalance',
                align: 'center',
                sortable: false,
                fixed: true,
                width: 80
            }, {
                name: 'balance',
                index: 'balance',
                align: 'center',
                sortable: false,
                fixed: true,
                width: 80
            }, {
                name: 'accountdate',
                index: 'accountdate',
                align: 'center',
                fixed: true,
                width: 80
            }]
        };
        AUI.grid.generateGrid(grid_selector, pager_selector, param);
    };

    /**
     * 绑定事件
     */
    his_innersummary.initEvent = function () {
        AUI.element.initDatePicker("his_innersummary_query_accountdate");
        $("#his_innersummary_reset_btn").click(function () {
            $("#his_innersummary_conditionform")[0].reset();
        });
        $("#his_innersummary_query_btn").click(function () {
            if ($("#his_innersummary_query_accountdate").val() == "") {
                AUI.dialog.alert("请输入统计的会计日期！", null, 3);
                return;
            }
            AUI.grid.refreshGrid(grid_selectorId, true);
        });
    };

    $(function () {
        his_innersummary.generateGrid(grid_selectorId, pager_selectorId);
        his_innersummary.initEvent();
    });
})($);
