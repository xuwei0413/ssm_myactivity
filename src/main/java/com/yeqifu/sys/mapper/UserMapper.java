package com.yeqifu.sys.mapper;

import com.yeqifu.sys.domain.User;
import com.yeqifu.sys.vo.UserVo;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserMapper {
    int deleteByPrimaryKey(Integer userid);

    int insert(User record);

    int insertSelective(User record);

    User selectByPrimaryKey(Integer userid);

    int updateByPrimaryKeySelective(User record);

    int updateByPrimaryKey(User record);

    /**
     * 登陆
     */
    User login(User user);

    /**
     * 查询用户
     * @param user
     * @return
     */
    List<User> queryAllUser(User user);

    /**
     * 保存用户和角色的关系
     * @param userid
     * @param rid
     */
    void insertUserRole(@Param("uid") Integer userid,@Param("rid") Integer rid);

    /*
    *   校验用户是否存在
    * */
    Integer selectByName(UserVo userVo);
}