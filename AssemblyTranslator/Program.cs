using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

using Mono.Cecil;
using Mono.Cecil.Cil;
using Jint;

namespace AssemblyTranslator
{
    class Program
    {
        static void Main(string[] args)
        {
            var assemblySc = AssemblyDefinition.ReadAssembly("Survivalcraft.exe");
            var assemblyEngine = AssemblyDefinition.ReadAssembly("Engine.dll");
            var mscorlib = AssemblyDefinition.ReadAssembly("mscorlib.dll");
            var inspector = new TypeInspector();
            inspector.ScanAssembly(assemblySc);
            inspector.ScanAssembly(assemblyEngine);
            inspector.ScanAssembly(mscorlib);

            var methodLogEvent = inspector.FindMethod("Game.AnalyticsManager", "LogEvent");
            var firstInstruction = methodLogEvent.Body.Instructions[0];
            var il = methodLogEvent.Body.GetILProcessor();
            var retInstruction = il.Create(OpCodes.Ret);
            il.Replace(firstInstruction, retInstruction);

            var engine = new Engine(cfg => cfg.AllowClr(
                typeof(Program).Assembly,
                typeof(Mono.Cecil.AssemblyDefinition).Assembly
                ));
            engine.SetValue("assemblySc", assemblySc);
            engine.SetValue("inspector", inspector);

            var translationList = new string[]
            {
                "EnumTypes.js",
                "StringsInMethods.js"
            };

            foreach(var translationScript in translationList)
            {
                var translationScriptPath = "Translation/" + translationScript;
                var scriptSrc = System.IO.File.ReadAllText(translationScriptPath);
                engine.Execute(scriptSrc);
            }

            assemblySc.Write("Survivalcraft.Translated.exe");
        }
    }
}
