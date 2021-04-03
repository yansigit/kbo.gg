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

type readJsonParams struct {
	GameId string `json:"gameId"`
}

func init() {
	err := mgm.SetDefaultConfig(nil, "KBOGG_GAME", options.Client().ApplyURI("mongodb+srv://capstone:itit2021@kbo-gg.txhj8.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"))
	if err != nil {
		log.Println(err)
		log.Fatal("몽고디비 연결에 문제가 있습니다")
	}
	rand.Seed(time.Now().UnixNano())
}

func READ_GAME(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Cache-Control", "no-cache, no-store, must-revalidate")
	w.Header().Set("Content-Type", "application/json")

	var params readJsonParams
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
	gameJson, err := json.Marshal(&game)
	if err != nil {
		log.Fatal("문서를 JSON으로 변환하는데 문제가 있습니다")
	}
	_, err = fmt.Fprint(w, string(gameJson))

	defer lib.MongoDisconnect()
}
