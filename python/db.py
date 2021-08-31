
import pymongo

class DbConn:
    def __init__(self):
        self.myclient = pymongo.MongoClient("mongodb://localhost:27017/")
        self.botdb = self.myclient["numberdb"]

    def order_table(self):
        return self.botdb["usertable"]
