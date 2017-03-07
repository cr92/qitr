var express = require('express');
var mysql = require('mysql');
var config = require('../config.js');

var connection = mysql.createConnection(config.db_config);
connection.connect();

function updatePosition(data, callback) {}

function updateTrades(data, callback) {}

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

function parseInput(data, callback) {}

module.exports = {
  updatePosition: updatePosition,
  updateTrades: updateTrades,
  fetchPosition: fetchPosition,
  parseInput: parseInput,
  fetchAllPositions: fetchAllPositions
};