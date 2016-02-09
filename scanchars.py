#!/usr/bin/env python3
# Windows 平台下应该会根据后缀名判断文件类型

import os
import sys


def scan_dir(path):
    for parent, dirnames, filenames in os.walk(path):
        for dirname in dirnames:
            for filename in filenames:
                filepath = os.path.join(parent,filename)
                yield filepath


def scan_chars(dirs):
    pattern = lambda p: os.path.splitext(p)[-1] in ('.txt', '.xml', '.js')
    chars = set()
    for path in dirs:
        for filename in filter(pattern, scan_dir(path)):
            with open(filename, 'r') as f:
                text = f.read()
            chars.update(set(text))
    return ''.join(sorted(chars))


if __name__ == '__main__':
    args = sys.argv[1:]
    print(scan_chars(args))
