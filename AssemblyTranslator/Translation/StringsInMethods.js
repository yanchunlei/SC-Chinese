﻿function translateMethod(typeName, methodName, translation) {
    System.Console.Write("Translating method: " + typeName + "::" + methodName + " ... ");

    var AssemblyTranslator = importNamespace("AssemblyTranslator");
    translation = generateTranslation(translation);
    var method = inspector.FindMethod(typeName, methodName);
    var match = AssemblyTranslator.Translator.ReplaceStrings(method, translation);

    System.Console.WriteLine(match.toString() + " hits");
}
function translateMethodReg(typeName, methodNameReg, translation) {
    System.Console.Write("Translating method: " + typeName + "::" + methodNameReg + " ... ");

    var AssemblyTranslator = importNamespace("AssemblyTranslator");
    translation = generateTranslation(translation);
    var methods = inspector.FindMethodReg(typeName, methodNameReg);
    var match = 0;
    for (var i in methods) {
        var method = methods[i];
        match += AssemblyTranslator.Translator.ReplaceStrings(method, translation);
    }

    System.Console.WriteLine(match.toString() + " hits");
}
function translateNestedMethods(typeName, translation) {
    System.Console.Write("Translating nested methods in type: " + typeName + " ... ");

    var AssemblyTranslator = importNamespace("AssemblyTranslator");
    translation = generateTranslation(translation);
    var type = inspector.FindType(typeName);
    var match = AssemblyTranslator.Translator.ReplaceNestedStrings(type, translation);

    System.Console.WriteLine(match.toString() + " hits");
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

translateMethodReg("Game.SubsystemIntro", "^<ShipView_Enter>*", {
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
    "Small Burst": "小爆炸图案",
    "Large Burst": "大爆炸图案",
    "Circle": "圈型图案",
    "Disc": "碟形图案",
    "Sphere": "球型图案",
    "Short Trails": "短尾图案",
    "Long Trails": "长尾图案",
    "Flat Trails": "平尾图案",

    "White": "白色",
    "Cyan": "青色",
    "Red": "红色",
    "Blue": "蓝色",
    "Yellow": "黄色",
    "Green": "绿色",
    "Orange": "橙色",
    "Purple": "紫色"
});
translateMethod("Game.FireworksBlock", "GetDisplayName", {
    "Fireworks {0} {1}{2} ({3})": "焰火 {0} {1}{2} ({3})",
    "Flickering ": "闪烁 ",
    "Low": "低空型",
    "High": "高空型"
});

translateMethod("Game.GameMenuScreen", "Update", {
    "Your coordinates are {0:0}, {1:0} at altitude {2:0}": "坐标: {0:0}, {1:0}; 高度: {2:0}",
    "Game mode is {0}": "游戏模式: {0}",
    "You managed to stay alive for {0} days.": "你设法生存了 {0} 天。",
    "You have respawned {0} time(s).": "你复活了 {0} 次。",
    "World seed is \"{0}\".": "世界种子是 \"{0}\"",
    "Select Content To Rate": "选择一项内容来打分",
    "Reset Adventure?": "重置冒险模式？",
    "The adventure will start from the beginning.": "冒险会从头开始",
    "Yes": "偏要重置",
    "No": "才不重置"
});

translateMethod("Game.GameLoadingScreen", "Enter", { "Loading World": "正在加载世界" });
translateNestedMethods("Game.TerrainUpdater", { "Generating Terrain": "正在生成地形" });
translateMethod("Game.SingleplayerScreen", "Enter", { "Scanning Worlds": "正在扫描世界" });

translateMethod("Game.WorldOptionsScreen", "Update", {
    "Enabled": "启用",
    "Disabled": "禁用",
    "Allowed": "允许",
    "Not Allowed": "不允许",
    "Normal": "正常"
});

translateMethod("Game.EditMemoryBankDialog", "Update", {
    "Grid": "网格",
    "Linear": "线性"
});
translateMethod("Game.EditBatteryDialog", "UpdateControls", {
    "Low": "低电平",
    "High": "高电平"
});
translateMethod("Game.EditAdjustableDelayGateDialog", "UpdateControls", { "{0:0.00} seconds": "{0:0.00} 秒" });
translateMethod("Game.EditTruthTableDialog", "Update", {
    "Table": "表格",
    "Linear": "线性"
});

translateMethod("Game.ComponentVitalStats", "UpdateFood", {
    "You are starving, find food!": "去找点吃的，不然你会饿死的！",
    "You are close to starvation": "你已经极端饥饿了",
    "Time to eat something": "是时候吃点什么了",
    "You are slightly hungry": "你稍微有点饿了"
});
translateMethod("Game.ComponentVitalStats", "UpdateSleep", {
    "You will faint, go to sleep!": "你会昏过去的，去睡觉！",
    "You are falling over, sleep": "你要摔倒了，睡吧",
    "You are very tired, sleep": "你已经很累了，睡吧",
    "You are tired, take a nap": "你有点累了，打个盹吧",
    "Can't go no more": "你已经走不动了"
});
translateMethod("Game.ComponentVitalStats", "UpdateStamina", {
    "You are panting, slow down": "你有点喘，慢一点",
    "You are panting, get out of the water": "你有点喘，从水里出来",
    "You are drowning!": "你要沉下去了！",
    "Rest a while!": "休息一会！"
});
translateMethod("Game.ComponentVitalStats", "UpdateTemperature", {
    "head is": "头",
    "chest is": "胸口",
    "legs are": "腿",
    "feet are": "脚",
    "Your {0} freezing, dry your clothes!": "你的{0}在发抖，弄干你的衣物！",
    "Your {0} freezing, get clothed!": "你的{0}在发抖，穿上衣物！",
    "Your {0} freezing, seek shelter!": "你的{0}在发抖，去一个暖和的地方！",
    "Your {0} getting cold, dry your clothes": "你的{0}有点冷，弄干你的衣物",
    "Your {0} getting cold, get clothed": "你的{0}有点冷，穿点衣物",
    "Your {0} getting cold, seek shelter": "你的{0}有点冷，找一个庇护所"
});
translateMethodReg("Game.ComponentVitalStats", "^<UpdateWetness>*", {
    "You are completely wet": "你身上湿透了",
    "You are getting wet": "你身上有点湿了",
    "You are no longer wet": "你身上已经干了"
});
translateMethod("Game.ComponentVitalStats", "Eat", {
    "You have eaten well": "你饱餐了一顿",
    "Good, but you want more": "不错，但你还想要更多",
    "You are full, no more food!": "你已经吃饱了，吃不下了！"
});

translateMethodReg("Game.SubsystemPlayer", "^<Load>*", {
    "You have died.": "你已经死了",
    "Cannot respawn in \"{0}\" game mode": "你不能在 {0} 模式中复活",
    "Tap to restart adventure": "轻触以重置冒险模式",
    "Tap to respawn": "轻触以复活",
});