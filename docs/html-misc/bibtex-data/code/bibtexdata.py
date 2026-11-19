import json, os, re, unicodedata
# import pyvis
# import igraph as ig
import pandas as pd
# import network as nx
import numpy as np
import shutil
from bs4 import BeautifulSoup as bs
from datetime import datetime
# from pylatexenc.latex2text import LatexNodes2Text
from requests import get, head
from semanticscholar import SemanticScholar
from typing import Dict, List, Tuple, Union
from urllib.request import urlopen
from warnings import warn


# %% Attributes

apis = {'alex':      open(os.path.join(r'D:', 'Dropbox', 'Notes', 
                                      'openalex-token.txt'), 
                          encoding = 'utf-8').readlines()[0], 
        'citations': open(os.path.join(r'D:', 'Dropbox', 'Notes', 
                                       'opencitations-token.txt'), 
                          encoding = 'utf-8').readlines()[0]}

typedict = {'article': 'article', 'book': 'book', 'book-chapter': 'inbook', 
            'dataset': 'misc', 'dissertation': 'phdthesis', 
            'editorial': 'misc', 'erratum': 'misc', 'letter': 'misc', 
            'libguides': 'manual', 'other': 'misc', 'paratext': 'misc', 
            'peer-review': 'misc', 'preprint': 'techreport', 
            'reference-entry': 'misc', 'report': 'techreport', 
            'retraction': 'article', 'review': 'article', 'standard': 'misc', 
            'supplementary-materials': 'misc'}

entries = ['article', 'book', 'inbook', 'booklet', 'incollection', 
           'conference', 'inproceedings', 'proceedings', 'manual', 
           'mastersthesis', 'phdthesis', 'techreport', 'unpublished', 
           'misc']

fields = ['title', 'author', 'journal', 'booktitle', 'editor', 'type', 
          'edition', 'series', 'volume', 'number', 'chapter', 'pages', 
          'year', 'month', 'publisher', 'address', 'institution', 
          'organization', 'school', 'crossref', 'annote', 'note', 'url', 
          'doi', 'howpublished', 'issn', 'isbn', 'keywords', 'abstract']

# required_fields = {
#   'article': {
#     'mandatory': ['title', 'author', 'journal', 'year'],
#     'optional': ['volume', 'number', 'pages', 'month', 'publisher', 
#                  'crossref', 'annote', 'note', 'url', 'doi', 'issn', 
#                  'keywords', 'abstract']
#   },
#   'book': {
#     'mandatory': ['title', 'author', 'year', 'publisher'],
#     'optional': ['series', 'edition', 'volume', 'number', 'chapter', 'pages', 
#                  'month', 'address', 'crossref', 'annote', 'note', 'url', 
#                  'doi', 'isbn', 'keywords', 'abstract']
#     },
#   'inbook': {
#     'mandatory': ['title', 'author', 'booktitle', 'editor', 'chapter', 'pages', 
#                   'year', 'publisher'],
#     'optional': ['type', 'series', 'edition', 'volume', 'number', 'month', 
#                  'address', 'crossref', 'annote', 'note', 'url', 'doi', 'isbn', 
#                  'keywords', 'abstract']
#     },
#   'booklet': {
#     'mandatory': ['title'],
#     'optional': ['author', 'year', 'month', 'address', 'crossref', 'annote', 
#                  'note', 'url', 'doi', 'howpublished', 'keywords', 'abstract']
#     },
#   'incollection': {
#     'mandatory': ['title', 'author', 'booktitle', 'editor', 'year', 'publisher'],
#     'optional': ['series', 'volume', 'number', 'chapter', 'pages', 'month', 
#                  'address', 'crossref', 'annote', 'note', 'url', 'doi', 'isbn', 
#                  'keywords', 'abstract']
#     },
#   'conference': {
#     'mandatory': ['title', 'author', 'booktitle', 'editor', 'year'],
#     'optional': ['series', 'volume', 'number', 'pages', 'month', 'publisher', 
#                  'address', 'organization', 'crossref', 'annote', 'note', 
#                  'url', 'doi', 'isbn', 'keywords', 'abstract']
#   },
#   'inproceedings': {
#     'mandatory': ['title', 'author', 'booktitle', 'editor', 'year'],
#     'optional': ['series', 'volume', 'number', 'pages', 'month', 'publisher', 
#                  'address', 'organization', 'crossref', 'annote', 'note', 
#                  'url', 'doi', 'isbn', 'keywords', 'abstract']
#   },
#   'proceedings': {
#     'mandatory': ['title', 'year'],
#     'optional': ['editor', 'series', 'volume', 'number', 'month', 'publisher', 
#                  'address', 'crossref', 'annote', 'note', 'url', 'doi', 'isbn', 
#                  'keywords', 'abstract']
#   },
#   'manual': {
#     'mandatory': ['title'],
#     'optional': ['author', 'edition', 'year', 'month', 'publisher', 'address', 
#                  'organization', 'crossref', 'annote', 'note', 'url', 'doi', 
#                  'isbn', 'keywords', 'abstract']
#   },
#   'mastersthesis': {
#     'mandatory': ['title', 'author', 'year', 'school'],
#     'optional': ['type', 'month', 'address', 'crossref', 'annote', 'note', 
#                  'url', 'doi', 'keywords', 'abstract']
#   },
#   'phdthesis': {
#     'mandatory': ['title', 'author', 'year', 'school'],
#     'optional': ['type', 'month', 'address', 'crossref', 'annote', 'note', 
#                  'url', 'doi', 'keywords', 'abstract']
#   },
#   'techreport': {
#     'mandatory': ['title', 'author', 'year', 'institution'],
#     'optional': ['type', 'number', 'month', 'address', 'crossref', 'annote', 
#                  'note', 'url', 'doi', 'keywords', 'abstract']
#   },
#   'unpublished': {
#     'mandatory': ['title', 'author'],
#     'optional': ['year', 'month', 'crossref', 'annote', 'note', 'url', 'doi', 
#                  'keywords', 'abstract']
#   },
#   'misc': {
#     'mandatory': [],
#     'optional': ['title', 'author', 'year', 'month', 'crossref', 'annote', 
#                  'note', 'url', 'doi', 'howpublished', 'keywords', 'abstract']
#   }
# }

# texchars = '/'.join(['https://dimitrisilva.github.io', 'html-misc', 
#                      'bibtex-data', 'input', 'texchars.txt'])
# texchars = [line.decode('utf-8').strip().split(';') 
#             for line in urlopen(texchars).readlines()]
# texchars = [{texchars[0][c]: texchars[r + 1][c] 
#              for c in range(len(texchars[0]))} 
#             for r in range(len(texchars) - 1)]

texfields = ['title', 'author', 'journal', 'booktitle', 'editor', 'type', 
             'series', 'month', 'publisher', 'address', 'institution', 
             'organization', 'school']

patterns = {'entry': r'@\b(?P<bibtype>{0})\b\{{(?P<key>[a-z0-9]+),$', 
            'field': r'(?P<name>{0})\s*=\s*[{{"](?P<value>.+?)[}}"],?$'}
patterns = {'entry': patterns['entry'].format('|'.join(entries)), 
            'field': patterns['field'].format('|'.join(fields))}

# %% Functions

# %%% BibTeX Data

