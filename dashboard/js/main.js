//TODO: Update our JSON structure to include a third dataset for headlines
//TODO: Vertical lines for headline events with headline labels


function process(result){
	//Other thing in result that we should get are any options parameters
	preData = JSON.parse(result.data);
	
	labelSet = [];
	percentSet = [];
	stockSet = [];
	
	//Create x-axis labels
	for(i = 0; i<preData.labels.length; i++){
		labelSet.push(preData.labels[i]);
	}
	
	//Create data observations
	//As a note, there should be equal numbers of data observations for both datasets
	for(i = 0; i<preData.datasets.percents.length){
		percentSet.push(preData.datasets.percents[i]);
		stockSet.push(preData.datasets.stocks[i]);
	}

	var postData = {
		labels: labelSet,
		datasets: [
	        {
	            label: "Positive vs. Negative",
	            fillColor: "rgba(220,220,220,0.2)",
	            strokeColor: "rgba(220,220,220,1)",
	            pointColor: "rgba(220,220,220,1)",
	            pointStrokeColor: "#fff",
	            pointHighlightFill: "#fff",
	            pointHighlightStroke: "rgba(220,220,220,1)",
	            data: percentSet
	        },
	        {
	            label: "Stock Prices",
	            fillColor: "rgba(151,187,205,0.2)",
	            strokeColor: "rgba(151,187,205,1)",
	            pointColor: "rgba(151,187,205,1)",
	            pointStrokeColor: "#fff",
	            pointHighlightFill: "#fff",
	            pointHighlightStroke: "rgba(151,187,205,1)",
	            data: stockSet
	        }
	    ]
	};
	
	var postOptions = {
		segmentShowStroke: false
	};
	
	var graph = document.getElementById("test").getContext("2d");
	var chart = new Chart(graph).Line(postData, postOptions);
};

// Get search query and send it up, using ajax, to our php thing.
$(document).ready(function(){
	
	$('#submit').click(function sendData(){
		var query = $('#search').val();
		var url= encodeURI("http://www.reddit.com/r/worldnews/search.json?q=" + query + "&sort=top&t=year");
		url.data.children[i]
		$.ajax({
			type: "POST",
			url: // put url here,
			data: query,
			cache: false,
			success: function successResponse(result){
				process(result);
			}
		});
		return false;
	});
});	

