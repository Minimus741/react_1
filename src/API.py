
from pcpartpicker import API

api = API()
cpu_data = api.retrieve_all()


with open ("API.json","w") as outfile:
    outfile.write(cpu_data.to_json())