console.log('Homework 2-A...')
var trips;
var timeExtent = [new Date(2011,12,01),new Date(2012,12,01)];


d3.csv('../data/hubway_trips_reduced.csv',parse,dataLoaded);

function dataLoaded(err,rows){

    console.log(rows);

trips = crossfilter(rows)
    
//1.total number of trips in 2012
var tripsByTime = trips.dimension(function(rows){return rows.startTime;});
    tripsByTime.filter([timeExtent[0],timeExtent[1]]);
    console.log(tripsByTime.top(Infinity).length);//total number of trips in 2012 is 53382
    

//2.total number of trips in 2012 AND taken by male, registered users
var tripsByGender = trips.dimension(function(rows){
    if(!rows.gender){
      return "none" 
       }
    return rows.gender;
    }); 
    tripsByGender.filter("Male");
    console.log(tripsByGender.top(Infinity).length);//total number of trips in 2012 and male is 27683



//3.total number of trips in 2012, by all users (male, female, or unknown), starting from Northeastern (station id 5).
tripsByGender.dispose();
var tripsByStation = trips.dimension(function(rows){return rows.startStation;});
    tripsByStation.filter("5");
    console.log(tripsByStation.top(Infinity).length);//total number of trips in 2012 and all gener is 431


//4.top 50 trips, in all time, by all users, regardless of starting point, in terms of trip duration.
tripsByTime.dispose();
tripsByStation.dispose();
var tripsByDuration = trips.dimension(function(rows){return rows.duration;});
    console.log(tripsByDuration.top(50));
    
    

//5.By creating a group on the right dimension, group all trips into 10-year age buckets    
tripsByDuration.dispose();
var tripsByBirth = trips.dimension(function(rows){
    if(!rows.birthDate){
        return "none"
    }
    return 2016-rows.birthDate;
});
var tripsGroupByAge = tripsByBirth.group(function(d){return Math.floor(d/10)});
    console.log(tripsGroupByAge.all());
}


function parse(d){
    if(+d.duration<0) return;

    return {
        duration: +d.duration,
        startTime: parseDate(d.start_date),
        endTime: parseDate(d.end_date),
        startStation: d.strt_statn,
        endStation: d.end_statn,
        gender:d.gender,//can read string d.gender=="" ? "none" :d.gender
        birthDate:+d.birth_date
    }
}

function parseDate(date){
    var day = date.split(' ')[0].split('/'),
        time = date.split(' ')[1].split(':');

    return new Date(+day[2],+day[0]-1, +day[1], +time[0], +time[1]);
}

