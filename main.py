import file_reader as fr

def main():
    node_list = fr.readFile('story.json')
    state = 0

    while True:
        current_node = node_list[state]
        print(node_list[state]['text'])

        # List the options
        for idx, option in enumerate(node_list[state]['options']):
            print(option['text'], f"({idx + 1})")

        # Get user input
        user_input = input()

        # Check if user input is a number, then move the state machine to the next node
        if user_input.isdigit():
            user_input = int(user_input)
            if user_input <= len(current_node['options']):
                state = current_node['options'][user_input - 1]['next'] - 1
            else:
                print('Invalid input')
        elif user_input == 'quit':
            break

if __name__ == '__main__':
    main()