def get_texchars(file: str, encoding: str = 'utf-8'):
  '''
  TeX character correspondeces
  
  Parameters
  ----------
  file : str
    File or URL with `.bib` extension
  encoding : str
    File encoding option
  
  Returns
  -------
  List
    List of TeX character representation correspondences: 'std', 'tex', 
    'ascii', or 'txt'
  
  Examples
  --------
  >>> url = '/'.join(['https://dimitrisilva.github.io', 'html-misc', 
                      'bibtex-data', 'input', 'texchars.txt'])
  >>> texchars = get_texchars(url)
  '''
  
  # Input validation
  if not isinstance(file, str):
    raise TypeError('File type must be string')
  is_url = file.startswith('http')
  if not (os.path.isfile(file) or is_url):
    raise ValueError('File argument must be local file or URL')
  if not isinstance(encoding, str):
    raise TypeError('File encoding type must be string')
  
  # TeX character correspondences
  texchars = []
  
  if is_url:
    stream = urlopen(file)
    lines  = (line.decode(encoding) for line in stream)
  else:
    stream = open(file, encoding = encoding)
    lines  = stream
  lines = [line.strip().split(';') for line in lines]
  
  texchars = [{lines[0][c]: lines[r + 1][c] for c in range(len(lines[0]))} 
              for r in range(len(lines) - 1)]
  
  # Returning results
  return texchars

def get_fields(file: str, encoding: str = 'utf-8'):
  '''
  Required and optional BibTeX fields by entry
  
  Parameters
  ----------
  file : str
    File or URL with `.bib` extension
  encoding : str
    File encoding option
  
  Returns
  -------
  List
    Dictionary with required and optional fields for each entry
  
  Examples
  --------
  >>> url = '/'.join(['https://dimitrisilva.github.io', 'html-misc', 
                      'bibtex-data', 'input', 'required-fields.json'])
  >>> required_fields = get_fields(url)
  '''
  
  # Input validation
  if not isinstance(file, str):
    raise TypeError('File type must be string')
  is_url = file.startswith('http')
  if not (os.path.isfile(file) or is_url):
    raise ValueError('File argument must be local file or URL')
  if not isinstance(encoding, str):
    raise TypeError('File encoding type must be string')
  
  # Field requirements
  if is_url: stream   = urlopen(file)
  else:      stream   = open(file, encoding = encoding)
  required_fields = json.load(stream)
  
  # Returning results
  return required_fields

def get_template(bibtype: str, optional: Union[bool, List[str]] = True) -> str:
  '''
  Parameters
  ----------
  bibtype : str
    BibTeX entry type
  optional : Union[bool, List[str]]
    Option to include optional fields or a subset of in given in a list
  
  Returns
  -------
  str
    BibTeX item template for specific entry type
  
  Examples
  --------
  >>> print(get_template('incollection', optional = False))
  '''
  
  # Input validation
  if not isinstance(bibtype, str):
    raise TypeError('BibTeX entry type must be string')
  if not any([bibtype == entry_type for entry_type in entries]):
    raise ValueError('Invalid BibTeX entry type')
  if not isinstance(optional, (bool, list)):
    raise TypeError('Choice for optional fields must be Boolean or list')
  required_fields = get_fields('/'.join(['https://dimitrisilva.github.io', 
                                         'html-misc', 'bibtex-data', 'input', 
                                         'required-fields.json']))
  if isinstance(optional, list):
    if not all([isinstance(field, str) for field in optional]):
      raise TypeError('Optional field names must be a list of strings')
    invalid = [field for field in optional 
               if field not in required_fields[bibtype]['optional']]
    if len(invalid):
      invalid = ', '.join(invalid)
      raise ValueError(f'Invalid optional fields in list: {invalid}')
  
  # Template
  mandatory = required_fields[bibtype]['mandatory']
  if isinstance(optional, bool):
    if optional == True: optional = required_fields[bibtype]['optional']
    else:                optional = []
  else:                  optional = [field for field in optional 
                                     if required_fields[bibtype]['optional']]
  
  bibfields = [field for field in fields if field in [*mandatory, *optional]]
  bibfields = [rf'  {field} = {{}}' for field in bibfields]
  bibfields = ',\n'.join(bibfields)
  
  template = '\n'.join([rf'@{bibtype}{{,', rf'{bibfields}', '}'])
  
  # Returning results
  return template

def convert_characters(text: str, src: str = 'std', tgt: str = 'tex') -> str:
  '''
  Convert characters between representions in standard TeX represenation, 
  alternative TeX representation, ASCII characters, or unicode text characters
  
  Parameters
  ----------
  entry : str
    BibTeX entry
  src : str
    Source representation; 'std', 'tex', 'ascii', or 'txt'
  tgt : str
    Target representation; 'std', 'tex', 'ascii', or 'txt'
  
  Returns
  -------
  str
    Original BibTeX entry with new representation
  
  Examples
  --------
  >>> text = 'Distribui\c{c}\~{a}o de Renda: Medidas de Desigualdade, Pobreza, Concentra\c{c}\~{a}o, Segrega\c{c}\~{a}o e Polariza\c{c}\~{a}o'
  >>> convert_characters(text, src = 'tex', tgt = 'txt')
  >>> del text
  '''
  
  # Input validation
  if not isinstance(text, str):
    raise TypeError('Text to be converted must be string')
  if not (isinstance(src, str) and isinstance(tgt, str)):
    raise TypeError('Source and target representation must be strings')
  if not (src != tgt):
    raise ValueError('Source and target representation must be distinct')
  if not (src in ['std', 'tex', 'ascii', 'txt']):
    raise ValueError('Invalid source represeantion choice')
  if not (tgt in ['std', 'tex', 'ascii', 'txt']):
    raise ValueError('Invalid target represeantion choice')
  
  # Conversion
  texchars = get_texchars('/'.join(['https://dimitrisilva.github.io', 
                                    'html-misc', 'bibtex-data', 'input', 
                                    'texchars.txt']))
  for i in range(len(texchars)):
    if texchars[i][src] in text: 
      text = text.replace(texchars[i][src], texchars[i][tgt])
  
  # Returning results
  return text

