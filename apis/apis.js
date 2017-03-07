var express = require('express');
var mysql = require('mysql');
var config = require('../config.js');
var connection = mysql.createConnection(config.db_config);
connection.connect();



// TEST RUNS ------>
var str = '1473997674.817611 : 8=FIX.4.2|35=8|39=2|44=1340|48=54572|38=1000|151=0|32=1000|31=1340|11=110000072|37=1100000000081761|40=0|17=16673431|6=19644600|14=0|54=2|55=CIPLA|20=0|150=2|60=20160916-03:47:54|10=000|';
updatePosition(str, function (error, result) {
  console.log('Done');
});
// updateTrades(str);
// validateInstrumentId(45630);
// TEST RUNS <------



function updatePosition(data, callback) {
  var query_string = '';
  var processed_data = parseInput(data);
  var position_data_map = {
    instrument_id: processed_data.instrument_id,
    position: 0
  };

  updateTrades(processed_data, function (error, result) {
    if (error) {
      console.log('ERROR while updating trades table');
      return callback(error, null);
    } else {
      validateInstrumentId(processed_data.instrument_id, function (error, result) {
        if (error) {
          console.log('ERROR while checking position table');
          return callback(error, null);
        } else if (result && result.length === 0) {
          console.log('Could not find ' + processed_data.instrument_id + ' in position table, will insert new row');
          query_string = 'INSERT INTO position SET ?';
          position_data_map.position = calculatePosition(0, processed_data.trade_volume, processed_data.trade_type);
          connection.query(query_string, position_data_map, function (error, result) {
            if (result) {
              console.log(result);
              return callback(null, result);
            } else {
              console.log(error);
              return callback(error, null);
            }
          });
        } else {
          console.log('Found ' + processed_data.instrument_id + ' in position table, will update row');
          position_data_map.position = calculatePosition(result[0].position, processed_data.trade_volume, processed_data.trade_type);
          query_string = 'UPDATE position SET position = ? WHERE instrument_id = ?';
          connection.query(query_string, [position_data_map.position, position_data_map.instrument_id], function (error, result) {
            if (result) {
              console.log(result);
              return callback(null, result);
            } else {
              console.log(error);
              return callback(error, null);
            }
          });
        }
      });
    }
  });
}

function calculatePosition(curr_position, trade_volume, trade_type) {
  var final_position =
    (Number(trade_type) === 2) ?
    Number(curr_position) - Number(trade_volume) :
    Number(curr_position) + Number(trade_volume);

  return final_position;
}

function updateTrades(processed_data, callback) {
  var query_string = 'INSERT INTO trades SET ?';
  var trade_data_map = {
    timestamp: processed_data.timestamp,
    instrument_id: processed_data.instrument_id,
    trade_type: processed_data.trade_type,
    trade_volume: processed_data.trade_volume
  };
  connection.query(query_string, trade_data_map, function (error, result) {
    if (result) {
      console.log(result);
      return callback(null, processed_data.instrument_id);
    } else {
      console.log(error);
      return callback(error, null);
    }
  });
}

function validateInstrumentId(instrument_id, callback) {
  var query_string = 'SELECT instrument_id,position FROM position WHERE instrument_id=' + instrument_id;
  connection.query(query_string, function (error, result) {
    if (result) {
      console.log(result);
      return callback(null, result);
    } else {
      console.log(error);
      return callback(error, null);
    }
  });
}

function fetchPosition(request_data, callback) {
  console.log('GET url: ' + request_data.originalUrl);
  var instrument_id = request_data.originalUrl.split('/')[2];
  var query_string = 'SELECT instrument_id,position FROM position WHERE instrument_id=' + instrument_id;
  connection.query(query_string, function (error, result) {
    if (result) {
      return callback(null, result);
    } else {
      return callback(error, null);
    }
  });
}

function fetchAllPositions(request_data, callback) {
  console.log('GET url: ' + request_data.originalUrl);
  var query_string = 'SELECT instrument_id,position FROM position';
  connection.query(query_string, function (error, result) {
    if (result) {
      return callback(null, result);
    } else {
      return callback(error, null);
    }
  });
}

function parseInput(data_string) {
  var split_array = data_string.split('|');
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