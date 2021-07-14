package com.yeqifu.bus.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * 业务管理的路由控制器
 */
@Controller
@RequestMapping("bus")
public class BusController {

    /**
     * 跳转到活动管理
     * @return
     */
    @RequestMapping("toActionManager")
    public String toCustomerManager(){
        return "business/action/actionManager";
    }

    /**
     * 跳转到活动管理
     * @return
     */
    @RequestMapping("toActionManager2")
    public String toCustomer2Manager(){
        return "business/action/actionManager2";
    }

    /**
     * 跳转到活动管理
     * @return
     */
    @RequestMapping("toActionDetaileManager")
    public String toCustomerDeatileManager(){
        return "business/action/actionDataileManager";
    }
}