def parse_entry(
    entry: str, convert: Union[None, List[str]] = None, 
    src: str = 'std', tgt: str = 'tex'
  ) -> dict:
  '''
  Parse BibTeX entry into dictionary
  
  Parameters
  ----------
  entry : str
    BibTeX entry
  convert : Union[None, List[str]]
    Option to select BibTeX fields to be converted; default are TeX fields
  src : str
    Source representation; 'std', 'tex', 'ascii', or 'txt'
  tgt : str
    Target representation; 'std', 'tex', 'ascii', or 'txt'
  
  Returns
  -------
  dict : 
    Dictionary with entry type, citation key, and fields dictionary
  
  Examples
  --------
  >>> entry = '\n'.join([
      '@book{hoffmann2019distribuiccao,',
      '  title = {Distribui\\c{c}\\~{a}o de Renda: Medidas de Desigualdade, Pobreza, Concentra\\c{c}\\~{a}o, Segrega\\c{c}\\~{a}o e Polariza\\c{c}\\~{a}o},',
      '  author = {Hoffmann, Rodolfo and Botassio, Diego Camargo and Gon\\c{c}alves de Jesus, Josimar},',
      '  year = {2019},',
      '  url = {https://www.edusp.com.br/livros/distribuicao-de-renda/},',
      '  publisher = {EdUSP},',
      '  abstract = {Este livro apresenta instrumental estatístico para analisar distribuições de renda e medir seus graus de desigualdade e de pobreza. Trata-se de uma segunda edição revista e ampliada que conta com dois novos autores e novos capítulos, tendo em vista o desenvolvimento de novas técnicas. Assim, traz um capítulo explicando a decomposição do índice de Gini conforme parcelas da renda, capítulos sobre medidas de polarização e outro sobre os efeitos causados por um acréscimo de renda, ainda que pequeno, nos índice de desigualdade. Além dessas inclusões, foram feitas alterações menores ao longo de todo o texto. O conteúdo tem caráter didático, com exemplos numéricos simples e exercícios ao final de cada capítulo. Para esta segunda edição, todo o texto foi revisto e foram acrescentados novos capítulos e seções, além de um grande número de exercícios.}',
      '}'
    ])
  >>> bib = parse_entry(entry, convert = texfields, src = 'tex', tgt = 'std')
  '''
  
  # Input validation
  if not isinstance(entry, str):
    raise TypeError('BibTeX entry must be string')
  if not (convert is None or isinstance(convert, list)):
    raise TypeError('Invalid choice of BibTeX fields to be converted')
  if (isinstance(convert, list) and 
      any([not isinstance(field, str) for field in convert])):
    raise TypeError('BibTeX fields to be converted must form a list of strings')
  if isinstance(convert, list) and not set(convert).issubset(texfields):
    difference = ', '.join(list(set(convert).difference(texfields)))
    raise ValueError(f'Invalid choice of BibTeX field names: {difference}')
  if not (isinstance(src, str) and isinstance(tgt, str)):
    raise TypeError('Source and target representation must be strings')
  if not (src != tgt):
    raise ValueError('Source and target representation must be distinct')
  if not (src in ['std', 'tex', 'ascii', 'txt']):
    raise ValueError('Invalid source represeantion choice')
  if not (tgt in ['std', 'tex', 'ascii', 'txt']):
    raise ValueError('Invalid target represeantion choice')
  
  # Parse BibTeX entry
  bib       = dict()
  bibfields = dict()
  convert   = ([] if convert is None else 
               [field for field in texfields if field in convert])
  invalid   = False
  
  lines = [_.strip() for _ in entry.strip().split('\n') if len(_.strip()) > 0]
  for line in lines:
    if line.startswith('@'):
      match = re.match(patterns['entry'], line, re.I)
      if match:
        bib['key']     = match.group('key')
        bib['bibtype'] = match.group('bibtype')
      else: 
        invalid = True
    elif not (line.startswith('@') or line.startswith('}')):
      match = re.match(patterns['field'], line, re.I)
      if match:
        name  = match.group('name')
        value = match.group('value')
        if name in convert: 
          value = convert_characters(value, src = src, tgt = tgt)
        bibfields[name] = value
    else:
      if not bool(bibfields):
        invalid = True
        break
      bib['fields'] = {name: bibfields[name] if name in bibfields else '' 
                       for name in fields}
      bib['fields'] = {name: bib['fields'][name] for name in bib['fields'] 
                       if len(bib['fields'][name]) > 0}
  
  if invalid: raise ValueError('Invalid BibTeX entry')
  
  # Returning results
  return bib

def assemble_entry(bib: Dict[str, Union[str, Dict[str, str]]]) -> str:
  '''
  Assemble BibTeX dictionary into BibTeX string
  
  Parameters
  ----------
  bib : dict
    BibTeX dictionary
  
  Returns
  -------
  str
    BibTeX entry
  
  Examples
  --------
  >>> entry = '\n'.join([
      '@book{hoffmann2019distribuiccao,',
      '  title = {Distribui\\c{c}\\~{a}o de Renda: Medidas de Desigualdade, Pobreza, Concentra\\c{c}\\~{a}o, Segrega\\c{c}\\~{a}o e Polariza\\c{c}\\~{a}o},',
      '  author = {Hoffmann, Rodolfo and Botassio, Diego Camargo and Gon\\c{c}alves de Jesus, Josimar},',
      '  year = {2019},',
      '  url = {https://www.edusp.com.br/livros/distribuicao-de-renda/},',
      '  publisher = {EdUSP},',
      '  abstract = {Este livro apresenta instrumental estatístico para analisar distribuições de renda e medir seus graus de desigualdade e de pobreza. Trata-se de uma segunda edição revista e ampliada que conta com dois novos autores e novos capítulos, tendo em vista o desenvolvimento de novas técnicas. Assim, traz um capítulo explicando a decomposição do índice de Gini conforme parcelas da renda, capítulos sobre medidas de polarização e outro sobre os efeitos causados por um acréscimo de renda, ainda que pequeno, nos índice de desigualdade. Além dessas inclusões, foram feitas alterações menores ao longo de todo o texto. O conteúdo tem caráter didático, com exemplos numéricos simples e exercícios ao final de cada capítulo. Para esta segunda edição, todo o texto foi revisto e foram acrescentados novos capítulos e seções, além de um grande número de exercícios.}',
      '}'
    ])
  >>> print(assemble_entry(parse_entry(entry, convert = texfields, src = 'tex', tgt = 'std')))
  >>> del entry
  '''
  
  # Input validation
  if not isinstance(bib, dict):
    raise TypeError('Invalid BibTeX dictionary')
  if not set(['key', 'bibtype', 'fields']).issubset(bib):
    raise ValueError('Invalid BibTeX dictionary keys')
  
  # BibTeX entry
  entry = '\n'.join([
    r'@{0}{{{1},'.format(bib['bibtype'], bib['key']), 
    ',\n'.join(['  {0} = {{{1}}}'.format(field, bib["fields"][field]) 
              for field in bib['fields']]), 
    '}'
  ])
  
  # Returning results
  return entry

def make_key(bib: Dict[str, Union[str, Dict[str, str]]]) -> str:
  '''
  Make BibTeX entry key from BibTeX dictionary
  
  Parameters
  ----------
  bib : dict
    BibTeX dictionary
  
  Returns
  -------
  str
    BibTeX entry key
  
  Examples
  --------
  >>> key = make_key(bib)
  '''
  
  # Input validation
  if not isinstance(bib, dict):
    raise TypeError('Invalid BibTeX dictionary')
  if not set(['key', 'bibtype', 'fields']).issubset(bib):
    raise ValueError('Invalid BibTeX dictionary keys')
  
  # BibTeX key
  words  = ['a', 'an', 'are', 'as', 'de', 'do', 
            'in', 'it', 'is', 'how', 'o', 'on', 
            'os', 'the', 'to', 'was', 'what', 
            'when', 'who', 'why']
  title  = (unicodedata.normalize('NFKD', bib['fields']['title'])
                       .encode(encoding = 'ascii', errors = 'ignore')
                       .decode('ascii').lower())
  title  = re.sub(r'[\'\"(),\-]', ' ', title)
  title  = re.sub(''.join(['\\b(?:', '|'.join(words), ')\\b']), 
                  '', title, re.I).strip()
  title  = re.split('\s+', title)[0]
  author = (unicodedata.normalize('NFKD', bib['fields']['author'])
                        .encode(encoding = 'ascii', errors = 'ignore')
                        .decode('ascii').lower())
  author = re.sub(r'[-\']', ', ', author)
  author = re.split(',\s+', author)[0]
  year   = str(bib['fields']['year'])
  key    = f'{author}{year}{title}'
  
  # Returning results
  return key

def make_filename(bib: Dict[str, Union[str, Dict[str, str]]]) -> str:
  '''
  Make BibTeX entry key from BibTeX dictionary
  
  Parameters
  ----------
  bib : dict
    BibTeX dictionary
  
  Returns
  -------
  str
    File name made of title, authors, and year
  
  Examples
  --------
  >>> filename = make_filename(bib)
  '''
  
  # Input validation
  if not isinstance(bib, dict):
    raise TypeError('Invalid BibTeX dictionary')
  if not set(['key', 'bibtype', 'fields']).issubset(bib):
    raise ValueError('Invalid BibTeX dictionary keys')
  
  # File name
  title    = bib['fields']['title']
  authors  = [name.split(',')[0] for name in 
              bib['fields']['author'].split(' and ')]
  authors  = (' and '.join([', '.join(authors[:-1]), authors[-1]]) 
              if len(authors) > 2 else ' and '.join(authors))
  year     = str(bib['fields']['year'])
  filename = f'{title} ({authors}, {year})'
  
  # Returning results
  return filename

