var express = require('express');
var mysql = require('mysql');
var config = require('../config.js');

var connection = mysql.createConnection(config.db_config);
connection.connect();

function updatePosition(data, callback) {}

function updateTrades(data, callback) {}

function fetchPosition(instrument_id, callback) {}

function parseInput(data, callback) {}

module.exports = {};