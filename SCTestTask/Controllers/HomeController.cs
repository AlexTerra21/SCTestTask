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

        [Authorize]
        public ActionResult Index()
        {
            // Возвращаем представление
            return View();
        }

        [Authorize]
        [HttpGet]
        public ActionResult Add(int id)
        {
            return View();
        }

        [Authorize]
        [HttpGet]
        public ActionResult Edit()
        {
            return View();
        }

        /// <summary>
        /// Получить сотрудника по id
        /// </summary>
        /// <param name="id">id сотрудника</param>
        /// <returns>JSON объект с данными сотрудника</returns>
        [Authorize]
        [HttpPost]
        public ActionResult GetEmployee(int id)
        {
            Employee lEmployee = db.Employees.FirstOrDefault(x => x.Id == id); // Поиск сотрудника в базе
            return Json(lEmployee, JsonRequestBehavior.AllowGet); // Передача данных сотрудника через JSON запрос
        }

        /// <summary>
        /// Через JSON-запрос возвращаем список сотрудников
        /// </summary>
        /// <param name="aColumn">Колонка сортировки</param>
        /// <param name="aDirection">Направление сортировки</param>
        /// <param name="aCurrentPage">Номер страницы вывода данных</param>
        /// <returns>JSON объект с данными выбранных сотрудников</returns>
        [Authorize]
        [HttpPost]
        public ActionResult GetEmployees(string aColumn, string aDirection, int? aCurrentPage)
        {
            List<Employee> lEmployees = SortEmployeeList(db.Employees.ToList<Employee>(), aColumn, aDirection); // Сотрировка таблицы сотрудников
            int lIndex = 10 * ((int)aCurrentPage - 1); 
            int lCount = db.Employees.Count() - lIndex < 10 ? db.Employees.Count() - lIndex : 10;
            lEmployees = lEmployees.GetRange(lIndex, lCount); // Выбор нужной страницы
            return Json(lEmployees, JsonRequestBehavior.AllowGet); // Передача таблицы через JSON запрос
        }

        /// <summary>
        /// Получение количества сотрудников в базе
        /// </summary>
        /// <returns>JSON объект с количеством сотрудников</returns>
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
            // Добавляем 12 часов для правильного отображения даты рождения
            if (aEmployee.Birthday.Hour == 0) aEmployee.Birthday = aEmployee.Birthday.AddHours(12);
            if (aEmployee.Id == 0)
            {
                db.Employees.Add(aEmployee); // Добавляем сотрудника
            }
            else
            {  // Обновляем данные о сотруднике
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