def fetch_entries(
    file: str, encoding: str = 'utf-8', dictionary: bool = False, 
    convert: Union[None, List[str]] = None, src: str = 'std', tgt: str = 'tex'
  ) -> Union[List[Dict[str, Union[str, Dict[str, str]]]], 
             Dict[str, Dict[str, Union[str, Dict[str, str]]]]]:
  '''
  Fetch BibTeX entries from file
  
  Parameters
  ----------
  file : str
    File or URL with `.bib` extension
  encoding : str
    File encoding option
  dictionary : bool
    Option to return list as a dictionary
  convert : Union[None, List[str]]
    Option to select BibTeX fields to be converted; default are TeX fields
  src : str
    Source representation; 'std', 'tex', 'ascii', or 'txt'
  tgt : str
    Target representation; 'std', 'tex', 'ascii', or 'txt'
  
  Returns
  -------
  Union[List[Dict[str, Union[str, Dict[str, str]]]], 
        Dict[str, Dict[str, Union[str, Dict[str, str]]]]]
    If `dictionary` is `False`, a list of dictionaries whose keys are citation 
    key, entry type key, and a key named `fields` each related to a BibTeX 
    entry; otherwise, a dictionary with citations keys and whose values are 
    citation key, entry type key, and a key named `fields` each related to a 
    BibTeX entry and which are keys of a dictionary.
  
  Examples
  --------
  >>> bibs = fetch_entries('http://dimitrisilva.github.io/html-misc/bibtex-data/input/bibdata.bib', dictionary = False)
  >>> bibs = fetch_entries('http://dimitrisilva.github.io/html-misc/bibtex-data/input/bibdata.bib', dictionary = True)
  >>> del bibs
  '''
  
  # Input validation
  if not isinstance(file, str):
    raise TypeError('File type must be string')
  is_url = file.startswith('http')
  if not (os.path.isfile(file) or is_url):
    raise ValueError('File argument must be local file or URL')
  if not isinstance(encoding, str):
    raise TypeError('File encoding type must be string')
  if not (convert is None or isinstance(convert, list)):
    raise TypeError('Invalid choice of BibTeX fields to be converted')
  if (isinstance(convert, list) and 
      any([not isinstance(field, str) for field in convert])):
    raise TypeError('BibTeX fields to be converted must form a list of strings')
  if isinstance(convert, list) and not set(convert).issubset(texfields):
    difference = ', '.join(list(set(convert).difference(texfields)))
    raise ValueError(f'Invalid choice of BibTeX field names: {difference}')
  if not (isinstance(src, str) and isinstance(tgt, str)):
    raise TypeError('Source and target representation must be strings')
  if not (src != tgt):
    raise ValueError('Source and target representation must be distinct')
  if not (src in ['std', 'tex', 'ascii', 'txt']):
    raise ValueError('Invalid source represeantion choice')
  if not (tgt in ['std', 'tex', 'ascii', 'txt']):
    raise ValueError('Invalid target represeantion choice')
  
  # Location
  bibs = []
  
  if is_url:
    stream   = urlopen(file)
    iterator = (line.decode(encoding) for line in stream)
  else:
    stream   = open(file, encoding = encoding)
    iterator = stream
  
  with stream:
    switch = False
    for line in iterator:
      line = line.strip()
      if line.startswith('@'):
        match = re.match(patterns['entry'], line, re.I)
        if match:
          switch = True
          entry = [line]
          continue
      elif not (line.startswith('@') or line.startswith('}')):
        if switch: entry.append(line)
      elif line.startswith('}'): 
        if switch: entry.append(line)
        bibs.append(parse_entry('\n'.join(entry), convert = convert, 
                                src = src, tgt = tgt))
        switch = False
        continue
  del iterator, stream, switch
  
  # Checking consistency of locations
  keys   = [bibs[i]['key'] for i in range(len(bibs))]
  valid  = True
  
  if any([keys[i + 1] < keys[i] for i in range(len(bibs) - 1)]):
    valid = False
    ks0 = [k for k in keys]
    ks1 = sorted(ks0)
    ks  = [ks0[i] for i in range(len(ks0)) if ks0[i] != ks1[i]]
    warn('Citation keys are not ordered: {0}'.format(', '.join(ks)))
    del ks0, ks1, ks
  if len(keys) != len(set(keys)):
    valid = False
    ks0, ks1 = set(), set()
    for key in keys:
      if key in ks0: ks1.add(key)
      else:          ks0.add(key)
    warn('Citation keys are not unique: {0}'.format(', '.join(sorted(ks1))))
  
  # Put location in dictionary
  if dictionary:
    if not valid:
      warn('Unable to parse BibTeX entries from list into dictionary')
    else:
      bibs = {bibs[i]['key']: bibs[i] for i in range(len(bibs))}
  
  # Returning results
  return bibs

def locate_entries(
    file: str, encoding: str = 'utf-8', dictionary: bool = False
  ) -> List[Dict[str, Tuple[int, int]]]:
  '''
  Locate each BibTeX entries in file
  
  Parameters
  ----------
  file : str
    File or URL with `.bib` extension
  encoding : str
    File encoding option
  dictionary : bool
    Option to return list as a dictionary
  
  Returns
  -------
  List[Dict[str, Tuple[int, int]]]
    A list of dictionaries where each key is a citation key and its value is a 
    two-element tuple with integers indicating the starting and ending row 
    of a BibTeX entry in file
  
  Examples
  --------
  >>> location = locate_entries('http://dimitrisilva.github.io/html-misc/bibtex-data/input/bibdata.bib', dictionary = False)
  >>> location = locate_entries('http://dimitrisilva.github.io/html-misc/bibtex-data/input/bibdata.bib', dictionary = True)
  >>> del location
  '''
  
  # Input validation
  if not isinstance(file, str):
    raise TypeError('File type must be string')
  is_url = file.startswith('http')
  if not (os.path.isfile(file) or is_url):
    raise ValueError('File argument must be local file or URL')
  if not isinstance(encoding, str):
    raise TypeError('File encoding type must be string')
  
  # Location
  location = []
  row = 0
  key = None
  start = None
  
  if is_url:
    stream   = urlopen(file)
    iterator = (line.decode(encoding) for line in stream)
  else:
    stream   = open(file, encoding = encoding)
    iterator = stream
  
  with stream:
    row = 0
    for line in iterator:
      line = line.strip()
      if line.startswith('@'):
        match = re.match(patterns['entry'], line, re.I)
        if match:
          key = match.group('key')
          start = row
      elif line.startswith('}') and key is not None:
        end = row
        location.append({key: (start, end)})
        key, start = None, None
      row += 1
      del line
  del iterator, stream, row
  
  # Checking consistency of locations
  keys   = [key for i in range(len(location)) for key in location[i].keys()]
  values = [tuple(values) for i in range(len(location)) 
            for values in location[i].values()]
  valid  = {'keys': True, 'values': True}
  
  if not (len(keys) == len(values) == len(location)):
    raise ValueError('Inconsistent locations in BibTeX data')
  
  if any([keys[i + 1] < keys[i] for i in range(len(location) - 1)]):
    valid['keys'] = False
    warn('Citation keys are not ordered')
  if len(keys) != len(set(keys)):
    valid['keys'] = False
    warn('Citation keys are not unique')
  
  if any([any([not isinstance(value, int) for value in values[i]]) 
          for i in range(len(location))]):
    valid['values'] = False
    warn('BibTeX entry list has missing locations')
  if (any([values[i][0] >= values[i][1] 
           for i in range(len(location))]) or 
      any([values[i][1] >= values[i + 1][0] 
           for i in range(len(location) - 1)])):
    valid['values'] = False
    warn('Inconsistent BibTeX entry location')
  
  # Put location in dictionary
  if dictionary:
    if not (valid['keys'] and valid['values']):
      warn('Unable to parse locations from list into dictionary')
    else:
      location = {keys[i]: values[i] for i in range(len(location))}
  
  # Returning results
  return location

