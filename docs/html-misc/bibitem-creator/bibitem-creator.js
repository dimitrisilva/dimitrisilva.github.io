// BibTeX Item Creator JavaScript

(function() {
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
  
  // Fields that require TeX representation
  const texFields = [
    'title', 'author', 'journal', 'booktitle', 'editor', 'type', 'series', 
    'month', 'publisher', 'address', 'institution', 'organization', 'school'
  ];
  
  // Field requirements for each entry type
  const fieldRequirements = {
    article: {
      mandatory: ['title', 'author', 'journal', 'year'],
      optional: ['volume', 'number', 'pages', 'month', 'publisher', 'crossref', 'annote', 'note', 'url', 'doi', 'issn', 'keywords', 'abstract']
    },
    book: {
      mandatory: ['title', 'author', 'year', 'publisher'],
      optional: ['series', 'edition', 'volume', 'number', 'chapter', 'pages', 'month', 'address', 'crossref', 'annote', 'note', 'url', 'doi', 'isbn', 'keywords', 'abstract']
    },
    inbook: {
      mandatory: ['title', 'author', 'booktitle', 'editor', 'chapter', 'pages', 'year', 'publisher'],
      optional: ['type', 'series', 'edition', 'volume', 'number', 'month', 'address', 'crossref', 'annote', 'note', 'url', 'doi', 'isbn', 'keywords', 'abstract']
    },
    booklet: {
      mandatory: ['title'],
      optional: ['author', 'year', 'month', 'address', 'crossref', 'annote', 'note', 'url', 'doi', 'howpublished', 'keywords', 'abstract']
    },
    incollection: {
      mandatory: ['title', 'author', 'booktitle', 'editor', 'year', 'publisher'],
      optional: ['series', 'volume', 'number', 'chapter', 'pages', 'month', 'address', 'crossref', 'annote', 'note', 'url', 'doi', 'isbn', 'keywords', 'abstract']
    },
    conference: {
      mandatory: ['title', 'author', 'booktitle', 'editor', 'year'],
      optional: ['series', 'volume', 'number', 'pages', 'month', 'publisher', 'address', 'organization', 'crossref', 'annote', 'note', 'url', 'doi', 'isbn', 'keywords', 'abstract']
    },
    inproceedings: {
      mandatory: ['title', 'author', 'booktitle', 'editor', 'year'],
      optional: ['series', 'volume', 'number', 'pages', 'month', 'publisher', 'address', 'organization', 'crossref', 'annote', 'note', 'url', 'doi', 'isbn', 'keywords', 'abstract']
    },
    proceedings: {
      mandatory: ['title', 'year'],
      optional: ['editor', 'series', 'volume', 'number', 'month', 'publisher', 'address', 'crossref', 'annote', 'note', 'url', 'doi', 'isbn', 'keywords', 'abstract']
    },
    manual: {
      mandatory: ['title'],
      optional: ['author', 'edition', 'year', 'month', 'publisher', 'address', 'organization', 'crossref', 'annote', 'note', 'url', 'doi', 'isbn', 'keywords', 'abstract']
    },
    mastersthesis: {
      mandatory: ['title', 'author', 'year', 'school'],
      optional: ['type', 'month', 'address', 'crossref', 'annote', 'note', 'url', 'doi', 'keywords', 'abstract']
    },
    phdthesis: {
      mandatory: ['title', 'author', 'year', 'school'],
      optional: ['type', 'month', 'address', 'crossref', 'annote', 'note', 'url', 'doi', 'keywords', 'abstract']
    },
    techreport: {
      mandatory: ['title', 'author', 'year', 'institution'],
      optional: ['type', 'number', 'month', 'address', 'crossref', 'annote', 'note', 'url', 'doi', 'keywords', 'abstract']
    },
    unpublished: {
      mandatory: ['title', 'author'],
      optional: ['year', 'month', 'crossref', 'annote', 'note', 'url', 'doi', 'keywords', 'abstract']
    },
    misc: {
      mandatory: [],
      optional: ['title', 'author', 'year', 'month', 'crossref', 'annote', 'note', 'url', 'doi', 'howpublished', 'keywords', 'abstract']
    }
  };
  
  // Common words in bibliography title
  const commonWords = [
    'a', 'an', 'are', 'as', 'de', 'do', 'in', 'it', 'is', 
    'how', 'o', 'on', 'os', 'the', 'to', 'was', 'what', 'when', 'who', 'why'
  ];
  
  // Regular expression patterns for removal
  const pattern = {
    author: /[-'\s+]/g, 
    title: new RegExp(`\\b(${commonWords.join('|')})\\b`, 'g'), 
    clean: /['",\(\)-]/g 
  };
  
  // Cache objects
  const domCache = {
    outputSection: null,
    bibtexOutput: null,
    copyBtn: null,
    generateBtn: null,
    selectAll: null,
    deselectAll: null
  };
  
  // Initialization
  document.addEventListener('DOMContentLoaded', function() {
    // Cache DOM elements
    domCache.outputSection = document.getElementById('outputSection');
    domCache.selectAll = document.getElementById('selectAll');
    domCache.deselectAll = document.getElementById('deselectAll');
    domCache.generateBtn = document.getElementById('generateBtn');
    domCache.bibtexOutput = document.getElementById('bibtexOutput');
    domCache.copyBtn = document.getElementById('copyBtn');
    
    // Basic setup
    setupEntryTypeListeners();    // Get selected entry and handle related event
    setupButtonListeners();       // Handle BibTeX generation and BibTeX copy button clicks
    setFieldCheckboxAutoUpdate(); // Automatically change field checkbox upon field input change
    setupSelectDeselectAll()      // Select/deselect all field checkboxes
    
    // Initial state settings
    disableFields();              // Disable field boxes and inputs not associated with entry
    const defaultEntry = document.querySelector('input[name="entryType"]:checked');
    if (defaultEntry) updateFieldStyles(defaultEntry.value);
  });
  
  // Get field values
  function getAllFieldInputs() {
    const inputs = new Map();
    document.querySelectorAll('input[data-field], textarea[data-field]').forEach(input => {
      // Apply the `Map.set(key, value)` method to create key-value pairs
      inputs.set(input.dataset.field, input); // Access data-* attributes through `dataset` property
    });
    return inputs;
  }
  
  // Convert characters to specified option
  function convertChars(text, option) {
    let result = text;
    // Convert from text to specified option
    charsMap['txt'].forEach((char, i) => { // Loop over values and their indexes
      result = result.replaceAll(char, charsMap[option][i]);
    });
    return result;
  }
  
  // Generate BibTeX ID
  function generateBibTeXId(author, year, title) {
    const cleanAuthor = convertChars(author.toLowerCase(), 'ascii')
      .replace(pattern['author'], ', ')
      .split(',')[0].trim();
    
    const cleanTitle = convertChars(title.toLowerCase(), 'ascii')
      .replace(pattern['clean'], ' ').trim()
      .replace(pattern['title'], '').trim()
      .split(' ')[0].trim();
    
    return `${cleanAuthor}${year}${cleanTitle}`;
  }
  
  // Setup entry type radio button listeners
  function setupEntryTypeListeners() {
    const radios = document.querySelectorAll('input[name="entryType"]');
    radios.forEach(radio => {
      // Add event listener to radio button
      radio.addEventListener('change', function() {
        updateFieldStyles(this.value); // Change field input style based on entry type choice
        disableFields();               // Change disabled status of field checkbox
      });
    });
  }
  
  // Setup button listeners
  function setupButtonListeners() {
    document.getElementById('generateBtn').addEventListener('click', generateBibTeX);
    document.getElementById('copyBtn').addEventListener('click', copyToClipboard);
  }
  
  // Set field checkboxes to update automatically
  function setFieldCheckboxAutoUpdate() {
    const deselectAllCheckbox = document.getElementById('deselectAll');
    
    document.querySelectorAll(
        'input[type="text"][data-field], textarea[data-field]'
      ).forEach(elem => {
        const checkbox = document.querySelector(
          `input[type="checkbox"][value="${elem.dataset.field}"]`
        );
        
        if (!checkbox) return;
        
        const update = () => {
          checkbox.checked = (elem.value.trim() !== "");
          deselectAllCheckbox.checked = false;
        };
        
        update();
        elem.addEventListener('input', update);
    });
  }
  
  // Select/deselect all field checkboxes
  function setupSelectDeselectAll() {
    const fieldCheckboxes = () => [
      ...document.querySelectorAll('input[name="fields"]')
    ];
    
    domCache.selectAll.addEventListener('change', () => {
      if (domCache.selectAll.checked) {
        domCache.deselectAll.checked = false;
        fieldCheckboxes().forEach(checkbox => {
          if (!checkbox.disabled) checkbox.checked = true;
        });
      }
    });
    
    domCache.deselectAll.addEventListener('change', () => {
      if (domCache.deselectAll.checked) {
        domCache.selectAll.checked = false;
        fieldCheckboxes().forEach(checkbox => {
          if (!checkbox.disabled) checkbox.checked = false;
        });
      }
    });
  }
  
  // Update field styles based on entry type
  function updateFieldStyles(entryType) {
    const requirements = fieldRequirements[entryType]; // Required fields of chosen entry type
    if (!requirements) return;
    
    // Get all field names
    const allFields = [
      'title', 'author', 'journal', 'booktitle', 'editor', 'type', 
      'edition', 'series', 'volume', 'number', 'chapter', 'pages', 
      'year', 'month', 'publisher', 'address', 'institution', 
      'organization', 'school', 'crossref', 'annote', 'note', 
      'url', 'doi', 'howpublished', 'issn', 'isbn', 'keywords', 'abstract'
    ];
    
    // Change font weight of checkbox inputs and background color of text inputs
    allFields.forEach(fieldName => {
      // Collect field label and value from field checkbox (from truty/falsy values)
      const fieldLabel = document.querySelector(`.field-name[data-field="${fieldName}"]`) || 
                         document.querySelector(
                           `label.field-label input[value="${fieldName}"]`
                         )?.parentElement.querySelector('.field-name');
      const fieldInput = document.querySelector(
        `input[data-field="${fieldName}"], textarea[data-field="${fieldName}"]`
      );
      
      // Return nothing if label and value are empty
      if (!fieldLabel || !fieldInput) return;
      
      // Determine field category
      if (requirements["mandatory"].includes(fieldName)) {
        // Mandatory field: bold label, normal input
        fieldLabel.style.fontWeight = 'bold';
        fieldInput.classList.remove('field-input-na');
      } else if (requirements["optional"].includes(fieldName)) {
        // Optional field: normal label, normal input
        fieldLabel.style.fontWeight = 'normal';
        fieldInput.classList.remove('field-input-na');
      } else {
        // Not applicable field: normal label, dark gray input
        fieldLabel.style.fontWeight = 'normal';
        fieldInput.classList.add('field-input-na');
      }
    });
  }
  
  // Disable field checkbox and input text based on entry type
  function disableFields() {
    const entryType = document.querySelector('input[name="entryType"]:checked').value;
    const requirements = [
      ...fieldRequirements[entryType]['mandatory'], 
      ...fieldRequirements[entryType]['optional']
    ];
    
    const fieldInputs = getAllFieldInputs();
    const checkboxes = document.querySelectorAll('input[name="fields"]');
    checkboxes.forEach(checkbox => {
      const fieldKey = checkbox.value;
      const isRequired = requirements.includes(fieldKey);
      const input = fieldInputs.get(fieldKey);
      if (input) {input.disabled = !isRequired;}
      checkbox.disabled = !isRequired;
    });
  }
  
  // Generate BibTeX item
  function generateBibTeX() {
    const entryType = document.querySelector('input[name="entryType"]:checked').value;
    const fieldInputs = getAllFieldInputs();
    
    // Collect checked field (names and) values in raw representation
    const rawFields = [...document.querySelectorAll('input[name="fields"]:checked')]
      .reduce((obj, checkbox) => {
        const fieldKey = checkbox.value;
        const input = fieldInputs.get(fieldKey);
        obj[fieldKey] = input ? input.value.trim() : '';
        return obj;
      }, {});
    
    // Turn field values into TeX representation
    let fields = {...rawFields};
    Object.keys(rawFields)
      .filter(key => texFields.includes(key))
      .forEach(fieldKey => {
        fields[fieldKey] = convertChars(rawFields[fieldKey], 'tex');
      });
    
    let bibId = generateBibTeXId( 
      rawFields['author'] || '', 
      rawFields['year'] || '', 
      rawFields['title'] || '' 
    );
    
    // Create BibTeX item
    const bibtex = (`@${entryType}{${bibId},\n` + 
      Object.keys(fields)
        .map(fieldKey => {return `  ${fieldKey} = {${fields[fieldKey]}}`;})
        .join(',\n') + 
      '\n}\n');
    
    // Display BibTeX result and enable copy button
    domCache.outputSection.style.display = 'block';
    domCache.bibtexOutput.textContent = bibtex;
    domCache.copyBtn.disabled = false;
    
    // Scroll to output section upon generation
    domCache.outputSection.scrollIntoView({ 
      behavior: 'smooth', 
      block: 'start' 
    });
  }
  
  // Copy to clipboard
  function copyToClipboard() {
    const bibtexOutput = document.getElementById('bibtexOutput');
    const bibtex = bibtexOutput.textContent;
    
    navigator.clipboard.writeText(bibtex)
      .then(() => {
        alert('BibTeX item copied to clipboard.');
    }).catch(err => { 
        alert('Failed to copy to clipboard.'); 
        console.error(err); 
    });
  }
})(); // IIFE
