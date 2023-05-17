import Utils.file_reader as fr
import sys
import os
#import run from Engines.storybased
import Engines.storybased as sb
import Engines.zork as zork
import Engines.dnd as dnd
def main():
    #ask which engine to use
    print("Which engine would you like to use?")
    print("1. Story Based")
    print("2. DnD")
    print("3. Zork")
    
    engine = input()

      #do a cls
    os.system('cls' if os.name=='nt' else 'clear')

    if(len(os.listdir('Stories')) == 0):
        print(" -- No stories found. Please add a story to the Stories folder. -- ")
        return -1
    #ask which file to use


    print("Which file would you like to use?")
    for idx, file in enumerate(os.listdir('Stories')):
        print(file, f"({idx + 1})")
    file = input()
    if file.isdigit():
        file = int(file)
        if file <= len(os.listdir('Stories')):
            file = os.listdir('Stories')[file - 1]
        else:
            print(" -- Invalid file. Please input a number between 1 and", len(os.listdir('Stories')), "or 'quit' to exit the game. -- ")
            return -1
    elif file == 'quit':
        return -1
    
    file_path = 'Stories/' + file
    if engine == "1":
        sb.run(file_path)
    elif engine == "2":
        dnd.run(file_path)
    elif engine == "3":
        zork.run(file_path)

if __name__ == '__main__':
    main()
