
import numpy as np
import pygal
import json
import pymongo
from pymongo import MongoClient
from ibm_watson import ToneAnalyzerV3

if __name__ == '__main__':

    client=MongoClient('mongodb://sruthip:mopeypass1@ds133166.mlab.com:33166/mopey')
    db=client['mopey']
    collection=db['journals']

    analyzer = ToneAnalyzerV3(version='2017-09-21', iam_apikey='0jo9KTyE-iEs9tCMlGjxsyxCXe1AIWHJVsLaGEc68wNj',
                              url='https://gateway.watsonplatform.net/tone-analyzer/api')

    #extract data
    dates = []
    tones = [0, 0, 0, 0, 0, 0, 0]

    tone_names=["Anger", "Fear", "Sadness", "Tentative", "Joy", "Analytical", "Confident"]

    for doc in collection.find():
        print("DOC:" +str(doc))
        text=doc['entry']
        print("DATE: "+str(doc['date']))
        dates.append(str(doc['date']))
        analysis=analyzer.tone({'text': text}, content_type='application/json').get_result()
        for i in range(len(analysis['document_tone']['tones'])):
            current_tone=str(analysis['document_tone']['tones'][i]['tone_name'])
            print("TONE "+str(i)+": "+current_tone)
            for t in range(len(tone_names)):
                print(current_tone)
                print(tone_names[t])
                if current_tone==tone_names[t]:
                    tones[t]+=1
        if len(analysis['document_tone']['tones'])==0:
            print("TONE 0: Neutral")
        #print(type(analysis['document_tone']['tones']))
        print(json.dumps(analysis,indent=2))
        #print(analysis['document_tone']['tones'])
        print(tones)

    #plot graph



    chart=pygal.Radar()
    chart.title="Mood over Time"
    chart.x_labels=tone_names
    chart.add("Mood", tones)

    chart.render_to_file('chart.svg')
