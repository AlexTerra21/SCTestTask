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
        /// <summary>
        /// Регистрация в системе
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        [HttpPost]
        public ActionResult Login(LoginModel model)
        {
            User user = null;
            using (EmployeeContext db = new EmployeeContext())
            {
                user = db.Users.FirstOrDefault(u => u.Login == model.Name && u.Password == model.Password);  // Поиск пользователя в бд
            }
            if (user != null) // Пользователь найден
            {
                FormsAuthentication.SetAuthCookie(model.Name, true); // Подключаем аутентификационные куки
                return Json(new { result = true, message = "Authentication success" }, JsonRequestBehavior.AllowGet); 
            }
            return Json(new { result = false, message = "Authentication error" }, JsonRequestBehavior.AllowGet);  // ... иначе возвращаем сообщение.
        }

        /// <summary>
        /// Выход из системы
        /// </summary>
        /// <returns></returns>
        public ActionResult Logoff()
        {
            FormsAuthentication.SignOut(); // Очистка данных аутентификации
            return Json(new { result = true }, JsonRequestBehavior.AllowGet);
        }
    }
}