def search_keys(
    keys: List[str], location: List[str], display: bool = False
  ) -> Union[Dict[str, List[str]], None]:
  '''
  Indicate whether keys have partial matches in BibTeX data file.
  
  Parameters
  ----------
  keys : List[str]
    List of citation key strings to be searched
  location : Union[List[str], Dict[str, Tuple[int, int]]]
    List of original citation keys or keys and row range of BibTeX entry in file
  display : bool
    Option to display results (instead of return results)
  
  Returns
  -------
    Dict[str, List[str]]
  
  Examples
  --------
  >>> location = locate_entries('http://dimitrisilva.github.io/html-misc/bibtex-data/input/bibdata.bib', dictionary = True)
  >>> location = list(location.keys())
  >>> keys = ['aaberge2015multidimensional', 'alipour2025no', 'box2014time', 'butts2023difference', 'chechile2020bayesian', 'crippa2025manipulation']
  >>> place = search_keys(keys[:], location)
  >>> search_keys(keys[:], [key for key in location], display = True)
  >>> del place, keys, location
  '''
  
  # Input validation
  if not isinstance(keys, list):
    raise TypeError('Citation keys must be form a list')
  if not all([isinstance(keys[i], str) for i in range(len(keys))]):
    raise TypeError('Each citation key must be a string')
  if not isinstance(location, list):
    raise TypeError('File citation keys must be must form a list')
  if not all([isinstance(location[i], str) for i in range(len(location))]):
    raise TypeError('Each file citation key must be a string')
  
  # New keys place
  place = {key: [] for key in sorted(keys, key = lambda x: x.lower())}
  for key in place:
    pattern = ''.join(['^', re.split('\d{4}', key.lower())[0], '\d{4}.+'])
    place[key] = [_ for _ in location if re.match(pattern, _)]
  place = {key: place[key] for key in place if len(place[key]) > 0}
  
  # Returning results
  if display:
    for key in place: 
      print('{0}: \n  {1}\n'.format(key, '\n  '.join(place[key])))
    return None
  else: 
    return place

def place_keys(
    keys: List[str], location: List[str], display: bool = False
  ) -> Union[Dict[str, List[str]], None]:
  '''
  Indicate where new keys should be placed in BibTeX data file.
  
  Parameters
  ----------
  keys : List[str]
    List of citation key strings to be placed
  location : Union[List[str], Dict[str, Tuple[int, int]]]
    List of original citation keys or keys and row range of BibTeX entry in file
  display : bool
    Option to display results (instead of return results)
  
  Returns
  -------
    Dict[str, List[str]]
  
  Examples
  --------
  >>> location = locate_entries('http://dimitrisilva.github.io/html-misc/bibtex-data/input/bibdata.bib', dictionary = True)
  >>> location = list(location.keys())
  >>> keys = ['aaberge2015multidimensional', 'alipour2025no', 'box2014time', 'butts2023difference', 'chechile2020bayesian', 'crippa2025manipulation']
  >>> place = place_keys(keys[:], location)
  >>> place_keys(keys[:], [key for key in location], display = True)
  >>> del place, keys, location
  '''
  
  # Input validation
  if not isinstance(keys, list):
    raise TypeError('New citation keys must be form a list')
  if not all([isinstance(keys[i], str) for i in range(len(keys))]):
    raise TypeError('Each new citation key must be a string')
  if not isinstance(location, list):
    raise TypeError('File citation keys must be must form a list')
  if not all([isinstance(location[i], str) for i in range(len(location))]):
    raise TypeError('Each file citation key must be a string')
  if len(set(keys).intersection([key for key in location])) > 0:
    common = sorted(set(keys).intersection([key for key in location]))
    common = ', '.join(common)
    raise ValueError(f'Common keys between both citation keys lists: {common}')
  
  # New keys place
  place = {key: [] for key in location}
  for new_key in sorted(keys, key = lambda x: x.lower()):
    old_key = [key for key in location if key.lower() < new_key.lower()][-1]
    place[old_key].append(new_key)
  place = {key: place[key] for key in place if len(place[key]) > 0}
  
  # Returning results
  if display:
    for key in place: 
      print('{0}: \n\t{1}\n'.format(key, '\n\t'.join(place[key])))
    return None
  else: 
    return place

def insert_entries(
    texs: Dict[str, str], file: str, encoding: str = 'utf-8', 
    backup: bool = False
  ) -> None:
  '''
  Insert new BibTeX entries in BibTeX data file.
  
  Parameters
  ----------
  bibs : Dict[str, str]
    Parsed BibTeX entries
  file : str
    File full path
  encoding : str
    File encoding option
  backup : bool
    Option to store a backup file
  
  Returns
  -------
  None
  
  Examples
  --------
  >>> bibtmp = fetch_entries(os.path.join(r'D:', 'Downloads', 'bibstmp.bib'))
  >>> file = os.path.join(r'D:', 'Dropbox', 'r', 'github', 
                          'dimitrisilva.github.io', 'docs', 'html-misc', 
                          'bibtex-data', 'input', 'bibdata.bib')
  insert_entries({key: assemble_entry(bibtmp[key]) for key in bibtmp}, 
                 file, encoding = 'utf-8', backup = True)
  '''
  
  # Input validation
  if not isinstance(texs, dict):
    raise TypeError('BibTeX entries must form a list or dictionary')
  if not os.path.isdir(os.path.split(file)[0]):
    raise TypeError('Invalid file path')
  
  # Map BibTeX entry rows in file
  rngs = locate_entries(file, encoding = encoding, dictionary = True)
  if len(set([key for key in texs]) & set([key for key in rngs])): 
    keys = sorted(set([key for key in texs]) & set([key for key in rngs]))
    keys = ', '.join(keys)
    raise ValueError(f'Common keys across BibTeX entry sets: {keys}.')
  locs = place_keys(sorted([key for key in texs]), [key for key in rngs])
  
  # Define row number of BibTeX entries to be inserted
  rows = {}
  for key in locs:
    letters = sorted([k[0] for k in locs[key]])
    if   len(letters) == 1:
      txt = '\n\n'.join([texs[k] for k in texs if k in locs[key]])
      rows[rngs[key][1] + 1] = txt + '\n\n'
      del txt
    elif len(letters) == 2:
      keys = [k for k in locs if k >= key][:2]
      txt0 = '\n\n'.join([texs[k] for k in texs if k in locs[key] and 
                          k.startswith(letters[0])])
      txt1 = '\n\n'.join([texs[k] for k in texs if k in locs[key] and 
                          k.startswith(letters[1])])
      rows[rngs[keys[0]][1] + 1] = txt0 + '\n\n'
      rows[rngs[keys[1]][0] - 1] = txt1 + '\n\n'
      del txt0, txt1, keys
    else:
      raise ValueError('Multiple entries error')
  
  # Insert new BibTeX entries in file
  v = '_' + datetime.now().strftime('%Y-%m-%d--%H-%M-%S') + '.'
  tempfile = re.sub(r'\.(?=[^.]+$)', v, file); del v
  shutil.copy2(file, tempfile)
  
  with (open(file,     mode = 'r', encoding = encoding) as inbib, 
        open(tempfile, mode = 'w', encoding = encoding) as outbib):
    for row, line in enumerate(inbib):
      outbib.write(line)
      if row in rows: 
        outbib.write(rows[row])
  
  # Handle file backup
  if backup: os.rename(file, re.sub(r'\.(?=[^.]+$)', '_v0.', tempfile))
  os.replace(tempfile, file)
  
  # Returning results
  return None

