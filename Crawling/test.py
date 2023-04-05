enterpriseNameFile = open("test.txt", "r", encoding="UTF8")
lines = enterpriseNameFile.readlines()
enterpriseNameFile.close()

for idx in lines:
    print(" ".join(idx.split()[:-1]) , idx.split()[-1])