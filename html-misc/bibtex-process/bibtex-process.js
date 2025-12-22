// BibTeX Processing JavaScript

(function() {
  'use strict';
  
  // TeX representation options
  const charsMap = {
    std: [
      "{\\`a}", "{\\`A}", "{\\'a}", "{\\'A}", "{\\^a}", "{\\^A}", "{\\\"a}", "{\\\"A}", "{\\~a}", "{\\~A}", "{\\ka}", "{\\kA}", "{\\=a}", "{\\=A}", "{\\ba}", "{\\bA}", "{\\.a}", "{\\.A}", "{\\da}", "{\\dA}", "{\\ra}", "{\\rA}", "{\\ua}", "{\\uA}", "{\\va}", "{\\vA}", "{\\bb}", "{\\bB}", "{\\.b}", "{\\.B}", "{\\db}", "{\\dB}", "{\\'c}", "{\\'C}", "{\\^c}", "{\\^C}", "{\\cc}", "{\\cC}", "{\\bc}", "{\\bC}", "{\\.c}", "{\\.C}", "{\\dc}", "{\\dC}", "{\\vc}", "{\\vC}", "{\\cd}", "{\\cD}", "{\\bd}", "{\\bD}", "{\\.d}", "{\\.D}", "{\\dd}", "{\\dD}", "{\\vd}", "{\\vD}", "{\\`e}", "{\\`E}", "{\\'e}", "{\\'E}", "{\\^e}", "{\\^E}", "{\\\"e}", "{\\\"E}", "{\\~e}", "{\\~E}", "{\\ce}", "{\\cE}", "{\\ke}", "{\\kE}", "{\\=e}", "{\\=E}", "{\\be}", "{\\bE}", "{\\.e}", "{\\.E}", "{\\de}", "{\\dE}", "{\\ue}", "{\\uE}", "{\\ve}", "{\\vE}", "{\\bf}", "{\\bF}", "{\\.f}", "{\\.F}", "{\\df}", "{\\dF}", "{\\'g}", "{\\'G}", "{\\^g}", "{\\^G}", "{\\cg}", "{\\cG}", "{\\=g}", "{\\=G}", "{\\bg}", "{\\bG}", "{\\.g}", "{\\.G}", "{\\dg}", "{\\dG}", "{\\ug}", "{\\uG}", "{\\vg}", "{\\vG}", "{\\^h}", "{\\^H}", "{\\\"h}", "{\\\"H}", "{\\ch}", "{\\cH}", "{\\bh}", "{\\bH}", "{\\.h}", "{\\.H}", "{\\dh}", "{\\dH}", "{\\vh}", "{\\vH}", "{\\`i}", "{\\`I}", "{\\'i}", "{\\'I}", "{\\^i}", "{\\^I}", "{\\\"i}", "{\\\"I}", "{\\~i}", "{\\~I}", "{\\ki}", "{\\kI}", "{\\=i}", "{\\=I}", "{\\bi}", "{\\bI}", "{\\.I}", "{\\di}", "{\\dI}", "{\\ui}", "{\\uI}", "{\\vi}", "{\\vI}", "{\\^j}", "{\\^J}", "{\\bj}", "{\\bJ}", "{\\dj}", "{\\dJ}", "{\\vj}", "{\\'k}", "{\\'K}", "{\\ck}", "{\\cK}", "{\\bk}", "{\\bK}", "{\\dk}", "{\\dK}", "{\\vk}", "{\\vK}", "{\\'l}", "{\\'L}", "{\\cl}", "{\\cL}", "{\\bl}", "{\\bL}", "{\\dl}", "{\\dL}", "{\\vl}", "{\\vL}", "{\\'m}", "{\\'M}", "{\\bm}", "{\\bM}", "{\\.m}", "{\\.M}", "{\\dm}", "{\\dM}", "{\\`n}", "{\\`N}", "{\\'n}", "{\\'N}", "{\\~n}", "{\\~N}", "{\\cn}", "{\\cN}", "{\\bn}", "{\\bN}", "{\\.n}", "{\\.N}", "{\\dn}", "{\\dN}", "{\\vn}", "{\\vN}", "{\\`o}", "{\\`O}", "{\\'o}", "{\\'O}", "{\\^o}", "{\\^O}", "{\\\"o}", "{\\\"O}", "{\\Ho}", "{\\HO}", "{\\~o}", "{\\~O}", "{\\ko}", "{\\kO}", "{\\=o}", "{\\=O}", "{\\bo}", "{\\bO}", "{\\.o}", "{\\.O}", "{\\do}", "{\\dO}", "{\\uo}", "{\\uO}", "{\\vo}", "{\\vO}", "{\\'p}", "{\\'P}", "{\\bp}", "{\\bP}", "{\\.p}", "{\\.P}", "{\\dp}", "{\\dP}", "{\\bq}", "{\\bQ}", "{\\dq}", "{\\dQ}", "{\\'r}", "{\\'R}", "{\\cr}", "{\\cR}", "{\\br}", "{\\bR}", "{\\.r}", "{\\.R}", "{\\dr}", "{\\dR}", "{\\vr}", "{\\vR}", "{\\'s}", "{\\'S}", "{\\^s}", "{\\^S}", "{\\cs}", "{\\cS}", "{\\bs}", "{\\bS}", "{\\.s}", "{\\.S}", "{\\ds}", "{\\dS}", "{\\vs}", "{\\vS}", "{\\\"t}", "{\\ct}", "{\\cT}", "{\\bt}", "{\\bT}", "{\\.t}", "{\\.T}", "{\\dt}", "{\\dT}", "{\\vt}", "{\\vT}", "{\\`u}", "{\\`U}", "{\\'u}", "{\\'U}", "{\\^u}", "{\\^U}", "{\\\"u}", "{\\\"U}", "{\\Hu}", "{\\HU}", "{\\~u}", "{\\~U}", "{\\ku}", "{\\kU}", "{\\=u}", "{\\=U}", "{\\bu}", "{\\bU}", "{\\du}", "{\\dU}", "{\\ru}", "{\\rU}", "{\\uu}", "{\\uU}", "{\\vu}", "{\\vU}", "{\\~v}", "{\\~V}", "{\\bv}", "{\\bV}", "{\\dv}", "{\\dV}", "{\\`w}", "{\\`W}", "{\\'w}", "{\\'W}", "{\\^w}", "{\\^W}", "{\\\"w}", "{\\\"W}", "{\\bw}", "{\\bW}", "{\\.w}", "{\\.W}", "{\\dw}", "{\\dW}", "{\\rw}", "{\\\"x}", "{\\\"X}", "{\\bx}", "{\\bX}", "{\\.x}", "{\\.X}", "{\\dx}", "{\\dX}", "{\\`y}", "{\\`Y}", "{\\'y}", "{\\'Y}", "{\\^y}", "{\\^Y}", "{\\\"y}", "{\\\"Y}", "{\\~y}", "{\\~Y}", "{\\=y}", "{\\=Y}", "{\\by}", "{\\bY}", "{\\.y}", "{\\.Y}", "{\\dy}", "{\\dY}", "{\\ry}", "{\\'z}", "{\\'Z}", "{\\^z}", "{\\^Z}", "{\\bz}", "{\\bZ}", "{\\.z}", "{\\.Z}", "{\\dz}", "{\\dZ}", "{\\vz}", "{\\vZ}", "{\\l}", "{\\L}", "{\\o}", "{\\O}", "{\\ae}", "{\\AE}", "{\\oe}", "{\\OE}", "{\\i}", "{\\&}"
    ], 
    tex: [
      "\\`{a}", "\\`{A}", "\\'{a}", "\\'{A}", "\\^{a}", "\\^{A}", "\\\"{a}", "\\\"{A}", "\\~{a}", "\\~{A}", "\\k{a}", "\\k{A}", "\\={a}", "\\={A}", "\\b{a}", "\\b{A}", "\\.{a}", "\\.{A}", "\\d{a}", "\\d{A}", "\\r{a}", "\\r{A}", "\\u{a}", "\\u{A}", "\\v{a}", "\\v{A}", "\\b{b}", "\\b{B}", "\\.{b}", "\\.{B}", "\\d{b}", "\\d{B}", "\\'{c}", "\\'{C}", "\\^{c}", "\\^{C}", "\\c{c}", "\\c{C}", "\\b{c}", "\\b{C}", "\\.{c}", "\\.{C}", "\\d{c}", "\\d{C}", "\\v{c}", "\\v{C}", "\\c{d}", "\\c{D}", "\\b{d}", "\\b{D}", "\\.{d}", "\\.{D}", "\\d{d}", "\\d{D}", "\\v{d}", "\\v{D}", "\\`{e}", "\\`{E}", "\\'{e}", "\\'{E}", "\\^{e}", "\\^{E}", "\\\"{e}", "\\\"{E}", "\\~{e}", "\\~{E}", "\\c{e}", "\\c{E}", "\\k{e}", "\\k{E}", "\\={e}", "\\={E}", "\\b{e}", "\\b{E}", "\\.{e}", "\\.{E}", "\\d{e}", "\\d{E}", "\\u{e}", "\\u{E}", "\\v{e}", "\\v{E}", "\\b{f}", "\\b{F}", "\\.{f}", "\\.{F}", "\\d{f}", "\\d{F}", "\\'{g}", "\\'{G}", "\\^{g}", "\\^{G}", "\\c{g}", "\\c{G}", "\\={g}", "\\={G}", "\\b{g}", "\\b{G}", "\\.{g}", "\\.{G}", "\\d{g}", "\\d{G}", "\\u{g}", "\\u{G}", "\\v{g}", "\\v{G}", "\\^{h}", "\\^{H}", "\\\"{h}", "\\\"{H}", "\\c{h}", "\\c{H}", "\\b{h}", "\\b{H}", "\\.{h}", "\\.{H}", "\\d{h}", "\\d{H}", "\\v{h}", "\\v{H}", "\\`{i}", "\\`{I}", "\\'{i}", "\\'{I}", "\\^{i}", "\\^{I}", "\\\"{i}", "\\\"{I}", "\\~{i}", "\\~{I}", "\\k{i}", "\\k{I}", "\\={i}", "\\={I}", "\\b{i}", "\\b{I}", "\\.{I}", "\\d{i}", "\\d{I}", "\\u{i}", "\\u{I}", "\\v{i}", "\\v{I}", "\\^{j}", "\\^{J}", "\\b{j}", "\\b{J}", "\\d{j}", "\\d{J}", "\\v{j}", "\\'{k}", "\\'{K}", "\\c{k}", "\\c{K}", "\\b{k}", "\\b{K}", "\\d{k}", "\\d{K}", "\\v{k}", "\\v{K}", "\\'{l}", "\\'{L}", "\\c{l}", "\\c{L}", "\\b{l}", "\\b{L}", "\\d{l}", "\\d{L}", "\\v{l}", "\\v{L}", "\\'{m}", "\\'{M}", "\\b{m}", "\\b{M}", "\\.{m}", "\\.{M}", "\\d{m}", "\\d{M}", "\\`{n}", "\\`{N}", "\\'{n}", "\\'{N}", "\\~{n}", "\\~{N}", "\\c{n}", "\\c{N}", "\\b{n}", "\\b{N}", "\\.{n}", "\\.{N}", "\\d{n}", "\\d{N}", "\\v{n}", "\\v{N}", "\\`{o}", "\\`{O}", "\\'{o}", "\\'{O}", "\\^{o}", "\\^{O}", "\\\"{o}", "\\\"{O}", "\\H{o}", "\\H{O}", "\\~{o}", "\\~{O}", "\\k{o}", "\\k{O}", "\\={o}", "\\={O}", "\\b{o}", "\\b{O}", "\\.{o}", "\\.{O}", "\\d{o}", "\\d{O}", "\\u{o}", "\\u{O}", "\\v{o}", "\\v{O}", "\\'{p}", "\\'{P}", "\\b{p}", "\\b{P}", "\\.{p}", "\\.{P}", "\\d{p}", "\\d{P}", "\\b{q}", "\\b{Q}", "\\d{q}", "\\d{Q}", "\\'{r}", "\\'{R}", "\\c{r}", "\\c{R}", "\\b{r}", "\\b{R}", "\\.{r}", "\\.{R}", "\\d{r}", "\\d{R}", "\\v{r}", "\\v{R}", "\\'{s}", "\\'{S}", "\\^{s}", "\\^{S}", "\\c{s}", "\\c{S}", "\\b{s}", "\\b{S}", "\\.{s}", "\\.{S}", "\\d{s}", "\\d{S}", "\\v{s}", "\\v{S}", "\\\"{t}", "\\c{t}", "\\c{T}", "\\b{t}", "\\b{T}", "\\.{t}", "\\.{T}", "\\d{t}", "\\d{T}", "\\v{t}", "\\v{T}", "\\`{u}", "\\`{U}", "\\'{u}", "\\'{U}", "\\^{u}", "\\^{U}", "\\\"{u}", "\\\"{U}", "\\H{u}", "\\H{U}", "\\~{u}", "\\~{U}", "\\k{u}", "\\k{U}", "\\={u}", "\\={U}", "\\b{u}", "\\b{U}", "\\d{u}", "\\d{U}", "\\r{u}", "\\r{U}", "\\u{u}", "\\u{U}", "\\v{u}", "\\v{U}", "\\~{v}", "\\~{V}", "\\b{v}", "\\b{V}", "\\d{v}", "\\d{V}", "\\`{w}", "\\`{W}", "\\'{w}", "\\'{W}", "\\^{w}", "\\^{W}", "\\\"{w}", "\\\"{W}", "\\b{w}", "\\b{W}", "\\.{w}", "\\.{W}", "\\d{w}", "\\d{W}", "\\r{w}", "\\\"{x}", "\\\"{X}", "\\b{x}", "\\b{X}", "\\.{x}", "\\.{X}", "\\d{x}", "\\d{X}", "\\`{y}", "\\`{Y}", "\\'{y}", "\\'{Y}", "\\^{y}", "\\^{Y}", "\\\"{y}", "\\\"{Y}", "\\~{y}", "\\~{Y}", "\\={y}", "\\={Y}", "\\b{y}", "\\b{Y}", "\\.{y}", "\\.{Y}", "\\d{y}", "\\d{Y}", "\\r{y}", "\\'{z}", "\\'{Z}", "\\^{z}", "\\^{Z}", "\\b{z}", "\\b{Z}", "\\.{z}", "\\.{Z}", "\\d{z}", "\\d{Z}", "\\v{z}", "\\v{Z}", "\\l", "\\L", "\\o", "\\O", "{\\ae}", "{\\AE}", "{\\oe}", "{\\OE}", "{\\i}", "\\&"
    ],
    txt: [
      "à", "À", "á", "Á", "â", "Â", "ä", "Ä", "ã", "Ã", "ą", "Ą", "ā", "Ā", "a̱", "A̱", "ȧ", "Ȧ", "ạ", "Ạ", "å", "Å", "ă", "Ă", "ǎ", "Ǎ", "ḇ", "Ḇ", "ḃ", "Ḃ", "ḅ", "Ḅ", "ć", "Ć", "ĉ", "Ĉ", "ç", "Ç", "c̱", "C̱", "ċ", "Ċ", "c̣", "C̣", "č", "Č", "ḑ", "Ḑ", "ḏ", "Ḏ", "ḋ", "Ḋ", "ḍ", "Ḍ", "ď", "Ď", "è", "È", "é", "É", "ê", "Ê", "ë", "Ë", "ẽ", "Ẽ", "ȩ", "Ȩ", "ę", "Ę", "ē", "Ē", "e̱", "E̱", "ė", "Ė", "ẹ", "Ẹ", "ĕ", "Ĕ", "ě", "Ě", "f̱", "F̱", "ḟ", "Ḟ", "f̣", "F̣", "ǵ", "Ǵ", "ĝ", "Ĝ", "ģ", "Ģ", "ḡ", "Ḡ", "g̱", "G̱", "ġ", "Ġ", "g̣", "G̣", "ğ", "Ğ", "ǧ", "Ǧ", "ĥ", "Ĥ", "ḧ", "Ḧ", "ḩ", "Ḩ", "ẖ", "H̱", "ḣ", "Ḣ", "ḥ", "Ḥ", "ȟ", "Ȟ", "ì", "Ì", "í", "Í", "î", "Î", "ï", "Ï", "ĩ", "Ĩ", "į", "Į", "ī", "Ī", "i̱", "I̱", "İ", "ị", "Ị", "ĭ", "Ĭ", "ǐ", "Ǐ", "ĵ", "Ĵ", "j̱", "J̱", "j̣", "J̣", "ǰ", "ḱ", "Ḱ", "ķ", "Ķ", "ḵ", "Ḵ", "ḳ", "Ḳ", "ǩ", "Ǩ", "ĺ", "Ĺ", "ļ", "Ļ", "ḻ", "Ḻ", "ḷ", "Ḷ", "ľ", "Ľ", "ḿ", "Ḿ", "m̱", "M̱", "ṁ", "Ṁ", "ṃ", "Ṃ", "ǹ", "Ǹ", "ń", "Ń", "ñ", "Ñ", "ņ", "Ņ", "ṉ", "Ṉ", "ṅ", "Ṅ", "ṇ", "Ṇ", "ň", "Ň", "ò", "Ò", "ó", "Ó", "ô", "Ô", "ö", "Ö", "ő", "Ő", "õ", "Õ", "ǫ", "Ǫ", "ō", "Ō", "o̱", "O̱", "ȯ", "Ȯ", "ọ", "Ọ", "ŏ", "Ŏ", "ǒ", "Ǒ", "ṕ", "Ṕ", "p̱", "P̱", "ṗ", "Ṗ", "p̣", "P̣", "q̱", "Q̱", "q̣", "Q̣", "ŕ", "Ŕ", "ŗ", "Ŗ", "ṟ", "Ṟ", "ṙ", "Ṙ", "ṛ", "Ṛ", "ř", "Ř", "ś", "Ś", "ŝ", "Ŝ", "ş", "Ş", "s̱", "S̱", "ṡ", "Ṡ", "ṣ", "Ṣ", "š", "Š", "ẗ", "ţ", "Ţ", "ṯ", "Ṯ", "ṫ", "Ṫ", "ṭ", "Ṭ", "ť", "Ť", "ù", "Ù", "ú", "Ú", "û", "Û", "ü", "Ü", "ű", "Ű", "ũ", "Ũ", "ų", "Ų", "ū", "Ū", "u̱", "U̱", "ụ", "Ụ", "ů", "Ů", "ŭ", "Ŭ", "ǔ", "Ǔ", "ṽ", "Ṽ", "v̱", "V̱", "ṿ", "Ṿ", "ẁ", "Ẁ", "ẃ", "Ẃ", "ŵ", "Ŵ", "ẅ", "Ẅ", "w̱", "W̱", "ẇ", "Ẇ", "ẉ", "Ẉ", "ẘ", "ẍ", "Ẍ", "x̱", "X̱", "ẋ", "Ẋ", "x̣", "X̣", "ỳ", "Ỳ", "ý", "Ý", "ŷ", "Ŷ", "ÿ", "Ÿ", "ỹ", "Ỹ", "ȳ", "Ȳ", "y̱", "Y̱", "ẏ", "Ẏ", "ỵ", "Ỵ", "ẙ", "ź", "Ź", "ẑ", "Ẑ", "ẕ", "Ẕ", "ż", "Ż", "ẓ", "Ẓ", "ž", "Ž", "ł", "Ł", "ø", "Ø", "æ", "Æ", "œ", "Œ", "ı", "&"
    ], 
    ascii: [
      "a", "A", "a", "A", "a", "A", "a", "A", "a", "A", "a", "A", "a", "A", "a", "A", "a", "A", "a", "A", "a", "A", "a", "A", "a", "A", "b", "B", "b", "B", "b", "B", "c", "C", "c", "C", "c", "C", "c", "C", "c", "C", "c", "C", "c", "C", "d", "D", "d", "D", "d", "D", "d", "D", "d", "D", "e", "E", "e", "E", "e", "E", "e", "E", "e", "E", "e", "E", "e", "E", "e", "E", "e", "E", "e", "E", "e", "E", "e", "E", "e", "E", "f", "F", "f", "F", "f", "F", "g", "G", "g", "G", "g", "G", "g", "G", "g", "G", "g", "G", "g", "G", "g", "G", "g", "G", "h", "H", "h", "H", "h", "H", "h", "H", "h", "H", "h", "H", "h", "H", "i", "I", "i", "I", "i", "I", "i", "I", "i", "I", "i", "I", "i", "I", "i", "I", "I", "i", "I", "i", "I", "i", "I", "j", "J", "j", "J", "j", "J", "j", "k", "K", "k", "K", "k", "K", "k", "K", "k", "K", "l", "L", "l", "L", "l", "L", "l", "L", "l", "L", "m", "M", "m", "M", "m", "M", "m", "M", "n", "N", "n", "N", "n", "N", "n", "N", "n", "N", "n", "N", "n", "N", "n", "N", "o", "O", "o", "O", "o", "O", "o", "O", "o", "O", "o", "O", "o", "O", "o", "O", "o", "O", "o", "O", "o", "O", "o", "O", "o", "O", "p", "P", "p", "P", "p", "P", "p", "P", "q", "Q", "q", "Q", "r", "R", "r", "R", "r", "R", "r", "R", "r", "R", "r", "R", "s", "S", "s", "S", "s", "S", "s", "S", "s", "S", "s", "S", "s", "S", "t", "t", "T", "t", "T", "t", "T", "t", "T", "t", "T", "u", "U", "u", "U", "u", "U", "u", "U", "u", "U", "u", "U", "u", "U", "u", "U", "u", "U", "u", "U", "u", "U", "u", "U", "u", "U", "v", "V", "v", "V", "v", "V", "w", "W", "w", "W", "w", "W", "w", "W", "w", "W", "w", "W", "w", "W", "w", "x", "X", "x", "X", "x", "X", "x", "X", "y", "Y", "y", "Y", "y", "Y", "y", "Y", "y", "Y", "y", "Y", "y", "Y", "y", "Y", "y", "Y", "y", "z", "Z", "z", "Z", "z", "Z", "z", "Z", "z", "Z", "z", "Z", "l", "L", "o", "O", "ae", "AE", "oe", "OE", "i", "&"
    ]
  };
  
  // Replace characters
  const charReplacements = {
    "‘": "'", "’": "'", "“": '"', "”": '"', "—": " -- ", 
    ".'": "'.", ",'": "',", '."': '".', ',"': '",'
  };
  
  // Fields ordered
  const fieldsOrdered = [
    'title', 'author', 'journal', 'booktitle', 'editor', 'type', 'edition', 
    'series', 'volume', 'number', 'chapter', 'pages', 'year', 'month', 'publisher', 
    'address', 'institution', 'organization', 'school', 'crossref', 'annote', 
    'note', 'url', 'doi', 'howpublished', 'issn', 'isbn', 'keywords', 'abstract'
  ];
  
  // Common words in bibliography title
  const commonWords = [
    'a', 'an', 'are', 'as', 'de', 'do', 'in', 'it', 'is', 
    'how', 'o', 'on', 'os', 'the', 'to', 'was', 'what', 'when', 'who', 'why'
  ];
  
  // Regular expression patterns for removal
  const pattern = {
    author: /[-'\s+]/g, 
    title: new RegExp(`\\b(${commonWords.join('|')})\\b`, 'g'), 
    clean: /['",\(\)-]/g,
    entryType: /@\b([a-z]+)\b\{([a-z0-9]+),$/g,
    fieldLine: /(\w+)\s*=\s*[{"](.+)[}"],?$/g
  };
  
  // State management
  let state = {
    originalFileName: '',
    modifiedContent: ''
  };
  
  // Cache objects
  const domCache = {
    textInput: null,
    textDisplay: null,
    outputContent: null,
    copyButton: null,
    downloadButton: null,
    contentPreviewHeading: null,
    texReplacementCheckbox: null,
    imputeBibIdCheckbox: null,
    sortEntriesCheckbox: null,
    operationModeRadios: null
  };
  
  // Initialization
  document.addEventListener('DOMContentLoaded', function() {
    // Cache DOM elements
    domCache.textInput = document.getElementById('textInput');
    domCache.textDisplay = document.getElementById('textDisplay');
    domCache.outputContent = document.getElementById('outputContent');
    domCache.copyButton = document.getElementById('copyButton');
    domCache.downloadButton = document.getElementById('downloadButton');
    domCache.contentPreviewHeading = document.getElementById('contentPreviewHeading');
    domCache.texReplacementCheckbox = document.getElementById('applyTexReplacement');
    domCache.imputeBibIdCheckbox = document.getElementById('imputeBibId');
    domCache.sortEntriesCheckbox = document.getElementById('sortEntries');
    domCache.operationModeRadios = document.querySelectorAll('input[name="operationMode"]');
    // Set event listener
    setupEventListeners();
    // Set initial state
    toggleCheckboxAvailability();
  });
  
  // Event listner
  function setupEventListeners() {
    // Submit button
    document.getElementById('submitButton').addEventListener('click', processPastedText);
    // Copy button
    domCache.copyButton.addEventListener('click', copyToClipboard);
    // Download button
    domCache.downloadButton.addEventListener('click', downloadFile);
    // Operation mode radio buttons
    domCache.operationModeRadios.forEach(radio => {
      radio.addEventListener('change', toggleCheckboxAvailability);
    });
  }
  
  // Show error
  function showError(message) {
    alert(message);
    domCache.outputContent.textContent = `Error: ${message}`;
    document.outputContent.style.color = 'red';
  }
  
  // Clean up characters
  function cleanupCharacters(text) {
    let result = text;
    for (let [p, v] of Object.entries(charReplacements)) {
      result = result.replaceAll(p, v);
    }
    return result;
  }
  
  // Apply TeX replacement
  function applyTexReplacement(text) {
    let result = text;
    for (let i = 0; i < charsMap['std'].length; i++) {
      result = result.replaceAll(charsMap['std'][i], charsMap['tex'][i]);
    }
    return result;
  }
  
  // Convert characters to specified option
  function convertChars(text, from, to) {
    let result = text;
    charsMap[from].forEach((char, i) => { 
      result = result.replaceAll(char, charsMap[to][i]);
    });
    return result;
  }
  
  // Extract entry type from BibTeX item
  function getEntryType(bibitem) {
    const regex = new RegExp(pattern['entryType'], 'g');
    const match = regex.exec(bibitem.split('\n')[0]);
    return match ? match[1] : null;
  }
  
  // Extract entry ID from BibTeX item
  function getId(bibitem) {
    const regex = new RegExp(pattern['entryType'], 'g');
    const match = regex.exec(bibitem.split('\n')[0]);
    return match ? match[2] : null;
  }
  
  // Extract fields from BibTeX item
  function getFields(bibitem) {
    try {
      const bibfields = bibitem.split('\n').slice(1, -1)
        .map(row => row.trim())
        .filter(row => row.length > 0)
        .map(row => {
          const regex = new RegExp(pattern['fieldLine'], 'g');
          const match = regex.exec(row);
          if (!match) {
            console.warn(`Could not parse field line: ${row}`);
            return null;
          }
          return match;
        })
        .filter(match => match !== null)
        .map(arr => [arr[1], arr[2]])
        .map(([fieldName, fieldValue]) => {
          if (!['author', 'editor'].includes(fieldName)) {
            return [fieldName, fieldValue];
          }
          const formatted = fieldValue
            .replace(/\b([A-Z]{2})\b/g, m => m.split('').join(' '))
            .replace(/\b([A-Z]{1})\b(?![.{])/g, m => `${m}.`)
            .replace(/\s+/g, ' ').trim();
          return [fieldName, formatted];
        })
        .reduce((obj, [key, value]) => {obj[key] = value; return obj;}, {});
      
      const fields = fieldsOrdered.map(field => [field, bibfields[field] || ''])
        .reduce((obj, [key, value]) => {obj[key] = value; return obj;}, {});
      
      return fields;
    } catch (error) {
      console.error('Error ');
      return {};
    }
  }
  
  // Create HTML title for reference
  function getHTML(bibfields, bibId, entryType) {
    let html = '';
    
    if (!(bibfields['title'] && bibfields['author'] && bibfields['year'])) {
      return html;
    }
    
    let link = '';
    if (bibfields['url'] || bibfields['doi']) {
      link = (bibfields['url'] || ('https://dx.doi.org/' + bibfields['doi']));
      link = `<a class="ref-link" href="${link}">link</a>`;
    }
    
    let title = `<span class="title">${bibfields['title']}</span>.`;
    
    let author = bibfields['author'].split(/\s+and\s+/)
      .reduce((acc, cur, i, arr) => 
        i === arr.length - 1 ? acc + '; and ' + cur : acc + '; ' + cur
      );
    
    let journal = (bibfields['journal'] || '');
    
    let booktitle = bibfields['booktitle'] ? `In: ${bibfields['booktitle']}.` : '';
    
    let editor = (bibfields['editor'] || '');
    if (bibfields['editor']) {
      editor = bibfields['author'].split(/\s+and\s+/)
      .map(name => [name.split(/,\s+/)[1], name.split(/,\s+/)[0]].join(' '))
      .reduce((acc, cur, i, arr) => 
        i === arr.length - 1 ? acc + '; and ' + cur : acc + '; ' + cur
      )
      editor = `Ed(s): ${editor}.`;
    }
    
    let edition = (bibfields['edition'] || '');
    if (bibfields['edition']) {
      let ordinal;
      let digit = ![11, 12, 13].includes(edition) ? (edition % 10) : 0;
      switch (digit) {
        case 1: 
          ordinal = 'st';
          break;
        case 2:
          ordinal = 'nd';
          break;
        case 3:
          ordinal = 'rd';
          break;
        default:
          ordinal = 'th';
      }
      edition = `${edition}${ordinal} Edition.`
    }
    
    let volume = (bibfields['volume'] || '');
    
    let number = bibfields['number'] ? `(${bibfields['number']})` : '';
    
    let chapter = bibfields['chapter'] ? `Ch. ${bibfields['chapter']}` : '';
    let pages = bibfields['pages'] ? `pp. ${bibfields['pages']}` : '';
    if (chapter || pages) chapter = ([chapter, pages].join(', ') + '.');
    
    let year = `(${bibfields['year']}).`;
    
    let publisher = bibfields['publisher'] ? `${bibfields['publisher']}.` : '';
    if (['mastersthesis', 'phdthesis', 'techreport'].includes(entryType)) {
      if (entryType === 'techreport') {
        publisher = bibfields['institution'] ? `${bibfields['institution']}.` : '';
      } else {
        publisher = bibfields['school'] ? `${bibfields['school']}.` : '';
      }
    }
    
    let appendix = '';
    switch (entryType) {
      // article, book, inbook, booklet, incollection, conference, inproceedings, 
      // proceedings, manual, mastersthesis, phdthesis, techreport, unpublished, misc
      case 'article':
        // journal, volume, number, pages
        if (!journal) break;
        if (volume) journal = `${journal} ${volume}`.trim();
        if (number) journal = `${journal} ${number}`.trim();
        if (pages) journal = `${journal}: ${pages.replace('pp. ', '')}`.trim();
        appendix = `${journal}.`.trim();
        break;
      case 'book':
        // edition, chapter, pages, publisher
        appendix = [edition, chapter, publisher].join(' ').trim();
        break;
      case 'inbook':
        // Do (nothing to do) the same as 'incollection'
      case 'incollection':
        // booktitle, edition, editor, chapter, pages, publisher
        appendix = [booktitle, edition, editor, chapter, publisher].join(' ').trim();
        break;
      case 'conference':
        // Do (nothing to do) the same as 'inproceedings'
      case 'inproceedings':
        // booktitle, editor, publisher
        appendix = [booktitle, editor, publisher].join(' ').trim();
        break;
      case 'mastersthesis':
        // Do (nothing to do) the same as 'techreport'
      case 'phdthesis':
        // Do (nothing to do) the same as 'techreport'
      case 'techreport':
        appendix = publisher;
        break;
      default: // booklet, proceedings, manual, unpublished, misc
        return '';
    }
    
    html = convertChars(`${author} ${year} ${title} ${appendix}`, 'std', 'txt')
      .replaceAll(/\s+/g, ' ')
      .replaceAll(/\.+/g, '.')
      .replaceAll('?.', '?');
    html = `${html} ${link}`.trim();
    html = `<span id="${bibId}" class="unread" data-field="${entryType}">${html}</span>`;
    
    return html;
  }
  
  // Create LaTeX title for references
  function getLaTeX(bibfields, entryType) {
    let latex = '';
    
    if (!(bibfields['title'] && bibfields['author'] && bibfields['year'])) {
      return latex;
    }
    
    let link = '';
    if (bibfields['url'] || bibfields['doi']) {
      link = (bibfields['url'] || ('https://dx.doi.org/' + bibfields['doi']));
      link = `\\url{${link}}`; // Requires hyperref package
    }
    
    let title = `${bibfields['title']}.`;
    
    let author = bibfields['author'].split(/\s+and\s+/)
      .reduce((acc, cur, i, arr) => 
        i === arr.length - 1 ? acc + '; and ' + cur : acc + '; ' + cur
      );
    
    let journal = (bibfields['journal'] || '');
    
    let booktitle = bibfields['booktitle'] ? `In: ${bibfields['booktitle']}.` : '';
    
    let editor = (bibfields['editor'] || '');
    if (bibfields['editor']) {
      editor = bibfields['author'].split(/\s+and\s+/)
      .map(name => [name.split(/,\s+/)[1], name.split(/,\s+/)[0]].join(' '))
      .reduce((acc, cur, i, arr) => 
        i === arr.length - 1 ? acc + '; and ' + cur : acc + '; ' + cur
      )
      editor = `Ed(s): ${editor}.`;
    }
    
    let edition = (bibfields['edition'] || '');
    if (bibfields['edition']) {
      let ordinal;
      let digit = ![11, 12, 13].includes(edition) ? (edition % 10) : 0;
      switch (digit) {
        case 1: 
          ordinal = 'st';
          break;
        case 2:
          ordinal = 'nd';
          break;
        case 3:
          ordinal = 'rd';
          break;
        default:
          ordinal = 'th';
      }
      edition = `${edition}${ordinal} Edition.`
    }
    
    let volume = (bibfields['volume'] || '');
    
    let number = bibfields['number'] ? `(${bibfields['number']})` : '';
    
    let chapter = bibfields['chapter'] ? `Ch. ${bibfields['chapter']}` : '';
    let pages = bibfields['pages'] ? `pp. ${bibfields['pages']}` : '';
    if (chapter || pages) chapter = ([chapter, pages].join(', ') + '.');
    
    let year = `(${bibfields['year']}).`;
    
    let publisher = bibfields['publisher'] ? `${bibfields['publisher']}.` : '';
    if (['mastersthesis', 'phdthesis', 'techreport'].includes(entryType)) {
      if (entryType === 'techreport') {
        publisher = bibfields['institution'] ? `${bibfields['institution']}.` : '';
      } else {
        publisher = bibfields['school'] ? `${bibfields['school']}.` : '';
      }
    }
    
    let appendix = '';
    switch (entryType) {
      // article, book, inbook, booklet, incollection, conference, inproceedings, 
      // proceedings, manual, mastersthesis, phdthesis, techreport, unpublished, misc
      case 'article':
        // journal, volume, number, pages
        if (!journal) break;
        if (volume) journal = `${journal} ${volume}`.trim();
        if (number) journal = `${journal} ${number}`.trim();
        if (pages) journal = `${journal}: ${pages.replace('pp. ', '')}`.trim();
        appendix = `${journal}.`.trim();
        break;
      case 'book':
        // edition, chapter, pages, publisher
        appendix = [edition, chapter, publisher].join(' ').trim();
        break;
      case 'inbook':
        // Do (nothing to do) the same as 'incollection'
      case 'incollection':
        // booktitle, edition, editor, chapter, pages, publisher
        appendix = [booktitle, edition, editor, chapter, publisher].join(' ').trim();
        break;
      case 'conference':
        // Do (nothing to do) the same as 'inproceedings'
      case 'inproceedings':
        // booktitle, editor, publisher
        appendix = [booktitle, editor, publisher].join(' ').trim();
        break;
      case 'mastersthesis':
        // Do (nothing to do) the same as 'techreport'
      case 'phdthesis':
        // Do (nothing to do) the same as 'techreport'
      case 'techreport':
        appendix = publisher;
        break;
      default: // booklet, proceedings, manual, unpublished, misc
        return '';
    }
    
    latex = `${author} ${year} ${title} ${appendix}`;
    if (domCache.texReplacementCheckbox.checked) {
      latex = applyTexReplacement(latex);
    }
    latex = latex.replaceAll(/\s+/g, ' ')
      .replaceAll(/\.+/g, '.')
      .replaceAll('?.', '?')
    
    return `${latex} ${link}`.trim();
  }
  
  // Create file title for reference
  function getTitle(bibfields) {
    if (!bibfields || typeof bibfields !== 'object') {
      return '';
    }
    
    const {title, author, year} = bibfields;
    
    if (!title || !author || !year) {
      return '';
    }
    
    try {
      const authorNames = author.trim()
        .split(/\s+and\s+/)
        .map(fullname => fullname.split(',')[0].trim())
        .reduce((acc, cur, i, arr) => 
          i === arr.length - 1 ? acc + ' and ' + cur : acc + ', ' + cur
        );
      const filename = `${title} (${authorNames}, ${year})`;
      return convertChars(filename, 'std', 'txt');
    } catch (error) {
      console.error('Error generating title:', error);
      return '';
    }
  }
  
  // Get links to reference
  function getLinks(bibfields) {
    let links = '';
    if (bibfields['url'] || bibfields['doi']) {
      links = Object.entries(bibfields)
        .filter(([field, value]) => ['url', 'doi'].includes(field))
        .map(([field, value]) => value)
        .join('\n');
    }
    return links;
  }
  
  // Generate BibTeX ID
  function generateId(bibfields) {
    const author = convertChars(bibfields['author'].toLowerCase(), 'std', 'ascii')
      .replace(pattern['author'], ', ')
      .split(',')[0].trim();
    const title = convertChars(bibfields['title'].toLowerCase(), 'std', 'ascii')
      .replace(pattern['clean'], ' ').trim()
      .replace(pattern['title'], '').trim()
      .split(' ')[0].trim();
    const year = bibfields['year'];
    return `${author}${year}${title}`;
  }
  
  // Collect links
  function collectLinks(bibs) {
    const allLinks = [];
    for (let bibId of bibs.bibIds()) {
      if (!bibs[bibId].links) continue;
      let links = bibs[bibId].links.split('\n').filter(link => link.trim());
      if (links.length == 2) {
        const doi = links[1];
        links = [links[0], `https://doi.org/${doi}`, `https://sci-hub.se/${doi}`];
      }
      allLinks.push(...links);
    }
    return allLinks;
  }
  
  // Process BibTeX entries
  function processBibTeXEntries(bibs) {
    let content = '';
    for (let bibId of bibs.bibIds()) {
      content = [content, bibs[bibId].toString()].join('\n\n').trim();
    }
    content = cleanupCharacters(content);
    if (domCache.texReplacementCheckbox.checked) {
      content = applyTexReplacement(content);
    }
    return content;
  }
  
  // Generate file names
  function generateFilenames(bibs) {
    let filenames = '';
    for (let bibId of bibs.bibIds()) {
      const filename = bibs[bibId].filename;
      if (filename) {
        filenames = [filenames, filename].join('\n\n').trim();
      }
    }
    if (!filenames) {
      return 'No file name could be generated. Check if entries have title, author, and year fields.';
    }
    return filenames;
  }
  
  // Generate HTMLs
  function generateHTML(bibs) {
    let htmls = '';
    for (let bibId of bibs.bibIds()) {
      const html = bibs[bibId].filehtml;
      if (html) {
        htmls = [htmls, `<p>\n  ${html}\n</p>`].join('\n\n').trim();
      }
    }
    if (!htmls) {
      return 'No file HTML could be generated. Check if entries have the appropriate fields.';
    }
    return htmls;
  }
  
  // Generate LaTeXs
  function generateLaTeX(bibs) {
    let filelatexs = '';
    for (let bibId of bibs.bibIds()) {
      const filelatex = bibs[bibId].filelatex;
      if (filelatex) {
        filelatexs = [filelatexs, filelatex].join('\n\n').trim();
      }
    }
    if (!filelatexs) {
      return 'No LaTeX-style reference could be generated. Check if entries have title, author, and year fields.';
    }
    return filelatexs;
  }
  
  // Open links
  function openLinks(bibs) {
    const bibLinks = collectLinks(bibs);
    if (bibLinks.length === 0) {
      return 'No links available.';
    }
    const linksToOpen = bibLinks.filter(url => !url.includes('sci'));
    if (linksToOpen.length > 0) {
      const confirmOpen = confirm(
        `About to open ${linksToOpen.length} link(s) in new tabs. Continue?`
      );
      if (confirmOpen) {
        linksToOpen.forEach(url => window.open(url, '_blank'));
      }
    }
    return bibLinks.join('\n\n');
  }
  
  // Display results
  function displayResults(content) {
    state.modifiedContent = content;
    
    domCache.outputContent.textContent = content;
    domCache.downloadButton.style.display = 'inline-block';
    domCache.copyButton.style.display = 'inline-block';
    domCache.contentPreviewHeading.style.display = 'block';
    
    domCache.contentPreviewHeading.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  }
  
  // BibTeX parser class
  class BibtexParser {
    constructor(bibtexString, imputeBibId, sortEntries) {
      this.entries = {};
      this.parse(bibtexString, imputeBibId, sortEntries);
    }
    
    parse(bibtexString, imputeBibId, sortEntries) {
      // Split string into individual entries
      const rawEntries = bibtexString.split(/^@/m)
        .filter(elem => elem.trim() !== '')
        .map(elem => '@' + elem.trim());
      
      for (const entry of rawEntries) {
        if (!entry.match(/^@(\w+)\s*{\s*([^,]+),/)) continue;
        
        // Extract entry type and ID
        const type = getEntryType(entry);
        const id = getId(entry);
        if (!type || !id) continue;
        
        // Extract field name-value pairs and BibTeX ID
        const fields = Object.entries(getFields(entry))
          .filter(r => r[0].match(/\b(publisher|url|doi|abstract)\b/) || r[1])
          .reduce((obj, r) => {obj[r[0]] = r[1]; return obj;}, {}); // Object with fields (name-value pairs)
        const bibId = imputeBibId ? generateId(fields) : id;
        
        // Extract specific information
        const filehtml = getHTML(fields, bibId, type);
        const filelatex = getLaTeX(fields, type);
        const filename = getTitle(fields);
        const links = getLinks(fields);
        
        // Store in main object
        this.entries[id] = {type, fields, filehtml, filelatex, filename, links};
        
        // Add toString method
        this.entries[id].toString = function() { 
          const bibtex = Object.entries(this.fields)
            .reduce((acc, [k, v], i, arr) => {
              const last = i === arr.length - 1;
              const line = `  ${k} = {${v}}${last ? '\n}' : ',\n'}`;
              return acc + line;
            }, `@${this.type}{${bibId},\n`);
          return bibtex;
        };
      }
      
      // Iterator for BibTeX IDs
      this.entries.bibIds = function* () {
        let ids = Object.keys(this).filter(k => typeof this[k] !== 'function');
        if (sortEntries) ids = ids.sort();
        for (const bibId of ids) {
          yield bibId;
        }
      };
    }
    
    getEntry(id) {
      return this.entries[id] || null;
    }
    
    getAllEntries() {
      return this.entries;
    }
  }
  
  // Checkbox availability
  function toggleCheckboxAvailability() {
    const operation = document.querySelector('input[name="operationMode"]:checked')?.value;
    try {
      switch (operation) {
        case 'process':
          domCache.texReplacementCheckbox.disabled = false;
          // domCache.texReplacementCheckbox.checked = true;
          domCache.imputeBibIdCheckbox.disabled = false;
          // domCache.imputeBibIdCheckbox.checked = true;
          domCache.sortEntriesCheckbox.disabled = false;
          // domCache.sortEntriesCheckbox.checked = true;
          break;
        case 'html':
          domCache.texReplacementCheckbox.disabled = true;
          domCache.texReplacementCheckbox.checked = false;
          domCache.imputeBibIdCheckbox.disabled = false;
          // domCache.imputeBibIdCheckbox.checked = true;
          domCache.sortEntriesCheckbox.disabled = true;
          domCache.sortEntriesCheckbox.checked = false;
          break;
        case 'latex':
          domCache.texReplacementCheckbox.disabled = false;
          // domCache.texReplacementCheckbox.checked = false;
          domCache.imputeBibIdCheckbox.disabled = true;
          domCache.imputeBibIdCheckbox.checked = false;
          domCache.sortEntriesCheckbox.disabled = true;
          domCache.sortEntriesCheckbox.checked = false;
          break;
        case 'title':
          // Do (nothing to do) the same as 'open'
        case 'open':
          domCache.texReplacementCheckbox.disabled = true;
          domCache.texReplacementCheckbox.checked = false;
          domCache.imputeBibIdCheckbox.disabled = true;
          domCache.imputeBibIdCheckbox.checked = false;
          domCache.sortEntriesCheckbox.disabled = true;
          domCache.sortEntriesCheckbox.checked = false;
          break;
        default:
          showError('Unknown operation mode.');
          return;
      }
    } catch (error) {
      console.error('Processing error:', error);
      showError('An error occurred during processing.');
      return;
    }
  }
  
  // Safeguarding against empty input
  function processPastedText() {
    const content = domCache.textInput.value;
    const imputeId = domCache.imputeBibIdCheckbox.checked;
    const sortEntries = domCache.sortEntriesCheckbox.checked;
    if (!content.trim()) {
      alert('Text is empty. Please paste something.');
      return;
    }
    state.originalFileName = 'bibtex_input.txt'; // fallback file name
    processText(content, imputeId, sortEntries);
  }
  
  // Choosing between processing, making titles, or opening links
  function processText(content, imputeId, sortEntries) {
    // Inspect input
    if (!content || !content.trim()) {
      showError('Content is empty.');
      return;
    }
    
    // Parse BibTeX entries
    let bibs;
    try {
      bibs = new BibtexParser(content, imputeId, sortEntries)['entries'];
    } catch (error) {
      console.error('Parsing error:', error);
      showError('Failed to parse BibTeX content. Please check the format.');
      return;
    }
    
    // Operation mode
    const operation = document.querySelector('input[name="operationMode"]:checked')?.value;
    if (!operation) {
      showError('Please select an operation mode.');
      return;
    }
    
    // Process operation choice
    let modifiedContent = '';
    
    try {
      switch (operation) {
        case 'process': 
          modifiedContent = processBibTeXEntries(bibs);
          break;
        case 'html':
          modifiedContent = generateHTML(bibs);
          break;
        case 'latex':
          modifiedContent = generateLaTeX(bibs);
          break;
        case 'title': 
          modifiedContent = generateFilenames(bibs);
          break;
        case 'open': 
          modifiedContent = openLinks(bibs);
          break;
        default:
          showError('Unknown operation mode.');
          return;
      }
    } catch (error) {
      console.error('Processing error:', error);
      showError('An error occurred during processing.');
      return;
    }

    // Display results
    displayResults(modifiedContent);
  }
  
  // Allowing results to be copied
  function copyToClipboard() {
    if (!state.modifiedContent) {
      showError('No content has been processed yet.');
      return;
    }
    
    if (!navigator.clipboard) {
      showError('Clipboard API is not supported in your browser');
    }
    
    navigator.clipboard.writeText(state.modifiedContent)
      .then(() => {
        const originalText = domCache.copyButton.textContent;
        domCache.copyButton.textContent = 'Copied!';
        domCache.copyButton.style.backgroundColor = 'rgba(40, 167, 69, 1)';
        setTimeout(() => {
          domCache.copyButton.textContent = originalText;
          domCache.copyButton.style.backgroundColor = '';
        }, 2000);
      })
      .catch(err => {
        console.error('Clipboard copy failed:', err);
        alert('Copying to clipboard failed.');
      });
  }
  
  // Allowing results to be downloaded
  function downloadFile() {
    if (!state.modifiedContent) {
      showError('No content has been processed yet.')
      return;
    }
    
    const blob = new Blob([state.modifiedContent], {type: 'text/plain'});
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement("a");
    a.href = url;
    
    const dotIndex = state.originalFileName.lastIndexOf(".");
    let base = state.originalFileName;
    let ext = ".txt";
    
    if (dotIndex !== -1) {
      base = state.originalFileName.substring(0, dotIndex);
      ext = state.originalFileName.substring(dotIndex);
    }
    
    a.download = `${base}_processed${ext}`;
    
    document.body.appendChild(a);
    a.click();
    
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }
  
})(); // IIFE