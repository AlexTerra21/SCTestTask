using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using SCTestTask.Models;
using System.Web.Security;

namespace SCTestTask.Controllers
{
    public class AccountController : Controller
    {
        public ActionResult Login()
        {
            return View();
        }

        [HttpPost]
        public ActionResult Login(LoginModel model)
        {
            // поиск пользователя в бд
            User user = null;
            using (EmployeeContext db = new EmployeeContext())
            {
                user = db.Users.FirstOrDefault(u => u.Login == model.Name && u.Password == model.Password);
            }
            if (user != null)
            {
                FormsAuthentication.SetAuthCookie(model.Name, true);
                return Json(new { result = true, message = "Authentication success" }, JsonRequestBehavior.AllowGet); 
            }
            return Json(new { result = false, message = "Authentication error" }, JsonRequestBehavior.AllowGet); 
        }

        
        public ActionResult Logoff()
        {
            FormsAuthentication.SignOut();
            return Json(new { result = true }, JsonRequestBehavior.AllowGet);
        }
    }
}