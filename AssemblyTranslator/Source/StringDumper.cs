using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using Mono.Cecil;
using Mono.Cecil.Cil;

namespace AssemblyTranslator
{
    /// <summary>
    /// Dump all strings and type, method infos in an assembly.
    /// </summary>
    static class StringDumper
    {
        public static void DumpStrings(AssemblyDefinition assembly)
        {
            var walker = new TypeWalker();
            walker.MethodFound += MethodFound;
            walker.WalkAssembly(assembly);
        }

        private static void MethodFound(TypeDefinition type, MethodDefinition method)
        {
            if (!method.HasBody)
                return;
            foreach(var instruction in method.Body.Instructions)
            {
                if (instruction.OpCode == OpCodes.Ldstr)
                {
                    string s = instruction.Operand as string;
                    if (s.Contains('{') || s.Contains('\\') || s.Contains('_'))
                        continue;
                    if (s == "\n")
                        continue;
                    if (s.Trim() == "")
                        continue;
                    string output = String.Format("{0}/{1}:{2}", type.FullName, method.Name,s);
                    Console.WriteLine(output);
                }
            }
        }
    }
}
