'''
Jake Sylvestre
Twitter Utility
Gets Tweets off Twitter using a skiddie-import strips them of all unnecesary information
'''

from TwitterAPI import TwitterAPI
import time

def get_tweets(user):
	f = open('keys.txt', 'r')
	lines = f.readlines()
	tweets = []
	api = TwitterAPI(consumer_key = '8VycHXMlsgdQwJosnxAuCNfal',
	                  consumer_secret ='eNaDNLL6EhfSG6fUfzVyeiOdPcOqB3teVpd4dVyjghwmJk6hfs',
	                  access_token_key = '2725326884-qM16ZMCOJw1Sdoi6jBrd0c6VAQKi4fykf8X5DaS',
	                  access_token_secret= 'GlFQ0ZE3FDSiokSaVLj08qq0tmCw8sZjmwcai1oojJgbx')   
	                  
	r = api.request('statuses/user_timeline', {'count':2000, 'screen_name':user})
	for item in r.get_iterator():
		try:
			item = item['text']
			if item[0:2] == 'RT':
				continue
			else:
				tweets.append(item)
		except:
			continue
	return tweets
