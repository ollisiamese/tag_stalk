//start up the whole app 
(function(somenamespace) {
	'use strict';

	function App() {
		this.run = function() {
			var vm = new somenamespace.HistoryRouter();
		};
	};

	somenamespace.App = App;

}) (window.mainNameSpace = window.mainNameSpace || {});