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

def run(file_path):

    #read file
    node_list = fr.readFile(file_path).get('nodes', [])

    
    state = 1

    while True:
        has_ended = display_options(node_list, state)
        if has_ended == -1:
            return -1
        user_input = input()
        state = get_next_state(node_list, state, user_input)
        if state == -1:
            break