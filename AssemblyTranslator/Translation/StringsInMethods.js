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

translateMethod("Game.PaintBucketBlock", ".cctor", {
    "White": "白",
    "Pale Cyan": "淡青",
    "Pink": "粉",
    "Pale Blue": "淡蓝",
    "Yellow": "黄",
    "Pale Green": "淡绿",
    "Salmon": "鲑鱼红",
    "Gray": "灰",
    "Dark Gray": "暗灰",
    "Cyan": "青",
    "Purple": "紫",
    "Blue": "蓝",
    "Olive": "橄榄绿",
    "Green": "绿",
    "Red": "红",
    "Black": "黑"
});

translateMethod("Game.ClothingBlock", "GetDisplayName", { " dyed ": "色" });
translateMethod("Game.PaintedCubeBlock", "GetDisplayName", { " ": "" });
translateMethod("Game.PaintBucketBlock", "Initialize", { " Paint Bucket": "染剂桶" });
translateMethod("Game.CarpetBlock", "Initialize", { " Carpet": "地毯" });

translateMethod("Game.PumpkinBlock", "GetDisplayName", {
    "Pumpkin": "南瓜",
    "Unripe pumpkin": "未成熟的南瓜"
});
translateMethod("Game.RyeBlock", "GetDisplayName", {
    "Rye": "小麦",
    "Wild Rye": "野生小麦"
});
translateMethod("Game.CottonBlock", "GetDisplayName", {
    "Cotton": "棉花",
    "Wild Cotton": "野生棉花"
});
translateMethod("Game.SaplingBlock", "GetDisplayName", {
    "Oak Sapling": "橡树种子",
    "Birch Sapling": "桦树种子",
    "Spruce Sapling": "云杉种子",
    "Tall Spruce Sapling": "高云杉种子",
    "Sapling": "树种"
});
translateMethod("Game.SeedsBlock", "GetDisplayName", {
    "Tall Grass Seeds": "高草丛种子",
    "Red Flower Seeds": "红花种子",
    "Purple Flower Seeds": "紫花种子",
    "White Flower Seeds": "白花种子",
    "Wild Rye Seeds": "野生小麦种子",
    "Rye Seeds": "小麦种子",
    "Cotton Seeds": "棉花种子",
    "Pumpkin Seeds": "南瓜种子"
});

translateMethod("Game.ArrowBlock", ".cctor", {
    "Wooden Tip Arrow": "木箭头箭",
    "Stone Tip Arrow": "石箭头箭",
    "Iron Tip Arrow": "铁箭头箭",
    "Diamond Tip Arrow": "钻石箭头箭",
    "Fire Arrow": "火箭",
    "Iron Bolt": "铁弩箭",
    "Diamond Tip Iron Bolt": "钻石箭头铁弩箭",
    "Explosive Bolt": "爆裂弩箭",
    "Copper Tip Arrow": "铜箭头箭"
});
translateMethod("Game.BulletBlock", ".cctor", {
    "Musket Ball": "步枪弹丸",
    "Buckshot": "霰弹",
    "Buckshot Ball": "霰弹弹丸"
});

translateMethod("Game.FireworksBlock", ".cctor", {
    "Small Burst": "小爆炸",
    "Large Burst": "大爆炸",
    "Circle": "圈型",
    "Disc": "碟形",
    "Sphere": "球型",
    "Short Trails": "短尾",
    "Long Trails": "长尾",
    "Flat Trails": "平尾",

    "White": "白色",
    "Cyan": "青色",
    "Red": "红色",
    "Blue": "蓝色",
    "Yellow": "黄色",
    "Green": "绿色",
    "Orange": "橙色",
    "Purple": "紫色"
});
