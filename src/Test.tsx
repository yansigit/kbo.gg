import {useEffect, useState} from "react";

export default function Test() {

    const [htmlString, setHtmlString] = useState('empty')

    useEffect(() => {
        fetch('http://www.koreabaseball.com/Game/LiveTextView2.aspx', {
            method: 'POST',
            headers: {
                'Content-Type': '*/*'
            },
            body: 'leagueId=1&seriesId=0&gameId=20210601KTLG0&gyear=2021'
        }).then(response => setHtmlString(String(response)))
    }, [])

    return (
        <h2>{htmlString}</h2>
    )
}