
import csv
import numpy as np
import pygal
#from ibm_watson import ToneAnalyzerV3

if __name__ == '__main__':

    data=[]

    filepath="../data.csv"
    with open(filepath,encoding="utf8") as csvfile:
        reader=csv.reader(csvfile,delimiter=",")
        i=0
        for row in reader:
            data.append(row)
    data=np.array(data)
    print(data)

    chart=pygal.Bar()
    chart.title="Moods of Users"
    users=[]
    for i in data:
        users.append(i[0])
    users=users[1:]
    print(users)
    chart.x_labels=