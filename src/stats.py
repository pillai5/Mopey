
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

    for doc in collection.find():
        text=doc['entry']
        print("DATE: "+str(doc['date']))
        analysis=analyzer.tone({'text':text},content_type='application/json').get_result()
        for i in range(len(analysis['document_tone']['tones'])):
            print("TONE "+str(i)+": "+str(analysis['document_tone']['tones'][i]['tone_name']))
        #print(type(analysis['document_tone']['tones']))
        print(json.dumps(analysis,indent=2))
        #print(analysis['document_tone']['tones'])
