import file_reader as fr
import sys
import os
def display_options(node_list, state):
    current_node = node_list[state]
    print(current_node['text'])

    for idx, option in enumerate(current_node['options']):
        print(option['text'], f"({idx + 1})")

def get_next_state(node_list, state, user_input):
    current_node = node_list[state]
    os.system('cls' if os.name=='nt' else 'clear')

    if user_input.isdigit():
        user_input = int(user_input)
        if user_input <= len(current_node['options']):
            return current_node['options'][user_input - 1]['next'] - 1
        else:
            print(" -- Invalid option. Please input a number between 1 and", len(current_node['options']), "or 'quit' to exit the game. -- ")

    elif user_input == 'quit':
        return -1
    
    # If the user input is invalid, return the current state
    return state

def main():
    node_list = fr.readFile('story.json')
    state = 0

    while True:
        display_options(node_list, state)
        user_input = input()
        state = get_next_state(node_list, state, user_input)
        if state is -1:
            break

if __name__ == '__main__':
    main()