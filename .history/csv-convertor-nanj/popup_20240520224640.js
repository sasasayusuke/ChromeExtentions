// ロード時のイベント
document.addEventListener('DOMContentLoaded', function () {
    try {
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

                // CSV形式の文字列に変換する関数
                function toCSVLine(arr) {
                    return arr.map(text => `"${text.replace(/"/g, '""')}"`).join(',');
                }

                // 改行を含むデータも正しく扱えるように、各行を上記の関数で処理
                let csvContent = rows.map(toCSVLine).join('\n');

                // ページのタイトルをファイル名として使用
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
