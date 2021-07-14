package com.yeqifu.bus.service;

import com.yeqifu.bus.domain.Action;
import com.yeqifu.bus.vo.ActionVo;
import com.yeqifu.sys.utils.DataGridView;

import java.util.List;

public interface IActionService {

    /**
     * 查询所有客户
     * @param Vo
     * @return
     */
    public DataGridView queryAll(ActionVo Vo);

    /**
     * 添加客户
     * @param Vo
     */
    public void add(ActionVo Vo);

    /**
     * 修改客户
     * @param Vo
     */
    public void update(ActionVo Vo);

    /**
     * 删除客户
     * @param identity
     */
    public void delete(String identity);

    /**
     * 批量删除客户
     * @param identitys
     */
    public void deleteBatch(String [] identitys);

    /**
     * 根据身份号查询客户信息
     * @param identity
     * @return
     */
    public Action queryByIdentity(String identity);

    /**
     * 查询客户数据返回集合
     * @param Vo
     * @return
     */
    List<Action> queryAllForList(ActionVo Vo);
}
