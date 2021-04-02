package handler

import (
	"encoding/json"
	"fmt"
	"github.com/kamva/mgm/v3"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo/options"
	"kbogg.imyoon.tech/lib"
	"log"
	"net/http"
)

func init() {
	err := mgm.SetDefaultConfig(nil, "KBOGG_GAME", options.Client().ApplyURI("mongodb+srv://capstone:itit2021@kbo-gg.txhj8.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"))
	if err != nil {
		log.Println(err)
		log.Fatal("몽고디비 연결에 문제가 있습니다")
	}
}

func READ_GAME(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Cache-Control", "no-cache, no-store, must-revalidate")
	w.Header().Set("Content-Type", "application/json")

	err := r.ParseForm()
	if err != nil {
		log.Fatal("파라미터 분석에 문제가 있습니다")
	}
	params := r.PostForm

	game := &lib.Game{}
	mgm.Coll(game).First(bson.M{"gameId": params.Get("gameId")}, game)
	gameJson, err := json.Marshal(&game)
	fmt.Fprint(w, string(gameJson))
}
