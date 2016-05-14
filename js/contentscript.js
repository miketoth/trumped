var all = document.body.getElementsByTagName('*');
var terms;
var statement;
var newText = [];
var words;
var shouldInsert;

var ignore = {
        "STYLE": 0,
        "SCRIPT": 0,
        "NOSCRIPT": 0,
        "IFRAME": 0,
        "OBJECT": 0,
        "INPUT": 0,
        "FORM": 0,
        "TEXTAREA": 0
};

for(i=0;i<all.length;i++) {
  if(all[i].tagName in ignore) {
  } else if(all[i].text && all[i].text.length > 0) {
    words = all[i].text.split(" ");

    words.forEach(function(word) {
      if(word.match(/[a-z]/i)) {
        statement = nlp_compromise.statement(word);
        shouldInsert = Math.random();

        // split text into words and then do the nlp
        if(statement && statement.terms && statement.terms[0] && statement.terms[0].tag === "Noun" && shouldInsert < 0.5) {
          terms = statement.terms[0];
          newText.push("Trump " + terms.text + " ™");
        } else {
          newText.push(word);
        }
      } else { newText.push(word); }
    });

    all[i].text = newText.join(" ");
    newText = [];
  }
};
