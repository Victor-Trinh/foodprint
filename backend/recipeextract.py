import json 
import cohere
import pandas as pd
import requests
import datetime
import os
from tqdm import tqdm

# load recipe data https://academic.oup.com/database/article/doi/10.1093/database/baz121/5611291
with open('data/xmltojson.json') as fp:
    data = json.load(fp)
data = data['collection']['document']
data = list(data)

co = cohere.Client(os.environ['COHERE_KEY'])

# https://github.com/cohere-ai/notebooks/blob/main/notebooks/Entity_Extrcation_with_Generative_Language_Models.ipynb
class cohereExtractor():
    def __init__(self, examples, example_labels, labels, task_desciption, example_prompt):
        self.examples = examples
        self.example_labels = example_labels
        self.labels = labels
        self.task_desciption = task_desciption
        self.example_prompt = example_prompt

    def make_prompt(self, example):
        examples = self.examples + [example]
        labels = self.example_labels + [""]
        return (self.task_desciption +
                "\n---\n".join( [examples[i] + "\n" +
                                self.example_prompt + 
                                 labels[i] for i in range(len(examples))]))

    def extract(self, example):
      extraction = co.generate(
          model='large',
          prompt=self.make_prompt(example),
          max_tokens=10,
          temperature=0.1,
          stop_sequences=["\n"])
      return(extraction.generations[0].text[:-1])

