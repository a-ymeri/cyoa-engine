class Item:
    def __init__(self, name, description, pickable):
        self.name = name
        self.description = description
        self.pickable = pickable

    def __init__(self, item):
        self.name = item.get('name', None)
        self.description = item.get('description', None)
        self.pickable = item.get('pickable', False)

    def describe_item(self):
        print(self.description)

    def get_name(self):
        return self.name
    
    def get_pickable(self):
        return self.pickable
    
    def get_description(self):
        return self.description
    
    def __str__(self):
        return self.name + ": " + self.description