package com.yeqifu.sys.constast;

/**
 * 常量接口
 */
public interface SysConstast {

    String USER_LOGIN_ERROR_MSG = "用户名或密码不正确";
    String USER_LOGIN_CODE_ERROR_MSG = "验证码不正确";

    String USER_LOGIN_ERROR_MSG2 = "账户已被禁用，请联系管理员";

    /**
     * 可用状态
     */
    Integer AVAILABLE_TRUE = 1;
    Integer AVAILABLE_FALSE = 0;

    /**
     * 用户类型
     */
    Integer USER_TYPE_SUPER = 1;
    Integer USER_TYPE_NORMAL = 2;

    /**
     * 是否展开
     */
    Integer SPREAD_TRUE = 1;
    Integer SPREAD_FALSE = 0;

    /**
     * 操作状态
     */
    String ADD_SUCCESS = "添加成功";
    String ADD_ERROR = "添加失败";

    String JOIN_ERROR = "已经加入该团队，无需再次添加";

    String UPDATE_SUCCESS = "更新成功";
    String UPDATE_ERROR = "更新失败";

    String UPDATE_ERROR2 = "session失效,请重新登录!";

    String UPDATE_ERROR3 = "提交失败,证件号已经存在";

    String UPDATE_ERROR4 = "提交失败,该类型已经存在";

    String UPDATE_ERROR5 = "提交失败,该帐号已经存在";

    String UPDATE_ERROR6 = "提交失败,该车牌号未存在";

    String DELETE_SUCCESS = "删除成功";
    String DELETE_ERROR = "删除失败";

    String RESET_SUCCESS = "重置成功";
    String RESET_ERROR = "重置失败";

    String DISPATCH_SUCCESS = "分配成功";
    String DISPATCH_ERROR = "分配失败";

    Integer CODE_SUCCESS = 0;//操作成功
    Integer CODE_ERROR = -1;//操作失败
    /**
     * 公用常量
     */
    Integer CODE_ZERO = 0;
    Integer CODE_ONE = 1;
    Integer CODE_TWO = 2;
    Integer CODE_THREE = 3;

    /**
     * 用户默认密码
     */
    String USER_DEFAULT_PWD="123456";

    /**
     * 临时文件标记
     */
    String FILE_UPLOAD_TEMP = "_temp";

    /**
     * 默认图片地址
     */
    Object DEFAULT_CAR_IMG = "images/defaultcarimage.jpg";

    /**
     * 单号的前缀
     */
    String CAR_ORDER_CZ = "CZ";
    String CAR_ORDER_JC = "JC";

    /**
     * 归还状态
     */
    Integer RENT_BACK_FALSE = 0; //未归还
    Integer RENT_BACK_TRUE = 1; //已归还

    /**
     * 借用状态
     */
    Integer RENT_CAR_TRUE = 1; //已借用
    Integer RENT_CAR_FALSE = 0; //未借用
}
