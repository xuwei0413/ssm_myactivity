package com.yeqifu.bus.mapper;

import com.yeqifu.bus.domain.ActionDetaile;
import com.yeqifu.bus.vo.ActionDetaileVo;
import org.apache.ibatis.annotations.Param;

import java.util.List;

public interface ActionDetaileMapper {
    int deleteByPrimaryKey(String identity);

    int insertSelective(ActionDetaile record);

    ActionDetaile selectByPrimaryKey(String identity);

    int updateByPrimaryKeySelective(ActionDetaile record);

    int updateByPrimaryKey(ActionDetaile record);

    List<ActionDetaile> queryAll(ActionDetaile ActionDetaile);

    int insert(ActionDetaile modelVo);

    String getPersonNumber(String identity);

    String getJoinNumber(String identity);

    int checkIsUnion(@Param("identity") String identity, @Param("career") String career);
}