﻿using System;
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
            db.Employees.Add(new Employee { Name = "Джонни Галэки", Birthday = new DateTime(1975, 4, 30), Email = "galecki@hollywood.com", Salary = 11000 });
            db.Employees.Add(new Employee { Name = "Джим Парсонс", Birthday = new DateTime(1973, 3, 24), Email = "parsons@hollywood.com", Salary = 100000 });
            db.Employees.Add(new Employee { Name = "Кейли Куоко", Birthday = new DateTime(1985, 11, 30), Email = "cuoco@hollywood.com", Salary = 12000 });
            db.Employees.Add(new Employee { Name = "Саймон Хелберг", Birthday = new DateTime(1980, 12, 9), Email = "helberg@hollywood.com", Salary = 13000 });
            db.Employees.Add(new Employee { Name = "Кунал Найяр", Birthday = new DateTime(1981, 4, 30), Email = "nayyar@hollywood.com", Salary = 14000 });
            db.Employees.Add(new Employee { Name = "Майем Биалик", Birthday = new DateTime(1975, 12, 12), Email = "bialik@hollywood.com", Salary = 15000 });
            db.Employees.Add(new Employee { Name = "Мелисса Рауш,", Birthday = new DateTime(1980, 6, 23), Email = "rauch@hollywood.com", Salary = 16000 });
            base.Seed(db);
        }
    }
}