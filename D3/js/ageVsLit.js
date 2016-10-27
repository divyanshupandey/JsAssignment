//add the required modules
var fs1=require('fs');
var readline = require('readline');
var fs = require('fs');
ages=[];
literate=[];
pushObj={};
ageLit=[];

//give the input file address
var rl = readline.createInterface({
  input: fs.createReadStream('../csv/main.csv')
});

//line event on readLine Element
rl.on('line',function(line)
{
  s=line.split(",");
  if(s[4]=="Total" && s[5]!=="All ages")
  {
    if(!(ages.includes(s[5])))
    {
      ages.push(s[5]);
      literate.push(Number(s[12]));
    }
    else
    {
      var index=ages.indexOf(s[5]);
      literate[index]+=Number(s[12]);
    }
  }
});

//close event on readLine Element
rl.on('close',function()
{
  for(var i in ages)
  {
    pushObj={"Age-group":ages[i],"Lit-Population":literate[i]};
    ageLit.push(pushObj);
  }
  console.log(ageLit);
  var op=fs.writeFileSync('../json/ageVsLit.json',JSON.stringify(ageLit),"utf8");
});
