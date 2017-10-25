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
        /// <summary>
        /// создаем контекст данных
        /// </summary>
        EmployeeContext db = new EmployeeContext();

        /// <summary>
        /// Поле для хранения списка
        /// </summary>
        //List<Employee> mEmployees = null;

        //string mSortColumn = "None";
        //string mSortDirection = "None";

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
        public ActionResult GetEmployees(string aColumn, string aDirection)
        {
            //if (mEmployees == null) 
            //{
            //    mEmployees = db.Employees.ToList<Employee>();
            //}
            IEnumerable<Employee> lEmployees = SortEmployeeList(db.Employees.ToList<Employee>(), aColumn, aDirection);
            return Json(lEmployees, JsonRequestBehavior.AllowGet); // Передача таблицы через JSON запрос
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
        public JsonResult DeleteEmployee(int id)
        {
            Employee lEmployee = db.Employees.FirstOrDefault(x => x.Id == id);
            if (lEmployee != null)
            {
                db.Employees.Remove(lEmployee);
                db.SaveChanges();
                return Json(lEmployee);
            }
            return Json(new { id = 0 });
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="aColumn"></param>
        /// <param name="aDirection"></param>
        /// <returns></returns>
        [Authorize]
        [HttpPost]
        public JsonResult SetSortParametrs(string aColumn, string aDirection)
        {
            //mSortColumn = aColumn;
            //mSortDirection = aDirection;
            return Json(new { Column = aColumn, Direction = aDirection });
        }


        /// <summary>
        /// Метод сортировки списка сотрудников по указанным параметрам
        /// </summary>
        /// <param name="aList">Список для сотрировки</param>
        /// <param name="aColumn">Столбец сортировки</param>
        /// <param name="aDirection">Направление</param>
        /// <returns>Отсортированный список</returns>
        private List<Employee> SortEmployeeList(List<Employee> aList, string aColumn, string aDirection)
        {
            List<SCTestTask.Models.Employee> lEmployeeList = aList;
            switch (aColumn)
            {
                case "Name":
                    if (aDirection == "Ascending")
                    {
                        lEmployeeList = aList.OrderBy(u => u.Name).ToList<Employee>();
                    }
                    else // "Descending"
                    {
                        lEmployeeList = aList.OrderByDescending(u => u.Name).ToList<Employee>();
                    }
                    break;
                case "Birthday":
                    if (aDirection == "Ascending")
                    {
                        lEmployeeList = aList.OrderBy(u => u.Birthday).ToList<Employee>();
                    }
                    else // "Descending"
                    {
                        lEmployeeList = aList.OrderByDescending(u => u.Birthday).ToList<Employee>();
                    }
                    break;
                case "Email":
                    if (aDirection == "Ascending")
                    {
                        lEmployeeList = aList.OrderBy(u => u.Email).ToList<Employee>();
                    }
                    else // "Descending"
                    {
                        lEmployeeList = aList.OrderByDescending(u => u.Email).ToList<Employee>();
                    }
                    break;
                case "Salary":
                    if (aDirection == "Ascending")
                    {
                        lEmployeeList = aList.OrderBy(u => u.Salary).ToList<Employee>();
                    }
                    else // "Descending"
                    {
                        lEmployeeList = aList.OrderByDescending(u => u.Salary).ToList<Employee>();
                    }
                    break;
                default:
                    break;
            }
            return lEmployeeList;
        }
    }
}