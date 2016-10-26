var fs1=require('fs');
var readline = require('readline');
var fs = require('fs');
i=0;
category=[];
litPop=[];
pushObj={};
catPop=[];
var rl = readline.createInterface({
  input: fs.createReadStream('../csv/csv1.csv')
});

rl.on('line',function(line)
{
  i++;
  var loc;
  s=line.split(",");
  if(i===1)
  {
    loc=15;
    while(loc<43)
    {
      category.push(s[loc]);
      loc=loc+3;
    }
  }
  else if(i==2)
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

rl.on('close',function()
{
  var rl1 = readline.createInterface({
    input: fs.createReadStream('../csv/csv2.csv')
  });

  rl1.on('line',function(line)
  {
    s=line.split(",");
    if(s[4]=="Total" && s[5]==="All ages")
    {
      var loc=15;
      var j=0;
      while(loc<43)
      {
        litPop[j]+=Number(s[loc]);
        loc=loc+3;
        j++;
      }
    }
  });
  rl1.on('close',function()
  {
    var rl2 = readline.createInterface({
      input: fs.createReadStream('../csv/csv3.csv')
    });

    rl2.on('line',function(line)
    {
      s=line.split(",");
      if(s[4]=="Total" && s[5]==="All ages")
      {
        var loc=15;
        var j=0;
        while(loc<43)
        {
          litPop[j]+=Number(s[loc]);
          loc=loc+3;
          j++;
        }
      }
    });
    rl2.on('close',function()
    {
      for(var i in category)
      {
        pushObj={"Category":category[i],"Lit-Population":litPop[i]};
        catPop.push(pushObj);
      }
      console.log(catPop);
      var op=fs.writeFileSync('../json/c.json',JSON.stringify(catPop),"utf8");
    });
  });
});
