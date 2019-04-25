
class MonthData(object):
    def __init__(self, month):
        self.month=month
        self.tone_names=["Anger", "Fear", "Sadness", "Tentative", "Neutral", "Joy", "Analytical", "Confident"]
        self.tones=[0, 0, 0, 0, 0, 0, 0, 0]