
// ダウンロードボタンがクリックされたときのイベント
document.getElementById('csvDownload').addEventListener('click', function() {
    try {
        console.log('click')
        let character = document.querySelector('input[type="radio"][name="fileType"]:checked').value
        if (character === 'other') {
            character = document.getElementById('otherInput').value
        }
        if (!character) {
            throw new Error('キャラクター名が入力されていません。');
        }

        let text = ""
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            chrome.scripting.executeScript({
                target: { tabId: tabs[0].id },
                function: getText
            }, (injectionResults) => {
                text = injectionResults[0].result;
            });
        });
        console.log('clicked')

        if (!text) {
            throw new Error('記事要素がページに存在しません。');
        }
        let lines = text.split('\n')
        let csvContent = lines.map(line => line.trim()).filter(line => line).map(line => `${character},${line}`).join('\n')
        downloadCSV(csvContent, `${document.getElementsByTagName("Title")[0].innerText}.csv`)
        console.log('downloaded')

    } catch (error) {
        alert(`click時エラーが発生しました:${error}`);
    }
})

// ラジオボタンが変更されたときのイベント
document.querySelectorAll('input[type="radio"][name="fileType"]').forEach(function (radio) {
    radio.addEventListener('change', function () {
        try {
            console.log('change')
            // 「その他」が選択された場合、テキスト入力を活性化
            document.getElementById('otherInput').disabled = radio.value !== 'other' || !radio.checked

            console.log('change')

        } catch (error) {
            alert(`change時エラーが発生しました:${error}`);
        }
    })
})

function getText() {
    return document.getElementById("article").innerText
}

// CSVファイルをダウンロードする関数
function downloadCSV(content, fileName) {
    let blob = new Blob([content], { type: 'text/csvcharset=utf-8' })
    let link = document.createElement('a')
    let url = URL.createObjectURL(blob)
    link.setAttribute('href', url)
    link.setAttribute('download', fileName)
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
}