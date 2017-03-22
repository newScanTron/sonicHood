using System;
using System.Collections.Generic;
using D = System.Data;
using c = System.Data.SqlClient;
using System.Web.Configuration;

public class SonicUser
{
 	public string UserName = "Im new";
  public string Email;
  public int Double(int i)
  {
    return i * 2;
  }
}

public class UserBuisnasty
{
    private List<SonicUser> Users = new List<SonicUser>();
  
  public List<SonicUser> EmailList()
  {
     var conString = WebConfigurationManager.ConnectionStrings["sonichood"].ConnectionString;
    using (var connection = new c.SqlConnection(conString))
    {
        connection.Open();

        
        var selectQueryString = "SELECT Users.*, Email.Email FROM Users INNER JOIN Email ON Email.userName = Users.userName";

        using (var command = new c.SqlCommand())
        {
            command.Connection = connection;
            command.CommandType = D.CommandType.Text;
            command.CommandText = selectQueryString;

            c.SqlDataReader reader = command.ExecuteReader();

            while (reader.Read())
            {
                var sUser1 = new SonicUser();
                sUser1.UserName = @reader["Username"].ToString();
                sUser1.Email = @reader["Email"].ToString();
                Users.Add(sUser1);
                
            }
        }
        return Users;
    }
  }
}