def to_bib(
    texs: Dict[str, str], save: str, encoding: str = 'utf-8', 
    replace: bool = False
  ) -> None:
  '''
  Save parsed BibTeX entries to `.bib` file
  
  Parameters
  ----------
  texs : Dict[str, str]
    Parsed BibTeX entries
  save : str
    Saving file
  encoding : str
    Saving file encoding
  replace : bool
    Option to replace existing file when saving
  
  Returns
  -------
  None
    Save parsed BibTeX entries to `.bib` file
  
  Examples
  --------
  >>> bibs = fetch_entries('http://dimitrisilva.github.io/html-misc/bibtex-data/input/bibdata.bib', dictionary = True)
  >>> texs = {key: assemble_entry(bibs[key]) for key in bibs}
  >>> to_bib(texs, save = os.path.join(r'D:', 'Downloads', 'bibstmp.bib'), encoding = 'utf-8', replace = False)
  >>> del texs, bibs
  '''
  
  # Input validation
  if not isinstance(texs, dict):
    raise TypeError('BibTeX entries must form a dictionary')
  if not all([isinstance(key, str) for key in texs]):
    raise ValueError('Dictionary keys must be string')
  if not all([isinstance(texs[key], str) for key in texs]):
    raise ValueError('Dictionary values must be string')
  if not isinstance(save, str):
    raise TypeError('Saving file type must be string')
  if not os.path.isdir(os.path.split(save)[0]):
    raise ValueError('Invalid path for saving file')
  if not isinstance(replace, bool):
    raise TypeError('Incorrect type for replace option')
  if not replace and os.path.isfile(save):
    raise ValueError('Saving file already exists')
  if not isinstance(encoding, str):
    raise TypeError('Saving file encoding type must be string')
  
  # Insert entries
  letters = []
  for letter in [key[0].lower() for key in texs]:
    if letter not in letters: letters.append(letter)
    del letter
  
  with open(save, mode = 'w', encoding = encoding) as outfile:
    letter0 = letters[0]
    outfile.write('\n'.join([f'% -*- coding: {encoding} -*-', '', '', 
                             '% {0}{1}'.format(letter0.upper(), letter0), 
                             '', '']))
    for key in texs:
      letter1 = key[0].lower()
      if letter1 != letter0: 
        line = '\n'.join(['', '% {0}{1}'.format(letter1.upper(), letter1), 
                          '', ''])
        outfile.write(line)
        letter0 = letter1
        del line
      outfile.write('\n'.join([texs[key], '', '']))
      del key, letter1
    del letter0
  del outfile
  
  # Returning results
  return None

def to_dataframe(
    bibs: Union[List[Dict[str, Union[str, Dict[str, str]]]], 
                Dict[str, Dict[str, Union[str, Dict[str, str]]]]],
    append: Union[None, List[str]] = None
  ) -> pd.core.frame.DataFrame:
  '''
  Transform parsed BibTeX entries into data frame
  
  Parameters
  ----------
  bibs: Union[List[Dict[str, Union[str, Dict[str, str]]]], 
              Dict[str, Dict[str, Union[str, Dict[str, str]]]]]
    Parsed BibTeX entries
  append: Union[None, List[str]]
    Option to include additional columns in data frame
  
  Returns
  -------
  pd.core.frame.DataFrame
  
  Examples
  --------
  >>> soup = bs(open(os.path.join('D:', 'Dropbox', 'r', 'github', 
                                  'dimitrisilva.github.io', 'docs', 'html-misc',
                                  'bibliography', 'reading', 'index.html'),
                     encoding = 'utf-8'))
  >>> keys = [p['id'] for p in 
              (soup.find('details', attrs = {'data-topic': 'econometrics'})
                   .find_all('p'))]
  >>> bibs  = fetch_entries('http://dimitrisilva.github.io/html-misc/bibtex-data/input/bibdata.bib', dictionary = True)
  >>> dfbib = to_dataframe({key: bibs[key] for key in keys})
  >>> del dfbib, bibs, keys, soup
  '''
  
  # Input validation
  if not isinstance(bibs, (list, dict)):
    raise TypeError('BibTeX entries must form a list or dictionary')
  if not (append is None or isinstance(append, list)):
    raise TypeError('Additional columns must form a list')
  
  # Data frame
  columns = (['key', 'bibtype', *fields] if append is None else
             ['key', 'bibtype', *fields, *append])
  dfbib = pd.DataFrame(columns = columns)
  if isinstance(bibs, list):
    for i in range(len(bibs)):
      data = {'key': bibs[i]['key'], 'bibtype': bibs[i]['bibtype'], 
              **{field: None if field not in bibs[i]['fields'] else 
                        bibs[i]['fields'][field] 
                 for field in fields}, 
              **{col: None if col not in bibs[i] else bibs[i][col] 
                 for col in append}}
      dfbib = pd.concat([dfbib, pd.DataFrame([data])])
      del data, i
  else: 
    for key in bibs:
      data  = {'key': bibs[key]['key'], 'bibtype': bibs[key]['bibtype'], 
               **{field: None if field not in bibs[key]['fields'] else 
                         bibs[key]['fields'][field] 
                  for field in fields}}
      dfbib = pd.concat([dfbib, pd.DataFrame([data])])
      del data, key
  dfbib = dfbib.sort_values('key').reset_index(drop = True)
  
  # Returning results
  return dfbib


# %%% Scholarly Data

