//本资源来源于互联网公开渠道，仅可用于个人学习爬虫技术。
//严禁将其用于任何商业用途，下载后请于 24 小时内删除，搜索结果均来自源站，本人不承担任何责任。

const DEFAULT_HEADERS = {
    'User-Agent': 'Mozilla/5.0 (compatible; MSIE 9.0; Windows NT 6.1; Trident/5.0; BOIE9;ZHCN)',
    'Connection': 'Keep-Alive'
};
const FALLBACK_HOST = 'http://124.221.30.100:8088/';

let HOST = '';
let homeVodList = [];
let filterYearStr = '';

async function init(cfg) {
    try {
        let url = 'http://tv.kltvyg.top/api/api.php?bb=9.9';
        let res = await req(url, { headers: DEFAULT_HEADERS, method: 'get' });
        let content = res.content;
        let urlMatch = content.match(/url1#([^#]+)#/);
        if (urlMatch) HOST = urlMatch[1].trim();
        let match;
        let vodRegex = /#tvkl#&tp&([^&]+)&id&([^&]+)&mz&([^&]+)&#kltv#/g;
        homeVodList = [];
        while ((match = vodRegex.exec(content)) !== null) {
            homeVodList.push({ vod_pic: match[1], vod_id: match[2], vod_name: match[3] });
        }
        let nfMatch = content.match(/nf&([^&]+)&/);
        if (nfMatch) filterYearStr = nfMatch[1];
    } catch (e) {}
}

async function home(filter) {
    const CLASS_MOVIE = "kltvv#id##mz#全部##kkkk#kltvv#id#最新#mz#最新##kkkk#kltvv#id#喜剧#mz#喜剧##kkkk#kltvv#id#爱情#mz#爱情##kkkk#kltvv#id#动作#mz#动作##kkkk#kltvv#id#恐怖#mz#恐怖##kkkk#kltvv#id#科幻#mz#科幻##kkkk#kltvv#id#剧情#mz#剧情##kkkk#kltvv#id#犯罪#mz#犯罪##kkkk#kltvv#id#奇幻#mz#奇幻##kkkk#kltvv#id#战争#mz#战争##kkkk#kltvv#id#悬疑#mz#悬疑##kkkk#kltvv#id#动画#mz#动画##kkkk#kltvv#id#文艺#mz#文艺##kkkk#kltvv#id#纪录#mz#纪录##kkkk#kltvv#id#传记#mz#传记##kkkk#kltvv#id#歌舞#mz#歌舞##kkkk#kltvv#id#古装#mz#古装##kkkk#kltvv#id#历史#mz#历史##kkkk#kltvv#id#惊悚#mz#惊悚##kkkk#kltvv#id#伦理#mz#伦理##kkkk#kltvv#id#其他#mz#其他##kkkk#";
    const CLASS_TV = "kltvv#id##mz#全部##kkkk#kltvv#id#最新#mz#最新##kkkk#kltvv#id#国产#mz#国产##kkkk#kltvv#id#港台#mz#港台##kkkk#kltvv#id#日韩#mz#日韩##kkkk#kltvv#id#欧美#mz#欧美##kkkk#kltvv#id#言情#mz#言情##kkkk#kltvv#id#剧情#mz#剧情##kkkk#kltvv#id#农村#mz#农村##kkkk#kltvv#id#伦理#mz#伦理##kkkk#kltvv#id#喜剧#mz#喜剧##kkkk#kltvv#id#悬疑#mz#悬疑##kkkk#kltvv#id#都市#mz#都市##kkkk#kltvv#id#偶像#mz#偶像##kkkk#kltvv#id#古装#mz#古装##kkkk#kltvv#id#军事#mz#军事##kkkk#kltvv#id#警匪#mz#警匪##kkkk#kltvv#id#历史#mz#历史##kkkk#kltvv#id#励志#mz#励志##kkkk#kltvv#id#神话#mz#神话##kkkk#kltvv#id#谍战#mz#谍战##kkkk#kltvv#id#青春#mz#青春##kkkk#kltvv#id#家庭#mz#家庭##kkkk#kltvv#id#动作#mz#动作##kkkk#kltvv#id#情景#mz#情景##kkkk#kltvv#id#武侠#mz#武侠##kkkk#kltvv#id#科幻#mz#科幻##kkkk#kltvv#id#其他#mz#其他##kkkk#";
    const CLASS_ZONGYI = "kltvv#id##mz#全部##kkkk#kltvv#id#最新#mz#最新##kkkk#kltvv#id#脱口秀#mz#脱口秀##kkkk#kltvv#id#真人秀#mz#真人秀##kkkk#kltvv#id#搞笑#mz#搞笑##kkkk#kltvv#id#选秀#mz#选秀##kkkk#kltvv#id#八卦#mz#八卦##kkkk#kltvv#id#访谈#mz#访谈##kkkk#kltvv#id#情感#mz#情感##kkkk#kltvv#id#生活#mz#生活##kkkk#kltvv#id#晚会#mz#晚会##kkkk#kltvv#id#音乐#mz#音乐##kkkk#kltvv#id#职场#mz#职场##kkkk#kltvv#id#美食#mz#美食##kkkk#kltvv#id#时尚#mz#时尚##kkkk#kltvv#id#游戏#mz#游戏##kkkk#kltvv#id#少儿#mz#少儿##kkkk#kltvv#id#体育#mz#体育##kkkk#kltvv#id#纪实#mz#纪实##kkkk#kltvv#id#曲艺#mz#曲艺##kkkk#kltvv#id#歌舞#mz#歌舞##kkkk#kltvv#id#财经#mz#财经##kkkk#kltvv#id#汽车#mz#汽车##kkkk#kltvv#id#播报#mz#播报##kkkk#kltvv#id#其他#mz#其他##kkkk#";
    const CLASS_DONGMAN = "kltvv#id##mz#全部##kkkk#kltvv#id#最新#mz#最新##kkkk#kltvv#id#热血#mz#热血##kkkk#kltvv#id#科幻#mz#科幻##kkkk#kltvv#id#美少女#mz#美少女##kkkk#kltvv#id#魔幻#mz#魔幻##kkkk#kltvv#id#经典#mz#经典##kkkk#kltvv#id#励志#mz#励志##kkkk#kltvv#id#少儿#mz#少儿##kkkk#kltvv#id#冒险#mz#冒险##kkkk#kltvv#id#搞笑#mz#搞笑##kkkk#kltvv#id#推理#mz#推理##kkkk#kltvv#id#恋爱#mz#恋爱##kkkk#kltvv#id#治愈#mz#治愈##kkkk#kltvv#id#校园#mz#校园##kkkk#kltvv#id#机战#mz#机战##kkkk#kltvv#id#亲子#mz#亲子##kkkk#kltvv#id#儿歌#mz#儿歌##kkkk#kltvv#id#运动#mz#运动##kkkk#kltvv#id#悬疑#mz#悬疑##kkkk#kltvv#id#怪物#mz#怪物##kkkk#kltvv#id#战争#mz#战争##kkkk#kltvv#id#益智#mz#益智##kkkk#kltvv#id#青春#mz#青春##kkkk#kltvv#id#童话#mz#童话##kkkk#kltvv#id#竞技#mz#竞技##kkkk#kltvv#id#动作#mz#动作##kkkk#kltvv#id#社会#mz#社会##kkkk#kltvv#id#其他#mz#其他##kkkk#";
    let classes = [
        { type_id: '1', type_name: '电影' },
        { type_id: '2', type_name: '连续剧' },
        { type_id: '3', type_name: '综艺' },
        { type_id: '4', type_name: '动漫' }
    ];
    let defaultYear = "kltvv#id##mz#全部##kkkk#kltvv#id#2023#mz#2023##kkkk#kltvv#id#2022#mz#2022##kkkk#kltvv#id#2021#mz#2021##kkkk#kltvv#id#2020#mz#2020##kkkk#kltvv#id#2019#mz#2019##kkkk#kltvv#id#2018#mz#2018##kkkk#kltvv#id#2017#mz#2017##kkkk#kltvv#id#2016#mz#2016##kkkk#kltvv#id#2015#mz#2015##kkkk#kltvv#id#2014#mz#2014##kkkk#kltvv#id#2013#mz#2013##kkkk#kltvv#id#2012#mz#2012##kkkk#kltvv#id#2011#mz#2011##kkkk#kltvv#id#2010#mz#2010##kkkk#kltvv#id#2009#mz#2009##kkkk#kltvv#id#2008#mz#2008##kkkk#kltvv#id#2007#mz#2007##kkkk#";
    let parsedYear = parseFilterStr(filterYearStr || defaultYear);
    let filterObj = {
        "1": [{ key: 'class', name: '分类', init: '', value: parseFilterStr(CLASS_MOVIE) }, { key: 'year', name: '年份', init: '', value: parsedYear }],
        "2": [{ key: 'class', name: '分类', init: '', value: parseFilterStr(CLASS_TV) }, { key: 'year', name: '年份', init: '', value: parsedYear }],
        "3": [{ key: 'class', name: '分类', init: '', value: parseFilterStr(CLASS_ZONGYI) }, { key: 'year', name: '年份', init: '', value: parsedYear }],
        "4": [{ key: 'class', name: '分类', init: '', value: parseFilterStr(CLASS_DONGMAN) }, { key: 'year', name: '年份', init: '', value: parsedYear }]
    };
    return JSON.stringify({ class: classes, filters: filterObj });
}

async function homeVod() {
    return JSON.stringify({ list: homeVodList });
}

async function category(tid, pg, filter, extend) {
    try {
        let baseUrl = HOST || FALLBACK_HOST;
        let url = `${baseUrl}ysapi/api.php?vid=2&id=${tid}&page=${pg}`;
        if (extend.year) url += `&year=${extend.year}`;
        if (extend.class) url += `&class=${rc4EncryptHex('kltvv', extend.class)}`;
        let headers = Object.assign({ 'Referer': `${baseUrl}ysapi/api.php?vid=2&id=${tid}&page=${pg}` }, DEFAULT_HEADERS);
        let res = await req(url, { headers: headers, method: 'get' });
        let hexMatch = res.content.match(/api#([0-9a-fA-F]+)#/);
        if (!hexMatch) return JSON.stringify({ list: [], page: parseInt(pg), pagecount: pg });
        let decryptedStr = decodeURIComponent(rc4Decrypt('kltvv', hexMatch[1])).trim();
        let list = parseItemList(decryptedStr);
        return JSON.stringify({
            page: parseInt(pg),
            pagecount: list.length > 0 ? parseInt(pg) + 1 : parseInt(pg),
            limit: 20, total: 9999, list: list
        });
    } catch (e) {
        return JSON.stringify({ list: [], page: parseInt(pg), pagecount: pg });
    }
}

async function search(wd, quick, pg = 1) {
    try {
        let baseUrl = HOST || FALLBACK_HOST;
        let url = `${baseUrl}ysapi/ss.php?id=${encodeURIComponent(wd)}&from=`;
        let res = await req(url, { headers: { 'User-Agent': 'Apache-HttpClient/UNAVAILABLE (java 1.4)' }, method: 'get' });
        let hexMatch = res.content.match(/api#([0-9a-fA-F]+)#/);
        if (!hexMatch) return JSON.stringify({ list: [], page: 1, pagecount: 1 });
        let decryptedStr = decodeURIComponent(rc4Decrypt('kltvv', hexMatch[1])).trim();
        let list = parseItemList(decryptedStr);
        return JSON.stringify({ page: 1, pagecount: 1, limit: list.length, total: list.length, list: list });
    } catch (e) {
        return JSON.stringify({ list: [], page: 1, pagecount: 1 });
    }
}

async function detail(id) {
    try {
        let baseUrl = HOST || FALLBACK_HOST;
        let url = `${baseUrl}ysapi/id.php?vid=2&id=${id}`;
        let headers = Object.assign({ 'Referer': baseUrl, 'Content-Type': 'application/x-www-form-urlencoded' }, DEFAULT_HEADERS);
        let res = await req(url, { headers: headers, method: 'get' });
        let hexMatch = res.content.match(/api#([0-9a-fA-F]+)#/);
        if (!hexMatch) return JSON.stringify({ list: [] });
        let decryptedStr = decodeURIComponent(rc4Decrypt('kltvv', hexMatch[1])).trim();
        let jsonObj = JSON.parse(decryptedStr);
        if (jsonObj && jsonObj.list && jsonObj.list.length > 0) {
            let vod = jsonObj.list[0];
            return JSON.stringify({
                list: [{
                    vod_id: vod.vod_id, vod_name: vod.vod_name, vod_pic: vod.vod_pic,
                    type_name: vod.type_name, vod_year: vod.vod_year, vod_area: vod.vod_area,
                    vod_remarks: vod.vod_remarks, vod_actor: vod.vod_actor, vod_director: vod.vod_director,
                    vod_content: vod.vod_content, vod_play_from: vod.vod_play_from, vod_play_url: vod.vod_play_url
                }]
            });
        }
        return JSON.stringify({ list: [] });
    } catch (e) {
        return JSON.stringify({ list: [] });
    }
}

async function play(flag, id, flags) {
    try {
        let jx = /iqiyi|qq|youku|mgtv|bilibili/.test(id) ? 1 : 0;
        return JSON.stringify({
            parse: 0,
            jx: jx,
            url: id,
            header: { 'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36' }
        });
    } catch (e) {
        return JSON.stringify({ parse: 0, url: id });
    }
}

const _HEX_MAP = new Array(256);
for (let i = 0; i < 256; i++) {
    _HEX_MAP[i] = (i < 16 ? '0' : '') + i.toString(16);
}

function strToUtf8Bytes(str) {
    let encoded = encodeURIComponent(str);
    let bytes = new Uint8Array(encoded.length);
    let idx = 0;
    for (let i = 0; i < encoded.length; i++) {
        if (encoded[i] === '%') {
            bytes[idx++] = parseInt(encoded.substring(i + 1, i + 3), 16);
            i += 2;
        } else {
            bytes[idx++] = encoded.charCodeAt(i);
        }
    }
    return bytes.slice(0, idx);
}

function utf8BytesToStr(bytes) {
    if (typeof TextDecoder !== 'undefined') {
        return new TextDecoder().decode(bytes);
    }
    let escaped = '';
    for (let i = 0; i < bytes.length; i++) {
        escaped += '%' + _HEX_MAP[bytes[i]];
    }
    try {
        return decodeURIComponent(escaped);
    } catch (e) {
        return "";
    }
}

function _initRC4SBox(key) {
    let s = new Uint8Array(256);
    for (let i = 0; i < 256; i++) s[i] = i;
    let j = 0, x;
    let keyLen = key.length;
    for (let i = 0; i < 256; i++) {
        j = (j + s[i] + key.charCodeAt(i % keyLen)) & 255;
        x = s[i]; s[i] = s[j]; s[j] = x;
    }
    return s;
}

function rc4EncryptHex(key, str) {
    let bytes = strToUtf8Bytes(str);
    let s = _initRC4SBox(key);
    let i = 0, j = 0, x, res = '';
    for (let y = 0; y < bytes.length; y++) {
        i = (i + 1) & 255;
        j = (j + s[i]) & 255;
        x = s[i]; s[i] = s[j]; s[j] = x;
        res += _HEX_MAP[bytes[y] ^ s[(s[i] + s[j]) & 255]];
    }
    return res;
}

function rc4Decrypt(key, hexStr) {
    let s = _initRC4SBox(key);
    let i = 0, j = 0, x;
    let len = hexStr.length / 2;
    let decryptedBytes = new Uint8Array(len);
    for (let y = 0; y < len; y++) {
        let charCode = parseInt(hexStr.substring(y * 2, y * 2 + 2), 16);
        i = (i + 1) & 255;
        j = (j + s[i]) & 255;
        x = s[i]; s[i] = s[j]; s[j] = x;
        decryptedBytes[y] = charCode ^ s[(s[i] + s[j]) & 255];
    }
    return utf8BytesToStr(decryptedBytes);
}

function parseItemList(decryptedStr) {
    let list = [];
    let items = decryptedStr.split('##kkkk#');
    for (let item of items) {
        if (!item || !item.includes('id#')) continue;
        let idMatch = item.match(/id#([^#]*)/);
        let nameMatch = item.match(/mz#([^#]*)/);
        if (idMatch && nameMatch) {
            let picMatch = item.match(/tp#([^#]*)/);
            let remarkMatch = item.match(/dsz#([^#]*)/);
            list.push({
                vod_id: idMatch[1],
                vod_name: nameMatch[1],
                vod_pic: picMatch ? picMatch[1] : '',
                vod_remarks: remarkMatch ? remarkMatch[1] : ''
            });
        }
    }
    return list;
}

function parseFilterStr(str) {
    let arr = [];
    let items = str.split('##kkkk#');
    for (let item of items) {
        if (!item.includes('id#')) continue;
        let idMatch = item.match(/id#([^#]*)/);
        let nameMatch = item.match(/mz#([^#]*)/);
        if (idMatch && nameMatch) {
            arr.push({ n: nameMatch[1] || '全部', v: idMatch[1] });
        }
    }
    return arr;
}

export function __jsEvalReturn() {
    return {
        init: init,
        home: home,
        homeVod: homeVod,
        category: category,
        search: search,
        detail: detail,
        play: play
    };
}
