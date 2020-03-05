import _ from 'lodash';

export default {

    'POST /platform/m/Login/login': (req, res) => {
        let errorData = {
            reason:"school_id或login_name不存在",
            login_result:"false"
        };
        let normalData = {

            "user_id": "8m8icpdR4A0jDt8K76Y",
            "accid": "5d79a05caa210b40008b4cc6",
            "name": "张淼",
            "token": "60b372a7aa9e15f56801b8fae0a7cfb4",
            "mobile": "",
            "icon": "http:\/\/school.idealworkshops.com\/uploadfile\/avatar\/default.png",
            "type": "1",
            "gender": "",
            "department": {
                "id": "eJJfOLRTE42pFOWysdr",
                "name": "\u6f14\u793a\u4e2d\u5fc3"
            },
            "systems": [{
                "name": "Guanliruanjian",
                "user_id": "8m8icpdR4A0jDt8K76Y",
                "token": "eyJhbGciOiJSUzI1NiJ9.eyJzdWIiOiJ0ZWFjaGVyMTMiLCJtYWluIjoiOG04aWNwZFI0QTBqRHQ4Szc2WXx5VGRCdFc4R1NiMHVVSFJmQ0dLX3lzenh8ZUpKZk9MUlRFNDJwRk9XeXNkcnwwLDEseVRkQnRXOEdTYjB1VUhSZkNHS195c3p4LHw3UWEyeDg4allJZERETGdKYUI1LDkwfGNjZDU0ZDg1MTYyMTRkMmI4NDk1NmMyYWFiN2IwOWEwLDMwfHlzT3FkdFh0NVJkanFFY05IYVksOTB8IiwiZXhwIjoxNTc3MzM4NjQzfQ.h0A8OSR5q-rtG2PWl6HRWY7WzRVMhxd3KUoAiA7peslA5csy8usfPREfg2bJskq_OCskFouGy95OL0oHbwZCOXcdwRmjOWXeyphcRYDI208fQ8M35c2zTVZ10bKGZK-Ipe2JpLrTab38wj2vlh2fBAcarBj-R2Gbby9bbUVchBk"
            }, {
                "name": "Zhijiaomofang191",
                "user_id": "5d79a05ccce1c925058b541d",
                "token": ""
            }]
        }
        let result = {
            code:200,
            message:"操作成功",
            data:normalData,
        }
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.send(result);
    },
}