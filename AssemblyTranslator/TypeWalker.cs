using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using Mono.Cecil;

namespace AssemblyTranslator
{
    /// <summary>
    /// Walk through a assembly. Report all types, fields, and methods.
    /// </summary>
    class TypeWalker
    {
        public event Action<TypeDefinition> TypeFound;
        public event Action<TypeDefinition, FieldDefinition> FieldFound;
        public event Action<TypeDefinition, MethodDefinition> MethodFound;

        public TypeWalker()
        {
            TypeFound += delegate (TypeDefinition t) { };
            FieldFound += delegate (TypeDefinition t, FieldDefinition f) { };
            MethodFound += delegate (TypeDefinition t, MethodDefinition m) { };
        }

        public void WalkAssembly(AssemblyDefinition asembly)
        {
            foreach (var module in asembly.Modules)
            {
                WalkModule(module);
            }
        }

        public void WalkModule(ModuleDefinition module)
        {
            foreach (var type in module.Types)
            {
                TypeFound(type);
                WalkType(type);
            }
        }

        public void WalkType(TypeDefinition type)
        {
            foreach (var field in type.Fields)
            {
                FieldFound(type, field);
            }
            foreach (var method in type.Methods)
            {
                MethodFound(type, method);
            }
            foreach (var nestedType in type.NestedTypes)
            {
                TypeFound(nestedType);
                WalkType(nestedType);
            }
        }
    }
}