def extract_entry(
    result: Dict, 
    append: Union[None, List[str]] = None,
    references: bool = False
  ) -> Dict:
  '''
  Extract BibTeX entry from OpenAlex API result
  
  Parameters
  ----------
  result : dict
    Single OpenAlex API result obtained from GET request
  append : None or List[str]
    Option to append specific fields to BibTeX entry
  
  Returns
  -------
  dict
    Dictionary with work id, entry type, citation key, and fields dictionary
  
  References
  ----------
  OpenAlex
    https://developers.openalex.org/api-reference
  OpenCitations
    https://api.opencitations.net/meta/v1
    https://api.opencitations.net/index/v2
  Semantic Scholar
    https://www.semanticscholar.org/product/api/tutorial
  
  Examples
  --------
  >>> i = 'w4229571425'
  >>> bib = extract_entry(get(f'https://api.openalex.org/{i}', timeout = 30).json(), 
                          append = ['url', 'doi', 'abstract'])
  '''
  
  # Input validation
  if not isinstance(result, dict):
    raise TypeError('Invalid OpenAlex result argument: must be dictionary')
  if not (append is None or isinstance(append, list)):
    raise TypeError('Invalid append argument')
  
  # Auxiliary functions
  def get_editors(title, year, publisher):
    p1  = re.sub('\s+', '+', f'"{title}"'.lower())
    p2  = ','.join([f'publication_year:{year}', 
                    f'primary_location.source.publisher_lineage:{publisher}'])
    url = f'https://openalex.org/works?page=1&search.title={p1}&filter={p2}'
    
    try:
      book = get(url, timeout = 30).json()['results'][0]
      if 'authorships' in book and book['authorships']:
        editors = [book['authorships'][i]['author']['display_name'] 
                   for i in range(len(book['authorships']))]
        editors = ' and '.join(editors)
      else: 
        editors = ''
    except: 
      editors = ''
    
    return editors
  
  # Browser headers
  headers = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) Firefox/122.0'
  
  # Entry initialization
  entry = {'id':      result['id'].rsplit('/', maxsplit = 1)[1].lower(), 
           'key':     '',
           'bibtype': typedict[result['type']]}
  if append is None: append = []
  
  # Entry type
  if ('source' in result['primary_location'] and 
      result['primary_location']['source'] is not None and 
      'series' in result['primary_location']['source']['type']):
    entry['bibtype'] = 'incollection'
  
  # Entry fields
  elements = {field: '' if field in append else None for field in fields}
  
  #- Title
  if 'display_name' in result and result['display_name'] is not None:
    elements['title'] = result['display_name']
  
  #- Authors
  if 'authorships' in result and result['authorships']:
    authors = [result['authorships'][i]['author']['display_name'] 
               for i in range(len(result['authorships']))]
    authors = [', '.join(author.rsplit(' ', maxsplit = 1)[::-1]) 
               for author in authors if author]
    elements['author'] = ' and '.join(authors)
  
  #- Year
  if result['publication_year'] is not None:
    elements['year'] = result['publication_year']
  
  #- Bibliographic information
  if entry['bibtype'] in ['article', 'book', 'inbook', 'incollection', 
                          'conference', 'inproceedings', 'proceedings']:
    if entry['bibtype'] == 'article':
      if result['primary_location']['source']['display_name'] is not None:
        journal = result['primary_location']['source']['display_name']
        elements['journal'] = journal
    if entry['bibtype'] not in ['article', 'book', 'proceedings']:
      if result['primary_location']['source']['display_name'] is not None:
        booktitle = (result['primary_location']['raw_source_name'] 
                     if entry['bibtype'] == 'inbook' else 
                     result['primary_location']['source']['display_name'])
        elements['booktitle'] = booktitle
        elements['series'] = ''
    if 'volume' in result['biblio'] and result['biblio']['volume'] is not None:
      elements['volume'] = result['biblio']['volume']
    if 'issue' in result['biblio'] and result['biblio']['issue'] is not None:
      elements['number'] = result['biblio']['issue']
    if entry['bibtype'] in ['inbook', 'incollection']:
      elements['chapter'] = ''
    if ('first_page' in result['biblio'] and 
        'last_page' in result['biblio'] and 
        result['biblio']['first_page'] is not None and 
        result['biblio']['last_page'] is not None):
      p0, p1 = result['biblio']['first_page'], result['biblio']['last_page']
      elements['pages'] = p0 if p0 == p1 else '--'.join([p0, p1])
    if ('source' in result['primary_location'] and 
        result['primary_location']['source'] is not None and 
        'host_organization_name' in result['primary_location']['source'] and 
        result['primary_location']['source']['host_organization_name'] 
        is not None):
      publisher = result['primary_location']['source']['host_organization_name']
      elements['publisher'] = publisher
  if entry['bibtype'] == 'techreport':
    institution = journal = result['primary_location']['source']['display_name']
    elements['institution'] = institution
  if 'doi' in result and result['doi'] is not None:
    elements['doi'] = result['doi'].replace('https://doi.org/', '')
    try:    url = head(result['doi'], allow_redirects = True, timeout = 10).url
    except: url = ''
    elements['url'] = url.split('?', maxsplit = 1)[0]
  if elements['booktitle'] and elements['year'] and elements['publisher']:
    elements['editor'] = get_editors(elements['booktitle'], elements['year'], 
                                     elements['publisher'])
  if result['abstract_inverted_index'] is not None:
    n     = max([max(result['abstract_inverted_index'][k]) 
                 for k in result['abstract_inverted_index']])
    words = [None for i in range(n + 1)]
    for word in result['abstract_inverted_index']:
      for i in result['abstract_inverted_index'][word]:
        words[i] = word
    elements['abstract'] = ' '.join(words)
  if 'keywords' in result and result['keywords'] is not None:
    keywords = [result['keywords'][i]['display_name'] 
                for i in range(len(result['keywords'])) 
                if 'display_name' in result['keywords'][i]
                and result['keywords'][i]['display_name'] is not None]
    if len(keywords):
      elements['keywords'] = '; '.join(keywords)
  
  # References
  if references and 'referenced_works' in result:
    refs = [ref.lower().replace('https://openalex.org/', '') 
            for ref in result['referenced_works']]
    elements['crossref'] = ' '.join(refs)
  
  # Entry key
  entry['fields'] = {field: elements[field] for field in fields 
                     if elements[field] is not None}
  
  try:    entry['key'] = make_key(entry)
  except: entry['key'] = ''
  
  # Returning results
  return entry

def search_work(
    search: str, 
    limit: Union[None, int] = None, 
    params: Union[str, Dict[str, str]] = None, 
    references: bool = False, 
    append: Union[None, List[str]] = None
  ) -> Dict:
  '''
  Extract BibTeX entries from OpenAlex API search result
  
  Parameters
  ----------
  search : str
    Single OpenAlex API result obtained from GET request
  limit : Union[None, int]
    Option to limit the number of results collected
  params : Union[None, Dict[str, str]]
    Option to send a dictionary in the query string for the request
  references : 
    Option to collect the OpenAlex IDs of references in each work (as `crossref` field)
  append : None or List[str]
    Option to append specific fields to BibTeX entry
  
  Returns
  -------
  dict
    List of dictionaries with work id, entry type, citation key, and fields dictionary
  
  References
  ----------
  OpenAlex
    https://developers.openalex.org/api-reference
  OpenCitations
    https://api.opencitations.net/meta/v1
    https://api.opencitations.net/index/v2
  Semantic Scholar
    https://www.semanticscholar.org/product/api/tutorial
  
  Examples
  --------
  >>> ids = ['w2045665199', 'w3122910277', 'w4229571425', 'w2101520719', 'w1823439115', 'w630479437', 'w4253659796', 'w3170754682', 'w4307508785', 'w1580107285', 'w4398755788', 'w3122722761', 'w4405172943', 'w4400025592']
  >>> params = {'search': '"monotone comparative statics"', 'api_key': apis['alex'], 'cursor': '*', 'per_page': 100}
  >>> results = [get(f'https://api.openalex.org/{i}', limit = 21,
                     params = params, references = True, 
                     append = ['url', 'doi', 'abstract']).json() 
                 for i in ids]
  '''
  
  # Input validation
  if not isinstance(search, str):
    raise TypeError('Search argument must be string')
  if not (limit is None or isinstance(limit, int)):
    raise TypeError('Result limit must be integer or none')
  if isinstance(limit, int) and limit < 1:
    raise ValueError('Result limit must be a strictly positive integer')
  if not (params is None or isinstance(params, dict)):
    raise TypeError('Search parameters must be dictionary or none')
  if not isinstance(references, bool):
    raise TypeError('References option must be Boolean')
  if not (append is None or isinstance(append, list)):
    raise TypeError('Invalid append argument')
  
  # Search work
  url = 'https://api.openalex.org/works'
  
  if params is None: 
    params = {'search': search, 'api_key': apis['alex'], 
              'cursor': '*', 'per_page': 200}
  params = {'search': search, 'api_key': apis['alex'], 
            'cursor': '*', 'per_page': 200} | params
  
  works = []
  while True:
    response = get(url, params = params).json()
    
    for result in response['results']:
      work = extract_entry(result, references = references, append = append)
      works.append(work)
      if len(works) >= limit: break
    
    if len(works) >= limit: break
    cursor = response['meta'].get('next_cursor')
    if not cursor: break
    params['cursor'] = cursor
  
  # Returning results
  return works

