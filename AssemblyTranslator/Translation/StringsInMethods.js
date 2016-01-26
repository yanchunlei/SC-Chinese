function translateMethod(typeName, methodName, translation) {
    System.Console.Write("Translating method: " + typeName + "::" + methodName + " ...");

    var AssemblyTranslator = importNamespace("AssemblyTranslator");
    translation = generateTranslation(translation);
    var method = inspector.FindMethod(typeName, methodName);
    AssemblyTranslator.Translator.ReplaceStrings(method, translation);

    System.Console.WriteLine(" Done.");
}
function translateMethodReg(typeName, methodNameReg, translation) {
    System.Console.Write("Translating method: " + typeName + "::" + methodNameReg + " ...");

    var AssemblyTranslator = importNamespace("AssemblyTranslator");
    translation = generateTranslation(translation);
    var methods = inspector.FindMethodReg(typeName, methodNameReg);
    for (var i in methods) {
        var method = methods[i];
        AssemblyTranslator.Translator.ReplaceStrings(method, translation);
    }

    System.Console.WriteLine(" Done.");
}

function generateTranslation(object) {
    var Translation = System.Collections.Generic.Dictionary(System.String, System.String);
    var translation = new Translation();
    for (var key in object) {
        var value = object[key];
        translation.Add(key, value);
    }
    return translation;
}

translateMethodReg("Game.SubsystemIntro", "^<ShipView_Enter>b__\\d$", {
    "Weigh anchor, boys.": "起锚，伙计们。",
    "And you there, on the shore!": "你在那边，在岸上。",
    "Remember, we won't be back for you!": "记住，我们永远不会为了你再回来的！"
});