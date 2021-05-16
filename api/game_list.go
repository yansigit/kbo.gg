package handler

import (
	"encoding/json"
	"fmt"
	"github.com/kamva/mgm/v3"
	"github.com/kamva/mgm/v3/operator"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo/options"
	"kbogg.imyoon.tech/lib"
	"net/http"
	"strconv"
	"time"
)

func init() {
	lib.MongoConnect()
}

func GAME_LIST(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Cache-Control", "no-cache, no-store, must-revalidate")
	w.Header().Set("Content-Type", "application/json")

	isRecent := r.URL.Query().Get("recent")
	month := r.URL.Query().Get("month")
	timezone := time.UTC // time.LoadLocation("Asia/Seoul")
	gteDate := time.Date(2021, 1, 1, 0, 0, 0, 0, timezone)
	lteDate := time.Date(2022, 1, 1, 0, 0, 0, 0, timezone)

	defer lib.MongoDisconnect()

	var result []lib.Game

	findOptions := options.Find()

	if len(isRecent) > 0 {
		findOptions.SetSort(bson.D{{"gameDate", 1}})
		y, m, d := time.Now().Date()
		gteDate = time.Date(y, m, d, 0, 0, 0, 0, timezone)
		findOptions.SetLimit(10)
	} else if len(month) > 0 {
		findOptions.SetSort(bson.D{{"gameDate", 1}})
		y, _, _ := time.Now().Date()
		month, err := strconv.Atoi(month)
		if err != nil {
			fmt.Fprint(w, lib.ErrorAsJsonString("month 변환에 문제가 있습니다"))
			return
		}
		gteDate = time.Date(y, time.Month(month), 1, 0, 0, 0, 0, timezone)
		lteDate = gteDate.AddDate(0, 1, 0)
	}

	err := mgm.Coll(&lib.Game{}).SimpleFind(&result, bson.M{"gameDate": bson.M{
		operator.Gte: gteDate,
		operator.Lte: lteDate,
	}}, findOptions)
	if err != nil {
		fmt.Fprint(w, lib.ErrorAsJsonString("문제가 있습니다"))
		return
	}
	jsonBytes, err := json.Marshal(result)
	fmt.Fprint(w, string(jsonBytes))
}
