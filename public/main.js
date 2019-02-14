var form = document.getElementById("vote-form");

form.addEventListener("submit", (e) => {
    
    var choice = document.querySelector("input[name=os]:checked").value;
    var data = {os:choice};
    
    fetch("https://votingapp-hk967144.c9users.io/poll", {
        method:"post",
        body:JSON.stringify(data),
        headers: new Headers({
            "Content-Type":"application/json"
        })
    })
    .then(res => res.json())
    .then(data => console.log(data))
    .catch(err => console.log(err));
    
    e.preventDefault();
});

fetch("https://votingapp-hk967144.c9users.io/poll")
.then(res => res.json())
.then(data => {
   var votes = data.votes;
   var totalVotes = votes.length;
   //count vote points - acc/current
   var voteCounts = votes.reduce((acc, vote) => ((acc[vote.os] = (acc[vote.os] || 0) + parseInt(vote.points)),acc)); 
   let dataPoint = [
    {label:"Windows", y : voteCounts.Windows},
    {label:"Linux", y : voteCounts.MacOS},
    {label:"MacOS", y : voteCounts.Linux},
    {label:"Other", y : voteCounts.Other}
    ];
    
    var chartContainer = document.getElementById("chartContainer");
    if(chartContainer){
        var  chart =  new  CanvasJS.Chart("chartContainer",{
            animationEnabled:true,
            theme:"theme1",
            title:{
                text: 'Totals Votes : ' + totalVotes
            },
            data :  [
                {
                type: "column",
                dataPoints: dataPoint
                }
                ]
        });
        chart.render();
        
        
         // Enable pusher logging - don't include this in production
            Pusher.logToConsole = true;
        
            var pusher = new Pusher('d19ba6f5456c6da6d5bd', {
              cluster: 'ap2',
              encrypted: true
            });
        
            var channel = pusher.subscribe('os-vote');
            channel.bind('os-vote', function(data) {
             dataPoint = dataPoint.map(x => {
                 if(x.label == data.os){
                     x.y += data.points;
                     return x;
                     
                 }else{
                     return x;
                 }
             });
             chart.render();
            });
    }
});

