//alogorithm:
//initially convert the music xml files to json with xml2json - a fast c based xml parser
//the next time the user uses the service the JSON representation of their

"use strict";
const fs = require("fs");
const test = require("tape");
const ScoreSearcher = require("./ScoreSearcher");

//=============================================================
//CONVERT TO JSON TO SAVE SPACE AND FOR SPEED
// const parser = require("xml2json");
//
// fs.readFile("../scores/Beethoven-Symphony No. 4 Mov. 1.xml", function(err, data) {
//   const jsonstring = parser.toJson(data);
//
//   fs.writeFile("../scores_json/Beethoven-Symphony No. 4 Mov. 1.json", jsonstring, function(err) {
//       if(err) {
//           return console.log(err);
//       }
//
//       console.log("The file was saved!");
//   });
// });
//
// fs.readFile("../scores/Beethoven-Symphony No. 4 Mov. 2.xml", function(err, data) {
//   const jsonstring = parser.toJson(data);
//
//   fs.writeFile("../scores_json/Beethoven-Symphony No. 4 Mov. 2.json", jsonstring, function(err) {
//       if(err) {
//           return console.log(err);
//       }
//
//       console.log("The file was saved!");
//   });
// });
//
// fs.readFile("../scores/Beethoven-Symphony No. 4 Mov. 3.xml", function(err, data) {
//   const jsonstring = parser.toJson(data);
//
//   fs.writeFile("../scores_json/Beethoven-Symphony No. 4 Mov. 3.json", jsonstring, function(err) {
//       if(err) {
//           return console.log(err);
//       }
//
//       console.log("The file was saved!");
//   });
// });
//
// fs.readFile("../scores/Beethoven-Symphony No. 4 Mov. 4.xml", function(err, data) {
//   const jsonstring = parser.toJson(data);
//
//   fs.writeFile("../scores_json/Beethoven-Symphony No. 4 Mov. 4.json", jsonstring, function(err) {
//       if(err) {
//           return console.log(err);
//       }
//
//       console.log("The file was saved!");
//   });
// });
//================================================================
console.time("Took");

test("mov 1 tests", function(t)
{
  fs.readFile("../scores_json/Beethoven-Symphony No. 4 Mov. 1.json",
   function(err, jsonstring)
   {
    if (err) throw err;

    const scoreSearcher =  ScoreSearcher(JSON.parse(jsonstring));

    {
      const expected = [ "Flute", "Oboes", "Clarinets in Bb", "Bassoons",
      "Bb Basso Horn", "Trumpets in Bb", "Timpani",
      "Violin I", "Violin II", "Viola", "Violoncello", "Contrabass" ];
      const actual = scoreSearcher.getInstrumentNames();
      t.deepEqual(actual, expected, "instrument names");
    }

    {
      const actual = scoreSearcher.getMaxPitch();
      const expected = 81;
      t.deepEqual(actual, expected, "highest pitch");
    }

    {
      const actual = scoreSearcher.getMinPitch();
      const expected = 24;
      t.deepEqual(actual, expected, "lowest pitch");
    }

    t.end();
  });
});


test("mov 2 tests", function(t)
{
  fs.readFile("../scores_json/Beethoven-Symphony No. 4 Mov. 2.json",
  function(err, jsonstring)
  {
    if (err) throw err;

    const scoreSearcher =  ScoreSearcher(JSON.parse(jsonstring));

    {
      const expected = [ "Flute", "Oboes", "Clarinets in Bb",
      "Bassoons", "Horn in Eb", "Trumpet in Eb", "Timpani", "Violin I",
      "Violin II", "Viola", "Violoncello", "Contrabass" ];

      const actual = scoreSearcher.getInstrumentNames();
      t.deepEqual(actual, expected, "instrument names");
    }

    {
      const actual = scoreSearcher.getMaxPitch();
      const expected = 84;
      t.deepEqual(actual, expected, "highest pitch");
    }

    {
      const actual = scoreSearcher.getMinPitch();
      const expected = 24;
      t.deepEqual(actual, expected, "lowest pitch");
    }

    t.end();
  });
});

test("mov 3 tests", function(t)
{
  fs.readFile("../scores_json/Beethoven-Symphony No. 4 Mov. 3.json",
  function(err, jsonstring)
  {
    if (err) throw err;

    const scoreSearcher =  ScoreSearcher(JSON.parse(jsonstring));

    {
      const expected = [ "Flute", "Oboes", "Clarinets in Bb", "Bassoons",
      "Bb Basso Horn", "Trumpets in Bb", "Timpani",
      "Violin I", "Violin II", "Viola", "Violoncello", "Contrabass" ];
      const actual = scoreSearcher.getInstrumentNames();
      t.deepEqual(actual, expected, "instrument names");
    }

    {
      const actual = scoreSearcher.getMaxPitch();
      const expected = 79;
      t.deepEqual(actual, expected, "highest pitch");
    }

    {
      const actual = scoreSearcher.getMinPitch();
      const expected = 26;
      t.deepEqual(actual, expected, "lowest pitch");
    }

    t.end();
  });
});

test("mov 4 tests", function(t)
{
  fs.readFile("../scores_json/Beethoven-Symphony No. 4 Mov. 4.json",
  function(err, jsonstring)
  {
    if (err) throw err;

    const scoreSearcher =  ScoreSearcher(JSON.parse(jsonstring));

    {
      const expected = [ "Flute", "Oboes", "Clarinets in Bb", "Bassoons",
      "Bb Basso Horn", "Trumpets in Bb", "Timpani",
      "Violin I", "Violin II", "Viola", "Violoncello", "Contrabass" ];
      const actual = scoreSearcher.getInstrumentNames();
      t.deepEqual(actual, expected, "instrument names");
    }

    {
      const actual = scoreSearcher.getMaxPitch();
      const expected = 79;
      t.deepEqual(actual, expected, "highest pitch");
    }

    {
      const actual = scoreSearcher.getMinPitch();
      const expected = 24;
      t.deepEqual(actual, expected, "lowest pitch");
    }
    console.timeEnd("Took");

    t.end();
  });
});
