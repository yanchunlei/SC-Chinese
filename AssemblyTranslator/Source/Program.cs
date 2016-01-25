using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

using Mono.Cecil;

namespace AssemblyTranslator
{
    class Program
    {
        static void Main(string[] args)
        {
            var assembly = AssemblyDefinition.ReadAssembly("Survivalcraft.exe");
            StringDumper.DumpStrings(assembly);
        }
    }
}
