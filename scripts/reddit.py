#!/usr/bin/env python 

import requests 
import json
# TODO add this to a general query class 

''''
def example(self,user,get=1):
	url = "http://www.reddit.com/user/" + user + "/overview.json"
	res = requests.get(url)#get user overview
	res.json()
	y = json.loads(res.text)
	return y
'''

def get_top(query, subreddit):
	links = []
	url="http://www.reddit.com/r/" + subreddit + "/search.json?q=" + query + "&sort=top&t=year"
	res = requests.get(url)

	res = json.loads(res.text)
	#print res	
	res =  res["data"]
	res = res["children"]
	print res 
	for post in res:
		data = []
		post =  post["data"]
		#post = post[0]
		data.append(post["permalink"])
		data.append(post["title"])
		res.append(data)
	#print res



def get_comments(permalink):
	#url = "http://www.reddit.com/" + permalink + 
	pass
#get permalink 

#tests
get_top("microsoft", "worldnews") 




# send dates
    # ADD MORE FUNCTIONALITY!!!
