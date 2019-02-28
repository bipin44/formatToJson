const axios = require("axios");
let completeArray = [];
let specifiedKeys = ['PacketNo',
'Shape',
'Weight',
'Color',
'Clarity',
'Fluorescence',
'FluorescenceColor',
'DepthPer',
'TablePer',
'Polish',
'Symmetry',
'Cut',
'MaxGirdle',
'MinGirdle',
'Girdle',
'Culet',
'CrownAngle',
'CrownHeight',
'PavilionAngle',
'PavilionDepth',
'Length',
'Width',
'Height',
'Laboratory',
'CertificateNo',
'Disc',
'Amount',
'Status'];

var sourceUrl = 'https://www.bijandiamonds.com/uploads/Rapnet.txt';


const getData = async sourceUrl => {
    try {
      const response = await axios.get(sourceUrl);
      const result = response.data;
      var data;
      console.log('received data from URL')
      data = result.split("\n");
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
                  console.log('Converted data to Json');
                  const formatedJson = await Promise.all(jsonElements.map(async x => { // async iterate
                                let obj = {};
                                await specifiedKeys.map((i)=>{
                                    if(typeof x[i] === 'undefined'){
                                        obj[i] = null;
                                    } else
                                    obj[i] = x[i];
                                })
                                return obj;        
                            }));
                            
                            console.log(formatedJson);
    } catch (error) {
      console.log(error);
    }
  };
  getData(sourceUrl);


//  Alternate way:- Below code uses "csvtojson" to convert data---------------------------------------------------------------------------------


// const request=require('request');
// const csv=require('csvtojson');
// let completeArray = [];
// let specifiedKeys = ['PacketNo',
// 'Shape',
// 'Weight',
// 'Color',
// 'Clarity',
// 'Fluorescence',
// 'FluorescenceColor',
// 'DepthPer',
// 'TablePer',
// 'Polish',
// 'Symmetry',
// 'Cut',
// 'MaxGirdle',
// 'MinGirdle',
// 'Girdle',
// 'Culet',
// 'CrownAngle',
// 'CrownHeight',
// 'PavilionAngle',
// 'PavilionDepth',
// 'Length',
// 'Width',
// 'Height',
// 'Laboratory',
// 'CertificateNo',
// 'Disc',
// 'Amount',
// 'Status'];
// const data = async csv => {
//     try{
//         const jsonArray=await csv().fromStream(request.get('https://www.bijandiamonds.com/uploads/Rapnet.txt'));
//         const formatedJson = await Promise.all(jsonArray.map(async x => { // async iterate
//             let obj = {};
//             await specifiedKeys.map((i)=>{
//                 if(typeof x[i] === 'undefined'){
//                     obj[i] = null;
//                 } else
//                 obj[i] = x[i];
//             })
//             return obj;        
//         }));
        
//         console.log(formatedJson);
//     } catch(e) {
//         console.log(e);
//     }
// };
// data(csv);
