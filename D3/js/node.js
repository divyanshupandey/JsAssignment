var fs1=require('fs');
var readline = require('readline');
var fs = require('fs');
i=0;
ages=[];
literate=[];
pushObj={};
ageLit=[];
var rl = readline.createInterface({
  input: fs.createReadStream('../csv/csv1.csv')
});

rl.on('line',function(line)
{
  i++;
    s=line.split(",");
    if(s[4]=="Total" && s[5]!=="All ages")
    {
      if(i>1 && i<31)
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

rl.on('close',function()
{
  var rl1 = readline.createInterface({
    input: fs.createReadStream('../csv/csv2.csv')
  });

  rl1.on('line',function(line)
  {
    i++;
      s=line.split(",");
      if(s[4]=="Total" && s[5]!=="All ages")
      {
        var index=ages.indexOf(s[5]);
        literate[index]+=Number(s[12]);
      }
  });
  rl1.on('close',function()
  {
    var rl2 = readline.createInterface({
      input: fs.createReadStream('../csv/csv3.csv')
    });

    rl2.on('line',function(line)
    {
      i++;
        s=line.split(",");
        if(s[4]=="Total" && s[5]!=="All ages")
        {
          var index=ages.indexOf(s[5]);
          literate[index]+=Number(s[12]);
        }
    });
    rl2.on('close',function()
    {
      for(var i in ages)
      {
        pushObj={"Age-group":ages[i],"Lit-Population":literate[i]};
        ageLit.push(pushObj);
      }
      console.log(ageLit);
      var op=fs.writeFileSync('../json/a.json',JSON.stringify(ageLit),"utf8");
    });
  });
});
