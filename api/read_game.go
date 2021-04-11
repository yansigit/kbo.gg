package handler

import (
	"encoding/json"
	"fmt"
	"github.com/kamva/mgm/v3"
	"go.mongodb.org/mongo-driver/bson"
	"kbogg.imyoon.tech/lib"
	"net/http"
)

type readJsonParams struct {
	GameId string `json:"gameId"`
}

func init() {
	lib.MongoConnect()
}

func READ_GAME(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Cache-Control", "no-cache, no-store, must-revalidate")
	w.Header().Set("Content-Type", "application/json")

	defer lib.MongoDisconnect()

	var params readJsonParams
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
		fmt.Fprint(w, lib.ErrorAsJsonString("게임을 찾을 수 없습니다"))
		return
	}
	gameJson, err := json.Marshal(&game)
	if err != nil {
		fmt.Fprint(w, lib.ErrorAsJsonString("문서를 JSON으로 변환할 수 없습니다"))
	}
	_, err = fmt.Fprint(w, string(gameJson))
}
