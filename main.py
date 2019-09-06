from flask import Flask,json,jsonify,render_template
import pandas
import statistics
from datetime import datetime

app =  Flask(__name__)

CSVFILE= "./resource/jobentry_export_2019-8-23T9_59vanilla.csv"

def csvCoverter(column):
    file= pandas.read_csv(CSVFILE,delimiter=";")
    array= file[column]
    return array

def median():
    listOfPageView = csvCoverter("pageviews_all")
    return statistics.median(listOfPageView)

def average():
    listOfPageView = csvCoverter("pageviews_all")
    return(statistics.mean(listOfPageView))

def createArrayOfTime(endDateArray,startDateArray):
    timeArray = []
    format="%d.%m.%Y"
    for (endDate, startdate) in zip(endDateArray, startDateArray):
        delta=datetime.strptime(endDate, format)-datetime.strptime(startdate, format)
        timeArray.append(delta.days)
    return timeArray

def readingTimeToClick():
    listOfPageView = csvCoverter("pageviews_all")
    listOfClick = csvCoverter("applyclicks_all")
    listTimeOfOpen=createArrayOfTime(csvCoverter("date_ends"),csvCoverter("date_posted"))
    positionList=[]
    for (pageView,click,timeOfOpen) in zip(listOfPageView,listOfClick,listTimeOfOpen):
        valuesDictionary ={"pageView":pageView,"click":click,"timeOfOpen":timeOfOpen}
        positionList.append(valuesDictionary)
    return positionList

@app.route("/api/stats")
def statsController():
    return jsonify(status="success",stats={"median":median(),"average":average(),"readingTimeToClick":readingTimeToClick()})

@app.route("/")
def homeController():
    return render_template("index.html")

if __name__ == "__main__":
    app.run(debug=False)