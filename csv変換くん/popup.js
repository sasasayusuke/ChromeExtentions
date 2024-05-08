// ロード時のイベント
document.addEventListener('DOMContentLoaded', function () {
    // 変数の定義
    const radioOptions = [
        { id: 'typeA', value: '【ほのぼの】男1', label: '【ほのぼの】男1', checked: true },
        { id: 'typeB', value: '【ほのぼの】女1', label: '【ほのぼの】女1', checked: false },
        { id: 'typeC', value: 'other', label: 'その他', checked: false }
    ];

    // ラジオボタンとラベルの生成
    radioOptions.forEach(option => {
        let container = document.createElement('div');

        let radioInput = document.createElement('input');
        radioInput.type = 'radio';
        radioInput.id = option.id;
        radioInput.name = 'fileType';
        radioInput.value = option.value;
        radioInput.checked = option.checked;

        let label = document.createElement('label');
        label.htmlFor = option.id;
        label.textContent = option.label;

        container.appendChild(radioInput);
        container.appendChild(label);
        document.getElementById('fileTypeForm').appendChild(container);
    });
});


// ダウンロードボタンがクリックされたときのイベント
document.getElementById('csvDownload').addEventListener('click', async function() {
    try {
        console.log('click');
        let character = document.querySelector('input[type="radio"][name="fileType"]:checked').value;
        if (character === 'other') {
            character = document.getElementById('otherInput').value;
        }
        if (!character) {
            throw new Error('キャラクター名が入力されていません。');
        }

        let text = await getTextFromActiveTab();

        if (!text) {
            throw new Error('記事要素がページに存在しません。');
        }
        let lines = text.split('\n');
        let csvContent = lines.map(line => line.trim()).filter(line => line).map(line => `${character},${line}`).join('\n');
        downloadCSV(csvContent, `${document.getElementsByTagName("title")[0].innerText}.csv`);
        console.log('downloaded');

    } catch (error) {
        alert(`click時エラーが発生しました:${error}`);
    }
});

// 現在のアクティブなタブからテキストを非同期で取得する関数
async function getTextFromActiveTab() {
    return new Promise((resolve, reject) => {
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            chrome.scripting.executeScript({
                target: { tabId: tabs[0].id },
                func: () => document.getElementById("article").innerText
            }, (injectionResults) => {
                if (chrome.runtime.lastError || !injectionResults || !injectionResults[0]) {
                    reject(new Error('テキストの取得に失敗しました'));
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
