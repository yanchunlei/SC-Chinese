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
            // map EnumType to string
            var translationMap = new Dictionary<int, string>();
            foreach (var field in enumType.Fields)
            {
                if (field.IsDefinition && field.IsLiteral && field.IsStatic)
                {
                    // is a enum value definition
                    int enumValue = (int)field.Constant;
                    var defaultName = field.Name;
                    var translatedName = translation[defaultName];
                    translationMap.Add(enumValue, translatedName);
                }
            }

            // inject EnumType.GetTranslation()
            var methodGetTranslationName = "GetTranslation" + enumType.Name;
            var methodGetTranslation = new MethodDefinition(methodGetTranslationName, MethodAttributes.Public | MethodAttributes.Static, inspector.FindType("System.String"));
            methodGetTranslation.Parameters.Add(new ParameterDefinition(enumType));
            var il = methodGetTranslation.Body.GetILProcessor();

            var ldarg_0s = new List<Instruction>();
            var bne_uns = new List<Instruction>();
            foreach (var pair in translationMap)
            {
                var enumValue = pair.Key;
                var translatedName = pair.Value;

                var ldarg_0 = il.Create(OpCodes.Ldarg_0);
                ldarg_0s.Add(ldarg_0);
                il.Append(ldarg_0);

                il.Emit(OpCodes.Ldc_I4, enumValue);

                var bne_un = il.Create(OpCodes.Bne_Un, ldarg_0);
                bne_uns.Add(bne_un);
                il.Append(bne_un);

                il.Emit(OpCodes.Ldstr, translatedName);
                il.Emit(OpCodes.Ret);
            }
            for (int i = 0; i < translationMap.Count - 1; ++i)
            {
                bne_uns[i].Operand = ldarg_0s[i + 1];
            }
            var end = il.Create(OpCodes.Nop);
            il.Append(end);
            il.Emit(OpCodes.Ldstr, "error from qnnnnez: no match found");
            il.Emit(OpCodes.Ret);
            var last = bne_uns.Last();
            last.Operand = methodGetTranslation.Body.Instructions.Last().Previous; // ldstr
            
            inspector.FindType("Game.Program").Methods.Add(methodGetTranslation);

            // replace EnumType.ToString() with EnumType.GetTranslation()
            var walker = new TypeWalker();
            walker.MethodFound += delegate (TypeDefinition type, MethodDefinition method)
            {
                if (!method.HasBody)
                    return;
                foreach (var instruction in method.Body.Instructions)
                {
                    if (instruction.OpCode != OpCodes.Box)
                        continue;
                    if (instruction.Operand != enumType)
                        continue;

                    var nextInstruction = instruction.Next;
                    if (nextInstruction.OpCode != OpCodes.Callvirt)
                        continue;
                    instruction.OpCode = OpCodes.Nop;
                    instruction.Operand = null;
                    var calledMethod = nextInstruction.Operand as MethodReference;
                    if (calledMethod.ToString() != "System.String System.Object::ToString()")
                        continue;
                    nextInstruction.OpCode = OpCodes.Call;
                    nextInstruction.Operand = inspector.FindType("Game.Program").Methods.Single(m => m.Name == methodGetTranslationName) as System.Object;
                }
            };
            walker.WalkAssembly(enumType.Module.Assembly);
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
                        s = translation[s];
                    instruction.Operand = s;

                    ++match;
                }
            }
            return match;
        }
    }
}
