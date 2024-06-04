
// 現在のアクティブなタブから任意のテキストを非同期で取得する関数
async function commonGetContentsFromActiveTab(func) {
    return new Promise((resolve, reject) => {
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            chrome.scripting.executeScript({
                target: { tabId: tabs[0].id },
                func: func  // 関数を直接引数として使用
            }, (injectionResults) => {
                if (chrome.runtime.lastError || !injectionResults || !injectionResults[0]) {
                    reject(new Error('テキストの取得に失敗しました: ' + chrome.runtime.lastError.message));
                } else {
                    resolve(injectionResults[0].result);
                }
            });
        });
    });
}

/**
 * Null判定する関数です。
 * @param {object} obj オブジェクト
 *
 * @return {boolean} 判定結果
 */
function commonIsNull(obj) {
    if (Array.isArray(obj)) {
        return obj.filter(v => String(v).trim() !== '').length == 0
    } else if (typeof obj === 'object') {
        return !obj || Object.keys(obj).length === 0 && obj.constructor === Object
    } else {
        return !obj && obj !== 0 || String(obj).trim() == ''
    }
}

// CSV形式の文字列に変換する関数
function commonConvertArrayToCSV(arr) {
    return arr.map(text => `"${text.replace(/"/g, '""')}"`).join(',');
}


// CSVファイルをダウンロードする関数（CSVファイルのタイプ指定の間違いを修正）
function commonDownloadCSV(content, fileName) {
    let blob = new Blob([content], { type: 'text/csv; charset=utf-8' });
    let link = document.createElement('a');
    let url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', fileName);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

// 任意の判定関数を使用して配列要素を入れ替える
function commonProcessArray(arr, shouldSwap) {
    // 元の配列をコピーして逆順にする
    const result = [...arr].reverse();
    for (let i = 1; i < result.length; i++) {
        if (shouldSwap(result[i])) {
            // 前の要素と入れ替え
            [result[i - 1], result[i]] = [result[i], result[i - 1]];
        }
    }
    // 再び逆順にして元の順序に戻す
    return result.reverse();
}
// 返信が文字列に含まれているかどうかを判定
function commonContainsReply(text) {
    // 正規表現パターン
    const regex = />>\d+/
    return regex.test(text);
}
