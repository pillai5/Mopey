
import csv
import pygal
#from ibm_watson import ToneAnalyzerV3

if __name__ == '__main__':
    filepath="../data.csv"
    with open(filepath,encoding="utf8") as csvfile:
        reader=csv.reader(csvfile,delimiter=",")
        for row in reader:
            print(row)