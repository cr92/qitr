var express = require('express');
var mysql = require('mysql');
var config = require('../config.js');

var connection = mysql.createConnection(config.db_config);
connection.connect();



// TEST RUNS ------>
var str = '1473997674.817611 : 8=FIX.4.2|35=8|39=2|44=1340|48=54572|38=1000|151=0|32=1000|31=1340|11=110000072|37=1100000000081761|40=0|17=16673431|6=19644600|14=0|54=2|55=CIPLA|20=0|150=2|60=20160916-03:47:54|10=000|';
// updatePosition(str);
// updateTrades(str);
// validateInstrumentId(45630);
// TEST RUNS <------



function updatePosition(data, callback) {
  var query_string = 'INSERT INTO trades SET ?';
  var processed_data = parseInput(data);
  var db_data_map = {
    timestamp: processed_data.timestamp,
    instrument_id: processed_data.instrument_id,
    trade_type: processed_data.trade_type,
    trade_volume: processed_data.trade_volume
  };

  connection.query(query_string, db_data_map, function (error, result) {
    if (result) {
      console.log(result);
      return callback(null,result);
    } else {
      console.log(error);
      return callback(error,null)
    }
  });
}

function validateInstrumentId(data, callback) {
  var query_string = 'SELECT instrument_id,position FROM position WHERE instrument_id=' + data;
  connection.query(query_string, function (error, result) {
    if (result) {
      console.log(result.length);
      return callback(null, result.length);
    } else {
      console.log(error);
      return callback(error, null);
    }
  });
}

function updateTrades(data, callback) {
  var query_string = 'INSERT INTO trades SET ?';
  var processed_data = parseInput(data);
  var db_data_map = {
    timestamp: processed_data.timestamp,
    instrument_id: processed_data.instrument_id,
    trade_type: processed_data.trade_type,
    trade_volume: processed_data.trade_volume
  };
  connection.query(query_string, db_data_map, function (error, result) {
    if (result) {
      console.log(result);
      return (null, processed_data.instrument_id);
    } else {
      console.log(error);
      return (error, null);
    }
  });
}

function fetchPosition(data, callback) {
  console.log('GET url: ' + data.originalUrl);
  var instrument_id = data.originalUrl.split('/')[2];
  var query_string = 'SELECT instrument_id,position FROM position WHERE instrument_id=' + instrument_id;
  connection.query(query_string, function (error, result) {
    if (result) {
      return callback(null, result);
    } else {
      return callback(error, null);
    }
  });
}

function fetchAllPositions(data, callback) {
  console.log('GET url: ' + data.originalUrl);
  var query_string = 'SELECT instrument_id,position FROM position';
  connection.query(query_string, function (error, result) {
    if (result) {
      return callback(null, result);
    } else {
      return callback(error, null);
    }
  });
}

function parseInput(data) {
  var split_array = data.split('|');
  var processed_data = {};
  processed_data.timestamp = split_array[0];
  processed_data.instrument_id = split_array[4].split('=')[1];
  processed_data.trade_volume = split_array[7].split('=')[1];
  processed_data.trade_type = split_array[15].split('=')[1];
  console.log(processed_data);
  return processed_data;
}

module.exports = {
  updatePosition: updatePosition,
  updateTrades: updateTrades,
  fetchPosition: fetchPosition,
  parseInput: parseInput,
  fetchAllPositions: fetchAllPositions
};