//add the require modules
var fs = require("fs");
var isHeader = true;
var writeStream = fs.createWriteStream('../csv/main.csv',{'flags':'a'});

//add the file address
var rl = require('readline').createInterface({
  input: require('fs').createReadStream('../csv/csvGeneral.csv')
});

//line event on readLine Element
rl.on('line', function (line) //reads line by line
{
  writeStream.write(line + "\n"); //write line to the file
});

//close event on readLine Element
rl.on('close',function()
{
  var rl1 = require('readline').createInterface({
    input: require('fs').createReadStream('../csv/csvSc.csv')
  });

  //line event on readLine Element
  rl1.on('line', function (line) //reads line by line
  {
    if(isHeader)
    {
      isHeader=false;
    }
    else {
      writeStream.write(line + "\n"); //write line to the file
    }
  });
  //close event on readLine Element
  rl1.on('close',function()
  {
    isHeader=true;
    var rl2 = require('readline').createInterface({
      input: require('fs').createReadStream('../csv/csvSt.csv')
    });

    //line event on readLine Element
    rl2.on('line', function (line) //reads line by line
    {
      if(isHeader)
      {
        isHeader=false;
      }
      else {
        writeStream.write(line + "\n"); //write line to the file
      }
    });
  });
});
