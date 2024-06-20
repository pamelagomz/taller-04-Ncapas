package org.ffigueroa.parcial02.services;
import org.ffigueroa.parcial02.domain.dtos.user.RegisterUserDTO;
import org.ffigueroa.parcial02.domain.entities.Role;
import org.ffigueroa.parcial02.domain.entities.Token;
import org.ffigueroa.parcial02.domain.entities.User;

import java.util.List;
import java.util.UUID;

public interface UserService {

    // CRUD IMPLEMENTATION FOR USER ENTITY

    public void saveUser(RegisterUserDTO info, Role rol);
    public void deleteUser(User user);

    public void updateUser(String username, String password);
    public User getUser(UUID id);

    public User findUserAuthenticated();
    public List<User> getAllUsers();

    public List<User> getAllByRole(List<Role> roles);

    // END OF CRUD IMPLEMENTATION

    // ADDITIONAL METHODS

    public void addRoleToUser(User user, Role role);
    public void updateRoleToUser(User user, Role role);
    public  void deleteRoleToUser(User user, Role role);

    public User findUserByEmail(String email);
    public User findUserByName(String name);
    public User findByIdentifier(String identifier);

    // Integer getUsersNumberByRole(String date, String roleId);
    // public void removeRoleFromUser(String userId, String roleId);
    // public List<User> getUsersByRole(String roleId);

    // public Integer getUsersNumberByRole(String date, String roleId);

    //Token management
    Token registerToken(User user) throws Exception;
    Boolean isTokenValid(User user, String token);
    void cleanTokens(User user) throws Exception;

    public User findUserByToken(Token token);
    public Token getTokenByContent(String content);
}
