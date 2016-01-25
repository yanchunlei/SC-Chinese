using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using Mono.Cecil;

namespace AssemblyTranslator
{
    class TypeInspector
    {
        public List<TypeDefinition> TypeList { get; set; }
        private Dictionary<string, TypeDefinition> m_typeCache;

        public TypeInspector()
        {
            TypeList = new List<TypeDefinition>();
            m_typeCache = new Dictionary<string, TypeDefinition>();
        }

        public void scanAssembly(AssemblyDefinition assembly)
        {
            foreach (var module in assembly.Modules)
                scanModule(module);
        }

        public void scanModule(ModuleDefinition module)
        {
            TypeList.AddRange(module.Types);
        }

        public TypeDefinition findType(string path)
        {
            if (!path.StartsWith("/"))
            {
                throw new ArgumentException("Path must start with a '/'.");
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

            var firstTypeName = components[1];
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
            for (int i = 2; i < components.Length; ++i)
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
    }
}
