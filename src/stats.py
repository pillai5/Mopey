
import numpy as np
import pygal
from pygal.style import Style
import json
from pymongo import MongoClient
from ibm_watson import ToneAnalyzerV3
from monthdata import MonthData
import calendar

if __name__ == '__main__':

    client=MongoClient('mongodb://sruthip:mopeypass1@ds133166.mlab.com:33166/mopey')
    db=client['mopey']
    collection=db['journals']

    analyzer = ToneAnalyzerV3(version='2017-09-21', iam_apikey='0jo9KTyE-iEs9tCMlGjxsyxCXe1AIWHJVsLaGEc68wNj',
                              url='https://gateway.watsonplatform.net/tone-analyzer/api')

    #extract data

    #array of MonthData obj types
    dates = []
    for i in range(12):
        dates.append(MonthData(calendar.month_name[i+1]))

    tone_names=["Anger", "Fear", "Sadness", "Tentative", "Neutral", "Joy", "Analytical", "Confident"]

    for doc in collection.find():
        print("DOC:" +str(doc))
        text=doc['entry']
        #print("DATE: "+str(doc['date']))
        for d in dates:
            if str(doc['month'])==d.month:
                #print("yeet")
                analysis=analyzer.tone({'text': text}, content_type='application/json').get_result()
                for i in range(len(analysis['document_tone']['tones'])):
                    current_tone=str(analysis['document_tone']['tones'][i]['tone_name'])
                    #print("TONE "+str(i)+": "+current_tone)
                    for t in range(len(tone_names)):
                        if current_tone==tone_names[t]:
                            d.tones[t]+=1
                if len(analysis['document_tone']['tones'])==0:
                    #print("TONE 0: Neutral")
                    d.tones[4]+=1
                #print(type(analysis['document_tone']['tones']))
                #print(json.dumps(analysis,indent=2))
                #print(analysis['document_tone']['tones'])
                #print(d.tones)

    #plot graphs

    mystyle = Style(font_family='googlefont:Raleway')

    chart1=pygal.Radar(fill=True, style=mystyle)
    chart1.title="Mood by Month"
    chart1.x_labels=tone_names
    for d in dates:
        if np.asarray(d.tones).any()>0:
            chart1.add(d.month, d.tones)

    chart1.render_to_file('chart.svg')

    chart2=pygal.Pie(style=mystyle)
    chart2.title="Mood Frequency Overall"

