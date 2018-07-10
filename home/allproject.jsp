<%@ page pageEncoding="utf-8" %>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>全部项目</title>
    <link href="http://www.ehaofang.com/img/ef.ico" type="image/x-icon" rel="icon">
    <link href="http://www.ehaofang.com/img/ef.ico" type="image/x-icon" rel="shortcut icon">
    <meta name="viewport" content="initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no">
    <link rel="stylesheet" href="less/allproject.css?v=201815121244">
    <script src="js/setting.js?v=201825121244"></script>
    <script src="static/fastclick.min.js?v=201815121244"></script>
</head>
<body>
<div class="page_allproject" id="page_index">
    <div class="header">
        <a class="back" id="back" href="javascript:;" onclick="history.go(-1)"></a>
        <div class="title">全部楼盘</div>
        <!--<div id="search_top" class="pull-right">-->
        <!--<img src="img/ic_search_black@2x.png" style="width: .85rem;height: .85rem"/>-->
        <!--</div>-->
    </div>
    <div class="search-box">
        <input id="search_top" type="text" placeholder="请输入地区或城市搜索房源">
        <span class="cancel" id="search_cancel">
            取消
        </span>
        <div class="placeholder">
            <img src="img/home_btn-search@2x.png" style="">请输入地区或城市搜索房源
        </div>
    </div>
    <div class="filter">
        <div class="filter_box">
            <div class="filter_item">
                <div class="filter_item_box">
                    <span class="filter_item_txt">类型</span>
                    <img src="img/ic_filter_arr@2x.png" height="12" width="18"/></span>
                </div>
                <div class="filter_item_box" style="width: 25%">
                    <span class="filter_item_txt">总价</span>
                    <img src="img/ic_filter_arr@2x.png" height="12" width="18"/></span>
                </div>
                <div class="filter_item_box">
                    <span class="filter_item_txt">区域</span>
                    <img src="img/ic_filter_arr@2x.png" height="12" width="18"/></span>
                </div>
                <div class="filter_item_box">
                    <span class="filter_item_txt">在售</span>
                    <img src="img/ic_filter_arr@2x.png" height="12" width="18"/></span>
                </div>
                <div class="filter_item_box filter_item_box-img" style="width: 15%">
                    <span class="filter_item_txt"><img src="img/ic_sort@2x.png"
                                                       style="width: .85rem;height: .7rem"/></span>
                </div>
            </div>
            <div class="check_box_ul">
                <div class="value_label_box">
                    <input type="radio" name="houseType" checked value="" id="type_item0">
                    <label class="value_label" for="type_item0">
                        <div class="value_title">类型</div>
                        <div class="value_img"><img src="img/ic_filter_check@2x.png" alt=""></div>
                    </label>
                </div>
                <div class="value_label_box">
                    <input type="radio" name="houseType" value="1" id="type_item1">
                    <label class="value_label" for="type_item1">
                        <div class="value_title">别墅</div>
                        <div class="value_img"><img src="img/ic_filter_check@2x.png"></div>
                    </label>
                </div>
                <div class="value_label_box">
                    <input type="radio" name="houseType" value="2" id="type_item2">
                    <label class="value_label" for="type_item2">
                        <div class="value_title">住宅</div>
                        <div class="value_img"><img src="img/ic_filter_check@2x.png"></div>
                    </label>
                </div>
                <div class="value_label_box">
                    <input type="radio" name="houseType" value="3" id="type_item3">
                    <label class="value_label" for="type_item3">
                        <div class="value_title">商铺</div>
                        <div class="value_img "><img src="img/ic_filter_check@2x.png"></div>
                    </label>
                </div>
                <div class="value_label_box">
                    <input type="radio" name="houseType" value="4" id="type_item4">
                    <label class="value_label" for="type_item4">
                        <div class="value_title">商住</div>
                        <div class="value_img "><img src="img/ic_filter_check@2x.png"></div>
                    </label>
                </div>
                <div class="value_label_box">
                    <input type="radio" name="houseType" value="5" id="type_item5">
                    <label class="value_label" for="type_item5">
                        <div class="value_title">其他</div>
                        <div class="value_img "><img src="img/ic_filter_check@2x.png"></div>
                    </label>
                </div>
            </div>
            <div class="check_box_ul">
                <div class="value_label_box"><input type="radio" checked name="salePriceLevel" value=""
                                                    id="price_item1">
                    <label class="value_label" for="price_item1">
                        <div class="value_title">总价</div>
                        <div class="value_img"><img src="img/ic_filter_check@2x.png" alt=""></div>
                    </label></div>
                <div class="value_label_box"><input type="radio" name="salePriceLevel" value="0"
                                                    id="price_item2">
                    <label class="value_label" for="price_item2">
                        <div class="value_title">0-50万</div>
                        <div class="value_img"><img src="img/ic_filter_check@2x.png" alt=""></div>
                    </label></div>
                <div class="value_label_box"><input type="radio" name="salePriceLevel" value="1"
                                                    id="price_item3">
                    <label class="value_label" for="price_item3">
                        <div class="value_title">50-100万</div>
                        <div class="value_img "><img src="img/ic_filter_check@2x.png" alt=""></div>
                    </label></div>
                <div class="value_label_box"><input type="radio" name="salePriceLevel" value="2"
                                                    id="price_item4">
                    <label class="value_label" for="price_item4">
                        <div class="value_title">100-150万</div>
                        <div class="value_img "><img src="img/ic_filter_check@2x.png" alt=""></div>
                    </label></div>
                <div class="value_label_box"><input type="radio" name="salePriceLevel" value="3"
                                                    id="price_item5">
                    <label class="value_label" for="price_item5">
                        <div class="value_title">150-200万</div>
                        <div class="value_img "><img src="img/ic_filter_check@2x.png" alt=""></div>
                    </label></div>
                <div class="value_label_box"><input type="radio" name="salePriceLevel" value="4"
                                                    id="price_item6">
                    <label class="value_label" for="price_item6">
                        <div class="value_title">200-250万</div>
                        <div class="value_img "><img src="img/ic_filter_check@2x.png" alt=""></div>
                    </label></div>
                <div class="value_label_box"><input type="radio" name="salePriceLevel" value="5"
                                                    id="price_item8">
                    <label class="value_label" for="price_item8">
                        <div class="value_title">250-350万</div>
                        <div class="value_img "><img src="img/ic_filter_check@2x.png" alt=""></div>
                    </label></div>
                <div class="value_label_box"><input type="radio" name="salePriceLevel" value="6"
                                                    id="price_item9">
                    <label class="value_label" for="price_item9">
                        <div class="value_title">350-400万</div>
                        <div class="value_img "><img src="img/ic_filter_check@2x.png" alt=""></div>
                    </label></div>
                <div class="value_label_box"><input type="radio" name="salePriceLevel" value="7"
                                                    id="price_item10">
                    <label class="value_label" for="price_item10">
                        <div class="value_title">400-450万</div>
                        <div class="value_img "><img src="img/ic_filter_check@2x.png" alt=""></div>
                    </label></div>
                <div class="value_label_box"><input type="radio" name="salePriceLevel" value="8"
                                                    id="price_item11">
                    <label class="value_label" for="price_item11">
                        <div class="value_title">450-500</div>
                        <div class="value_img "><img src="img/ic_filter_check@2x.png" alt=""></div>
                    </label></div>
                <div class="value_label_box"><input type="radio" name="salePriceLevel" value="9"
                                                    id="price_item12">
                    <label class="value_label" for="price_item12">
                        <div class="value_title">>500万</div>
                        <div class="value_img "><img src="img/ic_filter_check@2x.png" alt=""></div>
                    </label></div>
            </div>
            <div class="check_box_ul" id="getCityList">
                <div class="value_label_box">
                    <input type="radio" name="cityID" checked value="" id="area_item0">
                    <label class="value_label" for="area_item0">
                        <div class="value_title">区域</div>
                        <div class="value_img"><img src="img/ic_filter_check@2x.png" alt=""></div>
                    </label>
                </div>
            </div>
            <div class="check_box_ul ">
                <div class="value_label_box"><input type="radio" name="sellState" value=""
                                                    id="sale_item0">
                    <label class="value_label" for="sale_item0">
                        <div class="value_title">售卖</div>
                        <div class="value_img"><img src="img/ic_filter_check@2x.png" alt=""></div>
                    </label></div>
                <div class="value_label_box"><input type="radio" class="saleType" name="sellState" value="3"
                                                    id="sale_item1">
                    <label class="value_label" for="sale_item1">
                        <div class="value_title">在售</div>
                        <div class="value_img"><img src="img/ic_filter_check@2x.png" alt=""></div>
                    </label></div>
                <div class="value_label_box"><input type="radio" name="sellState" value="1,2"
                                                    id="sale_item2">
                    <label class="value_label" for="sale_item2">
                        <div class="value_title">待开盘</div>
                        <div class="value_img"><img src="img/ic_filter_check@2x.png" alt=""></div>
                    </label></div>
                <div class="value_label_box"><input type="radio" name="sellState" value="4,5"
                                                    id="sale_item4">
                    <label class="value_label" for="sale_item4">
                        <div class="value_title">售罄</div>
                        <div class="value_img "><img src="img/ic_filter_check@2x.png" alt=""></div>
                    </label></div>
            </div>
            <div class="check_box_ul">
                <div class="value_label_box"><input type="radio" name="dis" value=""
                                                    id="dis_item0">
                    <label class="value_label" for="dis_item0">
                        <div class="value_title">默认排序</div>
                        <div class="value_img"><img src="img/ic_filter_check@2x.png" alt=""></div>
                    </label></div>
                <div class="value_label_box">
                    <input type="radio" name="dis" value="1" id="dis_item1">
                    <label class="value_label" for="dis_item1">
                        <div class="value_title">距离从近到远</div>
                        <div class="value_img"><img src="img/ic_filter_check@2x.png" alt=""></div>
                    </label></div>
                <div class="value_label_box">
                    <input type="radio" name="dis" value="2" id="dis_item2">
                    <label class="value_label" for="dis_item2">
                        <div class="value_title">距离从远到近</div>
                        <div class="value_img"><img src="img/ic_filter_check@2x.png" alt=""></div>
                    </label></div>
            </div>
            <div class="filter_mask"></div>
        </div>
        <div class="filter_list">
            <div id="noMatchItem" style="text-align: center;padding-top:1.8rem;display:none">
                <img style="width:2.2rem" src="img/ic_remind@2x.png" alt=""><br/>
                <span style="font-size: 15px;font-weight: bold;margin-top: .5rem;margin-bottom: .4rem">没有找到该盘</span><br>
                <span style="font-size: 12px;color: #ACACAC">请换个搜索条件或浏览我们为您推荐的新盘</span><br>
                <div style="display: flex;justify-content: space-between;align-items: center;margin-top: 1.3rem"><span
                        style="display:inline-block;border-top:1px solid #F1F1F1;width: 7rem;"></span><span
                        style="color: #ACACAC;font-size: 16px;">猜你喜欢</span><span
                        style="display:inline-block;border-top:1px solid #F1F1F1;width: 7rem;"></span></div>
            </div>
            <ul id="getPropertyList"></ul>
            <div class="list_footer">
            </div>
        </div>
    </div>
</div>

<script src="https://cdn.bootcss.com/jquery/3.3.1/jquery.min.js"></script>
<script src="http://res.wx.qq.com/open/js/jweixin-1.2.0.js"></script>
<script type="text/javascript" src="http://api.map.baidu.com/api?v=3.0&ak=CB2ede775afeb6e413abd40261396a69"></script>
<script type="text/javascript" src=js/allproject.js?v=201826121032></script>
</body>
</html>