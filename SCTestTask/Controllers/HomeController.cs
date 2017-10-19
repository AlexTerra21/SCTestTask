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
        EmployeeContext db = new EmployeeContext();

        public ActionResult Index()
        {
            // получаем из бд все объекты Employees
            IEnumerable<Employee> lEmployees = db.Employees;
            // передаем все объекты в динамическое свойство Employees в ViewBag
            ViewBag.Employees = lEmployees;
            // возвращаем представление
            return View();
        }
    }
}