import React, {useLayoutEffect, useState} from "react";
import {MainHeader} from "../../components/MainHeader";
import {Jumbotron, ListGroup, Row} from "react-bootstrap";
import MainFooter from "../../components/MainFooter";
import './main.scss';
import {gameListState} from "../../states/states";
import {useRecoilState} from "recoil";
import {Redirect} from "react-router-dom";
import GameListTable from "../../components/GameListTable";

export default function Main() {

    const [searchValue, setSearchValue] = useState("");
    const [gameList, setGameList] = useRecoilState(gameListState);

    useLayoutEffect(() => {
        fetch("/api/game_list?recent=1").then(res => res.json()).then(json => setGameList(json))
    });

    const RecentListArray = () => {
        return gameList.map((game, index) => {
            return <ListGroup.Item key={index}><a href={"/game/" + game.id}>{game.id}</a></ListGroup.Item>
        })
    }

    const goToGame = (gameId: string) => {
        return <Redirect to={"/game/" + gameId}/>
    }

  return (
      <div className="app">
          <MainHeader/>

          <div className="w-100 notification-bar text-center py-2">
              <h5>(공지) 현재 두산 VS 삼성 매치가 진행중입니다</h5>{' '}<a href="/game/test">[바로가기]</a>
          </div>

          <Jumbotron id="main-search-jumbotron" className="rounded-0 text-center mb-0" fluid>
              <h3 className="text-white font-weight-bold">다음 경기일정</h3>
              {/*<InputGroup>*/}
              {/*  <FormControl*/}
              {/*      placeholder="게임 검색"*/}
              {/*      aria-label="게임 검색"*/}
              {/*      aria-describedby="basic-addon2"*/}
              {/*      value={searchValue}*/}
              {/*      onChange={(event) => setSearchValue(event.currentTarget.value)}*/}
              {/*  />*/}
              {/*  <InputGroup.Append>*/}
              {/*    <Link to={"/game/" + searchValue} className="btn btn-warning">검색</Link>*/}
              {/*  </InputGroup.Append>*/}
              {/*</InputGroup>*/}

              <Row>
                  <GameListTable gameList={gameList}/>
              </Row>

          </Jumbotron>

        <MainFooter />
      </div>
  );
}