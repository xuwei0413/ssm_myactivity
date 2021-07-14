package com.yeqifu.sys.utils;

import com.yeqifu.sys.constast.SysConstast;

public class ResultObj {

    private Integer code;
    private String msg;

    /**
     * 添加成功
     */
    public static final ResultObj ADD_SUCCESS = new ResultObj(SysConstast.CODE_SUCCESS,SysConstast.ADD_SUCCESS);
    /**
     * 添加失败
     */
    public static final ResultObj ADD_ERROR = new ResultObj(SysConstast.CODE_ERROR,SysConstast.ADD_ERROR);

    /**
     * 已经加入该团队
     */
    public static final ResultObj JOIN_ERROR = new ResultObj(SysConstast.CODE_ERROR,SysConstast.JOIN_ERROR);
    /**
     * 更新成功
     */
    public static final ResultObj UPDATE_SUCCESS = new ResultObj(SysConstast.CODE_SUCCESS,SysConstast.UPDATE_SUCCESS);
    /**
     * 更新失败
     */
    public static final ResultObj UPDATE_ERROR = new ResultObj(SysConstast.CODE_ERROR,SysConstast.UPDATE_ERROR);

    /**
     * 更新失败
     */
    public static final ResultObj UPDATE_ERROR2 = new ResultObj(SysConstast.CODE_ERROR,SysConstast.UPDATE_ERROR2);

    /**
     * 更新失败3
     */
    public static final ResultObj UPDATE_ERROR3 = new ResultObj(SysConstast.CODE_ERROR,SysConstast.UPDATE_ERROR3);

    /**
     * 更新失败4
     */
    public static final ResultObj UPDATE_ERROR4 = new ResultObj(SysConstast.CODE_ERROR,SysConstast.UPDATE_ERROR4);

    /**
     * 更新失败5
     */
    public static final ResultObj UPDATE_ERROR5 = new ResultObj(SysConstast.CODE_ERROR,SysConstast.UPDATE_ERROR5);


    /**
     * 更新失败5
     */
    public static final ResultObj UPDATE_ERROR6 = new ResultObj(SysConstast.CODE_ERROR,SysConstast.UPDATE_ERROR5);
    /**
     * 删除成功
     */
    public static final ResultObj DELETE_SUCCESS = new ResultObj(SysConstast.CODE_SUCCESS,SysConstast.DELETE_SUCCESS);
    /**
     * 删除失败
     */
    public static final ResultObj DELETE_ERROR = new ResultObj(SysConstast.CODE_ERROR,SysConstast.DELETE_ERROR);
    /**
     * 重置成功
     */
    public static final ResultObj RESET_SUCCESS = new ResultObj(SysConstast.CODE_SUCCESS,SysConstast.RESET_SUCCESS);
    /**
     * 重置失败
     */
    public static final ResultObj RESET_ERROR = new ResultObj(SysConstast.CODE_ERROR,SysConstast.RESET_ERROR);

    /**
     * 分配成功
     */
    public static final ResultObj DISPATCH_SUCCESS = new ResultObj(SysConstast.CODE_SUCCESS,SysConstast.DISPATCH_SUCCESS);
    /**
     * 分配失败
     */
    public static final ResultObj DISPATCH_ERROR = new ResultObj(SysConstast.CODE_ERROR,SysConstast.DISPATCH_ERROR);

    /**
     * 状态码0 成功
     */
    public static final ResultObj STATUS_TRUE = new ResultObj(SysConstast.CODE_SUCCESS);

    /**
     * 状态码-1 失败
     */
    public static final ResultObj STATUS_FALSE = new ResultObj(SysConstast.CODE_ERROR);


    private ResultObj(Integer code, String msg) {
        this.code = code;
        this.msg = msg;
    }

    private ResultObj(Integer code) {
        this.code = code;
    }

    public Integer getCode() {
        return code;
    }

    public void setCode(Integer code) {
        this.code = code;
    }

    public String getMsg() {
        return msg;
    }

    public void setMsg(String msg) {
        this.msg = msg;
    }
}
