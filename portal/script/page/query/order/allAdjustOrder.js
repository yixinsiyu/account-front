/**
 * Created by zhangbin on 2017/5/15.
 */
(function ($) {

    var grid_selectorId = "allAdjustOrder_grid_table";
    var pager_selectorId = "allAdjustOrder_grid_pager";

    function addAmontAttr(rowId, val, rawObject, cm, rdata) {
        return "style='color:red'";
    }

    function addTypeAttr(rowId, val, rawObject, cm, rdata) {
        return "style='color:blue'";
    }

    function addStatusAttr(rowId, val, rawObject, cm, rdata) {
        return "style='color:blue'";
    }

    allAdjustOrder = {};

    /**
     * 生成订单列表
     *
     * @param grid_selectorId
     * @param pager_selectorId
     */
    allAdjustOrder.generateGrid = function (grid_selectorId, pager_selectorId) {
        var grid_selector = grid_selectorId;
        var pager_selector = pager_selectorId;
        var param = {
            url: G_webrootPath + "/service/page/query/order/serviceOrderSearch",
            postData: {
                searchType: "adjust",
                search_orderno: function () {
                    return $("#allAdjustOrder_query_orderno").val();
                },
                search_channel: function () {
                    return $("#allAdjustOrder_query_channel").val();
                },
                // search_status: function () {
                //     return $("#allAdjustOrder_query_status").val();
                // },
                search_custid: function () {
                    return $("#allAdjustOrder_query_custid").val();
                },
                search_businesstradeno: function () {
                    return $("#allAdjustOrder_query_businesstradeno").val();
                },
                search_type: function () {
                    return $("#allAdjustOrder_query_type").val();
                },
                search_start: function () {
                    return $("#allAdjustOrder_query_date_start").val();
                },
                search_end: function () {
                    return $("#allAdjustOrder_query_date_end").val();
                }
            },
            height: 290,
            sortname: "createdate",
            sortorder: "desc",
            colNames: ['详情', '订单号', '订单额', '订单类型', '订单状态', 'C户客户号', '交易渠道号', '下单时间', '商户交易号'],
            colModel: [
                {
                    name: 'myac',
                    index: '',
                    width: 40,
                    fixed: true,
                    sortable: false,
                    align: 'center',
                    formatter: function (cellvalue, options, rowObject) {
                        return "<div style=\"margin-left:8px;\">"
                            + "<div title=\"订单详情\" style=\"float:left;cursor:pointer;\" class=\"ui-pg-div ui-inline-edit\" "
                            + "onclick=\"allAdjustOrder.viewRecord('"
                            + rowObject.orderno
                            + "');\" "
                            + "onmouseover=\"$(this).addClass('ui-state-hover');\" "
                            + "onmouseout=\"$(this).removeClass('ui-state-hover')\">"
                            + "<span class=\"ui-icon ui-icon-pencil\"></span></div>";
                    }
                },
                {
                    name: 'orderno',
                    index: 'orderno',
                    align: 'center',
                    sortable: false,
                    fixed: true,
                    width: 195
                },
                {
                    name: 'amont',
                    index: 'amont',
                    align: 'center',
                    cellattr: addAmontAttr,
                    sortable: false,
                    fixed: true,
                    width: 80
                },
                {
                    name: 'typename',
                    index: 'typename',
                    align: 'center',
                    cellattr: addTypeAttr,
                    sortable: false,
                    fixed: true,
                    width: 80
                },
                {
                    name: 'statusname',
                    index: 'statusname',
                    align: 'center',
                    cellattr: addStatusAttr,
                    sortable: false,
                    fixed: true,
                    width: 90
                },
                {
                    name: 'custid',
                    index: 'custid',
                    align: 'center',
                    sortable: false,
                    fixed: true,
                    width: 125
                },
                {
                    name: 'channel',
                    index: 'channel',
                    align: 'center',
                    sortable: false,
                    fixed: true,
                    width: 125
                },
                {
                    name: 'createdate',
                    index: 'createdate',
                    align: 'center',
                    fixed: true,
                    width: 80
                },
                {
                    name: 'businesstradeno',
                    index: 'businesstradeno',
                    sortable: false
                }]
        };
        AUI.grid.generateGrid(grid_selector, pager_selector, param);
    };

    /**
     * 绑定事件
     */
    allAdjustOrder.initEvent = function () {
        AUI.element.initDatePicker("allAdjustOrder_query_date_start");
        AUI.element.initDatePicker("allAdjustOrder_query_date_end");
        $("#allAdjustOrder_reset_btn").click(function () {
            $("#allAdjustOrder_conditionform")[0].reset();
        });
        $("#allAdjustOrder_query_btn").click(function () {
            if ($("#allAdjustOrder_query_date_start").val() == "") {
                AUI.dialog.alert("请输入时间范围！", null, 3);
                return;
            }
            if ($("#allAdjustOrder_query_date_end").val() == "") {
                AUI.dialog.alert("请输入时间范围！", null, 3);
                return;
            }
            AUI.grid.refreshGrid(grid_selectorId, true);
        });
    };

    /**
     * 审核
     */
    allAdjustOrder.viewRecord = function (orderno) {
        AUI.dialog.inDialog("max", "max", "订单详情", {
            innerUrl: G_webrootPath + "/view/page/query/order/orderInfo?orderno=" + orderno,
            fullscreen: true
        }, null, function (rtn) {
            AUI.grid.refreshGrid(grid_selectorId);
        });
    };

    $(function () {
        allAdjustOrder.generateGrid(grid_selectorId, pager_selectorId);
        allAdjustOrder.initEvent();
    });
})($);
