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
  return callback(null, 'success');
}

function fetchAllPosition(data, callback) {
  console.log('GET url: ' + data.originalUrl);
  return callback(null, 'success all');
}

function parseInput(data, callback) {}

module.exports = {
  updatePosition: updatePosition,
  updateTrades: updateTrades,
  fetchPosition: fetchPosition,
  parseInput: parseInput,
  fetchAllPosition: fetchAllPosition
};