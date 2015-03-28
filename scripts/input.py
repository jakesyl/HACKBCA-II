'''
Jake Sylvestre
Twitter Utility
Gets Tweets off Twitter using a skiddie-import strips them of all unnecesary information
'''
from tweepy import Stream
from tweepy import OAuthHandler
from tweepy.streaming import StreamListener

ckey = '8VycHXMlsgdQwJosnxAuCNfal'
csecret = 'eNaDNLL6EhfSG6fUfzVyeiOdPcOqB3teVpd4dVyjghwmJk6hfs'
atoken = '2725326884-qM16ZMCOJw1Sdoi6jBrd0c6VAQKi4fykf8X5DaS'
asecret = 'GlFQ0ZE3FDSiokSaVLj08qq0tmCw8sZjmwcai1oojJgbx'

class listener(StreamListener):

    def on_data(self, data):
        print data
        return True

    def on_error(self, status):
        print status

auth = OAuthHandler(ckey, csecret)
auth.set_access_token(atoken, asecret)
twitterStream = Stream(auth, listener())
twitterStream.filter(track=["#hackbca"])

