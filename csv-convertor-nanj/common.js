
// 現在のアクティブなタブから任意のテキストを非同期で取得する関数
async function getContentsFromActiveTab(func) {
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


// CSVファイルをダウンロードする関数（CSVファイルのタイプ指定の間違いを修正）
function downloadCSV(content, fileName) {
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
function processArray(arr, shouldSwap) {
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
function containsReply(text) {
    // 正規表現パターン
    const regex = />>\d+/
    return regex.test(text);
}
