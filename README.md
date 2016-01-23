# Survivalcraft 汉化计划 - 字体

本分支包含 bitmap font 生成相关内容。

## 准备工作:
* [Bitmap Font Generator](http://www.angelcode.com/products/bmfont/): 用于生成字库
* [scpak](https://github.com/qnnnez/scpak): 用于打包字库
* 一个脚本(暂未提供)，用于将 Bitmap Font Generator 生成的字体信息文件(font-name.fnt)转换为 scpak 能识别的格式

## 工作步骤:
1. 使用 scpak 解包 Content.pak 为目录 Content
1. 打开 Bitmap Font Generator，选择需要生成的字体，并设定字体尺寸等相关信息
1. 选择需要的汉字(可以从文件选择，目前 chars.txt 中包含了3500个常用汉字、字母、数字、特殊符号)
1. 调整输出选项，使字体能保存在一张纹理当中，并尽可能小(注意，SC 不能读取超过长或宽超过 2048 像素的纹理)
1. 渲染字体，保存为 font-name (此时应生成两个文件: font-name_0.tga, font-name.fnt)
1. 使用脚本转换 font-name.fnt，生成 font-name.lst
1. 将 font-name_0.tga 重命名为font-name.tga, 与 font-name.lst 一同复制到解包的 Content 目录中
1. 使用 scpak 打包 Content 目录为 Content.pak

## TODO List:
* 待文本翻译完成，更新 chars.txt，使字库刚好够用
* 更新用于转换的脚本
