import json 
import cohere
import pandas as pd
import requests
import datetime
import os
import numpy as np
from tqdm import tqdm

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

# get random (ingredient, instructions)
def get_random_recipes(data, n):
  recipes = []
  idx = np.random.randint(0, len(data), size = n)
  for id in idx:
    recipes.append(("; ".join([food['text'] for food in data[id]['annotation']]), # extracted
                    data[id]['infon'][1])) # instructions
  return recipes

# get random (instructions)
def get_random_instructions(data, n):
  recipes = []
  idx = np.random.randint(0, len(data), size = n)
  for id in idx:
    recipes.append(data[id]['infon'][1]) # instructions
  return recipes

if __name__ == "__main__":
  # load recipe data https://academic.oup.com/database/article/doi/10.1093/database/baz121/5611291
  with open('data/xmltojson.json') as fp:
      data = json.load(fp)
  data = data['collection']['document']
  data = list(data)
  
  # get recipes 
  recipe_examples = get_random_recipes(data, 200)
  instructions = get_random_instructions(data, 5)
  cohereFoodExtractor = cohereExtractor([e[1] for e in recipe_examples],
                                        [e[0] for e in recipe_examples], 
                                        [],
                                        "",
                                        "extract food from recipe: ")

  # extract food from recipes
  results = []
  for text in tqdm(instructions):
    try:
      extracted_text = cohereFoodExtractor.extract(text)
      results.append(extracted_text)
    except Exception as e:
      print('ERROR: ', e)

  food_extractions = pd.DataFrame(data={'text': instructions, 'extracted_text': results})