using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SCTestTask.Models
{
    public class Employee
    {
        // ID сотрудника
        public int Id { get; set; }
        // Имя сотрудника
        public string Name { get; set; }
        // Адрес электронной почты
        public string Email { get; set; }
        // День рождения
        public DateTime Birthday { get; set; }
        // Доход сотрудника
        public float Salary { get; set; }
    }
}