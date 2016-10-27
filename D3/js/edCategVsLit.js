//add the required modules
var fs1=require('fs');
var readline = require('readline');
var fs = require('fs');
headFlag=true;
category=[];
litPop=[];
pushObj={};
catPop=[];

//give the input file address
var rl = readline.createInterface({
  input: fs.createReadStream('../csv/main.csv')
});

//line event on readLine Element
rl.on('line',function(line)
{
  var loc;
  s=line.split(",");
  if(headFlag)
  {
    loc=15;
    while(loc<43)
    {
      category.push(s[loc]);
      loc=loc+3;
    }
    headFlag=false;
  }
  else if((litPop.length)===0)
  {
    loc=15;
    while(loc<43)
    {
      litPop.push(Number(s[loc]));
      loc=loc+3;
    }
  }
  else
  {
    if(s[4]=="Total" && s[5]==="All ages")
    {
      loc=15;
      var j=0;
      while(loc<43)
      {
        litPop[j]+=Number(s[loc]);
        loc=loc+3;
        j++;
      }
    }
  }
});

//close event on readLine Element
rl.on('close',function()
{
  for(var i in category)
  {
    pushObj={"Category":category[i],"Lit-Population":litPop[i]};
    catPop.push(pushObj);
  }
  console.log(catPop);
  var op=fs.writeFileSync('../json/edCategVsLit.json',JSON.stringify(catPop),"utf8");
});