def get_citations(
    work_id: str, params: Union[str, Dict[str, str]] = None
  ) -> Dict:
  '''
  Get work citations as dictionary with OpenAlex work ID and work DOI as 
  key-value pairs
  
  Parameters
  ----------
  work_id : str
    Single OpenAlex work ID
  params : Union[None, Dict[str, str]]
    Option to send a dictionary in the query string for the request
  
  Returns
  -------
  dict
    Dictionary with OpenAlex work ID and work DOI as key-value pairs
  
  References
  ----------
  OpenAlex
    https://developers.openalex.org/api-reference
  OpenCitations
    https://api.opencitations.net/meta/v1
    https://api.opencitations.net/index/v2
  Semantic Scholar
    https://www.semanticscholar.org/product/api/tutorial
  
  Example
  -------
  >>> citations = get_citations('w2165644904')
  '''
  
  # Input validation
  if not isinstance(work_id, str):
    raise TypeError('Work ID argument must be string')
  if not (params is None or isinstance(params, dict)):
    raise TypeError('Search parameters must be dictionary or none')
  
  # Citing IDs
  citations = dict()
  
  #- OpenAlex work ID
  if   re.match('[a-z]{1}[0-9]+', work_id, re.I):
    url = f'https://api.openalex.org/works?filter=cites:{work_id}'
    
    if params is None: 
      params = {'api_key': apis['alex'], 'cursor': '*', 'per_page': 200}
    params = {'api_key': apis['alex'], 'cursor': '*', 'per_page': 200} | params
    
    while True:
      response = get(url, params = params).json()
      
      for result in response['results']:
        key = (result['id'].rsplit('/', maxsplit = 1)[1].lower())
        val = (None if 'doi' not in result or result['doi'] is None 
               else result['doi'].replace('https://doi.org/', ''))
        citations[key] = val
      
      cursor = response['meta'].get('next_cursor')
      if not cursor: break
      params['cursor'] = cursor
  
  #- OpenCitations work ID
  elif re.match(r'10\.\d{4,9}/[-._;()/:A-Z0-9]+', work_id, re.I):
    url = f'https://api.opencitations.net/index/v2/citations/doi:{work_id}'
    
    headers = {'authorization': apis['citations']}
    
    results = get(url, headers = headers).json()
    
    for result in results:
      if 'openalex' in result['citing'] and 'doi' in result['citing']:
        try: 
          key = [i for i in result['citing'].split(' ') 
                 if i.startswith('openalex:')][0].replace('openalex:', '')
          val = [i for i in result['citing'].split(' ') 
                 if i.startswith('doi')][0].replace('doi:', '')
          citations[key.lower()] = val
        except:
          continue
  
  # Returning results
  return citations

# %% Sketches

# %%% BibTeX data manipulation
# Main observations
units = ['w2037738789', 'w1795663738', 'w2887885934', 'w572417158', 
         'w2951774703', 'w3195802189', 'w4295073998', 'w2941737708', 
         'w2296614949', 'w2935825832', 'w2189323984', 'w3033389612', 
         'w4377220395', 'w3195802189']

dfbib = (pd.read_csv(os.path.join(r'D:', 'Downloads', 'study-plan', 
                                  'NX', 'nxdata.csv'), 
                     sep = '\t')
           [lambda x: ['id', *[c for c in x if c != 'id']]]
           .assign(crossref = lambda x: x['crossref'].fillna(''), 
                   n_citation = 0))

# Loading raw data
dfbib = (pd.read_csv(os.path.join(r'D:', 'Downloads', 'study-plan', 
                                  'NX', 'nxdata.csv'), 
                     sep = '\t')
           .assign(crossref = lambda x: 
                     np.where(x['crossref'].isna(), '', x['crossref']), 
                   doi = lambda x: np.where(x['doi'].isna(), '', x['doi']),
                   primary = lambda x: np.where(x['id'].isin(units), 1, 0),
                   n_ref = lambda x: 
                     np.where(x['crossref'].isna(), 0, 
                              x['crossref'].map(lambda v: len(str(v).split()))), 
                   n_citation = 0)
           .sort_values(['primary', 'year'], ascending = [False, False])
           .reset_index(drop = True))

# Nodes with attributes
nodes = list(set([j for i in dfbib['id'].tolist() 
                  for j in (dfbib.loc[dfbib['id'] == i, 'crossref']
                                 .item().split(' '))
                  if j != '' and j in dfbib['id'].tolist()]))

# Cleaning raw data
dfbib = (dfbib.assign(crossref = lambda x: 
                        (x['crossref'].map(
                          lambda v: (' '.join(sorted(set(v.split(' ')).intersection(nodes))))
                        )))
           [lambda x: ['id', *[c for c in x if c not in ['id']]]])

# Collecting number of citations
sch = SemanticScholar()
for i in [r for r in dfbib.index if dfbib.at[r, 'doi'] != '']:
  try:
    paper = sch.get_paper('DOI:{0}'.format(dfbib.at[i, 'doi']))
  except:
    continue
  dfbib.at[i, 'n_citation'] = paper.citationCount

# Removing unnecessary objects
del nodes

dfbib = dfbib[lambda x: ['id', *[c for c in x if c not in ['id']]]]

gph = {'nodes': {'idkey': list(range(len(dfbib['id']))), 
                 'name': dfbib['id'].tolist(), 
                 'primary': dfbib['primary'].tolist(), 
                 'type': dfbib['bibtype'].tolist(), 
                 'title': dfbib['title'].tolist(), 
                 'author': dfbib['author'].tolist(), 
                 'year': dfbib['year'].tolist(), 
                 'n_ref': dfbib['n_ref'].tolist(), 
                 'n_citation': dfbib['n_citation'].tolist(),
                 'abstract': dfbib['abstract'].tolist()}, 
       'edges': [(dfbib.index.get_loc(dfbib[dfbib['id'] == i].index[0]), 
                  dfbib.index.get_loc(dfbib[dfbib['id'] == j].index[0])) 
                 for i in dfbib['id'].tolist() 
                 for j in (dfbib.loc[dfbib['id'] == i, 'crossref']
                                .item().split(' '))
                 if j != '']}

edges = []
for i in dfbib['id'].tolist():
  for j in [_ for _ in dfbib.loc[dfbib['id'] == i, 'crossref'].item().split(' ') if _ != '']:
    edges.append((dfbib.index.get_loc(dfbib[dfbib['id'] == i].index[0]), 
                  dfbib.index.get_loc(dfbib[dfbib['id'] == j].index[0])))

nodes = dfbib[dfbib['primary'] == 1]['id'].tolist()
rs    = {i: len(set(dfbib.loc[i, 'crossref'].split()).intersection(nodes)) 
         for i in dfbib[dfbib['primary'] == 0].index}
rmax  = max([rs[i] for i in rs])
dfbib = dfbib.assign(rank = lambda x: np.where(x['primary'] == 1, 0, rmax))
for i in dfbib[dfbib['primary'] == 0].index:
  dfbib.loc[i, 'rank'] = rmax - (rs[i] - 1)

