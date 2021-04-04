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
	GameId string    `json:"gameId"`
	Graph  lib.Graph `json:"graph"`
}

type graphReturnFormat struct {
	UpdatedGraph lib.Graph `json:"updatedGraph"`
}

func init() {
	err := mgm.SetDefaultConfig(nil, "KBOGG_GAME", options.Client().ApplyURI("mongodb+srv://capstone:itit2021@kbo-gg.txhj8.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"))
	if err != nil {
		log.Println(err)
		panic("몽고디비 연결에 문제가 있습니다")
	}
	rand.Seed(time.Now().UnixNano())
}

func UPDATE_GRAPH(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Cache-Control", "no-cache, no-store, must-revalidate")
	w.Header().Set("Content-Type", "application/json")

	defer lib.MongoDisconnect()

	var params updateGraphJsonParams
	decoder := json.NewDecoder(r.Body)
	decoder.DisallowUnknownFields()
	err := decoder.Decode(&params)
	if err != nil {
		fmt.Fprint(w, lib.ErrorAsJsonString("JSON을 파싱할 수 없습니다"))
		return
	}

	game := &lib.Game{}
	err = mgm.Coll(game).First(bson.M{"gameId": params.GameId}, game)
	if err != nil {
		fmt.Fprint(w, lib.ErrorAsJsonString("문서를 찾을 수 없습니다"))
		return
	}

	game.GraphData.X = append(game.GraphData.X, params.Graph.X...)
	game.GraphData.Y1 = append(game.GraphData.Y1, params.Graph.Y1...)
	game.GraphData.Y2 = append(game.GraphData.Y2, params.Graph.Y2...)

	err = mgm.Coll(game).Update(game)
	if err != nil {
		fmt.Fprint(w, lib.ErrorAsJsonString("문서를 업데이트 할 수 없습니다"))
		return
	}

	returnValue := graphReturnFormat{
		UpdatedGraph: game.GraphData,
	}

	jsonBytes, err := json.Marshal(returnValue)
	fmt.Fprint(w, string(jsonBytes))
}
