package com.yeqifu.bus.mapper;

import com.yeqifu.bus.domain.Action;

import java.util.List;

public interface ActionMapper {
    int deleteByPrimaryKey(String identity);

    int insert(Action record);

    int insertSelective(Action record);

    Action selectByPrimaryKey(String identity);

    int updateByPrimaryKeySelective(Action record);

    int updateByPrimaryKey(Action record);

    List<Action> queryAll(Action action);

    String getRemark(String identity);
}