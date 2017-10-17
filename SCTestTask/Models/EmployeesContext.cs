using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data.Entity;

namespace SCTestTask.Models
{
    public class EmployeesContext : DbContext
    {
        public DbSet<Employee> Employees { get; set; }
    }
}