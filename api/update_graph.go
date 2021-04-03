package handler

import (
	"encoding/json"
	"fmt"
	"github.com/kamva/mgm/v3"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo/options"
	"kbogg.imyoon.tech/lib"
	"log"
	"math/rand"
	"net/http"
	"time"
)

type updateGraphJsonParams struct {
	GameId        string    `json:"gameId"`
	AwayTeamGraph lib.Graph `json:"awayTeamGraph"`
	HomeTeamGraph lib.Graph `json:"homeTeamGraph"`
}

type graphReturnFormat struct {
	AwayTeamGraph lib.Graph `json:"awayTeamGraph"`
	HomeTeamGraph lib.Graph `json:"homeTeamGraph"`
}

func init() {
	err := mgm.SetDefaultConfig(nil, "KBOGG_GAME", options.Client().ApplyURI("mongodb+srv://capstone:itit2021@kbo-gg.txhj8.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"))
	if err != nil {
		log.Println(err)
		log.Fatal("몽고디비 연결에 문제가 있습니다")
	}
	rand.Seed(time.Now().UnixNano())
}

func UPDATE_GRAPH(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Cache-Control", "no-cache, no-store, must-revalidate")
	w.Header().Set("Content-Type", "application/json")

	var params updateGraphJsonParams
	decoder := json.NewDecoder(r.Body)
	decoder.DisallowUnknownFields()
	err := decoder.Decode(&params)
	if err != nil {
		log.Fatal("JSON을 파싱하는데 문제가 있습니다")
	}

	game := &lib.Game{}
	err = mgm.Coll(game).First(bson.M{"gameId": params.GameId}, game)
	if err != nil {
		log.Fatal("몽고DB에서 문서를 찾는데 문제가 있습니다")
	}

	game.AwayTeam.GraphData.X = append(game.AwayTeam.GraphData.X, params.AwayTeamGraph.X...)
	game.HomeTeam.GraphData.X = append(game.HomeTeam.GraphData.X, params.HomeTeamGraph.X...)
	game.AwayTeam.GraphData.Y = append(game.AwayTeam.GraphData.Y, params.AwayTeamGraph.Y...)
	game.HomeTeam.GraphData.Y = append(game.HomeTeam.GraphData.Y, params.HomeTeamGraph.Y...)

	err = mgm.Coll(game).Update(game)
	if err != nil {
		log.Fatal("몽고DB를 업데이트 하는데 문제가 있습니다")
	}

	returnValue := graphReturnFormat{
		AwayTeamGraph: game.AwayTeam.GraphData,
		HomeTeamGraph: game.HomeTeam.GraphData,
	}

	jsonBytes, err := json.Marshal(returnValue)
	fmt.Fprint(w, string(jsonBytes))

	_, client, _, err := mgm.DefaultConfigs()
	if err != nil {
		panic(err)
	}
	err = client.Disconnect(mgm.Ctx())
	if err != nil {
		log.Fatal("몽고DB 커넥션을 종료 하는데 문제가 있습니다")
	}
}
