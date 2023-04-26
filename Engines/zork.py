import Utils.file_reader as fr
import sys
import nltk
import re
import os
from Models.Room import Room 

# nltk.download('stopwords')
from nltk.corpus import stopwords

inventory = []
total_score = 10
current_score = 0

def describe_node(current_node):
    print(current_node.text)


def get_next_state(node_list, state, user_input):
    if(user_input == None):
        return state
    
    if(user_input == "empty"):
        print("You must specify a compass direction.")
        return state
    if(user_input == "invalid"):
        print("I am not familiar with that direction.")
        return state
    
    current_node = node_list[state]
    exits = current_node.exits
    new_state = state

    if user_input not in [exit['direction'] for exit in exits]:
        print("[There is no path in that direction, or you have entered an invalid command.]")
    else:
        for exit in exits:
            if exit['direction'] == user_input:
                new_state = exit['next']
                break


    return new_state

def sanitize_input(user_input):
    multi_word_expressions = ['turn on', 'turn off']

    stop_words = set(stopwords.words('english'))
    keywords = ['all', 'go', 's', 'n', 'e', 'w', 'u', 'd', 'in', 'out']

    for keyword in keywords:
        stop_words.discard(keyword)

    for expression in multi_word_expressions:
        user_input = user_input.replace(expression, expression.replace(' ', '_'))

    words = nltk.word_tokenize(user_input)

    # sentence = re.sub(r'[^\w\s]', '', sentence)

    filtered_sentence = [w for w in words if not w in stop_words]    

    #stem
    # ps = nltk.PorterStemmer()
    # exceptions = ["inventory"]
    # filtered_sentence = [ps.stem(w) for w in filtered_sentence if w not in exceptions]
    return filtered_sentence

def get_direction(user_input):
    
    if user_input == "":
        return "empty"
    
    base_directions = {
        'north': ['north', 'n'],
        'south': ['south', 's'],
        'east': ['east', 'e'],
        'west': ['west', 'w'],
        'up': ['up', 'u'],
        'down': ['down', 'd'],
        'northeast': ['northeast', 'ne'],
        'northwest': ['northwest', 'nw'],
        'southeast': ['southeast', 'se'],
        'southwest': ['southwest', 'sw'],
        'in': ['in'],
        'out': ['out']
    }

    final_direction = "invalid"
    #map north and n to north and so on
    for direction in base_directions:
        if(user_input in base_directions[direction]):
            final_direction = direction
            break
    return final_direction
    

def get_action(user_input, game_dictionary, current_node):

    exits, commands, base_commands = game_dictionary
    if(len(user_input) == 1):
        #Provided an action, but no object
        if(user_input[0] in base_commands):
            # print("it's base command, but no object")
            return [user_input[0], ""]
        else:
            # print("it's one word")
            direction = get_direction(user_input[0])
            return ['go', direction]
    elif(len(user_input) == 2):
        # print("it's two words")
        #Provided an action and an object
        if(user_input[0] in base_commands):
            # print("it's base command and object")
            return user_input
        else:
            print("it's not a base command")
            return None
            
    else:
        print("it's more than one word")


def look(current_node, object):
    room_synonyms = ['room', 'area', 'place', 'location', '', 'around', 'here', None]
    if(object in room_synonyms):
        print(current_node.text)
    else:
        for item in current_node.items:
            if item.name == object:
                print(item.description)
                break

def take(current_node:Room, object):
    global inventory
    global current_score
    global total_score

    if(len(current_node.items) == 0):
        print("There is nothing to take here.")
        return

    # print(object)
    if object == "all":
        for i in range(len(current_node.get_items()), 0, -1):
            item = current_node.items[i-1]
            print("You have taken the " + item.name + ".")
            inventory.append(item)
            # current_score += item.score
            current_node.items.remove(item)
    else:
        for item in current_node.items:
            if item.name == object:
                print("You have taken the " + item.name + ".")
                inventory.append(item)
                # current_score += item.score
                current_node.items.remove(item)
                break

def drop(current_node, object):
    global inventory
    global current_score
    global total_score

    if(len(inventory) == 0):
        print("You have nothing to drop.")
        return

    if object == "all":
        for i in range(len(inventory), 0, -1):
            item = inventory[i-1]
            print("You have dropped the " + item.name + ".")
            current_node.items.append(item)
            # current_score -= item.score
            inventory.remove(item)
    else:
        for item in inventory:
            if item.name == object:
                print("You have dropped the " + item.name + ".")
                current_node.items.append(item)
                # current_score -= item.score
                inventory.remove(item)
                break


def view_inventory():
    global inventory

    if(len(inventory) == 0):
        print("You have nothing in your inventory.")
        return
    
    print("You have the following items in your inventory:")
    for item in inventory:
        print(item.name)


def run():
    zork_config = fr.readFile('story_zork.json')
    #create node_list array of Room objects. The json objects may not have some fields, so we need to pass None for those.
    node_list = []
    for node in zork_config['nodes']:
        node_list.append(Room(node))

    #store all exits in a set
    exits = set()
    for node in node_list:
        for exit in node.exits:
            exits.add(exit['direction'])
        

    
    exits = list(exits)

    #In zork, "go north" and "north" and "n" are all valid commands. We need to parse the user input to figure out what they mean.
    #We'll do this by creating a dictionary that maps the user input to the direction.
    #For example, if the user types "go north", we'll look up "go north" in the dictionary and get "north".
    
    commands = zork_config['mappings']
    base_commands = [command[0] for command in commands]

    game_dictionary = (exits, commands, base_commands)

    state = 0

    describe_node(node_list[state])


    while True:

        current_node = node_list[state]

        print("> ", end='')
        user_input = input()
        os.system('cls' if os.name=='nt' else 'clear')


        if user_input == 'quit':
            return -1

        #reduce user input to base commands
        user_input = sanitize_input(user_input)

        action = get_action(user_input, game_dictionary, current_node)
        
        match(action):
            case ['go', direction]:
                direction = get_direction(direction)
                state = get_next_state(node_list, state, direction)
                describe_node(node_list[state])
            case ['look', object]:
                look(current_node, object)
            case ['take', object]:
                take(current_node, object)
            case ['drop', object]:
                drop(current_node, object)
            case ['turn_on', object]:
                print("turn on")
            case ['turn_off', object]:
                print("turn off")
          
            case ['drop', object]:
                print("drop")
            case ['inventory', object]:
                view_inventory()
            case ['open', object]:
                print("open")
            case ['close', object]:
                print("close")
            case ['help', object]:
                print("help")
            case ['quit', object]:
                print("quit")
            case _:
                print("invalid command")
        # state = get_next_state(node_list, state, user_input)
        # if state == -1:
        #     break

