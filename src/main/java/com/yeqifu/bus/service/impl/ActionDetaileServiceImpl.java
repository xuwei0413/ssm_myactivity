package com.yeqifu.bus.service.impl;

import cn.hutool.core.date.DateUnit;
import com.github.pagehelper.Page;
import com.github.pagehelper.PageHelper;
import com.yeqifu.bus.domain.Action;
import com.yeqifu.bus.domain.ActionDetaile;
import com.yeqifu.bus.mapper.ActionDetaileMapper;
import com.yeqifu.bus.mapper.ActionMapper;
import com.yeqifu.bus.service.IActionDetaileService;
import com.yeqifu.bus.service.IActionService;
import com.yeqifu.bus.vo.ActionDetaileVo;
import com.yeqifu.bus.vo.ActionVo;
import com.yeqifu.sys.utils.DataGridView;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ActionDetaileServiceImpl implements IActionDetaileService {

    @Autowired
    private ActionDetaileMapper actionDetaileMapper;

    @Autowired
    private ActionMapper actionMapper;
    /**
     * 查询所有客户信息 分页
     * @param modelVo
     * @return
     */
    @Override
    public DataGridView queryAll(ActionDetaileVo modelVo) {
        Page<Object> page = PageHelper.startPage(modelVo.getPage(),modelVo.getLimit());
        List<ActionDetaile> data = this.actionDetaileMapper.queryAll(modelVo);
        return new DataGridView(page.getTotal(),data);
    }

    /**
     * 更新一个客户
     * @param modelVo
     */
    @Override
    public void update(ActionDetaileVo modelVo) {
        this.actionDetaileMapper.updateByPrimaryKeySelective(modelVo);
    }

    /**
     * 删除一个客户
     * @param identity
     */
    @Override
    public void delete(String identity) {
        this.actionDetaileMapper.deleteByPrimaryKey(identity);
    }

    /**
     * 批量删除客户
     * @param identitys
     */
    @Override
    public void deleteBatch(String[] identitys) {
        for (String identity : identitys) {
            this.delete(identity);
        }

    }

    /**
     * 通过身份证号查询客户
     * @param identity
     * @return
     */
    @Override
    public ActionDetaile queryByIdentity(String identity) {
        return this.actionDetaileMapper.selectByPrimaryKey(identity);
    }

    /**
     * 查询所有客户数据不分页
     * @param modelVo
     * @return
     */
    @Override
    public List<ActionDetaile> queryAllForList(ActionDetaileVo modelVo) {
        return this.actionDetaileMapper.queryAll(modelVo);
    }

    @Override
    public void add(ActionDetaile modelVo) {
        this.actionDetaileMapper.insert(modelVo);
        //是否需要修改参团状态
        String personNumber = this.actionDetaileMapper.getPersonNumber(modelVo.getIdentity());
        String joinNumber = this.actionDetaileMapper.getJoinNumber(modelVo.getIdentity());
        if(Integer.parseInt(personNumber)==Integer.parseInt(joinNumber)){
            //修改主表状态为组团成功
            Action model = new Action();
            model.setIdentity(modelVo.getIdentity());
            model.setStatus("组团成功");
            this.actionMapper.updateByPrimaryKeySelective(model);
        }
    }
}
