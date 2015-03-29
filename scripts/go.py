#import random
#from text.classifiers import NaiveBayesClassifier
from textblob.classifiers import NaiveBayesClassifier

train = [
('zenith', 'pos'),
('zest', 'pos'),
('zippy', 'pos')]

cl = NaiveBayesClassifier(train)
print cl.classify ("you are the man")


