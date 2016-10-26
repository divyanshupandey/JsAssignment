var fs1=require('fs');
var readline = require('readline');
var fs = require('fs');
gMale=[];
gFemale=[];
state=[];
pushObj={};
graduate=[];
var rl = readline.createInterface({
  input: fs.createReadStream('../csv/csv1.csv')
});

rl.on('line',function(line)
{

    s=line.split(",");
    if(s[4]=="Total" && s[5]==="All ages")
    {
    state.push(s[3].slice(8));
    gMale.push(Number(s[40]));
    gFemale.push(Number(s[41]));
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
      var index=state.indexOf(s[3].slice(8));
      gMale[index]+=Number(s[40]);
      gFemale[index]+=Number(s[41]);
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
        var index=state.indexOf(s[3].slice(8));
        gMale[index]+=Number(s[40]);
        gFemale[index]+=Number(s[41]);
      }
    });
    rl2.on('close',function()
    {
      for(var i in state)
      {
        pushObj={"State":state[i],"Graduate-Males":gMale[i],"Graduate-Females":gFemale[i]};
        graduate.push(pushObj);
      }
      console.log(graduate);
      var op=fs.writeFileSync('../json/b.json',JSON.stringify(graduate),"utf8");
    });
  });
});
