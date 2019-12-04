console.log('Loading function');

const sampleData = require('sampleData.json');

/**
 * Returns ec2 status
 */
exports.handler = (event, context, callback) => {
    //console.log('Received event:', JSON.stringify(event, null, 2));

    const done = (err, res) => callback(null, {
        statusCode: err ? '400' : '200',
        body: err ? err.message : JSON.stringify(res),
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        },
    });

    let pageIndex = 0;
    let pageSize = 10;
    let total = sampleData.length;

    if (event.queryStringParameters) {
        pageIndex = parseInt(event.queryStringParameters.pageIndex) || pageIndex;
        pageSize = parseInt(event.queryStringParameters.pageSize) || pageSize; 
    }

    switch (event.httpMethod) {
        case 'GET':
            let page = sampleData.slice(pageIndex * pageSize, (pageIndex + 1) * pageSize);
            done(null, {
                pageIndex,
                pageSize,
                total,
                page
            });
            break;
        default:
            done(new Error(`Unsupported method "${event.httpMethod}"`));
    }
};
