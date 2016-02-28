# Assignment 2A: Practice with crossfilter.js

The purpose of this quick exercise is to get you to practice with the full range of capabilities of crossfilter.js. Please refer to the [API reference] (https://github.com/square/crossfilter/wiki/API-Reference) for detailed information on syntax.

## Parsing data

Crossfilter allows you to quickly filter, group, and reduce values of individual dimensions (tabular columns) of multi-dimensional datasets. One thing to note is that you can only filter data that can be compared i.e. with `>`,`<`,`>=`,`<=` and so on. Since `undefined` and `NaN` cannot be compared, you must not have these values in the input data to crossfilter.

Parse and import the dataset so that we have "age" and "gender" as columns in our dataset, in addition to what's there already. Again, note that for trips taken by unregistered users, these fields are empty. You must make sure these empty fields are not imported as `undefined` or `NaN`. You may choose to use a placeholder value in these cases.

## Construct a crossfilter

Refer to [this](https://github.com/square/crossfilter/wiki/API-Reference#crossfilter).

## Creating dimensions

The most basic use case for crossfilter is to filter a large number of records into a smaller set based on criteria in certain columns. Before you can filter by a given column, you must first create a dimension. To filter by user age, for example, you first create a dimension like this:
```
var tripsByAge = allTrips.dimension(function(d){return d.userAge});
```
Later, to get a small subset of trips taken by those between 18 and 50, you can filter in this dimension
```
tripsByAge.filter([18,50]).top(100); //top 100 trips taken by those between 18 and 50 of age; the sort order is from highest (oldest) down
```

## Filtering

By creating the right dimensions, find and console log the following data points
- total number of trips in 2012
- total number of trips in 2012 AND taken by male, registered users
- total number of trips in 2012, by all users (male, female, or unknown), starting from Northeastern (station id 5). Note that when you apply a new filter on column/dimension A, the existing filters are columns B, C, D... etc. are still active
- top 50 trips, in all time, by all users, regardless of starting point, in terms of trip duration. Log the array of these trips in console.

Afterwards, clear all filters.

## Group 

Another use of dimensions is that you can group rows with similar values on that dimension together. For example, if I want to group all trips taken in 2011, 2012, and 2013 into three buckets, I can do the following:
```
var tripsByTime = allTrips.dimension(function(d){return d.startTime}); //this is a dimension

var tripsByYearGroup = tripsByTime.group(function(d){return d.getFullYear()});
```
How does this work? In the accessor function `function(d){return d.getFullYear()}`, each value in the time dimension--a `Date` object, is transformed into a number, the year. Thus, any `Date` object in the same year will be transformed into the same number, and will thus be grouped together.

By creating a group on the right dimension, group all trips into 10-year age buckets i.e. trips by users between 20 and 29, 30 and 39 etc. Console log these groups using `group.all()`

