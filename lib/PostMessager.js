/*
---
description:     PostMessager

authors:
  - David Walsh (http://davidwalsh.name)

license:
  - MIT-style license

requires:
  core/1.2.1:   '*'

provides:
  - PostMessager
...
*/

/* navive base onMessage support */
Element.NativeEvents.message = 2;
Element.Events.message = {
	base: 'message',
	condition: function(event) {
		if(!event.$message_extended) {
			event.data = event.event.data;
			event.source = event.event.source;
			event.origin = event.event.origin;
			for(key in event) {
				if(event[key] == undefined) {
					event[key] = false;
				}
			}
			event.$message_extended = true;
		}
		return true;
	}
};

/* the class */
var PostMessager  = new Class({
	
	Implements: [Options,Events],
	
	options: {
		allowReceive: true,
		allowSend: true,
		source: window,
		validReceiveURIs: [] /*,
		onSend: $empty,
		onReceive: $empty,
		onReply: $empty
		*/
	},
	
	initialize: function(destFrame,options) {
		this.setOptions(options);
		this.source = document.id(this.options.source);
		this.dest = destFrame;
		
		this.allowReceive = this.options.allowReceive;
		this.allowSend = this.options.allowSend;
		
		this.validURIs = this.options.validReceiveURIs;
		
		this.listener = function(e) {
			if(this.allowReceive && (this.validURIs.length == 0 || this.validURIs.contains(e.origin))) {
				this.fireEvent('receive',[e.data,e.source,e.origin]);
			}
		}.bind(this);
		
		this.started = false;
		this.start();
	},
	
	send: function(message,URI) {
		if(this.allowSend) {
			this.dest.postMessage(message,URI);
			this.fireEvent('send',[message,this.dest]);
		}
	},
	
	reply: function(message,source,origin) {
		source.postMessage(message,origin);
		this.fireEvent('reply',[message,source,origin]);
	},
	
	start: function() {
		if(!this.started) {
			this.source.addEvent('message',this.listener);
			this.started = true;
		}
	},
	
	stop: function() {
		this.source.removeEvent('message',this.listener);
		this.started = false;
	},
	
	addReceiver: function(receiver) {
		this.validURIs.push(receiver);
	},
	
	removeReceiver: function(receiver) {
		this.validURIs.erase(receiver);
	},
	
	enableReceive: function() {
		this.allowReceive = true;
	},
	
	disableReceive: function() {
		this.allowReceive = false;
	},
	
	enableSend: function() {
		this.allowSend = true;
	},
	
	disableSend: function() {
		this.allowSend = false;
	}
	
});
