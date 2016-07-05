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
    /// Translate enum types by replacing ToString method.
    /// </summary>
    public static class Translator
    {
        public static void TranslateEnum(TypeDefinition enumType, TypeInspector inspector, Dictionary<string, string> translation)
        {
            // inject EnumType.GetTranslation()
            var methodGetTranslationName = "GetTranslation" + enumType.Name;
            var methodGetTranslation = new MethodDefinition(methodGetTranslationName, MethodAttributes.Public | MethodAttributes.Static, inspector.FindType("System.String"));
            methodGetTranslation.Parameters.Add(new ParameterDefinition(inspector.FindType("System.String")));
            var il = methodGetTranslation.Body.GetILProcessor();

            var ldarg_0s = new List<Instruction>();
            var brfalses = new List<Instruction>();

            var stringEqualsMethodExternal = inspector.FindType("System.String").Methods.Single(m => {
                if (m.Name != "Equals")
                    return false;
                if (m.Parameters.Count != 2)
                    return false;
                if (m.Parameters[1].ParameterType.ToString() != "System.String")
                    return false;
                return true;
            });
            var stringEqualsMethod = enumType.Module.ImportReference(stringEqualsMethodExternal);
            foreach (var pair in translation)
            {
                var originalName = pair.Key;
                var translatedName = pair.Value;

                var ldarg_0 = il.Create(OpCodes.Ldarg_0);
                ldarg_0s.Add(ldarg_0);
                il.Append(ldarg_0);

                il.Emit(OpCodes.Ldstr, originalName);
                il.Emit(OpCodes.Call, stringEqualsMethod);

                var brfalse = il.Create(OpCodes.Brfalse, ldarg_0);
                brfalses.Add(brfalse);
                il.Append(brfalse);

                il.Emit(OpCodes.Ldstr, translatedName);
                il.Emit(OpCodes.Ret);
            }
            for (int i = 0; i < translation.Count - 1; ++i)
            {
                brfalses[i].Operand = ldarg_0s[i + 1];
            }
            var end = il.Create(OpCodes.Nop);
            il.Append(end);
            il.Emit(OpCodes.Ldstr, "error from qnnnnez: no match found");
            il.Emit(OpCodes.Ret);
            var last = brfalses.Last();
            last.Operand = methodGetTranslation.Body.Instructions.Last().Previous; // ldstr
            
            inspector.FindType("Game.Program").Methods.Add(methodGetTranslation);

            // replace EnumType.ToString() with EnumType.GetTranslation()
            var walker = new TypeWalker();
            var patchList = new List<Action>();
            walker.MethodFound += delegate (TypeDefinition type, MethodDefinition method)
            {
                if (!method.HasBody)
                    return;
                foreach (var instruction in method.Body.Instructions)
                {
                    if ((instruction.OpCode != OpCodes.Box) && (instruction.OpCode != OpCodes.Constrained))
                        continue;
                    if (instruction.Operand != enumType)
                        continue;

                    var nextInstruction = instruction.Next;
                    if (nextInstruction.OpCode != OpCodes.Callvirt)
                        continue;
                    var calledMethod = nextInstruction.Operand as MethodReference;
                    if (calledMethod.ToString() != "System.String System.Object::ToString()")
                        continue;

                    patchList.Add(() =>
                    {
                        var il2 = method.Body.GetILProcessor();
                        var translateMethod = inspector.FindType("Game.Program").Methods.Single(m => m.Name == methodGetTranslationName);
                        var translateInstruction = il.Create(OpCodes.Call, translateMethod);
                        il2.InsertAfter(nextInstruction, translateInstruction);
                    });
                }
            };
            walker.WalkAssembly(enumType.Module.Assembly);

            foreach (var patch in patchList)
                patch();
        }


        public static int ReplaceStrings(MethodDefinition method, Dictionary<string, string> translation)
        {
            int match = 0;
            foreach (var instruction in method.Body.Instructions)
            {
                if (instruction.OpCode == OpCodes.Ldstr)
                {
                    var s = instruction.Operand as string;
                    if (translation.ContainsKey(s))
                    {
                        s = translation[s];
                        ++match;
                    }
                    instruction.Operand = s;
                }
            }
            return match;
        }

        public static int ReplaceNestedStrings(TypeDefinition type, Dictionary<string, string> translation)
        {
            int match = 0;
            foreach(var nestedType in type.NestedTypes)
            {
                foreach(var method in nestedType.Methods)
                {
                    match += ReplaceStrings(method, translation);
                }
            }
            return match;
        }
    }
}
