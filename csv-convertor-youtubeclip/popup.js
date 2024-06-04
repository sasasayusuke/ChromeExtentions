let transcriptText = []
// ロード時のイベント
document.addEventListener('DOMContentLoaded', async function () {
    try {
        getTranscriptText(true)


        // ダウンロードボタンがクリックされたときのイベント
        document.getElementById('clippedTranscript').addEventListener('click', async function () {
            try {
                console.log('click');
                if (commonIsNull(transcriptText)) {
                    transcriptText = getTranscriptText()
                }
                // クリップボードへコピー
                await navigator.clipboard.writeText(transcriptText)
                // テキストエリアへ格納
                document.getElementById('clippedText').innerText = transcriptText
                // 結果をコンソールに出力
                console.log(transcriptText);


            } catch (error) {
                alert(`click時エラーが発生しました:${error}`);
            }
        });
    } catch (error) {
        alert(`load時エラーが発生しました:${error}`);
    }
});

async function getTranscriptText(first = false) {
    await commonGetContentsFromActiveTab(() => document.querySelector('[aria-label="文字起こしを表示"], [aria-label="Show transcript"], [aria-label="showScript"]').click())
    if (first) {
        return
    }
    transcriptText = await commonGetContentsFromActiveTab(() => Array.from(document.getElementsByClassName("segment style-scope ytd-transcript-segment-renderer"))
        .map(v => v.innerText)
        .flatMap(v => v.split('\n'))
    )
    if (commonIsNull(transcriptText) ) {
        alert("トランスクリプトセグメントが取得できませんでした。");
        return;
    }

    return transcriptText

}