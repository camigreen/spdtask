var express = require('express');
var request = require('request');
var parseString = require('xml2js').parseString;

class Device {
    serialNumber;
    name;
    settings = {
        host: '192.168.0.24',
        url: '/state.xml'
    };

    constructor(serialNumber) {
        this.serialNumber = serialNumber;
    }
    
    get serialNumber() {
        return this.serialNumber;
    }

    get state() {
        results.status = 'success';
        var options = {
            'method': 'GET',
            'url': 'http://'+this.settings.host+this.settings.url,
            'headers': {
            }
        };
        request(options, function (error, response) {
            if (error) {
                results.status = 'error';
                results.error = error;
            } else {
                parseString(response.body, function(err, result) {
                    console.log(result.datavalues);
                    results.power = result.datavalues.input1state[0] ? true : false;
                    results.temp = result.datavalues.sensor4[0];
                    results.units = result.datavalues.units[0];
                    results.serial = result.datavalues.serialNumber[0];
                });
            };
        }   
    }
}

module.exports = Device;