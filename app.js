/*
 *  Starter code for University of Waterloo CS349 - Spring 2017 - A3.
 *	Refer to the JS examples shown in lecture for further reference.
 *  Note: this code uses ECMAScript 6.
 *  Updated 2017-07-12.
 */

"use strict";

// Get your own API key from https://uwaterloo.ca/api/register
var apiKey = '5676e73c5e1ac86955e8811beae4e913';
var endpointUrl = "https://api.uwaterloo.ca/v2/news.json";
//var data_need[];
var title;
var id;
var site;
var counter = 2;

(function(exports) {

	/* A Model class */
    class AppModel {
		constructor() {
			this._observers = [];
			this._var = [];
      }
    // You can add attributes / functions here to store the data
    // Call this function to retrieve data from a UW API endpoint
    loadData(endpointUrl) {
      var that = this;
      $.getJSON(endpointUrl + "?key=" + apiKey,
        function (news) {
            // Do something with the data; probably store it
            // in the Model to be later read by the View.
            // Use that (instead of this) to refer to the instance
            // of AppModel inside this function.
            that._var = news.data;
            //console.log(that._var);
            that.notify(); // Notify View(s)
        });
      }

		// Add observer functionality to AppModel objects:
		// Add an observer to the list
		addObserver(observer) {
            this._observers.push(observer);
            observer.updateView(this, null);
        }

		// Notify all the observers on the list
		notify(args) {
            _.forEach(this._observers, function(obs) {
                obs.updateView(this, args);
            });
        }
    }

    /*
     * A view class.
     * model:  the model we're observing
     * div:  the HTML div where the content goes
     */
    class AppView {
    		constructor(model, div) {
    			this.model = model;
    			this.div = div;
    			model.addObserver(this); // Add this View as an Observer
          //model.processdata();
          $("#addItemBtn").click(function() {
              model.loadData(endpointUrl);
               title = document.getElementById('title').value;
               id = document.getElementById('id').value;
               //console.log(id);
               site = document.getElementById('site').value;
          });
    		}

        updateView(obs, args) {
            // Add code here to update the View
            var that = this;
            var data = this.model._var;

            console.log("IN updateView");
            console.log("data.length" + data.length);
            for(var i = 0; i < data.length; i++){
              console.log(data[i].id);
              console.log(data[i].title);
              console.log(i);
            }

            for(var i = 0; i < data.length; i++){
                if(data[i].id != id && id!=""){
                  data.splice(i,1);
                  i--;
                } else if (data[i].title != title && title != "" ){
                  data.splice(i,1);
                  i--;
                  //console.log("Title Length" + that._var.length);
                } else if (data[i].site != site && site != "nothing"){
                  data.splice(i,1);
                  i--;
                  //console.log("Site Length" + that._var.length);
                } else {
                }
              }

              if(data.length == 0){
                counter--;
                var resultElement = $("#viewContent");
                if (counter < 0){
                resultElement.append("No such NEWS exist! Please try others!"+ '<br/>');
              }
              }
              for(var i = 0; i < data.length; i++){
                var resultElement = $("#viewContent");
              resultElement.append("id: " + data[i].id + '<br/>' +
                                    "site: " + data[i].site + '<br/>' +
                                    "link: " + data[i].link + '<br/>' +
                                    "published: " + data[i].published + '<br/>' +
                                    "updated: " + data[i].updated+ '<br/>');
                                }
        };
    }

	/*
		Function that will be called to start the app.
		Complete it with any additional initialization.
	*/
    exports.startApp = function() {
        var model = new AppModel();
        var view = new AppView(model, "div#viewContent");
        model.notify(view);
    }

})(window);
