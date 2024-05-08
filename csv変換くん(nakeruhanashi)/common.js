
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
