import re
from collections import defaultdict
import argparse
import os
from numpy.random import shuffle

def read_examples(f):
    example_lines = []
    for line in f.readlines():
        if line.strip() == '':
            if example_lines:
                yield Example.from_lines(example_lines)
                example_lines = []
            else:
                continue
        else:
            example_lines.append(line)
    if example_lines:
        yield Example.from_lines(example_lines)

def parse_metadata(line):
    match = re.match(r"\#\s*(\S+)\s*\=\s*\'(.*)\'", line)
    if not match:
        print(line)
    return match.group(1), match.group(2) 

class Example():

    def __init__(self, example_id, corpus, modification, show_comment, 
            utts, break_points):
        assert all(p <= len(utts) for p in break_points)
        self.id = example_id
        self.corpus = corpus
        self.modification = modification
        self.show_comment = show_comment
        self.utts = utts
        self.break_points = break_points

    @classmethod
    def from_lines(cls, lines):
        utts = []
        metadata = {}
        break_points = []
        for line in lines:
            if line.startswith('#'):
                key, value = parse_metadata(line)
                metadata[key] = value
            elif line.startswith('*'):
                break_points.append(len(utts))
                utts.append(Utt.from_line(line[1:]))
            else:
                utts.append(Utt.from_line(line))
        example_id   = metadata.get('id')
        corpus       = metadata.get('corpus')
        modification = metadata.get('modification')
        show_comment = metadata.get('show_comment')
        return cls(example_id, corpus, modification, show_comment, utts, break_points)

class Utt():

    def __init__(self, speaker, text):
        self.speaker = speaker
        self.text = text

    @classmethod
    def from_line(cls, line):
        line = line.strip()
        try:
            speaker, text = line.split('\t')
        except ValueError as e:
            embed()
            raise ValueError(f"Malformated utterance line: {line}\n{e}")
        return cls(speaker, text)

    def __str__(self):
        return f"{self.speaker}\t{self.text}"

parser = argparse.ArgumentParser(description='Simple CLI for collecting dialogue NLI annotations.')
parser.add_argument('input_file', type=str,
    help='Formatted corpus file to be annotated.')
parser.add_argument('--output-file', type=str, default='output.txt',
    help='Destination for the annotation output.')
parser.add_argument('--incremental', dest='incremental', action='store_true')
parser.add_argument('--no-incremental', dest='incremental', action='store_false')
parser.add_argument('--sample', type=int, default=1000)
parser.set_defaults(feature=False)
args = parser.parse_args()

if __name__ == '__main__':
    args = parser.parse_args()
    print_metadata = True #TODO: Make cli option?
    annotations = {}
    annotation_prompts = [('Entailment', 'two statements that the last speaker would take to be true at this point in the dialogue'), 
                          ('Contradiction', 'two statements that the last speaker would take to not be true at this point in the dialogue'), 
                          ('Neutral','two statements for which there is no evidence that the last speaker would take to be true or false at this point in the dialogue')]

    if os.path.exists(args.output_file):
        overwrite = input(f"The output file {args.output_file} already exsits. Are you sure you want to overwrite it? (Y/n))\n> ")
        if not overwrite.lower() == 'y':
            exit()

    # save dialogues for nicer output
    dialogues_with_annot = []

    with open(args.input_file, 'r') as f:
        data = [x for x in read_examples(f)]
        shuffle(data)
        data = data[:args.sample] # just select all samples if not sampling... default = 1000
        
        for example in data:
            dialogues_with_annot.append([f'# example id: {example.id}'])
            annotations[example.id] = defaultdict(list)
            if print_metadata:
                print('# example id:', example.id)
                print('# corpus:', example.corpus)
                print('# modification:', example.modification)
                print('# show_comment:', example.show_comment)
            for i, utt in enumerate(example.utts):
                print(utt)
                dialogues_with_annot[-1].append('\t'.join([utt.speaker, utt.text]))
                if i in example.break_points: # ???
                    #shuffle(annotation_prompts)
                    for label, prompt in annotation_prompts:
                        print(f'> Please provide {prompt}')
                        for i in range(2): # collect two annotations for each prompt
                            annotation = input(f"> {i+1}: ")
                            dialogues_with_annot[-1].append(f'> {label} {annotation}')
                            annotations[example.id][i].append((label, annotation))
                elif args.incremental:
                    input()
            print()

    with open(args.output_file, 'w') as f: #TODO: make output file name cli argument?
        for dialogue in dialogues_with_annot:
            for line in dialogue:
                f.write(line+'\n')
            f.write('\n')


        #f.write(str(annotations)) #TODO: format nicely