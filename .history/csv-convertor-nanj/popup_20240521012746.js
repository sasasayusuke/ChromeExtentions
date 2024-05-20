// ロード時のイベント
document.addEventListener('DOMContentLoaded', function () {
    try {

        const headers = ["first", "second", "third"];

        // ダウンロードボタンがクリックされたときのイベント
        document.getElementById('csvDownload').addEventListener('click', async function () {
            try {
                console.log('click');
                let lines = await getContentsFromActiveTab(() => Array.from(document.getElementsByClassName("t_b")).map(element => element.innerText));

                if (!lines) {
                    throw new Error('記事要素がページに存在しません。');
                }

                // ヘッダーとデフォルトの行を設定
                let rows = [headers];  // ヘッダーを先頭に追加
                let title = await getContentsFromActiveTab(() => document.getElementsByTagName("title")[0].innerText)
                // URLを新しい行に設定して追加
                let urlRow = [title, window.location.href]
                rows.push(urlRow);

                // 各行にデータを均等に配置する処理
                for (let i = 0; i < lines.length; i++) {
                    let columnIndex = i % headers.length;
                    if (columnIndex === 0) {
                        rows.push([]);
                    }
                    rows[rows.length - 1][columnIndex] = lines[i];
                }

                // 改行を含むデータも正しく扱えるように、各行を上記の関数で処理
                let csvForCanva = rows.map(convertArrayToCSV).join('\n');

                // ページのタイトルをファイル名として使用
                downloadCSV(csvForCanva, `Canva_${title}.csv`);
                console.log('Canva Csv downloaded');

                let firstFlg = true
                let convertedLines = []

                // 2行目以降のcsv各行を処理
                for (let i = 2; i < rows.length; i++) {
                    let selected = []
                    for (let text of rows[i]) {
                        let selectedCharacter = getRandomCharacter(selected, firstFlg);
                        selected.push(selectedCharacter)
                        let replacedText = replaceText(text);
                        text.split('\n').forEach(line => {
                            line
                        })

                        firstFlg = false;
                        convertedLines.push([selectedCharacter, replacedText])
                    }
                }
                let csvForVoiceVox = convertedLines.map(convertArrayToCSV).join('\n');

                // ページのタイトルをファイル名として使用
                downloadCSV(csvForVoiceVox, `VoiceVox_${title}.csv`);
                console.log('VoiceVox Csv downloaded');

            } catch (error) {
                alert(`click時エラーが発生しました:${error}`);
            }
        });
    } catch (error) {
        alert(`load時エラーが発生しました:${error}`);
    }
})

function getRandomCharacter(excludeNames = [], firstChoice = false) {
    const characters = [
        { name: '四国めたん', priority: 70, firstChoice: true },
        { name: 'ずんだもん', priority: 60 },
        { name: '春日部つむぎ', priority: 50 },
        { name: '玄野武宏', priority: 50 },
        { name: '白上虎太郎', priority: 50 },
        { name: '青山龍星', priority: 40 },
        { name: '剣崎雌雄', priority: 40 },
        { name: '女声1', priority: 30 },
        { name: '女声2', priority: 30 },
        { name: '女声3', priority: 30 },
        { name: '男声1', priority: 30 },
    ];

    // 除外キャラクターを取り除いた新しいリストを作成
    let filteredCharacters = characters.filter(character => !excludeNames.includes(character.name));

    // 除外キャラクターを取り除いたリストが空でないかチェック
    if (filteredCharacters.length == 0) {
        throw new Error("すべてのキャラクターが除外されているため選択できません");
    }

    // firstChoice が true の場合、firstChoice フラグが設定されたキャラクターを返す
    if (firstChoice) {
        let firstChoiceCharacter = filteredCharacters.find(character => character.firstChoice);
        if (firstChoiceCharacter) {
            return firstChoiceCharacter.name;
        }
    }

    // priority の合計を計算
    let totalPriority = filteredCharacters.reduce((sum, character) => sum + character.priority, 0);

    // 0 から totalPriority までのランダムな数値を生成
    let randomValue = Math.random() * totalPriority;

    // ランダム値に基づいてキャラクターを選択
    for (const character of filteredCharacters) {
        if (randomValue < character.priority) {
            return character.name;
        }
        randomValue -= character.priority;
    }
}

// 辞書を使ってテキストを置換する関数
function replaceText(text) {
    const dictionary = [
        { original: '大谷', converted: 'おおたに' },
        { original: '一平', converted: 'いっぺい' },
        { original: '俺等', converted: 'おれら' },
        { original: 'わい等', converted: 'わいら' },
        { original: 'ワイ等', converted: 'わいら' },
    ];

    dictionary.forEach(entry => {
        let regex = new RegExp(entry.original, 'g');
        text = text.replace(regex, entry.converted);
    });
    return text;
}