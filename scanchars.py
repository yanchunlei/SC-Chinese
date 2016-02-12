#!/usr/bin/env python3
# Windows 平台下应该会根据后缀名判断文件类型

import os
import sys


def scan_dir(path):
    for parent, dirnames, filenames in os.walk(path):
        for filename in filenames:
            filepath = os.path.join(parent,filename)
            yield filepath


def scan_chars(dirs, init_chars=''):
    pattern = lambda p: os.path.splitext(p)[-1] in ('.txt', '.xml', '.js')
    chars = set(init_chars)
    for path in dirs:
        for filename in filter(pattern, scan_dir(path)):
            try:
                with open(filename, 'r', encoding='utf-8') as f:
                    text = f.read()
            except UnicodeDecodeError:
                text = open(filename, 'r', encoding='gbk').read()
            chars.update(set(text))
            print(filename)
    chars.discard('\n')
    return ''.join(sorted(chars))


if __name__ == '__main__':
    chars_file_name = 'fonts' + os.sep + 'chars.txt'
    
    args = sys.argv[1:]
    if os.path.exists(chars_file_name):
        init_chars = open(chars_file_name, encoding='utf-16').read()
    else:
        init_chars = ''
    chars = scan_chars(args, init_chars)
    open(chars_file_name, 'w', encoding='utf-16').write(chars)
