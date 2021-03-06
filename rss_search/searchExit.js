// I remove metadata from ES I don't care about
function main(args) {

   //credit for regex: http://stackoverflow.com/a/822464/52160
   let result = args.hits.hits.map((entry) => {
    return {
        url:entry._id,
        title:entry._source.title,
        published:entry._source.published,
        context:entry._source.body.replace(/<(?:.|\n)*?>/gm, '').substr(0,250),
        score:entry._score
    }  
   });
 
    return {
        headers:{
            'Access-Control-Allow-Origin':'*',
            'Content-Type':'application/json'
        },
        statusCode:200,
        body:new Buffer(JSON.stringify(result)).toString('base64')
    };

}