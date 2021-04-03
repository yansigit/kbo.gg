package handler

import (
	"encoding/json"
	"fmt"
	"github.com/kamva/mgm/v3"
	"go.mongodb.org/mongo-driver/mongo/options"
	"kbogg.imyoon.tech/lib"
	"log"
	"math/rand"
	"net/http"
	"strconv"
	"time"
)

var letters = []rune("ABCDEFGHIJKLMNOPQRSTUVWXYZ")

func randSeq(n int) string {
	b := make([]rune, n)
	for i := range b {
		b[i] = letters[rand.Intn(len(letters))]
	}
	return string(b)
}

func init() {
	err := mgm.SetDefaultConfig(nil, "KBOGG_GAME", options.Client().ApplyURI("mongodb+srv://capstone:itit2021@kbo-gg.txhj8.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"))
	if err != nil {
		log.Println(err)
		log.Fatal("몽고디비 연결에 문제가 있습니다")
	}
	rand.Seed(time.Now().UnixNano())
}

var korLetters = []rune("임성요백상준염조장취효민재유강만적추임윤연지상조석")

func randName(n int) string {
	b := make([]rune, n)
	for i := range b {
		b[i] = korLetters[rand.Intn(len(korLetters))]
	}
	return string(b)
}

func createMockup() *lib.Game {
	positions := []string{"투수", "타자"}
	firstPositionIndex := rand.Intn(1)
	nextPositionIndex := firstPositionIndex ^ 1
	gameId := "2021" + randSeq(7) + strconv.Itoa(rand.Intn(9999))
	return &lib.Game{
		GameId: gameId,
		AwayTeam: lib.Team{
			Score:                 rand.Intn(20),
			TeamName:              randSeq(2) + " " + randSeq(5),
			CurrentPlayer:         randName(3),
			CurrentPlayerPosition: positions[firstPositionIndex],
			GraphData: lib.Graph{
				X: []string{randName(3), randName(3), randName(3)},
				Y: []int{rand.Intn(100), rand.Intn(100), rand.Intn(100)},
			},
		},
		HomeTeam: lib.Team{
			Score:                 rand.Intn(20),
			TeamName:              randSeq(2) + " " + randSeq(6),
			CurrentPlayer:         randName(3),
			CurrentPlayerPosition: positions[nextPositionIndex],
			GraphData: lib.Graph{
				X: []string{randName(3), randName(3), randName(3)},
				Y: []int{rand.Intn(100), rand.Intn(100), rand.Intn(100)},
			},
		},
	}
}

func INSERT_GAME(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Cache-Control", "no-cache, no-store, must-revalidate")
	w.Header().Set("Content-Type", "application/json")

	err := r.ParseForm()
	if err != nil {
		log.Fatal("파라미터 분석에 문제가 있습니다")
	}

	game := createMockup()

	err = mgm.Coll(game).Create(game)
	if err != nil {
		log.Println(err)
		log.Fatal("DOC 삽입에 문제가 있습니다")
	}

	jsonGame, err := json.Marshal(game)
	fmt.Fprint(w, string(jsonGame))

	_, client, _, err := mgm.DefaultConfigs()
	if err != nil {
		panic(err)
	}
	err = client.Disconnect(mgm.Ctx())
	if err != nil {
		log.Fatal("몽고DB 커넥션을 종료 하는데 문제가 있습니다")
	}
}
