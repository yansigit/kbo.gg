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
		panic("몽고디비 연결에 문제가 있습니다")
	}
	rand.Seed(time.Now().UnixNano())
}

var korLetters = []rune("임성요백상준염조장취효민재유강만적추임윤연지상조석")

var teams = []string{"롯데 자이언츠", "SSG 랜더스", "LG 트윈스", "두산 베어스", "한화 이글스", "KIA 타이거즈", "NC 다이노스", "삼성 라이온즈", "키움 히어로즈", "KT WIZ", "현대 유니콘스"}

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
	y := []int{rand.Intn(100), rand.Intn(100), rand.Intn(100), rand.Intn(100), rand.Intn(100), rand.Intn(100), rand.Intn(100)}
	y2 := make([]int, len(y))
	for i, v := range y {
		y2[i] = 100 - v
	}

	return &lib.Game{
		GameId: gameId,
		AwayTeam: lib.Team{
			Score:                 rand.Intn(20),
			TeamName:              teams[rand.Intn(len(teams))],
			CurrentPlayer:         randName(3),
			CurrentPlayerPosition: positions[firstPositionIndex],
		},
		HomeTeam: lib.Team{
			Score:                 rand.Intn(20),
			TeamName:              teams[rand.Intn(len(teams))],
			CurrentPlayer:         randName(3),
			CurrentPlayerPosition: positions[nextPositionIndex],
		},
		GraphData: lib.Graph{
			X:  []string{randName(3), randName(3), randName(3), randName(3), randName(3), randName(3), randName(3)},
			Y1: y,
			Y2: y2,
		},
	}
}

func INSERT_GAME(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Cache-Control", "no-cache, no-store, must-revalidate")
	w.Header().Set("Content-Type", "application/json")

	defer lib.MongoDisconnect()

	err := r.ParseForm()
	if err != nil {
		fmt.Fprint(w, lib.ErrorAsJsonString("파라미터를 파싱할 수 없습니다"))
		return
	}

	game := createMockup()

	err = mgm.Coll(game).Create(game)
	if err != nil {
		log.Println(err)
		fmt.Fprint(w, lib.ErrorAsJsonString("문서 삽입에 문제가 있습니다"))
		return
	}

	jsonGame, err := json.Marshal(game)
	fmt.Fprint(w, string(jsonGame))
}
