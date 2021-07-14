package com.yeqifu.sys.controller;

import com.github.pagehelper.util.StringUtil;
import com.yeqifu.sys.domain.User;
import com.yeqifu.sys.service.IUserService;
import com.yeqifu.sys.utils.DataGridView;
import com.yeqifu.sys.utils.ResultObj;
import com.yeqifu.sys.utils.WebUtils;
import com.yeqifu.sys.vo.UserVo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * 用户管理控制器
 */
@RestController
@RequestMapping("user")
public class UserController {

    @Autowired
    private IUserService userService;

    /**
     * 加载用户列表返回DataGridView
     * @param userVo
     * @return
     */
    @RequestMapping("loadAllUser")
    public DataGridView loadAllUser(UserVo userVo){
        return this.userService.queryAllUser(userVo);
    }

    /**
     * 添加用户
     * @param userVo
     * @return
     */
    @RequestMapping("addUser")
    public ResultObj addUser(UserVo userVo){
        try{
            this.userService.addUser(userVo);
            return ResultObj.ADD_SUCCESS;
        }catch (Exception e){
            e.printStackTrace();
            return ResultObj.ADD_ERROR;
        }
    }

    /**
     * 修改用户
     * @param userVo
     * @return
     */
    @RequestMapping("updateUser")
    public ResultObj updateUser(UserVo userVo){
        try {
            this.userService.updateUser(userVo);
            return ResultObj.UPDATE_SUCCESS;
        }catch (Exception e){
            e.printStackTrace();
            return ResultObj.UPDATE_ERROR;
        }
    }

    /**
     * 删除用户
     * @param userVo
     * @return
     */
    @RequestMapping("deleteUser")
    public ResultObj deleteUser(UserVo userVo){
        try {
            this.userService.deleteUser(userVo.getUserid());
            return ResultObj.DELETE_SUCCESS;
        }catch (Exception e){
            e.printStackTrace();
            return ResultObj.DELETE_ERROR;
        }
    }

    /**
     * 批量删除用户
     * @param userVo
     * @return
     */
    @RequestMapping("deleteBatchUser")
    public ResultObj deleteBatchUser(UserVo userVo){
        try {
            this.userService.deleteBatchUser(userVo.getIds());
            return ResultObj.DELETE_SUCCESS;
        }catch (Exception e){
            return ResultObj.DELETE_ERROR;
        }
    }

    /**
     * 重置用户密码
     * @param userVo
     * @return
     */
    @RequestMapping("resetUserPwd")
    public ResultObj resetUserPwd(UserVo userVo){
        try {
            this.userService.resetUserPwd(userVo.getUserid());
            return ResultObj.RESET_SUCCESS;
        }catch (Exception e){
            return ResultObj.RESET_ERROR;
        }
    }


    /**
     * 加载用户管理的分配角色的数据
     * @param userVo
     * @return
     */
    @RequestMapping("initUserRole")
    public DataGridView initUserRole(UserVo userVo){
        return this.userService.queryUserRole(userVo.getUserid());
    }

    /**
     * 保存用户和角色的关系
     * @param userVo
     * @return
     */
    @RequestMapping("saveUserRole")
    public ResultObj saveUserRole(UserVo userVo){
        try {
            this.userService.saveUserRole(userVo);
            return ResultObj.DISPATCH_SUCCESS;
        }catch (Exception e){
            e.printStackTrace();
            return ResultObj.DISPATCH_ERROR;
        }
    }
    /**
     * 校验用户是否存在
     * @param userVo
     * @return
     */
    @RequestMapping("checkUser")
    public Integer checkUser(UserVo userVo){
        try{
            if(StringUtil.isEmpty(userVo.getLoginname())){
                return 3;
            }
            Integer num = this.userService.checkUser(userVo);
            if(num==0){
                return 0;
            }else{
                return 1;
            }
        }catch (Exception e){
            e.printStackTrace();
            return 4;
        }
    }


    /**
     * 注册用户
     * @param userVo
     * @return
     */
    @RequestMapping("addUser2")
    public Integer addUser2(UserVo userVo){
        try{
            return this.userService.addUser2(userVo);
        }catch (Exception e){
            e.printStackTrace();
            return 1;
        }
    }


    /**
     * 查询个人信息
     * @return
     */
    @RequestMapping("getUserInfo")
    public DataGridView getUserInfo(){
        User user =(User) WebUtils.getHttpSession().getAttribute("user");
        return new DataGridView(user);
    }


    /**
     * 修改用户密码
     * @param userVo
     * @return
     */
    @RequestMapping("updateUserPwd")
    public ResultObj updateUserPwd(UserVo userVo){
        try {
            this.userService.updateUserPwd(userVo);
            return ResultObj.UPDATE_SUCCESS;
        }catch (Exception e){
            return ResultObj.UPDATE_ERROR;
        }
    }
}
