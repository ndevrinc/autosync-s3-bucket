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

const ImageHandler = require('../image-handler');
let assert = require('assert');

// ----------------------------------------------------------------------------
// [async] process()
// ----------------------------------------------------------------------------
describe('process()', function() {
    describe('001/default', function() {
        it(`Should pass... TODO`, async function() {
            // Assert
            assert.equal(true, true);
        });
    });

});
// ----------------------------------------------------------------------------
// getDstBuckets()
// ----------------------------------------------------------------------------
describe('getDstBuckets()', function() {
    describe('001/default', function() {
        it(`Should pass if the destBuckets equal the expected array`, async function() {
            const config = require('../config.json');
            console.log(config);
            // Act
            const imageHandler = new ImageHandler();
            const dstBuckets = imageHandler.getDstBuckets('bucket-source1');

            // Assert
            assert.deepEqual(dstBuckets, ['bucket-destination-a','bucket-destination-b']);
        });
    });

    describe('002/badConfig', function() {
        it(`Should pass if bucket value not in config and returns correct error.`, async function() {
            // Act
            const imageHandler = new ImageHandler();
            const dstBuckets = imageHandler.getDstBuckets('bucket-bad-source');

            // Assert
            assert.deepEqual(dstBuckets, []);
        });
    });
});
