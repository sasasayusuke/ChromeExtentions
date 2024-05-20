// ロード時のイベント
document.addEventListener('DOMContentLoaded', function () {
    try {
        const characters = [
            { name: '四国めたん', priority: 80, firstChoice: true },
            { name: 'ずんだもん', priority: 70 },
            { name: '春日部つむぎ', priority: 60 },
            { name: '玄野武宏', priority: 50 },
            { name: '白上虎太郎', priority: 50 },
            { name: '青山龍星', priority: 40 },
            { name: '剣崎雌雄', priority: 40 },
            { name: '女声1', priority: 30 },
            { name: '女声2', priority: 30 },
        ];

        const dictionary = [
            { original: '大谷', converted: 'おおたに' },
            { original: '俺等', converted: 'おれら' },
            { original: 'わい等', converted: 'わいら' },
            { original: 'ワイ等', converted: 'わいら' },
        ];

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
                let csvLines = rows.map(convertArrayToCSV);
                let csvForCanva = csvLines.join('\n');

                // ページのタイトルをファイル名として使用
                downloadCSV(csvForCanva, `${title}_Canva.csv`);
                console.log('Canva Csv downloaded');

                // 2行目以降のcsv各行を処理
                csvLines.slice(1).forEach((line) => {
                    // lineをカンマで分割し、各部分を配列に変換する
                    const parts = line.split(",");
                    parts.forEach((part, index) => {
                        // ここで各部分を処理するコードを書く
                        console.log(`Line: ${line}, Part ${index + 1}: ${part}`);
                    });
                });

            } catch (error) {
                alert(`click時エラーが発生しました:${error}`);
            }
        });
    } catch (error) {
        alert(`load時エラーが発生しました:${error}`);
    }
});

// 重み付きランダムでキャラクターを選ぶ関数
function getRandomCharacter(characters) {
    // priority の合計を計算
    let totalPriority = characters.reduce((sum, character) => sum + character.priority, 0);

    // 0 から totalPriority までのランダムな数値を生成
    let randomValue = Math.random() * totalPriority;

    // ランダム値に基づいてキャラクターを選択
    for (const character of characters) {
        if (randomValue < character.priority) {
            return character;
        }
        randomValue -= character.priority;
    }
}