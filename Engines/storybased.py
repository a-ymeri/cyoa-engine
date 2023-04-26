import Utils.file_reader as fr
import sys
import os

def get_node(state, node_list):
    for node in node_list:
        if node['id'] == state:
            return node

def display_options(node_list, state):
    #find current node by checking the id based on state
    current_node = get_node(state, node_list)

    print(current_node['text'])

    if len(current_node.get('options', [])) == 0:
        print(" -- The story has ended. -- ")
        return -1
    for idx, option in enumerate(current_node['options']):
        print(option['text'], f"({idx + 1})")

def get_next_state(node_list, state, user_input):
    current_node = get_node(state, node_list)
    os.system('cls' if os.name=='nt' else 'clear')

    if user_input.isdigit():
        user_input = int(user_input)
        if user_input <= len(current_node['options']):
            next = current_node['options'][user_input - 1]['next']
            next = int(next)
            return next 
        else:
            print(" -- Invalid option. Please input a number between 1 and", len(current_node['options']), "or 'quit' to exit the game. -- ")

    elif user_input == 'quit':
        return -1
    
    # If the user input is invalid, return the current state
    return state

def run():

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
    
    #read file
    node_list = fr.readFile('Stories/' + file).get('nodes', [])

    
    state = 1

    while True:
        has_ended = display_options(node_list, state)
        if has_ended == -1:
            return -1
        user_input = input()
        state = get_next_state(node_list, state, user_input)
        if state == -1:
            break