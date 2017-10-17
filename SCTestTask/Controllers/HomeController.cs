using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using SCTestTask.Models;

namespace SCTestTask.Controllers
{
    public class HomeController : Controller
    {
        // создаем контекст данных
        EmployeesContext db = new EmployeesContext();

        public ActionResult Index()
        {
            // получаем из бд все объекты Book
            IEnumerable<Employee> lEmployees = db.Employees;
            // передаем все объекты в динамическое свойство Books в ViewBag
            ViewBag.Employees = lEmployees;
            // возвращаем представление
            return View();
        }
    }
}