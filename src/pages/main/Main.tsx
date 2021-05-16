import React, {useState} from "react";
import {MainHeader} from "../../components/MainHeader";
import {Jumbotron, ListGroup, Row, Table} from "react-bootstrap";
import MainFooter from "../../components/MainFooter";
import './main.scss';
import {gameListState} from "../../states/states";
import {useRecoilState} from "recoil";
import {Redirect} from "react-router-dom";

export default function Main() {

    const [searchValue, setSearchValue] = useState("");
    const [gameList, setGameList] = useRecoilState(gameListState);
    const [init, setInit] = useState(true);

    if (init) {
        fetch("/api/game_list?recent=1").then(res => res.json()).then(json => setGameList(json))
        setInit(false)
    }

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
                  <Table striped bordered hover variant="light">
                      <thead>
                      <tr>
                          <th>날짜</th>
                          <th>시간</th>
                          <th>구장</th>
                          <th>경기</th>
                      </tr>
                      </thead>
                      <tbody>
                      {
                          gameList.map((game, index) => {
                              let [date, time] = game.gameDate.split('T')
                              if (time)
                                  time = time.substr(0, 5)
                              return <tr>
                                  <td>{date}</td>
                                  <td>{time}</td>
                                  <td>{game.gameStadium}</td>
                                  <td>{game.awayTeam.team_name} VS {game.homeTeam.team_name}</td>
                              </tr>
                          })
                      }
                      </tbody>
                  </Table>
              </Row>

          </Jumbotron>

        <MainFooter />
      </div>
  );
}