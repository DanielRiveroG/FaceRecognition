from os import walk

mypath = "known_people"
f = []
for (dirpath, dirnames, filenames) in walk(mypath):
    f.extend(filenames)
    break

print f

peoples_names = []
for names in f:
    peoples_names.append(names.split(".jpg")[0])

print peoples_names