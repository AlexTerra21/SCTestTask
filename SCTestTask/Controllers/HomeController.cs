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

        List<Employee> mEmployees = null;
        [Authorize]
        public ActionResult Index()
        {
            // возвращаем представление
            return View();
        }

        [Authorize]
        [HttpGet]
        public ActionResult Add(int id)
        {
            //ViewBag.BookId = id;
            Console.WriteLine("Id="+id.ToString());
            return View();
        }

        [Authorize]
        [HttpGet]
        public ActionResult Edit()
        {
            //ViewBag.BookId = id;
            return View();
        }

        /// <summary>
        /// Получить сотрудника по id
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [Authorize]
        [HttpPost]
        public ActionResult GetEmployee(int id)
        {
            Employee lEmployee = db.Employees.FirstOrDefault(x => x.Id == id);
            return Json(lEmployee, JsonRequestBehavior.AllowGet); // Передача таблицы через JSON запрос
        }

        /// <summary>
        /// Через JSON-запрос возвращаем список сотрудников
        /// </summary>
        /// <returns></returns>
        [Authorize]
        public ActionResult GetEmployees()
        {
            if (mEmployees == null) 
            {
                mEmployees = db.Employees.ToList<Employee>();
            }
            //IEnumerable<Employee> lEmployees = db.Employees;
            return Json(mEmployees, JsonRequestBehavior.AllowGet); // Передача таблицы через JSON запрос
        }

        [Authorize]
        public ActionResult GetCountElement()
        {
            return Json(db.Employees.Count<Employee>(),JsonRequestBehavior.AllowGet);
        }

        /// <summary>
        /// Добавление сотрудника в базу данных или обновление данных о сотруднике
        /// Если Id == 0 сотрудник будет добавлен
        /// иначе информация о сотруднике будет обновлена
        /// </summary>
        /// <param name="aEmployee"></param>
        /// <returns></returns>
        [Authorize]
        [HttpPost]
        public ActionResult AddReplaceEmployee(Employee aEmployee)
        {
            // Добавляем 12 часов для правильного отображения даты
            if (aEmployee.Birthday.Hour == 0) aEmployee.Birthday = aEmployee.Birthday.AddHours(12);
            if (aEmployee.Id == 0)
            {
                db.Employees.Add(aEmployee);
            }
            else
            {
                Employee lEmployee = db.Employees.FirstOrDefault(x => x.Id == aEmployee.Id);
                lEmployee.Name = aEmployee.Name;
                lEmployee.Birthday = aEmployee.Birthday; 
                lEmployee.Email = aEmployee.Email;
                lEmployee.Salary = aEmployee.Salary;
            }
            db.SaveChanges();
            return Json(aEmployee);
        }

        /// <summary>
        /// Удаление сотрудника из базы данных
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [Authorize]
        [HttpPost]
        public ActionResult DeleteEmployee(int id)
        {
            Employee lEmployee = db.Employees.FirstOrDefault(x => x.Id == id);
            if (lEmployee != null)
            {
                db.Employees.Remove(lEmployee);
                db.SaveChanges();
                return Json(lEmployee);
            }
            return HttpNotFound();
        }
    }
}