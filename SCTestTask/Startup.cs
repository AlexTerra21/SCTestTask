using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(SCTestTask.Startup))]
namespace SCTestTask
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
