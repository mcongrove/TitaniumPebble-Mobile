/**
 * Copyright 2014 Matthew Congrove
 * 
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * 
 *    http://www.apache.org/licenses/LICENSE-2.0
 * 
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

var pebble = require("com.mcongrove.pebble");

pebble.setAppUUID("226834ae-786e-4302-a52f-6e7efc9f990b");

pebble.addEventListener("watchConnected", watchConnected);
pebble.addEventListener("watchDisconnected", watchDisconnected);
pebble.addEventListener("update", watchMessageReceived);

function connect() {
	pebble.connect({
		success: watchConnected,
		error: watchDisconnected
	});
}

function watchConnected(_event) {
	Ti.API.info("Connected to Pebble");
	
	$.connected.text = pebble.connectedCount;
}

function watchDisconnected(_event) {
	Ti.API.info("Cannot Connect to Pebble");
	
	$.connected.text = pebble.connectedCount;
}

function watchMessageReceived(_data) {
	$.message.text = _data.message;
	
	setTimeout(function() {
		$.message.text = "";
	}, 3000);
}

function getVersionInfo() {
	pebble.getVersionInfo({
		success: function(_event) {
			Ti.API.info(JSON.stringify(_event));
		},
		error: function(_event) {
			Ti.API.error(JSON.stringify(_event));
		}
	});
}

function launchApp() {
	pebble.launchApp({
		success: function(_event) {
			Ti.API.info("Pebble Application Launched");
		},
		error: function(_event) {
			Ti.API.error("Could Not Launch Pebble Application");
		}
	});
}

function killApp() {
	pebble.killApp({
		success: function(_event) {
			Ti.API.info("Pebble Application Closed");
		},
		error: function(_event) {
			Ti.API.error("Could Not Close Pebble Application");
		}
	});
}

function sendMessage() {
	pebble.sendMessage({
		message: {
			0: "Hi, Pebble!",
			1: 12345
		},
		success: function(_event) {
			Ti.API.info("Message Sent");
		},
		error: function(_event) {
			Ti.API.error("Message Failed");
		}
	});
}

$.connected.text = pebble.connectedCount;

$.index.open();
