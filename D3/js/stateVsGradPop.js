//add the required modules
var fs1=require('fs');
var readline = require('readline');
var fs = require('fs');
gMale=[];
gFemale=[];
state=[];
pushObj={};
graduate=[];

//give the input file address
var rl = readline.createInterface({
  input: fs.createReadStream('../csv/main.csv')
});

//line event on readLine Element
rl.on('line',function(line)
{
  s=line.split(",");
  if((s[4]=="Total" && s[5]==="All ages") && (!(state.includes(s[3].slice(8)))))
  {
    state.push(s[3].slice(8));
    gMale.push(Number(s[40]));
    gFemale.push(Number(s[41]));
  }
  else {
    if(s[4]=="Total" && s[5]==="All ages")
    {
      var index=state.indexOf(s[3].slice(8));
      gMale[index]+=Number(s[40]);
      gFemale[index]+=Number(s[41]);
    }
  }
});
//close event on readLine Element
rl.on('close',function()
{
  for(var i in state)
  {
    pushObj={"State":state[i],"Graduate-Males":gMale[i],"Graduate-Females":gFemale[i]};
    graduate.push(pushObj);
  }
  console.log(graduate);
  var op=fs.writeFileSync('../json/stateVsGradPop.json',JSON.stringify(graduate),"utf8");
});
