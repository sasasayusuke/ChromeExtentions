// ロード時のイベント
document.addEventListener('DOMContentLoaded', function () {
    try {
        const dictionary = [
            { original: '大谷', converted: 'おおたに' },
        ];

        characters.forEach(option => {
            let container = document.createElement('div');
            container.className = 'radio-group' + (option.isOther ? ' flex-row' : ''); // Flexboxスタイルを適用

            let radioInput = document.createElement('input');
            radioInput.type = 'radio';
            radioInput.id = option.id;
            radioInput.name = 'characterType';
            radioInput.value = option.value;
            radioInput.checked = option.checked;

            let label = document.createElement('label');
            label.htmlFor = option.id;
            label.textContent = option.label;

            container.appendChild(radioInput);
            container.appendChild(label);

            if (option.isOther) {
                let otherInput = document.createElement('input');
                otherInput.type = 'text';
                otherInput.id = 'otherInput';
                otherInput.placeholder = 'キャラクター名を入力';
                otherInput.disabled = true; // 最初は無効化
                container.appendChild(otherInput);
            }

            document.getElementById('characterForm').appendChild(container);
        });


        // ラジオボタンが変更されたときのイベント
        document.querySelectorAll('input[type="radio"][name="characterType"]').forEach(function (radio) {
            radio.addEventListener('change', function () {
                try {
                    console.log('change')
                    // 「その他」が選択された場合、テキスト入力を活性化
                    document.getElementById('otherInput').disabled = radio.value !== 'other' || !radio.checked

                    console.log('changed')

                } catch (error) {
                    alert(`change時エラーが発生しました:${error}`);
                }
            })
        })

        // ダウンロードボタンがクリックされたときのイベント
        document.getElementById('csvDownload').addEventListener('click', async function() {
            try {
                console.log('click');
                let character = document.querySelector('input[type="radio"][name="characterType"]:checked').value;
                if (character === 'other') {
                    character = document.getElementById('otherInput').value;
                }
                if (!character) {
                    throw new Error('キャラクター名が入力されていません。');
                }

                let text = await getContentsFromActiveTab(() => document.getElementById("article").innerText);

                if (!text) {
                    throw new Error('記事要素がページに存在しません。');
                }
                let lines = text.split('\n');
                let csvContent = lines.map(line => line.trim()).filter(line => line).map(line => `${character},${line}`).join('\n')
                let title = await getContentsFromActiveTab(() => document.getElementsByTagName("title")[0].innerText);
                downloadCSV(csvContent, `${title}.csv`);
                console.log('downloaded');

            } catch (error) {
                alert(`click時エラーが発生しました:${error}`);
            }
        });
    } catch (error) {
        alert(`load時エラーが発生しました:${error}`);
    }
});
