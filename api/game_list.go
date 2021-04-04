package handler

import (
	"encoding/json"
	"fmt"
	"github.com/kamva/mgm/v3"
	"github.com/kamva/mgm/v3/operator"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo/options"
	"kbogg.imyoon.tech/lib"
	"log"
	"math/rand"
	"net/http"
	"time"
)

func init() {
	err := mgm.SetDefaultConfig(nil, "KBOGG_GAME", options.Client().ApplyURI("mongodb+srv://capstone:itit2021@kbo-gg.txhj8.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"))
	if err != nil {
		log.Println(err)
		panic("몽고디비 연결에 문제가 있습니다")
	}
	rand.Seed(time.Now().UnixNano())
}

func GAME_LIST(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Cache-Control", "no-cache, no-store, must-revalidate")
	w.Header().Set("Content-Type", "application/json")

	defer lib.MongoDisconnect()

	result := []lib.Game{}
	timezone, err := time.LoadLocation("Asia/Seoul")
	err = mgm.Coll(&lib.Game{}).SimpleFind(&result, bson.M{"created_at": bson.M{
		operator.Gte: time.Date(2021, 1, 1, 0, 0, 0, 0, timezone),
		operator.Lte: time.Date(2022, 1, 1, 0, 0, 0, 0, timezone),
	}})
	if err != nil {
		panic("문제가 있습니다")
	}
	jsonBytes, err := json.Marshal(result)
	fmt.Fprint(w, string(jsonBytes))
}
