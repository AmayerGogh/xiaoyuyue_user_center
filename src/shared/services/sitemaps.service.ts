import { Injectable } from '@angular/core';

@Injectable()
export class SitemapsService {

    constructor() { }
    /*
        @ 获取站点地图的本地数据
        @filename：文件名
        @callback：返回数据的回调
    */
    getResultData(fileName: string, callback: any): void {
        let cookieLangValue = abp.utils.getCookieValue('Abp.Localization.CultureName');
        if (!cookieLangValue) {
            cookieLangValue = 'zh-CN';
        }
        const url = `/assets/${fileName}.${cookieLangValue}.json`;
        $.ajax({
            url: url,
            dataType: 'text',
            type: 'GET',
            success: result => {
                result = JSON.parse(result);
                callback(result[fileName]);
            }
        })
    }
}
