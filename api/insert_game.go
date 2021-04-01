package handler

import (
	"fmt"
	"github.com/kamva/mgm/v3"
	"go.mongodb.org/mongo-driver/mongo/options"
	"log"
	"net/http"
)

type Game struct {
	// DefaultModel adds _id, created_at and updated_at fields to the Model
	mgm.DefaultModel `bson:",inline"`
	GameId           string `json:"gameId" bson:"gameId"`
	AwayTeam         Team   `json:"awayTeam" bson:"awayTeam"`
	HomeTeam         Team   `json:"homeTeam" bson:"homeTeam"`
}

type Team struct {
	Score                 int    `json:"score" bson:"score"`
	TeamName              string `json:"team_name" bson:"team_name"`
	CurrentPlayer         string `json:"current_player" bson:"current_player"`
	CurrentPlayerPosition string `json:"current_player_position" bson:"current_player_position"`
	GraphData             Graph  `json:"graph_data" bson:"graph_data"`
}

type Graph struct {
	X []string `json:"x" bson:"x"`
	Y []int    `json:"y" bson:"y"`
}

func createMockup(gameId string, awayName string, homeName string) *Game {
	return &Game{
		GameId:   gameId,
		AwayTeam: Team{TeamName: awayName},
		HomeTeam: Team{TeamName: homeName},
	}
}

func init() {
	err := mgm.SetDefaultConfig(nil, "KBOGG_GAME", options.Client().ApplyURI("mongodb+srv://capstone:itit2021@kbo-gg.txhj8.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"))
	if err != nil {
		log.Println(err)
		log.Fatal("몽고디비 연결에 문제가 있습니다")
	}
}

func INSERT_GAME(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Cache-Control", "no-cache, no-store, must-revalidate")

	err := r.ParseForm()
	if err != nil {
		log.Fatal("POST 파라미터 분석에 문제가 있습니다")
	}
	params := r.Form

	game := createMockup("GAMEIDXXXXX", params.Get("away_team"), params.Get("home_team"))
	fmt.Fprint(w, game)

	err = mgm.Coll(game).Create(game)
	if err != nil {
		log.Println(err)
		log.Fatal("DOC 삽입에 문제가 있습니다")
	}

}
