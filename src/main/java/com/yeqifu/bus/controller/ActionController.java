package com.yeqifu.bus.controller;

import com.yeqifu.bus.service.IActionService;
import com.yeqifu.sys.domain.User;
import com.yeqifu.sys.utils.DataGridView;
import com.yeqifu.sys.utils.ResultObj;
import com.yeqifu.bus.vo.ActionVo;
import com.yeqifu.sys.utils.WebUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Date;

@RestController  //以json形式响应数据
@RequestMapping("action")
public class ActionController {

    @Autowired
    private IActionService actionService;

    /**
     * 加载活动列表返回DataGridView
     * @param modelVo
     * @return
     */
    @RequestMapping("loadAll")
    public DataGridView loadAll(ActionVo modelVo){
        User user =(User) WebUtils.getHttpSession().getAttribute("user");
        modelVo.setCareer(user.getLoginname());
        return this.actionService.queryAll(modelVo);
    }

    /**
     * 添加一个活动
     * @param modelVo
     * @return
     */
    @RequestMapping("add")
    public ResultObj add(ActionVo modelVo){
        try{
            modelVo.setCreatetime(new Date());
            User user =(User) WebUtils.getHttpSession().getAttribute("user");
            if(modelVo.getSex()==1){
                //均分
                Double avgMpney = Double.parseDouble(modelVo.getTotalmoney())/Integer.parseInt(modelVo.getPersonnumber());
                modelVo.setAvgmoney(avgMpney.toString());
            }
            modelVo.setCareer(user.getLoginname());
            this.actionService.add(modelVo);
            return ResultObj.ADD_SUCCESS;
        }catch (Exception e){
            e.printStackTrace();
            return ResultObj.ADD_ERROR;
        }
    }

    /**
     * 修改一个活动
     * @param modelVo
     * @return
     */
    @RequestMapping("update")
    public ResultObj update(ActionVo modelVo){
        try{
            if(modelVo.getSex()==1){
                //均分
                Double avgMpney = Double.parseDouble(modelVo.getTotalmoney())/Integer.parseInt(modelVo.getPersonnumber());
                modelVo.setAvgmoney(avgMpney.toString());
            }
            this.actionService.update(modelVo);
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
    public ResultObj delete(ActionVo modelVo){
        try {
            this.actionService.delete(modelVo.getIdentity());
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
    public ResultObj deleteBatch(ActionVo modelVo){
        try{
            this.actionService.deleteBatch(modelVo.getIds());
            return ResultObj.DELETE_SUCCESS;
        }catch (Exception e){
            e.printStackTrace();
            return ResultObj.DELETE_ERROR;
        }
    }

}
