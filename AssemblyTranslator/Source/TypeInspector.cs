using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using Mono.Cecil;

namespace AssemblyTranslator
{
    /// <summary>
    /// Find types in TypeList by its FullName.
    /// </summary>
    public class TypeInspector
    {
        public List<TypeDefinition> TypeList { get; private set; }
        public List<AssemblyDefinition> AssemblyList { get; private set; }
        private Dictionary<string, TypeDefinition> m_typeCache;

        public TypeInspector()
        {
            TypeList = new List<TypeDefinition>();
            AssemblyList = new List<AssemblyDefinition>();
            m_typeCache = new Dictionary<string, TypeDefinition>();
        }

        /// <summary>
        /// Add all types in an assembly into TypeList.
        /// </summary>
        /// <param name="assembly">assembly to scan</param>
        public void ScanAssembly(AssemblyDefinition assembly)
        {
            foreach (var module in assembly.Modules)
                ScanModule(module);
            AssemblyList.Add(assembly);
        }

        /// <summary>
        /// Add all types in a module into TypeList.
        /// </summary>
        /// <param name="module">module to scan</param>
        public void ScanModule(ModuleDefinition module)
        {
            TypeList.AddRange(module.Types);
        }

        /// <summary>
        /// Find a type in TypeList by its FullName
        /// </summary>
        /// <param name="path">full name of the type to find</param>
        /// <returns></returns>
        public TypeDefinition FindType(string path)
        {
            if (path.StartsWith("/"))
            {
                throw new ArgumentException("Path must not start with a '/'.");
            }
            if (path.EndsWith("/"))
            {
                path = path.Substring(0, path.Length - 1);
            }
            if (m_typeCache.ContainsKey(path))
            {
                return m_typeCache[path];
            }

            string[] components = path.Split('/');

            var firstTypeName = components[0];
            var cachePath = "/" + firstTypeName;

            TypeDefinition firstType;
            if (m_typeCache.ContainsKey(cachePath))
            {
                firstType = m_typeCache[cachePath];
            }
            else
            {
                firstType = TypeList.Single(t => t.FullName == firstTypeName);
                m_typeCache.Add(cachePath, firstType);
            }

            var type = firstType;
            for (int i = 1; i < components.Length; ++i)
            {
                var typeName = components[i];
                cachePath += "/" + typeName;
                if (m_typeCache.ContainsKey(cachePath))
                {
                    type = m_typeCache[cachePath];
                }
                else
                {
                    type = type.NestedTypes.Single(t => t.Name == typeName);
                    m_typeCache.Add(cachePath, type);
                }
            }

            return type;
        }

        /// <summary>
        /// Find a method by type path and method name.
        /// </summary>
        /// <param name="path">path</param>
        /// <param name="methodName">method name</param>
        /// <returns></returns>
        public MethodDefinition FindMethod(string path, string methodName)
        {
            var type = FindType(path);
            return type.Methods.Single(m => m.Name == methodName);
        }
    }
}
