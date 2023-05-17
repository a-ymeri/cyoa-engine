#create a dnd character class, with str/dex/con/int/wis/cha. Set values to random

# Create a class for the player
class Player:

    # Constructor
    def __init__(self, name="", str=0, dex=0, con=0, int=0, wis=0, cha=0):
        self.name = name
        self.str = str
        self.dex = dex
        self.con = con
        self.int = int
        self.wis = wis
        self.cha = cha

    # Getters
    def get_name(self):
        return self.name
    
    def get_str(self):
        return self.str
    
    def get_dex(self):
        return self.dex
    
    def get_con(self):
        return self.con
    
    def get_int(self):
        return self.int
    
    def get_wis(self):
        return self.wis
    
    def get_cha(self):
        return self.cha
    
    def get_attribute(self, attribute):
        match attribute:
            case "str":
                return self.str
            case "dex":
                return self.dex
            case "con":
                return self.con
            case "int":
                return self.int
            case "wis":
                return self.wis
            case "cha":
                return self.cha
            case _:
                return -1  
