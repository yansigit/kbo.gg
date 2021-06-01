import React, {useEffect} from "react";
import {MainHeader} from "../../components/MainHeader";
import {Jumbotron, Row} from "react-bootstrap";
import MainFooter from "../../components/MainFooter";
import './main.scss';
import {gameListState} from "../../states/states";
import {useRecoilState} from "recoil";
import GameListTable from "../../components/GameListTable";

export default function Main() {

    const [gameList, setGameList] = useRecoilState(gameListState);

    useEffect(() => {
        fetch("/api/game_list?recent=1").then(res => res.json()).then(json => setGameList(json))
    }, []);

  return (
      <div className="app">
          <MainHeader/>

          {/*<div className="w-100 notification-bar text-center py-2">*/}
          {/*    <h5>(공지) 현재 두산 VS 삼성 매치가 진행중입니다</h5>{' '}<a href="/game/test">[바로가기]</a>*/}
          {/*</div>*/}

          <Jumbotron id="main-search-jumbotron" className="rounded-0 text-center mb-0" fluid>
              <h3 className="text-white font-weight-bold">다음 경기일정</h3>

              <Row>
                  <GameListTable gameList={gameList}/>
              </Row>

          </Jumbotron>

        <MainFooter />
      </div>
  );
}