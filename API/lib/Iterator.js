"use strict";
const et = require("elementtree");

//-----------------------------------
const createIterator = (partsBeatMap) =>
{
  const iterator = {};
  
  let measures = [];
  let measureNum = 0;
  let beatMap = measures[0];
  let beatIndex = -1;

  const errors =  
  {
    "noNext": "no next exists!",
    "noPrev": "no prev exists!",
    "badMeasure": "measure does not exist!"
  };

  iterator.selectInstrument = (instrumentName) =>
  {
    if (instrumentName in partsBeatMap)
    {
      measures = partsBeatMap[instrumentName];
      beatMap = measures[0];
      beatIndex = -1;
      return true;
    }
    else
    {
     //TODO should an error be thrown???
     return false;
    }
  };

  iterator.setMeasureNum = (newMeasureNum) =>
  {
    if (newMeasureNum <= 0 || newMeasureNum >= measures.length)
    {
      throw new Error(errors.badMeasure);
    }
    measureNum = newMeasureNum;
    beatMap = measures[measureNum];
    beatIndex = -1;
  };

  iterator.nextMeasure = () =>
  { 
    if (measureNum === measures.length - 1)
    {
      throw new Error(errors.noNext);
    }
    beatMap = measures[++measureNum];
    beatIndex = 0;
    return beatMap[0];
  };

  iterator.prevMeasure = () =>
  {
    if (measureNum === 0)
    {
      throw new Error(errors.noPrev);
    }
    beatMap = measures[--measureNum];
    beatIndex = 0;
    return beatMap[0];
  };

  iterator.next = () =>
  {
   if (beatIndex === beatMap.length - 1)
   {
    iterator.nextMeasure();
    return beatMap[beatIndex];
   }
   return beatMap[++beatIndex];
  };

  iterator.hasNext = () =>
  {
    return (beatIndex < beatMap.length - 1 
            ||  measureNum < measures.length - 1);
  };

  iterator.prev = () =>
  {
    if (beatIndex === 0)
    {
      iterator.prevMeasure();
      beatIndex = beatMap.length - 1;
      return beatMap[beatIndex];
    }
    return beatMap[--beatIndex];
  };

  iterator.hasPrev = () =>
  {
    return (beatIndex > 0 ||  measureNum > 0);
  };

  return Object.freeze(iterator);
};

const constructor = (musicxml) =>
{
  const etree = et.parse(musicxml);
  const partNames = etree.findall(".//part-name")
                   .map((partName) => partName.text);

  const partsBeatMap = etree.findall(".//part").reduce((acc, val, index) =>
  {
    let divisions;
   
    acc[partNames[index]] = val.findall(".//measure").map((measure) => 
    {
      const beatMap = [];
      let currentBeat = 1;
        
      measure._children.forEach((child) => 
      {
        if (child.tag === "attributes")
        {
          //"For example, if duration = 1 and divisions = 2, 
          //this is an eighth note duration"
          divisions = parseInt(child.findtext(".//divisions"));
        }
        else if (child.tag === "note")
        {
          const symbol = {};
          symbol.beat = Math.ceil((currentBeat / divisions));

          //TODO need to change based on time signature?
          if (!(currentBeat % divisions) === 1) //not on downbeat
          {
            symbol.beat += (currentBeat % divisions) / divisions;
          }
          
          symbol.duration =  parseInt(child.findtext(".//duration")); 

          if (child.findtext("[rest]"))
          {
            symbol.rest = true; 
          }
          else if (child.findtext("[pitch]"))
          { 
            const step = child.findtext(".//step");
            const accidentals = child.findall(".//accidental");
            const octave = child.findtext(".//octave");
            let noteString = step;
            
            accidentals.forEach((accidental) => 
            {
              if (accidental.text === "flat")
              {
                noteString += "b";
              }
              else if (accidental.text === "sharp")
              {
                noteString += "#";
              }
            });
            noteString += octave;
            symbol.pitch = [noteString];
          }

          //chord stuff------------------------------------------         
          //if it's a chord we don't want to double count duration
          if (child.findtext("[chord]")) 
          {
            const lastIndex = beatMap.length - 1;
            beatMap[lastIndex].pitch.push(symbol.pitch[0]);             
          } 
          else
          {
            //two voice chord case
            const indexOfExistingBeat = beatMap.findIndex((oldSymbol) =>
                             oldSymbol.beat === currentBeat);
            
            if (indexOfExistingBeat !== -1)
            {
              beatMap[indexOfExistingBeat].pitch.push(symbol.pitch[0]);
            }
            else 
            {
              beatMap.push(symbol);
            }

            currentBeat += symbol.duration;
          }
        }
        else if (child.tag === "backup")
        {
          currentBeat -= parseInt(child.findtext(".//duration"));
          console.log("currentBeat", currentBeat);
        }
        else if (child.tag === "forward")
        {
          currentBeat -= parseInt(child.findtext(".//duration"));
        } 
      });

      return beatMap;
    });

    return acc;
  }, {});
   
  return createIterator(partsBeatMap);
};

module.exports = constructor;

