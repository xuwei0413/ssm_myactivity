package com.yeqifu.bus.service;

import com.yeqifu.bus.domain.ActionDetaile;
import com.yeqifu.bus.vo.ActionDetaileVo;
import com.yeqifu.sys.utils.DataGridView;

import java.util.List;

public interface IActionDetaileService {

    /**
     * 查询所有活动
     * @param modelVo
     * @return
     */
    public DataGridView queryAll(ActionDetaileVo modelVo);

    /**
     * 修改活动
     * @param modelVo
     */
    public void update(ActionDetaileVo modelVo);

    /**
     * 删除活动
     * @param identity
     */
    public void delete(String identity);

    /**
     * 批量删除活动
     * @param identitys
     */
    public void deleteBatch(String[] identitys);

    /**
     * 根据身份号查询活动信息
     * @param identity
     * @return
     */
    public ActionDetaile queryByIdentity(String identity);

    /**
     * 查询活动数据返回集合
     * @param modelVo
     * @return
     */
    List<ActionDetaile> queryAllForList(ActionDetaileVo modelVo);

    /*
    *   加入活动
    * */
    public void add(ActionDetaile modelVo);
}
