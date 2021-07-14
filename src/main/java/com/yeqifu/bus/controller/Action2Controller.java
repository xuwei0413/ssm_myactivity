package com.yeqifu.bus.controller;

import com.yeqifu.bus.domain.ActionDetaile;
import com.yeqifu.bus.mapper.ActionDetaileMapper;
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
@RequestMapping("action2")
public class Action2Controller {

    @Autowired
    private IActionDetaileService actionDetaileService;

    @Autowired
    private ActionDetaileMapper actionDetaileMapper;

    @Autowired
    private IActionService actionService;

    /**
     * 加载活动列表返回DataGridView
     * @param modelVo
     * @return
     */
    @RequestMapping("loadAll")
    public DataGridView loadAll(ActionVo modelVo){
        return this.actionService.queryAll(modelVo);
    }

    /**
     * 加入一个活动
     * @param modelVo
     * @return
     */
    @RequestMapping("join")
    public ResultObj add(ActionDetaile modelVo){
        try{
            User user =(User) WebUtils.getHttpSession().getAttribute("user");
            modelVo.setCareer(user.getLoginname());
            //首先查询下是否自己已经参团
            int number = this.actionDetaileMapper.checkIsUnion(modelVo.getIdentity(),modelVo.getCareer());
            if(number>0){
                return ResultObj.JOIN_ERROR;
            }
            this.actionDetaileService.add(modelVo);
            return ResultObj.ADD_SUCCESS;
        }catch (Exception e){
            e.printStackTrace();
            return ResultObj.ADD_ERROR;
        }
    }

}
