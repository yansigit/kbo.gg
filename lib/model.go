package lib

import (
	"github.com/kamva/mgm/v3"
	"time"
)

type Game struct {
	// DefaultModel adds _id, created_at and updated_at fields to the Model
	mgm.DefaultModel `bson:",inline"`
	GameId           string    `json:"gameId" bson:"gameId"`
	AwayTeam         Team      `json:"awayTeam" bson:"awayTeam"`
	HomeTeam         Team      `json:"homeTeam" bson:"homeTeam"`
	GraphData        Graph     `json:"graph_data" bson:"graph_data"`
	GameDate         time.Time `json:"gameDate" bson:"gameDate"`
	GameStadium      string    `json:"gameStadium" bson:"gameStadium"`
	Inning           string    `json:"inning" bson:"inning"`
}

type Team struct {
	Score                 int      `json:"score" bson:"score"`
	TeamName              string   `json:"team_name" bson:"team_name"`
	CurrentPlayer         string   `json:"current_player" bson:"current_player"`
	CurrentPlayerPosition string   `json:"current_player_position" bson:"current_player_position"`
	BatLineup             []string `json:"bat_lineup" bson:"bat_lineup"`
}

type Graph struct {
	X  []string `json:"x" bson:"x"`
	Y1 []int    `json:"y1" bson:"y1"`
	Y2 []int    `json:"y2" bson:"y2"`
}

type ErrorJson struct {
	Error string `json:"error"`
}
