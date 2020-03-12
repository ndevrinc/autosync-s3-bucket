/*********************************************************************************************************************
 *  Copyright 2019 Ndevr, Inc. or its affiliates. All Rights Reserved.                                           *
 *                                                                                                                    *
 *  Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance    *
 *  with the License. A copy of the License is located at                                                             *
 *                                                                                                                    *
 *      http://www.apache.org/licenses/LICENSE-2.0                                                                    *
 *                                                                                                                    *
 *  or in the 'license' file accompanying this file. This file is distributed on an 'AS IS' BASIS, WITHOUT WARRANTIES *
 *  OR CONDITIONS OF ANY KIND, express or implied. See the License for the specific language governing permissions    *
 *  and limitations under the License.                                                                                *
 *********************************************************************************************************************/

const AWS = require('aws-sdk');
const s3 = new AWS.S3();

class ImageHandler {

    /**
     * Main method for processing S3 update events.
     * @param {Event} event - An Event object.
     */
    async process(event) {

        const srcBucket = event.Records[0].s3.bucket.name;
        const dstBuckets = this.getDstBuckets(srcBucket);

        // Object key may have spaces or unicode non-ASCII characters.
        // const key = decodeURIComponent(event.Records[0].s3.object.key.replace(/\+/g, " "));
        const key = event.Records[0].s3.object.key;
        for (let dstBucket of dstBuckets) {
            try {
                const params = {
                    Bucket: dstBucket,
                    CopySource: encodeURI(srcBucket + '/' + key),
                    Key: key
                };
                await s3.copyObject(params, function (err, data) {
                    if (err) {
                        console.log(err, err.stack);
                    } else {
                        console.log(data);
                    }
                }).promise();
            } catch (err) {
            }
        }

    }

    getDstBuckets(srcBucket) {
        const config = require('./config.json');
        let dstBuckets = [];

        if ("object" === typeof config.buckets) {
            try {
                dstBuckets = config.buckets[srcBucket];
            } catch (err) {
                console.log(err, err.stack);
            }
        }

        return dstBuckets;
    }
}

// Exports
module.exports = ImageHandler;
