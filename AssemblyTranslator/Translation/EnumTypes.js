function translateEnum(fullName, translation) {
    System.Console.Write("Translating enum: " + fullName + " ...");
    var AssemblyTranslator = importNamespace("AssemblyTranslator");
    translation = generateTranslation(translation);
    AssemblyTranslator.Translator.TranslateEnum(inspector.FindType(fullName), inspector, translation);
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

translateEnum("Game.BlockDigMethod", {
    "None": "None",
    "Shovel": "铲子",
    "Quarry": "镐",
    "Hack": "斧头"
});

translateEnum("Game.GameMode", {
    "Creative": "创造",
    "Harmless": "无害",
    "Challenging": "挑战",
    "Cruel": "残酷",
    "Adventure": "冒险"
});

translateEnum("Game.EnvironmentBehaviorMode", {
    "Living": "动态",
    "Static": "静态"
});

translateEnum("Game.TerrainGenerationMode", {
    "Normal": "正常",
    "Flat": "平坦"
});

translateEnum("Game.ExternalContentType", {
    "Unknown": "未知",
    "Directory": "目录",
    "BlocksTexture": "方块纹理",
    "CharacterSkin": "角色皮肤",
    "World": "世界"
});

translateEnum("Game.LookControlMode", {
    "Pad": "托盘",
    "EntireScreen": "全屏幕",
    "SplitTouch": "分离 触控"
});

translateEnum("Game.MoveControlMode", {
    "Pad": "托盘",
    "Buttons": "按钮"
});

translateEnum("Game.SkyRenderingMode", {
    "Full": "完全",
    "NoClouds": "无云",
    "Disabled": "禁用"
});

translateEnum("Game.TimeOfDayMode", {
    "Changing": "变化",
    "Day": "白天",
    "Night": "晚上",
    "Sunrise": "日出",
    "Sunset": "日落"
});

translateEnum("Game.ViewAngleMode", {
    "Normal": "正常",
    "Narrow": "窄",
    "Wide": "宽"
});
