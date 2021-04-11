package handler

import (
	"encoding/json"
	"fmt"
	"github.com/kamva/mgm/v3"
	"github.com/kamva/mgm/v3/operator"
	"go.mongodb.org/mongo-driver/bson"
	"kbogg.imyoon.tech/lib"
	"net/http"
	"time"
)

func init() {
	lib.MongoConnect()
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
		fmt.Fprint(w, lib.ErrorAsJsonString("문제가 있습니다"))
		return
	}
	jsonBytes, err := json.Marshal(result)
	fmt.Fprint(w, string(jsonBytes))
}
