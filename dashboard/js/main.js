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
	for(i = 0; i<preData.datasets.percents.length; i++){
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

function sendData(info){
	$.ajax({
		type: "POST",
		url: '../aggregator.php',
		data: info,
		cache: false,
		success: function successResponse(result){
			process(result);
		}
	});
}

function parseComments(titles, links, tempjsons){
		comments = [];

		for(i = 0; i < links.length; i++){
			console.log(tempjsons[i]);
			temp = tempjsons[i];
			for(j = 0; j<temp[1].data.children.length; j++){
				comments.push(temp[1].data.children[j].data.body);
			}
		}

		var info = [titles, links, comments];

		sendData(info);
}

function sendLinks(titles, links, iteration, tempjsons){
	$.ajax({
		beforeSend: function (xhr) {
    		xhr.setRequestHeader ("Authorization", "jdIje0INGlMbwGNWd6fa6w9Jx88");
		},
		type: "POST",
		url: encodeURI("http://www.reddit.com" + links[iteration].substring(0, (links[iteration].length - 1)) + ".json/"),
		success: function successResponse(result){
			if(iteration < 10){
				console.log("test");
				tempjsons.push(result);
				sendLinks(titles, links, iteration+1, tempjsons);
			}
			else{
				parseComments(titles, links, tempjsons);
			}
		}
	});
}

function parseTitlesLinks(redditData){
		var titles = [];
		var links = [];
		for(i = 0; i < 10; i++){
			titles.push(redditData.data.children[i].data.title);
			links.push(redditData.data.children[i].data.permalink);
		}
		tempjsons = [];
		sendLinks(titles, links, 0, tempjsons);
}

// Get search query and send it up, using ajax, to our php thing.
$(document).ready(function(){
	//TEMPORARY:
	var query = "microsoft";
	//var query = $('#search').val();
	$('#search').click(function getReddit(){
		$.ajax({
			type: "GET",
			url: encodeURI("http://www.reddit.com/r/worldnews/search.json?q=" + query + "&sort=top&t=year&restrict_sr=on"),
			success: function successResponse(result){
				parseTitlesLinks(result);
			}
		})
	});
	return false;
});
