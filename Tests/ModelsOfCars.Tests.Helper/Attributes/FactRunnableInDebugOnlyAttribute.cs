using System.Diagnostics;
using Xunit;

namespace ModelsOfCars.Tests.Helper.Attributes
{
    public class FactRunnableInDebugOnlyAttribute : FactAttribute
    {
        public FactRunnableInDebugOnlyAttribute()
        {
            if (!Debugger.IsAttached)
            {
                Skip = "Only running in interactive mode.";
            }
        }
    }
}
