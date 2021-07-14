package com.yeqifu.bus.service.impl;

import com.github.pagehelper.Page;
import com.github.pagehelper.PageHelper;
import com.yeqifu.bus.domain.Action;
import com.yeqifu.bus.mapper.ActionMapper;
import com.yeqifu.bus.service.IActionService;
import com.yeqifu.bus.vo.ActionVo;
import com.yeqifu.sys.utils.DataGridView;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class ActionServiceImpl implements IActionService {

    @Autowired
    private ActionMapper actionMapper;

    /**
     * 查询所有客户信息 分页
     * @param modelVo
     * @return
     */
    @Override
    public DataGridView queryAll(ActionVo modelVo) {
        Page<Object> page = PageHelper.startPage(modelVo.getPage(),modelVo.getLimit());
        List<Action> data = this.actionMapper.queryAll(modelVo);
        for(Action item:data){
            String remark = this.actionMapper.getRemark(item.getIdentity());
            item.setRemark(remark);
        }
        return new DataGridView(page.getTotal(),data);
    }

    /**
     * 添加一个客户
     * @param modelVo
     */
    @Override
    public void add(ActionVo modelVo) {
        this.actionMapper.insertSelective(modelVo);
    }

    /**
     * 更新一个客户
     * @param modelVo
     */
    @Override
    public void update(ActionVo modelVo) {
        this.actionMapper.updateByPrimaryKeySelective(modelVo);
    }

    /**
     * 删除一个客户
     * @param identity
     */
    @Override
    public void delete(String identity) {
        this.actionMapper.deleteByPrimaryKey(identity);
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
    public Action queryByIdentity(String identity) {
        return this.actionMapper.selectByPrimaryKey(identity);
    }

    /**
     * 查询所有客户数据不分页
     * @param modelVo
     * @return
     */
    @Override
    public List<Action> queryAllForList(ActionVo modelVo) {
        return this.actionMapper.queryAll(modelVo);
    }
}
