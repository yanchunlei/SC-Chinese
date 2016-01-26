function translateEnum(fullName, translation) {
    System.Console.WriteLine("Translating enum: " + fullName);
    var AssemblyTranslator = importNamespace("AssemblyTranslator");
    translation = generateTranslation(translation);
    AssemblyTranslator.EnumTranslator.TranslateEnum(inspector.FindType(fullName), inspector, translation);
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

translateEnum("Game.BlockDigMethod", {
    "None": "None",
    "Shovel": "铲子",
    "Quarry": "镐",
    "Hack": "劈"
});

translateEnum("Game.GameMode", {
    "Creative": "创造",
    "Harmless": "无害",
    "Challenging": "挑战",
    "Cruel": "残酷",
    "Adventure": "冒险"
});
