package com.yeqifu.bus.controller;

import com.yeqifu.bus.domain.ActionDetaile;
import com.yeqifu.bus.service.IActionDetaileService;
import com.yeqifu.bus.service.IActionService;
import com.yeqifu.bus.vo.ActionDetaileVo;
import com.yeqifu.bus.vo.ActionVo;
import com.yeqifu.sys.domain.User;
import com.yeqifu.sys.utils.DataGridView;
import com.yeqifu.sys.utils.ResultObj;
import com.yeqifu.sys.utils.WebUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Date;

@RestController  //以json形式响应数据
@RequestMapping("actionDetaile")
public class ActionDetaileController {

    @Autowired
    private IActionDetaileService actionDetaileService;

    /**
     * 加载活动列表返回DataGridView
     * @param modelVo
     * @return
     */
    @RequestMapping("loadAll")
    public DataGridView loadAll(ActionDetaileVo modelVo){
        User user =(User) WebUtils.getHttpSession().getAttribute("user");
        modelVo.setCareer(user.getLoginname());
        return this.actionDetaileService.queryAll(modelVo);
    }

    /**
     * 修改一个活动
     * @param modelVo
     * @return
     */
    @RequestMapping("update")
    public ResultObj update(ActionDetaileVo modelVo){
        try{
            this.actionDetaileService.update(modelVo);
            return ResultObj.UPDATE_SUCCESS;
        }catch (Exception e){
            e.printStackTrace();
            return ResultObj.UPDATE_ERROR;
        }
    }

    /**
     * 删除一个活动
     * @param modelVo
     * @return
     */
    @RequestMapping("delete")
    public ResultObj delete(ActionDetaileVo modelVo){
        try {
            this.actionDetaileService.delete(modelVo.getIdentity());
            return ResultObj.DELETE_SUCCESS;
        }catch (Exception e){
            e.printStackTrace();
            return ResultObj.DELETE_ERROR;
        }
    }

    /**
     * 批量删除活动
     * @param modelVo
     * @return
     */
    @RequestMapping("deleteBatch")
    public ResultObj deleteBatch(ActionDetaileVo modelVo){
        try{
            this.actionDetaileService.deleteBatch(modelVo.getIds());
            return ResultObj.DELETE_SUCCESS;
        }catch (Exception e){
            e.printStackTrace();
            return ResultObj.DELETE_ERROR;
        }
    }


    /**
     * 支付
     * @param modelVo
     * @return
     */
    @RequestMapping("pay")
    public ResultObj add(ActionDetaile modelVo){
        try{
            return ResultObj.ADD_SUCCESS;
        }catch (Exception e){
            e.printStackTrace();
            return ResultObj.ADD_ERROR;
        }
    }
}
