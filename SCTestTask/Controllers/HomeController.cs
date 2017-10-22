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
            //// получаем из бд все объекты Employees
            //IEnumerable<Employee> lEmployees = db.Employees;
            //// передаем все объекты в динамическое свойство Employees в ViewBag
            //ViewBag.Employees = lEmployees;
            //// возвращаем представление
            return View();
        }

        [HttpGet]
        public ActionResult Add(int id)
        {
            //ViewBag.BookId = id;
            Console.WriteLine("Id="+id.ToString());
            return View();
        }

        [HttpGet]
        public ActionResult Edit()
        {
            //ViewBag.BookId = id;
            return View();
        }


        /// <summary>
        /// Через JSON-запрос возвращаем список сотрудников
        /// </summary>
        /// <returns></returns>
        public ActionResult GetEmployees()
        {
            IEnumerable<Employee> lEmployees = db.Employees;
            return Json(lEmployees, JsonRequestBehavior.AllowGet); // Передача таблицы через JSON запрос
        }

        public ActionResult GetCountElement()
        {
            return Json(db.Employees.Count<Employee>(),JsonRequestBehavior.AllowGet);
        }



        /// <summary>
        /// Добавление сотрудника в базу данных
        /// </summary>
        /// <param name="aEmployee"></param>
        /// <returns></returns>
        [HttpPost]
        public ActionResult AddEmployee(Employee aEmployee)
        {
            //aEmployee.Id = Guid.NewGuid().ToString();
            db.Employees.Add(aEmployee);
            return Json(aEmployee);
        }

        /// <summary>
        /// Удаление сотрудника из базы данных
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpDelete]
        public ActionResult DeleteEmployee(int id)
        {
            Employee lEmployee = db.Employees.FirstOrDefault(x => x.Id == id);
            if (lEmployee != null)
            {
                db.Employees.Remove(lEmployee);
                return Json(lEmployee);
            }
            return HttpNotFound();
        }
    }
}