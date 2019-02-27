const https = require('https');
var sourceUrl = 'https://www.demo_domain.com/uploads/Rapnet.txt'; // please replace the domain with actual source
https.get(sourceUrl, (resp) => {
    let data = '';
    resp.on('data', (chunk) => {
        data += chunk;
    });

    resp.on('end', () => {
        data = data.split("\n");
        headers = data.shift().split(","); //gets the only first element 
        var jsonElements = [];
        data.forEach(function (d) {
            // Loop through each row
            tmp = {}
            row = d.split(",")
            for (var i = 0; i < headers.length; i++) {
                if (row[i] == '') {
                    tmp[headers[i]] = null; // set null for blank values
                } else
                    tmp[headers[i]] = row[i];
            }
            // Push elements to list
            jsonElements.push(tmp);
        });
        console.log(jsonElements[10]); // print the required element- "jsonElements" contains the final json o/p
    });
}).on("error", (err) => {
    console.log("Please check the source url");
    console.log("Error: " + err.message);
});
