using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;

namespace SCTestTask.Models
{
    public class EmployeeDbInitializer : DropCreateDatabaseAlways<EmployeeContext>
    {
        protected override void Seed(EmployeeContext db)
        {
            db.Employees.Add(new Employee { Name = "Джонни Галэки", Birthday = new DateTime(1975, 4, 30, 12, 00, 00), Email = "galecki@hollywood.com", Salary = 11000 });
            db.Employees.Add(new Employee { Name = "Джим Парсонс", Birthday = new DateTime(1973, 3, 24, 12, 00, 00), Email = "parsons@hollywood.com", Salary = 100000 });
            db.Employees.Add(new Employee { Name = "Кейли Куоко", Birthday = new DateTime(1985, 11, 30, 12, 00, 00), Email = "cuoco@hollywood.com", Salary = 12000 });
            db.Employees.Add(new Employee { Name = "Саймон Хелберг", Birthday = new DateTime(1980, 12, 9, 12, 00, 00), Email = "helberg@hollywood.com", Salary = 13000 });
            db.Employees.Add(new Employee { Name = "Кунал Найяр", Birthday = new DateTime(1981, 4, 30, 12, 00, 00), Email = "nayyar@hollywood.com", Salary = 14000 });
            db.Employees.Add(new Employee { Name = "Майем Биалик", Birthday = new DateTime(1975, 12, 12, 12, 00, 00), Email = "bialik@hollywood.com", Salary = 15000 });
            db.Employees.Add(new Employee { Name = "Мелисса Рауш", Birthday = new DateTime(1980, 6, 23, 12, 00, 00), Email = "rauch@hollywood.com", Salary = 16000 });
            db.Employees.Add(new Employee { Name = "Кэрол Энн Сьюзи", Birthday = new DateTime(1952, 2, 2, 12, 00, 00), Email = "susi@hollywood.com", Salary = 17000 });
            db.Employees.Add(new Employee { Name = "Кевин Суссман", Birthday = new DateTime(1970, 12, 4, 12, 00, 00), Email = "sussman@hollywood.com", Salary = 18000 });
            db.Employees.Add(new Employee { Name = "Арти Манн", Birthday = new DateTime(1978, 3, 3, 12, 00, 00), Email = "mann@hollywood.com", Salary = 19000 });
            db.Employees.Add(new Employee { Name = "Брайан Джордж", Birthday = new DateTime(1952, 7, 1, 12, 00, 00), Email = "george@hollywood.com", Salary = 21000 });
            db.Employees.Add(new Employee { Name = "Элис Эмтер", Birthday = new DateTime(1966, 5, 11, 12, 00, 00), Email = "amter@hollywood.com", Salary = 23400 });
            db.Employees.Add(new Employee { Name = "Сара Гилберт", Birthday = new DateTime(1975, 1, 29, 12, 00, 00), Email = "gilbert@hollywood.com", Salary = 34000 });
            db.Employees.Add(new Employee { Name = "Джон Росс Боуи", Birthday = new DateTime(1971, 5, 30, 12, 00, 00), Email = "bowie@hollywood.com", Salary = 87600 });
            db.Employees.Add(new Employee { Name = "Уил Уитон", Birthday = new DateTime(1972, 7, 29, 12, 00, 00), Email = "wheaton@hollywood.com", Salary = 98000 });
            db.Employees.Add(new Employee { Name = "Лори Меткаф", Birthday = new DateTime(1955, 6, 16, 12, 00, 00), Email = "metcalf@hollywood.com", Salary = 54000 });
            db.Employees.Add(new Employee { Name = "Верни Уотсон-Джонсон", Birthday = new DateTime(1954, 1, 14, 12, 00, 00), Email = "watson-johnson@hollywood.com", Salary = 63000 });
            db.Employees.Add(new Employee { Name = "Кристин Барански", Birthday = new DateTime(1952, 5, 2, 12, 00, 00), Email = "baranski@hollywood.com", Salary = 19800 });
            db.Employees.Add(new Employee { Name = "Джошуа Малина", Birthday = new DateTime(1966, 1, 17, 12, 00, 00), Email = "malina@hollywood.com", Salary = 42000 });
            db.Employees.Add(new Employee { Name = "Кейси Сэндер", Birthday = new DateTime(1956, 6, 6, 12, 00, 00), Email = "sander@hollywood.com", Salary = 94000 });
            db.Employees.Add(new Employee { Name = "Кэти Леклерк", Birthday = new DateTime(1986, 11, 6, 12, 00, 00), Email = "leclerc@hollywood.com", Salary = 73000 });
            
            db.Users.Add(new User { Login = "admin", Password = "admin" });

            base.Seed(db);
        }
    }
}