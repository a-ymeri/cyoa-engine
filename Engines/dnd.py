import Utils.file_reader as fr
import sys
import os
import Models.Player as Player
import random
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


def resolve_roll(node_list, state, player):
    current_node = get_node(state, node_list)
    os.system('cls' if os.name=='nt' else 'clear')
        
    [success, fail] =  current_node.get('options', [-1, -1])
    stat = current_node.get("conditionStat")
    requirement = current_node.get("conditionRequirement")
    requirement = int(requirement)
    die = random.randint(1, 20)
    #print you rolled a ${die}, and your str is ${player.str}, for a total of ${die + player.str}
    print(f"You rolled a {die}, and your {stat} is {player.get_attribute(stat)}, for a total of {die + player.get_attribute(stat)}")
    roll = die + player.get_attribute(stat)
    if(roll < requirement):
        print(f"You rolled a {roll}, which is less than {requirement}, so you fail.")
        return int(fail.get("next"))
    else:
        print(f"You rolled a {roll}, which is greater than {requirement}, so you succeed.")
        return int(success.get("next"))

def get_player_info():
    #get player info
    print("What is your name?")
    name = input()
    max_points = 27
    attributes = ["str", "dex", "con", "int", "wis", "cha"]
    values = [0, 0, 0, 0, 0, 0]
    for idx, attribute in enumerate(attributes):
        print(f"What is your {attribute}? Points left: {max_points}")
        value = input()
        while(not value.isdigit() or int(value) > max_points or int(value) < 0):
            print(f"Please enter a number between 0 and {max_points}")
            value = input()
        max_points -= int(value)
        values[idx] = int(value)
    
    player = Player.Player(name, values[0], values[1], values[2], values[3], values[4], values[5])
    return player

def run(file_path):

    player = get_player_info()



    #read file
    node_list = fr.readFile(file_path).get('nodes', [])

    state = 1

    has_ended = 0

    while has_ended != -1:
        while(get_node(state, node_list).get('type', "") == "decision"):
            state = resolve_roll(node_list, state, player)
        has_ended = display_options(node_list, state)
        user_input = input()
        state = get_next_state(node_list, state, user_input)
        if state == -1:
            break