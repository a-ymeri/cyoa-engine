from Models.Item import Item
class Room:

    def __init__(self, area_name=None, area_description=None, id=None,  exits=[], items=[]):
        self.id = id
        self.area_description = area_description
        translated_exits = []
        for exit in exits:
            if(exit.get("password", None) == None):
                exit["password"] = ""
            translated_exits.append({'direction': exit['text'], 'next': exit['next'], 'password': exit['password']})

         
        self.exits = translated_exits
        self.items = [Item(item) for item in items]
        self.area_name = area_name
                 
                 
    # def __init__(self, node):
    #     if 'id' not in node:
    #         raise Exception("Node ID not found")
    #     if 'text' not in node:
    #         raise Exception("Node text not found")
    #     if 'exits' not in node:
    #         raise Exception("Node exits not found")
    #     if 'items' in node:
    #         self.items = []
    #         for item in node['items']:
    #             self.items.append(Item(item))
    #     self.node_id = node['id']
    #     self.text = node['text']
    #     self.exits = node['exits']

    def describe_node(self):
        print(self.area_description)

    def get_exit(self, direction):
        for exit in self.exits:
            if exit['direction'] == direction:
                return exit['next']
        return None
    
    def get_items(self):
        return self.items
    
    #tostring method
    def __str__(self):
        return f"Room: {self.area_name}\nDescription: {self.area_description}\nExits: {self.exits}\nItems: {self.items}"