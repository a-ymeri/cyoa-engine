import Utils.file_reader as fr
import sys
import os
#import run from Engines.storybased
import Engines.storybased as sb
import Engines.zork as zork
def main():
    #ask which engine to use
    print("Which engine would you like to use?")
    print("1. Story Based")
    print("2. Zork")
    engine = input()
    if engine == "1":
        sb.run()
    elif engine == "2":
        zork.run()    

if __name__ == '__main__':
    main()
