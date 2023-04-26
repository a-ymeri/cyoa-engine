from Models.Item import Item
class Room:
    def __init__(self, node_id, text, exits, items):
        self.node_id = node_id
        self.text = text
        self.exits = exits
        self.items = items

    def __init__(self, node):
        if 'id' not in node:
            raise Exception("Node ID not found")
        if 'text' not in node:
            raise Exception("Node text not found")
        if 'exits' not in node:
            raise Exception("Node exits not found")
        if 'items' in node:
            self.items = []
            for item in node['items']:
                self.items.append(Item(item))
        self.node_id = node['id']
        self.text = node['text']
        self.exits = node['exits']

    def describe_node(self):
        print(self.text)

    def get_exit(self, direction):
        for exit in self.exits:
            if exit['direction'] == direction:
                return exit['next']
        return None
    
    def get_items(self):
        return self.items
    