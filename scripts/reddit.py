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
	print url	
	res = requests.get(url)

	res = json.loads(res.text)
	#print res	
	res =  res["data"]
	res = res["children"]
	#print res 
	for post in res:
		data = []
		#print post
		post =  post["data"]
		#post = post[0]
		data.append(post["permalink"])
		data.append(post["title"])
		res.append(data)
	#print res



def get_comments(permalink):
	permalink = permalink[:-1]	
	url = "http://www.reddit.com/" + permalink +  ".json"
	print url
#get permalink 

#tests
#get_top("microsoft", "worldnews") 

get_comments("/r/dogs/comments/2hq421/tip_if_youre_considering_getting_your_first_dog/")


# send dates
    # ADD MORE FUNCTIONALITY!!!
